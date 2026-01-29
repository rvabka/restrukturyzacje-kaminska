import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Restrukturyzacja Firm Lublin | Postępowanie Restrukturyzacyjne | Kancelaria Kamińska',
  description:
    'Kompleksowa pomoc w restrukturyzacji przedsiębiorstw w Lublinie. ✓ Postępowanie układowe ✓ Sanacja ✓ Negocjacje z wierzycielami ✓ Ochrona przed egzekucją. Bezpłatna konsultacja.',
  keywords:
    'restrukturyzacja firm Lublin, postępowanie restrukturyzacyjne, układ z wierzycielami, sanacja przedsiębiorstwa, doradca restrukturyzacyjny, ochrona przed komornikiem',
  openGraph: {
    title: 'Restrukturyzacja Firm Lublin | Kancelaria Kamińska',
    description:
      'Kompleksowa pomoc w restrukturyzacji przedsiębiorstw. Postępowanie układowe, sanacja, negocjacje z wierzycielami. Bezpłatna konsultacja.',
    type: 'website',
    locale: 'pl_PL'
  },
  alternates: {
    canonical: '/uslugi/restrukturyzacja-firm'
  }
};

export default function RestrukturyzacjaFirmLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
