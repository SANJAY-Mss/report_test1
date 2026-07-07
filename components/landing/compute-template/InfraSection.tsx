"use client";

import Image from "next/image";

export function InfraSection() {
    return (
        <section id="infra" className="py-32 lg:py-48 bg-black border-t border-white/5 overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
                <div className="text-center mb-24 relative z-10">
                    <span className="inline-block text-white/50 font-mono text-xs mb-6 uppercase tracking-wider">
                        [ INFRASTRUCTURE ]
                    </span>
                    <h2 className="text-4xl lg:text-6xl font-display text-white mb-6">Global by default.</h2>
                    <p className="text-white/60 font-sans max-w-2xl mx-auto text-lg">
                        Agents are deployed to edge locations worldwide, ensuring minimal latency regardless of where they interact.
                    </p>
                </div>

                <div className="relative w-full aspect-[2/1] max-w-5xl mx-auto">
                    {/* The map image */}
                    <div className="absolute inset-0 opacity-40">
                        <Image 
                            src="/v0-assets/world.png" 
                            alt="Global infrastructure map" 
                            fill
                            className="object-contain"
                        />
                    </div>
                    
                    {/* Connection arcs (SVG) */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice">
                        <path d="M 200 150 Q 400 50 600 120" className="connecting-line" />
                        <path d="M 600 120 Q 750 100 850 200" className="connecting-line" style={{ animationDelay: "1s" }} />
                        <path d="M 200 150 Q 350 250 500 350" className="connecting-line" style={{ animationDelay: "2s" }} />
                        
                        {/* Nodes */}
                        <circle cx="200" cy="150" r="4" fill="#fff" className="animate-pulse" />
                        <circle cx="600" cy="120" r="4" fill="#fff" className="animate-pulse" style={{ animationDelay: "0.5s" }} />
                        <circle cx="850" cy="200" r="4" fill="#fff" className="animate-pulse" style={{ animationDelay: "1.5s" }} />
                        <circle cx="500" cy="350" r="4" fill="#fff" className="animate-pulse" style={{ animationDelay: "2.5s" }} />
                    </svg>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mt-20 border-t border-white/5 pt-20">
                    <div className="text-center md:text-left">
                        <div className="text-4xl font-display text-white mb-2">35+</div>
                        <div className="text-sm font-mono text-white/50">Edge regions</div>
                    </div>
                    <div className="text-center md:text-left">
                        <div className="text-4xl font-display text-white mb-2">99.99%</div>
                        <div className="text-sm font-mono text-white/50">Uptime SLA</div>
                    </div>
                    <div className="text-center md:text-left">
                        <div className="text-4xl font-display text-white mb-2">12ms</div>
                        <div className="text-sm font-mono text-white/50">Global latency</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
