"use client";

import { useSession } from "next-auth/react";
import { User, Bell, Shield, Moon, Trash2, Key, Check, Copy } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { useState } from "react";

export default function SettingsPage() {
    const { data: session } = useSession();
    const [apiKey, setApiKey] = useState("sk_live_51M...");
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(apiKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <DashboardShell>
            <div className="max-w-4xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Settings</h1>
                    <p className="text-foreground/60 mt-2">Manage your account preferences and application settings.</p>
                </div>

                {/* Profile Section */}
                <section className="glass-card p-8 rounded-3xl space-y-6 animate-slide-up">
                    <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                        <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
                            <User className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Profile Information</h2>
                            <p className="text-sm text-foreground/60">Your personal account details</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground/80">Full Name</label>
                            <input
                                type="text"
                                value={session?.user?.name || "User"}
                                disabled
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground/60 cursor-not-allowed"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground/80">Email Address</label>
                            <input
                                type="email"
                                value={session?.user?.email || "user@example.com"}
                                disabled
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground/60 cursor-not-allowed"
                            />
                        </div>
                    </div>
                </section>

                {/* API Key Section (Pro Feature) */}
                <section className="glass-card p-8 rounded-3xl space-y-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                        <div className="p-3 bg-green-500/10 rounded-xl text-green-400">
                            <Key className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">API Access</h2>
                            <p className="text-sm text-foreground/60">Manage your API keys for external integration</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                            <div className="font-mono text-sm text-foreground/80">
                                {apiKey}
                            </div>
                            <button
                                onClick={handleCopy}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-foreground/60 hover:text-foreground"
                            >
                                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                            </button>
                        </div>
                        <p className="text-xs text-foreground/40">Only visible to you. Do not share this key.</p>
                    </div>
                </section>

                {/* Preferences Section */}
                <section className="glass-card p-8 rounded-3xl space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                        <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                            <Moon className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Preferences</h2>
                            <p className="text-sm text-foreground/60">Customize your interface</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium">Theme Mode</h3>
                                <p className="text-sm text-foreground/60">Toggle between light and dark themes</p>
                            </div>
                            <ThemeToggle />
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium">Email Notifications</h3>
                                <p className="text-sm text-foreground/60">Receive updates about your analysis</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                />
                                <div
                                    className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
                                ></div>
                            </label>
                        </div>
                    </div>
                </section>

                {/* Danger Zone */}
                <section className="border border-red-500/20 bg-red-500/5 p-8 rounded-3xl space-y-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                    <div className="flex items-center gap-4 border-b border-red-500/10 pb-6">
                        <div className="p-3 bg-red-500/10 rounded-xl text-red-500">
                            <Trash2 className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-red-400">Danger Zone</h2>
                            <p className="text-sm text-red-400/60">Irreversible actions</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                            <div className="flex items-center gap-3">
                                <Shield className="w-5 h-5 text-blue-500" />
                                <div>
                                    <p className="font-medium text-blue-200">Pro Plan Active</p>
                                    <p className="text-xs text-blue-200/60">Renews on Oct 12, 2025</p>
                                </div>
                            </div>
                            <button className="px-4 py-2 border border-blue-500/50 text-blue-400 rounded-lg hover:bg-blue-500/10 transition-colors">
                                Manage
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium text-red-400">Delete Account</h3>
                                <p className="text-sm text-red-400/60">Permanently remove your account and all data</p>
                            </div>
                            <button
                                onClick={async () => {
                                    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
                                        try {
                                            const res = await fetch("/api/user/delete", { method: "DELETE" });
                                            if (res.ok) {
                                                window.location.href = "/";
                                            } else {
                                                alert("Failed to delete account");
                                            }
                                        } catch (error) {
                                            alert("Something went wrong");
                                        }
                                    }
                                }}
                                className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-sm font-medium transition-colors"
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </DashboardShell>
    );
}
