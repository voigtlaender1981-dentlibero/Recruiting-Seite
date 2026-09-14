import React, { useState } from 'react';
import {
  CheckCircle2,
  Mail,
  Printer,
  Copy,
  Check,
  Download,
  Calendar,
  Phone,
  FileText,
  Briefcase,
  User,
  ArrowRight,
  ShieldCheck,
  Share2
} from 'lucide-react';
import { ApplicationData } from '../types';

interface SuccessViewProps {
  data: ApplicationData;
  onReset: () => void;
}

export const SuccessView: React.FC<SuccessViewProps> = ({ data, onReset }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const formattedDate = new Date(data.createdAt).toLocaleString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const generateMailtoBody = () => {
    const text = `
Bewerbung als Zahnmedizinische Fachangestellte (m/w/d)
Zahnarztpraxis Antje Voigtländer, Wintersdorf

Referenznummer: ${data.id}
Eingegangen am: ${formattedDate}

KONTAKTDATEN:
- Name: ${data.firstName} ${data.lastName}
- E-Mail: ${data.email}
- Telefon: ${data.phone}

RAHMENDATEN & VERFÜGBARKEIT:
- Arbeitszeitmodell: ${data.workingTime} ${data.weeklyHours ? `(${data.weeklyHours})` : ''}
- Verfügbarkeit: ${
      data.availability === 'ab-sofort'
        ? 'Ab sofort'
        : data.availability === '1-monat'
        ? 'In 1 Monat'
        : data.availability === '3-monate'
        ? 'In 3 Monaten'
        : `Wunschtermin: ${data.customDate || 'nach Absprache'}`
    }
- Gehaltsvorstellung: ${data.salaryExpectation || 'Nach Vereinbarung'}

QUALIFIKATIONEN & SCREENING:
- ZFA-Ausbildung: ${data.completedZfaTraining === 'ja' ? 'Ja, erfolgreich abgeschlossen' : data.completedZfaTraining === 'in-ausbildung' ? 'Aktuell im 3. Lehrjahr' : 'Quereinstieg / ähnlich'}
- Röntgenschein: ${data.hasRoentgenCertificate === 'ja' ? 'Ja, gültig' : data.hasRoentgenCertificate === 'in-erneuerung' ? 'Aktualisierung steht an' : 'Noch nicht vorhanden'}
- Schwerpunkte / Kenntnisse: ${data.skills.join(', ')}
${data.additionalNotes ? `- Notizen / Wünsche: ${data.additionalNotes}` : ''}

HOCHGELADENE DOKUMENTE:
${data.files.length > 0 ? data.files.map((f) => `• ${f.name} (${(f.size / 1024 / 1024).toFixed(2)} MB)`).join('\n') : '• Keine Dateien angehängt (werden nachgereicht)'}

RECHTLICHES:
- Einwilligung DSGVO-konforme Verarbeitung: Erteilt (Ja)
Empfänger: voigtlaender@zahnarzt-wintersdorf.de
    `.trim();

    return encodeURIComponent(text);
  };

  const mailtoSubject = encodeURIComponent(
    `Bewerbung ZFA: ${data.firstName} ${data.lastName} (Ref: ${data.id})`
  );
  const mailtoHref = `mailto:voigtlaender@zahnarzt-wintersdorf.de?subject=${mailtoSubject}&body=${generateMailtoBody()}`;

  const copySummaryToClipboard = () => {
    const rawText = `
Bewerbung als ZFA - Zahnarztpraxis Antje Voigtländer
Referenz: ${data.id}
Bewerber/in: ${data.firstName} ${data.lastName}
E-Mail: ${data.email}
Telefon: ${data.phone}
Arbeitszeit: ${data.workingTime} ${data.weeklyHours || ''}
Verfügbarkeit: ${data.availability}
Qualifikationen: ${data.skills.join(', ')}
Empfänger: voigtlaender@zahnarzt-wintersdorf.de
    `.trim();

    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="py-12 sm:py-16 bg-[#FAF8F5]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success confirmation hero banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-200 shadow-xl mb-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-full mb-2">
            Erfolgreich eingegangen
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2421] tracking-tight">
            Vielen Dank, {data.firstName}!
          </h2>
          <p className="mt-2 text-base text-[#4C5360] max-w-lg mx-auto">
            Deine Express-Bewerbung wurde erfasst und eine strukturierte Zusammenfassung an Frau Voigtländer übermittelt.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#FAF8F5] rounded-xl border border-[#E2DDD5] text-xs font-mono text-[#505663]">
            <span>Referenz-ID:</span>
            <strong className="text-[#721422]">{data.id}</strong>
            <span>• {formattedDate}</span>
          </div>

          {/* Quick Action Buttons for candidate / reviewer */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={mailtoHref}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-white bg-[#721422] hover:bg-[#5e101c] rounded-xl shadow-sm transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>In Mail-App öffnen (voigtlaender@...)</span>
            </a>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold text-[#2D3139] bg-white border border-[#D5CEC4] hover:bg-[#FAF8F5] rounded-xl transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#721422]" />
              <span>Drucken / PDF</span>
            </button>

            <button
              type="button"
              onClick={copySummaryToClipboard}
              className="inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold text-[#2D3139] bg-white border border-[#D5CEC4] hover:bg-[#FAF8F5] rounded-xl transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Kopiert!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#721422]" />
                  <span>Kopieren</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Detailed Application Summary Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5DFD6] shadow-md mb-8">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#EBE5DC]">
            <div>
              <h3 className="text-lg font-bold text-[#1F2421]">
                Zusammenfassung deiner Bewerbung
              </h3>
              <p className="text-xs text-[#6C727F]">
                Empfängerin: Zahnarztpraxis Antje Voigtländer (voigtlaender@zahnarzt-wintersdorf.de)
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-[#721422]/10 text-[#721422] rounded-lg">
              ZFA (m/w/d)
            </span>
          </div>

          <div className="space-y-6 text-sm">
            {/* Contact row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-[#FAF8F5] rounded-xl border border-[#EBE5DC]">
              <div>
                <span className="text-xs text-[#717885] block mb-0.5">Name:</span>
                <span className="font-bold text-[#1F2421]">
                  {data.firstName} {data.lastName}
                </span>
              </div>
              <div>
                <span className="text-xs text-[#717885] block mb-0.5">E-Mail:</span>
                <span className="font-medium text-[#1F2421]">{data.email}</span>
              </div>
              <div>
                <span className="text-xs text-[#717885] block mb-0.5">Telefon:</span>
                <span className="font-medium text-[#1F2421]">{data.phone}</span>
              </div>
            </div>

            {/* Framework & Availability */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <span className="text-xs text-[#717885] block mb-0.5">Arbeitszeit:</span>
                <span className="font-semibold text-[#1F2421]">
                  {data.workingTime}{' '}
                  {data.weeklyHours ? `(${data.weeklyHours})` : ''}
                </span>
              </div>
              <div>
                <span className="text-xs text-[#717885] block mb-0.5">Verfügbarkeit:</span>
                <span className="font-semibold text-[#1F2421]">
                  {data.availability === 'ab-sofort'
                    ? 'Ab sofort'
                    : data.availability === '1-monat'
                    ? 'In 1 Monat'
                    : data.availability === '3-monate'
                    ? 'In 3 Monaten'
                    : `Wunschtermin: ${data.customDate || 'nach Vereinbarung'}`}
                </span>
              </div>
              <div>
                <span className="text-xs text-[#717885] block mb-0.5">Gehaltsvorstellung:</span>
                <span className="font-semibold text-[#1F2421]">
                  {data.salaryExpectation || 'Nach Tarif / Absprache'}
                </span>
              </div>
            </div>

            {/* Qualifications */}
            <div className="space-y-3 pt-4 border-t border-[#EBE5DC]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-xs text-[#717885] block mb-0.5">Ausbildung ZFA:</span>
                  <span className="font-medium text-[#1F2421]">
                    {data.completedZfaTraining === 'ja'
                      ? '✓ Ja, erfolgreich abgeschlossen'
                      : data.completedZfaTraining === 'in-ausbildung'
                      ? 'Aktuell im 3. Lehrjahr'
                      : 'Quereinstieg / ähnlich'}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-[#717885] block mb-0.5">Röntgenschein:</span>
                  <span className="font-medium text-[#1F2421]">
                    {data.hasRoentgenCertificate === 'ja'
                      ? '✓ Gültiger Nachweis vorhanden'
                      : data.hasRoentgenCertificate === 'in-erneuerung'
                      ? 'Aktualisierung steht an'
                      : 'Noch nicht vorhanden'}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-xs text-[#717885] block mb-1">Schwerpunkte & Bereiche:</span>
                <div className="flex flex-wrap gap-1.5">
                  {data.skills.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-[#721422]/5 text-[#721422] text-xs font-semibold rounded-lg border border-[#721422]/15"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {data.additionalNotes && (
                <div>
                  <span className="text-xs text-[#717885] block mb-0.5">Persönliche Nachricht:</span>
                  <p className="text-xs text-[#3E434E] bg-[#FAF8F5] p-3 rounded-lg border border-[#E8E2D9]">
                    {data.additionalNotes}
                  </p>
                </div>
              )}
            </div>

            {/* Documents */}
            <div className="pt-4 border-t border-[#EBE5DC]">
              <span className="text-xs text-[#717885] block mb-1">Hochgeladene Unterlagen:</span>
              {data.files.length > 0 ? (
                <div className="space-y-1.5">
                  {data.files.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center gap-2 p-2 bg-[#FAF8F5] rounded-lg text-xs"
                    >
                      <FileText className="w-4 h-4 text-[#721422]" />
                      <span className="font-medium text-[#1F2421]">{file.name}</span>
                      <span className="text-[#6C727F]">
                        ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-xs text-[#6C727F] italic">
                  Keine Dokumente beigefügt (werden zum Gespräch mitgebracht oder nachgereicht).
                </span>
              )}
            </div>

            {/* Legal */}
            <div className="pt-4 border-t border-[#EBE5DC] flex items-center gap-2 text-xs text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                DSGVO-Einwilligung erteilt am {formattedDate}. Daten werden verschlüsselt gespeichert und nur für das Bewerbungsverfahren genutzt.
              </span>
            </div>
          </div>
        </div>

        {/* What happens next section */}
        <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#E5DFD6] text-center">
          <h4 className="text-base font-bold text-[#1F2421] mb-2">
            Wie geht es jetzt weiter?
          </h4>
          <p className="text-xs sm:text-sm text-[#505663] max-w-lg mx-auto mb-4">
            Frau Voigtländer oder unsere Praxisleitung prüft deine Angaben und meldet sich in der Regel innerhalb von 24 bis 48 Stunden telefonisch oder per E-Mail für ein unkompliziertes Kennenlernen bei dir.
          </p>
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-semibold text-[#721422] hover:underline cursor-pointer"
          >
            ← Weitere Bewerbung einreichen oder Angaben bearbeiten
          </button>
        </div>
      </div>
    </section>
  );
};
