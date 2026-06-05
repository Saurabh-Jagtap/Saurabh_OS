interface GuestbookEntryProps {
    name: string;
    role?: string;
    message: string;
    createdAt: string;
}

export default function GuestbookEntry({
    name,
    role,
    message,
    createdAt,
}: GuestbookEntryProps) {
    const initials = name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <div className="rounded-2xl border border-indigo-500/10 bg-slate-900/70 p-5 transition-all hover:border-indigo-500/20">

            <div className="flex gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-500/10 font-mono text-sm font-bold text-indigo-400">
                    {initials}
                </div>

                <div className="flex-1">

                    <div className="mb-2 flex items-start justify-between">

                        <div>
                            <h4 className="font-semibold text-slate-100">
                                {name}
                            </h4>

                            {role && (
                                <p className="font-mono text-xs text-slate-500">
                                    {role}
                                </p>
                            )}
                        </div>

                        <span className="font-mono text-xs text-slate-600">
                            {createdAt}
                        </span>

                    </div>

                    <p className="font-mono text-sm leading-7 text-slate-400">
                        {message}
                    </p>

                </div>

            </div>

        </div>
    );
}