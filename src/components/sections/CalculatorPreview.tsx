'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, Coins, Calendar, Leaf, BadgeIndianRupee, PiggyBank, Building2 } from 'lucide-react';
import { FadeUp } from '../ui/MotionWrap';
import { DataCard } from '@/components/cards';
import { formatINR, formatNumber } from '@/lib/utils';

export default function CalculatorPreview() {
  const [bill, setBill] = useState(5000);
  const [city, setCity] = useState('Patna');

  /* Client-side rough estimate (UI preview only) — final math always routes through the server engine. */
  const tariff = city === 'Patna' ? 7.0 : city === 'Delhi' ? 8.0 : city === 'Mumbai' ? 8.5 : 7.5;
  const yld = 4.5;
  const units = bill / tariff;
  const kw = Math.max(1, Math.round((units / 30 / (yld * 0.85)) * 2) / 2);
  const annualGen = kw * yld * 365 * 0.8;
  const monthlySavings = (annualGen / 12) * tariff * 0.9;
  const subsidy = kw <= 2 ? kw * 30000 : Math.min(78000, kw * 25000);
  const grossCost = kw * 60000;
  const netCost = Math.max(0, grossCost - subsidy);
  const payback = netCost / (monthlySavings * 12);
  const co2 = (annualGen * 0.82) / 1000;

  return (
    <section className="py-16 md:py-24 bg-[#EAF3E1]/50">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <FadeUp><div className="eyebrow mb-3">Live Preview</div></FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="heading-section mb-4">
                What could your roof <span className="script-accent text-[#F4B942]">save?</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-[#66736B] text-lg leading-relaxed mb-6">
                Move the sliders — your recommended capacity, savings and payback update in real-time. This is a preview; the full calculator accounts for roof area, DISCOM tariffs, shading and future needs.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="bg-white rounded-3xl p-6 shadow-md border border-[rgba(24,58,42,0.06)] space-y-5">
                <div>
                  <label className="flex items-center justify-between text-sm font-medium mb-2">
                    <span>Monthly Electricity Bill</span>
                    <span className="text-[#477A45] font-bold text-lg">{formatINR(bill)}</span>
                  </label>
                  <input
                    type="range" min={1000} max={20000} step={500}
                    value={bill} onChange={(e) => setBill(Number(e.target.value))}
                    className="w-full accent-[#477A45]"
                  />
                  <div className="flex justify-between text-[11px] text-[#66736B] mt-1"><span>₹1k</span><span>₹10k</span><span>₹20k</span></div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">City</label>
                  <div className="flex flex-wrap gap-2">
                    {['Patna', 'Delhi', 'Mumbai', 'Bengaluru', 'Jaipur'].map(c => (
                      <button key={c} onClick={() => setCity(c)}
                        className={'px-3 py-1.5 text-xs rounded-full border transition ' +
                          (city === c ? 'bg-[#477A45] text-white border-[#477A45]' : 'border-[rgba(24,58,42,0.15)] text-[#66736B] hover:border-[#477A45]')}>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <Link href="/solar-intelligence/calculator" className="btn-primary w-full justify-center inline-flex items-center gap-2 group">
                  Get My Detailed Solar Report <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <p className="text-[11px] text-[#66736B] text-center italic">Indicative estimates. Final design needs physical survey.</p>
              </div>
            </FadeUp>
          </div>

          <div className="lg:col-span-7">
            <FadeUp delay={0.15}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <DataCard label="Recommended System" value={kw} suffix=" kW" icon={Zap} accent="green" />
                <DataCard label="Est. Generation" value={formatNumber(annualGen / 12)} suffix=" units/mo" icon={Zap} accent="fresh" />
                <DataCard label="Monthly Savings" value={formatINR(monthlySavings)} icon={Coins} accent="solar" />
                <DataCard label="PM Surya Ghar Subsidy" value={formatINR(subsidy)} icon={BadgeIndianRupee} accent="fresh" />
                <DataCard label="Est. Payback" value={payback.toFixed(1)} suffix=" yrs" icon={Calendar} accent="green" />
                <DataCard label="25-Year Savings" value={`₹${Math.round(monthlySavings * 12 * 20 / 100000)}L`} icon={PiggyBank} accent="solar" micro={`~${Math.round(co2 * 22)} tons CO₂ avoided`} />
              </div>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="mt-6 bg-[#183A2A] text-white rounded-3xl p-7 relative overflow-hidden">
                <svg className="absolute -bottom-10 -right-10 w-80 h-80 opacity-10" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="80" fill="#F4B942" />
                  {Array.from({ length: 16 }).map((_, i) => {
                    const a = (i * Math.PI) / 8;
                    const x1 = Math.round((100 + Math.cos(a) * 90) * 100) / 100;
                    const y1 = Math.round((100 + Math.sin(a) * 90) * 100) / 100;
                    const x2 = Math.round((100 + Math.cos(a) * 110) * 100) / 100;
                    const y2 = Math.round((100 + Math.sin(a) * 110) * 100) / 100;
                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#F4B942" strokeWidth="4" strokeLinecap="round" />;
                  })}
                </svg>
                <div className="relative">
                  <div className="flex items-center gap-2 text-[#A8D66D] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                    <Building2 size={14} /> Bhasko Promise
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">We don't sell you a solar system.</h3>
                  <p className="text-white/80 text-lg mb-5">We calculate the solar system that makes sense for you.</p>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70 mb-5">
                    <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#A8D66D]" /> No pressure sales</div>
                    <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#A8D66D]" /> No inflated MW claims</div>
                    <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#A8D66D]" /> No post-install radio silence</div>
                  </div>
                  <Link href="/solar-intelligence/calculator" className="inline-flex items-center gap-2 bg-[#A8D66D] text-[#183A2A] px-6 py-3 rounded-full font-semibold hover:bg-white transition-all">
                    Start Your Calculation <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
