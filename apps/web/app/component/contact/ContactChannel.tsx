"use client";

import {
  ChevronRight,
} from "lucide-react";
import { CornerBracket } from "../contact/CornerBracket";
import { CHANNELS } from "../contact/contact-data";

export function ChannelCard({
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