"use client";
import { useRef, useState, useEffect } from "react";
import { trpc } from "~/trpc/client";
import ProjectCard from "../project/ProjectCard";

// ─── Animated counter ─────────────────────────────────────────────
function useCounter(target: number, duration = 800, active = false) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active || target === 0) return;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setN(Math.round(p * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return n;
}

// ─── Stat pill ────────────────────────────────────────────────────
function StatPill({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div
      className="flex items-center gap-2 rounded-lg px-3 py-1.5"
      style={{ border: `1px solid ${color}30`, background: `${color}0a` }}
    >
      <div className="w-1 h-1 rounded-full" style={{ background: color, boxShadow: `0 0 4px 1px ${color}80` }} />
      <span className="font-mono text-[10px] text-slate-500">{label}</span>
      <span className="font-mono text-[10px] font-bold" style={{ color }}>{value}</span>
    </div>
  );
}

export default function ProjectsSection() {
  // ── All tRPC logic untouched ──────────────────────────────────
  const { data: projects, isLoading } = trpc.project.getFeaturedProjects.useQuery()

  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const projectCount = useCounter(projects?.length ?? 0, 700, visible && !isLoading);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e?.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
    >
      {/* ─── Keyframes ───────────────────────────────────────── */}
      <style>{`
        @keyframes ps-fadein {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ps-pulse-dot {
          0%, 100% { box-shadow: 0 0 0 0   rgba(34,211,238,0.6); }
          50%       { box-shadow: 0 0 0 5px rgba(34,211,238,0);   }
        }
        @keyframes ps-bar-breathe {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 1; }
        }
      `}</style>
      
      {/* ─── Right scan bar ──────────────────────────────────── */}
      <div className="absolute top-1/3 right-6 hidden xl:flex flex-col items-center gap-1 pointer-events-none select-none" aria-hidden>
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"
          style={{ boxShadow: "0 0 10px 2px rgba(34,211,238,0.4)", animation: "ps-bar-breathe 2s ease-in-out infinite" }} />
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
        <span className="font-mono text-[9px] text-slate-600 tracking-[0.2em] uppercase">REPOS</span>
      </div>

      {/* ─── Main content ────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-7xl px-8 py-24">

        {/* ══ HEADER ═══════════════════════════════════════════ */}
        <div
          className="mb-14"
          style={{
            opacity: visible ? 1 : 0,
            animation: visible ? "ps-fadein 0.5s ease both" : "none",
          }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1"
              style={{ border: "1px solid rgba(6,182,212,0.25)", background: "rgba(6,182,212,0.06)" }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                style={{ animation: "ps-pulse-dot 1.8s ease-in-out infinite" }}
              />
              <span className="font-mono text-[10px] text-cyan-400 tracking-widest uppercase">SYS_ACTIVE</span>
            </div>
            <div className="h-px w-12" style={{ background: "linear-gradient(90deg, rgba(6,182,212,0.4), transparent)" }} />
            <span className="font-mono text-[10px] text-slate-600">// [SYS_REPOS_LOADED]</span>
          </div>

          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h2 className="text-5xl font-black text-white leading-none mb-3">
                Actual{" "}
                <span style={{
                  background: "linear-gradient(90deg, #22d3ee, #818cf8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                  Work
                </span>
              </h2>
              <p className="font-mono text-[12px] text-slate-500">
                // Things I've built, shipped, and learned from
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <StatPill label="ACTIVE REPOS" value={`${projectCount}`} color="#22d3ee" />
              <StatPill label="ENV"           value="PRODUCTION"        color="#34d399" />
              <StatPill label="STACK"         value="MONOREPO"          color="#818cf8" />
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex-1 h-px" style={{
              background: "linear-gradient(90deg, rgba(6,182,212,0.3), rgba(99,102,241,0.15), transparent)"
            }} />
            <span className="font-mono text-[9px] text-slate-700 tracking-widest">████ EOF_HEADER</span>
          </div>
        </div>

        {/* ══ LOADING STATE ════════════════════════════════════ */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="flex gap-1 items-end">
              {[4,7,5,9,6,8,4,6].map((h, i) => (
                <div
                  key={i}
                  className="w-0.5 rounded-full"
                  style={{
                    height: h * 3,
                    background: i % 2 === 0 ? "rgba(6,182,212,0.5)" : "rgba(99,102,241,0.4)",
                    animation: `ps-bar-breathe ${1 + i * 0.13}s ease-in-out infinite`,
                  }}
                />
              ))}
            </div>
            <span className="font-mono text-xs text-slate-600 tracking-widest">FETCHING_REPOS...</span>
          </div>
        )}

        {/* ══ PROJECT GRID ═════════════════════════════════════ */}
        {!isLoading && (
          <div className="grid gap-5 md:grid-cols-3">
            {projects?.map((project, i) => (
              <ProjectCard
                key={project.id}
                projectId={project.id}
                title={project.title}
                description={project.description ?? ""}
                status={project.status}
                technologies={project.tech_stack}
                githubUrl={project.github_url}
                liveUrl={project.live_url}
                index={i}
              />
            ))}
          </div>
        )}

        {/* ══ BOTTOM HUD ═══════════════════════════════════════ */}
        <div
          className="mt-16 flex items-center justify-between"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.04)",
            paddingTop: "14px",
            opacity: visible ? 1 : 0,
            animation: visible ? "ps-fadein 0.5s 0.6s ease both" : "none",
          }}
        >
          <span className="font-mono text-[10px] text-slate-600">
            saurabh@os:~/projects$&nbsp;
            <span style={{ color: "#22d3ee" }}>ls -la --all</span>
          </span>
          <div className="flex items-center gap-3">
            <div className="flex gap-0.5 items-end">
              {[4,7,5,9,6,8,5,7].map((h, i) => (
                <div
                  key={i}
                  className="w-0.5 rounded-full"
                  style={{
                    height: h * 2,
                    background: i % 2 === 0 ? "rgba(6,182,212,0.4)" : "rgba(99,102,241,0.35)",
                    animation: `ps-bar-breathe ${1.2 + i * 0.15}s ease-in-out infinite`,
                  }}
                />
              ))}
            </div>
            <span className="font-mono text-[10px] text-cyan-500/60 tracking-widest uppercase">REGISTRY ACTIVE</span>
          </div>
        </div>

      </div>
    </section>
  );
}