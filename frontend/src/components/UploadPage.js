import React, { useState, useRef } from 'react';
import logo from '../assets/logo1.webp';

const UploadPage = () => {
  const [language, setLanguage] = useState('en');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
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

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  const content = {
    en: {
      nav: { home: 'Home', language: 'Language' },
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
      nav: { home: 'Inicio', language: 'Idioma' },
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
    }
  };

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === language) || languages[0];
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

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadComplete(true);
          // Generate a dummy link for demo
          setGeneratedLink(`https://clouddey.com/file/${Math.random().toString(36).substr(2, 9)}`);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    simulateUpload();
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

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

  const goHome = () => {
    // This would typically be handled by React Router
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img 
              src={logo} 
              alt="Clouddey Logo" 
              className="w-16 h-16 object-contain"
            />
          </div>

          <div className="flex items-center space-x-8">
            <button 
              onClick={goHome}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {currentContent.nav.home}
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
                      onClick={() => {
                        setLanguage(lang.code);
                        setShowLanguageDropdown(false);
                      }}
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
    </div>
  );
};

export default UploadPage;