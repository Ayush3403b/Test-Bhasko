'use client';
import PageHero from '@/components/sections/PageHero';
import Link from 'next/link';
import { FadeUp } from '@/components/ui/MotionWrap';
import FAQSection from '@/components/sections/FAQSection';
import FinalCTA from '@/components/sections/FinalCTA';
import { Zap, IndianRupee, Home, Ruler, Calendar, BadgeCheck, ShieldCheck, ArrowRight } from 'lucide-react';
import { DataCard } from '@/components/cards';


const SIZES = [
  { kw: '1 kW', ideal: '1-2 BHK, small family', units: '~120-140 units/month', roof: '~100 sq ft', bill: '₹1,000-1,500', savings: '₹1,000-1,200/mo', subsidy: '₹30,000', href: '/solar/1kw' },
  { kw: '2 kW', ideal: '2-3 BHK, small AC', units: '~240-280 units/month', roof: '~200 sq ft', bill: '₹2,000-2,800', savings: '₹2,000-2,400/mo', subsidy: '₹60,000', href: '/solar/2kw' },
  { kw: '3 kW', ideal: '3 BHK, 1-2 ACs', units: '~360-420 units/month', roof: '~300 sq ft', bill: '₹3,000-4,500', savings: '₹2,900-3,600/mo', subsidy: '₹78,000', href: '/solar/3kw' },
  { kw: '5 kW', ideal: 'Large home, 2-3 ACs', units: '~600-700 units/month', roof: '~500 sq ft', bill: '₹4,500-7,000', savings: '₹4,500-5,500/mo', subsidy: '₹78,000', href: '/solar/5kw' },
  { kw: '5 kW+', ideal: 'Villas, homes w/ EV', units: '700+ units/month', roof: '500+ sq ft', bill: '₹7,000+', savings: '₹5,500+/mo', subsidy: '₹78,000*', href: '/solar/5kw-plus' },
];

const FAQS = [
  { q: 'How much does a home solar system cost in 2025?', a: 'On-grid residential systems typically range from ₹52,000 to ₹72,000 per kW before subsidy, depending on package (Essential, Smart or Premium). After PM Surya Ghar subsidy, net cost for a 3 kW system starts around ₹1 lakh (indicative).' },
  { q: 'What subsidy can I get for home solar?', a: 'Under PM Surya Ghar Yojana, residential customers get ₹30,000/kW up to 2 kW, and ₹[SUBSIDY AMOUNT] per additional kW up to 3 kW. Maximum ₹78,000 subsidy for systems up to 10 kW.' },
  { q: 'Will my home solar work during power cuts?', a: 'Standard on-grid systems shut down during outages for grid safety (anti-islanding). If you want backup, opt for a Hybrid system with battery storage.' },
  { q: 'How long do home solar panels last?', a: 'Tier-1 panels come with 25-year performance warranties and typically continue producing well beyond that. Inverters usually last 10-15 years.' },
  { q: 'Do I need to clean the panels?', a: 'Yes, 2-4 cleanings a year are recommended depending on dust levels. Bhasko Smart and Premium packages include cleaning visits, or you can book cleaning on-demand via your My Solar portal.' },
  { q: 'How much roof area is required?', a: 'Roughly 85-100 sq ft per kW. A 3 kW system needs about 300 sq ft of shade-free roof area; 5 kW needs ~500 sq ft.' },
];

export default function SolarHomePage() {
  return (
    <>
      <PageHero
        eyebrow="BHASKO / SOLAR FOR HOME"
        title="Solar made for your home."
        subtitle="From small 2-BHKs to large villas with EVs, Bhasko calculates the right system for your actual electricity bill — not a generic package. End-to-end installation, PM Surya Ghar paperwork, and 25-year support."
        accentPhrase="zero bills, zero hassle."
        primaryCta={{ label: 'Calculate My Home Solar', href: '/solar-intelligence/calculator' }}
        secondaryCta={{ label: 'Talk to an Expert', href: '/contact' }}
      />

      {/* System sizes */}
      <section className="py-14 md:py-20">
        <div className="max-w-[1500px] mx-auto px-4 md:px-8">
          <FadeUp>
            <div className="eyebrow mb-3">Choose your size</div>
            <h2 className="heading-section mb-8">Solar systems for every home.</h2>
          </FadeUp>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SIZES.map((s, i) => (
              <FadeUp key={s.kw} delay={i * 0.07}>
                <Link href={s.href} className="block bg-white rounded-2xl p-6 border border-[rgba(24,58,42,0.06)] shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 h-full group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#477A45]/10 flex items-center justify-center text-[#477A45] group-hover:bg-[#477A45] group-hover:text-white transition-colors"><Home size={22} /></div>
                    <div className="text-2xl font-bold text-[#477A45]">{s.kw}</div>
                  </div>
                  <div className="text-sm font-medium text-[#183A2A] mb-3">{s.ideal}</div>
                  <div className="space-y-2 text-sm text-[#66736B]">
                    <div className="flex justify-between"><span>Typical monthly use</span><span className="text-[#183029] font-medium">{s.units}</span></div>
                    <div className="flex justify-between"><span>Roof area needed</span><span className="text-[#183029] font-medium">{s.roof}</span></div>
                    <div className="flex justify-between"><span>Typical bill</span><span className="text-[#183029] font-medium">{s.bill}</span></div>
                    <div className="flex justify-between"><span>Est. savings</span><span className="text-[#477A45] font-semibold">{s.savings}</span></div>
                    <div className="flex justify-between"><span>Indicative subsidy</span><span className="text-[#F4B942] font-semibold">Up to {s.subsidy}</span></div>
                  </div>
                  <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#477A45] group-hover:gap-2 transition-all">Calculate My Requirement <ArrowRight size={14} /></div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Why home solar */}
      <section className="py-14 md:py-20 bg-[#FFFDF5]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <FadeUp>
            <div className="eyebrow mb-3">Why Home Solar</div>
            <h2 className="heading-section mb-10 max-w-3xl">Your roof is an asset. <span className="script-accent text-[#477A45] text-3xl md:text-4xl ml-2 align-middle">Put it to work.</span></h2>
          </FadeUp>
          <div className="grid md:grid-cols-4 gap-5">
            <DataCard label="Avg. Payback" value="4-5" suffix=" yrs" icon={Calendar} accent="green" />
            <DataCard label="PM Surya Ghar" value="₹78k" suffix=" max" icon={BadgeCheck} accent="solar" />
            <DataCard label="Panel Warranty" value="25" suffix=" yrs" icon={ShieldCheck} accent="fresh" />
            <DataCard label="Monthly Saving (5kW)" value="₹4.8k" suffix="+" icon={IndianRupee} accent="green" />
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-14 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <FadeUp><h2 className="heading-section mb-10">Going solar with Bhasko.</h2></FadeUp>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: '01', title: 'Calculate', desc: 'Use our free calculator for an instant estimate sized to your bill.' },
              { num: '02', title: 'Site Survey & Design', desc: 'Engineers visit your home, take measurements and finalize the design.' },
              { num: '03', title: 'Install & Go Live', desc: 'We install in 2-5 days, handle DISCOM and net meter — you start saving.' },
            ].map((s, i) => (
              <FadeUp key={s.num} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-6 border border-[rgba(24,58,42,0.06)]">
                  <div className="text-xs font-bold text-[#F4B942] mb-2">{s.num}</div>
                  <h3 className="font-semibold text-[#183A2A] text-lg mb-2">{s.title}</h3>
                  <p className="text-sm text-[#66736B]">{s.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <FAQSection items={FAQS} />
      <FinalCTA />
    </>
  );
}
