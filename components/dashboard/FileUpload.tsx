"use client";

import { useState, useCallback, useEffect } from "react";
import { Upload, FileText, AlertCircle, Loader2, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function FileUpload() {
    const router = useRouter();
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [scanCredits, setScanCredits] = useState<number | null>(null);
    const [creditsLoading, setCreditsLoading] = useState(true);

    // Fetch credits on mount
    useEffect(() => {
        fetch("/api/user/credits")
            .then(res => res.json())
            .then(data => setScanCredits(data.scanCredits ?? 0))
            .catch(() => setScanCredits(0))
            .finally(() => setCreditsLoading(false));
    }, []);

    const onDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const onDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const onDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        validateAndSetFile(droppedFile);
    }, []);

    const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            validateAndSetFile(e.target.files[0]);
        }
    };

    const validateAndSetFile = (file: File) => {
        setError(null);
        if (!file) return;

        const validTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
        if (!validTypes.includes(file.type)) {
            setError("Please upload a PDF or DOCX file.");
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            setError("File size must be less than 10MB.");
            return;
        }

        setFile(file);
    };

    const handleUpload = async () => {
        if (!file) return;

        setIsUploading(true);
        setError(null);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/analyze", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                if (res.status === 403) {
                    setScanCredits(0);
                }
                throw new Error(data.error || "Analysis failed");
            }

            if (data.status === "FAILED") {
                const violation = data.violations && data.violations.length > 0 ? data.violations[0] : null;
                const errorMessage = violation?.error || violation?.description || "Unknown error";
                alert(`Analysis Failed: ${errorMessage}`);
                router.push("/dashboard");
                router.refresh();
            } else {
                if (data.reportId) {
                    router.push(`/dashboard/reports/${data.reportId}`);
                } else {
                    router.push("/dashboard");
                    router.refresh();
                }
            }

        } catch (err: any) {
            console.error(err);
            setError(err.message || "Something went wrong during analysis.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="w-full mx-auto">
            {/* Credit status bar */}
            {!creditsLoading && scanCredits !== null && (
                <div className={`mb-4 p-3 flex items-center justify-between text-sm font-medium mono ${
                    scanCredits > 0
                        ? "bg-white/5 border border-white/10 text-white"
                        : "bg-amber-500/10 border border-amber-500/20 text-amber-400"
                }`}>
                    <span>{scanCredits > 0 ? `${scanCredits} scan${scanCredits > 1 ? "s" : ""} remaining` : "No scan credits remaining"}</span>
                    {scanCredits === 0 && (
                        <Link href="/dashboard/billing" className="px-3 py-1 bg-white text-black text-xs font-bold hover:bg-gray-200 transition-colors mono tracking-wider uppercase">
                            Buy Scans
                        </Link>
                    )}
                </div>
            )}

            {/* No credits overlay */}
            {!creditsLoading && scanCredits === 0 ? (
                <div className="border-2 border-dashed border-amber-500/30 p-12 text-center bg-amber-500/5">
                    <div className="flex flex-col items-center gap-4">
                        <div className="p-4 bg-amber-500/10 border border-amber-500/20">
                            <ShieldAlert className="w-8 h-8 text-amber-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">No Scan Credits</h3>
                            <p className="text-sm text-gray-500 mt-1 mb-4">Purchase a plan to start analyzing your reports.</p>
                            <Link href="/dashboard/billing" className="inline-flex px-6 py-2.5 bg-white text-black font-bold text-sm hover:bg-gray-200 transition-colors mono tracking-wider uppercase">
                                Buy a Plan
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (<>
            <div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className={`
                    border-2 border-dashed p-12 text-center transition-all cursor-pointer
                    ${isDragging
                        ? "border-white/40 bg-white/5 scale-[1.02]"
                        : "border-[#2a2a2a] hover:border-white/30 bg-[#050505] hover:bg-white/[0.02]"
                    }
                    ${file ? "border-green-500/40 bg-green-500/5" : ""}
                `}
            >
                <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept=".pdf,.docx"
                    onChange={onFileSelect}
                />

                <label htmlFor="file-upload" className="cursor-pointer block">
                    <div className="flex flex-col items-center gap-4">
                        {file ? (
                            <div className="p-4 bg-green-500/10 border border-green-500/20">
                                <FileText className="w-8 h-8 text-green-400" />
                            </div>
                        ) : (
                            <div className="p-4 bg-white/5 border border-white/10 mb-4 group-hover:scale-110 transition-transform duration-300">
                                <Upload className="w-8 h-8 text-white opacity-60" />
                            </div>
                        )}

                        <div>
                            {file ? (
                                <>
                                    <h3 className="text-lg font-bold text-green-400">{file.name}</h3>
                                    <p className="text-sm font-medium text-green-500/80 mt-1 mono">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </>
                            ) : (
                                <>
                                    <h3 className="text-lg font-bold text-white">Drag & Drop your report</h3>
                                    <p className="text-sm font-medium text-gray-500 mt-1 mono">
                                        or click to browse (PDF, DOCX)
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </label>
            </div>

            {error && (
                <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400">
                    <AlertCircle className="w-5 h-5" />
                    <p className="text-sm font-medium">{error}</p>
                </div>
            )}

            {file && !isUploading && (
                <button
                    onClick={handleUpload}
                    className="mt-6 w-full py-4 bg-white hover:bg-gray-200 font-bold text-black transition-colors flex items-center justify-center gap-2 mono text-xs tracking-wider uppercase"
                >
                    Start Analysis
                </button>
            )}

            {isUploading && (
                <div className="mt-6 p-4 bg-white/5 border border-white/10 flex items-center justify-center gap-3 text-white">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="font-bold text-sm mono">Analyzing document with AI...</span>
                </div>
            )}
            </>)}
        </div>
    );
}
