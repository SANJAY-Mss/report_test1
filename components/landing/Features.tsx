"use client";

import Link from "next/link";
import { FileCheck, Brain, Zap, Shield, Award, MessageSquare, ArrowRight, Ghost } from "lucide-react";
import { BentoGrid, BentoCard } from "./BentoGrid";
import {
    StructuralValidationGraphic,
    AIAnalysisGraphic,
    RealTimeGraphic,
    StrictComplianceGraphic,
    ComplianceScoreGraphic,
    ChatbotGraphic
} from "./FeatureGraphics";
import { GridBackground } from "@/components/ui/Backgrounds";
import ShinyText from "@/components/ui/ShinyText";

const features = [
    {
        icon: Ghost,
        title: "Structural Validation",
        description: "Our paranormal detectors verify document structure against Anna University's 12 required sections.",
        className: "lg:col-span-1",
        header: <StructuralValidationGraphic />,
        gradient: "from-purple-500 to-pink-500",
    },
    {
        icon: Shield,
        title: "Strict Conditions",
        description: "Validates margins, fonts, and spacing. No formatting error can hide in the shadows.",
        className: "lg:col-span-1 lg:row-span-2",
        header: <StrictComplianceGraphic />,
        gradient: "from-purple-500 to-indigo-500",
    },
    {
        icon: Brain,
        title: "AI Wisdom",
        description: "Gemini AI analyzes for grammar and tone, ensuring your report doesn't sound like zombie-speak.",
        className: "lg:col-span-1",
        header: <AIAnalysisGraphic />,
        gradient: "from-pink-500 to-orange-500",
    },
    {
        icon: Zap,
        title: "Lightning Fast",
        description: "Results appear faster than a vampire at sunset. Full analysis in under 2 minutes.",
        className: "lg:col-span-1",
        header: <RealTimeGraphic />,
        gradient: "from-orange-500 to-red-500",
    },
    {
        icon: Award,
        title: "Scare Score",
        description: "Get 4 detailed scores: Structural, Formatting, Grammar, and Overall compliance.",
        className: "lg:col-span-1",
        header: <ComplianceScoreGraphic />,
        gradient: "from-indigo-500 to-blue-500",
    },
];

export function Features() {
    return (
        <section id="features" className="py-24 relative overflow-hidden bg-[#030308]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(138,43,226,0.08),transparent_60%)] blur-[80px] pointer-events-none" />
            <GridBackground />

            <div className="max-w-7xl mx-auto relative z-10 w-full px-4 sm:px-6">
                {/* Section Header */}
                <div className="text-center space-y-4 mb-20 animate-fade-in">
                    <div className="text-[12px] font-bold tracking-[0.2em] text-[#ff5e00] uppercase">Powerful Tools</div>
                    <h2 className="text-4xl md:text-[2.75rem] font-bold tracking-tight text-white">
                        Optimized for Perfection
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[22rem] gap-6 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <BentoCard
                            key={index}
                            title={feature.title}
                            description={feature.description}
                            className={`${feature.className} ${feature.className?.includes('row-span-2') ? 'min-h-[46rem] lg:min-h-full' : 'min-h-[22rem]'}`}
                            header={feature.header}
                            icon={
                                <div className={`w-8 h-8 rounded shrink-0 mb-3`} style={{ color: feature.gradient.includes("orange") ? "#ff5e00" : feature.gradient.includes("pink") ? "#ff007f" : feature.gradient.includes("purple") ? "#bf00ff" : "#00f3ff" }}>
                                    <feature.icon className="w-full h-full" strokeWidth={1.5} />
                                </div>
                            }
                        />
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-20">
                    <Link href="/signup" className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors group">
                        <span>Explore all features</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
