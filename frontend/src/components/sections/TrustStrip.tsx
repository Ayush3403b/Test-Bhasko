'use client';

import AnimatedCounter from '../ui/AnimatedCounter';
import { Award, Users, Zap, MapPin, Smile } from 'lucide-react';

const STATS = [
  { label: 'Years of Experience', value: 0, suffix: '+', prefix: '', icon: Award, note: '[YEARS EXPERIENCE] placeholder' },
  { label: 'Installations', value: 0, suffix: '+', icon: Zap, note: '[INSTALLATIONS COUNT] placeholder' },
  { label: 'MW Installed', value: 0, suffix: ' MW', icon: Zap, note: '[INSTALLED CAPACITY] placeholder' },
  { label: 'Happy Customers', value: 0, suffix: '+', icon: Users, note: '[CUSTOMER COUNT] placeholder' },
  { label: 'Cities Served', value: 0, suffix: '+', icon: MapPin, note: '[CITIES COUNT] placeholder' },
  { label: 'Customer Satisfaction', value: 0, suffix: '%', icon: Smile, note: '[SATISFACTION %] placeholder' },
];

export default function TrustStrip() {
  return (
    <section className="py-12 md:py-16 bg-[#EAF3E1]/60 border-y border-[rgba(24,58,42,0.06)]">
      <div className="max-w-[1500px] mx-auto px-4 md:px-8">
        <div className="text-center mb-8">
          <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#477A45] mb-2">Trusted across India</div>
          <div className="text-xs text-[#66736B] italic">Numbers shown will update after launch. Using bracketed placeholders for content integrity.</div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="text-center group">
                <div className="inline-flex w-12 h-12 rounded-2xl bg-white shadow-sm items-center justify-center mb-3 text-[#477A45] group-hover:scale-110 transition-transform">
                  <Icon size={20} />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-[#183A2A]">
                  <AnimatedCounter value={s.value} suffix={s.suffix} prefix={s.prefix} decimals={0} />
                </div>
                <div className="text-xs md:text-sm text-[#66736B] mt-1">{s.label}</div>
                <div className="text-[9px] text-[rgba(24,58,42,0.3)] italic mt-0.5">{s.note}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
