import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Language = 'sv' | 'en';

interface LanguageContextValue {
  lang: Language;
  setLang: (l: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'sv',
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem('traivo-lang');
      if (stored === 'en' || stored === 'sv') return stored;
    } catch {}
    return 'sv';
  });

  const setLang = (l: Language) => {
    setLangState(l);
    try {
      localStorage.setItem('traivo-lang', l);
    } catch {}
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
