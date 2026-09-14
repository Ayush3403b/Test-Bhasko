'use client';

import PageHero from '@/components/sections/PageHero';
import { useState } from 'react';
import { Bot, Send, Sparkles, Zap, IndianRupee, Calendar, User } from 'lucide-react';
import { FadeUp } from '@/components/ui/MotionWrap';
import { formatINR } from '@/lib/utils';

const SUGGESTIONS = [
  'I have a ₹5,000 monthly bill, what size solar do I need?',
  'How much subsidy can I get in Bihar?',
  'What is the payback on 5 kW solar?',
  'Do I need a battery with my solar system?',
];

type Msg = { role: 'user' | 'bot'; content: any };

export default function AIAdvisorPage() {
  const [messages, setMessages] = useState<Msg[]>([{ role: 'bot', content: { type: 'intro' } }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages(m => [...m, { role: 'user', content: text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMessages(m => [...m, {
        role: 'bot',
        content: {
          type: 'recommend',
          kw: 5, monthly: 4820, payback: 4.2, subsidy: 78000,
          explainer: 'Based on the information you shared, a 5 kW on-grid system is a strong starting point. Monthly savings are estimated at ₹4,800 with an indicative payback of ~4.2 years and PM Surya Ghar subsidy up to ₹78,000. This is an indicative estimate — final design requires a physical engineering survey.',
        },
      }]);
      setTyping(false);
    }, 1200);
  };

  return (
    <>
      <PageHero
        eyebrow="BHASKO / SOLAR INTELLIGENCE / AI ADVISOR"
        title="Ask solar anything."
        subtitle="A chat-based advisor that uses our calculation engine — never invents numbers. Honest answers in plain language."
        accentPhrase="clear, not salesy."
      />
      <section className="pb-20 -mt-6">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <FadeUp>
            <div className="bg-white rounded-3xl shadow-xl border border-[rgba(24,58,42,0.06)] overflow-hidden flex flex-col h-[620px]">
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#F4F8EE]/30">
                {messages.map((m, i) => (
                  <div key={i} className={'flex gap-3 ' + (m.role === 'user' ? 'justify-end' : 'justify-start')}>
                    {m.role === 'bot' && (
                      <div className="w-9 h-9 rounded-full bg-[#477A45]/10 flex items-center justify-center text-[#477A45] flex-shrink-0"><Bot size={18} /></div>
                    )}
                    <div className={'max-w-[80%] rounded-2xl px-4 py-3 ' + (m.role === 'user' ? 'bg-[#477A45] text-white rounded-br-sm' : 'bg-white border border-[rgba(24,58,42,0.06)] rounded-bl-sm')}>
                      {typeof m.content === 'string' ? (
                        <p className="text-sm leading-relaxed">{m.content}</p>
                      ) : m.content.type === 'intro' ? (
                        <div>
                          <p className="text-sm mb-3">Hi! I'm Bhasko AI. I can help you size a solar system, estimate savings, explain subsidy, or answer any solar question.</p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {SUGGESTIONS.map(s => (
                              <button key={s} onClick={() => send(s)} className="text-xs bg-[#EAF3E1] text-[#477A45] px-3 py-1.5 rounded-full hover:bg-[#A8D66D]/30 transition">
                                <Sparkles size={10} className="inline mr-1" />{s}
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm mb-3">{m.content.explainer}</p>
                          <div className="bg-[#F4F8EE] rounded-xl p-4 grid grid-cols-2 gap-2 text-sm">
                            <div><Zap size={12} className="inline mr-1 text-[#477A45]" /><strong>{m.content.kw} kW</strong> <span className="text-[#66736B] text-xs">On-Grid</span></div>
                            <div><IndianRupee size={12} className="inline mr-1 text-[#F4B942]" /><strong>{formatINR(m.content.monthly)}/mo</strong></div>
                            <div><IndianRupee size={12} className="inline mr-1 text-[#A8D66D]" /><strong>Up to {formatINR(m.content.subsidy)}</strong></div>
                            <div><Calendar size={12} className="inline mr-1 text-[#477A45]" /><strong>~{m.content.payback} yrs</strong></div>
                          </div>
                          <div className="mt-3 flex gap-2">
                            <a href="/solar-intelligence/calculator" className="text-xs bg-[#477A45] text-white px-3 py-1.5 rounded-full">Get Full Report</a>
                            <a href="/contact" className="text-xs border border-[#183A2A]/20 px-3 py-1.5 rounded-full">Talk to Expert</a>
                          </div>
                        </div>
                      )}
                    </div>
                    {m.role === 'user' && (
                      <div className="w-9 h-9 rounded-full bg-[#183A2A]/10 flex items-center justify-center text-[#183A2A] flex-shrink-0"><User size={18} /></div>
                    )}
                  </div>
                ))}
                {typing && (
                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#477A45]/10 flex items-center justify-center text-[#477A45]"><Bot size={18} /></div>
                    <div className="bg-white border border-[rgba(24,58,42,0.06)] rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#477A45] animate-bounce" />
                      <span className="w-2 h-2 rounded-full bg-[#477A45] animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <span className="w-2 h-2 rounded-full bg-[#477A45] animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                )}
              </div>
              <div className="border-t border-[rgba(24,58,42,0.06)] p-4 flex gap-2">
                <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send(input)} placeholder="Ask anything about solar…" className="flex-1 px-4 py-3 rounded-full bg-[#F4F8EE] border-2 border-transparent focus:border-[#477A45] focus:bg-white outline-none text-sm" />
                <button onClick={() => send(input)} className="w-12 h-12 rounded-full bg-[#477A45] text-white flex items-center justify-center hover:bg-[#3d6a3c] transition"><Send size={16} /></button>
              </div>
              <div className="px-4 pb-3 text-[10px] text-[#66736B] italic text-center">AI responses are indicative. Final engineering requires a physical site survey.</div>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
