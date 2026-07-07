import { Shield, Brain, Zap, Award } from "lucide-react";

export function RetuneFeatures() {
    return (
        <section id="features" className="min-h-[80vh] w-full flex items-center justify-center p-6 md:p-12 border-t border-slate-200 bg-white">
            <div className="w-full max-w-7xl section-container">
                <div className="mb-16">
                    <div className="mono text-xs text-slate-500 mb-6 flex items-center gap-2">
                        <span>[ 04 ]</span>
                        <div className="h-[1px] w-8 bg-slate-300"></div>
                        <span>EXTENDED_CAPABILITIES</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #00bfff 0%, #00ffff 100%)' }}>
                        Core System Features.
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        { icon: Shield, title: "STRICT_CONDITIONS", desc: "Validates margins, fonts, and spacing. No formatting error can hide in the shadows." },
                        { icon: Brain, title: "AI_WISDOM", desc: "Gemini AI analyzes for grammar and tone, ensuring your report sounds highly professional." },
                        { icon: Zap, title: "LIGHTNING_FAST", desc: "Results appear instantly. Full academic structural analysis delivered in under 2 minutes." },
                        { icon: Award, title: "SCORING_MATRIX", desc: "Receive detailed parameters: Structural, Formatting, Grammar, and Overall compliance." },
                    ].map((feature, i) => (
                        <div key={i} className="relative p-8 bg-slate-50 active-card group hover:bg-slate-100 transition-colors duration-500 border border-slate-200">
                            <div className="bracket-corner bl-tl border-slate-300"></div>
                            <div className="bracket-corner bl-tr border-slate-300"></div>
                            <div className="bracket-corner bl-br border-slate-300"></div>
                            <div className="bracket-corner bl-bl border-slate-300"></div>

                            <feature.icon className="w-6 h-6 text-sky-500 mb-6" />
                            <h3 className="mono text-sm font-bold mb-3 text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #00bfff 0%, #00ffff 100%)' }}>SYS.{feature.title}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
