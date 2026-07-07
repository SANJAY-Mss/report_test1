"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function DashboardShell({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isMobileMenuOpen]);

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
        );
    }

    if (!session) {
        return null; // Will redirect
    }

    return (
        <div className="min-h-screen bg-[#050505] text-gray-100 font-sans selection:bg-white/10 selection:text-white flex flex-col">
            {/* Mobile Header */}
            <div className="lg:hidden flex items-center justify-between p-4 bg-[#0a0a0a] border-b border-[#1a1a1a] sticky top-0 z-50">
                <Link href="/" className="flex items-center gap-2 group shrink-0 pl-1">
                    <span className="mono text-xs text-white opacity-80">[ REPORTGUARD ]</span>
                </Link>
                <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                    className="p-2 text-gray-400 bg-[#0a0a0a] border border-[#1a1a1a] active:scale-95 transition-transform"
                >
                    {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
                <div className="flex flex-col lg:flex-row gap-8 relative">
                    {/* Sidebar Container */}
                    <div className={cn(
                        "lg:block fixed lg:static inset-0 z-40 bg-[#050505] lg:bg-transparent px-6 pt-6 pb-24 lg:p-0 transition-transform duration-300 ease-in-out lg:transform-none w-full lg:w-auto h-[calc(100vh-73px)] lg:h-auto overflow-y-auto lg:overflow-visible top-[73px] lg:top-0",
                        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                    )}>
                        <Sidebar isMobileMenuOpen={isMobileMenuOpen} />
                    </div>
                    
                    {/* Main Content */}
                    <div className={cn("flex-1 animate-fade-in min-w-0 transition-opacity", isMobileMenuOpen ? "hidden lg:block opacity-0" : "block opacity-100")}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
