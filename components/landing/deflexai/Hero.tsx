"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export function Hero() {
   const canvasRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      let animationId: number;
      let renderer: any;

      const init = async () => {
         const THREE = await import('three');
         const container = canvasRef.current;
         if (!container) return;

         const scene = new THREE.Scene();
         const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
         renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

         renderer.setSize(container.clientWidth, container.clientHeight);
         renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
            opacity: 0.8,
         });

         const particles = new THREE.Points(geometry, material);
         scene.add(particles);

         camera.position.z = 5;

         let time = 0;

         const animate = () => {
            animationId = requestAnimationFrame(animate);
            time += 0.002;

            const pos = particles.geometry.attributes.position.array as Float32Array;

            for (let i = 0; i < count; i++) {
               const i3 = i * 3;
               pos[i3 + 1] += Math.sin(time + pos[i3]) * 0.002;
            }

            particles.rotation.y = time * 0.2;
            particles.rotation.x = time * 0.1;

            particles.geometry.attributes.position.needsUpdate = true;
            renderer.render(scene, camera);
         };
         animate();

         const handleResize = () => {
            if (!container) return;
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
         };

         window.addEventListener('resize', handleResize);

         return () => {
            window.removeEventListener('resize', handleResize);
         };
      };

      init();

      return () => {
         if (animationId) cancelAnimationFrame(animationId);
         if (renderer) renderer.dispose();
         if (canvasRef.current) {
            const canvas = canvasRef.current.querySelector('canvas');
            if (canvas) canvas.remove();
         }
      };
   }, []);

   return (
      <header className="relative w-full h-screen flex flex-col justify-end p-6 md:p-12 overflow-hidden bg-[#050505]">
         {/* Three.js Particle Canvas */}
         <div
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
         />



         {/* Hero Content */}
         <div className="relative z-10 w-full max-w-4xl mx-auto mb-12 flex flex-col items-center text-center">
            {/* Main Title */}
            <div className="fade-in-up flex flex-col items-center" style={{ animationDelay: '0.2s' }}>

               <h1 className="hero-title text-white mb-8">
                  Perfect formatting.
                  <br />
                  <span className="text-gray-500">Zero effort.</span>
               </h1>
            </div>

            {/* Description + Badge */}
            <div className="fade-in-up flex flex-col items-center gap-8 w-full" style={{ animationDelay: '0.4s' }}>
               
               <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                  Instantly scan your project report for formatting errors and structural compliance — powered by AI.
               </p>
               


               {/* CTAs */}
               <div className="flex items-center justify-center gap-6 mt-4">
                  <Link
                     href="/signup"
                     className="retune-btn-primary hover:bg-white hover:text-black py-4 px-8 text-sm"
                  >
                     Start Scanning →
                  </Link>
                  <Link
                     href="/#features"
                     className="mono text-xs text-white opacity-40 hover:opacity-100 transition-opacity uppercase tracking-widest border-b border-white/20 pb-1"
                  >
                     See Features
                  </Link>
               </div>

               <div className="mono text-xs text-gray-600 mt-8">
                  SCROLL TO EXPLORE ↓
               </div>
            </div>
         </div>

         {/* Floating Mockup Card */}
         <div
            className="relative z-10 max-w-sm mx-auto w-full px-4 mb-8 fade-in-up"
            style={{ animationDelay: '0.6s' }}
         >
            <div className="bg-[#0a0a0a] backdrop-blur-xl rounded-lg border border-[#1a1a1a] p-5 flex flex-col gap-3 text-left relative hover:bg-[#0e0e0e] transition-colors duration-500">
               {/* Bracket Corners */}
               {/* Success Row */}
               <div className="flex items-start gap-4 bg-white/5 p-4 rounded-lg border border-white/5">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 shrink-0 flex items-center justify-center font-bold text-green-400 text-xs">✓</div>
                  <div>
                     <p className="text-[13px] font-semibold text-gray-200 leading-snug"><span className="font-bold">Final_Project_Report.pdf</span> analyzed</p>
                     <p className="text-[11px] text-gray-500 mt-0.5">Just now • Score: <span className="text-green-400 font-semibold">98% (Excellent)</span></p>
                  </div>
               </div>
               {/* Warning Row */}
               <div className="flex items-start gap-4 bg-white/[0.02] p-4 rounded-lg border border-white/5">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 shrink-0 flex items-center justify-center font-bold text-amber-400 text-xs">!</div>
                  <div>
                     <p className="text-[13px] font-semibold text-gray-200 leading-snug"><span className="font-bold">Formatting Issue</span></p>
                     <p className="text-[11px] text-gray-500 mt-0.5">Page 12 margins are <span className="text-amber-400 font-medium bg-amber-500/10 px-1.5 py-0.5 rounded">1.5&quot; (expected 1.0&quot;)</span></p>
                  </div>
               </div>

               <div className="mono text-[10px] text-gray-600 text-right">
                  STATUS: SCAN_COMPLETE
               </div>
            </div>
         </div>

         {/* Hero Title CSS */}
         <style dangerouslySetInnerHTML={{
            __html: `
            .hero-title {
               font-size: clamp(3rem, 8vw, 6rem);
               line-height: 0.9;
               letter-spacing: -0.02em;
               font-weight: 500;
            }
         `}} />
      </header>
   );
}
