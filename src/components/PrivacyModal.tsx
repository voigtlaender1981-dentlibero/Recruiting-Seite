import React from 'react';
import { X, ShieldCheck, Lock } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-6 border border-[#D5CEC4]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 bg-[#FAF8F5] border-b border-[#E2DDD5]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#721422]" />
            <h3 className="text-base font-bold text-[#1F2421]">
              Datenschutzhinweise für Bewerberinnen und Bewerber (DSGVO)
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#6C727F] hover:text-[#1F2421] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 text-sm text-[#454B57] space-y-4 max-h-[70vh] overflow-y-auto leading-relaxed">
          <p>
            Der Schutz deiner persönlichen Daten ist uns ein wichtiges Anliegen. Nachfolgend informieren wir dich transparent über die Erhebung, Verarbeitung und Nutzung deiner Daten im Rahmen der Express-Bewerbung gemäß Art. 13 Datenschutz-Grundverordnung (DSGVO).
          </p>

          <div>
            <h4 className="font-bold text-[#1F2421] mb-1">1. Verantwortliche Stelle</h4>
            <p>
              Zahnarztpraxis Antje Voigtländer<br />
              Ansbacher Straße 77<br />
              90513 Zirndorf OT Wintersdorf<br />
              Telefon: 09127 / 95 12 11<br />
              E-Mail: voigtlaender@zahnarzt-wintersdorf.de
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#1F2421] mb-1">2. Zweck & Rechtsgrundlage der Datenverarbeitung</h4>
            <p>
              Wir verarbeiten die von dir im Bewerbungsformular angegebenen personenbezogenen Daten (Vorname, Nachname, E-Mail-Adresse, Telefonnummer, Angaben zu Verfügbarkeit, Qualifikationen sowie hochgeladene Dokumente wie Lebenslauf und Zertifikate) ausschließlich zum Zweck der Durchführung des Bewerbungsverfahrens und der Kontaktaufnahme mit dir.
            </p>
            <p className="mt-1">
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO (deine Einwilligung) sowie § 26 BDSG (Begründung eines Beschäftigungsverhältnisses).
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#1F2421] mb-1">3. Empfänger der Daten</h4>
            <p>
              Deine Bewerbungsdaten werden als strukturierte Zusammenfassung ausschließlich an die Inhaberin Frau Antje Voigtländer (<strong>voigtlaender@zahnarzt-wintersdorf.de</strong>) übermittelt. Eine Weitergabe an unbefugte Dritte findet zu keinem Zeitpunkt statt.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#1F2421] mb-1">4. Speicherdauer</h4>
            <p>
              Sofern es nicht zu einem Anstellungsverhältnis kommt, werden deine Bewerbungsdaten spätestens sechs Monate nach Abschluss des Bewerbungsverfahrens gelöscht, es sei denn, du hast ausdrücklich in eine längere Speicherung eingewilligt (z.B. Aufnahme in unseren Talent-Pool für spätere Vakanzen).
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#1F2421] mb-1">5. Deine Rechte</h4>
            <p>
              Du hast jederzeit das Recht auf unentgeltliche Auskunft über deine gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Außerdem kannst du eine erteilte Einwilligung zur Datenverarbeitung jederzeit mit Wirkung für die Zukunft per formloser Mitteilung an <strong>voigtlaender@zahnarzt-wintersdorf.de</strong> widerrufen.
            </p>
          </div>
        </div>

        <div className="px-6 py-4 bg-[#FAF8F5] border-t border-[#E2DDD5] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-[#721422] hover:bg-[#5e101c] rounded-xl transition-colors cursor-pointer"
          >
            Verstanden & Schließen
          </button>
        </div>
      </div>
    </div>
  );
};
