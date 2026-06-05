"use client";

import { useState, useEffect } from "react";
import { Home, Code2, Zap, MessageSquare, Mail } from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────
interface NavLink {
  label: string;
  href:  string;
  icon:  React.ElementType;
  key:   string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home",      href: "#",          icon: Home,          key: "home"      },
  { label: "Projects",  href: "#projects",  icon: Code2,         key: "projects"  },
  { label: "Journey",   href: "#journey",   icon: Zap,           key: "journey"   },
  { label: "Guestbook", href: "#guestbook", icon: MessageSquare, key: "guestbook" },
  { label: "Contact",   href: "#contact",   icon: Mail,          key: "contact"   },
];

// ─── Component ─────────────────────────────────────────────────────
export default function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [sparkKey, setSparkKey] = useState(0); // Used to re-trigger spark animation on click

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (key: string) => {
    setActive(key);
    setSparkKey(prev => prev + 1); // Trigger new spark animation
  };

  return (
    /*
     * pointer-events-none on the outer shell → mouse events pass
     * straight through to the 3D canvas underneath.
     * pointer-events-auto re-enabled on the actual nav bar container.
     */
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-6 pt-5">
      
      {/* ── True CSS Animations Styles ──────────────────────────── */}
      <style>{`
          .glitch-text-sm {
              position: relative;
              color: #f8fafc;
              font-weight: 700;
              z-index: 1;
              display: inline-block;
          }
          .glitch-text-sm::before, .glitch-text-sm::after {
              content: attr(data-text);
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              opacity: 0.9;
          }
          .glitch-text-sm::before {
              color: #0ef; /* Electric Cyan */
              z-index: -1;
              animation: glitch-anim-1-sm 4s infinite linear alternate-reverse;
          }
          .glitch-text-sm::after {
              color: #6366f1; /* Deep Tech Indigo */
              z-index: -2;
              animation: glitch-anim-2-sm 4s infinite linear alternate-reverse;
          }

          /* Slightly softer glitch for small text */
          @keyframes glitch-anim-1-sm {
              0%, 85% { clip-path: inset(100% 0 0 0); transform: translate(0, 0); }
              87% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
              89% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
              91% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 1px); }
              93% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -1px); }
              95% { clip-path: inset(100% 0 0 0); transform: translate(0, 0); }
          }
          @keyframes glitch-anim-2-sm {
              0%, 85% { clip-path: inset(100% 0 0 0); transform: translate(0, 0); }
              86% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -1px); }
              88% { clip-path: inset(30% 0 20% 0); transform: translate(-2px, 1px); }
              90% { clip-path: inset(70% 0 10% 0); transform: translate(1px, -1px); }
              92% { clip-path: inset(20% 0 50% 0); transform: translate(-1px, 1px); }
              94% { clip-path: inset(100% 0 0 0); transform: translate(0, 0); }
          }

          /* Continuous Electric Spark on Navbar Border */
          .border-spark-container {
              position: absolute;
              inset: 0;
              border-radius: inherit;
              pointer-events: none;
              overflow: hidden;
          }
          .border-spark {
              position: absolute;
              top: 0;
              left: -100px; /* Start outside */
              width: 50px;
              height: 1px;
              background: linear-gradient(90deg, transparent, #0ef, #fff, transparent);
              box-shadow: 0 0 10px 2px rgba(6, 182, 212, 0.8);
              animation: spark-travel 4s infinite cubic-bezier(0.4, 0, 0.2, 1);
          }
          @keyframes spark-travel {
              0%   { left: -10%; top: 0; opacity: 0; }
              10%  { opacity: 1; }
              40%  { left: 110%; top: 0; opacity: 0; }
              100% { left: 110%; opacity: 0; }
          }

          /* Click Spark for Tab Switching */
          .tab-spark {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 2px;
            background: #0ef;
            box-shadow: 0 0 8px 2px rgba(6, 182, 212, 0.8);
            animation: tab-spark-anim 0.4s ease-out forwards;
          }
          @keyframes tab-spark-anim {
            0% { width: 0; opacity: 1; }
            50% { width: 100%; opacity: 1; }
            100% { width: 100%; opacity: 0; }
          }
      `}</style>

      <header
        className={`
          pointer-events-auto relative w-full max-w-6xl
          flex items-center justify-between
          px-5 py-3 rounded-2xl
          border border-white/[0.06]
          bg-zinc-950/60 backdrop-blur-xl
          shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_8px_40px_rgba(0,0,0,0.6)]
          transition-all duration-500
          ${scrolled ? "bg-zinc-950/75 shadow-[0_0_0_1px_rgba(6,182,212,0.1),0_8px_40px_rgba(0,0,0,0.7)]" : ""}
        `}
      >
        {/* Continuous Spark Animation running along the top border */}
        <div className="border-spark-container">
            <div className="border-spark" />
        </div>

        {/* ── Logo ─────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 select-none relative z-10">
          {/* Geometric icon mark */}
          <div className="relative flex items-center justify-center w-8 h-8">
            {/* Outer rotating ring */}
            <svg
              viewBox="0 0 32 32"
              className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite]"
              style={{ opacity: 0.6 }}
            >
              <rect
                x="1" y="1" width="30" height="30"
                rx="6" ry="6"
                fill="none"
                stroke="url(#logoGrad)"
                strokeWidth="1"
                strokeDasharray="4 3"
              />
              <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#0ef" />
                </linearGradient>
              </defs>
            </svg>
            {/* Inner terminal prompt */}
            <span
              className="relative z-10 font-mono text-[10px] font-bold text-cyan-400"
            >
              &gt;_
            </span>
          </div>

          <div className="flex flex-col leading-none">
            {/* Glitch Logo Text */}
            <span 
              className="font-mono text-[13px] font-bold tracking-tight glitch-text-sm"
              data-text="SaurabhOS"
            >
              SaurabhOS
            </span>
            <span className="font-mono text-[9px] tracking-[0.18em] text-cyan-500/70 uppercase mt-1">
              v1.0.0-mvp
            </span>
          </div>

          {/* Live pulse indicator (Swapped to Cyan) */}
          <div className="flex items-center gap-1.5 ml-1">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"
              style={{ boxShadow: "0 0 6px 2px rgba(6,211,238,0.5)" }}
            />
          </div>
        </div>

        {/* ── Nav Links ─────────────────────────────────────────── */}
        <nav className="hidden md:flex items-center gap-1 relative z-10">
          {NAV_LINKS.map(({ label, href, icon: Icon, key }) => {
            const isActive = active === key;
            return (
              <a
                key={key}
                href={href}
                onClick={() => handleNavClick(key)}
                className={`
                  group relative flex items-center gap-2
                  px-4 py-2 rounded-xl
                  font-mono text-[12px] tracking-wide
                  transition-all duration-300
                  overflow-hidden
                  ${isActive
                    ? "text-cyan-100 bg-cyan-500/[0.05] border border-cyan-500/20"
                    : "text-slate-400 hover:text-cyan-200 hover:bg-white/[0.03]"
                  }
                `}
              >
                <Icon
                  className={`w-3.5 h-3.5 transition-colors duration-300 ${
                    isActive ? "text-cyan-400" : "text-slate-600 group-hover:text-cyan-400"
                  }`}
                />
                {label}

                {/* Tab Switch Spark Animation (Fires on Click) */}
                {isActive && (
                  <span key={sparkKey} className="tab-spark" />
                )}

                {/* Persistent active underline */}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-px bg-cyan-500/50"
                  />
                )}

                {/* Hover blueprint crosshair — top-left corner */}
                <span
                  className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none font-mono text-[7px] leading-none text-cyan-500/50"
                >
                  +
                </span>
              </a>
            );
          })}
        </nav>

        {/* ── System Status Widget (Timer Removed, Kept Minimal) ── */}
        <div
          className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-xl
                     border border-cyan-500/10 bg-cyan-950/20 relative z-10"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" style={{ boxShadow: "0 0 6px 1px rgba(6,182,212,0.5)" }}/>
            <span className="font-mono text-[10px] text-cyan-400 tracking-widest uppercase">SYS OK</span>
          </div>
        </div>
      </header>
    </div>
  );
}
