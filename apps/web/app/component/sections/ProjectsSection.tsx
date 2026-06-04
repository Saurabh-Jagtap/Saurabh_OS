import {
    ChevronLeft,
    ChevronRight,
    Code,
    ExternalLink,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

// import { FallbackComponent } from "./CustomComponents";

export default function ProjectSection() {
    return (
        <div>
            <section className="bg-neutral-950 px-12 py-24">
                <div className="bg-[radial-gradient(ellipse_120%_80%_at_70%_-10%,oklch(0.488_0.243_264.376/0.18),transparent_60%)] max-w-7xl mx-auto w-full">
                    <main className="px-12 py-10">
                        <div className="flex mb-8 justify-between items-end">
                            <div className="flex flex-col gap-2">
                                <span className="font-medium text-[#a1a1a1] text-xs leading-4 tracking-[3.2px]">
                                    SYSTEM MODULE // 01
                                </span>
                                <h1 className="leading-none font-bold text-neutral-50 text-[32px]">
                                    Projects
                                </h1>
                                <p className="text-[#a1a1a1] text-sm leading-5">
                                    Things I've built, shipped, and learned from.
                                </p>
                            </div>
                            <div className="rounded-full bg-neutral-900 border-white/10 border-1 border-solid flex p-1 items-center gap-1">
                                <button className="font-medium rounded-full bg-neutral-200 text-neutral-900 text-sm leading-5 px-4 py-1.5">
                                    All
                                </button>
                                <button className="transition-colors rounded-full text-[#a1a1a1] text-sm leading-5 px-4 py-1.5">
                                    SaaS
                                </button>
                                <button className="transition-colors rounded-full text-[#a1a1a1] text-sm leading-5 px-4 py-1.5">
                                    Tools
                                </button>
                                <button className="transition-colors rounded-full text-[#a1a1a1] text-sm leading-5 px-4 py-1.5">
                                    Experiments
                                </button>
                            </div>
                        </div>
                        {/* TODO: Replace with projects.map() after backend integration*/}
                        <div className="relative overflow-hidden">
                            <div className="flex gap-6">
                                <Card className="shrink-0 backdrop-blur-md border-[oklch(0.627_0.265_303.9/0.45)] shadow-[0_0_40px_oklch(0.488_0.243_264.376/0.25)] rounded-2xl bg-neutral-900/70 border-black/1 border-1 border-solid p-0 gap-0 w-80 overflow-hidden">
                                    <div className="relative w-full h-40">
                                        <img
                                            src="https://images.unsplash.com/photo-1614850523011-8f49ffc73908?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdyYWRpZW50JTIwYmx1ZSUyMHZpb2xldCUyMGRhcmt8ZW58MXwwfHx8MTc4MDUwNDUyM3ww&ixlib=rb-4.1.0&q=80&w=400"
                                            alt="cover"
                                            className="object-cover w-full h-full"
                                            data-photoid="OzfD79w8ptA"
                                            data-authorname="Codioful (Formerly Gradienta)"
                                            data-authorurl="https://unsplash.com/@codioful"
                                            data-blurhash="L80043fHfWfJfHfZfJfUfVfLfUfN"
                                        />
                                        <div className="bg-gradient-to-t from-card to-transparent absolute inset-0" />
                                    </div>
                                    <CardContent className="flex p-5 flex-col gap-3">
                                        <h3 className="font-bold text-neutral-50 text-lg">
                                            Nimbus Analytics
                                        </h3>
                                        <p className="leading-snug text-[#a1a1a1] text-sm leading-5">
                                            Realtime SaaS dashboard for product metrics with edge
                                            caching and live charts.
                                        </p>
                                        <div className="flex flex-wrap gap-1.5">
                                            <span className="rounded-full bg-neutral-800/60 text-neutral-50 text-xs leading-4 border-white/10 border-1 border-solid px-2 py-0.5">
                                                Next.js
                                            </span>
                                            <span className="rounded-full bg-neutral-800/60 text-neutral-50 text-xs leading-4 border-white/10 border-1 border-solid px-2 py-0.5">
                                                tRPC
                                            </span>
                                            <span className="rounded-full bg-neutral-800/60 text-neutral-50 text-xs leading-4 border-white/10 border-1 border-solid px-2 py-0.5">
                                                Prisma
                                            </span>
                                            <span className="rounded-full bg-neutral-800/60 text-neutral-50 text-xs leading-4 border-white/10 border-1 border-solid px-2 py-0.5">
                                                Tailwind
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="bg-[oklch(1_0_0/0.06)] backdrop-blur-md rounded-full text-neutral-50 text-xs leading-4 border-white/10 border-1 border-solid flex px-2 py-1 items-center gap-1">
                                                🔥 12
                                            </span>
                                            <span className="bg-[oklch(1_0_0/0.06)] backdrop-blur-md rounded-full text-neutral-50 text-xs leading-4 border-white/10 border-1 border-solid flex px-2 py-1 items-center gap-1">
                                                🚀 8
                                            </span>
                                            <span className="bg-[oklch(1_0_0/0.06)] backdrop-blur-md rounded-full text-neutral-50 text-xs leading-4 border-white/10 border-1 border-solid flex px-2 py-1 items-center gap-1">
                                                👏 4
                                            </span>
                                        </div>
                                        <div className="border-white/10 border-t-1 border-r-0 border-b-0 border-l-0 border-solid flex pt-2 items-center gap-5">
                                            <a className="text-[oklch(0.696_0.17_162.48)] text-sm leading-5 flex mt-3 items-center gap-1.5">
                                                {/* <FallbackComponent className="size-4" /> */}
                                                <Code className="size-4" />
                                                Source
                                            </a>
                                            <a className="text-[oklch(0.696_0.17_162.48)] text-sm leading-5 flex mt-3 items-center gap-1.5">
                                                <ExternalLink className="size-4" />
                                                Live Demo
                                            </a>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="shrink-0 backdrop-blur-md rounded-2xl bg-neutral-900/70 border-white/10 border-1 border-solid p-0 gap-0 w-80 overflow-hidden">
                                    <div className="relative w-full h-40">
                                        <img
                                            src="https://images.unsplash.com/photo-1635776062360-af423602aff3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwYWJzdHJhY3QlMjB0ZWNoJTIwbWVzaCUyMGdyYWRpZW50fGVufDF8MHx8fDE3ODA1MDQ1MjN8MA&ixlib=rb-4.1.0&q=80&w=400"
                                            alt="cover"
                                            className="object-cover w-full h-full"
                                            data-photoid="87PP9Zd7MNo"
                                            data-authorname="MagicPattern"
                                            data-authorurl="https://unsplash.com/@magicpattern"
                                            data-blurhash="LwGSlm_NWBM{tRNGIUWBa|RjRjt7"
                                        />
                                        <div className="bg-gradient-to-t from-card to-transparent absolute inset-0" />
                                    </div>
                                    <CardContent className="flex p-5 flex-col gap-3">
                                        <h3 className="font-bold text-neutral-50 text-lg">
                                            Forge CLI
                                        </h3>
                                        <p className="leading-snug text-[#a1a1a1] text-sm leading-5">
                                            A developer toolkit that scaffolds full-stack apps in
                                            seconds from the terminal.
                                        </p>
                                        <div className="flex flex-wrap gap-1.5">
                                            <span className="rounded-full bg-neutral-800/60 text-neutral-50 text-xs leading-4 border-white/10 border-1 border-solid px-2 py-0.5">
                                                TypeScript
                                            </span>
                                            <span className="rounded-full bg-neutral-800/60 text-neutral-50 text-xs leading-4 border-white/10 border-1 border-solid px-2 py-0.5">
                                                Node
                                            </span>
                                            <span className="rounded-full bg-neutral-800/60 text-neutral-50 text-xs leading-4 border-white/10 border-1 border-solid px-2 py-0.5">
                                                Bun
                                            </span>
                                            <span className="rounded-full bg-neutral-800/60 text-neutral-50 text-xs leading-4 border-white/10 border-1 border-solid px-2 py-0.5">
                                                Zod
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="bg-[oklch(1_0_0/0.06)] backdrop-blur-md rounded-full text-neutral-50 text-xs leading-4 border-white/10 border-1 border-solid flex px-2 py-1 items-center gap-1">
                                                🔥 12
                                            </span>
                                            <span className="bg-[oklch(1_0_0/0.06)] backdrop-blur-md rounded-full text-neutral-50 text-xs leading-4 border-white/10 border-1 border-solid flex px-2 py-1 items-center gap-1">
                                                🚀 8
                                            </span>
                                            <span className="bg-[oklch(1_0_0/0.06)] backdrop-blur-md rounded-full text-neutral-50 text-xs leading-4 border-white/10 border-1 border-solid flex px-2 py-1 items-center gap-1">
                                                👏 4
                                            </span>
                                        </div>
                                        <div className="border-white/10 border-t-1 border-r-0 border-b-0 border-l-0 border-solid flex pt-2 items-center gap-5">
                                            <a className="text-[oklch(0.696_0.17_162.48)] text-sm leading-5 flex mt-3 items-center gap-1.5">
                                                {/* <FallbackComponent className="size-4" /> */}
                                                <Code className="size-4" />
                                                Source
                                            </a>
                                            <a className="text-[oklch(0.696_0.17_162.48)] text-sm leading-5 flex mt-3 items-center gap-1.5">
                                                <ExternalLink className="size-4" />
                                                Live Demo
                                            </a>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="shrink-0 backdrop-blur-md rounded-2xl bg-neutral-900/70 border-white/10 border-1 border-solid p-0 gap-0 w-80 overflow-hidden">
                                    <div className="relative w-full h-40">
                                        <img
                                            src="https://images.unsplash.com/photo-1720135885007-454165745e21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBhcHAlMjBpbnRlcmZhY2UlMjBtb2NrdXAlMjBkYXJrfGVufDF8MHx8fDE3ODA1MDQ1MjN8MA&ixlib=rb-4.1.0&q=80&w=400"
                                            alt="cover"
                                            className="object-cover w-full h-full"
                                            data-photoid="TdJgQ3iRM3Y"
                                            data-authorname="Coinstash Australia"
                                            data-authorurl="https://unsplash.com/@coinstash_au"
                                            data-blurhash="L73usRt9IQM[tAogRhRhIRW8xxtB"
                                        />
                                        <div className="bg-gradient-to-t from-card to-transparent absolute inset-0" />
                                    </div>
                                    <CardContent className="flex p-5 flex-col gap-3">
                                        <h3 className="font-bold text-neutral-50 text-lg">
                                            Pulse Wallet
                                        </h3>
                                        <p className="leading-snug text-[#a1a1a1] text-sm leading-5">
                                            A minimal crypto portfolio tracker with live prices and
                                            smart alerts.
                                        </p>
                                        <div className="flex flex-wrap gap-1.5">
                                            <span className="rounded-full bg-neutral-800/60 text-neutral-50 text-xs leading-4 border-white/10 border-1 border-solid px-2 py-0.5">
                                                React
                                            </span>
                                            <span className="rounded-full bg-neutral-800/60 text-neutral-50 text-xs leading-4 border-white/10 border-1 border-solid px-2 py-0.5">
                                                Vite
                                            </span>
                                            <span className="rounded-full bg-neutral-800/60 text-neutral-50 text-xs leading-4 border-white/10 border-1 border-solid px-2 py-0.5">
                                                tRPC
                                            </span>
                                            <span className="rounded-full bg-neutral-800/60 text-neutral-50 text-xs leading-4 border-white/10 border-1 border-solid px-2 py-0.5">
                                                Tailwind
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="bg-[oklch(1_0_0/0.06)] backdrop-blur-md rounded-full text-neutral-50 text-xs leading-4 border-white/10 border-1 border-solid flex px-2 py-1 items-center gap-1">
                                                🔥 12
                                            </span>
                                            <span className="bg-[oklch(1_0_0/0.06)] backdrop-blur-md rounded-full text-neutral-50 text-xs leading-4 border-white/10 border-1 border-solid flex px-2 py-1 items-center gap-1">
                                                🚀 8
                                            </span>
                                            <span className="bg-[oklch(1_0_0/0.06)] backdrop-blur-md rounded-full text-neutral-50 text-xs leading-4 border-white/10 border-1 border-solid flex px-2 py-1 items-center gap-1">
                                                👏 4
                                            </span>
                                        </div>
                                        <div className="border-white/10 border-t-1 border-r-0 border-b-0 border-l-0 border-solid flex pt-2 items-center gap-5">
                                            <a className="text-[oklch(0.696_0.17_162.48)] text-sm leading-5 flex mt-3 items-center gap-1.5">
                                                {/* <FallbackComponent className="size-4" /> */}
                                                <Code className="size-4" />
                                                Source
                                            </a>
                                            <a className="text-[oklch(0.696_0.17_162.48)] text-sm leading-5 flex mt-3 items-center gap-1.5">
                                                <ExternalLink className="size-4" />
                                                Live Demo
                                            </a>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="shrink-0 backdrop-blur-md rounded-2xl bg-neutral-900/70 border-white/10 border-1 border-solid p-0 gap-0 w-80 overflow-hidden">
                                    <div className="relative w-full h-40">
                                        <img
                                            src="https://images.unsplash.com/photo-1613327986042-63d4425a1a5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxwdXJwbGUlMjBibHVlJTIwZmx1aWQlMjBhYnN0cmFjdCUyMGdsb3d8ZW58MXwwfHx8MTc4MDUwNDUyM3ww&ixlib=rb-4.1.0&q=80&w=400"
                                            alt="cover"
                                            className="object-cover w-full h-full"
                                            data-photoid="2CDRjyQw8aQ"
                                            data-authorname="Pawel Czerwinski"
                                            data-authorurl="https://unsplash.com/@pawel_czerwinski"
                                            data-blurhash="L68fyn9XJ5w~9s^UnlI-9r-Y-Es:"
                                        />
                                        <div className="bg-gradient-to-t from-card to-transparent absolute inset-0" />
                                    </div>
                                    <CardContent className="flex p-5 flex-col gap-3">
                                        <h3 className="font-bold text-neutral-50 text-lg">
                                            Aurora Notes
                                        </h3>
                                        <p className="leading-snug text-[#a1a1a1] text-sm leading-5">
                                            An experimental note-taking app powered by local-first
                                            sync.
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="bg-gradient-to-l from-background to-transparent pointer-events-none absolute right-0 top-0 w-24 h-full" />
                        </div>
                    </main>
                </div>
            </section>
        </div>
    );
}
