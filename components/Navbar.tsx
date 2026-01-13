'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { name: 'Restrukturyzacja firm', href: '/uslugi/restrukturyzacja-firm' },
    { name: 'Upadłość konsumencka', href: '/uslugi/upadlosc-konsumencka' },
    { name: 'Upadłość gospodarcza', href: '/uslugi/upadlosc-gospodarcza' }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/logo.webp"
              alt="Karolina Kamińska Logo"
              width={100}
              height={100}
              quality={100}
              className="object-contain"
            />
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className="text-dark hover:text-gold transition-colors duration-200 font-medium text-[15px]"
            >
              Strona Główna
            </Link>

            <div
              className="relative group"
              onMouseEnter={() => setIsServicesDropdownOpen(true)}
              onMouseLeave={() => setIsServicesDropdownOpen(false)}
            >
              <button className="text-dark hover:text-gold transition-colors duration-200 font-medium flex items-center gap-1 text-[15px]">
                Usługi
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isServicesDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {isServicesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white border border-gold/20 rounded-lg shadow-xl overflow-hidden"
                  >
                    {services.map((service, index) => (
                      <Link
                        key={index}
                        href={service.href}
                        className="block px-4 py-3 text-dark hover:bg-gold/10 hover:text-gold transition-colors duration-200 border-b border-gold/10 last:border-b-0 text-[14px]"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/o-mnie"
              className="text-dark hover:text-gold transition-colors duration-200 font-medium text-[15px]"
            >
              O mnie
            </Link>
            <Link
              href="/"
              className="text-dark hover:text-gold transition-colors duration-200 font-medium text-[15px]"
            >
              Aktualności
            </Link>
            <Link
              href="/sprzedaz"
              className="text-dark hover:text-gold transition-colors duration-200 font-medium text-[15px]"
            >
              Sprzedaż
            </Link>

            <Link
              href="/kontakt"
              className="relative px-6 py-2.5 text-[15px] font-semibold text-dark border-2 border-gold overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gold transition-transform duration-300 transform translate-y-full group-hover:translate-y-0"></span>
              <span className="relative z-10 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Kontakt
              </span>
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-dark hover:text-gold transition-colors duration-200"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gold/20"
          >
            <div className="px-4 py-6 space-y-4">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-dark hover:text-gold transition-colors duration-200 font-medium py-2"
              >
                Strona Główna
              </Link>

              <div>
                <button
                  onClick={() =>
                    setIsServicesDropdownOpen(!isServicesDropdownOpen)
                  }
                  className="flex items-center justify-between w-full text-dark hover:text-gold transition-colors duration-200 font-medium py-2"
                >
                  Usługi
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isServicesDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isServicesDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 space-y-2 mt-2"
                    >
                      {services.map((service, index) => (
                        <Link
                          key={index}
                          href={service.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-dark/70 hover:text-gold transition-colors duration-200 py-2 text-sm"
                        >
                          {service.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/o-mnie"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-dark hover:text-gold transition-colors duration-200 font-medium py-2"
              >
                O mnie
              </Link>
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-dark hover:text-gold transition-colors duration-200 font-medium py-2"
              >
                Aktualności
              </Link>
              <Link
                href="/sprzedaz"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-dark hover:text-gold transition-colors duration-200 font-medium py-2"
              >
                Sprzedaż
              </Link>
              <Link
                href="/kontakt"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-gold text-dark px-6 py-3 text-center font-semibold hover:bg-gold/90 transition-colors duration-200 mt-4 border-2 border-gold"
              >
                <Phone className="w-4 h-4" />
                Kontakt
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
