'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import PageHero from '@/components/PageHero';
import Map from '@/components/Map';
import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export default function KontaktPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main className="min-h-screen">
      <Navbar />

      <PageHero
        title="Kontakt"
        subtitle="Umów bezpłatną konsultację lub zadaj pytanie"
      />

      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="mb-12">
                <span className="text-sm uppercase tracking-[0.2em] text-gold font-semibold">
                  Skontaktuj się
                </span>
                <h2 className="text-4xl md:text-5xl font-light text-dark mt-2 tracking-tight">
                  Dane <span className="font-semibold">kontaktowe</span>
                </h2>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-6 bg-primary p-6 border-l-2 border-gold">
                  <MapPin
                    className="w-6 h-6 text-gold mt-1 flex-shrink-0"
                    strokeWidth={2}
                  />
                  <div>
                    <h3 className="font-semibold text-dark mb-2 text-lg">
                      Adres kancelarii
                    </h3>
                    <p className="text-brighterDark leading-relaxed">
                      ul. Przykładowa 123
                      <br />
                      20-001 Lublin
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 bg-primary p-6 border-l-2 border-gold">
                  <Phone
                    className="w-6 h-6 text-gold mt-1 flex-shrink-0"
                    strokeWidth={2}
                  />
                  <div>
                    <h3 className="font-semibold text-dark mb-2 text-lg">
                      Telefon
                    </h3>
                    <a
                      href="tel:+48123456789"
                      className="text-brighterDark hover:text-gold transition-colors duration-200"
                    >
                      +48 123 456 789
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-6 bg-primary p-6 border-l-2 border-gold">
                  <Mail
                    className="w-6 h-6 text-gold mt-1 flex-shrink-0"
                    strokeWidth={2}
                  />
                  <div>
                    <h3 className="font-semibold text-dark mb-2 text-lg">
                      Email
                    </h3>
                    <a
                      href="mailto:kontakt@kaminska.pl"
                      className="text-brighterDark hover:text-gold transition-colors duration-200"
                    >
                      kontakt@kaminska.pl
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-6 bg-primary p-6 border-l-2 border-gold">
                  <Clock
                    className="w-6 h-6 text-gold mt-1 flex-shrink-0"
                    strokeWidth={2}
                  />
                  <div>
                    <h3 className="font-semibold text-dark mb-2 text-lg">
                      Godziny otwarcia
                    </h3>
                    <p className="text-brighterDark leading-relaxed">
                      Poniedziałek - Piątek: 9:00 - 17:00
                      <br />
                      Sobota - Niedziela: Zamknięte
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gold/10 border-l-2 border-gold p-6">
                <p className="text-dark leading-relaxed">
                  <span className="font-semibold">Wskazówka:</span> Wizyty
                  odbywają się po wcześniejszym umówieniu. Możliwa konsultacja
                  online przez MS Teams lub Zoom.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <span className="text-sm uppercase tracking-[0.2em] text-gold font-semibold">
                  Napisz do nas
                </span>
                <h2 className="text-4xl md:text-5xl font-light text-dark mt-2 tracking-tight">
                  Wyślij <span className="font-semibold">wiadomość</span>
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-dark mb-2 uppercase tracking-wide"
                  >
                    Imię i nazwisko *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gold/20 bg-primary focus:outline-none focus:border-gold transition-colors duration-200"
                    placeholder="Jan Kowalski"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-dark mb-2 uppercase tracking-wide"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gold/20 bg-primary focus:outline-none focus:border-gold transition-colors duration-200"
                    placeholder="jan.kowalski@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-dark mb-2 uppercase tracking-wide"
                  >
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gold/20 bg-primary focus:outline-none focus:border-gold transition-colors duration-200"
                    placeholder="+48 123 456 789"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-dark mb-2 uppercase tracking-wide"
                  >
                    Temat *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gold/20 bg-primary focus:outline-none focus:border-gold transition-colors duration-200"
                  >
                    <option value="">Wybierz temat</option>
                    <option value="restrukturyzacja">
                      Restrukturyzacja firmy
                    </option>
                    <option value="upadlosc-konsumencka">
                      Upadłość konsumencka
                    </option>
                    <option value="upadlosc-gospodarcza">
                      Upadłość gospodarcza
                    </option>
                    <option value="mediacje">Mediacje</option>
                    <option value="obsluga-firm">Obsługa firm</option>
                    <option value="inne">Inne</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-dark mb-2 uppercase tracking-wide"
                  >
                    Wiadomość *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gold/20 bg-primary focus:outline-none focus:border-gold transition-colors duration-200 resize-none"
                    placeholder="Opisz swoją sprawę..."
                  />
                </div>

                <button
                  type="submit"
                  className="relative w-full px-8 py-4 font-semibold text-dark border-2 border-gold overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gold transition-transform duration-300 transform translate-y-full group-hover:translate-y-0"></span>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" />
                    Wyślij wiadomość
                  </span>
                </button>

                <p className="text-sm text-brighterDark text-center">
                  * Pola wymagane
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Map />

      <Footer />
      <ScrollToTop />
    </main>
  );
}
