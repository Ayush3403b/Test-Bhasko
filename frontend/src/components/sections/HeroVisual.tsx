'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Sun, Leaf, IndianRupee, Clock, Zap } from 'lucide-react';

import React from 'react';

// House, Tree, Sun & Energy Flow in the gap
export function HouseIllustration() {
  const reduce = useReducedMotion();
  return (
    <div className="relative w-full max-w-[320px] sm:max-w-[360px] lg:max-w-none mx-auto flex flex-col items-center justify-center py-4 lg:py-0">
      {/* Background ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[320px] h-[320px] rounded-full opacity-60" style={{
          background: 'radial-gradient(circle at center, rgba(244,185,66,0.3) 0%, rgba(244,185,66,0.1) 40%, rgba(168,214,109,0.06) 60%, transparent 75%)',
        }} />
      </div>

      {/* Sun rising in the background */}
      <motion.div
        initial={reduce ? undefined : { scale: 0.6, opacity: 0 }}
        animate={reduce ? undefined : { scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute -top-6 right-2 sm:-top-8 sm:right-6 pointer-events-none z-0"
      >
        <svg width="120" height="120" viewBox="0 0 180 180" className={reduce ? '' : 'animate-sun'} style={{ transformOrigin: '90px 90px' }}>
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

      {/* Energy flow particles moving towards the right */}
      {!reduce && (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {[0, 1, 2, 3].map(i => (
            <motion.div
              key={i}
              className="absolute w-2.5 h-2.5 rounded-full bg-[#F4B942]"
              initial={{ top: '20%', left: `${30 + i * 15}%`, opacity: 0 }}
              animate={{
                top: ['20%', '50%', '80%'],
                left: [`${30 + i * 15}%`, `${50 + i * 10}%`, `${75 + i * 8}%`],
                opacity: [0, 0.95, 0],
                scale: [0.8, 1.3, 0.5],
              }}
              transition={{ duration: 3.5, delay: i * 0.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Calculator Frame with the 4 floating cards
export default function HeroVisual({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative w-full">
      {children}

      {/* 4 Floating Badges surrounding the Calculator */}
      {/* Top Left: 5 kW Recommended */}
      <FloatCard
        delay={0.3}
        className="-top-4 -left-2 sm:-top-5 sm:-left-6 bg-white/95 backdrop-blur-md"
        icon={<Zap size={14} />}
        iconBg="bg-[#F4B942]/20 text-[#B8860B]"
        label="Recommended"
      >
        <div className="text-sm sm:text-base font-bold text-[#183A2A]">5 kW</div>
      </FloatCard>

      {/* Bottom Left: Est. Monthly Savings ₹4,820 */}
      <FloatCard
        delay={0.5}
        className="-bottom-4 -left-2 sm:-bottom-5 sm:-left-6 bg-[#183A2A]/95 text-white backdrop-blur-md shadow-2xl"
        icon={<IndianRupee size={14} />}
        iconBg="bg-[#A8D66D]/30 text-[#A8D66D]"
        label="Est. Monthly Savings"
      >
        <div className="text-sm sm:text-base font-bold text-white">₹4,820</div>
      </FloatCard>

      {/* Top Right: Roof Suitability 87% */}
      <FloatCard
        delay={0.7}
        className="top-10 -right-2 sm:top-12 sm:-right-6 bg-white/95 backdrop-blur-md"
        icon={<Leaf size={14} />}
        iconBg="bg-[#477A45]/10 text-[#477A45]"
        label="Roof Suitability"
      >
        <div className="text-sm sm:text-base font-bold text-[#183A2A]">87%</div>
      </FloatCard>

      {/* Bottom Right: Payback 4.2 yrs */}
      <FloatCard
        delay={0.9}
        className="-bottom-4 -right-2 sm:-bottom-4 sm:-right-6 bg-white/95 backdrop-blur-md"
        icon={<Clock size={14} />}
        iconBg="bg-[#A8D66D]/20 text-[#477A45]"
        label="Payback"
      >
        <div className="text-sm sm:text-base font-bold text-[#183A2A]">4.2 yrs</div>
      </FloatCard>
    </div>
  );
}

function FloatCard({ children, className, icon, iconBg, label, delay }: any) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, scale: 0.9, y: 20 }}
      animate={reduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={
        'absolute z-30 rounded-2xl shadow-xl px-3 py-2 sm:px-4 sm:py-2.5 flex items-center gap-2 sm:gap-3 border border-[rgba(24,58,42,0.08)] ' +
        (reduce ? '' : 'animate-float-slow ') + className
      }
    >
      <div className={'w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 ' + iconBg}>{icon}</div>
      <div>
        <div className="text-[9px] sm:text-[10px] uppercase tracking-widest opacity-70 font-medium whitespace-nowrap">{label}</div>
        {children}
      </div>
    </motion.div>
  );
}
