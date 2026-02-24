import Link from "next/link";
import { ArrowRight, Ghost, Skull } from "lucide-react";
import { DashboardPreview } from "./DashboardPreview";
import { GridBackground, Spotlight } from "@/components/ui/Backgrounds";
import ShinyText from "@/components/ui/ShinyText";
import { ElectricBorder } from "@/components/ui/ElectricBorder";
import { prisma } from "@/lib/prisma";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export async function Hero() {
    let reportsCount = 0;
    let scareScore = 0;
    let universitiesCount = 0;

    try {
        reportsCount = await prisma.report.count();
        const users = await prisma.user.findMany({ select: { email: true } });

        const domains = new Set<string>();
        users.forEach(u => {
            const domain = u.email.split('@')[1];
            if (domain) domains.add(domain);
        });
        universitiesCount = domains.size;

        const analyses = await prisma.analysis.findMany({ select: { overallScore: true } });
        if (analyses.length > 0) {
            const avgScore = analyses.reduce((acc, curr) => acc + curr.overallScore, 0) / analyses.length;
            scareScore = Math.floor(100 - avgScore); // Assuming higher score means less scare
        }
    } catch (e) {
        console.error("Error fetching hero stats:", e);
    }

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 px-6 overflow-hidden bg-[#0f0f11]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#2e1065_0%,_transparent_50%)] opacity-30 pointer-events-none" />
            <GridBackground />
            <Spotlight className="absolute -top-40 left-0 md:left-60 md:-top-20" fill="#8b5cf6" />

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

                {/* Left Column: Text Content */}
                <div className="space-y-8 text-center lg:text-left">


                    {/* Headline */}
                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight text-white" style={{ fontFamily: '"Creepster", cursive, sans-serif' }}>
                            <ShinyText color="#e5e7eb" shineColor="#ff80ee" speed={3}>
                                Transform Your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 animate-gradient-x">
                                    Report Nightmares
                                </span>
                            </ShinyText>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            Don't let formatting errors haunt you! Our AI exorcises mistakes, ensuring strict Anna University compliance so you can submit without fear.
                            <br /><span className="text-purple-400 font-semibold">Fast. Scary Good. Accurate.</span>
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                        <Link href="/signup" className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:shadow-[0_0_30px_rgba(139,92,246,0.7)] hover:scale-105 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:animate-shimmer" />
                            <span className="relative z-10 flex items-center gap-2">
                                <Ghost className="w-5 h-5" />
                                Banish Errors Now
                            </span>
                        </Link>
                        <Link href="/demo" className="px-8 py-4 glass-button rounded-full text-white font-medium hover:bg-white/10 hover:text-pink-300 transition-all border border-purple-500/30">
                            See the Magic
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-8 md:gap-12 pt-8 border-t border-white/5">
                        {[
                            { label: "Reports Saved", value: reportsCount, suffix: reportsCount > 1000 ? "+" : "", color: "text-purple-400" },
                            { label: "Scare Score", value: scareScore, suffix: "%", color: "text-pink-400" },
                            { label: "Universities", value: universitiesCount, suffix: universitiesCount > 10 ? "+" : "", color: "text-orange-400" },
                        ].map((stat, i) => (
                            <div key={i} className="text-center lg:text-left space-y-1">
                                <div className={`text-3xl font-bold ${stat.color}`}>
                                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                                </div>
                                <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: 3D Visual */}
                <div className="relative animate-float mt-12 lg:mt-0">
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 blur-3xl rounded-full transform scale-90" />

                    {/* Main Image Container */}
                    <div className="relative z-10 bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-3xl p-4 backdrop-blur-sm shadow-2xl skew-y-1 transform hover:skew-y-0 transition-all duration-700">
                        <ElectricBorder color="#a855f7" speed={1} chaos={0.05} borderRadius={16} className="w-full h-full">
                            {/* Improved Reaper Image */}
                            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1a1f] to-[#2e1065] relative group flex items-center justify-center w-full h-full">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
                                {/* Reaper Image */}
                                <div className="relative w-80 h-80 animate-float flex items-center justify-center">
                                    <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-20 rounded-full animate-pulse"></div>
                                    <img
                                        src="/reaper.png"
                                        alt="Spooky Reaper"
                                        className="relative w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(139,92,246,0.3)] transform hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                {/* Aligned Notification */}
                                <div className="absolute bottom-6 left-6 right-6 z-20 hidden md:block animate-slide-up delay-100">
                                    <div className="flex items-center gap-4 bg-[#0a0a0f]/95 p-4 rounded-xl border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.1)]">
                                        <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 shrink-0">
                                            <Skull className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1 text-left">
                                            <div className="text-sm font-bold text-white leading-tight">Critical Error Found</div>
                                            <div className="text-xs text-gray-400">Margin: 20mm (Expected 30mm)</div>
                                        </div>
                                        <div className="px-3 py-1 rounded bg-red-500/10 text-red-400 text-xs font-bold tracking-widest shrink-0">
                                            FIXED
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ElectricBorder>
                    </div>

                    {/* Floating Elements */}
                    <Spotlight className="absolute -bottom-20 -right-20 w-64 h-64 opacity-50" fill="#ec4899" />
                </div>
            </div>
        </section>
    );
}
