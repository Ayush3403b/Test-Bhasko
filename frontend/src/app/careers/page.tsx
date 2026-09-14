import PageHero from '@/components/sections/PageHero';
import { FadeUp } from '@/components/ui/MotionWrap';
import Link from 'next/link';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';
import connectDB from '@/server/database/connection';
import { JobOpening } from '@/server/database/models';
import { buildMetadata } from '@/components/SEO';
export const metadata = buildMetadata({ title: 'Careers at Bhasko — Build the Future of Solar', description: 'Join Bhasko in building India\'s most trusted residential solar platform. Engineering, sales, operations and field roles across Bihar and India.', canonical: '/careers' });
async function getJobs() { try { await connectDB(); return await JobOpening.find({ status: 'published' }).lean(); } catch { return []; } }
export default async function CareersPage() {
  const jobs = await getJobs();
  return (
    <>
      <PageHero eyebrow="BHASKO / CAREERS" title="Build the future of solar." subtitle="We're hiring engineers, solar designers, sales consultants, technicians and operators who care about building something real and durable." accentPhrase="join us." primaryCta={{ label: 'See Open Roles', href: '#roles' }} />
      <section className="py-14 md:py-20 bg-[#FFFDF5]">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <FadeUp>
            <h2 className="heading-section mb-6">Why Bhasko.</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {['Mission-driven work — every installation displaces tons of CO₂ and saves families money','High-craft engineering culture with real ownership','Competitive compensation + ESOPs for early employees','Field teams get training, safety gear and growth paths','Open, honest culture — no corporate jargon','Build a real Indian climate-tech company from the ground up'].map(b => (
                <div key={b} className="flex items-start gap-2 bg-white rounded-xl p-4">
                  <span className="text-[#A8D66D] mt-0.5">✓</span><span className="text-sm text-[#183029]">{b}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>
      <section id="roles" className="py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <FadeUp><h2 className="heading-section mb-8">Open roles.</h2></FadeUp>
          <div className="space-y-3">
            {jobs.length === 0 && <div className="text-[#66736B]">No open roles at the moment — check back soon.</div>}
            {jobs.map((j:any) => (
              <FadeUp key={j._id.toString()}>
                <div className="bg-white rounded-2xl p-6 border border-[rgba(24,58,42,0.06)] flex items-start justify-between gap-4 hover:shadow-lg transition-shadow">
                  <div>
                    <h3 className="font-semibold text-[#183A2A] text-lg">{j.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-[#66736B] mt-1">
                      <span className="flex items-center gap-1"><Briefcase size={12} /> {j.department}</span>
                      <span className="flex items-center gap-1"><MapPin size={12} /> {j.location}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {j.type}</span>
                    </div>
                  </div>
                  <Link href={`/careers/${j._id}`} className="btn-tertiary flex-shrink-0">Apply <ArrowRight size={14} /></Link>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
