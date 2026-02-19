import { Upload, Cog, CheckCircle, Download } from "lucide-react";

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
                        It takes <span className="gradient-text">less than 1 minute</span>
                        <br />
                        to create validations
                    </h2>
                    <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                        Our streamlined 4-step process ensures fast, accurate, and comprehensive report analysis.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {steps.map((step, index) => (
                        <div key={index} className="relative">
                            {/* Connector Line (Desktop) */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-16 left-full w-full h-[2px] bg-gradient-to-r from-purple-500/50 to-transparent" style={{ width: 'calc(100% - 2rem)' }} />
                            )}

                            {/* Step Card */}
                            <div className="space-y-4 text-center relative z-10">
                                {/* Number Badge */}
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white font-bold text-xl shadow-glow-purple">
                                    {step.number}
                                </div>

                                {/* Icon */}
                                <div className="flex justify-center">
                                    <div className="p-4 glass-card rounded-2xl">
                                        <step.icon className="w-8 h-8 text-purple-400" />
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
