import PageHero from '@/components/sections/PageHero';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { FadeUp } from '@/components/ui/MotionWrap';
import FinalCTA from '@/components/sections/FinalCTA';
import { buildMetadata } from '@/components/SEO';
import { Badge } from '@/components/cards';

export const metadata = buildMetadata({
  title: 'Solar Packages — Essential, Smart, Premium | Bhasko',
  description: 'Three transparent solar packages. Essential, Smart (most popular) and Premium. Compare equipment, warranty, AMC, monitoring and price per kW.',
  canonical: '/solar-packages',
});

const TIERS = [
  { name: 'Essential', tagline: 'Smart start', pricePerKw: 52000, popular: false, features: {
    'Panels': 'Tier-1 Mono PERC (≥20% efficiency)',
    'Inverter': 'String inverter, 5-year warranty',
    'Mounting': 'Galvanized Iron structure',
    'Wiring & Protection': 'Standard DC/AC, ACDB/DCDB, earthing',
    'Monitoring': 'Basic mobile app monitoring',
    'Net Metering': 'Documentation support',
    'AMC': '2 years comprehensive maintenance',
    'Cleaning': 'Not included',
    'Response SLA': '48 hours',
    'Warranty': '5 years system, 10 years panels performance',
  }},
  { name: 'Smart', tagline: 'Most Popular', pricePerKw: 60000, popular: true, features: {
    'Panels': 'Tier-1 Half-Cut Mono PERC (≥21% efficiency)',
    'Inverter': 'Premium string inverter, 10-year warranty',
    'Mounting': 'Anodized aluminium rail structure',
    'Wiring & Protection': 'Premium DC/AC, lightning arrester, MC4 connectors',
    'Monitoring': 'AI-powered monitoring with alerts',
    'Net Metering': 'End-to-end DISCOM liaison included',
    'AMC': '5 years comprehensive included',
    'Cleaning': '2 panel-cleaning visits (year 1)',
    'Response SLA': '24 hours',
    'Warranty': '10 years inverter, 25 years panels linear output',
  }},
  { name: 'Premium', tagline: 'Future-ready', pricePerKw: 72000, popular: false, features: {
    'Panels': 'Bifacial TopCon (≥22.5% efficiency)',
    'Inverter': '3-phase inverter or microinverters (25-yr warranty)',
    'Mounting': 'Premium aluminium rail with optimizers',
    'Wiring & Protection': 'Full premium BoS, per-panel optimization, surge protection',
    'Monitoring': 'Real-time per-panel AI monitoring',
    'Net Metering': 'White-glove processing with subsidy concierge',
    'AMC': '10 years comprehensive included',
    'Cleaning': 'Quarterly cleaning included for 5 years',
    'Battery-ready': 'Wiring provision for future battery / EV',
    'Response SLA': 'Same-day priority',
    'Warranty': '12-25 year inverter, 30 years panels performance',
  }},
];

const COMPARISON_ROWS = [
  { key: 'Panels' }, { key: 'Inverter' }, { key: 'Mounting' }, { key: 'Wiring & Protection' },
  { key: 'Monitoring' }, { key: 'Net Metering' }, { key: 'AMC' }, { key: 'Cleaning' },
  { key: 'Response SLA' }, { key: 'Warranty' }, { key: 'Battery-ready' },
];

