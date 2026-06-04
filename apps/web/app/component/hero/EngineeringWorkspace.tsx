import React from 'react'

export function EngineeringWorkspace() {
    const workspaceItems = [
        {
            icon: "🎯",
            label: "Current Mission",
            value: "Build SaurabhOS MVP",
            description: "A portfolio that runs like a system.",
            badge: "In Progress",
            color: "indigo",
        },
        {
            icon: "👤",
            label: "Current Focus",
            value: "Full Stack Engineering",
            description: "Building scalable systems.",
            badge: "Focus Mode",
            color: "green",
        },
        {
            icon: "📦",
            label: "Current Stack",
            value: "Next.js · tRPC · PostgreSQL",
            description: "TypeScript · React · Tailwind",
            badge: "Our Tools",
            color: "cyan",
        },
        {
            icon: "⚡",
            label: "Current Status",
            value: "Shipping",
            description: "Small wins daily.",
            badge: "Keep Shipping",
            color: "amber",
        },
    ];

    return (
        <div className="w-full max-w-[650px] overflow-hidden rounded-2xl border border-indigo-500/20 bg-slate-900/80 backdrop-blur-xl">

            <div className="flex items-center justify-between border-b border-indigo-500/10 bg-indigo-500/5 px-5 py-4">

                <div className="font-mono text-xs uppercase tracking-widest text-slate-400">
                    &gt;_ Engineering Workspace
                </div>

                <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-indigo-500" />
                    <div className="h-3 w-3 rounded-full bg-amber-500" />
                    <div className="h-3 w-3 rounded-full bg-emerald-500" />
                </div>

            </div>

            <div className="space-y-3 p-5">

                {workspaceItems.map((item) => (
                    <div
                        key={item.label}
                        className="flex items-center gap-4 rounded-xl border border-indigo-500/10 bg-slate-800/50 p-4"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-700 text-xl">
                            {item.icon}
                        </div>

                        <div>
                            <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-indigo-400">
                                {item.label}
                            </p>

                            <h3 className="font-semibold text-slate-100">
                                {item.value}
                            </h3>

                            <div className="rounded-md bg-indigo-500/10 px-2 py-1 font-mono text-[10px] uppercase text-indigo-400">
                                {item.badge}
                            </div>
                            <p className="font-mono text-xs text-slate-500">
                                {item.description}
                            </p>
                        </div>

                    </div>
                ))}

            </div>
        </div>
    );
}
