import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            await request.json();

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return NextResponse.json(
                { error: "Missing payment details" },
                { status: 400 }
            );
        }

        // Verify HMAC signature
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            // Mark payment as failed
            await prisma.payment.updateMany({
                where: { razorpayOrderId: razorpay_order_id },
                data: { status: "FAILED" },
            });
            return NextResponse.json(
                { error: "Invalid payment signature" },
                { status: 400 }
            );
        }

        // Find the payment record
        const payment = await prisma.payment.findUnique({
            where: { razorpayOrderId: razorpay_order_id },
        });

        if (!payment) {
            return NextResponse.json(
                { error: "Payment record not found" },
                { status: 404 }
            );
        }

        // Update payment and add credits atomically
        await prisma.$transaction([
            prisma.payment.update({
                where: { razorpayOrderId: razorpay_order_id },
                data: {
                    razorpayPaymentId: razorpay_payment_id,
                    status: "PAID",
                },
            }),
            prisma.user.update({
                where: { id: payment.userId },
                data: {
                    scanCredits: { increment: payment.scansAdded },
                    chatCredits: { increment: payment.chatsAdded },
                },
            }),
        ]);

        return NextResponse.json({
            success: true,
            message: `Successfully added ${payment.scansAdded} scan(s) and ${payment.chatsAdded} chat(s)`,
            scansAdded: payment.scansAdded,
            chatsAdded: payment.chatsAdded,
        });
    } catch (error) {
        console.error("Verify payment error:", error);
        return NextResponse.json(
            { error: "Payment verification failed" },
            { status: 500 }
        );
    }
}
