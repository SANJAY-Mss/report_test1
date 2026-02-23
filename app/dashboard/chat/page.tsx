"use client";

import { useState, useRef, useEffect } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Bot, Send, User, Sparkles, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Hello! I'm your ReportGuard AI assistant. I can help you with formatting guidelines, grammar tips, or general academic writing questions. How can I assist you today?" }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages(prev => [...prev, { role: "user", content: userMessage }]);
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMessage,
                    history: messages.map(m => ({ role: m.role, content: m.content }))
                })
            });

            const data = await res.json();

            if (data.answer) {
                setMessages(prev => [...prev, { role: "assistant", content: data.answer }]);
            } else {
                setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I encountered an error processing your request." }]);
            }

        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I am having trouble connecting to the server right now." }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <DashboardShell>
            <div className="flex flex-col h-[calc(100vh-8rem)]">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                        <Bot className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">AI Chat Assistant</h1>
                        <p className="text-sm text-white/40">Powered by Gemini AI</p>
                    </div>
                </div>

                <div className="flex-1 bg-[#0a0a0f]/40 border border-white/5 rounded-2xl overflow-hidden flex flex-col relative">
                    {/* Chat Messages */}
                    <div
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
                    >
                        {messages.map((msg, i) => (
                            <div key={i} className={cn("flex gap-4 max-w-3xl", msg.role === "user" ? "ml-auto flex-row-reverse" : "")}>
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                    msg.role === "user" ? "bg-purple-500/20 text-purple-400" : "bg-blue-500/20 text-blue-400"
                                )}>
                                    {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                </div>
                                <div className={cn(
                                    "p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap",
                                    msg.role === "user"
                                        ? "bg-purple-500/10 text-white rounded-tr-none border border-purple-500/20"
                                        : "bg-white/5 text-white/80 rounded-tl-none border border-white/10"
                                )}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex gap-4 max-w-3xl">
                                <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 animate-pulse">
                                    <Sparkles className="w-4 h-4" />
                                </div>
                                <div className="p-4 rounded-2xl bg-white/5 text-white/80 rounded-tl-none border border-white/10 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100" />
                                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-[#0a0a0f] border-t border-white/10">
                        <div className="relative max-w-4xl mx-auto">
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask about report formatting, grammar rules, or general questions..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500/50 resize-none min-h-[50px] max-h-[150px]"
                                rows={1}
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || loading}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                        <p className="text-center text-xs text-white/20 mt-2">
                            AI formatting advice may vary. Always verify with your institution's specific guidelines.
                        </p>
                    </div>
                </div>
            </div>
        </DashboardShell>
    );
}
