"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
    LayoutDashboard,
    FileText,
    Settings,
    Plus,
    Search,
    Bell,
    MoreVertical,
    BarChart3,
    Clock,
    CheckCircle2,
    AlertCircle
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const stats = [
    {
        label: "Total Reports",
        value: "12",
        change: "+2 this week",
        icon: FileText,
        color: "text-purple-400",
        bg: "bg-purple-500/10",
    },
    {
        label: "Average Score",
        value: "85%",
        change: "+5% vs last month",
        icon: BarChart3,
        color: "text-pink-400",
        bg: "bg-pink-500/10",
    },
    {
        label: "Pending Reviews",
        value: "3",
        change: "Needs attention",
        icon: Clock,
        color: "text-yellow-400",
        bg: "bg-yellow-500/10",
    },
];

interface Report {
    id: string;
    filename: string;
    uploadedAt: string;
    status: string;
    analysis?: {
        overallScore: number;
    };
}

export default function DashboardPage() {
    const { data: session } = useSession();
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const res = await fetch("/api/reports");
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

        fetchReports();
    }, []);

    // Calculate Real Stats
    const totalReports = reports.length;
    const completedReports = reports.filter(r => r.status === "COMPLETED" || r.status === "Analyzed");
    const avgScore = completedReports.length > 0
        ? Math.round(completedReports.reduce((acc, r) => acc + (r.analysis?.overallScore || 0), 0) / completedReports.length)
        : 0;
    const pendingReviews = reports.filter(r => r.status === "PENDING" || r.status === "PROCESSING").length;
    const failedReports = reports.filter(r => r.status === "FAILED").length;

    // Dynamic Stats Array
    const realStats = [
        {
            label: "Total Reports",
            value: totalReports.toString(),
            change: failedReports > 0 ? `${failedReports} failed` : "All good",
            icon: FileText,
            color: "text-purple-400",
            bg: "bg-purple-500/10",
        },
        {
            label: "Average Score",
            value: `${avgScore}%`,
            change: avgScore > 80 ? "Excellent" : avgScore > 60 ? "Good" : "Needs Work",
            icon: BarChart3,
            color: "text-pink-400",
            bg: "bg-pink-500/10",
        },
        {
            label: "Pending / Failed",
            value: (pendingReviews + failedReports).toString(),
            change: pendingReviews > 0 ? `${pendingReviews} processing` : "Queue empty",
            icon: Clock,
            color: "text-yellow-400",
            bg: "bg-yellow-500/10",
        },
    ];

    return (
        <main className="min-h-screen bg-[rgb(var(--background))]">
            <Header />

            <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Navigation */}
                    <aside className="lg:w-64 shrink-0 space-y-2">
                        <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-purple-500/10 text-purple-400 rounded-xl font-medium">
                            <LayoutDashboard className="w-5 h-5" />
                            Dashboard
                        </Link>
                        <Link href="/dashboard/reports" className="flex items-center gap-3 px-4 py-3 text-foreground/60 hover:text-foreground hover:bg-white/5 rounded-xl transition-all">
                            <FileText className="w-5 h-5" />
                            My Reports
                        </Link>
                        <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 text-foreground/60 hover:text-foreground hover:bg-white/5 rounded-xl transition-all">
                            <Settings className="w-5 h-5" />
                            Settings
                        </Link>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1 space-y-8 animate-fade-in">
                        {/* Top Bar */}
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-2xl font-bold">Dashboard</h1>
                                <p className="text-foreground/60">Welcome back, {session?.user?.name || "Student"}</p>
                            </div>
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <Link
                                    href="/dashboard/new"
                                    className="btn-primary flex items-center justify-center gap-2 flex-1 md:flex-none"
                                >
                                    <Plus className="w-5 h-5" />
                                    New Report
                                </Link>
                                <button className="p-2 glass-card rounded-lg hover:bg-white/10 transition-colors relative">
                                    <Bell className="w-5 h-5 text-foreground/70" />
                                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
                                </button>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {realStats.map((stat) => (
                                <div key={stat.label} className="glass-card p-6 rounded-2xl">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-foreground/60 text-sm font-medium">{stat.label}</p>
                                            <h3 className="text-3xl font-bold mt-2">{stat.value}</h3>
                                            <p className="text-sm text-foreground/40 mt-1">{stat.change}</p>
                                        </div>
                                        <div className={`p-3 rounded-xl ${stat.bg}`}>
                                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Recent Activity */}
                        <div className="glass-card rounded-2xl overflow-hidden">
                            <div className="p-6 border-b border-white/10 flex items-center justify-between">
                                <h3 className="font-bold">Recent Reports</h3>
                                {/* ... search ... */}
                            </div>
                            <div className="divide-y divide-white/5">
                                {loading ? (
                                    <div className="p-8 text-center text-foreground/40">Loading reports...</div>
                                ) : reports.length === 0 ? (
                                    <div className="p-8 text-center text-foreground/40">No reports found. Upload one to get started!</div>
                                ) : (
                                    reports.map((report) => (
                                        <Link key={report.id} href={`/dashboard/reports/${report.id}`} className="block hover:bg-white/5 transition-colors group">
                                            <div className="p-4 flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-2 bg-white/5 rounded-lg text-purple-400">
                                                        <FileText className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium group-hover:text-purple-400 transition-colors">{report.filename}</h4>
                                                        <p className="text-xs text-foreground/40">
                                                            {new Date(report.uploadedAt).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-6">
                                                    {report.status === "FAILED" ? (
                                                        <span className="text-sm text-red-500 flex items-center gap-1 font-medium">
                                                            <AlertCircle className="w-4 h-4" />
                                                            Analysis Failed
                                                        </span>
                                                    ) : report.status === "COMPLETED" || report.status === "Analyzed" ? (
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                                                                <div
                                                                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                                                                    style={{ width: `${report.analysis?.overallScore || 0}%` }}
                                                                />
                                                            </div>
                                                            <span className="text-sm font-bold">{report.analysis?.overallScore || 0}%</span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-sm text-yellow-500 flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            Processing
                                                        </span>
                                                    )}
                                                    <MoreVertical className="w-4 h-4 text-foreground/40" />
                                                </div>
                                            </div>
                                        </Link>
                                    )))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
