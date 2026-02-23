"use client";

import { useEffect, useState, useRef } from "react";

interface AnimatedCounterProps {
    value: number;
    suffix?: string;
    prefix?: string;
    className?: string;
}

export function AnimatedCounter({ value, suffix = "", prefix = "", className = "" }: AnimatedCounterProps) {
    const [count, setCount] = useState(0);
    const countRef = useRef(0);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // We only animate counting if the value > 0
        if (value === 0) {
            setCount(0);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    let startTime: number;
                    const duration = 2000;

                    const step = (timestamp: number) => {
                        if (!startTime) startTime = timestamp;
                        const progress = Math.min((timestamp - startTime) / duration, 1);

                        // easeOutExpo
                        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                        const currentCount = Math.floor(easeProgress * value);

                        if (currentCount !== countRef.current) {
                            countRef.current = currentCount;
                            setCount(currentCount);
                        }

                        if (progress < 1) {
                            requestAnimationFrame(step);
                        } else {
                            setCount(value);
                        }
                    };

                    requestAnimationFrame(step);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, [value]);

    return (
        <span ref={elementRef} className={className}>
            {prefix}{count}{suffix}
        </span>
    );
}
