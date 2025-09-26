import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import HomePage from './components/HomePage';
import UploadPage from './components/UploadPage';
import DownloadPage from './components/DownloadPage';
import './App.css';

function App() {
  return (
        <LanguageProvider>
<Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/file/:fileId" element={<DownloadPage />} />
        </Routes>
      </div>
    </Router>
        </LanguageProvider>

  );
}

export default App;