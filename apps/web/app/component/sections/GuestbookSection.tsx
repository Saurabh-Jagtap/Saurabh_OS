"use client"
import GuestbookEntry from "../guestbook/GuestbookEntry";
import GuestbookForm from "../guestbook/GuestbookForm";
import { trpc } from '~/trpc/client'
import { useEffect, useRef, useState } from "react";

// ─── Animated counter hook ────────────────────────────────────────
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

// ─── Stat card ────────────────────────────────────────────────────
function StatCard({
    value,
    label,
    accentColor,
    accentBorder,
    accentBg,
    animated = false,
    visible = false,
}: {
    value: string | number;
    label: string;
    accentColor: string;
    accentBorder: string;
    accentBg: string;
    animated?: boolean;
    visible?: boolean;
}) {
    const numericTarget = animated && typeof value === "number" ? value : 0;
    const count = useCounter(numericTarget, 900, visible && animated);
    const displayValue = animated && typeof value === "number" ? count : value;

    return (
        <div
            className="relative overflow-hidden rounded-2xl p-5 flex flex-col items-center justify-center gap-1 group transition-all duration-300"
            style={{
                border: `1px solid ${accentBorder}`,
                background: accentBg,
                backdropFilter: "blur(8px)",
            }}
        >
            {/* Top left crosshair */}
            <div className="absolute top-2 left-2 w-2.5 h-2.5 pointer-events-none">
                <div className="absolute top-1/2 left-0 right-0 h-px" style={{ background: accentColor, opacity: 0.3 }} />
                <div className="absolute left-1/2 top-0 bottom-0 w-px" style={{ background: accentColor, opacity: 0.3 }} />
            </div>

            {/* Corner glow on hover */}
            <div
                className="pointer-events-none absolute -top-6 -right-6 w-16 h-16 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle, ${accentColor}20, transparent 70%)` }}
            />

            <div
                className="text-3xl font-black tabular-nums"
                style={{ color: accentColor, textShadow: `0 0 20px ${accentColor}60` }}
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
    const { data: entries, isLoading } = trpc.guestbook.getEntries.useQuery({limit: 3})

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
            className="relative overflow-hidden"
            style={{ minHeight: "100vh" }}
        >
            {/* ── Right decorative scan bar ─────────────────────── */}
            <div
                className="absolute top-1/3 right-6 hidden xl:flex flex-col items-center gap-1 pointer-events-none select-none"
                aria-hidden
            >
                <div className="w-px h-20 bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent" />
                <div
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                    style={{ boxShadow: "0 0 10px 2px rgba(52,211,153,0.4)", animation: "gb-glow-breathe 2s ease-in-out infinite" }}
                />
                <div className="w-px h-20 bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent" />
                <span className="font-mono text-[9px] text-slate-600 tracking-[0.2em] uppercase">LOG</span>
            </div>

            {/* ── Main content ──────────────────────────────────── */}
            <div className="relative z-10 mx-auto max-w-5xl px-8 py-24">

                {/* ══ HEADER ════════════════════════════════════════ */}
                <div
                    className="mb-14"
                    style={{
                        opacity: visible ? 1 : 0,
                        animation: visible ? "gb-fadein 0.5s ease both" : "none",
                    }}
                >
                    {/* Meta row */}
                    <div className="flex items-center gap-3 mb-5">
                        <div
                            className="inline-flex items-center gap-2 rounded-full px-3 py-1"
                            style={{
                                border: "1px solid rgba(52,211,153,0.25)",
                                background: "rgba(52,211,153,0.06)",
                            }}
                        >
                            <div
                                className="w-1.5 h-1.5 rounded-full"
                                style={{
                                    background: "#34d399",
                                    boxShadow: "0 0 6px 2px rgba(52,211,153,0.5)",
                                    animation: "gb-pulse-dot 1.8s ease-in-out infinite",
                                }}
                            />
                            <span className="font-mono text-[10px] text-emerald-400 tracking-widest uppercase">
                                SYS_ACTIVE
                            </span>
                        </div>

                        <div
                            className="h-px w-16"
                            style={{ background: "linear-gradient(90deg, rgba(52,211,153,0.4), transparent)" }}
                        />

                        <span className="font-mono text-[10px] text-slate-600">
                            // [VISITOR_LOG_OPEN]
                        </span>
                    </div>

                    {/* Title */}
                    <div className="flex items-end justify-between gap-6 flex-wrap">
                        <div>
                            <h2 className="text-5xl font-black text-slate-100 leading-none mb-3">
                                Open{" "}
                                <span style={{
                                    background: "linear-gradient(90deg, #34d399, #22d3ee)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}>
                                    Channel
                                </span>
                            </h2>
                            <p className="font-mono text-[12px] text-slate-500">
                                // Thoughts on the portfolio, journey, or anything you'd like to share
                            </p>
                        </div>

                        {/* Entry count badge */}
                        <div
                            className="flex items-center gap-2 rounded-xl px-4 py-2"
                            style={{
                                border: "1px solid rgba(52,211,153,0.2)",
                                background: "rgba(52,211,153,0.05)",
                            }}
                        >
                            <span className="font-mono text-[10px] text-slate-600">TOTAL_ENTRIES</span>
                            <span
                                className="font-mono text-sm font-black"
                                style={{ color: "#34d399" }}
                            >
                                {entries?.length ?? "—"}
                            </span>
                        </div>
                    </div>

                    {/* Rule */}
                    <div className="mt-8 flex items-center gap-3">
                        <div
                            className="flex-1 h-px"
                            style={{ background: "linear-gradient(90deg, rgba(52,211,153,0.3), rgba(6,182,212,0.15), transparent)" }}
                        />
                        <span className="font-mono text-[9px] text-slate-700 tracking-widest">
                            ████ EOF_HEADER
                        </span>
                    </div>
                </div>

                {/* ══ FORM ══════════════════════════════════════════ */}
                <div
                    style={{
                        opacity: visible ? 1 : 0,
                        animation: visible ? "gb-fadein 0.5s 0.1s ease both" : "none",
                    }}
                >
                    <GuestbookForm />
                </div>

                {/* ══ DIVIDER ═══════════════════════════════════════ */}
                <div
                    className="my-10 flex items-center gap-4"
                    style={{
                        opacity: visible ? 1 : 0,
                        animation: visible ? "gb-fadein 0.5s 0.2s ease both" : "none",
                    }}
                >
                    <div
                        className="flex-1 h-px"
                        style={{ background: "linear-gradient(90deg, transparent, rgba(52,211,153,0.2))" }}
                    />

                    <div className="flex items-center gap-2">
                        <svg width="60" height="10" viewBox="0 0 60 10" fill="none">
                            <path
                                d="M0 5 H60"
                                stroke="rgba(52,211,153,0.2)"
                                strokeWidth="1"
                                strokeDasharray="4 4"
                            >
                                <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.2s" repeatCount="indefinite" />
                            </path>
                        </svg>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-slate-600">
                            RECENT_ENTRIES
                        </span>
                        <svg width="60" height="10" viewBox="0 0 60 10" fill="none">
                            <path
                                d="M0 5 H60"
                                stroke="rgba(52,211,153,0.2)"
                                strokeWidth="1"
                                strokeDasharray="4 4"
                            >
                                <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.2s" repeatCount="indefinite" />
                            </path>
                        </svg>
                    </div>

                    <div
                        className="flex-1 h-px"
                        style={{ background: "linear-gradient(90deg, rgba(52,211,153,0.2), transparent)" }}
                    />
                </div>

                {/* ══ ENTRIES LIST ══════════════════════════════════ */}
                <div className="space-y-3">
                    {isLoading && (
                        <div className="flex flex-col items-center justify-center py-16 gap-4">
                            <div className="flex gap-1 items-end">
                                {[4,7,5,9,6,8,4].map((h, i) => (
                                    <div
                                        key={i}
                                        className="w-0.5 rounded-full"
                                        style={{
                                            height: h * 3,
                                            background: i % 2 === 0 ? "#34d399" : "#22d3ee",
                                            opacity: 0.5,
                                            animation: `gb-glow-breathe ${1 + i * 0.15}s ease-in-out infinite`,
                                        }}
                                    />
                                ))}
                            </div>
                            <span className="font-mono text-[11px] text-slate-600 tracking-widest">
                                LOADING_ENTRIES...
                            </span>
                        </div>
                    )}

                    {!isLoading && entries?.length === 0 && (
                        <div
                            className="flex flex-col items-center justify-center py-16 gap-3 rounded-2xl"
                            style={{
                                border: "1px dashed rgba(52,211,153,0.1)",
                                background: "rgba(52,211,153,0.01)",
                            }}
                        >
                            <span className="font-mono text-sm text-slate-700">NO_ENTRIES_YET</span>
                            <span className="font-mono text-[11px] text-slate-700">// Be the first to leave a message</span>
                        </div>
                    )}

                    {entries?.map((entry, i) => (
                        <div
                            key={entry.id}
                            style={{
                                opacity: visible ? 1 : 0,
                                animation: visible ? `gb-fadein 0.45s ${0.3 + i * 0.08}s ease both` : "none",
                            }}
                        >
                            <GuestbookEntry
                                name={entry.name}
                                message={entry.message}
                                createdAt={new Date(entry.createdAt).toLocaleString()}
                            />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}