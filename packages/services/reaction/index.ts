import db, { eq, and, sql } from "@repo/database";
import { ReactionInput } from "./model";
import { projectReactionsTable } from "@repo/database/schema";

class ReactionService {
    public async reactToProject(reaction: ReactionInput) {
        const { visitorId, projectId, reactionType } = reaction;

        // find existing reaction
        const [existing] = await db
            .select()
            .from(projectReactionsTable)
            .where(
                and(
                    eq(projectReactionsTable.visitorId, visitorId),
                    eq(projectReactionsTable.projectId, projectId)
                )
            )

        if (existing) {
            const [updateReaction] = await db
                .update(projectReactionsTable)
                .set({
                    reaction_type: reactionType,
                    updatedAt: new Date(),
                })
                .where(
                    and(
                        eq(projectReactionsTable.visitorId, visitorId),
                        eq(projectReactionsTable.projectId, projectId)
                    )
                )
                .returning();

            if (!updateReaction) {
                throw new Error("Failed to update reaction");
            }

            return updateReaction;
        }

        const [newReaction] = await db
            .insert(projectReactionsTable)
            .values({
                visitorId,
                projectId,
                reaction_type: reactionType
            })
            .returning();

        if (!newReaction) {
            throw new Error("Failed to create reaction");
        }

        return newReaction;
    }

    public async getReactionCounts(projectId: string) {
        const reactions = await db
            .select({
                reactionType: projectReactionsTable.reaction_type,
                count: sql<number>`count(*)`
            })
            .from(projectReactionsTable)
            .where(
                eq(projectReactionsTable.projectId, projectId)
            )
            .groupBy(projectReactionsTable.reaction_type)

        const reactionMap = {
            FIRE: 0,
            ROCKET: 0,
            CLAP: 0,
        };

        for (const reaction of reactions) {
            reactionMap[reaction.reactionType] = Number(
                reaction.count
            );
        }

        return [
            {
                reactionType: "FIRE",
                count: reactionMap.FIRE,
            },
            {
                reactionType: "ROCKET",
                count: reactionMap.ROCKET,
            },
            {
                reactionType: "CLAP",
                count: reactionMap.CLAP,
            },
        ];
    }
}

export default ReactionService;