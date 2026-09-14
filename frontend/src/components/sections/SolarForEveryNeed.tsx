'use client';

import Link from 'next/link';
import { Home, Building2, Hotel, School, Hospital, Warehouse, Factory, CarFront, ArrowRight } from 'lucide-react';
import { FadeUp, StaggerItem } from '../ui/MotionWrap';
import { Badge } from '@/components/cards';

const SEGMENTS = [
  { icon: Home, title: 'Home', desc: 'For independent houses and villas', size: '1–10 kW', href: '/solar-home', color: '#477A45' },
  { icon: Building2, title: 'Business', desc: 'Offices & shops', size: '10–50 kW', href: '/solar-business', color: '#183A2A' },
  { icon: Hotel, title: 'Hotels & Restaurants', desc: 'High consumption businesses', size: '20–100 kW', href: '/solar-business', color: '#F4B942' },
  { icon: School, title: 'Schools & Colleges', desc: 'Campuses with daytime load', size: '20–200 kW', href: '/solar-business', color: '#A8D66D' },
  { icon: Hospital, title: 'Hospitals', desc: 'Reliable power + savings', size: '30–150 kW', href: '/solar-business', color: '#477A45' },
  { icon: Warehouse, title: 'Warehouses', desc: 'Large, unused roof space', size: '50–500 kW', href: '/solar-business', color: '#183A2A' },
  { icon: Factory, title: 'Factories', desc: 'Industrial rooftop solar', size: '100 kW+', href: '/solar-business', color: '#F4B942' },
  { icon: CarFront, title: 'Solar + EV', desc: 'Charge your car from your roof', size: '5–15 kW', href: '/solar-solutions/ev', color: '#A8D66D' },
];

export default function SolarForEveryNeed() {
  return (
    <section className="py-16 md:py-24 bg-[#F4F8EE]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div>
            <FadeUp><div className="eyebrow mb-3">Solar for every need</div></FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="heading-section">
                Solar, designed around <span className="script-accent text-[#477A45]">your life</span>.
              </h2>
            </FadeUp>
          </div>
          <FadeUp delay={0.2}>
            <Link href="/solar-solutions" className="btn-tertiary">
              See all solutions <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeUp>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SEGMENTS.map((s, i) => {
            const Icon = s.icon;
            return (
              <StaggerItem key={i}>
                <Link href={s.href} className="group block relative overflow-hidden bg-white rounded-2xl p-6 border border-[rgba(24,58,42,0.06)] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle, ${s.color}20, transparent 70%)` }} />
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 group-hover:-rotate-6" style={{ backgroundColor: `${s.color}15`, color: s.color }}>
                    <Icon size={22} />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-[#183A2A]">{s.title}</h3>
                    <Badge variant="outline">{s.size}</Badge>
                  </div>
                  <p className="text-sm text-[#66736B] mb-4">{s.desc}</p>
                  <div className="text-sm font-medium text-[#477A45] inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Explore <ArrowRight size={14} />
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </div>
      </div>
    </section>
  );
}
