import { Upload, Cpu, CheckCircle } from "lucide-react";

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 px-6 bg-[#030308] relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10 w-full px-4 sm:px-6">

                {/* Section Header */}
                <div className="text-center mb-16 animate-fade-in">
                    <h2 className="text-4xl md:text-[2.75rem] font-bold tracking-tight text-white mb-2">
                        3 Steps
                    </h2>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">

                    {/* Step 1 */}
                    <div className="bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/10 hover:border-[#ff5e00]/30 transition-colors duration-300 rounded-2xl p-8 flex flex-col items-start gap-6 group hover:shadow-[0_10px_40px_rgba(255,94,0,0.1)]">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1a1a1f] to-[#0a0a0f] border border-white/5 flex items-center justify-center shrink-0 mb-2 group-hover:scale-110 transition-transform duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                            <Upload className="w-5 h-5 text-[#ff5e00]" strokeWidth={1.5} />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-white">1. Upload</h3>
                            <p className="text-sm text-neutral-400 leading-relaxed font-light">
                                Drop in your paper, PDF or Word format here.
                            </p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/10 hover:border-[#00f3ff]/30 transition-colors duration-300 rounded-2xl p-8 flex flex-col items-start gap-6 group hover:shadow-[0_10px_40px_rgba(0,243,255,0.1)]">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1a1a1f] to-[#0a0a0f] border border-white/5 flex items-center justify-center shrink-0 mb-2 group-hover:scale-110 transition-transform duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] relative">
                            {/* Little decorative tag absolute positioned like in the image */}
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#00f3ff]/20 border border-[#00f3ff]/50 rounded text-[6px] flex items-center justify-center text-[#00f3ff]">AI</div>
                            <Cpu className="w-5 h-5 text-[#00f3ff]" strokeWidth={1.5} />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-white">2. AI Scan</h3>
                            <p className="text-sm text-neutral-400 leading-relaxed font-light">
                                Our bespoke engine cross-checks with 1500+ rules live.
                            </p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/10 hover:border-[#bf00ff]/30 transition-colors duration-300 rounded-2xl p-8 flex flex-col items-start gap-6 group hover:shadow-[0_10px_40px_rgba(191,0,255,0.1)]">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1a1a1f] to-[#0a0a0f] border border-white/5 flex items-center justify-center shrink-0 mb-2 group-hover:scale-110 transition-transform duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                            <CheckCircle className="w-5 h-5 text-[#bf00ff]" strokeWidth={1.5} />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-white">3. Fix & Export</h3>
                            <p className="text-sm text-neutral-400 leading-relaxed font-light">
                                Customize metrics and expert export your flawless draft.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
