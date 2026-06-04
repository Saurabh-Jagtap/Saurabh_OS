import ArchitectureNode from "../architecture/ArchitectureNode";

const presentationNodes = [
    "Hero",
    "Projects",
    "Journey",
    "Guestbook",
    "Contact",
];

const applicationNodes = [
    "tRPC Routers",
    "Services",
    "Validation",
    "Shared Types",
];

const dataNodes = [
    "Visitors",
    "Projects",
    "Reactions",
    "Guestbook",
];

export default function ArchitectureSection() {
    return (
        <section className="relative overflow-hidden bg-[#080B14] py-28">

            {/* Grid Background */}
            <div
                className="absolute inset-0 opacity-100"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)
          `,
                    backgroundSize: "48px 48px",
                }}
            />

            {/* Glow */}
            <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-[120px]" />

            <div className="relative z-10 mx-auto max-w-7xl px-8">

                {/* Header */}

                <div className="mb-20 text-center">

                    <div className="mb-4 inline-flex rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 font-mono text-xs uppercase tracking-wider text-indigo-400">
                        🗺 Architecture Map
                    </div>

                    <h2 className="mb-4 text-5xl font-black text-slate-100">
                        System{" "}
                        <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                            Architecture
                        </span>
                    </h2>

                    <p className="font-mono text-sm text-slate-500">
                        // How SaurabhOS is structured internally
                    </p>

                </div>

                {/* Core Node */}

                <div className="mb-12 flex justify-center">

                    <ArchitectureNode
                        icon="🧠"
                        title="SaurabhOS"
                        subtitle="Personal Engineering Workspace"
                        badge="CORE"
                    />

                </div>

                {/* Connector */}

                <div className="mb-12 flex justify-center">
                    <div className="h-16 w-px bg-gradient-to-b from-indigo-500/60 to-transparent" />
                </div>

                {/* Layer Nodes */}

                <div className="grid gap-8 lg:grid-cols-3">

                    {/* Presentation */}

                    <div className="rounded-3xl border border-indigo-500/10 bg-slate-900/40 p-6 backdrop-blur-sm">

                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-slate-100">
                                🎨 Presentation Layer
                            </h3>

                            <p className="mt-1 font-mono text-xs text-slate-500">
                                User-facing experience
                            </p>
                        </div>

                        <div className="space-y-3">

                            {presentationNodes.map((item) => (
                                <div
                                    key={item}
                                    className="rounded-xl border border-indigo-500/10 bg-slate-800/50 px-4 py-3 text-sm text-slate-300"
                                >
                                    {item}
                                </div>
                            ))}

                        </div>

                    </div>

                    {/* Application */}

                    <div className="rounded-3xl border border-cyan-500/10 bg-slate-900/40 p-6 backdrop-blur-sm">

                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-slate-100">
                                ⚙️ Application Layer
                            </h3>

                            <p className="mt-1 font-mono text-xs text-slate-500">
                                Business logic & APIs
                            </p>
                        </div>

                        <div className="space-y-3">

                            {applicationNodes.map((item) => (
                                <div
                                    key={item}
                                    className="rounded-xl border border-cyan-500/10 bg-slate-800/50 px-4 py-3 text-sm text-slate-300"
                                >
                                    {item}
                                </div>
                            ))}

                        </div>

                    </div>

                    {/* Data */}

                    <div className="rounded-3xl border border-emerald-500/10 bg-slate-900/40 p-6 backdrop-blur-sm">

                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-slate-100">
                                🗄️ Data Layer
                            </h3>

                            <p className="mt-1 font-mono text-xs text-slate-500">
                                Persistent storage
                            </p>
                        </div>

                        <div className="space-y-3">

                            {dataNodes.map((item) => (
                                <div
                                    key={item}
                                    className="rounded-xl border border-emerald-500/10 bg-slate-800/50 px-4 py-3 text-sm text-slate-300"
                                >
                                    {item}
                                </div>
                            ))}

                        </div>

                    </div>

                </div>

                {/* Footer Cards */}

                <div className="mt-16 grid gap-4 md:grid-cols-4">

                    <div className="rounded-2xl border border-indigo-500/10 bg-slate-900/60 p-4">
                        <div className="text-2xl">⚛️</div>
                        <div className="mt-2 text-sm font-semibold text-slate-100">
                            Next.js
                        </div>
                    </div>

                    <div className="rounded-2xl border border-cyan-500/10 bg-slate-900/60 p-4">
                        <div className="text-2xl">🔗</div>
                        <div className="mt-2 text-sm font-semibold text-slate-100">
                            tRPC
                        </div>
                    </div>

                    <div className="rounded-2xl border border-violet-500/10 bg-slate-900/60 p-4">
                        <div className="text-2xl">📦</div>
                        <div className="mt-2 text-sm font-semibold text-slate-100">
                            Monorepo
                        </div>
                    </div>

                    <div className="rounded-2xl border border-emerald-500/10 bg-slate-900/60 p-4">
                        <div className="text-2xl">🗄️</div>
                        <div className="mt-2 text-sm font-semibold text-slate-100">
                            PostgreSQL
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}