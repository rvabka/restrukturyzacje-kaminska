'use client';

import { motion } from 'framer-motion';
import { FileText, Search, BookOpen, CheckCircle } from 'lucide-react';

const Process = () => {
  const steps = [
    {
      icon: FileText,
      number: '01',
      title: 'Konsultacja',
      description:
        'Pierwsze spotkanie i analiza Twojej sytuacji prawnej oraz finansowej.'
    },
    {
      icon: Search,
      number: '02',
      title: 'Analiza',
      description:
        'Szczegółowa analiza dokumentacji i opracowanie strategii działania.'
    },
    {
      icon: BookOpen,
      number: '03',
      title: 'Realizacja',
      description:
        'Prowadzenie postępowania restrukturyzacyjnego lub upadłościowego.'
    },
    {
      icon: CheckCircle,
      number: '04',
      title: 'Finalizacja',
      description: 'Zakończenie sprawy i pomoc w dalszym funkcjonowaniu.'
    }
  ];

  return (
    <section className="relative py-20 bg-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-sm uppercase tracking-[0.2em] text-gold font-semibold">
            Jak wygląda współpraca
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-dark mt-2 tracking-tight">
            <span className="font-semibold">Proces</span> restrukturyzacji
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative bg-primary p-8 transition-all duration-300 hover:shadow-lg border-l-2 border-gold"
              >
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <Icon className="w-12 h-12 text-gold" strokeWidth={2} />
                    <span className="text-5xl font-light text-gold/20">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-dark mb-3">
                    {step.title}
                  </h3>
                  <p className="text-brighterDark leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;
