'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Zap, IndianRupee, Calendar, Leaf, CheckCircle2, Sparkles, Home, Building2, Factory } from 'lucide-react';
import { cn, formatINR, formatNumber } from '@/lib/utils';
import { getApiUrl } from '@/lib/api';

type Step = { id: number; title: string; sub: string };
const STEPS: Step[] = [
  { id: 1, title: 'Your Electricity', sub: 'Monthly bill or units' },
  { id: 2, title: 'Your Location', sub: 'City & property type' },
  { id: 3, title: 'Your Roof', sub: 'Area & roof type' },
  { id: 4, title: 'Your Future', sub: 'EV & battery needs' },
  { id: 5, title: 'Your Recommendation', sub: 'Tailored solar plan' },
];

export default function FullCalculator() {
  const reduce = useReducedMotion();
  const searchParams = useSearchParams();
  const initialBill = Number(searchParams.get('bill')) || 5000;
  const initialCity = searchParams.get('city') || 'Patna';
  const initialType = (searchParams.get('type') as any) || 'residential';

  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    bill: initialBill,
    units: 0,
    city: initialCity,
    propertyType: initialType,
    roofArea: 0,
    roofType: 'rcc' as 'rcc' | 'metal-sheet' | 'tiled' | 'other',
    systemType: 'on-grid' as 'on-grid' | 'hybrid' | 'off-grid',
    ev: false,
    battery: false,
    name: '',
    phone: '',
    email: '',
  });
  const [calculating, setCalculating] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [submitted, setSubmitted] = useState(false);

  const update = (patch: Partial<typeof data>) => setData(prev => ({ ...prev, ...patch }));

  const compute = async () => {
    setCalculating(true);
    try {
      const res = await fetch(getApiUrl('/api/calculate'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          monthlyBill: data.bill,
          monthlyUnits: data.units || undefined,
          city: data.city,
          propertyType: data.propertyType,
          roofArea: data.roofArea || undefined,
          roofType: data.roofType,
          systemType: data.systemType,
          evRequirement: data.ev,
          batteryRequirement: data.battery,
        }),
      });
      const json = await res.json();
      setResult(json.data?.result);
    } catch (e) { console.error(e); }
    setCalculating(false);
  };

  const next = async () => {
    if (step === 4) { await compute(); }
    setStep(s => Math.min(5, s + 1));
  };
  const prev = () => setStep(s => Math.max(1, s - 1));

  const submitLead = async () => {
    if (!data.name || !data.phone) return;
    await fetch(getApiUrl('/api/leads'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name, phone: data.phone, email: data.email,
        city: data.city, propertyType: data.propertyType, monthlyBill: data.bill,
        roofArea: data.roofArea, roofType: data.roofType, systemType: data.systemType,
        evRequirement: data.ev, batteryRequirement: data.battery,
        source: 'calculator',
      }),
    });
    setSubmitted(true);
  };

  const progressPct = (step / 5) * 100;

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-[rgba(24,58,42,0.06)] overflow-hidden">
      {/* Progress */}
      <div className="px-6 md:px-8 pt-6 pb-4 border-b border-[rgba(24,58,42,0.06)]">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-semibold text-[#477A45]">Step {step} of 5</div>
          <div className="text-xs text-[#66736B]">{STEPS[step - 1].sub}</div>
        </div>
        <div className="h-1.5 bg-[#EAF3E1] rounded-full overflow-hidden">
          <motion.div
            initial={false}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-[#A8D66D] to-[#477A45] rounded-full"
          />
        </div>
        <div className="hidden md:grid grid-cols-5 mt-3 gap-2">
          {STEPS.map(s => (
            <div key={s.id} className={'text-[11px] font-medium ' + (s.id <= step ? 'text-[#477A45]' : 'text-[#66736B]')}>
              {String(s.id).padStart(2,'0')} · {s.title}
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 md:p-8 min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={reduce ? undefined : { opacity: 0, x: 20 }}
            animate={reduce ? undefined : { opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: -20 }}
            transition={{ duration: 0.35 }}
          >
            {step === 1 && (
              <div className="space-y-5 max-w-lg">
                <h3 className="text-2xl font-bold text-[#183A2A]">Your electricity bill</h3>
                <p className="text-[#66736B]">Tell us your average monthly bill — we'll work backwards to size your system.</p>
                <div>
                  <label className="block text-sm font-medium mb-2">Monthly Bill (₹)</label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#183A2A] font-bold text-xl">₹</span>
                    <input type="number" value={data.bill} onChange={e => update({ bill: Number(e.target.value) })}
                      className="w-full pl-12 pr-5 py-4 rounded-xl bg-[#F4F8EE] border-2 border-transparent focus:border-[#477A45] focus:bg-white outline-none text-xl font-semibold text-[#183A2A]" />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {[2000, 3500, 5000, 7500, 10000, 15000].map(n => (
                      <button key={n} onClick={() => update({ bill: n })}
                        className={cn('text-sm px-3 py-1.5 rounded-full border transition',
                          data.bill === n ? 'bg-[#477A45] text-white border-[#477A45]' : 'border-[rgba(24,58,42,0.15)] text-[#66736B] hover:border-[#477A45]')}>
                        ₹{n.toLocaleString('en-IN')}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Or enter monthly units (optional)</label>
                  <input type="number" value={data.units || ''} onChange={e => update({ units: Number(e.target.value) })}
                    placeholder="e.g. 600 units"
                    className="w-full px-5 py-3 rounded-xl bg-[#F4F8EE] border-2 border-transparent focus:border-[#477A45] focus:bg-white outline-none" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5 max-w-xl">
                <h3 className="text-2xl font-bold text-[#183A2A]">Your location & property</h3>
                <p className="text-[#66736B]">Solar yield, tariff and subsidy vary by city.</p>
                <div>
                  <label className="block text-sm font-medium mb-2">City</label>
                  <select value={data.city} onChange={e => update({ city: e.target.value })}
                    className="w-full px-5 py-3 rounded-xl bg-[#F4F8EE] border-2 border-transparent focus:border-[#477A45] focus:bg-white outline-none font-medium">
                    {['Patna', 'Muzaffarpur', 'Gaya', 'Delhi', 'Mumbai', 'Bengaluru', 'Lucknow', 'Jaipur', 'Ahmedabad', 'Other'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Property Type</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'residential', label: 'Home', icon: Home },
                      { id: 'commercial', label: 'Business', icon: Building2 },
                      { id: 'industrial', label: 'Industry', icon: Factory },
                    ].map(p => {
                      const Icon = p.icon;
                      return (
                        <button key={p.id} onClick={() => update({ propertyType: p.id as any })}
                          className={cn('p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition',
                            data.propertyType === p.id ? 'border-[#477A45] bg-[#477A45]/10 text-[#477A45]' : 'border-transparent bg-[#F4F8EE] text-[#66736B]')}>
                          <Icon size={22} />
                          <span className="text-sm font-medium">{p.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5 max-w-xl">
                <h3 className="text-2xl font-bold text-[#183A2A]">Your roof</h3>
                <p className="text-[#66736B]">Approximate numbers work for the estimate — we'll verify at survey.</p>
                <div>
                  <label className="block text-sm font-medium mb-2">Roof Area (sq ft)</label>
                  <input type="number" value={data.roofArea || ''} onChange={e => update({ roofArea: Number(e.target.value) })}
                    placeholder="e.g. 500"
                    className="w-full px-5 py-3 rounded-xl bg-[#F4F8EE] border-2 border-transparent focus:border-[#477A45] focus:bg-white outline-none" />
                  <div className="flex gap-2 mt-2">
                    {[300, 500, 800, 1200].map(n => (
                      <button key={n} onClick={() => update({ roofArea: n })}
                        className={cn('text-xs px-3 py-1 rounded-full border',
                          data.roofArea === n ? 'bg-[#477A45] text-white border-[#477A45]' : 'border-[rgba(24,58,42,0.15)] text-[#66736B]')}>{n} sqft</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Roof Type</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      { id: 'rcc', label: 'RCC (Flat)' }, { id: 'metal-sheet', label: 'Metal Shed' },
                      { id: 'tiled', label: 'Tiled' }, { id: 'other', label: 'Other' },
                    ].map(r => (
                      <button key={r.id} onClick={() => update({ roofType: r.id as any })}
                        className={cn('py-2 px-3 rounded-lg text-sm border-2 transition',
                          data.roofType === r.id ? 'border-[#477A45] bg-[#477A45]/10 text-[#477A45] font-medium' : 'border-transparent bg-[#F4F8EE] text-[#66736B]')}>{r.label}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">System Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'on-grid', label: 'On-Grid', sub: 'Grid-tied, no battery' },
                      { id: 'hybrid', label: 'Hybrid', sub: 'Grid + battery backup' },
                      { id: 'off-grid', label: 'Off-Grid', sub: 'No grid connection' },
                    ].map(s => (
                      <button key={s.id} onClick={() => update({ systemType: s.id as any })}
                        className={cn('p-3 rounded-xl border-2 text-left transition',
                          data.systemType === s.id ? 'border-[#477A45] bg-[#477A45]/10 text-[#477A45]' : 'border-transparent bg-[#F4F8EE]')}>
                        <div className="font-semibold text-sm">{s.label}</div>
                        <div className="text-[10px] opacity-70 mt-0.5">{s.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-5 max-w-xl">
                <h3 className="text-2xl font-bold text-[#183A2A]">Your future needs</h3>
                <p className="text-[#66736B]">Help us size the system for the next 5-10 years, not just today.</p>
                <div className="space-y-3">
                  <label className="flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition"
                    style={{ borderColor: data.ev ? '#477A45' : 'transparent', backgroundColor: data.ev ? '#477A4510' : '#F4F8EE' }}>
                    <input type="checkbox" checked={data.ev} onChange={e => update({ ev: e.target.checked })} className="w-5 h-5 accent-[#477A45]" />
                    <div>
                      <div className="font-semibold text-[#183A2A]">I have or plan to buy an Electric Vehicle</div>
                      <div className="text-sm text-[#66736B]">We'll upsize to cover charging load.</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition"
                    style={{ borderColor: data.battery ? '#477A45' : 'transparent', backgroundColor: data.battery ? '#477A4510' : '#F4F8EE' }}>
                    <input type="checkbox" checked={data.battery} onChange={e => update({ battery: e.target.checked })} className="w-5 h-5 accent-[#477A45]" />
                    <div>
                      <div className="font-semibold text-[#183A2A]">I want battery backup</div>
                      <div className="text-sm text-[#66736B]">Essential loads during power cuts.</div>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {step === 5 && (
              <div>
                {calculating ? (
                  <div className="py-12 flex flex-col items-center gap-4">
                    <div className="w-14 h-14 rounded-full border-4 border-[#EAF3E1] border-t-[#477A45] animate-spin" />
                    <div className="text-[#66736B]">Calculating your ideal solar system…</div>
                  </div>
                ) : !result ? (
                  <div className="py-12 text-center text-[#66736B]">Preparing your recommendation…</div>
                ) : submitted ? (
                  <motion.div initial={reduce ? undefined : { scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="py-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-[#A8D66D]/20 text-[#477A45] flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#183A2A] mb-2">You're all set, {data.name}!</h3>
                    <p className="text-[#66736B] mb-6">We've sent your solar estimate to {data.email || 'your phone'}. A Bhasko solar expert will call you within 24 hours.</p>
                    <div className="inline-flex items-center gap-2 bg-[#477A45]/10 text-[#477A45] rounded-full px-4 py-2 text-sm font-medium">
                      <Sparkles size={14} /> Your detailed report is being prepared
                    </div>
                  </motion.div>
                ) : (
                  <div>
                    {/* Celebration */}
                    {!reduce && <CelebrationBurst />}
                    <div className="flex items-center gap-2 text-[#A8D66D] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Your Solar Recommendation</div>
                    <h3 className="text-3xl md:text-4xl font-bold text-[#183A2A] mb-2">Your roof could save {formatINR(result.monthlySavings)}<span className="script-accent text-[#F4B942] text-3xl md:text-4xl ml-2 align-middle">per month.</span></h3>
                    <p className="text-[#66736B] mb-6 text-sm">Indicative estimate based on the information provided. Final design requires a physical engineering survey.</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                      <Metric icon={Zap} label="Recommended" value={`${result.recommendedCapacity} kW`} />
                      <Metric icon={IndianRupee} label="Monthly Savings" value={formatINR(result.monthlySavings)} accent="#F4B942" />
                      <Metric icon={IndianRupee} label="Indicative Subsidy" value={formatINR(result.subsidy)} accent="#A8D66D" />
                      <Metric icon={Calendar} label="Payback" value={`${result.paybackPeriodYears} years`} />
                      <Metric icon={IndianRupee} label="Net Investment" value={formatINR(result.netCost)} />
                      <Metric icon={Leaf} label="CO₂ avoided" value={`${result.co2ReductionTonsPerYear.toFixed(1)} t/yr`} accent="#477A45" />
                      <Metric icon={Zap} label="Annual Generation" value={`${formatNumber(result.estimatedAnnualGeneration)} units`} />
                      <Metric icon={IndianRupee} label="25-Year Savings" value={`₹${Math.round(result.twentyFiveYearSavings/100000)}L`} accent="#F4B942" />
                    </div>

                    <div className="bg-[#F4F8EE] rounded-2xl p-5 mb-6">
                      <div className="font-semibold text-[#183A2A] mb-3">Get your detailed Solar Report</div>
                      <div className="grid md:grid-cols-3 gap-3">
                        <input type="text" placeholder="Your name" value={data.name} onChange={e => update({ name: e.target.value })} className="px-4 py-3 rounded-xl bg-white border-2 border-transparent focus:border-[#477A45] outline-none" />
                        <input type="tel" placeholder="Phone (required)" value={data.phone} onChange={e => update({ phone: e.target.value })} className="px-4 py-3 rounded-xl bg-white border-2 border-transparent focus:border-[#477A45] outline-none" />
                        <input type="email" placeholder="Email (for the PDF report)" value={data.email} onChange={e => update({ email: e.target.value })} className="px-4 py-3 rounded-xl bg-white border-2 border-transparent focus:border-[#477A45] outline-none" />
                      </div>
                      <button onClick={submitLead} disabled={!data.name || !data.phone}
                        className="mt-3 w-full btn-primary justify-center inline-flex items-center gap-2 disabled:opacity-50">
                        Email My Detailed Report <ArrowRight size={16} />
                      </button>
                      <p className="text-[11px] text-[#66736B] mt-2 text-center">We respect your privacy. We'll call once to confirm your report — no spam, ever.</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {step < 5 && (
        <div className="px-6 md:px-8 py-5 border-t border-[rgba(24,58,42,0.06)] flex justify-between items-center">
          <button onClick={prev} disabled={step === 1}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#66736B] hover:text-[#183A2A] disabled:opacity-30">
            <ArrowLeft size={16} /> Back
          </button>
          <button onClick={next}
            className="btn-primary inline-flex items-center gap-2">
            {step === 4 ? 'Calculate My Solar' : 'Continue'} <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

function Metric({ icon: Icon, label, value, accent = '#477A45' }: any) {
  return (
    <div className="bg-white rounded-xl border border-[rgba(24,58,42,0.06)] p-4">
      <div className="flex items-center gap-2 mb-1">
        <Icon size={14} style={{ color: accent }} />
        <div className="text-[10px] font-semibold tracking-wider uppercase text-[#66736B]">{label}</div>
      </div>
      <div className="text-lg md:text-xl font-bold text-[#183A2A]">{value}</div>
    </div>
  );
}

function CelebrationBurst() {
  return (
    <div className="relative">
      {Array.from({ length: 18 }).map((_, i) => {
        const a = (i * Math.PI * 2) / 18;
        const d = 80 + ((i * 17) % 40);
        return (
          <motion.div
            key={i}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.round(Math.cos(a) * d * 100) / 100,
              y: Math.round(Math.sin(a) * d * 100) / 100,
              opacity: 0,
              scale: 0,
            }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full"
            style={{ background: i % 2 ? '#F4B942' : '#A8D66D' }}
          />
        );
      })}
    </div>
  );
}
