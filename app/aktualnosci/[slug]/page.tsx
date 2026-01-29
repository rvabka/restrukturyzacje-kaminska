import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { client } from '@/src/sanity/client';
import {
  postBySlugQuery,
  allPostSlugsQuery,
  relatedPostsQuery,
  PostFull,
  PostCard
} from '@/src/sanity/queries';
import { urlFor } from '@/src/sanity/image';
import PostDetailClient from './PostDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(allPostSlugsQuery);
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post: PostFull | null = await client.fetch(postBySlugQuery, { slug });

  if (!post) {
    return {
      title: 'Artykuł nie znaleziony | Kancelaria Restrukturyzacyjna Kamińska'
    };
  }

  const ogImage = post.ogImage || post.mainImage;
  const ogImageUrl = ogImage
    ? urlFor(ogImage).width(1200).height(630).url()
    : undefined;

  return {
    title:
      post.seoTitle ||
      `${post.title} | Aktualności | Kancelaria Restrukturyzacyjna Kamińska`,
    description:
      post.seoDescription ||
      post.excerpt ||
      `Przeczytaj artykuł: ${post.title}`,
    keywords: post.seoKeywords,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      type: 'article',
      locale: 'pl_PL',
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author] : undefined,
      images: ogImageUrl
        ? [
            {
              url: ogImageUrl,
              width: 1200,
              height: 630,
              alt: post.mainImage?.alt || post.title
            }
          ]
        : undefined
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: ogImageUrl ? [ogImageUrl] : undefined
    },
    alternates: {
      canonical: `/aktualnosci/${slug}`
    }
  };
}

export const revalidate = 60;

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post: PostFull | null = await client.fetch(postBySlugQuery, { slug });

  if (!post) {
    notFound();
  }

  const relatedPosts: PostCard[] = await client.fetch(relatedPostsQuery, {
    currentId: post._id
  });

  // JSON-LD Schema
  const ogImage = post.ogImage || post.mainImage;
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://restrukturyzacje-kaminska.pl';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    description: post.excerpt || post.seoDescription,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author || 'Karolina Kamińska'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Kancelaria Restrukturyzacyjna Kamińska',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.webp`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/aktualnosci/${slug}`
    },
    image: ogImage ? urlFor(ogImage).width(1200).height(630).url() : undefined
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PostDetailClient post={post} relatedPosts={relatedPosts} />
    </>
  );
}
