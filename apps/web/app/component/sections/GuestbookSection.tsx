"use client";

// GuestbookSection.tsx
// ═══════════════════════════════════════════════════════════════════
// DESIGN ONLY changes — zero logic changes.
// • Palette shifted from emerald-dominant to cyan + indigo (site theme)
// • Background, grid, orbs: matches HeroSection / ContactSection
// • Section header: glitch treatment on "Channel" heading
// • Stat cards, divider, loading state: all visual updates only
// • All IntersectionObserver, trpc queries, counters: UNTOUCHED
// ═══════════════════════════════════════════════════════════════════

import GuestbookEntry from "../guestbook/GuestbookEntry";
import GuestbookForm  from "../guestbook/GuestbookForm";
import { trpc }       from "~/trpc/client";
import { useEffect, useRef, useState } from "react";

// ─── Animated counter hook (UNTOUCHED) ───────────────────────────
function useCounter(target: number, duration = 900, active = false) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active || target === 0) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setN(Math.round(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return n;
}

// ─── Stat card (design updated, logic untouched) ──────────────────
function StatCard({
  value,
  label,
  accentColor,
  accentBorder,
  accentBg,
  animated = false,
  visible  = false,
}: {
  value: string | number;
  label: string;
  accentColor: string;
  accentBorder: string;
  accentBg: string;
  animated?: boolean;
  visible?: boolean;
}) {
  const numericTarget  = animated && typeof value === "number" ? value : 0;
  const count          = useCounter(numericTarget, 900, visible && animated);
  const displayValue   = animated && typeof value === "number" ? count : value;

  return (
    <div
      className="relative overflow-hidden rounded-2xl p-5 flex flex-col items-center justify-center gap-1 group transition-all duration-300"
      style={{
        border: `1px solid ${accentBorder}`,
        background: accentBg,
        backdropFilter: "blur(10px)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 28px -8px ${accentColor}60`;
        (e.currentTarget as HTMLDivElement).style.borderColor = accentColor + "55";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        (e.currentTarget as HTMLDivElement).style.borderColor = accentBorder;
      }}
    >
      {/* Crosshair — top left */}
      <div aria-hidden className="absolute top-2 left-2 w-3 h-3 pointer-events-none">
        <div className="absolute top-1/2 left-0 right-0 h-px" style={{ background: accentColor, opacity: 0.25 }} />
        <div className="absolute left-1/2 top-0 bottom-0 w-px" style={{ background: accentColor, opacity: 0.25 }} />
      </div>

      {/* Corner glow on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-6 -right-6 w-16 h-16 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle, ${accentColor}20, transparent 70%)` }}
      />

      <div
        className="text-3xl font-black tabular-nums"
        style={{ color: accentColor, textShadow: `0 0 20px ${accentColor}55` }}
      >
        {displayValue}
      </div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-slate-600">
        {label}
      </div>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────
export default function GuestbookSection() {
  // ── ALL ORIGINAL LOGIC BELOW (UNTOUCHED) ─────────────────────
  const { data: entries, isLoading } = trpc.guestbook.getEntries.useQuery({ limit: 3 });

  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e?.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="guestbook"
      className="pointer-events-none relative overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* ── Keyframes ────────────────────────────────────────────── */}
      <style>{`
        @keyframes gb-fadein {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes gb-pulse-dot {
          0%,100% { opacity: 1; transform: scale(1);   }
          50%     { opacity: .5; transform: scale(.8); }
        }
        @keyframes gb-breathe {
          0%,100% { opacity: .6; }
          50%     { opacity: 1;  }
        }
        @keyframes gb-spark {
          0%   { left: -10%; opacity: 0;  }
          8%   { opacity: 1;              }
          42%  { left: 110%; opacity: 0;  }
          100% { left: 110%; opacity: 0;  }
        }
        @keyframes gbBar {
          from { transform: scaleY(.4); opacity: .4; }
          to   { transform: scaleY(1.2); opacity: 1; }
        }
        .gb-glitch { position:relative; display:inline-block; color:#e0f2fe; text-shadow:0 0 20px rgba(6,182,212,.3); }
        .gb-glitch::before,.gb-glitch::after { content:attr(data-text); position:absolute; top:0; left:0; width:100%; height:100%; opacity:.85; }
        .gb-glitch::before { color:#0ef; z-index:-1; animation:gbG1 6s infinite linear alternate-reverse; }
        .gb-glitch::after  { color:#6366f1; z-index:-2; animation:gbG2 6s infinite linear alternate-reverse; }
        @keyframes gbG1 {
          0%,85%{ clip-path:inset(100% 0 0 0); transform:translate(0,0); }
          87%   { clip-path:inset(18% 0 68% 0); transform:translate(-3px,1px); }
          89%   { clip-path:inset(52% 0 18% 0); transform:translate(3px,-1px); }
          91%   { clip-path:inset(100% 0 0 0); transform:translate(0,0); }
        }
        @keyframes gbG2 {
          0%,85%{ clip-path:inset(100% 0 0 0); transform:translate(0,0); }
          86%   { clip-path:inset(8% 0 58% 0); transform:translate(3px,-1px); }
          88%   { clip-path:inset(46% 0 22% 0); transform:translate(-3px,1px); }
          90%   { clip-path:inset(100% 0 0 0); transform:translate(0,0); }
        }
      `}</style>

      {/* ── Spark border — top edge (matches Navbar/Footer) ─────── */}
      <div aria-hidden className="pointer-events-none absolute top-0 inset-x-0 h-px overflow-hidden">
        <div style={{
          position: "absolute", top: 0, width: 80, height: 1,
          background: "linear-gradient(90deg, transparent, #22d3ee, #fff, transparent)",
          boxShadow: "0 0 10px 2px rgba(6,182,212,0.6)",
          animation: "gb-spark 5s 1.5s cubic-bezier(.4,0,.6,1) infinite",
        }} />
      </div>

      {/* ── Right scan bar ─────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 right-6 hidden xl:flex flex-col items-center gap-1 select-none"
      >
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
        <div
          className="w-1.5 h-1.5 rounded-full bg-cyan-400"
          style={{ boxShadow: "0 0 10px 2px rgba(6,182,212,0.4)", animation: "gb-breathe 2s ease-in-out infinite" }}
        />
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
        <span className="font-mono text-[9px] text-slate-700 tracking-[0.2em] uppercase">LOG</span>
      </div>

      {/* ══ Main content ══════════════════════════════════════════ */}
      <div className="pointer-events-auto relative z-10 mx-auto max-w-5xl px-8 py-24">

        {/* ══ HEADER ════════════════════════════════════════════════ */}
        <div
          className="mb-14"
          style={{ opacity: visible ? 1 : 0, animation: visible ? "gb-fadein 0.5s ease both" : "none" }}
        >
          {/* Meta row */}
          <div className="flex items-center gap-3 mb-5">
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5"
              style={{ border: "1px solid rgba(6,182,212,0.2)", background: "rgba(6,182,212,0.06)" }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#22d3ee", boxShadow: "0 0 6px 2px rgba(6,182,212,0.5)", animation: "gb-pulse-dot 1.8s ease-in-out infinite" }}
              />
              <span className="font-mono text-[10px] text-cyan-400 tracking-widest uppercase">
                SYS_ACTIVE
              </span>
            </div>
            <div className="h-px w-16" style={{ background: "linear-gradient(90deg, rgba(6,182,212,0.35), transparent)" }} />
            <span className="font-mono text-[10px] text-slate-600">// [VISITOR_LOG_OPEN]</span>
          </div>

          {/* Title + entry count */}
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              {/* Pre-tag */}
              <div className="flex items-center gap-2.5 mb-4">
                <span className="font-mono text-[10px] tracking-[0.2em] text-slate-600 uppercase">
                  // [OPEN_CHANNEL]
                </span>
                <span className="h-px w-10 bg-gradient-to-r from-cyan-500/40 to-transparent" />
              </div>

              <h2 className="text-[clamp(2.4rem,5vw,4rem)] font-black leading-none tracking-tight mb-3">
                <span className="block text-slate-400 text-[clamp(1rem,2.5vw,1.2rem)] font-semibold tracking-normal mb-2">
                  Open
                </span>
                <span className="gb-glitch" data-text="Channel">Channel</span>
              </h2>
              <p className="font-mono text-[12px] text-slate-500">
                // Thoughts on the portfolio, journey, or anything you'd like to share
              </p>
            </div>

            {/* Entry count badge */}
            <div
              className="flex items-center gap-2.5 rounded-xl px-4 py-2.5 flex-shrink-0"
              style={{ border: "1px solid rgba(6,182,212,0.15)", background: "rgba(6,182,212,0.05)" }}
            >
              <span className="font-mono text-[9px] text-slate-600 uppercase tracking-widest">TOTAL_ENTRIES</span>
              <span className="font-mono text-sm font-black text-cyan-400" style={{ textShadow: "0 0 14px rgba(6,182,212,0.4)" }}>
                {entries?.length ?? "—"}
              </span>
            </div>
          </div>

          {/* Rule */}
          <div className="mt-8 flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(6,182,212,0.25), rgba(99,102,241,0.12), transparent)" }} />
            <span className="font-mono text-[9px] text-slate-700 tracking-widest">EOF_HEADER</span>
          </div>
        </div>

        {/* ══ FORM ══════════════════════════════════════════════════ */}
        <div style={{ opacity: visible ? 1 : 0, animation: visible ? "gb-fadein 0.5s 0.1s ease both" : "none" }}>
          <GuestbookForm />
        </div>

        {/* ══ DIVIDER ═══════════════════════════════════════════════ */}
        <div
          className="my-10 flex items-center gap-4"
          style={{ opacity: visible ? 1 : 0, animation: visible ? "gb-fadein 0.5s 0.2s ease both" : "none" }}
        >
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.18))" }} />
          <div className="flex items-center gap-2">
            <svg width="60" height="10" viewBox="0 0 60 10" fill="none">
              <path d="M0 5 H60" stroke="rgba(6,182,212,0.2)" strokeWidth="1" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.2s" repeatCount="indefinite" />
              </path>
            </svg>
            <span className="font-mono text-[10px] uppercase tracking-widest text-slate-600">RECENT_ENTRIES</span>
            <svg width="60" height="10" viewBox="0 0 60 10" fill="none">
              <path d="M0 5 H60" stroke="rgba(6,182,212,0.2)" strokeWidth="1" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.2s" repeatCount="indefinite" />
              </path>
            </svg>
          </div>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(6,182,212,0.18), transparent)" }} />
        </div>

        {/* ══ ENTRIES LIST ══════════════════════════════════════════ */}
        <div className="space-y-3">

          {/* Loading state */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <div className="flex gap-1 items-end">
                {[4,7,5,9,6,8,4].map((h, i) => (
                  <div
                    key={i}
                    className="w-0.5 rounded-full"
                    style={{
                      height: h * 3,
                      background: i % 2 === 0 ? "#22d3ee" : "#818cf8",
                      opacity: 0.5,
                      animation: `gbBar ${1 + i * 0.15}s ease-in-out infinite`,
                    }}
                  />
                ))}
              </div>
              <span className="font-mono text-[11px] text-slate-600 tracking-widest">LOADING_ENTRIES...</span>
            </div>
          )}

          {/* Empty state */}
          {!isLoading && entries?.length === 0 && (
            <div
              className="flex flex-col items-center justify-center py-16 gap-3 rounded-2xl"
              style={{ border: "1px dashed rgba(6,182,212,0.1)", background: "rgba(6,182,212,0.01)" }}
            >
              <span className="font-mono text-sm text-slate-700">NO_ENTRIES_YET</span>
              <span className="font-mono text-[11px] text-slate-700">// Be the first to leave a message</span>
            </div>
          )}

          {/* Entry cards */}
          {entries?.map((entry, i) => (
            <div
              key={entry.id}
              style={{
                opacity:   visible ? 1 : 0,
                animation: visible ? `gb-fadein 0.45s ${0.3 + i * 0.08}s ease both` : "none",
              }}
            >
              <GuestbookEntry
                id={entry.id}
                visitorId={entry.visitorId}
                name={entry.name}
                message={entry.message}
                createdAt={new Date(entry.createdAt).toLocaleString()}
              />
            </div>
          ))}
        </div>

        {/* ── Bottom HUD strip ─────────────────────────────────────── */}
        <div className="mt-12 flex items-center justify-between border-t border-white/[0.04] pt-6">
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-800">
            saurabh@os:~/guestbook
          </span>
          <div className="flex items-center gap-2">
            {[5,8,6,11,7,9,5].map((h, i) => (
              <div key={i} className="w-0.5 rounded-full bg-cyan-500/20" style={{ height: h, alignSelf: "flex-end" }} />
            ))}
            <span className="ml-1 font-mono text-[9px] text-slate-800 uppercase tracking-widest">LOG ACTIVE</span>
          </div>
        </div>

      </div>
    </section>
  );
}