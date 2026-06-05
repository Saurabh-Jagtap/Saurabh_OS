export default function Footer() {
    return (
        <footer className="relative overflow-hidden border-t border-indigo-500/10 bg-[#060810]">

            {/* Grid Background */}
            <div
                className="absolute inset-0 opacity-50"
                style={{
                    backgroundImage: `
                    linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)
                `,
                    backgroundSize: "48px 48px",
                }}
            />

            <div className="relative z-10 mx-auto max-w-7xl px-8 py-16">

                {/* Terminal */}

                <div className="overflow-hidden rounded-2xl border border-indigo-500/10 bg-[#080B14]">

                    <div className="flex items-center gap-2 border-b border-indigo-500/10 bg-slate-900 px-4 py-3">

                        <div className="h-3 w-3 rounded-full bg-red-500" />
                        <div className="h-3 w-3 rounded-full bg-amber-500" />
                        <div className="h-3 w-3 rounded-full bg-emerald-500" />

                        <span className="ml-2 font-mono text-xs text-slate-500">
                            saurabh@os:~/system
                        </span>

                    </div>

                    <div className="space-y-3 p-6 font-mono text-sm">

                        <div className="text-slate-400">
                            <span className="text-indigo-400">
                                saurabh@os:~$
                            </span>{" "}
                            system.status
                        </div>

                        <div className="text-emerald-400">
                            ✓ Status: Online
                        </div>

                        <div className="text-cyan-400">
                            ✓ Current Mission: Developer → Engineer
                        </div>

                        <div className="text-violet-400">
                            ✓ Building: SaurabhOS
                        </div>

                        <div className="text-amber-400">
                            ✓ Learning: System Design & Architecture
                        </div>

                        <div className="pt-2 text-slate-600">
                            Built with Next.js • tRPC • PostgreSQL • TypeScript
                        </div>

                        <div className="text-slate-500">
                            <span className="text-indigo-400">
                                saurabh@os:~$
                            </span>{" "}
                            <span className="inline-block h-4 w-2 animate-pulse bg-indigo-400 align-middle" />
                        </div>

                    </div>

                </div>

                {/* Bottom Row */}

                <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-indigo-500/10 pt-8 md:flex-row">

                    <div>

                        <h3 className="text-lg font-bold text-slate-100">
                            SaurabhOS
                        </h3>

                        <p className="mt-1 font-mono text-xs text-slate-500">
                            A Personal Engineering Workspace
                        </p>

                    </div>

                    <div className="flex items-center gap-6 font-mono text-xs text-slate-500">

                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noreferrer"
                            className="transition-colors hover:text-indigo-400"
                        >
                            GitHub
                        </a>

                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noreferrer"
                            className="transition-colors hover:text-indigo-400"
                        >
                            LinkedIn
                        </a>

                        <a
                            href="https://x.com"
                            target="_blank"
                            rel="noreferrer"
                            className="transition-colors hover:text-indigo-400"
                        >
                            X / Twitter
                        </a>

                    </div>

                </div>

                <div className="mt-6 text-center font-mono text-xs text-slate-600">
                    © {new Date().getFullYear()} SaurabhOS · Still Learning · Still Building · Still Shipping
                </div>

            </div>

        </footer>
    );
}