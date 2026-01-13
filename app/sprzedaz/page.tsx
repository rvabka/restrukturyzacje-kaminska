import { Metadata } from 'next';
import { client } from '@/src/sanity/client';
import {
  getListingsQuery,
  categoriesCountQuery,
  ITEMS_PER_PAGE,
  getPaginationParams,
  CategoryFilter,
  SortOption,
  ListingsResult
} from '@/src/sanity/queries';
import ListingsPageClient from './ListingsPageClient';

export const metadata: Metadata = {
  title: 'Sprzedaż | Kancelaria Restrukturyzacyjna Karolina  Kamińska',
  description:
    'Przeglądaj ogłoszenia sprzedaży nieruchomości, ruchomości i wierzytelności z postępowań restrukturyzacyjnych i upadłościowych. Profesjonalna obsługa prawna w Lublinie.',
  keywords: [
    'sprzedaż syndyka',
    'nieruchomości upadłościowe',
    'wierzytelności na sprzedaż',
    'ruchomości z upadłości',
    'Lublin',
    'restrukturyzacja'
  ],
  openGraph: {
    title: 'Sprzedaż | Kancelaria Restrukturyzacyjna Karolina Kamińska',
    description:
      'Przeglądaj ogłoszenia sprzedaży nieruchomości, ruchomości i wierzytelności z postępowań restrukturyzacyjnych i upadłościowych.',
    type: 'website',
    locale: 'pl_PL'
  }
};

interface PageProps {
  searchParams: Promise<{
    kategoria?: string;
    sortuj?: string;
    strona?: string;
  }>;
}

async function getListings(
  category: CategoryFilter,
  sort: SortOption,
  page: number
): Promise<ListingsResult> {
  const { start, end } = getPaginationParams(page);
  const query = getListingsQuery(sort);

  const result = await client.fetch<ListingsResult>(query, {
    category,
    start,
    end
  });

  return result;
}

async function getCategoriesCount(): Promise<Record<CategoryFilter, number>> {
  return client.fetch(categoriesCountQuery);
}

export default async function SprzedazPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const category = (params.kategoria as CategoryFilter) || 'all';
  const sort = (params.sortuj as SortOption) || 'date-desc';
  const page = parseInt(params.strona || '1', 10);

  const [{ listings, total }, categoriesCount] = await Promise.all([
    getListings(category, sort, page),
    getCategoriesCount()
  ]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <ListingsPageClient
      listings={listings}
      total={total}
      totalPages={totalPages}
      currentPage={page}
      currentCategory={category}
      currentSort={sort}
      categoriesCount={categoriesCount}
    />
  );
}
