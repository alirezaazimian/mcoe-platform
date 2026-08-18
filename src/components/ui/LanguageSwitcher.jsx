import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Languages } from 'lucide-react';

export default function LanguageSwitcher({ compact = false }) {
  const { language, toggleLanguage } = useLanguage();

  if (compact) {
    return (
      <button
        onClick={toggleLanguage}
        className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-foreground/70 hover:text-primary transition-colors rounded-md hover:bg-muted/60"
        aria-label="Switch language"
      >
        <Languages className="w-4 h-4" />
        <span>{language === 'fa' ? 'EN' : 'فا'}</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleLanguage}
      className="neumorphic-switch-inner group flex items-center rounded-full p-0.5"
      aria-label="Toggle language"
    >
      <span
        className={`neumorphic-switch-segment px-3 py-1 text-xs font-semibold rounded-full ${
          language === 'fa' ? 'is-active bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        فا
      </span>
      <span
        className={`neumorphic-switch-segment px-3 py-1 text-xs font-semibold rounded-full ${
          language === 'en' ? 'is-active bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        EN
      </span>
    </button>
  );
}