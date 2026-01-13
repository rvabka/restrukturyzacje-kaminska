'use client';

import { motion } from 'framer-motion';
import Button from '@/components/Button';

interface CTASectionProps {
  label?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function CTASection({
  label = 'Skontaktuj się',
  title = 'Potrzebujesz pomocy?',
  description = 'Zapraszamy do kontaktu. Wspólnie przeanalizujemy Twoją sytuację i znajdziemy optymalne rozwiązanie prawne.',
  buttonText = 'Skontaktuj się',
  buttonHref = '/kontakt'
}: CTASectionProps) {
  return (
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
            {label}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-dark mt-4 mb-8 tracking-tight">
            {title.split(' ')[0]}{' '}
            <span className="font-semibold">
              {title.split(' ').slice(1).join(' ')}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-brighterDark leading-relaxed mb-12 max-w-2xl mx-auto">
            {description}
          </p>
          <Button
            href={buttonHref}
            variant="outline"
            showArrow
            className="text-base"
          >
            {buttonText}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
