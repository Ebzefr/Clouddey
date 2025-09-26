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
  const [expirationTime, setExpirationTime] = useState('1hour');
  const [generatedLink, setGeneratedLink] = useState('');
  const [uploadComplete, setUploadComplete] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  
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
        expiration: 'Expiration Time',
        uploadButton: 'Upload File',
        uploading: 'Uploading...',
        success: 'Upload Complete!',
        linkGenerated: 'Your shareable link:',
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
        expiration: 'Tiempo de Expiración',
        uploadButton: 'Subir Archivo',
        uploading: 'Subiendo...',
        success: '¡Subida Completa!',
        linkGenerated: 'Tu enlace para compartir:',
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
        expiration: 'Délai d\'Expiration',
        uploadButton: 'Télécharger le Fichier',
        uploading: 'Téléchargement...',
        success: 'Téléchargement Terminé!',
        linkGenerated: 'Votre lien partageable:',
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
        expiration: 'Ablaufzeit',
        uploadButton: 'Datei Hochladen',
        uploading: 'Hochladen...',
        success: 'Upload Abgeschlossen!',
        linkGenerated: 'Ihr teilbarer Link:',
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
        expiration: '过期时间',
        uploadButton: '上传文件',
        uploading: '上传中...',
        success: '上传完成！',
        linkGenerated: '您的可分享链接:',
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
        expiration: '有効期限',
        uploadButton: 'ファイルをアップロード',
        uploading: 'アップロード中...',
        success: 'アップロード完了！',
        linkGenerated: '共有可能なリンク:',
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
        expiration: 'وقت انتهاء الصلاحية',
        uploadButton: 'رفع الملف',
        uploading: 'جاري الرفع...',
        success: 'اكتمل الرفع!',
        linkGenerated: 'رابطك القابل للمشاركة:',
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

  // Main upload function - connects to the API
  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      if (password && password.trim()) {
        formData.append('password', password.trim());
      }
      
      formData.append('expirationTime', expirationTime);

      // Create XMLHttpRequest to track upload progress
      const xhr = new XMLHttpRequest();

      // Track upload progress
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percentComplete);
        }
      });

      // Handle upload completion
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          setIsUploading(false);
          setUploadComplete(true);
          setGeneratedLink(response.link);
        } else {
          const error = JSON.parse(xhr.responseText);
          throw new Error(error.error || 'Upload failed');
        }
      });

      // Handle upload errors
      xhr.addEventListener('error', () => {
        throw new Error('Upload failed. Please check your connection.');
      });

      // Send the upload request
      xhr.open('POST', '/api/upload');
      xhr.send(formData);

    } catch (error) {
      console.error('Upload error:', error);
      setIsUploading(false);
      setUploadProgress(0);
      
      // Show error to user
      alert(error.message || 'Upload failed. Please try again.');
    }
  };

  // Copy link to clipboard function
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      // Fallback for older browsers
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

  // Reset upload state for new upload
  const resetUpload = () => {
    setSelectedFile(null);
    setPassword('');
    setExpirationTime('1hour');
    setUploadProgress(0);
    setIsUploading(false);
    setUploadComplete(false);
    setGeneratedLink('');
    setCopySuccess(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Use Navigation Component */}
      <Navigation currentContent={currentContent} />

      {/* Main Upload Section */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {currentContent.upload.title}
          </h1>
          <p className="text-xl text-gray-600">
            {currentContent.upload.subtitle}
          </p>
        </div>

        {!uploadComplete ? (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* File Upload Area */}
            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
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
                    <p className="text-lg font-semibold text-gray-900">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500">{formatFileSize(selectedFile.size)}</p>
                  </div>
                ) : (
                  <>
                    <p className="text-lg text-gray-600">{currentContent.upload.dragText}</p>
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
              <div className="mt-8 space-y-6">
                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {currentContent.upload.password}
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={currentContent.upload.passwordPlaceholder}
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
                  className="w-full bg-clouddey-orange hover:bg-clouddey-orange-hover disabled:bg-gray-400 text-white py-4 rounded-lg font-semibold text-lg transition-colors"
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
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {currentContent.upload.success}
            </h2>
            
            <p className="text-gray-600 mb-6">
              {currentContent.upload.linkGenerated}
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={generatedLink}
                  readOnly
                  className="flex-1 bg-transparent border-none outline-none text-gray-700"
                />
                <button
                  onClick={copyToClipboard}
                  className="bg-clouddey-orange hover:bg-clouddey-orange-hover text-white px-4 py-2 rounded-lg font-medium transition-colors"
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

      {/* Footer */}
      <footer className="bg-clouddey-blue text-white px-6 py-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white">© 2025 Clouddey. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default UploadPage;