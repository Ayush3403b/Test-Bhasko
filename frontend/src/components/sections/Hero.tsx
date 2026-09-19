'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import MiniCalculator from '@/components/calculator/MiniCalculator';
import HeroVisual from './HeroVisual';
import { ArrowRight, Sparkles, ShieldCheck, Sun, CheckCircle2, Star } from 'lucide-react';

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden gradient-sun pt-8 sm:pt-12 md:pt-16 pb-16 md:pb-24">
      {/* Decorative organic background shapes */}
      <svg className="absolute top-0 right-0 w-[700px] md:w-[900px] opacity-25 pointer-events-none -z-0" viewBox="0 0 800 800">
        <path d="M 700,100 Q 800,300 600,500 T 400,700 Q 200,500 400,300 T 700,100 Z" fill="#A8D66D" opacity="0.25" />
      </svg>
      <svg className="absolute bottom-0 left-0 w-[500px] md:w-[700px] opacity-20 pointer-events-none -z-0" viewBox="0 0 600 600">
        <path d="M 0,400 Q 200,200 400,400 T 600,500 L 600,600 L 0,600 Z" fill="#477A45" opacity="0.2" />
      </svg>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
          
          {/* Left Column: Heading, Value Props, CTAs, and Trust Metrics */}
          <div className="lg:col-span-7 relative z-10">
            {/* Eyebrow badge */}
            <motion.div
              initial={reduce ? undefined : { opacity: 0, y: 15 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-[rgba(24,58,42,0.1)] rounded-full px-4 py-1.5 mb-6 shadow-sm"
            >
              <Sparkles size={14} className="text-[#F4B942]" />
              <span className="text-xs font-bold tracking-[0.18em] uppercase text-[#477A45]">
                Bhasko / Smart Rooftop Solar
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={reduce ? undefined : { opacity: 0, y: 25 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4rem] font-bold text-[#183A2A] leading-[1.08] tracking-tight text-balance"
            >
              Your Solar.
              <br />
              <span className="relative inline-block mt-1">
                <span className="relative z-10">Calculated </span>
                <span className="absolute bottom-1 left-0 right-0 h-3.5 bg-[#A8D66D]/50 -z-0 rounded-full" />
              </span>
              <span className="script-accent text-[#F4B942] text-4xl sm:text-5xl md:text-6xl xl:text-7xl ml-2.5 align-middle">
                for You.
              </span>
            </motion.h1>

            {/* Supporting Description */}
            <motion.p
              initial={reduce ? undefined : { opacity: 0, y: 20 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg text-[#183029]/80 max-w-xl leading-relaxed text-balance"
            >
              Tell us what you pay for electricity. We'll calculate how much solar you actually need — no over-selling, no under-design, with maximum government subsidy claimed.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={reduce ? undefined : { opacity: 0, y: 20 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/solar-intelligence/calculator"
                className="inline-flex items-center gap-2.5 bg-[#477A45] hover:bg-[#3d6a3c] text-white px-7 py-4 rounded-full font-semibold text-sm sm:text-base shadow-lg shadow-[#477A45]/20 hover:shadow-xl hover:shadow-[#477A45]/30 transition-all hover:-translate-y-0.5 group whitespace-nowrap"
              >
                <span>Calculate My Savings</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/packages"
                className="inline-flex items-center gap-2 border-2 border-[#183A2A]/20 hover:border-[#183A2A] text-[#183A2A] px-6 py-3.5 rounded-full font-semibold text-sm sm:text-base hover:bg-[#183A2A] hover:text-white transition-all whitespace-nowrap"
              >
                <span>Explore Packages</span>
              </Link>
            </motion.div>

            {/* Trust Highlights Strip */}
            <motion.div
              initial={reduce ? undefined : { opacity: 0 }}
              animate={reduce ? undefined : { opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-10 pt-6 border-t border-[rgba(24,58,42,0.1)] flex flex-wrap items-center gap-x-6 gap-y-3 text-xs sm:text-sm text-[#183A2A]/80 font-medium"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#477A45]" />
                <span>Up to ₹78,000 PM Surya Ghar Subsidy</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#477A45]" />
                <span>25-Yr Panel Performance Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#477A45]" />
                <span>Tier-1 TopCon Technology</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: MiniCalculator wrapped in HeroVisual */}
          <motion.div
            initial={reduce ? undefined : { opacity: 0, x: 20, scale: 0.98 }}
            animate={reduce ? undefined : { opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="lg:col-span-5 relative z-10 w-full"
          >
            <HeroVisual>
              <MiniCalculator compact />
            </HeroVisual>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
