"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import {
    StatsCards,
    ActivityChart,
    UsageBarChart,
    ComplianceGauge,
    RecentReportsList,
    ResourceAllocation
} from "@/components/dashboard/DashboardWidgets";

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
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const res = await fetch("/api/reports");
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(`Error ${res.status}: ${text}`);
                }
                const data = await res.json();
                if (data.reports) {
                    setReports(data.reports);
                }
            } catch (error: any) {
                console.error("Failed to fetch reports", error);
                setError(error.message || "Failed to load dashboard data.");
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    if (error) {
        return (
            <DashboardShell>
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
                    {error}
                </div>
            </DashboardShell>
        );
    }

    // Calculate Real Stats
    const totalReports = reports.length;
    const completedReportsCount = reports.filter(r => r.status === "COMPLETED" || r.status === "Analyzed").length;
    const avgScore = completedReportsCount > 0
        ? Math.round(reports.filter(r => r.status === "COMPLETED" || r.status === "Analyzed").reduce((acc, r) => acc + (r.analysis?.overallScore || 0), 0) / completedReportsCount)
        : 0;
    const pendingReportsCount = reports.filter(r => r.status === "PENDING" || r.status === "PROCESSING").length;

    // Calculate Weekly Activity (Last 7 Days exactly)
    const dailyData = new Array(7).fill(0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    reports.forEach(report => {
        const reportDate = new Date(report.uploadedAt);
        const diffTime = todayEnd.getTime() - reportDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays >= 0 && diffDays < 7) {
            // Index 6 is today, 0 is 6 days ago
            dailyData[6 - diffDays]++;
        }
    });

    // Calculate Monthly Data (Last 6 Months including current)
    const monthlyData = new Array(6).fill(0);
    const currentDate = new Date();

    reports.forEach(report => {
        const reportDate = new Date(report.uploadedAt);
        const monthDiff = (currentDate.getFullYear() - reportDate.getFullYear()) * 12 + (currentDate.getMonth() - reportDate.getMonth());

        if (monthDiff >= 0 && monthDiff < 6) {
            // Index 5 is current month, 0 is 5 months ago
            monthlyData[5 - monthDiff]++;
        }
    });

    const [searchQuery, setSearchQuery] = useState("");

    // Calculate trend (vs previous 7 days)
    const currentWeekCount = dailyData.reduce((a, b) => a + b, 0);

    const fourteenDaysAgo = new Date(todayEnd);
    fourteenDaysAgo.setDate(todayEnd.getDate() - 14);
    const sevenDaysAgoExact = new Date(todayEnd);
    sevenDaysAgoExact.setDate(todayEnd.getDate() - 7);

    const previousWeekCount = reports.filter(r => {
        const d = new Date(r.uploadedAt);
        return d > fourteenDaysAgo && d <= sevenDaysAgoExact;
    }).length;

    let activityTrend = 0;
    if (previousWeekCount > 0) {
        activityTrend = Math.round(((currentWeekCount - previousWeekCount) / previousWeekCount) * 100);
    } else if (currentWeekCount > 0) {
        activityTrend = 100;
    }

    // Use Mock Data if the user is completely new (0 reports) so the charts look alive
    const displayDailyData = reports.length === 0 ? [1, 3, 2, 5, 4, 7, 5] : dailyData;
    const displayMonthlyData = reports.length === 0 ? [10, 15, 12, 28, 22, 35] : monthlyData;
    const displayCurrentWeekCount = reports.length === 0 ? 27 : currentWeekCount;
    const displayActivityTrend = reports.length === 0 ? 12 : activityTrend;

    const filteredReports = reports.filter(r =>
        r.filename.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <DashboardShell>
            <DashboardHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            <div className="space-y-6">
                {/* Stats Row */}
                <StatsCards
                    totalReports={totalReports}
                    avgScore={avgScore}
                    pendingCount={pendingReportsCount}
                    completedCount={completedReportsCount}
                />

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column (Charts) */}
                    <div className="lg:col-span-2 space-y-6">
                        <ActivityChart
                            total={displayCurrentWeekCount}
                            trend={displayActivityTrend}
                            weeklyData={displayDailyData}
                            monthlyData={displayMonthlyData}
                        />
                        <RecentReportsList reports={filteredReports} />
                    </div>

                    {/* Right Column (Widgets) */}
                    <div className="space-y-6">
                        <UsageBarChart dailyData={displayDailyData} />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                            <ComplianceGauge score={avgScore} />
                            <ResourceAllocation />
                        </div>
                    </div>
                </div>
            </div>
        </DashboardShell>
    );
}
