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
        },
        {
            label: "Avg Score",
            value: `${avgScore}%`,
            change: "Overall",
            trend: avgScore >= 80 ? "up" : "down",
            icon: BarChart3,
        },
        {
            label: "Pending",
            value: pendingCount.toString(),
            change: "In queue",
            trend: "neutral",
            icon: Clock,
        },
        {
            label: "Completed",
            value: completedCount.toString(),
            change: "Processed",
            trend: "up",
            icon: FileCheck,
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
                <div key={i} className="p-5 bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#2a2a2a] transition-all group relative">
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="p-3 bg-white/5 border border-white/10">
                            <stat.icon className="w-5 h-5 text-white opacity-70" />
                        </div>
                        <div className={cn(
                            "flex items-center gap-1 text-[10px] font-medium px-2 py-1 mono tracking-wider uppercase",
                            stat.trend === "up" ? "text-green-400" : stat.trend === "down" ? "text-red-400" : "text-gray-500"
                        )}>
                            {stat.trend === "up" ? <TrendingUp className="w-3 h-3" /> : stat.trend === "down" ? <TrendingDown className="w-3 h-3" /> : null}
                            {stat.change}
                        </div>
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-3xl font-bold text-white mb-1 tracking-tight mono">{stat.value}</h3>
                        <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

// --- Activity Chart (SVG Area Chart) ---
interface ActivityChartProps {
    total: number | string;
    trend: number;
    weeklyData: number[];
    monthlyData: number[];
}

export function ActivityChart({ total, trend, weeklyData, monthlyData }: ActivityChartProps) {
    const [timeframe, setTimeframe] = useState<'weekly' | 'monthly'>('weekly');

    const currentData = timeframe === 'weekly' ? weeklyData : monthlyData;
    const displayTotal = currentData.reduce((acc, curr) => acc + curr, 0);

    const max = Math.max(...currentData, 1);
    const points = currentData.map((val, i) => {
        const x = 2 + (i / (currentData.length - 1)) * 96;
        const y = 40 - (val / max) * 30;
        return `${x},${y}`;
    });

    const pathD = `M2,40 L2,${40 - (currentData[0] / max) * 30} ${points.map(p => `L${p}`).join(" ")} L98,40 Z`;
    const lineD = `M${points.map(p => `L${p}`).join(" ").replace("L", "")}`;

    return (
        <div className="col-span-1 lg:col-span-2 p-6 bg-[#0a0a0a] border border-[#1a1a1a] relative group">
            <div className="flex items-center justify-between mb-6 relative z-10">
                <div>
                    <h3 className="text-sm font-semibold text-gray-400 tracking-tight mono uppercase">Analysis Activity</h3>
                    <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-4xl font-bold text-white tracking-tight mono">{displayTotal}</span>
                        <span className={cn("text-xs font-medium px-2 py-0.5 mono", trend >= 0 ? "text-green-400" : "text-red-400")}>
                            {trend > 0 ? "+" : ""}{trend}%
                        </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 font-medium mono">
                        {timeframe === 'weekly' ? 'Reports processed this week' : 'Reports processed this year'}
                    </p>
                </div>
                <div className="flex gap-1 bg-[#050505] p-1 border border-[#1a1a1a]">
                    <button
                        onClick={() => setTimeframe('weekly')}
                        className={cn(
                            "px-4 py-1.5 text-xs font-semibold transition-all mono",
                            timeframe === 'weekly' ? "bg-white text-black" : "text-gray-500 hover:text-white"
                        )}
                    >
                        Weekly
                    </button>
                    <button
                        onClick={() => setTimeframe('monthly')}
                        className={cn(
                            "px-4 py-1.5 text-xs font-semibold transition-all mono",
                            timeframe === 'monthly' ? "bg-white text-black" : "text-gray-500 hover:text-white"
                        )}
                    >
                        Monthly
                    </button>
                </div>
            </div>

            {/* SVG Chart */}
            <div className="relative h-64 w-full overflow-hidden z-10 mt-6">
                <svg viewBox="0 0 100 40" className="w-full h-full" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
                            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <path
                        d={pathD}
                        fill="url(#gradient)"
                        className="opacity-100 transition-all duration-500"
                    />
                    <path
                        d={lineD}
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="0.5"
                        vectorEffect="non-scaling-stroke"
                        className="transition-all duration-500"
                    />
                </svg>
                {/* Overlay Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    {[1, 2, 3, 4].map((_, i) => (
                        <div key={i} className="w-full h-px bg-[#1a1a1a]" />
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
                                        r="0.4"
                                        className="fill-[#0a0a0a] stroke-white opacity-0 group-hover/point:opacity-100 transition-opacity"
                                        strokeWidth="0.15"
                                    />
                                    <text
                                        x={x}
                                        y={y - 2.5}
                                        textAnchor={i === 0 ? "start" : i === points.length - 1 ? "end" : "middle"}
                                        className="fill-white font-bold opacity-0 group-hover/point:opacity-100 transition-opacity duration-300"
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
    dailyData: number[];
}

export function UsageBarChart({ dailyData }: UsageBarChartProps) {
    const max = Math.max(...dailyData, 1);

    const days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return d.toLocaleDateString('en-US', { weekday: 'short' });
    });

    return (
        <div className="p-6 bg-[#0a0a0a] border border-[#1a1a1a] flex flex-col justify-between relative group">
            <h3 className="text-sm font-semibold text-gray-400 mb-6 tracking-tight relative z-10 mono uppercase">Daily Reports</h3>
            <div className="flex items-end justify-between h-48 gap-3 relative z-10 mt-auto">
                {dailyData.map((val, i) => {
                    const heightPct = val > 0 ? Math.max((val / max) * 100, 8) : 0;
                    return (
                        <div key={i} className="w-full h-full flex flex-col items-center gap-3">
                            <div className="w-full h-full flex items-end bg-white/[0.03] overflow-hidden group/bar">
                                <div
                                    style={{ height: `${heightPct}%` }}
                                    className="w-full bg-white group-hover/bar:bg-gray-300 transition-all duration-500"
                                />
                            </div>
                            <span className="text-xs text-gray-600 font-medium mono">
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
    const maxOffset = 126;
    const offset = maxOffset - (score / 100) * maxOffset;

    return (
        <div className="p-6 bg-[#0a0a0a] border border-[#1a1a1a] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-5 z-10">
                <MoreHorizontal className="w-5 h-5 text-gray-600 hover:text-gray-300 cursor-pointer" />
            </div>

            <h3 className="text-sm font-semibold text-gray-400 mb-2 tracking-tight relative z-10 mono uppercase">Compliance Rate</h3>

            <div className="relative flex items-center justify-center py-6 z-10">
                <svg viewBox="0 0 100 60" className="w-48 h-28 overflow-visible">
                    {/* Background Arc */}
                    <path
                        d="M10,50 A40,40 0 1,1 90,50"
                        fill="none"
                        stroke="#1a1a1a"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                    {/* Active Arc */}
                    <path
                        d="M10,50 A40,40 0 1,1 90,50"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="126"
                        strokeDashoffset={offset}
                        className="transition-all duration-1000 ease-out"
                    />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
                    <span className="text-4xl font-bold text-white mb-1 tracking-tight mono">{score}%</span>
                    <span className={cn(
                        "text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 mono",
                        score >= 80 ? "text-green-400" : score >= 60 ? "text-amber-400" : "text-red-400"
                    )}>
                        {score >= 80 ? "EXCELLENT" : score >= 60 ? "MARGINAL" : "CRITICAL"}
                    </span>
                </div>
            </div>

            <div className="flex justify-between items-center text-xs font-semibold text-gray-600 mt-2 px-4 relative z-10 mono">
                <span>0.00</span>
                <span>1.00</span>
            </div>
        </div>
    );
}

interface RecentReportsListProps {
    reports: any[];
}

export function RecentReportsList({ reports }: RecentReportsListProps) {
    return (
        <div className="col-span-1 lg:col-span-2 p-6 bg-[#0a0a0a] border border-[#1a1a1a] relative group">
            <div className="flex items-center justify-between mb-6 relative z-10">
                <h3 className="text-sm font-semibold text-gray-400 tracking-tight mono uppercase">Recent Reports</h3>
                <Link href="/dashboard/reports" className="text-xs font-semibold text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 transition-colors mono tracking-wider uppercase">
                    View All
                </Link>
            </div>

            <div className="space-y-3 relative z-10">
                {reports.length === 0 ? (
                    <div className="text-center text-gray-600 py-8 text-sm font-medium mono">No recent reports found.</div>
                ) : (
                    reports.slice(0, 3).map((report, i) => (
                        <Link key={report.id} href={`/dashboard/reports/${report.id}`} className="flex items-center justify-between p-4 bg-[#050505] border border-[#1a1a1a] hover:border-[#2a2a2a] transition-all group/item cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-white/5 border border-white/10 text-white group-hover/item:bg-white/10 transition-all">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-white group-hover/item:text-gray-300 transition-colors">{report.filename}</h4>
                                    <p className="text-xs font-medium text-gray-600 mt-0.5 mono">
                                        {new Date(report.uploadedAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="text-right hidden sm:block">
                                    <span className="text-sm font-bold text-white block mono">{report.analysis?.overallScore || 0}%</span>
                                    <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider mono">SCORE</span>
                                </div>
                                <div className="p-2 bg-white/5 border border-white/10 text-gray-500 group-hover/item:text-white transition-colors">
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
        <div className="p-6 bg-[#0a0a0a] border border-[#1a1a1a] relative group flex flex-col justify-between">
            <h3 className="text-sm font-semibold text-gray-400 mb-6 tracking-tight relative z-10 mono uppercase">Processing Usage</h3>

            <div className="space-y-6 relative z-10">
                {[
                    { label: "AI Tokens", value: 72, color: "bg-white" },
                    { label: "Storage Sys", value: 45, color: "bg-gray-400" },
                    { label: "API Routing", value: 28, color: "bg-gray-600" },
                ].map((item, i) => (
                    <div key={i} className="space-y-2.5">
                        <div className="flex justify-between text-xs font-semibold mono">
                            <span className="text-gray-500">{item.label}</span>
                            <span className="text-white">{item.value}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-[#1a1a1a] overflow-hidden">
                            <div
                                className={`h-full ${item.color} transition-all duration-1000`}
                                style={{ width: `${item.value}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
