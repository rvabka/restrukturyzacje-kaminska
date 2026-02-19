'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Building2, Car, FileText, MapPin } from 'lucide-react';
import { urlFor } from '@/src/sanity/image';
import { ListingCard, categoryLabels } from '@/src/sanity/queries';
import Button from './Button';

interface RecentListingsProps {
  listings: ListingCard[];
}

const categoryIcons: Record<string, typeof Building2> = {
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

      <div className="max-w-6xl mx-auto relative z-10">
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

        <div className="grid md:grid-cols-2 gap-6">
          {listings.map((listing, index) => {
            const Icon = categoryIcons[listing.category] || FileText;
            return (
              <motion.article
                key={listing._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group bg-primary border-l-2 border-gold"
              >
                <Link
                  href={`/sprzedaz/${listing.slug.current}`}
                  className="flex flex-col sm:flex-row"
                >
                  <div className="relative w-full sm:w-48 md:w-56 h-48 sm:h-auto sm:min-h-[180px] shrink-0 overflow-hidden">
                    {listing.mainImage ? (
                      <Image
                        src={urlFor(listing.mainImage)
                          .width(600)
                          .height(400)
                          .url()}
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
