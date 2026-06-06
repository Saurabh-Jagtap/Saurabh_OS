"use client";

/**
 * Footer.tsx — SaurabhOS Redesign
 * ═══════════════════════════════════════════════════════════════════
 * Concept: "System Shutdown" — the footer feels like the OS powering
 * down: a final status readout, open-channel social nodes rendered
 * as circuit schematic ports, a live heartbeat flatline, lat/lon
 * metadata, and a spark-border that mirrors the navbar.
 *
 * Theme alignment:
 *  • bg-[#060810] base with 48px indigo grid (matches existing footer bg)
 *  • Cyan (#0ef / #06b6d4) + indigo (#6366f1) accent palette
 *  • Same border-spark animation from Navbar.tsx
 *  • Glitch text on logo — same keyframes as HeroSection + Navbar
 *  • Glassmorphic panels with backdrop-blur + border-white/[0.05]
 *  • Corner bracket decorators from ContactSection / HeroSection
 *  • pointer-events-none shell → pointer-events-auto on interactables
 * ═══════════════════════════════════════════════════════════════════
 */

import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Twitter, ArrowUpRight } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home",      href: "#"          },
  { label: "Projects",  href: "#projects"  },
  { label: "Journey",   href: "#journey"   },
  { label: "Guestbook", href: "#guestbook" },
  { label: "Contact",   href: "#contact"   },
];

const SOCIAL_NODES = [
  {
    icon:    Github,
    label:   "GitHub",
    handle:  "/saurabhOS",
    href:    "https://github.com",
    color:   "rgba(255,255,255,0.7)",
    glow:    "rgba(255,255,255,0.08)",
    border:  "rgba(255,255,255,0.12)",
  },
  {
    icon:    Linkedin,
    label:   "LinkedIn",
    handle:  "/in/saurabh",
    href:    "https://linkedin.com",
    color:   "#818cf8",
    glow:    "rgba(99,102,241,0.12)",
    border:  "rgba(99,102,241,0.25)",
  },
  {
    icon:    Twitter,
    label:   "X / Twitter",
    handle:  "@saurabhOS",
    href:    "https://x.com",
    color:   "#22d3ee",
    glow:    "rgba(6,182,212,0.12)",
    border:  "rgba(6,182,212,0.3)",
  },
];

const STACK_CHIPS = [
  { label: "Next.js",     color: "text-slate-400"  },
  { label: "TypeScript",  color: "text-indigo-400" },
  { label: "tRPC",        color: "text-violet-400" },
  { label: "PostgreSQL",  color: "text-cyan-400"   },
  { label: "Prisma",      color: "text-emerald-400"},
  { label: "Tailwind",    color: "text-sky-400"    },
];

const STATUS_LINES = [
  { text: "system.shutdown initiated...",    color: "text-slate-500",  delay: 0   },
  { text: "✓ All sessions saved",           color: "text-emerald-400", delay: 300 },
  { text: "✓ Build streak: 47 days",        color: "text-cyan-400",    delay: 600 },
  { text: "✓ Last commit: today",           color: "text-indigo-400",  delay: 900 },
  { text: "✓ SaurabhOS v1.0.0 — still shipping", color: "text-violet-400", delay: 1200 },
];

// ─── Corner bracket (reused across all components) ────────────────
function Corner({
  pos,
  color = "rgba(6,182,212,0.3)",
}: {
  pos: "tl" | "tr" | "bl" | "br";
  color?: string;
}) {
  const styles: Record<string, React.CSSProperties> = {
    tl: { top: 0, left: 0, borderTop: `1px solid ${color}`, borderLeft:  `1px solid ${color}` },
    tr: { top: 0, right: 0, borderTop: `1px solid ${color}`, borderRight: `1px solid ${color}` },
    bl: { bottom: 0, left: 0, borderBottom: `1px solid ${color}`, borderLeft: `1px solid ${color}` },
    br: { bottom: 0, right: 0, borderBottom: `1px solid ${color}`, borderRight: `1px solid ${color}` },
  };
  return (
    <span
      aria-hidden
      style={{
        position: "absolute",
        width: 10,
        height: 10,
        pointerEvents: "none",
        ...styles[pos],
      }}
    />
  );
}

