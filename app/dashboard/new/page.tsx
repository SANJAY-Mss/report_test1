"use client";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { FileUpload } from "@/components/dashboard/FileUpload";
import { ArrowLeft, Upload, FileText, Zap } from "lucide-react";
import Link from "next/link";

export default function NewReportPage() {
    return (
        <DashboardShell>
            <div className="space-y-8 pb-12">
                {/* Back link */}
                <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors bg-[#0a0a0a] border border-[#1a1a1a] hover:border-gray-500 px-4 py-2 mono text-xs tracking-wider uppercase"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Dashboard
                </Link>

                {/* Page header */}
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold text-white leading-tight">
                        New Report Analysis
                    </h1>
                    <p className="text-sm font-medium text-gray-500">
                        Upload a PDF or DOCX file (Max 10 MB). Your report will be analyzed against Anna University standards.
                    </p>
                </div>

                {/* Info strip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { icon: Upload, label: "Supported Formats", value: "PDF, DOCX" },
                        { icon: FileText, label: "Max File Size", value: "10 MB" },
                        { icon: Zap, label: "Analysis Time", value: "30 – 60 sec" },
                    ].map(({ icon: Icon, label, value }, idx) => (
                        <div
                            key={idx}
                            className="bg-[#0a0a0a] border border-[#1a1a1a] p-5 flex items-center gap-4"
                        >
                            <div className="flex-shrink-0 w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center">
                                <Icon className="w-6 h-6 text-white opacity-70" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mono">{label}</p>
                                <p className="text-base font-bold text-white mt-0.5">{value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Upload card */}
                <div className="bg-[#0a0a0a] border border-[#1a1a1a] overflow-hidden">
                    <div className="p-8">
                        <FileUpload />
                    </div>
                </div>

                {/* Step guide */}
                <div className="bg-[#0a0a0a] border border-[#1a1a1a] overflow-hidden">
                    <div className="p-6 md:p-8">
                        <h2 className="text-sm font-bold text-gray-400 border-b border-[#1a1a1a] pb-4 mb-6 mono uppercase tracking-wider">
                            How it works
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { step: "1", title: "Prepare Document", desc: "Save your report as .PDF or .DOCX. Ensure file size is under 10 MB." },
                                { step: "2", title: "Upload & Analyze", desc: "Drop the file into the upload zone. Our AI will automatically scan it." },
                                { step: "3", title: "Review & Export", desc: "Inspect issues, ask questions to the AI, and export a polished version." },
                            ].map(({ step, title, desc }) => (
                                <div key={step} className="flex gap-4 items-start">
                                    <div className="flex-shrink-0 w-8 h-8 bg-white/10 text-white font-bold flex items-center justify-center text-sm mono">
                                        {step}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-white mb-1">{title}</h3>
                                        <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardShell>
    );
}
