import { publicProcedure, router } from "../../trpc";

import { reactionService } from "../../services";
import { reactionInputSchema } from "@repo/services/reaction/model";

export const reactionRouter = router({
    reactToProject: publicProcedure
        .input(reactionInputSchema)
        .mutation(async ({ input }) => {
            const reaction = await reactionService.reactToProject(input);
            return reaction;
        }),
    getReactionCounts: publicProcedure
        .input(reactionInputSchema.pick({ projectId: true }))
        .query(async ({ input }) => {
            const counts = await reactionService.getReactionCounts(input.projectId);
            return counts;
        })
})