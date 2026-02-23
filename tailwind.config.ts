import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // CSS variable based semantic colors
                background: 'rgb(var(--background) / <alpha-value>)',
                foreground: 'rgb(var(--foreground) / <alpha-value>)',
                card: {
                    DEFAULT: 'rgb(var(--card) / <alpha-value>)',
                    foreground: 'rgb(var(--card-foreground) / <alpha-value>)',
                },
                border: 'rgb(var(--border) / <alpha-value>)',
                // Blue/Cyan gradient theme
                primary: {
                    DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
                    foreground: 'rgb(var(--primary-foreground) / <alpha-value>)',
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                    950: '#172554',
                },
                accent: {
                    purple: '#3b82f6', // Remapped to blue
                    blue: '#06b6d4',   // Remapped to cyan
                    pink: '#0ea5e9',   // Remapped to sky
                    violet: '#6366f1', // Remapped to indigo
                },
                dark: {
                    bg: '#0f172a',     // Slate-900 based
                    card: '#1e293b',   // Slate-800 based
                    border: '#334155', // Slate-700
                },
                light: {
                    bg: '#ffffff',
                    card: '#f8fafc',
                    border: '#e2e8f0',
                },
                spooky: {
                    dark: '#0f0f11',       // Very dark grey/black
                    card: '#1a1a1f',       // Slightly lighter dark
                    purple: '#8b5cf6',     // Vivid Purple
                    pink: '#ec4899',       // Hot Pink
                    orange: '#f97316',     // Halloween Orange
                    green: '#10b981',      // Toxic Green
                },
            },
            fontFamily: {
                'creepster': ['"Creepster"', 'cursive'],
                'sans': ['Inter', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'purple-glow': 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)', // Blue -> Cyan
                'spooky-gradient': 'linear-gradient(135deg, #0f0f11 0%, #1a1a1f 100%)',
                'witch-gradient': 'linear-gradient(to right, #8b5cf6, #ec4899)',
            },
            boxShadow: {
                'glow-blue': '0 0 40px rgba(59, 130, 246, 0.3)', // Blue
                'glow-cyan': '0 0 40px rgba(6, 182, 212, 0.3)',    // Cyan
                'card-dark': '0 4px 24px rgba(0, 0, 0, 0.4)',
                'card-light': '0 4px 24px rgba(0, 0, 0, 0.08)',
            },
            backdropBlur: {
                xs: '2px',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'spin-slow': 'spin 15s linear infinite',
                'flow-up': 'flowUp 2s ease-out infinite',
                'beam-flow': 'beamFlow 1s linear infinite',
                'float': 'float 3s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'spotlight': 'spotlight 2s ease .75s forwards',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                spotlight: {
                    '0%': { opacity: '0', transform: 'translate(-50%, -50%) scale(0.5)' },
                    '100%': { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                flowUp: {
                    '0%': { transform: 'translateY(100%)', opacity: '0' },
                    '50%': { opacity: '1' },
                    '100%': { transform: 'translateY(-100%)', opacity: '0' },
                },
                beamFlow: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                },
            },
        },
    },
    plugins: [],
};

export default config;
