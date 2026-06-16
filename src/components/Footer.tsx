import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Phone, MapPin, Mail, ChevronUp, Clock, Heart } from 'lucide-react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-950 text-slate-400 overflow-hidden">
      {/* Gradient top border line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      {/* Subtle background accents */}
      <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-accent/3 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-80 h-80 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 sm:py-20">
        {/* Main Footer Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-slate-800/60"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Column 1: Brand / Tagline */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <a href="#home" className="inline-flex items-center gap-2.5 group">
              <Logo size={36} className="w-9 h-9 group-hover:scale-105" />
              <span className="text-xl font-black tracking-tight text-white">
                {language === 'ar' ? 'د. عبد' : language === 'ru' ? 'Д-р Абдул' : 'Dr. Abdul'}
                <span className="text-accent"> {language === 'ar' ? 'الناصر' : language === 'ru' ? 'Насер' : 'Nasser'}</span>
              </span>
            </a>
            <p className="text-sm font-semibold text-slate-300 leading-relaxed max-w-xs">
              {t('footer.tagline')}
            </p>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              {language === 'ar'
                ? 'أخصائي العلاج الطبيعي وإعادة التأهيل. خبرة أكاديمية وسريرية دولية مكرسة لاستعادة حركتك الطبيعية وتحسين جودة حياتك في ولاية ميشيغان.'
                : language === 'ru'
                ? 'Специалист по реабилитации и физической терапии. Международный клинический и академический опыт восстановления подвижности.'
                : 'Physical therapy and rehabilitation specialist. International clinical and academic experience dedicated to restoring your mobility.'}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.12em]">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-3 text-sm font-bold">
              <li>
                <a href="#home" className="hover:text-accent transition-colors duration-200">
                  {t('nav.home')}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-accent transition-colors duration-200">
                  {t('nav.services')}
                </a>
              </li>
              <li>
                <a href="#specialized" className="hover:text-accent transition-colors duration-200">
                  {t('nav.care')}
                </a>
              </li>
              <li>
                <a href="#conditions" className="hover:text-accent transition-colors duration-200">
                  {t('nav.conditions')}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-accent transition-colors duration-200">
                  {t('nav.about')}
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-accent transition-colors duration-200">
                  {t('nav.whyUs')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.12em]">
              {t('footer.contactInfo')}
            </h4>
            <ul className="space-y-4 text-sm font-semibold text-slate-300">
              <li className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-slate-800/80 text-accent border border-slate-700/50">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-black tracking-wider">
                    {language === 'ar' ? 'رقم الهاتف' : language === 'ru' ? 'Телефон' : 'Phone'}
                  </span>
                  <a href="tel:+13133756800" className="hover:text-accent transition-colors font-bold" dir="ltr">
                    +1 (313) 375-6800
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-slate-800/80 text-secondary border border-slate-700/50">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-black tracking-wider">
                    {language === 'ar' ? 'منطقة الخدمة' : language === 'ru' ? 'Зона выезда' : 'Service Area'}
                  </span>
                  <span className="font-bold">
                    {language === 'ar'
                      ? 'جميع أنحاء ولاية ميشيغان، الولايات المتحدة'
                      : language === 'ru'
                      ? 'Весь штат Мичиган, США'
                      : 'Michigan State, USA'}
                  </span>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-slate-800/80 text-accent border border-slate-700/50">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-black tracking-wider">
                    {language === 'ar' ? 'البريد الإلكتروني' : language === 'ru' ? 'Электронная почта' : 'Email'}
                  </span>
                  <a href="mailto:info@drabdulnasser.com" className="hover:text-accent transition-colors font-bold">
                    info@drabdulnasser.com
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Service Hours */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.12em]">
              <span className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-accent" />
                {language === 'ar' ? 'ساعات العمل' : language === 'ru' ? 'Часы работы' : 'Service Hours'}
              </span>
            </h4>
            <ul className="space-y-3 text-sm font-semibold text-slate-300">
              <li className="flex justify-between items-center gap-4">
                <span className="text-slate-400 text-xs font-bold">
                  {language === 'ar' ? 'الأحد - الخميس' : language === 'ru' ? 'Вс — Чт' : 'Sun — Thu'}
                </span>
                <span className="text-white text-xs font-black">
                  {language === 'ar' ? '٨ ص - ٨ م' : '8 AM — 8 PM'}
                </span>
              </li>
              <li className="flex justify-between items-center gap-4">
                <span className="text-slate-400 text-xs font-bold">
                  {language === 'ar' ? 'الجمعة' : language === 'ru' ? 'Пт' : 'Friday'}
                </span>
                <span className="text-white text-xs font-black">
                  {language === 'ar' ? '٨ ص - ١٢ م' : '8 AM — 12 PM'}
                </span>
              </li>
              <li className="flex justify-between items-center gap-4">
                <span className="text-slate-400 text-xs font-bold">
                  {language === 'ar' ? 'السبت' : language === 'ru' ? 'Сб' : 'Saturday'}
                </span>
                <span className="text-accent text-xs font-black">
                  {language === 'ar' ? 'بالحجز فقط' : language === 'ru' ? 'По записи' : 'By Appointment'}
                </span>
              </li>
              <li className="pt-2 border-t border-slate-800/60">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-emerald-400 text-xs font-black">
                    {language === 'ar' ? 'الطوارئ: متاح ٢٤/٧' : language === 'ru' ? 'Экстренно: 24/7' : 'Emergency: Available 24/7'}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold text-slate-500">
          <p className="text-center sm:text-left [dir=rtl]:text-right flex items-center gap-1.5 flex-wrap justify-center">
            {t('footer.rights')}
            <span className="inline-flex items-center gap-1 text-slate-600">
              — {language === 'ar' ? 'صنع بـ' : language === 'ru' ? 'Сделано с' : 'Made with'}
              <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            </span>
          </p>

          <button
            onClick={handleScrollTop}
            className="group p-2.5 rounded-xl bg-slate-800/80 hover:bg-accent/15 text-slate-400 hover:text-accent transition-all flex items-center gap-1.5 border border-slate-700/50 hover:border-accent/30 cursor-pointer"
            aria-label="Scroll to top"
          >
            <span className="text-xs font-bold">
              {language === 'ar' ? 'أعلى الصفحة' : language === 'ru' ? 'Вверх' : 'Back to top'}
            </span>
            <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
