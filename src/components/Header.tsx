import React, { useState, useEffect } from 'react';
import { Phone, FileText, ArrowRight, ExternalLink } from 'lucide-react';
import { Logo } from './Logo';

interface HeaderProps {
  onOpenExpose: () => void;
  onScrollToForm: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenExpose, onScrollToForm }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E8E2DA] py-3'
          : 'bg-[#FAF8F5] py-4 sm:py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Practice Branding & Home Link */}
          <a
            href="https://www.zahnarzt-wintersdorf.de/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center transition-transform active:scale-95"
            title="Zur Hauptseite der Zahnarztpraxis Antje Voigtländer"
          >
            <Logo size="md" />
          </a>

          {/* Quick Action Navigation */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Direct Phone link */}
            <a
              href="tel:09127951211"
              className="hidden md:inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#4d4d4d] hover:text-[#721422] rounded-lg transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#721422]" />
              <span>09127 / 95 12 11</span>
            </a>

            {/* Exposé Button */}
            <button
              type="button"
              onClick={onOpenExpose}
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 text-xs sm:text-sm font-medium text-[#721422] bg-[#721422]/5 hover:bg-[#721422]/10 border border-[#721422]/20 rounded-xl transition-all active:scale-95 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#721422]" />
              <span className="hidden sm:inline">Stellen-Exposé</span>
              <span className="sm:hidden">Exposé</span>
            </button>

            {/* Primary Express Apply CTA */}
            <button
              type="button"
              onClick={onScrollToForm}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#721422] hover:bg-[#5e101c] active:scale-95 shadow-sm hover:shadow rounded-xl transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Jetzt bewerben</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
