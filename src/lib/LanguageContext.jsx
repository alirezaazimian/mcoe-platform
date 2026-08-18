import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations } from './translations';

const LanguageContext = createContext(null);

const STORAGE_KEY = 'mcoe_lang';

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window === 'undefined') return 'fa';
    const stored = localStorage.getItem(STORAGE_KEY);
    const pathLang = window.location.pathname.match(/^\/(fa|en)\b/)?.[1];
    return pathLang || stored || 'fa';
  });

  const dir = language === 'fa' ? 'rtl' : 'ltr';
  const isRTL = dir === 'rtl';

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
    localStorage.setItem(STORAGE_KEY, language);
  }, [language, dir]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'fa' ? 'en' : 'fa'));
  }, []);

  const t = useCallback(
    (key) => {
      const keys = key.split('.');
      const get = (lang) => keys.reduce((obj, k) => obj?.[k], translations[lang]);
      return get(language) ?? get('fa') ?? key;
    },
    [language]
  );

  const tf = useCallback(
    (faText, enText) => (language === 'fa' ? faText : enText),
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, dir, isRTL, setLanguage, toggleLanguage, t, tf }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}