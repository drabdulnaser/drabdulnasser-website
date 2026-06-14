import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Laptop, Home, Globe, Search, Info, CheckCircle2, AlertCircle } from 'lucide-react';

const cardVariant = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 80, damping: 18 }
  }
};

const tagVariant = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 120, damping: 14 }
  }
};

export const ServiceArea: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchCity, setSearchCity] = useState('');
  const [checkResult, setCheckResult] = useState<boolean | null>(null);

  const coveredCitiesLower = [
    'detroit', 'dearborn', 'ann arbor', 'canton', 'livonia', 'troy', 'westland',
    'novi', 'farmington', 'farmington hills', 'sterling heights', 'ypsilanti',
    'plymouth', 'southfield', 'oak park', 'dearborn heights', 'birmingham', 'bloomfield',
    'ديترويت', 'ديربورن', 'أن أربور', 'كانتون', 'ليفونيا', 'تروي', 'وستلاند', 'نوفاي', 'فارمنجتون'
  ];

  const handleCheckCoverage = () => {
    if (!searchCity.trim()) return;
    const cleanCity = searchCity.trim().toLowerCase();

    const isCovered = coveredCitiesLower.some(city =>
      cleanCity.includes(city) || city.includes(cleanCity)
    );
    setCheckResult(isCovered);
  };

  const coverageCities = language === 'ar'
    ? ['ديترويت (Detroit)', 'ديربورن (Dearborn)', 'آن أربور (Ann Arbor)', 'كانتون (Canton)', 'ليفونيا (Livonia)', 'تروي (Troy)', 'وست لاند (Westland)']
    : language === 'ru'
    ? ['Детройт (Detroit)', 'Дирборн (Dearborn)', 'Анн-Арбор (Ann Arbor)', 'Кантон (Canton)', 'Ливония (Livonia)', 'Трой (Troy)', 'Вестленд (Westland)']
    : ['Detroit', 'Dearborn', 'Ann Arbor', 'Canton', 'Livonia', 'Troy', 'Westland'];

  return (
    <section id="service-area" className="py-20 sm:py-28 relative overflow-hidden bg-surface-light dark:bg-surface-dark">
      {/* Subtle background accents */}
      <div className="absolute bottom-[-5%] right-[-8%] w-[35%] h-[35%] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[-5%] left-[-5%] w-[20%] h-[25%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

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
            {language === 'ar' ? 'تغطيتنا الجغرافية' : language === 'ru' ? 'География услуг' : 'Service Reach'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mt-4 text-slate-900 dark:text-white">
            {t('serviceArea.title')}
          </h2>
          <p className="text-base text-text-muted-light dark:text-text-muted-dark mt-4 leading-relaxed">
            {t('serviceArea.subtitle')}
          </p>
        </motion.div>

        {/* Two Premium Cards Side by Side */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } }
          }}
        >
          {/* Card 1: Home Visits */}
          <motion.div variants={cardVariant} className="premium-card p-6 sm:p-8 group flex flex-col">
            <div className="flex flex-col items-center text-center sm:items-start sm:text-left flex-1">
              {/* Large icon at top */}
              <div className="icon-box !p-4 !rounded-2xl mb-6">
                <Home className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1">
                {t('serviceArea.homeVisits.title')}
              </h3>
              <span className="text-[10px] font-black text-accent uppercase tracking-[0.12em] mb-4">
                {language === 'ar' ? 'علاج طبيعي منزلي' : language === 'ru' ? 'Выезд на дом' : 'In-Person Therapy'}
              </span>

              <p className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark leading-relaxed mb-6">
                {t('serviceArea.homeVisits.desc')}
              </p>

              {/* Coverage cities as animated tag pills */}
              <div className="w-full">
                <h4 className="text-[10px] font-black text-slate-900 dark:text-white mb-3 flex items-center gap-1.5 uppercase tracking-[0.1em]">
                  <MapPin className="w-3.5 h-3.5 text-accent" />
                  {language === 'ar' ? 'المناطق الرئيسية المغطاة:' : language === 'ru' ? 'Основные обслуживаемые районы:' : 'Key Serviced Areas:'}
                </h4>
                <motion.div
                  className="flex flex-wrap gap-2"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.04 } }
                  }}
                >
                  {coverageCities.map((city, idx) => (
                    <motion.span
                      key={idx}
                      variants={tagVariant}
                      className="px-3 py-1.5 rounded-full bg-white dark:bg-bg-dark border border-border-light dark:border-border-dark text-xs font-bold text-slate-700 dark:text-slate-300 shadow-sm hover:border-accent/30 transition-colors"
                    >
                      {city}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Online Consultations */}
          <motion.div variants={cardVariant} className="premium-card p-6 sm:p-8 group flex flex-col">
            <div className="flex flex-col items-center text-center sm:items-start sm:text-left flex-1">
              {/* Large icon at top */}
              <div className="icon-box !p-4 !rounded-2xl mb-6">
                <Laptop className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1">
                {t('serviceArea.onlineConsult.title')}
              </h3>
              <span className="text-[10px] font-black text-accent uppercase tracking-[0.12em] mb-4">
                {language === 'ar' ? 'استشارات رقمية' : language === 'ru' ? 'Онлайн сеансы' : 'Telehealth Services'}
              </span>

              <p className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark leading-relaxed mb-6">
                {t('serviceArea.onlineConsult.desc')}
              </p>

              {/* Online Features */}
              <div className="space-y-3 w-full">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-bg-dark border border-border-light/50 dark:border-border-dark/50">
                  <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {language === 'ar' ? 'مكالمات فيديو مشفرة وآمنة بالكامل' : language === 'ru' ? 'Защищенные сеансы видеосвязи' : 'Fully secure & encrypted video calls'}
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-bg-dark border border-border-light/50 dark:border-border-dark/50">
                  <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {language === 'ar' ? 'توفير دليل تمارين فيديو مخصص ومتابعة دورية' : language === 'ru' ? 'Видео-руководство и регулярный контроль' : 'Custom video exercise guide & follow-up'}
                  </span>
                </div>
              </div>

              {/* Global availability note */}
              <div className="flex items-center gap-1.5 text-xs text-text-muted-light dark:text-text-muted-dark font-medium mt-6 pt-4 border-t border-border-light dark:border-border-dark w-full">
                <Globe className="w-4 h-4 text-accent shrink-0" />
                <span>
                  {language === 'ar' ? 'متاح للمرضى في جميع أنحاء الولايات المتحدة وكندا.' : language === 'ru' ? 'Доступно для пациентов по всей стране.' : 'Available for patients nationwide.'}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Smart Coverage City Checker */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="premium-card p-6 sm:p-8">
            <div className="text-center mb-6">
              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">
                {language === 'ar' ? 'تحقق من توفر الخدمة المنزلية في مدينتك' : language === 'ru' ? 'Проверьте доступность выезда в ваш город' : 'Check Home Visit Availability in Your City'}
              </h3>
              <p className="text-xs text-text-muted-light dark:text-text-muted-dark font-bold">
                {language === 'ar' ? 'اكتب اسم مدينتك في ولاية ميشيغان للتحقق فوراً' : language === 'ru' ? 'Введите название вашего города в Мичигане' : 'Type your city name in Michigan to verify instantly'}
              </p>
            </div>

            {/* Search Input with focus glow */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-grow relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted-light dark:text-text-muted-dark pointer-events-none" />
                <input
                  type="text"
                  placeholder={language === 'ar' ? 'مثال: Dearborn أو Detroit' : language === 'ru' ? 'Например: Dearborn или Detroit' : 'e.g., Dearborn or Detroit'}
                  value={searchCity}
                  onChange={(e) => {
                    setSearchCity(e.target.value);
                    setCheckResult(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCheckCoverage();
                  }}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white dark:bg-bg-dark border border-border-light dark:border-border-dark text-sm font-semibold text-slate-800 dark:text-slate-200 outline-none transition-all duration-300 focus:border-accent focus:shadow-[0_0_0_3px_rgba(0,194,168,0.15)]"
                />
              </div>
              <button
                onClick={handleCheckCoverage}
                className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-black rounded-2xl hover:opacity-95 active:scale-95 transition-all text-sm shrink-0 cursor-pointer btn-shine"
              >
                {language === 'ar' ? 'تحقق الآن' : language === 'ru' ? 'Проверить' : 'Check Now'}
              </button>
            </div>

            {/* Result */}
            <AnimatePresence mode="wait">
              {checkResult !== null && (
                <motion.div
                  key={checkResult ? 'covered' : 'not-covered'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={`mt-6 p-4 rounded-2xl border text-xs sm:text-sm font-bold flex gap-3 items-start ${
                    checkResult
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                      : 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400'
                  }`}
                >
                  {checkResult ? (
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  )}
                  <div>
                    {checkResult ? (
                      <p>
                        {language === 'ar'
                          ? `رائع! الزيارات المنزلية متوفرة في منطقة "${searchCity}".`
                          : language === 'ru'
                          ? `Отлично! Выезд на дом доступен в районе "${searchCity}".`
                          : `Great news! Home visits are available in "${searchCity}".`}
                        <a href="#booking" className="underline mx-1 text-primary dark:text-secondary block sm:inline mt-1 sm:mt-0 font-extrabold">
                          {language === 'ar' ? 'احجز موعدك الآن ←' : language === 'ru' ? 'Забронировать сейчас ←' : 'Book your appointment now →'}
                        </a>
                      </p>
                    ) : (
                      <p>
                        {language === 'ar'
                          ? `الزيارات المنزلية غير مغطاة تلقائياً في "${searchCity}" حالياً.`
                          : language === 'ru'
                          ? `Выезд на дом в "${searchCity}" пока не поддерживается автоматически.`
                          : `Home visits are not automatically covered in "${searchCity}" yet.`}
                        <span className="block text-xs text-text-muted-light dark:text-text-muted-dark mt-1">
                          {language === 'ar'
                            ? 'لكن يمكنك حجز جلسة استشارة عبر الإنترنت، أو الاتصال بالدكتور للتنسيق الاستثنائي.'
                            : language === 'ru'
                            ? 'Но вы можете записаться на онлайн-консультацию или связаться с доктором.'
                            : 'However, you can book an online session, or call the doctor to coordinate a custom visit.'}
                        </span>
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Michigan Info Banner */}
          <motion.div
            className="mt-6 flex items-center gap-2.5 p-4 rounded-2xl bg-primary/5 dark:bg-primary/10 border border-primary/10 dark:border-primary/20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Info className="w-4 h-4 text-primary dark:text-secondary shrink-0" />
            <span className="text-xs font-medium text-text-muted-light dark:text-text-muted-dark">
              {t('serviceArea.michiganNote')}
            </span>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};
