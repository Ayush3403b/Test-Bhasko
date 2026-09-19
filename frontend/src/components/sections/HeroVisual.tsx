'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sun, Leaf, Zap, ShieldCheck, Sparkles } from 'lucide-react';

// House, Tree, Sun & Energy Flow Illustration
export function HouseIllustration() {
  const reduce = useReducedMotion();
  return (
    <div className="relative w-full max-w-[320px] sm:max-w-[360px] mx-auto flex flex-col items-center justify-center py-4">
      {/* Background ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[320px] h-[320px] rounded-full opacity-60" style={{
          background: 'radial-gradient(circle at center, rgba(244,185,66,0.25) 0%, rgba(244,185,66,0.08) 40%, rgba(168,214,109,0.05) 60%, transparent 75%)',
        }} />
      </div>

      {/* Sun rising in the background */}
      <motion.div
        initial={reduce ? undefined : { scale: 0.6, opacity: 0 }}
        animate={reduce ? undefined : { scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute -top-6 right-2 sm:-top-8 sm:right-6 pointer-events-none z-0"
      >
        <svg width="110" height="110" viewBox="0 0 180 180" className={reduce ? '' : 'animate-sun'} style={{ transformOrigin: '90px 90px' }}>
          <defs>
            <radialGradient id="sunGrad">
              <stop offset="0%" stopColor="#F4B942" />
              <stop offset="70%" stopColor="#F4B942" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#F4B942" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="90" cy="90" r="50" fill="url(#sunGrad)" />
          {Array.from({ length: 16 }).map((_, i) => {
            const a = (i * Math.PI) / 8;
            const x1 = Math.round((90 + Math.cos(a) * 58) * 100) / 100;
            const y1 = Math.round((90 + Math.sin(a) * 58) * 100) / 100;
            const x2 = Math.round((90 + Math.cos(a) * 72) * 100) / 100;
            const y2 = Math.round((90 + Math.sin(a) * 72) * 100) / 100;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#F4B942" strokeWidth="3" strokeLinecap="round" opacity="0.75" />;
          })}
        </svg>
      </motion.div>

      {/* House & Tree Illustration */}
      <motion.div
        initial={reduce ? undefined : { y: 20, opacity: 0 }}
        animate={reduce ? undefined : { y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 w-full drop-shadow-xl"
      >
        <svg viewBox="0 0 500 340" className="w-full">
          {/* Ground */}
          <ellipse cx="250" cy="310" rx="210" ry="16" fill="#477A45" opacity="0.18" />

          {/* House body */}
          <path d="M 140 190 L 140 290 L 360 290 L 360 190 Z" fill="#FFFDF5" stroke="#183A2A" strokeWidth="2.5" />
          
          {/* House roof */}
          <path d="M 115 190 L 250 95 L 385 190 Z" fill="#183A2A" stroke="#183A2A" strokeWidth="2.5" />
          
          {/* Door */}
          <rect x="222" y="220" width="56" height="70" fill="#F4B942" stroke="#183A2A" strokeWidth="2" rx="4" />
          <circle cx="232" cy="255" r="2.5" fill="#183A2A" />

          {/* Windows */}
          <rect x="160" y="215" width="40" height="35" fill="#EAF3E1" stroke="#183A2A" strokeWidth="2" rx="3" />
          <line x1="180" y1="215" x2="180" y2="250" stroke="#183A2A" strokeWidth="1.5" />
          <line x1="160" y1="232" x2="200" y2="232" stroke="#183A2A" strokeWidth="1.5" />

          <rect x="300" y="215" width="40" height="35" fill="#EAF3E1" stroke="#183A2A" strokeWidth="2" rx="3" />
          <line x1="320" y1="215" x2="320" y2="250" stroke="#183A2A" strokeWidth="1.5" />
          <line x1="300" y1="232" x2="340" y2="232" stroke="#183A2A" strokeWidth="1.5" />

          {/* Solar panels on roof */}
          <g>
            {[0, 1, 2].map(i => (
              <g key={i} transform={`translate(${160 + i * 54}, 145) rotate(-35)`}>
                <rect x="0" y="0" width="46" height="30" fill="#477A45" stroke="#183A2A" strokeWidth="2" rx="2" />
                <line x1="23" y1="0" x2="23" y2="30" stroke="#183A2A" strokeWidth="1" />
                <line x1="0" y1="15" x2="46" y2="15" stroke="#183A2A" strokeWidth="1" />
                <rect x="2" y="2" width="19" height="11" fill="#A8D66D" opacity="0.45" />
              </g>
            ))}
          </g>
          <g>
            {[0, 1, 2].map(i => (
              <g key={`r-${i}`} transform={`translate(${178 + i * 54}, 132) rotate(35)`}>
                <rect x="0" y="0" width="46" height="30" fill="#477A45" stroke="#183A2A" strokeWidth="2" rx="2" />
                <line x1="23" y1="0" x2="23" y2="30" stroke="#183A2A" strokeWidth="1" />
                <line x1="0" y1="15" x2="46" y2="15" stroke="#183A2A" strokeWidth="1" />
                <rect x="2" y="2" width="19" height="11" fill="#A8D66D" opacity="0.45" />
              </g>
            ))}
          </g>

          {/* Tree beside house */}
          <g>
            <rect x="65" y="230" width="10" height="60" fill="#6b4423" rx="2" />
            <circle cx="70" cy="215" r="32" fill="#477A45" />
            <circle cx="54" cy="208" r="24" fill="#A8D66D" />
            <circle cx="86" cy="208" r="24" fill="#477A45" />
          </g>

          {/* Bush on right */}
          <g>
            <circle cx="415" cy="275" r="18" fill="#477A45" opacity="0.85" />
            <circle cx="430" cy="278" r="14" fill="#A8D66D" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
}

// Clean Calculator Frame with Ambient Aura & Non-Intrusive Floating Chips
export default function HeroVisual({ children }: { children?: React.ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <div className="relative w-full max-w-[500px] mx-auto">
      {/* Background Soft Glow Aura */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-[#A8D66D]/20 via-[#F4B942]/15 to-[#477A45]/15 rounded-[40px] blur-2xl -z-10 pointer-events-none" />

      {/* Top-Right Floating Badge: PM Surya Ghar Ready */}
      <motion.div
        initial={reduce ? undefined : { opacity: 0, y: -15, scale: 0.9 }}
        animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="absolute -top-4 -right-2 sm:-top-5 sm:-right-4 z-20 hidden sm:flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-[0_10px_25px_rgba(24,58,42,0.10)] border border-[rgba(24,58,42,0.08)] pointer-events-none"
      >
        <div className="w-7 h-7 rounded-xl bg-[#F4B942]/20 text-[#B8860B] flex items-center justify-center shrink-0">
          <Sparkles size={14} />
        </div>
        <div>
          <div className="text-[9px] uppercase tracking-wider text-[#66736B] font-semibold leading-none">PM Surya Ghar</div>
          <div className="text-xs font-bold text-[#183A2A] leading-tight mt-0.5">₹78,000 Subsidy Ready</div>
        </div>
      </motion.div>

      {/* Main Content (Calculator) */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Bottom-Left Floating Badge: High Accuracy AI */}
      <motion.div
        initial={reduce ? undefined : { opacity: 0, y: 15, scale: 0.9 }}
        animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="absolute -bottom-4 -left-2 sm:-bottom-5 sm:-left-4 z-20 hidden sm:flex items-center gap-2.5 bg-[#183A2A]/95 text-white backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-[0_15px_30px_rgba(24,58,42,0.20)] border border-white/10 pointer-events-none"
      >
        <div className="w-7 h-7 rounded-xl bg-[#A8D66D]/25 text-[#A8D66D] flex items-center justify-center shrink-0">
          <ShieldCheck size={14} />
        </div>
        <div>
          <div className="text-[9px] uppercase tracking-wider text-[#A8D66D] font-semibold leading-none">Feasibility</div>
          <div className="text-xs font-bold text-white leading-tight mt-0.5">Tier-1 Precision Sizing</div>
        </div>
      </motion.div>
    </div>
  );
}
