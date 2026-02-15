"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useId, useRef } from "react";

export default function SectionDivider({
  invert = false,
  className = "",
}) {
  const ref = useRef(null);
  const uid = useId().replace(/:/g, "");
  const gradientId = `dividerGradient-${uid}`;
  const waveFilterId = `dividerWaveFilter-${uid}`;
  const waveFillId = `dividerWaveFill-${uid}`;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);

  const smoothY = useSpring(y, { stiffness: 80, damping: 20 });
  const smoothScale = useSpring(scale, { stiffness: 80, damping: 20 });

  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden leading-none gradient ${className}`}
      aria-hidden
    >
      <motion.svg
        style={{ y: smoothY, scale: smoothScale }}
        className="block w-full h-16 md:h-24 will-change-transform"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Base section-to-section gradient (kept local to divider) */}
          <linearGradient id={gradientId} x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#acb6e5" />
            <stop offset="100%" stopColor="#86fde8" />
          </linearGradient>

          {/* Red “water wave” overlay */}
          <linearGradient id={waveFillId} x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 0, 0, 0)" />
            <stop offset="50%" stopColor="rgba(255, 0, 0, 0.18)" />
            <stop offset="100%" stopColor="rgba(255, 0, 0, 0)" />
          </linearGradient>

          <filter id={waveFilterId} x="-20%" y="-40%" width="140%" height="180%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.06"
              numOctaves="2"
              seed="2"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="6s"
                values="0.010 0.050; 0.018 0.080; 0.010 0.050"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="14" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>

        <path
          d={
            invert
              ? "M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z"
              : "M0,50 C150,0 350,100 600,50 C850,0 1050,100 1200,50 L1200,0 L0,0 Z"
          }
          fill={`url(#${gradientId})`}
        />

        {/* Subtle animated wave overlay so the join isn’t plain whitespace */}
        <motion.path
          d={
            invert
              ? "M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z"
              : "M0,50 C150,0 350,100 600,50 C850,0 1050,100 1200,50 L1200,0 L0,0 Z"
          }
          fill={`url(#${waveFillId})`}
          filter={`url(#${waveFilterId})`}
          opacity={0.9}
          initial={{ x: -40 }}
          animate={{ x: [-40, 40, -40] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          pointerEvents="none"
        />
        
      </motion.svg>
    </div>
  );
}