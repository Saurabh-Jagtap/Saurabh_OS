import JourneyCard from "../journey/JourneyCard";
import { JOURNEY_MILESTONES } from "../journey/journey-data";

export default function JourneySection() {
  return (
    <section className="relative overflow-hidden bg-[#080B14] py-28">

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
          linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)
        `,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="absolute -right-20 top-0 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-4xl px-8">

        <div className="mb-16 text-center">

          <div className="mb-4 inline-flex rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 font-mono text-xs uppercase tracking-wider text-indigo-400">
            🗓 Journey
          </div>

          <h2 className="mb-3 text-5xl font-black text-slate-100">
            Developer{" "}
            <span className="text-indigo-400">
              →
            </span>{" "}
            Engineer
          </h2>

          <p className="font-mono text-sm text-slate-500">
            Every milestone shaped the next one.
            No shortcuts. Just reps.
          </p>

        </div>

        <div className="relative pl-14">

          <div className="absolute left-[18px] top-0 bottom-0 w-px border-l-2 border-dashed border-indigo-500/20" />

          {JOURNEY_MILESTONES.map(
            (milestone) => (
              <JourneyCard
                key={milestone.title}
                milestone={milestone}
              />
            )
          )}

        </div>

        <div className="mt-12 flex items-center gap-4 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6">

          <div className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />

          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-emerald-400">
              Present Day
            </div>

            <div className="font-semibold text-slate-100">
              Still learning. Still building. Still shipping.
            </div>

            <div className="mt-1 font-mono text-sm text-slate-500">
              Developer → Engineer · Continuing Web Dev Cohort · Documenting everything
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}