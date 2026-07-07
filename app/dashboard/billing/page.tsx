"use client";

import React, { useEffect, useState } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { CreditCard, Tag, FileText, ShieldCheck, Zap, MessageSquare, ShoppingCart } from "lucide-react";
import { useRazorpay } from "@/hooks/useRazorpay";

function BillingSection({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) {
    return (
        <section className="space-y-4">
            <h2 className="text-sm font-bold text-gray-400 border-b border-[#1a1a1a] pb-3 mb-4 flex items-center gap-2 mono uppercase tracking-wider">
                <Icon className="w-5 h-5 text-gray-500" />
                {title}
            </h2>
            <div className="bg-[#0a0a0a] border border-[#1a1a1a] overflow-hidden">
                <div className="p-6 md:p-8">{children}</div>
            </div>
        </section>
    );
}

interface Credits {
    scanCredits: number;
    chatCredits: number;
}

interface PaymentRecord {
    id: string;
    planName: string;
    amount: number;
    scansAdded: number;
    chatsAdded: number;
    status: string;
    createdAt: string;
}

export default function BillingPage() {
    const [credits, setCredits] = useState<Credits | null>(null);
    const [payments, setPayments] = useState<PaymentRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const { buyPlan, isProcessing, error } = useRazorpay();

    useEffect(() => {
        async function fetchData() {
            try {
                const [creditsRes, paymentsRes] = await Promise.all([
                    fetch("/api/user/credits"),
                    fetch("/api/user/payments"),
                ]);

                if (creditsRes.ok) {
                    setCredits(await creditsRes.json());
                }
                if (paymentsRes.ok) {
                    setPayments(await paymentsRes.json());
                }
            } catch (err) {
                console.error("Failed to load billing data:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <DashboardShell>
            <div className="max-w-4xl max-h-screen space-y-8 pb-24 mx-auto md:mx-0">
                <div>
                    <h1 className="text-2xl font-bold text-white leading-tight">Billing & Credits</h1>
                    <p className="text-sm font-medium text-gray-500 mt-1 mb-8">Manage your scan credits and purchase history</p>
                </div>

                {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 text-sm text-red-400">
                        {error}
                    </div>
                )}

                <div className="space-y-12">
                    {/* Current Credits */}
                    <BillingSection title="Your Credits" icon={Tag}>
                        {loading ? (
                            <div className="flex items-center justify-center py-8">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="flex items-center gap-4 p-5 bg-white/5 border border-white/10">
                                    <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center">
                                        <Zap className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mono">Scans Remaining</p>
                                        <p className="text-3xl font-bold text-white mono">{credits?.scanCredits ?? 0}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-5 bg-white/5 border border-white/10">
                                    <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center">
                                        <MessageSquare className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mono">AI Chats Remaining</p>
                                        <p className="text-3xl font-bold text-white mono">{credits?.chatCredits ?? 0}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </BillingSection>

                    {/* Buy More */}
                    <BillingSection title="Buy More Scans" icon={ShoppingCart}>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {[
                                { name: "STARTER", label: "Starter", price: "₹49", scans: "1 Scan", chats: "5 Chats" },
                                { name: "PRO", label: "Pro", price: "₹89", scans: "2 Scans", chats: "10 Chats" },
                                { name: "PREMIUM", label: "Premium", price: "₹179", scans: "4 Scans", chats: "25 Chats" },
                            ].map((plan) => (
                                <div key={plan.name} className="p-5 border border-[#1a1a1a] hover:border-[#2a2a2a] transition-colors">
                                    <h4 className="text-sm font-bold text-white mb-1 mono">{plan.label}</h4>
                                    <p className="text-2xl font-bold text-white mb-3 mono">{plan.price}</p>
                                    <div className="space-y-1 text-xs text-gray-500 mb-4 mono">
                                        <p>+ {plan.scans}</p>
                                        <p>+ {plan.chats}</p>
                                    </div>
                                    <button
                                        onClick={() => buyPlan(plan.name)}
                                        disabled={isProcessing}
                                        className="w-full py-2 text-sm font-bold text-black bg-white hover:bg-gray-200 transition-colors disabled:opacity-50 mono text-xs tracking-wider uppercase"
                                    >
                                        {isProcessing ? "Processing..." : "Buy Now"}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </BillingSection>

                    {/* Payment History */}
                    <BillingSection title="Payment History" icon={FileText}>
                        {loading ? (
                            <div className="flex items-center justify-center py-8">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                            </div>
                        ) : payments.length === 0 ? (
                            <p className="text-sm text-gray-500 text-center py-8 mono">No payment history yet. Purchase a plan to get started!</p>
                        ) : (
                            <div className="space-y-3">
                                {payments.map((payment) => (
                                    <div key={payment.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-[#1a1a1a] bg-[#050505] gap-4 sm:gap-0">
                                        <div className="flex items-center gap-4">
                                            <div className={`hidden sm:flex p-2 border ${payment.status === "PAID" ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"}`}>
                                                <ShieldCheck className={`w-4 h-4 ${payment.status === "PAID" ? "text-green-400" : "text-red-400"}`} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white">{payment.planName} Plan</p>
                                                <p className="text-sm font-medium text-gray-500 mono">
                                                    {new Date(payment.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                                    {" · "}+{payment.scansAdded} scans, +{payment.chatsAdded} chats
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between sm:justify-end gap-4">
                                            <p className="text-sm font-bold text-white mono">₹{(payment.amount / 100).toFixed(0)}</p>
                                            <span className={`px-2.5 py-1 text-xs font-bold border mono ${payment.status === "PAID" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"}`}>
                                                {payment.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </BillingSection>
                </div>
            </div>
        </DashboardShell>
    );
}
