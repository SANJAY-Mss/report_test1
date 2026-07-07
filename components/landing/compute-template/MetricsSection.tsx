"use client";

import Image from "next/image";

export function MetricsSection() {
    return (
        <section className="py-24 bg-black border-t border-white/5 relative">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    <div className="lg:w-1/3">
                        <h2 className="text-3xl font-display text-white mb-4">Real-time agent metrics</h2>
                        <p className="text-white/50 font-sans mb-8">
                            Monitor execution times, API calls, and success rates across your entire fleet of agents in real-time.
                        </p>
                        <ul className="space-y-4 font-mono text-sm">
                            <li className="flex items-center gap-3 text-white/70">
                                <span className="w-2 h-2 rounded-full bg-[#eca8d6]"></span>
                                Execution volume
                            </li>
                            <li className="flex items-center gap-3 text-white/70">
                                <span className="w-2 h-2 rounded-full bg-[#9e98fa]"></span>
                                Token usage
                            </li>
                            <li className="flex items-center gap-3 text-white/70">
                                <span className="w-2 h-2 rounded-full bg-[#79cdf9]"></span>
                                API latency
                            </li>
                        </ul>
                    </div>
                    
                    <div className="lg:w-2/3 w-full">
                        <div className="relative rounded-2xl bg-white/[0.02] border border-white/5 p-6 overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 flex gap-2">
                                <div className="w-2 h-2 rounded-full bg-white/20"></div>
                                <div className="w-2 h-2 rounded-full bg-white/20"></div>
                                <div className="w-2 h-2 rounded-full bg-white/20"></div>
                            </div>
                            
                            <div className="h-[300px] w-full mt-8 relative">
                                <Image 
                                    src="/v0-assets/real-time-graph.png" 
                                    alt="Real-time metrics graph" 
                                    fill
                                    className="object-contain opacity-80"
                                />
                            </div>
                            
                            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 to-transparent"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
