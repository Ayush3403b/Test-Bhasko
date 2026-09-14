import { ReactNode } from 'react';
import PageHero from '@/components/sections/PageHero';
import FinalCTA from '@/components/sections/FinalCTA';
import { FadeUp } from '@/components/ui/MotionWrap';

export function SimplePage({ eyebrow, title, subtitle, accentPhrase, children, primaryCta, secondaryCta }: {
  eyebrow: string; title: ReactNode; subtitle?: string; accentPhrase?: string; children?: ReactNode;
  primaryCta?: { label: string; href: string }; secondaryCta?: { label: string; href: string };
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle} accentPhrase={accentPhrase} primaryCta={primaryCta} secondaryCta={secondaryCta} />
      <section className="py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <FadeUp>
            <div className="prose prose-green max-w-none">{children}</div>
          </FadeUp>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-6 text-[#183029] leading-relaxed">
      {children}
    </div>
  );
}
