"use client";

export function PricingSection() {
    return (
        <section className="py-32 lg:py-48 bg-black border-t border-white/5 relative overflow-hidden">
            <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-[#79cdf9]/5 blur-[120px] -translate-y-1/2 pointer-events-none"></div>
            
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
                <div className="text-center mb-24">
                    <span className="inline-block text-white/50 font-mono text-xs mb-6 uppercase tracking-wider">
                        [ PRICING ]
                    </span>
                    <h2 className="text-4xl lg:text-6xl font-display text-white mb-6">Simple, predictable pricing.</h2>
                    <p className="text-white/60 font-sans max-w-2xl mx-auto text-lg">
                        Pay only for the compute and actions your agents actually use. No hidden fees or complex tiers.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Explorer Tier */}
                    <div className="rounded-3xl bg-white/[0.02] border border-white/5 p-8 lg:p-10 flex flex-col transition-transform duration-500 hover:-translate-y-2">
                        <div className="mb-8">
                            <h3 className="text-xl font-display text-white mb-2">Explorer</h3>
                            <p className="text-white/50 font-sans text-sm h-10">Perfect for testing and small projects.</p>
                        </div>
                        <div className="mb-8 pb-8 border-b border-white/10">
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-display text-white">$0</span>
                                <span className="text-white/50 font-mono text-sm">/mo</span>
                            </div>
                        </div>
                        <ul className="space-y-4 mb-12 flex-1 font-mono text-sm">
                            <li className="flex items-start gap-3 text-white/70">
                                <span className="text-white mt-0.5">✓</span>
                                Up to 3 active agents
                            </li>
                            <li className="flex items-start gap-3 text-white/70">
                                <span className="text-white mt-0.5">✓</span>
                                1,000 executions per month
                            </li>
                            <li className="flex items-start gap-3 text-white/70">
                                <span className="text-white mt-0.5">✓</span>
                                Basic tool integrations
                            </li>
                            <li className="flex items-start gap-3 text-white/70">
                                <span className="text-white mt-0.5">✓</span>
                                Community support
                            </li>
                        </ul>
                        <button className="w-full h-12 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-white text-black hover:bg-white/90">
                            Get started for free
                        </button>
                    </div>

                    {/* Builder Tier */}
                    <div className="rounded-3xl bg-white/[0.05] border border-[#9e98fa]/30 p-8 lg:p-10 flex flex-col relative transition-transform duration-500 hover:-translate-y-2 shadow-[0_0_40px_rgba(158,152,250,0.1)]">
                        <div className="absolute top-0 right-8 -translate-y-1/2">
                            <span className="bg-[#9e98fa] text-black text-[10px] font-mono px-3 py-1 rounded-full uppercase tracking-wider font-bold">
                                Most Popular
                            </span>
                        </div>
                        <div className="mb-8">
                            <h3 className="text-xl font-display text-white mb-2">Builder</h3>
                            <p className="text-white/50 font-sans text-sm h-10">For teams building production AI workflows.</p>
                        </div>
                        <div className="mb-8 pb-8 border-b border-white/10">
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-display text-white">$65</span>
                                <span className="text-white/50 font-mono text-sm">/mo</span>
                            </div>
                        </div>
                        <ul className="space-y-4 mb-12 flex-1 font-mono text-sm">
                            <li className="flex items-start gap-3 text-white/70">
                                <span className="text-[#9e98fa] mt-0.5">✓</span>
                                Unlimited active agents
                            </li>
                            <li className="flex items-start gap-3 text-white/70">
                                <span className="text-[#9e98fa] mt-0.5">✓</span>
                                50,000 executions per month
                            </li>
                            <li className="flex items-start gap-3 text-white/70">
                                <span className="text-[#9e98fa] mt-0.5">✓</span>
                                All premium integrations
                            </li>
                            <li className="flex items-start gap-3 text-white/70">
                                <span className="text-[#9e98fa] mt-0.5">✓</span>
                                Stateful memory (100GB)
                            </li>
                            <li className="flex items-start gap-3 text-white/70">
                                <span className="text-[#9e98fa] mt-0.5">✓</span>
                                Priority email support
                            </li>
                        </ul>
                        <button className="w-full h-12 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-[#9e98fa] text-black hover:bg-[#8b85e6]">
                            Start free trial
                        </button>
                    </div>

                    {/* Scale Tier */}
                    <div className="rounded-3xl bg-white/[0.02] border border-white/5 p-8 lg:p-10 flex flex-col transition-transform duration-500 hover:-translate-y-2">
                        <div className="mb-8">
                            <h3 className="text-xl font-display text-white mb-2">Scale</h3>
                            <p className="text-white/50 font-sans text-sm h-10">Custom infrastructure for enterprise scale.</p>
                        </div>
                        <div className="mb-8 pb-8 border-b border-white/10">
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-display text-white">Custom</span>
                            </div>
                        </div>
                        <ul className="space-y-4 mb-12 flex-1 font-mono text-sm">
                            <li className="flex items-start gap-3 text-white/70">
                                <span className="text-white mt-0.5">✓</span>
                                Dedicated edge infrastructure
                            </li>
                            <li className="flex items-start gap-3 text-white/70">
                                <span className="text-white mt-0.5">✓</span>
                                Custom tool development
                            </li>
                            <li className="flex items-start gap-3 text-white/70">
                                <span className="text-white mt-0.5">✓</span>
                                VPC peering & private links
                            </li>
                            <li className="flex items-start gap-3 text-white/70">
                                <span className="text-white mt-0.5">✓</span>
                                Dedicated success manager
                            </li>
                            <li className="flex items-start gap-3 text-white/70">
                                <span className="text-white mt-0.5">✓</span>
                                99.99% SLA guarantee
                            </li>
                        </ul>
                        <button className="w-full h-12 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-white/20 bg-transparent text-white hover:bg-white/10">
                            Contact sales
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
