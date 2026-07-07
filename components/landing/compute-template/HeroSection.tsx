"use client";

import { useEffect, useState } from "react";

export function HeroSection() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className="relative min-h-screen flex flex-col justify-center items-start overflow-hidden bg-black">
            <div className="absolute inset-0 z-0">
                <video autoPlay muted loop playsInline aria-hidden="true" className="w-full h-full object-cover object-center opacity-80">
                    <source src="/v0-assets/bg-hero.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>
            </div>
            
            {/* Grid Overlay */}
            <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none opacity-20">
                {/* Horizontal lines */}
                {[...Array(8)].map((_, i) => (
                    <div key={`h-${i}`} className="absolute h-px bg-white/10" style={{ top: `${(i + 1) * 12.5}%`, left: 0, right: 0 }}></div>
                ))}
                {/* Vertical lines */}
                {[...Array(11)].map((_, i) => (
                    <div key={`v-${i}`} className="absolute w-px bg-white/10" style={{ left: `${(i + 1) * 8.33}%`, top: 0, bottom: 0 }}></div>
                ))}
            </div>

            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 py-32 lg:py-40">
                <div className="lg:max-w-[55%]">
                    <div className={`mb-8 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                        <span className="inline-flex items-center gap-3 text-sm font-mono text-white/60">
                            <span className="w-8 h-px bg-white/30"></span>
                            Deploy autonomous AI agents that execute complex tasks across distributed infrastructure. No supervision required.
                        </span>
                    </div>
                    <div className="mb-12">
                        <h1 className={`text-left text-[clamp(2rem,6vw,7rem)] font-display leading-[0.92] tracking-tight text-white transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                            <span className="block whitespace-nowrap">Distributed compute,</span>
                            <span className="block whitespace-nowrap">
                                agents that{" "}
                                <span className="relative inline-block">
                                    {"automate".split("").map((letter, index) => {
                                        const colors = [
                                            "rgb(236,168,214)", // pink
                                            "rgb(197,151,235)", // light purple
                                            "rgb(158,152,250)", // purple-blue
                                            "rgb(121,205,249)", // blue
                                            "rgb(145,220,188)", // mint
                                            "rgb(230,197,66)",  // yellow
                                            "rgb(245,181,112)", // orange
                                            "rgb(236,168,214)", // pink
                                        ];
                                        return (
                                            <span 
                                                key={index} 
                                                style={{
                                                    display: "inline-block",
                                                    opacity: mounted ? 1 : 0,
                                                    filter: mounted ? "blur(0px)" : "blur(20px)",
                                                    color: colors[index % colors.length],
                                                    transition: `color 0.4s ease, filter 1s ease ${index * 0.1}s, opacity 1s ease ${index * 0.1}s`
                                                }}
                                            >
                                                {letter}
                                            </span>
                                        );
                                    })}
                                </span>
                            </span>
                        </h1>
                    </div>
                </div>
            </div>

            <div className={`absolute bottom-12 left-0 right-0 px-6 lg:px-12 transition-all duration-700 delay-500 ${mounted ? "opacity-100" : "opacity-0"}`}>
                <div className="max-w-[1400px] mx-auto flex flex-wrap items-start gap-10 lg:gap-20">
                    <div className="flex flex-col gap-2">
                        <span className="text-3xl lg:text-4xl font-display text-white">1M+</span>
                        <span className="text-xs font-mono text-white/50 leading-tight">tasks executed<br/>daily</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-3xl lg:text-4xl font-display text-white">99.9%</span>
                        <span className="text-xs font-mono text-white/50 leading-tight">success<br/>rate</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-3xl lg:text-4xl font-display text-white">&lt;10ms</span>
                        <span className="text-xs font-mono text-white/50 leading-tight">execution<br/>latency</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
