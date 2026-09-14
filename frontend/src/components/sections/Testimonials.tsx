'use client';

import { Star, Quote } from 'lucide-react';
import { FadeUp } from '../ui/MotionWrap';

const QUOTES = [
  { quote: "Bhasko's calculator was the first one that didn't just show me a big number — it actually explained why I needed 5 kW. The team handled everything including the net meter.", name: '[CUSTOMER NAME]', city: 'Patna, Bihar', size: '5 kW', savings: 4820 },
  { quote: "I spoke to three vendors and got three different sizes. Bhasko analyzed our bills and designed a 3 kW system that zeroes out our bill. The My Solar dashboard is brilliant.", name: '[CUSTOMER NAME]', city: 'Muzaffarpur, Bihar', size: '3 kW', savings: 2900 },
  { quote: "Commercial solar for our warehouse has cut operating costs significantly. Bhasko's team was professional, transparent, and delivered on timeline.", name: '[BUSINESS NAME]', city: 'Patna, Bihar', size: '80 kW', savings: 84000 },
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-[#F4F8EE]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <FadeUp><div className="eyebrow mb-3">Customer Stories</div></FadeUp>
          <FadeUp delay={0.1}><h2 className="heading-section">Loved by homeowners and businesses.</h2></FadeUp>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {QUOTES.map((q, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="bg-white rounded-3xl p-7 h-full border border-[rgba(24,58,42,0.06)] shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 relative overflow-hidden">
                <Quote size={48} className="absolute -top-2 -left-2 text-[#A8D66D]/20" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} size={14} fill="#F4B942" className="text-[#F4B942]" />)}
                </div>
                <p className="text-[#183029] leading-relaxed mb-6 relative">"{q.quote}"</p>
                <div className="flex items-center justify-between pt-4 border-t border-[rgba(24,58,42,0.06)]">
                  <div>
                    <div className="font-semibold text-[#183A2A]">{q.name}</div>
                    <div className="text-xs text-[#66736B]">{q.city} · {q.size}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-[#66736B]">Est. monthly savings</div>
                    <div className="font-bold text-[#477A45]">₹{q.savings.toLocaleString('en-IN')}</div>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        <div className="mt-8 text-center text-xs text-[#66736B] italic">
          Placeholder testimonials — real, verified customer stories will replace these at launch.
        </div>
      </div>
    </section>
  );
}
