"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import { Calendar, Users } from "lucide-react";

export function AnimatedAboutVisual() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values to track the raw pointer coordinates relative to the container center
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map the raw mouse positions to angle rotations (-7deg to 7deg max tilt range for elegant subtlety)
  const rotateX = useTransform(y, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-7, 7]);

  // Map mouse positions to inverse translations for elements inside to create depth parallax layers
  const innerX = useTransform(x, [-0.5, 0.5], [-12, 12]);
  const innerY = useTransform(y, [-0.5, 0.5], [-12, 12]);

  // Spring configurations for ultra-smooth inertia tracking
  const springConfig = { damping: 25, stiffness: 180, mass: 0.6 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);
  const springInnerX = useSpring(innerX, springConfig);
  const springInnerY = useSpring(innerY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Normalize values between -0.5 and 0.5
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    // Smoothly reset the position when mouse leaves the bounding box
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-full w-full bg-navy/90 p-4 flex items-center justify-center select-none cursor-pointer [perspective:1000px]"
    >
      {/* Blueprint Grid Interior */}
      <div className="absolute inset-0 bg-grid-lines-dark opacity-[0.15] mix-blend-overlay pointer-events-none" />
      
      {/* Background soft radial lighting */}
      <div className="absolute top-1/2 left-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cherry/10 blur-3xl pointer-events-none" />

      {/* Main Base Card with dynamic 3D rotations */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d"
        }}
        className="relative w-full h-full rounded-lg border border-white/5 shadow-2xl transition-shadow duration-300 hover:shadow-cherry/10"
      >
        {/* Underlayer Base Image */}
        <div className="absolute inset-0 rounded-lg overflow-hidden [transform:translateZ(0px)]">
          <Image
            src="/images/gallery/conferences/futurex-industry-conference-4.webp"
            alt="Futurex B2B Event Floor"
            fill
            priority
            sizes="(max-w-7xl) 50vw, 100vw"
            className="object-cover object-center filter brightness-[0.85] contrast-[1.05]"
          />
          {/* Dark subtle gradient overlay over image */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-navy/20" />
        </div>

        {/* Floating Premium Card 1: Top Right - Shifted high on Z-axis */}
        <motion.div
          style={{
            x: springInnerX,
            y: springInnerY,
            transformStyle: "preserve-3d"
          }}
          className="absolute top-6 right-6 flex items-center gap-3 rounded-xl border border-white/10 bg-navy/40 p-3 backdrop-blur-md shadow-lg [transform:translateZ(40px)] pointer-events-none"
        >
          <div className="flex size-10 items-center justify-center rounded-lg bg-cherry/10 text-cherry border border-cherry/20">
            <Calendar className="size-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/40 leading-none">Delivered</p>
            <p className="mt-1 text-base font-black text-white leading-none">220+ Events</p>
          </div>
        </motion.div>

        {/* Floating Premium Card 2: Bottom Right - Shifted high on Z-axis */}
        <motion.div
          style={{
            x: springInnerX,
            y: springInnerY,
            transformStyle: "preserve-3d"
          }}
          className="absolute bottom-6 right-6 flex items-center gap-3 rounded-xl border border-white/10 bg-navy/40 p-3 backdrop-blur-md shadow-lg [transform:translateZ(50px)] pointer-events-none"
        >
          <div className="flex size-10 items-center justify-center rounded-lg bg-white/5 text-white border border-white/10">
            <Users className="size-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/40 leading-none">Networked</p>
            <p className="mt-1 text-base font-black text-white leading-none">950k+ Visitors</p>
          </div>
        </motion.div>

        {/* Floating Premium Card 3: Small Accent Circle Image Frame bottom-left - Offset Z-axis */}
        <motion.div
          style={{
            x: springInnerX,
            y: springInnerY,
            transformStyle: "preserve-3d"
          }}
          className="absolute bottom-6 left-6 hidden sm:block size-20 overflow-hidden rounded-2xl border-2 border-cherry bg-navy shadow-xl [transform:translateZ(30px)] pointer-events-none"
        >
          <div className="relative w-full h-full p-1 bg-navy">
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <Image
                src="/images/gallery/conferences/bangladesh-3p-conference-3.webp"
                alt="B2B Interaction"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}