import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
    Document,
    Packer,
    Paragraph,
    TextRun,
    Table,
    TableRow,
    TableCell,
    WidthType,
    HeadingLevel,
    AlignmentType,
    BorderStyle,
    ShadingType,
    PageBreak,
    TableLayoutType,
} from "docx";

function getGradeLabel(score: number): string {
    if (score >= 95) return "A+ — Excellent";
    if (score >= 90) return "A — Very Good";
    if (score >= 85) return "B+ — Good";
    if (score >= 80) return "B — Above Average";
    if (score >= 75) return "C+ — Average";
    if (score >= 70) return "C — Satisfactory";
    return "F — Needs Improvement";
}

function getSeverityLabel(severity: string): string {
    const map: Record<string, string> = {
        critical: "🔴 CRITICAL",
        high: "🟠 HIGH",
        medium: "🟡 MEDIUM",
        low: "🔵 LOW",
    };
    return map[severity?.toLowerCase()] || severity?.toUpperCase() || "UNKNOWN";
}

interface PageProps {
    params: { id: string };
}

export async function GET(request: NextRequest, { params }: PageProps) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const format = searchParams.get("format") || "docx";

        // Fetch report with analysis
        const report = await prisma.report.findUnique({
            where: { id: params.id },
            include: { analysis: true },
        });

        if (!report) {
            return NextResponse.json({ error: "Report not found" }, { status: 404 });
        }

        // Ownership check
        const user = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (!user || report.userId !== user.id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const analysis = report.analysis;
        if (!analysis) {
            return NextResponse.json({ error: "Analysis not found" }, { status: 404 });
        }

        // Parse JSON strings
        let violations: any[] = [];
        let suggestions: any[] = [];
        let metadata: any = {};

        try {
            if (analysis.violations) violations = JSON.parse(analysis.violations);
            if (analysis.suggestions) suggestions = JSON.parse(analysis.suggestions);
            if (analysis.metadata) metadata = JSON.parse(analysis.metadata);
        } catch (e) {
            console.error("JSON parse error", e);
        }

        // ------- Return JSON for PDF print mode -------
        if (format === "pdf") {
            return NextResponse.json({
                report: {
                    filename: report.filename,
                    uploadedAt: report.uploadedAt,
                    status: report.status,
                },
                scores: {
                    overall: analysis.overallScore,
                    grammar: analysis.grammarScore,
                    structural: analysis.structuralScore,
                    formatting: analysis.formattingScore,
                    clarity: metadata.clarity || 0,
                },
                grade: getGradeLabel(analysis.overallScore),
                violations,
                suggestions,
            });
        }

        // ------- Build DOCX -------
        const DARK_BORDER = { style: BorderStyle.SINGLE, size: 6, color: "222222" };
        const NO_BORDER = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
        const CELL_MARGIN = { top: 100, bottom: 100, left: 120, right: 120 };

        // Helper: bold paragraph
        const boldPara = (text: string, size = 24, color = "000000") =>
            new Paragraph({
                children: [new TextRun({ text, bold: true, size, color, font: "Calibri" })],
                spacing: { after: 120 },
            });

        // Helper: normal paragraph
        const normalPara = (text: string, size = 22, color = "222222") =>
            new Paragraph({
                children: [new TextRun({ text, size, color, font: "Calibri" })],
                spacing: { after: 80 },
            });

        // Helper: heading
        const headingPara = (text: string) =>
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 300, after: 120 },
                children: [new TextRun({ text, bold: true, size: 28, color: "111111", font: "Calibri" })],
            });

        // Divider
        const divider = new Paragraph({
            border: {
                bottom: { color: "CCCCCC", space: 1, style: BorderStyle.SINGLE, size: 6 }
            },
            spacing: { before: 80, after: 80 },
        });

        // Score table
        const scoreTableRows = [
            new TableRow({
                tableHeader: true,
                children: ["CATEGORY", "SCORE", "GRADE"].map((h) =>
                    new TableCell({
                        children: [new Paragraph({
                            children: [new TextRun({ text: h, bold: true, size: 22, color: "FFFFFF", font: "Calibri" })],
                            alignment: AlignmentType.CENTER,
                        })],
                        margins: CELL_MARGIN,
                        shading: { type: ShadingType.SOLID, color: "1a1a2e", fill: "1a1a2e" },
                    })
                ),
            }),
            ...[
                { label: "Overall", score: analysis.overallScore },
                { label: "Grammar", score: analysis.grammarScore },
                { label: "Structure", score: analysis.structuralScore },
                { label: "Formatting", score: analysis.formattingScore },
                { label: "Clarity", score: metadata.clarity || 0 },
            ].map(({ label, score }, i) =>
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph({
                                children: [new TextRun({ text: label, bold: label === "Overall", size: 22, font: "Calibri" })],
                            })],
                            margins: CELL_MARGIN,
                            shading: { type: ShadingType.SOLID, color: i % 2 === 0 ? "F9F9F9" : "FFFFFF", fill: i % 2 === 0 ? "F9F9F9" : "FFFFFF" },
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                children: [new TextRun({ text: `${score} / 100`, bold: label === "Overall", size: 22, color: score >= 75 ? "1a7f37" : score >= 50 ? "b45309" : "b91c1c", font: "Calibri" })],
                                alignment: AlignmentType.CENTER,
                            })],
                            margins: CELL_MARGIN,
                            shading: { type: ShadingType.SOLID, color: i % 2 === 0 ? "F9F9F9" : "FFFFFF", fill: i % 2 === 0 ? "F9F9F9" : "FFFFFF" },
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                children: [new TextRun({ text: label === "Overall" ? getGradeLabel(score) : "—", size: 22, font: "Calibri", italics: label === "Overall" })],
                                alignment: AlignmentType.CENTER,
                            })],
                            margins: CELL_MARGIN,
                            shading: { type: ShadingType.SOLID, color: i % 2 === 0 ? "F9F9F9" : "FFFFFF", fill: i % 2 === 0 ? "F9F9F9" : "FFFFFF" },
                        }),
                    ],
                })
            ),
        ];

        const scoreTable = new Table({
            rows: scoreTableRows,
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
                top: DARK_BORDER,
                bottom: DARK_BORDER,
                left: DARK_BORDER,
                right: DARK_BORDER,
                insideHorizontal: { style: BorderStyle.SINGLE, size: 2, color: "E5E7EB" },
                insideVertical: { style: BorderStyle.SINGLE, size: 2, color: "E5E7EB" },
            },
        });

        // Issue blocks
        const issueBlocks: Paragraph[] = [];
        violations.forEach((issue: any, idx: number) => {
            const severityColor = {
                critical: "b91c1c",
                high: "b45309",
                medium: "854d0e",
                low: "1d4ed8",
            }[issue.severity?.toLowerCase() as string] || "374151";

            issueBlocks.push(
                new Paragraph({
                    keepNext: true,
                    children: [
                        new TextRun({ text: `Issue #${idx + 1}`, bold: true, size: 24, font: "Calibri", color: "111111" }),
                        new TextRun({ text: `[${(issue.type || "issue").toUpperCase().replace(/_/g, " ")}]`, bold: true, size: 20, font: "Calibri", color: "444444" }),
                        new TextRun({ text: ` ${getSeverityLabel(issue.severity)}`, bold: true, size: 20, color: severityColor, font: "Calibri" }),
                        ...(issue.page ? [new TextRun({ text: ` 📄Page ${issue.page}`, size: 20, color: "666666", font: "Calibri" })] : []),
                    ],
                    spacing: { before: 240, after: 60 },
                }),
                new Paragraph({
                    keepNext: true,
                    children: [new TextRun({ text: issue.description || "No description", size: 22, font: "Calibri", color: "1f2937" })],
                    spacing: { after: 60 },
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "→ Suggestion: ", bold: true, size: 20, color: "374151", font: "Calibri" }),
                        new TextRun({ text: issue.suggestion || "No suggestion provided.", size: 20, color: "4b5563", font: "Calibri", italics: true }),
                    ],
                    spacing: { after: 120 },
                    border: {
                        bottom: { color: "EEEEEE", space: 10, style: BorderStyle.SINGLE, size: 6 }
                    }
                })
            );
        });

        // Suggestions block
        const suggestionBlocks: Paragraph[] = suggestions.map((s: any, i: number) =>
            new Paragraph({
                children: [
                    new TextRun({ text: `${i + 1}. `, bold: true, size: 22, font: "Calibri", color: "111111" }),
                    new TextRun({ text: typeof s === "string" ? s : s.description || "Improvement tip", size: 22, font: "Calibri", color: "374151" }),
                ],
                spacing: { after: 100 },
            })
        );

        const doc = new Document({
            creator: "Project Tracker",
            title: `Analysis Report — ${report.filename}`,
            description: "Auto-generated by Project Tracker AI Report Analyzer",
            sections: [
                {
                    children: [
                        // ── Title ──
                        new Paragraph({
                            children: [
                                new TextRun({ text: "PROJECT TRACKER", bold: true, size: 48, color: "1a1a2e", font: "Calibri" }),
                            ],
                            alignment: AlignmentType.CENTER,
                            spacing: { after: 60 },
                        }),
                        new Paragraph({
                            children: [new TextRun({ text: "AI-Powered Academic Report Analysis", size: 24, color: "555555", font: "Calibri", italics: true })],
                            alignment: AlignmentType.CENTER,
                            spacing: { after: 200 },
                        }),
                        divider,

                        // ── Report Info ──
                        headingPara("REPORT INFORMATION"),
                        normalPara(`File Name:     ${report.filename}`),
                        normalPara(`Uploaded On:   ${new Date(report.uploadedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}`),
                        normalPara(`Analysis Date: ${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}`),
                        normalPara(`Status:        ${report.status}`),
                        divider,

                        // ── Scores ──
                        headingPara("COMPLIANCE SCORES"),
                        scoreTable,
                        new Paragraph({ children: [], spacing: { after: 200 } }),

                        // ── Issues ──
                        headingPara(`ISSUES FOUND (${violations.length} total)`),
                        ...(violations.length === 0
                            ? [normalPara("No issues found. Excellent compliance!", 22, "1a7f37")]
                            : issueBlocks),

                        // ── Improvement Tips ──
                        ...(suggestions.length > 0 ? [
                            headingPara("IMPROVEMENT TIPS"),
                            ...suggestionBlocks,
                        ] : []),

                        // ── Footer ──
                        divider,
                        new Paragraph({
                            children: [new TextRun({ text: `Generated by Project Tracker  •  ${new Date().toLocaleString("en-IN")}  •  Anna University 2026 Standards`, size: 18, color: "999999", font: "Calibri", italics: true })],
                            alignment: AlignmentType.CENTER,
                            spacing: { before: 120 },
                        }),
                    ],
                },
            ],
        });

        const buffer = await Packer.toBuffer(doc);
        const uint8Array = new Uint8Array(buffer);
        const safeFilename = report.filename.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9-_]/g, "_");

        return new NextResponse(uint8Array, {
            status: 200,
            headers: {
                "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "Content-Disposition": `attachment; filename="ProjectTracker_Analysis_${safeFilename}.docx"`,
                "Content-Length": String(uint8Array.byteLength),
            },
        });
    } catch (error) {
        console.error("Export error:", error);
        return NextResponse.json({ error: "Export failed" }, { status: 500 });
    }
}
