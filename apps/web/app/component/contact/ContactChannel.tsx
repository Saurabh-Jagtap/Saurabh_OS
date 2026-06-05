interface ContactChannelProps {
    icon: string;
    label: string;
    value: string;
    href: string;
}

export default function ContactChannel({
    icon,
    label,
    value,
    href,
}: ContactChannelProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 rounded-xl border border-indigo-500/10 bg-[#080B14]/80 p-4 transition-all hover:border-indigo-500/30"
        >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-lg">
                {icon}
            </div>

            <div>
                <div className="text-sm font-semibold text-slate-100">
                    {label}
                </div>

                <div className="font-mono text-xs text-slate-500">
                    {value}
                </div>
            </div>

            <span className="ml-auto text-slate-600">
                ↗
            </span>
        </a>
    );
}