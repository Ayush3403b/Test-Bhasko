'use client';
import PageHero from '@/components/sections/PageHero';
import { useState } from 'react';
import { FadeUp } from '@/components/ui/MotionWrap';
import { Handshake, Search, Wrench, CheckCircle2, Coins, FileText } from 'lucide-react';

const STEPS = [
  { icon: Handshake, n: '01', t: 'Onboard', d: 'Apply and complete KYC.' },
  { icon: FileText, n: '02', t: 'Leads', d: 'Pre-qualified, pre-calculated leads in your area.' },
  { icon: Search, n: '03', t: 'Survey', d: 'Joint surveys and designs with Bhasko engineering.' },
  { icon: Wrench, n: '04', t: 'Install', d: 'Install per Bhasko engineering standards.' },
  { icon: CheckCircle2, n: '05', t: 'Commission', d: 'We handle DISCOM liaison, net meter and subsidy.' },
  { icon: Coins, n: '06', t: 'Payout', d: 'Transparent, on-time payouts and bonuses.' },
];

export default function PartnerPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero
        eyebrow="BHASKO / PARTNER"
        title="Grow your solar business with us."
        subtitle="Contractors, dealers, architects, builders and electricians — leverage Bhasko's brand, calculation engine and lead flow."
        accentPhrase="let's build together."
        primaryCta={{ label: 'Apply to Partner', href: '#apply' }}
      />
      <section className="py-14 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <FadeUp><h2 className="heading-section mb-10">How the partnership works.</h2></FadeUp>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {STEPS.map((s: any, i) => {
              const Icon = s.icon;
              return (
                <FadeUp key={s.n} delay={i * 0.08}>
                  <div className="bg-white rounded-2xl p-5 border border-[rgba(24,58,42,0.06)] h-full">
                    <Icon size={22} className="text-[#477A45] mb-3" />
                    <div className="text-xs font-bold text-[#F4B942]">{s.n}</div>
                    <h3 className="font-semibold text-[#183A2A] text-sm mb-1">{s.t}</h3>
                    <p className="text-xs text-[#66736B] leading-relaxed">{s.d}</p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>
      <section id="apply" className="py-14 bg-[#FFFDF5]">
        <div className="max-w-2xl mx-auto px-4 md:px-8">
          <FadeUp>
            <div className="bg-white rounded-3xl p-8 border border-[rgba(24,58,42,0.08)]">
              {sent ? (
                <div className="text-center py-6">
                  <CheckCircle2 size={42} className="mx-auto text-[#477A45] mb-3" />
                  <h3 className="text-xl font-bold text-[#183A2A]">Application received</h3>
                  <p className="text-[#66736B] mt-1">Our partnerships team will contact you within 3 business days.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-3">
                  <h3 className="text-xl font-bold text-[#183A2A] mb-2">Partner Application</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    <input required placeholder="Your Name*" className="px-4 py-3 rounded-xl bg-[#F4F8EE] border-2 border-transparent focus:border-[#477A45] outline-none" />
                    <input required placeholder="Phone*" className="px-4 py-3 rounded-xl bg-[#F4F8EE] border-2 border-transparent focus:border-[#477A45] outline-none" />
                  </div>
                  <input placeholder="Company / Firm" className="w-full px-4 py-3 rounded-xl bg-[#F4F8EE] border-2 border-transparent focus:border-[#477A45] outline-none" />
                  <input placeholder="City*" required className="w-full px-4 py-3 rounded-xl bg-[#F4F8EE] border-2 border-transparent focus:border-[#477A45] outline-none" />
                  <select required className="w-full px-4 py-3 rounded-xl bg-[#F4F8EE] border-2 border-transparent focus:border-[#477A45] outline-none">
                    <option value="">Partner Type*</option>
                    <option>Contractor / Installer</option><option>Dealer</option><option>Architect</option><option>Builder / Developer</option><option>Electrician</option><option>Other</option>
                  </select>
                  <input type="number" placeholder="Years of experience (optional)" className="w-full px-4 py-3 rounded-xl bg-[#F4F8EE] border-2 border-transparent focus:border-[#477A45] outline-none" />
                  <button className="btn-primary w-full justify-center inline-flex">Submit Application</button>
                </form>
              )}
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
