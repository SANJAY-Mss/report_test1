import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PLANS, PlanName } from "@/lib/plans";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { planName } = await request.json();

        if (!planName || !PLANS[planName as PlanName]) {
            return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
        }

        const plan = PLANS[planName as PlanName];

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Create Razorpay order
        const order = await razorpay.orders.create({
            amount: plan.price,
            currency: "INR",
            notes: {
                userId: user.id,
                planName: planName,
            },
        });

        // Save payment record
        await prisma.payment.create({
            data: {
                userId: user.id,
                razorpayOrderId: order.id,
                planName: planName,
                amount: plan.price,
                scansAdded: plan.scans,
                chatsAdded: plan.chats,
                status: "CREATED",
            },
        });

        return NextResponse.json({
            orderId: order.id,
            amount: plan.price,
            currency: "INR",
            keyId: process.env.RAZORPAY_KEY_ID,
            planName: plan.name,
        });
    } catch (error) {
        console.error("Create order error:", error);
        return NextResponse.json(
            { error: "Failed to create order" },
            { status: 500 }
        );
    }
}
