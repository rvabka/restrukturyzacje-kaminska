'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Activity, BookOpen, Archive } from 'lucide-react';
import Image from 'next/image';

const Services = () => {
  const services = [
    {
      icon: Activity,
      title: 'Restrukturyzacja firm',
      href: '/uslugi/restrukturyzacja-firm'
    },
    {
      icon: BookOpen,
      title: 'Upadłość konsumencka',
      href: '/uslugi/upadlosc-konsumencka'
    },
    {
      icon: Archive,
      title: 'Upadłość gospodarcza',
      href: '/uslugi/upadlosc-gospodarcza'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section
      id="uslugi"
      className="relative pt-20 pb-10 bg-primary overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-primary to-transparent pointer-events-none z-20"></div>

      <Image
        src="/images/backgroundDesktopLeft.png"
        alt=""
        fill
        className="absolute inset-0 object-cover pointer-events-none select-none hidden md:block"
        priority
        quality={100}
        unoptimized
      />

      <Image
        src="/images/backgroundMobileLeft.png"
        alt=""
        fill
        className="absolute inset-0 object-cover pointer-events-none select-none md:hidden"
        priority
        quality={100}
        unoptimized
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-sm uppercase tracking-[0.2em] text-gold font-semibold">
            Oferta
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-dark mt-2 tracking-tight">
            W czym <span className="font-semibold">mogę pomóc</span>?
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="flex flex-wrap justify-center items-center gap-2 mb-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="w-full max-w-sm"
                >
                  <Link
                    href={service.href}
                    className="group flex flex-col items-center justify-center text-center h-[220px] md:h-[250px] rounded-lg transition-all duration-300 hover:bg-primary/60 border border-transparent hover:border-gold/60 px-3"
                  >
                    <Icon
                      className="w-12 h-12 md:w-16 md:h-16 text-gold mb-4 md:mb-6 transition-all duration-300"
                      strokeWidth={2}
                      style={{
                        filter: 'drop-shadow(1.5px 0 1px rgba(0, 0, 0, 0.8))'
                      }}
                    />
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-dark uppercase border-t-3 border-gold pt-3 md:pt-4 w-[280px] md:w-[300px]">
                      {service.title}
                    </h3>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none z-20"></div>
    </section>
  );
};

export default Services;
