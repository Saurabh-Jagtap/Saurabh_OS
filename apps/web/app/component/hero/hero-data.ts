import { Activity, Cpu, GitBranch, Layers } from "lucide-react";

// ─── Terminal lines data ───────────────────────────────────────────
export const BOOT_LINES = [
  { delay: 0,    color: "text-cyan-600",    text: "// [INIT_SYS_PORTFOLIO]"                 },
  { delay: 120,  color: "text-blue-400",    text: "> boot sequence initiated..."              },
  { delay: 300,  color: "text-emerald-400", text: "✓ kernel loaded: saurabhos-v1.0.0"         },
  { delay: 480,  color: "text-indigo-300",  text: "✓ modules: next.js · trpc · postgresql"    },
  { delay: 840,  color: "text-cyan-300",    text: "✓ mission: developer → engineer"           },
  { delay: 1020, color: "text-white",       text: "> awaiting input_"                         },
];

// ─── Stack chips ───────────────────────────────────────────────────
export const STACK = [
  { label: "Next.js",    color: "border-white/40 text-white" },
  { label: "tRPC",       color: "border-blue-500/60 text-blue-300" },
  { label: "PostgreSQL", color: "border-indigo-400/60 text-indigo-300" },
  { label: "Drizzle",    color: "border-cyan-400/60 text-cyan-300" },
  { label: "Monorepo",   color: "border-fuchsia-500/60 text-fuchsia-300" },
  { label: "TypeScript", color: "border-blue-400/60 text-blue-300" },
];

export const METRICS = [
  {
    icon: GitBranch,
    label: "Focus",
    value: "PROJECTS",
    color: "text-cyan-300",
  },
  {
    icon: Activity,
    label: "Status",
    value: "BUILDING",
    color: "text-emerald-400",
  },
  {
    icon: Cpu,
    label: "Stack",
    value: "MONOREPO",
    color: "text-fuchsia-400",
  },
  {
    icon: Layers,
    label: "Architecture",
    value: "tRPC",
    color: "text-blue-400",
  },
];