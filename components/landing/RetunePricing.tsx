import Link from "next/link";

export function RetunePricing() {
    return (
        <section id="pricing" className="min-h-[80vh] w-full flex items-center justify-center p-6 md:p-12 border-t border-slate-200 bg-white">
            <div className="w-full max-w-7xl section-container">
                <div className="mb-16 text-center flex flex-col items-center">
                    <div className="mono text-xs text-slate-500 mb-6 flex items-center gap-2">
                        <div className="h-[1px] w-8 bg-slate-300 hidden md:block"></div>
                        <span>[ 06 ] ACCESS_TIERS</span>
                        <div className="h-[1px] w-8 bg-slate-300 hidden md:block"></div>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #00bfff 0%, #00ffff 100%)' }}>
                        Clear Metrics. Transparent Pricing.
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Basic Tier */}
                    <div className="relative p-8 md:p-12 bg-slate-50 border border-slate-200 flex flex-col">
                        <h3 className="mono text-sm text-slate-500 mb-2">TIER_01 : BASIC</h3>
                        <div className="text-5xl font-bold mb-6 text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #00bfff 0%, #00ffff 100%)' }}>₹0<span className="text-lg text-[#00bfff] font-normal">/mo</span></div>
                        <p className="text-sm text-slate-600 mb-8 pb-8 border-b border-slate-200">Standard academic validation.</p>
                        <ul className="space-y-4 mb-12 flex-grow mono text-xs text-slate-500">
                            <li className="flex justify-between border-b border-slate-200 pb-2"><span>Limit</span> <span>3 Reports/mo</span></li>
                            <li className="flex justify-between border-b border-slate-200 pb-2"><span>Score Depth</span> <span>Basic Metrics</span></li>
                            <li className="flex justify-between border-b border-slate-200 pb-2"><span>Issue Analysis</span> <span>Highlighted</span></li>
                        </ul>
                        <Link href="/dashboard" className="retune-btn-primary w-full text-center block text-slate-700 border-slate-300 hover:bg-slate-100">
                            Current Active Plan
                        </Link>
                    </div>

                    {/* Pro Tier */}
                    <div className="relative p-8 md:p-12 bg-white active-card border border-sky-400 flex flex-col group hover:bg-slate-50 transition-colors duration-500 shadow-md">
                        <div className="bracket-corner bl-tl border-sky-400"></div>
                        <div className="bracket-corner bl-tr border-sky-400"></div>
                        <div className="bracket-corner bl-br border-sky-400"></div>
                        <div className="bracket-corner bl-bl border-sky-400"></div>

                        <div className="absolute top-4 right-4 mono text-[10px] text-white bg-sky-500 px-2 py-1 font-bold">RECOMMENDED</div>

                        <h3 className="mono text-sm text-sky-500 mb-2">TIER_02 : PRO_VALIDATOR</h3>
                        <div className="text-5xl font-bold mb-6 text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #00bfff 0%, #00ffff 100%)' }}>₹99<span className="text-lg text-[#00bfff] font-normal">/mo</span></div>
                        <p className="text-sm text-slate-600 mb-8 pb-8 border-b border-slate-200">Unlimited high-fidelity analysis.</p>
                        <ul className="space-y-4 mb-12 flex-grow mono text-xs text-slate-700">
                            <li className="flex justify-between border-b border-slate-200 pb-2"><span>Limit</span> <span className="text-slate-900">Unlimited</span></li>
                            <li className="flex justify-between border-b border-slate-200 pb-2"><span>Score Depth</span> <span className="text-slate-900">Granular Analysis</span></li>
                            <li className="flex justify-between border-b border-slate-200 pb-2"><span>Inline AI Chat</span> <span className="text-slate-900">Uncapped Context</span></li>
                        </ul>
                        <Link href="/dashboard" className="bg-sky-500 text-white py-3 px-6 mono text-xs uppercase tracking-widest hover:bg-sky-600 transition-colors cursor-pointer w-full text-center font-bold block shadow-sm border border-sky-600">
                            Upgrade System
                        </Link>
                    </div>

                    {/* Department Tier */}
                    <div className="relative p-8 md:p-12 bg-slate-50 border border-slate-200 flex flex-col">
                        <h3 className="mono text-sm text-slate-500 mb-2">TIER_03 : DEPARTMENT</h3>
                        <div className="text-5xl font-light text-slate-900 mb-6">Custom</div>
                        <p className="text-sm text-slate-600 mb-8 pb-8 border-b border-slate-200">Bulk college-level checking (100-1000 at a time).</p>
                        <ul className="space-y-4 mb-12 flex-grow mono text-xs text-slate-500">
                            <li className="flex justify-between border-b border-slate-200 pb-2"><span>Limit</span> <span>Batch Processing</span></li>
                            <li className="flex justify-between border-b border-slate-200 pb-2"><span>Score Depth</span> <span>Institutional Analytics</span></li>
                            <li className="flex justify-between border-b border-slate-200 pb-2"><span>Admin Panel</span> <span>Full Access</span></li>
                        </ul>
                        <Link href="/contact" className="retune-btn-primary w-full text-center block text-slate-700 border-slate-300 hover:bg-slate-100">
                            Contact Sales
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
