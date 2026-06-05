"use client";

import ArchitectureNode from "./ArchitectureNode";
import { ARCHITECTURE } from "./architecture-data";

export default function ArchitectureTree() {
  return (
    <section className="bg-black py-28">

      <div className="mx-auto max-w-7xl px-8">

        {/* Header */}

        <div className="mb-20 text-center">

          <div className="mb-4 inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-cyan-400">
            🗺 System Architecture
          </div>

          <h2 className="mb-4 text-5xl font-black text-white">
            SaurabhOS{" "}
            <span className="text-cyan-400">
              Architecture
            </span>
          </h2>

          <p className="font-mono text-sm text-zinc-500">
            How the system is structured internally
          </p>

        </div>

        {/* Root Node */}

        <div className="flex justify-center">

          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 px-10 py-6 text-center">

            <div className="mb-2 text-4xl">
              🧠
            </div>

            <h3 className="text-2xl font-black text-white">
              SaurabhOS
            </h3>

            <p className="mt-2 font-mono text-xs text-zinc-500">
              Personal Engineering Workspace
            </p>

          </div>

        </div>

        {/* Trunk */}

        <div className="flex justify-center">
          <div className="h-16 w-px bg-cyan-500" />
        </div>

        {/* Horizontal Connector */}

        <div className="mx-auto h-px max-w-5xl bg-cyan-500/50" />

        {/* Branch Connectors */}

        <div className="mx-auto grid max-w-5xl grid-cols-3">

          <div className="flex justify-center">
            <div className="h-12 w-px bg-cyan-500" />
          </div>

          <div className="flex justify-center">
            <div className="h-12 w-px bg-cyan-500" />
          </div>

          <div className="flex justify-center">
            <div className="h-12 w-px bg-cyan-500" />
          </div>

        </div>

        {/* Layers */}

        <div className="grid gap-12 lg:grid-cols-3">

          {/* Presentation */}

          <div>

            <div className="mb-6 text-center">

              <h3 className="font-mono text-sm uppercase tracking-widest text-indigo-400">
                Presentation Layer
              </h3>

            </div>

            <div className="flex justify-center">
              <div className="h-6 w-px bg-indigo-500/50" />
            </div>

            <div className="space-y-3">

              {ARCHITECTURE.presentation.map((node) => (
                <ArchitectureNode
                  key={node}
                  label={node}
                />
              ))}

            </div>

          </div>

          {/* Application */}

          <div>

            <div className="mb-6 text-center">

              <h3 className="font-mono text-sm uppercase tracking-widest text-cyan-400">
                Application Layer
              </h3>

            </div>

            <div className="flex justify-center">
              <div className="h-6 w-px bg-cyan-500/50" />
            </div>

            <div className="space-y-3">

              {ARCHITECTURE.application.map((node) => (
                <ArchitectureNode
                  key={node}
                  label={node}
                />
              ))}

            </div>

          </div>

          {/* Data */}

          <div>

            <div className="mb-6 text-center">

              <h3 className="font-mono text-sm uppercase tracking-widest text-emerald-400">
                Data Layer
              </h3>

            </div>

            <div className="flex justify-center">
              <div className="h-6 w-px bg-emerald-500/50" />
            </div>

            <div className="space-y-3">

              {ARCHITECTURE.data.map((node) => (
                <ArchitectureNode
                  key={node}
                  label={node}
                />
              ))}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}