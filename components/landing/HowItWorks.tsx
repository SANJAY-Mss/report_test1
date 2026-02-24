"use client";

import React from "react";
import { Play } from "lucide-react";

const steps = [
    {
        title: "Upload Document",
        subtitle: "STEP 1",
        points: ["Drop your PDF/DOCX file"], /* matching single point per card from image */
    },
    {
        title: "AI Validation",
        subtitle: "STEP 2",
        points: ["Grammar rules verified"],
    },
    {
        title: "Review Results",
        subtitle: "STEP 3",
        points: ["Categorized errors found"],
    },
    {
        title: "Secure Grade",
        subtitle: "STEP 4",
        points: ["Make corrections locally"],
    },
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="pt-8 pb-20 px-6 relative w-full flex flex-col items-center bg-transparent">
            {/* Ambient Lighting */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-purple-900/10 blur-[200px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-4xl w-full mx-auto">
                <div className="text-center mb-12 relative z-10">
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                        Four Steps to Secure Your <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500 drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                            Final Grades
                        </span>
                    </h2>
                </div>

                {/* Vertical Timeline Main Container matching Screenshot */}
                <div className="relative w-full max-w-2xl mx-auto py-16 px-12 md:px-20 bg-[#0a0a0f] border border-white/5 rounded-[3rem] shadow-[0_0_50px_rgba(168,85,247,0.05)]">

                    {/* The Left Vertical Dashed Line */}
                    <div className="absolute left-10 md:left-16 top-16 bottom-16 w-[2px] bg-[linear-gradient(to_bottom,transparent,rgba(217,70,239,0.5)_5%,rgba(217,70,239,0.5)_95%,transparent)] border-l-[2px] border-dashed border-fuchsia-500/50" />

                    <div className="flex flex-col space-y-10 relative z-10">
                        {steps.map((step, index) => (
                            <div key={index} className="flex w-full justify-start relative pl-12 md:pl-16">

                                {/* Node Marker on the vertical line */}
                                <div className="absolute left-[-2.5rem] md:left-[-4rem] top-1/2 -translate-y-1/2 -translate-x-[5px] w-4 h-4 rounded-full bg-[#0a0a0f] border-2 border-fuchsia-400 shadow-[0_0_15px_#e879f9] z-20" />

                                {/* Horizontal Dashed Connector */}
                                <div className="absolute left-[-2.5rem] md:left-[-4rem] top-1/2 -translate-y-1/2 w-12 md:w-16 h-[2px] border-t-[2px] border-dashed border-fuchsia-500/50 z-0" />

                                {/* Step Card */}
                                <div className="w-full bg-[#0a0a0f] border border-white/5 rounded-2xl p-6 md:p-8 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:border-fuchsia-500/30 transition-colors z-10">

                                    {/* Circular Play Icon inside card */}
                                    <div className="w-10 h-10 rounded-full bg-transparent border border-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,0.2)] flex items-center justify-center mb-4">
                                        <Play className="w-4 h-4 text-fuchsia-400 ml-1" />
                                    </div>

                                    <div className="text-left">
                                        <h4 className="text-fuchsia-500 font-black tracking-widest text-[11px] mb-2">
                                            {step.subtitle}
                                        </h4>
                                        <h3 className="text-2xl font-bold text-white mb-4 tracking-wide">
                                            {step.title}
                                        </h3>

                                        <ul className="space-y-3">
                                            {step.points.map((point, i) => (
                                                <li key={i} className="flex items-center gap-3 text-gray-400 text-sm font-medium">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-teal-400 flex-shrink-0" />
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
