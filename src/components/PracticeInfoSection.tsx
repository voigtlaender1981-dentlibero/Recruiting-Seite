import React from 'react';
import { MapPin, Phone, Mail, Clock, Car, Building2, ExternalLink } from 'lucide-react';
import { ZFA_JOB_DATA } from '../data/jobData';

export const PracticeInfoSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-white border-t border-[#E5DFD6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Practice & Team presentation */}
          <div className="lg:col-span-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#721422] bg-[#721422]/5 border border-[#721422]/15 rounded-full mb-3">
              Unser Standort & Erreichbarkeit
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2421] tracking-tight mb-4">
              Zahnarztpraxis Antje Voigtländer in Zirndorf-Wintersdorf
            </h2>
            <p className="text-sm sm:text-base text-[#4d4d4d] mb-6 leading-relaxed">
              Unsere moderne Praxis liegt verkehrsgünstig im Ortsteil Wintersdorf westlich von Fürth und Nürnberg. Bei uns erwartet dich ein ruhiges, angenehmes Arbeitsumfeld ohne großstädtische Parkplatznot oder täglichen Stau.
            </p>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3.5 p-3.5 bg-[#FAF8F5] rounded-xl border border-[#EBE5DC]">
                <MapPin className="w-5 h-5 text-[#721422] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1F2421] block">Adresse & Anfahrt</strong>
                  <span className="text-[#4d4d4d]">
                    Ansbacher Straße 77, 90513 Zirndorf OT Wintersdorf
                  </span>
                  <span className="text-xs text-[#721422] block mt-0.5 font-medium">
                    (Direkt über dem Sonderpreis-Baumarkt, 1. OG mit barrierefreiem Aufzug)
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 bg-[#FAF8F5] rounded-xl border border-[#EBE5DC]">
                <Car className="w-5 h-5 text-[#721422] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1F2421] block">Parken & Öffentlicher Nahverkehr</strong>
                  <span className="text-[#4d4d4d]">
                    Zahlreiche kostenfreie Parkplätze direkt vor dem Eingang. Bushaltestelle in unmittelbarer Nähe mit direkter Verbindung nach Zirndorf und Fürth.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 bg-[#FAF8F5] rounded-xl border border-[#EBE5DC]">
                <Phone className="w-5 h-5 text-[#721422] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1F2421] block">Fragen vorab? Ruf uns gerne an:</strong>
                  <a
                    href="tel:09127951211"
                    className="font-bold text-[#721422] hover:underline"
                  >
                    09127 / 95 12 11
                  </a>
                  <span className="text-xs text-[#4d4d4d] block">
                    Gerne beantworten wir deine Fragen ganz vertraulich.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Practice Card & Contact summary */}
          <div className="lg:col-span-6">
            <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-8 border border-[#E2DDD5] shadow-xs">
              <h3 className="text-lg font-bold text-[#1F2421] mb-2 flex items-center justify-between">
                <span>Praxis-Fakten auf einen Blick</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" title="Geöffnet" />
              </h3>

              <div className="grid grid-cols-2 gap-4 my-5">
                <div className="p-3 bg-white rounded-xl border border-[#EBE5DC]">
                  <span className="text-xs text-[#4d4d4d] block">Inhaberin</span>
                  <span className="text-sm font-bold text-[#1F2421]">Antje Voigtländer</span>
                  <span className="text-[11px] text-[#721422]">Zahnärztin</span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-[#EBE5DC]">
                  <span className="text-xs text-[#4d4d4d] block">Spezialisierung</span>
                  <span className="text-sm font-bold text-[#1F2421]">Ästhetik & Zahnerhalt</span>
                  <span className="text-[11px] text-[#4d4d4d]">Laser & 3D-Scan</span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-[#EBE5DC]">
                  <span className="text-xs text-[#4d4d4d] block">Gebäude</span>
                  <span className="text-sm font-bold text-[#1F2421]">1. Obergeschoss</span>
                  <span className="text-[11px] text-emerald-700 font-medium">Mit Aufzug (barrierefrei)</span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-[#EBE5DC]">
                  <span className="text-xs text-[#4d4d4d] block">Parkplatz</span>
                  <span className="text-sm font-bold text-[#1F2421]">Kostenlos</span>
                  <span className="text-[11px] text-[#4d4d4d]">Direkt vor der Tür</span>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-[#EBE5DC] text-xs text-[#4d4d4d] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#1F2421]">Haupt-Webseite:</span>
                  <a
                    href="https://www.zahnarzt-wintersdorf.de/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#721422] hover:underline font-medium"
                  >
                    <span>zahnarzt-wintersdorf.de</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#1F2421]">Bewerbungs-E-Mail:</span>
                  <a
                    href="mailto:voigtlaender@zahnarzt-wintersdorf.de"
                    className="text-[#721422] hover:underline font-medium"
                  >
                    voigtlaender@zahnarzt-wintersdorf.de
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
