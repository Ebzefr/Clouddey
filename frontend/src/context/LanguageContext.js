// src/context/LanguageContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  // Initialize from localStorage or default to English
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('clouddey-language');
    return saved || 'en';
  });

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('clouddey-language', language);
  }, [language]);

  const value = {
    language,
    setLanguage
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};