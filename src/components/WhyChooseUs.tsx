import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import {
  Globe2,
  BookOpenCheck,
  TrendingUp,
  Fingerprint,
  Shuffle,
  Home,
  Laptop,
  Star
} from 'lucide-react';

const cardVariant = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 80, damping: 18 }
  }
};

export const WhyChooseUs: React.FC = () => {
  const { t, language } = useLanguage();

  const iconComponents = [
    <Globe2 className="w-5 h-5" />,
    <BookOpenCheck className="w-5 h-5" />,
    <TrendingUp className="w-5 h-5" />,
    <Fingerprint className="w-5 h-5" />,
    <Shuffle className="w-5 h-5" />,
    <Home className="w-5 h-5" />,
    <Laptop className="w-5 h-5" />
  ];

  const items = t('whyChooseUs.items') as { title: string; desc: string }[];

  return (
    <section id="why-us" className="py-20 sm:py-28 relative overflow-hidden bg-white dark:bg-bg-dark">
      {/* Subtle background accent */}
      <div className="absolute top-[-10%] right-[-8%] w-[30%] h-[40%] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.12em] bg-accent/10 text-accent border border-accent/20">
            <Star className="w-3.5 h-3.5" />
            {language === 'ar' ? 'لماذا الدكتور عبد الناصر' : language === 'ru' ? 'Наши Преимущества' : 'Why Us'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mt-4 text-slate-900 dark:text-white">
            {t('whyChooseUs.title')}
          </h2>
          <p className="text-base text-text-muted-light dark:text-text-muted-dark mt-4 leading-relaxed">
            {t('whyChooseUs.subtitle')}
          </p>
        </motion.div>

        {/* Advantages Grid — 3 cols desktop, 2 tablet, 1 mobile */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } }
          }}
        >
          {items.map((item, idx) => {
            const isLast = items.length % 3 !== 0 && idx === items.length - 1;
            return (
              <motion.div
                key={idx}
                variants={cardVariant}
                className={`premium-card p-6 sm:p-8 group ${
                  isLast ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Icon */}
                <div className="icon-box w-fit mb-5">
                  {iconComponents[idx] || <Globe2 className="w-5 h-5" />}
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
