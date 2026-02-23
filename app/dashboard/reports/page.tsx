"use client";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { FileText, Search, Archive, Download, Eye } from "lucide-react";
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
        // Since we don't have the actual raw PDF files exposed via API in this prototype, 
        // we'll download a summary text file of their report details instead.
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
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">My Reports</h1>
                        <p className="text-sm text-white/40">Manage and track your report status</p>
                    </div>
                    <div className="flex gap-3">
                        <div className="relative w-64 hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                            <input
                                type="text"
                                placeholder="Search reports..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <Link href="/dashboard/new" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors">
                            + New Report
                        </Link>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                ) : reports.length === 0 ? (
                    <div className="flex flex-col items-center justify-center min-h-[40vh] text-center space-y-4 rounded-2xl border border-dashed border-white/10 bg-white/5">
                        <div className="p-4 rounded-full bg-white/5 text-white/40">
                            <FileText className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium">No reports found</h3>
                            <p className="text-sm text-white/40">Upload your first report to get started.</p>
                        </div>
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-xl border border-white/5 bg-[#0a0a0f]/40">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-white/5 text-white/60">
                                <tr>
                                    <th className="px-6 py-3 font-medium">Report Name</th>
                                    <th className="px-6 py-3 font-medium">Status</th>
                                    <th className="px-6 py-3 font-medium">Score</th>
                                    <th className="px-6 py-3 font-medium">Uploaded</th>
                                    <th className="px-6 py-3 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredReports.map((report) => (
                                    <tr key={report.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                                                    <FileText className="w-4 h-4" />
                                                </div>
                                                <span className="font-medium text-white">{report.filename}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${report.status === "COMPLETED" || report.status === "Analyzed" ? "bg-green-500/10 text-green-400" :
                                                report.status === "FAILED" ? "bg-red-500/10 text-red-400" :
                                                    "bg-yellow-500/10 text-yellow-400"
                                                }`}>
                                                {report.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-bold text-white">{report.analysis?.overallScore || "-"}%</span>
                                        </td>
                                        <td className="px-6 py-4 text-white/40">
                                            {new Date(report.uploadedAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 text-white/40">
                                                <Link href={`/dashboard/reports/${report.id}`} className="p-2 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors" title="View Analysis">
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                                <button onClick={() => handleDownload(report)} className="p-2 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Download">
                                                    <Download className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleArchive(report.id)}
                                                    className="p-2 hover:text-yellow-400 hover:bg-yellow-500/10 rounded-lg transition-colors"
                                                    title="Archive"
                                                >
                                                    <Archive className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </DashboardShell>
    );
}
