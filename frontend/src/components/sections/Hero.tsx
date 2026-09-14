'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import MiniCalculator from '@/components/calculator/MiniCalculator';
import HeroVisual from './HeroVisual';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden gradient-sun pt-8 md:pt-12 pb-16 md:pb-24">
      {/* Decorative organic shape */}
      <svg className="absolute top-0 right-0 w-[800px] opacity-30 pointer-events-none" viewBox="0 0 800 800">
        <path d="M 700,100 Q 800,300 600,500 T 400,700 Q 200,500 400,300 T 700,100 Z" fill="#A8D66D" opacity="0.2" />
      </svg>
      <svg className="absolute bottom-0 left-0 w-[600px] opacity-20 pointer-events-none" viewBox="0 0 600 600">
        <path d="M 0,400 Q 200,200 400,400 T 600,500 L 600,600 L 0,600 Z" fill="#477A45" opacity="0.15" />
      </svg>

      <div className="relative max-w-[1400px] mx-auto px-4 md:px-8 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 relative z-10">
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 20 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/70 backdrop-blur border border-[rgba(24,58,42,0.08)] rounded-full px-4 py-1.5 mb-6"
          >
            <Sparkles size={14} className="text-[#F4B942]" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#477A45]">Bhasko / Smart Solar</span>
          </motion.div>

          <motion.h1
            initial={reduce ? undefined : { opacity: 0, y: 30 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#183A2A] leading-[1.05] tracking-tight"
          >
            Your Solar.
            <br />
            <span className="relative inline-block">
              <span className="relative z-10">Calculated </span>
              <span className="absolute -bottom-1 left-0 right-0 h-3 bg-[#A8D66D]/60 -z-0 rounded-full" />
            </span>
            <span className="script-accent text-[#F4B942] text-5xl md:text-7xl ml-2 align-middle">for You.</span>
          </motion.h1>

          <motion.p
            initial={reduce ? undefined : { opacity: 0, y: 20 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-lg md:text-xl text-[#183029]/80 max-w-xl leading-relaxed"
          >
            Tell us what you pay for electricity. We'll calculate how much solar you actually need — no over-selling, no under-design, just the right system for your roof.
          </motion.p>

          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 20 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <Link href="/solar-intelligence/calculator" className="inline-flex items-center gap-2 bg-[#477A45] hover:bg-[#3d6a3c] text-white px-7 py-4 rounded-full font-semibold hover:shadow-xl transition-all hover:-translate-y-0.5 group">
              Calculate My Savings
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/solar-solutions" className="text-[#183A2A] font-medium inline-flex items-center gap-2 hover:text-[#477A45] transition-colors group">
              Explore Solar Solutions
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={reduce ? undefined : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#66736B]"
          >
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#A8D66D]" /> Premium Mono PERC panels</div>
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#F4B942]" /> PM Surya Ghar subsidy support</div>
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#477A45]" /> 25-year performance warranty</div>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? undefined : { opacity: 0, x: 40 }}
          animate={reduce ? undefined : { opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:col-span-5 relative z-10"
        >
          <div className="relative">
            <HeroVisual />
            <div className="absolute top-0 left-0 right-0 md:relative md:top-auto md:left-auto md:right-auto md:mt-[-80px] lg:mt-0 lg:absolute lg:top-4 lg:-left-8 lg:right-auto lg:w-[92%]">
              <MiniCalculator />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
