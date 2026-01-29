import { Metadata } from 'next';
import { client } from '@/src/sanity/client';
import { allPostsQuery, PostCard } from '@/src/sanity/queries';
import NewsListClient from './NewsListClient';

export const metadata: Metadata = {
  title: 'Aktualności | Kancelaria Restrukturyzacyjna Kamińska',
  description:
    'Najnowsze informacje z zakresu prawa restrukturyzacyjnego i upadłościowego. Porady, zmiany w przepisach, case studies i nowości z kancelarii.',
  keywords: [
    'aktualności prawo',
    'restrukturyzacja artykuły',
    'upadłość blog',
    'porady prawne',
    'prawo gospodarcze',
    'zmiany przepisów'
  ],
  openGraph: {
    title: 'Aktualności | Kancelaria Restrukturyzacyjna Kamińska',
    description:
      'Najnowsze informacje z zakresu prawa restrukturyzacyjnego i upadłościowego.',
    type: 'website',
    locale: 'pl_PL'
  },
  alternates: {
    canonical: '/aktualnosci'
  }
};

export const revalidate = 60;

function generateBlogJsonLd(posts: PostCard[]) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://restrukturyzacje-kaminska.pl';

  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Aktualności - Kancelaria Restrukturyzacyjna Kamińska',
    description:
      'Najnowsze informacje z zakresu prawa restrukturyzacyjnego i upadłościowego',
    url: `${baseUrl}/aktualnosci`,
    publisher: {
      '@type': 'Organization',
      name: 'Kancelaria Restrukturyzacyjna Kamińska'
    },
    blogPost: posts.slice(0, 10).map(post => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `${baseUrl}/aktualnosci/${post.slug.current}`,
      datePublished: post.publishedAt,
      description: post.excerpt
    }))
  };
}

export default async function AktualnosciPage() {
  const posts: PostCard[] = await client.fetch(allPostsQuery);
  const jsonLd = generateBlogJsonLd(posts);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NewsListClient posts={posts} />
    </>
  );
}
