import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        console.log("API /reports: Unauthorized access attempt", { session });
        return NextResponse.json({ error: "Unauthorized: Please sign in again." }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const archived = searchParams.get('archived') === 'true';

        const user = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        const reports = await prisma.report.findMany({
            where: {
                userId: user.id,
                isArchived: archived
            },
            orderBy: { uploadedAt: "desc" },
            take: 10,
            include: { analysis: true }
        });

        return NextResponse.json({ reports });
    } catch (dbError: any) {
        console.error("Database Error:", dbError);
        return NextResponse.json({ error: `Database Error: ${dbError.message}` }, { status: 500 });
    }
}
