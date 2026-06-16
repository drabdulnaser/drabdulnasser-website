import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, useInView } from 'framer-motion';
import {
  Calendar, Play, Home, Monitor, User,
  Smile, ShieldCheck, MapPin, Star,
} from 'lucide-react';

function useCounter(end: number, dur: number, go: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!go) return;
    let v = 0;
    const s = end / (dur / 16);
    const id = setInterval(() => {
      v += s;
      if (v >= end) { setN(end); clearInterval(id); } else setN(Math.floor(v));
    }, 16);
    return () => clearInterval(id);
  }, [end, dur, go]);
  return n;
}

/* 🧬 Floating Medical Particles 🧬 */
const Particles: React.FC = () => {
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 3 + 1.5,
    dur: Math.random() * 15 + 10,
    delay: Math.random() * 8,
    opacity: Math.random() * 0.35 + 0.1,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full bg-accent"
          style={{
            left: `${p.x}%`,
            bottom: `-${p.size}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animation: `particleRise ${p.dur}s ${p.delay}s linear infinite`,
          }}
        />
      ))}
    </div>
  );
};

/* 🫀 Animated Heartbeat / EKG Line 🫀 */
const HeartbeatLine: React.FC = () => (
  <div className="absolute bottom-[140px] sm:bottom-[160px] left-0 w-full h-16 pointer-events-none z-[2] overflow-hidden opacity-30 dark:opacity-20">
    <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-[200%] h-full ekg-scroll">
      <path
        d="M0,30 L80,30 L95,30 L105,8 L115,52 L125,20 L135,40 L145,28 L160,30 L300,30 L315,30 L325,8 L335,52 L345,20 L355,40 L365,28 L380,30 L500,30 L515,30 L525,8 L535,52 L545,20 L555,40 L565,28 L580,30 L700,30 L715,30 L725,8 L735,52 L745,20 L755,40 L765,28 L780,30 L900,30 L915,30 L925,8 L935,52 L945,20 L955,40 L965,28 L980,30 L1100,30 L1115,30 L1125,8 L1135,52 L1145,20 L1155,40 L1165,28 L1180,30 L1200,30"
        fill="none"
        stroke="url(#ekgGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="filter drop-shadow-[0_0_4px_rgba(0,194,168,0.6)]"
      />
      <defs>
        <linearGradient id="ekgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00C2A8" stopOpacity="0" />
          <stop offset="20%" stopColor="#00C2A8" stopOpacity="1" />
          <stop offset="50%" stopColor="#1D8CF8" stopOpacity="1" />
          <stop offset="80%" stopColor="#00C2A8" stopOpacity="1" />
          <stop offset="100%" stopColor="#00C2A8" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

export const Hero: React.FC = () => {
  const { t, language, dir } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const patients     = useCounter(1200, 2000, inView);
  const satisfaction = useCounter(98,   1500, inView);
  const experience   = useCounter(10,   1200, inView);
  const isRTL = dir === 'rtl';

  const up = {
    hidden: { y: 28, opacity: 0 },
    show:   { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 80, damping: 18 } },
  };

  /* Soft bottom mask to fade the doctor's waist crop naturally */
  const bottomMaskStyle: React.CSSProperties = {
    WebkitMaskImage: 'linear-gradient(to bottom, black 78%, transparent 100%)',
    maskImage: 'linear-gradient(to bottom, black 78%, transparent 100%)',
  };

  return (
    <section id="home" className="relative overflow-hidden mesh-gradient min-h-screen flex flex-col">

      <style>{`
        @keyframes _shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
        ._shim{background-size:200% 100%;animation:_shimmer 4s linear infinite}
        @keyframes _float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        ._float{animation:_float 5s ease-in-out infinite}
        @keyframes ekg-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ekg-scroll {
          animation: ekg-scroll 20s linear infinite;
        }
        @keyframes particleRise {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.4; }
          100% { transform: translateY(-100vh) scale(0.3); opacity: 0; }
        }
      `}</style>

      {/* ══════ PREMIUM CSS GRADIENT BACKGROUND ══════ */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#e8f4f8] via-[#f0f7ff] to-[#e6f9f5] dark:from-[#060c1a] dark:via-[#0a1628] dark:to-[#071a17]" />
        {/* Accent glow top-right */}
        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-gradient-radial from-primary/8 via-secondary/5 to-transparent dark:from-primary/6 dark:via-secondary/4 dark:to-transparent rounded-full blur-3xl" />
        {/* Accent glow bottom-left */}
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-gradient-radial from-accent/8 via-accent/3 to-transparent dark:from-accent/5 dark:via-accent/2 dark:to-transparent rounded-full blur-3xl" />
        {/* Subtle dot grid texture */}
        <div className="absolute inset-0 dot-grid opacity-60 dark:opacity-40" />
      </div>

      {/* ══════ DESKTOP PHOTO (Only visible on desktop, bottom-0, transparent PNG) ══════ */}
      <div className="hidden lg:block absolute bottom-0 w-[42%] xl:w-[38%] h-[82%] lg:h-[86%] z-10 pointer-events-none"
        style={{
          [isRTL ? 'left' : 'right']: '12%',
          ...bottomMaskStyle,
        }}
      >
        <img
          src="/dr-abdulnasser-transparent.png?v=5"
          alt="Dr. Abdul Nasser"
          className="w-full h-full object-contain object-bottom"
        />
      </div>

      {/* ══════ TOP HEADER SMOOTH GRADIENT TRANSITION ══════ */}
      <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-white via-white/90 to-transparent dark:from-[#060c1a] dark:via-[#060c1a]/90 to-transparent z-30 pointer-events-none" />

      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 dark:bg-sky-500/5 rounded-full blur-3xl pointer-events-none animate-subtle-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 dark:bg-accent/5 rounded-full blur-3xl pointer-events-none animate-subtle-float" style={{ animationDelay: '2s' }} />

      {/* ══════ EKG PULSE LINE ══════ */}
      <HeartbeatLine />

      {/* ══════ BACKGROUND FLOATING PARTICLES ══════ */}
      <Particles />

      {/* ══════ CONTENT ══════ */}
      <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-28 sm:pt-32 lg:pt-44 pb-8 flex-1 flex flex-col justify-center">

        {/* ─── MOBILE: Doctor Photo (in-flow, above text) ─── */}
        <div className="lg:hidden flex justify-center mb-6">
          <div className="relative w-[52%] sm:w-[38%] max-w-[200px]">
            <div
              className="rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 border border-accent/20 dark:border-accent/15 bg-white/50 dark:bg-slate-900/40 backdrop-blur-md"
              style={bottomMaskStyle}
            >
              <img
                src="/dr-abdulnasser-transparent.png?v=5"
                alt="Dr. Abdul Nasser"
                className="w-full h-auto object-contain"
              />
            </div>
            {/* Experience badge on mobile */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl rounded-xl px-3.5 py-1.5 border border-accent/20 dark:border-accent/15 shadow-lg shadow-accent/5 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-accent" />
              <span className="text-[11px] font-black text-slate-900 dark:text-white whitespace-nowrap">{t('hero.experienceBadge.title')}</span>
              <span className="text-[9px] font-semibold text-slate-400 whitespace-nowrap">{t('hero.experienceBadge.line1')}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">

          {/* ─── TEXT ─── */}
          <motion.div
            className="lg:col-span-6 xl:col-span-7 flex flex-col gap-4 sm:gap-5 lg:gap-6 items-center lg:items-start text-center lg:text-start z-20"
            initial="hidden" animate="show" transition={{ staggerChildren: 0.08 }}
          >
            {/* Slogan / tag line under the header */}
            <motion.div variants={up} className="text-xs sm:text-sm font-extrabold text-accent dark:text-sky-400 tracking-wide uppercase">
              {t('hero.subtitle')}
            </motion.div>

            <motion.div variants={up}>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary dark:text-sky-400 bg-primary/6 dark:bg-sky-500/8 border border-primary/12 dark:border-sky-500/12">
                <Star className="w-3 h-3" />
                {language === 'ar' ? 'نخدم جميع أنحاء ميشيغان' : language === 'ru' ? 'ПО ВСЕМУ МИЧИГАНУ' : 'SERVING ALL OF MICHIGAN'}
              </span>
            </motion.div>

            <motion.h1 variants={up} className="text-[2rem] sm:text-4xl xl:text-[3.5rem] font-black leading-[1.08] tracking-tight">
              <span className="block text-slate-900 dark:text-white">{t('hero.title1')}</span>
              <span className="block text-slate-900 dark:text-white">{t('hero.title2')}</span>
              <span className="block mt-1 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent _shim">
                {t('hero.title3')}
              </span>
            </motion.h1>

            <motion.p variants={up} className="text-[13px] sm:text-[15px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-md font-medium">
              {t('hero.description')}
            </motion.p>

            <motion.div variants={up} className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <a href="#booking" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0d2137] dark:bg-white text-white dark:text-slate-900 text-sm font-bold shadow-lg shadow-slate-900/10 hover:brightness-110 active:scale-[.97] transition-all cursor-pointer">
                <Calendar className="w-4 h-4" />{t('hero.ctaBook')}
              </a>
              <a href="tel:+13133756800" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/80 dark:bg-white/5 text-slate-700 dark:text-white text-sm font-bold border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-sky-500 transition-all cursor-pointer backdrop-blur-sm">
                <Play className="w-3.5 h-3.5 fill-current text-primary dark:text-sky-400" />{t('hero.ctaConsult')}
              </a>
            </motion.div>

            <motion.div variants={up} className="flex flex-wrap gap-4 sm:gap-5 lg:gap-6 pt-4 lg:pt-5 border-t border-slate-200/50 dark:border-slate-800/60 w-full justify-center lg:justify-start">
              {[
                { icon: <Home className="w-4 h-4" />, label: t('hero.features.home.title'), sub: t('hero.features.home.desc') },
                { icon: <Monitor className="w-4 h-4" />, label: t('hero.features.online.title'), sub: t('hero.features.online.desc') },
                { icon: <User className="w-4 h-4" />, label: t('hero.features.custom.title'), sub: t('hero.features.custom.desc') },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center text-primary dark:text-sky-400 shrink-0 shadow-sm">
                    {f.icon}
                  </div>
                  <div className="text-start">
                    <div className="text-xs font-bold text-slate-800 dark:text-white leading-tight">{f.label}</div>
                    <div className="text-[10px] text-slate-400 font-medium">{f.sub}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>



          {/* ─── EXPERIENCE CARD (floats over photo, desktop only) ─── */}
          <div className="hidden lg:flex lg:col-span-6 xl:col-span-5 justify-end items-end relative min-h-[500px]">
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -30 : 30, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ type: 'spring' as const, stiffness: 60, damping: 16, delay: 0.5 }}
              className="absolute bottom-[15%] z-20 w-[215px] bg-white/90 dark:bg-slate-900/85 backdrop-blur-xl rounded-2xl p-4 border border-white/60 dark:border-slate-800 shadow-xl _float"
              style={{ [isRTL ? 'left' : 'right']: '5%' }}
            >
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-sky-500/10 flex items-center justify-center text-primary dark:text-sky-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-start">
                  <div className="text-sm font-black text-slate-900 dark:text-white leading-none">{t('hero.experienceBadge.title')}</div>
                  <div className="text-[10px] font-semibold text-slate-400 mt-0.5">{t('hero.experienceBadge.line1')}</div>
                </div>
              </div>
              <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed text-start">
                {t('hero.experienceBadge.line2')} {t('hero.experienceBadge.line3')}
              </p>
              <div className="w-8 h-[3px] rounded-full bg-primary dark:bg-sky-500 mt-2.5" />
            </motion.div>
          </div>

        </div>
      </div>

      {/* ══════ STATS ══════ */}
      <div ref={ref} className="relative z-20 max-w-5xl mx-auto w-full px-5 sm:px-6 lg:px-8 pb-10">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ type: 'spring' as const, stiffness: 60, delay: 0.2 }}
          className="bg-[#0b1a30]/95 lg:bg-white/80 dark:lg:bg-slate-900/60 text-white lg:text-slate-900 dark:lg:text-white backdrop-blur-xl rounded-2xl border border-white/10 lg:border-slate-100 dark:lg:border-slate-800 shadow-lg p-5 transition-all duration-300"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x dark:md:divide-slate-800 rtl:md:divide-x-reverse">
            
            {/* Patients treated */}
            <div className="flex items-center gap-3 justify-center md:px-4">
              <div className="flex -space-x-2 rtl:space-x-reverse shrink-0">
                <span className="w-7 h-7 rounded-full bg-primary text-white text-[8px] font-black flex items-center justify-center border-2 border-white dark:border-slate-900">A</span>
                <span className="w-7 h-7 rounded-full bg-emerald-500 text-white text-[8px] font-black flex items-center justify-center border-2 border-white dark:border-slate-900">S</span>
                <span className="w-7 h-7 rounded-full bg-violet-500 text-white text-[8px] font-black flex items-center justify-center border-2 border-white dark:border-slate-900">J</span>
              </div>
              <div>
                <div className="text-lg font-black text-white lg:text-slate-900 dark:lg:text-white leading-none">{patients.toLocaleString()}+</div>
                <div className="text-[9px] font-semibold text-slate-300 lg:text-slate-400 dark:lg:text-slate-400 mt-1">{t('hero.statsBanner.patientsDesc')}</div>
              </div>
            </div>

            {/* Satisfaction */}
            <div className="flex items-center gap-3 justify-center md:px-4">
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 lg:bg-primary/8 lg:text-primary dark:lg:bg-sky-500/10 dark:lg:text-sky-400 flex items-center justify-center shrink-0">
                <Smile className="w-4 h-4" />
              </div>
              <div>
                <div className="text-lg font-black text-white lg:text-slate-900 dark:lg:text-white leading-none">{satisfaction}%</div>
                <div className="text-[9px] font-semibold text-slate-300 lg:text-slate-400 dark:lg:text-slate-400 mt-1">{t('hero.statsBanner.satisfactionDesc')}</div>
              </div>
            </div>

            {/* Experience */}
            <div className="flex items-center gap-3 justify-center md:px-4">
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 lg:bg-primary/8 lg:text-primary dark:lg:bg-sky-500/10 dark:lg:text-sky-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-lg font-black text-white lg:text-slate-900 dark:lg:text-white leading-none">{experience}+</div>
                <div className="text-[9px] font-semibold text-slate-300 lg:text-slate-400 dark:lg:text-slate-400 mt-1">{t('hero.statsBanner.expDesc')}</div>
              </div>
            </div>

            {/* Home Visits */}
            <div className="flex items-center gap-3 justify-center md:px-4">
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 lg:bg-primary/8 lg:text-primary dark:lg:bg-sky-500/10 dark:lg:text-sky-400 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-black text-white lg:text-slate-900 dark:lg:text-white leading-tight">{t('hero.statsBanner.visitsVal')}</div>
                <div className="text-[9px] font-semibold text-slate-300 lg:text-slate-400 dark:lg:text-slate-400 mt-1">{t('hero.statsBanner.visitsDesc')}</div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

