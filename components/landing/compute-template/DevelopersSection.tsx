"use client";

import Image from "next/image";
import { useState } from "react";

export function DevelopersSection() {
    const [activeTab, setActiveTab] = useState("typescript");

    return (
        <section className="py-32 lg:py-48 bg-black border-t border-white/5 relative overflow-hidden">
            <div className="absolute top-1/2 left-0 w-full h-[500px] bg-[#9e98fa]/5 blur-[120px] -translate-y-1/2 pointer-events-none"></div>
            
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                    <div className="lg:w-1/2">
                        <span className="inline-block text-white/50 font-mono text-xs mb-6 uppercase tracking-wider">
                            [ DEVELOPERS ]
                        </span>
                        <h2 className="text-4xl lg:text-6xl font-display text-white mb-6">Built for developers.</h2>
                        <p className="text-white/60 font-sans text-lg mb-10 max-w-xl">
                            Integrate autonomous agents into your existing applications with just a few lines of code using our SDKs.
                        </p>
                        
                        <div className="rounded-2xl border border-white/10 bg-[#0A0A0A] overflow-hidden mb-12">
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-[#111]">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-white/20"></div>
                                    <div className="w-3 h-3 rounded-full bg-white/20"></div>
                                    <div className="w-3 h-3 rounded-full bg-white/20"></div>
                                </div>
                                <div className="ml-4 flex gap-4">
                                    <button 
                                        className={`text-xs font-mono transition-colors ${activeTab === "typescript" ? "text-white" : "text-white/40 hover:text-white/70"}`}
                                        onClick={() => setActiveTab("typescript")}
                                    >
                                        agent.ts
                                    </button>
                                    <button 
                                        className={`text-xs font-mono transition-colors ${activeTab === "python" ? "text-white" : "text-white/40 hover:text-white/70"}`}
                                        onClick={() => setActiveTab("python")}
                                    >
                                        agent.py
                                    </button>
                                </div>
                            </div>
                            <div className="p-6 overflow-x-auto">
                                {activeTab === "typescript" ? (
                                    <pre className="text-sm font-mono text-white/80 leading-relaxed">
                                        <code>
<span className="text-[#eca8d6]">import</span> {'{ Compute }'} <span className="text-[#eca8d6]">from</span> <span className="text-[#9e98fa]">'@compute/sdk'</span>;{'\n\n'}
<span className="text-[#eca8d6]">const</span> compute = <span className="text-[#eca8d6]">new</span> Compute({'{'}{'\n'}
{'  '}apiKey: process.env.COMPUTE_API_KEY,{'\n'}
{'}'});{'\n\n'}
<span className="text-white/40">// Initialize an autonomous agent</span>{'\n'}
<span className="text-[#eca8d6]">const</span> agent = <span className="text-[#eca8d6]">await</span> compute.agents.create({'{'}{'\n'}
{'  '}name: <span className="text-[#9e98fa]">'Data Analyst'</span>,{'\n'}
{'  '}tools: [<span className="text-[#9e98fa]">'postgres'</span>, <span className="text-[#9e98fa]">'slack'</span>],{'\n'}
{'  '}permissions: {'{'}{'\n'}
{'    '}network: <span className="text-[#79cdf9]">true</span>,{'\n'}
{'    '}filesystem: <span className="text-[#79cdf9]">false</span>{'\n'}
{'  '}{'}'}{'\n'}
{'}'});{'\n\n'}
<span className="text-white/40">// Execute a complex task</span>{'\n'}
<span className="text-[#eca8d6]">const</span> result = <span className="text-[#eca8d6]">await</span> agent.execute({'{'}{'\n'}
{'  '}prompt: <span className="text-[#9e98fa]">'Analyze Q3 revenue and send a summary to #exec-team'</span>{'\n'}
{'}'});
                                        </code>
                                    </pre>
                                ) : (
                                    <pre className="text-sm font-mono text-white/80 leading-relaxed">
                                        <code>
<span className="text-[#eca8d6]">from</span> compute <span className="text-[#eca8d6]">import</span> Compute{'\n\n'}
compute = Compute(api_key=os.environ[<span className="text-[#9e98fa]">'COMPUTE_API_KEY'</span>]){'\n\n'}
<span className="text-white/40"># Initialize an autonomous agent</span>{'\n'}
agent = compute.agents.create({'\n'}
{'    '}name=<span className="text-[#9e98fa]">'Data Analyst'</span>,{'\n'}
{'    '}tools=[<span className="text-[#9e98fa]">'postgres'</span>, <span className="text-[#9e98fa]">'slack'</span>],{'\n'}
{'    '}permissions={'{'}{'\n'}
{'        '}<span className="text-[#9e98fa]">'network'</span>: <span className="text-[#79cdf9]">True</span>,{'\n'}
{'        '}<span className="text-[#9e98fa]">'filesystem'</span>: <span className="text-[#79cdf9]">False</span>{'\n'}
{'    '}{'}'}{'\n'}
){'\n\n'}
<span className="text-white/40"># Execute a complex task</span>{'\n'}
result = agent.execute({'\n'}
{'    '}prompt=<span className="text-[#9e98fa]">'Analyze Q3 revenue and send a summary to #exec-team'</span>{'\n'}
)
                                        </code>
                                    </pre>
                                )}
                            </div>
                        </div>

                        <a href="#" className="inline-flex items-center gap-2 text-sm font-mono text-white/70 hover:text-white transition-colors group">
                            Read the documentation
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </a>
                    </div>

                    <div className="lg:w-1/2">
                        <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-white/10 group">
                            <Image 
                                src="/v0-assets/developers-upscaled-13.png" 
                                alt="Abstract visualization of code structure" 
                                fill
                                className="object-cover opacity-70 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            
                            <div className="absolute bottom-8 left-8 right-8">
                                <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6">
                                    <h4 className="text-white font-display text-xl mb-2">CLI Tooling</h4>
                                    <p className="text-white/60 font-sans text-sm mb-4">Deploy, monitor, and debug your agents directly from your terminal.</p>
                                    <div className="bg-black/60 rounded border border-white/5 p-3 flex items-center justify-between">
                                        <code className="text-xs font-mono text-white/80">npm install -g @compute/cli</code>
                                        <button className="text-white/40 hover:text-white transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
