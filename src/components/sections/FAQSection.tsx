'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FadeUp } from '../ui/MotionWrap';

interface FAQ { q: string; a: string; }
export default function FAQSection({ items, title = 'Frequently Asked Questions' }: { items: FAQ[]; title?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-16 bg-[#F4F8EE]">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <FadeUp><h2 className="heading-section text-center mb-10">{title}</h2></FadeUp>
        <div className="space-y-3">
          {items.map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="bg-white rounded-2xl border border-[rgba(24,58,42,0.06)] overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-[#F4F8EE]/60 transition-colors"
                >
                  <span className="font-semibold text-[#183A2A]">{item.q}</span>
                  <ChevronDown size={20} className={cn('flex-shrink-0 text-[#477A45] transition-transform', open === i && 'rotate-180')} />
                </button>
                <div className={cn('overflow-hidden transition-all duration-300', open === i ? 'max-h-96' : 'max-h-0')}>
                  <div className="px-5 pb-5 text-[#66736B] leading-relaxed text-sm">{item.a}</div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
