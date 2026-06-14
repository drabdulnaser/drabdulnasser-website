import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 80, damping: 18 },
  },
};

export const Testimonials: React.FC = () => {
  const { t, language } = useLanguage();

  const testimonials = t('testimonials.list') as { name: string; role: string; text: string }[];

  return (
    <section id="testimonials" className="py-20 sm:py-28 relative overflow-hidden bg-white dark:bg-bg-dark">
      {/* Subtle background accents */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-80 h-80 bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

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
            {language === 'ar' ? 'نتائج واقعية' : language === 'ru' ? 'ОТЗЫВЫ ПАЦИЕНТОВ' : 'TESTIMONIALS'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mt-4 text-slate-900 dark:text-white">
            {t('testimonials.title')}
          </h2>
          <p className="text-base text-text-muted-light dark:text-text-muted-dark mt-4 leading-relaxed">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {testimonials.map((test, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="premium-card p-8 flex flex-col justify-between relative group"
            >
              {/* Large decorative quotation mark SVG */}
              <svg
                className="absolute top-6 right-6 w-20 h-20 text-slate-900 dark:text-white opacity-[0.04] pointer-events-none group-hover:opacity-[0.07] transition-opacity duration-500"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
              </svg>

              <div className="space-y-5 relative z-10">
                {/* 5 Stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark leading-relaxed italic">
                  &ldquo;{test.text}&rdquo;
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="flex items-center gap-3 pt-6 border-t border-border-light dark:border-border-dark mt-6">
                {/* Avatar */}
                <div className="icon-box !p-0 w-10 h-10 flex items-center justify-center shrink-0">
                  <span className="text-sm font-black text-accent uppercase">
                    {test.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white">
                    {test.name}
                  </h4>
                  <p className="text-[10px] font-black text-accent uppercase tracking-wider">
                    {test.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
