"use client";

import { useState, useRef, useEffect } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Bot, Send, User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Hello! I'm your Project Tracker AI assistant. I can help you with formatting guidelines, grammar tips, or general academic writing questions. How can I assist you today?" }
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
            <div className="flex flex-col h-[calc(100vh-8rem)] max-w-5xl mx-auto space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-white leading-tight">AI Chat Assistant</h1>
                    <p className="text-sm font-medium text-gray-500 mt-1 mono">Powered by Gemini AI</p>
                </div>

                <div className="flex-1 bg-[#0a0a0a] border border-[#1a1a1a] relative group flex flex-col overflow-hidden">
                    {/* Chat Messages */}
                    <div
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar bg-[#050505] relative z-10"
                    >
                        {messages.map((msg, i) => (
                            <div key={i} className={cn("flex gap-6 max-w-4xl", msg.role === "user" ? "ml-auto flex-row-reverse" : "")}>
                                <div className={cn(
                                    "w-10 h-10 flex items-center justify-center shrink-0 border",
                                    msg.role === "user" ? "bg-white border-white text-black" : "bg-white/5 border-white/10 text-white"
                                )}>
                                    {msg.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                                </div>
                                <div className={cn(
                                    "p-5 text-sm leading-relaxed whitespace-pre-wrap",
                                    msg.role === "user"
                                        ? "bg-white text-black"
                                        : "bg-[#0a0a0a] text-gray-300 border border-[#1a1a1a]"
                                )}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex gap-6 max-w-4xl">
                                <div className="w-10 h-10 bg-white/5 border border-white/10 text-white flex items-center justify-center shrink-0 animate-pulse">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <div className="p-5 bg-[#0a0a0a] text-gray-500 border border-[#1a1a1a] flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" />
                                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-100" />
                                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-200" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-6 border-t border-[#1a1a1a] bg-[#0a0a0a] relative z-10">
                        <div className="relative max-w-5xl mx-auto flex items-end gap-4">
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask about report formatting or grammar rules..."
                                className="w-full bg-[#050505] border border-[#1a1a1a] py-4 pl-5 pr-14 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-gray-500 resize-none min-h-[56px] max-h-[150px] transition-all mono"
                                rows={1}
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || loading}
                                className="absolute right-3 bottom-3 p-2.5 bg-white text-black hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                        <p className="text-center text-xs font-medium text-gray-600 mt-4 mono">
                            Always verify with your institution's specific guidelines.
                        </p>
                    </div>
                </div>
            </div>
        </DashboardShell>
    );
}
