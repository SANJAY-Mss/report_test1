"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FileText, Book, AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";

const categories = [
    {
        name: "Getting Started",
        items: ["Introduction", "Installation", "Quick Start", "Account Setup"],
    },
    {
        name: "Report Formatting",
        items: ["Structure Guidelines", "Font & Spacing", "Citations", "Figures & Tables"],
    },
    {
        name: "Anna University Rules",
        items: ["Thesis Format", "Project Report", "Seminar Report", "Submission Details"],
    },
    {
        name: "Troubleshooting",
        items: ["Common Errors", "PDF Issues", "Slab Rate", "Support"],
    },
];

export default function DocsPage() {
    return (
        <main className="min-h-screen">
            <Header />

            <div className="pt-24 max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-12">
                {/* Sidebar */}
                <aside className="w-full md:w-64 shrink-0 pb-12 hidden md:block">
                    <div className="sticky top-28 space-y-8">
                        {categories.map((category) => (
                            <div key={category.name} className="space-y-3">
                                <h3 className="font-bold text-foreground">{category.name}</h3>
                                <ul className="space-y-2 border-l border-white/10 ml-2 pl-4">
                                    {category.items.map((item) => (
                                        <li key={item}>
                                            <Link
                                                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                                                className="text-sm text-foreground/60 hover:text-purple-400 transition-colors block py-1"
                                            >
                                                {item}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 pb-24 space-y-12 animate-fade-in">
                    {/* Introduction */}
                    <section id="introduction" className="space-y-6">
                        <h1 className="text-4xl font-bold gradient-text">Documentation</h1>
                        <p className="text-xl text-foreground/70 leading-relaxed">
                            Welcome to ReportGuard documentation. Here you'll find everything you need to format, validate, and submit your academic reports according to Anna University standards.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                            <div className="glass-card p-6 rounded-2xl flex items-start gap-4">
                                <div className="p-3 bg-purple-500/10 rounded-xl">
                                    <Book className="w-6 h-6 text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold mb-2">Quick Start Guide</h3>
                                    <p className="text-sm text-foreground/60">Learn how to upload and analyze your first report in under 5 minutes.</p>
                                </div>
                            </div>
                            <div className="glass-card p-6 rounded-2xl flex items-start gap-4">
                                <div className="p-3 bg-pink-500/10 rounded-xl">
                                    <FileText className="w-6 h-6 text-pink-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold mb-2">Format Rules</h3>
                                    <p className="text-sm text-foreground/60">Detailed breakdown of margins, fonts, and spacing requirements.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="structure-guidelines" className="space-y-6 pt-8 border-t border-white/5">
                        <h2 className="text-2xl font-bold">Report Structure Guidelines</h2>
                        <p className="text-foreground/70">
                            A standard Anna University project report should follow this sequence:
                        </p>
                        <div className="glass-card p-8 rounded-2xl space-y-4">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span>Cover Page & Title Page</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span>Bonafide Certificate</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span>Abstract (Tamil & English)</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span>Table of Contents</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span>List of Tables / Figures / Symbols</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span>Chapters (1 to 5)</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span>Appendices</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span>References</span>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <Footer />
        </main>
    );
}
