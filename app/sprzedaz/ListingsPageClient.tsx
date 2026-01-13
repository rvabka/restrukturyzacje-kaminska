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
  MapPin,
  ArrowUpDown,
  Grid3X3
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
  all: Grid3X3,
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
        subtitle="Przeglądaj ogłoszenia nieruchomości, ruchomości i wierzytelności z postępowań restrukturyzacyjnych"
      />

      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 mb-6">
            {(Object.keys(categoryLabels) as CategoryFilter[]).map(cat => {
              const Icon = categoryIcons[cat];
              const isActive = currentCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all duration-200 border-2 ${
                    isActive
                      ? 'bg-gold text-dark border-gold'
                      : 'bg-white text-brighterDark border-gray-200 hover:border-gold hover:text-dark'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{categoryLabels[cat]}</span>
                  <span
                    className={`ml-1 px-2 py-0.5 text-xs ${
                      isActive ? 'bg-dark/10' : 'bg-gray-100'
                    }`}
                  >
                    {categoriesCount[cat]}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-brighterDark">
              Znaleziono{' '}
              <span className="font-semibold text-dark">{total}</span>{' '}
              {total === 1
                ? 'ogłoszenie'
                : total < 5
                  ? 'ogłoszenia'
                  : 'ogłoszeń'}
            </p>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-brighterDark" />
              <select
                value={currentSort}
                onChange={e => handleSortChange(e.target.value as SortOption)}
                className="px-3 py-2 text-sm border border-gray-200 bg-white text-dark focus:outline-none focus:border-gold"
              >
                {(Object.keys(sortLabels) as SortOption[]).map(sort => (
                  <option key={sort} value={sort}>
                    {sortLabels[sort]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary">
        <div className="max-w-7xl mx-auto">
          {listings.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                <FileText className="w-8 h-8 text-brighterDark" />
              </div>
              <h3 className="text-xl font-semibold text-dark mb-2">
                Brak ogłoszeń
              </h3>
              <p className="text-brighterDark">
                Nie znaleziono ogłoszeń spełniających kryteria wyszukiwania.
              </p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              className="mt-12 flex justify-center items-center gap-2"
            >
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 border border-gray-200 bg-white text-dark disabled:opacity-50 disabled:cursor-not-allowed hover:border-gold transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                const showPage =
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - currentPage) <= 1;

                if (!showPage) {
                  if (page === 2 || page === totalPages - 1) {
                    return (
                      <span key={page} className="px-2 text-brighterDark">
                        ...
                      </span>
                    );
                  }
                  return null;
                }

                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 text-sm font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-gold text-dark'
                        : 'bg-white border border-gray-200 text-brighterDark hover:border-gold'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-200 bg-white text-dark disabled:opacity-50 disabled:cursor-not-allowed hover:border-gold transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </div>
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
    <article className="group bg-white border-l-2 border-gold shadow-sm hover:shadow-lg transition-all duration-300">
      <Link href={`/sprzedaz/${listing.slug.current}`}>
        <div className="relative h-56 overflow-hidden">
          {listing.mainImage ? (
            <Image
              src={urlFor(listing.mainImage).width(600).height(400).url()}
              alt={listing.mainImage.alt || listing.title}
              fill
              className="object-cover transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <Icon className="w-12 h-12 text-gray-300" />
            </div>
          )}
          <div className="absolute top-4 left-4 px-3 py-1 bg-gold text-dark text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
            <Icon className="w-3.5 h-3.5" />
            {categoryLabels[listing.category]}
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold text-dark mb-2 line-clamp-2">
            {listing.title}
          </h3>

          {listing.location && (
            <p className="flex items-center gap-1.5 text-sm text-brighterDark mb-3">
              <MapPin className="w-4 h-4 text-gold" />
              {listing.location}
            </p>
          )}

          {extraInfo && (
            <p className="text-sm text-brighterDark mb-4">{extraInfo}</p>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="text-xl font-bold text-dark">
              {formatPrice(listing.price)}
            </span>
            <span className="text-sm text-gold font-medium">
              Zobacz szczegóły →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
