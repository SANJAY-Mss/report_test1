/**
 * Anna University Project Report Formatting Rules
 * Official guidelines for UG project reports
 */

export interface ValidationRule {
    id: string;
    category: 'structural' | 'formatting' | 'content';
    severity: 'critical' | 'high' | 'medium' | 'low';
    description: string;
    requirement: string;
}

// Document Format Rules
export const DOCUMENT_FORMAT = {
    pageSize: 'A4',
    pageDimensions: {
        width: 210, // mm
        height: 297, // mm
    },
    margins: {
        left: 30, // mm
        right: 20, // mm
        top: 25, // mm
        bottom: 25, // mm
    },
    printSide: 'single',
    lineSpacing: 1.5,
    paragraphAlignment: 'justified',
    firstLineIndent: '1.25cm',
};

// Font Rules
export const FONT_RULES = {
    family: 'Times New Roman',
    sizes: {
        body: 12,
        sectionHeading: 14,
        chapterTitle: 16,
    },
    styles: {
        body: 'normal',
        sectionHeading: 'bold',
        chapterTitle: 'bold uppercase',
    },
};

// Required Sections in Exact Order
export const REQUIRED_SECTIONS = [
    { name: 'Title Page', order: 1, required: true },
    { name: 'Bonafide Certificate', order: 2, required: true },
    { name: 'Declaration', order: 3, required: false },
    { name: 'Acknowledgement', order: 4, required: true },
    { name: 'Abstract', order: 5, required: true },
    { name: 'Table of Contents', order: 6, required: true },
    { name: 'List of Tables', order: 7, required: true },
    { name: 'List of Figures', order: 8, required: true },
    { name: 'List of Abbreviations', order: 9, required: true },
    { name: 'Chapters', order: 10, required: true },
    { name: 'References', order: 11, required: true },
    { name: 'Appendices', order: 12, required: false },
];

// Required Chapters
export const REQUIRED_CHAPTERS = [
    {
        number: 1,
        title: 'INTRODUCTION',
        required: true,
        subsections: ['Background', 'Problem Statement', 'Objectives', 'Scope', 'Organization'],
    },
    {
        number: 2,
        title: 'LITERATURE REVIEW',
        required: true,
        subsections: ['Related Work', 'Comparative Analysis', 'Research Gap'],
    },
    {
        number: 3,
        title: 'SYSTEM ANALYSIS / METHODOLOGY',
        required: true,
        subsections: ['Requirement Analysis', 'Feasibility Study', 'Methodology'],
    },
    {
        number: 4,
        title: 'DESIGN & IMPLEMENTATION',
        required: true,
        subsections: ['System Design', 'Architecture', 'Implementation Details'],
    },
    {
        number: 5,
        title: 'RESULTS AND DISCUSSION',
        required: true,
        subsections: ['Test Results', 'Performance Analysis', 'Discussion'],
    },
    {
        number: 6,
        title: 'CONCLUSION AND FUTURE WORK',
        required: true,
        subsections: ['Conclusion', 'Future Enhancements'],
    },
];

// Page Numbering Rules
export const PAGE_NUMBERING = {
    preliminary: {
        style: 'roman', // i, ii, iii, iv, v...
        position: 'bottom-center',
        sections: ['Bonafide', 'Declaration', 'Acknowledgement', 'Abstract', 'TOC', 'Lists'],
    },
    mainContent: {
        style: 'arabic', // 1, 2, 3, 4...
        position: 'bottom-center',
        sections: ['Chapters', 'References', 'Appendices'],
    },
};

// Chapter Numbering Format
export const CHAPTER_NUMBERING = {
    chapter: '1',
    section: '1.1',
    subsection: '1.1.1',
    subSubsection: '1.1.1.1',
    maxDepth: 4,
    newPageRequired: true, // Each chapter must start on a new page
};

// Tables and Figures Rules
export const TABLES_FIGURES = {
    numbering: {
        format: 'chapter-wise', // e.g., Table 2.1, Figure 3.2
        pattern: /^(Table|Figure)\s+\d+\.\d+/,
    },
    captions: {
        table: 'above',
        figure: 'below',
    },
    referenceRequired: true,
    referencePattern: /refer to (Table|Figure)\s+\d+\.\d+/i,
};

// Abstract Requirements
export const ABSTRACT_RULES = {
    wordCount: {
        min: 250,
        max: 300,
    },
    requiredComponents: [
        'Problem Statement',
        'Methodology',
        'Results',
        'Conclusion',
    ],
    placement: 'before Table of Contents',
};

