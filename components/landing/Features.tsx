"use client";

import React from "react";
import { Award, Zap, ShieldCheck, Headphones, Gift } from "lucide-react";

const featuresData = [
    { title: "Guarantee", subtitle: "100% Anna University Format Compliant", icon: Award },
    { title: "7+ years", subtitle: "Lightning Fast Processing in under 90s", icon: Zap },
    { title: "400+ rules", subtitle: "Strict Structural Layout Policies Enforced", icon: ShieldCheck },
    { title: "24/7 online", subtitle: "Spectral AI Chat Assistant always online", icon: Headphones },
    { title: "Cheap", subtitle: "First 3 report validations completely free", icon: Gift },
];

function DiamondCard({ index, title, subtitle, Icon }: { index: number, title: string, subtitle: string, Icon: any }) {
    const isEven = index % 2 === 0;

    return (
        <div
            className={`
                relative flex items-center justify-center flex-shrink-0
                w-[150px] h-[150px] md:w-[180px] md:h-[180px]
                border-2 border-fuchsia-500/80 bg-[#0a0a0f]
                rounded-[1.5rem] md:rounded-[2rem]
                rotate-45
                shadow-[0_0_20px_rgba(217,70,239,0.3)]
                hover:shadow-[0_0_40px_rgba(217,70,239,0.7)]
                hover:z-50 transition-all duration-300 group cursor-default
                ${index !== 0 ? "-ml-[39.5px] md:-ml-[49px]" : ""}
                ${isEven ? "translate-y-[55px] md:translate-y-[66px]" : "-translate-y-[55px] md:-translate-y-[66px]"}
            `}
        >
            <div className="-rotate-45 flex flex-col items-center justify-center text-center p-2 w-[141%] h-[141%] md:gap-1">
                <div className="mb-1 p-2 rounded-full bg-fuchsia-500/10 text-fuchsia-400 group-hover:bg-fuchsia-500/20 group-hover:text-fuchsia-300 transition-colors">
                    <Icon className="w-4 h-4 md:w-6 md:h-6" />
                </div>
                <h3 className="font-bold text-white mb-1 text-xs md:text-[15px] drop-shadow-[0_0_8px_rgba(217,70,239,0.8)] leading-tight tracking-wide">
                    {title}
                </h3>
                <p className="text-[9px] md:text-[11px] text-fuchsia-100/60 leading-tight max-w-[85px] md:max-w-[100px]">
                    {subtitle}
                </p>
            </div>

            {/* Glowing Corner Dots */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full shadow-[0_0_10px_#e879f9] bg-fuchsia-400 group-hover:scale-150 transition-transform" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full shadow-[0_0_10px_#e879f9] bg-fuchsia-400 group-hover:scale-150 transition-transform" />
            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full shadow-[0_0_10px_#e879f9] bg-fuchsia-400 group-hover:scale-150 transition-transform" />
            <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full shadow-[0_0_10px_#e879f9] bg-fuchsia-400 group-hover:scale-150 transition-transform" />
        </div>
    );
}

export function Features() {
    return (
        <section id="features" className="pt-8 pb-16 px-6 relative w-full overflow-hidden bg-transparent">
            {/* Background Magic Glows */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-700/10 blur-[150px] rounded-full pointer-events-none -z-10" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-fuchsia-700/10 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto flex flex-col items-center gap-8 md:gap-12">

                {/* Section Header */}
                <div className="text-center w-full space-y-4">
                    <div className="inline-flex items-center justify-center gap-4 mb-2">
                        <div className="w-8 md:w-16 h-[1px] bg-fuchsia-500/80 shadow-[0_0_10px_#e879f9]" />
                        <span className="text-white font-extrabold text-xl md:text-3xl tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                            Our Advantage
                        </span>
                        <div className="w-8 md:w-16 h-[1px] bg-fuchsia-500/80 shadow-[0_0_10px_#e879f9]" />
                    </div>
                </div>

                {/* Horizontal Diamond Array (Scrollable on small devices) */}
                <div className="w-full overflow-x-auto pb-16 pt-16 px-4 sm:px-10 -mx-4 sm:-mx-10" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <div className="flex flex-row items-center justify-center w-max lg:w-full mx-auto relative px-8">
                        {/* Connecting UI Background Line */}
                        <div className="absolute top-1/2 left-[10%] w-[80%] h-[1px] bg-fuchsia-500/20 -z-10" />

                        {featuresData.map((feature, index) => (
                            <DiamondCard
                                key={index}
                                index={index}
                                title={feature.title}
                                subtitle={feature.subtitle}
                                Icon={feature.icon}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
