"use client";

import Link from "next/link";
import { useState } from "react";
import React from "react";
import { Shield, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { GridBackground, Spotlight } from "@/components/ui/Backgrounds";
import Orb from "@/components/ui/Orb";
import GhostCursor from "@/components/ui/GhostCursor";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                alert("Invalid email or password");
            } else {
                router.push("/dashboard");
                router.refresh();
            }
        } catch (error) {
            alert("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 bg-[#0f0f11]">
            {/* Thematic Backgrounds */}
            <div className="absolute inset-0 z-0 opacity-60">
                <Orb hoverIntensity={0.5} rotateOnHover={true} hue={0} forceHoverState={false} backgroundColor="#0f0f11" />
            </div>
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#2e1065_0%,_transparent_50%)] opacity-30" />
                <GridBackground />
                <Spotlight className="absolute -top-40 left-0 md:left-60 md:-top-20" fill="#8b5cf6" />
                <Spotlight className="absolute -bottom-40 right-0 md:-right-20 md:-bottom-20 opacity-50" fill="#ec4899" />
            </div>
            <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none" />

            {/* Ghost Cursor overlay */}
            <GhostCursor className="pointer-events-none" zIndex={0} />

            {/* Back to Home Link */}
            <Link href="/" className="absolute top-8 left-8 inline-flex items-center gap-2 group/logo z-20">
                <div className="p-2 glass-card rounded-xl border border-purple-500/30">
                    <Shield className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">ReportGuard</span>
            </Link>

            <div className="w-full max-w-[420px] animate-fade-in relative z-10">
                <Card variant="glass" className="border-purple-500/20 shadow-[0_0_40px_rgba(139,92,246,0.1)]">
                    <CardContent className="p-8 space-y-8">
                        {/* Header */}
                        <div className="text-center space-y-2">
                            <h1 className="text-3xl font-bold text-white tracking-tight" style={{ fontFamily: '"Creepster", cursive, sans-serif' }}>Welcome Back</h1>
                            <p className="text-sm text-gray-400">Sign in to uncover your report mysteries</p>
                        </div>

                        {/* Social Login */}
                        <button
                            type="button"
                            onClick={() => signIn("google")}
                            className="w-full py-3 glass-button rounded-xl border border-white/10 flex items-center justify-center gap-3 transition-all hover:bg-white/5 text-sm font-medium text-white"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.15v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.15C1.43 8.55 1 10.22 1 12s.43 3.45 1.15 4.93l3.69-2.84z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.15 7.07l3.69 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Sign in with Google
                        </button>

                        <div className="relative flex items-center py-2">
                            <div className="flex-grow border-t border-white/10"></div>
                            <span className="flex-shrink-0 mx-4 text-gray-500 text-xs tracking-wider uppercase">Or sign in with email</span>
                            <div className="flex-grow border-t border-white/10"></div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <div className="relative group">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="Email Address"
                                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 text-white placeholder:text-gray-500 transition-all text-sm input-glow"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-end pr-1 pb-1">
                                    <Link href="/forgot-password" className="text-xs text-purple-400 hover:text-pink-400 transition-colors">
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                                    <input
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 text-white placeholder:text-gray-500 transition-all text-sm input-glow"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] mt-6"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Footer */}
                        <div className="text-center text-sm text-gray-400 pt-4">
                            Not part of the coven?{" "}
                            <Link href="/signup" className="text-purple-400 hover:text-pink-400 font-medium transition-colors hover:underline">
                                Sign up now
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
