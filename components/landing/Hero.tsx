"use client";

import React, { useEffect, useState } from 'react';
import './Hero.css';

export function Hero() {
    const [rate, setRate] = useState("92.5");
    const baseRate = 92.5;

    useEffect(() => {
        const interval = setInterval(() => {
            const jitter = (Math.random() * 0.4) - 0.2;
            const newRateValue = baseRate + jitter;

            // Format to 1 decimal place to look like a score (e.g. 92.5)
            const newRateFormatted = newRateValue.toFixed(1);
            setRate(newRateFormatted);
        }, 2000);

        return () => clearInterval(interval);
    }, [baseRate]);

    return (
        <div className="hero-container">
            {/* Grid Overlay inside the Hero section */}
            <div className="grid-overlay">
                <div className="grid-line-v"></div>
                <div className="grid-line-v"></div>
                <div className="grid-line-v"></div>
                <div className="grid-line-v"></div>
                <div className="grid-line-h"></div>
            </div>

            <nav>
                <div className="logo">REPORTGUARD</div>
                <div className="nav-links">
                    <a href="#" className="nav-item">Features</a>
                    <a href="#" className="nav-item">Guidelines</a>
                    <a href="#" className="nav-item">Pricing</a>
                    <a href="#" className="nav-item">About</a>
                </div>
                <button className="cta-small">Upload Report</button>
            </nav>

            <main>
                <div className="content-wrapper">

                    {/* Left side text content */}
                    <div className="hero-text">
                        <div className="compliance-badge">
                            <div className="status-dot"></div>
                            <span className="label-technical">ANNA UNIVERSITY COMPLIANT</span>
                        </div>

                        <h1>ACADEMIC<br />COMPLIANCE</h1>

                        <p className="hero-sub">
                            The definitive AI analyzer for academic reports. Validate formatting, structure, and grammar instantly against university guidelines.
                        </p>

                        <div className="stats-row">
                            <div className="stat-block">
                                <div className="label-technical">AVG ANALYSIS</div>
                                <h4 className="value-mono">4.2s</h4>
                            </div>
                            <div className="stat-block">
                                <div className="label-technical">ACCURACY</div>
                                <h4 className="value-mono">99.9%</h4>
                            </div>
                            <div className="stat-block">
                                <div className="label-technical">REPORTS SCANNED</div>
                                <h4 className="value-mono">10K+</h4>
                            </div>
                        </div>
                    </div>

                    {/* Right side interactive dashboard graphic */}
                    <div className="converter-container">

                        {/* Radar elements */}
                        <div className="radar-bg"></div>
                        <div className="acid-arc"></div>
                        <div className="acid-arc-sharp"></div>
                        <div className="radar-ring ring-1"></div>
                        <div className="radar-ring ring-2"></div>
                        <div className="radar-ring ring-3"></div>
                        <div className="scanner"></div>
                        <div className="dot"></div>

                        {/* HUD Labels */}
                        <div className="hud-label hl-top">AI VALIDATION</div>
                        <div className="hud-label hl-right">PATTERN RECOGNITION</div>
                        <div className="hud-label hl-bottom">SYSTEM STATUS: OPTIMAL</div>
                        <div className="hud-label hl-left">GRAMMAR CHECK</div>

                        {/* Centered Converter Card */}
                        <div className="converter-card">
                            <div className="input-group">
                                <div className="input-row">
                                    <span className="label-technical">YOU UPLOAD</span>
                                    <span className="label-technical">LIMIT: 10MB</span>
                                </div>
                                <div className="input-row">
                                    <input type="text" className="currency-input" defaultValue="thesis_v2" />
                                    <span className="currency-badge">PDF</span>
                                </div>
                            </div>

                            <div className="divider-icon">
                                <div className="divider-line"></div>
                            </div>

                            <div className="input-group">
                                <div className="input-row">
                                    <span className="label-technical">COMPLIANCE SCORE</span>
                                    <span className="label-technical">READY</span>
                                </div>
                                <div className="input-row">
                                    <input
                                        type="text"
                                        className="currency-input"
                                        value={rate}
                                        readOnly
                                        style={{ color: 'var(--accent-lime)' }}
                                    />
                                    <span className="currency-badge">SCORE</span>
                                </div>
                            </div>

                            <div style={{ height: '1px', background: '#222', margin: '8px 0' }}></div>

                            <div className="input-row">
                                <span className="label-technical">PLAGIARISM RISK</span>
                                <span className="label-technical" style={{ color: 'var(--text-primary)' }}>LOW</span>
                            </div>

                            <button className="btn-primary">
                                Analyze Report
                                <div className="btn-arrow">➜</div>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
