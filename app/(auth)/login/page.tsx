"use client";

import Link from "next/link";
import { useState } from "react";
import { Shield, Mail, Lock, ArrowRight, Github, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

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
        <main className="min-h-screen flex items-center justify-center relative overflow-hidden px-6">
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-[rgb(var(--background))]" />
                <div className="absolute top-0 left-0 w-full h-full dot-pattern opacity-20" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
            </div>

            <div className="w-full max-w-md animate-fade-in">
                <div className="glass-card p-8 rounded-2xl border border-white/10 relative overflow-hidden group">
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10 space-y-8">
                        {/* Header */}
                        <div className="text-center space-y-2">
                            <Link href="/" className="inline-flex items-center gap-2 group/logo mb-4">
                                <div className="p-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl group-hover/logo:shadow-glow-purple transition-all duration-300">
                                    <Shield className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-xl font-bold gradient-text">ReportGuard</span>
                            </Link>
                            <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
                            <p className="text-foreground/60">Sign in to continue to your dashboard</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground/80">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="student@annauniv.edu"
                                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 text-foreground placeholder:text-foreground/30 transition-all"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-foreground/80">Password</label>
                                    <Link href="/forgot-password" classNmae="text-xs text-purple-400 hover:text-purple-300 transition-colors">
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                                    <input
                                        name="password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 text-foreground placeholder:text-foreground/30 transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full btn-primary flex items-center justify-center gap-2 mt-6"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-white/10" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-[rgb(var(--background))] px-2 text-foreground/40">Or continue with</span>
                            </div>
                        </div>

                        {/* Social Login */}
                        <button
                            type="button"
                            onClick={() => signIn("google")}
                            className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center gap-2 transition-all group/github"
                        >
                            <Github className="w-5 h-5 text-foreground/80 group-hover/github:text-white transition-colors" />
                            <span className="text-foreground/80 group-hover/github:text-white transition-colors">Google (if configured)</span>
                        </button>

                        {/* Footer */}
                        <p className="text-center text-sm text-foreground/60">
                            Don't have an account?{" "}
                            <Link href="/signup" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
