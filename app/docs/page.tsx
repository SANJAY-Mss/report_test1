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
                    <section id="introduction" className="space-y-6 scroll-mt-28">
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

                    {/* Getting Started */}
                    <section id="getting-started" className="space-y-12 pt-8 border-t border-white/5 scroll-mt-28">
                        <div id="installation" className="space-y-4 scroll-mt-28">
                            <h2 className="text-2xl font-bold">Installation & Requirements</h2>
                            <p className="text-foreground/70">
                                ReportGuard is a cloud-native web application. No local installation is required.
                            </p>
                            <div className="glass-card p-6 rounded-xl space-y-4">
                                <h4 className="font-bold">Supported Environments</h4>
                                <div className="grid md:grid-cols-2 gap-4 text-sm text-foreground/70">
                                    <ul className="list-disc list-inside space-y-1">
                                        <li><strong>Chrome:</strong> Version 90+ (Recommended)</li>
                                        <li><strong>Edge:</strong> Version 90+</li>
                                        <li><strong>Firefox:</strong> Version 88+</li>
                                    </ul>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li><strong>Safari:</strong> Version 14+</li>
                                        <li><strong>Mobile:</strong> iOS 15+ / Android 10+</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div id="quick-start" className="space-y-4 scroll-mt-28">
                            <h2 className="text-2xl font-bold">Quick Start</h2>
                            <p className="text-foreground/70">Follow this 3-step process to validate your first report:</p>
                            <div className="space-y-4">
                                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" />
                                <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-cyan-600/20 rounded-full blur-[100px] mix-blend-screen animate-pulse-slow delay-1000" />
                                <div className="glass-card p-6 rounded-xl flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold shrink-0">1</div>
                                    <div>
                                        <h4 className="font-bold">Prepare Your Document</h4>
                                        <p className="text-sm text-foreground/60 mt-1">Ensure your report is saved as a <strong>.PDF</strong> or <strong>.DOCX</strong> file. The file size must be under <strong>10MB</strong>.</p>
                                    </div>
                                </div>
                                <div className="glass-card p-6 rounded-xl flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold shrink-0">2</div>
                                    <div>
                                        <h4 className="font-bold">Upload & Analyze</h4>
                                        <p className="text-sm text-foreground/60 mt-1">Navigate to the Dashboard, click "New Report", and upload your file. The AI analysis will take approximately 30-60 seconds.</p>
                                    </div>
                                </div>
                                <div className="glass-card p-6 rounded-xl flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center font-bold shrink-0">3</div>
                                    <div>
                                        <h4 className="font-bold">Review & Fix</h4>
                                        <p className="text-sm text-foreground/60 mt-1">Check your "Slab Score". Expand the "Issues Found" section to see specific violations (e.g., "Margin on page 4 is less than 1.5 inches").</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="account-setup" className="space-y-4 scroll-mt-28">
                            <h2 className="text-2xl font-bold">Account Setup</h2>
                            <p className="text-foreground/70">
                                Your account dashboard stores your report history. You can update your profile and manage settings in the <Link href="/dashboard/settings" className="text-purple-400 hover:underline">Settings</Link> page.
                            </p>
                        </div>
                    </section>

                    {/* Report Formatting */}
                    <section id="report-formatting" className="space-y-12 pt-8 border-t border-white/5 scroll-mt-28">
                        <div id="structure-guidelines" className="space-y-4 scroll-mt-28">
                            <h2 className="text-2xl font-bold text-purple-400">Structure Guidelines</h2>
                            <p className="text-foreground/70">The sequence of items in your report is critical. Do not deviate from this order:</p>
                            <div className="glass-card p-6 rounded-xl">
                                <ol className="space-y-3 list-decimal list-inside text-foreground/80 font-medium">
                                    <li>Cover Page & Title Page</li>
                                    <li>Bonafide Certificate (Signed by Guide & HOD)</li>
                                    <li>Abstract (English & Tamil)</li>
                                    <li>Acknowledgement</li>
                                    <li>Table of Contents</li>
                                    <li>List of Tables</li>
                                    <li>List of Figures</li>
                                    <li>List of Symbols / Abbreviations</li>
                                    <li><strong>Chapters (1 to 5)</strong></li>
                                    <li>Appendices</li>
                                    <li>References</li>
                                </ol>
                            </div>
                        </div>

                        <div id="font-&-spacing" className="space-y-4 scroll-mt-28">
                            <h2 className="text-2xl font-bold text-pink-400">Font & Spacing Rules</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h4 className="font-bold border-b border-white/10 pb-2">Text Formatting</h4>
                                    <ul className="space-y-3 text-sm text-foreground/70">
                                        <li className="flex justify-between"><span>Font Family</span> <span className="font-mono text-white">Times New Roman</span></li>
                                        <li className="flex justify-between"><span>Body Size</span> <span className="font-mono text-white">12 pt</span></li>
                                        <li className="flex justify-between"><span>Chapter Headings</span> <span className="font-mono text-white">16 pt, Bold, Upper</span></li>
                                        <li className="flex justify-between"><span>Section Headings</span> <span className="font-mono text-white">14 pt, Bold</span></li>
                                        <li className="flex justify-between"><span>Line Spacing</span> <span className="font-mono text-white">1.5 lines</span></li>
                                        <li className="flex justify-between"><span>Alignment</span> <span className="font-mono text-white">Justified</span></li>
                                    </ul>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="font-bold border-b border-white/10 pb-2">Page Layout (A4)</h4>
                                    <ul className="space-y-3 text-sm text-foreground/70">
                                        <li className="flex justify-between"><span>Left Margin</span> <span className="font-mono text-white">1.50 inches</span></li>
                                        <li className="flex justify-between"><span>Right Margin</span> <span className="font-mono text-white">1.00 inch</span></li>
                                        <li className="flex justify-between"><span>Top Margin</span> <span className="font-mono text-white">1.00 inch</span></li>
                                        <li className="flex justify-between"><span>Bottom Margin</span> <span className="font-mono text-white">1.00 inch</span></li>
                                        <li className="flex justify-between"><span>Page Number</span> <span className="font-mono text-white">Bottom Center</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div id="citations" className="space-y-4 scroll-mt-28">
                            <h2 className="text-2xl font-bold">Citations (IEEE Format)</h2>
                            <p className="text-foreground/70">Citations must be numbered sequentially in square brackets formatted as <strong>[1], [2]</strong>. The reference list must be ordered by appearance.</p>

                            <div className="glass-card p-6 rounded-xl bg-[#0a0a0f] border border-white/10 font-mono text-xs md:text-sm text-foreground/80 space-y-4 overflow-x-auto">
                                <div>
                                    <span className="text-purple-400 block mb-1">// Journal Article</span>
                                    <p>[1] G. P. Author, "Title of article," <em>Journal Abbrev.</em>, vol. x, no. x, pp. xxx-xxx, Month, year.</p>
                                </div>
                                <div>
                                    <span className="text-purple-400 block mb-1">// Conference Paper</span>
                                    <p>[2] J. K. Author, "Title of paper," in <em>Abbrev. Proc. Title</em>, City, State, year, pp. xxx-xxx.</p>
                                </div>
                                <div>
                                    <span className="text-purple-400 block mb-1">// Website</span>
                                    <p>[3] "Title of webpage," Website Name. [Online]. Available: http://url.com. [Accessed: Mon. Day, Year].</p>
                                </div>
                            </div>
                        </div>

                        <div id="figures-&-tables" className="space-y-4 scroll-mt-28">
                            <h2 className="text-2xl font-bold">Figures & Tables</h2>
                            <ul className="list-disc list-inside space-y-2 text-foreground/70">
                                <li><strong>Figures:</strong> Caption must be <strong>BELOW</strong> the figure. (e.g., "Fig. 1.2 Block Diagram")</li>
                                <li><strong>Tables:</strong> Caption must be <strong>ABOVE</strong> the table. (e.g., "Table 2.1 Comparison of Results")</li>
                                <li>Numbering should follow Chapter Number (e.g., First figure in Chapter 3 is Fig. 3.1).</li>
                            </ul>
                        </div>
                    </section>

                    {/* Anna University Rules */}
                    <section id="anna-university-rules" className="space-y-12 pt-8 border-t border-white/5 scroll-mt-28">
                        <div id="thesis-format" className="space-y-4 scroll-mt-28">
                            <h2 className="text-2xl font-bold">Thesis vs. Project Report</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="glass-card p-6 rounded-xl border-l-4 border-purple-500">
                                    <h3 className="font-bold text-lg mb-2">B.E. / B.Tech (Project Report)</h3>
                                    <p className="text-sm text-foreground/70 mb-4">Undergraduate reports are typically typically shorter and focused on implementation.</p>
                                    <ul className="text-sm space-y-2">
                                        <li><strong>Binding:</strong> Soft Binding (Wrapper).</li>
                                        <li><strong>Color:</strong> Determined by Department (e.g., CSE: White/Cream).</li>
                                        <li><strong>Length:</strong> 40-70 Pages.</li>
                                    </ul>
                                </div>
                                <div className="glass-card p-6 rounded-xl border-l-4 border-pink-500">
                                    <h3 className="font-bold text-lg mb-2">M.E. / M.Tech (Thesis)</h3>
                                    <p className="text-sm text-foreground/70 mb-4">Postgraduate thesis requires rigorous research validation.</p>
                                    <ul className="text-sm space-y-2">
                                        <li><strong>Binding:</strong> Hard Binding (Leather/Rexine).</li>
                                        <li><strong>Color:</strong> Maroon or Black with Gold Embossing.</li>
                                        <li><strong>Length:</strong> 60-100 Pages.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div id="slab-rate" className="space-y-4 scroll-mt-28">
                            <h2 className="text-2xl font-bold">Slab Rate (Scoring Grading)</h2>
                            <p className="text-foreground/70">ReportGuard AI assigns a "Slab Rate" or Grade based on the overall compliance score.</p>

                            <div className="overflow-hidden rounded-xl border border-white/10">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-white/5 uppercase text-xs font-bold text-foreground/60">
                                        <tr>
                                            <th className="px-6 py-3">Score Range</th>
                                            <th className="px-6 py-3">Slab Grade</th>
                                            <th className="px-6 py-3">Remarks</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/10">
                                        <tr className="bg-green-500/10">
                                            <td className="px-6 py-4 font-bold text-green-400">90 - 100</td>
                                            <td className="px-6 py-4">Excellent (S)</td>
                                            <td className="px-6 py-4 text-foreground/70">Ready for submission. Minimal errors.</td>
                                        </tr>
                                        <tr className="bg-blue-500/10">
                                            <td className="px-6 py-4 font-bold text-blue-400">80 - 89</td>
                                            <td className="px-6 py-4">Very Good (A)</td>
                                            <td className="px-6 py-4 text-foreground/70">Minor formatting tweaks required.</td>
                                        </tr>
                                        <tr className="bg-yellow-500/10">
                                            <td className="px-6 py-4 font-bold text-yellow-400">70 - 79</td>
                                            <td className="px-6 py-4">Good (B)</td>
                                            <td className="px-6 py-4 text-foreground/70">Noticeable issues in margins or structure.</td>
                                        </tr>
                                        <tr className="bg-red-500/10">
                                            <td className="px-6 py-4 font-bold text-red-400">Below 70</td>
                                            <td className="px-6 py-4">Needs Work (C)</td>
                                            <td className="px-6 py-4 text-foreground/70">Major formatting violations detected.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                    {/* Troubleshooting */}
                    <section id="troubleshooting" className="space-y-6 pt-8 border-t border-white/5 scroll-mt-28">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-red-500/10 rounded-lg text-red-400">
                                <AlertCircle className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold">Troubleshooting & Issues</h2>
                        </div>

                        <div className="glass-card p-6 rounded-xl space-y-6">
                            <div>
                                <h4 className="font-bold flex items-center gap-2 mb-2">
                                    <FileText className="w-4 h-4 text-foreground/60" />
                                    PDF Parsing Failed
                                </h4>
                                <p className="text-sm text-foreground/70 pl-6">
                                    If your PDF contains scanned images of text (e.g., from a scanner), our AI cannot read it.
                                    <strong> Solution:</strong> Use an "OCR" tool to convert scanned images to text, or save as PDF directly from MS Word.
                                </p>
                            </div>
                            <div className="border-t border-white/5 pt-4">
                                <h4 className="font-bold flex items-center gap-2 mb-2">
                                    <Book className="w-4 h-4 text-foreground/60" />
                                    Incorrect Slab Rate?
                                </h4>
                                <p className="text-sm text-foreground/70 pl-6">
                                    Sometimes tables or complex equations can confuse formatting checks.
                                    <strong> Solution:</strong> Focus on the "Text Body" and "Headings". If the core text is correct, you can ignore minor warnings about complex diagrams.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <Footer />
        </main>
    );
}
