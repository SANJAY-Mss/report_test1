"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Mail, MessageSquare, MapPin, Send } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        alert("Message sent!");
    };

    return (
        <main className="min-h-screen">
            <Header />

            <section className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" />
                <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-cyan-600/20 rounded-full blur-[100px] mix-blend-screen animate-pulse-slow delay-1000" />
                <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 animate-fade-in">
                    <h1 className="text-4xl md:text-5xl font-bold">
                        Get in <span className="gradient-text">Touch</span>
                    </h1>
                    <p className="text-xl text-foreground/70">
                        Have questions about ReportGuard? We're here to help.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="glass-card p-8 rounded-3xl space-y-6">
                            <h3 className="text-2xl font-bold">Contact Information</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                                        <Mail className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-foreground/60">Email Us</p>
                                        <p className="font-medium">support@reportguard.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-pink-500/10 rounded-xl">
                                        <MessageSquare className="w-6 h-6 text-pink-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-foreground/60">Live Chat</p>
                                        <p className="font-medium">Available 9am - 6pm EST</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-500/10 rounded-xl">
                                        <MapPin className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-foreground/60">Office</p>
                                        <p className="font-medium">123 innovation Dr, Tech City</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="glass-card p-8 rounded-3xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 transition-all"
                                    placeholder="Your name"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 transition-all"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Message</label>
                                <textarea
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 transition-all h-32 resize-none"
                                    placeholder="How can we help you?"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-3 rounded-xl hover:shadow-glow-blue transition-all transform hover:scale-[1.02]"
                            >
                                {isSubmitting ? "Sending..." : (
                                    <>
                                        Send Message
                                        <Send className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
