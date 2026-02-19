"use client";

import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Check, Shield, Zap, School } from "lucide-react";

export default function PricingPage() {
    return (
        <main className="min-h-screen">
            <Header />

            {/* Background Elements */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute inset-0 bg-[rgb(var(--background))]" />
                <div className="absolute top-0 left-0 w-full h-full dot-pattern opacity-20" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
            </div>

            <section className="pt-32 pb-24 px-6">
                <div className="max-w-7xl mx-auto space-y-16">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto space-y-4 animate-fade-in">
                        <h1 className="text-4xl md:text-5xl font-bold">
                            Simple, Transparent <span className="gradient-text">Pricing</span>
                        </h1>
                        <p className="text-xl text-foreground/70">
                            Choose the perfect plan for your academic needs. No hidden fees.
                        </p>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Student Plan */}
                        <div className="glass-card p-8 rounded-3xl relative overflow-hidden transition-all duration-300 hover:scale-105 group border border-white/10">
                            <div className="space-y-6 relative z-10">
                                <div className="space-y-2">
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/10 text-purple-400">
                                        <Shield className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-2xl font-bold">Student</h3>
                                    <p className="text-sm text-foreground/60">Perfect for individual reports</p>
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold gradient-text">Free</span>
                                </div>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-3 text-sm text-foreground/80">
                                        <Check className="w-4 h-4 text-green-500" />
                                        3 Reports / Month
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-foreground/80">
                                        <Check className="w-4 h-4 text-green-500" />
                                        Basic Formatting Checks
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-foreground/80">
                                        <Check className="w-4 h-4 text-green-500" />
                                        Anna Univ. Guidelines
                                    </li>
                                </ul>
                                <Link href="/signup" className="w-full block text-center py-3 rounded-xl font-medium bg-white/5 hover:bg-white/10 border border-white/10 transition-all">
                                    Get Started
                                </Link>
                            </div>
                        </div>

                        {/* Researcher Plan */}
                        <div className="glass-card p-8 rounded-3xl relative overflow-hidden transition-all duration-300 hover:scale-105 group border-purple-500/50 shadow-glow-purple">
                            <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                                POPULAR
                            </div>
                            <div className="space-y-6 relative z-10">
                                <div className="space-y-2">
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-600 text-white">
                                        <Zap className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-2xl font-bold">Researcher</h3>
                                    <p className="text-sm text-foreground/60">For serious academic work</p>
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold gradient-text">$9</span>
                                    <span className="text-foreground/60">/ month</span>
                                </div>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-3 text-sm text-foreground/80">
                                        <Check className="w-4 h-4 text-green-500" />
                                        Unlimited Reports
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-foreground/80">
                                        <Check className="w-4 h-4 text-green-500" />
                                        Advanced Plagiarism Check
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-foreground/80">
                                        <Check className="w-4 h-4 text-green-500" />
                                        Citation Verification
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-foreground/80">
                                        <Check className="w-4 h-4 text-green-500" />
                                        Priority Support
                                    </li>
                                </ul>
                                <Link href="/signup?plan=pro" className="w-full block text-center py-3 rounded-xl font-medium btn-primary transition-all">
                                    Start Free Trial
                                </Link>
                            </div>
                        </div>

                        {/* Department Plan */}
                        <div className="glass-card p-8 rounded-3xl relative overflow-hidden transition-all duration-300 hover:scale-105 group border border-white/10">
                            <div className="space-y-6 relative z-10">
                                <div className="space-y-2">
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/10 text-purple-400">
                                        <School className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-2xl font-bold">Department</h3>
                                    <p className="text-sm text-foreground/60">For universities & colleges</p>
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-bold gradient-text">Contact Us</span>
                                </div>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-3 text-sm text-foreground/80">
                                        <Check className="w-4 h-4 text-green-500" />
                                        Bulk Student Upload
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-foreground/80">
                                        <Check className="w-4 h-4 text-green-500" />
                                        Department Dashboard
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-foreground/80">
                                        <Check className="w-4 h-4 text-green-500" />
                                        API Access
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-foreground/80">
                                        <Check className="w-4 h-4 text-green-500" />
                                        Custom Rule Sets
                                    </li>
                                </ul>
                                <Link href="/contact" className="w-full block text-center py-3 rounded-xl font-medium bg-white/5 hover:bg-white/10 border border-white/10 transition-all">
                                    Contact Sales
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Custom CTA */}
                    <div className="text-center glass-card p-8 rounded-3xl max-w-3xl mx-auto">
                        <h3 className="text-2xl font-bold mb-4">Have specific requirements?</h3>
                        <p className="text-foreground/70 mb-6">
                            We offer custom solutions for large universities and research institutions.
                        </p>
                        <Link href="/contact" className="btn-secondary inline-flex items-center gap-2">
                            Contact Our Sales Team
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
