"use client";

export function TestimonialsSection() {
    return (
        <section className="py-32 lg:py-48 bg-black border-t border-white/5 relative">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="text-center mb-24">
                    <span className="inline-block text-white/50 font-mono text-xs mb-6 uppercase tracking-wider">
                        [ TESTIMONIALS ]
                    </span>
                    <h2 className="text-4xl lg:text-6xl font-display text-white">Trusted by teams worldwide.</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="rounded-3xl bg-white/[0.02] border border-white/5 p-8 lg:p-10 relative">
                        <div className="text-4xl text-white/20 font-display absolute top-8 left-8">"</div>
                        <p className="text-white/80 font-sans text-lg relative z-10 mt-6 mb-8 leading-relaxed">
                            Compute has completely transformed our data pipeline. What used to take a team of three engineers a full week is now handled autonomously in minutes.
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-white/10"></div>
                            <div>
                                <div className="text-white font-medium">Sarah Chen</div>
                                <div className="text-white/50 text-sm font-mono mt-1">VP Engineering, Nexus</div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl bg-white/[0.02] border border-white/5 p-8 lg:p-10 relative mt-0 md:mt-8">
                        <div className="text-4xl text-white/20 font-display absolute top-8 left-8">"</div>
                        <p className="text-white/80 font-sans text-lg relative z-10 mt-6 mb-8 leading-relaxed">
                            The security controls are what sold us. We can deploy autonomous agents that interact with our core systems, knowing they're constrained by rigorous boundaries.
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-white/10"></div>
                            <div>
                                <div className="text-white font-medium">Marcus Johnson</div>
                                <div className="text-white/50 text-sm font-mono mt-1">CISO, Fortis Financial</div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl bg-white/[0.02] border border-white/5 p-8 lg:p-10 relative mt-0 md:mt-16">
                        <div className="text-4xl text-white/20 font-display absolute top-8 left-8">"</div>
                        <p className="text-white/80 font-sans text-lg relative z-10 mt-6 mb-8 leading-relaxed">
                            Building on the SDK felt like magic. We had our first agent analyzing customer feedback and routing tickets within a single afternoon.
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-white/10"></div>
                            <div>
                                <div className="text-white font-medium">Elena Rodriguez</div>
                                <div className="text-white/50 text-sm font-mono mt-1">Lead Developer, Sync</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
