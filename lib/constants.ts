// Application-wide constants

export const APP_CONFIG = {
    name: 'ReportGuard',
    description: 'AI-Powered Academic Report Analyzer',
    version: '1.0.0',
    author: 'ReportGuard Team',
};

export const FILE_UPLOAD = {
    maxSizeMB: 10,
    allowedTypes: ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    allowedExtensions: ['.pdf', '.docx'],
};

export const SEVERITY_COLORS = {
    critical: {
        bg: 'bg-red-500/10',
        text: 'text-red-500',
        border: 'border-red-500/20',
        badge: 'bg-red-500',
    },
    high: {
        bg: 'bg-orange-500/10',
        text: 'text-orange-500',
        border: 'border-orange-500/20',
        badge: 'bg-orange-500',
    },
    medium: {
        bg: 'bg-yellow-500/10',
        text: 'text-yellow-500',
        border: 'border-yellow-500/20',
        badge: 'bg-yellow-500',
    },
    low: {
        bg: 'bg-blue-500/10',
        text: 'text-blue-500',
        border: 'border-blue-500/20',
        badge: 'bg-blue-500',
    },
};

export const SCORE_THRESHOLDS = {
    excellent: 95,
    veryGood: 90,
    good: 85,
    aboveAverage: 80,
    average: 75,
    satisfactory: 70,
};

export const API_ENDPOINTS = {
    upload: '/api/upload',
    analyze: '/api/analyze',
    analysis: '/api/analysis',
    reports: '/api/reports',
    chat: '/api/chat',
    download: '/api/download',
};

export const ANALYSIS_STATUS = {
    pending: 'pending',
    processing: 'processing',
    completed: 'completed',
    failed: 'failed',
} as const;

export const VALIDATION_CATEGORIES = {
    structural: 'Structural Compliance',
    formatting: 'Formatting Compliance',
    grammar: 'Academic Language Quality',
    overall: 'Overall Compliance',
};

export const MOCK_FEATURES = [
    {
        title: 'Document Format Validation',
        description: 'A4 size, margins (L30/R20/T25/B25mm), 1.5 spacing',
    },
    {
        title: 'Font Validation',
        description: 'Times New Roman: 12pt body, 14pt headings, 16pt titles',
    },
    {
        title: 'Structure & Order Validation',
        description: '12 required sections in exact order',
    },
    {
        title: 'Chapter Structure Validation',
        description: '6 chapters with proper numbering (1.1.1)',
    },
    {
        title: 'Page Numbering Validation',
        description: 'Roman (i,ii,iii) → Arabic (1,2,3)',
    },
    {
        title: 'Tables & Figures Validation',
        description: 'Chapter-wise numbering with correct caption position',
    },
    {
        title: 'Abstract Validation',
        description: '250-300 words with 4 required components',
    },
    {
        title: 'Reference Format Validation',
        description: 'IEEE style with [1] [2] matching',
    },
    {
        title: 'Plagiarism Risk Detection',
        description: 'Heuristic pattern-based analysis',
    },
];
