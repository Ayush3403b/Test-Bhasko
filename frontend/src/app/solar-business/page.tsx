'use client';
import PageHero from '@/components/sections/PageHero';
import Link from 'next/link';
import { Store, Building2, GraduationCap, Hospital, UtensilsCrossed, Warehouse, Factory, Building, ArrowRight, TrendingDown, ShieldCheck, BadgeIndianRupee, Zap } from 'lucide-react';
import { FadeUp } from '@/components/ui/MotionWrap';
import { FeatureCard } from '@/components/cards';
import FinalCTA from '@/components/sections/FinalCTA';
import FAQSection from '@/components/sections/FAQSection';


const SEGMENTS = [
  { icon: Store, title: 'Shops & Retail', description: 'High daytime consumption, fast payback.', size: '5-30 kW', href: '/contact' },
  { icon: Building2, title: 'Offices', description: 'Corporate offices, co-working spaces.', size: '10-100 kW', href: '/contact' },
  { icon: GraduationCap, title: 'Schools & Colleges', description: 'Daytime-heavy load, long holidays with net export.', size: '20-200 kW', href: '/contact' },
  { icon: Hospital, title: 'Hospitals', description: 'Reliable power with hybrid+battery backup.', size: '30-150 kW', href: '/contact' },
  { icon: UtensilsCrossed, title: 'Hotels & Restaurants', description: 'Kitchen loads + AC all day.', size: '20-100 kW', href: '/contact' },
  { icon: Warehouse, title: 'Warehouses', description: 'Massive unused roof space, fast ROI.', size: '50-500 kW', href: '/contact' },
  { icon: Factory, title: 'Factories', description: 'Industrial rooftop and ground-mount.', size: '100 kW-1 MW+', href: '/contact' },
  { icon: Building, title: 'Apartment Societies', description: 'Common areas, lifts, pumps, EV charging.', size: '50-500 kW', href: '/solar-solutions/apartment' },
];

const FAQS = [
  { q: 'What is the typical ROI for commercial solar?', a: 'Most commercial on-grid systems pay back between 2.5 and 4 years through bill savings, accelerated depreciation and tax benefits. The system then continues saving for 25+ years.' },
  { q: 'Do you offer OPEX/PPA models?', a: 'Yes. For qualifying 50 kW+ sites, Bhasko and our capital partners offer zero-upfront PPA / lease models where you pay per unit at a rate below grid tariff.' },
  { q: 'Can we claim accelerated depreciation?', a: 'Yes, commercial and industrial customers can typically claim 40%+ accelerated depreciation in the first year, materially improving post-tax returns.' },
  { q: 'How long does a commercial installation take?', a: 'Design and approvals typically take 3-6 weeks; installation 1-3 weeks depending on system size and site readiness.' },
];

export default function SolarBusinessPage() {
  return (
    <>
      <PageHero
        eyebrow="BHASKO / SOLAR FOR BUSINESS"
        title="Your electricity bill is a business expense."
        subtitle="Solar turns it into an asset — reducing operating costs, locking in energy rates for 25 years and earning ESG credentials."
        accentPhrase="2-4 year payback."
        primaryCta={{ label: 'Get Commercial Proposal', href: '/contact' }}
        secondaryCta={{ label: 'Calculate Commercial ROI', href: '/solar-intelligence/calculator' }}
      />

      <section className="py-14 md:py-20">
        <div className="max-w-[1500px] mx-auto px-4 md:px-8">
          <FadeUp><div className="eyebrow mb-3">Industries we serve</div></FadeUp>
          <FadeUp delay={0.1}><h2 className="heading-section mb-8">Solar for every business.</h2></FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SEGMENTS.map((s, i) => {
              const Icon = s.icon;
              return (
                <Link key={s.title} href={s.href} className="group block bg-white rounded-2xl p-6 border border-[rgba(24,58,42,0.06)] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-[#183A2A]/10 text-[#183A2A] flex items-center justify-center mb-4 group-hover:bg-[#183A2A] group-hover:text-white transition-colors">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-semibold text-[#183A2A] mb-1">{s.title}</h3>
                  <p className="text-sm text-[#66736B] mb-3">{s.description}</p>
                  <div className="text-xs font-semibold text-[#477A45]">{s.size}</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-[#FFFDF5]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <FadeUp><h2 className="heading-section mb-10 max-w-3xl">Why businesses choose Bhasko.</h2></FadeUp>
          <div className="grid md:grid-cols-3 gap-5">
            <FeatureCard icon={TrendingDown} title="Predictable ROI" description="Detailed financial modeling, payback and IRR before you commit. Real post-subsidy numbers." accent="#F4B942" />
            <FeatureCard icon={ShieldCheck} title="Engineering Grade" description="IEC-compliant BoM, structural audits, earthing and lightning protection to industrial standards." accent="#477A45" />
            <FeatureCard icon={BadgeIndianRupee} title="CAPEX & OPEX" description="Own the system outright, or go zero-upfront via our PPA/Lease partners. You choose." accent="#A8D66D" />
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <FadeUp>
            <div className="bg-[#183A2A] text-white rounded-3xl p-8 md:p-10 relative overflow-hidden">
              <svg className="absolute -bottom-10 -right-10 w-80 h-80 opacity-10" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="80" fill="#F4B942" />
              </svg>
              <div className="relative">
                <Zap className="text-[#F4B942] mb-3" />
                <h3 className="text-2xl md:text-3xl font-bold mb-3">Get a commercial solar proposal</h3>
                <p className="text-white/80 mb-6">Share your commercial electricity bill and our business solar team will prepare a custom ROI report, sizing recommendation and equipment plan — free and with no obligation.</p>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-[#A8D66D] text-[#183A2A] px-6 py-3 rounded-full font-semibold hover:bg-white transition-all group">
                  Request Commercial Proposal <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <FAQSection items={FAQS} />
      <FinalCTA />
    </>
  );
}
