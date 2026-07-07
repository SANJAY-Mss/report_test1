"use client";

import { useEffect, useRef, useState } from "react";

// --- Subcomponent: Live Ingestion (Waveform Canvas) ---
function LiveIngestion() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            if (!canvas.parentElement) return;
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        let offset = 0;
        let animationFrameId: number;

        const draw = () => {
            ctx.fillStyle = '#f8fafc';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.strokeStyle = '#cbd5e1';
            ctx.lineWidth = 1;
            ctx.beginPath();

            const cy = canvas.height / 2;

            for (let i = 0; i < canvas.width; i += 5) {
                const amplitude = Math.sin(i * 0.02 + offset) * (Math.sin(offset * 0.5) * 40);
                ctx.moveTo(i, cy - amplitude);
                ctx.lineTo(i, cy + amplitude);
            }

            ctx.stroke();

            // Random particles
            ctx.fillStyle = '#94a3b8';
            for (let i = 0; i < 5; i++) {
                const rx = Math.random() * canvas.width;
                const ry = cy + (Math.random() - 0.5) * 10;
                ctx.fillRect(rx, ry, 2, 2);
            }

            offset += 0.05;
            animationFrameId = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        }
    }, []);

    return (
        <section className="min-h-[80vh] w-full flex items-center justify-center p-6 md:p-12 border-t border-slate-200 bg-white">
            <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center group section-container">
                <div className="order-2 md:order-1">
                    <div className="mono text-xs text-slate-500 mb-6 flex items-center gap-2">
                        <span>[ 01 ]</span>
                        <div className="h-[1px] w-8 bg-slate-300"></div>
                        <span>DOCUMENT INGESTION</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #00bfff 0%, #00ffff 100%)' }}>
                        Seamless Upload,<br />instant parsing.
                    </h2>
                    <p className="text-slate-600 text-lg leading-relaxed mb-8 max-w-md">
                        Drop your academic report in PDF or DOCX format. ProjectTracker instantly extracts the text and prepares the layout for comprehensive structural validation.
                    </p>
                    <ul className="mono text-xs text-slate-500 space-y-2 border-l border-slate-300 pl-4">
                        <li className="flex justify-between w-48"><span>UPLOAD SPEED</span> <span>Instant</span></li>
                        <li className="flex justify-between w-48"><span>FORMAT</span> <span>PDF/DOCX</span></li>
                        <li className="flex justify-between w-48"><span>SECURITY</span> <span>Encrypted</span></li>
                    </ul>
                </div>
                <div className="order-1 md:order-2 relative h-[300px] md:h-auto md:aspect-video bg-slate-50 active-card group-hover:bg-slate-100 transition-colors duration-500 flex items-center justify-center overflow-hidden border border-slate-200">
                    <div className="bracket-corner bl-tl"></div>
                    <div className="bracket-corner bl-tr"></div>
                    <div className="bracket-corner bl-br"></div>
                    <div className="bracket-corner bl-bl"></div>

                    <canvas ref={canvasRef} className="w-full h-full opacity-60 block"></canvas>

                    <div className="absolute bottom-4 left-4 mono text-[10px] text-slate-400">
                        INPUT_SOURCE: MIC_ARRAY_01
                    </div>
                </div>
            </div>
        </section>
    );
}

