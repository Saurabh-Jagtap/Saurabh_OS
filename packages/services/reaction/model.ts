import { z } from "zod";

export const reactionInputSchema = z.object({
    visitorId: z.string().uuid(),
    projectId: z.string().uuid(),

    reactionType: z.enum(["FIRE", "ROCKET", "CLAP"])
})

export type ReactionInput = z.infer<typeof reactionInputSchema>;