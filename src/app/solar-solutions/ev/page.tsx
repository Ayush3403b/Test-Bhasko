'use client';
import PageHero from '@/components/sections/PageHero';
import { useState } from 'react';
import { FadeUp } from '@/components/ui/MotionWrap';
import FinalCTA from '@/components/sections/FinalCTA';
import { Zap, CarFront, Battery } from 'lucide-react';
import { DataCard } from '@/components/cards';
import { formatINR } from '@/lib/utils';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function SolarEVPage() {
  const [dailyKm, setDailyKm] = useState(40);
  const [kw, setKw] = useState(5);
  const kmpkwh = 8;
  const dailyKwh = dailyKm / kmpkwh;
  const yld = 4.5;
  const extraKw = Math.ceil((dailyKwh * 30) / (yld * 30 * 0.85));
  const recommended = kw + extraKw;
  const evSavings = dailyKwh * 7.5 * 30;
  return (
    <>
      <PageHero
        eyebrow="BHASKO / SOLAR + EV"
        title="Charge your car from your roof."
        subtitle="Rooftop solar + home EV charging = virtually free fuel for life. Size your system to cover your commute."
        accentPhrase="sun-powered miles."
        primaryCta={{ label: 'Size My Solar + EV', href: '/solar-intelligence/calculator' }}
      />
      <section className="py-14 md:py-20 bg-[#FFFDF5] relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <FadeUp>
            <div className="relative mx-auto max-w-2xl bg-white rounded-3xl p-6 border border-[rgba(24,58,42,0.08)] shadow-sm mb-10">
              <h3 className="text-lg font-semibold text-[#183A2A] mb-4 text-center">Energy Flow</h3>
              <svg viewBox="0 0 600 180" className="w-full h-48">
                <defs>
                  <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L0,8 L8,4 z" fill="#477A45" /></marker>
                </defs>
                <circle cx="50" cy="40" r="22" fill="#F4B942" />
                <rect x="200" y="60" width="80" height="70" fill="#FFFDF5" stroke="#183A2A" strokeWidth="2" rx="4" />
                <path d="M 190 60 L 240 25 L 290 60 Z" fill="#477A45" stroke="#183A2A" strokeWidth="2" />
                <text x="240" y="100" textAnchor="middle" fontSize="10" fill="#183A2A" fontWeight="600">HOME</text>
                <rect x="340" y="70" width="50" height="50" fill="#A8D66D" stroke="#183A2A" strokeWidth="2" rx="4" />
                <text x="365" y="100" textAnchor="middle" fontSize="9" fill="#183A2A" fontWeight="600">BATTERY</text>
                <rect x="450" y="75" width="80" height="40" fill="#183A2A" rx="8" />
                <text x="490" y="100" textAnchor="middle" fontSize="9" fill="#FFFDF5" fontWeight="600">EV</text>
                <circle cx="465" cy="120" r="8" fill="#183A2A" />
                <circle cx="515" cy="120" r="8" fill="#183A2A" />
                <rect x="200" y="150" width="80" height="22" fill="#EAF3E1" stroke="#183A2A" rx="4" />
                <text x="240" y="165" textAnchor="middle" fontSize="9" fill="#183A2A" fontWeight="600">GRID</text>
                <path d="M 75 55 Q 140 55 195 70" stroke="#F4B942" strokeWidth="2.5" fill="none" markerEnd="url(#arrow)" className="energy-dash" />
                <path d="M 285 95 Q 315 95 335 95" stroke="#477A45" strokeWidth="2.5" fill="none" markerEnd="url(#arrow)" className="energy-dash" />
                <path d="M 395 95 Q 425 95 445 95" stroke="#477A45" strokeWidth="2.5" fill="none" markerEnd="url(#arrow)" className="energy-dash" />
                <path d="M 240 130 L 240 148" stroke="#A8D66D" strokeWidth="2" fill="none" markerEnd="url(#arrow)" className="energy-dash" />
              </svg>
            </div>
          </FadeUp>
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <FadeUp>
              <div className="bg-white rounded-3xl p-7 shadow-md border border-[rgba(24,58,42,0.06)]">
                <h3 className="text-xl font-bold text-[#183A2A] mb-4">Quick Solar + EV Sizing</h3>
                <div className="space-y-5">
                  <div>
                    <label className="flex justify-between text-sm font-medium mb-2"><span>Daily Commute (km)</span><span className="text-[#477A45] font-bold">{dailyKm} km/day</span></label>
                    <input type="range" min={10} max={150} step={5} value={dailyKm} onChange={e => setDailyKm(Number(e.target.value))} className="w-full accent-[#477A45]" />
                  </div>
                  <div>
                    <label className="flex justify-between text-sm font-medium mb-2"><span>Home System Size</span><span className="text-[#477A45] font-bold">{kw} kW</span></label>
                    <input type="range" min={1} max={15} step={1} value={kw} onChange={e => setKw(Number(e.target.value))} className="w-full accent-[#477A45]" />
                  </div>
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div className="space-y-4">
                <DataCard label="Recommended System" value={recommended} suffix=" kW" icon={Zap} accent="green" micro={`Adds ${extraKw} kW for EV charging`} />
                <DataCard label="EV Daily Charge" value={dailyKwh.toFixed(1)} suffix=" kWh" icon={CarFront} accent="solar" />
                <DataCard label="Monthly EV Savings" value={formatINR(evSavings)} icon={Battery} accent="fresh" />
                <div className="bg-[#183A2A] text-white rounded-2xl p-5">
                  <h4 className="font-semibold mb-2">Why solar + EV?</h4>
                  <p className="text-sm text-white/80">At ₹7-8/kWh grid tariff, charging an EV at home costs ~₹1/km. With solar, per-km cost falls to nearly zero after payback — cheaper than any petrol/diesel car.</p>
                  <Link href="/contact" className="inline-flex items-center gap-2 mt-4 bg-[#A8D66D] text-[#183A2A] px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-white transition-all group">
                    Plan Solar + EV <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
