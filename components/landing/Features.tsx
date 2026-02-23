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
        className: "md:col-span-2",
        header: <StructuralValidationGraphic />,
        gradient: "from-purple-500 to-pink-500",
    },
    {
        icon: Brain,
        title: "AI Wisdom",
        description: "Gemini AI analyzes for grammar and tone, ensuring your report doesn't sound like zombie-speak.",
        className: "md:col-span-1",
        header: <AIAnalysisGraphic />,
        gradient: "from-pink-500 to-orange-500",
    },
    {
        icon: Zap,
        title: "Lightning Fast",
        description: "Results appear faster than a vampire at sunset. Full analysis in under 2 minutes.",
        className: "md:col-span-1",
        header: <RealTimeGraphic />,
        gradient: "from-orange-500 to-red-500",
    },
    {
        icon: Shield,
        title: "Strict Compliance",
        description: "Validates margins, fonts, and spacing. No formatting error can hide in the shadows.",
        className: "md:col-span-2",
        header: <StrictComplianceGraphic />,
        gradient: "from-purple-500 to-indigo-500",
    },
    {
        icon: Award,
        title: "Scare Score",
        description: "Get 4 detailed scores: Structural, Formatting, Grammar, and Overall compliance.",
        className: "md:col-span-1",
        header: <ComplianceScoreGraphic />,
        gradient: "from-indigo-500 to-blue-500",
    },
    {
        icon: MessageSquare,
        title: "Spirit Guide Chat",
        description: "Ask questions about your report. Get clarifications from our spectral AI assistant.",
        className: "md:col-span-2",
        header: <ChatbotGraphic />,
        gradient: "from-blue-500 to-purple-500",
    },
];

export function Features() {
    return (
        <section id="features" className="py-32 px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-[#0a0a0f]/80 pointer-events-none -z-10" />
            <GridBackground />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center space-y-6 mb-20 animate-fade-in">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                        <span className="gradient-text">Power Features</span>{" "}
                        <ShinyText color="#e5e7eb" shineColor="#ff80ee" speed={3}>
                            to Supercharge
                        </ShinyText>
                        <br />
                        <ShinyText color="#e5e7eb" shineColor="#ff80ee" speed={3}>
                            Your Report Validation
                        </ShinyText>
                    </h2>
                    <p className="text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
                        Combine rule-based academic validation with AI-powered language analysis
                        for comprehensive report quality assurance.
                    </p>
                </div>

                <BentoGrid className="max-w-6xl mx-auto md:auto-rows-[22rem]">
                    {features.map((feature, index) => (
                        <BentoCard
                            key={index}
                            title={feature.title}
                            description={feature.description}
                            className={feature.className}
                            header={feature.header}
                            icon={
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.gradient} p-2.5 mb-2 relative z-20 shadow-lg`}>
                                    <feature.icon className="w-full h-full text-white" />
                                </div>
                            }
                        />
                    ))}
                </BentoGrid>

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
