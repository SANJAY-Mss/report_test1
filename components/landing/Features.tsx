"use client";

import React from "react";

function DiamondCard({ title, subtitle, variant = "small" }: { title: string, subtitle: string, variant?: "small" | "large" }) {
    const isLarge = variant === "large";
    return (
        <div className="relative group flex-shrink-0">
            {/* The Diamond Shape */}
            <div
                className={`
                    flex items-center justify-center flex-shrink-0
                    rotate-45 transition-all duration-500 hover:scale-105 cursor-pointer
                    border-2 border-purple-500/80 bg-[#0a0a0f]/80 backdrop-blur-sm
                    shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_50px_rgba(168,85,247,0.6)]
                    ${isLarge ? "w-56 h-56 sm:w-64 sm:h-64 md:w-[320px] md:h-[320px]" : "w-40 h-40 sm:w-48 sm:h-48 md:w-[220px] md:h-[220px]"}
                    mx-2 md:mx-6
                `}
            >
                {/* Content Container (Counter-rotated to keep text straight) */}
                <div className="-rotate-45 flex flex-col items-center justify-center text-center p-4 w-full h-full max-w-[90%] max-h-[90%] mx-auto">
                    <h3 className={`font-bold text-white mb-2 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)] ${isLarge ? "text-3xl md:text-5xl lg:text-6xl" : "text-xl md:text-2xl lg:text-3xl"}`}>
                        {title}
                    </h3>
                    <p className={`text-purple-200/80 leading-tight font-medium ${isLarge ? "text-sm md:text-base lg:text-lg px-6" : "text-xs md:text-sm px-2"}`}>
                        {subtitle}
                    </p>
                </div>
            </div>

            {/* Glowing Corner Dots */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_15px_#e879f9] bg-fuchsia-400 ${isLarge ? 'w-4 h-4' : 'w-3 h-3'}`} />
            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full shadow-[0_0_15px_#e879f9] bg-fuchsia-400 ${isLarge ? 'w-4 h-4' : 'w-3 h-3'}`} />
            <div className={`absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_15px_#e879f9] bg-fuchsia-400 ${isLarge ? 'w-4 h-4' : 'w-3 h-3'}`} />
            <div className={`absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_15px_#e879f9] bg-fuchsia-400 ${isLarge ? 'w-4 h-4' : 'w-3 h-3'}`} />
        </div>
    );
}

export function Features() {
    return (
        <section id="features" className="py-32 px-6 relative w-full overflow-hidden bg-transparent">
            {/* Background Magic Glows */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-700/20 blur-[150px] rounded-full pointer-events-none -z-10" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-fuchsia-700/20 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-[90rem] mx-auto flex flex-col items-center gap-24">

                {/* Section Header */}
                <div className="text-center w-full space-y-6">
                    <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-tight text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">Advantages</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
                        We have carefully decoded the <strong className="text-purple-300">Anna University 2026 Academic Guidelines</strong> so that you never have to guess your formatting again. Join thousands of students who have secured their grades by exorcising grammatical errors before printing.
                    </p>
                </div>

                {/* Horizontal Diamond Array */}
                <div className="relative w-full flex flex-col md:flex-row items-center justify-center pt-20 pb-16">

                    {/* Connecting UI Background Line */}
                    <div className="hidden md:block absolute top-1/2 left-[10%] w-[80%] h-[2px] bg-gradient-to-r from-transparent via-purple-500/60 to-transparent -z-10 shadow-[0_0_20px_rgba(168,85,247,0.5)]" />

                    {/* Left Diamond */}
                    <div className="z-10 md:-mr-12 lg:-mr-8 relative mt-10 md:mt-0 shadow-2xl rounded-3xl">
                        <DiamondCard
                            title="90s"
                            subtitle="Lightning Fast Report Audits"
                            variant="small"
                        />
                    </div>

                    {/* Center Diamond (Hero Element - Higher z-index) */}
                    <div className="z-20 relative -mt-12 md:mt-0 md:-translate-y-16 shadow-2xl rounded-3xl">
                        <DiamondCard
                            title="100%"
                            subtitle="Anna University Format Compliant"
                            variant="large"
                        />
                    </div>

                    {/* Right Diamond */}
                    <div className="z-10 md:-ml-12 lg:-ml-8 relative -mt-12 md:mt-0 shadow-2xl rounded-3xl">
                        <DiamondCard
                            title="24/7"
                            subtitle="Spectral AI Chat Assistant"
                            variant="small"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
