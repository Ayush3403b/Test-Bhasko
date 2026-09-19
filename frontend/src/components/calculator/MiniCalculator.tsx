'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Calculator as CalcIcon, ArrowRight, Loader2, Home, Building2, Factory, Zap, IndianRupee, Award, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const PROPERTY_TYPES = [
  { id: 'residential', label: 'Home', icon: Home },
  { id: 'commercial', label: 'Business', icon: Building2 },
  { id: 'industrial', label: 'Industry', icon: Factory },
] as const;

const CITIES = ['Patna', 'Muzaffarpur', 'Gaya', 'Bhagalpur', 'Darbhanga', 'Delhi NCR', 'Lucknow', 'Kolkata', 'Bengaluru', 'Other'];

export default function MiniCalculator({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [bill, setBill] = useState('5000');
  const [city, setCity] = useState('Patna');
  const [property, setProperty] = useState<'residential' | 'commercial' | 'industrial'>('residential');
  const [loading, setLoading] = useState(false);

  // Live dynamic calculations
  const billNum = Math.max(500, Number(bill) || 5000);

  const calculations = useMemo(() => {
    // Sizing approximation: ~1kW produces ~120 units/mo (~₹800-₹1000 bill saving in residential)
    const kw = property === 'residential' 
      ? Math.max(1, Math.round((billNum / 1000) * 10) / 10)
      : Math.max(3, Math.round((billNum / 1200) * 10) / 10);
    
    const monthlySavings = Math.round(billNum * 0.92);
    
    // PM Surya Ghar Subsidy (Residential only)
    let subsidy = 0;
    if (property === 'residential') {
      if (kw <= 1) subsidy = 30000;
      else if (kw <= 2) subsidy = 60000;
      else subsidy = 78000;
    }

    return {
      kw: kw.toFixed(1),
      monthlySavings: monthlySavings.toLocaleString('en-IN'),
      subsidy: property === 'residential' ? `₹${subsidy.toLocaleString('en-IN')}` : 'Tax Depreciation',
      payback: property === 'residential' ? (kw <= 3 ? '3.2 yrs' : '3.8 yrs') : '3.0 yrs'
    };
  }, [billNum, property]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    router.push(`/solar-intelligence/calculator?bill=${bill}&city=${city}&type=${property}`);
  };

  return (
    <div className={cn(
      'relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_-10px_rgba(24,58,42,0.12)] border border-[rgba(24,58,42,0.08)] overflow-hidden transition-all duration-300',
      compact ? 'p-5 sm:p-7' : 'p-6 md:p-8'
    )}>
      {/* Decorative subtle top banner */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#477A45] via-[#A8D66D] to-[#F4B942]" />

      {/* Card Header */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#477A45]/10 border border-[#477A45]/20 flex items-center justify-center text-[#477A45] shrink-0 shadow-sm">
            <CalcIcon size={20} />
          </div>
          <div>
            <div className="text-[11px] font-bold tracking-wider uppercase text-[#477A45]">Quick Solar Estimator</div>
            <div className="text-xs text-[#66736B]">Instant AI-powered rooftop breakdown</div>
          </div>
        </div>
        <div className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#A8D66D]/20 text-[#285A26] text-[11px] font-semibold border border-[#A8D66D]/40">
          <span className="w-1.5 h-1.5 rounded-full bg-[#477A45] animate-pulse" />
          Live Sizing
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Bill input section */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="hero-bill-input" className="block text-xs font-semibold text-[#183A2A]">
              Monthly Electricity Bill
            </label>
            <span className="text-[11px] text-[#66736B]">Avg. amount paid</span>
          </div>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#183A2A] font-bold text-lg">₹</span>
            <input
              id="hero-bill-input"
              type="number"
              value={bill}
              onChange={(e) => setBill(e.target.value)}
              min={500}
              max={500000}
              className="w-full pl-9 pr-4 py-3 rounded-2xl bg-[#F4F8EE] border-2 border-transparent focus:border-[#477A45] focus:bg-white outline-none transition-all font-bold text-[#183A2A] text-xl"
              placeholder="5000"
            />
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {[2500, 4000, 6000, 10000].map(n => (
              <button
                type="button"
                key={n}
                onClick={() => setBill(String(n))}
                className={cn(
                  'text-xs px-3 py-1 rounded-full border font-medium transition-all duration-200',
                  Number(bill) === n
                    ? 'bg-[#477A45] text-white border-[#477A45] shadow-sm scale-[1.02]'
                    : 'bg-white/80 border-[rgba(24,58,42,0.12)] text-[#66736B] hover:border-[#477A45] hover:text-[#183A2A]'
                )}
              >
                ₹{n.toLocaleString('en-IN')}
              </button>
            ))}
          </div>
        </div>

        {/* City and Property selector */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div>
            <label htmlFor="hero-city-select" className="block text-xs font-semibold text-[#183A2A] mb-1.5">
              City / Location
            </label>
            <select
              id="hero-city-select"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8EE] border-2 border-transparent focus:border-[#477A45] focus:bg-white outline-none text-[#183A2A] text-xs font-medium cursor-pointer"
            >
              {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#183A2A] mb-1.5">Property Type</label>
            <div className="flex gap-1">
              {PROPERTY_TYPES.map(pt => {
                const Icon = pt.icon;
                const isSelected = property === pt.id;
                return (
                  <button
                    type="button"
                    key={pt.id}
                    onClick={() => setProperty(pt.id)}
                    className={cn(
                      'flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl border-2 transition-all duration-150',
                      isSelected
                        ? 'border-[#477A45] bg-[#477A45]/10 text-[#477A45] font-semibold'
                        : 'border-transparent bg-[#F4F8EE] text-[#66736B] hover:text-[#183A2A]'
                    )}
                  >
                    <Icon size={14} />
                    <span className="text-[10px] mt-0.5 leading-none">{pt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Live Estimation Results Box - Clean, Beautiful, Dynamic */}
        <div className="bg-gradient-to-br from-[#183A2A] to-[#1F4A36] text-white rounded-2xl p-3.5 sm:p-4 shadow-md border border-[rgba(255,255,255,0.1)]">
          <div className="text-[10px] uppercase tracking-wider text-[#A8D66D] font-bold flex items-center justify-between mb-2.5">
            <span>Estimated Solar Output</span>
            <span className="text-[9px] lowercase opacity-80">instant preview</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-white/10 rounded-xl p-2 backdrop-blur-sm border border-white/5">
              <div className="flex items-center justify-center gap-1 text-[10px] text-white/70 mb-0.5">
                <Zap size={11} className="text-[#F4B942]" /> Sizing
              </div>
              <div className="text-sm sm:text-base font-bold text-white tracking-tight">{calculations.kw} kW</div>
            </div>

            <div className="bg-white/10 rounded-xl p-2 backdrop-blur-sm border border-white/5">
              <div className="flex items-center justify-center gap-1 text-[10px] text-white/70 mb-0.5">
                <IndianRupee size={11} className="text-[#A8D66D]" /> Savings
              </div>
              <div className="text-sm sm:text-base font-bold text-[#A8D66D] tracking-tight">₹{calculations.monthlySavings}<span className="text-[10px] font-normal text-white/60">/m</span></div>
            </div>

            <div className="bg-white/10 rounded-xl p-2 backdrop-blur-sm border border-white/5">
              <div className="flex items-center justify-center gap-1 text-[10px] text-white/70 mb-0.5">
                <Award size={11} className="text-[#F4B942]" /> Subsidy
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#F4B942] tracking-tight truncate">{calculations.subsidy}</div>
            </div>
          </div>
        </div>

        {/* Submit Action Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#477A45] hover:bg-[#3d6a3c] text-white rounded-2xl py-3.5 font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg hover:shadow-[#477A45]/25 hover:-translate-y-0.5 disabled:opacity-70 group cursor-pointer"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <>
              <span>GET DETAILED SOLAR REPORT</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        {/* Reassurance text */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-[#66736B] pt-0.5">
          <ShieldCheck size={13} className="text-[#477A45]" />
          <span>100% Free · No obligation · Instant customized report</span>
        </div>
      </form>
    </div>
  );
}
