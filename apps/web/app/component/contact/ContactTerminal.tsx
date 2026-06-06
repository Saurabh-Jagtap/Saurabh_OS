"use client";

import {
  useState,
  useEffect,
} from "react";
import {
} from "lucide-react";
import { TERMINAL_LINES } from "../contact/contact-data";

export function ContactTerminal({ visible }: { visible: boolean }) {
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