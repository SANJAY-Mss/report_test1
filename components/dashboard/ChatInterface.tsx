"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Bot, User, Loader2, MessageSquare } from "lucide-react";

interface Message {
    id: string;
    role: "USER" | "ASSISTANT";
    content: string;
}

export function ChatInterface({ reportId }: { reportId: string }) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "USER",
            content: input
        };

        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ reportId, message: userMessage.content })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to send message");
            }

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "ASSISTANT",
                content: data.answer
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Chat Error:", error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "ASSISTANT",
                content: `Error: ${error instanceof Error ? error.message : "Unknown error"}`
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 p-4 bg-white hover:bg-gray-200 transition-all duration-300 z-50 group"
            >
                <MessageSquare className="w-6 h-6 text-black group-hover:scale-110 transition-transform" />
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-[#0a0a0a] border border-[#1a1a1a] flex flex-col z-50 animate-in slide-in-from-bottom-5">
                    {/* Header */}
                    <div className="p-4 border-b border-[#1a1a1a] flex items-center justify-between bg-[#050505]">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white leading-tight mono">Report Assistant</h3>
                                <p className="text-xs text-gray-500 font-medium mono">Ask about your report</p>
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#050505]">
                        {messages.length === 0 && (
                            <div className="text-center text-gray-500 mt-12">
                                <div className="w-16 h-16 bg-white/5 flex items-center justify-center mx-auto mb-4 border border-white/10">
                                    <Bot className="w-8 h-8 text-gray-500" />
                                </div>
                                <p className="text-sm font-medium mono">Hi! Ask me anything about your report.</p>
                            </div>
                        )}
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.role === "USER" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[80%] p-3.5 text-sm ${msg.role === "USER"
                                        ? "bg-white text-black"
                                        : "bg-[#0a0a0a] text-gray-300 border border-[#1a1a1a]"
                                        }`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-[#0a0a0a] p-3.5 border border-[#1a1a1a] flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                                    <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider mono">Thinking...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={sendMessage} className="p-4 border-t border-[#1a1a1a] bg-[#0a0a0a]">
                        <div className="flex items-center gap-2 relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your question..."
                                className="flex-1 bg-[#050505] border border-[#1a1a1a] pl-4 pr-12 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-gray-500 transition-all mono"
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-white text-black hover:bg-gray-200 transition-colors disabled:opacity-50"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}
