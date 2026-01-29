import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontakt | Kancelaria Restrukturyzacyjna Kamińska Lublin',
  description:
    'Skontaktuj się z Kancelarią Restrukturyzacyjną Karoliny Kamińskiej w Lublinie. ✓ Bezpłatna konsultacja ✓ Restrukturyzacja firm ✓ Upadłość konsumencka i gospodarcza.',
  keywords:
    'kontakt kancelaria restrukturyzacyjna Lublin, doradca restrukturyzacyjny kontakt, adwokat Lublin, bezpłatna konsultacja prawna',
  openGraph: {
    title: 'Kontakt | Kancelaria Kamińska Lublin',
    description:
      'Skontaktuj się z Kancelarią Restrukturyzacyjną w Lublinie. Bezpłatna konsultacja w sprawach restrukturyzacji i upadłości.',
    type: 'website',
    locale: 'pl_PL'
  },
  alternates: {
    canonical: '/kontakt'
  }
};

export default function KontaktLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
