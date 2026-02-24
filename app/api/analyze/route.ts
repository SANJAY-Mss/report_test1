import { NextRequest, NextResponse } from "next/server";
import { analyzeTextWithGemini } from "@/lib/ai/gemini-client";
import { calculateOverallScore } from "@/lib/utils";
import pdf from "pdf-parse";
import mammoth from "mammoth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Helper to extract text
async function extractText(fileBuffer: Buffer, fileType: string): Promise<string> {
    try {
        if (fileType === "application/pdf") {
            const data = await pdf(fileBuffer);
            return data.text;
        } else if (fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            const result = await mammoth.extractRawText({ buffer: fileBuffer });
            return result.value;
        }
        return "";
    } catch (error) {
        console.error("Text extraction failed:", error);
        throw new Error("Failed to extract text from file");
    }
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const textContent = await extractText(buffer, file.type);
        console.log(`Extracted text from ${file.name}: ${textContent.length} chars`);

        if (!textContent || textContent.length < 50) {
            return NextResponse.json({ error: "Could not extract sufficient text from file." }, { status: 400 });
        }

        // 2. AI Analysis
        const aiResult = await analyzeTextWithGemini(textContent);

        // 3. Structural/Formatting Scores (Real AI)
        const structuralScore = aiResult.structural_score || 0;
        const formattingScore = aiResult.formatting_score || 0;

        // 4. Calculate Overall
        const overallScore = calculateOverallScore(
            structuralScore,
            formattingScore,
            aiResult.score
        );

        // 5. Save to DB (STRICT MODE: Fail if DB fails)
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Save Report
        const report = await prisma.report.create({
            data: {
                userId: user.id,
                filename: file.name,
                fileUrl: "local_storage", // In real app, upload to S3/Blob
                fileType: file.type,
                fileSize: file.size,
                status: aiResult.error ? "FAILED" : "COMPLETED",
                analysis: {
                    create: {
                        structuralScore,
                        formattingScore,
                        grammarScore: aiResult.score,
                        overallScore,
                        violations: JSON.stringify(aiResult.issues),
                        suggestions: JSON.stringify(aiResult.issues),
                        metadata: JSON.stringify({ wordCount: textContent.split(/\s+/).length, clarity: aiResult.clarity || 0 }),
                        fullText: textContent
                    }
                }
            },
            include: { analysis: true }
        });

        // Use real ID
        const analysisId = report.analysis?.id || report.id;

        return NextResponse.json({
            success: true,
            analysisId,
            status: report.status, // Return actual status (COMPLETED or FAILED)
            scores: {
                structural: structuralScore,
                formatting: formattingScore,
                grammar: aiResult.score,
                overall: overallScore,
            },
            violations: aiResult.issues.map((issue, idx) => ({
                id: `v_${idx}`,
                title: issue.type,
                description: issue.description,
                severity: issue.severity,
                category: "grammar" // Simplified
            })),
            suggestions: aiResult.issues
        });

    } catch (error) {
        console.error("Analysis error:", error);
        return NextResponse.json(
            { error: "Analysis failed" },
            { status: 500 }
        );
    }
}
