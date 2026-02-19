"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FileUpload } from "@/components/dashboard/FileUpload";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewReportPage() {
    return (
        <main className="min-h-screen bg-[rgb(var(--background))]">
            <Header />

            <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto animate-fade-in">
                <Link href="/dashboard" className="inline-flex items-center gap-2 text-foreground/60 hover:text-purple-400 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Dashboard
                </Link>

                <div className="text-center mb-12 space-y-4">
                    <h1 className="text-3xl md:text-4xl font-bold">
                        Upload Your Report
                    </h1>
                    <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
                        Supported formats: PDF, DOCX (Max 10MB). <br />
                        Our AI will analyze your document against Anna University standards.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto glass-card p-8 md:p-12 rounded-3xl">
                    <FileUpload />
                </div>
            </div>

            <Footer />
        </main>
    );
}
