import { groq } from 'next-sanity';

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface ListingBase {
  _id: string;
  _createdAt: string;
  title: string;
  slug: { current: string };
  category: 'nieruchomosci' | 'ruchomosci' | 'wierzytelnosci';
  price: number;
  publishedAt: string;
  isActive: boolean;
  mainImage: SanityImage;
  location?: string;
}

export interface ListingCard extends ListingBase {
  // Dodatkowe pola dla karty
  area?: number;
  areaUnit?: string;
  propertyType?: string;
  nominalValue?: number;
  condition?: string;
}

export interface ListingFull extends ListingBase {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  description: any[];
  gallery?: SanityImage[];

  // Nieruchomości
  area?: number;
  areaUnit?: string;
  propertyType?: string;
  rooms?: number;
  floor?: string;

  // Ruchomości
  condition?: string;
  manufacturer?: string;
  yearOfProduction?: number;

  // Wierzytelności
  nominalValue?: number;
  debtorType?: string;
  hasCollateral?: boolean;
  collateralDescription?: string;

  // SEO
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  ogImage?: SanityImage;
}

export interface ListingsResult {
  listings: ListingCard[];
  total: number;
}

export type SortOption = 'date-desc' | 'date-asc' | 'price-asc' | 'price-desc';
export type CategoryFilter =
  | 'all'
  | 'nieruchomosci'
  | 'ruchomosci'
  | 'wierzytelnosci';

const listingsBaseFilter = `_type == "listing" && isActive == true && ($category == "all" || category == $category)`;

const listingsProjection = `{
  _id,
  _createdAt,
  title,
  slug,
  category,
  price,
  publishedAt,
  isActive,
  location,
  mainImage {
    asset,
    alt,
    hotspot
  },
  area,
  areaUnit,
  propertyType,
  nominalValue,
  condition
}`;

// Zapytania dla różnych sortowań
export const listingsQueryDateDesc = groq`{
  "listings": *[${listingsBaseFilter}] | order(publishedAt desc) [$start...$end] ${listingsProjection},
  "total": count(*[${listingsBaseFilter}])
}`;

export const listingsQueryDateAsc = groq`{
  "listings": *[${listingsBaseFilter}] | order(publishedAt asc) [$start...$end] ${listingsProjection},
  "total": count(*[${listingsBaseFilter}])
}`;

export const listingsQueryPriceAsc = groq`{
  "listings": *[${listingsBaseFilter}] | order(price asc) [$start...$end] ${listingsProjection},
  "total": count(*[${listingsBaseFilter}])
}`;

export const listingsQueryPriceDesc = groq`{
  "listings": *[${listingsBaseFilter}] | order(price desc) [$start...$end] ${listingsProjection},
  "total": count(*[${listingsBaseFilter}])
}`;

// Helper do wyboru odpowiedniego zapytania
export function getListingsQuery(sort: SortOption): string {
  switch (sort) {
    case 'date-asc':
      return listingsQueryDateAsc;
    case 'price-asc':
      return listingsQueryPriceAsc;
    case 'price-desc':
      return listingsQueryPriceDesc;
    case 'date-desc':
    default:
      return listingsQueryDateDesc;
  }
}

// Pobierz pojedyncze ogłoszenie po slug
export const listingBySlugQuery = groq`*[
  _type == "listing"
  && slug.current == $slug
  && isActive == true
][0] {
  _id,
  _createdAt,
  title,
  slug,
  category,
  price,
  publishedAt,
  isActive,
  location,
  description,
  mainImage {
    asset,
    alt,
    hotspot
  },
  gallery[] {
    asset,
    alt,
    hotspot
  },
  // Nieruchomości
  area,
  areaUnit,
  propertyType,
  rooms,
  floor,
  // Ruchomości
  condition,
  manufacturer,
  yearOfProduction,
  // Wierzytelności
  nominalValue,
  debtorType,
  hasCollateral,
  collateralDescription,
  // SEO
  seoTitle,
  seoDescription,
  seoKeywords,
  ogImage {
    asset,
    alt
  }
}`;

// Pobierz wszystkie slugi dla generowania statycznych ścieżek
export const allListingSlugsQuery = groq`*[
  _type == "listing"
  && isActive == true
  && defined(slug.current)
].slug.current`;

// Pobierz podobne ogłoszenia (ta sama kategoria, inne niż bieżące)
export const relatedListingsQuery = groq`*[
  _type == "listing"
  && isActive == true
  && category == $category
  && _id != $currentId
] | order(publishedAt desc) [0...3] {
  _id,
  title,
  slug,
  category,
  price,
  mainImage {
    asset,
    alt,
    hotspot
  },
  location,
  area,
  areaUnit,
  propertyType,
  nominalValue,
  condition
}`;

