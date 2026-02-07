import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-number">
          <span>4</span>
          <div className="not-found-icon">
            <svg viewBox="0 0 100 100" width="80" height="80">
              <circle cx="50" cy="50" r="40" fill="#fef3c7" />
              <path
                d="M40 40 L60 60 M60 40 L40 60"
                stroke="#f59e0b"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <circle cx="30" cy="70" r="4" fill="#92400e" />
              <circle cx="70" cy="70" r="4" fill="#92400e" />
            </svg>
          </div>
          <span>4</span>
        </div>

        <h1 className="not-found-title">Sahifa Topilmadi</h1>

        <div className="not-found-message">
          <p>Kechirasiz, siz izlayotgan sahifa mavjud emas yoki o'chirilgan.</p>
          <p>
            Sahifa manzili noto'g'ri yoki sizda eskirgan havola bo'lishi mumkin.
          </p>
        </div>

        <div className="not-found-suggestions">
          <h3>Nima qilish mumkin:</h3>
          <ul>
            <li>🔗 Havolani to'g'ri yozganligingizni tekshiring</li>
            <li>🔙 Oldingi sahifaga qayting</li>
            <li>🔍 Qidiruvdan foydalaning</li>
            <li>🏠 Bosh sahifaga o'ting</li>
          </ul>
        </div>

        <div className="not-found-actions">
          <Link to="/" className="home-button">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
            Bosh sahifaga qaytish
          </Link>

          <button onClick={() => window.history.back()} className="back-button">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
            Ortga qaytish
          </button>

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

        <div className="not-found-footer">
          <p>
            Agar bu xato davom etsa, iltimos{' '}
            <a href="mailto:support@weather.uz">support@weather.uz</a> ga xabar
            bering
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
