'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const Map = () => {
  return (
    <section className="relative py-20 bg-white">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-sm uppercase tracking-[0.2em] text-gold font-semibold">
            Odwiedź nas
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-dark mt-2 tracking-tight">
            Sprawdź jak <span className="font-semibold">trafić</span> do
            kancelarii
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-2 border-gold/20 overflow-hidden shadow-2xl"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2396.593679220076!2d22.5534288!3d51.24854049999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4722571b76750339%3A0xe0e1f452cdafe8f9!2sAdwokat%20Karolina%20Kami%C5%84ska!5e1!3m2!1spl!2spl!4v1725449823844!5m2!1spl!2spl"
            width="100%"
            height="500"
            className="border-0"
            allowFullScreen
            loading="lazy"
            title="Lokalizacja kancelarii"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Map;
