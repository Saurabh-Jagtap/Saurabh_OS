import ContactChannel from "../contact/ContactChannel";
import ContactForm from "../contact/ContactForm";
import ContactStatus from "../contact/ContactStatus";
import ContactTerminal from "../contact/ContactTerminal";
import { CONTACT_CHANNELS } from "../contact/contact-data";

export default function ContactSection() {
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

            <div className="relative z-10 mx-auto max-w-6xl px-8">

                <div className="mb-16 text-center">

                    <div className="mb-4 inline-flex rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 font-mono text-xs uppercase tracking-wider text-indigo-400">
                        📡 Contact
                    </div>

                    <h2 className="mb-3 text-5xl font-black text-slate-100">
                        Initialize{" "}
                        <span className="text-indigo-400">
                            Connection
                        </span>
                    </h2>

                    <p className="font-mono text-sm text-slate-500">
                        Whether it's an opportunity,
                        collaboration, or conversation.
                    </p>

                </div>

                <div className="grid gap-8 lg:grid-cols-[380px_1fr]">

                    <div className="space-y-6">

                        <div className="rounded-2xl border border-indigo-500/10 bg-slate-900/80 p-5">

                            <div className="mb-5 font-mono text-xs uppercase tracking-widest text-slate-500">
                                <span className="text-indigo-400">
                                    &gt;_
                                </span>{" "}
                                contact.channels
                            </div>

                            <div className="space-y-3">

                                {CONTACT_CHANNELS.map(
                                    (channel) => (
                                        <ContactChannel
                                            key={channel.label}
                                            {...channel}
                                        />
                                    )
                                )}

                            </div>

                        </div>

                        <ContactStatus />

                    </div>

                    <div className="space-y-6">

                        <ContactForm />

                        <ContactTerminal />

                    </div>

                </div>

            </div>

        </section>
    );
}