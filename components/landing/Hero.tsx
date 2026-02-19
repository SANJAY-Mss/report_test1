import Link from "next/link";
import { ArrowRight, Sparkles, Shield } from "lucide-react";

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
            <div className="max-w-6xl mx-auto text-center space-y-8 animate-fade-in">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full text-sm">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span>AI-Powered Academic Compliance Platform</span>
                </div>

                {/* Headline */}
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                    <span className="gradient-text">NEXT-GEN AI</span>
                    <br />
                    <span className="text-foreground">FOR ACADEMIC</span>
                    <br />
                    <span className="text-foreground">REPORT VALIDATION</span>
                </h1>

                {/* Subheadline */}
                <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
                    Automatically validate your project reports against{" "}
                    <span className="text-purple-400 font-semibold">Anna University guidelines</span>
                    . Get instant AI-powered feedback on structure, formatting, grammar, and academic quality.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/signup" className="btn-primary inline-flex items-center gap-2">
                        Get Started
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link href="/demo" className="btn-secondary inline-flex items-center gap-2">
                        Book a Demo
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 max-w-4xl mx-auto">
                    <div className="glass-card p-6 rounded-2xl space-y-2">
                        <div className="text-3xl font-bold gradient-text">200+</div>
                        <div className="text-sm text-foreground/60">Companies Trusted Us</div>
                    </div>
                    <div className="glass-card p-6 rounded-2xl space-y-2">
                        <div className="text-3xl font-bold gradient-text">10,000+</div>
                        <div className="text-sm text-foreground/60">Reports Analyzed</div>
                    </div>
                    <div className="glass-card p-6 rounded-2xl space-y-2">
                        <div className="text-3xl font-bold gradient-text">99%</div>
                        <div className="text-sm text-foreground/60">Accuracy Rate</div>
                    </div>
                </div>

                {/* Dashboard Preview */}
                <div className="pt-12 relative group">
                    <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity" />
                    <div className="relative glass-card p-4 rounded-3xl">
                        <div className="bg-[rgb(var(--background))] rounded-2xl p-8 min-h-[400px] flex items-center justify-center">
                            <div className="text-center space-y-4">
                                <Shield className="w-20 h-20 mx-auto text-purple-500 animate-float" />
                                <p className="text-foreground/60">Dashboard Preview Coming Soon</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
