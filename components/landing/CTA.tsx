import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTA() {
    return (
        <section className="py-24 px-6 relative overflow-hidden">
            {/* Glowing Background */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-3xl" />
            </div>

            <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
                {/* Headline */}
                <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                    Ready to dive in?
                    <br />
                    <span className="gradient-text">Start your journey today</span>
                </h2>

                {/* Subheading */}
                <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                    Join thousands of students and institutions using ReportGuard to ensure
                    academic excellence and Anna University compliance.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/signup" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4">
                        Get Started
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link href="/contact" className="btn-secondary inline-flex items-center gap-2 text-lg px-8 py-4">
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
