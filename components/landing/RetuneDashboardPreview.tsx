export function RetuneDashboardPreview() {
    return (
        <section id="dashboard-preview" className="min-h-[80vh] w-full flex items-center justify-center p-6 md:p-12 border-t border-slate-200 bg-white">
            <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center section-container group">
                <div>
                    <div className="mono text-xs text-slate-500 mb-6 flex items-center gap-2">
                        <span>[ 05 ]</span>
                        <div className="h-[1px] w-8 bg-slate-300"></div>
                        <span>INTERFACE</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #00bfff 0%, #00ffff 100%)' }}>
                        Command center.
                    </h2>
                    <p className="text-slate-600 text-lg leading-relaxed mb-8 max-w-md">
                        Direct access to your analytical tools. Track your academic validation history, monitor compliance scores, and review detailed issue breakdowns from a single, unified dashboard.
                    </p>
                </div>

                <div className="relative aspect-video bg-slate-50 active-card flex items-center justify-center overflow-hidden group-hover:bg-slate-100 transition-colors duration-500 border border-slate-200 p-4 md:p-8">
                    <div className="bracket-corner bl-tl border-slate-300"></div>
                    <div className="bracket-corner bl-tr border-slate-300"></div>
                    <div className="bracket-corner bl-br border-slate-300"></div>
                    <div className="bracket-corner bl-bl border-slate-300"></div>

                    <div className="w-full h-full border border-slate-200 rounded overflow-hidden bg-white flex flex-col hover:border-slate-300 transition-colors shadow-sm">
                        {/* Mockup UI of a Dashboard Header */}
                        <div className="w-full h-8 border-b border-slate-100 flex items-center px-4 gap-2 bg-slate-50">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                            <div className="ml-auto mono text-[8px] text-slate-500 border border-slate-200 bg-white px-2 rounded">REPORT_GUARD_ADMIN</div>
                        </div>

                        {/* Mockup UI Body */}
                        <div className="p-4 grid grid-cols-3 gap-4 h-full">
                            <div className="col-span-1 border border-slate-100 bg-slate-50 flex flex-col justify-center items-center gap-2 relative overflow-hidden group-hover:bg-slate-100 transition-colors">
                                <div className="absolute top-2 left-2 w-1 h-1 bg-slate-300 rounded-full"></div>
                                <div className="absolute bottom-2 right-2 w-1 h-1 bg-slate-300 rounded-full"></div>
                                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #00bfff 0%, #00ffff 100%)' }}>94<span className="text-lg text-[#00bfff] font-normal">%</span></div>
                                <div className="mono text-[8px] md:text-[10px] text-slate-400 mt-2">OVERALL_SCORE</div>
                            </div>
                            <div className="col-span-2 border border-slate-100 bg-slate-50 p-4 flex flex-col justify-center gap-4 relative">
                                <div className="w-full h-1 bg-slate-200 relative overflow-hidden"><div className="absolute top-0 left-0 h-full w-[94%] bg-sky-500"></div></div>
                                <div className="w-full h-1 bg-slate-200 relative overflow-hidden"><div className="absolute top-0 left-0 h-full w-[60%] bg-sky-400"></div></div>
                                <div className="w-full h-1 bg-slate-200 relative overflow-hidden"><div className="absolute top-0 left-0 h-full w-[85%] bg-sky-500"></div></div>
                                <div className="w-full h-1 bg-slate-200 relative overflow-hidden"><div className="absolute top-0 left-0 h-full w-[40%] bg-sky-300"></div></div>
                                <div className="mono text-[8px] md:text-[10px] text-slate-400 mt-auto right-0 text-right absolute bottom-4">METRICS_ANALYSIS_CHART</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
