import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { ArrowLeft, CheckCircle2, FileText, Download, Lightbulb } from "lucide-react";
import { ChatInterface } from "@/components/dashboard/ChatInterface";
import { IssueList } from "@/components/dashboard/IssueList";
import { ExportButton } from "@/components/dashboard/ExportButton";
import Link from "next/link";

interface PageProps {
    params: {
        id: string;
    }
}

export default async function ReportDetailPage({ params }: PageProps) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect("/login");
    }

    const report = await prisma.report.findUnique({
        where: {
            id: params.id,
        },
        include: {
            analysis: true,
        },
    });

    if (!report) {
        return <div className="p-8 text-center text-gray-500 bg-[#050505] min-h-screen">Report not found</div>;
    }

    if (report.userId !== session.user.id) {
        return <div className="p-8 text-center text-gray-500 bg-[#050505] min-h-screen">Unauthorized</div>;
    }

    const analysis = report.analysis;

    let violations = [];
    let suggestions = [];
    let metadata = {};

    try {
        if (analysis?.violations) violations = JSON.parse(analysis.violations);
        if (analysis?.suggestions) suggestions = JSON.parse(analysis.suggestions);
        if (analysis?.metadata) metadata = JSON.parse(analysis.metadata);
    } catch (e) {
        console.error("Failed to parse JSON", e);
    }

    const getOverallColor = (score: number) => {
        if (score >= 90) return "text-green-400";
        if (score >= 70) return "text-blue-400";
        return "text-amber-400";
    };

    const overallScore = analysis?.overallScore ?? 0;

    return (
        <main className="min-h-screen bg-[#050505] text-gray-100">
            <div className="pt-8 pb-12 px-6 max-w-7xl mx-auto space-y-8">
                {/* Top nav row: Back + Export */}
                <div className="flex items-center justify-between gap-4">
                    <Link href="/dashboard/reports" className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors bg-[#0a0a0a] border border-[#1a1a1a] hover:border-gray-500 px-4 py-2 mono text-xs tracking-wider uppercase">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Reports
                    </Link>
                    <ExportButton reportId={report.id} filename={report.filename} />
                </div>

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between bg-[#0a0a0a] border border-[#1a1a1a] p-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-white/20 to-transparent"></div>

                    <div className="flex items-center gap-5 relative z-10 mb-6 md:mb-0">
                        <div className="p-4 bg-white/5 border border-white/10 text-white">
                            <FileText className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white tracking-tight">{report.filename}</h1>
                            <p className="text-sm text-gray-500 mt-1 mono">Uploaded on {report.uploadedAt.toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 relative z-10 md:border-l md:border-[#1a1a1a] md:pl-8">
                        <div>
                            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-widest mb-1 mono">Overall Score</p>
                            <div className="flex items-baseline gap-1">
                                <span className={`text-5xl font-extrabold tracking-tight mono ${getOverallColor(overallScore)}`}>
                                    {overallScore}
                                </span>
                                <span className="text-xl text-gray-600 font-medium mono">/100</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scores Grid */}
                {analysis && (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        <ScoreCard label="Grammar" score={analysis.grammarScore} />
                        <ScoreCard label="Structure" score={analysis.structuralScore} />
                        <ScoreCard label="Formatting" score={analysis.formattingScore} />
                        <ScoreCard label="Clarity" score={(metadata as any).clarity || analysis.overallScore} />
                    </div>
                )}

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Violations / Issues */}
                    <div className="lg:col-span-2">
                        <IssueList violations={violations} reportId={report.id} />
                    </div>

                    {/* Suggestions / Sidebar */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <Lightbulb className="w-5 h-5 text-amber-400" />
                            Key Suggestions
                        </h2>
                        <div className="bg-[#0a0a0a] border border-[#1a1a1a] p-6">
                            {suggestions.length === 0 ? (
                                <p className="text-gray-500 text-sm">No specific suggestions at this time.</p>
                            ) : (
                                <ul className="space-y-4">
                                    {suggestions.map((tip: string | any, idx: number) => (
                                        <li key={idx} className="flex gap-3 items-start group">
                                            <div className="mt-1 flex-shrink-0 w-6 h-6 bg-amber-500/10 text-amber-400 flex items-center justify-center">
                                                <Lightbulb className="w-3 h-3" />
                                            </div>
                                            <span className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors">
                                                {typeof tip === 'string' ? tip : tip.suggestion || tip.description || "Improvement suggestion"}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ChatInterface reportId={report.id} />
        </main>
    );
}

function ScoreCard({ label, score }: { label: string; score: number }) {
    const getColor = (s: number) => {
        if (s >= 90) return "text-green-400";
        if (s >= 70) return "text-blue-400";
        return "text-amber-400";
    };

    return (
        <div className="bg-[#0a0a0a] border border-[#1a1a1a] p-6 relative overflow-hidden group hover:border-[#2a2a2a] transition-all">
            <div className="relative z-10">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 mono">{label}</p>
                <div className="flex items-end gap-1">
                    <span className={`text-4xl font-extrabold tracking-tight mono ${getColor(score)}`}>{score}</span>
                    <span className="text-sm font-medium text-gray-600 mb-1.5 mono">/100</span>
                </div>
            </div>
        </div>
    );
}
