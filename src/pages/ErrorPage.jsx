import React from 'react';
import '../styles/ErrorPage.css';
import { useRouteError, Link } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  console.error('Router error:', error);

  const getErrorInfo = () => {
    if (error?.status === 404) {
      return {
        title: '404 - Sahifa Topilmadi',
        message: 'Kechirasiz, soralgan sahifa mavjud emas.',
        suggestion: 'Bosh sahifaga qayting yoki qidiruvdan foydalaning.',
      };
    }

    if (error?.status === 500) {
      return {
        title: '500 - Server Xatosi',
        message: 'Serverda muammo yuz berdi.',
        suggestion: 'Iltimos, keyinroq urinib koring.',
      };
    }

    return {
      title: 'Kutilmagan Xato',
      message: 'Nomalum xato yuz berdi.',
      suggestion: 'Iltimos, qayta urinib koring yoki bosh sahifaga qayting.',
    };
  };

  const errorInfo = getErrorInfo();

  return (
    <div className="error-page">
      <div className="error-container">
        <div className="error-illustration">
          <svg viewBox="0 0 200 200" width="150" height="150">
            <circle cx="100" cy="100" r="80" fill="#fef3c7" />
            <path
              d="M100 40 L100 80 M80 60 L120 60"
              stroke="#f59e0b"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <circle cx="80" cy="120" r="4" fill="#92400e" />
            <circle cx="120" cy="120" r="4" fill="#92400e" />
            <path
              d="M70 140 Q100 160 130 140"
              stroke="#92400e"
              strokeWidth="4"
              fill="none"
            />
            <path
              d="M60 60 L40 40 M140 60 L160 40"
              stroke="#f59e0b"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h1 className="error-title">{errorInfo.title}</h1>

        <div className="error-message">
          <p>{errorInfo.message}</p>
          <p className="error-suggestion">{errorInfo.suggestion}</p>

          {error?.message && (
            <div className="error-details">
              <p className="error-code">Xato kodi: {error.message}</p>
              {error.status && (
                <p className="error-status">Status: {error.status}</p>
              )}
            </div>
          )}
        </div>

        <div className="error-actions">
          <Link to="/" className="home-link">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
            Bosh sahifaga qaytish
          </Link>

          <button
            onClick={() => window.location.reload()}
            className="reload-button"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
            </svg>
            Sahifani yangilash
          </button>
        </div>

        <div className="error-help">
          <h3>рџ† Yordam kerakmi?</h3>
          <ul>
            <li>Browser yangilanganligini tekshiring</li>
            <li>Cache va cookies larni tozalang</li>
            <li>Internet aloqangizni tekshiring</li>
            <li>Boshqa browser bilan urinib ko'ring</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
