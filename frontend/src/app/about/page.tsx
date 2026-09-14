import PageHero from '@/components/sections/PageHero';
import { FadeUp } from '@/components/ui/MotionWrap';
import FinalCTA from '@/components/sections/FinalCTA';
import Link from 'next/link';
import { Target, Wrench, Cpu, Heart, Award, Users } from 'lucide-react';
import { buildMetadata } from '@/components/SEO';
export const metadata = buildMetadata({ title: 'About Bhasko — Solar, Calculated for You', description: 'Bhasko is a technology-led Indian solar platform. Our mission: calculate the exact solar system you need, engineer it right, and support it for 25 years.', canonical: '/about' });
const VALUES = [
  { icon: Target, title: 'Calculated, not sold', desc: 'We size every system from the customer\'s actual bill and roof. No commissions on over-sizing.' },
  { icon: Wrench, title: 'Engineering-first', desc: 'Yield analysis, structural audit, lightning protection, earthing, and proper BoS. Not a slap-on installation.' },
  { icon: Cpu, title: 'Technology-powered', desc: 'Real-time monitoring, AI advisor, digital site survey, customer portal — built in-house.' },
  { icon: Heart, title: 'Customer-for-life', desc: 'After installation is when our job starts. AMC, cleaning, upgrades, service tickets — handled.' },
  { icon: Award, title: 'Certified quality', desc: 'Tier-1 panels and inverters with documented warranties. [CERTIFICATIONS] in place.' },
  { icon: Users, title: 'Local team', desc: 'Based in Bihar with service networks across India. We speak your language.' },
];
export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="BHASKO / ABOUT" title="We don't sell you a solar system." subtitle="We calculate the solar system that makes sense for you — then engineer it, install it, and support it for 25 years." accentPhrase="built in India, for India." primaryCta={{ label: 'Calculate Yours', href: '/solar-intelligence/calculator' }} secondaryCta={{ label: 'Join Our Team', href: '/careers' }} />
      <section className="py-14 md:py-20 bg-[#FFFDF5]">
        <div className="max-w-3xl mx-auto px-4 md:px-8 prose prose-green">
          <FadeUp>
            <h2 className="heading-section mb-6">Our mission.</h2>
            <p className="text-lg text-[#183029] leading-relaxed">India is in the middle of a rooftop solar revolution — but the experience for most homeowners and businesses is still broken: generic quotes, inflated promises, commission-driven sizing, and near-zero post-install support.</p>
            <p className="text-lg text-[#183029] leading-relaxed">Bhasko was built to fix this. We start with math, not sales targets. Our calculation engine, built on real DISCOM tariffs and per-city solar irradiance data, sizes your system from your actual bill. Our engineers sign off on every design. Our My Solar portal keeps you connected to your system — and us — for its entire life.</p>
          </FadeUp>
        </div>
      </section>
      <section className="py-14 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <FadeUp><h2 className="heading-section mb-10">What we stand for.</h2></FadeUp>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map((v,i) => {
              const Icon = v.icon;
              return (
                <FadeUp key={v.title} delay={i*0.08}>
                  <div className="bg-white rounded-2xl p-6 border border-[rgba(24,58,42,0.06)] h-full">
                    <div className="w-11 h-11 rounded-xl bg-[#477A45]/10 text-[#477A45] flex items-center justify-center mb-4"><Icon size={20} /></div>
                    <h3 className="font-semibold text-[#183A2A] mb-2">{v.title}</h3>
                    <p className="text-sm text-[#66736B] leading-relaxed">{v.desc}</p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
