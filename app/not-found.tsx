import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center bg-primary px-4">
        <div className="text-center pt-10">
          <p className="text-[120px] md:text-[180px] font-bold leading-none text-gold/20 select-none">
            404
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold text-dark mb-4 -mt-6">
            Strona nie znaleziona
          </h1>
          <p className="text-brighterDark mb-10 max-w-md mx-auto">
            Przepraszamy, ale strona której szukasz nie istnieje, została
            przeniesiona lub jest tymczasowo niedostępna.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-dark font-semibold hover:bg-gold/90 transition-colors"
            >
              <Home className="w-4 h-4" />
              Strona główna
            </Link>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gold text-dark font-semibold hover:bg-gold/10 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Kontakt
            </Link>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </main>
  );
}