// ─── SVG heartbeat / flatline ─────────────────────────────────────
function Heartbeat() {
  return (
    <svg
      viewBox="0 0 200 40"
      width="200"
      height="40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Flatline segments + one spike */}
      <polyline
        points="0,20 30,20 40,20 50,5 55,35 60,20 80,20 90,20 100,20 108,20 113,10 118,30 123,20 140,20 160,20 180,20 200,20"
        stroke="rgba(6,182,212,0.5)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Animated scanning dot */}
      <circle r="2" fill="#22d3ee" opacity="0.8">
        <animateMotion
          dur="3s"
          repeatCount="indefinite"
          path="M0,20 L30,20 L40,20 L50,5 L55,35 L60,20 L80,20 L90,20 L100,20 L108,20 L113,10 L118,30 L123,20 L140,20 L160,20 L180,20 L200,20"
        />
      </circle>
      {/* Glow on the spike peak */}
      <circle cx="50" cy="5" r="2.5" fill="rgba(6,182,212,0)" opacity="0">
        <animate attributeName="opacity" values="0;0.8;0" dur="3s" repeatCount="indefinite" begin="0.6s" />
        <animate attributeName="fill" values="rgba(6,182,212,0);rgba(6,182,212,0.6);rgba(6,182,212,0)" dur="3s" repeatCount="indefinite" begin="0.6s" />
      </circle>
    </svg>
  );
}

// ─── Animated terminal boot lines ─────────────────────────────────
function ShutdownTerminal() {
  const [shown, setShown] = useState(0);
  const [blink, setBlink] = useState(true);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    STATUS_LINES.forEach((_, i) => {
      setTimeout(() => setShown(i + 1), STATUS_LINES[i]!.delay + 400);
    });

    const id = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-2 font-mono text-[12px]">
      <div className="mb-3 text-slate-600 text-[10px] uppercase tracking-[0.2em]">
        <span className="text-indigo-400">saurabh@os:~/system$</span> shutdown --save-state
      </div>
      {STATUS_LINES.slice(0, shown).map(({ text, color }, i) => (
        <div
          key={i}
          className={`${color} transition-all duration-300`}
          style={{ animation: "termReveal 0.3s ease both" }}
        >
          {text}
        </div>
      ))}
      {shown >= STATUS_LINES.length && (
        <div className="pt-1">
          <span className="text-indigo-400">saurabh@os:~/system$</span>
          <span
            className="inline-block w-[7px] h-[13px] bg-cyan-400 ml-1.5 align-middle"
            style={{ opacity: blink ? 1 : 0, transition: "opacity 0.1s" }}
          />
        </div>
      )}
    </div>
  );
}

