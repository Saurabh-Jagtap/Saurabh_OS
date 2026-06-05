import React from 'react'
import { CornerBracket } from './CornerBracket'
import { GitBranch, Terminal } from 'lucide-react'
import { METRICS } from './hero-data'

const SystemMetrics = () => {
  return (
    <div>
      {/* ════════════════ RIGHT COLUMN — Metrics panel ═══════════ */}
        <div className="pointer-events-auto hidden lg:flex flex-col gap-4 w-64 xl:w-72">

          {/* Panel header */}
          <div className="flex items-center gap-2 mb-1">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-mono text-[10px] tracking-[0.18em] text-cyan-400 uppercase font-semibold">
              sys.metrics
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-400/60 to-transparent" />
          </div>

          {/* Metric cards */}
          {METRICS.map(({ icon: Icon, label, value, color }) => (
            <div
              key={label}
              className="
                relative group
                flex items-center gap-4 px-4 py-3.5 rounded-xl
                border border-cyan-500/30 hover:border-cyan-300/60
                bg-cyan-950/30 hover:bg-cyan-900/50
                backdrop-blur-md
                transition-all duration-300
              "
            >
              <CornerBracket position="tl" />
              <CornerBracket position="br" />

              <div
                className={`
                  flex-shrink-0 w-8 h-8 rounded-lg
                  flex items-center justify-center
                  border border-cyan-400/40 bg-cyan-950/80
                  shadow-[0_0_10px_rgba(6,182,212,0.2)]
                `}
              >
                <Icon className={`w-4 h-4 ${color}`} />
              </div>

              <div className="flex flex-col leading-none gap-1 min-w-0">
                <span className="font-mono text-[10px] text-cyan-100/70 uppercase tracking-wider truncate">
                  {label}
                </span>
                <span className={`font-black text-2xl tracking-tight leading-none ${color}`}>
                  {value}
                </span>
              </div>

              {/* Right edge accent line */}
              <div
                className={`ml-auto w-px h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                style={{ background: `linear-gradient(to bottom, transparent, currentColor, transparent)` }}
              />
            </div>
          ))}

          {/* Mission statement card */}
          <div
            className="
              relative mt-2 px-4 py-4 rounded-xl
              border border-cyan-500/30
              bg-cyan-950/30 backdrop-blur-md
            "
          >
            <CornerBracket position="tl" />
            <CornerBracket position="tr" />
            <CornerBracket position="bl" />
            <CornerBracket position="br" />

            <div className="font-mono text-[10px] text-cyan-300 uppercase tracking-[0.2em] mb-3 font-bold">
              Current Mission
            </div>

            <div className="space-y-2">
              {[
                { dot: "bg-cyan-400", text: "Building SaurabhOS MVP" },
                { dot: "bg-blue-400", text: "Full Stack Engineering" },
                { dot: "bg-fuchsia-400", text: "Shipping in Public" },
              ].map(({ dot, text }) => (
                <div key={text} className="flex items-center gap-2.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${dot} flex-shrink-0`} />
                  <span className="font-mono text-[11px] text-white tracking-wide">{text}</span>
                </div>
              ))}
            </div>

            {/* Pulsing border glow */}
            <div
              className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ boxShadow: "inset 0 0 20px rgba(6,182,212,0.3)" }}
            />
          </div>

          {/* Last commit badge */}
          <div className="flex items-center justify-between px-3 py-2 rounded-lg border border-cyan-500/30 bg-cyan-950/50 mt-1">
            <div className="flex items-center gap-2">
              <GitBranch className="w-3 h-3 text-cyan-400" />
              <span className="font-mono text-[10px] text-cyan-200">last commit</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" style={{ boxShadow: "0 0 6px 1px rgba(6,182,212,0.6)" }}/>
              <span className="font-mono text-[10px] text-cyan-300 font-bold">today</span>
            </div>
          </div>
        </div>
      </div>
  )
}

export default SystemMetrics