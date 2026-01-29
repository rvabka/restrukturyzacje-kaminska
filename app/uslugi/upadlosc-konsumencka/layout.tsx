import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Upadłość Konsumencka Lublin | Oddłużanie Osób Fizycznych | Kancelaria Kamińska',
  description:
    'Profesjonalna pomoc w upadłości konsumenckiej w Lublinie. ✓ Przygotowanie wniosku ✓ Reprezentacja przed sądem i syndykiem ✓ Umorzenie długów. Bezpłatna konsultacja.',
  keywords:
    'upadłość konsumencka Lublin, oddłużanie osób fizycznych, umorzenie długów, wniosek o upadłość konsumencką, doradca restrukturyzacyjny Lublin, syndyk',
  openGraph: {
    title: 'Upadłość Konsumencka Lublin | Kancelaria Kamińska',
    description:
      'Profesjonalna pomoc w upadłości konsumenckiej. Przygotowanie wniosku, reprezentacja przed sądem i syndykiem. Bezpłatna konsultacja.',
    type: 'website',
    locale: 'pl_PL'
  },
  alternates: {
    canonical: '/uslugi/upadlosc-konsumencka'
  }
};

export default function UpadloscKonsumenckaLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
