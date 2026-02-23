import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center p-6 text-center">
            <div className="max-w-md space-y-6">
                <div className="mx-auto w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center animate-bounce">
                    <AlertTriangle className="w-8 h-8 text-yellow-500" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Page Not Found</h2>
                    <p className="text-foreground/60">
                        The page you are looking for doesn't exist or has been moved.
                    </p>
                </div>
                <Link
                    href="/"
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-pink-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                >
                    Return Home
                </Link>
            </div>
        </div>
    );
}
