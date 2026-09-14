import React, { useState, useRef } from 'react';
import {
  Upload,
  FileText,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Clock,
  Briefcase,
  Sparkles,
  User,
  Mail,
  Phone,
  Euro,
  ArrowRight,
  ArrowLeft,
  Send,
  Lock,
  FileCheck
} from 'lucide-react';
import { ApplicationData, UploadedDocument } from '../types';
import { COMMON_SKILLS_OPTIONS } from '../data/jobData';

interface ApplicationFormProps {
  onSubmitSuccess: (data: ApplicationData) => void;
  onOpenPrivacyModal: () => void;
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({
  onSubmitSuccess,
  onOpenPrivacyModal
}) => {
  // Form step state: 1, 2, or 3
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form fields
  const [workingTime, setWorkingTime] = useState<'Vollzeit' | 'Teilzeit' | 'Flexibel'>('Vollzeit');
  const [weeklyHours, setWeeklyHours] = useState<string>('38');
  const [availability, setAvailability] = useState<'ab-sofort' | '1-monat' | '3-monate' | 'wunschdatum'>('ab-sofort');
  const [customDate, setCustomDate] = useState<string>('');
  const [salaryExpectation, setSalaryExpectation] = useState<string>('Nach Tarif / Verhandlungsbasis');

  // Step 2: Qualifications & Screening
  const [completedZfaTraining, setCompletedZfaTraining] = useState<'ja' | 'nein' | 'in-ausbildung'>('ja');
  const [hasRoentgenCertificate, setHasRoentgenCertificate] = useState<'ja' | 'nein' | 'in-erneuerung'>('ja');
  const [skills, setSkills] = useState<string[]>([
    'Behandlungsassistenz (Allgemein)',
    'Röntgen & digitale Volumentomographie'
  ]);
  const [additionalNotes, setAdditionalNotes] = useState<string>('');

  // Step 3: Contact & Documents
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [files, setFiles] = useState<UploadedDocument[]>([]);
  const [dsgvoConsent, setDsgvoConsent] = useState<boolean>(false);

  // Drag and Drop state
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleSkill = (skill: string) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter((s) => s !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  };

  const handleFilesAdded = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setErrorMsg(null);

    const newDocs: UploadedDocument[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      // Max 15MB check
      if (file.size > 15 * 1024 * 1024) {
        setErrorMsg(`Die Datei "${file.name}" ist größer als das Limit von 15 MB.`);
        continue;
      }

      let category: 'cv' | 'certificate' | 'reference' | 'other' = 'other';
      const lower = file.name.toLowerCase();
      if (lower.includes('cv') || lower.includes('lebenslauf')) {
        category = 'cv';
      } else if (lower.includes('zeugnis') || lower.includes('zertifikat') || lower.includes('röntgen')) {
        category = 'certificate';
      }

      newDocs.push({
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        size: file.size,
        type: file.type || 'application/octet-stream',
        category
      });
    }

    setFiles((prev) => [...prev, ...newDocs]);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const validateStep1 = () => {
    if (availability === 'wunschdatum' && !customDate) {
      setErrorMsg('Bitte gib dein gewünschtes Startdatum an.');
      return false;
    }
    setErrorMsg(null);
    return true;
  };

  const validateStep2 = () => {
    if (skills.length === 0) {
      setErrorMsg('Bitte wähle mindestens einen Bereich aus (z.B. Behandlungsassistenz).');
      return false;
    }
    setErrorMsg(null);
    return true;
  };

  const validateStep3 = () => {
    if (!firstName.trim() || !lastName.trim()) {
      setErrorMsg('Bitte gib deinen vollständigen Vornamen und Nachnamen ein.');
      return false;
    }
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setErrorMsg('Bitte gib eine gültige E-Mail-Adresse ein.');
      return false;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 6) {
      setErrorMsg('Bitte gib eine gültige Telefonnummer für Rückfragen an.');
      return false;
    }
    if (!dsgvoConsent) {
      setErrorMsg('Bitte willige in die DSGVO-konforme Datenverarbeitung ein, um fortzufahren.');
      return false;
    }
    setErrorMsg(null);
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
      window.scrollTo({ top: (document.getElementById('bewerbung')?.offsetTop || 400) - 80, behavior: 'smooth' });
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
      window.scrollTo({ top: (document.getElementById('bewerbung')?.offsetTop || 400) - 80, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setErrorMsg(null);
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: (document.getElementById('bewerbung')?.offsetTop || 400) - 80, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setIsSubmitting(true);

    const submission: ApplicationData = {
      id: `ZW-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      workingTime,
      weeklyHours: workingTime === 'Teilzeit' ? weeklyHours : undefined,
      availability,
      customDate: availability === 'wunschdatum' ? customDate : undefined,
      salaryExpectation,
      completedZfaTraining,
      hasRoentgenCertificate,
      skills,
      additionalNotes,
      firstName,
      lastName,
      email,
      phone,
      files,
      dsgvoConsent
    };

    // Simulate reliable network dispatch & email preparation
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitSuccess(submission);
    }, 750);
  };

  return (
    <section id="bewerbung" className="py-12 sm:py-16 bg-[#FAF8F5] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header of Form */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#721422] bg-[#721422]/10 border border-[#721422]/20 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#721422]" />
            <span>In nur 60 Sekunden</span>
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1F2421] tracking-tight">
            Deine Express-Bewerbung als ZFA
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#525866]">
            Unkompliziert, direkt & ohne langes Anschreiben. Deine Daten gehen direkt an Frau Antje Voigtländer.
          </p>
        </div>

        {/* Multi-Step Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative max-w-xl mx-auto">
            {/* Background Line */}
            <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-1 bg-[#E4DDD3] -z-0" />
            <div
              className="absolute top-1/2 left-4 -translate-y-1/2 h-1 bg-[#721422] transition-all duration-300 -z-0"
              style={{
                width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%'
              }}
            />

            {/* Step 1 Circle */}
            <div className="flex flex-col items-center z-10">
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all shadow-xs ${
                  currentStep >= 1
                    ? 'bg-[#721422] text-white ring-4 ring-[#FAF8F5]'
                    : 'bg-[#E4DDD3] text-[#717885]'
                }`}
              >
                1
              </div>
              <span className={`text-[11px] sm:text-xs font-semibold mt-1.5 whitespace-nowrap ${
                currentStep >= 1 ? 'text-[#721422]' : 'text-[#717885]'
              }`}>
                Rahmendaten
              </span>
            </div>

            {/* Step 2 Circle */}
            <div className="flex flex-col items-center z-10">
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all shadow-xs ${
                  currentStep >= 2
                    ? 'bg-[#721422] text-white ring-4 ring-[#FAF8F5]'
                    : 'bg-[#E4DDD3] text-[#717885]'
                }`}
              >
                2
              </div>
              <span className={`text-[11px] sm:text-xs font-semibold mt-1.5 whitespace-nowrap ${
                currentStep >= 2 ? 'text-[#721422]' : 'text-[#717885]'
              }`}>
                Erfahrung
              </span>
            </div>

            {/* Step 3 Circle */}
            <div className="flex flex-col items-center z-10">
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all shadow-xs ${
                  currentStep >= 3
                    ? 'bg-[#721422] text-white ring-4 ring-[#FAF8F5]'
                    : 'bg-[#E4DDD3] text-[#717885]'
                }`}
              >
                3
              </div>
              <span className={`text-[11px] sm:text-xs font-semibold mt-1.5 whitespace-nowrap ${
                currentStep >= 3 ? 'text-[#721422]' : 'text-[#717885]'
              }`}>
                Kontakt & Upload
              </span>
            </div>
          </div>
        </div>

        {/* Card Form Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#E5DFD6] shadow-lg">
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-800 text-sm">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Bitte Eingabe prüfen</p>
                <p>{errorMsg}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* ================= STEP 1 ================= */}
            {currentStep === 1 && (
              <div className="space-y-6 sm:space-y-8 animate-fadeIn">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#1F2421] mb-1">
                    Schritt 1: Arbeitszeit & Verfügbarkeit
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5C6270]">
                    Teile uns mit, wie du am liebsten bei uns einsteigen möchtest.
                  </p>
                </div>

                {/* Arbeitszeitmodell */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#721422] mb-2">
                    Gewünschtes Arbeitszeitmodell *
                  </label>
                  <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                    {(['Vollzeit', 'Teilzeit', 'Flexibel'] as const).map((mode) => (
                      <button
                        type="button"
                        key={mode}
                        onClick={() => setWorkingTime(mode)}
                        className={`p-3 sm:p-4 rounded-xl border text-center transition-all cursor-pointer ${
                          workingTime === mode
                            ? 'bg-[#721422] text-white border-[#721422] shadow-xs font-bold'
                            : 'bg-[#FAF8F5] text-[#2D3139] border-[#E2DDD5] hover:border-[#721422]/40 font-medium'
                        }`}
                      >
                        <span className="block text-sm sm:text-base">{mode}</span>
                        <span className="block text-[11px] opacity-80 mt-0.5">
                          {mode === 'Vollzeit' ? 'ca. 38-40 Std.' : mode === 'Teilzeit' ? 'nach Wunsch' : 'offen'}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* If Teilzeit selected: show hours slider or input */}
                  {workingTime === 'Teilzeit' && (
                    <div className="mt-4 p-4 bg-[#FAF8F5] rounded-xl border border-[#E5DFD6]">
                      <label className="block text-xs font-semibold text-[#2D3139] mb-1">
                        Deine gewünschte Wochenarbeitszeit (z.B. 20, 25 oder 30 Stunden):
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          value={weeklyHours}
                          onChange={(e) => setWeeklyHours(e.target.value)}
                          placeholder="z.B. 25 Std./Woche"
                          className="w-48 px-3.5 py-2 text-sm bg-white border border-[#D5CEC4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#721422]/30 focus:border-[#721422]"
                        />
                        <span className="text-xs text-[#6C727F]">
                          (Flexible Tage & Schichten möglich)
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Verfügbarkeit */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#721422] mb-2">
                    Ab wann kannst du starten? *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: 'ab-sofort', label: 'Ab sofort', sub: 'Sofort startklar' },
                      { id: '1-monat', label: 'In 1 Monat', sub: 'Kündigungsfrist' },
                      { id: '3-monate', label: 'In 3 Monaten', sub: 'Kündigungsfrist' },
                      { id: 'wunschdatum', label: 'Wunschdatum', sub: 'Nach Absprache' }
                    ].map((opt) => (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => setAvailability(opt.id as any)}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          availability === opt.id
                            ? 'bg-[#721422] text-white border-[#721422] shadow-xs font-bold'
                            : 'bg-[#FAF8F5] text-[#2D3139] border-[#E2DDD5] hover:border-[#721422]/40 font-medium'
                        }`}
                      >
                        <span className="block text-sm">{opt.label}</span>
                        <span className="block text-[10px] opacity-80 mt-0.5">{opt.sub}</span>
                      </button>
                    ))}
                  </div>

                  {availability === 'wunschdatum' && (
                    <div className="mt-3">
                      <input
                        type="date"
                        value={customDate}
                        onChange={(e) => setCustomDate(e.target.value)}
                        className="px-3.5 py-2 text-sm bg-white border border-[#D5CEC4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#721422]/30 focus:border-[#721422]"
                      />
                    </div>
                  )}
                </div>

                {/* Gehaltsvorstellung */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#721422] mb-1.5">
                    Deine Gehaltserwartung (optional)
                  </label>
                  <div className="relative">
                    <Euro className="w-4 h-4 text-[#721422] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={salaryExpectation}
                      onChange={(e) => setSalaryExpectation(e.target.value)}
                      placeholder="z.B. 2.600 € - 3.200 € Brutto / Verhandlungsbasis"
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-[#D5CEC4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#721422]/30 focus:border-[#721422]"
                    />
                  </div>
                  <span className="text-[11px] text-[#6C727F] mt-1 block">
                    Wir vergüten übertariflich und honorieren deine Erfahrung fair.
                  </span>
                </div>

                {/* Next button */}
                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-[#721422] hover:bg-[#5e101c] active:scale-95 rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    <span>Weiter zu Schritt 2</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ================= STEP 2 ================= */}
            {currentStep === 2 && (
              <div className="space-y-6 sm:space-y-8 animate-fadeIn">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#1F2421] mb-1">
                    Schritt 2: Qualifikationen & Schwerpunkte
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5C6270]">
                    Hilf uns dabei, deine Stärken und Erfahrungen kennenzulernen.
                  </p>
                </div>

                {/* ZFA Ausbildung */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#721422] mb-2">
                    Hast du eine abgeschlossene Ausbildung als ZFA? *
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { id: 'ja', label: 'Ja, erfolgreich abgeschlossen' },
                      { id: 'in-ausbildung', label: 'Aktuell im 3. Lehrjahr' },
                      { id: 'nein', label: 'Quereinstieg / ähnlich' }
                    ].map((opt) => (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => setCompletedZfaTraining(opt.id as any)}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          completedZfaTraining === opt.id
                            ? 'bg-[#721422] text-white border-[#721422] shadow-xs font-bold'
                            : 'bg-[#FAF8F5] text-[#2D3139] border-[#E2DDD5] hover:border-[#721422]/40 font-medium'
                        }`}
                      >
                        <span className="block text-xs sm:text-sm">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Röntgennachweis */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#721422] mb-2">
                    Ist dein Röntgenschein / Strahlenschutzkurs aktuell? *
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { id: 'ja', label: 'Ja, aktuell gültig' },
                      { id: 'in-erneuerung', label: 'Aktualisierung steht an' },
                      { id: 'nein', label: 'Noch nicht vorhanden' }
                    ].map((opt) => (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => setHasRoentgenCertificate(opt.id as any)}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          hasRoentgenCertificate === opt.id
                            ? 'bg-[#721422] text-white border-[#721422] shadow-xs font-bold'
                            : 'bg-[#FAF8F5] text-[#2D3139] border-[#E2DDD5] hover:border-[#721422]/40 font-medium'
                        }`}
                      >
                        <span className="block text-xs sm:text-sm">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                  <span className="text-[11px] text-[#6C727F] mt-1 block">
                    (Falls eine Aktualisierung nötig ist, übernehmen wir selbstverständlich die Kosten für den Kurs!)
                  </span>
                </div>

                {/* Schwerpunkte / Skills Checkboxes */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#721422] mb-2">
                    In welchen Bereichen hast du Erfahrung oder möchtest du tätig sein? *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {COMMON_SKILLS_OPTIONS.map((skill) => {
                      const selected = skills.includes(skill);
                      return (
                        <button
                          type="button"
                          key={skill}
                          onClick={() => toggleSkill(skill)}
                          className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            selected
                              ? 'bg-[#721422]/10 border-[#721422] text-[#721422] font-semibold'
                              : 'bg-[#FAF8F5] border-[#E2DDD5] text-[#3D424D] hover:border-[#721422]/30'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center border text-xs shrink-0 ${
                              selected
                                ? 'bg-[#721422] border-[#721422] text-white font-bold'
                                : 'bg-white border-[#D5CEC4]'
                            }`}
                          >
                            {selected && '✓'}
                          </div>
                          <span className="text-xs sm:text-sm">{skill}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Additional notes */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#721422] mb-1.5">
                    Möchtest du uns noch etwas mitteilen? (optional)
                  </label>
                  <textarea
                    rows={3}
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="z.B. Bevorzugte Wochentage, Vorerfahrung mit bestimmter Praxissoftware oder Fragen an uns..."
                    className="w-full p-3.5 text-sm bg-white border border-[#D5CEC4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#721422]/30 focus:border-[#721422]"
                  />
                </div>

                {/* Nav buttons */}
                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-[#575E6C] hover:text-[#1F2421] rounded-xl transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Zurück</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-[#721422] hover:bg-[#5e101c] active:scale-95 rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    <span>Weiter zu Schritt 3</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ================= STEP 3 ================= */}
            {currentStep === 3 && (
              <div className="space-y-6 sm:space-y-8 animate-fadeIn">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#1F2421] mb-1">
                    Schritt 3: Kontaktdaten, Unterlagen & Absenden
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5C6270]">
                    Wir kontaktieren dich zeitnah und unkompliziert für ein erstes Kennenlernen.
                  </p>
                </div>

                {/* Name fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#721422] mb-1.5">
                      Vorname *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#721422] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="z.B. Lisa"
                        className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-[#D5CEC4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#721422]/30 focus:border-[#721422]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#721422] mb-1.5">
                      Nachname *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#721422] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="z.B. Müller"
                        className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-[#D5CEC4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#721422]/30 focus:border-[#721422]"
                      />
                    </div>
                  </div>
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#721422] mb-1.5">
                      E-Mail-Adresse *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#721422] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="lisa.mueller@example.de"
                        className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-[#D5CEC4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#721422]/30 focus:border-[#721422]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#721422] mb-1.5">
                      Telefonnummer * (für schnellen Rückruf)
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#721422] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="z.B. 0170 1234567"
                        className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-[#D5CEC4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#721422]/30 focus:border-[#721422]"
                      />
                    </div>
                  </div>
                </div>

                {/* Document Upload Area */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#721422]">
                      Dokumente hochladen (Lebenslauf, Zeugnisse, Zertifikate)
                    </label>
                    <span className="text-[11px] text-[#6C727F]">
                      PDF, DOCX oder JPG/PNG (max. 15 MB)
                    </span>
                  </div>

                  {/* Hidden file input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    multiple
                    accept=".pdf,.docx,.doc,.jpg,.jpeg,.png"
                    onChange={(e) => handleFilesAdded(e.target.files)}
                    className="hidden"
                  />

                  {/* Drag and Drop Zone */}
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      handleFilesAdded(e.dataTransfer.files);
                    }}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
                      isDragging
                        ? 'border-[#721422] bg-[#721422]/10 scale-[1.01]'
                        : 'border-[#D5CEC4] bg-[#FAF8F5] hover:bg-white hover:border-[#721422]/50'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-[#721422]/10 text-[#721422] flex items-center justify-center mx-auto mb-3">
                      <Upload className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-semibold text-[#1F2421]">
                      Klicke hier zum Hochladen oder ziehe Dateien hinein
                    </p>
                    <p className="text-xs text-[#6C727F] mt-1">
                      Lebenslauf (CV), Zeugnisse oder Nachweise einfach hier ablegen
                    </p>
                    <span className="inline-block mt-3 px-3 py-1 bg-white text-xs font-medium text-[#721422] border border-[#721422]/30 rounded-lg shadow-2xs">
                      Dateien auswählen
                    </span>
                  </div>

                  {/* Uploaded Files List */}
                  {files.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <span className="text-xs font-semibold text-[#2D3139]">
                        Ausgewählte Dateien ({files.length}):
                      </span>
                      {files.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between p-3 bg-white rounded-xl border border-[#E2DDD5] shadow-2xs"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <FileText className="w-4 h-4 text-[#721422] shrink-0" />
                            <div className="min-w-0">
                              <p className="text-xs font-medium text-[#1F2421] truncate">
                                {file.name}
                              </p>
                              <span className="text-[10px] text-[#6C727F]">
                                {(file.size / 1024 / 1024).toFixed(2)} MB •{' '}
                                {file.category === 'cv'
                                  ? 'Lebenslauf'
                                  : file.category === 'certificate'
                                  ? 'Zeugnis/Zertifikat'
                                  : 'Dokument'}
                              </span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFile(file.id)}
                            className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                            title="Datei entfernen"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="text-[11px] text-[#6C727F] mt-2 italic">
                    Tipp für Smartphone-Bewerber: Du hast deinen Lebenslauf gerade nicht griffbereit? Kein Problem – schicke das Formular einfach ab und reiche den CV bequem später nach!
                  </p>
                </div>

                {/* DSGVO & Legal Consent */}
                <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E5DFD6]">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dsgvoConsent}
                      onChange={(e) => setDsgvoConsent(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded text-[#721422] focus:ring-[#721422] border-[#C8C0B4] cursor-pointer"
                    />
                    <div className="text-xs text-[#404652] leading-relaxed">
                      <span className="font-semibold text-[#1F2421] block mb-0.5">
                        Einwilligung zur DSGVO-konformen Datenverarbeitung *
                      </span>
                      Ich willige ein, dass meine angegebenen Daten und Unterlagen zwecks Bearbeitung meiner Bewerbung von der Zahnarztpraxis Antje Voigtländer gespeichert, verarbeitet und als Zusammenfassung an{' '}
                      <strong className="text-[#721422]">voigtlaender@zahnarzt-wintersdorf.de</strong>{' '}
                      übermittelt werden. Die Einwilligung kann ich jederzeit mit Wirkung für die Zukunft widerrufen.{' '}
                      <button
                        type="button"
                        onClick={onOpenPrivacyModal}
                        className="text-[#721422] underline font-medium hover:text-[#500e18] cursor-pointer inline"
                      >
                        Datenschutzhinweise lesen
                      </button>
                      .
                    </div>
                  </label>
                </div>

                {/* Destination Confirmation Note */}
                <div className="flex items-center gap-2 text-xs text-[#525866] bg-amber-50/70 p-3 rounded-xl border border-amber-200/60">
                  <Lock className="w-4 h-4 text-[#721422] shrink-0" />
                  <span>
                    Empfänger: <strong>Antje Voigtländer</strong> (voigtlaender@zahnarzt-wintersdorf.de). Deine Daten werden streng vertraulich behandelt.
                  </span>
                </div>

                {/* Bottom navigation */}
                <div className="pt-4 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-[#575E6C] hover:text-[#1F2421] rounded-xl transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Zurück</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-base font-bold text-white rounded-xl shadow-md transition-all cursor-pointer ${
                      isSubmitting
                        ? 'bg-[#721422]/70 cursor-not-allowed'
                        : 'bg-[#721422] hover:bg-[#5e101c] active:scale-98 shadow-md hover:shadow-lg'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Bewerbung wird übermittelt...</span>
                      </>
                    ) : (
                      <>
                        <span>Bewerbung jetzt absenden</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
