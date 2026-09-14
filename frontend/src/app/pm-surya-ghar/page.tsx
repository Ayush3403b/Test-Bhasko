'use client';
import PageHero from '@/components/sections/PageHero';
import { FadeUp } from '@/components/ui/MotionWrap';
import FinalCTA from '@/components/sections/FinalCTA';
import FAQSection from '@/components/sections/FAQSection';
import Link from 'next/link';
import { Check, FileText, ShieldCheck, BadgeIndianRupee, ArrowRight } from 'lucide-react';
import { DataCard } from '@/components/cards';

const STEPS = [
  { n: '01', t: 'Check Eligibility', d: 'Residential consumer with own roof and grid connection.' },
  { n: '02', t: 'Calculate & Choose Vendor', d: 'Use Bhasko calculator; pick an empaneled vendor.' },
  { n: '03', t: 'Install System', d: 'Vendor installs and submits completion report to DISCOM.' },
  { n: '04', t: 'Inspection & Net Meter', d: 'DISCOM inspects and installs the net meter.' },
  { n: '05', t: 'Subsidy Credited', d: 'CFA is transferred directly to your bank account.' },
];

const FAQS = [
  { q: 'How much subsidy do I get under PM Surya Ghar?', a: 'For residential consumers: ₹30,000/kW up to 2 kW and ₹[SUBSIDY AMOUNT] for capacity above 2 kW up to 3 kW. Maximum ₹78,000 for systems up to 3 kW (indicative). Verify latest slabs on the PM Surya Ghar national portal.' },
  { q: 'Who is eligible?', a: 'Residential electricity consumers (individual households) with owned premises and suitable roof area.' },
  { q: 'How is the subsidy received?', a: 'The subsidy is credited directly to the beneficiary\'s Aadhaar-linked bank account after DISCOM inspection and net meter installation — not through the vendor.' },
  { q: 'Can I install the system myself?', a: 'Systems must be installed by a DISCOM-empaneled vendor to qualify for subsidy. Bhasko is empaneled across multiple DISCOMs.' },
  { q: 'How long does it take?', a: 'Typical timeline: 1-2 weeks installation + 2-6 weeks for DISCOM approval, inspection and subsidy credit. Bhasko handles all paperwork.' },
];

export default function PMSuryaGharPage() {
  return (
    <>
      <PageHero
        eyebrow="BHASKO / PM SURYA GHAR"
        title="Make your roof work harder."
        subtitle="PM Surya Ghar Muft Bijli Yojana puts up to ₹78,000 (indicative) in your bank account when you install rooftop solar. We handle 100% of the process end-to-end."
        accentPhrase="subsidy handled."
        primaryCta={{ label: 'Check My Subsidy', href: '/solar-intelligence/calculator' }}
        secondaryCta={{ label: 'Talk to Expert', href: '/contact' }}
      />
      <section className="py-14 md:py-20 bg-[#FFFDF5]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <FadeUp><h2 className="heading-section text-center mb-10 max-w-3xl mx-auto">Subsidy at a glance <span className="script-accent text-[#F4B942] text-3xl md:text-4xl ml-2 align-middle">indicative slabs</span></h2></FadeUp>
          <div className="grid md:grid-cols-3 gap-5">
            <DataCard label="Up to 2 kW" value="₹30k" suffix="/kW" icon={BadgeIndianRupee} accent="solar" />
            <DataCard label="Above 2 kW up to 3 kW" value="₹[AMT]" suffix="/kW" icon={BadgeIndianRupee} accent="green" micro="Indicative slab" />
            <DataCard label="Max subsidy (3 kW+)" value="₹78k" icon={ShieldCheck} accent="fresh" />
          </div>
          <div className="mt-4 text-center text-xs text-[#66736B] italic">Figures are indicative per PM Surya Ghar guidelines; verify current slabs on the national portal.</div>
        </div>
      </section>
      <section className="py-14 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <FadeUp><h2 className="heading-section mb-10">How to get your subsidy.</h2></FadeUp>
          <div className="grid md:grid-cols-5 gap-4">
            {STEPS.map((s, i) => (
              <FadeUp key={s.n} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-5 h-full border border-[rgba(24,58,42,0.06)]">
                  <div className="text-xs font-bold text-[#F4B942] mb-2">{s.n}</div>
                  <h3 className="font-semibold text-[#183A2A] mb-2">{s.t}</h3>
                  <p className="text-xs text-[#66736B] leading-relaxed">{s.d}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
      <section className="py-14 bg-[#EAF3E1]/50">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <FadeUp>
            <div className="bg-white rounded-3xl p-8 border border-[rgba(24,58,42,0.08)]">
              <FileText className="text-[#477A45] mb-3" />
              <h3 className="text-2xl font-bold text-[#183A2A] mb-4">Documents you'll need</h3>
              <ul className="grid md:grid-cols-2 gap-2 text-sm text-[#183029]">
                {['Aadhaar Card', 'Latest Electricity Bill', 'Property Tax Receipt / Ownership Proof', 'Cancelled Cheque / Bank Passbook', 'Passport-size Photo', 'PAN Card (higher capacities)'].map(d => (
                  <li key={d} className="flex items-start gap-2"><Check size={16} className="text-[#477A45] mt-0.5 flex-shrink-0" />{d}</li>
                ))}
              </ul>
              <Link href="/contact" className="btn-primary mt-6 inline-flex items-center gap-2 group">Get Help with Application <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></Link>
            </div>
          </FadeUp>
        </div>
      </section>
      <FAQSection items={FAQS} />
      <FinalCTA />
    </>
  );
}
