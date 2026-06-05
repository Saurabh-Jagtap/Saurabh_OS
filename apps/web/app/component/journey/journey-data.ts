export type JourneyColor =
  | "indigo"
  | "cyan"
  | "amber"
  | "green"
  | "red"
  | "violet";

export interface JourneyMilestone {
  icon: string;
  title: string;
  subtitle: string;
  tag: string;
  tagColor: JourneyColor;
  bullets: string[];
  learning: string;
  rank?: string;
}

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    icon: "🚀",
    title: "Git & GitHub",
    subtitle: "The beginning · Jan 17, 2026",
    tag: "Foundations",
    tagColor: "indigo",
    bullets: [
      "Joined the Web Dev Cohort",
      "First Git & GitHub session",
      "Realized how shallow my version control understanding was",
      "Started rebuilding fundamentals from scratch",
    ],
    learning:
      "Knowing commands is different from understanding systems.",
  },

  {
    icon: "🎨",
    title: "Frontend Foundations",
    subtitle: "HTML & CSS deep dive",
    tag: "Frontend",
    tagColor: "cyan",
    bullets: [
      "Built a pixel-perfect Mintlify Clone",
      "Built a pixel-perfect Cursor Clone",
      "Deployed both on Vercel",
      "Practiced layout systems, responsiveness and UI replication",
    ],
    learning:
      "Good frontend engineering is attention to detail.",
  },

  {
    icon: "⚡",
    title: "JavaScript Mastery",
    subtitle: "Strengthening core programming skills",
    tag: "Core Skills",
    tagColor: "amber",
    bullets: [
      "Solved GitHub Classroom assignments",
      "Practiced JavaScript fundamentals extensively",
      "Worked through real-world coding exercises",
    ],
    learning:
      "Frameworks change. Fundamentals stay.",
  },

  {
    icon: "📦",
    title: "First Open Source Package",
    subtitle: "ChaiSheet · Runtime-first CSS Engine",
    tag: "Open Source",
    tagColor: "green",
    bullets: [
      "Built a runtime-first utility CSS engine inspired by Tailwind",
      "Published first npm package",
      "Created a dedicated playground website",
      "Deployed the playground on Vercel",
    ],
    learning:
      "Building tools teaches engineering differently than building apps.",
  },

  {
    icon: "🎟️",
    title: "First Backend System",
    subtitle: "Book My Ticket · First Hackathon",
    tag: "Backend",
    tagColor: "red",
    rank: "🏅 Ranked 87 / 239 participants",
    bullets: [
      "First backend engineering project",
      "Worked with APIs, databases and backend architecture",
      "First hackathon participation",
    ],
    learning:
      "Building complete systems is different from building isolated features.",
  },

  {
    icon: "📊",
    title: "Real-Time Applications",
    subtitle: "PulseBoard · Live Polling Platform",
    tag: "Real-Time",
    tagColor: "violet",
    rank: "🏅 Ranked 95 / 165 participants",
    bullets: [
      "Built a live polling platform",
      "Implemented Socket.IO for real-time updates",
      "Added analytics dashboard",
    ],
    learning:
      "Users expect software to feel alive.",
  },

  {
    icon: "🏗️",
    title: "The Monorepo Wake-Up Call",
    subtitle: "Form Builder Hackathon · Unfinished",
    tag: "Failure Mode",
    tagColor: "red",
    bullets: [
      "Introduced to monorepo architecture",
      "Could not complete the implementation",
      "Identified major architectural gaps in my knowledge",
    ],
    learning:
      "Failure exposes the next thing you need to learn.",
  },

  {
    icon: "🧠",
    title: "Building SaurabhOS",
    subtitle: "Current Mission",
    tag: "In Progress",
    tagColor: "indigo",
    bullets: [
      "Building a full-stack portfolio platform",
      "Implementing monorepo architecture properly",
      "Building reusable services and system layers",
      "Applying lessons from every previous project",
    ],
    learning:
      "The goal is no longer to learn technologies. The goal is to design systems.",
  },
];