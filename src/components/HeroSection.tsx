import React from 'react';
import {
  Sparkles,
  Clock,
  MapPin,
  FileDown,
  ArrowDown,
  Heart,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { practiceImages } from '../assets/images';
import { ZFA_JOB_DATA } from '../data/jobData';

interface HeroSectionProps {
  onScrollToForm: () => void;
  onOpenExpose: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToForm,
  onOpenExpose,
}) => {
  return (
    <section className="relative overflow-hidden pt-4 pb-12 sm:pt-8 sm:pb-16 lg:pb-20">
      {/* Subtle warm background glow */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-[#721422]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -z-10 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Instagram Campaign Pill */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-[#721422] bg-[#721422]/10 border border-[#721422]/20 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#721422]" />
            <span>Wir suchen Verstärkung</span>
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200/60 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Express-Bewerbung ohne Anschreiben</span>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1F2421] tracking-tight leading-[1.15] mb-4">
              Zahnmedizinische <br className="hidden sm:inline" />
              <span className="text-[#721422] font-extrabold">
                Fachangestellte (m/w/d)
              </span>
            </h1>

            <p className="text-lg sm:text-xl font-medium text-[#4d4d4d] mb-6 leading-relaxed">
              Verstärke unser herzliches Team in Zirndorf-Wintersdorf ab sofort in{' '}
              <strong className="text-[#1F2421] font-semibold">Teil- oder Vollzeit</strong>.
              Schluss mit Hektik und Anonymität – bei uns zählt der Mensch.
            </p>

            {/* Core facts strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-[#E9E4DE] shadow-xs">
                <div className="w-9 h-9 rounded-lg bg-[#721422]/10 flex items-center justify-center text-[#721422] shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#721422]">Standort</span>
                  <p className="text-sm font-medium text-[#1F2421] leading-snug">
                    Wintersdorf (westlich von Fürth/Nürnberg)
                  </p>
                  <p className="text-xs text-[#4d4d4d]">Kostenlose Parkplätze vor Ort</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-[#E9E4DE] shadow-xs">
                <div className="w-9 h-9 rounded-lg bg-[#721422]/10 flex items-center justify-center text-[#721422] shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#721422]">Arbeitszeit</span>
                  <p className="text-sm font-medium text-[#1F2421] leading-snug">
                    Vollzeit oder Teilzeit (flexibel)
                  </p>
                  <p className="text-xs text-[#4d4d4d]">Geregelte Zeiten & keine Überstunden</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                type="button"
                onClick={onScrollToForm}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-bold text-white bg-[#721422] hover:bg-[#5e101c] active:scale-[0.98] rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Direkt in 60 Sek. bewerben</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </button>

              <button
                type="button"
                onClick={onOpenExpose}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-[#721422] bg-white hover:bg-[#FAF6F3] border border-[#721422]/30 active:scale-[0.98] rounded-xl transition-all shadow-xs cursor-pointer"
              >
                <FileDown className="w-4 h-4 text-[#721422]" />
                <span>PDF-Exposé der Stelle ansehen</span>
              </button>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-[#4d4d4d]">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                100% unverbindlich • Kein Anschreiben nötig • DSGVO-geschützt
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual with Real Team Atmosphere */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#E4DDD4] bg-white">
              <img
                src={practiceImages.hero}
                alt="Herzliches Team der Zahnarztpraxis Antje Voigtländer in Wintersdorf"
                className="w-full h-80 sm:h-96 lg:h-[420px] object-cover object-center"
                referrerPolicy="no-referrer"
              />

              {/* Floating Badge Overlay with Antje Voigtländer */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-white/95 backdrop-blur-md rounded-xl border border-[#E9E4DE] shadow-md flex items-center gap-3">
                <img
                  src={practiceImages.portrait}
                  alt="Zahnärztin Antje Voigtländer"
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#721422] shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#1F2421] truncate">
                    Antje Voigtländer • Praxisinhaberin
                  </p>
                  <p className="text-xs text-[#4d4d4d] leading-tight">
                    „Wir behandeln unsere Patientinnen und unser Team mit Herz, Wertschätzung & Fachkompetenz.“
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative accent element */}
            <div className="hidden sm:block absolute -top-3 -right-3 w-24 h-24 bg-dots-pattern opacity-30 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};
