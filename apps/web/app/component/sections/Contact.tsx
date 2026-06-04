import {
  Mail,
  Send,
  Terminal,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

// import { FallbackComponent } from "./CustomComponents";

export default function Contact() {
    return (
        <section className="bg-neutral-950 px-12 py-24">
            <div className="max-w-7xl mx-auto">
                <div className="p-12">
                    <div className="text-center flex mb-8 flex-col items-center gap-2">
                        <span className="font-mono text-[#a1a1a1] text-xs leading-4 tracking-widest">
                            SYSTEM MODULE // 05
                        </span>
                        <h1 className="leading-tight font-bold text-neutral-50 text-[40px]">
                            Get In Touch
                        </h1>
                        <p className="max-w-xl text-[#a1a1a1] text-base leading-6">
                            Open to opportunities, collaborations, and interesting
                            conversations.
                        </p>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                        <Card className="col-span-2 backdrop-blur-xl shadow-[0_0_40px_oklch(0.488_0.243_264.376/.1)] bg-neutral-900/60 border-white/10 border-0 border-solid p-6 gap-4">
                            <CardContent className="flex p-0 flex-col gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[#a1a1a1] text-sm leading-5">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Your name"
                                            className="rounded-lg bg-neutral-800/50 text-neutral-50 text-sm leading-5 border-white/10 border-1 border-solid px-3 py-2 w-full"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[#a1a1a1] text-sm leading-5">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="you@email.com"
                                            className="rounded-lg bg-neutral-800/50 text-neutral-50 text-sm leading-5 border-white/10 border-1 border-solid px-3 py-2 w-full"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[#a1a1a1] text-sm leading-5">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="What's this about?"
                                        className="rounded-lg bg-neutral-800/50 text-neutral-50 text-sm leading-5 border-white/10 border-1 border-solid px-3 py-2 w-full"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[#a1a1a1] text-sm leading-5">
                                        Message
                                    </label>
                                    <textarea
                                        rows={4}
                                        placeholder="Write your message..."
                                        className="resize-none rounded-lg bg-neutral-800/50 text-neutral-50 text-sm leading-5 border-white/10 border-1 border-solid px-3 py-2 w-full"
                                    />
                                </div>
                                <Button className="bg-gradient-to-r from-[oklch(0.488_0.243_264.376)] to-[oklch(0.627_0.265_303.9)] shadow-[0_0_24px_oklch(0.488_0.243_264.376/.5)] text-white mt-1 w-full">
                                    <Send className="size-4" />
                                    Send Message
                                </Button>
                            </CardContent>
                        </Card>
                        <Card className="backdrop-blur-xl bg-neutral-900/60 border-white/10 border-0 border-solid p-6 gap-4">
                            <CardHeader className="p-0 gap-1">
                                <CardTitle className="text-base leading-6">
                                    Direct Channels
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex p-0 flex-col gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="size-10 rounded-lg bg-neutral-800/50 border-white/10 border-1 border-solid flex justify-center items-center">
                                        <Mail className="size-4 text-[oklch(0.696_0.17_162.48)]" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[#a1a1a1] text-xs leading-4">
                                            Email
                                        </span>
                                        <span className="text-neutral-50 text-sm leading-5">
                                            saurabh773@gmail.com
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="size-10 rounded-lg bg-neutral-800/50 border-white/10 border-1 border-solid flex justify-center items-center">
                                        {/* <FallbackComponent className="size-4 text-[oklch(0.627_0.265_303.9)]" /> */}
                                        <Github/>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[#a1a1a1] text-xs leading-4">
                                            GitHub
                                        </span>
                                        <span className="text-neutral-50 text-sm leading-5">
                                            https://github.com/Saurabh-Jagtap
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="size-10 rounded-lg bg-neutral-800/50 border-white/10 border-1 border-solid flex justify-center items-center">
                                        {/* <FallbackComponent className="size-4 text-[oklch(0.488_0.243_264.376)]" /> */}
                                        <Twitter />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[#a1a1a1] text-xs leading-4">
                                            Twitter
                                        </span>
                                        <span className="text-neutral-50 text-sm leading-5">
                                            https://x.com/SaurabhJag004
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="size-10 rounded-lg bg-neutral-800/50 border-white/10 border-1 border-solid flex justify-center items-center">
                                        {/* <FallbackComponent className="size-4 text-[oklch(0.769_0.188_70.08)]" /> */}
                                        <Linkedin />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[#a1a1a1] text-xs leading-4">
                                            LinkedIn
                                        </span>
                                        <span className="text-neutral-50 text-sm leading-5">
                                            https://www.linkedin.com/in/saurabh-jagtap-084893287/
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <footer className="bg-neutral-900 border-white/10 border-t-1 border-r-0 border-b-0 border-l-0 border-solid px-12 py-8">
                    <div className="grid grid-cols-3 gap-8">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <div className="size-7 bg-gradient-to-br from-[oklch(0.488_0.243_264.376)] to-[oklch(0.627_0.265_303.9)] rounded-lg flex justify-center items-center">
                                    <Terminal className="size-3.5 text-white" />
                                </div>
                                <span className="font-bold text-base leading-6">SaurabhOS</span>
                            </div>
                            <p className="text-[#a1a1a1] text-sm leading-5">
                                An engineer's personal mission control.
                            </p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <span className="font-medium text-[#a1a1a1] text-xs leading-4 mb-1">
                                Quick Links
                            </span>
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-[#a1a1a1] text-sm leading-5">Home</span>
                                <span className="text-[#a1a1a1] text-sm leading-5">
                                    Projects
                                </span>
                                <span className="text-[#a1a1a1] text-sm leading-5">
                                    Journey
                                </span>
                                <span className="text-[#a1a1a1] text-sm leading-5">
                                    Guestbook
                                </span>
                                <span className="text-[#a1a1a1] text-sm leading-5">
                                    Contact
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <span className="font-medium text-[#a1a1a1] text-xs leading-4">
                                System Status
                            </span>
                            <div className="rounded-full bg-neutral-800/50 border-white/10 border-1 border-solid flex px-3 py-2 items-center gap-2">
                                <span className="relative size-2 flex">
                                    <span className="inline-flex bg-[oklch(0.696_0.17_162.48)] animate-ping opacity-75 rounded-full absolute w-full h-full" />
                                    <span className="relative inline-flex size-2 bg-[oklch(0.696_0.17_162.48)] rounded-full" />
                                </span>
                                <span className="text-neutral-50 text-sm leading-5">
                                    All Systems Operational
                                </span>
                            </div>
                            <span className="font-mono text-[#a1a1a1] text-xs leading-4">
                                99.98% uptime
                            </span>
                        </div>
                    </div>
                    <div className="border-white/10 border-t-1 border-r-0 border-b-0 border-l-0 border-solid mt-8 pt-6">
                        <p className="font-mono text-center text-[#a1a1a1] text-xs leading-4">
                            © 2025 SaurabhOS — Built with Next.js, deployed on Vercel
                        </p>
                    </div>
                </footer>
            </div>
        </section>
    );
}
