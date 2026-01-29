'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from './Button';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-primary pt-20 overflow-hidden">
      <Image
        src="/images/backgroundDesktopRight.png"
        alt=""
        fill
        className="absolute inset-0 object-cover pointer-events-none select-none hidden md:block"
        priority
        quality={100}
        unoptimized
      />

      <Image
        src="/images/backgroundMobileRight.png"
        alt=""
        fill
        className="absolute inset-0 object-cover pointer-events-none select-none md:hidden"
        priority
        quality={100}
        unoptimized
      />

      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/30"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10 px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-block"
            >
              <span className="text-sm uppercase tracking-[0.2em] text-brighterDark font-semibold border-b-2 border-gold pb-1.5">
                Profesjonalna pomoc prawna
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl font-light text-dark leading-[1.2] tracking-tight"
            >
              <span className="font-semibold">Restrukturyzacje</span>{' '}
              <span className="block text-gold font-semibold mt-2">
                Karolina Kamińska
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg text-brighterDark leading-relaxed max-w-xl"
            >
              <span className="font-semibold text-dark">
                Kompleksowa obsługa prawna
              </span>{' '}
              w zakresie restrukturyzacji firm, upadłości konsumenckiej i
              gospodarczej. Wieloletnie doświadczenie i indywidualne podejście
              do każdego klienta.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button href="/kontakt" variant="primary" showArrow>
                Bezpłatna konsultacja
              </Button>
              <Button href="#uslugi" variant="outline">
                Poznaj usługi
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="relative border-l-2 border-gold pl-6 py-4 mt-8 max-w-xl"
            >
              <p className="text-dark/80 italic leading-relaxed text-base font-light">
                „Każdy kryzys finansowy ma swoje rozwiązanie. Kluczem jest
                profesjonalne podejście i determinacja.”
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
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
                      alt="Karolina Kamińska - Kancelaria Restrukturyzacyjna"
                      fill
                      className="object-cover object-top"
                      priority
                      quality={100}
                      sizes="(max-width: 768px) 90vw, 40vw"
                    />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white/80 to-transparent h-32 flex items-end p-6"></div>
              </div>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute -bottom-2 left-4 right-4 lg:left-8 lg:right-8 h-1 bg-gold origin-left"
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-primary pointer-events-none"></div>
    </section>
  );
};

export default Hero;
