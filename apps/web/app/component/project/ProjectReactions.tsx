"use client"
import React from 'react'
import { getVisitorId } from '~/lib/visitor';
import { trpc } from '~/trpc/client'
import {
  REACTIONS,
  type ReactionType,
} from "../../../../../packages/shared/constants/reactions";

interface ProjectReactionsProps {
    projectId: string;
}

const ProjectReactions = ({ projectId }: ProjectReactionsProps) => {
    const { data: reactions, isLoading } = trpc.reaction.getReactionCounts.useQuery({ projectId })
    const reactToProject = trpc.reaction.reactToProject.useMutation()
    const utils = trpc.useUtils();

    const handleReaction = async (reactionType: ReactionType) => {
        const visitorId = getVisitorId();
        if (!visitorId) {
            return alert("Visitor ID not found. Please refresh the page.");
        }

        try {
            await reactToProject.mutateAsync({
                visitorId,
                projectId,
                reactionType
            })
            await utils.reaction.getReactionCounts.invalidate({
                projectId,
            });
        } catch (error) {
            console.error("Failed to react to project:", error);
        }
    }

    const REACTION_EMOJI_MAP = Object.fromEntries(
        REACTIONS.map((reaction) => [
            reaction.type,
            reaction.emoji,
        ])
    );

    return (
        <div>
            {reactions?.map((reaction) => (
                <button
                    key={reaction.reactionType}
                    onClick={() =>
                        handleReaction(reaction.reactionType as ReactionType)
                    }
                >
                    {REACTION_EMOJI_MAP[
                        reaction.reactionType as ReactionType
                    ]}
                    {" "}
                    {reaction.count}
                </button>
            ))}
        </div>
    )
}

export default ProjectReactions
