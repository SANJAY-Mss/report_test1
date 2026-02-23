import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import ShinyText from "@/components/ui/ShinyText";

export function CTA() {
    return (
        <section className="py-24 px-6 relative overflow-hidden">
            {/* Glowing Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black pointer-events-none -z-10" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-500/20 blur-[100px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
                {/* Headline */}
                <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full text-sm mb-8 border-purple-500/30">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span className="text-purple-200">Start your journey today</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                    <ShinyText color="#e5e7eb" shineColor="#ff80ee" speed={3}>
                        Ready to dive in?
                    </ShinyText>
                    <br />
                    <span className="gradient-text">Start your journey today</span>
                </h2>

                {/* Subheading */}
                <p className="text-xl text-white/60 max-w-2xl mx-auto">
                    Join thousands of students who use ReportGuard to Ensure <span className="text-purple-400">100% compliance</span>.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/signup" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4">
                        Get Started
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link href="/contact" className="btn-secondary inline-flex items-center gap-2 text-lg px-8 py-4 border-purple-500/30 hover:bg-purple-500/10">
                        Contact Sales
                    </Link>
                </div>

                {/* Trust Indicators */}
                <div className="pt-12">
                    <div className="glass-card p-8 rounded-3xl">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                            <div>
                                <div className="text-3xl font-bold gradient-text">100%</div>
                                <div className="text-sm text-foreground/60 mt-2">Anna University Compliant</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold gradient-text">24/7</div>
                                <div className="text-sm text-foreground/60 mt-2">Support Available</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold gradient-text">Free</div>
                                <div className="text-sm text-foreground/60 mt-2">First 3 Reports</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
