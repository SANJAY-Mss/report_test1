"use client";

import React from "react";

export function Welcome() {
    return (
        <section id="welcome" className="pt-16 pb-8 px-6 relative w-full flex items-center justify-center">
            {/* Dark glass container */}
            <div className="max-w-5xl w-full mx-auto bg-[#0a0a0f]/80 backdrop-blur-xl border border-purple-500/20 rounded-[2.5rem] p-8 md:p-12 shadow-[0_0_50px_rgba(168,85,247,0.15)] relative overflow-hidden">

                {/* Subtle corner glares */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/10 to-transparent" />

                <div className="text-center space-y-8 relative z-10 max-w-4xl mx-auto">
                    <div className="space-y-2">
                        <span className="text-purple-400 font-bold tracking-widest text-sm uppercase">Best Report Validator</span>
                        <h2 className="text-4xl md:text-5xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                            Welcome to ReportGuard
                        </h2>
                    </div>

                    <div className="space-y-6 text-base md:text-lg text-gray-300 leading-relaxed font-light">
                        <p>
                            Look! We all know the challenges of strict academic formatting—dealing with outdated university manuals,
                            unresponsive layout tools, structural rejections, and leading to <span className="text-pink-400 font-medium">wasted marks</span>.
                        </p>

                        <p>
                            We understand your frustration because we've been students facing the dreaded Anna University 2026 format too.
                            We've been through the endless manual proofreading, spacing errors, and countless revisions.
                        </p>
                    </div>

                    <div className="pt-6 border-t border-white/10 space-y-4">
                        <h3 className="text-2xl md:text-3xl font-bold text-white">
                            Guess What? <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">No Worries, Students!</span>
                        </h3>
                        <p className="text-base md:text-lg text-gray-300 leading-relaxed font-light max-w-3xl mx-auto">
                            With ReportGuard, your biggest formatting headache is instantly cured. We've built an AI-powered
                            validation panel that parses every comma, margin, and pronoun to guarantee <strong>100% compliance</strong> before you print.
                        </p>
                    </div>

                    <div className="pt-8">
                        <button className="px-10 py-4 rounded-full bg-white/10 text-white border border-purple-500/50 hover:bg-purple-500/20 transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] font-bold tracking-wide">
                            Try It Free Now
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
