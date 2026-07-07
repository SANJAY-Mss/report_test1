"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
    { q: "What exactly does Project Tracker validate?", a: "Project Tracker checks your academic project reports against official Anna University formatting guidelines. It verifies 12 key structural elements including fonts, line spacing, margins, chapter headings, and mandatory preliminary pages." },
    { q: "Do I need to install any software?", a: "No, Project Tracker is a 100% cloud-based SaaS platform. You simply upload your document through our secure web interface, and our AI handles the analysis server-side." },
    { q: "Is my report data kept secure and private?", a: "Absolutely. We do not store your intellectual property permanently or use it to train public AI models. Files are processed securely for validation and then discarded based on your privacy settings." },
    { q: "What file formats do you support?", a: "We currently support standard PDF uploads (.pdf) and Microsoft Word documents (.docx) to ensure your formatting and structural integrity are preserved accurately during the AI analysis." },
    { q: "Does this check for plagiarism?", a: "No, Project Tracker is strictly a structural and formatting validation tool. While it analyzes the document's layout, grammar, and academic tone, it does not currently cross-reference the internet for plagiarized content." },
];

export function RetuneFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="min-h-[80vh] w-full flex items-center justify-center p-6 md:p-12 border-t border-slate-200 bg-white">
            <div className="w-full max-w-4xl section-container">
                <div className="mb-16">
                    <div className="mono text-xs text-slate-500 mb-6 flex items-center gap-2">
                        <span>[ 07 ]</span>
                        <div className="h-[1px] w-8 bg-slate-300"></div>
                        <span>KNOWLEDGE_BASE</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #00bfff 0%, #00ffff 100%)' }}>
                        Project FAQ.
                    </h2>
                </div>

                <div className="space-y-2">
                    {faqs.map((faq, i) => (
                        <div key={i} className="border border-slate-200 bg-slate-50 overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-100 transition-colors"
                            >
                                <span className={`mono text-sm transition-colors ${openIndex === i ? 'text-[#00bfff] font-bold' : 'text-slate-800'}`}>
                                    <span className="text-slate-400 mr-4">[{String(i + 1).padStart(2, '0')}]</span>
                                    {faq.q}
                                </span>
                                <ChevronDown className={`w-4 h-4 transition-all duration-300 ${openIndex === i ? "rotate-180 text-[#00bfff]" : "text-slate-500"}`} />
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-500 ${openIndex === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                            >
                                <p className="p-6 pt-0 text-sm text-slate-600 leading-relaxed border-t border-slate-200 mt-2">
                                    {faq.a}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
