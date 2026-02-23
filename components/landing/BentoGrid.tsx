"use client";

import { cn } from "@/lib/utils";
import React, { ReactNode, useRef, useState } from "react";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: ReactNode;
}) => {
    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto items-stretch",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoCard = ({
    className,
    title,
    description,
    header,
    icon,
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
}) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setOpacity(1);
    };

    const handleBlur = () => {
        setOpacity(0);
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "row-span-1 rounded-2xl group/bento hover:shadow-2xl transition duration-300 shadow-none p-6 justify-between flex flex-col space-y-4 relative overflow-hidden h-full",
                "glass-panel border-white/10 hover:border-blue-500/30 bg-[#0a0a0f]/40",
                className
            )}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover/bento:opacity-100 z-30"
                style={{
                    opacity,
                    background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(59, 130, 246, 0.15), transparent 80%)`,
                }}
            />
            {/* Header Container */}
            <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 border border-transparent dark:border-white/[0.2] overflow-hidden relative z-10">
                {header}
            </div>

            <div className="group-hover/bento:translate-x-2 transition duration-200 relative z-20">
                {icon}
                <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
                    {title}
                </div>
                <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
                    {description}
                </div>
            </div>
        </div>
    );
};
