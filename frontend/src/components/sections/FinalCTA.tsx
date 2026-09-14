'use client';

import Link from 'next/link';
import { ArrowRight, Phone, Sun } from 'lucide-react';
import { FadeUp } from '../ui/MotionWrap';

export default function FinalCTA() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, #EAF3E1 0%, #FFFDF5 50%, #F4B942/10 100%)',
      }} />
      {/* Sun rays */}
      <svg className="absolute top-0 right-0 w-[600px] opacity-30 pointer-events-none" viewBox="0 0 600 600">
        <g transform="translate(500, 50)">
          {Array.from({ length: 18 }).map((_, i) => {
            const a = (i * Math.PI * 2) / 18;
            const x2 = Math.round(Math.cos(a) * 500 * 100) / 100;
            const y2 = Math.round(Math.sin(a) * 500 * 100) / 100;
            return <line key={i} x1={0} y1={0} x2={x2} y2={y2} stroke="#F4B942" strokeWidth="2" opacity="0.3" />;
          })}
          <circle r="50" fill="#F4B942" />
        </g>
      </svg>

      <div className="max-w-5xl mx-auto px-4 md:px-8 relative text-center">
        <FadeUp>
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur border border-white rounded-full px-4 py-1.5 mb-6">
            <Sun size={16} className="text-[#F4B942]" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#477A45]">Your roof is already earning sunlight</span>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#183A2A] leading-tight tracking-tight">
            Let's calculate
            <br />
            <span className="script-accent text-[#477A45] text-5xl md:text-7xl">what it could do for you.</span>
          </h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="mt-6 text-lg text-[#66736B] max-w-2xl mx-auto">
            Get a precise, no-nonsense solar estimate in 60 seconds. No calls required to see your number — we'll only reach out if you want us to.
          </p>
        </FadeUp>
        <FadeUp delay={0.3}>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/solar-intelligence/calculator" className="btn-primary px-8 py-4 text-base inline-flex items-center gap-2 group">
              Calculate My Savings <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/contact" className="btn-secondary px-8 py-4 text-base inline-flex items-center gap-2">
              <Phone size={16} /> Talk to a Solar Expert
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
