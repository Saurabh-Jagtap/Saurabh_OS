interface ProjectCardProps {
  title: string;
  description: string | null;
  status: string;

  technologies: string[];

  githubUrl: string | null;
  liveUrl: string | null;

  coverImage?: string | null;
}

export default function ProjectCard({
  title,
  description,
  status,
  technologies,
  githubUrl,
  liveUrl,
  coverImage,
}: ProjectCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-cyan-500/20">

      {/* IMAGE */}

      <div className="h-48 overflow-hidden border-b border-white/5">

        <img
          src={
            coverImage ??
            "https://placehold.co/1200x700/080b14/00e5ff?text=Project+Preview"
          }
          alt={title}
          className="h-full w-full object-cover"
        />

      </div>

      {/* CONTENT */}

      <div className="p-6">

        <div className="mb-3 flex items-center justify-between">

          <h3 className="text-xl font-bold text-white">
            {title}
          </h3>

          <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-mono text-cyan-400">
            {status}
          </span>

        </div>

        <p className="mb-5 text-sm leading-7 text-zinc-400">
          {description}
        </p>

        <div className="mb-6 flex flex-wrap gap-2">

          {technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-cyan-500/10 bg-cyan-500/5 px-2 py-1 text-xs font-mono text-cyan-300"
            >
              {tech}
            </span>
          ))}

        </div>

        <div className="flex gap-3">

          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              className="flex-1 rounded-xl bg-cyan-500 px-4 py-3 text-center text-sm font-semibold text-black"
            >
              Live Demo
            </a>
          )}

          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              className="flex-1 rounded-xl border border-white/10 px-4 py-3 text-center text-sm text-zinc-300"
            >
              GitHub
            </a>
          )}

        </div>

      </div>

    </div>
  );
}