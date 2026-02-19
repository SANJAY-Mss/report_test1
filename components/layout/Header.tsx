"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="p-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl group-hover:shadow-glow-purple transition-all duration-300">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold gradient-text">ReportGuard</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/#features" className="text-sm font-medium hover:text-purple-500 transition-colors">
                            Features
                        </Link>
                        <Link href="/#how-it-works" className="text-sm font-medium hover:text-purple-500 transition-colors">
                            How It Works
                        </Link>
                        <Link href="/pricing" className="text-sm font-medium hover:text-purple-500 transition-colors">
                            Pricing
                        </Link>
                        <Link href="/docs" className="text-sm font-medium hover:text-purple-500 transition-colors">
                            Documentation
                        </Link>
                    </nav>

                    {/* CTA & Theme Toggle */}
                    <div className="hidden md:flex items-center gap-4">
                        <ThemeToggle />
                        <Link href="/login" className="text-sm font-medium hover:text-purple-500 transition-colors">
                            Sign In
                        </Link>
                        <Link href="/signup" className="btn-primary">
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 glass-card rounded-lg"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 p-4 glass-card rounded-2xl space-y-4 animate-slide-up">
                        <Link href="/#features" className="block text-sm font-medium hover:text-purple-500 transition-colors">
                            Features
                        </Link>
                        <Link href="/#how-it-works" className="block text-sm font-medium hover:text-purple-500 transition-colors">
                            How It Works
                        </Link>
                        <Link href="/pricing" className="block text-sm font-medium hover:text-purple-500 transition-colors">
                            Pricing
                        </Link>
                        <Link href="/docs" className="block text-sm font-medium hover:text-purple-500 transition-colors">
                            Documentation
                        </Link>
                        <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                            <ThemeToggle />
                            <Link href="/login" className="text-sm font-medium hover:text-purple-500 transition-colors">
                                Sign In
                            </Link>
                            <Link href="/signup" className="btn-primary flex-1 text-center">
                                Get Started
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
