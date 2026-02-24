import Link from "next/link";
import { Hero } from "@/components/landing/Hero";
import { Welcome } from "@/components/landing/Welcome";
import { Statistics } from "@/components/landing/Statistics";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { CTA } from "@/components/landing/CTA";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
    return (
        <main className="min-h-screen">
            {/* Animated Background */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute inset-0 bg-[rgb(var(--background))]" />
                <div className="absolute top-0 left-0 w-full h-full dot-pattern opacity-20" />

                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" />
                <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-fuchsia-600/10 rounded-full blur-[100px] mix-blend-screen animate-pulse-slow delay-1000" />
                <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow delay-2000" />
            </div>

            <Header />
            <div className="w-full flex-col">
                <Hero />
                <Welcome />
                <Statistics />
                <Features />
                <HowItWorks />
                <CTA />
            </div>
            <Footer />
        </main>
    );
}
