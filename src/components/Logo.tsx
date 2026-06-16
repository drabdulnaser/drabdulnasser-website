import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 36 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-300 ${className}`}
    >
      {/* Left Arch (Dark Blue / Brand Primary) */}
      <path
        d="M 28 78 V 44 C 28 32, 36 24, 48 24 C 53 24, 56 27, 58 31"
        className="stroke-primary dark:stroke-slate-200"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Right Shape (Teal / Brand Accent) */}
      <path
        d="M 54 56 L 63 72 C 65.5 76, 70 78, 75 78 H 76 V 32"
        className="stroke-accent"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Center Spine S-Curve (Teal / Brand Accent) */}
      <path
        d="M 58 20 C 58 20, 50 35, 46 48 C 42 61, 52 72, 54 80"
        className="stroke-accent"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Center Spine Vertebrae Dots (Teal / Brand Accent) */}
      <path
        d="M 54 22 C 54 22, 46 37, 42 49 C 38 61, 48 71, 50 78"
        className="stroke-accent opacity-80"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeDasharray="0 9"
      />
    </svg>
  );
};

export default Logo;
