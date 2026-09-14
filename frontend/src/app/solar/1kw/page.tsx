import PageHero from '@/components/sections/PageHero';
import Link from 'next/link';
import { FadeUp } from '@/components/ui/MotionWrap';
import { ArrowRight } from 'lucide-react';
import { buildMetadata } from '@/components/SEO';
export const metadata = buildMetadata({ title: '1 kW Solar System | Bhasko', description: 'Ideal for 1-2 BHK homes with bills around ₹1,000-1,500 per month.', canonical: 'solar/1kw/page' });
export default function Page() {
  return (
    <>
      <PageHero eyebrow="BHASKO" title="1 kW Solar System" subtitle="Ideal for 1-2 BHK homes with bills around ₹1,000-1,500 per month." primaryCta={{ label: 'Calculate Savings', href: '/solar-intelligence/calculator' }} secondaryCta={{ label: 'Talk to Expert', href: '/contact' }} />
      <section className="py-14">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <FadeUp>
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-[rgba(24,58,42,0.08)]">
              <h2 className="text-2xl font-bold text-[#183A2A] mb-3">Detailed content coming soon.</h2>
              <p className="text-[#66736B] mb-5">This page is being built out as part of Bhasko's launch. In the meantime, use our solar calculator for a precise estimate, or talk directly to a Bhasko solar expert.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/solar-intelligence/calculator" className="btn-primary inline-flex items-center gap-2 group">Calculate Savings <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></Link>
                <Link href="/contact" className="btn-secondary inline-flex">Talk to Expert</Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
