import React from "react";
import { ArrowRight, FileText, Zap, ShieldCheck, FileSearch, ShieldAlert, BookOpen, GraduationCap } from "lucide-react";
import Link from "next/link";

export function Statistics() {
    return (
        <section id="statistics" className="py-24 px-6 relative w-full overflow-hidden bg-transparent">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-purple-900/20 blur-[200px] rounded-full pointer-events-none -z-10" />
            <div className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-fuchsia-900/10 blur-[150px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-start">

                {/* Left Column: Headlines & Stat Cards */}
                <div className="space-y-12 block">
                    <div className="space-y-6">
                        <span className="text-fuchsia-400 font-bold tracking-widest text-sm uppercase">WELCOME TO REPORTGUARD!</span>
                        <h2 className="text-5xl md:text-6xl font-black text-white leading-[1.1] drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                            #1 <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-500">Best Validator</span> <br />
                            For Anna University <br /> Since 2026
                        </h2>
                        <p className="text-gray-400 text-lg max-w-md font-light">
                            We have a variety of formatting and language validation tools on ReportGuard. You can check our structural services here.
                        </p>

                        <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.7)] group">
                            Sign up
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Stat Cards Stack */}
                    <div className="space-y-4 max-w-sm p-6 bg-[#0a0a0f]/60 backdrop-blur-md rounded-3xl border border-white/5 shadow-2xl">

                        {/* Stat 1 */}
                        <div className="flex items-center gap-6 p-4 rounded-2xl hover:bg-white/5 transition-colors group border-b border-white/5 pb-6">
                            <div className="p-3 bg-white/5 rounded-xl text-gray-300 group-hover:text-purple-400 group-hover:bg-purple-500/10 transition-colors">
                                <Zap className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-white tracking-wide">90 Seconds</h4>
                                <p className="text-sm text-gray-500">Fast Analysis Speed</p>
                            </div>
                        </div>

                        {/* Stat 2 */}
                        <div className="flex items-center gap-6 p-4 rounded-2xl hover:bg-white/5 transition-colors group border-b border-white/5 pb-6">
                            <div className="p-3 bg-white/5 rounded-xl text-gray-300 group-hover:text-purple-400 group-hover:bg-purple-500/10 transition-colors">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-white tracking-wide">100% Guaranteed</h4>
                                <p className="text-sm text-gray-500">Format Compliance</p>
                            </div>
                        </div>

                        {/* Stat 3 */}
                        <div className="flex items-center gap-6 p-4 rounded-2xl hover:bg-white/5 transition-colors group pt-2">
                            <div className="p-3 bg-white/5 rounded-xl text-gray-300 group-hover:text-purple-400 group-hover:bg-purple-500/10 transition-colors">
                                <BookOpen className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-white tracking-wide">3 Reports</h4>
                                <p className="text-sm text-gray-500">First Trials Free</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Integrations & Text Box */}
                <div className="space-y-8 flex flex-col items-end">

                    {/* Integration Rows */}
                    <div className="w-full max-w-md space-y-3">
                        <div className="flex items-center justify-between p-4 rounded-2xl bg-[#111116] border border-white/5 shadow-lg">
                            <div className="flex items-center gap-3">
                                <FileText className="w-5 h-5 text-gray-400" />
                                <span className="text-white font-medium">PDF Processing</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 text-xs rounded-md bg-white/5 border border-white/10 text-gray-300">Reads</span>
                                <span className="px-3 py-1 text-xs rounded-md bg-fuchsia-500/20 text-fuchsia-300 font-semibold border border-fuchsia-500/30">Extracts</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-2xl bg-[#111116] border border-white/5 shadow-lg">
                            <div className="flex items-center gap-3">
                                <GraduationCap className="w-5 h-5 text-gray-400" />
                                <span className="text-white font-medium">University Rules</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 text-xs rounded-md bg-fuchsia-500/20 text-fuchsia-300 font-semibold border border-fuchsia-500/30">Compliant</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-2xl bg-[#111116] border border-white/5 shadow-lg">
                            <div className="flex items-center gap-3">
                                <FileSearch className="w-5 h-5 text-gray-400" />
                                <span className="text-white font-medium">Gemini 2.5 AI</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 text-xs rounded-md bg-white/5 border border-white/10 text-gray-300">Syntax</span>
                                <span className="px-3 py-1 text-xs rounded-md bg-fuchsia-500/20 text-fuchsia-300 font-semibold border border-fuchsia-500/30">Grammar</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-2xl bg-[#111116] border border-white/5 shadow-lg">
                            <div className="flex items-center gap-3">
                                <ShieldAlert className="w-5 h-5 text-gray-400" />
                                <span className="text-white font-medium">Formatting Audit</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 text-xs rounded-md bg-fuchsia-500/20 text-fuchsia-300 font-semibold border border-fuchsia-500/30">Strict Checks</span>
                            </div>
                        </div>
                    </div>

                    {/* Massive Stats Dropdown Box */}
                    <div className="w-full bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden mt-6">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 blur-[50px] -z-10" />

                        <div className="mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-fuchsia-400 to-purple-600 rounded-xl shadow-[0_0_20px_rgba(217,70,239,0.5)] flex items-center justify-center -rotate-12 mb-4">
                                <ShieldCheck className="w-6 h-6 text-white rotate-12" />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-6">Statistics Of ReportGuard</h3>

                            <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
                                <p>
                                    ReportGuard clients exist globally, but we specifically target ensuring Anna University students
                                    pass their rigorous thesis formatting requirements. Students across dozens of colleges work with us because of the quality we offer.
                                </p>
                                <p>
                                    ReportGuard offers the most powerful automated architectural layout checks in the world.
                                    At the same time, our team is always working hard to maintain API quality so you can get long-term academic success.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
