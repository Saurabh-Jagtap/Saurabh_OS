"use client";

import JourneyCard from "../journey/JourneyCard";
import { JOURNEY_MILESTONES } from "../journey/journey-data";

export default function JourneySection() {
  return (
    <section
      id="journey"
      className="pointer-events-none relative overflow-hidden py-28"
    >
      {/* ── Global CSS for this section ───────────────────────────── */}
      <style>{`

        /* ── Scroll reveal ── */
        .journey-card-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition:
            opacity  0.55s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        .journey-card-reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Trace-line energy pulse ── */
        @keyframes tracePulse {
          0%   { top: -60px; opacity: 0;   }
          8%   { opacity: 0.9; }
          90%  { opacity: 0.7; }
          100% { top: 100%;   opacity: 0;  }
        }
        .trace-pulse {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          height: 60px;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(6, 182, 212, 0.8),
            rgba(99, 102, 241, 0.6),
            transparent
          );
          filter: blur(1px);
          animation: tracePulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          pointer-events: none;
        }

        /* ── Section header reveal ── */
        @keyframes hdrReveal {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .hdr-reveal { animation: hdrReveal 0.7s cubic-bezier(0.16,1,0.3,1) both; }
        .hdr-reveal-delay-1 { animation-delay: 0.1s; }
        .hdr-reveal-delay-2 { animation-delay: 0.2s; }
        .hdr-reveal-delay-3 { animation-delay: 0.32s; }

        /* ── Glitch on heading "Engineer" ── */
        .journey-glitch {
          position: relative;
          display: inline-block;
          color: #e0f2fe;
          text-shadow: 0 0 22px rgba(6,182,212,0.3);
        }
        .journey-glitch::before,
        .journey-glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          opacity: 0.85;
        }
        .journey-glitch::before {
          color: #0ef;
          z-index: -1;
          animation: jg1 7s infinite linear alternate-reverse;
        }
        .journey-glitch::after {
          color: #6366f1;
          z-index: -2;
          animation: jg2 7s infinite linear alternate-reverse;
        }
        @keyframes jg1 {
          0%,87%{ clip-path:inset(100% 0 0 0); transform:translate(0,0); }
          89%   { clip-path:inset(18% 0 65% 0); transform:translate(-3px,1px); }
          91%   { clip-path:inset(55% 0 18% 0); transform:translate(3px,-1px); }
          93%   { clip-path:inset(100% 0 0 0); transform:translate(0,0); }
        }
        @keyframes jg2 {
          0%,87%{ clip-path:inset(100% 0 0 0); transform:translate(0,0); }
          88%   { clip-path:inset(8% 0 58% 0); transform:translate(3px,-1px); }
          90%   { clip-path:inset(48% 0 22% 0); transform:translate(-3px,1px); }
          92%   { clip-path:inset(100% 0 0 0); transform:translate(0,0); }
        }

        /* ── Present-day banner pulse ring ── */
        @keyframes presRing {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(2.2); opacity: 0;   }
        }
        .pres-ring {
          animation: presRing 2s ease-out infinite;
        }
      `}
      </style>

      {/* ── Content ───────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-3xl px-8">

        {/* ─────────────────────── Section header ──────────────────── */}
        <div className="mb-20 text-center">

          {/* Pre-label */}
          <div className="pointer-events-auto hdr-reveal mb-5 inline-flex items-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-500/40" />
            <span className="font-mono text-[10px] tracking-[0.22em] text-slate-600 uppercase">
              // [SYS.JOURNEY_LOG]
            </span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-cyan-500/40" />
          </div>

          {/* Tag pill */}
          <div className="pointer-events-auto hdr-reveal hdr-reveal-delay-1 mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/[0.06] px-4 py-1.5 backdrop-blur-sm">
            <span
              className="h-1.5 w-1.5 rounded-full bg-cyan-400"
              style={{ boxShadow: "0 0 8px 3px rgba(34,211,238,0.45)", animation: "pulse 2s ease infinite" }}
            />
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-cyan-400">
              🗓 Journey
            </span>
          </div>

          {/* Heading */}
          <h2 className="hdr-reveal hdr-reveal-delay-2 mb-4 text-[clamp(2.6rem,6vw,4.5rem)] font-black leading-[0.95] tracking-tight">
            <span className="block text-slate-400 text-[clamp(1rem,2.5vw,1.4rem)] font-semibold tracking-normal mb-2">
              Developer
            </span>
            <span className="text-slate-300">→</span>
            <span>&nbsp;</span>
            <span className="journey-glitch" data-text="Engineer">
              Engineer
            </span>
          </h2>

          {/* Sub */}
          <p className="hdr-reveal hdr-reveal-delay-3 font-mono text-[12px] text-slate-500">
            Every milestone shaped the next one. No shortcuts. Just reps.
          </p>

          {/* Decorative divider with commit count */}
          <div className="pointer-events-auto mt-8 flex items-center justify-center gap-4">
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-white/[0.06]" />
            <span className="font-mono text-[9px] tracking-[0.2em] text-slate-700 uppercase">
              {JOURNEY_MILESTONES.length} commits · 1 branch
            </span>
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-white/[0.06]" />
          </div>
        </div>

        {/* ─────────────────────── Timeline ─────────────────────────── */}
        <div className="relative pl-[52px]">

          {/* Backbone trace line */}
          <div
            aria-hidden
            className="absolute left-[19px] top-0 bottom-0 w-px overflow-hidden"
            style={{ background: "rgba(99,102,241,0.12)" }}
          >
            {/* Dashed overlay */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "repeating-linear-gradient(to bottom, rgba(99,102,241,0.25) 0px, rgba(99,102,241,0.25) 6px, transparent 6px, transparent 14px)",
              }}
            />
            {/* Traveling energy pulse */}
            <div className="trace-pulse" />
          </div>

          {/* Cards */}
          {JOURNEY_MILESTONES.map((milestone, i) => (
            <JourneyCard
              key={milestone.sysId}
              milestone={milestone}
              index={i}
            />
          ))}
        </div>

        {/* ─────────────────────── Present Day Banner ──────────────── */}
        <div
          className="pointer-events-auto mt-10 relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-zinc-950/60 p-6 backdrop-blur-md"
          style={{ boxShadow: "0 0 30px rgba(16,185,129,0.06)" }}
        >
          {/* Corner brackets */}
          <span aria-hidden style={{ position:"absolute",top:0,left:0,width:10,height:10,borderTop:"1px solid rgba(16,185,129,0.35)",borderLeft:"1px solid rgba(16,185,129,0.35)" }} />
          <span aria-hidden style={{ position:"absolute",top:0,right:0,width:10,height:10,borderTop:"1px solid rgba(16,185,129,0.35)",borderRight:"1px solid rgba(16,185,129,0.35)" }} />
          <span aria-hidden style={{ position:"absolute",bottom:0,left:0,width:10,height:10,borderBottom:"1px solid rgba(16,185,129,0.35)",borderLeft:"1px solid rgba(16,185,129,0.35)" }} />
          <span aria-hidden style={{ position:"absolute",bottom:0,right:0,width:10,height:10,borderBottom:"1px solid rgba(16,185,129,0.35)",borderRight:"1px solid rgba(16,185,129,0.35)" }} />

          <div className="flex items-start gap-4">
            {/* Pulsing node */}
            <div className="relative flex-shrink-0 mt-0.5">
              <div className="h-3 w-3 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 8px 2px rgba(52,211,153,0.5)" }} />
              <div className="pres-ring absolute inset-0 rounded-full bg-emerald-400/30" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-500">
                  // present.day
                </span>
                <span className="font-mono text-[9px] text-slate-700">SYS.STATUS: ACTIVE</span>
              </div>
              <div className="font-bold text-[15px] text-slate-100 mb-1">
                Still learning. Still building. Still shipping.
              </div>
              <div className="font-mono text-[11px] text-slate-500">
                Developer → Engineer · Continuing Web Dev Cohort · Documenting everything
              </div>

              {/* Bottom metadata row */}
              <div className="mt-4 flex flex-wrap items-center gap-4">
                {[
                  { label: "streak",   val: "140 days",     color: "text-cyan-400"    },
                  { label: "mission",  val: "SaurabhOS",   color: "text-indigo-400"  },
                  { label: "focus",    val: "System Design", color: "text-violet-400" },
                ].map(({ label, val, color }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <span className="font-mono text-[9px] text-slate-700 uppercase tracking-widest">{label}:</span>
                    <span className={`font-mono text-[10px] font-semibold ${color}`}>{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: last commit indicator */}
            <div className="ml-auto flex-shrink-0 hidden sm:flex flex-col items-end gap-1">
              <span className="font-mono text-[9px] text-slate-700 uppercase tracking-widest">last commit</span>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" style={{ animation: "pulse 2s ease infinite" }} />
                <span className="font-mono text-[10px] text-emerald-500">today</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom HUD strip ───────────────────────────────────────── */}
        <div
          aria-hidden
          className="mt-12 flex items-center justify-between border-t border-white/[0.04] pt-6"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-800">
            saurabh@os:~/journey
          </span>
          <div className="flex items-center gap-2">
            {[5, 8, 6, 11, 7, 9, 5].map((h, i) => (
              <div
                key={i}
                className="w-0.5 rounded-full bg-indigo-500/20"
                style={{ height: h, alignSelf: "flex-end" }}
              />
            ))}
            <span className="ml-1 font-mono text-[9px] text-slate-800 uppercase tracking-widest">
              TRACE ACTIVE
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}