import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'brand';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'brand',
  size = 'md'
}) => {
  const isLight = variant === 'light';
  const redColor = isLight ? '#FFFFFF' : '#721422';
  const grayColor = isLight ? '#E5E7EB' : '#4d4d4d';
  const subTextColor = isLight ? 'text-white/80' : 'text-[#4d4d4d]';

  const sizeClasses = {
    sm: {
      wrap: 'gap-2',
      iconW: 'w-10 h-7',
      title: 'text-sm tracking-wide',
      sub: 'text-[8.5px] tracking-[0.2em]'
    },
    md: {
      wrap: 'gap-3',
      iconW: 'w-13 h-9',
      title: 'text-base sm:text-lg tracking-wide',
      sub: 'text-[9.5px] sm:text-[11px] tracking-[0.22em]'
    },
    lg: {
      wrap: 'gap-3.5',
      iconW: 'w-16 h-11',
      title: 'text-xl sm:text-2xl tracking-wide',
      sub: 'text-xs sm:text-sm tracking-[0.24em]'
    },
    xl: {
      wrap: 'gap-4',
      iconW: 'w-20 h-14',
      title: 'text-2xl sm:text-3xl tracking-wide',
      sub: 'text-sm sm:text-base tracking-[0.26em]'
    }
  }[size];

  return (
    <div className={`inline-flex items-center select-none ${sizeClasses.wrap} ${className}`}>
      {/* Official Zahnarztpraxis Antje Voigtländer Tooth Silhouette Mark */}
      <div className={`relative flex items-center justify-center shrink-0 ${sizeClasses.iconW}`}>
        <svg
          viewBox="0 0 130 96"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top Grey Swoop Accent (#4d4d4d / Cool Gray 10 C) */}
          <path
            d="M 66 18 C 82 14, 98 20, 110 32 C 96 30, 84 28, 68 27 C 63 23, 63 19, 66 18 Z"
            fill={grayColor}
          />

          {/* Primary Perlrubinrot (#721422) Continuous Tooth Silhouette Loop */}
          <path
            d="M 116 80 C 94 86, 64 88, 38 86 C 18 84, 6 66, 8 48 C 10 28, 22 16, 40 16 C 53 16, 62 26, 70 29 C 86 32, 104 40, 112 54 C 117 62, 115 74, 107 79"
            stroke={redColor}
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Inner Tooth Ridge Contour */}
          <path
            d="M 26 62 C 28 74, 44 82, 74 82 C 96 82, 110 78, 122 70"
            stroke={redColor}
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
          />
        </svg>
      </div>

      {/* Typography according to Logo112018 specifications */}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline gap-1 leading-none font-sans font-extrabold uppercase">
          <span style={{ color: redColor }} className={sizeClasses.title}>
            Zahnarzt
          </span>
          <span style={{ color: grayColor }} className={sizeClasses.title}>
            praxis
          </span>
        </div>
        <span
          className={`font-semibold uppercase leading-tight font-sans mt-0.5 ${subTextColor} ${sizeClasses.sub}`}
        >
          Antje Voigtländer
        </span>
      </div>
    </div>
  );
};

