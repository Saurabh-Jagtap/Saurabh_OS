/**
 * SchematicBackground.jsx
 * ══════════════════════════════════════════════════════════════════
 * High-performance interactive 3D PCB/schematic mesh background.
 *
 * Architecture overview
 * ─────────────────────
 *  • Pure Three.js — no @react-three/fiber overhead for a bg component
 *  • Custom GLSL shaders for BOTH nodes and edge traces
 *  • Mouse → uniform (uMouse) update only. Zero React state touched.
 *  • Three draw calls total: edges, nodes, glow halos
 *  • Additive blending on halos = free "bloom" without a post-process pass
 *  • ResizeObserver on the wrapper (not window resize)
 *  • Full scene disposal (geometry, material, renderer) on unmount
 *
 * Performance budget (target hardware: mid-range laptop, Chrome)
 * ─────────────────────────────────────────────────────────────────
 *  • ~600 nodes, ~1400 edges  →  <0.4 ms CPU/frame
 *  • Single renderer, no post-processing
 *  • Uniforms updated at mousemove cadence, not rAF cadence
 *  • rAF only drives rotation + renderer.render()
 * ══════════════════════════════════════════════════════════════════
 */
// @ts-nocheck
"use client"
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// ─── Tunable constants ────────────────────────────────────────────
const NODE_COUNT          = 620;
const SPREAD_X            = 18;
const SPREAD_Y            = 10;
const SPREAD_Z            = 6;
const MAX_EDGE_DISTANCE   = 2.8;   // max dist to connect two nodes
const MAX_EDGES_PER_NODE  = 5;     // degree cap — keeps graph sparse
const SPOTLIGHT_RADIUS    = 0.38;  // in NDC units (0–1 space)
const AMBIENT_BRIGHTNESS  = 0.045; // how visible mesh is at rest
const PEAK_BRIGHTNESS     = 1.0;   // brightness at spotlight center
const NODE_BASE_SIZE      = 3.5;   // gl_PointSize base
const NODE_PEAK_SIZE      = 22.0;  // gl_PointSize in spotlight
const ROTATION_SPEED      = 0.00018;
const HALO_BASE_SIZE      = 18.0;
const HALO_PEAK_SIZE      = 80.0;
const INDIGO              = new THREE.Color(0x6366f1);
const CYAN                = new THREE.Color(0x06b6d4);
const WHITE               = new THREE.Color(0xc7d2fe); // indigo-200

// ─── Vertex shader — edges ────────────────────────────────────────
const EDGE_VERT = /* glsl */`
  uniform vec2  uMouse;       // NDC [-1,1]
  uniform float uSpotR;       // spotlight radius in NDC
  uniform float uAmbient;
  uniform float uPeak;
  uniform float uTime;

  varying float vBright;
  varying float vDist;

  void main() {
    vec4 mvPos   = modelViewMatrix * vec4(position, 1.0);
    vec4 clipPos = projectionMatrix * mvPos;
    gl_Position  = clipPos;

    // NDC of this vertex
    vec2 ndc = clipPos.xy / clipPos.w;
    float d  = length(ndc - uMouse);

    float spotlight = 1.0 - smoothstep(0.0, uSpotR, d);
    vBright  = uAmbient + (uPeak - uAmbient) * spotlight;
    vDist    = d;
  }
`;

// ─── Fragment shader — edges ──────────────────────────────────────
const EDGE_FRAG = /* glsl */`
  uniform vec3 uColorA;   // indigo
  uniform vec3 uColorB;   // cyan
  uniform float uTime;

  varying float vBright;
  varying float vDist;

  void main() {
    // Subtle color shift: indigo base, cyan in spotlight
    vec3 col = mix(uColorA, uColorB, 1.0 - clamp(vDist * 2.2, 0.0, 1.0));
    gl_FragColor = vec4(col * vBright, vBright * 0.9);
  }
`;

