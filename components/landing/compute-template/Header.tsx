"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header className={`fixed z-50 transition-all duration-500 top-0 left-0 right-0 ${isScrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"}`}>
                <nav className="mx-auto transition-all duration-500 max-w-[1400px]">
                    <div className="flex items-center justify-between transition-all duration-500 px-6 lg:px-8 h-20">
                        <Link href="/" className="flex items-center gap-2 group">
                            <span className="font-display tracking-tight transition-all duration-500 text-2xl text-white font-bold">COMPUTE</span>
                            <span className="font-mono transition-all duration-500 text-xs mt-1 text-white/60">TM</span>
                        </Link>
                        <div className="hidden md:flex items-center gap-12">
                            <Link href="#features" className="text-sm transition-colors duration-300 relative group text-white/70 hover:text-white font-sans">
                                Capabilities
                                <span className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full bg-white"></span>
                            </Link>
                            <Link href="#how-it-works" className="text-sm transition-colors duration-300 relative group text-white/70 hover:text-white font-sans">
                                Process
                                <span className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full bg-white"></span>
                            </Link>
                            <Link href="#infra" className="text-sm transition-colors duration-300 relative group text-white/70 hover:text-white font-sans">
                                Infra
                                <span className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full bg-white"></span>
                            </Link>
                            <Link href="#integrations" className="text-sm transition-colors duration-300 relative group text-white/70 hover:text-white font-sans">
                                Integrations
                                <span className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full bg-white"></span>
                            </Link>
                            <Link href="#security" className="text-sm transition-colors duration-300 relative group text-white/70 hover:text-white font-sans">
                                Security
                                <span className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full bg-white"></span>
                            </Link>
                        </div>
                        <div className="hidden md:flex items-center gap-4">
                            <Link href="/login" className="transition-all duration-500 text-sm text-white/70 hover:text-white font-sans">
                                Sign in
                            </Link>
                            <Link href="/dashboard" className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium h-8 gap-1.5 rounded-full transition-all duration-500 bg-white hover:bg-white/90 text-black px-6 font-sans">
                                Deploy agent
                            </Link>
                        </div>
                        <button className="md:hidden p-2 transition-colors duration-500 text-white" aria-label="Toggle menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </nav>
            </header>

            {/* Mobile Menu */}
            <div className={`md:hidden fixed inset-0 bg-black z-40 transition-all duration-500 ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} style={{ top: 0 }}>
                <div className="flex flex-col h-full px-8 pt-28 pb-8">
                    <div className="flex-1 flex flex-col justify-center gap-8">
                        <Link href="#features" onClick={() => setMobileMenuOpen(false)} className={`text-5xl font-display text-white hover:text-white/70 transition-all duration-500 ${mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "100ms" }}>
                            Capabilities
                        </Link>
                        <Link href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className={`text-5xl font-display text-white hover:text-white/70 transition-all duration-500 ${mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "150ms" }}>
                            Process
                        </Link>
                        <Link href="#infra" onClick={() => setMobileMenuOpen(false)} className={`text-5xl font-display text-white hover:text-white/70 transition-all duration-500 ${mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "200ms" }}>
                            Infra
                        </Link>
                        <Link href="#integrations" onClick={() => setMobileMenuOpen(false)} className={`text-5xl font-display text-white hover:text-white/70 transition-all duration-500 ${mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "250ms" }}>
                            Integrations
                        </Link>
                        <Link href="#security" onClick={() => setMobileMenuOpen(false)} className={`text-5xl font-display text-white hover:text-white/70 transition-all duration-500 ${mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "300ms" }}>
                            Security
                        </Link>
                    </div>
                    <div className={`flex gap-4 pt-8 border-t border-white/10 transition-all duration-500 ${mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "400ms" }}>
                        <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-all border bg-black border-white/20 hover:bg-white/10 px-4 py-2 flex-1 rounded-full h-14 text-base text-white">
                            Sign in
                        </Link>
                        <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-all hover:bg-white/90 px-4 py-2 flex-1 bg-white text-black rounded-full h-14 text-base">
                            Deploy agent
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
