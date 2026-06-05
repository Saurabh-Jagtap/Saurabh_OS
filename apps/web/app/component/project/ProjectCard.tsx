interface ProjectCardProps {
  title: string;
  description: string;
  status: string;
  technologies: string[];
  githubUrl: string | null;
  liveUrl: string | null;
}

export default function ProjectCard({
  title,
  description,
  status,
  technologies,
  githubUrl,
  liveUrl
}: ProjectCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-indigo-500/10 bg-slate-900/70 transition-all hover:-translate-y-1 hover:border-indigo-500/30">

      <div className="relative flex h-36 items-center justify-center bg-gradient-to-br from-indigo-500/10 to-cyan-500/10">

        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "28px 28px",
          }}
        />

<div className="relative flex flex-col items-center">
  <span className="font-mono text-xs uppercase tracking-widest text-cyan-400">
    PROJECT
  </span>

  <span className="mt-2 text-2xl font-bold text-slate-100">
    {title}
  </span>
</div>

        <div className="absolute right-4 top-4 rounded-full bg-indigo-500/10 px-3 py-1 font-mono text-xs text-indigo-400">
          {status}
        </div>

      </div>

      <div className="p-6">

        <div className="mb-4 flex flex-wrap gap-2">

          {technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-indigo-500/10 bg-indigo-500/10 px-2 py-1 font-mono text-[10px] text-indigo-400"
            >
              {tech}
            </span>
          ))}

        </div>

        <h3 className="mb-3 text-xl font-bold text-slate-100">
          {title}
        </h3>

        <p className="mb-6 font-mono text-sm leading-6 text-slate-500">
          {description}
        </p>

        <div className="flex items-center justify-between border-t border-slate-800 pt-4">

          <a
  href={liveUrl ?? "#"}
  target="_blank"
  rel="noreferrer"
  className="font-mono text-sm text-cyan-400"
>
  ↗ Live Demo
</a>

          <a
  href={githubUrl ?? "#"}
  target="_blank"
  rel="noreferrer"
  className="font-mono text-sm text-slate-400"
>
  GitHub
</a>

        </div>

      </div>
    </div>
  );
}