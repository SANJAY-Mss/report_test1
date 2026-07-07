import { GraduationCap, Feather, Cpu } from "lucide-react";

export function InnovatingAcademicSuccess() {
    return (
        <section className="py-24 px-6 bg-[#030308] relative overflow-hidden">
            {/* Subtle left glow */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(0,243,255,0.05),transparent_60%)] blur-[80px] pointer-events-none" />

            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Left Side: Text */}
                <div className="space-y-6">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                        Innovating<br />Academic Success
                    </h2>
                    <p className="text-neutral-400 text-sm leading-relaxed max-w-md font-light">
                        Our deep scan engine validates every page for document integrity. Thousands of academic optimization variables checked rapidly. Never check, we ensure your document is solid in seconds.
                    </p>
                </div>

                {/* Right Side: 3 Stacked Cards */}
                <div className="space-y-4">

                    {/* Card 1 */}
                    <div className="bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/5 hover:border-white/10 transition-colors duration-300 rounded-2xl p-5 flex items-center gap-6 group hover:shadow-[0_4px_20px_rgba(255,255,255,0.02)]">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1a1a1f] to-[#0a0a0f] border border-white/5 flex items-center justify-center shrink-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] group-hover:scale-105 transition-transform duration-300">
                            <GraduationCap className="w-6 h-6 text-[#bf00ff]" strokeWidth={1.5} />
                        </div>
                        <div>
                            <h3 className="text-white font-semibold text-lg mb-1">Academic Icons</h3>
                            <p className="text-xs text-neutral-500 leading-relaxed font-light">High-quality 3D academic icons guide high-quality academic documents.</p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/5 hover:border-white/10 transition-colors duration-300 rounded-2xl p-5 flex items-center gap-6 group hover:shadow-[0_4px_20px_rgba(255,255,255,0.02)]">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1a1a1f] to-[#0a0a0f] border border-white/5 flex items-center justify-center shrink-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] group-hover:scale-105 transition-transform duration-300">
                            <Feather className="w-6 h-6 text-[#00f3ff]" strokeWidth={1.5} />
                        </div>
                        <div>
                            <h3 className="text-white font-semibold text-lg mb-1">Quill Quality</h3>
                            <p className="text-xs text-neutral-500 leading-relaxed font-light">AI generated 3D academic elements match perfectly for academic tasks.</p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/5 hover:border-white/10 transition-colors duration-300 rounded-2xl p-5 flex items-center gap-6 group hover:shadow-[0_4px_20px_rgba(255,255,255,0.02)]">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1a1a1f] to-[#0a0a0f] border border-white/5 flex items-center justify-center shrink-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] group-hover:scale-105 transition-transform duration-300">
                            <Cpu className="w-6 h-6 text-[#ff5e00]" strokeWidth={1.5} />
                        </div>
                        <div>
                            <h3 className="text-white font-semibold text-lg mb-1">Digital Chip</h3>
                            <p className="text-xs text-neutral-500 leading-relaxed font-light">High-quality 3D academic icons illustrate academic validation process.</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
