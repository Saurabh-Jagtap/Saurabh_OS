// journey-data.ts
// ═══════════════════════════════════════════════════════════════════
// Extended milestone data for the SaurabhOS journey timeline.
// Each entry maps to one JourneyCard on the timeline.
// Update this file whenever you hit a new milestone — the UI
// auto-adapts to any number of entries.
// ═══════════════════════════════════════════════════════════════════

export type JourneyColor =
  | "indigo"
  | "cyan"
  | "amber"
  | "green"
  | "red"
  | "violet";

export interface JourneyMilestone {
  /** Emoji icon rendered in the timeline node */
  icon: string;
  /** Short system identifier shown in monospace (e.g. SYS-001) */
  sysId: string;
  /** Displayed timestamp / phase label */
  timestamp: string;
  /** Card heading */
  title: string;
  /** Card sub-heading */
  subtitle: string;
  /** Tag label and its color token */
  tag: string;
  tagColor: JourneyColor;
  /** Bullet point achievements */
  bullets: string[];
  /** Key learning / insight quote */
  learning: string;
  /** Optional hackathon rank badge */
  rank?: string;
  /** Optional tech stack chips */
  stack?: string[];
  /** If true, renders "In Progress" pulsing border treatment */
  active?: boolean;
  /** If true, renders "Failure Mode" red treatment */
  failure?: boolean;
}

// ─── Color config map (used in JourneyCard) ───────────────────────
export const COLOR_MAP: Record<
  JourneyColor,
  {
    tag:        string; // badge classes
    border:     string; // card left-border accent
    nodeBg:     string; // timeline node bg
    nodeRing:   string; // timeline node ring
    glow:       string; // node glow rgba
    learningBg: string; // key-learning block bg
    learningBorder: string;
    learningText:   string;
    bullet:     string; // bullet chevron color
  }
> = {
  indigo: {
    tag:           "bg-indigo-500/10 text-indigo-400 border-indigo-500/25",
    border:        "border-l-indigo-500",
    nodeBg:        "bg-indigo-500/15",
    nodeRing:      "border-indigo-500/40",
    glow:          "rgba(99,102,241,0.5)",
    learningBg:    "bg-indigo-500/[0.06]",
    learningBorder:"border-indigo-500/30",
    learningText:  "text-indigo-400",
    bullet:        "text-indigo-400",
  },
  cyan: {
    tag:           "bg-cyan-500/10 text-cyan-400 border-cyan-500/25",
    border:        "border-l-cyan-500",
    nodeBg:        "bg-cyan-500/15",
    nodeRing:      "border-cyan-500/40",
    glow:          "rgba(6,182,212,0.5)",
    learningBg:    "bg-cyan-500/[0.06]",
    learningBorder:"border-cyan-500/30",
    learningText:  "text-cyan-400",
    bullet:        "text-cyan-400",
  },
  amber: {
    tag:           "bg-amber-500/10 text-amber-400 border-amber-500/25",
    border:        "border-l-amber-500",
    nodeBg:        "bg-amber-500/15",
    nodeRing:      "border-amber-500/40",
    glow:          "rgba(245,158,11,0.5)",
    learningBg:    "bg-amber-500/[0.06]",
    learningBorder:"border-amber-500/30",
    learningText:  "text-amber-400",
    bullet:        "text-amber-400",
  },
  green: {
    tag:           "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
    border:        "border-l-emerald-500",
    nodeBg:        "bg-emerald-500/15",
    nodeRing:      "border-emerald-500/40",
    glow:          "rgba(16,185,129,0.5)",
    learningBg:    "bg-emerald-500/[0.06]",
    learningBorder:"border-emerald-500/30",
    learningText:  "text-emerald-400",
    bullet:        "text-emerald-400",
  },
  red: {
    tag:           "bg-red-500/10 text-red-400 border-red-500/25",
    border:        "border-l-red-500",
    nodeBg:        "bg-red-500/15",
    nodeRing:      "border-red-500/40",
    glow:          "rgba(239,68,68,0.5)",
    learningBg:    "bg-red-500/[0.06]",
    learningBorder:"border-red-500/30",
    learningText:  "text-red-400",
    bullet:        "text-red-400",
  },
  violet: {
    tag:           "bg-violet-500/10 text-violet-400 border-violet-500/25",
    border:        "border-l-violet-500",
    nodeBg:        "bg-violet-500/15",
    nodeRing:      "border-violet-500/40",
    glow:          "rgba(139,92,246,0.5)",
    learningBg:    "bg-violet-500/[0.06]",
    learningBorder:"border-violet-500/30",
    learningText:  "text-violet-400",
    bullet:        "text-violet-400",
  },
};

