'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  Building2,
  Car,
  FileText,
  ChevronLeft,
  ChevronRight,
  MapPin
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import PageHero from '@/components/PageHero';
import {
  ListingCard,
  CategoryFilter,
  SortOption,
  categoryLabels,
  sortLabels,
  propertyTypeLabels,
  conditionLabels
} from '../../src/sanity/queries';
import { urlFor } from '../../src/sanity/image';

interface ListingsPageClientProps {
  listings: ListingCard[];
  total: number;
  totalPages: number;
  currentPage: number;
  currentCategory: CategoryFilter;
  currentSort: SortOption;
  categoriesCount: Record<CategoryFilter, number>;
}

const categoryIcons: Record<CategoryFilter, typeof Building2> = {
  all: FileText,
  nieruchomosci: Building2,
  ruchomosci: Car,
  wierzytelnosci: FileText
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    maximumFractionDigits: 0
  }).format(price);
}

export default function ListingsPageClient({
  listings,
  total,
  totalPages,
  currentPage,
  currentCategory,
  currentSort,
  categoriesCount
}: ListingsPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (params: Record<string, string>) => {
      const newParams = new URLSearchParams(searchParams.toString());
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          newParams.set(key, value);
        } else {
          newParams.delete(key);
        }
      });
      return newParams.toString();
    },
    [searchParams]
  );

  const handleCategoryChange = (category: CategoryFilter) => {
    const query = createQueryString({
      kategoria: category === 'all' ? '' : category,
      strona: '1'
    });
    router.push(`/sprzedaz${query ? `?${query}` : ''}`);
  };

  const handleSortChange = (sort: SortOption) => {
    const query = createQueryString({
      sortuj: sort === 'date-desc' ? '' : sort,
      strona: '1'
    });
    router.push(`/sprzedaz${query ? `?${query}` : ''}`);
  };

  const handlePageChange = (page: number) => {
    const query = createQueryString({
      strona: page === 1 ? '' : page.toString()
    });
    router.push(`/sprzedaz${query ? `?${query}` : ''}`);
  };

  return (
    <main className="min-h-screen">
      <Navbar />

      <PageHero
        title="Sprzedaż"
        subtitle="Oferty z postępowań restrukturyzacyjnych"
      />

      {/* Filters Section */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-primary to-transparent pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-0.5 bg-gold mb-6"></div>
            <div className="flex flex-wrap justify-center gap-6">
              {(Object.keys(categoryLabels) as CategoryFilter[]).map(cat => {
                const isActive = currentCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`text-sm uppercase tracking-[0.15em] transition-all duration-300 pb-1 ${
                      isActive
                        ? 'text-gold border-b border-gold font-medium'
                        : 'text-brighterDark hover:text-dark'
                    }`}
                  >
                    {categoryLabels[cat]}
                    <span className="ml-2 text-xs">
                      ({categoriesCount[cat]})
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="w-12 h-0.5 bg-gold mt-6"></div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-brighterDark font-light">
              Znaleziono <span className="font-medium text-dark">{total}</span>{' '}
              {total === 1
                ? 'ogłoszenie'
                : total < 5
                  ? 'ogłoszenia'
                  : 'ogłoszeń'}
            </p>

            <select
              value={currentSort}
              onChange={e => handleSortChange(e.target.value as SortOption)}
              className="px-4 py-2 text-sm bg-transparent text-dark focus:outline-none border-b border-gold/30 focus:border-gold cursor-pointer"
            >
              {(Object.keys(sortLabels) as SortOption[]).map(sort => (
                <option key={sort} value={sort}>
                  {sortLabels[sort]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Listings Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-primary overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent pointer-events-none z-20"></div>
        <Image
          src="/images/backgroundDesktopRight.png"
          alt=""
          fill
          className="absolute inset-0 object-cover pointer-events-none select-none hidden md:block opacity-30"
          priority
          quality={100}
        />
        <Image
          src="/images/backgroundMobileRight.png"
          alt=""
          fill
          className="absolute inset-0 object-cover pointer-events-none select-none md:hidden opacity-30"
          priority
          quality={100}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          {listings.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24"
            >
              <div className="w-12 h-0.5 bg-gold mx-auto mb-8"></div>
              <h3 className="text-2xl font-light text-dark mb-4">
                Brak ogłoszeń
              </h3>
              <p className="text-brighterDark font-light">
                Nie znaleziono ogłoszeń spełniających kryteria.
              </p>
              <div className="w-12 h-0.5 bg-gold mx-auto mt-8"></div>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {listings.map((listing, index) => (
                <ListingCardComponent
                  key={listing._id}
                  listing={listing}
                  index={index}
                />
              ))}
            </div>
          )}

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
                          <span key={page} className="px-1 text-brighterDark">
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
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none z-20"></div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  );
}

function ListingCardComponent({
  listing,
  index
}: {
  listing: ListingCard;
  index: number;
}) {
  const Icon = categoryIcons[listing.category] || FileText;

  const getExtraInfo = () => {
    switch (listing.category) {
      case 'nieruchomosci':
        const parts = [];
        if (listing.area) parts.push(`${listing.area} m²`);
        if (listing.propertyType)
          parts.push(
            propertyTypeLabels[listing.propertyType] || listing.propertyType
          );
        return parts.join(' • ');
      case 'ruchomosci':
        return listing.condition
          ? conditionLabels[listing.condition] || listing.condition
          : '';
      case 'wierzytelnosci':
        return listing.nominalValue
          ? `Wartość nominalna: ${formatPrice(listing.nominalValue)}`
          : '';
      default:
        return '';
    }
  };

  const extraInfo = getExtraInfo();

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group bg-white border-l-2 border-gold"
    >
      <Link
        href={`/sprzedaz/${listing.slug.current}`}
        className="flex flex-col sm:flex-row"
      >
        <div className="relative w-full sm:w-48 md:w-56 h-48 sm:h-auto sm:min-h-[180px] shrink-0 overflow-hidden">
          {listing.mainImage ? (
            <Image
              src={urlFor(listing.mainImage).width(600).height(400).url()}
              alt={listing.mainImage.alt || listing.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 224px"
            />
          ) : (
            <div className="w-full h-full bg-gray-50 flex items-center justify-center">
              <Icon className="w-10 h-10 text-gray-200" />
            </div>
          )}
        </div>

        <div className="p-5 flex flex-col flex-1 justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.15em] text-gold font-medium">
              {categoryLabels[listing.category]}
            </span>
            <h3 className="text-base font-normal text-dark mt-2 mb-2 line-clamp-2 group-hover:text-gold transition-colors">
              {listing.title}
            </h3>

            {listing.location && (
              <p className="flex items-center gap-2 text-sm text-brighterDark font-light mb-1">
                <MapPin className="w-3.5 h-3.5 text-gold" />
                <span className="font-normal">{listing.location}</span>
              </p>
            )}

            {extraInfo && (
              <p className="text-sm text-brighterDark font-light">
                {extraInfo}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between pt-3 mt-3 border-t border-gold/20">
            <span className="text-lg font-normal text-dark">
              {formatPrice(listing.price)}
            </span>
            <span className="text-xs text-gold font-light tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">
              Zobacz więcej →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
