import { Bot, Sparkles, Send, User } from "lucide-react";
import Link from "next/link";

export function ConnectWithAI() {
    return (
        <section className="py-24 px-6 bg-[#030308] relative overflow-hidden">
            {/* Subtle right glow */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(191,0,255,0.05),transparent_60%)] blur-[80px] pointer-events-none" />

            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Left Side: Text */}
                <div className="space-y-8 order-2 lg:order-1">
                    <div className="space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                            Connect with<br />AI Spirit Guide
                        </h2>
                        <p className="text-neutral-400 text-sm leading-relaxed max-w-md font-light">
                            Chat directly with your project. Ask context-aware questions about formatting rules, get rewriting suggestions for passive voice, and instantly locate missing citations without scrolling through 100 pages.
                        </p>
                    </div>

                    <Link href="/signup" className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#bf00ff]/50 bg-[#bf00ff]/10 hover:bg-[#bf00ff]/20 text-white font-medium text-sm transition-all duration-300 shadow-[0_0_20px_rgba(191,0,255,0.2)] hover:shadow-[0_0_30px_rgba(191,0,255,0.4)] group">
                        <Bot className="w-4 h-4 text-[#bf00ff] group-hover:animate-pulse" />
                        Try Spirit Guide
                        <Sparkles className="w-4 h-4 text-[#bf00ff] opacity-70 group-hover:opacity-100 transition-opacity" />
                    </Link>
                </div>

                {/* Right Side: Chat UI Mockup */}
                <div className="order-1 lg:order-2">
                    <div className="bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.5)] flex flex-col h-[400px]">

                        {/* Chat Header */}
                        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#0a0a0f]">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#bf00ff] to-[#00f3ff] p-[1px]">
                                    <div className="w-full h-full bg-[#0a0a0f] rounded-full flex items-center justify-center">
                                        <Bot className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-white text-sm font-semibold">Spirit Guide</h3>
                                    <p className="text-[10px] text-[#00f3ff] animate-pulse">Online</p>
                                </div>
                            </div>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 p-6 space-y-6 overflow-y-auto w-full">

                            {/* User Message */}
                            <div className="flex justify-end">
                                <div className="max-w-[80%] bg-[#bf00ff]/20 border border-[#bf00ff]/30 text-white text-sm px-4 py-3 rounded-2xl rounded-tr-sm">
                                    Hey, is my margin okay for the 1st page?
                                </div>
                                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center ml-2 mt-auto shrink-0">
                                    <User className="w-3 h-3 text-white/70" />
                                </div>
                            </div>

                            {/* Bot Message */}
                            <div className="flex justify-start">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#bf00ff] to-[#00f3ff] flex items-center justify-center mr-2 mt-auto shrink-0">
                                    <Bot className="w-3 h-3 text-white" />
                                </div>
                                <div className="max-w-[80%] bg-white/5 border border-white/10 text-neutral-300 text-sm px-4 py-3 rounded-2xl rounded-tl-sm leading-relaxed">
                                    Hmm, let me look at that. It looks like it is 0.5 inches on the left. Anna University requires 1.5 inches for binding.
                                    <div className="mt-3 p-2 bg-red-500/10 border border-red-500/20 rounded flex items-center gap-2 text-red-400 text-xs">
                                        <Sparkles className="w-3 h-3" /> Fix automatically?
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Chat Input */}
                        <div className="p-4 border-t border-white/10 bg-[#0a0a0f]">
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    placeholder="Ask about your report..."
                                    className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#bf00ff]/50 transition-colors"
                                    disabled
                                />
                                <button className="absolute right-2 p-2 bg-[#bf00ff] rounded-full text-white hover:bg-[#a600e6] transition-colors" disabled>
                                    <Send className="w-3 h-3 ml-[1px]" />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
