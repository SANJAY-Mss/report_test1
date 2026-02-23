"use client";

import Link from "next/link";
import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";

import { useSession, signOut } from "next-auth/react";
import { User, LogOut } from "lucide-react";

function AuthButtons() {
    const { data: session } = useSession();

    if (session) {
        return (
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center">
                        {session.user?.image ? (
                            <img src={session.user.image} alt={session.user.name || "User"} className="w-8 h-8 rounded-full" />
                        ) : (
                            <User className="w-4 h-4" />
                        )}
                    </div>
                    <span className="text-sm font-medium text-white">{session.user?.name}</span>
                </div>
                <button
                    onClick={() => signOut()}
                    className="p-2 text-white/40 hover:text-red-400 transition-colors"
                    title="Sign Out"
                >
                    <LogOut className="w-4 h-4" />
                </button>
                <Link href="/dashboard" className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-sm font-medium rounded-full shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all">
                    Dashboard
                </Link>
            </div>
        );
    }

    return (
        <>
            <Link href="/login" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
                Sign In
            </Link>
            <Link href="/signup" className="group relative px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium text-sm rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:animate-shimmer" />
                <span className="relative z-10">Get Started</span>
            </Link>
        </>
    );
}

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (

        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
            <div className="absolute inset-0 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/5" />

            <div className="relative max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/20 group-hover:border-pink-500/50 transition-colors cursor-pointer overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Shield className="w-6 h-6 text-purple-400 group-hover:text-pink-300 relative z-10 transition-colors" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 group-hover:to-pink-400 transition-all duration-300">
                        ReportGuard
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/5 backdrop-blur-sm">
                    {[
                        { label: "Features", href: "/#features" },
                        { label: "How It Works", href: "/#how-it-works" },
                        { label: "Pricing", href: "/pricing" },
                        { label: "Docs", href: "/docs" },
                    ].map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 rounded-full transition-all duration-200"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* CTA & Theme Toggle */}
                <div className="hidden md:flex items-center gap-4">
                    <div className="h-6 w-px bg-white/10" />
                    <AuthButtons />
                </div>

                {/* Mobile Menu Button - Keeping logic same */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
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
                        <Link href="/login" className="text-sm font-medium hover:text-purple-500 transition-colors">
                            Sign In
                        </Link>
                        <Link href="/signup" className="btn-primary flex-1 text-center">
                            Get Started
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
