"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { trpc } from "~/trpc/client";

export default function GuestbookForm() {
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const createGuestbookEntry = trpc.guestbook.createEntry.useMutation()
    const identifyVisitor = trpc.visitor.identify.useMutation();

    // const { data: entries, isLoading } = trpc.guestbook.getEntries.useQuery()
    const utils = trpc.useUtils();

    async function initializeVisitor() {
        const visitorId = localStorage.getItem("visitor_id");

        const visitor = await identifyVisitor.mutateAsync({
            visitorId: visitorId ?? undefined,
        });

        localStorage.setItem("visitor_id", visitor.id);
        return visitor.id;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // Validate input
        // get visitorId from local storage 
        // Call the API to create a new guestbook entry
        if (!name.trim() || !message.trim()) {
            alert('Please fill in both fields');
            return;
        }
        
        let visitorId = localStorage.getItem('visitor_id');
        
        if (!visitorId) {
            visitorId = await initializeVisitor();
        }
        setIsLoading(true)

        try {
            await createGuestbookEntry.mutateAsync({
                visitorId: visitorId,
                name,
                message,
            });
            // window.location.reload();
            await utils.guestbook.getEntries.invalidate()
            setIsLoading(false)
            setName("");
            setMessage("");
        } catch (error) {
            console.error("Failed to create guestbook entry:", error);
            alert("Failed to submit entry")
        }
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="overflow-hidden rounded-2xl border border-emerald-500/20 bg-slate-900/80">

            <div className="border-b border-emerald-500/10 bg-emerald-500/5 px-6 py-4">

                <div className="font-mono text-xs uppercase tracking-widest text-slate-400">
                    <span className="text-emerald-400">
                        &gt;_
                    </span>{" "}
                    visitor_log.write()
                </div>

            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-5 p-6"
            >

                <div className="grid gap-4 md:grid-cols-2">

                    <div>
                        <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-slate-500">
                            Your Name
                        </label>

                        <input
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            placeholder="Saurabh Jagtap"
                            className="w-full rounded-xl border border-indigo-500/10 bg-[#080B14] px-4 py-3 font-mono text-sm text-slate-200 outline-none focus:border-emerald-500/30"
                        />
                    </div>

                </div>

                <div>

                    <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-slate-500">
                        Message
                    </label>

                    <textarea
                        value={message}
                        onChange={(e) =>
                            setMessage(e.target.value)
                        }
                        placeholder="Thoughts on SaurabhOS..."
                        rows={5}
                        className="w-full resize-none rounded-xl border border-indigo-500/10 bg-[#080B14] px-4 py-3 font-mono text-sm text-slate-200 outline-none focus:border-emerald-500/30"
                    />

                </div>

                <div className="flex items-center justify-between">

                    <p className="font-mono text-xs text-slate-600">
                        // No login required.
                    </p>

                    <button
                        type="submit"
                        disabled={createGuestbookEntry.isPending}
                        className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-mono text-sm font-semibold text-emerald-950 transition-all hover:bg-emerald-400"
                    >
                        {
                            createGuestbookEntry.isPending ? "Pushing" : "Push Entry"
                        }

                        <Send size={14} />
                    </button>

                </div>

            </form>

        </div>
    );
}