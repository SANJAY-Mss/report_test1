"use client";

import { useState, useCallback } from "react";
import { Upload, FileText, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function FileUpload() {
    const router = useRouter();
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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

        if (file.size > 10 * 1024 * 1024) { // 10MB limit
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
                throw new Error(data.error || "Analysis failed");
            }

            // Redirect to results page (or showing results inline)
            // For now, let's assume we redirect to a results view or just show alert
            if (data.status === "FAILED") {
                const violation = data.violations && data.violations.length > 0 ? data.violations[0] : null;
                const errorMessage = violation?.error || violation?.description || "Unknown error";
                // Check if data.violations contains the system error we added in gemini-client
                alert(`Analysis Failed: ${errorMessage}`);
            } else {
                alert("Analysis Complete! Score: " + (data.scores?.overall || 0));
            }
            router.push("/dashboard");
            router.refresh();

        } catch (err: any) {
            console.error(err);
            setError(err.message || "Something went wrong during analysis.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className={`
                    border-2 border-dashed rounded-3xl p-12 text-center transition-all cursor-pointer
                    ${isDragging
                        ? "border-purple-500 bg-purple-500/10 scale-[1.02]"
                        : "border-white/10 hover:border-purple-500/50 hover:bg-white/5"
                    }
                    ${file ? "border-green-500/50 bg-green-500/5" : ""}
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
                            <div className="p-4 bg-green-500/10 rounded-full">
                                <FileText className="w-8 h-8 text-green-500" />
                            </div>
                        ) : (
                            <div className="p-4 bg-purple-500/10 rounded-full">
                                <Upload className="w-8 h-8 text-purple-400" />
                            </div>
                        )}

                        <div>
                            {file ? (
                                <>
                                    <h3 className="text-xl font-bold text-green-400">{file.name}</h3>
                                    <p className="text-sm text-foreground/60 mt-1">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </>
                            ) : (
                                <>
                                    <h3 className="text-xl font-bold">Drag & Drop your report</h3>
                                    <p className="text-sm text-foreground/60 mt-1">
                                        or click to browse (PDF, DOCX)
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </label>
            </div>

            {error && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400">
                    <AlertCircle className="w-5 h-5" />
                    <p className="text-sm">{error}</p>
                </div>
            )}

            {file && !isUploading && (
                <button
                    onClick={handleUpload}
                    className="mt-6 w-full btn-primary flex items-center justify-center gap-2"
                >
                    Start Analysis
                </button>
            )}

            {isUploading && (
                <div className="mt-6 p-4 glass-card rounded-xl flex items-center justify-center gap-3 text-purple-400">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="font-medium">Analyzing document with AI...</span>
                </div>
            )}
        </div>
    );
}
