import Hero from '@/components/sections/Hero';
import TrustStrip from '@/components/sections/TrustStrip';
import CalculatorPreview from '@/components/sections/CalculatorPreview';
import WhyBhasko from '@/components/sections/WhyBhasko';
import HowItWorks from '@/components/sections/HowItWorks';
import SolarForEveryNeed from '@/components/sections/SolarForEveryNeed';
import PackagesPreview from '@/components/sections/PackagesPreview';
import IntelligenceTeaser from '@/components/sections/IntelligenceTeaser';
import ProjectsPreview from '@/components/sections/ProjectsPreview';
import Testimonials from '@/components/sections/Testimonials';
import FinalCTA from '@/components/sections/FinalCTA';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { buildMetadata } from '@/components/SEO';

export const metadata = buildMetadata({
  title: 'Bhasko — Your Solar. Calculated for You.',
  description: 'Premium rooftop solar in Patna, Bihar and across India. Bhasko calculates the exact solar system you need — not the one we want to sell. Free calculator, instant report, end-to-end installation.',
  canonical: '/',
  keywords: ['solar panels Patna', 'rooftop solar Bihar', 'solar calculator India', 'PM Surya Ghar subsidy', '5 kW solar price', 'best solar company Patna', 'solar EMI calculator'],
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <CalculatorPreview />
      <WhyBhasko />
      <HowItWorks />
      <SolarForEveryNeed />
      <PackagesPreview />
      <IntelligenceTeaser />
      <ProjectsPreview />
      <Testimonials />

      {/* Pre-footer CTA */}
      <section className="py-12 md:py-16 bg-[#F4F8EE]">
        <div className="max-w-5xl mx-auto px-4 md:px-8 text-center">
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-[rgba(24,58,42,0.08)] shadow-sm">
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#477A45] mb-3">Still wondering?</div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#183A2A] mb-3">Still wondering if solar is right for you?</h2>
            <p className="text-[#66736B] mb-6 max-w-xl mx-auto">Take the 60-second Solar Assessment. We'll ask a few quick questions and give you a clear answer — no commitment.</p>
            <Link href="/digital-survey" className="btn-primary inline-flex items-center gap-2 group">
              Take the Solar Assessment <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
