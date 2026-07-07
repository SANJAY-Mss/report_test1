"use client";

import React from 'react';
import { useRazorpay } from '@/hooks/useRazorpay';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function Pricing() {
  const { buyPlan, isProcessing, error } = useRazorpay();
  const { data: session } = useSession();
  const router = useRouter();

  const handleBuy = (planName: string) => {
    if (!session?.user) {
      router.push("/login");
      return;
    }
    buyPlan(planName);
  };

  return (
    <section id="pricing" className="py-24 bg-[#050505] border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="mono text-xs text-gray-500 mb-6 flex items-center justify-center gap-2">
            <span>[ PRICING ]</span>
            <div className="h-[1px] w-12 bg-gray-800" />
            <span>SCAN CREDITS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tight mb-4">
            Simple, honest
            <br />
            <span className="text-gray-500">pricing.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            No hidden fees. No subscriptions. Buy scans when you need them.
          </p>
          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 text-sm text-red-400 max-w-md mx-auto mono">
              {error}
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">

          {/* Starter Plan */}
          <div className="relative bg-[#0a0a0a] border border-[#1a1a1a] p-8 hover:bg-[#0e0e0e] transition-colors duration-500">
            <div className="mono text-[10px] text-gray-600 mb-4">[ STARTER ]</div>
            <h3 className="text-lg font-medium text-white mb-2">Starter</h3>
            <p className="text-gray-500 text-sm mb-6">Perfect for quick, single-document checks.</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white mono">₹49</span>
            </div>
            <button
              onClick={() => handleBuy("STARTER")}
              disabled={isProcessing}
              className="block w-full py-3 mb-8 text-center retune-btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? "Processing..." : "Get Started"}
            </button>
            <ul className="space-y-3 mono text-xs text-gray-500 border-l border-gray-800 pl-4">
              <li className="flex justify-between w-full"><span>SCANS</span> <span className="text-white">1</span></li>
              <li className="flex justify-between w-full"><span>AI CHATS</span> <span className="text-white">5</span></li>
              <li className="flex justify-between w-full"><span>FORMAT</span> <span className="text-white">BASIC</span></li>
            </ul>
          </div>

          {/* Pro Plan */}
          <div className="relative bg-white border border-white/20 p-8 transform md:-translate-y-4">
            <div className="mono text-[10px] text-gray-500 mb-1 flex items-center gap-2">
              [ PRO ]
              <span className="bg-black text-white text-[9px] px-2 py-0.5 tracking-widest">MOST POPULAR</span>
            </div>
            <h3 className="text-lg font-medium text-black mb-2">Pro</h3>
            <p className="text-gray-500 text-sm mb-6">For project reports and serious writers.</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-black mono">₹89</span>
            </div>
            <button
              onClick={() => handleBuy("PRO")}
              disabled={isProcessing}
              className="block w-full py-3 mb-8 text-center bg-black text-white font-bold mono text-xs tracking-widest uppercase hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? "Processing..." : "Upgrade to Pro"}
            </button>
            <ul className="space-y-3 mono text-xs text-gray-500 border-l border-gray-300 pl-4">
              <li className="flex justify-between w-full"><span>SCANS</span> <span className="text-black font-bold">2</span></li>
              <li className="flex justify-between w-full"><span>AI CHATS</span> <span className="text-black font-bold">10</span></li>
              <li className="flex justify-between w-full"><span>FORMAT</span> <span className="text-black font-bold">ADVANCED</span></li>
            </ul>
          </div>

          {/* Premium Plan */}
          <div className="relative bg-[#0a0a0a] border border-[#1a1a1a] p-8 hover:bg-[#0e0e0e] transition-colors duration-500">
            <div className="mono text-[10px] text-gray-600 mb-4">[ PREMIUM ]</div>
            <h3 className="text-lg font-medium text-white mb-2">Premium</h3>
            <p className="text-gray-500 text-sm mb-6">For comprehensive checking and maximum usage.</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white mono">₹179</span>
            </div>
            <button
              onClick={() => handleBuy("PREMIUM")}
              disabled={isProcessing}
              className="block w-full py-3 mb-8 text-center retune-btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? "Processing..." : "Get Premium"}
            </button>
            <ul className="space-y-3 mono text-xs text-gray-500 border-l border-gray-800 pl-4">
              <li className="flex justify-between w-full"><span>SCANS</span> <span className="text-white">4</span></li>
              <li className="flex justify-between w-full"><span>AI CHATS</span> <span className="text-white">25</span></li>
              <li className="flex justify-between w-full"><span>SUPPORT</span> <span className="text-white">PRIORITY</span></li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
