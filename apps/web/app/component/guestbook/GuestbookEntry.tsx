"use client";

// GuestbookEntry.tsx
// ═══════════════════════════════════════════════════════════════════
// DESIGN ONLY changes — zero logic changes.
// • alert() replaced with an inline ConfirmModal component
// • Palette unified to cyan/indigo (matches HeroSection + Navbar)
// • Glass card matches ContactSection / JourneySection panel language
// • Corner brackets, spark border, terminal prompt — all SaurabhOS-native
// • All trpc mutations, owner checks, edit/save flow: UNTOUCHED
// ═══════════════════════════════════════════════════════════════════

import { useEffect, useState } from "react";
import { trpc } from "~/trpc/client";
import { Pencil, Trash2, X, Check, RotateCcw, AlertTriangle } from "lucide-react";

// ─── Inline confirm modal (replaces window.alert) ─────────────────
function ConfirmModal({
  onConfirm,
  onCancel,
  isPending,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
}) {
  return (
    // Backdrop — covers entire viewport, pointer-events-auto so clicks work
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
      onClick={onCancel}
    >
      <div
        className="relative w-full max-w-sm overflow-hidden"
        style={{
          border: "1px solid rgba(239,68,68,0.25)",
          background: "rgba(8,11,20,0.97)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 0 60px -12px rgba(239,68,68,0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Corner brackets */}
        {(["tl","tr","bl","br"] as const).map((p) => (
          <span
            key={p}
            aria-hidden
            style={{
              position: "absolute",
              width: 10, height: 10,
              top:    p.startsWith("t") ? 0 : undefined,
              bottom: p.startsWith("b") ? 0 : undefined,
              left:   p.endsWith("l")   ? 0 : undefined,
              right:  p.endsWith("r")   ? 0 : undefined,
              borderTop:    p.startsWith("t") ? "1px solid rgba(239,68,68,0.4)" : undefined,
              borderBottom: p.startsWith("b") ? "1px solid rgba(239,68,68,0.4)" : undefined,
              borderLeft:   p.endsWith("l")   ? "1px solid rgba(239,68,68,0.4)" : undefined,
              borderRight:  p.endsWith("r")   ? "1px solid rgba(239,68,68,0.4)" : undefined,
            }}
          />
        ))}

        {/* Chrome bar */}
        <div
          className="flex items-center gap-2 px-4 py-2.5"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: "rgba(239,68,68,0.04)" }}
        >
          <div className="w-2 h-2 rounded-full" style={{ background: "rgba(239,68,68,0.6)" }} />
          <div className="w-2 h-2 rounded-full" style={{ background: "rgba(251,191,36,0.5)" }} />
          <div className="w-2 h-2 rounded-full" style={{ background: "rgba(52,211,153,0.4)" }} />
          <span className="ml-2 font-mono text-[10px] text-slate-600">
            saurabh@os:~/guestbook — confirm_delete
          </span>
          <button
            onClick={onCancel}
            className="ml-auto text-slate-600 hover:text-slate-400 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-5">
          <div className="flex items-start gap-4">
            <div
              className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl"
              style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}
            >
              <AlertTriangle className="w-4 h-4 text-red-400" />
            </div>
            <div>
              <div className="font-semibold text-slate-100 text-sm mb-1">Delete entry?</div>
              <p className="font-mono text-[11px] leading-5 text-slate-500">
                This action is permanent. Your message will be removed from the guestbook log.
              </p>
            </div>
          </div>

          {/* System log flavour */}
          <div
            className="rounded-lg px-3 py-2.5"
            style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.03)" }}
          >
            <span className="font-mono text-[10px] text-red-400">&gt;_</span>
            <span className="font-mono text-[10px] text-slate-600 ml-2">
              rm -rf guestbook/entry --no-recover
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <button
              onClick={onCancel}
              disabled={isPending}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-[11px] text-slate-400 hover:text-slate-200 transition-colors"
              style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)" }}
            >
              <RotateCcw className="w-3 h-3" />
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isPending}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-[11px] font-bold text-red-300 transition-all duration-200"
              style={{
                background: "rgba(239,68,68,0.12)",
                border: "1px solid rgba(239,68,68,0.3)",
                clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
                opacity: isPending ? 0.6 : 1,
              }}
            >
              {isPending ? (
                <span className="flex gap-0.5">
                  {[0,1,2].map((i) => (
                    <span key={i} className="inline-block w-1 h-1 rounded-full bg-red-400"
                      style={{ animation: `gbBar 0.7s ${i*0.15}s ease-in-out infinite alternate` }} />
                  ))}
                </span>
              ) : (
                <Trash2 className="w-3 h-3" />
              )}
              {isPending ? "Deleting..." : "Delete entry"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Props (unchanged) ────────────────────────────────────────────
interface GuestbookEntryProps {
  id: string;
  visitorId: string;
  name: string;
  message: string;
  createdAt: string;
}

export default function GuestbookEntry({
  id,
  visitorId,
  name,
  message,
  createdAt,
}: GuestbookEntryProps) {
  // ── State (all original, plus showConfirm for modal) ──────────
  const [currentVisitorId, setCurrentVisitorId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message);
  const [showConfirm, setShowConfirm] = useState(false); // ← replaces alert

  const utils = trpc.useUtils();

  const deleteEntry = trpc.guestbook.deleteEntry.useMutation({
    onSuccess: async () => {
      await utils.guestbook.getEntries.invalidate();
    },
  });

  const updateEntry = trpc.guestbook.updateEntry.useMutation({
    onSuccess: async () => {
      await utils.guestbook.getEntries.invalidate();
    },
  });

  useEffect(() => {
    setCurrentVisitorId(localStorage.getItem("visitor_id"));
  }, []);

  const isOwner = currentVisitorId === visitorId;

  // ── Handlers (logic unchanged, alert replaced) ────────────────
  async function handleDelete() {
    await deleteEntry.mutateAsync({ entryId: id, visitorId });
    setShowConfirm(false);
  }

  async function handleSave() {
    await updateEntry.mutateAsync({ entryId: id, visitorId, message: editedMessage });
    setIsEditing(false);
  }

  // ── Deterministic accent per visitor ──────────────────────────
  const ACCENTS = [
    { text: "#22d3ee", bg: "rgba(6,182,212,0.08)",   border: "rgba(6,182,212,0.25)",   glow: "rgba(6,182,212,0.35)"   },
    { text: "#e879f9", bg: "rgba(217,70,239,0.08)",  border: "rgba(217,70,239,0.25)",  glow: "rgba(217,70,239,0.35)"  },
    { text: "#34d399", bg: "rgba(52,211,153,0.08)",  border: "rgba(52,211,153,0.25)",  glow: "rgba(52,211,153,0.35)"  },
    { text: "#818cf8", bg: "rgba(99,102,241,0.08)",  border: "rgba(99,102,241,0.25)",  glow: "rgba(99,102,241,0.35)"  },
    { text: "#fbbf24", bg: "rgba(251,191,36,0.08)",  border: "rgba(251,191,36,0.25)",  glow: "rgba(251,191,36,0.35)"  },
  ];
  const accent = ACCENTS[
    name.split("").reduce((s, c) => s + c.charCodeAt(0), 0) % ACCENTS.length
  ]!;

  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  // Short fake hex id from name
  const entryId = name
    .split("").reduce((s, c) => (s * 31 + c.charCodeAt(0)) & 0xffffff, 0)
    .toString(16).padStart(6, "0").slice(0, 6);

  return (
    <>
      {/* ── Confirm delete modal ──────────────────────────────────── */}
      {showConfirm && (
        <ConfirmModal
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
          isPending={deleteEntry.isPending}
        />
      )}

      {/* ── Entry card ────────────────────────────────────────────── */}
      <style>{`
        @keyframes gbBar { from{transform:scaleY(.4);opacity:.4} to{transform:scaleY(1.2);opacity:1} }
        .gb-entry-card { transition: border-color .25s, box-shadow .25s; }
        .gb-entry-card:hover { border-color: ${accent.border} !important; box-shadow: 0 0 28px -8px ${accent.glow}; }
        .gb-entry-textarea:focus { outline:none; border-color: rgba(6,182,212,0.4) !important; box-shadow: 0 0 0 1px rgba(6,182,212,0.15); }
        .gb-entry-textarea::placeholder { color: rgba(100,116,139,0.5); }
      `}</style>

      <div
        className="gb-entry-card group relative overflow-hidden rounded-2xl"
        style={{
          border: "1px solid rgba(255,255,255,0.05)",
          background: "rgba(8,11,20,0.72)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Left accent bar — colour-matched to visitor */}
        <div
          aria-hidden
          className="absolute left-0 top-0 bottom-0 w-[2px] rounded-l-2xl"
          style={{ background: `linear-gradient(180deg, ${accent.text}cc, transparent)` }}
        />

        {/* Hover top-right ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle, ${accent.text}18, transparent 70%)` }}
        />

        {/* Corner brackets — appear on hover */}
        {(["tl","br"] as const).map((p) => (
          <span
            key={p}
            aria-hidden
            className="absolute w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              top:    p === "tl" ? 0 : undefined,
              bottom: p === "br" ? 0 : undefined,
              left:   p === "tl" ? 0 : undefined,
              right:  p === "br" ? 0 : undefined,
              borderTop:    p === "tl" ? `1px solid ${accent.border}` : undefined,
              borderLeft:   p === "tl" ? `1px solid ${accent.border}` : undefined,
              borderBottom: p === "br" ? `1px solid ${accent.border}` : undefined,
              borderRight:  p === "br" ? `1px solid ${accent.border}` : undefined,
            }}
          />
        ))}

        <div className="flex gap-4 px-5 py-4 pl-6">
          {/* ── Avatar ─────────────────────────────────────────────── */}
          <div className="relative flex-shrink-0">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl font-mono text-sm font-black"
              style={{
                background: accent.bg,
                border: `1px solid ${accent.border}`,
                color: accent.text,
                boxShadow: `0 0 14px -3px ${accent.glow}`,
              }}
            >
              {initials}
            </div>
            {/* Status dot */}
            <div
              className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#080B14]"
              style={{ background: accent.text }}
            />
          </div>

          {/* ── Content ────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">

            {/* Header row */}
            <div className="flex items-start justify-between gap-3 mb-2.5">
              <div className="flex items-center gap-2 flex-wrap min-w-0">
                <span className="text-sm font-bold text-slate-100 truncate">{name}</span>
                <span
                  className="font-mono text-[9px] px-1.5 py-0.5 rounded flex-shrink-0"
                  style={{ background: accent.bg, color: accent.text, border: `1px solid ${accent.border}` }}
                >
                  VISITOR
                </span>
              </div>
              <div className="flex items-center gap-2.5 flex-shrink-0">
                <span
                  className="font-mono text-[9px] px-1.5 py-0.5 rounded"
                  style={{ background: "rgba(255,255,255,0.03)", color: "#334155", border: "1px solid rgba(255,255,255,0.04)" }}
                >
                  #{entryId}
                </span>
                <span className="font-mono text-[10px] text-slate-600 hidden sm:block">{createdAt}</span>
              </div>
            </div>

            {/* Terminal message block */}
            <div
              className="rounded-xl overflow-hidden"
              style={{
                background: "rgba(0,0,0,0.28)",
                border: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              {/* Terminal chrome */}
              <div
                className="flex items-center gap-2 px-3 py-2"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.03)", background: "rgba(0,0,0,0.15)" }}
              >
                <span className="font-mono text-[10px]" style={{ color: accent.text }}>&gt;_</span>
                <span className="font-mono text-[10px] text-slate-700">visitor@saurabhos:~$</span>
                <span className="ml-auto font-mono text-[9px] text-slate-700 sm:hidden">{createdAt}</span>
              </div>

              {/* Message / edit textarea */}
              <div className="px-3 py-2.5">
                {isEditing ? (
                  <textarea
                    value={editedMessage}
                    onChange={(e) => setEditedMessage(e.target.value)}
                    rows={4}
                    className="gb-entry-textarea w-full resize-none rounded-lg px-3 py-2.5 font-mono text-sm text-slate-200 transition-all duration-200"
                    style={{
                      background: "rgba(0,0,0,0.4)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      caretColor: accent.text,
                      lineHeight: "1.75rem",
                    }}
                  />
                ) : (
                  <p className="font-mono text-[13px] leading-7 text-slate-400">
                    {message}
                  </p>
                )}
              </div>
            </div>

            {/* ── Owner actions ─────────────────────────────────────── */}
            {isOwner && (
              <div className="flex gap-2 mt-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      disabled={updateEntry.isPending}
                      className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[11px] font-bold text-emerald-400 transition-all duration-200 hover:shadow-[0_0_16px_rgba(52,211,153,0.2)]"
                      style={{
                        border: "1px solid rgba(52,211,153,0.2)",
                        background: "rgba(52,211,153,0.08)",
                        opacity: updateEntry.isPending ? 0.6 : 1,
                      }}
                    >
                      <Check className="w-3 h-3" />
                      {updateEntry.isPending ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                      onClick={() => { setEditedMessage(message); setIsEditing(false); }}
                      className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[11px] text-slate-400 hover:text-slate-200 transition-colors"
                      style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)" }}
                    >
                      <RotateCcw className="w-3 h-3" />
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[11px] transition-all duration-200 hover:text-cyan-200"
                      style={{
                        border: "1px solid rgba(6,182,212,0.18)",
                        background: "rgba(6,182,212,0.06)",
                        color: "#22d3ee",
                      }}
                    >
                      <Pencil className="w-3 h-3" />
                      Edit
                    </button>
                    <button
                      onClick={() => setShowConfirm(true)} // ← modal, not alert
                      className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[11px] transition-all duration-200 hover:text-red-300"
                      style={{
                        border: "1px solid rgba(239,68,68,0.18)",
                        background: "rgba(239,68,68,0.06)",
                        color: "#f87171",
                      }}
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}