// ─── Vertex shader — nodes ────────────────────────────────────────
const NODE_VERT = /* glsl */`
  uniform vec2  uMouse;
  uniform float uSpotR;
  uniform float uAmbient;
  uniform float uPeak;
  uniform float uNodeBase;
  uniform float uNodePeak;

  varying float vBright;
  varying float vSpot;

  void main() {
    vec4 mvPos   = modelViewMatrix * vec4(position, 1.0);
    vec4 clipPos = projectionMatrix * mvPos;
    gl_Position  = clipPos;

    vec2 ndc = clipPos.xy / clipPos.w;
    float d  = length(ndc - uMouse);

    float spotlight = 1.0 - smoothstep(0.0, uSpotR, d);
    vSpot    = spotlight;
    vBright  = uAmbient + (uPeak - uAmbient) * spotlight;

    // Size grows in spotlight
    gl_PointSize = uNodeBase + (uNodePeak - uNodeBase) * spotlight;
  }
`;

// ─── Fragment shader — nodes (circular with soft edge) ────────────
const NODE_FRAG = /* glsl */`
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorW;

  varying float vBright;
  varying float vSpot;

  void main() {
    // Circular clip
    vec2 uv  = gl_PointCoord - 0.5;
    float r  = length(uv) * 2.0;
    if (r > 1.0) discard;

    float edge = 1.0 - smoothstep(0.6, 1.0, r);
    vec3 col   = mix(uColorA, uColorW, vSpot * 0.7);
    float a    = vBright * edge;

    gl_FragColor = vec4(col * a, a);
  }
`;

// ─── Vertex shader — glow halos (additive, bloom illusion) ────────
const HALO_VERT = /* glsl */`
  uniform vec2  uMouse;
  uniform float uSpotR;
  uniform float uHaloBase;
  uniform float uHaloPeak;

  varying float vSpot;

  void main() {
    vec4 mvPos   = modelViewMatrix * vec4(position, 1.0);
    vec4 clipPos = projectionMatrix * mvPos;
    gl_Position  = clipPos;

    vec2 ndc = clipPos.xy / clipPos.w;
    float d  = length(ndc - uMouse);

    vSpot        = 1.0 - smoothstep(0.0, uSpotR, d);
    gl_PointSize = uHaloBase + (uHaloPeak - uHaloBase) * vSpot;
  }
`;

// ─── Fragment shader — glow halos ─────────────────────────────────
const HALO_FRAG = /* glsl */`
  uniform vec3 uColorA;
  uniform vec3 uColorB;

  varying float vSpot;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float r = length(uv) * 2.0;
    if (r > 1.0) discard;

    // Soft gaussian falloff
    float g = exp(-r * r * 3.0);
    vec3 col = mix(uColorA, uColorB, vSpot);
    float a  = g * vSpot * 0.55;

    gl_FragColor = vec4(col, a);
  }
`;

// ─── Node graph builder ────────────────────────────────────────────
function buildGraph(count, sx, sy, sz, maxDist, maxDeg) {
  // 1. Place nodes randomly in 3D space with slight layering
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * sx;
    positions[i * 3 + 1] = (Math.random() - 0.5) * sy;
    positions[i * 3 + 2] = (Math.random() - 0.5) * sz;
  }

  // 2. Connect nearby nodes (Euclidean distance threshold)
  const edgeVerts = [];
  const degree    = new Int32Array(count);
  const maxD2     = maxDist * maxDist;

  for (let i = 0; i < count; i++) {
    if (degree[i] >= maxDeg) continue;
    const ix = positions[i * 3];
    const iy = positions[i * 3 + 1];
    const iz = positions[i * 3 + 2];

    for (let j = i + 1; j < count; j++) {
      if (degree[i] >= maxDeg || degree[j] >= maxDeg) continue;

      const dx = ix - positions[j * 3];
      const dy = iy - positions[j * 3 + 1];
      const dz = iz - positions[j * 3 + 2];
      const d2 = dx * dx + dy * dy + dz * dz;

      if (d2 < maxD2) {
        // Push both endpoints of the edge
        edgeVerts.push(ix, iy, iz);
        edgeVerts.push(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
        degree[i]++;
        degree[j]++;
      }
    }
  }

  return {
    nodePositions: positions,
    edgePositions: new Float32Array(edgeVerts),
  };
}

