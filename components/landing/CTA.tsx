import { Star, BarChart3, TrendingUp } from "lucide-react";

export function CTA() {
    return (
        <section className="py-24 px-6 relative overflow-hidden bg-[#030308]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(255,0,127,0.05),transparent_60%)] blur-[80px] pointer-events-none" />

            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 relative z-10 space-y-24">

                {/* Benefits & Stats Section */}
                <div>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-white">Benefits & Stats</h2>
                        <div className="text-[10px] font-bold tracking-[0.2em] text-neutral-500 uppercase">Trusted By Students By</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Fake Chart Card */}
                        <div className="bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 flex flex-col gap-4">
                            <div className="flex items-center justify-between text-neutral-400 mb-2">
                                <span className="text-sm font-medium">Doc 14</span>
                                <TrendingUp className="w-4 h-4 text-[#bf00ff]" />
                            </div>
                            <div className="flex items-end gap-2 h-20 w-full">
                                <div className="w-1/4 bg-[#bf00ff] rounded-t-sm h-[40%]" />
                                <div className="w-1/4 bg-[#00f3ff] rounded-t-sm h-[70%]" />
                                <div className="w-1/4 bg-[#bf00ff] rounded-t-sm h-[50%]" />
                                <div className="w-1/4 bg-[#00f3ff] rounded-t-sm h-[100%]" />
                            </div>
                        </div>

                        {/* Rating Card */}
                        <div className="bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-2">
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                                ))}
                            </div>
                            <div className="text-4xl font-bold text-white tracking-tight">4.8</div>
                            <div className="text-xs text-neutral-500 font-medium">Personal rating</div>
                        </div>

                        {/* University 1 Target */}
                        <div className="bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-2 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
                            <div className="text-2xl font-serif text-white tracking-tight">Oxford</div>
                            <div className="text-[10px] text-neutral-500">Academic network institution</div>
                        </div>

                        {/* University 2 Target */}
                        <div className="bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-2 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
                            <div className="flex items-baseline gap-4">
                                <span className="text-3xl font-bold text-white tracking-tighter">MIT</span>
                                <span className="text-xl font-serif text-white tracking-tight">Stanford</span>
                            </div>
                            <div className="text-[10px] text-neutral-500">Global research leaders</div>
                        </div>
                    </div>
                </div>

                {/* Testimonials Section */}
                <div>
                    <h2 className="text-3xl font-bold text-white text-center mb-12">Testimonials</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                name: "Sarah Johnson",
                                role: "Computer Science Major",
                                text: "ProjectTracker saved my thesis! My supervisor is extremely strict about formatting, and I passed the formatting check on the first try. Worth every penny.",
                            },
                            {
                                name: "David Miller",
                                role: "Engineering Graduate",
                                text: "The AI grammar check is incredible. It caught passive voice and informal phrasing that my own proofreading missed. Absolute game-changer.",
                            },
                            {
                                name: "Emma Davis",
                                role: "Research Assistant",
                                text: "I used to spend 5-6 hours just fixing margins, citations, and fonts. Now I drag, drop, and export in 2 minutes. I tell everyone about this tool.",
                            }
                        ].map((t, i) => (
                            <div key={i} className="bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-8 flex flex-col gap-6">
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star key={s} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                    ))}
                                </div>
                                <p className="text-sm text-neutral-300 leading-relaxed italic">"{t.text}"</p>
                                <div className="mt-auto flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-900 border border-white/10 shrink-0" />
                                    <div>
                                        <div className="text-sm font-semibold text-white">{t.name}</div>
                                        <div className="text-[10px] text-neutral-500">{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
