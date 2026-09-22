'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Zap, 
  Leaf,
  Clock,
  Calculator,
  ArrowRight, 
  Loader2, 
  Home, 
  Building2, 
  Factory, 
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { calculate } from '@/calculators/solarEngine';

const PROPERTY_TYPES = [
  { id: 'residential', label: 'Home', icon: Home },
  { id: 'commercial', label: 'Business', icon: Building2 },
  { id: 'industrial', label: 'Industry', icon: Factory },
] as const;

const CITIES = ['Patna', 'Muzaffarpur', 'Gaya', 'Delhi', 'Mumbai', 'Bengaluru', 'Lucknow', 'Jaipur', 'Ahmedabad', 'Other'];

const PRESET_BILLS = [2500, 4000, 6000, 10000];

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
        paybackPeriodYears: 4.2,
      };
    }
  }, [numericBill, city, property]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    router.push(`/solar-intelligence/calculator?bill=${numericBill}&city=${encodeURIComponent(city)}&type=${property}`);
  };

  return (
    <div className="relative w-full max-w-[480px] mx-auto pt-6 pb-6">
      {/* Floating Tag 1: RECOMMENDED (Top-Left, positioned slightly above calculator) */}
      <div className="absolute -top-3 sm:-top-4 left-0 sm:-left-3 z-20 bg-white/95 backdrop-blur-md rounded-[18px] sm:rounded-[20px] px-3.5 sm:px-4 py-2 sm:py-2.5 shadow-[0_12px_32px_rgba(24,58,42,0.12)] border border-[rgba(24,58,42,0.06)] flex items-center gap-2.5 sm:gap-3 transition-transform hover:-translate-y-0.5">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FEF6E6] flex items-center justify-center text-[#E59819] shrink-0">
          <Zap size={16} className="fill-[#E59819] text-[#E59819]" />
        </div>
        <div>
          <div className="text-[9px] sm:text-[10px] font-bold tracking-wider uppercase text-[#7A8A80]">RECOMMENDED</div>
          <div className="text-sm sm:text-base font-extrabold text-[#183A2A] leading-tight">{stats.recommendedCapacity} kW</div>
        </div>
      </div>

      {/* Floating Tag 2: ROOF SUITABILITY (Top-Right, positioned slightly above calculator) */}
      <div className="absolute -top-1 sm:-top-2 right-0 sm:-right-3 z-20 bg-white/95 backdrop-blur-md rounded-[18px] sm:rounded-[20px] px-3.5 sm:px-4 py-2 sm:py-2.5 shadow-[0_12px_32px_rgba(24,58,42,0.12)] border border-[rgba(24,58,42,0.06)] flex items-center gap-2.5 sm:gap-3 transition-transform hover:-translate-y-0.5">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#EAF3E1] flex items-center justify-center text-[#477A45] shrink-0">
          <Leaf size={16} className="text-[#477A45]" />
        </div>
        <div>
          <div className="text-[9px] sm:text-[10px] font-bold tracking-wider uppercase text-[#7A8A80]">ROOF SUITABILITY</div>
          <div className="text-sm sm:text-base font-extrabold text-[#183A2A] leading-tight">87%</div>
        </div>
      </div>

      {/* Floating Tag 3: EST. MONTHLY SAVINGS (Bottom-Left) */}
      <div className="absolute -bottom-2 sm:-bottom-3 left-0 sm:-left-3 z-20 bg-[#183A2A] rounded-[18px] sm:rounded-[20px] px-3.5 sm:px-4 py-2 sm:py-2.5 shadow-[0_14px_36px_rgba(24,58,42,0.28)] flex items-center gap-2.5 sm:gap-3 transition-transform hover:-translate-y-0.5">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#244E3A] flex items-center justify-center text-[#A8D66D] font-bold text-sm sm:text-base shrink-0">
          ₹
        </div>
        <div>
          <div className="text-[8px] sm:text-[9px] font-bold tracking-wider uppercase text-[#8DAA99]">EST. MONTHLY SAVINGS</div>
          <div className="text-sm sm:text-base font-extrabold text-white leading-tight">₹{Math.round(stats.monthlySavings).toLocaleString('en-IN')}</div>
        </div>
      </div>

      {/* Floating Tag 4: PAYBACK (Bottom-Right) */}
      <div className="absolute -bottom-2 sm:-bottom-3 right-0 sm:-right-3 z-20 bg-white/95 backdrop-blur-md rounded-[18px] sm:rounded-[20px] px-3.5 sm:px-4 py-2 sm:py-2.5 shadow-[0_12px_32px_rgba(24,58,42,0.12)] border border-[rgba(24,58,42,0.06)] flex items-center gap-2.5 sm:gap-3 transition-transform hover:-translate-y-0.5">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#EAF3E1] flex items-center justify-center text-[#477A45] shrink-0">
          <Clock size={16} className="text-[#477A45]" />
        </div>
        <div>
          <div className="text-[9px] sm:text-[10px] font-bold tracking-wider uppercase text-[#7A8A80]">PAYBACK</div>
          <div className="text-sm sm:text-base font-extrabold text-[#183A2A] leading-tight">{stats.paybackPeriodYears || 4.2} yrs</div>
        </div>
      </div>

      {/* Main Card Container */}
      <div className={cn(
        'relative bg-white rounded-[28px] sm:rounded-[32px] shadow-[0_20px_50px_rgba(24,58,42,0.08)] border border-[rgba(24,58,42,0.05)] transition-all',
        compact ? 'p-5 sm:p-6 md:p-7' : 'p-6 sm:p-8'
      )}>
        {/* Header section */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#EAF3E1] flex items-center justify-center text-[#477A45] shrink-0">
            <Calculator size={20} />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-extrabold tracking-wider uppercase text-[#477A45]">
              SOLAR ESTIMATE
            </div>
            <div className="text-xs text-[#7A8A80]">
              Takes 10 seconds — instant breakdown
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-4.5">
          {/* Monthly Electricity Bill */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-[#54685C] mb-2">
              Monthly Electricity Bill
            </label>
            
            <div className="bg-[#F1F6EC] rounded-2xl px-4 py-3 sm:py-3.5 flex items-center gap-2.5 focus-within:ring-2 focus-within:ring-[#477A45]/30 transition-all">
              <span className="text-xl sm:text-2xl font-bold text-[#183A2A]">₹</span>
              <input
                type="text"
                inputMode="numeric"
                value={bill}
                onChange={(e) => {
                  const clean = e.target.value.replace(/[^0-9]/g, '');
                  setBill(clean);
                }}
                placeholder="5000"
                className="w-full bg-transparent text-xl sm:text-2xl font-bold text-[#183A2A] outline-none placeholder:text-[#183A2A]/30"
              />
            </div>

            {/* Quick preset bill pills */}
            <div className="flex items-center gap-2 pt-2.5">
              {PRESET_BILLS.map((preset) => (
                <button
                  type="button"
                  key={preset}
                  onClick={() => setBill(String(preset))}
                  className={cn(
                    'flex-1 py-1.5 sm:py-2 px-1 rounded-full text-xs font-semibold border transition-all text-center',
                    numericBill === preset
                      ? 'bg-[#EAF3E1] border-[#477A45] text-[#183A2A] shadow-xs'
                      : 'bg-white border-[rgba(24,58,42,0.12)] text-[#54685C] hover:border-[#477A45] hover:text-[#183A2A]'
                  )}
                >
                  ₹{preset.toLocaleString('en-IN')}
                </button>
              ))}
            </div>
          </div>

          {/* City and Property Columns */}
          <div className="grid grid-cols-2 gap-3 sm:gap-3.5 pt-1">
            {/* City */}
            <div>
              <label className="block text-xs font-semibold text-[#54685C] mb-1.5">
                City
              </label>
              <div className="bg-[#F1F6EC] rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3 relative flex items-center justify-between">
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-bold text-[#183A2A] outline-none appearance-none cursor-pointer pr-4"
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 text-[#54685C] pointer-events-none" />
              </div>
            </div>

            {/* Property */}
            <div>
              <label className="block text-xs font-semibold text-[#54685C] mb-1.5">
                Property
              </label>
              <div className="flex items-center gap-1.5">
                {PROPERTY_TYPES.map((pt) => {
                  const Icon = pt.icon;
                  const isSelected = property === pt.id;
                  return (
                    <button
                      type="button"
                      key={pt.id}
                      onClick={() => setProperty(pt.id as any)}
                      className={cn(
                        'flex-1 flex flex-col items-center justify-center py-1.5 sm:py-2 px-1 rounded-2xl border transition-all text-center',
                        isSelected
                          ? 'border-2 border-[#477A45] bg-[#EAF3E1]/60 text-[#183A2A]'
                          : 'border-transparent bg-[#F1F6EC] text-[#7A8A80] hover:text-[#183A2A]'
                      )}
                    >
                      <Icon size={16} className={isSelected ? 'text-[#477A45]' : 'text-[#7A8A80]'} />
                      <span className={cn('text-[9px] sm:text-[10px] mt-0.5', isSelected ? 'font-bold text-[#183A2A]' : 'font-medium text-[#7A8A80]')}>
                        {pt.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#477A45] hover:bg-[#3D6B3B] text-white rounded-full py-3.5 sm:py-4 font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#477A45]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-70 group cursor-pointer"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  <span>CALCULATE MY SOLAR SAVINGS</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>

          {/* Subtext */}
          <div className="text-center text-[11px] text-[#7A8A80] pt-1">
            No credit card · We&apos;ll never spam you
          </div>
        </form>
      </div>
    </div>
  );
}
