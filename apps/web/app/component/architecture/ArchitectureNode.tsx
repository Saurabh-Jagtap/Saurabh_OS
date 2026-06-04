interface ArchitectureNodeProps {
    icon: string;
    title: string;
    subtitle: string;
    badge?: string;
}

export default function ArchitectureNode({
    icon,
    title,
    subtitle,
    badge,
}: ArchitectureNodeProps) {
    return (
        <div className="group relative min-w-[180px] rounded-2xl border border-indigo-500/20 bg-slate-900/80 p-5 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/40">

            {badge && (
                <div className="absolute -top-2 right-3 rounded-full bg-indigo-500/10 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-indigo-400">
                    {badge}
                </div>
            )}

            <div className="mb-3 text-3xl">
                {icon}
            </div>

            <h3 className="mb-1 text-sm font-semibold text-slate-100">
                {title}
            </h3>

            <p className="font-mono text-[11px] text-slate-500">
                {subtitle}
            </p>

        </div>
    );
}