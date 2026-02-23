"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useState } from "react";
import { FileUpload } from "@/components/dashboard/FileUpload";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewReportPage() {
    const [step, setStep] = useState(1);

    return (
        <main className="min-h-screen bg-[rgb(var(--background))]">
            <Header />

            <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto animate-fade-in">
                <Link href="/dashboard" className="inline-flex items-center gap-2 text-foreground/60 hover:text-blue-400 mb-8 transition-colors">
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
                    <div className="flex items-center gap-4 mb-4">
                        {/* Assuming 'step' is defined in the component's state or props */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-500'}`}>1</div>
                        <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-white/5'}`} />
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-500'}`}>2</div>
                        <div className={`h-1 flex-1 rounded-full ${step >= 3 ? 'bg-blue-600' : 'bg-white/5'}`} />
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-500'}`}>3</div>
                    </div>
                    <FileUpload />
                </div>
            </div>

            <Footer />
        </main>
    );
}
