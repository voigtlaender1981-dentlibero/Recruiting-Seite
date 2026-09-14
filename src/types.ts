export interface ApplicationData {
  id: string;
  createdAt: string;
  // Step 1: Role & Availability
  workingTime: 'Vollzeit' | 'Teilzeit' | 'Flexibel';
  weeklyHours?: string;
  availability: 'ab-sofort' | '1-monat' | '3-monate' | 'wunschdatum';
  customDate?: string;
  salaryExpectation: string;

  // Step 2: Qualifications & Screening
  completedZfaTraining: 'ja' | 'nein' | 'in-ausbildung';
  hasRoentgenCertificate: 'ja' | 'nein' | 'in-erneuerung';
  skills: string[]; // e.g. Behandlungsassistenz, Prophylaxe, etc.
  additionalNotes?: string;

  // Step 3: Contact Details
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  // Documents
  files: UploadedDocument[];

  // Legal
  dsgvoConsent: boolean;
}

export interface UploadedDocument {
  id: string;
  name: string;
  size: number;
  type: string;
  category: 'cv' | 'certificate' | 'reference' | 'other';
  dataUrl?: string; // for preview if applicable
}

export interface JobVacancy {
  title: string;
  subTitle: string;
  employmentType: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  tasks: string[];
  qualifications: string[];
  benefits: string[];
}
