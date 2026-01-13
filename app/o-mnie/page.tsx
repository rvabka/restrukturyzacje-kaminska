'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import PageHero from '@/components/PageHero';
import Image from 'next/image';
import { Award, Target, Heart, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ONasPage() {
  const values = [
    {
      icon: Award,
      title: 'Profesjonalizm',
      description:
        'Najwyższe standardy obsługi prawnej potwierdzone wieloletnim doświadczeniem.'
    },
    {
      icon: Target,
      title: 'Skuteczność',
      description:
        'Działamy efektywnie, koncentrując się na osiągnięciu najlepszych rezultatów.'
    },
    {
      icon: Heart,
      title: 'Empatia',
      description:
        'Rozumiemy trudną sytuację naszych klientów i służymy pomocą w kryzysie.'
    },
    {
      icon: Users,
      title: 'Zaufanie',
      description:
        'Budujemy długotrwałe relacje oparte na zaufaniu i transparentności.'
    }
  ];

  const timeline = [
    {
      year: '2023',
      title: 'Licencja doradcy restrukturyzacyjnego',
      description:
        'Ukończenie studiów podyplomowych na kierunku Prawo upadłościowe i restrukturyzacyjne na Uniwersytecie Łazarskiego w Warszawie oraz uzyskanie licencji doradcy restrukturyzacyjnego.'
    },
    {
      year: '2018',
      title: 'Założenie Kancelarii Adwokackiej',
      description:
        'Uzyskanie tytułu adwokata i założenie własnej Kancelarii Adwokackiej w Lublinie.'
    },
    {
      year: '2015 - 2018',
      title: 'Aplikacja adwokacka',
      description:
        'Odbycie aplikacji adwokackiej przy Okręgowej Radzie Adwokackiej w Lublinie.'
    },
    {
      year: '2014',
      title: 'Rozpoczęcie pracy w Kancelarii Adwokackiej',
      description:
        'Pierwsze kroki w praktyce prawniczej jako pracownik Kancelarii Adwokackiej.'
    },
    {
      year: 'Studia prawnicze',
      title: 'Wydział Prawa i Administracji UMCS',
      description:
        'Ukończenie studiów na Wydziale Prawa i Administracji Uniwersytetu Marii Curie-Skłodowskiej w Lublinie.'
    }
  ];

  return (
    <main className="min-h-screen">
      <Navbar />

      <PageHero
        title="O Mnie"
        subtitle="Poznaj doświadczonego adwokata i doradcę restrukturyzacyjnego"
      />

      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative">
                <div className="absolute top-0 left-0 w-full h-full border-2 border-gold/20 transform translate-x-4 translate-y-4 hidden lg:block"></div>

                <div className="relative w-full h-[500px] lg:h-[650px] bg-white shadow-2xl overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gold"></div>

                  <div className="relative w-full h-full p-4 lg:p-8">
                    <div className="relative w-[85%] lg:w-[90%] mx-auto h-full">
                      <Image
                        src="/images/4.jpg"
                        alt="Karolina Kamińska"
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 90vw, 40vw"
                      />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white/80 to-transparent h-32"></div>
                </div>

                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="absolute -bottom-2 left-4 right-4 lg:left-8 lg:right-8 h-1 bg-gold origin-left"
                ></motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="text-sm uppercase tracking-[0.2em] text-gold font-semibold">
                  Adwokat & Doradca Restrukturyzacyjny
                </span>
                <h2 className="text-4xl md:text-5xl font-light text-dark mt-2 tracking-tight">
                  Karolina <span className="font-semibold">Kamińska</span>
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-4 text-base text-brighterDark leading-relaxed"
              >
                <p>
                  Absolwentka Wydziału Prawa i Administracji Uniwersytetu Marii
                  Curie-Skłodowskiej w Lublinie. Pracę w Kancelarii Adwokackiej
                  rozpoczęła w 2014 r. W latach 2015-2018 odbyła aplikację
                  adwokacką przy Okręgowej Radzie Adwokackiej w Lublinie, a
                  następnie uzyskała tytuł adwokata i założyła własną Kancelarię
                  Adwokacką w Lublinie.
                </p>
                <p>
                  W 2023 r. ukończyła studia podyplomowe na kierunku Prawo
                  upadłościowe i restrukturyzacyjne na Uniwersytecie Łazarskiego
                  w Warszawie oraz uzyskała licencję doradcy
                  restrukturyzacyjnego.
                </p>
                <p>
                  Jej celem jest oferowanie pomocy prawnej na najwyższym
                  poziomie. Posiada bogate doświadczenie w zakresie obsługi
                  klientów indywidualnych, jak i biznesowych, co pozwala jej na
                  prowadzenie nawet najbardziej skomplikowanych spraw.
                  Specjalizuje się w prawie cywilnym, gospodarczym i rodzinnym.
                  W Kancelarii zajmuje się świadczeniem pomocy prawnej jako
                  adwokat i doradca restrukturyzacyjny.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="relative border-l-2 border-gold pl-6 py-4 mt-8"
              >
                <p className="text-dark italic leading-relaxed font-light">
                  „Zapraszam do kontaktu i wspólnego znalezienia rozwiązania
                  Twoich problemów prawnych.”
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-primary overflow-hidden">
        <Image
          src="/images/backgroundDesktopLeft.png"
          alt=""
          fill
          className="absolute inset-0 object-cover pointer-events-none select-none hidden md:block opacity-40"
          priority
          quality={100}
        />
        <Image
          src="/images/backgroundMobileLeft.png"
          alt=""
          fill
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
              Nasze podstawy
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-dark mt-2 tracking-tight">
              Nasze <span className="font-semibold">wartości</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{ y: -8 }}
                  className="bg-white p-8 transition-all duration-300 hover:shadow-lg border-l-2 border-gold"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
                  >
                    <Icon
                      className="w-12 h-12 text-gold mb-6"
                      strokeWidth={2}
                    />
                  </motion.div>
                  <h3 className="text-xl md:text-2xl font-semibold text-dark mb-3">
                    {value.title}
                  </h3>
                  <p className="text-brighterDark leading-relaxed text-sm">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <span className="text-sm uppercase tracking-[0.2em] text-gold font-semibold">
              Moja droga
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-dark mt-2 tracking-tight">
              Doświadczenie <span className="font-semibold">zawodowe</span>
            </h2>
          </motion.div>

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: index * 0.2 }}
                className="flex gap-8"
              >
                <div className="shrink-0">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.1, delay: index * 0.2 + 0.2 }}
                    className="w-4 h-4 bg-gold mt-2"
                  />
                  {index < timeline.length - 1 && (
                    <motion.div
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.2 + 0.4 }}
                      className="w-0.5 h-full bg-gold/30 ml-1.5 mt-2 origin-top"
                    />
                  )}
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: index * 0.2 + 0.3 }}
                  className="pb-4"
                >
                  <p className="text-gold font-semibold text-sm uppercase tracking-wider mb-2">
                    {item.year}
                  </p>
                  <h3 className="text-2xl font-semibold text-dark mb-3">
                    {item.title}
                  </h3>
                  <p className="text-brighterDark leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  );
}
