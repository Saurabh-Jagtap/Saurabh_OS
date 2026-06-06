"use client";

import { useState, useEffect } from "react";
import {
FolderGit2, ArrowRight, ChevronRight
} from "lucide-react";
import Navbar from "../layout/Navbar";
import { BOOT_LINES, STACK } from "../hero/hero-data";
import SystemMetrics from "../hero/SystemMetrics";

// ─── Typing animation hook ─────────────────────────────────────────
function useTypedLines(lines: typeof BOOT_LINES) {
const [visible, setVisible] = useState<number[]>([]);

useEffect(() => {
    const timers = lines.map(({ delay }, i) =>
        setTimeout(() => setVisible((v) => [...v, i]), delay + 400)
    );
    return () => timers.forEach(clearTimeout);
}, []);

return visible;

}

// ─── Main component ────────────────────────────────────────────────
export default function HeroSection() {
const visibleLines = useTypedLines(BOOT_LINES);
const [cursorBlink, setCursorBlink] = useState(true);

useEffect(() => {
    const id = setInterval(() => setCursorBlink((b) => !b), 530);
    return () => clearInterval(id);
}, []);

return (
    <section className="pointer-events-none relative min-h-screen text-slate-100">
        
        {/* ── True CSS Glitch Animation Styles ────────────────────── */}
        <style>{`
            .glitch-text {
                position: relative;
                color: #e0f2fe; /* Electrifying bright cyan/white base */
                text-shadow: 0 0 20px rgba(6, 182, 212, 0.5); /* Ambient neon glow */
                font-weight: 900;
                z-index: 1;
                display: inline-block;
            }
            .glitch-text::before, .glitch-text::after {
                content: attr(data-text);
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: 0.9;
            }
            .glitch-text::before {
                color: #0ef; /* Pure Electric Cyan */
                z-index: -1;
                animation: glitch-anim-1 4s infinite linear alternate-reverse;
            }
            .glitch-text::after {
                color: #6366f1; /* Deep Tech Indigo */
                z-index: -2;
                animation: glitch-anim-2 4s infinite linear alternate-reverse;
            }

            /* Spasmodic Glitch: Rests for 80% of the time, glitches violently for 20% */
            @keyframes glitch-anim-1 {
                0%, 80% { clip-path: inset(100% 0 0 0); transform: translate(0, 0); }
                82% { clip-path: inset(20% 0 80% 0); transform: translate(-4px, 1px); }
                84% { clip-path: inset(60% 0 10% 0); transform: translate(4px, -1px); }
                86% { clip-path: inset(40% 0 50% 0); transform: translate(-4px, 2px); }
                88% { clip-path: inset(80% 0 5% 0); transform: translate(4px, -2px); }
                90% { clip-path: inset(10% 0 70% 0); transform: translate(-2px, 1px); }
                92% { clip-path: inset(30% 0 50% 0); transform: translate(2px, -1px); }
                94% { clip-path: inset(100% 0 0 0); transform: translate(0, 0); }
            }

            @keyframes glitch-anim-2 {
                0%, 80% { clip-path: inset(100% 0 0 0); transform: translate(0, 0); }
                81% { clip-path: inset(10% 0 60% 0); transform: translate(4px, -1px); }
                83% { clip-path: inset(30% 0 20% 0); transform: translate(-4px, 2px); }
                85% { clip-path: inset(70% 0 10% 0); transform: translate(2px, -1px); }
                87% { clip-path: inset(20% 0 50% 0); transform: translate(-2px, 2px); }
                89% { clip-path: inset(50% 0 30% 0); transform: translate(4px, 1px); }
                91% { clip-path: inset(5% 0 80% 0); transform: translate(-4px, -2px); }
                93% { clip-path: inset(100% 0 0 0); transform: translate(0, 0); }
            }
        `}</style>

        {/* Navbar sits above the section — pointer events handled inside it */}
        {/* <Navbar /> */}
        <Navbar />

        {/* ── Decorative: scan line (right edge) ───────────────────── */}
        <div
            className="pointer-events-none absolute top-1/4 right-8 hidden xl:flex flex-col items-center gap-1 select-none"
            aria-hidden
        >
            {/* Changed to Electric Cyan to match background highlights */}
            <div className="w-px h-24 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent" />
            <div
                className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                style={{ boxShadow: "0 0 10px 2px rgba(34,211,238,0.4)" }}
            />
            <div className="w-px h-24 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent" />
            <span className="font-mono text-[9px] text-slate-600 tracking-[0.2em] uppercase">
                SYS
            </span>
        </div>

        {/* ── Main grid ─────────────────────────────────────────────── */}
        <div
            className="relative mx-auto max-w-7xl grid min-h-[calc(100vh-80px)]
               grid-cols-1 lg:grid-cols-[1fr_auto] items-center
               gap-12 px-8 pt-28 pb-16"
        >
            {/* ════════════════ LEFT COLUMN ════════════════ */}
            <div className="max-w-2xl">

                {/* Pre-header label */}
                <div className="pointer-events-auto mb-5 inline-flex items-center gap-2.5">
                    <span className="font-mono text-[11px] tracking-[0.2em] text-slate-500 uppercase">
                        // [INIT_SYS_PORTFOLIO]
                    </span>
                    <span className="h-px flex-1 w-12 bg-gradient-to-r from-cyan-500/50 to-transparent" />
                </div>

                {/* Status pill - Swapped Emerald for Tech Cyan to unify palette */}
                <div
                    className="pointer-events-auto mb-8 inline-flex items-center gap-2
                   rounded-full border border-cyan-500/30 bg-cyan-500/[0.05]
                   px-4 py-1.5 backdrop-blur-sm"
                >
                    <span
                        className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse"
                        style={{ boxShadow: "0 0 8px 3px rgba(34,211,238,0.5)" }}
                    />
                    <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-cyan-400">
                        System Status: Online
                    </span>
                </div>

                {/* Main heading with true CSS Glitch */}
                <h1 className="mb-8 text-[clamp(3rem,7vw,5.5rem)] font-black leading-[0.95] tracking-tight">
                    <span className="block text-slate-300 text-[clamp(1.5rem,4vw,2.5rem)] mb-3 tracking-normal font-bold">
                        Welcome to
                    </span>
                    <div 
                        className="glitch-text" 
                        data-text="SaurabhOS"
                    >
                        SaurabhOS
                    </div>
                </h1>

                {/* Subtext */}
                <p className="mb-10 max-w-lg font-mono text-[13px] leading-8 text-zinc-400">
                    Building systems, shipping products, and documenting the journey from developer to engineer.
                    Currently building SaurabhOS using a modern full-stack monorepo architecture.
                </p>

                {/* Terminal lines */}
                <div className="mb-10 space-y-1 font-mono text-[12px]">
                    {BOOT_LINES.map(({ color, text }, i) =>
                        visibleLines.includes(i) ? (
                            <div key={i} className={`${color} transition-all duration-300`}>
                                {i === BOOT_LINES.length - 1 ? (
                                    <>
                                        {text.replace("_", "")}
                                        <span
                                            className="inline-block w-[7px] h-[13px] bg-cyan-400 ml-0.5 align-middle"
                                            style={{ opacity: cursorBlink ? 1 : 0, transition: "opacity 0.1s" }}
                                        />
                                    </>
                                ) : text}
                            </div>
                        ) : null
                    )}
                </div>

                {/* Tech stack chips */}
                <div className="mb-12 flex flex-wrap gap-2">
                    {STACK.map(({ label, color }) => (
                        <span
                            key={label}
                            className={`
              inline-flex items-center gap-1.5
              rounded-lg border px-3 py-1
              font-mono text-[11px] tracking-wide
              bg-black/40 backdrop-blur-md
              ${color} border-white/5
            `}
                        >
                            <span className="opacity-50 text-cyan-500">//</span>
                            {label}
                        </span>
                    ))}
                </div>

                {/* CTAs */}
                <div className="pointer-events-auto flex flex-wrap gap-4">

                    {/* Primary CTA — Glassmorphism Blueprint Style */}
                    <button
                        className="
                            group relative flex items-center gap-2.5
                            px-7 py-3.5
                            bg-cyan-950/40 hover:bg-cyan-900/40
                            border border-cyan-500/30 hover:border-cyan-400
                            text-cyan-300 hover:text-cyan-100 text-sm font-semibold
                            backdrop-blur-md
                            transition-all duration-300
                        "
                        style={{
                            clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                        }}
                    >
                        {/* Sweep shimmer on hover */}
                        <span
                            className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%]
                            bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent
                            transition-transform duration-700"
                        />
                        <FolderGit2 className="relative z-10 w-4 h-4" />
                        <span className="relative z-10 tracking-wide">Explore Projects</span>
                        <ChevronRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </button>

                    {/* Secondary CTA — ghost glass */}
                    <button
                        className="
                            group relative flex items-center gap-2.5
                            px-7 py-3.5
                            border border-white/5 hover:border-indigo-500/40
                            bg-white/[0.02] hover:bg-indigo-500/[0.05]
                            text-slate-400 hover:text-indigo-200
                            text-sm font-mono
                            rounded-lg
                            backdrop-blur-sm
                            transition-all duration-300
                        "
                    >
                        Engineering Journey
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </button>

                </div>
            </div>

            <SystemMetrics />
        </div>

        {/* ── Bottom HUD bar ────────────────────────────────────────── */}
        <div
            className="pointer-events-none absolute bottom-0 inset-x-0
               border-t border-white/[0.04] px-8 py-3
               flex items-center justify-between bg-black/20 backdrop-blur-sm"
            aria-hidden
        >
            <span className="font-mono text-[10px] text-slate-500 tracking-[0.18em] uppercase">
                saurabh@os:~/$&nbsp;&nbsp;
                <span className="text-cyan-400">learning · building · shipping</span>
            </span>
            <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] text-slate-500">60 FPS</span>
                <div className="flex gap-1">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="w-0.5 bg-cyan-500/40"
                            style={{ height: 8 + Math.sin(i * 1.4) * 4, alignSelf: "flex-end" }}
                        />
                    ))}
                </div>
                <span className="font-mono text-[10px] text-cyan-500/70 tracking-widest uppercase">
                    ACTIVE
                </span>
            </div>
        </div>

    </section>
);


}