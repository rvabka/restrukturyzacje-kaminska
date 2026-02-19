'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, Plus, Minus } from 'lucide-react';
import Image from 'next/image';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Czym jest restrukturyzacja firmy?',
      answer:
        'Restrukturyzacja to proces prawny, który ma na celu uzdrowienie finansów przedsiębiorstwa i uniknięcie upadłości. Pozwala na spłatę zadłużenia na korzystniejszych warunkach oraz kontynuację działalności gospodarczej.'
    },
    {
      question: 'Kto może ubiegać się o upadłość konsumencką?',
      answer:
        'Upadłość konsumencką może ogłosić osoba fizyczna nieprowadząca działalności gospodarczej, która jest niewypłacalna i nie jest w stanie spłacić swoich długów. Postępowanie to prowadzi do oddłużenia osoby fizycznej.'
    },
    {
      question: 'Jak długo trwa proces restrukturyzacji?',
      answer:
        'Czas trwania procesu restrukturyzacji zależy od wybranego trybu i złożoności sprawy. Zazwyczaj proces trwa od kilku miesięcy do około 2 lat. Wszystko zależy od indywidualnej sytuacji przedsiębiorstwa.'
    },
    {
      question: 'Czy podczas restrukturyzacji mogę prowadzić działalność?',
      answer:
        'Tak, główną zaletą restrukturyzacji jest możliwość kontynuowania działalności gospodarczej. Przedsiębiorca może normalnie funkcjonować na rynku pod nadzorem nadzorcy sądowego.'
    },
    {
      question: 'Ile kosztuje pomoc prawna w restrukturyzacji?',
      answer:
        'Koszt pomocy prawnej jest ustalany indywidualnie po analizie sprawy. Zależy od jej złożoności, wartości zobowiązań oraz wybranego trybu postępowania. Oferujemy bezpłatną konsultację wstępną.'
    },
    {
      question: 'Czy mogę uniknąć upadłości?',
      answer:
        'Tak, restrukturyzacja to właśnie narzędzie, które ma pomóc uniknąć upadłości. Wczesne podjęcie działań znacznie zwiększa szanse na uzdrowienie finansów firmy i kontynuację działalności.'
    }
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center py-20 px-4 bg-primary overflow-hidden">
      <Image
        src="/images/backgroundDesktopLeft.png"
        alt=""
        fill
        sizes="100vw"
        className="absolute inset-0 object-cover pointer-events-none select-none hidden md:block opacity-40"
        priority
        quality={100}
      />

      <Image
        src="/images/backgroundMobileLeft.png"
        alt=""
        fill
        sizes="100vw"
        className="absolute inset-0 object-cover pointer-events-none select-none md:hidden opacity-40"
        priority
        quality={100}
      />

      <div className="max-w-4xl mx-auto relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-sm uppercase tracking-[0.2em] text-gold font-semibold">
            Masz pytania?
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-dark mt-2 tracking-tight">
            <span className="font-semibold">Najczęściej</span> zadawane pytania
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white backdrop-blur-sm border-l-4 border-gold overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left transition-colors duration-200 group"
              >
                <h3 className="text-lg font-semibold text-dark pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0 w-8 h-8 bg-gold/10 group-hover:bg-gold flex items-center justify-center transition-colors duration-200">
                  {openIndex === index ? (
                    <Minus
                      className="w-5 h-5 text-gold group-hover:text-white transition-colors duration-200"
                      strokeWidth={2}
                    />
                  ) : (
                    <Plus
                      className="w-5 h-5 text-gold group-hover:text-white transition-colors duration-200"
                      strokeWidth={2}
                    />
                  )}
                </div>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 text-brighterDark leading-relaxed border-t border-gold/10">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
