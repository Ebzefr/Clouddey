import React, { useState } from 'react';
import logo from '../assets/logo1.webp'; 
import illustration from '../assets/hero-image.svg';
import card1 from '../assets/file-sharing.svg';
import card2 from '../assets/sync-across.svg';

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
      card1: {
        title: 'What is Clouddey?',
        description: 'Clouddey is a simple and secure way to share files in the cloud. Upload any file, set a password, choose an expiration time, and get a unique link to share instantly.'
      },
      card2: {
        title: 'Why Clouddey?',
        description: 'Your files don\'t stay online forever. Clouddey automatically deletes them after one download or when the timer expires—keeping sharing fast, private, and worry-free.'
      }
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
      card1: {
        title: '¿Qué es Clouddey?',
        description: 'Clouddey es una forma simple y segura de compartir archivos en la nube. Sube cualquier archivo, establece una contraseña, elige un tiempo de expiración y obtén un enlace único para compartir al instante.'
      },
      card2: {
        title: '¿Por qué Clouddey?',
        description: 'Tus archivos no permanecen en línea para siempre. Clouddey los elimina automáticamente después de una descarga o cuando expira el temporizador, manteniendo el intercambio rápido, privado y sin preocupaciones.'
      }
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
      card1: {
        title: 'Qu\'est-ce que Clouddey?',
        description: 'Clouddey est un moyen simple et sécurisé de partager des fichiers dans le cloud. Téléchargez n\'importe quel fichier, définissez un mot de passe, choisissez un délai d\'expiration et obtenez un lien unique à partager instantanément.'
      },
      card2: {
        title: 'Pourquoi Clouddey?',
        description: 'Vos fichiers ne restent pas en ligne pour toujours. Clouddey les supprime automatiquement après un téléchargement ou à l\'expiration du minuteur, gardant le partage rapide, privé et sans souci.'
      }
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
      card1: {
        title: 'Was ist Clouddey?',
        description: 'Clouddey ist eine einfache und sichere Möglichkeit, Dateien in der Cloud zu teilen. Laden Sie beliebige Dateien hoch, setzen Sie ein Passwort, wählen Sie eine Ablaufzeit und erhalten Sie sofort einen eindeutigen Link zum Teilen.'
      },
      card2: {
        title: 'Warum Clouddey?',
        description: 'Ihre Dateien bleiben nicht für immer online. Clouddey löscht sie automatisch nach einem Download oder wenn der Timer abläuft—hält das Teilen schnell, privat und sorgenfrei.'
      }
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
      card1: {
        title: '什么是Clouddey？',
        description: 'Clouddey是一种简单安全的云端文件分享方式。上传任何文件，设置密码，选择过期时间，即可获得独特的分享链接。'
      },
      card2: {
        title: '为什么选择Clouddey？',
        description: '您的文件不会永远在线。Clouddey会在下载一次后或计时器到期时自动删除文件——让分享变得快速、私密且无忧。'
      }
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
      card1: {
        title: 'Clouddeyとは？',
        description: 'Clouddeyはクラウドでファイルを共有するシンプルで安全な方法です。任意のファイルをアップロードし、パスワードを設定し、有効期限を選択して、即座に一意のリンクを取得できます。'
      },
      card2: {
        title: 'なぜClouddey？',
        description: 'ファイルは永続的にオンラインに残りません。Clouddeyは1回のダウンロード後またはタイマーが切れると自動的に削除し、共有を高速、プライベート、そして心配無用に保ちます。'
      }
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
      card1: {
        title: 'ما هو Clouddey؟',
        description: 'Clouddey هو طريقة بسيطة وآمنة لمشاركة الملفات في السحابة. ارفع أي ملف، اضبط كلمة مرور، اختر وقت انتهاء الصلاحية، واحصل على رابط فريد للمشاركة فوراً.'
      },
      card2: {
        title: 'لماذا Clouddey؟',
        description: 'ملفاتك لا تبقى متاحة عبر الإنترنت إلى الأبد. Clouddey يحذفها تلقائياً بعد تنزيل واحد أو عند انتهاء المؤقت—مما يجعل المشاركة سريعة وخاصة وخالية من القلق.'
      }
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
  language === lang.code ? 'bg-orange-50 text-clouddey-orange' : 'text-gray-700'
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
              <button className="bg-clouddey-orange hover:bg-clouddey-orange-hover text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg">
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
  <div className="max-w-5xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16 text-center">
      {currentContent.about.title}
    </h2>
    
    <div className="grid md:grid-cols-2 gap-6">
      {/* Card 1 - What is Clouddey? */}
      <div className="bg-[#FFBF94] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow max-w-md mx-auto">
        <div className="flex flex-col h-full text-center">
          <h3 className="text-xl font-bold text-[#1A284E] mb-4">
            {currentContent.about.card1.title}
          </h3>
          <p className="text-gray-800 text-l leading-relaxed mb-6 flex-grow">
            {currentContent.about.card1.description}
          </p>
          <div className="flex justify-center items-end mt-auto">
            <img src={card1} alt="Upload illustration" className="w-48 h-auto object-contain" />
          </div>
        </div>
      </div>

      {/* Card 2 - Why Clouddey? */}
      <div className="bg-[#527597] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow max-w-md mx-auto">
        <div className="flex flex-col h-full text-center">
          <h3 className="text-xl font-bold text-[#FF6600] mb-4">
            {currentContent.about.card2.title}
          </h3>
          <p className="text-white text-l leading-relaxed mb-6 flex-grow">
            {currentContent.about.card2.description}
          </p>
          <div className="flex justify-center items-end mt-auto">
            <img src={card2} alt="Security illustration" className="w-52 h-auto object-contain" />
          </div>
        </div>
      </div>
    </div>
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
className="text-clouddey-orange hover:text-clouddey-orange-hover text-lg font-semibold"
          >
            {currentContent.contact.email}
          </a>
        </div>
      </section>

      {/* Footer */}
<footer className="bg-clouddey-blue text-white px-6 py-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white">© 2025 Clouddey. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;