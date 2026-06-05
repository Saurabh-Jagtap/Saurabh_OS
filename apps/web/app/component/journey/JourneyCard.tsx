import { JourneyMilestone } from "./journey-data";

interface JourneyCardProps {
    milestone: JourneyMilestone;
}

const colors = {
    indigo:
        "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    cyan:
        "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    amber:
        "bg-amber-500/10 text-amber-400 border-amber-500/20",
    green:
        "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    red:
        "bg-red-500/10 text-red-400 border-red-500/20",
    violet:
        "bg-violet-500/10 text-violet-400 border-violet-500/20",
};

export default function JourneyCard({
    milestone,
}: JourneyCardProps) {
    return (
        <div className="relative mb-8">

            <div
                className={`absolute -left-[52px] top-4 flex h-10 w-10 items-center justify-center rounded-full border text-lg ${colors[milestone.tagColor]
                    }`}
            >
                {milestone.icon}
            </div>

            <div className="rounded-2xl border border-indigo-500/10 bg-slate-900/70 overflow-hidden">

                <div className="flex items-center justify-between border-b border-indigo-500/10 px-6 py-4">

                    <div>
                        <h3 className="font-bold text-slate-100">
                            {milestone.title}
                        </h3>

                        <p className="mt-1 font-mono text-xs text-slate-500">
                            {milestone.subtitle}
                        </p>
                    </div>

                    <div
                        className={`rounded-full border px-3 py-1 font-mono text-[10px] uppercase ${colors[milestone.tagColor]
                            }`}
                    >
                        {milestone.tag}
                    </div>

                </div>

                <div className="p-6">

                    <div className="space-y-2 mb-4">

                        {milestone.bullets.map(
                            (bullet: string) => (
                                <div
                                    key={bullet}
                                    className="flex gap-2 font-mono text-sm text-slate-400"
                                >
                                    <span className="text-indigo-400">
                                        ›
                                    </span>

                                    {bullet}
                                </div>
                            )
                        )}

                    </div>

                    {milestone.rank && (
                        <div className="mb-4 inline-flex rounded-md border border-amber-500/20 bg-amber-500/10 px-3 py-2 font-mono text-xs text-amber-400">
                            {milestone.rank}
                        </div>
                    )}

                    <div className="rounded-r-lg border border-indigo-500/10 border-l-4 border-l-indigo-500 bg-indigo-500/5 p-4">

                        <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-indigo-400">
                            Key Learning
                        </div>

                        <p className="font-mono text-sm italic text-slate-400">
                            {milestone.learning}
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}