"use client";

import { useEffect, useRef } from "react";
import { type JourneyMilestone, COLOR_MAP } from "./journey-data";

// ─── Corner bracket (shared design token) ─────────────────────────
function Corner({
  pos,
  color,
}: {
  pos: "tl" | "tr" | "bl" | "br";
  color: string; // rgba or CSS color string
}) {
  const styles: Record<string, React.CSSProperties> = {
    tl: { top: 0, left: 0, borderTop: `1px solid ${color}`, borderLeft: `1px solid ${color}` },
    tr: { top: 0, right: 0, borderTop: `1px solid ${color}`, borderRight: `1px solid ${color}` },
    bl: { bottom: 0, left: 0, borderBottom: `1px solid ${color}`, borderLeft: `1px solid ${color}` },
    br: { bottom: 0, right: 0, borderBottom: `1px solid ${color}`, borderRight: `1px solid ${color}` },
  };
  return (
    <span
      aria-hidden
      style={{ position: "absolute", width: 10, height: 10, pointerEvents: "none", ...styles[pos] }}
    />
  );
}

// ─── Scroll-reveal hook (IO, no state, no re-render) ──────────────
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect(); // once: true
        }
      },
      { threshold }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return ref;
}

// ─── Stack chip ───────────────────────────────────────────────────
function StackChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-cyan-500/20 bg-cyan-950/30 px-2.5 py-0.5 font-mono text-[10px] text-cyan-300 backdrop-blur-sm">
      <span className="text-cyan-600/60">//</span>
      {label}
    </span>
  );
}

// ─── Main card ────────────────────────────────────────────────────
export default function JourneyCard({
  milestone,
  index,
}: {
  milestone: JourneyMilestone;
  index: number;
}) {
  const ref = useReveal();
  const c = COLOR_MAP[milestone.tagColor];

  // Stagger reveal delay by index (capped at 400ms so late items aren't too slow)
  const staggerMs = Math.min(index * 60, 400);

  return (
    /*
     * Outer wrapper: handles the reveal animation.
     * Starts invisible + shifted down. IO adds `is-visible` → CSS
     * transitions take over (no JS on every frame).
     *
     * pointer-events-auto: overrides the section's p-e-none shell
     * so the card is interactive.
     */
    <div
      ref={ref}
      className="journey-card-reveal pointer-events-auto relative mb-6 last:mb-0"
      style={{ transitionDelay: `${staggerMs}ms` }}
    >
      {/* ── Timeline node + horizontal connector ─────────────────── */}
      <div
        aria-hidden
        className="absolute -left-[52px] top-5 flex items-center"
      >
        {/* Glowing node circle */}
        <div
          className={`relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border text-base ${c.nodeBg} ${c.nodeRing}`}
          style={{ boxShadow: `0 0 14px 2px ${c.glow}` }}
        >
          {milestone.active && (
            <span
              className="absolute inset-0 rounded-full animate-ping opacity-30"
              style={{ background: c.glow }}
            />
          )}
          <span className="relative z-10">{milestone.icon}</span>
        </div>

        {/* Horizontal PCB trace to card */}
        <div
          className="h-px w-[14px] flex-shrink-0"
          style={{
            background: `linear-gradient(90deg, ${c.glow}, rgba(255,255,255,0.08))`,
          }}
        />
      </div>

      {/* ── Main glass card ───────────────────────────────────────── */}
      <div
        className={`
          group relative overflow-hidden rounded-2xl
          border border-white/[0.06] hover:border-white/[0.12]
          bg-zinc-950/50 backdrop-blur-md
          border-l-2 ${c.border}
          transition-all duration-300
          ${milestone.active ? "shadow-[0_0_30px_rgba(99,102,241,0.08)]" : ""}
          ${milestone.failure ? "shadow-[0_0_20px_rgba(239,68,68,0.05)]" : ""}
        `}
      >
        {/* Corner brackets */}
        <Corner pos="tl" color={`${c.glow.replace("0.5", "0.4")}`} />
        <Corner pos="br" color={`${c.glow.replace("0.5", "0.2")}`} />

        {/* Active pulsing border glow */}
        {milestone.active && (
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ boxShadow: "inset 0 0 30px rgba(99,102,241,0.07)" }}
          />
        )}

        {/* ── Card header ─────────────────────────────────────────── */}
        <div className="flex flex-col gap-3 border-b border-white/[0.05] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1 min-w-0">
            {/* Sys-log prefix row */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-[9px] tracking-[0.2em] text-slate-700 uppercase">
                {milestone.sysId}
              </span>
              <span className="h-px flex-1 max-w-[40px] bg-gradient-to-r from-white/10 to-transparent" />
              <span className="font-mono text-[9px] tracking-[0.15em] text-slate-600">
                {milestone.timestamp}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-[15px] font-bold leading-tight text-slate-100">
              {milestone.title}
            </h3>

            {/* Subtitle */}
            <p className="font-mono text-[11px] text-slate-500">
              {milestone.subtitle}
            </p>
          </div>

          {/* Tag badge */}
          <div
            className={`flex-shrink-0 self-start sm:self-center rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-wider ${c.tag}`}
          >
            {milestone.tag}
          </div>
        </div>

        {/* ── Card body ────────────────────────────────────────────── */}
        <div className="p-5 space-y-4">

          {/* Bullet achievements */}
          <div className="space-y-2">
            {milestone.bullets.map((bullet) => (
              <div
                key={bullet}
                className="flex items-start gap-2.5 font-mono text-[12px] leading-6 text-slate-400"
              >
                <span className={`mt-0.5 flex-shrink-0 text-base leading-none ${c.bullet}`}>
                  ›
                </span>
                {bullet}
              </div>
            ))}
          </div>

          {/* Rank badge */}
          {milestone.rank && (
            <div className="inline-flex items-center gap-2 rounded-lg border border-amber-500/20 bg-amber-500/[0.08] px-3 py-2 font-mono text-[11px] text-amber-400">
              {milestone.rank}
            </div>
          )}

          {/* Stack chips */}
          {milestone.stack && milestone.stack.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {milestone.stack.map((chip) => (
                <StackChip key={chip} label={chip} />
              ))}
            </div>
          )}

          {/* Key learning block */}
          <div
            className={`relative overflow-hidden rounded-r-lg border border-l-2 ${c.border} ${c.learningBorder} ${c.learningBg} p-4`}
          >
            <Corner pos="tl" color={c.glow.replace("0.5", "0.3")} />

            <div className={`mb-1.5 font-mono text-[9px] uppercase tracking-[0.2em] ${c.learningText}`}>
              // key.learning
            </div>
            <p className={`font-mono text-[12px] italic leading-6 ${c.learningText} opacity-80`}>
              &ldquo;{milestone.learning}&rdquo;
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}