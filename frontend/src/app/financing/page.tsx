'use client';
import PageHero from '@/components/sections/PageHero';
import { useState } from 'react';
import { FadeUp } from '@/components/ui/MotionWrap';
import FinalCTA from '@/components/sections/FinalCTA';
import { BadgeIndianRupee, Calendar, Percent } from 'lucide-react';
import { DataCard } from '@/components/cards';
import { calculateEMI, formatINR } from '@/lib/utils';

export default function FinancingPage() {
  const [cost, setCost] = useState(300000);
  const [subsidy, setSubsidy] = useState(78000);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(9.5);
  const [tenure, setTenure] = useState(84);
  const [currentBill, setCurrentBill] = useState(5000);
  const down = (cost * downPct) / 100;
  const principal = Math.max(0, cost - subsidy - down);
  const emi = calculateEMI(principal, rate, tenure);
  const netMonthly = currentBill - emi.emi;
  return (
    <>
      <PageHero
        eyebrow="BHASKO / FINANCING"
        title="Go solar sooner."
        subtitle="Easy EMIs that often cost less than your current electricity bill. Zero-down and lease options for qualifying homes and businesses."
        accentPhrase="pay less from day one."
        primaryCta={{ label: 'Calculate Solar EMI', href: '#emi-calculator' }}
        secondaryCta={{ label: 'Talk to Financing', href: '/contact' }}
      />
      <section id="emi-calculator" className="py-14 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-10">
          <FadeUp>
            <div className="bg-white rounded-3xl p-7 shadow-md border border-[rgba(24,58,42,0.06)]">
              <h2 className="text-2xl font-bold text-[#183A2A] mb-6">Solar EMI Calculator</h2>
              <div className="space-y-5">
                <Slider label="System Cost (₹)" value={cost} setValue={setCost} min={100000} max={2000000} step={10000} />
                <Slider label="Subsidy (₹)" value={subsidy} setValue={setSubsidy} min={0} max={200000} step={1000} />
                <Slider label="Down Payment (%)" value={downPct} setValue={setDownPct} min={0} max={50} step={5} suffix="%" />
                <Slider label="Interest Rate (%)" value={rate} setValue={setRate} min={7} max={15} step={0.1} suffix="%" />
                <Slider label="Tenure (months)" value={tenure} setValue={setTenure} min={12} max={180} step={6} suffix=" mo" />
                <Slider label="Current Monthly Bill (₹)" value={currentBill} setValue={setCurrentBill} min={1000} max={50000} step={500} />
              </div>
              <div className="mt-4 text-[11px] text-[#66736B] italic">Indicative figures. Loan approval depends on bank / NBFC criteria and credit profile.</div>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="space-y-4">
              <DataCard label="Loan Amount" value={formatINR(principal)} icon={BadgeIndianRupee} accent="green" />
              <DataCard label="Monthly EMI" value={formatINR(Math.round(emi.emi))} icon={Calendar} accent="solar" micro={`Total interest: ${formatINR(Math.round(emi.totalInterest))}`} />
              <DataCard label="Bill vs EMI" value={netMonthly >= 0 ? `Save ${formatINR(Math.round(netMonthly))}/mo` : `+${formatINR(Math.round(-netMonthly))}/mo`} icon={Percent} accent={netMonthly >= 0 ? 'fresh' : 'solar'} />
              <div className="bg-[#183A2A] text-white rounded-2xl p-6">
                <div className="text-xs text-[#A8D66D] font-semibold tracking-widest uppercase mb-2">The Math</div>
                <div className="text-sm text-white/80 leading-relaxed">After paying your EMI, your grid bill drops substantially (often near zero for properly sized systems). In most cases, the EMI is lower than your current bill — so you save from month one.</div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}

function Slider({ label, value, setValue, min, max, step, suffix = '' }: any) {
  return (
    <div>
      <label className="flex justify-between text-sm font-medium mb-2"><span>{label}</span><span className="text-[#477A45] font-bold">{Number(value).toLocaleString('en-IN')}{suffix}</span></label>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e => setValue(Number(e.target.value))} className="w-full accent-[#477A45]" />
    </div>
  );
}
