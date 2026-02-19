import Link from 'next/link';
import { FileX } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center bg-primary px-4">
        <div className="text-center pt-10">
          <FileX className="w-16 h-16 mx-auto text-gold mb-6" />
          <h1 className="text-3xl md:text-4xl font-semibold text-dark mb-4">
            Ogłoszenie nie znalezione
          </h1>
          <p className="text-brighterDark mb-8 max-w-md mx-auto">
            Przepraszamy, ale ogłoszenie którego szukasz nie istnieje lub
            zostało usunięte.
          </p>
          <Link
            href="/sprzedaz"
            className="inline-block px-6 py-3 bg-gold text-dark font-semibold hover:bg-gold/90 transition-colors"
          >
            Wróć do listy ogłoszeń
          </Link>
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </main>
  );
}
