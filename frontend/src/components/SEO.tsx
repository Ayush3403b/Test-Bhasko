import type { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  keywords?: string[];
  type?: 'website' | 'article';
  jsonLd?: Record<string, any> | Record<string, any>[];
}

export function buildMetadata(seo: SEOProps, parentMetadata?: Metadata): Metadata {
  const url = seo.canonical || '';
  const title = seo.title;
  const description = seo.description;
  return {
    title,
    description,
    keywords: seo.keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: seo.type || 'website',
      images: seo.ogImage ? seo.ogImage : undefined,
      siteName: 'Bhasko',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: seo.ogImage ? [seo.ogImage] : undefined,
    },
  };
}

export function JsonLd({ data }: { data: Record<string, any> | Record<string, any>[] }) {
  const arr = Array.isArray(data) ? data : [data];
  return (
    <>
      {arr.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
        />
      ))}
    </>
  );
}

export const defaultKeywords = [
  'solar panels Patna', 'rooftop solar Bihar', '5kw solar price', 'solar subsidy Bihar',
  'PM Surya Ghar', 'solar calculator India', 'solar EMI calculator', 'solar for home Patna',
  'commercial solar Bihar', 'Bhasko solar', 'best solar company Patna',
];
