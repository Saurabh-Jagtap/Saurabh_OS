"use client";

import {
  useState,
  useEffect,
  useRef,
} from "react";

import { CornerBracket } from "../contact/CornerBracket";
import { CHANNELS } from "../contact/contact-data";
import { ChannelCard } from "../contact/ContactChannel";
import { ContactTerminal } from "../contact/ContactTerminal";

// ─── Intersection Observer reveal hook ────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export default function ContactSection() {
  const { ref, visible } = useReveal(0.1);

  // Stagger for header
  const [headingReady, setHeadingReady] = useState(false);
  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setHeadingReady(true), 80);
      return () => clearTimeout(t);
    }
  }, [visible]);

  return (
    <section
      ref={ref}
      className="pointer-events-none relative overflow-hidden py-28"
    >
      {/* ── Global styles (glitch + custom scrollbar) ─────────────── */}
      <style>{`
        .contact-glitch {
          position: relative;
          display: inline-block;
          color: #e0f2fe;
          text-shadow: 0 0 20px rgba(6,182,212,0.35);
        }
        .contact-glitch::before,
        .contact-glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          opacity: 0.85;
        }
        .contact-glitch::before {
          color: #0ef;
          z-index: -1;
          animation: cg1 6s infinite linear alternate-reverse;
        }
        .contact-glitch::after {
          color: #6366f1;
          z-index: -2;
          animation: cg2 6s infinite linear alternate-reverse;
        }
        @keyframes cg1 {
          0%,85%  { clip-path: inset(100% 0 0 0); transform: translate(0,0); }
          87% { clip-path: inset(20% 0 70% 0); transform: translate(-3px, 1px); }
          89% { clip-path: inset(60% 0 15% 0); transform: translate(3px,-1px); }
          91% { clip-path: inset(40% 0 40% 0); transform: translate(-3px, 2px); }
          93% { clip-path: inset(100% 0 0 0); transform: translate(0,0); }
        }
        @keyframes cg2 {
          0%,85%  { clip-path: inset(100% 0 0 0); transform: translate(0,0); }
          86% { clip-path: inset(10% 0 60% 0); transform: translate(3px,-1px); }
          88% { clip-path: inset(50% 0 20% 0); transform: translate(-3px, 2px); }
          90% { clip-path: inset(70% 0 10% 0); transform: translate(3px, 1px); }
          92% { clip-path: inset(100% 0 0 0); transform: translate(0,0); }
        }
      `}</style>

      {/* ── Decorative: right-edge scan line ─────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-8 top-1/4 hidden xl:flex flex-col items-center gap-1 select-none"
      >
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
        <div
          className="h-1.5 w-1.5 rounded-full bg-cyan-400/40"
          style={{ boxShadow: "0 0 8px 2px rgba(34,211,238,0.25)" }}
        />
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
        <span className="font-mono text-[9px] tracking-[0.2em] text-slate-700 uppercase">SYS</span>
      </div>

      {/* ── Content ───────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-6xl px-8">

        {/* ── Section header ─────────────────────────────────────── */}
        <div className="mb-16 text-center">

          {/* Pre-label */}
          <div
            className="mb-5 inline-flex items-center gap-2.5"
            style={{
              opacity: headingReady ? 1 : 0,
              transform: headingReady ? "translateY(0)" : "translateY(-8px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500/40" />
            <span className="font-mono text-[11px] tracking-[0.2em] text-slate-600 uppercase">
              // [OPEN_CHANNEL]
            </span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500/40" />
          </div>

          {/* Tag */}
          <div
            className="pointer-events-auto mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/[0.06] px-4 py-1.5 backdrop-blur-sm"
            style={{
              opacity: headingReady ? 1 : 0,
              transform: headingReady ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.5s ease 80ms, transform 0.5s ease 80ms",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse"
              style={{ boxShadow: "0 0 8px 3px rgba(34,211,238,0.4)" }}
            />
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-cyan-400">
              📡 Contact
            </span>
          </div>

          {/* Heading */}
          <h2
            className="mb-4 text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[0.95] tracking-tight"
            style={{
              opacity: headingReady ? 1 : 0,
              transform: headingReady ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.6s ease 160ms, transform 0.6s ease 160ms",
            }}
          >
            <span className="block text-slate-400 text-[clamp(1rem,2.5vw,1.4rem)] font-semibold tracking-normal mb-2">
              Initialize
            </span>
            <span
              className="contact-glitch"
              data-text="Connection"
            >
              Connection
            </span>
          </h2>

          {/* Sub */}
          <p
            className="font-mono text-sm text-slate-500"
            style={{
              opacity: headingReady ? 1 : 0,
              transition: "opacity 0.5s ease 240ms",
            }}
          >
            Whether it's an opportunity, collaboration, or just a ping — I'm listening.
          </p>
        </div>

        {/* ── Two-column layout ──────────────────────────────────── */}
        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">

          {/* ── Left column ──────────────────────────────────────── */}
          <div className="space-y-5">

            {/* Channels panel */}
            <div
              className="relative overflow-hidden rounded-2xl border border-white/[0.05] bg-zinc-950/60 p-5 backdrop-blur-md"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-20px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              <CornerBracket pos="tl" color="border-indigo-500/30" />
              <CornerBracket pos="br" color="border-indigo-500/30" />

              <div className="mb-5 flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-600">
                  <span className="text-indigo-400">&gt;_</span> contact.channels
                </span>
                <div className="ml-auto h-px flex-1 max-w-[60px] bg-gradient-to-r from-indigo-500/20 to-transparent" />
              </div>

              <div className="space-y-2.5">
                {CHANNELS.map((ch, i) => (
                  <ChannelCard
                    key={ch.label}
                    {...ch}
                    delay={i * 80}
                    visible={visible}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* ── Right column ─────────────────────────────────────── */}
          <div className="space-y-5">
            {/* <ContactForm visible={visible} /> */}
            <ContactTerminal visible={visible} />
          </div>
        </div>

        {/* ── Bottom HUD strip ───────────────────────────────────── */}
        <div
          className="mt-12 flex items-center justify-between border-t border-white/[0.04] pt-6"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 600ms",
          }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-700">
            saurabh@os:~/contact
          </span>
          <div className="flex items-center gap-3">
            {/* Mini heartbeat bars */}
            {[6, 10, 7, 13, 8, 11, 6].map((h, i) => (
              <div
                key={i}
                className="w-0.5 rounded-full bg-cyan-500/30"
                style={{
                  height: h,
                  alignSelf: "flex-end",
                  animationDelay: `${i * 120}ms`,
                }}
              />
            ))}
            <span className="font-mono text-[10px] text-slate-700 ml-1">
              SIGNAL ACTIVE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}