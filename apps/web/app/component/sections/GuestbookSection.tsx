import {
    Heart,
    RotateCw,
    Send,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";

export default function GuestbookSection() {
    return (
        <section className="bg-neutral-950 px-12 py-24">
            <div className="max-w-7xl mx-auto">
                <div className="relative bg-neutral-950 mx-auto w-285 h-239 overflow-hidden">
                    <div className="pointer-events-none left-1/2 -translate-x-1/2 size-[640px] bg-[radial-gradient(circle,oklch(0.488_0.243_264.376/.18),transparent_60%)] blur-3xl rounded-full absolute -top-32" />
                    <div className="pointer-events-none size-[420px] bg-[radial-gradient(circle,oklch(0.627_0.265_303.9/.12),transparent_60%)] blur-3xl rounded-full absolute -right-40 top-40" />

                    <div className="relative z-10 px-12 pt-8 pb-6">
                        <div className="flex flex-col gap-2">
                            <span className="font-mono text-[#a1a1a1] text-xs leading-4 tracking-widest">
                                SYSTEM MODULE // 04
                            </span>
                            <h1 className="leading-none font-bold text-neutral-50 text-[32px]">
                                Guestbook
                            </h1>
                            <p className="text-[#a1a1a1] text-sm leading-5">
                                Leave a message. Say hello. You're part of this journey.
                            </p>
                        </div>
                    </div>
                    <div className="relative z-10 px-12">
                        <Card className="bg-[oklch(0.205_0_0/.7)] backdrop-blur-xl border-[oklch(0.488_0.243_264.376/.4)] shadow-[0_0_40px_oklch(0.488_0.243_264.376/.18)] rounded-2xl border-black/1 border-1 border-solid p-6 gap-4">
                            <CardHeader className="p-0 gap-1">
                                <CardTitle className="font-semibold text-neutral-50 text-base leading-6">
                                    Leave a Message
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex p-0 flex-col gap-4">
                                <textarea
                                    placeholder="Write something kind, curious, or constructive..."
                                    className="resize-none bg-[oklch(0.145_0_0/.6)] transition-all rounded-xl text-neutral-50 text-sm leading-5 border-white/10 border-1 border-solid px-4 py-3 w-full h-24"
                                />
                                <div className="flex items-center gap-4">
                                    <input
                                        placeholder="Your name or handle"
                                        className="bg-[oklch(0.145_0_0/.6)] transition-all rounded-xl text-neutral-50 text-sm leading-5 border-white/10 border-1 border-solid px-4 flex-1 h-10"
                                    />
                                    <Button className="bg-[linear-gradient(135deg,oklch(0.488_0.243_264.376),oklch(0.627_0.265_303.9))] shadow-[0_0_24px_oklch(0.488_0.243_264.376/.5)] font-medium rounded-xl text-white text-sm leading-5 px-5 gap-2 h-10">
                                        <Send className="size-4" />
                                        Sign Guestbook
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    {/* TODO:Render guestbook entries from trpc.guestbook.getEntries()*/}
                    <div className="relative z-10 px-12 pt-6">
                        <div className="grid grid-cols-3 gap-4">
                            <Card className="bg-[oklch(0.205_0_0/.6)] backdrop-blur-md transition-all rounded-xl border-white/10 border-1 border-solid p-4 gap-3">
                                <CardHeader className="p-0 flex-row items-center gap-3">
                                    <div className="size-9 bg-[oklch(0.488_0.243_264.376/.25)] text-[oklch(0.769_0.188_70.08)] font-semibold rounded-full text-xs leading-4 flex justify-center items-center">
                                        AR
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="leading-tight font-bold text-neutral-50 text-sm leading-5">
                                            Aarav Raina
                                        </span>
                                        <span className="font-mono text-[#a1a1a1] text-xs leading-4">
                                            2 days ago
                                        </span>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0 gap-2">
                                    <p className="leading-relaxed text-[#a1a1a1] text-sm leading-5">
                                        Your portfolio is genuinely inspiring. The attention to
                                        detail across every section is unmatched.
                                    </p>
                                </CardContent>
                                <CardFooter className="p-0 gap-2">
                                    <div className="text-[#a1a1a1] flex items-center gap-1.5">
                                        <Heart className="size-4" />
                                        <span className="text-xs leading-4">12</span>
                                    </div>
                                </CardFooter>
                            </Card>
                            <Card className="bg-[oklch(0.205_0_0/.6)] backdrop-blur-md transition-all rounded-xl border-white/10 border-1 border-solid p-4 gap-3">
                                <CardHeader className="p-0 flex-row items-center gap-3">
                                    <div className="size-9 bg-[oklch(0.627_0.265_303.9/.25)] rounded-full text-base leading-6 flex justify-center items-center">
                                        🚀
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="leading-tight font-bold text-neutral-50 text-sm leading-5">
                                            devmaya
                                        </span>
                                        <span className="font-mono text-[#a1a1a1] text-xs leading-4">
                                            4 days ago
                                        </span>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0 gap-2">
                                    <p className="leading-relaxed text-[#a1a1a1] text-sm leading-5">
                                        Just shipped my first side project after reading your
                                        journey. Thank you for sharing so openly!
                                    </p>
                                </CardContent>
                                <CardFooter className="p-0 gap-2">
                                    <div className="text-[#a1a1a1] flex items-center gap-1.5">
                                        <Heart className="size-4" />
                                        <span className="text-xs leading-4">28</span>
                                    </div>
                                </CardFooter>
                            </Card>
                            <Card className="bg-[oklch(0.205_0_0/.6)] backdrop-blur-md transition-all rounded-xl border-white/10 border-1 border-solid p-4 gap-3">
                                <CardHeader className="p-0 flex-row items-center gap-3">
                                    <div className="size-9 bg-[oklch(0.696_0.17_162.48/.25)] text-[oklch(0.696_0.17_162.48)] font-semibold rounded-full text-xs leading-4 flex justify-center items-center">
                                        LK
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="leading-tight font-bold text-neutral-50 text-sm leading-5">
                                            Lena Kowalski
                                        </span>
                                        <span className="font-mono text-[#a1a1a1] text-xs leading-4">
                                            1 week ago
                                        </span>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0 gap-2">
                                    <p className="leading-relaxed text-[#a1a1a1] text-sm leading-5">
                                        The blue-violet glow aesthetic is chef's kiss. Bookmarking
                                        this for design inspiration.
                                    </p>
                                </CardContent>
                                <CardFooter className="p-0 gap-2">
                                    <div className="text-[#a1a1a1] flex items-center gap-1.5">
                                        <Heart className="size-4" />
                                        <span className="text-xs leading-4">7</span>
                                    </div>
                                </CardFooter>
                            </Card>
                            <Card className="bg-[oklch(0.205_0_0/.6)] backdrop-blur-md transition-all rounded-xl border-white/10 border-1 border-solid p-4 gap-3">
                                <CardHeader className="p-0 flex-row items-center gap-3">
                                    <div className="size-9 bg-[oklch(0.645_0.246_16.439/.25)] rounded-full text-base leading-6 flex justify-center items-center">
                                        👋
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="leading-tight font-bold text-neutral-50 text-sm leading-5">
                                            Tomás Vega
                                        </span>
                                        <span className="font-mono text-[#a1a1a1] text-xs leading-4">
                                            2 weeks ago
                                        </span>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0 gap-2">
                                    <p className="leading-relaxed text-[#a1a1a1] text-sm leading-5">
                                        Found you through a podcast and stayed for the projects.
                                        Keep building amazing things!
                                    </p>
                                </CardContent>
                                <CardFooter className="p-0 gap-2">
                                    <div className="text-[#a1a1a1] flex items-center gap-1.5">
                                        <Heart className="size-4" />
                                        <span className="text-xs leading-4">19</span>
                                    </div>
                                </CardFooter>
                            </Card>
                            <Card className="bg-[oklch(0.205_0_0/.6)] backdrop-blur-md transition-all rounded-xl border-white/10 border-1 border-solid p-4 gap-3">
                                <CardHeader className="p-0 flex-row items-center gap-3">
                                    <div className="size-9 bg-[oklch(0.769_0.188_70.08/.25)] text-[oklch(0.769_0.188_70.08)] font-semibold rounded-full text-xs leading-4 flex justify-center items-center">
                                        PS
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="leading-tight font-bold text-neutral-50 text-sm leading-5">
                                            Priya Sharma
                                        </span>
                                        <span className="font-mono text-[#a1a1a1] text-xs leading-4">
                                            3 weeks ago
                                        </span>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0 gap-2">
                                    <p className="leading-relaxed text-[#a1a1a1] text-sm leading-5">
                                        Constructive note: loved the loading states. Would adore a
                                        deep-dive write-up on your stack someday.
                                    </p>
                                </CardContent>
                                <CardFooter className="p-0 gap-2">
                                    <div className="text-[#a1a1a1] flex items-center gap-1.5">
                                        <Heart className="size-4" />
                                        <span className="text-xs leading-4">15</span>
                                    </div>
                                </CardFooter>
                            </Card>
                            <Card className="bg-[oklch(0.205_0_0/.6)] backdrop-blur-md transition-all rounded-xl border-white/10 border-1 border-solid p-4 gap-3">
                                <CardHeader className="p-0 flex-row items-center gap-3">
                                    <div className="size-9 bg-[oklch(0.488_0.243_264.376/.25)] rounded-full text-base leading-6 flex justify-center items-center">
                                        ✨
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="leading-tight font-bold text-neutral-50 text-sm leading-5">
                                            codewithjin
                                        </span>
                                        <span className="font-mono text-[#a1a1a1] text-xs leading-4">
                                            1 month ago
                                        </span>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0 gap-2">
                                    <p className="leading-relaxed text-[#a1a1a1] text-sm leading-5">
                                        Curious how you approach side-project burnout. Either way,
                                        this is a beautiful little corner of the web.
                                    </p>
                                </CardContent>
                                <CardFooter className="p-0 gap-2">
                                    <div className="text-[#a1a1a1] flex items-center gap-1.5">
                                        <Heart className="size-4" />
                                        <span className="text-xs leading-4">23</span>
                                    </div>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
