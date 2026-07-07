"use client";

import Image from "next/image";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="relative bg-black pt-32 pb-12 overflow-hidden border-t border-white/5">
            <div className="absolute bottom-0 left-0 right-0 h-[600px] z-0 opacity-40">
                <Image 
                    src="/v0-assets/footer-upscaled-10.png" 
                    alt="Bioluminescent landscape" 
                    fill
                    className="object-cover object-bottom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black"></div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-24">
                    <div className="col-span-2 lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2 group mb-6 inline-flex">
                            <span className="font-display tracking-tight text-2xl text-white font-bold">COMPUTE</span>
                            <span className="font-mono text-xs mt-1 text-white/60">TM</span>
                        </Link>
                        <p className="text-white/50 font-sans text-sm max-w-xs mb-8">
                            Autonomous AI agents for distributed computing. Delegate complex tasks to intelligent workers.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-mono text-xs text-white mb-6 tracking-wider uppercase">Platform</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Agents</a></li>
                            <li><a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Tools</a></li>
                            <li><a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Memory</a></li>
                            <li><a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Security</a></li>
                            <li><a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Pricing</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-mono text-xs text-white mb-6 tracking-wider uppercase">Resources</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Documentation</a></li>
                            <li><a href="#" className="text-sm text-white/50 hover:text-white transition-colors">API Reference</a></li>
                            <li><a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Guides</a></li>
                            <li><a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Blog</a></li>
                            <li><a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Community</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-mono text-xs text-white mb-6 tracking-wider uppercase">Company</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-sm text-white/50 hover:text-white transition-colors">About</a></li>
                            <li><a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Careers</a></li>
                            <li><a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Legal</a></li>
                            <li><a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Privacy</a></li>
                            <li><a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Terms</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-white/40 text-sm font-sans">
                        © 2025 COMPUTE. All rights reserved.
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></div>
                        <span className="text-white/40 text-sm font-mono uppercase tracking-wider">All systems operational</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
