import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ShieldAlert, HelpCircle, MapPin } from 'lucide-react';

type Hotspot = 'neck' | 'back' | 'shoulder' | 'hip' | 'knee' | 'ankle';

export const InteractiveBodyMap: React.FC = () => {
  const { t, language, dir } = useLanguage();
  const [selectedArea, setSelectedArea] = useState<Hotspot | null>(null);

  const hotspots: Record<Hotspot, { name: string; top: string; left: string; descKey: string }> = {
    neck: {
      name: language === 'ar' ? 'الرقبة والكتف العلوي' : language === 'ru' ? 'Шея и плечевой пояс' : 'Neck & Upper Shoulder',
      top: '18%',
      left: '50%',
      descKey: 'bodyMap.neck',
    },
    shoulder: {
      name: language === 'ar' ? 'الكتف والذراعين' : language === 'ru' ? 'Плечи и руки' : 'Shoulders & Arms',
      top: '25%',
      left: '35%',
      descKey: 'bodyMap.shoulder',
    },
    back: {
      name: language === 'ar' ? 'العمود الفقري والظهر' : language === 'ru' ? 'Спина и позвоночник' : 'Spine & Back',
      top: '35%',
      left: '50%',
      descKey: 'bodyMap.back',
    },
    hip: {
      name: language === 'ar' ? 'الحوض والورك' : language === 'ru' ? 'Таз и бедра' : 'Pelvis & Hips',
      top: '48%',
      left: '50%',
      descKey: 'bodyMap.hip',
    },
    knee: {
      name: language === 'ar' ? 'الركبة' : language === 'ru' ? 'Колени' : 'Knees',
      top: '68%',
      left: '46%',
      descKey: 'bodyMap.knee',
    },
    ankle: {
      name: language === 'ar' ? 'الكاحل والقدم' : language === 'ru' ? 'Голеностоп и стопы' : 'Ankles & Feet',
      top: '88%',
      left: '46%',
      descKey: 'bodyMap.ankle',
    },
  };

  const getAreaTitle = (area: Hotspot) => hotspots[area].name;
  const getAreaDesc = (area: Hotspot) => t(hotspots[area].descKey);

  return (
    <section id="conditions" className="py-20 sm:py-28 relative overflow-hidden bg-white dark:bg-bg-dark">
      {/* Subtle background accent */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

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
            <MapPin className="w-3.5 h-3.5" />
            {language === 'ar' ? 'التشخيص والعلاج' : language === 'ru' ? 'Диагностика и Лечение' : 'Diagnosis & Relief'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mt-4 text-slate-900 dark:text-white">
            {t('bodyMap.title')}
          </h2>
          <p className="text-base text-text-muted-light dark:text-text-muted-dark mt-4 leading-relaxed">
            {t('bodyMap.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left: The Body Visualization Container */}
          <motion.div
            className="lg:col-span-5 flex justify-center items-center premium-card !rounded-3xl p-6 sm:p-8 relative h-[520px] sm:h-[560px] overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Top gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.03] via-transparent to-secondary/[0.03] pointer-events-none rounded-3xl" />

            {/* SVG Human Body Outline */}
            <div className="relative w-[260px] sm:w-[280px] h-[460px] sm:h-[500px]">
              <svg
                className="w-full h-full text-slate-200 dark:text-slate-800 transition-colors"
                viewBox="0 0 200 500"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                {/* Head */}
                <path d="M100 30 C110 30, 115 40, 115 50 C115 62, 108 70, 100 70 C92 70, 85 62, 85 50 C85 40, 90 30, 100 30 Z" />
                {/* Neck */}
                <path d="M96 70 L96 82 M104 70 L104 82" />
                {/* Shoulders */}
                <path d="M96 82 L70 95 C62 99, 58 108, 56 120 L48 200 C46 215, 58 220, 60 205 L66 140" />
                <path d="M104 82 L130 95 C138 99, 142 108, 144 120 L152 200 C154 215, 142 220, 140 205 L134 140" />
                {/* Chest & Torso */}
                <path d="M70 95 L130 95 L125 210 L75 210 Z" />
                {/* Spine representation */}
                <path d="M100 82 L100 210" strokeDasharray="3,3" className="text-accent/20" />
                {/* Pelvis */}
                <path d="M75 210 L125 210 L120 250 L80 250 Z" />
                {/* Legs Left */}
                <path d="M80 250 L85 360 L90 470 C91 480, 80 482, 75 480" />
                {/* Legs Right */}
                <path d="M120 250 L115 360 L110 470 C109 480, 120 482, 125 480" />
                {/* Joint Markers */}
                <circle cx="100" cy="95" r="4" className="fill-current text-slate-300 dark:text-slate-700" />
                <circle cx="70" cy="100" r="3" className="fill-current text-slate-300 dark:text-slate-700" />
                <circle cx="130" cy="100" r="3" className="fill-current text-slate-300 dark:text-slate-700" />
                <circle cx="85" cy="360" r="4" className="fill-current text-slate-300 dark:text-slate-700" />
                <circle cx="115" cy="360" r="4" className="fill-current text-slate-300 dark:text-slate-700" />
              </svg>

              {/* Hotspot buttons with pulsing glow */}
              {Object.entries(hotspots).map(([key, spot]) => {
                const isSelected = selectedArea === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedArea(isSelected ? null : (key as Hotspot))}
                    className="absolute z-20 group -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer"
                    style={{ top: spot.top, left: spot.left }}
                    aria-label={spot.name}
                  >
                    {/* Outer pulsing glow ring — idle animation */}
                    <span
                      className={`absolute rounded-full transition-all duration-500 ${
                        isSelected
                          ? 'h-10 w-10 bg-accent/20'
                          : 'h-7 w-7 bg-accent/15 animate-ping'
                      }`}
                      style={{ animationDuration: isSelected ? '0s' : '2.5s' }}
                    />

                    {/* Middle ring glow */}
                    <span
                      className={`absolute rounded-full transition-all duration-300 ${
                        isSelected
                          ? 'h-8 w-8 bg-accent/25 shadow-lg shadow-accent/30'
                          : 'h-6 w-6 bg-accent/10 group-hover:bg-accent/20'
                      }`}
                    />

                    {/* Hotspot center dot */}
                    <span
                      className={`relative inline-flex rounded-full shadow-md border-2 border-white dark:border-slate-900 transition-all duration-300 ${
                        isSelected
                          ? 'h-5 w-5 bg-accent shadow-accent/40'
                          : 'h-3.5 w-3.5 bg-accent/70 group-hover:bg-accent group-hover:scale-125'
                      }`}
                    />

                    {/* Tooltip on hover */}
                    <span className="pointer-events-none absolute -top-8 scale-0 group-hover:scale-100 transition-all duration-200 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black px-2.5 py-1 rounded-lg shadow-md whitespace-nowrap z-30">
                      {spot.name}
                      <span className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-900 dark:border-t-white" />
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Right Panel: Info Display */}
          <div className="lg:col-span-7 space-y-6">
            <AnimatePresence mode="wait">
              {selectedArea ? (
                <motion.div
                  key={selectedArea}
                  initial={{ opacity: 0, x: dir === 'rtl' ? -30 : 30, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: dir === 'rtl' ? 20 : -20, scale: 0.98 }}
                  transition={{ type: 'spring' as const, stiffness: 80, damping: 18 }}
                  className="glass-panel p-7 sm:p-9 rounded-3xl"
                >
                  {/* Header */}
                  <div className="flex items-center gap-3.5 mb-5">
                    <div className="icon-box">
                      <Activity className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                      {getAreaTitle(selectedArea)}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base font-medium text-text-muted-light dark:text-text-muted-dark leading-relaxed mb-6">
                    {getAreaDesc(selectedArea)}
                  </p>

                  {/* Expert note */}
                  <div className="p-4 rounded-2xl bg-accent/5 border border-accent/10 flex gap-3">
                    <ShieldAlert className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 leading-relaxed">
                      {language === 'ar'
                        ? 'يركز الدكتور عبد الناصر على تقييم مدى حركتك لتحديد السبب الحقيقي للألم وعلاجه بفعالية.'
                        : language === 'ru'
                        ? 'Доктор Абдул Насер сфокусируется на оценке вашей подвижности для выявления истинной причины боли.'
                        : 'Dr. Abdul Nasser focuses on assessing your mobility to identify the root cause of pain and treat it.'}
                    </span>
                  </div>

                  {/* Action buttons */}
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href="#booking"
                      className="btn-shine px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-black text-sm shadow-lg shadow-primary/15 hover:shadow-xl hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      {t('hero.ctaBook')}
                    </a>
                    <button
                      onClick={() => setSelectedArea(null)}
                      className="px-6 py-2.5 bg-surface-light hover:bg-slate-100 dark:bg-surface-dark dark:hover:bg-slate-800 text-slate-700 dark:text-white rounded-full font-black text-sm border border-border-light dark:border-border-dark transition-all"
                    >
                      {language === 'ar' ? 'عرض جميع الحالات' : language === 'ru' ? 'Показать все' : 'Show All Conditions'}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="general"
                  initial={{ opacity: 0, x: dir === 'rtl' ? -30 : 30, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: dir === 'rtl' ? 20 : -20, scale: 0.98 }}
                  transition={{ type: 'spring' as const, stiffness: 80, damping: 18 }}
                  className="glass-panel p-7 sm:p-9 rounded-3xl"
                >
                  {/* Header */}
                  <div className="flex items-center gap-3.5 mb-5">
                    <div className="icon-box">
                      <HelpCircle className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                      {t('bodyMap.generalTitle')}
                    </h3>
                  </div>

                  <p className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-6 leading-relaxed">
                    {t('bodyMap.selectArea')}
                  </p>

                  {/* General conditions list as grid */}
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(t('bodyMap.generalList') as string[]).map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 p-3.5 rounded-2xl bg-surface-light dark:bg-bg-dark border border-border-light dark:border-border-dark hover:border-accent/30 hover:shadow-sm transition-all duration-300"
                      >
                        <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="mt-8">
                    <a
                      href="#booking"
                      className="btn-shine inline-flex px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-black text-sm shadow-lg shadow-primary/15 hover:shadow-xl hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      {language === 'ar' ? 'احجز استشارة تقييمية مجانية' : language === 'ru' ? 'Записаться на диагностику' : 'Book a Free Assessment'}
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* General Conditions Tag Pills */}
            <motion.div
              className="flex flex-wrap gap-2 pt-2"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              {Object.entries(hotspots).map(([key, spot]) => (
                <button
                  key={key}
                  onClick={() => setSelectedArea(key as Hotspot)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all duration-300 cursor-pointer ${
                    selectedArea === key
                      ? 'bg-accent text-white shadow-md shadow-accent/20'
                      : 'bg-surface-light dark:bg-surface-dark text-text-muted-light dark:text-text-muted-dark border border-border-light dark:border-border-dark hover:border-accent/30 hover:text-accent'
                  }`}
                >
                  {spot.name}
                </button>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