export default function PackagesPage() {
  return (
    <>
      <PageHero
        eyebrow="BHASKO / SOLAR PACKAGES"
        title="Solar packages, built around how you live."
        subtitle="Three transparent tiers with no hidden costs. All packages include Tier-1 equipment, installation by certified teams, PM Surya Ghar support, and the Bhasko My Solar dashboard."
        primaryCta={{ label: 'Which Package Fits Me?', href: '/solar-intelligence/calculator' }}
        secondaryCta={{ label: 'Talk to an Expert', href: '/contact' }}
      />

      <section className="py-14 md:py-20">
        <div className="max-w-[1300px] mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-3 gap-6 mb-16">
            {TIERS.map((t, i) => (
              <FadeUp key={t.name} delay={i * 0.1}>
                <div className={
                  'relative h-full rounded-3xl p-8 transition-all hover:-translate-y-2 flex flex-col ' +
                  (t.popular ? 'bg-[#183A2A] text-white shadow-2xl scale-[1.02] z-10' : 'bg-white border border-[rgba(24,58,42,0.08)] shadow-sm hover:shadow-xl')
                }>
                  {t.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><Badge variant="solar">MOST POPULAR</Badge></div>}
                  <div className="mb-4">
                    <div className={t.popular ? 'text-[#A8D66D] text-xs font-semibold tracking-[0.2em] uppercase mb-2' : 'eyebrow mb-2'}>{t.tagline}</div>
                    <h3 className={t.popular ? 'text-3xl font-bold' : 'text-3xl font-bold text-[#183A2A]'}>{t.name}</h3>
                  </div>
                  <div className="mb-6">
                    <div className={t.popular ? 'text-4xl font-bold' : 'text-4xl font-bold text-[#183A2A]'}>₹{(t.pricePerKw/1000).toFixed(0)}k<span className="text-base font-medium opacity-70">/kW</span></div>
                    <div className={t.popular ? 'text-sm opacity-70' : 'text-sm text-[#66736B]'}>Indicative, pre-subsidy</div>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {Object.entries(t.features).map(([k, v]) => (
                      <li key={k} className="flex items-start gap-3 text-sm">
                        <div className={'w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ' + (t.popular ? 'bg-[#A8D66D] text-[#183A2A]' : 'bg-[#477A45]/10 text-[#477A45]')}><Check size={12} /></div>
                        <span className={t.popular ? '' : 'text-[#183029]'}><strong>{k}:</strong> {v}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className={
                    'block text-center rounded-full py-3.5 font-semibold transition-all inline-flex items-center justify-center gap-2 w-full ' +
                    (t.popular ? 'bg-[#A8D66D] text-[#183A2A] hover:bg-[#96c75b]' : 'border-2 border-[#183A2A] text-[#183A2A] hover:bg-[#183A2A] hover:text-white')
                  }>
                    Get {t.name} Quote <ArrowRight size={16} />
                  </Link>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Comparison table */}
          <FadeUp>
            <h2 className="heading-section text-center mb-8">Compare packages at a glance.</h2>
          </FadeUp>
          <div className="overflow-x-auto bg-white rounded-2xl border border-[rgba(24,58,42,0.06)] shadow-sm">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-[rgba(24,58,42,0.08)]">
                  <th className="text-left p-4 text-sm font-semibold text-[#66736B]"></th>
                  {TIERS.map(t => (
                    <th key={t.name} className={'p-4 text-center ' + (t.popular ? 'bg-[#183A2A] text-white' : '')}>
                      <div className="font-bold text-[#183A2A]" style={t.popular ? { color: '#fff' } : {}}>{t.name}</div>
                      <div className="text-xs opacity-70">₹{(t.pricePerKw/1000).toFixed(0)}k/kW</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map(row => (
                  <tr key={row.key} className="border-b border-[rgba(24,58,42,0.05)]">
                    <td className="p-4 text-sm font-medium text-[#183A2A]">{row.key}</td>
                    {TIERS.map(t => (
                      <td key={t.name} className={'p-4 text-center text-sm ' + (t.popular ? 'bg-[#183A2A]/5' : '')}>
                        {t.features[row.key as keyof typeof t.features] ? (
                          <span className={t.popular ? 'text-[#183A2A]' : 'text-[#183029]'}>{t.features[row.key as keyof typeof t.features]}</span>
                        ) : (
                          <span className="text-[#66736B]">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-8 text-xs text-[#66736B] italic">Prices are indicative and may vary based on site conditions, structure type and applicable taxes.</div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
