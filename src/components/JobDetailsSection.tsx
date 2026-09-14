import React from 'react';
import {
  CheckCircle2,
  Award,
  Briefcase,
  Gift,
  FileDown,
  ArrowDown
} from 'lucide-react';
import { ZFA_JOB_DATA } from '../data/jobData';

interface JobDetailsSectionProps {
  onOpenExpose: () => void;
  onScrollToForm: () => void;
}

export const JobDetailsSection: React.FC<JobDetailsSectionProps> = ({
  onOpenExpose,
  onScrollToForm
}) => {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#721422] bg-[#721422]/5 border border-[#721422]/15 rounded-full mb-3">
            Stellenprofil im Detail
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1F2421] tracking-tight">
            Das erwartet dich bei uns als ZFA (m/w/d)
          </h2>
          <p className="mt-3 text-base text-[#4d4d4d]">
            Für eine optimale Versorgung unserer Patientinnen und Patienten suchen wir langfristige Unterstützung insbesondere in der Behandlungsassistenz.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {/* Card 1: Deine Aufgaben */}
          <div className="bg-[#FAF8F5] rounded-2xl p-6 sm:p-7 border border-[#E9E4DC] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#721422] text-white flex items-center justify-center mb-5 shadow-xs">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#1F2421] mb-4 flex items-center gap-2">
                <span>Deine Aufgaben</span>
              </h3>
              <ul className="space-y-3">
                {ZFA_JOB_DATA.tasks.map((task, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-[#2D3139] leading-relaxed">
                    <span className="w-2 h-2 rounded-full bg-[#721422] mt-1.5 shrink-0" />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 2: Dein Profil */}
          <div className="bg-[#FAF8F5] rounded-2xl p-6 sm:p-7 border border-[#E9E4DC] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#721422] text-white flex items-center justify-center mb-5 shadow-xs">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#1F2421] mb-4 flex items-center gap-2">
                <span>Dein Profil</span>
              </h3>
              <ul className="space-y-3">
                {ZFA_JOB_DATA.qualifications.map((qual, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-[#2D3139] leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{qual}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 3: Wir bieten dir */}
          <div className="bg-gradient-to-b from-[#721422]/5 to-[#721422]/10 rounded-2xl p-6 sm:p-7 border border-[#721422]/20 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#721422] text-white flex items-center justify-center mb-5 shadow-xs">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#721422] mb-4 flex items-center gap-2">
                <span>Das bieten wir dir</span>
              </h3>
              <ul className="space-y-3">
                {ZFA_JOB_DATA.benefits.map((ben, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-[#2D3139] leading-relaxed font-medium">
                    <span className="w-5 h-5 rounded-full bg-white text-[#721422] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-2xs">
                      ✓
                    </span>
                    <span>{ben}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-5 border-t border-[#721422]/15">
              <div className="bg-white p-3.5 rounded-xl border border-[#721422]/20 text-center">
                <span className="text-xs font-semibold text-[#721422] block">
                  Bereits ab sofort möglich!
                </span>
                <span className="text-xs text-[#4d4d4d]">
                  Einstiegszeitpunkt flexibel nach deiner Kündigungsfrist.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Banner with Exposé Download */}
        <div className="bg-[#FAF8F5] border border-[#E5DFD6] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#721422]/10 text-[#721422] flex items-center justify-center shrink-0">
              <FileDown className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-[#1F2421]">
                Ausführliches PDF-Exposé der Stellenanzeige
              </h4>
              <p className="text-xs sm:text-sm text-[#4d4d4d]">
                Lade dir die vollständige Stellenanzeige als PDF herunter oder teile sie mit Kolleginnen.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onOpenExpose}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-[#721422] bg-white border border-[#721422]/30 hover:bg-[#FAF6F3] active:scale-95 rounded-xl shadow-2xs transition-all cursor-pointer whitespace-nowrap"
            >
              <FileDown className="w-4 h-4" />
              <span>PDF-Exposé öffnen & downloaden</span>
            </button>

            <button
              type="button"
              onClick={onScrollToForm}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-white bg-[#721422] hover:bg-[#5e101c] active:scale-95 rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Jetzt bewerben</span>
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
