import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Award, GraduationCap, Heart, Sparkles, CheckCircle2, Quote, UserRound } from 'lucide-react';

const bulletItemVariant = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 80, damping: 18 }
  }
};

export const About: React.FC = () => {
  const { t, dir, language } = useLanguage();
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    // Limit rotation to maximum 15 degrees
    setTilt({ x: -(y / box.height) * 15, y: (x / box.width) * 15 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const bullets = t('about.bullets') as string[];

  const icons = [
    <Award className="w-5 h-5" />,
    <GraduationCap className="w-5 h-5" />,
    <Heart className="w-5 h-5" />,
    <Sparkles className="w-5 h-5" />
  ];

  return (
    <section id="about" className="py-20 sm:py-28 relative overflow-hidden bg-surface-light dark:bg-surface-dark">
      {/* Subtle background accents */}
      <div className="absolute top-1/3 left-[-8%] w-[35%] h-[35%] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-[-5%] w-[25%] h-[30%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

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
            <UserRound className="w-3.5 h-3.5" />
            {language === 'ar' ? 'الخلفية المهنية' : language === 'ru' ? 'О Докторе' : 'Clinical Expertise'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mt-4 text-slate-900 dark:text-white">
            {t('about.title')}
          </h2>
          <p className="text-sm font-bold text-secondary uppercase tracking-wider mt-2">
            {t('about.subtitle')}
          </p>
        </motion.div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left: Doctor Portrait in premium-card frame */}
          <motion.div
            className="lg:col-span-5 flex justify-center"
            initial={{ opacity: 0, x: dir === 'rtl' ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring' as const, stiffness: 60, damping: 20 }}
          >
            <div className="relative">
              {/* Glow effect behind the card */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-accent/20 via-secondary/10 to-primary/15 rounded-[2rem] blur-2xl pointer-events-none" />

              {/* Portrait card */}
              <div 
                className="premium-card relative p-2 sm:p-3 cursor-pointer"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transition: 'transform 0.15s ease-out',
                }}
              >
                <div className="relative w-72 h-96 sm:w-80 sm:h-[440px] rounded-2xl overflow-hidden">
                  <img
                    src="/dr-abdulnasser-smiling-2.png"
                    alt="Dr. Abdul Nasser portrait"
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Gradient overlay at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />

                  {/* Bottom info overlay */}
                  <div className="absolute bottom-5 left-5 right-5 text-center text-white">
                    <span className="text-2xl block mb-1">🇷🇺 🎓</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.12em] opacity-90">
                      {language === 'ar' ? 'خريج وممارس طبي في روسيا' : language === 'ru' ? 'Российское медицинское образование' : 'Russia Medical Training'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Bio + Bullets + Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            {/* Bio paragraph */}
            <motion.p
              className="text-base text-text-muted-light dark:text-text-muted-dark leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t('about.bio')}
            </motion.p>

            {/* Staggered Bullet Points */}
            <motion.div
              className="space-y-3 pt-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } }
              }}
            >
              {bullets.map((bullet, idx) => (
                <motion.div
                  key={idx}
                  variants={bulletItemVariant}
                  className="flex gap-3 items-start p-3.5 rounded-2xl bg-white dark:bg-bg-dark border border-border-light dark:border-border-dark hover:border-accent/30 transition-all duration-300 group"
                >
                  <div className="icon-box shrink-0 !p-2 !rounded-xl">
                    {icons[idx] || <CheckCircle2 className="w-5 h-5" />}
                  </div>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-snug pt-0.5">
                    {bullet}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Gradient accent divider */}
            <div className="section-divider !w-full !max-w-none my-6" />

            {/* Philosophy Quote — glass-panel */}
            <motion.div
              className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Large decorative quotation marks */}
              <Quote className="absolute top-4 left-4 w-10 h-10 text-accent/15 rotate-180" />
              <Quote className="absolute bottom-4 right-4 w-10 h-10 text-accent/15" />

              <h4 className="text-[10px] font-black text-accent uppercase tracking-[0.12em] mb-3 relative z-10">
                {t('about.philosophy.title')}
              </h4>
              <p className="text-sm sm:text-base font-medium italic text-slate-800 dark:text-slate-200 relative z-10 leading-relaxed">
                {t('about.philosophy.text')}
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