// ─── Social node card (schematic port style) ──────────────────────
function SocialNode({
  icon: Icon,
  label,
  handle,
  href,
  color,
  glow,
  border,
}: (typeof SOCIAL_NODES)[0]) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group relative flex flex-col items-center gap-3 p-5 rounded-2xl transition-all duration-300"
      style={{
        border: `1px solid ${hovered ? border : "rgba(255,255,255,0.05)"}`,
        background: hovered ? glow : "rgba(0,0,0,0.25)",
        backdropFilter: "blur(12px)",
        boxShadow: hovered ? `0 0 30px ${glow}` : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Corner pos="tl" color={hovered ? border : "transparent"} />
      <Corner pos="br" color={hovered ? border : "transparent"} />

      {/* Circuit port ring */}
      <div
        className="relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300"
        style={{
          border: `1px solid ${hovered ? border : "rgba(255,255,255,0.07)"}`,
          background: hovered ? `${glow}` : "rgba(0,0,0,0.4)",
          boxShadow: hovered ? `0 0 16px ${glow}, inset 0 0 8px ${glow}` : "none",
        }}
      >
        {/* Outer dashed orbit ring */}
        <svg
          viewBox="0 0 48 48"
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: hovered ? 0.6 : 0.15,
            transition: "opacity 0.3s",
            animation: hovered ? "spin 6s linear infinite" : "spin 20s linear infinite",
          }}
        >
          <circle
            cx="24" cy="24" r="22"
            fill="none"
            stroke={color}
            strokeWidth="0.8"
            strokeDasharray="3 4"
          />
        </svg>

        <Icon
          className="relative z-10 w-5 h-5 transition-colors duration-300"
          style={{ color: hovered ? color : "#475569" }}
        />
      </div>

      {/* Node connector line (bottom) */}
      <div
        className="w-px transition-all duration-300"
        style={{
          height: hovered ? 12 : 8,
          background: `linear-gradient(to bottom, ${color}, transparent)`,
          opacity: hovered ? 0.7 : 0.2,
        }}
      />

      {/* Labels */}
      <div className="text-center leading-none">
        <div
          className="font-mono text-[10px] font-semibold uppercase tracking-widest transition-colors duration-300"
          style={{ color: hovered ? color : "#334155" }}
        >
          {label}
        </div>
        <div className="mt-1 font-mono text-[9px] text-slate-600">
          {handle}
        </div>
      </div>

      {/* Arrow */}
      <ArrowUpRight
        className="absolute top-3 right-3 w-3 h-3 transition-all duration-200 opacity-0 group-hover:opacity-100"
        style={{ color }}
      />
    </a>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Main Footer
