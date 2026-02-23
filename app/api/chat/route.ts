import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { chatWithReport } from "@/lib/ai/gemini-client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { reportId, message, history } = await req.json();

        if (!message) {
            return NextResponse.json({ error: "Missing message" }, { status: 400 });
        }

        let answer = "";

        if (reportId) {
            // --- Contextual Chat (Report Specific) ---
            const user = await prisma.user.findUnique({ where: { email: session.user.email } });
            if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

            const analysis = await prisma.analysis.findUnique({ where: { reportId } });
            if (!analysis || !analysis.fullText) {
                return NextResponse.json({ error: "Analysis context missing." }, { status: 404 });
            }

            answer = await chatWithReport(analysis.fullText, message);

            // Save to DB (Optional: skipping for now to keep it simple, or implement if needed)
        } else {
            // --- General Chat (Global Assistant) ---
            // Use Gemini directly for general queries
            // Filter out the initial assistant greeting because Gemini history MUST start with 'user'
            const sanitizedHistory = history
                ? history.filter((msg: any) => !(msg.role === 'assistant' && msg.content.includes("Hello! I'm your ReportGuard AI assistant")))
                    .map((msg: any) => ({
                        role: msg.role === 'user' ? 'user' : 'model',
                        parts: [{ text: msg.content }],
                    }))
                : [];

            const chat = model.startChat({
                history: sanitizedHistory,
            });

            const result = await chat.sendMessage(message);
            answer = result.response.text();
        }

        return NextResponse.json({ answer });

    } catch (error) {
        console.error("Chat API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
