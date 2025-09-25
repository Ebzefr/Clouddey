// src/components/DownloadPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import logo from '../assets/logo1.webp';

const DownloadPage = () => {
  const { fileId } = useParams();
  const [fileInfo, setFileInfo] = useState(null);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFileInfo();
  }, [fileId]);

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
        // Get filename from headers
        const contentDisposition = response.headers.get('Content-Disposition');
        const filename = contentDisposition
          ? contentDisposition.split('filename=')[1].replace(/"/g, '')
          : fileInfo.originalName || 'download';

        // Download the file
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        // Show success message
        alert('Download started! This file has been deleted for security.');
      } else {
        const error = await response.json();
        setError(error.error || 'Download failed');
      }
    } catch (err) {
      setError('Download failed. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-6 py-2">
        <div className="max-w-7xl mx-auto flex items-center">
          <img src={logo} alt="Clouddey Logo" className="w-16 h-16 object-contain" />
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {error ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">File Not Available</h1>
            <p className="text-gray-600">{error}</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Download File</h1>
              <p className="text-xl font-semibold text-gray-700">{fileInfo.originalName}</p>
              <p className="text-gray-500">{(fileInfo.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>

            {fileInfo.hasPassword && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password Required
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter file password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-clouddey-orange focus:border-clouddey-orange"
                />
              </div>
            )}

            <button
              onClick={handleDownload}
              disabled={downloading}
              className="w-full bg-clouddey-orange hover:bg-clouddey-orange-hover disabled:bg-gray-400 text-white py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              {downloading ? 'Downloading...' : 'Download File'}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              This file will be deleted after download for security.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DownloadPage;