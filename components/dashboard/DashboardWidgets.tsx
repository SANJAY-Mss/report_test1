"use client";

import { cn } from "@/lib/utils";
import { FileText, BarChart3, Clock, TrendingUp, TrendingDown, MoreHorizontal, Download, FileCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface StatsCardsProps {
    totalReports: number;
    avgScore: number;
    pendingCount: number;
    completedCount: number;
}

export function StatsCards({ totalReports, avgScore, pendingCount, completedCount }: StatsCardsProps) {
    const stats = [
        {
            label: "Total Reports",
            value: totalReports.toString(),
            change: "All time",
            trend: "up",
            icon: FileText,
            color: "text-purple-400",
            bg: "bg-purple-500/10",
        },
        {
            label: "Avg Score",
            value: `${avgScore}%`,
            change: "Overall",
            trend: avgScore >= 80 ? "up" : "down",
            icon: BarChart3,
            color: "text-pink-400",
            bg: "bg-pink-500/10",
        },
        {
            label: "Pending",
            value: pendingCount.toString(),
            change: "In Queue",
            trend: "neutral",
            icon: Clock,
            color: "text-orange-400",
            bg: "bg-orange-500/10",
        },
        {
            label: "Completed",
            value: completedCount.toString(),
            change: "Processed",
            trend: "up",
            icon: FileCheck,
            color: "text-green-400",
            bg: "bg-green-500/10",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
                <div key={i} className="p-5 rounded-2xl glass-panel border-white/5 bg-[#0a0a0f]/40 hover:bg-white/5 transition-colors group">
                    <div className="flex justify-between items-start mb-4">
                        <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                            <stat.icon className={`w-5 h-5 ${stat.color}`} />
                        </div>
                        <div className={cn(
                            "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                            stat.trend === "up" ? "bg-green-500/10 text-green-400" : stat.trend === "down" ? "bg-red-500/10 text-red-400" : "bg-white/10 text-white/60"
                        )}>
                            {stat.trend === "up" ? <TrendingUp className="w-3 h-3" /> : stat.trend === "down" ? <TrendingDown className="w-3 h-3" /> : null}
                            {stat.change}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-1 group-hover:scale-105 transition-transform origin-left">{stat.value}</h3>
                        <p className="text-sm text-white/40">{stat.label}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

// --- Activity Chart (SVG Area Chart) ---
interface ActivityChartProps {
    total: number;
    trend: number;
    weeklyData: number[]; // Array of 7 numbers for the graph
    monthlyData: number[]; // Array of 6 numbers for the graph
}

export function ActivityChart({ total, trend, weeklyData, monthlyData }: ActivityChartProps) {
    const [timeframe, setTimeframe] = useState<'weekly' | 'monthly'>('weekly');

    // Choose data based on timeframe
    const currentData = timeframe === 'weekly' ? weeklyData : monthlyData;

    // Generate SVG path from data
    // Normalize data to 0-40 height range
    const max = Math.max(...currentData, 1);
    const points = currentData.map((val, i) => {
        // give 2 units of padding on left and right so circles/labels don't clip bounds
        const x = 2 + (i / (currentData.length - 1)) * 96;
        const y = 40 - (val / max) * 30; // Leave some headroom
        return `${x},${y}`;
    });

    const pathD = `M2,40 L2,${40 - (currentData[0] / max) * 30} ${points.map(p => `L${p}`).join(" ")} L98,40 Z`;
    const lineD = `M${points.map(p => `L${p}`).join(" ").replace("L", "")}`;

    return (
        <div className="col-span-1 lg:col-span-2 p-6 rounded-2xl glass-panel border-white/5 bg-[#0a0a0f]/40">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-white">Analysis Activity</h3>
                    <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-2xl font-bold text-white">{total}</span>
                        <span className={cn("text-xs font-medium", trend >= 0 ? "text-green-400" : "text-red-400")}>
                            {trend > 0 ? "+" : ""}{trend}%
                        </span>
                    </div>
                    <p className="text-xs text-white/40">
                        {timeframe === 'weekly' ? 'Reports processed this week' : 'Reports processed this year'}
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setTimeframe('weekly')}
                        className={cn(
                            "px-3 py-1.5 text-xs font-medium rounded-lg transition-colors",
                            timeframe === 'weekly' ? "text-white bg-white/10" : "text-white/60 hover:text-white bg-transparent hover:bg-white/5"
                        )}
                    >
                        Weekly
                    </button>
                    <button
                        onClick={() => setTimeframe('monthly')}
                        className={cn(
                            "px-3 py-1.5 text-xs font-medium rounded-lg transition-colors",
                            timeframe === 'monthly' ? "text-white bg-white/10" : "text-white/60 hover:text-white bg-transparent hover:bg-white/5"
                        )}
                    >
                        Monthly
                    </button>
                </div>
            </div>

            {/* SVG Chart */}
            <div className="relative h-64 w-full overflow-hidden">
                <svg viewBox="0 0 100 40" className="w-full h-full" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <path
                        d={pathD}
                        fill="url(#gradient)"
                        className="opacity-50 transition-all duration-500"
                    />
                    <path
                        d={lineD}
                        fill="none"
                        stroke="#a855f7"
                        strokeWidth="0.5"
                        vectorEffect="non-scaling-stroke"
                        className="transition-all duration-500 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                    />
                </svg>
                {/* Overlay Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    {[1, 2, 3, 4].map((_, i) => (
                        <div key={i} className="w-full h-px bg-white/5 border-t border-dashed border-white/5" />
                    ))}
                </div>
                {/* Data Points overlay */}
                <div className="absolute inset-0">
                    <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                        {points.map((p, i) => {
                            const [x, y] = p.split(',').map(Number);
                            const val = currentData[i];
                            return (
                                <g key={i} className="group/point">
                                    <circle
                                        cx={x}
                                        cy={y}
                                        r="0.75"
                                        className="fill-purple-500 opacity-0 group-hover/point:opacity-100 lg:opacity-100 transition-opacity"
                                    />
                                    <text
                                        x={x}
                                        y={y - 2.5}
                                        textAnchor={i === 0 ? "start" : i === points.length - 1 ? "end" : "middle"}
                                        className="fill-white/80 font-medium tracking-wider opacity-0 group-hover/point:opacity-100 lg:opacity-100 transition-opacity duration-300"
                                        style={{ fontSize: '2.5px' }}
                                    >
                                        {val}
                                    </text>
                                </g>
                            );
                        })}
                    </svg>
                </div>
            </div>
        </div>
    );
}

// --- Usage Bar Chart ---
interface UsageBarChartProps {
    dailyData: number[]; // Array of 7 numbers
}

export function UsageBarChart({ dailyData }: UsageBarChartProps) {
    const max = Math.max(...dailyData, 1);

    // Get last 7 days labels
    const days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return d.toLocaleDateString('en-US', { weekday: 'short' });
    });

    return (
        <div className="p-6 rounded-2xl glass-panel border-white/5 bg-[#0a0a0f]/40 flex flex-col justify-between">
            <h3 className="text-lg font-semibold text-white mb-6">Daily Reports</h3>
            <div className="flex items-end justify-between h-48 gap-2">
                {dailyData.map((val, i) => {
                    // Give bars a minimum visible height (e.g., 8%) if they have a value > 0 to prevent "flatlines"
                    const heightPct = val > 0 ? Math.max((val / max) * 100, 8) : 0;
                    return (
                        <div key={i} className="w-full h-full flex flex-col items-center gap-2">
                            <div className="w-full h-full flex items-end bg-white/5 rounded-t-lg overflow-hidden group">
                                <div
                                    style={{ height: `${heightPct}%` }}
                                    className="w-full bg-gradient-to-t from-purple-600/80 to-pink-500/80 group-hover:from-purple-500 group-hover:to-pink-400 transition-all duration-500 rounded-t-lg relative min-h-[4px]"
                                >
                                    <div className="absolute top-0 inset-x-0 h-[1px] bg-white/20" />
                                </div>
                            </div>
                            <span className="text-[10px] text-white/40 font-medium">
                                {days[i]}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

interface ComplianceGaugeProps {
    score: number;
}

export function ComplianceGauge({ score }: ComplianceGaugeProps) {
    // Calculate strokeDashoffset based on score (0-100) and max dasharray (126)
    // 0 score -> 126 offset (hidden)
    // 100 score -> 0 offset (full)
    // Actually our arc is 180 degrees, so we need to map 0-100 to the visible arc.
    // The previous implementation used fixed values. Let's approximate.
    // Full semi-circle arc length ~ 126.
    const maxOffset = 126;
    const offset = maxOffset - (score / 100) * maxOffset;

    return (
        <div className="p-6 rounded-2xl glass-panel border-white/5 bg-[#0a0a0f]/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-50">
                <MoreHorizontal className="w-5 h-5 text-white/40" />
            </div>

            <h3 className="text-lg font-semibold text-white mb-2">Compliance Rate</h3>

            <div className="relative flex items-center justify-center py-6">
                {/* Simple SVG Gauge */}
                <svg viewBox="0 0 100 60" className="w-48 h-28 overflow-visible">
                    {/* Background Arc */}
                    <path
                        d="M10,50 A40,40 0 1,1 90,50"
                        fill="none"
                        stroke="#1e1e24"
                        strokeWidth="8"
                        strokeLinecap="round"
                    />
                    {/* Active Arc */}
                    <path
                        d="M10,50 A40,40 0 1,1 90,50"
                        fill="none"
                        stroke="url(#gauge-gradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray="126"
                        strokeDashoffset={offset}
                        className="drop-shadow-[0_0_10px_rgba(168,85,247,0.3)] transition-all duration-1000 ease-out"
                    />
                    <defs>
                        <linearGradient id="gauge-gradient" x1="0" x2="1" y1="0" y2="0">
                            <stop offset="0%" stopColor="#ec4899" />
                            <stop offset="100%" stopColor="#a855f7" />
                        </linearGradient>
                    </defs>
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
                    <span className="text-4xl font-bold text-white mb-1">{score}%</span>
                    <span className="text-xs text-white/40 uppercase tracking-widest">
                        {score >= 80 ? "Excellent" : score >= 60 ? "Good" : "Poor"}
                    </span>
                </div>
            </div>

            <div className="flex justify-between items-center text-xs text-white/40 mt-2 px-4">
                <span>0%</span>
                <span>100%</span>
            </div>
        </div>
    );
}

interface RecentReportsListProps {
    reports: any[];
}

export function RecentReportsList({ reports }: RecentReportsListProps) {
    return (
        <div className="col-span-1 lg:col-span-2 p-6 rounded-2xl glass-panel border-white/5 bg-[#0a0a0f]/40">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Recent Reports</h3>
                <Link href="/dashboard/reports" className="text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors">
                    View All
                </Link>
            </div>

            <div className="space-y-4">
                {reports.length === 0 ? (
                    <div className="text-center text-white/40 py-8">No reports yet.</div>
                ) : (
                    reports.slice(0, 3).map((report, i) => (
                        <Link key={report.id} href={`/dashboard/reports/${report.id}`} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-purple-500/10 rounded-lg text-purple-400 group-hover:scale-105 transition-transform">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-white group-hover:text-purple-400 transition-colors">{report.filename}</h4>
                                    <p className="text-xs text-white/40">
                                        {new Date(report.uploadedAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right hidden sm:block">
                                    <span className="text-xs font-bold text-white block">{report.analysis?.overallScore || 0}%</span>
                                    <span className="text-xs text-white/40 uppercase">Score</span>
                                </div>
                                <div className="p-2 text-white/40 hover:text-white transition-colors">
                                    <Download className="w-4 h-4" />
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}

// --- Resource Allocation (Progress Bars) ---
export function ResourceAllocation() {
    return (
        <div className="p-6 rounded-2xl glass-panel border-white/5 bg-[#0a0a0f]/40">
            <h3 className="text-lg font-semibold text-white mb-6">Processing Usage</h3>

            <div className="space-y-5">
                {[
                    { label: "AI Tokens", value: 72, color: "bg-purple-500" },
                    { label: "Storage", value: 45, color: "bg-pink-500" },
                    { label: "API Calls", value: 28, color: "bg-orange-500" },
                ].map((item, i) => (
                    <div key={i} className="space-y-2">
                        <div className="flex justify-between text-xs">
                            <span className="text-white/60 font-medium">{item.label}</span>
                            <span className="text-white font-bold">{item.value}%</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                            <div
                                className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                                style={{ width: `${item.value}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
