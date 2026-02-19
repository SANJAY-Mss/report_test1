import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function for merging Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Format file size in human-readable format
 */
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Format date/time
 */
export function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
}

/**
 * Get severity color classes
 */
export function getSeverityColor(severity: string): string {
    switch (severity) {
        case 'critical':
            return 'bg-red-500/10 text-red-500 border-red-500/20';
        case 'high':
            return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
        case 'medium':
            return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
        case 'low':
            return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
        default:
            return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
}

/**
 * Get score color based on value
 */
export function getScoreColor(score: number): string {
    if (score >= 90) return 'text-green-500';
    if (score >= 75) return 'text-blue-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
}

/**
 * Calculate overall compliance score
 */
export function calculateOverallScore(
    structural: number,
    formatting: number,
    grammar: number
): number {
    return Math.round(structural * 0.4 + formatting * 0.3 + grammar * 0.3);
}

/**
 * Get grade from score
 */
export function getGrade(score: number): { grade: string; label: string } {
    if (score >= 95) return { grade: 'A+', label: 'Excellent' };
    if (score >= 90) return { grade: 'A', label: 'Very Good' };
    if (score >= 85) return { grade: 'B+', label: 'Good' };
    if (score >= 80) return { grade: 'B', label: 'Above Average' };
    if (score >= 75) return { grade: 'C+', label: 'Average' };
    if (score >= 70) return { grade: 'C', label: 'Satisfactory' };
    return { grade: 'F', label: 'Needs Improvement' };
}

/**
 * Validate file type
 */
export function isValidFileType(file: File): boolean {
    const validTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    return validTypes.includes(file.type);
}

/**
 * Validate file size (max 10MB)
 */
export function isValidFileSize(file: File, maxSizeMB: number = 10): boolean {
    const maxSize = maxSizeMB * 1024 * 1024; // Convert to bytes
    return file.size <= maxSize;
}

/**
 * Generate unique ID
 */
export function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number
): (...funcArgs: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

/**
 * Sleep utility
 */
export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
