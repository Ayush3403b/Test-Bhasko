'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Sun, Leaf, IndianRupee, Clock, Zap } from 'lucide-react';

export default function HeroVisual() {
  const reduce = useReducedMotion();
  return (
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center">
      {/* Background gradient sun */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full opacity-60" style={{
          background: 'radial-gradient(circle at center, rgba(244,185,66,0.35) 0%, rgba(244,185,66,0.1) 30%, rgba(168,214,109,0.05) 50%, transparent 70%)',
        }} />
      </div>

      {/* Sun */}
      <motion.div
        initial={reduce ? undefined : { scale: 0.6, opacity: 0 }}
        animate={reduce ? undefined : { scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute top-8 right-12 md:top-4 md:right-8"
      >
        <svg width="180" height="180" viewBox="0 0 180 180" className={reduce ? '' : 'animate-sun'} style={{ transformOrigin: '90px 90px' }}>
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
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#F4B942" strokeWidth="3" strokeLinecap="round" opacity="0.7" />;
          })}
        </svg>
      </motion.div>

      {/* House illustration */}
      <motion.svg
        initial={reduce ? undefined : { y: 30, opacity: 0 }}
        animate={reduce ? undefined : { y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewBox="0 0 500 400"
        className="relative z-10 w-full max-w-lg drop-shadow-2xl"
      >
        {/* Ground */}
        <ellipse cx="250" cy="370" rx="200" ry="20" fill="#477A45" opacity="0.15" />

        {/* House */}
        <path d="M 130 240 L 130 340 L 370 340 L 370 240 Z" fill="#FFFDF5" stroke="#183A2A" strokeWidth="2" />
        <path d="M 110 240 L 250 140 L 390 240 Z" fill="#183A2A" stroke="#183A2A" strokeWidth="2" />
        <rect x="220" y="270" width="60" height="70" fill="#F4B942" stroke="#183A2A" strokeWidth="2" rx="4" />
        <rect x="155" y="265" width="40" height="35" fill="#EAF3E1" stroke="#183A2A" strokeWidth="2" rx="2" />
        <rect x="305" y="265" width="40" height="35" fill="#EAF3E1" stroke="#183A2A" strokeWidth="2" rx="2" />
        <line x1="175" y1="265" x2="175" y2="300" stroke="#183A2A" strokeWidth="1.5" />
        <line x1="155" y1="282" x2="195" y2="282" stroke="#183A2A" strokeWidth="1.5" />
        <line x1="325" y1="265" x2="325" y2="300" stroke="#183A2A" strokeWidth="1.5" />
        <line x1="305" y1="282" x2="345" y2="282" stroke="#183A2A" strokeWidth="1.5" />

        {/* Solar panels on roof */}
        <g>
          {[0, 1, 2].map(i => (
            <g key={i} transform={`translate(${160 + i * 58}, 190) rotate(-35)`}>
              <rect x="0" y="0" width="50" height="34" fill="#477A45" stroke="#183A2A" strokeWidth="2" rx="2" />
              <line x1="25" y1="0" x2="25" y2="34" stroke="#183A2A" strokeWidth="1" />
              <line x1="0" y1="17" x2="50" y2="17" stroke="#183A2A" strokeWidth="1" />
              <rect x="2" y="2" width="21" height="13" fill="#A8D66D" opacity="0.3" />
            </g>
          ))}
        </g>
        <g>
          {[0, 1, 2].map(i => (
            <g key={`r-${i}`} transform={`translate(${176 + i * 58}, 176) rotate(35)`}>
              <rect x="0" y="0" width="50" height="34" fill="#477A45" stroke="#183A2A" strokeWidth="2" rx="2" />
              <line x1="25" y1="0" x2="25" y2="34" stroke="#183A2A" strokeWidth="1" />
              <line x1="0" y1="17" x2="50" y2="17" stroke="#183A2A" strokeWidth="1" />
              <rect x="2" y="2" width="21" height="13" fill="#A8D66D" opacity="0.3" />
            </g>
          ))}
        </g>

        {/* Tree */}
        <g>
          <rect x="60" y="290" width="8" height="50" fill="#6b4423" />
          <circle cx="64" cy="280" r="30" fill="#477A45" />
          <circle cx="50" cy="275" r="22" fill="#A8D66D" />
          <circle cx="78" cy="275" r="22" fill="#477A45" />
        </g>

        {/* Energy flow particles */}
        {!reduce && (
          <g>
            {[0, 1, 2, 3].map(i => (
              <motion.circle
                key={i}
                r="3"
                fill="#F4B942"
                initial={{ x: 250, y: 200, opacity: 0 }}
                animate={{
                  x: [250, 250, 100 + i * 80, 250],
                  y: [200, 150, 300 + i * 10, 360],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{ duration: 4, delay: i * 0.9, repeat: Infinity, ease: 'linear' }}
              />
            ))}
          </g>
        )}
      </motion.svg>

      {/* Floating cards */}
      <FloatCard delay={0.3} className="top-8 left-0 md:left-4 bg-white" icon={<Zap size={14} />} iconBg="bg-[#F4B942]/20 text-[#B8860B]" label="Recommended">
        <div className="text-xl font-bold text-[#183A2A]">5 kW</div>
      </FloatCard>

      <FloatCard delay={0.5} className="bottom-32 left-0 md:-left-4 bg-[#183A2A] text-white" icon={<IndianRupee size={14} />} iconBg="bg-[#A8D66D]/30 text-[#A8D66D]" label="Est. Monthly Savings">
        <div className="text-xl font-bold">₹4,820</div>
      </FloatCard>

      <FloatCard delay={0.7} className="top-24 right-0 md:right-0 bg-white" icon={<Leaf size={14} />} iconBg="bg-[#477A45]/10 text-[#477A45]" label="Roof Suitability">
        <div className="text-xl font-bold text-[#183A2A]">87%</div>
      </FloatCard>

      <FloatCard delay={0.9} className="bottom-16 right-4 md:right-0 bg-white" icon={<Clock size={14} />} iconBg="bg-[#A8D66D]/20 text-[#477A45]" label="Payback">
        <div className="text-xl font-bold text-[#183A2A]">4.2 yrs</div>
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
        'absolute rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-[rgba(24,58,42,0.06)] ' +
        (reduce ? '' : 'animate-float-slow ') + className
      }
    >
      <div className={'w-8 h-8 rounded-full flex items-center justify-center ' + iconBg}>{icon}</div>
      <div>
        <div className="text-[10px] uppercase tracking-widest opacity-70 font-medium">{label}</div>
        {children}
      </div>
    </motion.div>
  );
}
