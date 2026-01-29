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
  title: {
    default:
      'Kancelaria Restrukturyzacyjna Kamińska | Restrukturyzacja i Upadłość Lublin',
    template: '%s | Kancelaria Kamińska'
  },
  description:
    'Kancelaria Restrukturyzacyjna Karoliny Kamińskiej w Lublinie. Restrukturyzacja firm, upadłość konsumencka i gospodarcza. Licencjonowany doradca restrukturyzacyjny. Bezpłatna konsultacja.',
  keywords:
    'kancelaria restrukturyzacyjna Lublin, doradca restrukturyzacyjny, restrukturyzacja firm, upadłość konsumencka Lublin, upadłość gospodarcza, oddłużanie, adwokat Lublin',
  authors: [{ name: 'Karolina Kamińska' }],
  creator: 'Kancelaria Restrukturyzacyjna Kamińska',
  openGraph: {
    title: 'Kancelaria Restrukturyzacyjna Kamińska | Lublin',
    description:
      'Restrukturyzacja firm, upadłość konsumencka i gospodarcza. Licencjonowany doradca restrukturyzacyjny. Bezpłatna konsultacja.',
    type: 'website',
    locale: 'pl_PL',
    siteName: 'Kancelaria Restrukturyzacyjna Kamińska'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    // google: 'your-google-verification-code', // Dodaj po weryfikacji w Google Search Console
  }
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
