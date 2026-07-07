"use client";

export function ProcessSection() {
    return (
        <section id="how-it-works" className="py-32 lg:py-48 bg-black relative border-t border-white/5">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="text-center mb-32">
                    <span className="inline-block text-white/50 font-mono text-xs mb-6 uppercase tracking-wider">
                        [ WORKFLOW ]
                    </span>
                    <h2 className="text-5xl lg:text-7xl font-display text-white tracking-tight">
                        Define. Deploy. Scale.
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6 lg:gap-8 relative">
                    {/* Connecting line */}
                    <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                    {/* Step 1 */}
                    <div className="relative group">
                        <div className="w-24 h-24 rounded-full bg-white/[0.02] border border-white/10 flex items-center justify-center mx-auto mb-10 group-hover:border-white/30 group-hover:scale-105 transition-all duration-500 relative z-10 backdrop-blur-sm">
                            <span className="font-mono text-white/40 group-hover:text-white transition-colors">01</span>
                            {/* Glowing dot */}
                            <div className="absolute inset-0 rounded-full bg-[#9e98fa] opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500"></div>
                        </div>
                        <div className="text-center">
                            <h3 className="text-2xl font-display text-white mb-4">Define tools</h3>
                            <p className="text-white/50 font-sans text-sm max-w-[240px] mx-auto leading-relaxed">
                                Connect APIs, databases, and existing software as tools your agents can use.
                            </p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative group">
                        <div className="w-24 h-24 rounded-full bg-white/[0.02] border border-white/10 flex items-center justify-center mx-auto mb-10 group-hover:border-white/30 group-hover:scale-105 transition-all duration-500 relative z-10 backdrop-blur-sm">
                            <span className="font-mono text-white/40 group-hover:text-white transition-colors">02</span>
                            <div className="absolute inset-0 rounded-full bg-[#79cdf9] opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500"></div>
                        </div>
                        <div className="text-center">
                            <h3 className="text-2xl font-display text-white mb-4">Set boundaries</h3>
                            <p className="text-white/50 font-sans text-sm max-w-[240px] mx-auto leading-relaxed">
                                Establish permissions, resource limits, and verification steps for safe execution.
                            </p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative group">
                        <div className="w-24 h-24 rounded-full bg-white/[0.02] border border-white/10 flex items-center justify-center mx-auto mb-10 group-hover:border-white/30 group-hover:scale-105 transition-all duration-500 relative z-10 backdrop-blur-sm">
                            <span className="font-mono text-white/40 group-hover:text-white transition-colors">03</span>
                            <div className="absolute inset-0 rounded-full bg-[#eca8d6] opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500"></div>
                        </div>
                        <div className="text-center">
                            <h3 className="text-2xl font-display text-white mb-4">Let them run</h3>
                            <p className="text-white/50 font-sans text-sm max-w-[240px] mx-auto leading-relaxed">
                                Agents operate continuously, scaling resources as needed to complete objectives.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
