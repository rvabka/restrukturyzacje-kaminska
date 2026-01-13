'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import { urlFor } from '@/src/sanity/image';
import { PostCard } from '@/src/sanity/queries';

interface RecentPostsSidebarProps {
  posts: PostCard[];
  currentPostId?: string;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

function calculateReadTime(excerpt?: string): number {
  const wordsPerMinute = 200;
  const excerptWords = excerpt ? excerpt.split(/\s+/).length : 0;
  const estimatedBodyWords = 500;
  const totalWords = excerptWords + estimatedBodyWords;
  return Math.max(1, Math.ceil(totalWords / wordsPerMinute));
}

export default function RecentPostsSidebar({
  posts,
  currentPostId
}: RecentPostsSidebarProps) {
  // Filtruj bieżący post i weź max 4
  const filteredPosts = posts
    .filter(post => post._id !== currentPostId)
    .slice(0, 4);

  if (filteredPosts.length === 0) return null;

  return (
    <div className="sticky top-28">
      <div className="mb-6">
        <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium">
          Ostatnie artykuły
        </span>
        <div className="w-8 h-0.5 bg-gold mt-3"></div>
      </div>

      <div className="space-y-6">
        {filteredPosts.map(post => (
          <Link
            key={post._id}
            href={`/aktualnosci/${post.slug.current}`}
            className="group block"
          >
            <article className="flex gap-4">
              {/* Thumbnail */}
              <div className="relative w-20 h-20 shrink-0 overflow-hidden">
                {post.mainImage ? (
                  <Image
                    src={urlFor(post.mainImage).width(160).height(160).url()}
                    alt={post.mainImage.alt || post.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <span className="text-sm text-gray-300 font-light">A</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-normal text-dark leading-snug line-clamp-2 group-hover:text-gold transition-colors">
                  {post.title}
                </h4>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-brighterDark" />
                    <span className="text-xs text-brighterDark font-light">
                      {calculateReadTime(post.excerpt)} min
                    </span>
                  </div>
                  <span className="text-xs text-brighterDark font-light">
                    {formatDate(post.publishedAt)}
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
