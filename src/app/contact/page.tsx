'use client';
import { useState } from 'react';
import PageHero from '@/components/sections/PageHero';
import { FadeUp } from '@/components/ui/MotionWrap';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', monthlyBill: 5000, segment: 'residential', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const submit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, source: 'contact-form' }),
    });
    setSent(true);
    setLoading(false);
  };
  return (
    <>
      <PageHero
        eyebrow="BHASKO / CONTACT"
        title="Talk to a solar expert."
        subtitle="Share a few details and a Bhasko solar consultant will call you within 24 hours. No pressure, no spam."
        primaryCta={{ label: 'Calculate Free', href: '/solar-intelligence/calculator' }}
      />
      <section className="py-14 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 grid lg:grid-cols-5 gap-8">
          <FadeUp className="lg:col-span-2">
            <div className="space-y-5">
              <ContactItem icon={Phone} label="Call / WhatsApp" value="[PHONE] / [WHATSAPP]" />
              <ContactItem icon={Mail} label="Email" value="[EMAIL]" />
              <ContactItem icon={MapPin} label="Office" value="[OFFICE ADDRESS]" />
              <div className="bg-[#F4F8EE] rounded-2xl p-6">
                <h3 className="font-semibold text-[#183A2A] mb-2">Office Hours</h3>
                <p className="text-sm text-[#66736B]">Monday–Saturday: 9 AM – 7 PM<br />Sunday: By appointment</p>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={0.1} className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-7 shadow-md border border-[rgba(24,58,42,0.06)]">
              {sent ? (
                <div className="py-8 text-center">
                  <div className="w-14 h-14 rounded-full bg-[#A8D66D]/20 text-[#477A45] flex items-center justify-center mx-auto mb-3"><Send size={24} /></div>
                  <h3 className="text-xl font-bold text-[#183A2A] mb-1">Thanks, {form.name}!</h3>
                  <p className="text-[#66736B]">We've received your request and will be in touch shortly.</p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <h3 className="text-xl font-bold text-[#183A2A] mb-2">Get My Solar Assessment</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    <input required placeholder="Your Name*" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="px-4 py-3 rounded-xl bg-[#F4F8EE] border-2 border-transparent focus:border-[#477A45] focus:bg-white outline-none" />
                    <input required placeholder="Phone*" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="px-4 py-3 rounded-xl bg-[#F4F8EE] border-2 border-transparent focus:border-[#477A45] focus:bg-white outline-none" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <input placeholder="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="px-4 py-3 rounded-xl bg-[#F4F8EE] border-2 border-transparent focus:border-[#477A45] focus:bg-white outline-none" />
                    <input placeholder="City*" required value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} className="px-4 py-3 rounded-xl bg-[#F4F8EE] border-2 border-transparent focus:border-[#477A45] focus:bg-white outline-none" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-[#66736B] block mb-1">Monthly Bill (₹)</label>
                      <input type="number" value={form.monthlyBill} onChange={e => setForm({ ...form, monthlyBill: Number(e.target.value) })} className="w-full px-4 py-3 rounded-xl bg-[#F4F8EE] border-2 border-transparent focus:border-[#477A45] focus:bg-white outline-none" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-[#66736B] block mb-1">Segment</label>
                      <select value={form.segment} onChange={e => setForm({ ...form, segment: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#F4F8EE] border-2 border-transparent focus:border-[#477A45] focus:bg-white outline-none">
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                      </select>
                    </div>
                  </div>
                  <textarea placeholder="Tell us about your property or requirement…" rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#F4F8EE] border-2 border-transparent focus:border-[#477A45] focus:bg-white outline-none resize-none" />
                  <button disabled={loading} className="w-full btn-primary inline-flex justify-center items-center gap-2">{loading ? 'Sending…' : 'Get My Solar Assessment'} <Send size={16} /></button>
                </form>
              )}
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}

function ContactItem({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-11 h-11 rounded-xl bg-[#477A45]/10 text-[#477A45] flex items-center justify-center flex-shrink-0"><Icon size={20} /></div>
      <div><div className="text-xs font-semibold tracking-widest uppercase text-[#477A45] mb-1">{label}</div><div className="font-semibold text-[#183A2A]">{value}</div></div>
    </div>
  );
}
