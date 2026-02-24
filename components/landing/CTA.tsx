import Link from "next/link";
import { ArrowRight, FileText, FileLock2, BrainCircuit, GraduationCap, SpellCheck, CheckSquare, Search, FileSignature } from "lucide-react";
import React from 'react';

const integrations = [
    { icon: FileText, label: "PDF Uploads" },
    { icon: FileLock2, label: "DOCX Formats" },
    { icon: BrainCircuit, label: "Gemini AI" },
    { icon: GraduationCap, label: "Anna University" },
    { icon: SpellCheck, label: "Grammar Audit" },
    { icon: CheckSquare, label: "Structure Rules" },
    { icon: Search, label: "Plagiarism Check" },
    { icon: FileSignature, label: "Bonafide Certs" },
];

export function CTA() {
    return (
        <section className="py-24 px-6 relative w-full overflow-hidden bg-transparent">
            {/* Massive Bottom Glow */}
            <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-600/20 blur-[150px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-6xl mx-auto flex flex-col items-center space-y-24">

                {/* Integration Belt (Matches the Dribbble Icon Row) */}
                <div className="w-full relative py-8 border-y border-white/5 bg-gradient-to-r from-transparent via-[#111116] to-transparent">
                    <div className="flex flex-wrap justify-center gap-6 md:gap-12 items-center opacity-70">
                        {integrations.map((item, index) => (
                            <div key={index} className="flex flex-col items-center gap-2 group cursor-pointer transition-all hover:opacity-100 hover:-translate-y-1">
                                <item.icon className="w-8 h-8 text-gray-400 group-hover:text-purple-400 transition-colors" />
                                <span className="text-xs font-semibold tracking-wider text-gray-500 group-hover:text-purple-300 uppercase transition-colors">
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Final Call to Action */}
                <div className="w-full text-center space-y-10 relative z-10">
                    <h2 className="text-4xl md:text-6xl font-black text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                        Ready to secure your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                            Final Grades?
                        </span>
                    </h2>

                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
                        Join thousands of students who use ReportGuard to guarantee
                        <strong className="text-white font-medium"> 100% compliance</strong> before printing their final semester manuscripts.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                        <Link href="/signup" className="px-10 py-5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold tracking-widest uppercase transition-all shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_50px_rgba(168,85,247,0.8)] hover:scale-105 active:scale-95 flex items-center gap-3">
                            Start Your Journey
                            <ArrowRight className="w-5 h-5" />
                        </Link>

                        <Link href="/demo" className="px-10 py-5 rounded-xl bg-transparent border-2 border-white/10 text-white font-bold tracking-widest uppercase transition-all hover:border-purple-500/50 hover:bg-purple-500/10 active:scale-95">
                            See The Magic
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
}
