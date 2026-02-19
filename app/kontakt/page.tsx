'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import PageHero from '@/components/PageHero';
import Map from '@/components/Map';
import { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

declare global {
  interface Window {
    turnstile: {
      render: (container: string | HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';

export default function KontaktPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [turnstileToken, setTurnstileToken] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const renderWidget = () => {
      if (!mounted || !turnstileRef.current || !window.turnstile) return;
      // Clear any existing widget
      turnstileRef.current.innerHTML = '';
      widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token: string) => { if (mounted) setTurnstileToken(token); },
        'expired-callback': () => { if (mounted) setTurnstileToken(''); },
        theme: 'light'
      });
    };

    // If the script is already loaded (e.g. Strict Mode remount), render directly
    if (window.turnstile) {
      renderWidget();
    } else {
      const existingScript = document.querySelector(
        'script[src*="challenges.cloudflare.com/turnstile"]'
      );
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad';
        script.async = true;
        document.head.appendChild(script);
      }
      (window as unknown as Record<string, unknown>).onTurnstileLoad = renderWidget;
    }

    return () => {
      mounted = false;
      if (widgetIdRef.current && window.turnstile) {
        try { window.turnstile.remove(widgetIdRef.current); } catch { /* noop */ }
        widgetIdRef.current = null;
      }
      if (turnstileRef.current) {
        turnstileRef.current.innerHTML = '';
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!turnstileToken) {
      setStatus('error');
      setStatusMessage('Potwierdź, że nie jesteś robotem.');
      return;
    }

    setStatus('loading');
    setStatusMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, turnstileToken })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setStatusMessage('Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setStatusMessage(data.message || 'Wystąpił błąd. Spróbuj ponownie.');
      }
    } catch {
      setStatus('error');
      setStatusMessage('Nie udało się wysłać wiadomości. Sprawdź połączenie i spróbuj ponownie.');
    }

    // Reset turnstile
    setTurnstileToken('');
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
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
                      ul. Jasna 5/1
                      <br />
                      20-077 Lublin
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
                      href="tel:+48697712128"
                      className="text-brighterDark hover:text-gold transition-colors duration-200"
                    >
                      +48 697 712 128
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
                      href="mailto:kancelaria.kaminska13@gmail.com"
                      className="text-brighterDark hover:text-gold transition-colors duration-200"
                    >
                      kancelaria.kaminska13@gmail.com
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
                      Pn - Pt: 9:00 - 17:00
                      <br />
                      Sb - Nd: Zamknięte
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

              {status === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border-l-2 border-green-500 flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <p className="text-green-700">{statusMessage}</p>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border-l-2 border-red-500 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-red-700">{statusMessage}</p>
                </div>
              )}

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

                {/* Cloudflare Turnstile */}
                <div ref={turnstileRef} className="flex justify-center"></div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="relative w-full px-8 py-4 font-semibold text-dark border-2 border-gold overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span className="absolute inset-0 bg-gold transition-transform duration-300 transform translate-y-full group-hover:translate-y-0 group-disabled:translate-y-full"></span>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Wysyłanie...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Wyślij wiadomość
                      </>
                    )}
                  </span>
                </button>

                <p className="text-sm text-brighterDark text-center">
                  * Pola wymagane
                </p>

                <p className="text-xs text-brighterDark/70 text-center leading-relaxed">
                  Wysyłając formularz, wyrażasz zgodę na przetwarzanie Twoich danych osobowych
                  w celu obsługi zapytania zgodnie z naszą{' '}
                  <a href="/polityka-prywatnosci" className="text-gold hover:underline">
                    Polityką Prywatności
                  </a>.
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
