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
                    <h1 className="text-2xl font-bold">Archived Reports</h1>
                    <div className="relative w-64 hidden md:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                            type="text"
                            placeholder="Search archives..."
                            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                ) : reports.length === 0 ? (
                    <div className="flex flex-col items-center justify-center min-h-[40vh] text-center space-y-4 rounded-2xl border border-dashed border-white/10 bg-white/5">
                        <div className="p-4 rounded-full bg-white/5 text-white/40">
                            <Archive className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium">No archived reports</h3>
                            <p className="text-sm text-white/40">Reports you archive will appear here.</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {reports.map((report) => (
                            <div key={report.id} className="flex items-center justify-between p-4 rounded-xl bg-[#0a0a0f]/40 border border-white/5 hover:border-white/10 transition-colors group">
                                <Link href={`/dashboard/reports/${report.id}`} className="flex items-center gap-4 flex-1">
                                    <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors">{report.filename}</h3>
                                        <p className="text-xs text-white/40">
                                            Archived on {new Date(report.uploadedAt).toLocaleDateString()} • Score: {report.analysis?.overallScore || 0}%
                                        </p>
                                    </div>
                                </Link>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleUnarchive(report.id)}
                                        className="p-2 text-white/40 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-colors"
                                        title="Unarchive"
                                    >
                                        <RotateCcw className="w-4 h-4" />
                                    </button>
                                    <button
                                        className="p-2 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                        title="Delete Permanently"
                                    >
                                        <Trash2 className="w-4 h-4" />
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
