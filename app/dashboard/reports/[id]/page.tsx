import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { ArrowLeft, CheckCircle2, AlertTriangle, Lightbulb, FileText, Download } from "lucide-react";
import { ChatInterface } from "@/components/dashboard/ChatInterface";
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
        return <div className="p-8 text-center">Report not found</div>;
    }

    if (report.userId !== session.user.id) {
        return <div className="p-8 text-center">Unauthorized</div>;
    }

    const analysis = report.analysis;

    // Parse JSON strings
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

    return (
        <main className="min-h-screen bg-[rgb(var(--background))]">
            <Header />
            <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto space-y-8">
                {/* Back Button */}
                <Link href="/dashboard" className="inline-flex items-center text-foreground/60 hover:text-foreground transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                </Link>

                {/* Header Section */}
                <div className="flex items-center justify-between glass-card p-6 rounded-2xl">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl">
                            <FileText className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">{report.filename}</h1>
                            <p className="text-foreground/60">Uploaded on {report.uploadedAt.toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                            {analysis?.overallScore ?? 0}/100
                        </div>
                        <p className="text-sm text-foreground/60">Overall Score</p>
                    </div>
                </div>

                {/* Scores Grid */}
                {analysis && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <ScoreCard label="Grammar" score={analysis.grammarScore} color="text-green-400" bg="bg-green-500/10" />
                        <ScoreCard label="Structure" score={analysis.structuralScore} color="text-blue-400" bg="bg-blue-500/10" />
                        <ScoreCard label="Formatting" score={analysis.formattingScore} color="text-orange-400" bg="bg-orange-500/10" />
                        <ScoreCard label="Clarity" score={(metadata as any).clarity || 0} color="text-pink-400" bg="bg-pink-500/10" />
                    </div>
                )}

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Violations / Issues */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-yellow-400" />
                            Issues Found
                        </h2>
                        {violations.length === 0 ? (
                            <div className="glass-card p-6 rounded-xl text-center text-foreground/60">
                                No significant issues found. Great job!
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {violations.map((issue: any, idx: number) => (
                                    <div key={idx} className="glass-card p-6 rounded-xl border-l-4 border-yellow-500/50">
                                        <div className="flex items-start justify-between mb-2">
                                            <span className="px-2 py-1 bg-yellow-500/10 text-yellow-400 text-xs rounded-full uppercase tracking-wider font-bold">
                                                {issue.type || "Issue"}
                                            </span>
                                            <span className="text-xs text-foreground/40 uppercase">{issue.severity}</span>
                                        </div>
                                        <p className="text-foreground/80 mb-3">{issue.description}</p>
                                        <div className="bg-white/5 p-3 rounded-lg text-sm text-foreground/70">
                                            <span className="font-bold text-green-400">Suggestion: </span>
                                            {issue.suggestion}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Suggestions / Sidebar */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Lightbulb className="w-5 h-5 text-blue-400" />
                            Improvement Tips
                        </h2>
                        <div className="glass-card p-6 rounded-xl space-y-4">
                            {suggestions.length === 0 ? (
                                <p className="text-foreground/60">No specific suggestions.</p>
                            ) : (
                                <ul className="space-y-4">
                                    {suggestions.map((tip: any, idx: number) => (
                                        <li key={idx} className="flex gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                            <span className="text-sm text-foreground/80">
                                                {typeof tip === 'string' ? tip : tip.description || "Improvement suggestion"}
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

function ScoreCard({ label, score, color, bg }: { label: string; score: number; color: string; bg: string }) {
    return (
        <div className="glass-card p-6 rounded-xl text-center">
            <h3 className={`text-2xl font-bold ${color} mb-1`}>{score}%</h3>
            <p className="text-sm text-foreground/60">{label}</p>
        </div>
    );
}
