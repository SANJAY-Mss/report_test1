"use client";

import { Search, Download, Bell } from "lucide-react";
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
            a.download = `projecttracker_export_${new Date().toISOString().split("T")[0]}.csv`;
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
                    <Search className="h-4 w-4 text-gray-600 group-focus-within:text-white transition-colors" />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleSearch}
                    className="block w-full pl-10 pr-4 py-2.5 bg-[#0a0a0a] border border-[#1a1a1a] text-white placeholder:text-gray-600 focus:outline-none focus:border-gray-500 transition-all sm:text-sm mono"
                    placeholder="Search for reports..."
                />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-400 bg-[#0a0a0a] border border-[#1a1a1a] hover:text-white hover:border-gray-500 transition-all mono text-xs tracking-wider uppercase"
                >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Export Data</span>
                </button>

                <div className="h-8 w-px bg-[#1a1a1a] mx-1 hidden md:block" />

                <div className="relative" ref={notifRef}>
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="p-2.5 text-gray-500 hover:text-white bg-[#0a0a0a] border border-[#1a1a1a] hover:border-gray-500 transition-all relative"
                    >
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 mt-2 w-80 bg-[#0a0a0a] border border-[#1a1a1a] z-50 overflow-hidden">
                            <div className="p-4 border-b border-[#1a1a1a] flex justify-between items-center">
                                <h3 className="font-semibold text-white text-sm mono">Notifications</h3>
                                <button
                                    onClick={() => setShowNotifications(false)}
                                    className="text-xs text-gray-500 hover:text-white font-medium transition-colors mono"
                                >
                                    Mark all as read
                                </button>
                            </div>
                            <div className="max-h-80 overflow-y-auto custom-scrollbar">
                                <div className="p-4 border-b border-[#1a1a1a] hover:bg-white/5 transition-colors cursor-pointer group">
                                    <div className="flex gap-3">
                                        <div className="w-2 h-2 mt-1.5 bg-white rounded-full shrink-0" />
                                        <div>
                                            <p className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors">Your report <span className="font-medium text-white">&quot;AI_Ethics_Final.pdf&quot;</span> was successfully analyzed.</p>
                                            <p className="text-xs text-gray-600 mt-1 font-medium mono">2 HOURS AGO</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 hover:bg-white/5 transition-colors cursor-pointer group">
                                    <div className="flex gap-3">
                                        <div className="w-2 h-2 mt-1.5 bg-white rounded-full shrink-0" />
                                        <div>
                                            <p className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors">Welcome to ReportGuard! <span className="font-medium text-white">Try our new AI Chat feature</span> inside your reports.</p>
                                            <p className="text-xs text-gray-600 mt-1 font-medium mono">1 DAY AGO</p>
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
