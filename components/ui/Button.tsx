import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    children: React.ReactNode;
}

export function Button({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    className,
    children,
    disabled,
    ...props
}: ButtonProps) {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-glow-purple hover:scale-105',
        secondary: 'glass-card text-foreground hover:bg-white/20 dark:hover:bg-white/10',
        outline: 'border-2 border-purple-500 text-purple-500 hover:bg-purple-500/10',
        ghost: 'text-foreground hover:bg-white/10',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <>
                    <div className="spinner mr-2" />
                    <span>Loading...</span>
                </>
            ) : (
                children
            )}
        </button>
    );
}
