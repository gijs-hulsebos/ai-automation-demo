'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Lang = 'EN' | 'NL' | 'DE';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>('EN');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedLang = localStorage.getItem('app_lang') as Lang;
    if (storedLang && ['EN', 'NL', 'DE'].includes(storedLang)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLangState(storedLang);
    }
    setMounted(true);
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem('app_lang', newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      <div style={{ visibility: mounted ? 'visible' : 'hidden' }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
