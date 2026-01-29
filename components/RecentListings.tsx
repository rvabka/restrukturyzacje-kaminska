'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Building2, Car, FileText, MapPin, ArrowRight } from 'lucide-react';
import { urlFor } from '@/src/sanity/image';
import { ListingCard, categoryLabels } from '@/src/sanity/queries';
import Button from './Button';

interface RecentListingsProps {
  listings: ListingCard[];
}

const categoryIcons = {
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

export default function RecentListings({ listings }: RecentListingsProps) {
  if (!listings || listings.length === 0) {
    return null;
  }

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-primary to-transparent pointer-events-none z-10"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <span className="text-sm uppercase tracking-[0.2em] text-gold font-semibold">
            Aktualne oferty
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-dark mt-2 tracking-tight">
            Sprzedaż <span className="font-semibold">z postępowań</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing, index) => {
            const Icon = categoryIcons[listing.category];
            return (
              <motion.article
                key={listing._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-primary border-l-2 border-gold"
              >
                <Link
                  href={`/sprzedaz/${listing.slug.current}`}
                  className="block"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    {listing.mainImage ? (
                      <Image
                        src={urlFor(listing.mainImage)
                          .width(600)
                          .height(400)
                          .url()}
                        alt={listing.mainImage.alt || listing.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <Icon className="w-12 h-12 text-gold/50" />
                      </div>
                    )}
                    {/* Category badge */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 flex items-center gap-2">
                      <Icon className="w-4 h-4 text-gold" />
                      <span className="text-xs font-medium text-dark">
                        {categoryLabels[listing.category]}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Title */}
                    <h3 className="text-base font-medium text-dark leading-snug mb-3 line-clamp-2 group-hover:text-gold transition-colors duration-300">
                      {listing.title}
                    </h3>

                    {/* Location */}
                    {listing.location && (
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="w-4 h-4 text-gold" />
                        <span className="text-sm text-brighterDark">
                          {listing.location}
                        </span>
                      </div>
                    )}

                    {/* Price */}
                    <div className="pt-4 border-t border-gold/20">
                      <span className="text-xl font-semibold text-gold">
                        {formatPrice(listing.price)}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Button href="/sprzedaz" variant="outline" showArrow>
            Zobacz wszystkie oferty
          </Button>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary to-transparent pointer-events-none z-10"></div>
    </section>
  );
}
