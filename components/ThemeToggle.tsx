"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? (
                <Sun className="w-5 h-5 text-blue-400" />
            ) : (
                <Moon className="w-5 h-5 text-blue-600" />
            )}
        </button>
    );
}
