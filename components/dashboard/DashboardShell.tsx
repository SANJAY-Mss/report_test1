"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "./Sidebar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-[rgb(var(--background))] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!session) {
        return null; // Will redirect
    }

    return (
        <div className="min-h-screen bg-[rgb(var(--background))]">
            <Header />
            <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-8">
                    <Sidebar />
                    <div className="flex-1 animate-fade-in">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
