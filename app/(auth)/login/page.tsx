"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import React from "react";
import { Mail, Lock, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            router.replace("/dashboard");
        }
    }, [status, router]);

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
        <main className="min-h-screen flex items-center justify-center relative bg-[#050505] selection:bg-cyan-500/30 px-4 py-12">

            {/* Logo linking to home */}
            <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 z-20 group">
                <span className="font-bold text-sm text-white tracking-wider group-hover:text-cyan-400 transition-colors">
                    [ REPORTGUARD V.1.0 ]
                </span>
            </Link>

            <div className="w-full max-w-md animate-fade-in relative z-10">
                <div className="bg-[#0a0a0a] border border-[#1a1a1a] shadow-2xl p-8 sm:p-10 flex flex-col items-center hover:border-[#2a2a2a] transition-colors">

                    <div className="w-12 h-12 bg-white/5 text-cyan-400 flex items-center justify-center mb-6 border border-white/10">
                        <Lock className="w-5 h-5" />
                    </div>

                    <div className="text-center mb-8 w-full">
                        <h1 className="text-xl font-bold text-white mb-2 tracking-widest uppercase mono">Welcome Back</h1>
                        <p className="text-xs text-gray-500 mono uppercase tracking-wider">Access your secure dashboard</p>
                    </div>

                    <button
                        type="button"
                        onClick={() => signIn("google")}
                        className="w-full py-3 px-4 bg-[#050505] border border-[#1a1a1a] text-white font-bold mono text-xs tracking-widest uppercase flex items-center justify-center gap-3 hover:bg-white/5 transition-colors mb-6"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.15v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.15C1.43 8.55 1 10.22 1 12s.43 3.45 1.15 4.93l3.69-2.84z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.15 7.07l3.69 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Sign in with Google
                    </button>

                    <div className="relative flex items-center w-full mb-6">
                        <div className="flex-grow border-t border-[#1a1a1a]"></div>
                        <span className="flex-shrink-0 mx-4 text-gray-600 text-[10px] uppercase font-bold mono tracking-widest">Or Secure Login</span>
                        <div className="flex-grow border-t border-[#1a1a1a]"></div>
                    </div>

                    <form onSubmit={handleSubmit} className="w-full space-y-5 text-left">
                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mono">Email address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/50" />
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 text-white placeholder-gray-600 font-mono text-sm transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mono">Password</label>
                                <Link href="/forgot-password" className="text-[10px] font-bold text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-widest mono">
                                    Lost details?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/50" />
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 text-white placeholder-gray-600 font-mono text-sm transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 mt-2 bg-white text-black font-bold uppercase tracking-wider mono hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-3 text-sm"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    AUTHENTICATING...
                                </>
                            ) : (
                                'INITIATE SESSION'
                            )}
                        </button>
                    </form>

                    <div className="text-center text-[11px] font-bold text-gray-600 mt-8 mono uppercase tracking-widest">
                        New Node?{" "}
                        <Link href="/signup" className="text-cyan-400 hover:text-cyan-300 transition-colors ml-1">
                            Establish Connection
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
