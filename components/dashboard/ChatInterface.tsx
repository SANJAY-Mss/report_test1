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
                className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 group"
            >
                <MessageSquare className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-96 h-[600px] glass-card border border-white/10 rounded-2xl shadow-2xl flex flex-col z-50 animate-slide-up bg-black/80 backdrop-blur-xl">
                    {/* Header */}
                    <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5 rounded-t-2xl">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shrink-0">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">Report Assistant</h3>
                                <p className="text-xs text-white/60">Ask about your report</p>
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                        {messages.length === 0 && (
                            <div className="text-center text-white/40 mt-10">
                                <Bot className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">Hi! Ask me anything about your report.</p>
                            </div>
                        )}
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.role === "USER" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === "USER"
                                        ? "bg-blue-600 text-white rounded-br-none"
                                        : "bg-white/10 text-gray-200 rounded-bl-none border border-white/5"
                                        }`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white/10 p-3 rounded-2xl rounded-bl-none border border-white/5">
                                    <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={sendMessage} className="p-4 border-t border-white/10 bg-white/5 rounded-b-2xl">
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your question..."
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-blue-500 transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}
