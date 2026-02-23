import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full animate-pulse" />
                <div className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin" />
                <div className="absolute inset-4 border-4 border-t-cyan-500 rounded-full animate-spin-slow" />
            </div>
            <div className="mt-8 text-xl font-medium text-blue-400 animate-pulse">
                Loading ReportGuard...
            </div>
        </div>
    );
}
