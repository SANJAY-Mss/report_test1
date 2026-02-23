import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { action } = await req.json(); // "archive" or "unarchive"
        const isArchived = action === "archive";

        // Verify user owns the report
        const user = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        const report = await prisma.report.update({
            where: {
                id: params.id,
                userId: user.id
            },
            data: { isArchived }
        });

        return NextResponse.json({ success: true, report });
    } catch (error) {
        console.error("Archive API Error:", error);
        return NextResponse.json({ error: "Failed to update archive status" }, { status: 500 });
    }
}
