import { Upload, Cog, CheckCircle, Download } from "lucide-react";
import ShinyText from "@/components/ui/ShinyText";

const steps = [
    {
        number: "01",
        icon: Upload,
        title: "Upload Report",
        description: "Drag and drop your PDF/DOCX project report. We validate file type and size instantly.",
    },
    {
        number: "02",
        icon: Cog,
        title: "AI Analysis",
        description: "Our system validates structure, formatting, grammar, and academic quality in real-time.",
    },
    {
        number: "03",
        icon: CheckCircle,
        title: "Review Results",
        description: "Get detailed compliance scores, categorized violations, and AI-generated improvement suggestions.",
    },
    {
        number: "04",
        icon: Download,
        title: "Download Summary",
        description: "Export a comprehensive analysis report ready for faculty review and final submission.",
    },
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 px-6 bg-[rgb(var(--card))]">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold">
                        <ShinyText color="#e5e7eb" shineColor="#ff80ee" speed={3}>
                            It takes
                        </ShinyText>{" "}
                        <span className="gradient-text">less than 1 minute</span>
                        <br />
                        <ShinyText color="#e5e7eb" shineColor="#ff80ee" speed={3}>
                            to create validations
                        </ShinyText>
                    </h2>
                    <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                        Our streamlined 4-step process ensures fast, accurate, and comprehensive report analysis.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {steps.map((step, index) => (
                        <div key={index} className="relative group">
                            {/* Connector Line (Desktop) */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-8 left-1/2 w-full h-[2px] bg-gradient-to-r from-blue-500/50 to-transparent z-0" />
                            )}
                            {/* Hover effect */}
                            <div className="absolute -inset-2 bg-blue-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />

                            {/* Step Card */}
                            <div className="space-y-4 text-center relative z-10">
                                {/* Number Badge */}
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white font-bold text-xl shadow-[0_0_20px_rgba(236,72,153,0.3)] relative z-10 bg-background">
                                    {step.number}
                                </div>

                                {/* Icon */}
                                <div className="flex justify-center">
                                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 group-hover:border-pink-500/50 transition-colors">
                                        <step.icon className="w-6 h-6 text-purple-400 group-hover:text-pink-400 transition-colors" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="space-y-2">
                                    <h3 className="text-xl font-semibold">{step.title}</h3>
                                    <p className="text-sm text-foreground/60 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Timeline */}
                <div className="mt-16 text-center space-y-4">
                    <div className="inline-flex items-center gap-4 glass-card px-8 py-4 rounded-full">
                        <div className="text-sm text-foreground/60">Average Processing Time:</div>
                        <div className="text-2xl font-bold gradient-text">~90 seconds</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
