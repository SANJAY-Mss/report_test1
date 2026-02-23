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
    BookOpen,
    CreditCard,
    Cpu
} from "lucide-react";
import { cn } from "@/lib/utils";

const mainLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/reports", label: "My Reports", icon: FileText },
];

const workspaceLinks = [
    { href: "/dashboard/chat", label: "AI Chat", icon: MessageSquare }, // Placeholder
    { href: "/dashboard/archive", label: "Archived", icon: Archive }, // Placeholder
    { href: "/docs", label: "Documentation", icon: BookOpen },
];

export function Sidebar() {
    const pathname = usePathname();

    const NavLink = ({ href, label, icon: Icon }: { href: string; label: string; icon: any }) => {
        const isActive = pathname === href;
        return (
            <Link
                href={href}
                className={cn(
                    "group relative flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 overflow-hidden",
                    isActive
                        ? "bg-gradient-to-r from-purple-500/10 to-transparent text-purple-400"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                )}
            >
                {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-purple-500 rounded-r-full shadow-[0_0_12px_rgba(168,85,247,0.5)]" />
                )}
                <Icon className={cn("w-4 h-4 transition-transform duration-300 group-hover:scale-110", isActive ? "text-purple-400" : "")} />
                <span className="font-medium text-sm">{label}</span>
            </Link>
        );
    };

    return (
        <aside className="lg:w-64 shrink-0 flex flex-col h-[calc(100vh-8rem)] sticky top-24">
            {/* New Report Button */}
            <div className="mb-8">
                <Link
                    href="/dashboard/new"
                    className="flex items-center justify-center gap-2 w-full p-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-purple-500/25 group"
                >
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                    <span>New Report</span>
                </Link>
            </div>

            <div className="flex-1 overflow-y-auto space-y-8 pr-2 custom-scrollbar">
                {/* Main Section */}
                <div>
                    <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mobile-hidden mb-3 px-4">
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
                    <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mobile-hidden mb-3 px-4">
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
                    <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mobile-hidden mb-3 px-4">
                        Account
                    </h3>
                    <div className="space-y-1">
                        <NavLink href="/dashboard/settings" label="Settings" icon={Settings} />
                        <NavLink href="/dashboard/billing" label="Billing" icon={CreditCard} />
                        <NavLink href="/dashboard/usage" label="Usage" icon={Cpu} />
                    </div>
                </div>
            </div>

            {/* Upgrade Card */}
            <div className="mt-auto pt-6">
                <div className="p-4 rounded-2xl bg-gradient-to-b from-white/5 to-white/[0.02] border border-white/5 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative z-10 text-center space-y-3">
                        <div className="w-10 h-10 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-[1px]">
                            <div className="w-full h-full rounded-full bg-[#0a0a0f] flex items-center justify-center">
                                <SparklesIcon className="w-5 h-5 text-fuchsia-400" />
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white">Upgrade to Pro</h4>
                            <p className="text-xs text-white/60 mt-1">Unlock advanced AI analysis & unlimited reports.</p>
                        </div>
                        <Link href="/pricing" className="block w-full py-2 text-xs font-medium text-center bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg transition-colors">
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
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        </svg>
    );
}
