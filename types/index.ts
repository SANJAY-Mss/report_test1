/**
 * TypeScript Type Definitions for ReportGuard
 */

export type SeverityLevel = 'critical' | 'high' | 'medium' | 'low';
export type AnalysisStatus = 'pending' | 'processing' | 'completed' | 'failed';
export type ValidationCategory = 'structural' | 'formatting' | 'content' | 'grammar';

// Violation Interface
export interface Violation {
    id: string;
    ruleId: string;
    category: ValidationCategory;
    severity: SeverityLevel;
    title: string;
    description: string;
    location?: {
        page?: number;
        section?: string;
        line?: number;
    };
    suggestion?: string;
}

// Compliance Scores
export interface ComplianceScores {
    structural: number; // 0-100
    formatting: number; // 0-100
    grammar: number; // 0-100
    overall: number; // 0-100
    grade: string; // A+, A, B+, etc.
    label: string; // Excellent, Good, etc.
}

// AI Suggestion
export interface AISuggestion {
    id: string;
    type: 'grammar' | 'tone' | 'clarity' | 'structure';
    priority: 'high' | 'medium' | 'low';
    title: string;
    description: string;
    example?: {
        before: string;
        after: string;
    };
}

// Analysis Result
export interface AnalysisResult {
    id: string;
    reportId: string;
    status: AnalysisStatus;
    progress: number; // 0-100
    scores: ComplianceScores;
    violations: Violation[];
    suggestions: AISuggestion[];
    metadata: {
        totalPages: number;
        wordCount: number;
        processingTime: number; // in seconds
        analyzedAt: Date;
    };
    plagiarismRisk?: {
        score: number; // 0-100
        level: 'low' | 'medium' | 'high';
        details: string;
    };
}

// Report Interface
export interface Report {
    id: string;
    userId: string;
    filename: string;
    fileUrl: string;
    fileSize: number;
    fileType: 'pdf' | 'docx';
    status: AnalysisStatus;
    uploadedAt: Date;
    analysis?: AnalysisResult;
}

// User Interface
export interface User {
    id: string;
    email: string;
    name: string;
    role: 'student' | 'faculty' | 'admin';
    institution?: string;
    createdAt: Date;
}

// Chat Message
export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

// Chat Session
export interface ChatSession {
    id: string;
    analysisId: string;
    messages: ChatMessage[];
    createdAt: Date;
    updatedAt: Date;
}

// Upload Progress
export interface UploadProgress {
    loaded: number;
    total: number;
    percentage: number;
}

// File Validation Result
export interface FileValidationResult {
    isValid: boolean;
    errors: string[];
    fileInfo?: {
        name: string;
        size: number;
        type: string;
    };
}
