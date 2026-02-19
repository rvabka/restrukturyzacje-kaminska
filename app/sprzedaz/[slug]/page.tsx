import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { client } from '@/src/sanity/client';
import {
  listingBySlugQuery,
  allListingSlugsQuery,
  relatedListingsQuery,
  ListingFull,
  ListingCard,
  categoryLabels
} from '@/src/sanity/queries';
import { urlFor } from '@/src/sanity/image';
import ListingDetailClient from './ListingDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getListing(slug: string): Promise<ListingFull | null> {
  return client.fetch<ListingFull | null>(listingBySlugQuery, { slug });
}

async function getRelatedListings(
  category: string,
  currentId: string
): Promise<ListingCard[]> {
  return client.fetch<ListingCard[]>(relatedListingsQuery, {
    category,
    currentId
  });
}

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(allListingSlugsQuery);
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getListing(slug);

  if (!listing) {
    return {
      title: 'Ogłoszenie nie znalezione'
    };
  }

  const title =
    listing.seoTitle ||
    `${listing.title} | Sprzedaż | Kancelaria Restrukturyzacyjna`;
  const description =
    listing.seoDescription ||
    `${categoryLabels[listing.category]} na sprzedaż: ${listing.title}. Cena: ${new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN', maximumFractionDigits: 0 }).format(listing.price)}. ${listing.location || ''}`.trim();

  const ogImage = listing.ogImage || listing.mainImage;
  const ogImageUrl = ogImage
    ? urlFor(ogImage).width(1200).height(630).url()
    : undefined;

  return {
    title,
    description,
    keywords: listing.seoKeywords?.join(', '),
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'pl_PL',
      images: ogImageUrl
        ? [
            {
              url: ogImageUrl,
              width: 1200,
              height: 630,
              alt: listing.mainImage?.alt || listing.title
            }
          ]
        : undefined
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImageUrl ? [ogImageUrl] : undefined
    },
    alternates: {
      canonical: `/sprzedaz/${slug}`
    }
  };
}

function generateJsonLd(listing: ListingFull) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://restrukturyzacje-kaminska.pl';
  const imageUrl = listing.mainImage
    ? urlFor(listing.mainImage).width(1200).height(800).url()
    : undefined;

  const baseSchema = {
    '@context': 'https://schema.org',
    name: listing.title,
    description: listing.seoDescription || listing.title,
    url: `${baseUrl}/sprzedaz/${listing.slug.current}`,
    image: imageUrl,
    offers: {
      '@type': 'Offer',
      price: listing.price,
      priceCurrency: 'PLN',
      availability: 'https://schema.org/InStock'
    }
  };

  switch (listing.category) {
    case 'nieruchomosci':
      return {
        ...baseSchema,
        '@type': 'RealEstateListing',
        ...(listing.area && {
          floorSize: {
            '@type': 'QuantitativeValue',
            value: listing.area,
            unitCode: 'MTK'
          }
        }),
        ...(listing.location && {
          address: {
            '@type': 'PostalAddress',
            addressLocality: listing.location,
            addressCountry: 'PL'
          }
        }),
        ...(listing.rooms && { numberOfRooms: listing.rooms })
      };

    case 'ruchomosci':
      return {
        ...baseSchema,
        '@type': 'Product',
        ...(listing.manufacturer && { brand: listing.manufacturer }),
        ...(listing.condition && {
          itemCondition:
            listing.condition === 'nowy'
              ? 'https://schema.org/NewCondition'
              : 'https://schema.org/UsedCondition'
        })
      };

    case 'wierzytelnosci':
      return {
        ...baseSchema,
        '@type': 'Product',
        category: 'Wierzytelność',
        ...(listing.nominalValue && {
          additionalProperty: {
            '@type': 'PropertyValue',
            name: 'Wartość nominalna',
            value: listing.nominalValue,
            unitCode: 'PLN'
          }
        })
      };

    default:
      return {
        ...baseSchema,
        '@type': 'Product'
      };
  }
}

export default async function ListingPage({ params }: PageProps) {
  const { slug } = await params;
  const listing = await getListing(slug);

  if (!listing) {
    notFound();
  }

  const relatedListings = await getRelatedListings(
    listing.category,
    listing._id
  );

  const jsonLd = generateJsonLd(listing);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ListingDetailClient
        listing={listing}
        relatedListings={relatedListings}
      />
    </>
  );
}
