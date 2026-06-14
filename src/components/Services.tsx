import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import {
  Activity,
  Move,
  HeartPulse,
  Sparkles,
  Droplet,
  Dumbbell,
  Compass,
  Apple,
  UserCheck,
  Stethoscope,
  Filter,
} from 'lucide-react';

export const Services: React.FC = () => {
  const { t, language, dir } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | 'neck-back' | 'sports' | 'accident' | 'work' | 'stress'>('all');

  const servicesData = [
    {
      id: 'pt',
      icon: Activity,
      titleKey: 'services.items.pt.title',
      descKey: 'services.items.pt.desc',
    },
    {
      id: 'stretch',
      icon: Move,
      titleKey: 'services.items.stretch.title',
      descKey: 'services.items.stretch.desc',
    },
    {
      id: 'massage',
      icon: HeartPulse,
      titleKey: 'services.items.massage.title',
      descKey: 'services.items.massage.desc',
    },
    {
      id: 'relax',
      icon: Sparkles,
      titleKey: 'services.items.relax.title',
      descKey: 'services.items.relax.desc',
    },
    {
      id: 'lymphatic',
      icon: Droplet,
      titleKey: 'services.items.lymphatic.title',
      descKey: 'services.items.lymphatic.desc',
    },
    {
      id: 'sports',
      icon: Dumbbell,
      titleKey: 'services.items.sports.title',
      descKey: 'services.items.sports.desc',
    },
    {
      id: 'exercise',
      icon: Compass,
      titleKey: 'services.items.exercise.title',
      descKey: 'services.items.exercise.desc',
    },
    {
      id: 'nutrition',
      icon: Apple,
      titleKey: 'services.items.nutrition.title',
      descKey: 'services.items.nutrition.desc',
    },
    {
      id: 'coaching',
      icon: UserCheck,
      titleKey: 'services.items.coaching.title',
      descKey: 'services.items.coaching.desc',
    },
  ];

  const filters = [
    { id: 'all', name: language === 'ar' ? 'جميع الخدمات' : language === 'ru' ? 'Все услуги' : 'All Services' },
    { id: 'neck-back', name: language === 'ar' ? 'آلام الرقبة والظهر' : language === 'ru' ? 'Боль в шее/спине' : 'Neck & Back Pain' },
    { id: 'sports', name: language === 'ar' ? 'الإصابات الرياضية' : language === 'ru' ? 'Спортивные травмы' : 'Sports Injuries' },
    { id: 'accident', name: language === 'ar' ? 'حوادث السيارات' : language === 'ru' ? 'После ДТП' : 'Accident Recovery' },
    { id: 'work', name: language === 'ar' ? 'إصابات العمل' : language === 'ru' ? 'Рабочие травмы' : 'Work Strain' },
    { id: 'stress', name: language === 'ar' ? 'التعب والإرهاق' : language === 'ru' ? 'Стресс и усталость' : 'Stress & Fatigue' },
  ] as const;

  const serviceMappings: Record<string, string[]> = {
    'neck-back': ['pt', 'stretch', 'massage', 'exercise'],
    'sports': ['pt', 'stretch', 'sports', 'exercise'],
    'accident': ['pt', 'stretch', 'massage', 'lymphatic'],
    'work': ['pt', 'stretch', 'massage', 'exercise', 'coaching'],
    'stress': ['relax', 'lymphatic', 'nutrition', 'coaching'],
  };

  const isHighlighted = (serviceId: string) => {
    if (activeFilter === 'all') return true;
    return serviceMappings[activeFilter]?.includes(serviceId);
  };

  const matchCount = useMemo(() => {
    if (activeFilter === 'all') return servicesData.length;
    return servicesData.filter((s) => serviceMappings[activeFilter]?.includes(s.id)).length;
  }, [activeFilter]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 80, damping: 18 },
    },
  };

  return (
    <section id="services" className="py-20 sm:py-28 relative overflow-hidden bg-white dark:bg-bg-dark">
      {/* Subtle background accents */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

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
            <Stethoscope className="w-3.5 h-3.5" />
            {language === 'ar' ? 'ماذا نقدم' : language === 'ru' ? 'Наши Услуги' : 'Expertise & Care'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mt-4 text-slate-900 dark:text-white">
            {t('services.title')}
          </h2>
          <p className="text-base text-text-muted-light dark:text-text-muted-dark mt-4 leading-relaxed">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Premium Symptom Filter Bar */}
        <motion.div
          className="flex flex-col items-center gap-4 mb-16"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto p-2.5 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-sm">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id as typeof activeFilter)}
                  className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20 scale-[1.03]'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white hover:shadow-sm'
                  }`}
                >
                  {/* Active glow ring */}
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-accent/10 blur-md pointer-events-none" />
                  )}
                  <span className="relative">{filter.name}</span>
                </button>
              );
            })}
          </div>

          {/* Match counter */}
          <div className="flex items-center gap-2 text-xs font-bold text-text-muted-light dark:text-text-muted-dark">
            <Filter className="w-3.5 h-3.5 text-accent" />
            <span>
              {language === 'ar'
                ? `${matchCount} خدمات مطابقة`
                : language === 'ru'
                ? `${matchCount} подходящих услуг`
                : `${matchCount} matching service${matchCount !== 1 ? 's' : ''}`}
            </span>
          </div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {servicesData.map((service) => {
            const highlighted = isHighlighted(service.id);
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className={`premium-card p-7 sm:p-8 flex flex-col group relative overflow-hidden transition-all duration-500 ease-out ${
                  highlighted
                    ? 'opacity-100 scale-100'
                    : 'opacity-40 scale-[0.97]'
                } ${highlighted && activeFilter !== 'all' ? 'ring-1 ring-accent/30 shadow-lg shadow-accent/5' : ''}`}
              >
                {/* Gradient top border accent line */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent via-secondary to-primary opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Icon */}
                <div className="icon-box w-fit mb-5">
                  <IconComponent className="w-6 h-6" />
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mb-2.5 group-hover:text-accent transition-colors duration-300">
                  {t(service.titleKey)}
                </h3>

                {/* Description */}
                <p className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark leading-relaxed flex-grow">
                  {t(service.descKey)}
                </p>

                {/* CTA link */}
                <a
                  href="#booking"
                  className="mt-6 inline-flex items-center gap-1.5 text-xs font-black text-accent group-hover:text-primary dark:group-hover:text-secondary transition-colors duration-300"
                >
                  <span>{language === 'ar' ? 'احجز الآن' : language === 'ru' ? 'Забронировать' : 'Book Session'}</span>
                  <span className={`text-sm transition-transform duration-300 ${dir === 'rtl' ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`}>→</span>
                </a>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};
