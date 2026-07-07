"use client";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Archive, Search, FileText, RotateCcw, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Report {
    id: string;
    filename: string;
    uploadedAt: string;
    status: string;
    analysis?: {
        overallScore: number;
    };
}

export default function ArchivePage() {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchArchivedReports = async () => {
        try {
            const res = await fetch("/api/reports?archived=true");
            const data = await res.json();
            if (data.reports) {
                setReports(data.reports);
            }
        } catch (error) {
            console.error("Failed to fetch archived reports", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArchivedReports();
    }, []);

    const handleUnarchive = async (id: string) => {
        try {
            const res = await fetch(`/api/reports/${id}/archive`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "unarchive" })
            });
            if (res.ok) {
                setReports(prev => prev.filter(r => r.id !== id));
                router.refresh();
            }
        } catch (error) {
            console.error("Failed to unarchive", error);
        }
    };

    return (
        <DashboardShell>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-white leading-tight">Archived Reports</h1>
                    <div className="relative w-64 hidden md:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                        <input
                            type="text"
                            placeholder="Search archives..."
                            className="w-full pl-10 pr-4 py-2.5 bg-[#0a0a0a] border border-[#1a1a1a] text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-gray-500 transition-all mono"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    </div>
                ) : reports.length === 0 ? (
                    <div className="flex flex-col items-center justify-center min-h-[40vh] text-center space-y-4 border-2 border-dashed border-[#2a2a2a] bg-[#0a0a0a]">
                        <div className="w-16 h-16 bg-white/5 flex items-center justify-center">
                            <Archive className="w-8 h-8 text-gray-500" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white leading-tight">No archived reports</h3>
                            <p className="text-sm font-medium text-gray-500 mt-1">Reports you archive will appear here.</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {reports.map((report) => (
                            <div key={report.id} className="flex items-center justify-between p-5 bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#2a2a2a] transition-all group">
                                <Link href={`/dashboard/reports/${report.id}`} className="flex items-center gap-4 flex-1">
                                    <div className="p-3 bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                                        <FileText className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white group-hover:text-gray-300 transition-colors leading-tight">{report.filename}</h3>
                                        <p className="text-sm font-medium text-gray-500 mt-0.5 mono">
                                            Archived on {new Date(report.uploadedAt).toLocaleDateString()} • Score: {report.analysis?.overallScore || 0}%
                                        </p>
                                    </div>
                                </Link>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleUnarchive(report.id)}
                                        className="p-2 text-gray-500 hover:text-green-400 hover:bg-green-500/10 transition-colors"
                                        title="Unarchive"
                                    >
                                        <RotateCcw className="w-5 h-5" />
                                    </button>
                                    <button
                                        className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                        title="Delete Permanently"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </DashboardShell>
    );
}
