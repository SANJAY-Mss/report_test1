"use client";

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";

export function LumoHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const cursorCircleRef = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0xF0F0EB, 0.02);

        const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
        camera.position.set(0, 0, 8);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.03;
        controls.enableZoom = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1.5;
        controls.maxPolarAngle = Math.PI / 1.5;
        controls.minPolarAngle = Math.PI / 3;

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const mainSpot = new THREE.SpotLight(0xffffff, 20);
        mainSpot.position.set(5, 5, 5);
        mainSpot.angle = 0.4;
        mainSpot.penumbra = 0.3;
        mainSpot.castShadow = true;
        mainSpot.shadow.bias = -0.0001;
        scene.add(mainSpot);

        const fillLight = new THREE.PointLight(0xE6D5B8, 10);
        fillLight.position.set(-5, 0, 2);
        scene.add(fillLight);

        const backLight = new THREE.DirectionalLight(0xd4eaff, 5);
        backLight.position.set(0, 5, -5);
        scene.add(backLight);

        const heroGroup = new THREE.Group();
        scene.add(heroGroup);

        const glassMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            metalness: 0.1,
            roughness: 0.05,
            transmission: 0.95,
            thickness: 1.5,
            ior: 1.7,
            dispersion: 0.4,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
        });

        const goldMaterial = new THREE.MeshStandardMaterial({
            color: 0xD4AF37,
            metalness: 1.0,
            roughness: 0.15,
        });

        const geometry = new THREE.TorusKnotGeometry(1.2, 0.3, 150, 20, 2, 3);
        const mainMesh = new THREE.Mesh(geometry, glassMaterial);
        mainMesh.castShadow = true;
        mainMesh.receiveShadow = true;
        heroGroup.add(mainMesh);

        const ringGeo = new THREE.TorusGeometry(2.5, 0.02, 16, 100);
        const ring1 = new THREE.Mesh(ringGeo, goldMaterial);
        ring1.rotation.x = Math.PI / 1.8;
        heroGroup.add(ring1);

        const ring2 = new THREE.Mesh(ringGeo, goldMaterial);
        ring2.rotation.x = Math.PI / 2.2;
        ring2.rotation.y = Math.PI / 4;
        ring2.scale.set(0.8, 0.8, 0.8);
        heroGroup.add(ring2);

        const particleGeo = new THREE.IcosahedronGeometry(0.05, 0);
        for (let i = 0; i < 30; i++) {
            const particle = new THREE.Mesh(particleGeo, goldMaterial);
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);
            const radius = 2 + Math.random() * 2;

            particle.position.set(
                radius * Math.sin(phi) * Math.cos(theta),
                radius * Math.sin(phi) * Math.sin(theta),
                radius * Math.cos(phi)
            );

            particle.userData = {
                angle: theta,
                radius: radius,
                speed: 0.005 + Math.random() * 0.01,
                yOffset: Math.random() * Math.PI
            };

            heroGroup.add(particle);
        }

        let mouseX = 0;
        let mouseY = 0;
        let windowHalfX = window.innerWidth / 2;
        let windowHalfY = window.innerHeight / 2;

        const onDocumentMouseMove = (event: MouseEvent) => {
            mouseX = (event.clientX - windowHalfX) * 0.0005;
            mouseY = (event.clientY - windowHalfY) * 0.0005;

            // Custom cursor logic
            if (cursorDotRef.current && cursorCircleRef.current) {
                cursorDotRef.current.style.transform = `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%)`;
                setTimeout(() => {
                    if (cursorCircleRef.current) {
                        cursorCircleRef.current.style.transform = `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%)`;
                    }
                }, 80);
            }
        };

        document.addEventListener('mousemove', onDocumentMouseMove);

        const clock = new THREE.Clock();
        let animationFrameId: number;

        function animate() {
            animationFrameId = requestAnimationFrame(animate);

            const time = clock.getElapsedTime();
            controls.update();

            heroGroup.rotation.y += (mouseX - heroGroup.rotation.y) * 0.05;
            heroGroup.rotation.x += (mouseY - heroGroup.rotation.x) * 0.05;

            mainMesh.rotation.z = Math.sin(time * 0.2) * 0.1;

            ring1.rotation.z += 0.002;
            ring2.rotation.z -= 0.003;

            heroGroup.children.forEach(child => {
                if (child.userData.speed) {
                    child.userData.angle += child.userData.speed;
                    child.position.x = child.userData.radius * Math.cos(child.userData.angle);
                    child.position.z = child.userData.radius * Math.sin(child.userData.angle);
                    child.position.y += Math.sin(time + child.userData.yOffset) * 0.002;
                    child.rotation.x += 0.02;
                    child.rotation.y += 0.02;
                }
            });

            renderer.render(scene, camera);
        }

        animate();

        const handleResize = () => {
            if (!containerRef.current) return;
            camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;
        };

        window.addEventListener('resize', handleResize);

        // Hover logic for links
        const links = document.querySelectorAll('a, button, .nav-link');
        const handleMouseEnter = () => { if (cursorCircleRef.current) cursorCircleRef.current.classList.add('hovered'); };
        const handleMouseLeave = () => { if (cursorCircleRef.current) cursorCircleRef.current.classList.remove('hovered'); };

        links.forEach(link => {
            link.addEventListener('mouseenter', handleMouseEnter);
            link.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousemove', onDocumentMouseMove);
            links.forEach(link => {
                link.removeEventListener('mouseenter', handleMouseEnter);
                link.removeEventListener('mouseleave', handleMouseLeave);
            });
            cancelAnimationFrame(animationFrameId);
            container.removeChild(renderer.domElement);
            geometry.dispose();
            glassMaterial.dispose();
            goldMaterial.dispose();
            ringGeo.dispose();
            particleGeo.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <section className="relative w-full h-screen font-sans bg-lumo-alabaster text-lumo-obsidian selection:bg-lumo-burnished-gold selection:text-white cursor-none overflow-hidden isolate">
            {/* Custom Cursor */}
            <div ref={cursorDotRef} className="cursor-dot hidden md:block pointer-events-none z-[100]"></div>
            <div ref={cursorCircleRef} className="cursor-circle hidden md:block pointer-events-none z-[100]"></div>

            {/* Ambient Background & Noise */}
            <div className="ambient-bg pointer-events-none"></div>
            <div className="absolute inset-0 z-10 pointer-events-none opacity-50 bg-noise mix-blend-overlay"></div>

            {/* WebGL Container */}
            <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none"></div>

            <div className="relative z-20 h-full w-full flex flex-col justify-between p-6 md:p-10 pointer-events-none">
                {/* Header */}
                <header className="flex justify-between items-start pointer-events-auto w-full">
                    <div className="flex items-center gap-4 animate-in" style={{ animationDelay: '0.1s' }}>
                        <a href="#" className="group relative">
                            <span className="font-serif text-3xl font-semibold tracking-tighter text-lumo-obsidian">TRACKER</span>
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-lumo-obsidian transition-all duration-300 group-hover:w-full"></span>
                        </a>
                        <span className="hidden md:inline-block h-px w-8 bg-lumo-obsidian/20"></span>
                        <span className="hidden md:inline-block font-sans text-[10px] tracking-[0.2em] uppercase text-lumo-soft-gray">Project Tracker AI</span>
                    </div>

                    <nav className="hidden md:flex gap-12 animate-in" style={{ animationDelay: '0.2s' }}>
                        <a href="#features" className="nav-link font-display text-lg italic text-lumo-obsidian/70 hover:text-lumo-obsidian transition-colors">Features</a>
                        <Link href="/dashboard" className="nav-link font-display text-lg italic text-lumo-obsidian/70 hover:text-lumo-obsidian transition-colors">Dashboard</Link>
                        <a href="#pricing" className="nav-link font-display text-lg italic text-lumo-obsidian/70 hover:text-lumo-obsidian transition-colors">Pricing</a>
                    </nav>

                    <button onClick={() => setIsMenuOpen(true)} className="nav-link group flex flex-col items-end gap-1.5 animate-in relative z-[60]" style={{ animationDelay: '0.3s' }}>
                        <span className="font-sans text-[10px] tracking-widest uppercase mb-1 text-lumo-obsidian">Menu</span>
                        <span className="w-8 h-px bg-lumo-obsidian group-hover:w-12 transition-all duration-300"></span>
                        <span className="w-5 h-px bg-lumo-obsidian group-hover:w-8 transition-all duration-300 delay-75"></span>
                    </button>
                </header>

                {/* Main Content */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0">
                    <div className="flex justify-between items-center w-full px-[5%] md:px-[10%] opacity-90">
                        <h1 className="font-serif text-[9vw] leading-none tracking-tighter text-lumo-obsidian mix-blend-overlay animate-in" style={{ animationDelay: '0.5s' }}>
                            RE
                        </h1>
                        <h1 className="font-serif text-[9vw] leading-none tracking-tighter text-lumo-obsidian mix-blend-overlay animate-in" style={{ animationDelay: '0.6s' }}>
                            PORT
                        </h1>
                    </div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full mt-32 md:mt-48 z-50 pointer-events-none">
                        <p className="font-display italic text-xl md:text-2xl text-lumo-obsidian/60 tracking-wide animate-in" style={{ animationDelay: '0.8s' }}>
                            The geometry of validation
                        </p>
                        <div className="mt-8 animate-in pointer-events-auto relative z-50" style={{ animationDelay: '1s' }}>
                            <Link href="/dashboard" className="nav-link inline-flex items-center gap-3 px-6 py-3 border border-lumo-obsidian/20 hover:border-lumo-obsidian hover:bg-white/50 backdrop-blur-sm transition-all duration-500 rounded-full group text-lumo-obsidian">
                                <span className="font-sans text-[10px] uppercase tracking-[0.25em]">Launch Dashboard</span>
                                <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Side Decorations */}
                <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-8 animate-in" style={{ animationDelay: '1.2s' }}>
                    <div className="w-px h-16 bg-gradient-to-b from-transparent via-lumo-obsidian/30 to-transparent"></div>
                    <span className="vertical-text font-sans text-[9px] uppercase tracking-[0.3em] text-lumo-soft-gray">Scroll</span>
                    <div className="w-px h-16 bg-gradient-to-b from-transparent via-lumo-obsidian/30 to-transparent"></div>
                </div>

                <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4 animate-in" style={{ animationDelay: '1.3s' }}>
                    <button className="nav-link w-2 h-2 rounded-full bg-lumo-obsidian mb-2 hover:scale-150 transition-transform"></button>
                    <button className="nav-link w-1.5 h-1.5 rounded-full bg-lumo-obsidian/20 hover:bg-lumo-obsidian hover:scale-150 transition-all"></button>
                    <button className="nav-link w-1.5 h-1.5 rounded-full bg-lumo-obsidian/20 hover:bg-lumo-obsidian hover:scale-150 transition-all"></button>
                    <button className="nav-link w-1.5 h-1.5 rounded-full bg-lumo-obsidian/20 hover:bg-lumo-obsidian hover:scale-150 transition-all"></button>
                </div>

                {/* Footer section of Hero */}
                <footer className="flex justify-between items-end pointer-events-auto w-full animate-in" style={{ animationDelay: '0.4s' }}>
                    <div className="hidden md:block">
                        <div className="flex items-center gap-3 font-sans text-[10px] uppercase tracking-widest text-lumo-soft-gray">
                            <span className="w-2 h-2 rounded-full bg-green-500/50 animate-pulse"></span>
                            <span>Server Node Optimal</span>
                        </div>
                    </div>

                    <div className="flex-1 md:flex-none text-center md:text-right">
                        <div className="nav-link inline-block text-left bg-white/40 backdrop-blur-md border border-lumo-obsidian/60 p-5 rounded-lg max-w-[280px] hover:bg-white/60 transition-colors cursor-pointer group text-lumo-obsidian">
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-serif text-lg italic">Thesis Scan</span>
                                <span className="font-sans text-[10px] border border-lumo-obsidian/20 rounded px-1.5 py-0.5 ml-4 text-green-700 bg-green-100/50">ACTIVE</span>
                            </div>
                            <div className="w-full h-px bg-lumo-obsidian/10 my-2"></div>
                            <div className="flex justify-between items-end">
                                <span className="font-sans text-[10px] text-lumo-soft-gray uppercase tracking-wider">Anna University Ruleset</span>
                                <span className="font-sans text-xs font-medium group-hover:translate-x-1 transition-transform">Start Validation →</span>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>

            {/* Fullscreen Navigation Menu Overlay */}
            <div className={`fixed inset-0 z-[100] bg-lumo-alabaster/95 backdrop-blur-md transition-all duration-500 flex flex-col items-center justify-center ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <button
                    onClick={() => setIsMenuOpen(false)}
                    className="absolute top-10 right-6 md:right-10 nav-link group flex flex-col items-end gap-1.5 p-4"
                >
                    <span className="font-sans text-[10px] tracking-widest uppercase mb-1 text-lumo-obsidian">Close</span>
                    <div className="relative w-8 h-4">
                        <span className="absolute top-1/2 left-0 w-8 h-px bg-lumo-obsidian rotate-45 transition-colors"></span>
                        <span className="absolute top-1/2 left-0 w-8 h-px bg-lumo-obsidian -rotate-45 transition-colors"></span>
                    </div>
                </button>

                <nav className="flex flex-col items-center gap-8 md:gap-12 w-full max-w-lg px-6">
                    <Link href="/#features" onClick={() => setIsMenuOpen(false)} className="nav-link font-serif text-5xl md:text-7xl italic text-lumo-obsidian hover:text-lumo-obsidian/60 transition-colors text-center">Features</Link>
                    <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="nav-link font-serif text-5xl md:text-7xl italic text-lumo-obsidian hover:text-lumo-obsidian/60 transition-colors text-center">Dashboard</Link>
                    <Link href="/pricing" onClick={() => setIsMenuOpen(false)} className="nav-link font-serif text-5xl md:text-7xl italic text-lumo-obsidian hover:text-lumo-obsidian/60 transition-colors text-center">Pricing</Link>
                    <div className="w-16 h-px bg-lumo-obsidian/20 my-4 md:my-8"></div>
                    {session ? (
                        <button onClick={() => { setIsMenuOpen(false); signOut(); }} className="nav-link font-sans text-xs tracking-[0.2em] uppercase px-8 py-4 border border-lumo-obsidian hover:bg-lumo-obsidian hover:text-white transition-all rounded-full flex items-center gap-3 group">
                            Sign Out
                            <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </button>
                    ) : (
                        <Link href="/login" onClick={() => setIsMenuOpen(false)} className="nav-link font-sans text-xs tracking-[0.2em] uppercase px-8 py-4 border border-lumo-obsidian hover:bg-lumo-obsidian hover:text-white transition-all rounded-full flex items-center gap-3 group">
                            Sign In / Register
                            <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </Link>
                    )}
                </nav>
            </div>
        </section>
    );
}
