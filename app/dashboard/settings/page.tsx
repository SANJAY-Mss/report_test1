"use client";

import { useSession } from "next-auth/react";
import { User, Moon, Trash2, Key, Check, Copy, Shield, Sun } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import React, { useState } from "react";

function SettingSection({
    icon: Icon,
    title,
    subtitle,
    children,
    danger = false,
}: {
    icon: React.ElementType<{ className?: string }>;
    title: string;
    subtitle: string;
    children: React.ReactNode;
    danger?: boolean;
}) {
    return (
        <div
            className={`bg-[#0a0a0a] border ${danger ? "border-red-500/20" : "border-[#1a1a1a]"
                } overflow-hidden`}
        >
            <div className="relative z-10">
                {/* Section header */}
                <div className={`flex items-center gap-4 px-6 py-5 border-b ${danger ? "border-red-500/20 bg-red-500/5" : "border-[#1a1a1a] bg-[#050505]"}`}>
                    <div className={`w-10 h-10 flex items-center justify-center shrink-0 border ${danger ? "bg-red-500/10 border-red-500/20 text-red-400" : "bg-white/5 border-white/10 text-white"}`}>
                        <Icon className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className={`text-base font-bold leading-tight ${danger ? "text-red-400" : "text-white"}`}>
                            {title}
                        </h2>
                        <p className="text-sm font-medium text-gray-500 mt-1">{subtitle}</p>
                    </div>
                </div>
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}

export default function SettingsPage() {
    const { data: session } = useSession();
    const [copied, setCopied] = useState(false);
    const apiKey = "sk_live_51M...";

    const handleCopy = () => {
        navigator.clipboard.writeText(apiKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <DashboardShell>
            <div className="space-y-8 max-w-3xl">
                {/* Page title */}
                <div>
                    <h1 className="text-2xl font-bold text-white leading-tight">Settings</h1>
                    <p className="text-sm font-medium text-gray-500 mt-1">
                        Manage your account preferences and application settings
                    </p>
                </div>

                {/* Profile */}
                <SettingSection icon={User} title="Profile Information" subtitle="Your personal account details">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { label: "Full Name", value: session?.user?.name || "User", type: "text" },
                            { label: "Email Address", value: session?.user?.email || "user@example.com", type: "email" },
                        ].map(({ label, value, type }) => (
                            <div key={label} className="space-y-2">
                                <label className="text-sm font-bold text-gray-400 block mono text-xs tracking-wider uppercase">{label}</label>
                                <input
                                    type={type}
                                    value={value}
                                    disabled
                                    className="w-full bg-[#050505] border border-[#1a1a1a] px-4 py-3 text-sm text-gray-400 cursor-not-allowed focus:outline-none mono"
                                />
                            </div>
                        ))}
                    </div>
                </SettingSection>

                {/* API Key */}
                <SettingSection icon={Key} title="API Access" subtitle="Your API key for external integrations">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between bg-[#050505] border border-[#1a1a1a] px-4 py-3">
                            <span className="font-mono text-sm text-gray-500 block truncate mr-4">{apiKey}</span>
                            <button
                                onClick={handleCopy}
                                className="p-2 border border-[#1a1a1a] hover:border-gray-500 hover:bg-white/5 transition-colors text-gray-500 hover:text-white shrink-0"
                            >
                                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                            </button>
                        </div>
                        <p className="text-xs font-medium text-gray-600 mono">
                            Only visible to you — do not share this key
                        </p>
                    </div>
                </SettingSection>

                {/* Preferences */}
                <SettingSection icon={Sun} title="Preferences" subtitle="Customize your interface">
                    <div className="space-y-6">
                        <div className="flex items-center justify-between border-b border-[#1a1a1a] pb-6">
                            <div>
                                <h3 className="text-sm font-bold text-white">Theme Mode</h3>
                                <p className="text-sm text-gray-500 mt-1">Toggle light / dark mode</p>
                            </div>
                            <ThemeToggle />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-bold text-white">Email Notifications</h3>
                                <p className="text-sm text-gray-500 mt-1">Receive analysis updates</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-[#1a1a1a] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-white/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white peer-checked:after:bg-black"></div>
                            </label>
                        </div>
                    </div>
                </SettingSection>

                {/* Danger Zone */}
                <SettingSection icon={Trash2} title="Danger Zone" subtitle="Irreversible actions" danger>
                    <div className="space-y-6">
                        {/* Subscription badge */}
                        <div className="flex items-center justify-between border border-[#1a1a1a] bg-[#050505] px-5 py-4">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-white/5 border border-white/10 shrink-0">
                                    <Shield className="w-5 h-5 text-gray-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white">Pro Plan Active</p>
                                    <p className="text-sm font-medium text-gray-500 mt-0.5">Renews on Oct 12, 2025</p>
                                </div>
                            </div>
                            <button className="px-5 py-2.5 border border-[#1a1a1a] text-sm font-medium text-gray-400 hover:text-white hover:border-gray-500 transition-colors mono text-xs tracking-wider uppercase">
                                Manage
                            </button>
                        </div>

                        {/* Delete account */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-bold text-white">Delete Account</h3>
                                <p className="text-sm font-medium text-gray-500 mt-1">
                                    Permanently remove your account and all data
                                </p>
                            </div>
                            <button
                                onClick={async () => {
                                    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
                                        try {
                                            const res = await fetch("/api/user/delete", { method: "DELETE" });
                                            if (res.ok) window.location.href = "/";
                                            else alert("Failed to delete account");
                                        } catch {
                                            alert("Something went wrong");
                                        }
                                    }
                                }}
                                className="px-5 py-2.5 bg-red-500/10 text-red-400 border border-red-500/20 text-sm font-bold hover:bg-red-600 hover:text-white transition-colors mono text-xs tracking-wider uppercase"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </SettingSection>
            </div>
        </DashboardShell>
    );
}
