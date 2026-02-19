'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface PageHeroProps {
  title: string;
  subtitle: string;
}

const PageHero = ({ title, subtitle }: PageHeroProps) => {
  return (
    <section className="relative min-h-[50vh] md:min-h-[65vh] flex items-center justify-center bg-primary pt-20 overflow-hidden">
      <Image
        src="/images/backgroundDesktopRight.png"
        alt=""
        fill
        sizes="100vw"
        className="absolute inset-0 object-cover pointer-events-none select-none hidden md:block"
        priority
        quality={100}
        unoptimized
      />
      <Image
        src="/images/backgroundMobileRight.png"
        alt=""
        fill
        sizes="100vw"
        className="absolute inset-0 object-cover pointer-events-none select-none md:hidden"
        priority
        quality={100}
        unoptimized
      />

      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-block relative">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold origin-left"
              ></motion.div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-dark tracking-tight uppercase pb-4">
                {title}
              </h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute -bottom-1 left-0 right-0 h-2 bg-gold/20 origin-right"
              ></motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="relative inline-block"
          >
            <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-6 h-0.5 bg-gold hidden md:block"></div>
            <p className="text-lg md:text-xl lg:text-2xl text-dark font-light max-w-3xl mx-auto leading-relaxed px-4">
              {subtitle}
            </p>
            <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-6 h-0.5 bg-gold hidden md:block"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 flex justify-center"
          >
            <div className="flex gap-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '3rem' }}
                transition={{ duration: 0.6, delay: 1 }}
                className="h-0.5 bg-gold"
              ></motion.div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '1.5rem' }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="h-0.5 bg-gold/60"
              ></motion.div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '0.75rem' }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="h-0.5 bg-gold/40"
              ></motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PageHero;
