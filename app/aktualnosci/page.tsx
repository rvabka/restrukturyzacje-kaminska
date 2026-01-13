import { Metadata } from 'next';
import { client } from '@/src/sanity/client';
import { allPostsQuery, PostCard } from '@/src/sanity/queries';
import NewsListClient from './NewsListClient';

export const metadata: Metadata = {
  title: 'Aktualności | Kancelaria Restrukturyzacje',
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
    title: 'Aktualności | Kancelaria Restrukturyzacje',
    description:
      'Najnowsze informacje z zakresu prawa restrukturyzacyjnego i upadłościowego.',
    type: 'website',
    locale: 'pl_PL'
  }
};

export const revalidate = 60;

export default async function AktualnosciPage() {
  const posts: PostCard[] = await client.fetch(allPostsQuery);

  return <NewsListClient posts={posts} />;
}
