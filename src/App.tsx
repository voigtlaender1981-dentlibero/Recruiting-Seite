import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { BenefitsSection } from './components/BenefitsSection';
import { JobDetailsSection } from './components/JobDetailsSection';
import { ApplicationForm } from './components/ApplicationForm';
import { SuccessView } from './components/SuccessView';
import { PracticeInfoSection } from './components/PracticeInfoSection';
import { Footer } from './components/Footer';
import { PdfExposeModal } from './components/PdfExposeModal';
import { PrivacyModal } from './components/PrivacyModal';
import { AdminPreviewModal } from './components/AdminPreviewModal';
import { MobileApplyBar } from './components/MobileApplyBar';
import { ApplicationData } from './types';

export default function App() {
  const [submittedData, setSubmittedData] = useState<ApplicationData | null>(null);
  const [allApplications, setAllApplications] = useState<ApplicationData[]>([]);
  const [isExposeModalOpen, setIsExposeModalOpen] = useState<boolean>(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);

  // Load previously submitted test applications from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('zw_applications');
      if (saved) {
        setAllApplications(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Could not read saved applications', e);
    }
  }, []);

  const handleScrollToForm = () => {
    if (submittedData) {
      setSubmittedData(null);
    }
    setTimeout(() => {
      const formElement = document.getElementById('bewerbung');
      if (formElement) {
        const top = formElement.offsetTop - 75;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 50);
  };

  const handleFormSubmitSuccess = (data: ApplicationData) => {
    setSubmittedData(data);
    const updated = [data, ...allApplications];
    setAllApplications(updated);
    try {
      localStorage.setItem('zw_applications', JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
    // Scroll to success card
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  const handleResetForm = () => {
    setSubmittedData(null);
    handleScrollToForm();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#22252A] selection:bg-[#721422] selection:text-white">
      {/* Sticky Header */}
      <Header
        onOpenExpose={() => setIsExposeModalOpen(true)}
        onScrollToForm={handleScrollToForm}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onScrollToForm={handleScrollToForm}
          onOpenExpose={() => setIsExposeModalOpen(true)}
        />

        {/* Benefits & Authentic Team Atmosphere */}
        <BenefitsSection />

        {/* Detailed Job Profile based on attached flyer */}
        <JobDetailsSection
          onOpenExpose={() => setIsExposeModalOpen(true)}
          onScrollToForm={handleScrollToForm}
        />

        {/* The Core Feature: Express Short Application Form or Success State */}
        {submittedData ? (
          <SuccessView
            data={submittedData}
            onReset={handleResetForm}
          />
        ) : (
          <ApplicationForm
            onSubmitSuccess={handleFormSubmitSuccess}
            onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
          />
        )}

        {/* Location & Practice Facts */}
        <PracticeInfoSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        applicationsCount={allApplications.length}
      />

      {/* Mobile Floating Quick-Apply Bar */}
      <MobileApplyBar
        onScrollToForm={handleScrollToForm}
        onOpenExpose={() => setIsExposeModalOpen(true)}
      />

      {/* Modals */}
      <PdfExposeModal
        isOpen={isExposeModalOpen}
        onClose={() => setIsExposeModalOpen(false)}
      />

      <PrivacyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      <AdminPreviewModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        applications={allApplications}
      />
    </div>
  );
}