// ─── Main component ────────────────────────────────────────────────
export default function SchematicBackground({ children, className = '' }) {
  const wrapRef    = useRef(null);
  const canvasRef  = useRef(null);
  // All Three.js objects in a single ref — no state ever
  const threeRef   = useRef(null);

  useEffect(() => {
    const wrap   = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    // ── Renderer ───────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias:   false,    // background — AA not worth the cost
      alpha:       false,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x09090b, 1); // zinc-950
    renderer.setSize(wrap.offsetWidth, wrap.offsetHeight);

    // ── Scene & Camera ─────────────────────────────────────────────
    const scene  = new THREE.Scene();
    const aspect = wrap.offsetWidth / wrap.offsetHeight;
    const camera = new THREE.PerspectiveCamera(55, aspect, 0.1, 100);
    camera.position.set(0, 0, 14);

    // ── Build node graph ───────────────────────────────────────────
    const { nodePositions, edgePositions } = buildGraph(
      NODE_COUNT, SPREAD_X, SPREAD_Y, SPREAD_Z,
      MAX_EDGE_DISTANCE, MAX_EDGES_PER_NODE
    );

    // ── Shared uniforms object (single source of truth) ───────────
    // We'll share references — updating one object updates all materials
    const sharedUniforms = {
      uMouse:    { value: new THREE.Vector2(-9999, -9999) },
      uSpotR:    { value: SPOTLIGHT_RADIUS },
      uAmbient:  { value: AMBIENT_BRIGHTNESS },
      uPeak:     { value: PEAK_BRIGHTNESS },
      uTime:     { value: 0 },
      uColorA:   { value: INDIGO },
      uColorB:   { value: CYAN },
      uColorW:   { value: WHITE },
      uNodeBase: { value: NODE_BASE_SIZE },
      uNodePeak: { value: NODE_PEAK_SIZE },
      uHaloBase: { value: HALO_BASE_SIZE },
      uHaloPeak: { value: HALO_PEAK_SIZE },
    };

    // ── Edge lines ─────────────────────────────────────────────────
    const edgeGeo = new THREE.BufferGeometry();
    edgeGeo.setAttribute('position', new THREE.BufferAttribute(edgePositions, 3));

    const edgeMat = new THREE.ShaderMaterial({
      vertexShader:   EDGE_VERT,
      fragmentShader: EDGE_FRAG,
      uniforms:       sharedUniforms,
      transparent:    true,
      depthWrite:     false,
      blending:       THREE.AdditiveBlending,
    });

    const edges = new THREE.LineSegments(edgeGeo, edgeMat);
    scene.add(edges);

    // ── Nodes (Points) ─────────────────────────────────────────────
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));

    const nodeMat = new THREE.ShaderMaterial({
      vertexShader:   NODE_VERT,
      fragmentShader: NODE_FRAG,
      uniforms:       sharedUniforms,
      transparent:    true,
      depthWrite:     false,
      blending:       THREE.AdditiveBlending,
    });

    const nodes = new THREE.Points(nodeGeo, nodeMat);
    scene.add(nodes);

    // ── Glow halos (additive — fake bloom, no post-process) ────────
    const haloMat = new THREE.ShaderMaterial({
      vertexShader:   HALO_VERT,
      fragmentShader: HALO_FRAG,
      uniforms:       sharedUniforms,
      transparent:    true,
      depthWrite:     false,
      blending:       THREE.AdditiveBlending,
    });

    const halos = new THREE.Points(nodeGeo, haloMat); // reuse same geo
    scene.add(halos);

    // ── Mouse tracking → uniform only, never React state ──────────
    const onMouseMove = (e) => {
      const rect = wrap.getBoundingClientRect();
      // Convert to NDC [-1, 1]
      const nx =  ((e.clientX - rect.left)  / rect.width)  * 2 - 1;
      const ny = -((e.clientY - rect.top)   / rect.height) * 2 + 1;
      sharedUniforms.uMouse.value.set(nx, ny);
    };

    const onMouseLeave = () => {
      // Park the spotlight far off-screen
      sharedUniforms.uMouse.value.set(-9999, -9999);
    };

    wrap.addEventListener('mousemove',  onMouseMove,  { passive: true });
    wrap.addEventListener('mouseleave', onMouseLeave, { passive: true });

    // ── rAF render loop ────────────────────────────────────────────
    let rafId;
    let lastTime = 0;

    const tick = (now) => {
      rafId = requestAnimationFrame(tick);

      const elapsed = now * 0.001; // seconds
      sharedUniforms.uTime.value = elapsed;

      // Slow auto-rotation on the graph group
      edges.rotation.y = elapsed * ROTATION_SPEED * 60;
      nodes.rotation.y = elapsed * ROTATION_SPEED * 60;
      halos.rotation.y = elapsed * ROTATION_SPEED * 60;

      // Subtle y-axis breathing
      const breathe = Math.sin(elapsed * 0.18) * 0.08;
      edges.rotation.x = breathe;
      nodes.rotation.x = breathe;
      halos.rotation.x = breathe;

      renderer.render(scene, camera);
    };

    rafId = requestAnimationFrame(tick);

    // ── ResizeObserver ─────────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      const w = wrap.offsetWidth;
      const h = wrap.offsetHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });
    ro.observe(wrap);

    // ── Store refs for cleanup ─────────────────────────────────────
    threeRef.current = {
      renderer, scene, camera,
      edgeGeo, edgeMat,
      nodeGeo, nodeMat, haloMat,
      rafId, ro,
      wrap, onMouseMove, onMouseLeave,
    };

    // ── Cleanup ────────────────────────────────────────────────────
    return () => {
      const t = threeRef.current;
      if (!t) return;

      cancelAnimationFrame(t.rafId);
      t.ro.disconnect();
      t.wrap.removeEventListener('mousemove',  t.onMouseMove);
      t.wrap.removeEventListener('mouseleave', t.onMouseLeave);

      // Dispose GPU resources — critical for SPA navigation
      t.edgeGeo.dispose();
      t.edgeMat.dispose();
      t.nodeGeo.dispose();
      t.nodeMat.dispose();
      t.haloMat.dispose();
      t.renderer.dispose();

      threeRef.current = null;
    };
  }, []); // empty deps — runs once on mount

  return (
    /*
     * Z-INDEX MAP
     * ─────────────────────────────────────────────────
     * z-0   Three.js canvas (WebGL)
     * z-10  Children / page content
     * z-20  Navbar (kept outside this component)
     * ─────────────────────────────────────────────────
     * The wrapper is `relative` so children with
     * `relative z-[10]` stack above the canvas.
     */
    <div
      ref={wrapRef}
      className={`relative w-full min-h-screen overflow-hidden ${className}`}
      style={{ background: '#09090b' }}
    >
      {/* ── WebGL canvas — full bleed, pointer-events:none so  ──
          ── mouse events still reach the wrapper div above it  ── */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position:      'absolute',
          inset:         0,
          zIndex:        0,
          width:         '100%',
          height:        '100%',
          pointerEvents: 'none',
          display:       'block',
        }}
      />

      {/* ── Vignette — helps content readability ──────────────── */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          inset:      0,
          zIndex:     1,
          background: 'radial-gradient(ellipse at center, transparent 35%, rgba(9,9,11,0.82) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Content slot (z-10 — above all bg layers) ─────────── */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        {children}
      </div>
    </div>
  );
}
