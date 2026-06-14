import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Send, Check, MessageSquare, PhoneCall, CalendarDays } from 'lucide-react';

export const BookingForm: React.FC = () => {
  const { t, language } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    type: 'home',
    date: '',
    time: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [painLevel, setPainLevel] = useState(5);

  const getPainDescriptor = (level: number) => {
    if (level <= 3) {
      return language === 'ar' ? 'خفيف' : language === 'ru' ? 'Легкая боль' : 'Mild Pain';
    } else if (level <= 6) {
      return language === 'ar' ? 'متوسط' : language === 'ru' ? 'Умеренная боль' : 'Moderate Pain';
    } else if (level <= 8) {
      return language === 'ar' ? 'شديد' : language === 'ru' ? 'Сильная боль' : 'Severe Pain';
    } else {
      return language === 'ar' ? 'شديد جداً ⚠️' : language === 'ru' ? 'Экстремальная боль ⚠️' : 'Extreme Pain ⚠️';
    }
  };

  const servicesList = [
    t('services.items.pt.title'),
    t('services.items.stretch.title'),
    t('services.items.massage.title'),
    t('services.items.relax.title'),
    t('services.items.lymphatic.title'),
    t('services.items.sports.title'),
    t('services.items.exercise.title'),
    t('services.items.nutrition.title'),
    t('services.items.coaching.title'),
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.service) {
      alert(
        language === 'ar'
          ? 'يرجى ملء الحقول المطلوبة (الاسم، الهاتف، الخدمة)'
          : 'Please fill in the required fields (Name, Phone, Service)'
      );
      return;
    }

    setIsSubmitting(true);

    // Choose consult type label
    const typeLabel =
      formData.type === 'home'
        ? t('bookingForm.consultOptions.home')
        : t('bookingForm.consultOptions.online');

    const painText =
      language === 'ar'
        ? `*درجة الألم:* ${painLevel}/10 (${getPainDescriptor(painLevel)})`
        : language === 'ru'
        ? `*Уровень боли:* ${painLevel}/10 (${getPainDescriptor(painLevel)})`
        : `*Pain Level:* ${painLevel}/10 (${getPainDescriptor(painLevel)})`;

    // Format message from template
    let template = t('bookingForm.whatsappTemplate') as string;
    const formattedMsg = template
      .replace('{name}', formData.name)
      .replace('{phone}', formData.phone)
      .replace('{service}', formData.service)
      .replace('{type}', typeLabel)
      .replace('{date}', formData.date || '---')
      .replace('{time}', formData.time || '---')
      .replace('{notes}', `${formData.notes || '---'}\n${painText}`);

    // Create WhatsApp link
    // Dr. Abdulnasser's phone: +1 (313) 375-6800 -> 13133756800
    const phoneNumber = '13133756800';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(formattedMsg)}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Open WhatsApp
      window.open(whatsappUrl, '_blank');

      // Reset form success indicator after a delay
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1200);
  };

  // Shared input classes
  const inputClasses =
    'w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-bg-dark border border-border-light dark:border-border-dark text-sm font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:shadow-[0_0_0_3px_rgba(0,194,168,0.08)] outline-none transition-all duration-300';

  // Pain level color helper
  const getPainColor = (level: number) => {
    if (level <= 3) return 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400';
    if (level <= 6) return 'bg-amber-500/15 text-amber-600 dark:text-amber-400';
    if (level <= 8) return 'bg-red-500/15 text-red-600 dark:text-red-400';
    return 'bg-rose-600/20 text-rose-600 dark:text-rose-400 animate-pulse';
  };

  return (
    <section
      id="booking"
      className="py-20 sm:py-28 relative overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, rgba(15,76,129,0.04) 0%, rgba(0,194,168,0.06) 50%, rgba(29,140,248,0.04) 100%)',
      }}
    >
      {/* Background blurs */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.12em] bg-accent/10 text-accent border border-accent/20">
            <CalendarDays className="w-3.5 h-3.5" />
            {language === 'ar' ? 'حجز مباشر وسريع' : language === 'ru' ? 'БЫСТРАЯ ЗАПИСЬ' : 'INSTANT BOOKING'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mt-4 text-slate-900 dark:text-white">
            {t('bookingForm.title')}
          </h2>
          <p className="text-base text-text-muted-light dark:text-text-muted-dark mt-4 leading-relaxed">
            {t('bookingForm.subtitle')}
          </p>
        </motion.div>

        {/* Main Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Form */}
          <div className="lg:col-span-8 premium-card p-6 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    {t('bookingForm.nameLabel')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t('bookingForm.namePlaceholder')}
                    required
                    className={inputClasses}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    {t('bookingForm.phoneLabel')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={t('bookingForm.phonePlaceholder')}
                    required
                    className={inputClasses}
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Service & Consult Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="service" className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    {t('bookingForm.serviceLabel')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    className={inputClasses}
                  >
                    <option value="" disabled>
                      {t('bookingForm.servicePlaceholder')}
                    </option>
                    {servicesList.map((service, idx) => (
                      <option key={idx} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="type" className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    {t('bookingForm.consultLabel')}
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className={inputClasses}
                  >
                    <option value="home">{t('bookingForm.consultOptions.home')}</option>
                    <option value="online">{t('bookingForm.consultOptions.online')}</option>
                  </select>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="date" className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    {t('bookingForm.dateLabel')}
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className={inputClasses}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="time" className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    {t('bookingForm.timeLabel')}
                  </label>
                  <input
                    type="text"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    placeholder={t('bookingForm.timePlaceholder')}
                    className={inputClasses}
                  />
                </div>
              </div>

              {/* Pain Level Slider */}
              <div className="space-y-4 p-6 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <label htmlFor="pain" className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    {language === 'ar' ? 'مستوى الألم الحالي' : language === 'ru' ? 'Текущий уровень боли' : 'Current Pain Level'}:
                    <span className="mx-2 text-sm font-black text-accent bg-accent/10 px-2.5 py-1 rounded-lg inline-block">
                      {painLevel} / 10
                    </span>
                  </label>
                  <span className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider ${getPainColor(painLevel)}`}>
                    {getPainDescriptor(painLevel)}
                  </span>
                </div>

                {/* Gradient Track Slider */}
                <div className="relative pt-1">
                  <input
                    type="range"
                    id="pain"
                    min="1"
                    max="10"
                    value={painLevel}
                    onChange={(e) => setPainLevel(parseInt(e.target.value))}
                    className="w-full h-2.5 rounded-full appearance-none cursor-pointer outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-accent [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(0,194,168,0.4)] [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-125 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-accent [&::-moz-range-thumb]:shadow-[0_0_8px_rgba(0,194,168,0.4)]"
                    style={{
                      background: 'linear-gradient(to right, #22c55e 0%, #eab308 40%, #f97316 65%, #ef4444 85%, #dc2626 100%)',
                    }}
                  />
                </div>

                {/* Labels */}
                <div className="flex justify-between text-[10px] font-black text-text-muted-light dark:text-text-muted-dark px-1 uppercase tracking-wider">
                  <span>{language === 'ar' ? '1 (خفيف)' : language === 'ru' ? '1 (Легкая)' : '1 (Mild)'}</span>
                  <span>{language === 'ar' ? '5 (متوسط)' : language === 'ru' ? '5 (Умеренная)' : '5 (Moderate)'}</span>
                  <span>{language === 'ar' ? '10 (شديد جداً)' : language === 'ru' ? '10 (Экстремальная)' : '10 (Extreme)'}</span>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <label htmlFor="notes" className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  {t('bookingForm.notesLabel')}
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder={t('bookingForm.notesPlaceholder')}
                  rows={4}
                  className={inputClasses}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-shine w-full py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white font-black rounded-2xl shadow-lg hover:shadow-[0_8px_30px_rgba(34,197,94,0.3)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer text-sm uppercase tracking-wider"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : isSuccess ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>{t('bookingForm.successMsg')}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t('bookingForm.submitButton')}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Quick Contact Info Side */}
          <div className="lg:col-span-4 bg-gradient-to-br from-primary to-secondary text-white p-8 sm:p-10 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden">
            {/* Visual watermarks */}
            <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] bg-white/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/20 rounded-full blur-[60px] pointer-events-none" />

            <div className="space-y-8 relative z-10">
              <div>
                <h3 className="text-xl font-black">
                  {language === 'ar' ? 'ساعات العمل والاتصال' : language === 'ru' ? 'Контакты и часы работы' : 'Hours & Direct Call'}
                </h3>
                <p className="text-xs text-white/70 mt-1 font-medium">
                  {language === 'ar'
                    ? 'تواصل معنا مباشرة للحالات الطارئة'
                    : language === 'ru'
                    ? 'Свяжитесь с нами для экстренных случаев'
                    : 'Get in touch for immediate help'}
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="tel:+13133756800"
                  className="flex items-center gap-4 group p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition-all cursor-pointer"
                >
                  <div className="p-2.5 rounded-xl bg-accent text-white group-hover:scale-105 transition-transform shrink-0">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-black text-accent block tracking-wider">
                      {language === 'ar' ? 'الرقم المباشر' : language === 'ru' ? 'Прямой телефон' : 'Direct Number'}
                    </span>
                    <span className="text-base font-bold tracking-tight block" dir="ltr">
                      +1 (313) 375-6800
                    </span>
                  </div>
                </a>

                <a
                  href="https://wa.me/13133756800"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-4 group p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition-all cursor-pointer"
                >
                  <div className="p-2.5 rounded-xl bg-emerald-500 text-white group-hover:scale-105 transition-transform shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-black text-emerald-400 block tracking-wider">
                      {language === 'ar' ? 'واتساب مباشر' : language === 'ru' ? 'Чат WhatsApp' : 'Direct WhatsApp'}
                    </span>
                    <span className="text-xs font-bold block leading-relaxed mt-0.5">
                      {language === 'ar'
                        ? 'سريع ومنظم، نرد خلال أقل من ساعة.'
                        : language === 'ru'
                        ? 'Отвечаем в течение часа.'
                        : 'Fast responses, replies within an hour.'}
                    </span>
                  </div>
                </a>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 mt-8 relative z-10 text-xs font-semibold text-white/85 space-y-2">
              <p>📍 {language === 'ar' ? 'ميـشيغـان، الـولايـات المتـحـدة' : language === 'ru' ? 'Мичиган, США' : 'Michigan, United States'}</p>
              <p>🏠 {language === 'ar' ? 'زيارات منزلية بالكامل + جلسات فيديو' : language === 'ru' ? 'Выезды на дом + видеосеансы' : 'In-home visits + remote consultations'}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
