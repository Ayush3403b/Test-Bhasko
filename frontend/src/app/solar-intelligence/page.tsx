import PageHero from '@/components/sections/PageHero';
import Link from 'next/link';
import { Calculator, Bot, FileUp, Ruler, FileBarChart2, ArrowRight } from 'lucide-react';
import { FadeUp, StaggerItem } from '@/components/ui/MotionWrap';
import { buildMetadata } from '@/components/SEO';

export const metadata = buildMetadata({
  title: 'Solar Intelligence — Calculator, AI Advisor, Bill Analyzer | Bhasko',
  description: 'Five free solar tools: Savings Calculator, AI Solar Advisor, Electricity Bill Analyzer, Roof Assessment, and Instant Solar Report.',
  canonical: '/solar-intelligence',
});

const TOOLS = [
  { icon: Calculator, title: 'Solar Savings Calculator', desc: 'Step-by-step calculator to size your system and estimate savings, subsidy and payback.', href: '/solar-intelligence/calculator', color: '#477A45', tag: 'Most popular' },
  { icon: Bot, title: 'AI Solar Advisor', desc: 'Chat with our AI. Ask anything about solar in plain language and get honest answers.', href: '/solar-intelligence/ai-advisor', color: '#F4B942', tag: 'Beta' },
  { icon: FileUp, title: 'Electricity Bill Analyzer', desc: 'Upload your bill PDF. We extract consumer number, units, tariff and recommend a system.', href: '/solar-intelligence/bill-analyzer', color: '#A8D66D' },
  { icon: Ruler, title: 'Roof Solar Assessment', desc: 'Answer 8 questions about your roof — get a Solar Suitability Score from 0-100.', href: '/solar-intelligence/roof-assessment', color: '#183A2A' },
  { icon: FileBarChart2, title: 'Instant Solar Report', desc: 'A premium branded solar report delivered to your inbox instantly.', href: '/solar-intelligence/report', color: '#477A45' },
];

export default function IntelligenceHub() {
  return (
    <>
      <PageHero
        eyebrow="BHASKO / SOLAR INTELLIGENCE"
        title="Solar, with a brain."
        subtitle="A suite of free tools built on Bhasko's centralized calculation engine. Real numbers, no guesses, no sales pressure."
        accentPhrase="intelligence, not influence."
        primaryCta={{ label: 'Start with Calculator', href: '/solar-intelligence/calculator' }}
      />

      <section className="py-14 md:py-20">
        <div className="max-w-[1300px] mx-auto px-4 md:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOLS.map((t, i) => {
            const Icon = t.icon;
            return (
              <StaggerItem key={t.title}>
                <Link href={t.href} className="group relative block bg-white rounded-3xl p-7 border border-[rgba(24,58,42,0.06)] shadow-sm hover:shadow-2xl transition-all hover:-translate-y-2 h-full overflow-hidden">
                  <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle, ${t.color}15, transparent 70%)` }} />
                  <div className="flex items-start justify-between mb-4 relative">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:-rotate-6" style={{ backgroundColor: `${t.color}15`, color: t.color }}>
                      <Icon size={26} />
                    </div>
                    {t.tag && <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-[#F4B942]/20 text-[#B8860B] uppercase tracking-wider">{t.tag}</span>}
                  </div>
                  <h3 className="text-xl font-bold text-[#183A2A] mb-2 relative">{t.title}</h3>
                  <p className="text-[#66736B] leading-relaxed relative">{t.desc}</p>
                  <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#477A45] group-hover:gap-2 transition-all relative">
                    Try it now <ArrowRight size={14} />
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
          <StaggerItem>
            <Link href="/digital-survey" className="block bg-[#183A2A] text-white rounded-3xl p-7 h-full relative overflow-hidden hover:-translate-y-2 transition-all">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-[#F4B942]/20 blur-2xl" />
              <div className="relative">
                <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#A8D66D] mb-4">Deep Dive</div>
                <h3 className="text-xl font-bold mb-2">Digital Solar Survey</h3>
                <p className="text-white/70 mb-6">10 questions, a personalized roof score, and the option to book a physical survey with Bhasko engineers.</p>
                <div className="inline-flex items-center gap-1 text-sm font-semibold text-[#A8D66D] group-hover:gap-2 transition-all">Start Survey <ArrowRight size={14} /></div>
              </div>
            </Link>
          </StaggerItem>
        </div>
      </section>
    </>
  );
}
