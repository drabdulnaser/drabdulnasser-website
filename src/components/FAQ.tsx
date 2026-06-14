import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Plus, Minus } from 'lucide-react';

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 80, damping: 18 },
  },
};

export const FAQ: React.FC = () => {
  const { t, language, dir } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = t('faq.items') as { q: string; a: string }[];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 relative overflow-hidden bg-surface-light dark:bg-surface-dark">
      {/* Subtle background accent */}
      <div className="absolute top-[20%] left-[-10%] w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.12em] bg-accent/10 text-accent border border-accent/20">
            <HelpCircle className="w-3.5 h-3.5" />
            {language === 'ar' ? 'الأسئلة الشائعة' : language === 'ru' ? 'ЧАСТЫЕ ВОПРОСЫ' : 'FAQ'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mt-4 text-slate-900 dark:text-white">
            {t('faq.title')}
          </h2>
          <p className="text-base text-text-muted-light dark:text-text-muted-dark mt-4 leading-relaxed">
            {t('faq.subtitle')}
          </p>
        </motion.div>

        {/* Accordion Stack */}
        <motion.div
          className="space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className={`rounded-2xl border overflow-hidden transition-all duration-400 ${
                  isOpen
                    ? 'border-accent/40 shadow-[0_0_20px_rgba(0,194,168,0.1)]'
                    : 'border-border-light dark:border-border-dark shadow-sm hover:shadow-md'
                } bg-white dark:bg-bg-dark`}
              >
                {/* Header Toggle */}
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`icon-box !p-2 shrink-0 transition-all duration-300 ${
                      isOpen ? '!bg-accent/15 !border-accent/30' : ''
                    }`}>
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <span className={`text-sm sm:text-base font-bold transition-colors duration-200 ${
                      dir === 'rtl' ? 'text-right' : 'text-left'
                    } ${
                      isOpen
                        ? 'text-accent'
                        : 'text-slate-800 dark:text-slate-200 group-hover:text-accent'
                    }`}>
                      {item.q}
                    </span>
                  </div>

                  {/* Plus / Minus icon with smooth rotation */}
                  <div className={`shrink-0 p-1.5 rounded-lg transition-all duration-300 ${
                    isOpen
                      ? 'bg-accent/10 text-accent rotate-180'
                      : 'bg-slate-100 dark:bg-slate-800 text-text-muted-light dark:text-text-muted-dark rotate-0'
                  }`}>
                    {isOpen ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {/* Animated Answer Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2">
                        <div className={dir === 'rtl' ? 'pr-11' : 'pl-11'}>
                          <p className={`text-sm font-medium text-text-muted-light dark:text-text-muted-dark leading-relaxed ${
                            dir === 'rtl' ? 'text-right' : 'text-left'
                          }`}>
                            {item.a}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