// --- Subcomponent: Context Engine (Floating Nodes) ---
function ContextEngine() {
    const [nodes, setNodes] = useState<{ id: number, top: string, left: string, bg: string, shadow: string }[]>([]);

    useEffect(() => {
        // Init nodes
        const initialNodes = Array.from({ length: 8 }).map((_, i) => ({
            id: i,
            top: Math.random() * 80 + 10 + '%',
            left: Math.random() * 80 + 10 + '%',
            bg: '#4b5563',
            shadow: 'none'
        }));
        setNodes(initialNodes);

        const interval = setInterval(() => {
            setNodes(prev => prev.map(node => {
                const isFlashing = Math.random() > 0.7;
                return {
                    ...node,
                    top: Math.random() * 80 + 10 + '%',
                    left: Math.random() * 80 + 10 + '%',
                    bg: isFlashing ? '#0ea5e9' : '#cbd5e1',
                    shadow: isFlashing ? '0 0 10px rgba(14, 165, 233, 0.5)' : 'none'
                }
            }));

            // Reset flashes shortly after
            setTimeout(() => {
                setNodes(prev => prev.map(node => ({
                    ...node,
                    bg: '#cbd5e1',
                    shadow: 'none'
                })))
            }, 500);

        }, 2500);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="min-h-[80vh] w-full flex items-center justify-center p-6 md:p-12 border-t border-slate-200 bg-white">
            <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center section-container group">
                <div className="relative h-[300px] md:h-auto md:aspect-video bg-slate-50 active-card flex items-center justify-center overflow-hidden group-hover:bg-slate-100 transition-colors duration-500 border border-slate-200">
                    <div className="bracket-corner bl-tl"></div>
                    <div className="bracket-corner bl-tr"></div>
                    <div className="bracket-corner bl-br"></div>
                    <div className="bracket-corner bl-bl"></div>

                    <div className="relative w-full h-full">
                        {nodes.map(node => (
                            <div
                                key={node.id}
                                className="absolute w-2 h-2 rounded-full transition-all duration-1000"
                                style={{
                                    top: node.top,
                                    left: node.left,
                                    backgroundColor: node.bg,
                                    boxShadow: node.shadow
                                }}
                            />
                        ))}
                    </div>

                    <div className="absolute top-4 right-4 mono text-[10px] text-slate-400 text-right">
                        STATUS: MAPPING<br />NODES: 4,021
                    </div>
                </div>

                <div>
                    <div className="mono text-xs text-slate-500 mb-6 flex items-center gap-2">
                        <span>[ 02 ]</span>
                        <div className="h-[1px] w-8 bg-slate-300"></div>
                        <span>AI VALIDATION</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #00bfff 0%, #00ffff 100%)' }}>
                        Structural &amp;<br />Formatting Checks.
                    </h2>
                    <p className="text-slate-600 text-lg leading-relaxed mb-8 max-w-md">
                        Our specialized AI scans your document against 12 critical university formatting requirements, identifying exact sections with margin, structural, or layout violations.
                    </p>
                </div>
            </div>
        </section>
    );
}

// --- Subcomponent: Synthesis (Scrambling text) ---
function Synthesis() {
    const [displayText, setDisplayText] = useState("ERRORS");
    const words = ['ERRORS', 'TYPOS', 'VIOLATIONS', 'MISTAKES', 'PERFECTION'];
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    useEffect(() => {
        let index = 0;
        let scrambleInterval: NodeJS.Timeout;
        let wordInterval: NodeJS.Timeout;

        const scramble = (targetText: string) => {
            let iterations = 0;
            clearInterval(scrambleInterval);

            scrambleInterval = setInterval(() => {
                setDisplayText(targetText.split('')
                    .map((letter, i) => {
                        if (i < iterations) return targetText[i];
                        return chars[Math.floor(Math.random() * 36)];
                    })
                    .join(''));

                if (iterations >= targetText.length) clearInterval(scrambleInterval);
                iterations += 1 / 3;
            }, 30);
        };

        wordInterval = setInterval(() => {
            index = (index + 1) % words.length;
            scramble(words[index]);
        }, 3000);

        return () => {
            clearInterval(wordInterval);
            clearInterval(scrambleInterval);
        };
    }, []);

    return (
        <section className="min-h-[80vh] w-full flex items-center justify-center p-6 md:p-12 border-t border-slate-200 bg-white">
            <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center section-container group">
                <div className="order-2 md:order-1">
                    <div className="mono text-xs text-slate-500 mb-6 flex items-center gap-2">
                        <span>[ 03 ]</span>
                        <div className="h-[1px] w-8 bg-slate-300"></div>
                        <span>ACTIONABLE INSIGHTS</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #00bfff 0%, #00ffff 100%)' }}>
                        Flawless Reports.
                    </h2>
                    <p className="text-slate-600 text-lg leading-relaxed mb-8 max-w-md">
                        Not just a simple alert. Detailed, actionable inline suggestions natively highlighting exact structural, grammatical, and formatting errors.
                    </p>
                    <button className="text-slate-800 border-b border-slate-800 pb-1 hover:opacity-70 transition-opacity mono text-xs tracking-widest uppercase bg-transparent">
                        Explore Features
                    </button>
                </div>

                <div className="order-1 md:order-2 relative h-[300px] md:h-auto md:aspect-video bg-slate-50 active-card flex items-center justify-center overflow-hidden group-hover:bg-slate-100 transition-colors duration-500 border border-slate-200">
                    <div className="bracket-corner bl-tl"></div>
                    <div className="bracket-corner bl-tr"></div>
                    <div className="bracket-corner bl-br"></div>
                    <div className="bracket-corner bl-bl"></div>

                    <div className="text-center">
                        <div className="text-3xl text-slate-900 font-light tracking-widest uppercase">
                            {displayText}
                        </div>
                        <div className="w-[1px] h-12 bg-slate-300 mx-auto my-4"></div>
                        <div className="mono text-[10px] text-slate-400 uppercase">RESOLVING...</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// --- Main Export ---
export function RetuneEngine() {
    useEffect(() => {
        // Intersection Observer to handle the dimming effect
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('dimmed');
                } else {
                    entry.target.classList.add('dimmed');
                }
            });
        }, { threshold: 0.5 });

        const sections = document.querySelectorAll('.section-container');
        sections.forEach(sec => observer.observe(sec));

        return () => {
            sections.forEach(sec => observer.unobserve(sec));
            observer.disconnect();
        };
    }, []);

    return (
        <div className="w-full relative z-10 bg-white">
            <LiveIngestion />
            <ContextEngine />
            <Synthesis />
        </div>
    );
}
