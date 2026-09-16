'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { 
  FileText, 
  Calculator, 
  FileCheck2, 
  Search, 
  DraftingCompass, 
  Hammer, 
  Plug, 
  Coins,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { FadeUp } from '../ui/MotionWrap';

const STEPS = [
  { 
    icon: FileText, 
    num: '01', 
    phase: 'Assessment',
    title: 'Tell Us About Your Home', 
    desc: 'Share your monthly bill and a few details — takes less than a minute.' 
  },
  { 
    icon: Calculator, 
    num: '02', 
    phase: 'Assessment',
    title: 'Calculate Your Solar', 
    desc: 'Our engine computes your ideal system size, savings and payback.' 
  },
  { 
    icon: FileCheck2, 
    num: '03', 
    phase: 'Assessment',
    title: 'Get Your Solar Report', 
    desc: 'A detailed branded report delivered to your inbox instantly.' 
  },
  { 
    icon: Search, 
    num: '04', 
    phase: 'Assessment',
    title: 'Site Survey', 
    desc: 'Our engineers visit for a physical roof assessment and shade analysis.' 
  },
  { 
    icon: DraftingCompass, 
    num: '05', 
    phase: 'Execution',
    title: 'System Design', 
    desc: 'Custom engineering design with panel layout, inverter sizing and BoM.' 
  },
  { 
    icon: Hammer, 
    num: '06', 
    phase: 'Execution',
    title: 'Installation', 
    desc: 'Certified installers typically complete installation in 2–5 days.' 
  },
  { 
    icon: Plug, 
    num: '07', 
    phase: 'Execution',
    title: 'Net Metering', 
    desc: 'We handle DISCOM application, inspection and net meter installation.' 
  },
  { 
    icon: Coins, 
    num: '08', 
    phase: 'Execution',
    title: 'Start Saving', 
    desc: 'Your system goes live. Track every kWh in your My Solar dashboard.' 
  },
];

export default function HowItWorks() {
  const reduce = useReducedMotion();

  return (
    <section className="py-16 md:py-24 bg-[#FFFDF5] relative overflow-hidden">
      {/* Subtle ambient decorative blurs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#A8D66D]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F4B942]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1500px] mx-auto px-4 md:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#477A45]/10 text-[#477A45] text-xs font-semibold uppercase tracking-wider mb-4 border border-[#477A45]/15">
              <Sparkles size={14} /> How Bhasko Works
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="heading-section">
              From bill to billing credit, in{' '}
              <span className="script-accent text-[#F4B942] text-4xl md:text-5xl">8 simple steps</span>.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-4 text-[#66736B] text-lg leading-relaxed">
              A guided, transparent journey from your first estimate to live solar generation.
            </p>
          </FadeUp>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={reduce ? undefined : { opacity: 0, y: 24 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                whileHover={reduce ? undefined : { y: -6, transition: { duration: 0.25 } }}
                className="group relative bg-white rounded-2xl p-6 border border-[rgba(24,58,42,0.08)] shadow-[0_4px_20px_rgba(24,58,42,0.04)] hover:shadow-[0_20px_40px_rgba(24,58,42,0.09)] hover:border-[#477A45]/30 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Hover subtle background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#F4F8EE]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div>
                  {/* Top Row: Icon + Step Badge */}
                  <div className="flex items-center justify-between mb-5 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-[#477A45]/10 text-[#477A45] flex items-center justify-center transition-all duration-300 group-hover:bg-[#477A45] group-hover:text-white group-hover:scale-105 group-hover:-rotate-3 shadow-sm">
                      <Icon size={22} />
                    </div>
                    <div className="px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider bg-[#F4B942]/20 text-[#B8860B] border border-[#F4B942]/35 group-hover:bg-[#F4B942] group-hover:text-[#183A2A] transition-colors">
                      {step.num}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-bold text-[#183A2A] text-lg mb-2 leading-snug group-hover:text-[#477A45] transition-colors relative z-10">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#66736B] leading-relaxed relative z-10">
                    {step.desc}
                  </p>
                </div>

                {/* Card Footer: Phase & Next Indicator */}
                <div className="mt-6 pt-4 border-t border-[rgba(24,58,42,0.06)] flex items-center justify-between text-xs font-medium text-[#66736B] relative z-10">
                  <span className="text-[11px] uppercase tracking-wider text-[#477A45] font-semibold">
                    {step.phase}
                  </span>
                  <div className="flex items-center gap-1 text-[#477A45] opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    <span>Step {step.num}</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Action Prompt Banner */}
        <FadeUp delay={0.4}>
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-[#183A2A] via-[#224A37] to-[#183A2A] text-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-[#477A45]/30 relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-48 h-48 bg-[#A8D66D]/15 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 text-center md:text-left">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#A8D66D] mb-1">Get Started Today</div>
              <h3 className="text-xl md:text-2xl font-bold">Ready to take Step 01?</h3>
              <p className="text-[#E0E7E2] text-sm mt-1 max-w-xl">
                Calculate your custom system size, subsidy eligibility, and monthly savings in under a minute.
              </p>
            </div>
            <Link
              href="/solar-intelligence/calculator"
              className="relative z-10 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#F4B942] hover:bg-[#e5aa33] text-[#183A2A] font-bold text-sm shadow-md transition-all hover:scale-105 shrink-0"
            >
              Calculate My Solar <ArrowRight size={16} />
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
