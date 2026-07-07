"use client";

import Link from "next/link";

export function CtaSection() {
    return (
        <section className="py-32 lg:py-48 bg-black relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/noise-QXZu9cQQQQQQQQQQQQQQQQQQQQQQ.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-b from-[#eca8d6]/10 via-[#9e98fa]/10 to-transparent rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 text-center">
                <h2 className="text-5xl lg:text-8xl font-display text-white mb-8 tracking-tight">
                    Ready to automate?
                </h2>
                <p className="text-white/60 font-sans text-xl mb-12 max-w-2xl mx-auto">
                    Join teams automating complex workflows with COMPUTE agents. Deploy your first agent in minutes.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/dashboard" className="h-14 px-8 inline-flex items-center justify-center whitespace-nowrap rounded-full text-base font-medium transition-colors bg-white text-black hover:bg-white/90">
                        Deploy agent
                    </Link>
                    <span className="text-sm font-mono text-white/50 mt-4 sm:mt-0 sm:ml-4">
                        1,000 free tasks with COMPUTE
                    </span>
                </div>
            </div>
        </section>
    );
}
