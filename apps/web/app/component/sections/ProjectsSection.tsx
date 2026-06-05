"use client";
import { trpc } from "~/trpc/client";
import ProjectCard from "../project/ProjectCard";

// const projects = [
  //   {
    //     title: "SaurabhOS",
    //     description:
    //       "A personal engineering workspace documenting my journey from developer to engineer.",
    //     status: "LIVE",
    //     icon: "🧠",
    //     featured: true,
    //     technologies: ["Next.js", "tRPC", "PostgreSQL", "TypeScript"],
    //   },
    //   {
      //     title: "DevFlow CLI",
      //     description:
      //       "CLI toolkit for automating development workflows and project scaffolding.",
      //     status: "IN PROGRESS",
      //     icon: "⚡",
      //     technologies: ["Node.js", "TypeScript"],
      //   },
      //   {
//     title: "Schema Forge",
//     description:
//       "Visual Prisma schema builder with migrations and export support.",
//     status: "SHIPPED",
//     icon: "📦",
//     technologies: ["Prisma", "tRPC"],
//   },
// ];

export default function ProjectsSection() {
  const { data: projects, isLoading } = trpc.project.getFeaturedProjects.useQuery()
  if (isLoading) {
    return (
      <section className="bg-[#060810] py-24">
        <div className="text-center text-slate-400">
          Loading Projects...
        </div>
      </section>
    );
  }
  return (
    <section className="relative bg-[#0a0a0a] py-24">
      <div className="absolute inset-0 opacity-30">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

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