import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Navigation from '../components/Navigation';

const DownloadPage = () => {
  const { fileId } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [fileInfo, setFileInfo] = useState(null);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [isExpired, setIsExpired] = useState(false);

  // Format time remaining
  const formatTimeRemaining = (seconds) => {
    if (seconds <= 0) return 'Expired';
    
    const days = Math.floor(seconds / (24 * 3600));
    const hours = Math.floor((seconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  // Calculate time remaining
  useEffect(() => {
    if (fileInfo && fileInfo.expiresAt) {
      const updateTimer = () => {
        const now = new Date().getTime();
        const expiry = new Date(fileInfo.expiresAt).getTime();
        const remaining = Math.floor((expiry - now) / 1000);
        
        if (remaining <= 0) {
          setTimeRemaining(0);
          setIsExpired(true);
        } else {
          setTimeRemaining(remaining);
          setIsExpired(false);
        }
      };

      updateTimer();
      const interval = setInterval(updateTimer, 1000);
      return () => clearInterval(interval);
    }
  }, [fileInfo]);

  const content = {
    en: {
      nav: { home: 'Home', about: 'About', contact: 'Contact' },
      download: {
        title: 'Download File',
        passwordRequired: 'Password Required',
        passwordPlaceholder: 'Enter file password',
        downloadButton: 'Download File',
        downloading: 'Downloading...',
        securityNote: 'This file will be deleted after download for security.',
        timeRemaining: 'Time remaining',
        expired: 'File has expired',
        success: {
          title: 'Download Complete!',
          message: 'Your file has been downloaded successfully.',
          redirectNote: 'This file has been permanently deleted for security. Redirecting to home page...'
        },
        error: {
          notAvailable: 'File Not Available',
          noMoreAttempts: 'No more download attempts available'
        }
      }
    },
    es: {
      nav: { home: 'Inicio', about: 'Acerca de', contact: 'Contacto' },
      download: {
        title: 'Descargar Archivo',
        passwordRequired: 'Contraseña Requerida',
        passwordPlaceholder: 'Ingresa la contraseña del archivo',
        downloadButton: 'Descargar Archivo',
        downloading: 'Descargando...',
        securityNote: 'Este archivo será eliminado después de la descarga por seguridad.',
        timeRemaining: 'Tiempo restante',
        expired: 'El archivo ha expirado',
        success: {
          title: '¡Descarga Completa!',
          message: 'Tu archivo ha sido descargado exitosamente.',
          redirectNote: 'Este archivo ha sido eliminado permanentemente por seguridad. Redirigiendo a la página de inicio...'
        },
        error: {
          notAvailable: 'Archivo No Disponible',
          noMoreAttempts: 'No hay más intentos de descarga disponibles'
        }
      }
    },
    fr: {
      nav: { home: 'Accueil', about: 'À propos', contact: 'Contact' },
      download: {
        title: 'Télécharger le Fichier',
        passwordRequired: 'Mot de passe Requis',
        passwordPlaceholder: 'Entrez le mot de passe du fichier',
        downloadButton: 'Télécharger le Fichier',
        downloading: 'Téléchargement...',
        securityNote: 'Ce fichier sera supprimé après téléchargement pour la sécurité.',
        timeRemaining: 'Temps restant',
        expired: 'Le fichier a expiré',
        success: {
          title: 'Téléchargement Terminé!',
          message: 'Votre fichier a été téléchargé avec succès.',
          redirectNote: 'Ce fichier a été définitivement supprimé pour la sécurité. Redirection vers la page d\'accueil...'
        },
        error: {
          notAvailable: 'Fichier Non Disponible',
          noMoreAttempts: 'Plus de tentatives de téléchargement disponibles'
        }
      }
    },
    de: {
      nav: { home: 'Startseite', about: 'Über uns', contact: 'Kontakt' },
      download: {
        title: 'Datei Herunterladen',
        passwordRequired: 'Passwort Erforderlich',
        passwordPlaceholder: 'Datei-Passwort eingeben',
        downloadButton: 'Datei Herunterladen',
        downloading: 'Herunterladen...',
        securityNote: 'Diese Datei wird nach dem Download aus Sicherheitsgründen gelöscht.',
        timeRemaining: 'Verbleibende Zeit',
        expired: 'Datei ist abgelaufen',
        success: {
          title: 'Download Abgeschlossen!',
          message: 'Ihre Datei wurde erfolgreich heruntergeladen.',
          redirectNote: 'Diese Datei wurde aus Sicherheitsgründen dauerhaft gelöscht. Weiterleitung zur Startseite...'
        },
        error: {
          notAvailable: 'Datei Nicht Verfügbar',
          noMoreAttempts: 'Keine weiteren Download-Versuche verfügbar'
        }
      }
    },
    zh: {
      nav: { home: '首页', about: '关于', contact: '联系' },
      download: {
        title: '下载文件',
        passwordRequired: '需要密码',
        passwordPlaceholder: '输入文件密码',
        downloadButton: '下载文件',
        downloading: '下载中...',
        securityNote: '为了安全，此文件将在下载后删除。',
        timeRemaining: '剩余时间',
        expired: '文件已过期',
        success: {
          title: '下载完成！',
          message: '您的文件已成功下载。',
          redirectNote: '为了安全，此文件已被永久删除。正在重定向到首页...'
        },
        error: {
          notAvailable: '文件不可用',
          noMoreAttempts: '没有更多下载尝试机会'
        }
      }
    },
    ja: {
      nav: { home: 'ホーム', about: '概要', contact: 'お問い合わせ' },
      download: {
        title: 'ファイルをダウンロード',
        passwordRequired: 'パスワードが必要',
        passwordPlaceholder: 'ファイルのパスワードを入力',
        downloadButton: 'ファイルをダウンロード',
        downloading: 'ダウンロード中...',
        securityNote: 'セキュリティのため、このファイルはダウンロード後に削除されます。',
        timeRemaining: '残り時間',
        expired: 'ファイルの期限が切れました',
        success: {
          title: 'ダウンロード完了！',
          message: 'ファイルが正常にダウンロードされました。',
          redirectNote: 'セキュリティのため、このファイルは永久に削除されました。ホームページにリダイレクト中...'
        },
        error: {
          notAvailable: 'ファイルが利用できません',
          noMoreAttempts: 'これ以上のダウンロード試行はできません'
        }
      }
    },
    ar: {
      nav: { home: 'الرئيسية', about: 'حول', contact: 'اتصال' },
      download: {
        title: 'تحميل الملف',
        passwordRequired: 'كلمة المرور مطلوبة',
        passwordPlaceholder: 'أدخل كلمة مرور الملف',
        downloadButton: 'تحميل الملف',
        downloading: 'جاري التحميل...',
        securityNote: 'سيتم حذف هذا الملف بعد التحميل للأمان.',
        timeRemaining: 'الوقت المتبقي',
        expired: 'انتهت صلاحية الملف',
        success: {
          title: 'اكتمل التحميل!',
          message: 'تم تحميل ملفك بنجاح.',
          redirectNote: 'تم حذف هذا الملف نهائياً للأمان. إعادة توجيه إلى الصفحة الرئيسية...'
        },
        error: {
          notAvailable: 'الملف غير متاح',
          noMoreAttempts: 'لا توجد محاولات تحميل أخرى متاحة'
        }
      }
    }
  };

  const currentContent = content[language] || content.en;

  useEffect(() => {
    const fetchFileInfo = async () => {
    try {
      const response = await fetch(`/api/download?fileId=${fileId}`);
      if (response.ok) {
        const info = await response.json();
        setFileInfo(info);
      } else {
        const error = await response.json();
        setError(error.error || 'File not found');
      }
    } catch (err) {
      setError('Failed to load file information');
    } finally {
      setLoading(false);
    }
  };
      fetchFileInfo();

  }, [fileId]);

  

  const handleDownload = async () => {
    if (fileInfo.hasPassword && !password.trim()) {
      setError('Password is required');
      return;
    }

    setDownloading(true);
    setError('');

    try {
      const response = await fetch(`/api/download?fileId=${fileId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: password.trim() || null }),
      });

      if (response.ok) {
        const contentDisposition = response.headers.get('Content-Disposition');
        const filename = contentDisposition
          ? contentDisposition.split('filename=')[1].replace(/"/g, '')
          : fileInfo.originalName || 'download';

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        setShowSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 3000);

      } else {
        const error = await response.json();
        if (error.remainingAttempts !== undefined) {
          setRemainingAttempts(error.remainingAttempts);
          if (error.remainingAttempts === 0) {
            setError('Maximum password attempts exceeded. File has been permanently deleted.');
          } else {
            setError(`${error.error}. ${error.remainingAttempts} attempt(s) remaining.`);
          }
        } else {
          setError(error.error || 'Download failed');
        }
      }
    } catch (err) {
      setError('Download failed. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  // Determine if we should show the download form
  const showDownloadForm = !showSuccess && !isExpired && (remainingAttempts === null || remainingAttempts > 0);
  
  // Determine if file is completely unavailable
  const fileUnavailable = isExpired || (remainingAttempts !== null && remainingAttempts === 0) || (error && !fileInfo);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Use Navigation Component */}
      <Navigation currentContent={currentContent} />

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full">
          {showSuccess ? (
            /* Success State */
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{currentContent.download.success.title}</h1>
              <p className="text-gray-600 mb-4">{currentContent.download.success.message}</p>
              <p className="text-sm text-gray-500 mb-6">{currentContent.download.success.redirectNote}</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-clouddey-orange h-2 rounded-full animate-pulse" style={{width: '100%'}}></div>
              </div>
            </div>
          ) : fileUnavailable ? (
            /* File Unavailable State */
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {isExpired ? currentContent.download.expired : currentContent.download.error.notAvailable}
              </h1>
              <p className="text-gray-600">
                {isExpired 
                  ? 'This file has expired and is no longer available for download.'
                  : remainingAttempts === 0 
                    ? 'Maximum password attempts exceeded. File has been permanently deleted.'
                    : error
                }
              </p>
            </div>
          ) : (
            /* Download Form State */
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{currentContent.download.title}</h1>
                <p className="text-xl font-semibold text-gray-700">{fileInfo?.originalName}</p>
                <p className="text-gray-500">{fileInfo ? (fileInfo.size / 1024 / 1024).toFixed(2) : 0} MB</p>
                
                {/* Expiration Timer */}
                {timeRemaining !== null && !isExpired && (
                  <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-sm text-orange-800">
                      <span className="font-medium">{currentContent.download.timeRemaining}:</span> {formatTimeRemaining(timeRemaining)}
                    </p>
                  </div>
                )}
              </div>

              {/* Error Display */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}

              {/* Password Input */}
              {fileInfo?.hasPassword && showDownloadForm && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {currentContent.download.passwordRequired}
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={currentContent.download.passwordPlaceholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-clouddey-orange focus:border-clouddey-orange"
                  />
                  {remainingAttempts !== null && remainingAttempts < 3 && remainingAttempts > 0 && (
                    <p className="text-sm text-orange-600 mt-2">
                      {remainingAttempts} attempt(s) remaining
                    </p>
                  )}
                </div>
              )}

              {/* Download Button */}
              {showDownloadForm && (
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="w-full bg-clouddey-orange hover:bg-clouddey-orange-hover disabled:bg-gray-400 text-white py-4 rounded-lg font-semibold text-lg transition-colors"
                >
                  {downloading ? currentContent.download.downloading : currentContent.download.downloadButton}
                </button>
              )}

              {showDownloadForm && (
                <p className="text-center text-sm text-gray-500 mt-4">
                  {currentContent.download.securityNote}
                </p>
              )}
            </div>
          )}
        </div>
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

export default DownloadPage;