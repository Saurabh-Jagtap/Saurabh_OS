"use client";
import { trpc } from "~/trpc/client";
import ProjectCard from "../project/ProjectCard";

export default function ProjectsSection() {
  const { data: projects, isLoading } = trpc.project.getFeaturedProjects.useQuery()
  if (isLoading) {
    return (
      <section className="py-24">
        <div className="text-center text-slate-400">
          Loading Projects...
        </div>
      </section>
    );
  }
  return (
    <section className="relative py-24">

      <div className="relative z-10 mx-auto max-w-7xl px-8">

        <div className="mb-12 text-center">

          <div className="mb-4 inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 font-mono text-xs text-cyan-400">
            💻 Projects
          </div>

          <h2 className="mb-3 text-5xl font-black text-slate-100">
            Actual <span className="text-cyan-400">Work</span>
          </h2>

          <p className="font-mono text-sm text-slate-500">
            // Things I've built, shipped, and learned from
          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-3">

          {projects?.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description ?? ""}
              status={project.status}
              technologies={project.tech_stack}
              githubUrl={project.github_url}
              liveUrl={project.live_url}
            />
          ))}

        </div>

      </div>
    </section>
  );
}