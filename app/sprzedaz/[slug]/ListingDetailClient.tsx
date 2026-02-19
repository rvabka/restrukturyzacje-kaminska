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

      {/* Back Navigation */}
      <div className="bg-white pt-24 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/sprzedaz"
            className="inline-flex items-center gap-2 text-sm text-brighterDark hover:text-gold transition-colors font-light"
          >
            <ArrowLeft className="w-4 h-4" />
            Powrót do ofert
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <section className="relative py-6 sm:py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-6 sm:gap-12">
            {/* Left Column - Images */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="relative overflow-hidden border-l-2 border-gold">
                <div className="relative h-[350px] md:h-[450px]">
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
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        priority
                        onClick={() => openLightbox(currentImageIndex)}
                      />
                      <button
                        onClick={() => openLightbox(currentImageIndex)}
                        className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white text-dark transition-colors"
                        aria-label="Powiększ zdjęcie"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                      {allImages.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white text-dark transition-colors"
                            aria-label="Poprzednie zdjęcie"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white text-dark transition-colors"
                            aria-label="Następne zdjęcie"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                      <Icon className="w-12 h-12 text-gray-200" />
                    </div>
                  )}
                </div>
              </div>

              {allImages.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative w-16 h-16 shrink-0 overflow-hidden transition-all ${
                        currentImageIndex === index
                          ? 'ring-1 ring-gold'
                          : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={urlFor(img).width(200).height(150).url()}
                        alt={img.alt || `Zdjęcie ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Right Column - Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <span className="text-xs uppercase tracking-[0.15em] text-gold font-medium">
                  {categoryLabels[listing.category]}
                </span>
                <h1 className="text-2xl md:text-3xl font-normal text-dark mt-3 mb-4">
                  {listing.title}
                </h1>
                <div className="w-12 h-0.5 bg-gold mb-6"></div>
                <p className="text-3xl font-normal text-dark">
                  {formatPrice(listing.price)}
                </p>
                {listing.publishedAt && (
                  <p className="text-sm text-brighterDark font-light mt-4">
                    Dodano: {formatDate(listing.publishedAt)}
                  </p>
                )}
              </div>

              <div className="space-y-4">
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
                    {listing.hasCollateral && listing.collateralDescription && (
                      <p className="text-sm text-brighterDark font-light pt-2 border-t border-gold/20">
                        {listing.collateralDescription}
                      </p>
                    )}
                  </>
                )}
              </div>

              <div className="pt-6 border-t border-gold/20">
                <p className="text-sm font-light text-brighterDark mb-4">
                  Kontakt
                </p>
                <div className="space-y-3">
                  <a
                    href="tel:+48697712128"
                    className="flex items-center gap-3 text-sm text-dark hover:text-gold transition-colors font-light"
                  >
                    <Phone className="w-4 h-4 text-gold" />
                    +48 697 712 128
                  </a>
                  <a
                    href="mailto:kancelaria.kaminska13@gmail.com"
                    className="flex items-center gap-3 text-sm text-dark hover:text-gold transition-colors font-light"
                  >
                    <Mail className="w-4 h-4 text-gold" />
                    kancelaria.kaminska13@gmail.com
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

      {/* Description Section */}
      {listing.description && (
        <section className="relative py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-primary overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent pointer-events-none z-20"></div>
          <Image
            src="/images/backgroundDesktopLeft.png"
            alt=""
            fill
            sizes="100vw"
            className="absolute inset-0 object-cover pointer-events-none select-none hidden md:block opacity-30"
            quality={100}
          />
          <Image
            src="/images/backgroundMobileLeft.png"
            alt=""
            fill
            sizes="100vw"
            className="absolute inset-0 object-cover pointer-events-none select-none md:hidden opacity-30"
            quality={100}
          />

          <div className="max-w-4xl mx-auto relative z-10">
            <div className="flex flex-col items-center mb-8">
              <div className="w-12 h-0.5 bg-gold mb-6"></div>
              <h2 className="text-2xl md:text-3xl font-light text-dark">
                Opis
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-brighterDark font-light leading-relaxed">
              <PortableText value={listing.description} />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none z-20"></div>
        </section>
      )}

      {relatedListings.length > 0 && (
        <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-12"
            >
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium">
                Zobacz również
              </span>
              <h2 className="text-2xl md:text-3xl font-light text-dark mt-3">
                Podobne oferty
              </h2>
              <div className="w-12 h-0.5 bg-gold mx-auto mt-6"></div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
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
    <div className="flex items-center justify-between py-2 border-b border-gold/10 last:border-b-0">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-gold" />
        <span className="text-sm text-brighterDark font-light">{label}</span>
      </div>
      <span className="text-sm text-dark font-normal">{value}</span>
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
      className="group border-l-2 border-gold bg-primary"
    >
      <Link href={`/sprzedaz/${listing.slug.current}`}>
        <div className="relative h-48 overflow-hidden">
          {listing.mainImage ? (
            <Image
              src={urlFor(listing.mainImage).width(400).height(300).url()}
              alt={listing.mainImage.alt || listing.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-50 flex items-center justify-center">
              <FileText className="w-8 h-8 text-gray-200" />
            </div>
          )}
        </div>
        <div className="p-5">
          <h3 className="text-base font-normal text-dark line-clamp-2 group-hover:text-gold transition-colors">
            {listing.title}
          </h3>
          <p className="text-lg font-normal text-dark mt-3">
            {formatPrice(listing.price)}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
