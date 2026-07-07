export const PLANS = {
  STARTER: { name: "Starter", price: 4900, scans: 1, chats: 5, display: "₹49" },
  PRO: { name: "Pro", price: 8900, scans: 2, chats: 10, display: "₹89" },
  PREMIUM: { name: "Premium", price: 17900, scans: 4, chats: 25, display: "₹179" },
} as const;

export type PlanName = keyof typeof PLANS;
