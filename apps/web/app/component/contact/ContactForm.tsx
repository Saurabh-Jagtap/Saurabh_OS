"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        console.log({
            name,
            email,
            message,
        });

        alert("Message system coming soon 🚀");
    };

    return (
        <div className="overflow-hidden rounded-2xl border border-indigo-500/20 bg-slate-900/90">

            <div className="border-b border-indigo-500/10 bg-indigo-500/5 px-6 py-4 font-mono text-xs uppercase tracking-widest text-slate-500">
                <span className="text-indigo-400">
                    &gt;_
                </span>{" "}
                message.compose()
            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-5 p-6"
            >

                <div>

                    <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-slate-500">
                        Your Name
                    </label>

                    <input
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        placeholder="Ada Lovelace"
                        className="w-full rounded-xl border border-indigo-500/10 bg-[#080B14] px-4 py-3 font-mono text-sm text-slate-200 outline-none focus:border-indigo-500/40"
                    />

                </div>

                <div>

                    <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-slate-500">
                        Email Address
                    </label>

                    <input
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        placeholder="ada@computing.dev"
                        className="w-full rounded-xl border border-indigo-500/10 bg-[#080B14] px-4 py-3 font-mono text-sm text-slate-200 outline-none focus:border-indigo-500/40"
                    />

                </div>

                <div>

                    <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-slate-500">
                        Message
                    </label>

                    <textarea
                        rows={6}
                        value={message}
                        onChange={(e) =>
                            setMessage(e.target.value)
                        }
                        placeholder="What's on your mind?"
                        className="w-full resize-none rounded-xl border border-indigo-500/10 bg-[#080B14] px-4 py-3 font-mono text-sm text-slate-200 outline-none focus:border-indigo-500/40"
                    />

                </div>

                <div className="flex items-center justify-between">

                    <span className="font-mono text-xs text-slate-600">
                        // All messages handled personally
                    </span>

                    <button
                        type="submit"
                        className="flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 font-mono text-sm font-semibold text-white transition-all hover:bg-indigo-400"
                    >
                        Send Message
                        <Send size={15} />
                    </button>

                </div>

            </form>

        </div>
    );
}