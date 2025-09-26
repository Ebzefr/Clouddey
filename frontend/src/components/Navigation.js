// src/components/Navigation.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import logo from '../assets/logo1.webp';

const Navigation = ({ currentContent }) => {
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === language) || languages[0];
  };

  const selectLanguage = (langCode) => {
    setLanguage(langCode);
    setShowLanguageDropdown(false);
  };

  const handleNavigation = (section) => {
    if (location.pathname === '/') {
      // If we're on homepage, scroll to section
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we're on another page, navigate to homepage with section
      navigate(`/#${section}`);
      // Small delay to ensure page loads before scrolling
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const goHome = () => {
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm px-6 py-2">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={goHome}>
          <img 
            src={logo} 
            alt="Clouddey Logo" 
            className="w-24 h-24 object-contain"
          />
        </div>

        {/* Navigation Items */}
        <div className="flex items-center space-x-6">
          {/* Show About/Contact if we have the content, otherwise show Home */}
          {currentContent.nav.about ? (
            <>
              <button 
                onClick={() => handleNavigation('about')}
                className="text-gray-600 hover:text-gray-900 transition-colors text-xl"
              >
                {currentContent.nav.about}
              </button>
              <button 
                onClick={() => handleNavigation('contact')}
                className="text-gray-600 hover:text-gray-900 transition-colors text-xl"
              >
                {currentContent.nav.contact}
              </button>
            </>
          ) : (
            <button 
              onClick={goHome}
              className="text-gray-600 hover:text-gray-900 transition-colors text-xl"
            >
              {currentContent.nav.home}
            </button>
          )}
          
          {/* Language Selector */}
          <div className="relative">
            <button 
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors text-xl"
            >
              <span className="text-base">{getCurrentLanguage().flag}</span>
              <span>{getCurrentLanguage().name}</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showLanguageDropdown && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 min-w-[140px]">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => selectLanguage(lang.code)}
                    className={`w-full text-left px-3 py-1.5 hover:bg-gray-100 flex items-center space-x-2 text-xl ${
                      language === lang.code 
                        ? 'bg-orange-50 text-clouddey-orange' 
                        : 'text-gray-700'
                    }`}
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;