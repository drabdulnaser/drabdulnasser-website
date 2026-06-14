import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const FloatingWhatsApp: React.FC = () => {
  const { language, dir } = useLanguage();

  const tooltipText = language === 'ar'
    ? 'تواصل معنا مباشرة 💬'
    : language === 'ru'
    ? 'Связаться с нами 💬'
    : 'Chat with us 💬';

  return (
    <div
      className={`fixed bottom-6 z-50 ${
        dir === 'rtl' ? 'left-6' : 'right-6'
      }`}
    >
      {/* Outer glow ring container */}
      <div className="relative">
        {/* Pulsing glow ring — first ring */}
        <span
          className="absolute inset-[-6px] rounded-full border-2 border-emerald-400/50 animate-ping pointer-events-none"
          style={{ animationDuration: '2.5s' }}
        />
        {/* Pulsing glow ring — second ring (offset timing) */}
        <span
          className="absolute inset-[-4px] rounded-full bg-emerald-400/15 animate-pulse pointer-events-none"
          style={{ animationDuration: '2s' }}
        />

        <a
          href="https://wa.me/13133756800"
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with Dr. Abdul Nasser on WhatsApp"
          className="relative flex items-center justify-center w-14 h-14 bg-emerald-500 text-white rounded-full shadow-[0_4px_20px_rgba(34,197,94,0.4)] hover:shadow-[0_8px_30px_rgba(34,197,94,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer group"
        >
          {/* WhatsApp Custom Vector SVG Icon */}
          <svg
            viewBox="0 0 24 24"
            className="w-7 h-7 fill-current relative z-10"
            stroke="none"
          >
            <path d="M12.031 2c-5.506 0-9.989 4.478-9.99 9.984a9.932 9.932 0 0 0 1.37 5.028L2 22l5.132-1.346a9.923 9.923 0 0 0 4.897 1.278h.005c5.503 0 9.989-4.478 9.99-9.984a9.957 9.957 0 0 0-2.926-7.062 9.948 9.948 0 0 0-7.067-2.922zm5.729 14.136c-.246.696-1.436 1.307-1.966 1.393-.478.08-1.1.13-1.776-.088-.428-.14-.982-.323-1.68-.616-2.984-1.247-4.912-4.275-5.062-4.475-.15-.199-1.21-1.602-1.21-3.058 0-1.456.764-2.172 1.033-2.464.27-.291.597-.364.795-.364.199 0 .397.002.57.01.182.008.428-.073.671.513.246.598.84 2.052.912 2.199.073.146.121.317.024.513-.097.195-.146.317-.291.487-.146.17-.308.38-.44.513-.146.147-.3.308-.129.598.172.291.764 1.258 1.637 2.033.874.775 1.611 1.015 1.91 1.163.299.148.472.124.646-.073.174-.199.747-.87.946-1.167.199-.297.397-.247.671-.146.273.097 1.741.821 2.04 1.015.299.195.497.291.57.417.073.125.073.721-.173 1.417z" />
          </svg>

          {/* Hover Tooltip */}
          <span
            className={`absolute ${
              dir === 'rtl'
                ? 'left-[calc(100%+12px)] origin-left'
                : 'right-[calc(100%+12px)] origin-right'
            } scale-0 group-hover:scale-100 transition-all duration-200 ease-out bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold px-3 py-2 rounded-xl shadow-lg whitespace-nowrap pointer-events-none`}
          >
            {tooltipText}
            {/* Tooltip arrow */}
            <span
              className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-slate-900 dark:bg-white ${
                dir === 'rtl' ? '-left-1' : '-right-1'
              }`}
            />
          </span>
        </a>
      </div>
    </div>
  );
};
