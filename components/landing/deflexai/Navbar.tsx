"use client";

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { LogOut, LayoutDashboard } from 'lucide-react';

export function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-5 flex justify-between items-center bg-[#050505]/80 backdrop-blur-md border-b border-[#1a1a1a]">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-bold text-sm text-white tracking-wider group-hover:text-cyan-400 transition-colors">[ REPORTGUARD V.1.0 ]</span>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <Link href="/#features" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Features</Link>
        <Link href="/#workflow" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Workflow</Link>
        <Link href="/#testimonials" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Testimonials</Link>
        <Link href="/#pricing" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Pricing</Link>
        <Link href="/contact" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Contact</Link>
      </div>

      <div className="flex items-center gap-4">
        {session ? (
            <>
                <Link href="/dashboard" className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="retune-btn-primary text-[10px] flex items-center gap-2"
                >
                    <LogOut className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Sign Out</span>
                </button>
            </>
        ) : (
            <>
                <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors hidden sm:block">Sign In</Link>
                <Link href="/signup" className="retune-btn-primary text-[10px]">Start Scanning</Link>
            </>
        )}
      </div>
    </nav>
  );
}
