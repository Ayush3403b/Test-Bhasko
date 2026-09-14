import PageHero from '@/components/sections/PageHero';
import Link from 'next/link';
import connectDB from '@/server/database/connection';
import { BlogPost, FAQ } from '@/server/database/models';
import { FadeUp } from '@/components/ui/MotionWrap';
import { ArrowRight, BookOpen, HelpCircle, FileText, Newspaper } from 'lucide-react';
import { buildMetadata } from '@/components/SEO';
export const metadata = buildMetadata({ title: 'Solar Guides, Blog & Resources | Bhasko', description: 'Solar guides, calculators explainers, policy updates, FAQs and honest answers for Indian homeowners and businesses considering rooftop solar.', canonical: '/resources' });
async function getContent() {
  try {
    await connectDB();
    const posts = await BlogPost.find({status:'published'}).sort({publishedAt:-1}).lean();
    const faqs = await FAQ.find({status:'published'}).sort({order:1}).limit(8).lean();
    return { posts, faqs };
  } catch { return { posts: [], faqs: [] }; }
}
export default async function ResourcesPage() {
  const { posts, faqs } = await getContent();
  return (
    <>
      <PageHero eyebrow="BHASKO / RESOURCES" title="Learn solar." subtitle="Honest guides, explainers, policy updates and FAQs — written by Bhasko's engineering team." accentPhrase="read up." primaryCta={{ label: 'Solar Calculator', href: '/solar-intelligence/calculator' }} />
      <section className="py-14 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            {[
              {icon:BookOpen, t:'Solar Guides', d:'In-depth how-tos', href:'#guides'},
              {icon:Newspaper, t:'Solar Blog', d:'News & updates', href:'/resources/blog'},
              {icon:HelpCircle, t:'FAQs', d:'Quick answers', href:'#faqs'},
              {icon:FileText, t:'News', d:'Policy & industry', href:'/resources/news'},
            ].map((c:any,i)=>{
              const Icon = c.icon;
              return (
                <FadeUp key={c.t} delay={i*0.07}>
                  <Link href={c.href} className="block bg-white rounded-2xl p-5 border border-[rgba(24,58,42,0.06)] hover:shadow-lg hover:-translate-y-1 transition-all">
                    <Icon className="text-[#477A45] mb-3" size={22} />
                    <h3 className="font-semibold text-[#183A2A]">{c.t}</h3>
                    <p className="text-sm text-[#66736B]">{c.d}</p>
                  </Link>
                </FadeUp>
              );
            })}
          </div>
          <FadeUp><h2 id="guides" className="heading-section mb-6">Featured Guides</h2></FadeUp>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {posts.map((p:any) => (
              <FadeUp key={p._id.toString()}>
                <Link href={`/resources/blog/${p.slug}`} className="block bg-white rounded-2xl p-6 border border-[rgba(24,58,42,0.06)] hover:shadow-lg hover:-translate-y-1 transition-all h-full">
                  <div className="eyebrow mb-2">{p.category || 'Guide'}</div>
                  <h3 className="font-semibold text-[#183A2A] text-lg mb-2 group-hover:text-[#477A45]">{p.title}</h3>
                  <p className="text-sm text-[#66736B] mb-3 line-clamp-3">{p.excerpt}</p>
                  <div className="text-sm font-medium text-[#477A45] inline-flex items-center gap-1">Read <ArrowRight size={12} /></div>
                </Link>
              </FadeUp>
            ))}
          </div>
          <div id="faqs">
            <FadeUp><h2 className="heading-section mb-6">Frequently Asked</h2></FadeUp>
            <div className="grid md:grid-cols-2 gap-4">
              {faqs.map((f:any) => (
                <FadeUp key={f._id.toString()}>
                  <div className="bg-white rounded-xl p-5 border border-[rgba(24,58,42,0.06)]">
                    <h3 className="font-semibold text-[#183A2A] mb-2">{f.question}</h3>
                    <p className="text-sm text-[#66736B] leading-relaxed">{f.answer}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
