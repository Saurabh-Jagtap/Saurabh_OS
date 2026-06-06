"use client";

/**
 * ContactSection.tsx — Redesigned
 * ═══════════════════════════════════════════════════════════════════
 * Fully self-contained — all sub-components inlined.
 * Drop this file in place of your existing ContactSection.tsx.
 *
 * Theme alignment with HeroSection:
 *  • bg-[#080B14] base, same as hero
 *  • cyan (#06b6d4) + indigo (#6366f1) glow palette
 *  • glassmorphic panels: bg-zinc-950/50 + backdrop-blur + border-white/5
 *  • monospace labels, clip-path CTA, corner brackets
 *  • glitch-text CSS matching hero heading treatment
 *  • Intersection Observer scroll-reveal animations (no library needed)
 *  • pointer-events-none shell → pointer-events-auto on interactables
 *    so the 3D canvas spotlight still fires through the section
 * ═══════════════════════════════════════════════════════════════════
 */

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type FormEvent,
} from "react";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  Send,
  Terminal,
  Activity,
  Clock,
  ChevronRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";

// ─── Shared corner bracket (matches HeroSection) ──────────────────
function CornerBracket({
  pos,
  color = "border-indigo-500/30",
}: {
  pos: "tl" | "tr" | "bl" | "br";
  color?: string;
}) {
  const map = {
    tl: "top-0 left-0 border-t border-l",
    tr: "top-0 right-0 border-t border-r",
    bl: "bottom-0 left-0 border-b border-l",
    br: "bottom-0 right-0 border-b border-r",
  };
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute w-3 h-3 ${map[pos]} ${color}`}
    />
  );
}

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

// ─── Channel data ─────────────────────────────────────────────────
const CHANNELS = [
  {
    icon: Mail,
    label: "Email",
    value: "saurabh@saurabhOS.dev",
    href: "mailto:saurabh@saurabhOS.dev",
    color: "text-cyan-400",
    border: "border-cyan-500/20",
    glow: "rgba(6,182,212,0.12)",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/saurabhOS",
    href: "https://github.com",
    color: "text-slate-300",
    border: "border-white/10",
    glow: "rgba(255,255,255,0.06)",
  },
  {
    icon: Twitter,
    label: "Twitter / X",
    value: "@saurabhOS",
    href: "https://x.com",
    color: "text-sky-400",
    border: "border-sky-500/20",
    glow: "rgba(14,165,233,0.1)",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/saurabh",
    href: "https://linkedin.com",
    color: "text-indigo-400",
    border: "border-indigo-500/20",
    glow: "rgba(99,102,241,0.1)",
  },
];

// ─── Status rows ──────────────────────────────────────────────────
const STATUS_ROWS = [
  { label: "Availability",    value: "Open to opportunities",       dot: "bg-emerald-400", valueColor: "text-emerald-400" },
  { label: "Response time",   value: "~24 hours",                   dot: "bg-cyan-400",    valueColor: "text-cyan-400"    },
  { label: "Preferred work",  value: "Full-stack · Open source",    dot: "bg-indigo-400",  valueColor: "text-slate-400"   },
  { label: "Timezone",        value: "IST (UTC +5:30)",             dot: "bg-violet-400",  valueColor: "text-slate-400"   },
  { label: "Current focus",   value: "System design",               dot: "bg-amber-400",   valueColor: "text-amber-400"   },
];

// ─── Terminal output lines ─────────────────────────────────────────
const TERMINAL_LINES = [
  { prompt: true,  text: "cat response_policy.txt",    color: "text-slate-400" },
  { prompt: false, text: "✓ Every message read personally", color: "text-emerald-400" },
  { prompt: false, text: "✓ Response within 24h on business days", color: "text-emerald-400" },
  { prompt: false, text: "✓ Open to freelance, internship & full-time", color: "text-emerald-400" },
  { prompt: false, text: "// Spam filtered at the OS level", color: "text-slate-600" },
];

// ─── Message types ────────────────────────────────────────────────
const MSG_TYPES = [
  { id: "opportunity",   label: "💼 Opportunity" },
  { id: "collab",        label: "🤝 Collaboration" },
  { id: "hi",            label: "💬 Just saying hi" },
  { id: "feedback",      label: "🔍 Feedback" },
];

// ═══════════════════════════════════════════════════════════════════
// Sub-components
// ═══════════════════════════════════════════════════════════════════

// ─── Channel card ─────────────────────────────────────────────────
function ChannelCard({
  icon: Icon,
  label,
  value,
  href,
  color,
  border,
  glow,
  delay,
  visible,
}: (typeof CHANNELS)[0] & { delay: number; visible: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="pointer-events-auto group relative flex items-center gap-4 rounded-xl border bg-zinc-950/60 px-4 py-3.5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
      style={{
        borderColor: "rgba(255,255,255,0.05)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms, border-color 0.3s, box-shadow 0.3s`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = border.replace("border-", "").replace("/20", "");
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${glow}`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      <CornerBracket pos="tl" color={`${border} opacity-0 group-hover:opacity-100`} />
      <CornerBracket pos="br" color={`${border} opacity-0 group-hover:opacity-100`} />

      {/* Icon */}
      <div
        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-white/5 bg-black/30"
      >
        <Icon className={`h-4 w-4 ${color}`} />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="font-mono text-[10px] uppercase tracking-widest text-slate-600">
          {label}
        </span>
        <span className={`font-mono text-[12px] font-semibold truncate ${color}`}>
          {value}
        </span>
      </div>

      {/* Arrow */}
      <ChevronRight
        className="ml-auto h-3.5 w-3.5 flex-shrink-0 text-slate-700 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-slate-400"
      />
    </a>
  );
}

// ─── Status panel ─────────────────────────────────────────────────
function StatusPanel({ visible }: { visible: boolean }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
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
    <div
      className="relative overflow-hidden rounded-2xl border border-white/[0.05] bg-zinc-950/60 p-5 backdrop-blur-md"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease 300ms, transform 0.6s ease 300ms",
      }}
    >
      <CornerBracket pos="tl" color="border-emerald-500/30" />
      <CornerBracket pos="br" color="border-emerald-500/30" />

      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <Activity className="h-3.5 w-3.5 text-emerald-400" />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-400">
          sys.status
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <span
            className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"
            style={{ boxShadow: "0 0 6px 2px rgba(52,211,153,0.4)" }}
          />
          <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-500">
            Online
          </span>
        </div>
      </div>

      {/* Status rows */}
      <div className="space-y-2.5">
        {STATUS_ROWS.map(({ label, value, dot, valueColor }, i) => (
          <div
            key={label}
            className="flex items-center justify-between gap-3 border-b border-white/[0.04] pb-2.5 last:border-0 last:pb-0"
            style={{
              opacity: visible ? 1 : 0,
              transition: `opacity 0.4s ease ${400 + i * 80}ms`,
            }}
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${dot}`} />
              <span className="font-mono text-[11px] text-slate-600 truncate">{label}</span>
            </div>
            <span className={`font-mono text-[11px] text-right flex-shrink-0 ${valueColor}`}>
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* Live clock */}
      <div className="mt-4 flex items-center justify-between rounded-lg border border-white/[0.04] bg-black/20 px-3 py-2">
        <div className="flex items-center gap-2">
          <Clock className="h-3 w-3 text-slate-600" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-slate-600">
            Local · IST
          </span>
        </div>
        <span className="font-mono text-[12px] font-semibold tabular-nums text-cyan-400">
          {time}
        </span>
      </div>
    </div>
  );
}

