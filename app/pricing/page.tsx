"use client";

import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Check, Shield, Zap, School } from "lucide-react";
import { ElectricBorder } from "@/components/ui/ElectricBorder";
import ShinyText from "@/components/ui/ShinyText";

export default function PricingPage() {
    return (
        <main className="min-h-screen">
            <Header />

            {/* Background Elements */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute inset-0 bg-[rgb(var(--background))]" />
                <div className="absolute top-0 left-0 w-full h-full dot-pattern opacity-20" />
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" />
                <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-cyan-600/20 rounded-full blur-[100px] mix-blend-screen animate-pulse-slow delay-1000" />
                <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow delay-2000" />
            </div>

            <section className="pt-32 pb-24 px-6">
                <div className="max-w-7xl mx-auto space-y-16">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto space-y-4 animate-fade-in">
                        <h1 className="text-4xl md:text-5xl font-bold flex flex-wrap justify-center gap-x-2">
                            <ShinyText color="#e5e7eb" shineColor="#ff80ee" speed={3}>
                                Simple, Transparent
                            </ShinyText>
                            <span className="gradient-text">Pricing</span>
                        </h1>
                        <p className="text-xl text-foreground/70">
                            Choose the perfect plan for your academic needs. No hidden fees.
                        </p>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Student Plan */}
                        <ElectricBorder color="#3b82f6" speed={1} chaos={0.05} borderRadius={24} className="transition-all duration-300 hover:scale-105 group h-full">
                            <div className="glass-card p-8 rounded-[24px] w-full h-full relative overflow-hidden !border-0 bg-transparent flex flex-col">
                                <div className="space-y-6 relative z-10 flex-grow flex flex-col">
                                    <div className="space-y-2">
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/10 text-blue-400">
                                            <Shield className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-2xl font-bold">Student</h3>
                                        <p className="text-sm text-foreground/60">Perfect for individual reports</p>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-bold gradient-text">Free</span>
                                    </div>
                                    <ul className="space-y-4 flex-grow">
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
                                    <Link href="/signup" className="w-full mt-auto block text-center py-3 rounded-xl font-medium bg-white/5 hover:bg-white/10 border border-white/10 transition-all">
                                        Get Started
                                    </Link>
                                </div>
                            </div>
                        </ElectricBorder>

                        {/* Researcher Plan */}
                        <ElectricBorder color="#ff80ee" speed={1} chaos={0.05} borderRadius={24} className="transition-all duration-300 hover:scale-105 group h-full">
                            <div className="glass-card p-8 rounded-[24px] w-full h-full relative overflow-hidden !border-0 bg-transparent flex flex-col">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl z-20">
                                    POPULAR
                                </div>
                                <div className="space-y-6 relative z-10 flex-grow flex flex-col">
                                    <div className="space-y-2">
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
                                            <Zap className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-2xl font-bold">Researcher</h3>
                                        <p className="text-sm text-foreground/60">For serious academic work</p>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-bold gradient-text">₹95</span>
                                        <span className="text-foreground/60">/ month</span>
                                    </div>
                                    <ul className="space-y-4 flex-grow">
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
                                    <Link href="/signup?plan=pro" className="w-full mt-auto block text-center py-3 rounded-xl font-medium btn-primary transition-all">
                                        Start Free Trial
                                    </Link>
                                </div>
                            </div>
                        </ElectricBorder>

                        {/* Department Plan */}
                        <ElectricBorder color="#a855f7" speed={1} chaos={0.05} borderRadius={24} className="transition-all duration-300 hover:scale-105 group h-full">
                            <div className="glass-card p-8 rounded-[24px] w-full h-full relative overflow-hidden !border-0 bg-transparent flex flex-col">
                                <div className="space-y-6 relative z-10 flex-grow flex flex-col">
                                    <div className="space-y-2">
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/10 text-blue-400">
                                            <School className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-2xl font-bold">Department</h3>
                                        <p className="text-sm text-foreground/60">For universities & colleges</p>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-bold gradient-text">Contact Us</span>
                                    </div>
                                    <ul className="space-y-4 flex-grow">
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
                                    <Link href="/contact" className="w-full mt-auto block text-center py-3 rounded-xl font-medium bg-white/5 hover:bg-white/10 border border-white/10 transition-all">
                                        Contact Sales
                                    </Link>
                                </div>
                            </div>
                        </ElectricBorder>
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
