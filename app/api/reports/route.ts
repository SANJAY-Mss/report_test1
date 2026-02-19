import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        try {
            const reports = await prisma.report.findMany({
                where: { userId: session.user.id },
                orderBy: { uploadedAt: "desc" },
                take: 10,
                include: { analysis: true }
            });

            return NextResponse.json({ reports });
        } catch (dbError) {
            console.error("Database connection failed", dbError);
            return NextResponse.json({ error: "Database connection failed. Please ensure Postgres is running." }, { status: 500 });
        }

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
