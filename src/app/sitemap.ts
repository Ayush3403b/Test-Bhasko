import { MetadataRoute } from 'next';
import connectDB from '@/server/database/connection';
import { City, BlogPost } from '@/server/database/models';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  const staticRoutes = [
    '', '/solar-home', '/solar-business', '/solar-solutions',
    '/solar-solutions/on-grid', '/solar-solutions/hybrid', '/solar-solutions/off-grid',
    '/solar-solutions/battery', '/solar-solutions/ev', '/solar-solutions/apartment',
    '/solar-intelligence', '/solar-intelligence/calculator', '/solar-intelligence/ai-advisor',
    '/solar-intelligence/bill-analyzer', '/solar-intelligence/roof-assessment', '/solar-intelligence/report',
    '/solar-packages', '/products', '/projects', '/pm-surya-ghar', '/financing',
    '/resources', '/about', '/partner-with-us', '/careers', '/contact', '/digital-survey',
    '/solar/1kw', '/solar/2kw', '/solar/3kw', '/solar/5kw', '/solar/5kw-plus',
  ].map(r => ({ url: `${base}${r}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: r === '' ? 1 : 0.7 }));

  let dynamicRoutes: MetadataRoute.Sitemap = [];
  try {
    await connectDB();
    const cities = await City.find({}).lean().catch(() => []);
    dynamicRoutes = dynamicRoutes.concat(
      cities.map((c: any) => ({ url: `${base}/solar/${c.slug}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 }))
    );
    const posts = await BlogPost.find({ status: 'published' }).lean().catch(() => []);
    dynamicRoutes = dynamicRoutes.concat(
      posts.map((p: any) => ({ url: `${base}/resources/blog/${p.slug}`, lastModified: p.updatedAt || new Date(), changeFrequency: 'monthly' as const, priority: 0.6 }))
    );
  } catch { /* fail gracefully */ }

  return [...staticRoutes, ...dynamicRoutes];
}
