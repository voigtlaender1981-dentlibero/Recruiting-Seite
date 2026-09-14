import React from 'react';
import { Logo } from './Logo';
import { Phone, Mail, MapPin, ExternalLink, Shield, Inbox } from 'lucide-react';

interface FooterProps {
  onOpenPrivacyModal: () => void;
  onOpenAdminModal: () => void;
  applicationsCount: number;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacyModal,
  onOpenAdminModal,
  applicationsCount
}) => {
  return (
    <footer className="bg-[#1C2024] text-white pt-12 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 pb-10 border-b border-gray-800">
          {/* Col 1: Logo & Mission */}
          <div className="lg:col-span-2">
            <Logo variant="light" size="md" className="mb-4" />
            <p className="text-sm text-gray-400 max-w-md leading-relaxed mb-4">
              Zahnarztpraxis Antje Voigtländer – Deine Wohlfühl-Praxis im Westen von Fürth in Zirndorf-Wintersdorf. Wir verbinden moderne Zahnmedizin mit Herzlichkeit, Respekt und echtem Teamgeist.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.zahnarzt-wintersdorf.de/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/90 hover:text-white bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-lg transition-colors"
              >
                <span>Zur Haupt-Webseite</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={onOpenAdminModal}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                title="Eingegangene Bewerbungen einsehen"
              >
                <Inbox className="w-3.5 h-3.5 text-[#921B29]" />
                <span>Posteingang ({applicationsCount})</span>
              </button>
            </div>
          </div>

          {/* Col 2: Kontakt & Anfahrt */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-3">
              Kontakt & Praxis
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#921B29] shrink-0 mt-0.5" />
                <span>
                  Ansbacher Straße 77<br />
                  90513 Zirndorf OT Wintersdorf
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#921B29] shrink-0" />
                <a href="tel:09127951211" className="hover:text-white">
                  09127 / 95 12 11
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#921B29] shrink-0" />
                <a href="mailto:voigtlaender@zahnarzt-wintersdorf.de" className="hover:text-white break-all">
                  voigtlaender@zahnarzt-wintersdorf.de
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Rechtliches */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-3">
              Rechtliches
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button
                  type="button"
                  onClick={onOpenPrivacyModal}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Shield className="w-3.5 h-3.5 text-[#921B29]" />
                  <span>Datenschutz & Bewerber-DSGVO</span>
                </button>
              </li>
              <li>
                <a
                  href="https://www.zahnarzt-wintersdorf.de/impressum/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>Impressum (Hauptseite)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li className="text-[11px] text-gray-500 pt-2 leading-tight">
                Zuständige Kammer: Bayerische Landeszahnärztekammer (BLZK)
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} Zahnarztpraxis Antje Voigtländer. Alle Rechte vorbehalten.
          </p>
          <p className="text-center sm:text-right">
            Offizielle Recruiting Landing Page für die ZFA-Kampagne
          </p>
        </div>
      </div>
    </footer>
  );
};
