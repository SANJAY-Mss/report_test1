"use client";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { FileText, Search, Archive, Download, Eye, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

interface Report {
    id: string;
    filename: string;
    uploadedAt: string;
    status: string;
    analysis?: {
        overallScore: number;
    };
}

export default function MyReportsPage() {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

    const fetchReports = async () => {
        try {
            const res = await fetch("/api/reports?archived=false");
            const data = await res.json();
            if (data.reports) {
                setReports(data.reports);
            }
        } catch (error) {
            console.error("Failed to fetch reports", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const handleArchive = async (id: string) => {
        try {
            const res = await fetch(`/api/reports/${id}/archive`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "archive" })
            });
            if (res.ok) {
                setReports(prev => prev.filter(r => r.id !== id));
                router.refresh();
            }
        } catch (error) {
            console.error("Failed to archive", error);
        }
    };

    const handleDownload = (report: Report) => {
        const content = `Report Name: ${report.filename}\nUploaded: ${new Date(report.uploadedAt).toLocaleDateString()}\nStatus: ${report.status}\nOverall Score: ${report.analysis?.overallScore || 'N/A'}%`;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${report.filename}-summary.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const filteredReports = reports.filter(r =>
        r.filename.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <DashboardShell>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">My Reports</h1>
                        <p className="text-sm text-gray-500 mt-1">Manage and track your formatting and plagiarism analysis.</p>
                    </div>
                    <div className="flex w-full sm:w-auto items-center gap-3">
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                            <input
                                type="text"
                                placeholder="Search reports..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-[#0a0a0a] border border-[#1a1a1a] text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-gray-500 transition-all mono"
                            />
                        </div>
                        <Link href="/dashboard/new" className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-black text-sm font-bold hover:bg-gray-200 transition-colors whitespace-nowrap mono text-xs tracking-wider uppercase">
                            <Plus className="w-4 h-4" /> New Scan
                        </Link>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div>
                    </div>
                ) : reports.length === 0 ? (
                    <div className="flex flex-col items-center justify-center min-h-[40vh] text-center space-y-4 bg-[#0a0a0a] border border-dashed border-[#2a2a2a] p-8">
                        <div className="w-16 h-16 bg-white/5 flex items-center justify-center text-white mb-2">
                            <FileText className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">No reports found</h3>
                            <p className="text-sm text-gray-500 mt-1 max-w-sm">Upload your first thesis or project report to get a comprehensive AI analysis.</p>
                        </div>
                        <Link href="/dashboard/new" className="mt-4 px-6 py-2.5 bg-white text-black text-sm font-bold hover:bg-gray-200 transition-colors mono tracking-wider uppercase">
                            Upload Report
                        </Link>
                    </div>
                ) : (
                    <div className="bg-[#0a0a0a] border border-[#1a1a1a] overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-[#050505] text-gray-500 border-b border-[#1a1a1a] text-[10px] uppercase tracking-wider font-semibold mono">
                                    <tr>
                                        <th className="px-6 py-4">Report Name</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Score</th>
                                        <th className="px-6 py-4">Uploaded</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1a1a1a]">
                                    {filteredReports.map((report) => {
                                        const score = report.analysis?.overallScore;
                                        const scoreColor = score !== undefined
                                            ? score >= 90 ? 'text-green-400' : score >= 70 ? 'text-blue-400' : 'text-amber-400'
                                            : '';
                                        const barColor = score !== undefined
                                            ? score >= 90 ? 'bg-green-400' : score >= 70 ? 'bg-blue-400' : 'bg-amber-400'
                                            : '';
                                        const statusStyle = (report.status === "COMPLETED" || report.status === "Analyzed")
                                            ? "text-green-400 bg-green-500/10 border-green-500/20"
                                            : report.status === "FAILED"
                                                ? "text-red-400 bg-red-500/10 border-red-500/20"
                                                : "text-amber-400 bg-amber-500/10 border-amber-500/20";

                                        return (
                                            <tr key={report.id} className="hover:bg-white/[0.02] transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 border border-white/10 bg-white/5 text-white">
                                                            <FileText className="w-4 h-4" />
                                                        </div>
                                                        <span className="font-medium text-white">{report.filename}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium border mono ${statusStyle}`}>
                                                        {report.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {score !== undefined ? (
                                                        <div className="flex items-center gap-2">
                                                            <span className={`font-bold mono ${scoreColor}`}>
                                                                {score}%
                                                            </span>
                                                            <div className="w-16 h-1.5 bg-[#1a1a1a] overflow-hidden hidden sm:block">
                                                                <div
                                                                    className={`h-full ${barColor}`}
                                                                    style={{ width: `${score}%` }}
                                                                />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-600">-</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-gray-500 text-sm mono">
                                                    {new Date(report.uploadedAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <Link
                                                            href={`/dashboard/reports/${report.id}`}
                                                            className="inline-flex p-2 text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
                                                            title="View Analysis"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </Link>
                                                        <button
                                                            type="button"
                                                            className="inline-flex p-2 text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
                                                            title="Download"
                                                            onClick={() => handleDownload(report)}
                                                        >
                                                            <Download className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="inline-flex p-2 text-gray-500 hover:text-amber-400 hover:bg-amber-500/10 transition-colors"
                                                            title="Archive"
                                                            onClick={() => handleArchive(report.id)}
                                                        >
                                                            <Archive className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </DashboardShell>
    );
}
