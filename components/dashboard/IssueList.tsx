"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";

interface Issue {
    type?: string;
    severity?: string;
    description?: string;
    suggestion?: string;
    page?: string;
}

interface IssueListProps {
    violations: Issue[];
}

export function IssueList({ violations }: IssueListProps) {
    const [visibleCount, setVisibleCount] = useState(10);

    const showMore = () => {
        setVisibleCount((prev) => prev + 10);
    };

    return (
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
                    {violations.slice(0, visibleCount).map((issue, idx) => (
                        <div key={idx} className="glass-card p-6 rounded-xl border-l-4 border-yellow-500/50">
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex gap-2 items-center">
                                    <span className="px-2 py-1 bg-yellow-500/10 text-yellow-400 text-xs rounded-full uppercase tracking-wider font-bold">
                                        {issue.type || "Issue"}
                                    </span>
                                    {issue.page && (
                                        <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full font-semibold">
                                            Pg. {issue.page}
                                        </span>
                                    )}
                                </div>
                                <span className="text-xs text-foreground/40 uppercase">{issue.severity}</span>
                            </div>
                            <p className="text-foreground/80 mb-3">{issue.description}</p>
                            <div className="bg-white/5 p-3 rounded-lg text-sm text-foreground/70">
                                <span className="font-bold text-green-400">Suggestion: </span>
                                {issue.suggestion}
                            </div>
                        </div>
                    ))}

                    {visibleCount < violations.length && (
                        <button
                            onClick={showMore}
                            className="w-full py-3 mt-6 bg-white/5 hover:bg-white/10 active:bg-white/20 transition-all border border-white/10 text-center text-purple-400 hover:text-purple-300 font-semibold rounded-xl"
                        >
                            Show More ({violations.length - visibleCount} remaining)
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
