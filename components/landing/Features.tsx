import { FileCheck, Brain, Zap, Shield, Award, MessageSquare } from "lucide-react";

const features = [
    {
        icon: FileCheck,
        title: "Structural Validation",
        description: "Automatically verify document structure against Anna University's 12 required sections in exact order.",
        gradient: "from-purple-500 to-pink-500",
    },
    {
        icon: Brain,
        title: "AI-Powered Analysis",
        description: "Advanced Gemini AI analysis for grammar, academic tone, clarity, and language quality scoring.",
        gradient: "from-blue-500 to-purple-500",
    },
    {
        icon: Zap,
        title: "Real-Time Processing",
        description: "Async analysis with live progress tracking. Get comprehensive results in under 2 minutes.",
        gradient: "from-pink-500 to-purple-500",
    },
    {
        icon: Shield,
        title: "Strict Compliance",
        description: "Validates margins (L30/R20/T25/B25mm), fonts (Times New Roman), spacing (1.5), and formatting rules.",
        gradient: "from-purple-500 to-blue-500",
    },
    {
        icon: Award,
        title: "Compliance Scoring",
        description: "Get 4 detailed scores: Structural, Formatting, Grammar, and Overall compliance (0-100).",
        gradient: "from-pink-500 to-orange-500",
    },
    {
        icon: MessageSquare,
        title: "Interactive Chatbot",
        description: "Ask questions about your report. Get AI-powered clarifications and improvement suggestions.",
        gradient: "from-blue-500 to-pink-500",
    },
];

export function Features() {
    return (
        <section id="features" className="py-24 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold">
                        <span className="gradient-text">Power Features</span> to Supercharge
                        <br />
                        Your Report Validation
                    </h2>
                    <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                        Combine rule-based academic validation with AI-powered language analysis
                        for comprehensive report quality assurance.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group glow-card p-6 space-y-4 hover:scale-105 transition-all duration-300"
                        >
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-3 group-hover:shadow-glow-purple transition-all duration-300`}>
                                <feature.icon className="w-full h-full text-white" />
                            </div>
                            <h3 className="text-xl font-semibold">{feature.title}</h3>
                            <p className="text-foreground/60 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <div className="inline-flex items-center gap-2 text-sm text-purple-400">
                        <span>And many more features to explore</span>
                        <span className="text-2xl">→</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
