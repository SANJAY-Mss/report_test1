import { FileText, BarChart, Clock, CheckCircle2, MoreVertical, Search, Bell } from "lucide-react";

export function DashboardPreview() {
    return (
        <div className="relative w-full max-w-5xl mx-auto">
            {/* Glow Effect behind dashboard */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-3xl rounded-3xl -z-10" />

            {/* Window Frame */}
            <div className="bg-[#0a0a0f]/90 backdrop-blur-xl border border-white/10 rounded-t-2xl shadow-2xl overflow-hidden ring-1 ring-white/5">
                {/* Fake Browser Toolbar */}
                <div className="h-10 border-b border-white/5 flex items-center px-4 gap-2 bg-white/[0.02]">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/20" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                        <div className="w-3 h-3 rounded-full bg-green-500/20" />
                    </div>
                    <div className="mx-auto w-1/3 h-5 bg-white/5 rounded-full flex items-center justify-center text-[10px] text-white/20 font-mono">
                        reportguard.ai/dashboard
                    </div>
                </div>

                {/* Dashboard Content */}
                <div className="relative glass-card border-white/10 overflow-hidden group">
                    {/* Dashboard UI Mockup */}
                    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Stats Cards */}
                        <div className="glass-card p-4 space-y-2 bg-black/40">
                            <div className="flex justify-between items-start">
                                <span className="text-xs text-white/50">Total Reports</span>
                                <FileText className="w-4 h-4 text-blue-400" />
                            </div>
                            <div className="text-2xl font-bold">12</div>
                        </div>
                        <div className="glass-card p-4 space-y-2 bg-black/40">
                            <div className="flex justify-between items-start">
                                <span className="text-xs text-white/50">Avg Score</span>
                                <BarChart className="w-4 h-4 text-cyan-400" />
                            </div>
                            <div className="text-2xl font-bold">85%</div>
                        </div>
                        <div className="glass-card p-4 space-y-2 bg-black/40">
                            <div className="flex justify-between items-start">
                                <span className="text-xs text-white/50">Pending</span>
                                <Clock className="w-4 h-4 text-yellow-400" />
                            </div>
                            <div className="text-2xl font-bold">3</div>
                        </div>

                        {/* Main Chart Area */}
                        <div className="md:col-span-2 glass-card p-4 h-48 flex items-end justify-between gap-2 bg-black/40">
                            {[40, 70, 45, 90, 60, 80, 55, 95].map((h, i) => (
                                <div
                                    key={i}
                                    className="w-full bg-gradient-to-t from-blue-500/20 to-blue-500/50 rounded-t-sm transition-all duration-500 group-hover:to-blue-400"
                                    style={{ height: `${h}%` }}
                                />
                            ))}
                        </div>

                        {/* Recent List */}
                        <div className="glass-card p-4 space-y-3 bg-black/40">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5">
                                    <div className="w-8 h-8 rounded bg-blue-500/10 flex items-center justify-center">
                                        <FileText className="w-4 h-4 text-blue-400" />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="w-20 h-2 bg-white/20 rounded" />
                                        <div className="w-12 h-1.5 bg-white/10 rounded" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                </div>
            </div>
        </div>
    );
}
