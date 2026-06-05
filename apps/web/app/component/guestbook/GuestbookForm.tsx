"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function GuestbookForm() {
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        console.log({
            name,
            role,
            message,
        });

        setName("");
        setRole("");
        setMessage("");
    };

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

                    <div>
                        <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-slate-500">
                            Role (Optional)
                        </label>

                        <input
                            value={role}
                            onChange={(e) =>
                                setRole(e.target.value)
                            }
                            placeholder="Full Stack Engineer"
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
                        className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-mono text-sm font-semibold text-emerald-950 transition-all hover:bg-emerald-400"
                    >
                        Push Entry
                        <Send size={14} />
                    </button>

                </div>

            </form>

        </div>
    );
}