'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { FileText, Calculator, FileCheck2, Search, DraftingCompass, Hammer, Plug, Coins } from 'lucide-react';
import { FadeUp } from '../ui/MotionWrap';

const STEPS = [
  { icon: FileText, num: '01', title: 'Tell Us About Your Home', desc: 'Share your monthly bill and a few details — takes less than a minute.' },
  { icon: Calculator, num: '02', title: 'Calculate Your Solar', desc: 'Our engine computes your ideal system size, savings and payback.' },
  { icon: FileCheck2, num: '03', title: 'Get Your Solar Report', desc: 'A detailed branded report delivered to your inbox instantly.' },
  { icon: Search, num: '04', title: 'Site Survey', desc: 'Our engineers visit for a physical roof assessment and shade analysis.' },
  { icon: DraftingCompass, num: '05', title: 'System Design', desc: 'Custom engineering design with panel layout, inverter sizing and BoM.' },
  { icon: Hammer, num: '06', title: 'Installation', desc: 'Certified installers typically complete installation in 2–5 days.' },
  { icon: Plug, num: '07', title: 'Net Metering', desc: 'We handle DISCOM application, inspection and net meter installation.' },
  { icon: Coins, num: '08', title: 'Start Saving', desc: 'Your system goes live. Track every kWh in your My Solar dashboard.' },
];

export default function HowItWorks() {
  const reduce = useReducedMotion();

  return (
    <section className="py-16 md:py-24 bg-[#FFFDF5] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#A8D66D]/10 rounded-full blur-3xl" />
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeUp>
            <div className="eyebrow mb-3">How Bhasko Works</div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="heading-section">
              From bill to billing credit, in <span className="script-accent text-[#F4B942] text-4xl md:text-5xl">8 steps</span>.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-4 text-[#66736B] text-lg">A guided, transparent journey from first estimate to live solar.</p>
          </FadeUp>
        </div>

        <div className="relative">
          {/* Vertical line for desktop horizontal timeline */}
          <div className="hidden lg:block absolute top-14 left-[5%] right-[5%] h-0.5 bg-gradient-to-r from-[#A8D66D] via-[#477A45] to-[#F4B942] opacity-30" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={reduce ? undefined : { opacity: 0, y: 24 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="relative group"
                >
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center mb-4 text-[#477A45] group-hover:bg-[#477A45] group-hover:text-white transition-all relative z-10 border-2 border-[#477A45]/20 group-hover:border-[#477A45] group-hover:scale-110 group-hover:-rotate-3">
                      <Icon size={22} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#F4B942] text-[#183A2A] text-xs font-bold flex items-center justify-center z-20 shadow">{step.num}</div>
                  </div>
                  <h3 className="font-semibold text-[#183A2A] text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-[#66736B] leading-relaxed">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
