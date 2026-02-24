"use client";

import React from "react";
import ShinyText from "@/components/ui/ShinyText";

function DiamondCard({ title, subtitle, highlight }: { title: string, subtitle: string, highlight?: boolean }) {
    return (
        <div
            className={`
                w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-3xl flex items-center justify-center flex-shrink-0
                rotate-45 transition-all duration-500 hover:scale-105 cursor-pointer
                border border-purple-500/40 bg-[#0a0a0f]
                ${highlight
                    ? "shadow-[0_0_40px_rgba(168,85,247,0.5)] border-purple-400"
                    : "shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
                }
            `}
        >
            <div className="-rotate-45 flex flex-col items-center justify-center p-6 text-center w-full h-full">
                <h3 className="text-2xl md:text-4xl font-extrabold text-white mb-2 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">
                    {title}
                </h3>
                <p className="text-xs md:text-sm text-purple-200/60 leading-tight">
                    {subtitle}
                </p>
            </div>
        </div>
    );
}

export function Features() {
    return (
        <section id="features" className="py-32 px-6 relative overflow-hidden bg-transparent">
            {/* Background Magic Glows */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-purple-700/20 blur-[150px] rounded-full pointer-events-none -z-10" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-700/20 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-20">
                {/* Left Side: Diamond Grid */}
                <div className="w-full lg:w-1/2 flex flex-col items-center justify-center relative pt-10">
                    <div className="flex justify-center z-10 w-full">
                        <DiamondCard
                            title="100%"
                            subtitle="Anna University Format Compliant"
                            highlight={true}
                        />
                    </div>
                    {/* Negative margin pulls the bottom row up to interlock the diamonds */}
                    <div className="flex justify-center gap-8 sm:gap-12 md:gap-16 -mt-12 sm:-mt-16 md:-mt-20 w-full">
                        <DiamondCard
                            title="90s"
                            subtitle="Lightning Fast Report Audits"
                        />
                        <DiamondCard
                            title="24/7"
                            subtitle="Spectral AI Chat Assistant"
                        />
                    </div>
                </div>

                {/* Right Side: Text Content */}
                <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
                    <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-tight">
                        Our <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                            Advantages
                        </span>
                    </h2>

                    <div className="space-y-6 text-lg text-foreground/60 max-w-xl mx-auto lg:mx-0">
                        <p>
                            We have carefully decoded the <strong className="text-purple-300">Anna University 2026 Academic Guidelines</strong>
                            so that you never have to guess your formatting again.
                        </p>
                        <p>
                            Join thousands of students who have secured their grades by exorcising grammatical errors,
                            fixing alignment faults, and generating the perfect report—rapidly and magically.
                        </p>
                    </div>

                    <div className="pt-4 flex justify-center lg:justify-start">
                        <button className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold tracking-wide shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_40px_rgba(168,85,247,0.8)] transition-shadow duration-300 hover:scale-105 active:scale-95">
                            Start Validating Now
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
