"use client";

import { FileText, Zap, Shield, MessageSquare, Brain, Ghost } from "lucide-react";

export const StructuralValidationGraphic = () => (
    <div className="w-full h-full min-h-[192px] flex items-center justify-center relative overflow-hidden group/graphic bg-[#030308]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,127,0.08),transparent_60%)]"></div>

        <div className="relative w-24 h-24 flex items-center justify-center group-hover/bento:scale-110 transition-transform duration-700 ease-out z-10">
            {/* Outer dotted/dashed ring */}
            <svg className="absolute inset-0 w-full h-full text-pink-500/30 animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="10 5" />
            </svg>

            {/* Intense glowing inner ring */}
            <div className="absolute inset-2 rounded-full border-[2px] border-[#ff007f] shadow-[0_0_20px_#ff007f,inset_0_0_15px_#ff007f] opacity-80 group-hover/bento:opacity-100 group-hover/bento:shadow-[0_0_30px_#ff007f,inset_0_0_20px_#ff007f] transition-all duration-500"></div>

            {/* Center icon */}
            <div className="text-[#ff007f] drop-shadow-[0_0_10px_#ff007f] group-hover/bento:scale-110 transition-transform duration-300">
                <Ghost className="w-8 h-8" strokeWidth={1.5} />
            </div>
        </div>
        {/* Glow behind */}
        <div className="absolute top-1/2 left-10 w-24 h-24 bg-[#ff007f]/20 blur-[50px] -translate-y-1/2 pointer-events-none"></div>
    </div>
);

export const AIAnalysisGraphic = () => (
    <div className="w-full h-full min-h-[192px] flex items-center justify-center relative overflow-hidden group/graphic bg-[#030308]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(138,43,226,0.08),transparent_60%)]"></div>

        <div className="relative w-24 h-24 flex items-center justify-center group-hover/bento:scale-110 transition-transform duration-700 ease-out z-10">
            {/* Diagonal abstract square */}
            <div className="absolute inset-2 border-[2px] border-[#8a2be2] rotate-45 shadow-[0_0_20px_#8a2be2,inset_0_0_15px_#8a2be2] rounded-md opacity-80 group-hover/bento:rotate-[135deg] transition-transform duration-1000 ease-in-out"></div>

            {/* Inner rotating shapes */}
            <div className="absolute inset-4 border border-[#bf00ff]/50 rounded-full animate-[spin_4s_linear_infinite]"></div>

            <div className="text-[#bf00ff] drop-shadow-[0_0_10px_#bf00ff] z-10 group-hover/bento:scale-110 transition-transform duration-300">
                <Brain className="w-8 h-8" strokeWidth={1.5} />
            </div>
        </div>
        <div className="absolute top-1/2 right-10 w-24 h-24 bg-[#8a2be2]/20 blur-[50px] -translate-y-1/2 pointer-events-none"></div>
    </div>
);

export const RealTimeGraphic = () => (
    <div className="w-full h-full min-h-[192px] flex items-center justify-center relative overflow-hidden group/graphic bg-[#030308]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,243,255,0.08),transparent_60%)]"></div>

        <div className="relative w-24 h-24 flex items-center justify-center group-hover/bento:scale-110 transition-transform duration-700 ease-out z-10">
            {/* Split circles like a crosshair */}
            <div className="absolute inset-0 border-t-[2px] border-b-[2px] border-[#00f3ff] rounded-full shadow-[0_0_20px_#00f3ff,inset_0_0_15px_#00f3ff] opacity-80 group-hover/bento:-rotate-90 transition-transform duration-700"></div>

            {/* Center strike */}
            <div className="absolute w-[2px] h-32 bg-[#00f3ff] shadow-[0_0_15px_#00f3ff] -rotate-45 group-hover/bento:scale-y-125 transition-transform duration-700"></div>

            <div className="text-white drop-shadow-[0_0_10px_#ffffff] z-10 bg-[#030308] rounded-full p-2 border border-[#00f3ff]/50">
                <Zap className="w-6 h-6 text-[#00f3ff]" strokeWidth={2} />
            </div>
        </div>
        <div className="absolute top-10 left-1/2 w-24 h-24 bg-[#00f3ff]/20 blur-[50px] -translate-x-1/2 pointer-events-none"></div>
    </div>
);

