export default function ContactTerminal() {
    return (
        <div className="overflow-hidden rounded-2xl border border-indigo-500/15 bg-[#080B14]">

            <div className="flex items-center gap-2 border-b border-indigo-500/10 bg-slate-900 px-4 py-3">

                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-amber-500" />
                <div className="h-3 w-3 rounded-full bg-emerald-500" />

                <span className="ml-2 font-mono text-xs text-slate-500">
                    saurabh@os:~/contact
                </span>

            </div>

            <div className="space-y-2 p-5 font-mono text-sm">

                <div className="text-slate-500">
                    <span className="text-indigo-400">
                        saurabh@os:~$
                    </span>{" "}
                    cat response_policy.txt
                </div>

                <div className="text-emerald-400">
                    ✓ I read every message personally
                </div>

                <div className="text-emerald-400">
                    ✓ Response within 24h on business days
                </div>

                <div className="text-emerald-400">
                    ✓ Open to learning opportunities
                </div>

                <div className="text-emerald-400">
                    ✓ Open source collaborations
                </div>

                <div className="text-emerald-400">
                    ✓ Engineering discussions
                </div>

                <div className="text-slate-700">
                    // Spam filtered at OS level
                </div>

                <div className="text-slate-500">
                    <span className="text-indigo-400">
                        saurabh@os:~$
                    </span>{" "}
                    <span className="inline-block h-4 w-2 animate-pulse bg-indigo-400 align-middle" />
                </div>

            </div>

        </div>
    );
}