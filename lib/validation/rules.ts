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

// Document Format Rules (2026 Standards)
export const DOCUMENT_FORMAT = {
    pageSize: 'A4',
    paperWeight: 'minimum 80 gsm white paper',
    pageDimensions: {
        width: 210, // mm
        height: 297, // mm
    },
    margins: {
        left: 38.1, // mm (1.5 inches strictly for gutter)
        right: 25.4, // mm (1.0 inch)
        top: 38.1, // mm (1.5 inches)
        bottom: 31.75, // mm (1.25 inches)
    },
    printSide: 'single',
    ink: 'Black ink only',
    lineSpacing: 1.5,
    paragraphAlignment: 'justified',
    firstLineIndent: '1.27cm', // 0.5 inches
};

// Font Rules (Times New Roman Only)
export const FONT_RULES = {
    family: 'Times New Roman',
    sizes: {
        body: 14,
        sectionHeading: 14, // Division Level 1
        subDivision: 14, // Level 2+
        chapterTitle: 16,
        mainTitle: 18,
        captions: 12,
        footnotes: 10,
        referenceList: 14
    },
    styles: {
        body: 'normal',
        sectionHeading: 'bold ALL CAPS Left-justified',
        subDivision: 'bold Sentence Case Left-justified',
        chapterTitle: 'bold ALL CAPS Centered',
        mainTitle: 'bold ALL CAPS',
    },
};

// Required Sections in Exact Order
export const REQUIRED_SECTIONS = [
    { name: 'Cover Page (and Title Page)', order: 1, required: true },
    { name: 'Bonafide Certificate', order: 2, required: true },
    { name: 'Declaration', order: 3, required: true },
    { name: 'Acknowledgement', order: 4, required: true },
    { name: 'Abstract', order: 5, required: true },
    { name: 'Table of Contents', order: 6, required: true },
    { name: 'List of Tables', order: 7, required: true },
    { name: 'List of Figures', order: 8, required: true },
    { name: 'List of Symbols', order: 9, required: true },
    { name: 'Chapters', order: 10, required: true },
    { name: 'References', order: 11, required: true },
    { name: 'Appendices', order: 12, required: false },
];

// Required Chapters (Maintained from previous, ensuring logic holds)
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

export const SPACING_PROTOCOLS = {
    chapterHeadingDrop: '50mm below the top edge',
    textCommencement: '4 line spaces below the Chapter Title',
    mainBody: 1.5,
    mandatoryDoubleSpacing: ['Bonafide Certificate', 'Abstract'],
    tripleSpacingRule: 'Triple spacing is required from preceding and following text if a table or figure is half-page or less.',
    referenceSpacing: '4 spaces below the "REFERENCES" heading; one clear line below each entry',
};

// Page Numbering Rules
export const PAGE_NUMBERING = {
    preliminary: {
        style: 'roman', // i, ii, iii, iv, v...
        position: 'upper right-hand corner, 20mm from top edge, last digit flush right',
        sections: ['Bonafide', 'Declaration', 'Acknowledgement', 'Abstract', 'TOC', 'Lists'],
    },
    mainContent: {
        style: 'arabic', // 1, 2, 3, 4...
        position: 'upper right-hand corner, 20mm from top edge, last digit flush right',
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
        table: 'above, left-aligned, Sentence Case',
        figure: 'below, centered, Sentence Case',
    },
    referenceRequired: true,
    referencePattern: /refer to (Table|Figure)\s+\d+\.\d+/i,
    splitRule: 'Never split a table across two pages.',
    equations: 'Equations must be centered with consecutive Arabic numbering in parentheses flush to the right margin. Use LaTeX for notation.'
};

// Abstract Requirements
export const ABSTRACT_RULES = {
    wordCount: {
        min: 300,
        max: 500,
    },
    requiredComponents: [
        'Problem Statement',
        'Methodology',
        'Results',
        'Conclusion',
    ],
    placement: 'before Table of Contents',
    spacing: 'double-spaced essay format'
};

// Reference Format Rules (Academic Integrity)
export const REFERENCE_RULES = {
    style: 'IEEE / Alphabetical',
    format: {
        journal: "Author. (Year). 'Article Title'. Journal Name, Vol(No), pp.",
        book: "Author. (Year). Book Title. Publisher.",
        pattern: /\[\d+\]/, // Keep for legacy IEEE, but the new rule states Alphabetical by surname, though didn't explicitly remove brackets. We assume standard format.
    },
    spacing: 'Single-spaced, Left-justified. One clear line below each entry.',
    order: 'Alphabetical by the first author’s surname',
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
        description: 'Font sizes must match 2026 requirements',
        requirement: 'Body: 14pt, Division: 14pt, Titles: 16-18pt',
    },
    {
        id: 'FMT-003',
        category: 'formatting',
        severity: 'high',
        description: 'Margins must be strictly correct',
        requirement: 'L:38.1mm, R:25.4mm, T:38.1mm, B:31.75mm',
    },
    {
        id: 'FMT-004',
        category: 'formatting',
        severity: 'medium',
        description: 'Line spacing must be 1.5',
        requirement: '1.5 line spacing throughout main body',
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
