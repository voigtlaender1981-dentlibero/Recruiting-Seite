import React from 'react';
import { X, Download, Printer, Share2, Check, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import { ZFA_JOB_DATA } from '../data/jobData';

interface PdfExposeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PdfExposeModal: React.FC<PdfExposeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden my-6 border border-[#D5CEC4]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar (hidden in print) */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#FAF8F5] border-b border-[#E2DDD5] print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#721422]">
              PDF-Stellen-Exposé
            </span>
            <span className="text-xs text-[#4d4d4d]">• Original Stellenanzeige</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#721422] hover:bg-[#5e101c] rounded-lg transition-colors cursor-pointer"
              title="Als PDF drucken oder speichern"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Drucken / PDF speichern</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-[#4d4d4d] hover:text-[#1F2421] hover:bg-[#EBE5DC] rounded-lg transition-colors cursor-pointer"
              title="Schließen"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* The Printable Exposé Flyer (1:1 with the provided Stellenanzeige PDF) */}
        <div id="expose-print-container" className="p-6 sm:p-10 bg-white text-[#2D3139] font-sans">
          {/* Header Row: Job Heading on Left, Official Logo on Right */}
          <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-[#EBE5DC]">
            <div className="space-y-1">
              <span className="text-sm sm:text-base font-medium text-[#4d4d4d] block">
                Wir suchen zur Verstärkung unseres Teams eine/n
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-[#1F2421] tracking-tight leading-tight">
                Zahnmedizinische Fachangestellte <span className="font-semibold text-[#4d4d4d] text-xl sm:text-2xl">(m/w/d)</span>
              </h1>
              <p className="text-base sm:text-lg font-bold text-[#721422]">
                ab sofort in Teil- oder Vollzeit
              </p>
            </div>

            <div className="self-end sm:self-auto shrink-0">
              <Logo size="lg" />
            </div>
          </div>

          {/* Location & Intro Note */}
          <div className="py-5 space-y-1.5">
            <p className="text-sm font-semibold text-[#1F2421]">
              Die Praxis befindet sich westlich von Fürth in Zirndorf OT Wintersdorf.
            </p>
            <p className="text-sm text-[#4d4d4d] leading-relaxed">
              Für eine optimale Versorgung unserer Patienten suchen wir aktuell Verstärkung. Insbesondere für die Behandlungsassistenz benötigen wir langfristig Unterstützung.
            </p>
          </div>

          {/* Structured Sections matching PDF exactly */}
          <div className="space-y-6 pt-2">
            {/* Ihre Aufgaben */}
            <div>
              <h2 className="text-base font-extrabold text-[#721422] mb-2.5">
                Ihre Aufgaben:
              </h2>
              <ul className="space-y-1.5 text-sm text-[#2D3139]">
                {ZFA_JOB_DATA.tasks.map((task, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-[#721422] text-xs mt-1 shrink-0">■</span>
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ihre Qualifikation */}
            <div>
              <h2 className="text-base font-extrabold text-[#721422] mb-2.5">
                Ihre Qualifikation:
              </h2>
              <ul className="space-y-1.5 text-sm text-[#2D3139]">
                {ZFA_JOB_DATA.qualifications.map((q, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-[#721422] text-xs mt-1 shrink-0">■</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Wir bieten */}
            <div>
              <h2 className="text-base font-extrabold text-[#721422] mb-2.5">
                Wir bieten:
              </h2>
              <ul className="space-y-1.5 text-sm text-[#2D3139]">
                {ZFA_JOB_DATA.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-[#721422] text-xs mt-1 shrink-0">■</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Callout */}
          <div className="mt-8 pt-6 border-t border-[#EBE5DC] text-center">
            <h3 className="text-base sm:text-lg font-bold text-[#1F2421]">
              Wir freuen uns über Ihre Bewerbung!
            </h3>
            <p className="text-sm text-[#4d4d4d] mt-1.5">
              Gerne per E-Mail an:{' '}
              <a
                href="mailto:voigtlaender@zahnarzt-wintersdorf.de"
                className="font-bold text-[#721422] hover:underline"
              >
                voigtlaender@zahnarzt-wintersdorf.de
              </a>
            </p>
            <p className="text-xs text-[#4d4d4d] mt-1 print:hidden">
              Oder direkt über das Express-Bewerbungsformular auf dieser Webseite!
            </p>
          </div>

          {/* Bottom Burgundy Bar matching official flyer footer */}
          <div className="bg-[#721422] text-white text-center py-4 px-4 -mx-6 sm:-mx-10 -mb-6 sm:-mb-10 mt-8">
            <p className="text-sm font-bold tracking-wide">
              ZahnarztPraxis Antje Voigtländer
            </p>
            <p className="text-xs text-white/90 mt-0.5">
              Ansbacher Straße 77, 90513 Zirndorf OT Wintersdorf
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

