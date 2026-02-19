import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { chatWithReport } from "@/lib/ai/gemini-client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { reportId, message } = await req.json();

        if (!reportId || !message) {
            return NextResponse.json({ error: "Missing reportId or message" }, { status: 400 });
        }

        // Verify User
        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Get Analysis Context
        const analysis = await prisma.analysis.findUnique({
            where: { reportId }
        });

        if (!analysis || !analysis.fullText) {
            return NextResponse.json({ error: "Report analysis not found or missing text context. Please re-analyze the report." }, { status: 404 });
        }

        // Get AI Response
        const answer = await chatWithReport(analysis.fullText, message);

        // Save Chat History
        let chatSession = await prisma.chatSession.findFirst({
            where: {
                userId: user.id,
                reportId
            }
        });

        if (!chatSession) {
            chatSession = await prisma.chatSession.create({
                data: {
                    userId: user.id,
                    reportId
                }
            });
        }

        // Save User Message
        await prisma.chatMessage.create({
            data: {
                sessionId: chatSession.id,
                role: "USER",
                content: message
            }
        });

        // Save AI Response
        await prisma.chatMessage.create({
            data: {
                sessionId: chatSession.id,
                role: "ASSISTANT",
                content: answer
            }
        });

        return NextResponse.json({ answer });

    } catch (error) {
        console.error("Chat API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