// Ostatnie ogłoszenia (dla strony głównej)
export const recentListingsQuery = groq`*[
  _type == "listing"
  && isActive == true
] | order(publishedAt desc) [0...6] {
  _id,
  title,
  slug,
  category,
  price,
  publishedAt,
  mainImage {
    asset,
    alt,
    hotspot
  },
  location,
  area,
  areaUnit,
  propertyType,
  nominalValue,
  condition
}`;

// Liczba ogłoszeń per kategoria (dla filtrów)
export const categoriesCountQuery = groq`{
  "all": count(*[_type == "listing" && isActive == true]),
  "nieruchomosci": count(*[_type == "listing" && isActive == true && category == "nieruchomosci"]),
  "ruchomosci": count(*[_type == "listing" && isActive == true && category == "ruchomosci"]),
  "wierzytelnosci": count(*[_type == "listing" && isActive == true && category == "wierzytelnosci"])
}`;

// === PARAMETRY PAGINACJI ===
export const ITEMS_PER_PAGE = 9;

export function getPaginationParams(page: number) {
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  return { start, end };
}

// === HELPERY ===
export const categoryLabels: Record<CategoryFilter, string> = {
  all: 'Wszystkie',
  nieruchomosci: 'Nieruchomości',
  ruchomosci: 'Ruchomości',
  wierzytelnosci: 'Wierzytelności'
};

export const sortLabels: Record<SortOption, string> = {
  'date-desc': 'Najnowsze',
  'date-asc': 'Najstarsze',
  'price-asc': 'Cena: od najniższej',
  'price-desc': 'Cena: od najwyższej'
};

export const propertyTypeLabels: Record<string, string> = {
  mieszkanie: 'Mieszkanie',
  dom: 'Dom',
  dzialka: 'Działka',
  lokal: 'Lokal użytkowy',
  magazyn: 'Magazyn',
  inne: 'Inne'
};

export const conditionLabels: Record<string, string> = {
  nowy: 'Nowy',
  'uzywany-bdb': 'Używany - bardzo dobry',
  'uzywany-dobry': 'Używany - dobry',
  'uzywany-dst': 'Używany - dostateczny',
  'do-naprawy': 'Do naprawy'
};

export const debtorTypeLabels: Record<string, string> = {
  'osoba-fizyczna': 'Osoba fizyczna',
  przedsiebiorstwo: 'Przedsiębiorstwo',
  spolka: 'Spółka'
};

// =============================================
// === POSTS (AKTUALNOŚCI) ===
// =============================================

export interface PostCard {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  author?: string;
  mainImage?: SanityImage;
}

export interface PostFull extends PostCard {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  ogImage?: SanityImage;
}

export interface PostsResult {
  posts: PostCard[];
  total: number;
}

// Pobierz listę postów z paginacją
export const postsQuery = groq`{
  "posts": *[_type == "post" && isPublished == true] | order(publishedAt desc) [$start...$end] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    author,
    mainImage {
      asset,
      alt,
      hotspot
    }
  },
  "total": count(*[_type == "post" && isPublished == true])
}`;

// Pobierz wszystkie posty (bez paginacji, do małych list)
export const allPostsQuery = groq`*[_type == "post" && isPublished == true] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  author,
  mainImage {
    asset,
    alt,
    hotspot
  }
}`;

// Pobierz pojedynczy post po slug
export const postBySlugQuery = groq`*[
  _type == "post"
  && slug.current == $slug
  && isPublished == true
][0] {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  author,
  mainImage {
    asset,
    alt,
    hotspot
  },
  body,
  seoTitle,
  seoDescription,
  seoKeywords,
  ogImage {
    asset,
    alt
  }
}`;

// Wszystkie slugi postów (dla generateStaticParams)
export const allPostSlugsQuery = groq`*[
  _type == "post"
  && isPublished == true
  && defined(slug.current)
].slug.current`;

// Pobierz powiązane posty (inne niż bieżący)
export const relatedPostsQuery = groq`*[
  _type == "post"
  && isPublished == true
  && _id != $currentId
] | order(publishedAt desc) [0...3] {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage {
    asset,
    alt,
    hotspot
  }
}`;

// Liczba postów (dla paginacji)
export const postsCountQuery = groq`count(*[_type == "post" && isPublished == true])`;

// Parametry paginacji dla postów
export const POSTS_PER_PAGE = 9;

export function getPostsPaginationParams(page: number) {
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  return { start, end };
}
