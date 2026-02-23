"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center p-6 text-center">
            <div className="max-w-md space-y-4">
                <div className="mx-auto w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-red-500" />
                </div>
                <h2 className="text-xl font-bold">Something went wrong!</h2>
                <p className="text-foreground/60 text-sm">
                    {error.message || "An unexpected error occurred."}
                </p>
                <button
                    onClick={() => reset()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Try again
                </button>
            </div>
        </div>
    );
}
