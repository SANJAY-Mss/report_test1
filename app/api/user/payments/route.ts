import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { id: true },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const payments = await prisma.payment.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                planName: true,
                amount: true,
                scansAdded: true,
                chatsAdded: true,
                status: true,
                createdAt: true,
            },
        });

        return NextResponse.json(payments);
    } catch (error) {
        console.error("Payments fetch error:", error);
        return NextResponse.json(
            { error: "Failed to fetch payments" },
            { status: 500 }
        );
    }
}
