"use client";

import React from "react";
import { Play } from "lucide-react";

const steps = [
    {
        title: "Upload Document",
        subtitle: "Step 1",
        points: ["Drop your PDF/DOCX file", "Instant text extraction", "Secure storage protocol"],
    },
    {
        title: "AI Validation",
        subtitle: "Step 2",
        points: ["Grammar rules verified", "Tone strictly checked", "Format metrics measured"],
    },
    {
        title: "Review Results",
        subtitle: "Step 3",
        points: ["Categorized errors found", "Severity highlighted", "Suggestions provided"],
    },
    {
        title: "Secure Grade",
        subtitle: "Step 4",
        points: ["Make corrections locally", "Zero formatting defects", "Ready for submission"],
    },
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="pt-8 pb-16 px-6 relative w-full flex flex-col items-center bg-transparent">
            {/* Ambient Lighting */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-purple-900/10 blur-[200px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-6xl w-full mx-auto">
                <div className="text-center mb-16 relative z-10">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                        Four Steps to Secure Your <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500 drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                            Final Grades
                        </span>
                    </h2>
                </div>

                {/* Vertical Timeline container */}
                <div className="relative w-full max-w-4xl mx-auto py-10">

                    {/* The Center Dashed Line */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-[linear-gradient(to_bottom,transparent,rgba(217,70,239,0.5)_10%,rgba(217,70,239,0.5)_90%,transparent)] border-l-2 border-dashed border-fuchsia-500/50" />

                    <div className="space-y-16 relative z-10">
                        {steps.map((step, index) => {
                            const isLeft = index % 2 === 0;

                            return (
                                <div key={index} className={`flex items-center w-full ${isLeft ? "justify-start" : "justify-end"} relative`}>

                                    {/* Center Node Marker */}
                                    <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black border-2 border-fuchsia-400 shadow-[0_0_15px_#e879f9]" />

                                    {/* Timeline Card */}
                                    <div className={`w-[45%] md:w-[40%] ${isLeft ? "pr-8 md:pr-16" : "pl-8 md:pl-16"} relative`}>

                                        {/* Horizontal Dashed Connector */}
                                        <div className={`hidden md:block absolute top-[25%] -translate-y-1/2 w-16 h-[2px] border-t-2 border-dashed border-fuchsia-500/30 ${isLeft ? "right-0" : "left-0"}`} />

                                        {/* Card Content */}
                                        <div className="bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 shadow-[0_0_40px_rgba(168,85,247,0.1)] relative group hover:border-purple-500/30 transition-colors">

                                            {/* Glowing Play Icon badge positioned like Dribbble */}
                                            <div className="absolute -top-5 left-8 w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-500/20 to-purple-600/20 shadow-[0_0_15px_rgba(217,70,239,0.4)] border border-fuchsia-500/50 flex items-center justify-center backdrop-blur-md">
                                                <Play className="w-4 h-4 text-fuchsia-300 ml-1" />
                                            </div>

                                            <div className="mt-4">
                                                <h4 className="text-fuchsia-400 font-bold tracking-widest text-xs uppercase mb-1">
                                                    {step.subtitle}
                                                </h4>
                                                <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                                                    {step.title}
                                                </h3>

                                                <ul className="space-y-3">
                                                    {step.points.map((point, i) => (
                                                        <li key={i} className="flex items-center gap-3 text-gray-400 text-xs md:text-sm font-light">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_#2dd4bf]" />
                                                            {point}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Decorative Right Image/Video Placeholder block to balance the timeline */}
                <div className="w-full mt-12 flex justify-center lg:justify-end lg:-mt-48 relative z-0 opacity-50 lg:opacity-100 pointer-events-none">
                    <div className="w-[400px] h-[300px] bg-[#0a0a0f]/50 backdrop-blur-sm border border-purple-500/20 rounded-3xl shadow-[0_0_50px_rgba(168,85,247,0.1)] flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                            <Play className="w-6 h-6 text-gray-500 ml-1" />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
