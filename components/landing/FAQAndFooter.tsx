import { ChevronDown, Sparkles } from "lucide-react";
import Link from "next/link";

export function FAQAndFooter() {
    return (
        <section id="faq" className="bg-[#030308] border-t border-white/5 pt-24 pb-12 px-6 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(0,243,255,0.05),transparent_60%)] blur-[80px] pointer-events-none" />

            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 relative z-10 space-y-24">

                {/* FAQ Section */}
                <div className="max-w-4xl mx-auto w-full">
                    <h2 className="text-3xl font-bold text-white mb-10">FAQ</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                        {[
                            "What is ProjectTracker?",
                            "How do I install the rulesets?",
                            "Who is eligible to participate in ProjectTracker?",
                            "What types of formats are supported?",
                            "What makes you different?",
                            "How can I contact customer support?",
                        ].map((q, i) => (
                            <div key={i} className="flex items-center justify-between py-4 border-b border-white/10 group cursor-pointer hover:border-white/30 transition-colors">
                                <span className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors">{i + 1}. {q}</span>
                                <ChevronDown className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Section */}
                <div className="pt-20 border-t border-white/5 grid grid-cols-1 md:grid-cols-4 gap-12">

                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1 space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-gradient-to-br from-[#ff5e00] to-[#ff007f] rounded-lg">
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-lg font-bold text-white tracking-tight">
                                ProjectTracker
                            </span>
                        </div>
                        <p className="text-xs text-neutral-500 leading-relaxed pr-4">
                            The ultimate academic portfolio marker for your master's thesis tracking validation environments.
                        </p>
                        <div className="flex items-center gap-3 pt-2">
                            <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-[10px] text-neutral-500 hover:bg-white/5 hover:text-white transition-all cursor-pointer">in</div>
                            <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-[10px] text-neutral-500 hover:bg-white/5 hover:text-white transition-all cursor-pointer">X</div>
                            <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-[10px] text-neutral-500 hover:bg-white/5 hover:text-white transition-all cursor-pointer">git</div>
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="font-semibold text-white mb-4 text-sm">Product</h3>
                        <ul className="space-y-3 text-xs text-neutral-500">
                            <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Integrations</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Changelog</Link></li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="font-semibold text-white mb-4 text-sm">Company</h3>
                        <ul className="space-y-3 text-xs text-neutral-500">
                            <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Contact Support</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-semibold text-white mb-4 text-sm">Stay Updated</h3>
                        <p className="text-xs text-neutral-500 mb-4">
                            Get tips on academic writing and tool updates.
                        </p>
                        <div className="flex items-center">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="bg-[#0a0a0f] border border-white/10 text-white text-xs rounded-l-md px-3 py-2 w-full focus:outline-none focus:border-white/30 transition-colors"
                            />
                            <button className="bg-[#ff5e00] hover:bg-[#ff7526] text-white px-3 py-2 rounded-r-md transition-colors flex items-center justify-center">
                                <ChevronDown className="w-4 h-4 -rotate-90" />
                            </button>
                        </div>
                    </div>

                </div>

                <div className="pt-8 text-center">
                    <p className="text-[10px] text-neutral-600">
                        &copy; 2024 ProjectTracker Inc. All rights reserved.
                    </p>
                </div>

            </div>
        </section>
    );
}
