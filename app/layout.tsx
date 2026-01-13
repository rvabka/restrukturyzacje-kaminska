import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Restrukturyzacje Karolina Kamińska - Kancelaria Restrukturyzacyjna',
  description:
    'Profesjonalna pomoc w restrukturyzacji firm, upadłości konsumenckiej i gospodarczej, mediacje oraz kompleksowa obsługa prawna przedsiębiorstw.',
  keywords:
    'restrukturyzacja, upadłość konsumencka, upadłość gospodarcza, mediacje, obsługa firm, adwokat'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body
        className={`${poppins.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
