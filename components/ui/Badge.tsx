import React from 'react';
import { cn, getSeverityColor } from '@/lib/utils';
import type { SeverityLevel } from '@/types';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'outline';
    severity?: SeverityLevel;
    className?: string;
}

export function Badge({ children, variant = 'default', severity, className }: BadgeProps) {
    const baseStyles = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium';

    const variants = {
        default: severity ? getSeverityColor(severity) : 'bg-blue-500/10 text-blue-500 border border-blue-500/20',
        outline: severity
            ? `border-2 ${getSeverityColor(severity)}`
            : 'border-2 border-blue-500 text-blue-500',
    };

    return (
        <span className={cn(baseStyles, variants[variant], className)}>
            {children}
        </span>
    );
}
