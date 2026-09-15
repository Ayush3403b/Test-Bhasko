'use client';

import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { FadeUp } from '../ui/MotionWrap';
import { Badge } from '@/components/cards';

const TIERS = [
  {
    name: 'Essential',
    tagline: 'Smart start to solar',
    price: '₹52k/kW',
    features: ['Tier-1 Mono PERC panels', 'String inverter (5 yr)', 'Standard mounting', 'Basic monitoring app', '2 yr maintenance'],
    cta: 'Learn more',
    popular: false,
  },
  {
    name: 'Smart',
    tagline: 'Most popular',
    price: '₹60k/kW',
    features: ['Tier-1 Half-cut Mono PERC', 'Premium inverter (10 yr)', 'Aluminium structure', 'AI monitoring app', 'Net metering handled', 'Lightning protection', '5 yr AMC included'],
    cta: 'Get Smart',
    popular: true,
  },
  {
    name: 'Premium',
    tagline: 'Future-ready',
    price: '₹72k/kW',
    features: ['Bifacial TopCon panels', 'Microinverters / 3-phase', 'Premium rail mounting', 'Per-panel AI monitoring', 'Battery-ready wiring', '10 yr AMC included', 'Quarterly cleaning', '24h priority service'],
    cta: 'Go Premium',
    popular: false,
  },
];

export default function PackagesPreview() {
  return (
    <section className="py-16 md:py-24 bg-[#FFFDF5]">
      <div className="max-w-[1500px] mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <FadeUp><div className="eyebrow mb-3">Solar Packages</div></FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="heading-section">
              Three tiers, <span className="script-accent text-[#F4B942]">zero compromise.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-4 text-[#66736B] text-lg">Pick the package that matches how long you plan to stay, how tech-forward you are, and your budget. All include installation, warranty and PM Surya Ghar support.</p>
          </FadeUp>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {TIERS.map((t, i) => (
            <FadeUp key={t.name} delay={i * 0.1}>
              <div className={
                'relative h-full rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 flex flex-col ' +
                (t.popular
                  ? 'bg-[#183A2A] text-white shadow-2xl scale-[1.02] z-10'
                  : 'bg-white border border-[rgba(24,58,42,0.08)] shadow-sm hover:shadow-xl')
              }>
                {t.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2"><Badge variant="solar">MOST POPULAR</Badge></div>
                )}
                <div className="mb-4">
                  <div className={t.popular ? 'text-[#A8D66D] text-xs font-semibold tracking-[0.2em] uppercase mb-2' : 'eyebrow mb-2'}>{t.tagline}</div>
                  <h3 className={t.popular ? 'text-3xl font-bold' : 'text-3xl font-bold text-[#183A2A]'}>{t.name}</h3>
                </div>
                <div className="mb-6">
                  <div className={t.popular ? 'text-4xl font-bold' : 'text-4xl font-bold text-[#183A2A]'}>{t.price}</div>
                  <div className={t.popular ? 'text-sm opacity-70' : 'text-sm text-[#66736B]'}>Indicative, pre-subsidy</div>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {t.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm">
                      <div className={
                        'w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ' +
                        (t.popular ? 'bg-[#A8D66D] text-[#183A2A]' : 'bg-[#477A45]/10 text-[#477A45]')
                      }><Check size={12} /></div>
                      <span className={t.popular ? '' : 'text-[#183029]'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/solar-packages"
                  className={
                    'block text-center rounded-full py-3.5 font-semibold transition-all inline-flex items-center justify-center gap-2 w-full ' +
                    (t.popular ? 'bg-[#A8D66D] text-[#183A2A] hover:bg-[#96c75b]' : 'border-2 border-[#183A2A] text-[#183A2A] hover:bg-[#183A2A] hover:text-white')
                  }
                >
                  {t.cta} <ArrowRight size={16} />
                </Link>
              </div>
            </FadeUp>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/solar-packages" className="btn-tertiary inline-flex">Compare all features <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>
  );
}