// ─── Milestone data ────────────────────────────────────────────────
export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    icon:      "🚀",
    sysId:     "SYS-001",
    timestamp: "Jan 17, 2026",
    title:     "Git & GitHub",
    subtitle:  "The beginning",
    tag:       "Foundations",
    tagColor:  "indigo",
    stack:     ["Git", "GitHub", "CLI"],
    bullets: [
      "Joined the Web Dev Cohort",
      "First Git & GitHub session",
      "Realized how shallow my version control understanding was",
      "Started rebuilding fundamentals from scratch",
    ],
    learning: "Knowing commands is different from understanding systems.",
  },
  {
    icon:      "🎨",
    sysId:     "SYS-002",
    timestamp: "Feb 2026",
    title:     "Frontend Foundations",
    subtitle:  "HTML & CSS deep dive",
    tag:       "Frontend",
    tagColor:  "cyan",
    stack:     ["HTML", "CSS", "Flexbox", "Grid", "Vercel"],
    bullets: [
      "Built a pixel-perfect Mintlify Clone",
      "Built a pixel-perfect Cursor Clone",
      "Deployed both on Vercel",
      "Practiced layout systems, responsiveness and UI replication",
    ],
    learning: "Good frontend engineering is attention to detail.",
  },
  {
    icon:      "⚡",
    sysId:     "SYS-003",
    timestamp: "Mar 2026",
    title:     "JavaScript Mastery",
    subtitle:  "Strengthening core programming skills",
    tag:       "Core Skills",
    tagColor:  "amber",
    stack:     ["JavaScript", "ES6+", "DOM", "Algorithms"],
    bullets: [
      "Solved GitHub Classroom assignments",
      "Practiced JavaScript fundamentals extensively",
      "Worked through real-world coding exercises",
    ],
    learning: "Frameworks change. Fundamentals stay.",
  },
  {
    icon:      "📦",
    sysId:     "SYS-004",
    timestamp: "Apr 2026",
    title:     "First Open Source Package",
    subtitle:  "ChaiSheet · Runtime-first CSS Engine",
    tag:       "Open Source",
    tagColor:  "green",
    stack:     ["npm", "JavaScript", "CSS-in-JS", "Vercel"],
    bullets: [
      "Built a runtime-first utility CSS engine inspired by Tailwind",
      "Published first npm package",
      "Created a dedicated playground website",
      "Deployed the playground on Vercel",
    ],
    learning: "Building tools teaches engineering differently than building apps.",
  },
  {
    icon:      "🎟️",
    sysId:     "SYS-005",
    timestamp: "May 2026",
    title:     "First Backend System",
    subtitle:  "Book My Ticket · First Hackathon",
    tag:       "Backend",
    tagColor:  "red",
    rank:      "🏅 Ranked 87 / 239 participants",
    stack:     ["Node.js", "Express", "REST APIs", "PostgreSQL"],
    bullets: [
      "First backend engineering project",
      "Worked with APIs, databases and backend architecture",
      "First hackathon participation",
    ],
    learning: "Building complete systems is different from building isolated features.",
  },
  {
    icon:      "📊",
    sysId:     "SYS-006",
    timestamp: "Jun 2026",
    title:     "Real-Time Applications",
    subtitle:  "PulseBoard · Live Polling Platform",
    tag:       "Real-Time",
    tagColor:  "violet",
    rank:      "🏅 Ranked 95 / 165 participants",
    stack:     ["Socket.IO", "Node.js", "React", "Analytics"],
    bullets: [
      "Built a live polling platform with public response collection",
      "Implemented Socket.IO for real-time updates",
      "Added analytics dashboard",
    ],
    learning: "Users expect software to feel alive.",
  },
  {
    icon:      "🏗️",
    sysId:     "SYS-007",
    timestamp: "Jul 2026",
    title:     "The Monorepo Wake-Up Call",
    subtitle:  "Form Builder Hackathon · Unfinished",
    tag:       "Failure Mode",
    tagColor:  "red",
    failure:   true,
    bullets: [
      "Introduced to monorepo architecture",
      "Could not complete the implementation",
      "Identified major architectural gaps in my knowledge",
    ],
    learning: "Failure exposes the next thing you need to learn.",
  },
  {
    icon:      "🧠",
    sysId:     "SYS-008",
    timestamp: "Present",
    title:     "Building SaurabhOS",
    subtitle:  "Current Mission",
    tag:       "In Progress",
    tagColor:  "indigo",
    active:    true,
    stack:     ["Next.js", "tRPC", "PostgreSQL", "TypeScript", "Tailwind", "Prisma"],
    bullets: [
      "Building a full-stack portfolio platform",
      "Implementing monorepo architecture properly",
      "Building reusable services and system layers",
      "Applying lessons from every previous project",
    ],
    learning: "The goal is no longer to learn technologies. The goal is to design systems.",
  },
];