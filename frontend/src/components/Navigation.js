// src/components/Navigation.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import logo from '../assets/logo1.webp';

const Navigation = ({ currentContent }) => {
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
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
    setShowMobileMenu(false);
  };

  const handleNavigation = (section) => {
    setShowMobileMenu(false);
    if (location.pathname === '/') {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${section}`);
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const goHome = () => {
    setShowMobileMenu(false);
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm px-4 sm:px-6 py-2">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={goHome}>
          <img 
            src={logo} 
            alt="Clouddey Logo" 
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
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
          
          {/* Desktop Language Selector */}
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {showMobileMenu ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
          <div className="flex flex-col space-y-3 pt-4">
            {currentContent.nav.about ? (
              <>
                <button 
                  onClick={() => handleNavigation('about')}
                  className="text-left text-gray-600 hover:text-gray-900 transition-colors text-lg px-2 py-2 hover:bg-gray-50 rounded"
                >
                  {currentContent.nav.about}
                </button>
                <button 
                  onClick={() => handleNavigation('contact')}
                  className="text-left text-gray-600 hover:text-gray-900 transition-colors text-lg px-2 py-2 hover:bg-gray-50 rounded"
                >
                  {currentContent.nav.contact}
                </button>
              </>
            ) : (
              <button 
                onClick={goHome}
                className="text-left text-gray-600 hover:text-gray-900 transition-colors text-lg px-2 py-2 hover:bg-gray-50 rounded"
              >
                {currentContent.nav.home}
              </button>
            )}
            
            {/* Mobile Language Selector */}
            <div className="border-t border-gray-200 pt-3 mt-2">
              <p className="text-sm font-medium text-gray-500 px-2 mb-2">Language</p>
              <div className="grid grid-cols-2 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => selectLanguage(lang.code)}
                    className={`text-left px-3 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                      language === lang.code 
                        ? 'bg-orange-50 text-clouddey-orange border-2 border-clouddey-orange' 
                        : 'text-gray-700 hover:bg-gray-50 border-2 border-transparent'
                    }`}
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span className="text-sm">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;