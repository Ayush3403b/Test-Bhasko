'use client';

import PageHero from '@/components/sections/PageHero';
import { useState } from 'react';
import { FadeUp } from '@/components/ui/MotionWrap';
import Link from 'next/link';
import { Ruler, ArrowRight } from 'lucide-react';
import { calculateRoofSuitability } from '@/calculators/solarEngine';

export default function RoofAssessmentPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ city: 'Patna', roofArea: 500, roofType: 'rcc', buildingType: 'residential', orientation: 'south', shading: 'low' });
  const [result, setResult] = useState<any>(null);

  const compute = () => {
    const r = calculateRoofSuitability({
      roofArea: data.roofArea,
      roofType: data.roofType as any,
      shading: data.shading as any,
      orientation: data.orientation,
    });
    setResult(r);
  };

  const questions = [
    { key: 'city', q: 'Which city is your property in?', type: 'select' as const, opts: ['Patna', 'Muzaffarpur', 'Gaya', 'Delhi', 'Mumbai', 'Bengaluru', 'Lucknow', 'Jaipur', 'Other'] },
    { key: 'roofArea', q: 'Approximate roof area (sq ft)?', type: 'number' as const },
    { key: 'roofType', q: 'What type of roof?', type: 'select' as const, opts: ['rcc', 'metal-sheet', 'tiled', 'other'] },
    { key: 'orientation', q: 'Which direction does the main roof face?', type: 'select' as const, opts: ['south', 'west', 'east', 'north', 'flat'] },
    { key: 'shading', q: 'How much shade is on the roof during peak hours?', type: 'select' as const, opts: ['low', 'medium', 'high'] },
  ];

  return (
    <>
      <PageHero
        eyebrow="BHASKO / SOLAR INTELLIGENCE / ROOF ASSESSMENT"
        title="Score your roof for solar."
        subtitle="Quick questions. A 0-100 Solar Suitability Score with estimated capacity and next steps."
        accentPhrase="digital, instant."
      />
      <section className="pb-20 -mt-4">
        <div className="max-w-2xl mx-auto px-4 md:px-8">
          <FadeUp>
            <div className="bg-white rounded-3xl shadow-lg border border-[rgba(24,58,42,0.06)] p-7">
              {!result ? (
                <div>
                  <div className="text-xs font-semibold text-[#477A45] mb-2">Question {step + 1} of {questions.length}</div>
                  <div className="h-1.5 bg-[#EAF3E1] rounded-full mb-6 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#A8D66D] to-[#477A45] transition-all" style={{ width: `${((step + 1) / questions.length) * 100}%` }} />
                  </div>
                  <h3 className="text-xl font-bold text-[#183A2A] mb-4">{questions[step].q}</h3>
                  {questions[step].type === 'select' ? (
                    <div className="grid grid-cols-2 gap-2">
                      {questions[step].opts!.map(o => (
                        <button
                          key={o}
                          onClick={() => {
                            setData({ ...data, [questions[step].key]: o });
                            if (step < questions.length - 1) setStep(step + 1); else compute();
                          }}
                          className="py-3 px-4 rounded-xl border-2 border-transparent bg-[#F4F8EE] hover:border-[#477A45] hover:bg-[#477A45]/10 text-left capitalize text-sm font-medium transition"
                        >
                          {o.replace('-', ' ')}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <input
                        type="number"
                        value={(data as any)[questions[step].key]}
                        onChange={e => setData({ ...data, [questions[step].key]: Number(e.target.value) })}
                        className="w-full px-5 py-4 rounded-xl bg-[#F4F8EE] border-2 border-transparent focus:border-[#477A45] outline-none text-lg font-semibold"
                      />
                      <div className="flex gap-2 mt-2">
                        {[300, 500, 800, 1200].map(n => (
                          <button key={n} onClick={() => setData({ ...data, roofArea: n })} className="text-xs px-3 py-1 rounded-full border border-[rgba(24,58,42,0.15)] hover:border-[#477A45]">{n} sqft</button>
                        ))}
                      </div>
                      <button onClick={() => { if (step < questions.length - 1) setStep(step + 1); else compute(); }} className="btn-primary w-full justify-center mt-5 inline-flex items-center gap-2">
                        Next <ArrowRight size={16} />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="text-center mb-6">
                    <Ruler className="mx-auto text-[#477A45] mb-3" size={32} />
                    <div className="eyebrow">Your Solar Suitability Score</div>
                    <div className="text-6xl font-bold text-[#183A2A] my-2">{result.score}<span className="text-2xl text-[#66736B]">/100</span></div>
                    <p className="text-sm text-[#66736B] max-w-md mx-auto">Preliminary digital assessment. Final system design requires a physical engineering survey.</p>
                  </div>
                  <div className="space-y-2 mb-6">
                    {result.breakdown.map((b: any) => (
                      <div key={b.label}>
                        <div className="flex justify-between text-sm mb-1"><span className="text-[#66736B]">{b.label}</span><span className="font-semibold">{b.score}/{b.max}</span></div>
                        <div className="h-2 bg-[#EAF3E1] rounded-full overflow-hidden">
                          <div className="h-full bg-[#477A45] rounded-full transition-all duration-1000" style={{ width: `${(b.score / b.max) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-[#F4F8EE] rounded-2xl p-5 mb-5 grid grid-cols-2 gap-4 text-center">
                    <div><div className="text-xs text-[#66736B] mb-1">Est. Usable Area</div><div className="text-xl font-bold text-[#183A2A]">{result.usableArea} sqft</div></div>
                    <div><div className="text-xs text-[#66736B] mb-1">Est. Capacity</div><div className="text-xl font-bold text-[#477A45]">{result.estimatedCapacity} kW</div></div>
                  </div>
                  <div className="flex gap-3">
                    <Link href="/contact" className="btn-primary flex-1 justify-center inline-flex items-center gap-2">Book Physical Survey <ArrowRight size={16} /></Link>
                    <button onClick={() => { setStep(0); setResult(null); }} className="btn-secondary">Redo</button>
                  </div>
                </div>
              )}
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
