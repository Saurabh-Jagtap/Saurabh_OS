import {
    ArrowRight,
    Circle,
} from "lucide-react";

export default function JourneySection() {
    return (
        <section className="bg-neutral-950 px-12 py-24">
            <div className="max-w-7xl mx-auto">
                <div className="relative bg-[radial-gradient(ellipse_at_50%_120%,oklch(0.488_0.243_264.376/.18),transparent_60%)] mx-auto w-285 h-239 overflow-hidden">
                    <div className="px-12 pt-8 pb-4">
                        <p className="font-mono text-[#a1a1a1] text-xs leading-4 tracking-[4px]">
                            SYSTEM MODULE // 02
                        </p>
                        <h1 className="leading-tight font-bold text-neutral-50 text-[32px] tracking-tight mt-2">
                            Engineering Journey
                        </h1>
                        <p className="text-[#a1a1a1] text-sm leading-5 mt-1">
                            From writing code to thinking in systems.
                        </p>
                    </div>
                    {/* TODO: Replace timeline with real Saurabh journey before launch*/}
                    <div className="px-12 pt-2 pb-6 overflow-hidden">
                        <div className="relative ml-6">
                            <div className="bg-[linear-gradient(to_bottom,oklch(0.4_0_0),oklch(0.488_0.243_264.376),oklch(0.627_0.265_303.9))] absolute left-0 inset-y-2 w-px" />
                            <div className="relative flex pb-6 items-start gap-6">
                                <div className="size-[14px] bg-[oklch(0.696_0.17_162.48)] shadow-[0_0_2px_oklch(0.696_0.17_162.48)] rounded-full absolute -left-[7px] top-2" />
                                <div className="bg-[oklch(0.205_0_0/.6)] backdrop-blur-sm rounded-xl border-white/10 border-1 border-solid ml-8 p-4 flex-1">
                                    <div className="flex justify-between items-center">
                                        <span className="font-mono text-[#a1a1a1] text-xs leading-4">
                                            2021 — Beginnings
                                        </span>
                                        <span className="rounded-full bg-neutral-800 text-[#a1a1a1] text-[10px] px-2 py-0.5">
                                            Completed
                                        </span>
                                    </div>
                                    <h3 className="font-semibold text-neutral-50 text-base leading-6 mt-1.5">
                                        Started Web Development
                                    </h3>
                                    <p className="text-[#a1a1a1] text-sm leading-5 mt-1">
                                        Began with HTML, CSS and JavaScript fundamentals, building
                                        static pages and small interactive components.
                                    </p>
                                </div>
                            </div>
                            <div className="relative flex pb-6 items-start gap-6">
                                <div className="size-[14px] bg-[oklch(0.488_0.243_264.376)] shadow-[0_0_12px_oklch(0.488_0.243_264.376/.8)] rounded-full absolute -left-[7px] top-2" />
                                <div className="bg-[oklch(0.205_0_0/.6)] backdrop-blur-sm rounded-xl border-white/10 border-1 border-solid ml-8 p-4 flex-1">
                                    <div className="flex justify-between items-center">
                                        <span className="font-mono text-[#a1a1a1] text-xs leading-4">
                                            2022 — Q2
                                        </span>
                                        <span className="rounded-full bg-neutral-800 text-[#a1a1a1] text-[10px] px-2 py-0.5">
                                            Completed
                                        </span>
                                    </div>
                                    <h3 className="font-semibold text-neutral-50 text-base leading-6 mt-1.5">
                                        Built First Full Stack App
                                    </h3>
                                    <p className="text-[#a1a1a1] text-sm leading-5 mt-1">
                                        Connected a React frontend to a Node/Express backend with a
                                        database, shipping a complete CRUD product.
                                    </p>
                                </div>
                            </div>
                            <div className="relative flex pb-6 items-start gap-6">
                                <div className="size-[14px] bg-[oklch(0.488_0.243_264.376)] shadow-[0_0_12px_oklch(0.488_0.243_264.376/.8)] rounded-full absolute -left-[7px] top-2" />
                                <div className="bg-[oklch(0.205_0_0/.6)] backdrop-blur-sm rounded-xl border-white/10 border-1 border-solid ml-8 p-4 flex-1">
                                    <div className="flex justify-between items-center">
                                        <span className="font-mono text-[#a1a1a1] text-xs leading-4">
                                            2022 — Q4
                                        </span>
                                        <span className="rounded-full bg-neutral-800 text-[#a1a1a1] text-[10px] px-2 py-0.5">
                                            Completed
                                        </span>
                                    </div>
                                    <h3 className="font-semibold text-neutral-50 text-base leading-6 mt-1.5">
                                        Learned Next.js
                                    </h3>
                                    <p className="text-[#a1a1a1] text-sm leading-5 mt-1">
                                        Adopted server-side rendering, file-based routing and the
                                        app router for production-grade web apps.
                                    </p>
                                </div>
                            </div>
                            <div className="relative flex pb-6 items-start gap-6">
                                <div className="size-[14px] bg-[oklch(0.627_0.265_303.9)] shadow-[0_0_12px_oklch(0.627_0.265_303.9/.8)] rounded-full absolute -left-[7px] top-2" />
                                <div className="bg-[oklch(0.205_0_0/.6)] backdrop-blur-sm rounded-xl border-white/10 border-1 border-solid ml-8 p-4 flex-1">
                                    <div className="flex justify-between items-center">
                                        <span className="font-mono text-[#a1a1a1] text-xs leading-4">
                                            2023 — Q2
                                        </span>
                                        <span className="rounded-full bg-neutral-800 text-[#a1a1a1] text-[10px] px-2 py-0.5">
                                            Completed
                                        </span>
                                    </div>
                                    <h3 className="font-semibold text-neutral-50 text-base leading-6 mt-1.5">
                                        Learned tRPC
                                    </h3>
                                    <p className="text-[#a1a1a1] text-sm leading-5 mt-1">
                                        Embraced end-to-end type safety between client and server,
                                        eliminating an entire class of API bugs.
                                    </p>
                                </div>
                            </div>
                            <div className="relative flex pb-6 items-start gap-6">
                                <div className="size-4 border-[oklch(0.627_0.265_303.9/.7)] rounded-full bg-neutral-950 border-black/1 border-2 border-dashed absolute -left-2 top-2" />
                                <div className="bg-[oklch(0.205_0_0/.6)] backdrop-blur-sm rounded-xl border-white/10 border-1 border-solid ml-8 p-4 flex-1">
                                    <div className="flex justify-between items-center">
                                        <span className="font-mono text-[#a1a1a1] text-xs leading-4">
                                            2023 — Q4
                                        </span>
                                        <span className="border-[oklch(0.627_0.265_303.9/.4)] text-[oklch(0.769_0.2_300)] rounded-full text-[10px] border-black/1 border-1 border-solid px-2 py-0.5">
                                            In Progress
                                        </span>
                                    </div>
                                    <h3 className="font-semibold text-neutral-50 text-base leading-6 mt-1.5">
                                        Built Form Builder SaaS
                                    </h3>
                                    <p className="text-[#a1a1a1] text-sm leading-5 mt-1">
                                        Shipped a drag-and-drop form builder with subscriptions,
                                        analytics and multi-tenant architecture.
                                    </p>
                                </div>
                            </div>
                            <div className="relative flex items-start gap-6">
                                <div className="size-[18px] bg-[oklch(0.696_0.17_162.48)] ring-4 ring-[oklch(0.696_0.17_162.48/.25)] shadow-[0_0_22px_oklch(0.696_0.17_162.48/.9)] rounded-full absolute -left-[9px] top-2" />
                                <div className="border-[oklch(0.696_0.17_162.48/.35)] bg-[oklch(0.205_0_0/.7)] backdrop-blur-sm shadow-[0_0_30px_oklch(0.488_0.243_264.376/.25)] rounded-xl border-black/1 border-1 border-solid ml-8 p-4 flex-1">
                                    <div className="flex justify-between items-center">
                                        <span className="font-mono text-[#a1a1a1] text-xs leading-4">
                                            2024 — Now
                                        </span>
                                        <span className="bg-[oklch(0.696_0.17_162.48/.18)] text-[oklch(0.8_0.17_162.48)] ring-1 ring-[oklch(0.696_0.17_162.48/.4)] font-medium rounded-full text-[10px] flex px-2.5 py-0.5 items-center gap-1">
                                            <Circle className="size-2 fill-current" />
                                            Current
                                        </span>
                                    </div>
                                    <h3 className="font-semibold text-neutral-50 text-base leading-6 mt-1.5">
                                        Built SaurabhOS
                                    </h3>
                                    <p className="text-[#a1a1a1] text-sm leading-5 mt-1">
                                        Designed and engineered a premium portfolio OS — thinking in
                                        systems, components and design tokens.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-12 pb-8">
                        <a className="inline-flex text-[#a1a1a1] text-sm leading-5 items-center gap-1.5">
                            <span>View Full Journey</span>
                            <ArrowRight className="size-4" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
