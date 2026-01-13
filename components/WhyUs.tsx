'use client';

import { motion } from 'framer-motion';
import { Shield, Users, Award, Clock } from 'lucide-react';
import Blur from './Blur';

const WhyUs = () => {
  const benefits = [
    {
      icon: Shield,
      title: 'Doświadczenie',
      description:
        'Ponad 15 lat praktyki w prawie restrukturyzacyjnym i upadłościowym.'
    },
    {
      icon: Users,
      title: 'Indywidualne podejście',
      description:
        'Każdy klient otrzymuje spersonalizowaną strategię działania dopasowaną do jego sytuacji.'
    },
    {
      icon: Award,
      title: 'Profesjonalizm',
      description:
        'Najwyższa jakość obsługi prawnej potwierdzona setkami zadowolonych klientów.'
    },
    {
      icon: Clock,
      title: 'Szybka reakcja',
      description:
        'Sprawne działanie i terminowa realizacja wszystkich zobowiązań.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-sm uppercase tracking-[0.2em] text-gold font-semibold">
            Zalety współpracy
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-dark mt-2 tracking-tight">
            Dlaczego <span className="font-semibold">warto</span>?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-primary/50 p-8 transition-all duration-300 hover:bg-primary border border-transparent hover:border-gold/20"
              >
                <div className="flex flex-col items-center text-center">
                  <Icon
                    className="w-16 h-16 text-gold mb-6 transition-transform duration-300 group-hover:scale-110"
                    strokeWidth={2}
                    style={{
                      filter: 'drop-shadow(1.5px 0 1px rgba(0, 0, 0, 0.8))'
                    }}
                  />
                  <h3 className="text-xl md:text-2xl font-light text-dark uppercase border-t-3 border-gold pt-4 mb-4 w-full">
                    {benefit.title}
                  </h3>
                  <p className="text-brighterDark leading-relaxed text-sm">
                    {benefit.description}
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

export default WhyUs;
