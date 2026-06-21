import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X, Sun, Moon, Globe, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { Logo } from './Logo';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
  const { language, setLanguage, t, dir } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Active section tracking
      const sections = ['home', 'services', 'specialized', 'conditions', 'about', 'why-us'];
      let currentSection = '#home';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Adjust threshold to match scroll position
          if (rect.top <= 160 && rect.bottom >= 160) {
            currentSection = `#${section}`;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.services'), href: '#services' },
    { name: t('nav.care'), href: '#specialized' },
    { name: t('nav.conditions'), href: '#conditions' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.whyUs'), href: '#why-us' },
  ];

  const languages = [
    { code: 'ar', name: 'العربية' },
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' }
  ];

  const handleLanguageChange = (code: any) => {
    setLanguage(code);
    setLangDropdownOpen(false);
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 dark:bg-[#060c1a]/90 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 py-3 shadow-lg shadow-slate-900/5' 
        : 'bg-white/40 dark:bg-transparent backdrop-blur-[2px] py-4.5 border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo / Brand & Active Status */}
          <a href="#home" className="flex items-center gap-2 group shrink-0">
            <Logo size={36} className="w-8 h-8 sm:w-9 sm:h-9 group-hover:scale-105" />
            {/* Brand Name */}
            <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white">
              {language === 'ar' ? (
                <>د. <span className="text-primary dark:text-accent">عبد الناصر</span></>
              ) : language === 'ru' ? (
                <>Д-р <span className="text-primary dark:text-accent">Абдул Насер</span></>
              ) : (
                <>Dr. <span className="text-primary dark:text-accent">Abdul Nasser</span></>
              )}
            </span>
            {/* Available badge - desktop only */}
            <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {language === 'ar' ? 'متاح اليوم' : language === 'ru' ? 'Доступен' : 'Available'}
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center lg:gap-1 xl:gap-3 lg:text-xs xl:text-sm">
            {navItems.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative px-3.5 py-2 font-bold transition-all duration-300 whitespace-nowrap rounded-lg ${
                    isActive 
                      ? 'text-accent dark:text-accent bg-accent/5' 
                      : 'text-text-light dark:text-text-dark hover:text-accent dark:hover:text-accent hover:bg-slate-100/30 dark:hover:bg-white/5'
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.75 bg-accent rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Controls & CTA */}
          <div className="hidden lg:flex items-center lg:gap-2 xl:gap-4 shrink-0 lg:text-xs xl:text-sm">
            {/* Call button */}
            <a 
              href="tel:+13133756800" 
              className="flex items-center gap-1.5 font-extrabold text-primary dark:text-secondary hover:underline whitespace-nowrap"
            >
              <Phone className="w-4 h-4 text-accent" />
              <span className="hidden xl:inline" dir="ltr">+1 (313) 375-6800</span>
            </a>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:text-accent hover:border-accent/30 transition-all cursor-pointer"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 p-2 rounded-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:text-accent hover:border-accent/30 transition-all cursor-pointer"
                aria-label="Change Language"
              >
                <Globe className="w-4.5 h-4.5" />
                <span className="text-[10px] font-bold uppercase">{language}</span>
              </button>

              {langDropdownOpen && (
                <div className={`absolute mt-2 w-32 rounded-xl shadow-xl bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark py-1 z-50 ${
                  dir === 'rtl' ? 'left-0 origin-top-left' : 'right-0 origin-top-right'
                }`}>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                        language === lang.code ? 'font-bold text-accent' : ''
                      } ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Booking CTA */}
            <a
              href="#booking"
              className="px-4 xl:px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-bold shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap"
            >
              {t('nav.booking')}
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-3">
            {/* Quick Call */}
            <a 
              href="tel:+13133756800" 
              className="p-2 rounded-full bg-primary/10 text-primary dark:text-secondary"
            >
              <Phone className="w-5 h-5" />
            </a>

            {/* Dark Mode */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Language Selection */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 p-2 rounded-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark"
              >
                <Globe className="w-5 h-5" />
              </button>

              {langDropdownOpen && (
                <div className={`absolute mt-2 w-32 rounded-xl shadow-xl bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark py-1 z-50 ${
                  dir === 'rtl' ? 'left-0' : 'right-0'
                }`}>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                        language === lang.code ? 'font-bold text-accent' : ''
                      } ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 w-full bg-white/95 dark:bg-[#060c1a]/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 animate-fade-in shadow-2xl z-50">
          <div className="px-4 pt-2 pb-6 space-y-2 sm:px-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-xl text-base font-semibold hover:bg-primary/5 hover:text-primary transition-all"
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 border-t border-border-light dark:border-border-dark flex flex-col gap-4">
              <div className="flex justify-between items-center px-4">
                <span className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark">
                  {language === 'ar' ? 'للتواصل المباشر:' : language === 'ru' ? 'Прямая связь:' : 'Direct Call:'}
                </span>
                <a 
                  href="tel:+13133756800" 
                  className="font-bold text-primary dark:text-secondary flex items-center gap-1"
                >
                  <Phone className="w-4 h-4 text-accent" />
                  <span dir="ltr">+1 (313) 375-6800</span>
                </a>
              </div>
              <a
                href="#booking"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold shadow-lg"
              >
                {t('nav.booking')}
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
