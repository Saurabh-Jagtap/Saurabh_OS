"use client";

import { useState } from "react";
import { Send, AlertCircle, X } from "lucide-react";
import { trpc } from "~/trpc/client";

export default function GuestbookForm() {

  const [name, setName]         = useState("");
  const [message, setMessage]   = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const createGuestbookEntry = trpc.guestbook.createEntry.useMutation();
  const identifyVisitor      = trpc.visitor.identify.useMutation();
  const utils                = trpc.useUtils();

  async function initializeVisitor() {
    const visitorId = localStorage.getItem("visitor_id");
    const visitor   = await identifyVisitor.mutateAsync({ visitorId: visitorId ?? undefined });
    localStorage.setItem("visitor_id", visitor.id);
    return visitor.id;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setErrorMsg("Please fill in both fields before transmitting.");
      return;
    }
    setErrorMsg(null);

    let visitorId = localStorage.getItem("visitor_id");
    if (!visitorId) visitorId = await initializeVisitor();

    setIsLoading(true);
    try {
      await createGuestbookEntry.mutateAsync({ visitorId, name, message });
      await utils.guestbook.getEntries.invalidate();
      setIsLoading(false);
      setName("");
      setMessage("");
    } catch (error) {
      console.error("Failed to create guestbook entry:", error);
      setErrorMsg("Transmission failed. Please try again.");
      setIsLoading(false);
    }
  };

  const isPending  = createGuestbookEntry.isPending || isLoading;
  const charCount  = message.length;
  const nameCount  = name.length;

  // ── Loading skeleton (DESIGN UPDATED, logic same) ─────────────
  if (isLoading && !createGuestbookEntry.isPending) {
    return (
      <div
        className="rounded-2xl overflow-hidden flex items-center justify-center py-12"
        style={{
          border: "1px solid rgba(6,182,212,0.15)",
          background: "rgba(8,11,20,0.8)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-1 items-end">
            {[0,1,2,3,4].map((i) => (
              <div
                key={i}
                className="w-0.5 rounded-full"
                style={{
                  height: 20,
                  background: i % 2 === 0 ? "#22d3ee" : "#818cf8",
                  opacity: 0.6,
                  animation: `gbBar 0.9s ${i * 0.12}s ease-in-out infinite alternate`,
                }}
              />
            ))}
          </div>
          <span className="font-mono text-[11px] text-cyan-500 tracking-widest">
            INITIALIZING...
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ── Shared keyframes ─────────────────────────────────────── */}
      <style>{`
        @keyframes gbBar {
          from { transform: scaleY(0.4); opacity: 0.4; }
          to   { transform: scaleY(1.2); opacity: 1;   }
        }
        .gb-form-input {
          background: rgba(0,0,0,0.35);
          border: 1px solid rgba(255,255,255,0.06);
          caret-color: #22d3ee;
          color: #e2e8f0;
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          transition: border-color .2s, box-shadow .2s;
          outline: none;
          width: 100%;
        }
        .gb-form-input::placeholder { color: rgba(100,116,139,0.5); }
        .gb-form-input:focus {
          border-color: rgba(6,182,212,0.4) !important;
          box-shadow: 0 0 0 1px rgba(6,182,212,0.14), inset 0 0 16px rgba(6,182,212,0.03);
        }
        .gb-form-input::selection { background: rgba(6,182,212,0.2); }
      `}</style>

      <div
        className="relative overflow-hidden rounded-2xl"
        style={{
          border: "1px solid rgba(6,182,212,0.14)",
          background: "rgba(8,11,20,0.85)",
          backdropFilter: "blur(14px)",
          boxShadow: "0 0 60px -20px rgba(6,182,212,0.08), inset 0 1px 0 rgba(255,255,255,0.03)",
        }}
      >
        {/* ── Corner crosshairs ──────────────────────────────────── */}
        {(["tl","tr","bl","br"] as const).map((pos) => (
          <div
            key={pos}
            aria-hidden
            className="absolute w-3 h-3 pointer-events-none"
            style={{
              top:    pos.startsWith("t") ? 6 : undefined,
              bottom: pos.startsWith("b") ? 6 : undefined,
              left:   pos.endsWith("l")   ? 6 : undefined,
              right:  pos.endsWith("r")   ? 6 : undefined,
            }}
          >
            <div className="absolute top-1/2 left-0 right-0 h-px bg-cyan-500/20" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-cyan-500/20" />
          </div>
        ))}

        {/* ── Terminal header bar ────────────────────────────────── */}
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{ borderBottom: "1px solid rgba(6,182,212,0.07)", background: "rgba(6,182,212,0.03)" }}
        >
          <div className="flex items-center gap-3">
            {/* Window dots */}
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(239,68,68,0.5)" }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(251,191,36,0.5)" }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#22d3ee", opacity: 0.7, boxShadow: "0 0 6px 1px rgba(6,182,212,0.5)" }} />
            </div>
            <div className="w-px h-3 bg-slate-700" />
            <span className="font-mono text-[11px] text-slate-500">
              <span className="text-cyan-400">&gt;_</span>{" "}
              visitor_log.write()
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: "#22d3ee",
                boxShadow: "0 0 6px 2px rgba(6,182,212,0.5)",
                animation: "gbBar 1.8s ease-in-out infinite alternate",
              }}
            />
            <span className="font-mono text-[9px] text-cyan-400 tracking-widest">OPEN_CHANNEL</span>
          </div>
        </div>

        {/* ── Inline error banner ────────────────────────────────── */}
        {errorMsg && (
          <div
            className="flex items-center gap-3 px-5 py-3 mx-5 mt-4 rounded-xl"
            style={{
              border: "1px solid rgba(239,68,68,0.2)",
              background: "rgba(239,68,68,0.07)",
            }}
          >
            <AlertCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
            <span className="font-mono text-[11px] text-red-400 flex-1">{errorMsg}</span>
            <button
              onClick={() => setErrorMsg(null)}
              className="text-red-600 hover:text-red-400 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* ── Form body ──────────────────────────────────────────── */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">

          {/* Name field */}
          <div>
            <label className="flex items-center gap-2 mb-2">
              <span className="font-mono text-[9px] text-cyan-500 tracking-widest">IDENT_NAME</span>
              <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(6,182,212,0.2), transparent)" }} />
              <span
                className="font-mono text-[9px]"
                style={{ color: nameCount > 40 ? "#f87171" : "#1e293b" }}
              >
                {nameCount}/48
              </span>
            </label>
            <div className="relative">
              <div
                className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-[11px] pointer-events-none select-none"
                style={{ color: "rgba(6,182,212,0.4)" }}
              >
                &gt;
              </div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                maxLength={48}
                className="gb-form-input rounded-xl pl-8 pr-4 py-2.5"
              />
            </div>
          </div>

          {/* Message field */}
          <div>
            <label className="flex items-center gap-2 mb-2">
              <span className="font-mono text-[9px] text-cyan-500 tracking-widest">TRANSMISSION</span>
              <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(6,182,212,0.2), transparent)" }} />
              <span
                className="font-mono text-[9px]"
                style={{ color: charCount > 240 ? "#f87171" : "#1e293b" }}
              >
                {charCount}/280
              </span>
            </label>
            <div className="relative">
              {/* Line numbers */}
              <div
                aria-hidden
                className="absolute left-3 top-3 flex flex-col gap-[18px] pointer-events-none select-none"
              >
                {[1,2,3,4].map((n) => (
                  <span key={n} className="font-mono text-[9px] text-slate-700 leading-none">{n}</span>
                ))}
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Thoughts on SaurabhOS..."
                rows={4}
                maxLength={280}
                className="gb-form-input resize-none rounded-xl pl-8 pr-4 py-2.5"
                style={{ lineHeight: "1.75rem" }}
              />
            </div>
          </div>

          {/* Footer row */}
          <div className="flex items-center justify-between gap-4 pt-1">
            <span className="font-mono text-[10px] text-slate-700">
              // No login required. Entry is public.
            </span>

            <button
              type="submit"
              disabled={isPending}
              className="group relative flex items-center gap-2.5 font-mono text-[11px] font-bold tracking-wider transition-all duration-200 overflow-hidden"
              style={{
                padding: "10px 20px",
                background: isPending
                  ? "rgba(6,182,212,0.08)"
                  : "rgba(6,182,212,0.11)",
                border: "1px solid rgba(6,182,212,0.3)",
                color: "#22d3ee",
                clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                opacity: isPending ? 0.7 : 1,
              }}
              onMouseEnter={(e) => {
                if (isPending) return;
                const b = e.currentTarget;
                b.style.background   = "rgba(6,182,212,0.18)";
                b.style.borderColor  = "rgba(6,182,212,0.55)";
                b.style.boxShadow    = "0 0 20px -4px rgba(6,182,212,0.35)";
              }}
              onMouseLeave={(e) => {
                const b = e.currentTarget;
                b.style.background   = "rgba(6,182,212,0.11)";
                b.style.borderColor  = "rgba(6,182,212,0.3)";
                b.style.boxShadow    = "none";
              }}
            >
              {/* Shimmer sweep */}
              <span
                aria-hidden
                className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.1), transparent)",
                  transition: "transform 0.6s ease",
                }}
              />

              {isPending ? (
                <>
                  <span className="relative z-10 flex gap-0.5">
                    {[0,1,2].map((i) => (
                      <span
                        key={i}
                        className="inline-block w-1 h-1 rounded-full bg-cyan-400"
                        style={{ animation: `gbBar 0.7s ${i * 0.15}s ease-in-out infinite alternate` }}
                      />
                    ))}
                  </span>
                  <span className="relative z-10">PUSHING</span>
                </>
              ) : (
                <>
                  <span className="relative z-10">PUSH_ENTRY</span>
                  <Send
                    size={12}
                    className="relative z-10 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}