import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'O Mnie | Karolina Kamińska - Adwokat i Doradca Restrukturyzacyjny Lublin',
  description:
    'Karolina Kamińska - adwokat i licencjonowany doradca restrukturyzacyjny w Lublinie. Wieloletnie doświadczenie w restrukturyzacji firm, upadłości konsumenckiej i gospodarczej.',
  keywords:
    'Karolina Kamińska adwokat, doradca restrukturyzacyjny Lublin, kancelaria adwokacka Lublin, prawnik restrukturyzacja, specjalista upadłość',
  openGraph: {
    title: 'Karolina Kamińska | Adwokat i Doradca Restrukturyzacyjny',
    description:
      'Adwokat i licencjonowany doradca restrukturyzacyjny w Lublinie. Wieloletnie doświadczenie w prawie restrukturyzacyjnym i upadłościowym.',
    type: 'profile',
    locale: 'pl_PL'
  },
  alternates: {
    canonical: '/o-mnie'
  }
};

export default function OMnieLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
