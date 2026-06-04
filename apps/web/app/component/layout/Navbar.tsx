import { Home, Code, Mail, MessageSquare, Zap } from 'lucide-react'
import React from 'react'

const Navbar = () => {
    return (
        <div>
            <header className="relative z-10 border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex px-12 justify-between items-center h-20">
                <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold text-neutral-50 text-lg leading-7 tracking-tight">
                        SaurabhOS
                    </span>
                    <span className="size-2 shadow-[0_0_10px_2px_oklch(0.488_0.243_264.376/0.7)] animate-pulse rounded-full bg-[#1447e6]" />
                </div>
                <nav className="flex items-center gap-1">
                    <a className="backdrop-blur-md shadow-[0_0_16px_oklch(0.488_0.243_264.376/0.35)] font-medium rounded-full bg-neutral-800/60 text-neutral-50 text-sm leading-5 border-white/10 border-1 border-solid flex px-4 py-2 items-center gap-2">
                        <Home className="size-4 text-[#1447e6]" />
                        Home
                    </a>
                    <a className="transition-colors font-medium rounded-full text-[#a1a1a1] text-sm leading-5 flex px-4 py-2 items-center gap-2">
                        <Code className="size-4" />
                        Projects
                    </a>
                    <a className="transition-colors font-medium rounded-full text-[#a1a1a1] text-sm leading-5 flex px-4 py-2 items-center gap-2">
                        <Zap className="size-4" />
                        Journey
                    </a>
                    <a className="transition-colors font-medium rounded-full text-[#a1a1a1] text-sm leading-5 flex px-4 py-2 items-center gap-2">
                        <MessageSquare className="size-4" />
                        Guestbook
                    </a>
                    <a className="transition-colors font-medium rounded-full text-[#a1a1a1] text-sm leading-5 flex px-4 py-2 items-center gap-2">
                        <Mail className="size-4" />
                        Contact
                    </a>
                </nav>
            </header>
        </div>
    )
}

export default Navbar
