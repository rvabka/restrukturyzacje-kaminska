'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Check if link is active
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
        setIsServicesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const services = [
    { name: 'Restrukturyzacja firm', href: '/uslugi/restrukturyzacja-firm' },
    { name: 'Upadłość konsumencka', href: '/uslugi/upadlosc-konsumencka' },
    { name: 'Upadłość gospodarcza', href: '/uslugi/upadlosc-gospodarcza' }
  ];

  return (
    <>
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
                className={`relative hover:text-gold transition-colors duration-200 text-[15px] py-1 ${
                  isActive('/')
                    ? 'text-dark font-semibold'
                    : 'text-dark font-medium'
                }`}
              >
                Strona Główna
                {isActive('/') && (
                  <motion.span
                    layoutId="activeLink"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gold rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>

              <div
                className="relative group"
                onMouseEnter={() => setIsServicesDropdownOpen(true)}
                onMouseLeave={() => setIsServicesDropdownOpen(false)}
              >
                <button
                  className={`relative hover:text-gold transition-colors duration-200 flex items-center gap-1 text-[15px] py-1 ${
                    isActive('/uslugi')
                      ? 'text-dark font-semibold'
                      : 'text-dark font-medium'
                  }`}
                >
                  Usługi
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isServicesDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                  {isActive('/uslugi') && (
                    <motion.span
                      layoutId="activeLink"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gold rounded-full"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30
                      }}
                    />
                  )}
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
                className={`relative hover:text-gold transition-colors duration-200 text-[15px] py-1 ${
                  isActive('/o-mnie')
                    ? 'text-dark font-semibold'
                    : 'text-dark font-medium'
                }`}
              >
                O mnie
                {isActive('/o-mnie') && (
                  <motion.span
                    layoutId="activeLink"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gold rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
              <Link
                href="/aktualnosci"
                className={`relative hover:text-gold transition-colors duration-200 text-[15px] py-1 ${
                  isActive('/aktualnosci')
                    ? 'text-dark font-semibold'
                    : 'text-dark font-medium'
                }`}
              >
                Aktualności
                {isActive('/aktualnosci') && (
                  <motion.span
                    layoutId="activeLink"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gold rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
              <Link
                href="/sprzedaz"
                className={`relative hover:text-gold transition-colors duration-200 text-[15px] py-1 ${
                  isActive('/sprzedaz')
                    ? 'text-dark font-semibold'
                    : 'text-dark font-medium'
                }`}
              >
                Sprzedaż
                {isActive('/sprzedaz') && (
                  <motion.span
                    layoutId="activeLink"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gold rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>

              <Link
                href="/kontakt"
                className="relative px-6 py-2.5 text-[15px] font-semibold text-dark border-2 border-gold overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gold transition-transform duration-300 transform translate-y-full group-hover:translate-y-0"></span>
                <span className="relative z-10 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Bezpłatna konsultacja
                </span>
              </Link>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-dark hover:text-gold transition-colors duration-200 z-[80] relative"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Outside nav for proper stacking */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 bg-black/50 z-[60]"
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsServicesDropdownOpen(false);
            }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu - Slide from Right */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="lg:hidden fixed top-0 right-0 bottom-0 w-[280px] sm:w-[320px] bg-white shadow-2xl z-[70] overflow-y-auto"
          >
            <div className="flex items-center justify-between p-4 border-b border-gold/20">
              <span className="text-lg font-semibold text-dark">Menu</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-dark hover:text-gold transition-colors duration-200 p-2"
                aria-label="Zamknij menu"
              >
                <X size={24} />
              </button>
            </div>

            <div className="px-4 py-6 space-y-4">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-2 transition-colors duration-200 ${
                  isActive('/')
                    ? 'text-dark font-semibold border-l-[3px] border-gold pl-3 bg-gold/10'
                    : 'text-dark font-medium hover:text-gold'
                }`}
              >
                Strona Główna
              </Link>

              <div>
                <button
                  onClick={() =>
                    setIsServicesDropdownOpen(!isServicesDropdownOpen)
                  }
                  className={`flex items-center justify-between w-full py-2 transition-colors duration-200 ${
                    isActive('/uslugi')
                      ? 'text-dark font-semibold border-l-[3px] border-gold pl-3 bg-gold/10'
                      : 'text-dark font-medium hover:text-gold'
                  }`}
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
                className={`block py-2 transition-colors duration-200 ${
                  isActive('/o-mnie')
                    ? 'text-dark font-semibold border-l-[3px] border-gold pl-3 bg-gold/10'
                    : 'text-dark font-medium hover:text-gold'
                }`}
              >
                O mnie
              </Link>
              <Link
                href="/aktualnosci"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-2 transition-colors duration-200 ${
                  isActive('/aktualnosci')
                    ? 'text-dark font-semibold border-l-[3px] border-gold pl-3 bg-gold/10'
                    : 'text-dark font-medium hover:text-gold'
                }`}
              >
                Aktualności
              </Link>
              <Link
                href="/sprzedaz"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-2 transition-colors duration-200 ${
                  isActive('/sprzedaz')
                    ? 'text-dark font-semibold border-l-[3px] border-gold pl-3 bg-gold/10'
                    : 'text-dark font-medium hover:text-gold'
                }`}
              >
                Sprzedaż
              </Link>
              <Link
                href="/kontakt"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-gold text-dark px-6 py-3 text-center font-semibold hover:bg-gold/90 transition-colors duration-200 mt-4 border-2 border-gold"
              >
                <Phone className="w-4 h-4" />
                Bezpłatna konsultacja
              </Link>

              {/* Phone number in mobile menu */}
              <a
                href="tel:+48123456789"
                className="flex items-center justify-center gap-2 text-dark hover:text-gold transition-colors duration-200 font-medium py-3 border-t border-gold/20 mt-6"
              >
                <Phone className="w-5 h-5" />
                +48 123 456 789
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
