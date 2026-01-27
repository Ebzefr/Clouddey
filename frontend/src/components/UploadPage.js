import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Navigation from '../components/Navigation';

const UploadPage = () => {
  const { language } = useLanguage();
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [expirationTime, setExpirationTime] = useState('1hour');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [uploadComplete, setUploadComplete] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const content = {
    en: {
      nav: { 
        home: 'Home', 
        about: 'About',
        contact: 'Contact'
      },
      upload: {
        title: 'Upload & Share Files',
        subtitle: 'Securely upload files and get shareable links',
        dragText: 'Drag and drop files here',
        orText: 'or',
        browseText: 'Browse Files',
        selectedFile: 'Selected File:',
        password: 'Password (Optional)',
        passwordPlaceholder: 'Enter password to protect your file',
        email: 'Recipient Email (Optional)',
        emailPlaceholder: 'Send download link via email',
        expiration: 'Expiration Time',
        uploadButton: 'Upload File',
        uploading: 'Uploading...',
        success: 'Upload Complete!',
        linkGenerated: 'Your shareable link:',
        emailSent: 'Email notification sent successfully!',
        copyLink: 'Copy Link',
        copied: 'Copied!',
        newUpload: 'Upload Another File',
        expirationOptions: {
          '15min': '15 minutes',
          '1hour': '1 hour',
          '6hours': '6 hours',
          '24hours': '24 hours',
          '7days': '7 days'
        }
      }
    },
    es: {
      nav: { 
        home: 'Inicio', 
        about: 'Acerca de',
        contact: 'Contacto'
      },
      upload: {
        title: 'Subir y Compartir Archivos',
        subtitle: 'Sube archivos de forma segura y obtén enlaces para compartir',
        dragText: 'Arrastra y suelta archivos aquí',
        orText: 'o',
        browseText: 'Explorar Archivos',
        selectedFile: 'Archivo Seleccionado:',
        password: 'Contraseña (Opcional)',
        passwordPlaceholder: 'Ingresa contraseña para proteger tu archivo',
        email: 'Email del Destinatario (Opcional)',
        emailPlaceholder: 'Enviar enlace de descarga por email',
        expiration: 'Tiempo de Expiración',
        uploadButton: 'Subir Archivo',
        uploading: 'Subiendo...',
        success: '¡Subida Completa!',
        linkGenerated: 'Tu enlace para compartir:',
        emailSent: '¡Notificación por email enviada exitosamente!',
        copyLink: 'Copiar Enlace',
        copied: '¡Copiado!',
        newUpload: 'Subir Otro Archivo',
        expirationOptions: {
          '15min': '15 minutos',
          '1hour': '1 hora',
          '6hours': '6 horas',
          '24hours': '24 horas',
          '7days': '7 días'
        }
      }
    },
    fr: {
      nav: { 
        home: 'Accueil', 
        about: 'À propos',
        contact: 'Contact'
      },
      upload: {
        title: 'Télécharger et Partager des Fichiers',
        subtitle: 'Téléchargez des fichiers en toute sécurité et obtenez des liens partageables',
        dragText: 'Glissez et déposez les fichiers ici',
        orText: 'ou',
        browseText: 'Parcourir les Fichiers',
        selectedFile: 'Fichier Sélectionné:',
        password: 'Mot de passe (Optionnel)',
        passwordPlaceholder: 'Entrez un mot de passe pour protéger votre fichier',
        email: 'Email du Destinataire (Optionnel)',
        emailPlaceholder: 'Envoyer le lien de téléchargement par email',
        expiration: 'Délai d\'Expiration',
        uploadButton: 'Télécharger le Fichier',
        uploading: 'Téléchargement...',
        success: 'Téléchargement Terminé!',
        linkGenerated: 'Votre lien partageable:',
        emailSent: 'Notification par email envoyée avec succès!',
        copyLink: 'Copier le Lien',
        copied: 'Copié!',
        newUpload: 'Télécharger un Autre Fichier',
        expirationOptions: {
          '15min': '15 minutes',
          '1hour': '1 heure',
          '6hours': '6 heures',
          '24hours': '24 heures',
          '7days': '7 jours'
        }
      }
    },
    de: {
      nav: { 
        home: 'Startseite', 
        about: 'Über uns',
        contact: 'Kontakt'
      },
      upload: {
        title: 'Dateien Hochladen & Teilen',
        subtitle: 'Laden Sie Dateien sicher hoch und erhalten Sie teilbare Links',
        dragText: 'Dateien hier hineinziehen',
        orText: 'oder',
        browseText: 'Dateien Durchsuchen',
        selectedFile: 'Ausgewählte Datei:',
        password: 'Passwort (Optional)',
        passwordPlaceholder: 'Passwort zum Schutz Ihrer Datei eingeben',
        email: 'Empfänger-Email (Optional)',
        emailPlaceholder: 'Download-Link per Email senden',
        expiration: 'Ablaufzeit',
        uploadButton: 'Datei Hochladen',
        uploading: 'Hochladen...',
        success: 'Upload Abgeschlossen!',
        linkGenerated: 'Ihr teilbarer Link:',
        emailSent: 'Email-Benachrichtigung erfolgreich gesendet!',
        copyLink: 'Link Kopieren',
        copied: 'Kopiert!',
        newUpload: 'Weitere Datei Hochladen',
        expirationOptions: {
          '15min': '15 Minuten',
          '1hour': '1 Stunde',
          '6hours': '6 Stunden',
          '24hours': '24 Stunden',
          '7days': '7 Tage'
        }
      }
    },
    zh: {
      nav: { 
        home: '首页', 
        about: '关于',
        contact: '联系'
      },
      upload: {
        title: '上传和分享文件',
        subtitle: '安全上传文件并获取可分享的链接',
        dragText: '将文件拖放到这里',
        orText: '或',
        browseText: '浏览文件',
        selectedFile: '已选择文件:',
        password: '密码（可选）',
        passwordPlaceholder: '输入密码保护您的文件',
        email: '收件人邮箱（可选）',
        emailPlaceholder: '通过邮件发送下载链接',
        expiration: '过期时间',
        uploadButton: '上传文件',
        uploading: '上传中...',
        success: '上传完成！',
        linkGenerated: '您的可分享链接:',
        emailSent: '邮件通知发送成功！',
        copyLink: '复制链接',
        copied: '已复制！',
        newUpload: '上传另一个文件',
        expirationOptions: {
          '15min': '15分钟',
          '1hour': '1小时',
          '6hours': '6小时',
          '24hours': '24小时',
          '7days': '7天'
        }
      }
    },
    ja: {
      nav: { 
        home: 'ホーム', 
        about: '概要',
        contact: 'お問い合わせ'
      },
      upload: {
        title: 'ファイルアップロード & 共有',
        subtitle: 'ファイルを安全にアップロードし、共有可能なリンクを取得',
        dragText: 'ファイルをここにドラッグ&ドロップ',
        orText: 'または',
        browseText: 'ファイルを参照',
        selectedFile: '選択されたファイル:',
        password: 'パスワード（オプション）',
        passwordPlaceholder: 'ファイルを保護するパスワードを入力',
        email: '受信者メール（オプション）',
        emailPlaceholder: 'ダウンロードリンクをメールで送信',
        expiration: '有効期限',
        uploadButton: 'ファイルをアップロード',
        uploading: 'アップロード中...',
        success: 'アップロード完了！',
        linkGenerated: '共有可能なリンク:',
        emailSent: 'メール通知が正常に送信されました！',
        copyLink: 'リンクをコピー',
        copied: 'コピーしました！',
        newUpload: '別のファイルをアップロード',
        expirationOptions: {
          '15min': '15分',
          '1hour': '1時間',
          '6hours': '6時間',
          '24hours': '24時間',
          '7days': '7日'
        }
      }
    },
    ar: {
      nav: { 
        home: 'الرئيسية', 
        about: 'حول',
        contact: 'اتصال'
      },
      upload: {
        title: 'رفع ومشاركة الملفات',
        subtitle: 'ارفع الملفات بأمان واحصل على روابط قابلة للمشاركة',
        dragText: 'اسحب وأفلت الملفات هنا',
        orText: 'أو',
        browseText: 'تصفح الملفات',
        selectedFile: 'الملف المحدد:',
        password: 'كلمة المرور (اختيارية)',
        passwordPlaceholder: 'أدخل كلمة مرور لحماية ملفك',
        email: 'البريد الإلكتروني للمستلم (اختياري)',
        emailPlaceholder: 'إرسال رابط التحميل عبر البريد الإلكتروني',
        expiration: 'وقت انتهاء الصلاحية',
        uploadButton: 'رفع الملف',
        uploading: 'جاري الرفع...',
        success: 'اكتمل الرفع!',
        linkGenerated: 'رابطك القابل للمشاركة:',
        emailSent: 'تم إرسال إشعار البريد الإلكتروني بنجاح!',
        copyLink: 'نسخ الرابط',
        copied: 'تم النسخ!',
        newUpload: 'رفع ملف آخر',
        expirationOptions: {
          '15min': '15 دقيقة',
          '1hour': '1 ساعة',
          '6hours': '6 ساعات',
          '24hours': '24 ساعة',
          '7days': '7 أيام'
        }
      }
    }
  };

  const currentContent = content[language] || content.en;

  // File handling functions
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Main upload function
  const handleUpload = async () => {
    if (!selectedFile) return;
    
    if (recipientEmail && !isValidEmail(recipientEmail)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    setEmailSent(false);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      if (password && password.trim()) {
        formData.append('password', password.trim());
      }
      
      if (recipientEmail && recipientEmail.trim()) {
        formData.append('recipientEmail', recipientEmail.trim());
      }
      
      formData.append('expirationTime', expirationTime);

      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percentComplete);
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          setIsUploading(false);
          setUploadComplete(true);
          setGeneratedLink(response.link);
          
          if (response.emailSent) {
            setEmailSent(true);
          }
        } else {
          const error = JSON.parse(xhr.responseText);
          throw new Error(error.error || 'Upload failed');
        }
      });

      xhr.addEventListener('error', () => {
        throw new Error('Upload failed. Please check your connection.');
      });

      xhr.open('POST', '/api/upload');
      xhr.send(formData);

    } catch (error) {
      console.error('Upload error:', error);
      setIsUploading(false);
      setUploadProgress(0);
      alert(error.message || 'Upload failed. Please try again.');
    }
  };

  // Copy link to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      try {
        const textArea = document.createElement('textarea');
        textArea.value = generatedLink;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (fallbackErr) {
        console.error('Fallback copy failed:', fallbackErr);
        alert('Failed to copy link. Please copy manually.');
      }
    }
  };

  // Reset upload state
  const resetUpload = () => {
    setSelectedFile(null);
    setPassword('');
    setShowPassword(false);
    setRecipientEmail('');
    setExpirationTime('1hour');
    setUploadProgress(0);
    setIsUploading(false);
    setUploadComplete(false);
    setGeneratedLink('');
    setCopySuccess(false);
    setEmailSent(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation currentContent={currentContent} />

      {/* Main Upload Section - flex-grow pushes footer down */}
      <div className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              {currentContent.upload.title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600">
              {currentContent.upload.subtitle}
            </p>
          </div>

          {!uploadComplete ? (
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8">
              {/* File Upload Area */}
              <div
                className={`border-2 border-dashed rounded-xl p-8 sm:p-12 text-center transition-colors ${
                  dragActive 
                    ? 'border-clouddey-orange bg-orange-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  
                  {selectedFile ? (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-600">{currentContent.upload.selectedFile}</p>
                      <p className="text-base sm:text-lg font-semibold text-gray-900 break-all">{selectedFile.name}</p>
                      <p className="text-sm text-gray-500">{formatFileSize(selectedFile.size)}</p>
                    </div>
                  ) : (
                    <>
                      <p className="text-base sm:text-lg text-gray-600">{currentContent.upload.dragText}</p>
                      <p className="text-gray-500">{currentContent.upload.orText}</p>
                      <button
                        onClick={handleBrowseClick}
                        className="bg-clouddey-orange hover:bg-clouddey-orange-hover text-white px-6 py-3 rounded-lg font-medium transition-colors"
                      >
                        {currentContent.upload.browseText}
                      </button>
                    </>
                  )}
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {/* Upload Options */}
              {selectedFile && (
                <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
                  {/* Password Field with Toggle */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {currentContent.upload.password}
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={currentContent.upload.passwordPlaceholder}
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-clouddey-orange focus:border-clouddey-orange"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {currentContent.upload.email}
                    </label>
                    <input
                      type="email"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      placeholder={currentContent.upload.emailPlaceholder}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-clouddey-orange focus:border-clouddey-orange"
                    />
                  </div>

                  {/* Expiration Time */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {currentContent.upload.expiration}
                    </label>
                    <select
                      value={expirationTime}
                      onChange={(e) => setExpirationTime(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-clouddey-orange focus:border-clouddey-orange"
                    >
                      {Object.entries(currentContent.upload.expirationOptions).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Upload Button */}
                  <button
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="w-full bg-clouddey-orange hover:bg-clouddey-orange-hover disabled:bg-gray-400 text-white py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-colors"
                  >
                    {isUploading ? currentContent.upload.uploading : currentContent.upload.uploadButton}
                  </button>

                  {/* Progress Bar */}
                  {isUploading && (
                    <div className="space-y-2">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-clouddey-orange h-3 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                      <p className="text-center text-sm text-gray-600">{uploadProgress}%</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* Success State */
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                {currentContent.upload.success}
              </h2>
              
              {emailSent && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 text-sm">
                    {currentContent.upload.emailSent}
                  </p>
                </div>
              )}
              
              <p className="text-gray-600 mb-6">
                {currentContent.upload.linkGenerated}
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <input
                    type="text"
                    value={generatedLink}
                    readOnly
                    className="flex-1 bg-transparent border-none outline-none text-gray-700 text-sm break-all"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="bg-clouddey-orange hover:bg-clouddey-orange-hover text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
                  >
                    {copySuccess ? currentContent.upload.copied : currentContent.upload.copyLink}
                  </button>
                </div>
              </div>
              
              <button
                onClick={resetUpload}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                {currentContent.upload.newUpload}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer - mt-auto keeps it at bottom */}
      <footer className="mt-auto bg-clouddey-blue text-white px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white text-sm sm:text-base">© 2025 Clouddey. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default UploadPage;