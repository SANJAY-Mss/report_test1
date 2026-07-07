"use client";

import Image from "next/image";

export function SecuritySection() {
    return (
        <section id="security" className="py-32 lg:py-48 bg-black border-t border-white/5">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="text-center mb-24">
                    <span className="inline-block text-white/50 font-mono text-xs mb-6 uppercase tracking-wider">
                        [ SECURITY ]
                    </span>
                    <h2 className="text-4xl lg:text-6xl font-display text-white mb-6">Autonomous, not uncontrolled.</h2>
                    <p className="text-white/60 font-sans max-w-2xl mx-auto text-lg">
                        Enterprise-grade security controls ensure your agents operate strictly within the boundaries you define.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-20">
                    <div className="group rounded-3xl bg-white/[0.02] border border-white/5 p-8 lg:p-12 overflow-hidden hover:bg-white/[0.04] transition-colors duration-500">
                        <div className="mb-12">
                            <h3 className="text-2xl font-display text-white mb-4">Isolated execution</h3>
                            <p className="text-white/60 font-sans">
                                Every agent runs in its own ephemeral, firewalled sandbox. No shared state, no cross-contamination.
                            </p>
                        </div>
                        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black/50 border border-white/10">
                            <Image 
                                src="/v0-assets/isolated.jpg" 
                                alt="Isolated execution environment" 
                                fill
                                className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700 group-hover:scale-105"
                            />
                        </div>
                    </div>

                    <div className="group rounded-3xl bg-white/[0.02] border border-white/5 p-8 lg:p-12 overflow-hidden hover:bg-white/[0.04] transition-colors duration-500">
                        <div className="mb-12">
                            <h3 className="text-2xl font-display text-white mb-4">End-to-end encryption</h3>
                            <p className="text-white/60 font-sans">
                                Data is encrypted in transit and at rest. Keys are managed via AWS KMS with regular rotation policies.
                            </p>
                        </div>
                        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black/50 border border-white/10">
                            <Image 
                                src="/v0-assets/encrypted.jpg" 
                                alt="Encrypted data flow" 
                                fill
                                className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700 group-hover:scale-105"
                            />
                        </div>
                    </div>

                    <div className="group rounded-3xl bg-white/[0.02] border border-white/5 p-8 lg:p-12 overflow-hidden hover:bg-white/[0.04] transition-colors duration-500">
                        <div className="mb-12">
                            <h3 className="text-2xl font-display text-white mb-4">Comprehensive audit logs</h3>
                            <p className="text-white/60 font-sans">
                                Every action, API call, and reasoning step is logged immutably for compliance and debugging.
                            </p>
                        </div>
                        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black/50 border border-white/10">
                            <Image 
                                src="/v0-assets/audit.jpg" 
                                alt="Audit log interface" 
                                fill
                                className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700 group-hover:scale-105"
                            />
                        </div>
                    </div>

                    <div className="group rounded-3xl bg-white/[0.02] border border-white/5 p-8 lg:p-12 overflow-hidden hover:bg-white/[0.04] transition-colors duration-500">
                        <div className="mb-12">
                            <h3 className="text-2xl font-display text-white mb-4">Granular permissions</h3>
                            <p className="text-white/60 font-sans">
                                Apply RBAC to agents. Restrict tools, domains, and operations based on organizational roles.
                            </p>
                        </div>
                        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black/50 border border-white/10">
                            <Image 
                                src="/v0-assets/permissions.jpg" 
                                alt="Permission controls" 
                                fill
                                className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700 group-hover:scale-105"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-6 lg:gap-12">
                    <div className="px-6 py-3 rounded-full border border-white/10 bg-white/[0.02] text-sm font-mono text-white/70">
                        SOC 2 Type II
                    </div>
                    <div className="px-6 py-3 rounded-full border border-white/10 bg-white/[0.02] text-sm font-mono text-white/70">
                        ISO 27001
                    </div>
                    <div className="px-6 py-3 rounded-full border border-white/10 bg-white/[0.02] text-sm font-mono text-white/70">
                        HIPAA Compliant
                    </div>
                    <div className="px-6 py-3 rounded-full border border-white/10 bg-white/[0.02] text-sm font-mono text-white/70">
                        GDPR Ready
                    </div>
                </div>
            </div>
        </section>
    );
}
