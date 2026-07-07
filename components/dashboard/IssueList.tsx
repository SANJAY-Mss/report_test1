"use client";

import { useState } from "react";
import { AlertTriangle, MessageSquare, Send, Loader2, Bot, X, FileText, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface Issue {
    type?: string;
    severity?: string;
    description?: string;
    suggestion?: string;
    page?: string;
}

interface IssueListProps {
    violations: Issue[];
    reportId: string;
}

export function IssueList({ violations, reportId }: IssueListProps) {
    const [visibleCount, setVisibleCount] = useState(10);
    const [activeTab, setActiveTab] = useState<string>("All");

    // Inline Chat State
    const [chatIssueIdx, setChatIssueIdx] = useState<number | null>(null);
    const [chatInput, setChatInput] = useState("");
    const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'model', text: string }[]>([]);
    const [isChatting, setIsChatting] = useState(false);

    const showMore = () => {
        setVisibleCount((prev) => prev + 10);
    };

    const uniqueTypes = ["All", ...Array.from(new Set(violations.map(v => v.type || "other")))];

    const filteredViolations = activeTab === "All"
        ? violations
        : violations.filter(v => (v.type || "other") === activeTab);

    const handleAskAI = (idx: number, issue: Issue) => {
        if (chatIssueIdx === idx) {
            setChatIssueIdx(null);
        } else {
            setChatIssueIdx(idx);
            setChatHistory([{
                role: 'model',
                text: `I'm ready to help! What would you like to know about this issue:\n\n"${issue.description}"`
            }]);
            setChatInput(`Can you explain why this is an issue and how exactly I can fix it?`);
        }
    };

    const sendChatMessage = async () => {
        if (!chatInput.trim() || isChatting) return;

        const userMsg = chatInput;
        setChatInput("");
        setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
        setIsChatting(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    reportId,
                    message: userMsg
                })
            });
            const data = await res.json();
            if (data.answer) {
                setChatHistory(prev => [...prev, { role: 'model', text: data.answer }]);
            } else {
                setChatHistory(prev => [...prev, { role: 'model', text: "I'm sorry, I couldn't process that request right now." }]);
            }
        } catch (e) {
            setChatHistory(prev => [...prev, { role: 'model', text: "An error occurred while connecting to the AI." }]);
        } finally {
            setIsChatting(false);
        }
    };

    const getSeverityStyles = (severity?: string) => {
        switch (severity?.toLowerCase()) {
            case "critical": return "bg-red-500/10 text-red-400 border-red-500/20";
            case "high": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
            case "medium": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
            default: return "bg-blue-500/10 text-blue-400 border-blue-500/20";
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1a1a1a] pb-4">
                <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    Issues Found
                    <span className="bg-red-500/10 text-red-400 text-xs py-0.5 px-2.5 mono">{violations.length}</span>
                </h2>

                {uniqueTypes.length > 2 && (
                    <div className="flex flex-wrap gap-2">
                        {uniqueTypes.map((type) => (
                            <button
                                key={type}
                                onClick={() => { setActiveTab(type); setVisibleCount(10); setChatIssueIdx(null); }}
                                className={cn(
                                    "px-4 py-1.5 text-xs font-semibold capitalize transition-all border mono",
                                    activeTab === type
                                        ? "bg-white text-black border-white"
                                        : "bg-[#0a0a0a] text-gray-500 border-[#1a1a1a] hover:border-gray-500 hover:text-white"
                                )}
                            >
                                {type.replace("_", " ")}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {filteredViolations.length === 0 ? (
                <div className="bg-[#0a0a0a] border border-dashed border-[#2a2a2a] p-12 text-center">
                    <span className="text-gray-500 font-medium">{activeTab === "All" ? "No significant issues found. Great job!" : `No ${activeTab.replace("_", " ")} issues found.`}</span>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredViolations.slice(0, visibleCount).map((issue, idx) => (
                        <div key={idx} className="bg-[#0a0a0a] border border-[#1a1a1a] overflow-hidden transition-all group">
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
                                    <div className="flex gap-2 items-center">
                                        <span className={`px-2.5 py-1 text-xs font-bold capitalize border mono ${getSeverityStyles(issue.severity)}`}>
                                            {issue.severity || "Low"}
                                        </span>
                                        <span className="px-2.5 py-1 bg-white/5 text-gray-400 text-xs font-medium capitalize border border-white/10 mono">
                                            {issue.type?.replace("_", " ") || "Issue"}
                                        </span>
                                        {issue.page && (
                                            <span className="px-2.5 py-1 bg-white/5 text-gray-500 text-xs font-medium border border-white/10 flex items-center gap-1 mono">
                                                <FileText className="w-3 h-3" /> Pg. {issue.page}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <p className="text-gray-300 mb-4 text-sm leading-relaxed">{issue.description}</p>
                                
                                {issue.suggestion && (
                                    <div className="bg-amber-500/5 border border-amber-500/10 p-4 text-sm text-gray-400 mb-4 flex gap-3 items-start">
                                        <div className="text-amber-400 mt-0.5"><Lightbulb className="w-4 h-4" /></div>
                                        <div>
                                            <span className="font-semibold text-gray-300 block mb-1 text-xs uppercase tracking-wider mono">Suggestion</span>
                                            {issue.suggestion}
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex justify-end pt-2 border-t border-[#1a1a1a] mt-4">
                                    <button
                                        onClick={() => handleAskAI(idx, issue)}
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-2 text-xs font-semibold transition-all mono",
                                            chatIssueIdx === idx
                                                ? "bg-white/10 text-white"
                                                : "bg-[#0a0a0a] text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"
                                        )}
                                    >
                                        {chatIssueIdx === idx ? <X className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
                                        {chatIssueIdx === idx ? "Close Chat" : "Ask AI About This"}
                                    </button>
                                </div>
                            </div>

                            {/* Inline Chat Interface */}
                            {chatIssueIdx === idx && (
                                <div className="border-t border-[#1a1a1a] bg-[#050505] p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-8 h-8 bg-white/5 flex items-center justify-center border border-white/10">
                                            <Bot className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="text-sm font-bold text-white mono">Contextual AI Assistant</span>
                                    </div>

                                    <div className="space-y-4 mb-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                        {chatHistory.map((msg, i) => (
                                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                <div className={cn(
                                                    "max-w-[85%] p-3.5 text-sm font-medium transition-all",
                                                    msg.role === 'user'
                                                        ? "bg-white text-black"
                                                        : "bg-[#0a0a0a] text-gray-300 border border-[#1a1a1a]"
                                                )}>
                                                    <p className="whitespace-pre-wrap">{msg.text}</p>
                                                </div>
                                            </div>
                                        ))}
                                        {isChatting && (
                                            <div className="flex justify-start">
                                                <div className="bg-[#0a0a0a] border border-[#1a1a1a] p-3.5 flex items-center gap-3">
                                                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                                                    <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider mono">AI is analyzing...</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-2 relative mt-4">
                                        <input
                                            type="text"
                                            value={chatInput}
                                            onChange={(e) => setChatInput(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && sendChatMessage()}
                                            placeholder="Ask a question about this issue..."
                                            className="w-full bg-[#0a0a0a] border border-[#1a1a1a] pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-gray-500 transition-all text-white placeholder:text-gray-600 mono"
                                        />
                                        <button
                                            onClick={sendChatMessage}
                                            disabled={!chatInput.trim() || isChatting}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white hover:bg-gray-200 disabled:opacity-50 text-black transition-colors"
                                        >
                                            <Send className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    {visibleCount < filteredViolations.length && (
                        <button
                            onClick={showMore}
                            className="w-full py-3.5 mt-6 bg-[#0a0a0a] hover:bg-white/5 active:bg-white/10 transition-all border border-[#1a1a1a] text-center text-gray-400 font-semibold text-sm mono"
                        >
                            Show More ({filteredViolations.length - visibleCount} remaining)
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
