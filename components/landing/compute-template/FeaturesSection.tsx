"use client";

import Image from "next/image";

export function FeaturesSection() {
    return (
        <section id="features" className="relative py-32 lg:py-48 bg-black overflow-hidden border-t border-white/5">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-[#050505]"></div>
            
            <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mb-32">
                    <div className="lg:w-1/3">
                        <div className="sticky top-32">
                            <span className="inline-block text-white/50 font-mono text-xs mb-6 uppercase tracking-wider">
                                [ CAPABILITIES ]
                            </span>
                            <h2 className="text-4xl lg:text-6xl font-display text-white leading-tight mb-8">
                                Intelligent<br />workers.
                            </h2>
                            <p className="text-white/60 text-lg font-sans max-w-sm leading-relaxed">
                                Capable of executing complex reasoning, taking actions across your environment, and learning from outcomes.
                            </p>
                        </div>
                    </div>

                    <div className="lg:w-2/3 flex flex-col gap-8">
                        {/* Feature Card 1 */}
                        <div className="group relative rounded-3xl bg-white/[0.02] border border-white/5 p-8 lg:p-12 overflow-hidden hover:bg-white/[0.04] transition-colors duration-500">
                            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white/30 rotate-45">
                                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            
                            <div className="mb-12">
                                <h3 className="text-2xl font-display text-white mb-4">Autonomous execution</h3>
                                <p className="text-white/60 font-sans max-w-md">
                                    Agents that can plan, execute, and verify tasks without human intervention. Give them a goal, they figure out the rest.
                                </p>
                            </div>

                            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black/50 border border-white/10">
                                <Image 
                                    src="/v0-assets/features-upscaled-12.png" 
                                    alt="Autonomous execution visualization" 
                                    fill
                                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105"
                                />
                                
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                
                                {/* Overlay UI elements */}
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="flex items-center gap-4 p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
                                        <div className="w-2 h-2 rounded-full bg-[#eca8d6] animate-pulse"></div>
                                        <div className="flex-1">
                                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-[#eca8d6] to-[#9e98fa] animate-progress w-full"></div>
                                            </div>
                                        </div>
                                        <span className="font-mono text-[10px] text-white/50">PROCESSING</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feature Cards Grid */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="group rounded-3xl bg-white/[0.02] border border-white/5 p-8 lg:p-10 hover:bg-white/[0.04] transition-colors duration-500">
                                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-8 group-hover:border-white/30 transition-colors">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                                        <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="1.5"/>
                                        <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-display text-white mb-3">Stateful memory</h3>
                                <p className="text-white/50 font-sans text-sm">Agents remember past interactions, context, and preferences across sessions.</p>
                            </div>

                            <div className="group rounded-3xl bg-white/[0.02] border border-white/5 p-8 lg:p-10 hover:bg-white/[0.04] transition-colors duration-500">
                                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-8 group-hover:border-white/30 transition-colors">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                                        <path d="M4 7V17M20 7V17M12 4V20M8 5.5V18.5M16 5.5V18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-display text-white mb-3">Multi-modal</h3>
                                <p className="text-white/50 font-sans text-sm">Process text, images, and structured data natively within the same workflow.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
