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
      type="button"
      onClick={toggleLanguage}
      className="mcoe-theme-toggle mcoe-language-toggle"
      aria-pressed={language === 'en'}
      aria-label={
        language === 'fa'
          ? 'Switch to English'
          : 'تغییر زبان به فارسی'
      }
      title={language === 'fa' ? 'English' : 'فارسی'}
    >
      <span aria-hidden="true" className="mcoe-language-toggle-label">
        {language === 'fa' ? 'EN' : 'فا'}
      </span>
    </button>
  );
}
