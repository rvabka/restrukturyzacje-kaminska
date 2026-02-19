import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import PageHero from '@/components/PageHero';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Polityka Prywatności | Kancelaria Kamińska',
  description:
    'Polityka prywatności Kancelarii Restrukturyzacyjnej Karoliny Kamińskiej. Informacje o przetwarzaniu danych osobowych zgodnie z RODO.',
  robots: { index: true, follow: true }
};

export default function PolitykaPrywatnosciPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <PageHero
        title="Polityka Prywatności"
        subtitle="Informacje o przetwarzaniu danych osobowych"
      />

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto prose prose-lg prose-headings:text-dark prose-headings:font-semibold prose-p:text-brighterDark prose-li:text-brighterDark prose-a:text-gold prose-a:no-underline hover:prose-a:underline">

          <div className="bg-primary border-l-2 border-gold p-6 mb-12 not-prose">
            <p className="text-dark text-sm leading-relaxed">
              Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych
              przekazanych przez Użytkowników w związku z korzystaniem ze strony internetowej{' '}
              <strong>restrukturyzacjekaminska.pl</strong>.
            </p>
          </div>

          <h2 className="text-2xl border-b-2 border-gold/20 pb-2">1. Administrator danych osobowych</h2>
          <p>
            Administratorem danych osobowych jest <strong>Karolina Kamińska</strong> prowadząca
            Kancelarię Restrukturyzacyjną z siedzibą przy ul. Jasna 5/1, 20-077 Lublin
            (dalej: &quot;Administrator&quot;).
          </p>
          <p>
            Kontakt z Administratorem: <br />
            Email: <a href="mailto:kancelaria.kaminska13@gmail.com">kancelaria.kaminska13@gmail.com</a><br />
            Telefon: <a href="tel:+48697712128">+48 697 712 128</a>
          </p>

          <h2 className="text-2xl border-b-2 border-gold/20 pb-2">2. Cele i podstawy przetwarzania danych</h2>
          <p>Dane osobowe przetwarzane są w następujących celach:</p>
          <ul>
            <li>
              <strong>Obsługa formularza kontaktowego</strong> — na podstawie art. 6 ust. 1 lit. b) RODO
              (podjęcie działań na żądanie osoby przed zawarciem umowy) oraz art. 6 ust. 1 lit. f) RODO
              (prawnie uzasadniony interes Administratora polegający na obsłudze zapytań).
            </li>
            <li>
              <strong>Kontakt telefoniczny i mailowy</strong> — na podstawie art. 6 ust. 1 lit. f) RODO
              (prawnie uzasadniony interes Administratora).
            </li>
            <li>
              <strong>Analityka i statystyki</strong> — na podstawie art. 6 ust. 1 lit. f) RODO.
              Wykorzystujemy Google Analytics do analizy ruchu na stronie.
            </li>
            <li>
              <strong>Bezpieczeństwo strony</strong> — na podstawie art. 6 ust. 1 lit. f) RODO.
              Wykorzystujemy Cloudflare Turnstile do ochrony formularza przed botami.
            </li>
          </ul>

          <h2 className="text-2xl border-b-2 border-gold/20 pb-2">3. Zakres przetwarzanych danych</h2>
          <p>W ramach formularza kontaktowego przetwarzamy następujące dane:</p>
          <ul>
            <li>Imię i nazwisko</li>
            <li>Adres email</li>
            <li>Numer telefonu (opcjonalnie)</li>
            <li>Treść wiadomości</li>
          </ul>
          <p>
            Dodatkowo automatycznie zbieramy dane techniczne: adres IP, typ przeglądarki,
            czas spędzony na stronie — za pomocą Google Analytics i Cloudflare.
          </p>

          <h2 className="text-2xl border-b-2 border-gold/20 pb-2">4. Odbiorcy danych</h2>
          <p>Dane osobowe mogą być przekazywane następującym podmiotom:</p>
          <ul>
            <li><strong>Google LLC</strong> — w ramach usługi Google Analytics (analityka)</li>
            <li><strong>Cloudflare Inc.</strong> — w ramach usługi Cloudflare Turnstile (ochrona anty-bot)</li>
            <li><strong>Hostinger International Ltd.</strong> — dostawca hostingu i poczty email</li>
          </ul>
          <p>
            Wymienione podmioty mogą przetwarzać dane poza Europejskim Obszarem Gospodarczym (EOG).
            Transfer danych odbywa się na podstawie standardowych klauzul umownych zatwierdzonych
            przez Komisję Europejską.
          </p>

          <h2 className="text-2xl border-b-2 border-gold/20 pb-2">5. Okres przechowywania danych</h2>
          <ul>
            <li>
              <strong>Formularz kontaktowy</strong> — dane przechowywane są przez okres niezbędny
              do obsługi zapytania, nie dłużej niż 12 miesięcy od ostatniego kontaktu.
            </li>
            <li>
              <strong>Google Analytics</strong> — dane analityczne przechowywane są przez 14 miesięcy.
            </li>
          </ul>

          <h2 className="text-2xl border-b-2 border-gold/20 pb-2">6. Prawa użytkownika</h2>
          <p>Przysługują Ci następujące prawa:</p>
          <ul>
            <li>Prawo dostępu do swoich danych osobowych</li>
            <li>Prawo do sprostowania (poprawienia) danych</li>
            <li>Prawo do usunięcia danych (&quot;prawo do bycia zapomnianym&quot;)</li>
            <li>Prawo do ograniczenia przetwarzania</li>
            <li>Prawo do przenoszenia danych</li>
            <li>Prawo do sprzeciwu wobec przetwarzania</li>
            <li>Prawo do cofnięcia zgody w dowolnym momencie</li>
            <li>Prawo do wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (PUODO)</li>
          </ul>
          <p>
            W celu realizacji powyższych praw prosimy o kontakt na adres:{' '}
            <a href="mailto:kancelaria.kaminska13@gmail.com">kancelaria.kaminska13@gmail.com</a>
          </p>

          <h2 className="text-2xl border-b-2 border-gold/20 pb-2">7. Pliki cookies</h2>
          <p>
            Strona wykorzystuje pliki cookies. Szczegółowe informacje znajdują się w{' '}
            <Link href="/polityka-cookies" className="text-gold hover:underline">
              Polityce Cookies
            </Link>.
          </p>

          <h2 className="text-2xl border-b-2 border-gold/20 pb-2">8. Bezpieczeństwo danych</h2>
          <p>
            Administrator stosuje odpowiednie środki techniczne i organizacyjne zapewniające
            ochronę przetwarzanych danych osobowych, w szczególności:
          </p>
          <ul>
            <li>Szyfrowanie transmisji danych (certyfikat SSL/TLS)</li>
            <li>Szyfrowaną komunikację email (SMTP over SSL)</li>
            <li>Ochronę formularzy przed automatycznym wypełnianiem (Cloudflare Turnstile)</li>
          </ul>

          <h2 className="text-2xl border-b-2 border-gold/20 pb-2">9. Zmiany w polityce prywatności</h2>
          <p>
            Administrator zastrzega sobie prawo do wprowadzania zmian w niniejszej Polityce Prywatności.
            O wszelkich zmianach użytkownicy zostaną poinformowani poprzez zamieszczenie zaktualizowanej
            wersji na tej stronie.
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
