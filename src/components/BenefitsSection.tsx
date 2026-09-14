import React from 'react';
import {
  Users,
  Sparkles,
  CalendarCheck,
  GraduationCap,
  Car,
  Shield,
  Coffee,
  Check
} from 'lucide-react';
import { practiceImages } from '../assets/images';

export const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: Users,
      title: 'Familiäres & wertschätzendes Team',
      desc: 'Ein herzliches, eingespieltes Miteinander auf Augenhöhe. Bei uns bist du ein geschätzter Mensch und keine Nummer.',
      tag: 'Echtes Teamplay'
    },
    {
      icon: CalendarCheck,
      title: 'Planbare & verlässliche Arbeitszeiten',
      desc: 'Keine unbezahlten Überstundenberge. Wir respektieren deine Freizeit, dein Familienleben und deine Erholung.',
      tag: 'Work-Life-Balance'
    },
    {
      icon: Sparkles,
      title: 'Moderne Praxis & helle Räume',
      desc: 'Top ausgestattete Behandlungszimmer mit neuester zahnmedizinischer Technik, digitaler Röntgenanlage und ergonomischem Equipment.',
      tag: 'Modernste Technik'
    },
    {
      icon: GraduationCap,
      title: 'Gezielte Schulungen & Weiterbildung',
      desc: 'Egal ob Prophylaxe, Röntgen-Aktualisierung, Chirurgie-Assistenz oder QM – wir unterstützen und finanzieren deine Fortbildungen.',
      tag: 'Zukunftssicher'
    },
    {
      icon: Car,
      title: 'Stressfreie Anfahrt & Parkplatz',
      desc: 'Kostenlose Parkplätze direkt am Gebäude, ruhige Verkehrslage westlich von Fürth/Nürnberg und ein bequemer Aufzug im Haus.',
      tag: 'Komfort'
    },
    {
      icon: Coffee,
      title: 'Pausenraum & Wohlfühlatmosphäre',
      desc: 'Gemütlicher Rückzugsort für das Team, Kaffee, Erfrischungsgetränke und gemeinsame kleine Team-Auszeiten.',
      tag: 'Wohlfühlen'
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#F4EFEB] border-y border-[#E5DFD7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#721422] bg-white border border-[#721422]/20 rounded-full mb-3 shadow-2xs">
            Deine Vorteile bei uns
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1F2421] tracking-tight">
            Warum du dich in unserer Praxis sofort wohlfühlst
          </h2>
          <p className="mt-3 text-base text-[#4d4d4d]">
            Wir bieten dir mehr als nur einen Job: Einen krisensicheren Wohlfühl-Arbeitsplatz mit echter Kollegialität in Zirndorf-Wintersdorf.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-12">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#E4DDD4] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#721422]/10 text-[#721422] flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#721422] bg-[#721422]/5 px-2.5 py-1 rounded-full">
                      {b.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#1F2421] mb-2">
                    {b.title}
                  </h3>
                  <p className="text-sm text-[#4d4d4d] leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Authentic Atmosphere Visuals Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-md border border-[#E0D8CE] group">
            <img
              src={practiceImages.treatmentRoom}
              alt="Digitaler 3D-Intraoralscan und moderne Zahnheilkunde in der Praxis Antje Voigtländer"
              className="w-full h-64 sm:h-72 object-cover object-center group-hover:scale-102 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">Modernste Technik & 3D-Scan</span>
              <p className="text-sm font-medium">Digitaler Intraoral-Scan, ergonomische Zimmer & modernes Arbeiten</p>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-md border border-[#E0D8CE] group">
            <img
              src={practiceImages.reception}
              alt="Herzlicher Empfangsbereich der Zahnarztpraxis Antje Voigtländer in Wintersdorf"
              className="w-full h-64 sm:h-72 object-cover object-center group-hover:scale-102 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">Herzlicher Empfang</span>
              <p className="text-sm font-medium">Helle, einladende Atmosphäre für Patientinnen & Praxisteam</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
