export const REACTIONS = [
  {
    type: "FIRE",
    emoji: "🔥",
  },
  {
    type: "ROCKET",
    emoji: "🚀",
  },
  {
    type: "CLAP",
    emoji: "👏",
  },
] as const;

export type ReactionType =
  (typeof REACTIONS)[number]["type"];