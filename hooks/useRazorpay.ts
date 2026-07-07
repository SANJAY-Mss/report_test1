"use client";

import { useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

declare global {
    interface Window {
        Razorpay: any;
    }
}

function loadRazorpayScript(): Promise<boolean> {
    return new Promise((resolve) => {
        if (window.Razorpay) {
            resolve(true);
            return;
        }
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
}

export function useRazorpay() {
    const { data: session } = useSession();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const buyPlan = useCallback(
        async (planName: string) => {
            setError(null);

            // Must be signed in
            if (!session?.user) {
                router.push("/login");
                return;
            }

            setIsProcessing(true);

            try {
                // 1. Load Razorpay script
                const loaded = await loadRazorpayScript();
                if (!loaded) {
                    throw new Error("Failed to load Razorpay. Please check your internet connection.");
                }

                // 2. Create order on server
                const orderRes = await fetch("/api/payment/create-order", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ planName }),
                });

                if (!orderRes.ok) {
                    const data = await orderRes.json();
                    throw new Error(data.error || "Failed to create order");
                }

                const { orderId, amount, currency, keyId, planName: displayName } = await orderRes.json();

                // 3. Open Razorpay checkout
                await new Promise<void>((resolve, reject) => {
                    const options = {
                        key: keyId,
                        amount,
                        currency,
                        name: "ReportGuard",
                        description: `${displayName} Plan`,
                        order_id: orderId,
                        prefill: {
                            email: session.user?.email || "",
                            name: session.user?.name || "",
                        },
                        theme: {
                            color: "#2563eb",
                        },
                        handler: async function (response: any) {
                            try {
                                // 4. Verify payment on server
                                const verifyRes = await fetch("/api/payment/verify", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({
                                        razorpay_order_id: response.razorpay_order_id,
                                        razorpay_payment_id: response.razorpay_payment_id,
                                        razorpay_signature: response.razorpay_signature,
                                    }),
                                });

                                if (!verifyRes.ok) {
                                    const data = await verifyRes.json();
                                    reject(new Error(data.error || "Payment verification failed"));
                                    return;
                                }

                                resolve();
                            } catch (err) {
                                reject(err);
                            }
                        },
                        modal: {
                            ondismiss: function () {
                                reject(new Error("Payment cancelled"));
                            },
                        },
                    };

                    const rzp = new window.Razorpay(options);
                    rzp.open();
                });

                // Payment successful — reload current page to reflect new credits
                window.location.reload();
            } catch (err: any) {
                if (err.message !== "Payment cancelled") {
                    setError(err.message || "Payment failed");
                }
            } finally {
                setIsProcessing(false);
            }
        },
        [session, router]
    );

    return { buyPlan, isProcessing, error };
}
