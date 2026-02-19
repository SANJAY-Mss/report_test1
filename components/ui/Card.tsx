import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'glass' | 'glow' | 'solid';
    hover?: boolean;
}

export function Card({ children, className, variant = 'glass', hover = false }: CardProps) {
    const variants = {
        glass: 'glass-card',
        glow: 'glow-card',
        solid: 'bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-2xl',
    };

    const hoverStyles = hover ? 'hover:scale-105 transition-transform duration-300' : '';

    return (
        <div className={cn(variants[variant], hoverStyles, className)}>
            {children}
        </div>
    );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={cn('p-6 border-b border-white/10', className)}>{children}</div>;
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={cn('p-6', className)}>{children}</div>;
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={cn('p-6 border-t border-white/10', className)}>{children}</div>;
}
