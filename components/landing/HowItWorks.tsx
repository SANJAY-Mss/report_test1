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

            <div className="max-w-5xl w-full mx-auto">
                <div className="text-center mb-16 relative z-10">
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                        Four Steps to Secure Your <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500 drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                            Final Grades
                        </span>
                    </h2>
                </div>

                {/* Vertical Timeline container */}
                <div className="relative w-full max-w-3xl mx-auto py-10 mt-4">

                    {/* The Center Dashed Line */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-[linear-gradient(to_bottom,transparent,rgba(217,70,239,0.5)_5%,rgba(217,70,239,0.5)_95%,transparent)] border-l-[2px] border-dashed border-fuchsia-500/50" />

                    <div className="flex flex-col relative z-10">
                        {steps.map((step, index) => {
                            const isLeft = index % 2 === 0;

                            return (
                                <div
                                    key={index}
                                    className={`flex w-full ${isLeft ? "justify-start" : "justify-end"} relative ${index !== 0 ? "-mt-16 md:-mt-24" : ""}`}
                                >

                                    {/* Center Node Marker */}
                                    <div className="absolute left-1/2 -translate-x-1/2 top-[5rem] md:top-[6rem] w-4 h-4 rounded-full bg-[#0a0a0f] border-2 border-fuchsia-400 shadow-[0_0_15px_#e879f9] z-20" />

                                    {/* Timeline Card Wrapper */}
                                    <div className={`w-1/2 flex items-center ${isLeft ? "justify-end pr-8 md:pr-14" : "justify-start pl-8 md:pl-14"} relative`}>

                                        {/* Horizontal Dashed Connector */}
                                        <div className={`hidden md:block absolute top-[5rem] md:top-[6rem] -translate-y-1/2 w-14 h-[2px] border-t-[2px] border-dashed border-fuchsia-500/50 z-0 ${isLeft ? "right-0" : "left-0"}`} />

                                        {/* Card Content */}
                                        <div className="w-full max-w-[280px] bg-[#0a0a0f] border border-white/5 rounded-[2rem] p-6 md:p-8 shadow-[0_0_30px_rgba(168,85,247,0.1)] relative group hover:border-fuchsia-500/40 transition-colors z-10 mt-4 md:mt-8">

                                            {/* Glowing Play Icon badge positioned like Dribbble */}
                                            <div className="absolute -top-5 left-6 w-10 h-10 rounded-full bg-[#0a0a0f] shadow-[0_0_15px_rgba(217,70,239,0.4)] border border-fuchsia-500/80 flex items-center justify-center">
                                                <Play className="w-3 h-3 text-fuchsia-400 ml-0.5" />
                                            </div>

                                            <div className="mt-2 text-left">
                                                <h4 className="text-fuchsia-500 font-extrabold tracking-widest text-[10px] md:text-xs uppercase mb-1">
                                                    {step.subtitle}
                                                </h4>
                                                <h3 className="text-xl md:text-2xl font-bold text-white mb-6 tracking-wide">
                                                    {step.title}
                                                </h3>

                                                <ul className="space-y-4">
                                                    {step.points.map((point, i) => (
                                                        <li key={i} className="flex items-center gap-3 text-gray-300 text-xs md:text-sm font-medium">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_#2dd4bf] flex-shrink-0" />
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

            </div>
        </section>
    );
}
