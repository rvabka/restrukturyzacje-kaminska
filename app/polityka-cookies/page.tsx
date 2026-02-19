import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import PageHero from '@/components/PageHero';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Polityka Cookies | Kancelaria Kamińska',
  description:
    'Polityka cookies strony Kancelarii Restrukturyzacyjnej Karoliny Kamińskiej. Informacje o plikach cookies i technologiach śledzących.',
  robots: { index: true, follow: true }
};

export default function PolitykaCookiesPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <PageHero
        title="Polityka Cookies"
        subtitle="Informacje o plikach cookies i technologiach śledzących"
      />

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto prose prose-lg prose-headings:text-dark prose-headings:font-semibold prose-p:text-brighterDark prose-li:text-brighterDark prose-a:text-gold prose-a:no-underline hover:prose-a:underline">

          <div className="bg-primary border-l-2 border-gold p-6 mb-12 not-prose">
            <p className="text-dark text-sm leading-relaxed">
              Niniejsza Polityka Cookies wyjaśnia, w jaki sposób strona{' '}
              <strong>restrukturyzacjekaminska.pl</strong> wykorzystuje pliki cookies
              i podobne technologie.
            </p>
          </div>

          <h2 className="text-2xl border-b-2 border-gold/20 pb-2">1. Czym są pliki cookies?</h2>
          <p>
            Pliki cookies (ciasteczka) to małe pliki tekstowe przechowywane na Twoim urządzeniu
            (komputerze, tablecie, telefonie) podczas odwiedzania stron internetowych. Służą one
            do zapamiętywania preferencji, analizy ruchu na stronie oraz zapewnienia prawidłowego
            działania serwisu.
          </p>

          <h2 className="text-2xl border-b-2 border-gold/20 pb-2">2. Jakich cookies używamy?</h2>

          <h3 className="text-xl">Cookies niezbędne</h3>
          <p>
            Są konieczne do prawidłowego działania strony. Nie wymagają zgody użytkownika.
          </p>
          <div className="not-prose overflow-x-auto mb-8">
            <table className="w-full text-sm border border-gold/20">
              <thead>
                <tr className="bg-primary">
                  <th className="text-left p-3 border-b border-gold/20 text-dark font-semibold">Nazwa</th>
                  <th className="text-left p-3 border-b border-gold/20 text-dark font-semibold">Dostawca</th>
                  <th className="text-left p-3 border-b border-gold/20 text-dark font-semibold">Cel</th>
                  <th className="text-left p-3 border-b border-gold/20 text-dark font-semibold">Czas</th>
                </tr>
              </thead>
              <tbody className="text-brighterDark">
                <tr>
                  <td className="p-3 border-b border-gold/10">cf_clearance</td>
                  <td className="p-3 border-b border-gold/10">Cloudflare</td>
                  <td className="p-3 border-b border-gold/10">Weryfikacja anty-bot (Turnstile)</td>
                  <td className="p-3 border-b border-gold/10">30 min</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl">Cookies analityczne</h3>
          <p>
            Pomagają zrozumieć, w jaki sposób użytkownicy korzystają ze strony.
          </p>
          <div className="not-prose overflow-x-auto mb-8">
            <table className="w-full text-sm border border-gold/20">
              <thead>
                <tr className="bg-primary">
                  <th className="text-left p-3 border-b border-gold/20 text-dark font-semibold">Nazwa</th>
                  <th className="text-left p-3 border-b border-gold/20 text-dark font-semibold">Dostawca</th>
                  <th className="text-left p-3 border-b border-gold/20 text-dark font-semibold">Cel</th>
                  <th className="text-left p-3 border-b border-gold/20 text-dark font-semibold">Czas</th>
                </tr>
              </thead>
              <tbody className="text-brighterDark">
                <tr>
                  <td className="p-3 border-b border-gold/10">_ga</td>
                  <td className="p-3 border-b border-gold/10">Google Analytics</td>
                  <td className="p-3 border-b border-gold/10">Identyfikacja unikalnych użytkowników</td>
                  <td className="p-3 border-b border-gold/10">2 lata</td>
                </tr>
                <tr>
                  <td className="p-3 border-b border-gold/10">_ga_*</td>
                  <td className="p-3 border-b border-gold/10">Google Analytics</td>
                  <td className="p-3 border-b border-gold/10">Przechowywanie stanu sesji</td>
                  <td className="p-3 border-b border-gold/10">2 lata</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl border-b-2 border-gold/20 pb-2">3. Jak zarządzać cookies?</h2>
          <p>
            Możesz samodzielnie zarządzać plikami cookies poprzez ustawienia swojej przeglądarki.
            Poniżej znajdziesz instrukcje dla najpopularniejszych przeglądarek:
          </p>
          <ul>
            <li>
              <strong>Google Chrome:</strong> Ustawienia → Prywatność i bezpieczeństwo → Pliki cookies
            </li>
            <li>
              <strong>Mozilla Firefox:</strong> Ustawienia → Prywatność i bezpieczeństwo → Ciasteczka
            </li>
            <li>
              <strong>Safari:</strong> Preferencje → Prywatność → Zarządzaj danymi witryn
            </li>
            <li>
              <strong>Microsoft Edge:</strong> Ustawienia → Pliki cookie i uprawnienia witryn
            </li>
          </ul>
          <p>
            <strong>Uwaga:</strong> Wyłączenie plików cookies może spowodować nieprawidłowe
            działanie niektórych funkcji strony, w tym formularza kontaktowego.
          </p>

          <h2 className="text-2xl border-b-2 border-gold/20 pb-2">4. Google Analytics</h2>
          <p>
            Korzystamy z Google Analytics 4 (GA4) w celu analizy ruchu na stronie.
            Google Analytics zbiera informacje takie jak:
          </p>
          <ul>
            <li>Odwiedzane strony i czas spędzony na nich</li>
            <li>Źródło ruchu (skąd trafił użytkownik)</li>
            <li>Typ urządzenia i przeglądarki</li>
            <li>Przybliżona lokalizacja (na podstawie adresu IP)</li>
          </ul>
          <p>
            Dane te są anonimizowane i nie pozwalają na bezpośrednią identyfikację użytkownika.
            Możesz zablokować Google Analytics instalując{' '}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
            >
              oficjalną wtyczkę Google
            </a>.
          </p>

          <h2 className="text-2xl border-b-2 border-gold/20 pb-2">5. Cloudflare Turnstile</h2>
          <p>
            Formularz kontaktowy na naszej stronie jest chroniony przez Cloudflare Turnstile —
            niewidoczny system weryfikacji, który odróżnia prawdziwych użytkowników od botów.
            Cloudflare może zapisywać pliki cookies niezbędne do weryfikacji.
          </p>
          <p>
            Więcej informacji:{' '}
            <a
              href="https://www.cloudflare.com/privacypolicy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Polityka prywatności Cloudflare
            </a>
          </p>

          <h2 className="text-2xl border-b-2 border-gold/20 pb-2">6. Zmiany w polityce cookies</h2>
          <p>
            Zastrzegamy sobie prawo do zmiany niniejszej Polityki Cookies. Aktualna wersja
            jest zawsze dostępna na tej stronie.
          </p>

          <h2 className="text-2xl border-b-2 border-gold/20 pb-2">7. Kontakt</h2>
          <p>
            W razie pytań dotyczących plików cookies prosimy o kontakt:<br />
            Email: <a href="mailto:kancelaria.kaminska13@gmail.com">kancelaria.kaminska13@gmail.com</a><br />
            Więcej informacji o ochronie danych osobowych znajdziesz w naszej{' '}
            <Link href="/polityka-prywatnosci">Polityce Prywatności</Link>.
          </p>

          <div className="not-prose mt-12 pt-8 border-t border-gold/20">
            <p className="text-sm text-brighterDark">
              Ostatnia aktualizacja: luty 2026
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  );
}
