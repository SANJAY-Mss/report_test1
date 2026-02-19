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
                // Purple/Violet gradient theme
                primary: {
                    DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
                    foreground: 'rgb(var(--primary-foreground) / <alpha-value>)',
                    50: '#f5f3ff',
                    100: '#ede9fe',
                    200: '#ddd6fe',
                    300: '#c4b5fd',
                    400: '#a78bfa',
                    500: '#8b5cf6',
                    600: '#7c3aed',
                    700: '#6d28d9',
                    800: '#5b21b6',
                    900: '#4c1d95',
                    950: '#2e1065',
                },
                accent: {
                    purple: '#8b5cf6',
                    blue: '#3b82f6',
                    pink: '#ec4899',
                    violet: '#a78bfa',
                },
                dark: {
                    bg: '#0a0a0f',
                    card: '#13131a',
                    border: '#1f1f2e',
                },
                light: {
                    bg: '#ffffff',
                    card: '#f8f9fa',
                    border: '#e5e7eb',
                }
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'purple-glow': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'violet-glow': 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                'blue-purple': 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            },
            boxShadow: {
                'glow-purple': '0 0 40px rgba(139, 92, 246, 0.3)',
                'glow-blue': '0 0 40px rgba(59, 130, 246, 0.3)',
                'card-dark': '0 4px 24px rgba(0, 0, 0, 0.4)',
                'card-light': '0 4px 24px rgba(0, 0, 0, 0.08)',
            },
            backdropBlur: {
                xs: '2px',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'slide-up': 'slideUp 0.5s ease-out',
                'fade-in': 'fadeIn 0.6s ease-out',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.2)' },
                    '100%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.6)' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(30px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
            },
        },
    },
    plugins: [],
};

export default config;
