"use client";

import { Check, FileText, Search, Zap, Shield, Crown, MessageSquare, Brain } from "lucide-react";

export const StructuralValidationGraphic = () => (
    <div className="w-full h-full min-h-[192px] flex items-center justify-center p-4">
        <div className="relative w-3/4 h-3/4 bg-white/5 border border-white/10 rounded-lg p-3 flex flex-col gap-2 shadow-2xl skew-y-3 hover:skew-y-0 transition-all duration-500">
            <div className="h-2 w-1/3 bg-white/20 rounded mb-2"></div>
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Brain className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded"></div>
                </div>
            ))}
            <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-blue-500/20 backdrop-blur-md rounded-lg flex items-center justify-center border border-blue-500/30">
                <FileText className="w-6 h-6 text-blue-400" />
            </div>
        </div>
    </div>
);

export const AIAnalysisGraphic = () => (
    <div className="w-full h-full min-h-[192px] flex items-center justify-center relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-orange-500/5 rounded-xl pointer-events-none" />

        {/* Floating cards */}
        <div className="relative w-44 h-40">
            {/* Original Text Card - Behind */}
            <div className="absolute top-2 left-0 w-32 h-24 bg-[#0a0a0f] backdrop-blur-sm rounded-xl border border-white/10 p-3 transform -rotate-6 animate-[pulse_4s_ease-in-out_infinite] shadow-lg">
                <div className="h-2 w-16 bg-white/20 rounded mb-3" />
                <div className="space-y-2">
                    <div className="h-1 w-full bg-white/10 rounded" />
                    <div className="h-1 w-full bg-white/10 rounded" />
                    <div className="h-1 w-2/3 bg-white/10 rounded" />
                </div>
                <div className="absolute -right-2 -top-2 w-6 h-6 bg-red-500/20 rounded-full flex flex-col items-center justify-center border border-red-500/30">
                    <div className="w-1 h-2 bg-red-400 rounded-full mb-0.5" />
                    <div className="w-1 h-1 bg-red-400 rounded-full" />
                </div>
            </div>

            {/* AI Processed Card - Front */}
            <div className="absolute bottom-2 right-0 w-32 h-24 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl border border-pink-500/30 p-3 transform rotate-3 shadow-[0_4px_20px_rgba(236,72,153,0.15)] z-10 transition-transform hover:scale-105 duration-500">
                <div className="h-2 w-20 bg-gradient-to-r from-pink-400 to-orange-400 rounded mb-3" />
                <div className="space-y-2">
                    <div className="h-1 w-full bg-pink-400/40 rounded" />
                    <div className="h-1 w-full bg-pink-400/40 rounded" />
                    <div className="h-1 w-4/5 bg-pink-400/40 rounded" />
                </div>
                {/* AI Badge */}
                <div className="absolute -right-3 -top-3 w-8 h-8 bg-gradient-to-br from-pink-500 to-orange-500 rounded-xl shadow-[0_0_15px_rgba(236,72,153,0.5)] flex items-center justify-center">
                    <Brain className="w-4 h-4 text-white" />
                </div>
            </div>

            {/* Connecting magic dust */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-1.5 z-0">
                <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping shadow-[0_0_5px_#ec4899]" style={{ animationDuration: '2s' }} />
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping shadow-[0_0_5px_#f97316]" style={{ animationDuration: '2s', animationDelay: '300ms' }} />
                <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping shadow-[0_0_5px_#ec4899]" style={{ animationDuration: '2s', animationDelay: '600ms' }} />
            </div>
        </div>
    </div>
);

export const RealTimeGraphic = () => (
    <div className="w-full h-full min-h-[192px] flex flex-col items-center justify-center p-6 gap-4">
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 w-2/3 animate-[pulse_2s_ease-in-out_infinite]"></div>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/50 bg-white/5 px-3 py-1 rounded-full border border-white/10">
            <Zap className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span>Processing... 120ms</span>
        </div>
    </div>
);

export const StrictComplianceGraphic = () => (
    <div className="w-full h-full min-h-[192px] flex items-center justify-center p-4">
        <div className="relative w-full max-w-[200px] border-l border-b border-white/20 h-32 mx-auto">
            {/* Rulers */}
            <div className="absolute -left-3 top-0 bottom-0 flex flex-col justify-between py-2 text-[8px] text-white/30 font-mono">
                <span>0</span><span>5</span><span>10</span><span>15</span><span>20</span>
            </div>
            <div className="absolute bottom-[-14px] left-0 right-0 flex justify-between px-2 text-[8px] text-white/30 font-mono">
                <span>0</span><span>5</span><span>10</span><span>15</span><span>20</span>
            </div>

            <div className="space-y-2">
                <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-400" />
                    <div className="h-2 w-full bg-blue-500/30 rounded-full" />
                </div>
                <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-400" />
                    <div className="h-2 w-full bg-blue-500/30 rounded-full" />
                </div>
            </div>
            <div className="absolute top-2 right-2 px-2 py-0.5 bg-green-500/20 text-green-400 text-[10px] rounded border border-green-500/30">
                L: 30mm OK
            </div>
        </div>
    </div>
);

export const ComplianceScoreGraphic = () => (
    <div className="w-full h-full min-h-[192px] flex items-center justify-center">
        <div className="relative w-24 h-24 rounded-full border-4 border-white/10 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-t-cyan-500 border-r-blue-500 border-b-transparent border-l-transparent rotate-45"></div>
            <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-white">98</span>
                <span className="text-[9px] text-white/50 uppercase tracking-wider">Score</span>
            </div>
            <Crown className="absolute -top-1 right-0 w-4 h-4 text-yellow-400 fill-yellow-400 animate-bounce" />
        </div>
    </div>
);

export const ChatbotGraphic = () => (
    <div className="w-full h-full min-h-[192px] flex items-center justify-center p-4">
        <div className="flex flex-col gap-2 w-full max-w-[200px]">
            {/* User Message (Right) */}
            <div className="self-end bg-blue-500/40 p-2 rounded-2xl rounded-tr-none text-xs text-white max-w-[80%] border border-blue-500/30">
                Is my formatting correct?
            </div>
            {/* Bot Message (Left) */}
            <div className="self-start bg-white/10 p-2 rounded-2xl rounded-tl-none text-xs text-white/90 max-w-[80%] border border-white/5 flex gap-2 items-center">
                <MessageSquare className="w-3 h-3 text-cyan-400" />
                <span>Yes, margins are valid.</span>
            </div>
            {/* Validating/Typing (Left) */}
            <div className="self-start bg-white/5 w-12 h-6 rounded-full flex items-center justify-center gap-1">
                <div className="w-1 h-1 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1 h-1 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1 h-1 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
        </div>
    </div>
);
