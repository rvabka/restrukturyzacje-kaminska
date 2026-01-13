'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import { urlFor } from '@/src/sanity/image';
import { PostCard } from '@/src/sanity/queries';

interface NewsCardProps {
  post: PostCard;
  index?: number;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

// Oblicz czas czytania na podstawie excerpt (około 200 słów/min)
function calculateReadTime(excerpt?: string): number {
  const wordsPerMinute = 200;
  const excerptWords = excerpt ? excerpt.split(/\s+/).length : 0;
  const estimatedBodyWords = 500; // domyślnie 500 słów dla body
  const totalWords = excerptWords + estimatedBodyWords;
  return Math.max(1, Math.ceil(totalWords / wordsPerMinute));
}

export default function NewsCard({ post, index = 0 }: NewsCardProps) {
  const readTime = calculateReadTime(post.excerpt);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white border-l-2 border-gold"
    >
      <Link href={`/aktualnosci/${post.slug.current}`} className="block">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          {post.mainImage ? (
            <Image
              src={urlFor(post.mainImage).width(600).height(400).url()}
              alt={post.mainImage.alt || post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-50 flex items-center justify-center">
              <div className="w-12 h-12 border border-gray-200 flex items-center justify-center">
                <span className="text-xl text-gray-300 font-light">A</span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Read time */}
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-3.5 h-3.5 text-brighterDark" />
            <span className="text-xs text-brighterDark font-light">
              {readTime} min czytania
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base font-normal text-dark leading-snug mb-3 line-clamp-2 group-hover:text-gold transition-colors duration-300">
            {post.title}
          </h3>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-sm text-brighterDark font-light leading-relaxed line-clamp-3 mb-4">
              {post.excerpt}
            </p>
          )}

          {/* Author & Date */}
          <div className="flex items-center gap-3 pt-4 border-t border-gold/10">
            {/* Author avatar placeholder */}
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0">
              <span className="text-xs text-dark font-medium">
                {post.author ? post.author.charAt(0).toUpperCase() : 'K'}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-dark font-normal">
                {post.author || 'Kancelaria'}
              </span>
              <time
                dateTime={post.publishedAt}
                className="text-xs text-brighterDark font-light"
              >
                {formatDate(post.publishedAt)}
              </time>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
