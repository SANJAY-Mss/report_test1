"use client";

import { useEffect, useState } from "react";
import { 
    MessageSquare, 
    Github, 
    Trello, // Using instead of Jira
    Cloud, // Using instead of AWS
    HardDrive, // Using instead of Google Drive
    LineChart, // Using instead of Salesforce
    Mail, // Using instead of HubSpot
    Zap, // Using instead of Zapier
    Database, // Using instead of Snowflake
    CreditCard, // Using instead of Stripe
    Bot, // OpenAI
    Brain // Anthropic
} from "lucide-react";

export function IntegrationsSection() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const integrations = [
        { name: "OpenAI", category: "LLM", svg: '<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.896zm16.597 3.855l-5.843-3.372 2.02-1.163a.076.076 0 0 1 .071 0l4.83 2.786a4.49 4.49 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.402-.678zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"></path></svg>', delay: 300 },
        { name: "Anthropic", category: "LLM", svg: '<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M13.827 3.52h3.603L24 20.48h-3.603l-6.57-16.96zm-7.258 0h3.767L16.906 20.48h-3.674l-1.343-3.461H5.017l-1.344 3.46H0L6.57 3.522zm4.132 10.959L8.453 7.687 6.205 14.48H10.7z"></path></svg>', delay: 330 },
        { name: "Slack", category: "Communication", svg: '<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zm10.122 2.521a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.268 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zm-2.523 10.122a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.268a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"></path></svg>', delay: 360 },
        { name: "GitHub", category: "Code", svg: '<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>', delay: 390 },
        { name: "Jira", category: "Project", svg: '<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.004-1.005zm5.723-5.756H5.736a5.215 5.215 0 0 0 5.215 5.214h2.129v2.058a5.218 5.218 0 0 0 5.215 5.214V6.762a1.005 1.005 0 0 0-1.001-1.005zM23.013 0H11.455a5.215 5.215 0 0 0 5.215 5.215h2.129v2.057A5.215 5.215 0 0 0 24.017 12.49V1.005A1.005 1.005 0 0 0 23.013 0z"></path></svg>', delay: 420 },
        { name: "AWS S3", category: "Storage", svg: '<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M11.87 0l.36.21v23.18l-.36.21-9.56-4.54V4.54L11.87 0zm.79.21l9.56 4.54v14.5l-9.56 4.54V.21zM5.87 16.26l5.21 2.48v-4.96l-5.21-1.02v3.5zm0-4.2l5.21 1.02V8.12L5.87 10.6v1.46zm0-2.22l5.21-2.48V3.4l-5.21 2.48v3.96zm7 6.42l5.21-2.48V10.6l-5.21 1.02v4.64zm0-5.42l5.21-1.02V5.88l-5.21 2.48v2.48z"></path></svg>', delay: 450 },
        { name: "Google Drive", category: "Docs", svg: '<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M6.28 0l5.76 9.97H0L6.28 0zm11.44 0L24 9.97h-5.73L12.52 0h5.2zm1.16 10.82L24 19.94 17.72 24l-3.21-5.56 4.37-7.62zm-9.96.12L12 13.5l3.08-2.56H8.92zm-4.13 0L0 19.94l6.28 4.06 6.72-11.64-3.21-2.44zM12 14.06l-5.52 9.57h11.04L12 14.06z"></path></svg>', delay: 480 },
        { name: "Salesforce", category: "CRM", svg: '<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M9.765 3.782a4.31 4.31 0 0 1 3.104-1.314 4.35 4.35 0 0 1 3.91 2.43 3.304 3.304 0 0 1 1.38-.301 3.33 3.33 0 0 1 3.327 3.33c0 .27-.033.53-.092.78a2.978 2.978 0 0 1-.485 5.88H6.58a3.644 3.644 0 0 1-.573-7.236 4.32 4.32 0 0 1 3.758-3.57z"></path></svg>', delay: 510 },
        { name: "HubSpot", category: "Marketing", svg: '<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M22.175 11.282a4.258 4.258 0 0 0-3.651-4.205V5.047a1.558 1.558 0 0 0 .898-1.406V3.6a1.561 1.561 0 0 0-3.123 0v.041c0 .626.372 1.166.898 1.406V7.08a4.239 4.239 0 0 0-2.027.78L8.916 4.28a1.856 1.856 0 0 0 .065-.47A1.855 1.855 0 1 0 7.125 5.66l5.92 3.51a4.267 4.267 0 0 0 .44 5.51l-1.75 1.75a1.404 1.404 0 0 0-.407-.062 1.42 1.42 0 1 0 1.42 1.42 1.404 1.404 0 0 0-.062-.407l1.73-1.73a4.27 4.27 0 1 0 7.759-4.369zm-4.27 2.764a1.84 1.84 0 1 1 0-3.68 1.84 1.84 0 0 1 0 3.68z"></path></svg>', delay: 540 },
        { name: "Zapier", category: "Auto", svg: '<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M14.974 10.61a5.978 5.978 0 0 1-.551 2.507H24v-5.01H14.422a5.978 5.978 0 0 1 .552 2.503zm-5.95 0a5.978 5.978 0 0 1 .552-2.503H0v5.01h9.576a5.978 5.978 0 0 1-.551-2.507zM12 16.56a5.966 5.966 0 0 1-2.505-.55v9.564h5.01V16.01A5.966 5.966 0 0 1 12 16.56zm0-11.9a5.97 5.97 0 0 1 2.505.55V5.646a.555.555 0 0 0 0-.075V-.43h-5.01v5.643A5.97 5.97 0 0 1 12 4.66z"></path></svg>', delay: 570 },
        { name: "Snowflake", category: "Data", svg: '<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M13.1 1.049a1.1 1.1 0 0 0-2.2 0v3.388L8.746 2.283a1.1 1.1 0 0 0-1.556 1.556L9.957 6.6H6.57a1.1 1.1 0 0 0 0 2.2h3.387l-2.764 2.764a1.1 1.1 0 0 0 1.555 1.555L11.9 9.966v2.434a1.1 1.1 0 0 0 2.2 0V9.966l2.752 2.753a1.1 1.1 0 0 0 1.556-1.555L15.644 8.8H19.03a1.1 1.1 0 1 0 0-2.2h-3.386l2.766-2.761a1.1 1.1 0 0 0-1.556-1.556L14.1 4.437V1.049zM1.049 10.9a1.1 1.1 0 0 0 0 2.2h3.388l-2.154 2.154a1.1 1.1 0 0 0 1.556 1.556L6.6 14.043v3.387a1.1 1.1 0 0 0 2.2 0V14.043l2.764 2.767a1.1 1.1 0 0 0 1.555-1.556L9.966 12.1h2.434a1.1 1.1 0 0 0 0-2.2H9.966l2.753-2.752a1.1 1.1 0 0 0-1.555-1.556L8.8 8.356V4.97a1.1 1.1 0 0 0-2.2 0v3.386L4.439 5.59A1.1 1.1 0 0 0 2.883 7.146L5.437 9.9H1.049zm11.851 2.2h2.434l-2.767 2.764a1.1 1.1 0 0 0 1.556 1.556L16.87 14.662v2.768a1.1 1.1 0 0 0 2.2 0v-3.387l2.154 2.154a1.1 1.1 0 0 0 1.556-1.556L20.626 12.4h2.325a1.1 1.1 0 1 0 0-2.2H20.62l2.117-2.754a1.1 1.1 0 0 0-1.556-1.556L18.429 8.642V5.256a1.1 1.1 0 1 0-2.2 0V8.35l-2.764-2.766a1.1 1.1 0 0 0-1.556 1.556L14.662 9.9H12.9a1.1 1.1 0 1 0 0 2.2h-.001zm1.1 1.1v2.434l-2.753 2.752a1.1 1.1 0 0 0 1.555 1.556L15.556 18.2v3.386a1.1 1.1 0 0 0 2.2 0V18.2l2.154 2.742a1.1 1.1 0 0 0 1.556-1.556l-2.154-2.154h3.387a1.1 1.1 0 1 0 0-2.2H14z"></path></svg>', delay: 600 },
        { name: "Stripe", category: "Payments", svg: '<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z"></path></svg>', delay: 630 },
    ];

    return (
        <section id="integrations" className="py-32 lg:py-48 bg-black border-t border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#eca8d6]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
            
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-24">
                    <div className="lg:max-w-2xl">
                        <span className="inline-block text-white/50 font-mono text-xs mb-6 uppercase tracking-wider">
                            [ INTEGRATIONS ]
                        </span>
                        <h2 className="text-4xl lg:text-7xl font-display text-white mb-6 tracking-tight">
                            Connects with<br />everything.
                        </h2>
                    </div>
                    
                    <div className="lg:max-w-md lg:pt-12">
                        <p className="text-white/60 font-sans text-lg mb-8">
                            Your agents connect to 100+ tools and services. They read, write, and act autonomously across your entire stack.
                        </p>
                        <button className="h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-white/20 bg-transparent hover:bg-white/10 text-white group">
                            Explore integration docs
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-24">
                    {integrations.map((integration, idx) => (
                        <div 
                            key={idx} 
                            className={`group relative overflow-hidden p-6 lg:p-8 border transition-all duration-500 cursor-default border-white/10 hover:border-white/30 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                            style={{ transitionDelay: `${integration.delay}ms` }}
                        >
                            <span className="absolute top-3 right-3 text-[10px] font-mono px-2 py-0.5 transition-colors bg-white/10 text-white/60">
                                {integration.category}
                            </span>
                            <div 
                                className="w-10 h-10 mb-6 flex items-center justify-center transition-colors text-white/60 group-hover:text-white group-hover:scale-110 duration-300"
                                dangerouslySetInnerHTML={{ __html: integration.svg }}
                            />
                            <span className="font-medium block text-white">{integration.name}</span>
                            <div className="absolute bottom-0 left-0 right-0 h-px bg-white/20 overflow-hidden">
                                <div className="h-full bg-white transition-all duration-500 w-0 group-hover:w-full"></div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={`flex flex-wrap items-center justify-between gap-8 pt-12 border-t border-white/10 transition-all duration-1000 delay-500 pb-32 lg:pb-40 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex flex-wrap gap-12">
                        <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-display text-white">100+</span>
                            <span className="text-sm text-white/50">Integrations</span>
                        </div>
                        <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-display text-white">OAuth</span>
                            <span className="text-sm text-white/50">Auth built-in</span>
                        </div>
                        <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-display text-white">Webhooks</span>
                            <span className="text-sm text-white/50">Real-time sync</span>
                        </div>
                    </div>
                    <a href="#" className="group inline-flex items-center gap-2 text-sm font-mono text-white/50 hover:text-white transition-colors">
                        View all integrations
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
