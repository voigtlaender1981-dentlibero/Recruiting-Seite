import React, { useState, useEffect } from 'react';
import { ArrowDown, FileText } from 'lucide-react';

interface MobileApplyBarProps {
  onScrollToForm: () => void;
  onOpenExpose: () => void;
}

export const MobileApplyBar: React.FC<MobileApplyBarProps> = ({
  onScrollToForm,
  onOpenExpose
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past hero (e.g. 150px) and hide if near form
      const formEl = document.getElementById('bewerbung');
      const scrollY = window.scrollY;
      if (formEl) {
        const formRect = formEl.getBoundingClientRect();
        const isInForm = formRect.top < window.innerHeight && formRect.bottom > 0;
        setIsVisible(scrollY > 250 && !isInForm);
      } else {
        setIsVisible(scrollY > 250);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-white/95 backdrop-blur-md border-t border-[#E5DFD6] shadow-lg animate-slideUp">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        <button
          type="button"
          onClick={onOpenExpose}
          className="px-3 py-2.5 text-xs font-semibold text-[#721422] bg-[#721422]/5 border border-[#721422]/20 rounded-xl transition-colors cursor-pointer shrink-0"
        >
          <FileText className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={onScrollToForm}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-white bg-[#721422] active:bg-[#5e101c] rounded-xl shadow-xs transition-all cursor-pointer"
        >
          <span>Jetzt in 60 Sek. bewerben</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
