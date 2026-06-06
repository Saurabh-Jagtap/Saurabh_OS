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

    if (isLoading) {
        return (
            <div className="flex gap-2 h-9">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="h-9 w-16 rounded-lg"
                        style={{
                            background: "rgba(6,182,212,0.04)",
                            border: "1px solid rgba(6,182,212,0.08)",
                            animation: `proj-react-pulse ${0.9 + i * 0.15}s ease-in-out infinite alternate`,
                        }}
                    />
                ))}
            </div>
        );
    }

    return (
        <>
            <style>{`
                @keyframes proj-react-pulse {
                    from { opacity: 0.3; }
                    to   { opacity: 0.7; }
                }
                @keyframes proj-react-pop {
                    0%   { transform: scale(1); }
                    40%  { transform: scale(1.35); }
                    100% { transform: scale(1); }
                }
                .reaction-btn:active .reaction-emoji {
                    animation: proj-react-pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both;
                }
            `}</style>

            <div className="flex items-center gap-2">

                {/* Section label */}
                <span
                    className="font-mono text-[9px] tracking-widest uppercase mr-1 flex-shrink-0"
                    style={{ color: "rgba(6,182,212,0.4)" }}
                >
                    SIG:
                </span>

                {reactions?.map((reaction) => (
                    <button
                        key={reaction.reactionType}
                        onClick={() => handleReaction(reaction.reactionType as ReactionType)}
                        className="reaction-btn group relative flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 transition-all duration-200"
                        style={{
                            background: "rgba(6,182,212,0.04)",
                            border: "1px solid rgba(6,182,212,0.12)",
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.background = "rgba(6,182,212,0.1)";
                            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(6,182,212,0.35)";
                            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 12px -2px rgba(6,182,212,0.3)";
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.background = "rgba(6,182,212,0.04)";
                            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(6,182,212,0.12)";
                            (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                        }}
                    >
                        <span className="reaction-emoji text-sm leading-none select-none">
                            {REACTION_EMOJI_MAP[reaction.reactionType as ReactionType]}
                        </span>
                        <span
                            className="font-mono text-[11px] font-bold tabular-nums transition-colors duration-200"
                            style={{ color: "#22d3ee" }}
                        >
                            {reaction.count}
                        </span>
                    </button>
                ))}
            </div>
        </>
    )
}

export default ProjectReactions