export const StrictComplianceGraphic = () => (
    <div className="w-full h-full min-h-[192px] flex items-center justify-center relative overflow-hidden group/graphic bg-[#030308]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,94,0,0.08),transparent_60%)]"></div>

        <div className="relative w-24 h-24 flex items-center justify-center group-hover/bento:scale-110 transition-transform duration-700 ease-out z-10">
            {/* Geometric complex shield */}
            <svg className="absolute inset-0 w-full h-full text-[#ff5e00] drop-shadow-[0_0_15px_#ff5e00] opacity-80 group-hover/bento:scale-95 transition-transform duration-500" viewBox="0 0 100 100">
                <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="none" stroke="currentColor" strokeWidth="2" />
                <polygon points="50,20 80,35 80,65 50,80 20,65 20,35" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" className="animate-[spin_4s_linear_infinite_reverse]" style={{ transformOrigin: "50% 50%" }} />
            </svg>

            <div className="text-[#ff5e00] drop-shadow-[0_0_10px_#ff5e00] z-10">
                <Shield className="w-7 h-7" strokeWidth={1.5} />
            </div>
        </div>
        <div className="absolute bottom-10 left-1/2 w-24 h-24 bg-[#ff5e00]/20 blur-[50px] -translate-x-1/2 pointer-events-none"></div>
    </div>
);

export const ComplianceScoreGraphic = () => (
    <div className="w-full h-full min-h-[192px] flex items-center justify-center relative overflow-hidden group/graphic bg-[#030308]">
        {/* Holographic background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,243,255,0.1),transparent_70%)] group-hover/bento:bg-[radial-gradient(ellipse_at_center,rgba(191,0,255,0.15),transparent_70%)] transition-colors duration-1000"></div>

        <div className="relative flex flex-col items-center justify-center z-10 group-hover/bento:scale-110 transition-transform duration-700">
            {/* Holographic Glowing 98 */}
            <div className="relative">
                <h3 className="text-[5rem] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[#00f3ff] via-[#4800ff] to-[#ff007f] drop-shadow-[0_0_20px_rgba(0,243,255,0.5)] group-hover/bento:drop-shadow-[0_0_30px_rgba(255,0,127,0.7)] transition-all duration-700 select-none">
                    98
                </h3>
            </div>
            {/* Status indicators */}
            <div className="flex gap-4 mt-1">
                <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00f3ff] shadow-[0_0_10px_#00f3ff] animate-pulse"></div>
                    <span className="text-[10px] text-[#00f3ff] font-mono uppercase tracking-widest opacity-80">Score</span>
                </div>
            </div>
        </div>
    </div>
);

export const ChatbotGraphic = () => (
    <div className="w-full h-full min-h-[192px] flex items-center justify-center relative overflow-hidden group/graphic bg-[#030308]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,243,255,0.05),transparent_70%)]"></div>

        <div className="relative w-full h-full flex items-center justify-center z-10">
            {/* Cybernetic glowing line */}
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#00f3ff]/30 shadow-[0_0_15px_rgba(0,243,255,0.5)] -translate-y-1/2 scale-x-75 group-hover/bento:scale-x-[0.85] transition-transform duration-700 overflow-hidden">
                <div className="w-full h-full bg-[#00f3ff] animate-[translateX_1.5s_ease-in-out_infinite] translate-x-[-100%] shadow-[0_0_15px_#00f3ff]"></div>
            </div>

            <div className="flex items-center gap-12 relative z-10">
                {/* Node 1 */}
                <div className="w-10 h-10 rounded-full bg-[#030308] border-[2px] border-[#ff007f] shadow-[0_0_15px_#ff007f,inset_0_0_10px_#ff007f] flex items-center justify-center group-hover/bento:-translate-y-2 transition-transform duration-500 z-10">
                    <div className="w-2 h-2 rounded-full bg-[#ff007f] shadow-[0_0_8px_#ff007f]"></div>
                </div>

                {/* Node 2 */}
                <div className="w-14 h-14 rotate-45 bg-[#030308] border-[2px] border-[#00f3ff] shadow-[0_0_20px_#00f3ff,inset_0_0_15px_#00f3ff] flex items-center justify-center group-hover/bento:rotate-[225deg] transition-transform duration-1000 ease-in-out z-10">
                    <MessageSquare className="w-5 h-5 text-[#00f3ff] -rotate-45 group-hover/bento:rotate-[-225deg] transition-transform duration-1000 drop-shadow-[0_0_8px_#00f3ff]" strokeWidth={2} />
                </div>
            </div>
        </div>
        <div className="absolute bottom-10 inset-x-0 w-32 h-32 mx-auto bg-[#00f3ff]/10 blur-[60px] pointer-events-none"></div>
    </div>
);
