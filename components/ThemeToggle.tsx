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
            className="p-2 glass-card rounded-full hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 group"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-400 group-hover:rotate-180 transition-transform duration-500" />
            ) : (
                <Moon className="w-5 h-5 text-purple-600 group-hover:-rotate-12 transition-transform duration-500" />
            )}
        </button>
    );
}
