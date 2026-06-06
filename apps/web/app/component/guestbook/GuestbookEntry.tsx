interface GuestbookEntryProps {
    name: string;
    message: string;
    createdAt: string;
}

export default function GuestbookEntry({
    name,
    message,
    createdAt,
}: GuestbookEntryProps) {
    const initials = name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    // Deterministic accent color per visitor name (cycles through palette)
    const ACCENTS = [
        { text: "#22d3ee", bg: "rgba(6,182,212,0.08)",   border: "rgba(6,182,212,0.25)",  glow: "rgba(6,182,212,0.4)"  },
        { text: "#e879f9", bg: "rgba(217,70,239,0.08)",  border: "rgba(217,70,239,0.25)", glow: "rgba(217,70,239,0.4)" },
        { text: "#34d399", bg: "rgba(52,211,153,0.08)",  border: "rgba(52,211,153,0.25)", glow: "rgba(52,211,153,0.4)" },
        { text: "#818cf8", bg: "rgba(99,102,241,0.08)",  border: "rgba(99,102,241,0.25)", glow: "rgba(99,102,241,0.4)" },
        { text: "#fbbf24", bg: "rgba(251,191,36,0.08)",  border: "rgba(251,191,36,0.25)", glow: "rgba(251,191,36,0.4)" },
    ];
    const accent = ACCENTS[
        name.split("").reduce((s, c) => s + c.charCodeAt(0), 0) % ACCENTS.length
    ]!;

    // Fake short hex id from name for the terminal label
    const entryId = name
        .split("")
        .reduce((s, c) => (s * 31 + c.charCodeAt(0)) & 0xffffff, 0)
        .toString(16)
        .padStart(6, "0")
        .slice(0, 6);

    return (
        <div
            className="group relative overflow-hidden rounded-2xl transition-all duration-300"
            style={{
                border: `1px solid rgba(255,255,255,0.05)`,
                background: "rgba(8,11,20,0.7)",
                backdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = accent.border;
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 32px -8px ${accent.glow}`;
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.05)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
            }}
        >
            {/* Left accent bar */}
            <div
                className="absolute left-0 top-0 bottom-0 w-[2px] rounded-l-2xl"
                style={{ background: `linear-gradient(180deg, ${accent.text}, transparent)`, opacity: 0.6 }}
            />

            {/* Subtle top-right glow on hover */}
            <div
                className="pointer-events-none absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle, ${accent.text}18, transparent 70%)` }}
            />

            <div className="flex gap-4 px-5 py-4 pl-6">

                {/* Avatar */}
                <div className="flex-shrink-0 relative">
                    <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl font-mono text-sm font-black"
                        style={{
                            background: accent.bg,
                            border: `1px solid ${accent.border}`,
                            color: accent.text,
                            boxShadow: `0 0 12px -2px ${accent.glow}`,
                        }}
                    >
                        {initials}
                    </div>
                    {/* Online dot */}
                    <div
                        className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#080B14]"
                        style={{ background: accent.text }}
                    />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">

                    {/* Header row */}
                    <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-bold text-slate-100">{name}</span>
                            <span
                                className="font-mono text-[9px] px-1.5 py-0.5 rounded"
                                style={{ background: accent.bg, color: accent.text, border: `1px solid ${accent.border}` }}
                            >
                                VISITOR
                            </span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="font-mono text-[9px] text-slate-700">#{entryId}</span>
                            <span className="font-mono text-[10px] text-slate-600">{createdAt}</span>
                        </div>
                    </div>

                    {/* Terminal prompt + message */}
                    <div
                        className="rounded-xl px-3 py-2.5"
                        style={{
                            background: "rgba(0,0,0,0.3)",
                            border: "1px solid rgba(255,255,255,0.03)",
                        }}
                    >
                        <div className="flex gap-2 mb-1.5">
                            <span className="font-mono text-[10px]" style={{ color: accent.text }}>
                                &gt;_
                            </span>
                            <span className="font-mono text-[10px] text-slate-600">
                                visitor@saurabhos:~$
                            </span>
                        </div>
                        <p className="font-mono text-[12px] leading-6 text-slate-300 pl-5">
                            {message}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}