import React from 'react';
import { X, Mail, CheckCircle2, User, Phone, Calendar, Briefcase, FileText, Download } from 'lucide-react';
import { ApplicationData } from '../types';

interface AdminPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  applications: ApplicationData[];
}

export const AdminPreviewModal: React.FC<AdminPreviewModalProps> = ({
  isOpen,
  onClose,
  applications
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden my-6 border border-[#D5CEC4]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#721422] text-white">
          <div className="flex items-center gap-2.5">
            <Mail className="w-5 h-5" />
            <div>
              <h3 className="text-base font-bold">
                Posteingang: voigtlaender@zahnarzt-wintersdorf.de
              </h3>
              <p className="text-xs text-white/80">
                Eingehende Zusammenfassungen von der Instagram-Kampagne ({applications.length})
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-white/80 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
          {applications.length === 0 ? (
            <div className="text-center py-12 text-[#6C727F]">
              <Mail className="w-12 h-12 text-[#D5CEC4] mx-auto mb-3" />
              <p className="text-base font-semibold text-[#1F2421]">
                Noch keine Bewerbungseingänge in dieser Sitzung
              </p>
              <p className="text-xs text-[#6C727F] mt-1 max-w-sm mx-auto">
                Fülle das Express-Bewerbungsformular auf der Seite aus, um zu sehen, wie die Bewerbung hier und in der E-Mail für Frau Voigtländer ankommt.
              </p>
            </div>
          ) : (
            applications.map((app) => (
              <div
                key={app.id}
                className="p-5 bg-[#FAF8F5] rounded-xl border border-[#E2DDD5] space-y-3"
              >
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#E8E2D8]">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#721422]">
                      {app.id}
                    </span>
                    <h4 className="text-base font-bold text-[#1F2421]">
                      {app.firstName} {app.lastName}
                    </h4>
                    <p className="text-xs text-[#6C727F]">
                      Eingegangen: {new Date(app.createdAt).toLocaleString('de-DE')}
                    </p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg">
                    ZFA Express-Bewerbung
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[#6C727F] block">E-Mail:</span>
                    <a href={`mailto:${app.email}`} className="font-semibold text-[#721422] hover:underline">
                      {app.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-[#6C727F] block">Telefon:</span>
                    <a href={`tel:${app.phone}`} className="font-semibold text-[#1F2421] hover:underline">
                      {app.phone}
                    </a>
                  </div>
                  <div>
                    <span className="text-[#6C727F] block">Modell & Verfügbarkeit:</span>
                    <span className="font-semibold text-[#1F2421]">
                      {app.workingTime} {app.weeklyHours ? `(${app.weeklyHours})` : ''} • {app.availability}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#6C727F] block">Gehaltserwartung:</span>
                    <span className="font-semibold text-[#1F2421]">
                      {app.salaryExpectation || 'Keine Angabe'}
                    </span>
                  </div>
                </div>

                <div className="text-xs">
                  <span className="text-[#6C727F] block mb-1">Qualifikationen:</span>
                  <div className="flex flex-wrap gap-1">
                    <span className="px-2 py-0.5 bg-white border border-[#D5CEC4] rounded font-medium text-[#1F2421]">
                      ZFA Ausbildung: {app.completedZfaTraining}
                    </span>
                    <span className="px-2 py-0.5 bg-white border border-[#D5CEC4] rounded font-medium text-[#1F2421]">
                      Röntgenschein: {app.hasRoentgenCertificate}
                    </span>
                    {app.skills.map((s, i) => (
                      <span key={i} className="px-2 py-0.5 bg-[#721422]/10 text-[#721422] rounded font-semibold">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {app.files.length > 0 && (
                  <div className="text-xs pt-2 border-t border-[#E8E2D8]">
                    <span className="text-[#6C727F] block mb-1">
                      Anhänge ({app.files.length}):
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {app.files.map((f) => (
                        <span
                          key={f.id}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#D5CEC4] rounded-lg text-xs"
                        >
                          <FileText className="w-3.5 h-3.5 text-[#721422]" />
                          <span>{f.name}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="px-6 py-3.5 bg-[#FAF8F5] border-t border-[#E2DDD5] flex items-center justify-between">
          <span className="text-xs text-[#6C727F]">
            Echte E-Mails gehen an: <strong>voigtlaender@zahnarzt-wintersdorf.de</strong>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-[#1F2421] bg-white border border-[#D5CEC4] hover:bg-[#EBE5DC] rounded-lg cursor-pointer"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};
