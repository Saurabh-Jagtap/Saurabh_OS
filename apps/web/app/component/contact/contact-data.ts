import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export const CHANNELS = [
  {
    icon: Mail,
    label: "Email",
    value: "saurabhjagtap773@gmail.com",
    href: "saurabhjagtap773@gmail.com",
    color: "text-cyan-400",
    border: "border-cyan-500/20",
    glow: "rgba(6,182,212,0.12)",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "https://github.com/Saurabh-Jagtap",
    href: "https://github.com/Saurabh-Jagtap",
    color: "text-slate-300",
    border: "border-white/10",
    glow: "rgba(255,255,255,0.06)",
  },
  {
    icon: Twitter,
    label: "Twitter / X",
    value: "https://x.com/SaurabhJag004",
    href: "https://x.com/SaurabhJag004",
    color: "text-sky-400",
    border: "border-sky-500/20",
    glow: "rgba(14,165,233,0.1)",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "https://www.linkedin.com/in/saurabh-jagtap-084893287/",
    href: "https://www.linkedin.com/in/saurabh-jagtap-084893287/",
    color: "text-indigo-400",
    border: "border-indigo-500/20",
    glow: "rgba(99,102,241,0.1)",
  },
];

export const STATUS_ROWS = [
  { label: "Availability",    value: "Open to opportunities",       dot: "bg-emerald-400", valueColor: "text-emerald-400" },
  { label: "Response time",   value: "~24 hours",                   dot: "bg-cyan-400",    valueColor: "text-cyan-400"    },
  { label: "Preferred work",  value: "Full-stack · Open source",    dot: "bg-indigo-400",  valueColor: "text-slate-400"   },
  { label: "Timezone",        value: "IST (UTC +5:30)",             dot: "bg-violet-400",  valueColor: "text-slate-400"   },
  { label: "Current focus",   value: "System design",               dot: "bg-amber-400",   valueColor: "text-amber-400"   },
];

export const TERMINAL_LINES = [
  { prompt: true,  text: "cat response_policy.txt",    color: "text-slate-400" },
  { prompt: false, text: "✓ Every message read personally", color: "text-emerald-400" },
  { prompt: false, text: "✓ Response within 24h on business days", color: "text-emerald-400" },
  { prompt: false, text: "✓ Open to freelance, internship & full-time", color: "text-emerald-400" },
  { prompt: false, text: "// Spam filtered at the OS level", color: "text-slate-600" },
];

export const MSG_TYPES = [
  { id: "opportunity",   label: "💼 Opportunity" },
  { id: "collab",        label: "🤝 Collaboration" },
  { id: "hi",            label: "💬 Just saying hi" },
  { id: "feedback",      label: "🔍 Feedback" },
];
