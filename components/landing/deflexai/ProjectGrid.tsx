import React from 'react';

export function ProjectGrid() {
  const cards = [
    {
      num: '01',
      label: 'VALIDATION',
      title: "Format Validation",
      description: "Ensure your thesis meets strict margin, font, and citation style rules automatically.",
      mockup: (
        <div className="space-y-2 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500/20 text-green-400 text-[10px] flex items-center justify-center">✓</div>
            <div className="h-[2px] w-20 bg-gray-800" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500/20 text-green-400 text-[10px] flex items-center justify-center">✓</div>
            <div className="h-[2px] w-24 bg-gray-800" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500/20 text-red-400 text-[10px] flex items-center justify-center">!</div>
            <div className="h-[2px] w-14 bg-gray-800" />
          </div>
        </div>
      ),
    },
    {
      num: '02',
      label: 'ANALYSIS',
      title: "Grammar Analysis",
      description: "AI-powered grammar and style checks to ensure your report reads clearly and professionally.",
      mockup: (
        <div className="flex flex-col items-center justify-center gap-2 mt-6">
          <span className="text-3xl font-bold text-white mono">96%</span>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mono">Clarity Score</span>
        </div>
      ),
    },
    {
      num: '03',
      label: 'EXPORT',
      title: "Instant Exports",
      description: "Download a fully annotated copy of your document detailing exactly what to fix.",
      mockup: (
        <div className="mt-4 flex items-center gap-3">
          <div className="w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center text-white text-[10px] mono font-bold">PDF</div>
          <div className="flex-1 space-y-1.5">
            <div className="h-1.5 w-full bg-gray-800 rounded" />
            <div className="h-1 w-full bg-[#1a1a1a] overflow-hidden">
              <div className="bg-white h-full w-full" />
            </div>
          </div>
        </div>
      ),
    }
  ];

  return (
    <section className="py-24 bg-[#050505] border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <div className="mono text-xs text-gray-500 mb-6 flex items-center gap-2">
            <span>[ SYSTEMS ]</span>
            <div className="h-[1px] w-12 bg-gray-800" />
            <span>COMPREHENSIVE CHECKS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tight mb-4">
            Comprehensive checks,
            <br />
            <span className="text-gray-500">effortless passing grades.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
            Eliminate the anxiety of final submissions. Let our automated systems verify every inch of your document.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div key={card.num} className="relative bg-[#0a0a0a] border border-[#1a1a1a] p-8 hover:bg-[#0e0e0e] transition-colors duration-500 group">
              {/* Bracket Corners */}
              <div className="mono text-[10px] text-gray-600 mb-4 flex items-center gap-2">
                <span>[ {card.num} ]</span>
                <div className="h-[1px] w-6 bg-gray-800" />
                <span>{card.label}</span>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">{card.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{card.description}</p>
              {card.mockup}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
