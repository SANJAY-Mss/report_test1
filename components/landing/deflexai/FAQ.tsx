"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What specific formatting guidelines does ReportGuard follow?",
    answer: "We verify your project reports against standard engineering and university guidelines, ensuring correct fonts, line spacing, margins, and the inclusion of mandatory sections like Bonafide Certificates and Acknowledgements."
  },
  {
    question: "Can the AI accurately find formatting errors?",
    answer: "Yes, our AI engine deeply scans the structure of your uploaded document to identify out-of-margin text, incorrect heading hierarchies, inconsistent spacing, and missing mandatory sections within seconds."
  },
  {
    question: "Can the AI Chat Assistant write my project report for me?",
    answer: "No. The AI Chat Assistant functions as a structural reviewer and editor. It provides actionable suggestions to improve your literature flow, helps rephrase awkward sentences for clarity, and checks compliance, but it does not generate original research."
  },
  {
    question: "How long does a typical document scan take?",
    answer: "Most project reports are fully analyzed in under 30 seconds. Larger documents containing heavy graphics or exceeding 100 pages may take slightly longer for complete structural extraction."
  },
  {
    question: "Is my project work secure and private?",
    answer: "Absolutely. We treat your data privacy with the highest priority. Your documents are securely processed in-memory during the scan and are never permanently stored, used to train our AI models, or shared with third parties."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-[#050505] border-t border-[#1a1a1a]">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <div className="mono text-xs text-gray-500 mb-6 flex items-center gap-2">
            <span>[ FAQ ]</span>
            <div className="h-[1px] w-12 bg-gray-800" />
            <span>SYSTEM INFO</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tight mb-4">
            Frequently Asked
            <br />
            <span className="text-gray-500">Questions.</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Everything you need to know about ReportGuard.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border transition-all duration-300 relative ${
                openIndex === index
                  ? 'border-white/20 bg-[#0a0a0a]'
                  : 'border-[#1a1a1a] bg-[#050505] hover:border-[#2a2a2a]'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
              >
                <span className="font-medium text-white text-base pr-4">{faq.question}</span>
                <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center border transition-all duration-300 ${
                  openIndex === index ? 'border-white/30 bg-white/5' : 'border-[#1a1a1a] bg-transparent'
                }`}>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-white' : ''}`}
                  />
                </div>
              </button>

              <div
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-48 pb-5 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-gray-400 leading-relaxed text-sm">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
