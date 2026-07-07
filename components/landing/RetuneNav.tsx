"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export function RetuneNav() {
    const router = useRouter();

    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference">
            <div className="flex items-center gap-4">
                <Link href="/" className="mono text-xs text-white opacity-60 hover:opacity-100 transition-opacity">
                    [ RETUNE V.1.0 ]
                </Link>
            </div>
            <div className="flex items-center gap-8">
                <span className="mono text-xs text-white opacity-60 hidden md:block">
                    SYSTEM: LISTENING
                </span>
                <button
                    onClick={() => router.push("/dashboard")}
                    className="retune-btn-primary"
                >
                    Initialize Dashboard
                </button>
            </div>
        </nav>
    );
}
