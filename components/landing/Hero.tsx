import Link from "next/link";
import { ArrowRight, Ghost, Skull } from "lucide-react";
import { DashboardPreview } from "./DashboardPreview";
import { GridBackground, Spotlight } from "@/components/ui/Backgrounds";
import ShinyText from "@/components/ui/ShinyText";
import { ElectricBorder } from "@/components/ui/ElectricBorder";
import { prisma } from "@/lib/prisma";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Play } from "lucide-react";

const timelineSteps = [
    { title: "Upload Document", subtitle: "Step 1", points: ["Drop your PDF/DOCX file"] },
    { title: "AI Validation", subtitle: "Step 2", points: ["Grammar rules verified"] },
    { title: "Review Results", subtitle: "Step 3", points: ["Categorized errors found"] },
    { title: "Secure Grade", subtitle: "Step 4", points: ["Make corrections locally"] },
];

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

                {/* Right Column: Embedded Timeline Visual */}
                <div className="relative mt-12 lg:mt-0 lg:pl-10 h-[600px] flex items-center">
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 blur-3xl rounded-full transform scale-90" />

                    <div className="relative w-full h-full max-w-md mx-auto z-10 py-10 overflow-hidden rounded-3xl bg-[#0a0a0f]/40 backdrop-blur-sm border border-white/5 shadow-2xl">

                        {/* The Center Dashed Line */}
                        <div className="absolute left-12 top-10 bottom-10 w-[2px] bg-[linear-gradient(to_bottom,transparent,rgba(217,70,239,0.5)_5%,rgba(217,70,239,0.5)_95%,transparent)] border-l-[2px] border-dashed border-fuchsia-500/50" />

                        <div className="flex flex-col relative z-10 h-full justify-between">
                            {timelineSteps.map((step, index) => (
                                <div key={index} className="flex w-full items-center justify-start relative px-4">

                                    {/* Center Node Marker */}
                                    <div className="absolute left-[3rem] -translate-x-1/2 w-3 h-3 rounded-full bg-[#0a0a0f] border-[1.5px] border-fuchsia-400 shadow-[0_0_10px_#e879f9] z-20" />

                                    {/* Timeline Card Wrapper */}
                                    <div className="w-full flex items-center justify-start pl-[4.5rem] relative">

                                        {/* Horizontal Dashed Connector */}
                                        <div className="absolute top-1/2 -translate-y-1/2 left-[3rem] w-6 h-[2px] border-t-[2px] border-dashed border-fuchsia-500/50 z-0" />

                                        {/* Card Content */}
                                        <div className="w-full bg-[#0a0a0f]/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-5 shadow-[0_0_20px_rgba(168,85,247,0.1)] relative group hover:border-fuchsia-500/40 transition-colors z-10">

                                            {/* Glowing Play Icon badge */}
                                            <div className="absolute -top-3 left-4 w-7 h-7 rounded-full bg-[#0a0a0f] shadow-[0_0_10px_rgba(217,70,239,0.4)] border border-fuchsia-500/80 flex items-center justify-center">
                                                <Play className="w-2.5 h-2.5 text-fuchsia-400 ml-0.5" />
                                            </div>

                                            <div className="mt-1">
                                                <h4 className="text-fuchsia-500 font-extrabold tracking-widest text-[9px] uppercase mb-0.5">
                                                    {step.subtitle}
                                                </h4>
                                                <h3 className="text-sm md:text-base font-bold text-white mb-2 tracking-wide">
                                                    {step.title}
                                                </h3>

                                                <ul className="space-y-1">
                                                    {step.points.map((point, i) => (
                                                        <li key={i} className="flex items-center gap-2 text-gray-400 text-[10px] md:text-xs">
                                                            <div className="w-1 h-1 rounded-full bg-teal-400 shadow-[0_0_5px_#2dd4bf] flex-shrink-0" />
                                                            {point}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
