import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import {
  ShieldAlert,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  ClipboardCheck,
  HeartPulse,
} from 'lucide-react';

export const RehabSections: React.FC = () => {
  const { t, language, dir } = useLanguage();

  const carSymptoms = t('specialized.car.symptoms') as string[];
  const workSymptoms = t('specialized.work.symptoms') as string[];

  const sectionHeaderVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
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

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const timelineSteps = [
    {
      phaseLabel: language === 'ar' ? 'المرحلة 1' : language === 'ru' ? 'Этап 1' : 'Phase 1',
      textKey: 'specialized.car.timeline.step1',
      color: 'bg-secondary',
      textColor: 'text-secondary',
      glowColor: 'shadow-secondary/40',
    },
    {
      phaseLabel: language === 'ar' ? 'المرحلة 2' : language === 'ru' ? 'Этап 2' : 'Phase 2',
      textKey: 'specialized.car.timeline.step2',
      color: 'bg-accent',
      textColor: 'text-accent',
      glowColor: 'shadow-accent/40',
    },
    {
      phaseLabel: language === 'ar' ? 'المرحلة 3' : language === 'ru' ? 'Этап 3' : 'Phase 3',
      textKey: 'specialized.car.timeline.step3',
      color: 'bg-primary',
      textColor: 'text-primary dark:text-secondary',
      glowColor: 'shadow-primary/40',
    },
    {
      phaseLabel: language === 'ar' ? 'التعافي التام' : language === 'ru' ? 'Завершение' : 'Recovery',
      textKey: 'specialized.car.timeline.step4',
      color: 'bg-emerald-500',
      textColor: 'text-emerald-500',
      glowColor: 'shadow-emerald-500/40',
    },
  ];

  return (
    <section id="specialized" className="py-20 sm:py-28 relative overflow-hidden bg-surface-light dark:bg-surface-dark">
      {/* Subtle background accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionHeaderVariants}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.12em] bg-accent/10 text-accent border border-accent/20">
            <HeartPulse className="w-3.5 h-3.5" />
            {language === 'ar' ? 'علاج وتأهيل متخصص' : language === 'ru' ? 'Специализированная Реабилитация' : 'Specialized Care'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mt-4 text-slate-900 dark:text-white">
            {t('specialized.title')}
          </h2>
          <p className="text-base text-text-muted-light dark:text-text-muted-dark mt-4 leading-relaxed">
            {t('specialized.subtitle')}
          </p>
        </motion.div>

        {/* Two Large Premium Cards Side by Side */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
        >

          {/* ═══ Card 1: Auto Accident Rehab ═══ */}
          <motion.div
            variants={cardVariants}
            className="premium-card relative overflow-hidden flex flex-col"
          >
            {/* Gradient accent stripe on the start edge */}
            <div className={`absolute top-0 bottom-0 ${dir === 'rtl' ? 'right-0' : 'left-0'} w-[4px] bg-gradient-to-b from-red-500 via-secondary to-accent`} />

            <div className={`p-7 sm:p-9 ${dir === 'rtl' ? 'pr-11' : 'pl-11'} flex flex-col flex-grow`}>

              {/* Card Header */}
              <div className="flex items-center gap-3.5 mb-5">
                <div className="icon-box !bg-red-500/10 !border-red-500/20 !text-red-500">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                    {t('specialized.car.title')}
                  </h3>
                  <p className="text-[10px] font-black text-red-500 uppercase tracking-wider mt-0.5">
                    {t('specialized.car.subtitle')}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark leading-relaxed mb-6">
                {t('specialized.car.desc')}
              </p>

              {/* Symptoms as checkmark list */}
              <div className="space-y-2.5 mb-8">
                {carSymptoms.map((symptom, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4.5 h-4.5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                      {symptom}
                    </span>
                  </div>
                ))}
              </div>

              {/* Recovery Timeline */}
              <div className="mt-auto pt-6 border-t border-border-light dark:border-border-dark">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white mb-5 flex items-center gap-2">
                  <ClipboardCheck className="w-4 h-4 text-accent" />
                  {t('specialized.car.timeline.title')}
                </h4>

                <div className="relative">
                  {/* Vertical connecting line */}
                  <div className={`absolute top-2 bottom-2 ${dir === 'rtl' ? 'right-[9px]' : 'left-[9px]'} w-[2px] bg-gradient-to-b from-secondary/30 via-accent/20 to-emerald-500/30`} />

                  <div className="space-y-5">
                    {timelineSteps.map((step, idx) => (
                      <div key={idx} className={`relative flex items-start gap-4 ${dir === 'rtl' ? 'flex-row' : ''}`}>
                        {/* Glowing node */}
                        <div className="relative shrink-0">
                          <span className={`block w-5 h-5 rounded-full ${step.color} shadow-md ${step.glowColor} border-[3px] border-white dark:border-surface-dark`} />
                        </div>
                        {/* Content */}
                        <div className="pb-1">
                          <span className={`text-[10px] font-black uppercase tracking-wider ${step.textColor}`}>
                            {step.phaseLabel}
                          </span>
                          <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mt-0.5">
                            {t(step.textKey)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ═══ Card 2: Work Injury Rehab ═══ */}
          <motion.div
            variants={cardVariants}
            className="premium-card relative overflow-hidden flex flex-col"
          >
            {/* Gradient accent stripe on the start edge */}
            <div className={`absolute top-0 bottom-0 ${dir === 'rtl' ? 'right-0' : 'left-0'} w-[4px] bg-gradient-to-b from-amber-500 via-accent to-secondary`} />

            <div className={`p-7 sm:p-9 ${dir === 'rtl' ? 'pr-11' : 'pl-11'} flex flex-col flex-grow`}>

              {/* Card Header */}
              <div className="flex items-center gap-3.5 mb-5">
                <div className="icon-box !bg-amber-500/10 !border-amber-500/20 !text-amber-500">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                    {t('specialized.work.title')}
                  </h3>
                  <p className="text-[10px] font-black text-amber-500 uppercase tracking-wider mt-0.5">
                    {t('specialized.work.subtitle')}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark leading-relaxed mb-6">
                {t('specialized.work.desc')}
              </p>

              {/* Symptoms as checkmark list */}
              <div className="space-y-2.5 mb-8">
                {workSymptoms.map((symptom, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4.5 h-4.5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                      {symptom}
                    </span>
                  </div>
                ))}
              </div>

              {/* Ergonomic Support Panel */}
              <div className="mt-auto pt-6 border-t border-border-light dark:border-border-dark">
                <div className="p-5 rounded-2xl bg-surface-light dark:bg-bg-dark border border-border-light dark:border-border-dark">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="icon-box !p-2">
                      <ShieldAlert className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-black text-slate-900 dark:text-white">
                      {language === 'ar' ? 'الوقاية الميكانيكية وإعادة التأهيل' : language === 'ru' ? 'Эргономика и Реабилитация' : 'Ergonomic Support'}
                    </h4>
                  </div>
                  <p className="text-xs font-medium text-text-muted-light dark:text-text-muted-dark leading-relaxed mb-4">
                    {t('specialized.work.ergonomics')}
                  </p>
                  <a
                    href="#booking"
                    className="inline-flex items-center gap-1.5 text-xs font-black text-accent hover:text-primary dark:hover:text-secondary transition-colors group"
                  >
                    <span>{language === 'ar' ? 'طلب استشارة إصابات العمل' : language === 'ru' ? 'Консультация по травмам' : 'Request Work Injury Assessment'}</span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform ${dir === 'rtl' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};
