import { STATUS_ITEMS } from "./contact-data";

export default function ContactStatus() {
    return (
        <div className="rounded-2xl border border-emerald-500/20 bg-slate-900/80 p-5">

            <div className="mb-5 flex items-center gap-2">

                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />

                <span className="font-mono text-xs uppercase tracking-wider text-emerald-400">
                    System Status
                </span>

            </div>

            <div className="space-y-3">

                {STATUS_ITEMS.map((item) => (
                    <div
                        key={item.label}
                        className="flex items-center justify-between border-b border-slate-800 pb-3 text-sm"
                    >
                        <span className="font-mono text-slate-500">
                            {item.label}
                        </span>

                        <span
                            className={`font-mono ${
                                item.color === "green"
                                    ? "text-emerald-400"
                                    : item.color === "amber"
                                      ? "text-amber-400"
                                      : "text-slate-300"
                            }`}
                        >
                            {item.value}
                        </span>
                    </div>
                ))}

            </div>

        </div>
    );
}