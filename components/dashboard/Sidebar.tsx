"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FileText,
    Settings,
    Plus,
    MessageSquare,
    Archive,
    CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mainLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/reports", label: "My Reports", icon: FileText },
];

const workspaceLinks = [
    { href: "/dashboard/chat", label: "AI Chat", icon: MessageSquare },
    { href: "/dashboard/archive", label: "Archived", icon: Archive },
];

export function Sidebar({ isMobileMenuOpen }: { isMobileMenuOpen?: boolean }) {
    const pathname = usePathname();

    const NavLink = ({ href, label, icon: Icon }: { href: string; label: string; icon: any }) => {
        const isActive = pathname === href;
        return (
            <Link
                href={href}
                className={cn(
                    "group relative flex items-center gap-3 px-4 py-2.5 transition-all duration-200 overflow-hidden",
                    isActive
                        ? "bg-white/10 text-white font-medium border-l-2 border-white"
                        : "text-gray-500 hover:text-gray-200 hover:bg-white/5 border-l-2 border-transparent"
                )}
            >
                <Icon className={cn("w-4 h-4 transition-transform duration-300 group-hover:scale-110", isActive ? "text-white" : "text-gray-600 group-hover:text-gray-300")} />
                <span className="text-sm tracking-wide">{label}</span>
            </Link>
        );
    };

    return (
        <aside className="w-full lg:w-64 shrink-0 flex flex-col h-full lg:h-[calc(100vh-4rem)] lg:sticky top-8 pb-12 lg:pb-0">
            {/* Logo Section */}
            <Link href="/" className="hidden lg:flex items-center gap-2 group shrink-0 mb-8 pl-1">
                <span className="font-bold text-sm text-white tracking-wider group-hover:text-cyan-400 transition-colors">[ REPORTGUARD V.1.0 ]</span>
            </Link>

            {/* New Report Button */}
            <div className="mb-6">
                <Link
                    href="/dashboard/new"
                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-white text-black hover:bg-gray-200 text-sm font-bold transition-colors mono text-xs tracking-wider uppercase"
                >
                    <Plus className="w-4 h-4" />
                    <span>New Report</span>
                </Link>
            </div>

            <div className="flex-1 overflow-y-auto space-y-8 pr-2 custom-scrollbar">
                {/* Main Section */}
                <div>
                    <h3 className="mono text-[10px] text-gray-600 uppercase tracking-widest pl-4 mb-3">
                        Main
                    </h3>
                    <div className="space-y-1">
                        {mainLinks.map((link) => (
                            <NavLink key={link.href} {...link} />
                        ))}
                    </div>
                </div>

                {/* Workspace Section */}
                <div>
                    <h3 className="mono text-[10px] text-gray-600 uppercase tracking-widest pl-4 mb-3 mt-8">
                        Workspace
                    </h3>
                    <div className="space-y-1">
                        {workspaceLinks.map((link) => (
                            <NavLink key={link.href} {...link} />
                        ))}
                    </div>
                </div>

                {/* Account Section */}
                <div>
                    <h3 className="mono text-[10px] text-gray-600 uppercase tracking-widest pl-4 mb-3 mt-8">
                        Account
                    </h3>
                    <div className="space-y-1">
                        <NavLink href="/dashboard/settings" label="Settings" icon={Settings} />
                        <NavLink href="/dashboard/billing" label="Billing" icon={CreditCard} />
                    </div>
                </div>
            </div>

            {/* Upgrade Card */}
            <div className="mt-auto pt-6">
                <div className="p-5 bg-[#0a0a0a] border border-[#1a1a1a] relative overflow-hidden">
                    <div className="relative z-10 text-center space-y-3">
                        <div className="w-10 h-10 mx-auto flex items-center justify-center bg-white/5 border border-white/10">
                            <SparklesIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-white text-sm">Add more scans</h4>
                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">Unlock advanced AI analysis and team features.</p>
                        </div>
                        <Link href="/#pricing" className="block w-full py-2.5 text-xs font-bold text-center bg-white text-black hover:bg-gray-200 transition-all mono tracking-wider uppercase">
                            Upgrade Now
                        </Link>
                    </div>
                </div>
            </div>
        </aside>
    );
}

function SparklesIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" />
        </svg>
    );
}