// ─── Contact form ─────────────────────────────────────────────────
function ContactForm({ visible }: { visible: boolean }) {
  const [msgType, setMsgType] = useState("opportunity");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1800);
  };

  const inputBase =
    "w-full rounded-lg border bg-black/30 px-4 py-3 font-mono text-[13px] text-slate-300 placeholder-slate-700 outline-none backdrop-blur-sm transition-all duration-200";

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/[0.05] bg-zinc-950/60 backdrop-blur-md"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(24px)",
        transition: "opacity 0.6s ease 150ms, transform 0.6s ease 150ms",
      }}
    >
      <CornerBracket pos="tl" color="border-cyan-500/30" />
      <CornerBracket pos="tr" color="border-cyan-500/30" />

      {/* Panel header */}
      <div className="flex items-center gap-2.5 border-b border-white/[0.04] bg-black/20 px-5 py-3.5">
        <Terminal className="h-3.5 w-3.5 text-cyan-400" />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-600">
          <span className="text-cyan-400">&gt;_</span> message.compose()
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 p-5">
        {/* Name + Email row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            { id: "name",  placeholder: "Saurabh Tidke",       label: "Your name"      },
            { id: "email", placeholder: "you@engineering.dev", label: "Email address"  },
          ].map(({ id, placeholder, label }) => (
            <div key={id} className="flex flex-col gap-1.5">
              <label
                htmlFor={id}
                className="font-mono text-[10px] uppercase tracking-widest text-slate-600"
              >
                {label}
              </label>
              <input
                id={id}
                type={id === "email" ? "email" : "text"}
                placeholder={placeholder}
                required
                onFocus={() => setFocused(id)}
                onBlur={() => setFocused(null)}
                className={`${inputBase} ${
                  focused === id
                    ? "border-cyan-500/40 shadow-[0_0_0_1px_rgba(6,182,212,0.15)]"
                    : "border-white/[0.06] hover:border-white/[0.1]"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Message type toggle */}
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[10px] uppercase tracking-widest text-slate-600">
            Message type
          </label>
          <div className="flex flex-wrap gap-2">
            {MSG_TYPES.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setMsgType(id)}
                className={`rounded-lg border px-3 py-1.5 font-mono text-[11px] transition-all duration-200 ${
                  msgType === id
                    ? "border-cyan-500/40 bg-cyan-500/[0.08] text-cyan-300"
                    : "border-white/[0.06] text-slate-500 hover:border-white/[0.12] hover:text-slate-400"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Message textarea */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="message"
            className="font-mono text-[10px] uppercase tracking-widest text-slate-600"
          >
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            placeholder="What's on your mind? I read every message personally."
            required
            onFocus={() => setFocused("message")}
            onBlur={() => setFocused(null)}
            className={`${inputBase} resize-none leading-relaxed ${
              focused === "message"
                ? "border-cyan-500/40 shadow-[0_0_0_1px_rgba(6,182,212,0.15)]"
                : "border-white/[0.06] hover:border-white/[0.1]"
            }`}
          />
        </div>

        {/* Submit row */}
        <div className="flex items-center justify-between pt-1">
          <span className="font-mono text-[10px] text-slate-700">
            // All messages handled personally
          </span>

          <button
            type="submit"
            disabled={status !== "idle"}
            className="group relative flex items-center gap-2.5 overflow-hidden px-6 py-2.5 font-mono text-sm font-semibold text-white transition-all duration-300 disabled:opacity-70"
            style={{
              background:
                status === "sent"
                  ? "linear-gradient(135deg, rgba(16,185,129,0.8), rgba(6,182,212,0.6))"
                  : "linear-gradient(135deg, rgba(99,102,241,0.9), rgba(6,182,212,0.7))",
              clipPath:
                "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
            }}
          >
            {/* Shimmer */}
            <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />

            {status === "idle" && (
              <>
                <Send className="relative z-10 h-3.5 w-3.5" />
                <span className="relative z-10">$ send --message ↵</span>
              </>
            )}
            {status === "sending" && (
              <>
                <Loader2 className="relative z-10 h-3.5 w-3.5 animate-spin" />
                <span className="relative z-10">Transmitting...</span>
              </>
            )}
            {status === "sent" && (
              <>
                <CheckCircle2 className="relative z-10 h-3.5 w-3.5" />
                <span className="relative z-10">Message received ✓</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

// ─── Terminal readout ─────────────────────────────────────────────
function ContactTerminal({ visible }: { visible: boolean }) {
  const [linesShown, setLinesShown] = useState(0);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (!visible) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    TERMINAL_LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setLinesShown(i + 1), 300 + i * 220));
    });
    return () => timers.forEach(clearTimeout);
  }, [visible]);

  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="overflow-hidden rounded-2xl border border-white/[0.05] bg-zinc-950/70 backdrop-blur-md"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(24px)",
        transition: "opacity 0.6s ease 350ms, transform 0.6s ease 350ms",
      }}
    >
      {/* Chrome bar */}
      <div className="flex items-center gap-2 border-b border-white/[0.04] bg-black/30 px-4 py-2.5">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
        <div className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
        <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
        <span className="ml-2 font-mono text-[10px] text-slate-600">
          saurabh@os:~/contact
        </span>
      </div>

      {/* Lines */}
      <div className="space-y-1.5 p-5 font-mono text-[12px]">
        {TERMINAL_LINES.slice(0, linesShown).map(({ prompt, text, color }, i) => (
          <div
            key={i}
            className={`${color} transition-all duration-300`}
            style={{ opacity: 1 }}
          >
            {prompt ? (
              <>
                <span className="text-indigo-400">saurabh@os:~$</span>
                <span className="ml-2 text-slate-400">{text}</span>
              </>
            ) : (
              text
            )}
          </div>
        ))}

        {/* Trailing prompt + blink cursor */}
        {linesShown >= TERMINAL_LINES.length && (
          <div>
            <span className="text-indigo-400">saurabh@os:~$</span>
            <span
              className="ml-1 inline-block h-[13px] w-[7px] align-middle bg-cyan-400"
              style={{ opacity: blink ? 1 : 0, transition: "opacity 0.1s" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Main section
// ═══════════════════════════════════════════════════════════════════
export default function ClaudeContactSection() {
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
      className="pointer-events-none relative overflow-hidden bg-[#080B14] py-28"
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

      {/* ── Grid background ───────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── Ambient orbs ──────────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 h-[520px] w-[520px] rounded-full bg-indigo-500/[0.07] blur-[130px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 h-[400px] w-[400px] rounded-full bg-cyan-500/[0.06] blur-[120px]"
      />

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

            {/* Status panel */}
            <StatusPanel visible={visible} />
          </div>

          {/* ── Right column ─────────────────────────────────────── */}
          <div className="space-y-5">
            <ContactForm visible={visible} />
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