import React from 'react';

export function Testimonials() {
  const testimonials = [
    {
      name: "Sanjay Kumar",
      role: "Ph.D. Candidate, IIT Delhi",
      content: "ReportGuard caught 14 subtle formatting errors I had completely missed. It saved me hours of manual checking before my thesis defense.",
      avatar: "SK",
    },
    {
      name: "Dr. Manoj Sharma",
      role: "Professor of Engineering",
      content: "We now require all our senior design students to scan their final reports through this tool. The quality of submissions has improved drastically.",
      avatar: "MS",
    },
    {
      name: "Rakesh Verma",
      role: "Undergraduate Student",
      content: "The formatting checks gave me peace of mind, and the AI chat actually helped me improve the flow of my literature review. Highly recommended!",
      avatar: "RV",
    },
    {
      name: "Amit Patel",
      role: "MSc Computer Science",
      content: "Formatting university reports used to be a nightmare. Now I just drop my draft into ReportGuard and it highlights precisely which margins or spacing are incorrect.",
      avatar: "AP",
    },
    {
      name: "Prof. Priya Desai",
      role: "Department Chair",
      content: "This tool has significantly reduced the review burden on our faculty. We spend more time discussing research content rather than fixing formatting errors.",
      avatar: "PD",
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-[#050505] border-t border-[#1a1a1a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <div className="mono text-xs text-gray-500 mb-6 flex items-center gap-2">
            <span>[ SIGNALS ]</span>
            <div className="h-[1px] w-12 bg-gray-800" />
            <span>USER FEEDBACK</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tight mb-4">
            Trusted by
            <br />
            <span className="text-gray-500">top academics.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
            See how students and professors are saving time and ensuring perfect compliance.
          </p>
        </div>
      </div>

      <div className="relative flex w-full flex-col justify-center overflow-hidden">
        {/* Fading Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 hidden md:block" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 hidden md:block" />

        {/* Marquee */}
        <div className="flex w-max group pb-4">
          <div className="flex w-max animate-marquee-fast group-hover:pause-animation gap-6 pr-6">
            {testimonials.map((t, i) => (
              <div key={`set1-${i}`} className="w-[350px] sm:w-[400px] shrink-0 bg-[#0a0a0a] border border-[#1a1a1a] p-8 relative hover:bg-[#0e0e0e] transition-colors duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-white font-bold text-lg mono shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{t.name}</h4>
                    <p className="text-xs text-gray-500 mono line-clamp-1">{t.role}</p>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed text-sm">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="mt-6 mono text-[10px] text-amber-400 uppercase">
                  ★★★★★ — VERIFIED
                </div>
              </div>
            ))}
          </div>
          <div className="flex w-max animate-marquee-fast group-hover:pause-animation gap-6 pr-6" aria-hidden="true">
            {testimonials.map((t, i) => (
              <div key={`set2-${i}`} className="w-[350px] sm:w-[400px] shrink-0 bg-[#0a0a0a] border border-[#1a1a1a] p-8 relative hover:bg-[#0e0e0e] transition-colors duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-white font-bold text-lg mono shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{t.name}</h4>
                    <p className="text-xs text-gray-500 mono line-clamp-1">{t.role}</p>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed text-sm">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="mt-6 mono text-[10px] text-amber-400 uppercase">
                  ★★★★★ — VERIFIED
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee-fast {
          animation: marquee 35s linear infinite;
        }
        .pause-animation {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
}
