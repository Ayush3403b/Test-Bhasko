'use client';

import Link from 'next/link';
import { ArrowRight, MapPin, Zap, TrendingDown } from 'lucide-react';
import { FadeUp, StaggerItem } from '../ui/MotionWrap';
import { Badge } from '@/components/cards';

const PROJECTS = [
  { title: 'Residential · 5 kW', city: 'Patna, Bihar', category: 'residential', capacity: 5, before: 5200, after: 4820, hue: '#477A45' },
  { title: 'Showroom · 25 kW', city: 'Muzaffarpur', category: 'commercial', capacity: 25, before: 32000, after: 28500, hue: '#F4B942' },
  { title: 'Apartment Society · 80 kW', city: 'Patna', category: 'apartment', capacity: 80, before: 110000, after: 94000, hue: '#183A2A' },
];

export default function ProjectsPreview() {
  return (
    <section className="py-16 md:py-24 bg-[#FFFDF5]">
      <div className="max-w-[1500px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <FadeUp><div className="eyebrow mb-3">Recent Projects</div></FadeUp>
            <FadeUp delay={0.1}><h2 className="heading-section">Real systems. Real savings.</h2></FadeUp>
          </div>
          <FadeUp delay={0.2}>
            <Link href="/projects" className="btn-tertiary">View all projects <ArrowRight size={16} /></Link>
          </FadeUp>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <StaggerItem key={i}>
              <Link href="/projects" className="group block rounded-3xl overflow-hidden bg-white border border-[rgba(24,58,42,0.06)] shadow-sm hover:shadow-2xl transition-all hover:-translate-y-2 h-full">
                <div className="relative h-56 overflow-hidden" style={{
                  background: `linear-gradient(135deg, ${p.hue}25 0%, ${p.hue}05 100%)`,
                }}>
                  <svg viewBox="0 0 400 240" className="w-full h-full group-hover:scale-105 transition-transform duration-700">
                    <rect x="0" y="0" width="400" height="240" fill={p.hue} opacity="0.08" />
                    {/* house */}
                    <path d="M 80 180 L 80 230 L 320 230 L 320 180 Z" fill="#FFFDF5" stroke="#183A2A" strokeWidth="1.5" />
                    <path d="M 60 180 L 200 100 L 340 180 Z" fill={p.hue} stroke="#183A2A" strokeWidth="1.5" opacity="0.85" />
                    {Array.from({ length: 4 }).map((_, k) => (
                      <g key={k} transform={`translate(${100 + k * 50}, 145) rotate(-35)`}>
                        <rect x="0" y="0" width="40" height="26" fill="#183A2A" stroke="#183A2A" />
                        <line x1="20" y1="0" x2="20" y2="26" stroke="#FFFDF5" strokeWidth="0.8" opacity="0.3" />
                      </g>
                    ))}
                    <circle cx="330" cy="40" r="25" fill="#F4B942" opacity="0.8" />
                    {/* stats overlay */}
                    <g>
                      <rect x="20" y="20" width="120" height="50" rx="10" fill="white" opacity="0.9" />
                      <text x="32" y="40" fontSize="10" fill="#66736B" fontFamily="Inter">Generation today</text>
                      <text x="32" y="58" fontSize="16" fontWeight="700" fill="#183A2A" fontFamily="Inter">{p.capacity * 4.5} kWh</text>
                    </g>
                  </svg>
                  <div className="absolute top-3 right-3">
                    <Badge variant={p.category === 'commercial' ? 'solar' : p.category === 'apartment' ? 'accent' : 'fresh'}>{p.category}</Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#183A2A] mb-2 group-hover:text-[#477A45] transition-colors">{p.title}</h3>
                  <div className="flex items-center gap-1 text-sm text-[#66736B] mb-4"><MapPin size={14} /> {p.city}</div>
                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[rgba(24,58,42,0.06)]">
                    <div>
                      <div className="flex items-center gap-1 text-[10px] text-[#66736B] uppercase tracking-wider"><Zap size={11} /> Capacity</div>
                      <div className="text-sm font-bold text-[#183A2A]">{p.capacity} kW</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#66736B] uppercase tracking-wider">Before</div>
                      <div className="text-sm font-bold text-[#66736B] line-through">₹{(p.before/1000).toFixed(1)}k</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-[10px] text-[#477A45] uppercase tracking-wider"><TrendingDown size={11} /> Savings</div>
                      <div className="text-sm font-bold text-[#477A45]">₹{(p.after/1000).toFixed(1)}k/mo</div>
                    </div>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </div>
      </div>
    </section>
  );
}
