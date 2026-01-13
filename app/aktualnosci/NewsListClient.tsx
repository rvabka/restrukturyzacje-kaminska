'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import PageHero from '@/components/PageHero';
import NewsCard from '@/components/NewsCard';
import CTASection from '@/components/CTASection';
import { PostCard } from '@/src/sanity/queries';

interface NewsListClientProps {
  posts: PostCard[];
}

const POSTS_PER_PAGE = 9;

export default function NewsListClient({ posts }: NewsListClientProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen">
      <Navbar />

      <PageHero title="Aktualności" subtitle="Blog i porady prawne" />

      {/* Info Section */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-primary to-transparent pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-0.5 bg-gold mb-8"></div>
            <p className="text-lg md:text-xl text-brighterDark font-light leading-relaxed">
              Najnowsze informacje z zakresu prawa restrukturyzacyjnego
              i&nbsp;upadłościowego. Porady, zmiany w przepisach oraz
              aktualności z&nbsp;kancelarii.
            </p>
            <div className="w-12 h-0.5 bg-gold mt-8"></div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-primary">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent pointer-events-none z-20"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          {paginatedPosts.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedPosts.map((post, index) => (
                  <NewsCard key={post._id} post={post} index={index} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-16 flex justify-center items-center gap-4"
                >
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 text-dark disabled:opacity-30 disabled:cursor-not-allowed hover:text-gold transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      page => {
                        const showPage =
                          page === 1 ||
                          page === totalPages ||
                          Math.abs(page - currentPage) <= 1;

                        if (!showPage) {
                          if (page === 2 || page === totalPages - 1) {
                            return (
                              <span
                                key={page}
                                className="px-1 text-brighterDark"
                              >
                                ·
                              </span>
                            );
                          }
                          return null;
                        }

                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`w-8 h-8 text-sm transition-colors ${
                              currentPage === page
                                ? 'text-gold font-medium'
                                : 'text-brighterDark hover:text-dark'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      }
                    )}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 text-dark disabled:opacity-30 disabled:cursor-not-allowed hover:text-gold transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </motion.div>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24"
            >
              <div className="w-12 h-0.5 bg-gold mx-auto mb-8"></div>
              <h3 className="text-2xl font-light text-dark mb-4">
                Brak artykułów
              </h3>
              <p className="text-brighterDark font-light">
                Wkrótce pojawią się nowe wpisy na naszym blogu.
              </p>
              <div className="w-12 h-0.5 bg-gold mx-auto mt-8"></div>
            </motion.div>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none z-20"></div>
      </section>

      <CTASection />

      <Footer />
      <ScrollToTop />
    </main>
  );
}
