"use client"
import { useRef, useState, useEffect } from "react";
import ProjectReactions from "./ProjectReactions";

interface ProjectCardProps {
  projectId: string;
  title: string;
  description: string | null;
  status: string;
  technologies: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  coverImage?: string | null;
  // Animation stagger index passed from parent
  index?: number;
}

// ─── Status config ─────────────────────────────────────────────────
const STATUS_CONFIG: Record<string, { color: string; dot: string; glow: string }> = {
  LIVE:           { color: "#34d399", dot: "#34d399", glow: "rgba(52,211,153,0.4)"  },
  "IN PROGRESS":  { color: "#fbbf24", dot: "#fbbf24", glow: "rgba(251,191,36,0.4)"  },
  SHIPPED:        { color: "#818cf8", dot: "#818cf8", glow: "rgba(129,140,248,0.4)" },
  ARCHIVED:       { color: "#64748b", dot: "#64748b", glow: "rgba(100,116,139,0.3)" },
};

// ─── Corner crosshair ──────────────────────────────────────────────
function Crosshair({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  return (
    <div
      className="absolute w-3 h-3 pointer-events-none"
      style={{
        top:    pos.startsWith("t") ? 0 : undefined,
        bottom: pos.startsWith("b") ? 0 : undefined,
        left:   pos.endsWith("l")   ? 0 : undefined,
        right:  pos.endsWith("r")   ? 0 : undefined,
      }}
    >
      <div className="absolute top-1/2 left-0 right-0 h-px bg-cyan-500/25" />
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-cyan-500/25" />
    </div>
  );
}

export default function ProjectCard({
  projectId,
  title,
  description,
  status,
  technologies,
  githubUrl,
  liveUrl,
  coverImage,
  index = 0,
}: ProjectCardProps) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const [hovered, setHovered]   = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.style.setProperty("--reveal-delay", `${index * 120}ms`);
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "-50px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  const statusCfg = STATUS_CONFIG[status] ?? STATUS_CONFIG["LIVE"]!;
  const slug      = title.toLowerCase().replace(/\s+/g, "-");

  return (
    <>
      <style>{`
        @keyframes card-reveal {
          from { opacity: 0; transform: translateY(28px) translateZ(0); }
          to   { opacity: 1; transform: translateY(0)   translateZ(0); }
        }
        @keyframes card-scan {
          0%   { top: 0%;   opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes card-status-pulse {
          0%, 100% { box-shadow: 0 0 0 0   currentColor; }
          50%      { box-shadow: 0 0 0 4px transparent;  }
        }
      `}</style>

      <div
        ref={cardRef}
        className="group relative flex flex-col overflow-hidden rounded-2xl"
        style={{
          opacity:       revealed ? undefined : 0,
          animation:     revealed ? `card-reveal 0.55s var(--reveal-delay, 0ms) cubic-bezier(0.22,1,0.36,1) both` : "none",
          willChange:    revealed ? "auto" : "transform, opacity",
          border:        `1px solid ${hovered ? "rgba(6,182,212,0.45)" : "rgba(255,255,255,0.06)"}`,
          background:    hovered
            ? "linear-gradient(135deg, rgba(6,182,212,0.07), rgba(8,11,20,0.92))"
            : "rgba(8,11,20,0.75)",
          backdropFilter: "blur(14px)",
          boxShadow:     hovered
            ? "0 0 48px -10px rgba(6,182,212,0.25), inset 0 1px 0 rgba(255,255,255,0.04)"
            : "inset 0 1px 0 rgba(255,255,255,0.03)",
          transform:     hovered ? "translateY(-5px) translateZ(0)" : "translateY(0) translateZ(0)",
          transition:    "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, border-color 0.2s ease, background 0.25s ease",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Corner crosshairs */}
        <Crosshair pos="tl" /><Crosshair pos="tr" />
        <Crosshair pos="bl" /><Crosshair pos="br" />

        {/* ── Terminal header bar ─────────────────────────────── */}
        <div
          className="flex items-center justify-between px-4 py-2.5"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(6,182,212,0.03)" }}
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: "rgba(239,68,68,0.45)" }} />
              <div className="w-2 h-2 rounded-full" style={{ background: "rgba(251,191,36,0.45)" }} />
              <div className="w-2 h-2 rounded-full" style={{ background: "rgba(6,182,212,0.5)" }} />
            </div>
            <div className="w-px h-3 bg-white/10" />
            <span className="font-mono text-[10px] text-cyan-500/50">// sys.repo /</span>
            <span className="font-mono text-[10px] text-cyan-400/80">{slug}</span>
          </div>

          <div
            className="flex items-center gap-1.5 rounded-full px-2.5 py-1"
            style={{
              border: `1px solid ${statusCfg.color}35`,
              background: `${statusCfg.color}10`,
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{
                background: statusCfg.dot,
                color: statusCfg.dot,
                boxShadow: `0 0 6px 1px ${statusCfg.glow}`,
                animation: status === "LIVE" ? "card-status-pulse 1.8s ease-in-out infinite" : undefined,
              }}
            />
            <span className="font-mono text-[9px] font-bold tracking-widest" style={{ color: statusCfg.color }}>
              {status}
            </span>
          </div>
        </div>

        {/* ── Cover image ─────────────────────────────────────── */}
        <div className="relative h-40 overflow-hidden" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
          <img
            src={coverImage ?? "https://placehold.co/1200x700/080b14/00e5ff?text=Project+Preview"}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ filter: "brightness(0.75) saturate(1.1)" }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(8,11,20,0.85))" }}
          />
          {hovered && (
            <div
              className="absolute left-0 right-0 h-[1px] pointer-events-none"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.7), transparent)",
                animation: "card-scan 1.8s linear infinite",
              }}
            />
          )}
        </div>

        {/* ── Card body ───────────────────────────────────────── */}
        <div className="flex flex-col flex-1 p-5 gap-4">

          <h3
            className="text-xl font-black text-white leading-tight"
            style={{ textShadow: hovered ? "0 0 20px rgba(6,182,212,0.3)" : "none", transition: "text-shadow 0.3s" }}
          >
            {title}
          </h3>

          <p className="font-mono text-[12px] leading-6 text-slate-400 flex-1">
            {description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-md px-2 py-0.5 font-mono text-[10px] tracking-wide"
                style={{
                  background: "rgba(6,182,212,0.06)",
                  border: "1px solid rgba(6,182,212,0.18)",
                  color: "#22d3ee",
                }}
              >
                <span style={{ opacity: 0.4 }}>//</span> {tech}
              </span>
            ))}
          </div>

          <ProjectReactions projectId={projectId} />

          <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.15), transparent)" }} />

          <div className="flex gap-2.5">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className="group/btn relative flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-mono text-[11px] font-bold tracking-widest overflow-hidden transition-all duration-200"
                style={{
                  background: "rgba(6,182,212,0.08)",
                  border: "1px solid rgba(6,182,212,0.3)",
                  color: "#22d3ee",
                  clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background  = "rgba(6,182,212,0.16)";
                  el.style.borderColor = "rgba(6,182,212,0.6)";
                  el.style.boxShadow   = "0 0 20px -4px rgba(6,182,212,0.4)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background  = "rgba(6,182,212,0.08)";
                  el.style.borderColor = "rgba(6,182,212,0.3)";
                  el.style.boxShadow   = "none";
                }}
              >
                <span
                  className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.12), transparent)",
                    transition: "transform 0.6s ease",
                  }}
                />
                <span className="relative z-10">DEPLOY_PREVIEW</span>
                <svg className="relative z-10 w-3 h-3 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" fill="none" viewBox="0 0 10 10">
                  <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            )}

            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="group/btn flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-mono text-[11px] tracking-widest transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  color: "#64748b",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = "rgba(99,102,241,0.4)";
                  el.style.color       = "#818cf8";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = "rgba(255,255,255,0.07)";
                  el.style.color       = "#64748b";
                }}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                SOURCE
              </a>
            )}
          </div>

        </div>
      </div>
    </>
  );
}