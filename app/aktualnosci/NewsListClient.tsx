'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
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

type SortOption = 'date-desc' | 'date-asc';

const sortLabels: Record<SortOption, string> = {
  'date-desc': 'Najnowsze',
  'date-asc': 'Najstarsze',
};

const POSTS_PER_PAGE = 9;

export default function NewsListClient({ posts }: NewsListClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSort, setCurrentSort] = useState<SortOption>('date-desc');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAndSortedPosts = useMemo(() => {
    let result = [...posts];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        post =>
          post.title.toLowerCase().includes(query) ||
          (post.excerpt && post.excerpt.toLowerCase().includes(query))
      );
    }

    if (currentSort === 'date-asc') {
      result.sort(
        (a, b) =>
          new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      );
    }

    return result;
  }, [posts, currentSort, searchQuery]);

  const totalPages = Math.ceil(filteredAndSortedPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredAndSortedPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (sort: SortOption) => {
    setCurrentSort(sort);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <main className="min-h-screen">
      <Navbar />

      <PageHero title="Aktualności" subtitle="Blog i porady prawne" />

      {/* Filters Section */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-primary to-transparent pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative">
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-0.5 bg-gold mb-6"></div>
            <p className="text-lg md:text-xl text-brighterDark font-light leading-relaxed text-center max-w-3xl">
              Najnowsze informacje z zakresu prawa restrukturyzacyjnego
              i&nbsp;upadłościowego. Porady, zmiany w przepisach oraz
              aktualności z&nbsp;kancelarii.
            </p>
            <div className="w-12 h-0.5 bg-gold mt-6"></div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brighterDark" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => handleSearchChange(e.target.value)}
                placeholder="Szukaj artykułów..."
                className="pl-10 pr-4 py-2 text-sm bg-transparent text-dark focus:outline-none border-b border-gold/30 focus:border-gold w-64 placeholder:text-brighterDark/50"
              />
            </div>

            <div className="flex items-center gap-6">
              <p className="text-sm text-brighterDark font-light">
                Znaleziono{' '}
                <span className="font-medium text-dark">
                  {filteredAndSortedPosts.length}
                </span>{' '}
                {filteredAndSortedPosts.length === 1
                  ? 'artykuł'
                  : filteredAndSortedPosts.length < 5
                    ? 'artykuły'
                    : 'artykułów'}
              </p>

              <div className="flex gap-2">
                {(Object.keys(sortLabels) as SortOption[]).map(sort => (
                  <button
                    key={sort}
                    onClick={() => handleSortChange(sort)}
                    className={`px-3 py-1.5 text-xs tracking-wide transition-all duration-300 ${
                      currentSort === sort
                        ? 'text-gold border-b border-gold font-medium'
                        : 'text-brighterDark hover:text-dark'
                    }`}
                  >
                    {sortLabels[sort]}
                  </button>
                ))}
              </div>
            </div>
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
                {searchQuery ? 'Brak wyników' : 'Brak artykułów'}
              </h3>
              <p className="text-brighterDark font-light">
                {searchQuery
                  ? 'Nie znaleziono artykułów dla podanego zapytania.'
                  : 'Wkrótce pojawią się nowe wpisy na naszym blogu.'}
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
