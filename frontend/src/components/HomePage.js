import React, { useState } from 'react';
import logo from '../assets/logo1.webp'; 
import illustration from '../assets/hero-image.svg';

const HomePage = () => {
  const [language, setLanguage] = useState('en');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  const selectLanguage = (langCode) => {
    setLanguage(langCode);
    setShowLanguageDropdown(false);
  };

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === language) || languages[0];
  };

  const content = {
    en: {
      nav: {
        about: 'About',
        contact: 'Contact',
        language: 'Language'
      },
      hero: {
        title: 'An innovative approach for storing sharing your files online',
        subtitle: 'Clouddey is a online file manager that allows you to Securely store, access, and manage your files — anytime, anywhere.',
        cta: 'Get Started'
      },
      about: {
        title: 'About Clouddey',
        description: 'Clouddey is a free, secure, and temporary file sharing service. Upload files, set expiration times, add password protection, and share with unique links. Files are automatically deleted after download or expiration for maximum privacy.'
      },
      contact: {
        title: 'Contact Us',
        description: 'Have questions or feedback? We\'d love to hear from you.',
        email: 'contact@clouddey.com'
      }
    },
    es: {
      nav: {
        about: 'Acerca de',
        contact: 'Contacto',
        language: 'Idioma'
      },
      hero: {
        title: 'Un enfoque innovador para almacenar y compartir tus archivos en línea',
        subtitle: 'Clouddey es un gestor de archivos en línea que te permite almacenar, acceder y gestionar tus archivos de forma segura, en cualquier momento y lugar.',
        cta: 'Comenzar'
      },
      about: {
        title: 'Acerca de Clouddey',
        description: 'Clouddey es un servicio gratuito, seguro y temporal para compartir archivos. Sube archivos, establece tiempos de expiración, añade protección con contraseña y comparte con enlaces únicos. Los archivos se eliminan automáticamente después de la descarga o expiración para máxima privacidad.'
      },
      contact: {
        title: 'Contáctanos',
        description: '¿Tienes preguntas o comentarios? Nos encantaría escucharte.',
        email: 'contacto@clouddey.com'
      }
    },
    fr: {
      nav: {
        about: 'À propos',
        contact: 'Contact',
        language: 'Langue'
      },
      hero: {
        title: 'Une approche innovante pour stocker et partager vos fichiers en ligne',
        subtitle: 'Clouddey est un gestionnaire de fichiers en ligne qui vous permet de stocker, accéder et gérer vos fichiers en toute sécurité — n\'importe quand, n\'importe où.',
        cta: 'Commencer'
      },
      about: {
        title: 'À propos de Clouddey',
        description: 'Clouddey est un service gratuit, sécurisé et temporaire de partage de fichiers. Téléchargez des fichiers, définissez des délais d\'expiration, ajoutez une protection par mot de passe et partagez avec des liens uniques.'
      },
      contact: {
        title: 'Contactez-nous',
        description: 'Vous avez des questions ou des commentaires? Nous aimerions vous entendre.',
        email: 'contact@clouddey.com'
      }
    },
    de: {
      nav: {
        about: 'Über uns',
        contact: 'Kontakt',
        language: 'Sprache'
      },
      hero: {
        title: 'Ein innovativer Ansatz zum Speichern und Teilen Ihrer Dateien online',
        subtitle: 'Clouddey ist ein Online-Dateimanager, mit dem Sie Ihre Dateien sicher speichern, darauf zugreifen und sie verwalten können — jederzeit und überall.',
        cta: 'Loslegen'
      },
      about: {
        title: 'Über Clouddey',
        description: 'Clouddey ist ein kostenloser, sicherer und temporärer Dateifreigabedienst. Laden Sie Dateien hoch, legen Sie Ablaufzeiten fest, fügen Sie Passwortschutz hinzu und teilen Sie mit einzigartigen Links.'
      },
      contact: {
        title: 'Kontaktieren Sie uns',
        description: 'Haben Sie Fragen oder Feedback? Wir würden gerne von Ihnen hören.',
        email: 'kontakt@clouddey.com'
      }
    },
    zh: {
      nav: {
        about: '关于',
        contact: '联系',
        language: '语言'
      },
      hero: {
        title: '在线存储和分享文件的创新方法',
        subtitle: 'Clouddey是一个在线文件管理器，让您可以安全地存储、访问和管理您的文件——随时随地。',
        cta: '开始使用'
      },
      about: {
        title: '关于Clouddey',
        description: 'Clouddey是一个免费、安全的临时文件共享服务。上传文件，设置过期时间，添加密码保护，并通过独特链接分享。'
      },
      contact: {
        title: '联系我们',
        description: '有问题或反馈？我们很乐意听到您的声音。',
        email: 'contact@clouddey.com'
      }
    },
    ja: {
      nav: {
        about: '概要',
        contact: 'お問い合わせ',
        language: '言語'
      },
      hero: {
        title: 'オンラインでファイルを保存・共有する革新的なアプローチ',
        subtitle: 'Clouddeyは、いつでもどこでも安全にファイルを保存、アクセス、管理できるオンラインファイルマネージャーです。',
        cta: '始める'
      },
      about: {
        title: 'Clouddeyについて',
        description: 'Clouddeyは無料で安全な一時的ファイル共有サービスです。ファイルをアップロードし、有効期限を設定し、パスワード保護を追加し、一意のリンクで共有できます。'
      },
      contact: {
        title: 'お問い合わせ',
        description: 'ご質問やフィードバックがございますか？ぜひお聞かせください。',
        email: 'contact@clouddey.com'
      }
    },
    ar: {
      nav: {
        about: 'حول',
        contact: 'اتصال',
        language: 'اللغة'
      },
      hero: {
        title: 'نهج مبتكر لتخزين ومشاركة ملفاتك عبر الإنترنت',
        subtitle: 'Clouddey هو مدير ملفات عبر الإنترنت يتيح لك تخزين والوصول وإدارة ملفاتك بأمان — في أي وقت وفي أي مكان.',
        cta: 'ابدأ'
      },
      about: {
        title: 'حول Clouddey',
        description: 'Clouddey هو خدمة مشاركة ملفات مجانية وآمنة ومؤقتة. ارفع الملفات، اضبط أوقات انتهاء الصلاحية، أضف حماية بكلمة مرور، وشارك بروابط فريدة.'
      },
      contact: {
        title: 'اتصل بنا',
        description: 'هل لديك أسئلة أو ملاحظات؟ نحب أن نسمع منك.',
        email: 'contact@clouddey.com'
      }
    }
  };

  const currentContent = content[language];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img 
              src={logo} 
              alt="Clouddey Logo" 
              className="w-20 h-20 object-contain"
            />
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {currentContent.nav.about}
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {currentContent.nav.contact}
            </button>
            <div className="relative">
              <button 
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <span className="text-lg">{getCurrentLanguage().flag}</span>
                <span>{getCurrentLanguage().name}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showLanguageDropdown && (
                <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 min-w-[160px]">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => selectLanguage(lang.code)}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-3 ${
                        language === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                {currentContent.hero.title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {currentContent.hero.subtitle}
              </p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg">
                {currentContent.hero.cta}
              </button>
            </div>

            {/* Right Illustration */}
            <div className="relative">
              <img 
                src={illustration} 
                alt="Clouddey File Management Illustration" 
                className="w-full h-auto max-w-lg mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            {currentContent.about.title}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {currentContent.about.description}
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            {currentContent.contact.title}
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            {currentContent.contact.description}
          </p>
          <a 
            href={`mailto:${currentContent.contact.email}`}
            className="text-orange-500 hover:text-orange-600 text-lg font-semibold"
          >
            {currentContent.contact.email}
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white px-6 py-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">© 2025 Clouddey. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;