// Reference Format Rules (IEEE Style)
export const REFERENCE_RULES = {
    style: 'IEEE',
    format: {
        inText: '[1], [2], [3]',
        pattern: /\[\d+\]/,
    },
    order: 'numerical',
    consistency: true, // In-text citations must match reference list
    required: true,
};

// Severity Levels for Violations
export const SEVERITY_LEVELS = {
    critical: {
        label: 'Critical',
        color: 'red',
        description: 'Must be fixed before submission',
        weight: 10,
    },
    high: {
        label: 'High',
        color: 'orange',
        description: 'Should be fixed for better compliance',
        weight: 7,
    },
    medium: {
        label: 'Medium',
        color: 'yellow',
        description: 'Recommended to fix',
        weight: 5,
    },
    low: {
        label: 'Low',
        color: 'blue',
        description: 'Minor issue',
        weight: 2,
    },
};

// Validation Rules
export const VALIDATION_RULES: ValidationRule[] = [
    // Structural Rules
    {
        id: 'STR-001',
        category: 'structural',
        severity: 'critical',
        description: 'All required sections must be present',
        requirement: '12 main sections in exact order',
    },
    {
        id: 'STR-002',
        category: 'structural',
        severity: 'critical',
        description: 'All 6 chapters must be present',
        requirement: 'Chapters 1-6 with correct titles',
    },
    {
        id: 'STR-003',
        category: 'structural',
        severity: 'high',
        description: 'Sections must be in correct order',
        requirement: 'Follow exact sequence as per guidelines',
    },
    {
        id: 'STR-004',
        category: 'structural',
        severity: 'high',
        description: 'Each chapter must start on a new page',
        requirement: 'Chapter page break validation',
    },

    // Formatting Rules
    {
        id: 'FMT-001',
        category: 'formatting',
        severity: 'critical',
        description: 'Font must be Times New Roman',
        requirement: 'Times New Roman throughout',
    },
    {
        id: 'FMT-002',
        category: 'formatting',
        severity: 'high',
        description: 'Font sizes must match requirements',
        requirement: 'Body: 12pt, Headings: 14pt, Titles: 16pt',
    },
    {
        id: 'FMT-003',
        category: 'formatting',
        severity: 'high',
        description: 'Margins must be correct',
        requirement: 'L:30mm, R:20mm, T:25mm, B:25mm',
    },
    {
        id: 'FMT-004',
        category: 'formatting',
        severity: 'medium',
        description: 'Line spacing must be 1.5',
        requirement: '1.5 line spacing throughout',
    },
    {
        id: 'FMT-005',
        category: 'formatting',
        severity: 'high',
        description: 'Page numbering must follow rules',
        requirement: 'Roman (i,ii,iii) then Arabic (1,2,3)',
    },

    // Content Rules
    {
        id: 'CNT-001',
        category: 'content',
        severity: 'medium',
        description: 'Abstract must be 250-300 words',
        requirement: 'Word count validation',
    },
    {
        id: 'CNT-002',
        category: 'content',
        severity: 'medium',
        description: 'Tables and figures must be numbered chapter-wise',
        requirement: 'Format: Table X.Y, Figure X.Y',
    },
    {
        id: 'CNT-003',
        category: 'content',
        severity: 'low',
        description: 'Tables and figures must be referenced in text',
        requirement: 'All tables/figures cited in content',
    },
    {
        id: 'CNT-004',
        category: 'content',
        severity: 'high',
        description: 'References must follow IEEE format',
        requirement: 'In-text [1] matching reference list',
    },
];

// Compliance Scoring Weights
export const SCORING_WEIGHTS = {
    structural: 0.4, // 40%
    formatting: 0.3, // 30%
    grammar: 0.3, // 30%
};

// Score Grading
export const SCORE_GRADES = [
    { min: 95, max: 100, grade: 'A+', label: 'Excellent' },
    { min: 90, max: 94, grade: 'A', label: 'Very Good' },
    { min: 85, max: 89, grade: 'B+', label: 'Good' },
    { min: 80, max: 84, grade: 'B', label: 'Above Average' },
    { min: 75, max: 79, grade: 'C+', label: 'Average' },
    { min: 70, max: 74, grade: 'C', label: 'Satisfactory' },
    { min: 0, max: 69, grade: 'F', label: 'Needs Improvement' },
];
