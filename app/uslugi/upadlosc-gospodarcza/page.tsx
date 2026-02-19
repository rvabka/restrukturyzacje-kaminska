'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import PageHero from '@/components/PageHero';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from '@/components/Button';

export default function UpadloscGospodarcza() {
  const services = [
    {
      title: 'Weryfikacja przesłanek',
      description:
        'Weryfikacja przesłanek upadłości (sprawdzamy stan niewypłacalności)'
    },
    {
      title: 'Doradztwo',
      description: 'Doradztwo z zakresie wyboru postępowania'
    },
    {
      title: 'Przygotowanie wniosku',
      description: 'Przygotowanie wniosku o upadłość'
    },
    {
      title: 'Reprezentacja przed sądem',
      description: 'Reprezentacja przed sądem'
    },
    {
      title: 'Współpraca z syndykiem',
      description: 'Współpraca z syndykiem'
    },
    {
      title: 'Reprezentacja wierzycieli',
      description:
        'Zgłoszenie wierzytelności i reprezentacja wierzycieli w postępowaniu upadłościowym'
    }
  ];

  return (
    <main className="min-h-screen">
      <Navbar />

      <PageHero
        title="Upadłość gospodarcza"
        subtitle="Kompleksowe wsparcie dla przedsiębiorców w postępowaniu upadłościowym"
      />

      {/* Intro Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-primary to-transparent pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col items-center">
            <div className="w-12 h-0.5 bg-gold mb-8"></div>
            <p className="text-xl md:text-xl lg:text-2xl text-dark leading-relaxed text-center font-light">
              Pomagamy przedsiębiorcom na każdym etapie procesu upadłościowego
              poczynając od weryfikacji sytuacji finansowej firmy, poprzez
              doradztwo w zakresie wyboru właściwego postępowania (upadłość czy
              może jest jeszcze szansa na restrukturyzację), aż po wsparcie w
              kontaktach z syndykiem i sądem.
            </p>
            <div className="w-12 h-0.5 bg-gold mt-8"></div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-primary overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent pointer-events-none z-20"></div>
        <Image
          src="/images/backgroundDesktopLeft.png"
          alt=""
          fill
          sizes="100vw"
          className="absolute inset-0 object-cover pointer-events-none select-none hidden md:block opacity-40"
          priority
          quality={100}
        />
        <Image
          src="/images/backgroundMobileLeft.png"
          alt=""
          fill
          sizes="100vw"
          className="absolute inset-0 object-cover pointer-events-none select-none md:hidden opacity-40"
          priority
          quality={100}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <span className="text-sm uppercase tracking-[0.2em] text-gold font-semibold">
              Zakres usług
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-dark mt-2 tracking-tight">
              Co <span className="font-semibold">zapewniamy</span>?
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-12">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex gap-6 items-start border-b border-gold/30 pb-8 last:border-b-0"
              >
                <span className="text-5xl md:text-6xl text-gold font-light min-w-[60px]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-light text-dark mb-3 uppercase">
                    {service.title}
                  </h3>
                  <p className="text-brighterDark leading-relaxed text-base md:text-lg">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none z-20"></div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-white to-gold/5"></div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm uppercase tracking-[0.2em] text-gold font-semibold">
              Skontaktuj się
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-dark mt-4 mb-8 tracking-tight">
              Potrzebujesz <span className="font-semibold">pomocy</span>?
            </h2>
            <p className="text-lg md:text-xl text-brighterDark leading-relaxed mb-12 max-w-2xl mx-auto">
              Zapraszamy do kontaktu. Wspólnie przeanalizujemy Twoją sytuację i
              znajdziemy optymalne rozwiązanie prawne.
            </p>
            <Button
              href="/kontakt"
              variant="outline"
              showArrow
              className="text-base"
            >
              Bezpłatna konsultacja
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  );
}
