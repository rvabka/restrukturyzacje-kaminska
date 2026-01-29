'use client';

import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Linkedin,
  Instagram
} from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-white border-t-2 border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="-mt-6">
              <Image
                src="/images/logo.webp"
                alt="Karolina Kamińska Logo"
                width={130}
                height={130}
                quality={100}
                className="object-contain mb-4"
              />
              <h3 className="text-xl font-semibold text-dark">
                Karolina Kamińska
              </h3>
              <p className="text-gold text-sm font-medium">
                Kancelaria Restrukturyzacyjna
              </p>
            </div>
            <p className="text-brighterDark text-sm leading-relaxed">
              Profesjonalna pomoc prawna w zakresie restrukturyzacji firm,
              upadłości konsumenckiej i gospodarczej.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-dark border-b-2 border-gold pb-2 inline-block">
              Szybkie linki
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-brighterDark hover:text-gold transition-colors duration-200 text-sm"
                >
                  Strona Główna
                </Link>
              </li>
              <li>
                <Link
                  href="/uslugi/restrukturyzacja-firm"
                  className="text-brighterDark hover:text-gold transition-colors duration-200 text-sm"
                >
                  Restrukturyzacja firm
                </Link>
              </li>
              <li>
                <Link
                  href="/uslugi/upadlosc-konsumencka"
                  className="text-brighterDark hover:text-gold transition-colors duration-200 text-sm"
                >
                  Upadłość konsumencka
                </Link>
              </li>
              <li>
                <Link
                  href="/uslugi/upadlosc-gospodarcza"
                  className="text-brighterDark hover:text-gold transition-colors duration-200 text-sm"
                >
                  Upadłość gospodarcza
                </Link>
              </li>
              <li>
                <Link
                  href="/o-mnie"
                  className="text-brighterDark hover:text-gold transition-colors duration-200 text-sm"
                >
                  O mnie
                </Link>
              </li>
              <li>
                <Link
                  href="/aktualnosci"
                  className="text-brighterDark hover:text-gold transition-colors duration-200 text-sm"
                >
                  Aktualności
                </Link>
              </li>
              <li>
                <Link
                  href="/sprzedaz"
                  className="text-brighterDark hover:text-gold transition-colors duration-200 text-sm"
                >
                  Sprzedaż
                </Link>
              </li>
              <li>
                <Link
                  href="/kontakt"
                  className="text-brighterDark hover:text-gold transition-colors duration-200 text-sm"
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-dark border-b-2 border-gold pb-2 inline-block">
              Kontakt
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                <span className="text-brighterDark text-sm">
                  ul. Przykładowa 123
                  <br />
                  20-001 Lublin
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold flex-shrink-0" />
                <a
                  href="tel:+48123456789"
                  className="text-brighterDark hover:text-gold transition-colors duration-200 text-sm"
                >
                  +48 123 456 789
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold flex-shrink-0" />
                <a
                  href="mailto:kontakt@kaminska.pl"
                  className="text-brighterDark hover:text-gold transition-colors duration-200 text-sm"
                >
                  kontakt@kaminska.pl
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-dark border-b-2 border-gold pb-2 inline-block">
              Social Media
            </h3>
            <div className="flex gap-3 mb-8">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary border border-gold/20 p-3 hover:bg-gold hover:border-gold transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-dark" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary border border-gold/20 p-3 hover:bg-gold hover:border-gold transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-dark" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary border border-gold/20 p-3 hover:bg-gold hover:border-gold transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-dark" />
              </a>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3 text-dark">
                Godziny pracy
              </h4>
              <p className="text-brighterDark text-sm leading-relaxed">
                Pn - Pt: 9:00 - 17:00
                <br />
                Sb - Nd: Zamknięte
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gold/20 bg-primary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-brighterDark text-sm text-center md:text-left">
              © {currentYear} Kancelaria Restrukturyzacyjna Karolina Kamińska.
              Wszelkie prawa zastrzeżone.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                href="/"
                className="text-brighterDark hover:text-gold transition-colors duration-200"
              >
                Polityka prywatności
              </Link>
              <Link
                href="/"
                className="text-brighterDark hover:text-gold transition-colors duration-200"
              >
                Regulamin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
