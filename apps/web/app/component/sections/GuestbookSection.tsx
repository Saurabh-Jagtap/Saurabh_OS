"use client"
import GuestbookEntry from "../guestbook/GuestbookEntry";
import GuestbookForm from "../guestbook/GuestbookForm";
import { trpc } from '~/trpc/client'

export default function GuestbookSection() {
    const {data: entries, isLoading} = trpc.guestbook.getEntries.useQuery()

    return (
        <section className="relative overflow-hidden bg-[#060810] py-28">

            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(16,185,129,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16,185,129,0.03) 1px, transparent 1px)
          `,
                    backgroundSize: "48px 48px",
                }}
            />

            <div className="absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[120px]" />

            <div className="relative z-10 mx-auto max-w-5xl px-8">

                <div className="mb-16 text-center">

                    <div className="mb-4 inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 font-mono text-xs uppercase tracking-wider text-emerald-400">
                        📖 Visitor Log
                    </div>

                    <h2 className="mb-4 text-5xl font-black text-slate-100">
                        Open{" "}
                        <span className="text-emerald-400">
                            Channel
                        </span>
                    </h2>

                    <p className="font-mono text-sm text-slate-500">
                        Thoughts on the portfolio,
                        journey, or anything you'd like
                        to share.
                    </p>

                </div>

                <GuestbookForm />

                <div className="my-10 flex items-center gap-6">

                    <div className="h-px flex-1 bg-slate-800" />

                    <span className="font-mono text-xs uppercase tracking-widest text-slate-600">
                        Recent Entries
                    </span>

                    <div className="h-px flex-1 bg-slate-800" />

                </div>

                <div className="space-y-4">

                    {entries?.map((entry) => (
                        <GuestbookEntry
                            key={entry.id}
                            name={entry.name}
                            message={entry.message}
                            createdAt={new Date(entry.createdAt).toLocaleString()}
                        />
                    ))}

                </div>

                <div className="mt-12 grid gap-4 md:grid-cols-3">

                    <div className="rounded-2xl border border-indigo-500/10 bg-slate-900/60 p-5 text-center">
                        <div className="text-3xl font-black text-slate-100">
                            {entries?.length ?? 0}
                        </div>

                        <div className="mt-1 font-mono text-xs uppercase text-slate-600">
                            Entries
                        </div>
                    </div>

                    <div className="rounded-2xl border border-indigo-500/10 bg-slate-900/60 p-5 text-center">
                        <div className="text-3xl font-black text-slate-100">
                            1.2K
                        </div>

                        <div className="mt-1 font-mono text-xs uppercase text-slate-600">
                            Reactions
                        </div>
                    </div>

                    <div className="rounded-2xl border border-emerald-500/10 bg-slate-900/60 p-5 text-center">
                        <div className="text-3xl font-black text-emerald-400">
                            Active
                        </div>

                        <div className="mt-1 font-mono text-xs uppercase text-slate-600">
                            Guestbook
                        </div>
                    </div>

                </div>

            </div>

        </section>
    );
}