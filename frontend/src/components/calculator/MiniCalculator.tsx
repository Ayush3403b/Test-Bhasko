'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Zap, 
  ArrowRight, 
  Loader2, 
  Home, 
  Building2, 
  Factory, 
  Leaf,
  ShieldCheck, 
  Sparkles,
  MapPin,
  SunMedium
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { calculate } from '@/calculators/solarEngine';

const PROPERTY_TYPES = [
  { id: 'residential', label: 'Home', icon: Home },
  { id: 'commercial', label: 'Business', icon: Building2 },
  { id: 'industrial', label: 'Industry', icon: Factory },
] as const;

const CITIES = ['Patna', 'Muzaffarpur', 'Gaya', 'Delhi', 'Mumbai', 'Bengaluru', 'Lucknow', 'Jaipur', 'Ahmedabad', 'Other'];

const PRESET_BILLS = [2500, 5000, 8000, 12000];

export default function MiniCalculator({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [bill, setBill] = useState('5000');
  const [city, setCity] = useState('Patna');
  const [property, setProperty] = useState<'residential' | 'commercial' | 'industrial'>('residential');
  const [loading, setLoading] = useState(false);

  const numericBill = useMemo(() => {
    const val = Number(bill.replace(/[^0-9]/g, ''));
    return isNaN(val) || val <= 0 ? 5000 : val;
  }, [bill]);

  // Real-time solar calculation
  const stats = useMemo(() => {
    try {
      return calculate({
        monthlyBill: numericBill,
        city,
        propertyType: property,
      });
    } catch {
      return {
        recommendedCapacity: 5,
        monthlySavings: 4820,
        subsidy: 78000,
        paybackPeriodYears: 3.8,
      };
    }
  }, [numericBill, city, property]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    router.push(`/solar-intelligence/calculator?bill=${numericBill}&city=${encodeURIComponent(city)}&type=${property}`);
  };

  return (
    <div className={cn(
      'relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_rgba(24,58,42,0.12)] border border-[rgba(24,58,42,0.08)] overflow-hidden transition-all',
      compact ? 'p-5 sm:p-6' : 'p-6 md:p-8'
    )}>
      {/* Decorative top accent gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#477A45] via-[#A8D66D] to-[#F4B942]" />

      {/* Header section */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#477A45] to-[#366134] flex items-center justify-center text-white shadow-md shadow-[#477A45]/20 shrink-0">
            <Zap size={20} className="fill-white/20" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold tracking-wider uppercase text-[#183A2A]">Quick Solar Estimate</span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#477A45]/10 text-[#477A45] text-[10px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#477A45] animate-pulse" />
                LIVE
              </span>
            </div>
            <div className="text-xs text-[#66736B]">Instant sizing, savings & subsidy</div>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1 text-[11px] font-semibold text-[#477A45] bg-[#EAF3E1] px-2.5 py-1 rounded-full">
          <Sparkles size={12} className="text-[#F4B942]" />
          <span>AI Engine</span>
        </div>
      </div>

      {/* Feasibility & PM Surya Ghar Yojana Badges Strip */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {/* Roof Feasibility Tag */}
        <div className="flex items-center gap-2 bg-[#EAF3E1]/80 border border-[#477A45]/20 rounded-xl px-2.5 py-1.5">
          <div className="w-6 h-6 rounded-lg bg-[#477A45] text-white flex items-center justify-center shrink-0">
            <Leaf size={13} />
          </div>
          <div className="min-w-0">
            <div className="text-[9px] uppercase tracking-wider text-[#66736B] font-semibold truncate">Roof Feasibility</div>
            <div className="text-xs font-bold text-[#183A2A]">87% <span className="text-[10px] text-[#477A45] font-semibold">(High)</span></div>
          </div>
        </div>

        {/* PM Surya Ghar Yojana Tag */}
        <div className="flex items-center gap-2 bg-[#FFFDF5] border border-[#F4B942]/30 rounded-xl px-2.5 py-1.5">
          <div className="w-6 h-6 rounded-lg bg-[#F4B942] text-[#183A2A] flex items-center justify-center shrink-0">
            <SunMedium size={14} />
          </div>
          <div className="min-w-0">
            <div className="text-[9px] uppercase tracking-wider text-[#B8860B] font-semibold truncate">PM Surya Ghar</div>
            <div className="text-xs font-bold text-[#183A2A]">
              {stats.subsidy > 0 ? `₹${(stats.subsidy / 1000).toFixed(0)}k Subsidy` : 'Eligible'}
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Property Type Selector */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#66736B] mb-1.5">
            Property Type
          </label>
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F4F8EE] rounded-2xl border border-[rgba(24,58,42,0.06)]">
            {PROPERTY_TYPES.map((pt) => {
              const Icon = pt.icon;
              const isSelected = property === pt.id;
              return (
                <button
                  type="button"
                  key={pt.id}
                  onClick={() => setProperty(pt.id as any)}
                  className={cn(
                    'flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200',
                    isSelected
                      ? 'bg-white text-[#183A2A] shadow-sm border border-[rgba(24,58,42,0.08)]'
                      : 'text-[#66736B] hover:text-[#183A2A]'
                  )}
                >
                  <Icon size={14} className={isSelected ? 'text-[#477A45]' : 'text-[#66736B]'} />
                  <span>{pt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Electricity Bill Input & Slider */}
        <div className="bg-[#F8FAF5] p-3.5 sm:p-4 rounded-2xl border border-[rgba(24,58,42,0.06)] space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#66736B]">
              Monthly Electricity Bill
            </label>
            <div className="text-base sm:text-lg font-bold text-[#183A2A]">
              ₹{numericBill.toLocaleString('en-IN')}
            </div>
          </div>

          {/* Slider */}
          <div className="relative">
            <input
              type="range"
              min={1000}
              max={25000}
              step={500}
              value={numericBill > 25000 ? 25000 : numericBill}
              onChange={(e) => setBill(e.target.value)}
              className="w-full h-2 bg-[#E2EBD6] rounded-lg appearance-none cursor-pointer accent-[#477A45]"
            />
          </div>

          {/* Quick presets */}
          <div className="flex items-center justify-between gap-1.5 pt-1">
            {PRESET_BILLS.map((n) => (
              <button
                type="button"
                key={n}
                onClick={() => setBill(String(n))}
                className={cn(
                  'flex-1 text-[11px] py-1 rounded-lg font-medium transition-all text-center',
                  numericBill === n
                    ? 'bg-[#477A45] text-white shadow-sm font-semibold'
                    : 'bg-white text-[#66736B] border border-[rgba(24,58,42,0.08)] hover:border-[#477A45] hover:text-[#183A2A]'
                )}
              >
                ₹{n >= 1000 ? `${(n / 1000).toFixed(n % 1000 !== 0 ? 1 : 0)}k` : n}
              </button>
            ))}
          </div>
        </div>

        {/* Live dynamic solar breakdown preview */}
        <div className="grid grid-cols-3 gap-2 bg-gradient-to-br from-[#183A2A] to-[#234A36] text-white p-3 sm:p-3.5 rounded-2xl shadow-inner">
          <div className="text-center">
            <div className="text-[10px] text-[#A8D66D] uppercase tracking-wider font-semibold">Recommended</div>
            <div className="text-sm sm:text-base font-extrabold text-white mt-0.5">
              {stats.recommendedCapacity} <span className="text-xs font-normal text-white/80">kW</span>
            </div>
          </div>

          <div className="text-center border-x border-white/10 px-1">
            <div className="text-[10px] text-[#A8D66D] uppercase tracking-wider font-semibold">Monthly Save</div>
            <div className="text-sm sm:text-base font-extrabold text-[#F4B942] mt-0.5">
              ₹{Math.round(stats.monthlySavings).toLocaleString('en-IN')}
            </div>
          </div>

          <div className="text-center">
            <div className="text-[10px] text-[#A8D66D] uppercase tracking-wider font-semibold">Payback</div>
            <div className="text-sm sm:text-base font-extrabold text-white mt-0.5">
              {stats.paybackPeriodYears} <span className="text-xs font-normal text-white/80">yrs</span>
            </div>
          </div>
        </div>

        {/* City selection */}
        <div>
          <div className="relative">
            <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#477A45] pointer-events-none" />
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-[#F4F8EE] border border-[rgba(24,58,42,0.08)] focus:border-[#477A45] focus:bg-white outline-none text-[#183A2A] text-xs font-medium appearance-none cursor-pointer transition-colors"
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  City: {c} (Bihar & India)
                </option>
              ))}
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#66736B] text-[10px]">
              ▼
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#477A45] to-[#366134] hover:from-[#3d6a3c] hover:to-[#2e522c] text-white rounded-2xl py-3.5 font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#477A45]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-70 group"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            <>
              <span>Get Full Savings Report</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        {/* Trust Badges Footer */}
        <div className="flex items-center justify-center gap-3 text-[10px] text-[#66736B] pt-0.5">
          <span className="flex items-center gap-1 font-medium text-[#477A45]">
            <ShieldCheck size={12} />
            PM Surya Ghar Yojana
          </span>
          <span>•</span>
          <span className="font-medium">Free 10-sec Report</span>
          <span>•</span>
          <span className="font-medium">100% Free</span>
        </div>
      </form>
    </div>
  );
}
