import Link from "next/link";
import { Hero } from "@/components/landing/Hero";
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

                {/* Glowing Orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
            </div>

            <Header />
            <Hero />
            <Features />
            <HowItWorks />
            <CTA />
            <Footer />
        </main>
    );
}
