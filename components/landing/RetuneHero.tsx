"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function RetuneHero() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        const geometry = new THREE.BufferGeometry();
        const count = 1500;
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 20;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            size: 0.03,
            color: 0xffffff,
            transparent: true,
            opacity: 0.8
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        camera.position.z = 5;

        let time = 0;
        let animationFrameId: number;

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            time += 0.002;

            const positions = particles.geometry.attributes.position.array as Float32Array;

            for (let i = 0; i < count; i++) {
                const i3 = i * 3;
                positions[i3 + 1] += Math.sin(time + positions[i3]) * 0.002;
            }

            particles.rotation.y = time * 0.2;
            particles.rotation.x = time * 0.1;

            particles.geometry.attributes.position.needsUpdate = true;
            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            if (!containerRef.current) return;
            camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            container.removeChild(renderer.domElement);
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    const scrollToNext = () => {
        // Find the first section-container and scroll to it
        const firstSection = document.querySelector('.section-container');
        if (firstSection) {
            firstSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <header className="relative w-full h-screen flex flex-col justify-end p-6 md:p-12 overflow-hidden bg-[#050505] selection:bg-white selection:text-black">
            {/* The Three.js canvas container */}
            <div ref={containerRef} className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none" />

            <div className="relative z-10 w-full max-w-7xl mx-auto mb-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
                <div className="md:col-span-8 fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <div className="mono text-xs text-gray-500 mb-4 flex items-center gap-2">
                        <span>[ 00 ]</span>
                        <div className="h-[1px] w-12 bg-gray-800"></div>
                        <span>SIGNAL DETECTED</span>
                    </div>
                    <h1 className="text-[clamp(3rem,8vw,6rem)] leading-[0.9] tracking-[-0.02em] font-medium text-white">
                        Structure<br />
                        from the noise.
                    </h1>
                </div>
                <div className="md:col-span-4 fade-in-up flex flex-col gap-6" style={{ animationDelay: '0.4s' }}>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
                        Retune listens to the chaotic stream of live audio and crystallizes it into "brain tattoos"—permanent, structured insights.
                    </p>
                    <button onClick={scrollToNext} className="mono text-xs text-gray-600 text-left hover:text-white transition-colors cursor-pointer w-fit">
                        SCROLL TO CALIBRATE ↓
                    </button>
                </div>
            </div>

            {/* Corner Ornaments */}
            <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-white opacity-30"></div>
            <div className="absolute top-6 right-6 w-4 h-4 border-t border-r border-white opacity-30"></div>
            <div className="absolute bottom-6 left-6 w-4 h-4 border-b border-l border-white opacity-30"></div>
            <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-white opacity-30"></div>
        </header>
    );
}
