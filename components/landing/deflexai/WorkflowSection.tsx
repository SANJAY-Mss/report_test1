"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';

/* ── animation helpers ── */
const fadeUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: d, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const slideLeft: any = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const slideRight: any = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/* ── step data ── */
const steps = [
  {
    num: '01',
    label: 'UPLOAD',
    title: 'Upload your report',
    description:
      'Drag & drop your PDF or DOCX file. Our system instantly processes your university report for formatting analysis.',
    mockup: 'upload',
  },
  {
    num: '02',
    label: 'PROCESSING',
    title: 'AI scans & analyzes',
    description:
      'Our AI engine checks formatting, structure, grammar, and compliance against your university report standards — all in seconds.',
    mockup: 'analyze',
  },
  {
    num: '03',
    label: 'OUTPUT',
    title: 'Get actionable results',
    description:
      'Receive a detailed score, page-level issue highlights, and a clear checklist of fixes so you submit with full confidence.',
    mockup: 'results',
  },
];

/* ── Mockup components ── */
function UploadMockup() {
  return (
    <div className="bg-[#0a0a0a] border border-[#1a1a1a] p-5 w-full max-w-[280px] relative">
      <div className="border border-dashed border-gray-700 p-6 flex flex-col items-center gap-3 bg-white/[0.02]">
        <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-xl">📄</div>
        <p className="text-sm font-medium text-gray-300">Drop your file here</p>
        <p className="text-xs text-gray-600 mono">PDF, DOCX or LaTeX</p>
      </div>
      <Link href="/signup" className="mt-4 w-full py-2.5 bg-white text-black text-sm font-semibold flex items-center justify-center hover:bg-gray-200 transition-colors mono text-xs tracking-wider uppercase">
        Upload Report
      </Link>
      <div className="mono text-[10px] text-gray-600 mt-3 text-right">INPUT_SOURCE: FILE_DROP</div>
    </div>
  );
}

function AnalyzeMockup() {
  return (
    <div className="bg-[#0a0a0a] border border-[#1a1a1a] p-5 w-full max-w-[280px] space-y-3 relative">
      <div className="flex items-center gap-3 pb-3 border-b border-[#1a1a1a]">
        <div className="w-9 h-9 bg-white/5 border border-white/10 flex items-center justify-center text-white mono text-[10px] font-bold">AI</div>
        <div>
          <p className="text-xs font-bold text-gray-200">Scanning document…</p>
          <p className="text-[10px] text-gray-600 mono">Final_Report_v2.pdf</p>
        </div>
      </div>
      <div className="space-y-2">
        {['Formatting', 'Grammar', 'Structure'].map((label, i) => (
          <div key={label}>
            <div className="flex justify-between text-[10px] font-medium mb-1 mono">
              <span className="text-gray-500">{label}</span>
              <span className="text-white">{[92, 67, 100][i]}%</span>
            </div>
            <div className="h-1 bg-[#1a1a1a] overflow-hidden">
              <motion.div
                className="h-full bg-white"
                initial={{ width: 0 }}
                whileInView={{ width: `${[92, 67, 100][i]}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 + i * 0.2, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mono text-[10px] text-gray-600 text-right">STATUS: MAPPING</div>
    </div>
  );
}

function ResultsMockup() {
  return (
    <div className="bg-[#0a0a0a] border border-[#1a1a1a] p-5 w-full max-w-[280px] space-y-3 relative">
      <div className="flex items-center gap-4 pb-3 border-b border-[#1a1a1a]">
        <div className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center">
          <span className="text-white font-bold text-lg mono">A+</span>
        </div>
        <div>
          <p className="text-sm font-bold text-gray-200">Score: 96%</p>
          <p className="text-[11px] text-gray-500 mono">READY TO SUBMIT</p>
        </div>
      </div>
      <div className="space-y-2">
        {[
          { label: 'Margins & Spacing', ok: true },
          { label: 'Page 7 citation style', ok: false },
          { label: 'Header format', ok: true },
        ].map((item) => (
          <div key={item.label} className={`flex items-center gap-2 p-2 text-xs font-medium border ${item.ok ? 'border-green-500/20 bg-green-500/5 text-green-400' : 'border-red-500/20 bg-red-500/5 text-red-400'}`}>
            <span>{item.ok ? '✓' : '!'}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      <div className="mono text-[10px] text-gray-600 text-right">OUTPUT_MODE: DETAILED</div>
    </div>
  );
}

const mockups: Record<string, React.ReactNode> = {
  upload: <UploadMockup />,
  analyze: <AnalyzeMockup />,
  results: <ResultsMockup />,
};

/* ═══════════════════════════════════════════════════ */
export function WorkflowSection() {
  return (
    <div id="workflow" className="bg-[#050505] overflow-hidden">
      <section className="py-28 max-w-7xl mx-auto px-6 md:px-12">

        {/* ── Header ── */}
        <motion.div
          className="mb-24"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          custom={0}
        >
          <div className="mono text-xs text-gray-500 mb-6 flex items-center gap-2">
            <span>[ WORKFLOW ]</span>
            <div className="h-[1px] w-12 bg-gray-800" />
            <span>HOW IT WORKS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tight mb-4">
            Three steps to
            <br />
            <span className="text-gray-500">submission-ready.</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-md">
            From upload to a submission-ready report in seconds.
          </p>
        </motion.div>

        {/* ── Steps ── */}
        <div className="space-y-0">
          {steps.map((step, i) => {
            const isEven = i % 2 === 0;
            return (
              <div key={step.num} className="border-t border-[#1a1a1a] py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
                  {/* Text */}
                  <motion.div
                    className={`${isEven ? 'md:order-1' : 'md:order-2'}`}
                    variants={isEven ? slideLeft : slideRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <div className="mono text-xs text-gray-500 mb-6 flex items-center gap-2">
                      <span>[ {step.num} ]</span>
                      <div className="h-[1px] w-8 bg-gray-800" />
                      <span>{step.label}</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-medium text-white mb-4 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                      {step.description}
                    </p>
                  </motion.div>

                  {/* Mockup */}
                  <motion.div
                    className={`flex ${isEven ? 'md:order-2 md:justify-end' : 'md:order-1 md:justify-start'} justify-center`}
                    variants={isEven ? slideRight : slideLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    {mockups[step.mockup]}
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          className="text-center mt-16 pt-16 border-t border-[#1a1a1a]"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          <Link
            href="/signup"
            className="retune-btn-primary inline-block"
          >
            Start Scanning →
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
