"use client";

import React from 'react';
import { Zap, PenLine, Bot, BarChart } from 'lucide-react';

const features = [
  {
    num: '01',
    label: 'FORMAT ENGINE',
    icon: Zap,
    title: 'Instant Format Checks',
    description: 'Automatically verify margins, font sizes, line spacing, and paragraph indents against your university report formatting standards.',
  },
  {
    num: '02',
    label: 'LANGUAGE SCAN',
    icon: PenLine,
    title: 'Grammar & Style Check',
    description: 'Ensure your writing is clear, professional, and free of typos or awkward phrasing before you submit your report.',
  },
  {
    num: '03',
    label: 'AI INTERFACE',
    icon: Bot,
    title: 'AI Chat Assistant',
    description: 'Chat directly with your uploaded report. Ask our AI to summarize chapters, check structural flow, or suggest improvements.',
  },
  {
    num: '04',
    label: 'SYNTHESIS',
    icon: BarChart,
    title: 'Actionable Feedback',
    description: 'Get a comprehensive score and a clear checklist of exactly what lines and pages need fixing before final submission.',
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="py-24 bg-[#050505] border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-20">
          <div className="mono text-xs text-gray-500 mb-6 flex items-center gap-2">
            <span>[ FEATURES ]</span>
            <div className="h-[1px] w-12 bg-gray-800" />
            <span>SYSTEM CAPABILITIES</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tight mb-4">
            Everything you need for
            <br />
            <span className="text-gray-500">the perfect project report.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
            Powerful AI tools designed specifically for seamless report formatting and review.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.num}
                className="relative group bg-[#0a0a0a] border border-[#1a1a1a] p-8 hover:bg-[#0e0e0e] transition-colors duration-500"
              >
                {/* Bracket Corners */}
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-white opacity-80" />
                  </div>
                  <div>
                    <div className="mono text-[10px] text-gray-600 mb-2 flex items-center gap-2">
                      <span>[ {feature.num} ]</span>
                      <div className="h-[1px] w-6 bg-gray-800" />
                      <span>{feature.label}</span>
                    </div>
                    <h3 className="text-xl font-medium text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
