interface ProjectHeaderProps {
  count: number;
}

export default function ProjectHeader({
  count,
}: ProjectHeaderProps) {
  return (
    <div className="mb-14">

      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2">

        <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />

        <span className="font-mono text-xs uppercase tracking-widest text-cyan-400">
          Built Systems
        </span>

      </div>

      <h2 className="mb-3 text-5xl font-black text-white">
        Project{" "}
        <span className="text-cyan-400">
          Registry
        </span>
      </h2>

      <p className="font-mono text-sm text-zinc-500">
        Things I've built, shipped and learned from
      </p>

      <div className="mt-6 flex items-center gap-4">

        <div className="rounded-xl border border-cyan-500/10 bg-cyan-500/5 px-4 py-2">
          <span className="font-mono text-xs text-zinc-400">
            Projects
          </span>

          <div className="text-xl font-bold text-cyan-400">
            {count}
          </div>
        </div>

      </div>

    </div>
  );
}