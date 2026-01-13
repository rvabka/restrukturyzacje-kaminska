'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  Check
} from 'lucide-react';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import CTASection from '@/components/CTASection';
import NewsCard from '@/components/NewsCard';
import { urlFor } from '@/src/sanity/image';
import { PostFull, PostCard } from '@/src/sanity/queries';

interface PostDetailClientProps {
  post: PostFull;
  relatedPosts: PostCard[];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

interface PortableTextBlock {
  _type: string;
  children?: { text?: string }[];
}

function calculateReadTime(
  body: PortableTextBlock[],
  excerpt?: string
): number {
  let wordCount = 0;

  if (excerpt) {
    wordCount += excerpt.split(/\s+/).length;
  }

  if (body && Array.isArray(body)) {
    body.forEach(block => {
      if (block._type === 'block' && block.children) {
        block.children.forEach(child => {
          if (child.text) {
            wordCount += child.text.split(/\s+/).length;
          }
        });
      }
    });
  }

  const readTime = Math.ceil(wordCount / 200);
  return Math.max(1, readTime);
}

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl sm:text-3xl font-semibold text-dark mt-12 mb-6">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl sm:text-2xl font-semibold text-dark mt-10 mb-4">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg sm:text-xl font-semibold text-dark mt-8 mb-3">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-base sm:text-lg text-brighterDark font-light leading-relaxed mb-6">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gold pl-6 py-2 my-8 italic">
        <p className="text-lg text-dark font-light">{children}</p>
      </blockquote>
    )
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-6 ml-4 space-y-3">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-6 ml-4 space-y-3 list-decimal list-inside">
        {children}
      </ol>
    )
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-base sm:text-lg text-brighterDark font-light leading-relaxed flex items-start gap-3">
        <span className="w-2 h-2 rounded-full bg-gold mt-2.5 flex-shrink-0" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="text-base sm:text-lg text-brighterDark font-light leading-relaxed">
        {children}
      </li>
    )
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-dark">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gold hover:text-gold/80 underline underline-offset-2 transition-colors"
      >
        {children}
      </a>
    )
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-10">
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={urlFor(value).width(1200).height(675).url()}
              alt={value.alt || 'Zdjęcie w artykule'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-sm text-brighterDark font-light text-center">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    }
  }
};

export default function PostDetailClient({
  post,
  relatedPosts
}: PostDetailClientProps) {
  const [copied, setCopied] = useState(false);
  const readTime = calculateReadTime(post.body, post.excerpt);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = post.title;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
  };

  const otherPosts = relatedPosts.filter(p => p._id !== post._id).slice(0, 3);

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-end justify-center overflow-hidden">
        {post.mainImage ? (
          <Image
            src={urlFor(post.mainImage).width(1920).height(1080).url()}
            alt={post.mainImage.alt || post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-dark" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-dark/30" />

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              href="/aktualnosci"
              className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-gold transition-colors font-light"
            >
              <ArrowLeft className="w-4 h-4" />
              Powrót do aktualności
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap items-center gap-4 mb-6"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gold" />
              <time
                dateTime={post.publishedAt}
                className="text-sm text-white/80 font-light"
              >
                {formatDate(post.publishedAt)}
              </time>
            </div>
            <div className="w-1 h-1 rounded-full bg-gold/50" />
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold" />
              <span className="text-sm text-white/80 font-light">
                {readTime} min czytania
              </span>
            </div>
            {post.author && (
              <>
                <div className="w-1 h-1 rounded-full bg-gold/50" />
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gold" />
                  <span className="text-sm text-white/80 font-light">
                    {post.author}
                  </span>
                </div>
              </>
            )}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight"
          >
            {post.title}
          </motion.h1>
        </div>
      </section>

      {/* Excerpt */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-primary">
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-dark/20 to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          {post.excerpt && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2 }}
              className="text-center"
            >
              <div className="w-12 h-0.5 bg-gold mx-auto mb-8" />
              <p className="text-lg md:text-xl text-brighterDark font-light leading-relaxed italic">
                {post.excerpt}
              </p>
              <div className="w-12 h-0.5 bg-gold mx-auto mt-8" />
            </motion.div>
          )}
        </div>
      </section>

      {/* Article Content */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-primary to-transparent pointer-events-none z-10" />

        <div className="max-w-3xl mx-auto relative z-20">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="prose prose-lg max-w-none">
              <PortableText
                value={post.body}
                components={portableTextComponents}
              />
            </div>

            {/* Share Section */}
            <div className="mt-16 pt-8 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-brighterDark">
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm font-light">Udostępnij:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={shareLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 flex items-center justify-center border border-gray-200 text-brighterDark hover:text-gold hover:border-gold transition-colors"
                      aria-label="Udostępnij na Facebook"
                    >
                      <Facebook className="w-4 h-4" />
                    </a>
                    <a
                      href={shareLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 flex items-center justify-center border border-gray-200 text-brighterDark hover:text-gold hover:border-gold transition-colors"
                      aria-label="Udostępnij na Twitter"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a
                      href={shareLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 flex items-center justify-center border border-gray-200 text-brighterDark hover:text-gold hover:border-gold transition-colors"
                      aria-label="Udostępnij na LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <button
                      onClick={handleCopyLink}
                      className="w-9 h-9 flex items-center justify-center border border-gray-200 text-brighterDark hover:text-gold hover:border-gold transition-colors"
                      aria-label="Kopiuj link"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <LinkIcon className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {post.author && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary flex items-center justify-center">
                      <span className="text-sm text-dark font-medium">
                        {post.author.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-brighterDark font-light uppercase tracking-wider">
                        Autor
                      </p>
                      <p className="text-sm font-medium text-dark">
                        {post.author}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.article>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary to-transparent pointer-events-none z-10" />
      </section>

      {/* Related Posts */}
      {otherPosts.length > 0 && (
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-primary">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium">
                Czytaj także
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-dark mt-4">
                Więcej artykułów
              </h2>
              <div className="w-12 h-0.5 bg-gold mx-auto mt-6" />
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherPosts.map((relatedPost, index) => (
                <NewsCard
                  key={relatedPost._id}
                  post={relatedPost}
                  index={index}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-12"
            >
              <Link
                href="/aktualnosci"
                className="inline-flex items-center gap-2 text-sm text-brighterDark hover:text-gold transition-colors font-light"
              >
                Zobacz wszystkie artykuły
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none z-10" />
        </section>
      )}

      <CTASection />

      <Footer />
      <ScrollToTop />
    </main>
  );
}