// ═══════════════════════════════════════════════════════════════════
export default function Footer() {
  const year = new Date().getFullYear();
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour:   "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="pointer-events-none relative overflow-hidden bg-[#060810] border-t border-white/[0.04]">

      {/* ── CSS Animations ────────────────────────────────────────── */}
      <style>{`
        @keyframes spark-travel {
          0%   { left: -10%; top: 0; opacity: 0; }
          8%   { opacity: 1; }
          42%  { left: 110%; top: 0; opacity: 0; }
          100% { left: 110%; opacity: 0; }
        }
        @keyframes termReveal {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes glitch-f1 {
          0%,85%{ clip-path:inset(100% 0 0 0); transform:translate(0,0); }
          87%   { clip-path:inset(20% 0 70% 0); transform:translate(-2px,1px); }
          89%   { clip-path:inset(55% 0 15% 0); transform:translate(2px,-1px); }
          91%   { clip-path:inset(35% 0 45% 0); transform:translate(-2px,1px); }
          93%   { clip-path:inset(100% 0 0 0); transform:translate(0,0); }
        }
        @keyframes glitch-f2 {
          0%,85%{ clip-path:inset(100% 0 0 0); transform:translate(0,0); }
          86%   { clip-path:inset(10% 0 55% 0); transform:translate(2px,-1px); }
          88%   { clip-path:inset(45% 0 20% 0); transform:translate(-2px,1px); }
          90%   { clip-path:inset(65% 0 12% 0); transform:translate(2px,-1px); }
          92%   { clip-path:inset(100% 0 0 0); transform:translate(0,0); }
        }
        .footer-glitch { position:relative; display:inline-block; color:#f8fafc; font-weight:700; }
        .footer-glitch::before,.footer-glitch::after {
          content:attr(data-text);
          position:absolute; top:0; left:0; width:100%; height:100%; opacity:.85;
        }
        .footer-glitch::before { color:#0ef; z-index:-1; animation:glitch-f1 5s infinite linear alternate-reverse; }
        .footer-glitch::after  { color:#6366f1; z-index:-2; animation:glitch-f2 5s infinite linear alternate-reverse; }
      `}</style>

      {/* ── Grid bg ───────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── Ambient orbs ──────────────────────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute left-0 top-0 h-[350px] w-[350px] rounded-full bg-indigo-600/[0.05] blur-[100px]" />
      <div aria-hidden className="pointer-events-none absolute right-0 bottom-0 h-[300px] w-[300px] rounded-full bg-cyan-500/[0.05] blur-[100px]" />

      {/* ── Spark border — top edge (mirrors Navbar) ──────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 inset-x-0 h-px overflow-hidden"
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            width: 80,
            height: 1,
            background: "linear-gradient(90deg, transparent, #0ef, #fff, transparent)",
            boxShadow: "0 0 10px 2px rgba(6,182,212,0.7)",
            animation: "spark-travel 5s infinite cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </div>

      {/* ═══ Main content ══════════════════════════════════════════ */}
      <div className="relative z-10 mx-auto max-w-7xl px-8 pt-16 pb-8">

        {/* ── Row 1: Brand + Nav + Coords ──────────────────────────── */}
        <div className="grid grid-cols-1 gap-10 pb-10 border-b border-white/[0.04] lg:grid-cols-[1fr_auto_1fr]">

          {/* Brand block */}
          <div className="flex flex-col gap-5">
            {/* Logo */}
            <div className="pointer-events-auto flex items-center gap-3 select-none">
              {/* Rotating rect icon (same as Navbar) */}
              <div className="relative flex items-center justify-center w-9 h-9">
                <svg
                  viewBox="0 0 32 32"
                  className="absolute inset-0 w-full h-full"
                  style={{ opacity: 0.55, animation: "spin 14s linear infinite" }}
                >
                  <rect x="1" y="1" width="30" height="30" rx="6" fill="none"
                    stroke="url(#footerLogoGrad)" strokeWidth="1" strokeDasharray="4 3" />
                  <defs>
                    <linearGradient id="footerLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#0ef" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="relative z-10 font-mono text-[10px] font-bold text-cyan-400">&gt;_</span>
              </div>

              <div className="flex flex-col leading-none">
                <span className="footer-glitch font-mono text-[15px] tracking-tight" data-text="SaurabhOS">
                  SaurabhOS
                </span>
                <span className="mt-1 font-mono text-[9px] tracking-[0.18em] text-cyan-500/60 uppercase">
                  v1.0.0-mvp
                </span>
              </div>

              <span
                className="ml-1 inline-block w-1.5 h-1.5 rounded-full bg-cyan-400"
                style={{
                  animation: "pulse 2s ease infinite",
                  boxShadow: "0 0 6px 2px rgba(6,182,212,0.5)",
                }}
              />
            </div>

            {/* Tagline */}
            <p className="font-mono text-[12px] leading-7 text-slate-500 max-w-[260px]">
              A personal engineering workspace.<br />
              <span className="text-slate-600">
                developer → engineer → builder
              </span>
            </p>

            {/* Heartbeat */}
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-700">
                sys.heartbeat
              </span>
              <Heartbeat />
            </div>

            {/* Coordinates */}
            <div className="flex gap-6 mt-1">
              {[
                { label: "LAT", val: "18.9220° N" },
                { label: "LON", val: "72.8347° E" },
              ].map(({ label, val }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span className="font-mono text-[9px] text-slate-700 uppercase tracking-[0.15em]">{label}</span>
                  <span className="font-mono text-[11px] text-slate-500">{val}</span>
                </div>
              ))}
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[9px] text-slate-700 uppercase tracking-[0.15em]">IST</span>
                <span className="font-mono text-[11px] text-cyan-500/80 tabular-nums">{time}</span>
              </div>
            </div>
          </div>

          {/* ── Social nodes — center ──────────────────────────────── */}
          <div className="flex flex-col items-center gap-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-700 mb-1">
              // open.channels
            </span>

            {/* Circuit line top */}
            <div className="flex flex-col items-center gap-0">
              <div className="w-px h-4 bg-gradient-to-b from-transparent to-cyan-500/20" />
              <div className="w-2 h-2 rounded-full border border-cyan-500/30 bg-cyan-500/10" />
            </div>

            {/* Node cards */}
            <div className="pointer-events-auto flex flex-col gap-3 w-full min-w-[180px]">
              {SOCIAL_NODES.map((node) => (
                <SocialNode key={node.label} {...node} />
              ))}
            </div>

            {/* Circuit line bottom */}
            <div className="flex flex-col items-center">
              <div className="w-2 h-2 rounded-full border border-indigo-500/30 bg-indigo-500/10" />
              <div className="w-px h-4 bg-gradient-to-b from-indigo-500/20 to-transparent" />
            </div>
          </div>

          {/* ── Right block: nav + terminal ───────────────────────── */}
          <div className="flex flex-col gap-8 lg:items-end">

            {/* Nav sitemap */}
            <div className="flex flex-col gap-2 lg:items-end">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-700 mb-1">
                // site.map
              </span>
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="pointer-events-auto group flex items-center gap-2 font-mono text-[12px] text-slate-500 hover:text-cyan-300 transition-colors duration-200"
                >
                  <span className="opacity-0 group-hover:opacity-100 text-cyan-500/60 text-[10px] transition-opacity duration-200">›</span>
                  {label}
                </a>
              ))}
            </div>

            {/* Mini shutdown terminal */}
            <div
              className="relative overflow-hidden rounded-xl w-full lg:w-auto lg:min-w-[280px]"
              style={{
                border: "1px solid rgba(255,255,255,0.04)",
                background: "rgba(0,0,0,0.35)",
                backdropFilter: "blur(12px)",
              }}
            >
              <Corner pos="tl" color="rgba(99,102,241,0.3)" />
              <Corner pos="br" color="rgba(99,102,241,0.3)" />

              {/* Chrome bar */}
              <div
                className="flex items-center gap-2 px-4 py-2.5 border-b"
                style={{ borderColor: "rgba(255,255,255,0.04)", background: "rgba(0,0,0,0.2)" }}
              >
                <div className="h-2 w-2 rounded-full bg-red-500/60" />
                <div className="h-2 w-2 rounded-full bg-amber-500/60" />
                <div className="h-2 w-2 rounded-full bg-emerald-500/60" />
                <span className="ml-2 font-mono text-[9px] text-slate-600">
                  saurabh@os:~/system
                </span>
              </div>

              <div className="p-4">
                <ShutdownTerminal />
              </div>
            </div>

          </div>
        </div>

        {/* ── Row 2: Stack chips ────────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-2 py-6 border-b border-white/[0.03]">
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-700 mr-2">
            built with
          </span>
          {STACK_CHIPS.map(({ label, color }) => (
            <span
              key={label}
              className={`font-mono text-[10px] ${color} px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.04]`}
            >
              <span className="text-slate-700 mr-1.5">//</span>
              {label}
            </span>
          ))}
        </div>

        {/* ── Row 3: Bottom bar ─────────────────────────────────────── */}
        <div className="flex flex-col items-center justify-between gap-3 pt-6 md:flex-row">

          {/* Left — copyright + mission */}
          <div className="flex items-center gap-3">
            <span
              className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0"
              style={{ animation: "pulse 2s ease infinite", boxShadow: "0 0 6px 2px rgba(52,211,153,0.4)" }}
            />
            <span className="font-mono text-[10px] text-slate-600">
              © {year} SaurabhOS
              <span className="mx-2 text-slate-800">·</span>
              <span className="text-slate-700">Still Learning · Still Building · Still Shipping</span>
            </span>
          </div>

          {/* Center — process ID style */}
          <div className="flex items-center gap-4 font-mono text-[9px] text-slate-800">
            <span>PID: 2601</span>
            <span>·</span>
            <span>MEM: 420KB</span>
            <span>·</span>
            <span>CPU: 0.0%</span>
          </div>

          {/* Right — "back to top" as shell command */}
          <a
            href="#"
            className="pointer-events-auto group flex items-center gap-2 font-mono text-[10px] text-slate-700 hover:text-cyan-400 transition-colors duration-200"
          >
            <span className="text-indigo-500/60">$</span>
            <span>cd /home</span>
            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </a>
        </div>

      </div>
    </footer>
  );
}