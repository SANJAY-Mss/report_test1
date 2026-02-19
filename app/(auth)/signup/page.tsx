"use client";

import Link from "next/link";
import { useState } from "react";
import { Shield, Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            alert("Account created! Please sign in.");
            router.push("/login");
        } catch (error: any) {
            alert(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 py-12">
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-[rgb(var(--background))]" />
                <div className="absolute top-0 left-0 w-full h-full dot-pattern opacity-20" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
            </div>

            <div className="w-full max-w-md animate-fade-in mt-16 md:mt-0">
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
                            <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
                            <p className="text-foreground/60">Join thousands of students optimizing their reports</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground/80">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                                    <input
                                        name="name"
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 text-foreground placeholder:text-foreground/30 transition-all"
                                        required
                                    />
                                </div>
                            </div>

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
                                <label className="text-sm font-medium text-foreground/80">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                                    <input
                                        name="password"
                                        type="password"
                                        placeholder="Create a password"
                                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 text-foreground placeholder:text-foreground/30 transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground/80">Confirm Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                                    <input
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Confirm your password"
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
                                        Get Started
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Footer */}
                        <p className="text-center text-sm text-foreground/60">
                            Already have an account?{" "}
                            <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
