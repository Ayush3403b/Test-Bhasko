import PageHero from '@/components/sections/PageHero';
import { FadeUp } from '@/components/ui/MotionWrap';
import Link from 'next/link';
import { MapPin, Zap, TrendingDown, ArrowRight } from 'lucide-react';
import { buildMetadata } from '@/components/SEO';
import { Badge } from '@/components/cards';
export const metadata = buildMetadata({ title: 'Projects & Case Studies — Real Solar Installations | Bhasko', description: 'Case studies of residential, commercial and industrial rooftop solar installations by Bhasko. Real investments, real subsidies, real savings.', canonical: '/projects' });
const PROJECTS = [
  { title:'Patna Residence · 5 kW On-Grid', city:'Patna, Bihar', cat:'residential', kw:5, before:5200, after:4820, inv:300000, sub:78000, payback:4.1, hue:'#477A45' },
  { title:'Muzaffarpur Showroom · 25 kW', city:'Muzaffarpur', cat:'commercial', kw:25, before:32000, after:28500, inv:1500000, sub:0, payback:3.5, hue:'#F4B942' },
  { title:'Patna Apartment Society · 80 kW', city:'Patna', cat:'apartment', kw:80, before:110000, after:94000, inv:4400000, sub:0, payback:3.8, hue:'#183A2A' },
  { title:'Gaya Villa · 3 kW Hybrid', city:'Gaya, Bihar', cat:'residential', kw:3, before:3200, after:2900, inv:270000, sub:78000, payback:4.5, hue:'#A8D66D' },
  { title:'Patna School Campus · 60 kW', city:'Patna', cat:'institutional', kw:60, before:82000, after:70000, inv:3300000, sub:0, payback:3.2, hue:'#477A45' },
  { title:'Warehouse · 200 kW', city:'Hajipur', cat:'industrial', kw:200, before:260000, after:230000, inv:10000000, sub:0, payback:2.9, hue:'#F4B942' },
];
export default function ProjectsPage() {
  return (
    <>
      <PageHero eyebrow="BHASKO / PROJECTS" title="Real systems." subtitle="A selection of Bhasko installations across homes, businesses and institutions. Names and specific addresses are placeholders pending customer approval." accentPhrase="real numbers." primaryCta={{ label: 'Calculate Similar System', href: '/solar-intelligence/calculator' }} />
      <section className="py-14 md:py-20">
        <div className="max-w-[1500px] mx-auto px-4 md:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p,i) => (
            <FadeUp key={p.title} delay={i*0.08}>
              <Link href="#" className="block bg-white rounded-3xl overflow-hidden border border-[rgba(24,58,42,0.06)] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all h-full group">
                <div className="relative h-56 overflow-hidden" style={{background:`linear-gradient(135deg, ${p.hue}25 0%, ${p.hue}05 100%)`}}>
                  <svg viewBox="0 0 400 240" className="w-full h-full group-hover:scale-105 transition-transform duration-700">
                    <rect width="400" height="240" fill={p.hue} opacity="0.08" />
                    <path d="M 80 180 L 80 230 L 320 230 L 320 180 Z" fill="#FFFDF5" stroke="#183A2A" strokeWidth="1.5"/>
                    <path d="M 60 180 L 200 100 L 340 180 Z" fill={p.hue} stroke="#183A2A" strokeWidth="1.5" opacity="0.85"/>
                    {Array.from({length:4}).map((_,k)=>(
                      <g key={k} transform={`translate(${100+k*50},145) rotate(-35)`}>
                        <rect x="0" y="0" width="40" height="26" fill="#183A2A" stroke="#183A2A"/>
                      </g>
                    ))}
                    <circle cx="330" cy="40" r="25" fill="#F4B942" opacity="0.8" />
                  </svg>
                  <div className="absolute top-3 right-3"><Badge variant={p.cat==='commercial'?'solar':p.cat==='apartment'||p.cat==='institutional'?'accent':'fresh'}>{p.cat}</Badge></div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#183A2A] mb-2 group-hover:text-[#477A45] transition-colors">{p.title}</h3>
                  <div className="flex items-center gap-1 text-sm text-[#66736B] mb-4"><MapPin size={14} />{p.city}</div>
                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[rgba(24,58,42,0.06)] text-center">
                    <div><div className="flex items-center justify-center gap-1 text-[10px] uppercase text-[#66736B]"><Zap size={10}/>Cap</div><div className="text-sm font-bold text-[#183A2A]">{p.kw} kW</div></div>
                    <div><div className="text-[10px] uppercase text-[#66736B]">Inv.</div><div className="text-sm font-bold text-[#183A2A]">₹{(p.inv/100000).toFixed(1)}L</div></div>
                    <div><div className="flex items-center justify-center gap-1 text-[10px] uppercase text-[#477A45]"><TrendingDown size={10}/>Saved</div><div className="text-sm font-bold text-[#477A45]">₹{(p.after/1000).toFixed(1)}k/mo</div></div>
                  </div>
                  <div className="mt-4 text-sm text-[#66736B]">Payback: <strong className="text-[#183A2A]">{p.payback} years</strong> · Subsidy: {p.sub>0?`₹${(p.sub/1000).toFixed(0)}k`:'N/A'}</div>
                  <div className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#477A45] group-hover:gap-2 transition-all">View Case Study <ArrowRight size={14}/></div>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </section>
    </>
  );
}
