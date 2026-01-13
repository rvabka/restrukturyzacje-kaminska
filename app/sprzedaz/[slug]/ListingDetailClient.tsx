'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import {
  Building2,
  Car,
  FileText,
  MapPin,
  Calendar,
  ArrowLeft,
  Phone,
  Mail,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Ruler,
  Home,
  Layers,
  Wrench,
  Factory,
  CalendarDays,
  Banknote,
  User,
  Shield
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import {
  ListingFull,
  ListingCard,
  categoryLabels,
  propertyTypeLabels,
  conditionLabels,
  debtorTypeLabels,
  SanityImage
} from '@/src/sanity/queries';
import { urlFor } from '@/src/sanity/image';
import Button from '@/components/Button';

interface ListingDetailClientProps {
  listing: ListingFull;
  relatedListings: ListingCard[];
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

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default function ListingDetailClient({
  listing,
  relatedListings
}: ListingDetailClientProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const Icon = categoryIcons[listing.category];

  const allImages: SanityImage[] = [
    listing.mainImage,
    ...(listing.gallery || [])
  ].filter(Boolean);

  const lightboxSlides = allImages.map(img => ({
    src: urlFor(img).width(1920).height(1080).url(),
    alt: img.alt || listing.title
  }));

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      prev => (prev - 1 + allImages.length) % allImages.length
    );
  };

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="bg-primary pt-24 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/sprzedaz"
            className="inline-flex items-center gap-2 text-sm text-brighterDark hover:text-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Powrót do listy ogłoszeń
          </Link>
        </div>
      </div>

      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="relative bg-white shadow-lg overflow-hidden mb-4">
                <div className="relative h-[400px] md:h-[500px]">
                  {allImages[currentImageIndex] ? (
                    <>
                      <Image
                        src={urlFor(allImages[currentImageIndex])
                          .width(1200)
                          .height(800)
                          .url()}
                        alt={allImages[currentImageIndex].alt || listing.title}
                        fill
                        className="object-cover cursor-pointer"
                        sizes="(max-width: 1024px) 100vw, 66vw"
                        priority
                        onClick={() => openLightbox(currentImageIndex)}
                      />
                      <button
                        onClick={() => openLightbox(currentImageIndex)}
                        className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white text-dark transition-colors"
                        aria-label="Powiększ zdjęcie"
                      >
                        <Maximize2 className="w-5 h-5" />
                      </button>
                      {allImages.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white text-dark transition-colors"
                            aria-label="Poprzednie zdjęcie"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white text-dark transition-colors"
                            aria-label="Następne zdjęcie"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <Icon className="w-16 h-16 text-gray-300" />
                    </div>
                  )}
                </div>
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-gold text-dark text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <Icon className="w-4 h-4" />
                  {categoryLabels[listing.category]}
                </div>
              </div>

              {allImages.length > 1 && (
                <div className="grid grid-cols-5 md:grid-cols-6 gap-2">
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative h-16 md:h-20 overflow-hidden transition-all ${
                        currentImageIndex === index
                          ? 'ring-2 ring-gold'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={urlFor(img).width(200).height(150).url()}
                        alt={img.alt || `Zdjęcie ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="100px"
                      />
                    </button>
                  ))}
                </div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-8 bg-white p-6 md:p-8 shadow-sm"
              >
                <h2 className="text-2xl font-semibold text-dark mb-6 pb-4 border-b border-gray-100">
                  Opis
                </h2>
                {listing.description ? (
                  <div className="prose prose-lg max-w-none text-brighterDark">
                    <PortableText value={listing.description} />
                  </div>
                ) : (
                  <p className="text-brighterDark">Brak opisu.</p>
                )}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="bg-white p-6 shadow-sm border-l-2 border-gold">
                <h1 className="text-2xl md:text-3xl font-semibold text-dark mb-4">
                  {listing.title}
                </h1>
                <p className="text-3xl md:text-4xl font-bold text-gold">
                  {formatPrice(listing.price)}
                </p>
                {listing.publishedAt && (
                  <p className="flex items-center gap-2 text-sm text-brighterDark mt-4">
                    <Calendar className="w-4 h-4" />
                    Dodano: {formatDate(listing.publishedAt)}
                  </p>
                )}
              </div>

              <div className="bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-dark mb-4 pb-3 border-b border-gray-100">
                  Szczegóły
                </h3>
                <div className="space-y-3">
                  {listing.location && (
                    <DetailRow
                      icon={MapPin}
                      label="Lokalizacja"
                      value={listing.location}
                    />
                  )}

                  {listing.category === 'nieruchomosci' && (
                    <>
                      {listing.propertyType && (
                        <DetailRow
                          icon={Home}
                          label="Typ"
                          value={
                            propertyTypeLabels[listing.propertyType] ||
                            listing.propertyType
                          }
                        />
                      )}
                      {listing.area && (
                        <DetailRow
                          icon={Ruler}
                          label="Metraż"
                          value={`${listing.area} m²`}
                        />
                      )}
                      {listing.rooms && (
                        <DetailRow
                          icon={Layers}
                          label="Pokoje"
                          value={listing.rooms.toString()}
                        />
                      )}
                      {listing.floor && (
                        <DetailRow
                          icon={Building2}
                          label="Piętro"
                          value={listing.floor}
                        />
                      )}
                    </>
                  )}

                  {listing.category === 'ruchomosci' && (
                    <>
                      {listing.condition && (
                        <DetailRow
                          icon={Wrench}
                          label="Stan"
                          value={
                            conditionLabels[listing.condition] ||
                            listing.condition
                          }
                        />
                      )}
                      {listing.manufacturer && (
                        <DetailRow
                          icon={Factory}
                          label="Producent"
                          value={listing.manufacturer}
                        />
                      )}
                      {listing.yearOfProduction && (
                        <DetailRow
                          icon={CalendarDays}
                          label="Rok produkcji"
                          value={listing.yearOfProduction.toString()}
                        />
                      )}
                    </>
                  )}

                  {listing.category === 'wierzytelnosci' && (
                    <>
                      {listing.nominalValue && (
                        <DetailRow
                          icon={Banknote}
                          label="Wartość nominalna"
                          value={formatPrice(listing.nominalValue)}
                        />
                      )}
                      {listing.debtorType && (
                        <DetailRow
                          icon={User}
                          label="Typ dłużnika"
                          value={
                            debtorTypeLabels[listing.debtorType] ||
                            listing.debtorType
                          }
                        />
                      )}
                      {listing.hasCollateral !== undefined && (
                        <DetailRow
                          icon={Shield}
                          label="Zabezpieczenie"
                          value={listing.hasCollateral ? 'Tak' : 'Nie'}
                        />
                      )}
                      {listing.hasCollateral &&
                        listing.collateralDescription && (
                          <div className="pt-2 mt-2 border-t border-gray-100">
                            <p className="text-sm text-brighterDark">
                              <span className="font-medium text-dark">
                                Opis zabezpieczenia:
                              </span>{' '}
                              {listing.collateralDescription}
                            </p>
                          </div>
                        )}
                    </>
                  )}
                </div>
              </div>

              <div className="bg-white p-6 shadow-sm sticky top-24">
                <h3 className="text-lg font-semibold mb-4">
                  Skontaktuj się ze mną.
                </h3>
                <div className="space-y-3">
                  <a
                    href="tel:+48123456789"
                    className="flex items-center font-light gap-3 text-dark hover:text-gold transition-colors"
                  >
                    <Phone className="w-5 h-5 text-gold" />
                    +48 123 456 789
                  </a>
                  <a
                    href="mailto:kontakt@restrukturyzacje-kaminska.pl"
                    className="flex items-center font-light gap-3 text-dark hover:text-gold transition-colors"
                  >
                    <Mail className="w-5 h-5 text-gold" />
                    kontakt@restrukturyzacje-kaminska.pl
                  </a>
                </div>
                <Button
                  href="/kontakt"
                  variant="outline"
                  className="w-full mt-6"
                  showArrow
                >
                  Umów konsultację
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {relatedListings.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <span className="text-sm uppercase tracking-[0.2em] text-gold font-semibold">
                Zobacz również
              </span>
              <h2 className="text-3xl md:text-4xl font-light text-dark mt-2">
                Podobne <span className="font-semibold">ogłoszenia</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedListings.map((item, index) => (
                <RelatedListingCard
                  key={item._id}
                  listing={item}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={lightboxSlides}
        plugins={[Zoom, Thumbnails]}
        zoom={{
          maxZoomPixelRatio: 3
        }}
        thumbnails={{
          position: 'bottom',
          width: 100,
          height: 60
        }}
      />

      <Footer />
      <ScrollToTop />
    </main>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="w-5 h-5 text-gold shrink-0" />
      <span className="text-brighterDark text-sm">{label}:</span>
      <span className="text-dark font-light text-sm ml-auto">{value}</span>
    </div>
  );
}

function RelatedListingCard({
  listing,
  index
}: {
  listing: ListingCard;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-primary border-l-2 border-gold hover:shadow-md transition-all"
    >
      <Link href={`/sprzedaz/${listing.slug.current}`}>
        <div className="relative h-40 overflow-hidden">
          {listing.mainImage ? (
            <Image
              src={urlFor(listing.mainImage).width(400).height(250).url()}
              alt={listing.mainImage.alt || listing.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <FileText className="w-8 h-8 text-gray-300" />
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-base font-semibold text-dark line-clamp-2 group-hover:text-gold transition-colors">
            {listing.title}
          </h3>
          <p className="text-lg font-bold text-gold mt-2">
            {formatPrice(listing.price)}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
