import FullCalculator from '@/components/calculator/FullCalculator';
import PageHero from '@/components/sections/PageHero';
import { buildMetadata } from '@/components/SEO';
import { Suspense } from 'react';

export const metadata = buildMetadata({
  title: 'Solar Savings Calculator — Size Your System in 2 Minutes | Bhasko',
  description: 'Free, no-phone-required solar calculator. Enter your monthly bill, get a precise kW size, monthly savings, subsidy, payback and 25-year returns.',
  canonical: '/solar-intelligence/calculator',
  keywords: ['solar calculator India', 'solar savings calculator', 'solar system size calculator', 'roof solar calculator', 'solar EMI calculator'],
});

export default function CalculatorPage() {
  return (
    <>
      <PageHero
        eyebrow="BHASKO / SOLAR INTELLIGENCE / CALCULATOR"
        title="Calculate your solar."
        subtitle="Five steps. Two minutes. No phone number required to see your numbers."
        accentPhrase="precise, not generic."
      />
      <section className="pb-20 -mt-4">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <Suspense fallback={<div className="h-[600px] bg-white rounded-3xl animate-pulse" />}>
            <FullCalculator />
          </Suspense>
        </div>
      </section>
    </>
  );
}
