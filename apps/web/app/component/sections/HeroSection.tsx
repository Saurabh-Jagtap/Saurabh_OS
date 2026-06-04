import React from "react";
import { FolderGit2, ArrowRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import Navbar from "../layout/Navbar";
import { EngineeringWorkspace } from "../hero/EngineeringWorkspace";

const HeroSection = () => {
    return (
        <section className="relative min-h-screen overflow-hidden bg-[#080B14] text-slate-100">

            {/* Grid Background */}
            <div
                className="absolute inset-0 opacity-100"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)
          `,
                    backgroundSize: "48px 48px",
                }}
            />

            {/* Animated Scan Line */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute h-px w-full bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent animate-[scan_8s_linear_infinite]" />
            </div>

            {/* Glow Orbs */}
            <div className="absolute -left-32 -top-20 h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-[120px]" />

            <div className="absolute right-0 top-40 h-[400px] w-[400px] rounded-full bg-violet-500/20 blur-[120px]" />

            <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-cyan-500/20 blur-[120px]" />

            <Navbar />

            <div className="relative z-10 mx-auto max-w-7xl grid min-h-[calc(100vh-80px)] grid-cols-2 items-center gap-24 px-8">

                {/* LEFT */}
                <div className="max-w-2xl">

                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 font-mono text-xs uppercase tracking-wider text-emerald-400">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        System Status: Online
                    </div>

                    <h1 className="mb-8 text-7xl font-black leading-none tracking-tight">
                        Welcome to
                        <br />
                        <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                            SaurabhOS
                        </span>
                    </h1>

                    <p className="mb-10 max-w-lg font-mono text-base leading-8 text-slate-400">
                        A personal engineering workspace documenting my transition
                        from developer to engineer through building systems,
                        shipping products, and learning in public.
                    </p>

                    <div className="mb-12 space-y-3 font-mono text-sm">
                        <div className="text-emerald-400">
                            &gt; building in public_
                        </div>

                        <div className="text-violet-400">
                            &gt; engineering in progress_
                        </div>

                        <div className="text-cyan-400">
                            &gt; currently shipping SaurabhOS_
                        </div>
                    </div>

                    <div className="flex gap-4">

                        <Button className="h-12 bg-indigo-500 hover:bg-indigo-600">
                            <FolderGit2 className="mr-2 h-4 w-4" />
                            View Projects
                        </Button>

                        <Button
                            variant="outline"
                            className="h-12 border-slate-700 bg-slate-900/50 text-slate-300 hover:bg-slate-800"
                        >
                            Engineering Journey
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>

                    </div>
                </div>

                {/* RIGHT */}
                <div className="min-w-0 flex justify-end">
                    <EngineeringWorkspace />
                </div>

            </div>
        </section>
    );
};

export default HeroSection;