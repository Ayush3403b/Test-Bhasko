'use client';

import Link from 'next/link';
import { Calculator, Bot, FileUp, Ruler, FileBarChart2, ArrowRight } from 'lucide-react';
import { FadeUp, StaggerItem } from '../ui/MotionWrap';
import { Badge } from '@/components/cards';

const TOOLS = [
  { icon: Calculator, title: 'Savings Calculator', desc: 'Step-by-step, bill-based solar sizing in 2 minutes.', href: '/solar-intelligence/calculator', color: '#477A45', preview: 'preview-calc' },
  { icon: Bot, title: 'AI Solar Advisor', desc: 'Chat with our AI advisor. Get answers in plain language.', href: '/solar-intelligence/ai-advisor', color: '#F4B942', preview: 'preview-ai' },
  { icon: FileUp, title: 'Bill Analyzer', desc: 'Upload your electricity bill — we\'ll extract everything.', href: '/solar-intelligence/bill-analyzer', color: '#A8D66D', preview: 'preview-bill' },
  { icon: Ruler, title: 'Roof Assessment', desc: 'Digital solar suitability score for your roof.', href: '/solar-intelligence/roof-assessment', color: '#183A2A', preview: 'preview-roof' },
  { icon: FileBarChart2, title: 'Instant Solar Report', desc: 'Premium branded PDF report, emailed to you.', href: '/solar-intelligence/report', color: '#477A45', preview: 'preview-report' },
];

export default function IntelligenceTeaser() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#183A2A] to-[#2d5a3f] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="1200" height="600" fill="url(#grid)" />
        </svg>
      </div>
      <div className="absolute top-20 right-20 w-60 h-60 rounded-full bg-[#F4B942]/20 blur-3xl" />
      <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-[#A8D66D]/15 blur-3xl" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4">
            <FadeUp>
              <div className="inline-flex items-center gap-2 bg-[#A8D66D]/20 text-[#A8D66D] rounded-full px-3 py-1 mb-4 text-xs font-semibold tracking-[0.2em] uppercase">
                <Bot size={14} /> Solar, with a brain
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-4">
                Solar Intelligence.
                <br />
                <span className="script-accent text-[#F4B942] text-4xl md:text-5xl">Calculated, not guessed.</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-white/70 leading-relaxed mb-6">
                Five free tools powered by our centralized calculation engine. No sales pressure, no generic answers — just data and honest recommendations.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <Link href="/solar-intelligence" className="inline-flex items-center gap-2 bg-white text-[#183A2A] px-6 py-3 rounded-full font-semibold hover:bg-[#A8D66D] transition-all group">
                Try Solar Intelligence <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </FadeUp>
          </div>

          <div className="lg:col-span-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOOLS.map((t, i) => {
              const Icon = t.icon;
              return (
                <StaggerItem key={t.title}>
                  <Link href={t.href} className="group block bg-white/5 backdrop-blur border border-white/10 hover:bg-white/10 hover:border-white/30 rounded-2xl p-5 h-full transition-all hover:-translate-y-1">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-white/10 group-hover:scale-110 transition-transform" style={{ color: t.color }}>
                      <Icon size={20} />
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{t.title}</h3>
                    </div>
                    <p className="text-sm text-white/60 leading-relaxed">{t.desc}</p>
                    <div className="mt-3 text-xs font-medium inline-flex items-center gap-1 text-[#A8D66D] group-hover:gap-2 transition-all">Try it <ArrowRight size={12} /></div>
                  </Link>
                </StaggerItem>
              );
            })}
            <StaggerItem>
              <Link href="/digital-survey" className="group bg-[#F4B942] text-[#183A2A] rounded-2xl p-5 h-full flex flex-col justify-between hover:-translate-y-1 transition-all">
                <div>
                  <Badge variant="accent">NEW</Badge>
                  <h3 className="text-xl font-bold mt-3 mb-2">Digital Solar Survey</h3>
                  <p className="text-sm text-[#183A2A]/80">10 questions. A personalized roof score. Book a physical survey at the end.</p>
                </div>
                <div className="text-sm font-semibold inline-flex items-center gap-1 mt-4">Start Survey <ArrowRight size={14} /></div>
              </Link>
            </StaggerItem>
          </div>
        </div>
      </div>
    </section>
  );
}
