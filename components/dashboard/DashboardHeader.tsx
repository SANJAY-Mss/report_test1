"use client";

import { Search, Download, Plus, Bell } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface DashboardHeaderProps {
    searchQuery?: string;
    setSearchQuery?: (q: string) => void;
}

export function DashboardHeader({ searchQuery, setSearchQuery }: DashboardHeaderProps) {
    const [localQuery, setLocalQuery] = useState("");
    const [showNotifications, setShowNotifications] = useState(false);
    const query = searchQuery !== undefined ? searchQuery : localQuery;
    const setQuery = setSearchQuery || setLocalQuery;
    const router = useRouter();
    const notifRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && query.trim()) {
            router.push(`/dashboard/reports?q=${encodeURIComponent(query.trim())}`);
        }
    };

    const handleExport = async () => {
        try {
            const res = await fetch("/api/reports");
            if (!res.ok) throw new Error("Failed to fetch reports");
            const data = await res.json();
            if (!data.reports || data.reports.length === 0) {
                alert("No reports to export.");
                return;
            }

            // Generate CSV
            const headers = ["ID", "Filename", "Status", "Score", "Date Uploaded"];
            const rows = data.reports.map((r: any) => [
                r.id,
                `"${r.filename}"`,
                r.status,
                r.analysis?.overallScore || "N/A",
                new Date(r.uploadedAt).toLocaleDateString()
            ]);

            const csvContent = [
                headers.join(","),
                ...rows.map((row: string[]) => row.join(","))
            ].join("\n");

            const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `reportguard_export_${new Date().toISOString().split("T")[0]}.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Export failed:", error);
            alert("Failed to export data.");
        }
    };

    return (
        <header className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            {/* Search */}
            <div className="relative w-full md:w-96 group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-white/40 group-focus-within:text-purple-400 transition-colors" />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleSearch}
                    className="block w-full pl-10 pr-3 py-2.5 border border-white/5 rounded-xl leading-5 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:bg-white/10 focus:ring-1 focus:ring-purple-500/50 transition-all sm:text-sm"
                    placeholder="Search for reports..."
                />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white/70 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all"
                >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Export Data</span>
                </button>

                <Link
                    href="/dashboard/new"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all"
                >
                    <Plus className="w-4 h-4" />
                    <span>New Report</span>
                </Link>

                <div className="h-8 w-px bg-white/10 mx-1" />

                <div className="relative" ref={notifRef}>
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="p-2.5 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all relative"
                    >
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0a0a0f]" />
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 mt-2 w-80 bg-[#12121a] border border-white/10 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#1a1a24]">
                                <h3 className="font-semibold text-white">Notifications</h3>
                                <button
                                    onClick={() => setShowNotifications(false)}
                                    className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                                >
                                    Mark all as read
                                </button>
                            </div>
                            <div className="max-h-80 overflow-y-auto custom-scrollbar">
                                <div className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
                                    <div className="flex gap-3">
                                        <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                                        <div>
                                            <p className="text-sm text-white/90 group-hover:text-white transition-colors">Your report <span className="font-medium text-white">"AI_Ethics_Final.pdf"</span> was successfully analyzed.</p>
                                            <p className="text-xs text-white/40 mt-1">2 hours ago</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 hover:bg-white/5 transition-colors cursor-pointer group">
                                    <div className="flex gap-3">
                                        <div className="w-2 h-2 mt-1.5 rounded-full bg-purple-500 shrink-0 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                                        <div>
                                            <p className="text-sm text-white/90 group-hover:text-white transition-colors">Welcome to ReportGuard! <span className="text-white">Try our new AI Chat feature</span> inside your reports.</p>
                                            <p className="text-xs text-white/40 mt-1">1 day ago</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
