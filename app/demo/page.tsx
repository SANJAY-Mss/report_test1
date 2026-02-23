"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Calendar, Users, Video, ArrowRight } from "lucide-react";

export default function DemoPage() {
    return (
        <main className="min-h-screen">
            <Header />

            <section className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" />
                <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-cyan-600/20 rounded-full blur-[100px] mix-blend-screen animate-pulse-slow delay-1000" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8 animate-fade-in">
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                            See ReportGuard in <span className="gradient-text">Action</span>
                        </h1>
                        <p className="text-xl text-foreground/70">
                            Book a personalized demo to see how we can help your institution streamline academic report validation.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-500/10 rounded-xl">
                                    <Video className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold">Live Product Walkthrough</h3>
                                    <p className="text-sm text-foreground/60">See key features in real-time.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-cyan-500/10 text-cyan-400">
                                    <Users className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold">Q&A Session</h3>
                                    <p className="text-sm text-foreground/60">Get answers to your specific questions.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-500/10 rounded-xl">
                                    <Calendar className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold">Flexible Scheduling</h3>
                                    <p className="text-sm text-foreground/60">Choose a time that works for you.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-8 rounded-3xl border-purple-500/20">
                        <h3 className="text-2xl font-bold mb-6">Schedule a Demo</h3>
                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">First Name</label>
                                    <input type="text" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Last Name</label>
                                    <input type="text" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl" placeholder="Doe" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Work Email</label>
                                <input type="email" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl" placeholder="john@university.edu" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Institution Name</label>
                                <input type="text" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl" placeholder="University of Technology" />
                            </div>
                            <button className="w-full btn-primary flex items-center justify-center gap-2 mt-4">
                                Book Demo
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
