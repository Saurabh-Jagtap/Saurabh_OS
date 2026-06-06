import React from 'react'
import { GitBranch, Terminal } from 'lucide-react'
import { METRICS } from './hero-data'

const SystemMetrics = () => {
  return (
    <div>
      <style>{`
  @keyframes hud-scan {
    0%   { top: 0%;   opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 1; }
    100% { top: 100%; opacity: 0; }
  }
  @keyframes hud-flicker {
    0%, 100% { opacity: 1; }
    92%      { opacity: 1; }
    93%      { opacity: 0.4; }
    94%      { opacity: 1; }
    97%      { opacity: 0.6; }
    98%      { opacity: 1; }
  }
  @keyframes hud-breathe {
    0%, 100% { opacity: 0.4; transform: scaleX(1); }
    50%      { opacity: 1;   transform: scaleX(1.04); }
  }
  @keyframes hud-ping-dot {
    0%, 100% { box-shadow: 0 0 0 0 rgba(34,211,238,0.6); }
    50%      { box-shadow: 0 0 0 5px rgba(34,211,238,0); }
  }
`}</style>

      {/* ════════════════ RIGHT COLUMN — Metrics panel ═══════════ */}
      <div
        className="pointer-events-auto hidden lg:flex flex-col w-64 xl:w-72"
        style={{ animation: "hud-flicker 8s ease-in-out infinite" }}
      >

        {/* ── Panel header ─────────────────────────────────── */}
        <div className="flex items-center gap-2 mb-4">
          <Terminal className="w-3 h-3 text-cyan-400" />
          <span className="font-mono text-[9px] tracking-[0.22em] text-cyan-400 uppercase">
            sys.metrics
          </span>
          <div
            className="flex-1 h-px"
            style={{ background: "linear-gradient(90deg, rgba(34,211,238,0.5), transparent)" }}
          />
          {/* Live indicator */}
          <div className="flex items-center gap-1">
            <div
              className="w-1.5 h-1.5 rounded-full bg-cyan-400"
              style={{ animation: "hud-ping-dot 1.6s ease-in-out infinite" }}
            />
            <span className="font-mono text-[8px] text-cyan-400 tracking-widest">LIVE</span>
          </div>
        </div>

        {/* ── Metric rows — frameless HUD style ───────────── */}
        <div
          className="relative flex flex-col"
          style={{ borderLeft: "1px solid rgba(34,211,238,0.15)" }}
        >

          {/* Scanning line that travels down the left border */}
          <div
            className="absolute left-[-1px] w-[1px] h-8 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, transparent, #22d3ee, transparent)",
              animation: "hud-scan 3.5s ease-in-out infinite",
            }}
          />

          {METRICS.map(({ icon: Icon, label, value, color }, i) => (
            <div
              key={label}
              className="group relative flex items-center gap-3 px-4 py-3 transition-all duration-200"
              style={{
                borderBottom: i < METRICS.length - 1
                  ? "1px solid rgba(255,255,255,0.04)"
                  : "none",
              }}
            >
              {/* Left tick mark — brightens on hover */}
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-5 transition-all duration-300 group-hover:h-8"
                style={{ background: "rgba(34,211,238,0.5)" }}
              />

              {/* Icon — no card, just floating */}
              <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                <Icon
                  className={`w-3.5 h-3.5 ${color} transition-all duration-300 group-hover:drop-shadow-[0_0_6px_currentColor]`}
                />
              </div>

              {/* Label + value */}
              <div className="flex flex-col leading-none gap-0.5 min-w-0">
                <span className="font-mono text-[9px] text-slate-600 uppercase tracking-widest">
                  {label}
                </span>
                <span className={`font-black text-lg tracking-tight leading-none ${color}`}>
                  {value}
                </span>
              </div>

              {/* Right: mini sparkline decoration (static, CSS only) */}
              <div className="ml-auto flex items-end gap-[2px] opacity-40 group-hover:opacity-80 transition-opacity duration-300">
                {[3, 5, 2, 7, 4, 6, 3].map((h, j) => (
                  <div
                    key={j}
                    className="w-[2px] rounded-full"
                    style={{
                      height: h * 2,
                      background: "currentColor",
                      color: color.replace("text-", ""),
                      animation: `hud-breathe ${1.2 + j * 0.18}s ease-in-out infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Thin divider ─────────────────────────────────── */}
        <div
          className="my-4 h-px w-full"
          style={{ background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.2), transparent)" }}
        />

        {/* ── Mission block — frameless ─────────────────────── */}
        <div className="relative px-4">

          {/* Top-left crosshair */}
          <div className="absolute top-0 left-0 w-3 h-3">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-cyan-500/30" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-cyan-500/30" />
          </div>
          {/* Bottom-right crosshair */}
          <div className="absolute bottom-0 right-0 w-3 h-3">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-cyan-500/30" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-cyan-500/30" />
          </div>

          <div className="font-mono text-[9px] text-cyan-400/70 uppercase tracking-[0.2em] mb-3">
            Current Mission
          </div>

          <div className="space-y-2.5">
            {[
              { dot: "#22d3ee", shadow: "rgba(34,211,238,0.6)", text: "Building SaurabhOS MVP" },
              { dot: "#60a5fa", shadow: "rgba(96,165,250,0.6)", text: "Full Stack Engineering" },
              { dot: "#e879f9", shadow: "rgba(232,121,249,0.6)", text: "Shipping in Public" },
            ].map(({ dot, shadow, text }) => (
              <div key={text} className="flex items-center gap-2.5 group">
                <div
                  className="w-1 h-1 rounded-full flex-shrink-0"
                  style={{
                    background: dot,
                    boxShadow: `0 0 6px 1px ${shadow}`,
                    animation: "hud-ping-dot 2.2s ease-in-out infinite",
                  }}
                />
                <span className="font-mono text-[11px] text-slate-300 tracking-wide group-hover:text-white transition-colors duration-200">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Thin divider ─────────────────────────────────── */}
        <div
          className="my-4 h-px w-full"
          style={{ background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.2), transparent)" }}
        />

        {/* ── Last commit row — inline HUD chip ────────────── */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-1.5">
            <GitBranch className="w-3 h-3 text-cyan-500/60" />
            <span className="font-mono text-[10px] text-slate-600">last commit</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div
              className="w-1.5 h-1.5 rounded-full bg-cyan-400"
              style={{ animation: "hud-ping-dot 1.4s ease-in-out infinite" }}
            />
            <span className="font-mono text-[10px] text-cyan-300 font-bold">today</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SystemMetrics