import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailsPage from './pages/DetailsPage';
import FavoritesPage from './pages/FavoritesPage';
import OfflinePage from './pages/OfflinePage';
import ErrorPage from './pages/ErrorPage';
import NotFoundPage from './pages/NotFoundPage';
import NetworkService from './services/networkService';
import './styles/index.css';

function App() {
  const [isOnline, setIsOnline] = useState(NetworkService.getStatus());
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    const handleNetworkChange = status => {
      setIsOnline(status);
    };

    NetworkService.addListener(handleNetworkChange);

    return () => {
      NetworkService.removeListener(handleNetworkChange);
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <button className="theme-toggle" onClick={toggleTheme} type="button">
          {theme === 'light' ? 'Qorong‘u rejim' : 'Yorug‘ rejim'}
        </button>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/details/:cityName" element={<DetailsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/offline" element={<OfflinePage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>

        {isOnline && (
          <div className="network-status online">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
            </svg>
            Online
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
