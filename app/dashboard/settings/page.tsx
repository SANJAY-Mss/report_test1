"use client";

import { Header } from "@/components/layout/Header"; // This header is for landing page? Wait, dashboard should use Dashboard specific header or layout?
// The dashboard layout is manual.
import { ThemeToggle } from "@/components/ThemeToggle";
import { useSession } from "next-auth/react";
import { User, Bell, Shield, Moon, Sun, Trash2, LogOut } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
    const { data: session } = useSession();

    return (
        <main className="min-h-screen bg-[rgb(var(--background))] text-foreground">
            {/* Simple Dashboard Header */}
            <header className="border-b border-white/10 bg-white/5 backdrop-blur-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <div className="p-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-lg font-bold">ReportGuard</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <Link href="/api/auth/signout" className="text-sm font-medium hover:text-red-400 text-foreground/60 transition-colors">
                            Sign Out
                        </Link>
                    </div>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Settings</h1>
                    <p className="text-foreground/60 mt-2">Manage your account preferences and application settings.</p>
                </div>

                {/* Profile Section */}
                <section className="glass-card p-8 rounded-3xl space-y-6">
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

                {/* Preferences Section */}
                <section className="glass-card p-8 rounded-3xl space-y-6">
                    <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                        <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                            <Moon className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Appearance</h2>
                            <p className="text-sm text-foreground/60">Customize your interface</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium">Theme Mode</h3>
                            <p className="text-sm text-foreground/60">Toggle between light and dark themes</p>
                        </div>
                        <ThemeToggle />
                    </div>
                </section>

                {/* Danger Zone */}
                <section className="border border-red-500/20 bg-red-500/5 p-8 rounded-3xl space-y-6">
                    <div className="flex items-center gap-4 border-b border-red-500/10 pb-6">
                        <div className="p-3 bg-red-500/10 rounded-xl text-red-500">
                            <Trash2 className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-red-400">Danger Zone</h2>
                            <p className="text-sm text-red-400/60">Irreversible actions</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium text-red-400">Delete Account</h3>
                            <p className="text-sm text-red-400/60">Permanently remove your account and all data</p>
                        </div>
                        <button className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-sm font-medium transition-colors">
                            Delete Account
                        </button>
                    </div>
                </section>

            </div>
        </main>
    );
}
