'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calculator as CalcIcon, ArrowRight, Loader2, Home, Building2, Factory } from 'lucide-react';
import { cn } from '@/lib/utils';

const PROPERTY_TYPES = [
  { id: 'residential', label: 'Home', icon: Home },
  { id: 'commercial', label: 'Business', icon: Building2 },
  { id: 'industrial', label: 'Industry', icon: Factory },
] as const;

const CITIES = ['Patna', 'Muzaffarpur', 'Gaya', 'Delhi', 'Mumbai', 'Bengaluru', 'Lucknow', 'Jaipur', 'Ahmedabad', 'Other'];

export default function MiniCalculator({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [bill, setBill] = useState('5000');
  const [city, setCity] = useState('Patna');
  const [property, setProperty] = useState<'residential' | 'commercial' | 'industrial'>('residential');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    router.push(`/solar-intelligence/calculator?bill=${bill}&city=${city}&type=${property}`);
  };

  return (
    <div className={cn(
      'bg-white rounded-3xl p-6 md:p-7 shadow-[0_24px_64px_rgba(24,58,42,0.12)] border border-white',
      compact ? '' : 'md:p-8'
    )}>
      <div className="flex items-center gap-2 mb-5">
        <div className="w-9 h-9 rounded-xl bg-[#477A45]/10 flex items-center justify-center text-[#477A45]"><CalcIcon size={18} /></div>
        <div>
          <div className="text-xs font-semibold tracking-widest uppercase text-[#477A45]">Quick Solar Estimate</div>
          <div className="text-sm text-[#66736B]">Takes 10 seconds — no phone required</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-[#66736B] mb-2">Monthly Electricity Bill</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#183A2A] font-semibold">₹</span>
            <input
              type="number"
              value={bill}
              onChange={(e) => setBill(e.target.value)}
              min={500}
              max={500000}
              className="w-full pl-9 pr-4 py-3.5 rounded-xl bg-[#F4F8EE] border-2 border-transparent focus:border-[#477A45] focus:bg-white outline-none transition-all font-semibold text-[#183A2A] text-lg"
              placeholder="5000"
            />
          </div>
          <div className="flex gap-2 mt-2">
            {[2500, 4000, 6000, 10000].map(n => (
              <button type="button" key={n} onClick={() => setBill(String(n))}
                className={cn('text-xs px-3 py-1 rounded-full border transition-colors',
                  Number(bill) === n ? 'bg-[#477A45] text-white border-[#477A45]' : 'border-[rgba(24,58,42,0.15)] text-[#66736B] hover:border-[#477A45]')}>
                ₹{n.toLocaleString('en-IN')}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-[#66736B] mb-2">City</label>
            <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-[#F4F8EE] border-2 border-transparent focus:border-[#477A45] focus:bg-white outline-none text-[#183A2A] font-medium appearance-none">
              {CITIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-[#66736B] mb-2">Property</label>
            <div className="flex gap-1">
              {PROPERTY_TYPES.map(pt => {
                const Icon = pt.icon;
                return (
                  <button type="button" key={pt.id} onClick={() => setProperty(pt.id as any)}
                    className={cn('flex-1 flex flex-col items-center gap-1 py-2 rounded-xl border-2 transition-all',
                      property === pt.id ? 'border-[#477A45] bg-[#477A45]/10 text-[#477A45]' : 'border-transparent bg-[#F4F8EE] text-[#66736B]')}>
                    <Icon size={16} />
                    <span className="text-[10px] font-medium">{pt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <button type="submit" disabled={loading}
          className="w-full bg-[#477A45] hover:bg-[#3d6a3c] text-white rounded-full py-4 font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-lg disabled:opacity-70 group">
          {loading ? <Loader2 className="animate-spin" size={18} /> : <><span>CALCULATE MY SOLAR SAVINGS</span><ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>}
        </button>

        <p className="text-[11px] text-[#66736B] text-center">Free · No credit card · We'll never spam you</p>
      </form>
    </div>
  );
}
