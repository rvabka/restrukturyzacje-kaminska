import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Upadłość Gospodarcza Lublin | Upadłość Firmy | Kancelaria Kamińska',
  description:
    'Profesjonalna pomoc w upadłości gospodarczej w Lublinie. ✓ Weryfikacja niewypłacalności ✓ Przygotowanie wniosku ✓ Reprezentacja przed sądem i syndykiem. Bezpłatna konsultacja.',
  keywords:
    'upadłość gospodarcza Lublin, upadłość firmy, niewypłacalność przedsiębiorstwa, wniosek o upadłość, syndyk, likwidacja firmy, doradca restrukturyzacyjny',
  openGraph: {
    title: 'Upadłość Gospodarcza Lublin | Kancelaria Kamińska',
    description:
      'Profesjonalna pomoc w upadłości gospodarczej. Weryfikacja niewypłacalności, przygotowanie wniosku, reprezentacja przed sądem. Bezpłatna konsultacja.',
    type: 'website',
    locale: 'pl_PL'
  },
  alternates: {
    canonical: '/uslugi/upadlosc-gospodarcza'
  }
};

export default function UpadloscGospodarczaLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
