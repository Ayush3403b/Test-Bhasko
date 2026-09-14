'use client';

import { FeatureCard } from '@/components/cards';
import { Calculator, BadgeIndianRupee, Wrench, Cpu, HeadphonesIcon, Clock10 } from 'lucide-react';
import { FadeUp } from '@/components/ui/MotionWrap';

const FEATURES = [
  { icon: Calculator, title: 'Calculated for You', description: 'Every system is sized from your actual bill and roof, not a one-size-fits-all package.', accent: '#477A45' },
  { icon: BadgeIndianRupee, title: 'Transparent Pricing', description: 'No hidden costs. See exactly what you pay, what subsidy you get, and your payback — upfront.', accent: '#F4B942' },
  { icon: Wrench, title: 'Engineering First', description: 'Designed by engineers, not salespeople. Yield analysis, shadow studies and structural review.', accent: '#477A45' },
  { icon: Cpu, title: 'Technology Powered', description: 'AI advisor, bill analyzer, real-time monitoring and a customer portal that actually works.', accent: '#A8D66D' },
  { icon: HeadphonesIcon, title: 'End-to-End Support', description: 'From site survey to DISCOM paperwork to net metering — we handle it all.', accent: '#477A45' },
  { icon: Clock10, title: 'Built for the Long Run', description: 'Tier-1 equipment, 25-year warranties, and AMC plans that keep your system performing.', accent: '#F4B942' },
];

export default function WhyBhasko() {
  return (
    <section className="py-16 md:py-24 bg-[#F4F8EE]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="max-w-3xl mb-12">
          <FadeUp>
            <div className="eyebrow mb-3">Why Bhasko</div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="heading-section">
              Solar, the way it should be.
              <span className="script-accent text-[#477A45] text-3xl md:text-4xl ml-3 align-middle">calculated, not sold.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-4 text-[#66736B] text-lg leading-relaxed">
              We built Bhasko because the solar industry is full of generic quotes, inflated promises and post-installation silence. We do the opposite: calculate precisely, price transparently, engineer properly, and support continuously.
            </p>
          </FadeUp>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <FeatureCard key={i} {...f} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
