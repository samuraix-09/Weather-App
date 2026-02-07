import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/OfflinePage.css';
import NetworkService from '../services/networkService';

const OfflinePage = () => {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [lastChecked, setLastChecked] = useState(null);

  useEffect(() => {
    const handleOnline = () => {
      if (NetworkService.getStatus()) {
        navigate('/', { replace: true });
      }
    };

    NetworkService.addListener(handleOnline);
    return () => {
      NetworkService.removeListener(handleOnline);
    };
  }, [navigate]);

  const handleRetry = async () => {
    setIsChecking(true);
    setRetryCount(prev => prev + 1);
    setLastChecked(new Date());

    // 2 soniya kutish
    await new Promise(resolve => setTimeout(resolve, 2000));

    if (NetworkService.getStatus()) {
      navigate('/', { replace: true });
    } else {
      setIsChecking(false);
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const formatLastChecked = () => {
    if (!lastChecked) return '--:--';
    return lastChecked.toLocaleTimeString('uz-UZ', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="offline-page">
      <div className="offline-container">
        <div className="offline-icon">
          <svg viewBox="0 0 100 100" width="100" height="100">
            <circle cx="50" cy="50" r="40" fill="#fee2e2" />
            <path
              d="M50 20 L50 50 M35 35 L65 65"
              stroke="#dc2626"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <circle
              cx="50"
              cy="50"
              r="30"
              fill="none"
              stroke="#dc2626"
              strokeWidth="4"
              strokeDasharray="5,5"
            />
            <path
              d="M30 30 L70 70 M70 30 L30 70"
              stroke="#dc2626"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h1 className="offline-title">Offline Holatdasiz</h1>

        <div className="offline-message">
          <p>Internet aloqasi yo'q. Iltimos, internetingizni tekshiring.</p>
          <div className="connection-details">
            <div className="detail-item">
              <span className="label">Internet:</span>
              <span className="value offline">Yo'q</span>
            </div>
            <div className="detail-item">
              <span className="label">Urinishlar:</span>
              <span className="value">{retryCount}</span>
            </div>
            <div className="detail-item">
              <span className="label">So'nggi tekshirish:</span>
              <span className="value">{formatLastChecked()}</span>
            </div>
          </div>
        </div>

        <div className="offline-actions">
          <button
            onClick={handleRetry}
            disabled={isChecking}
            className={`retry-button ${isChecking ? 'checking' : ''}`}
          >
            {isChecking ? (
              <>
                <span className="spinner" />
                Tekshirilmoqda...
              </>
            ) : (
              <>
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
                </svg>
                Qayta urinish
              </>
            )}
          </button>

          <button onClick={handleGoHome} className="home-button">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
            Asosiy sahifa
          </button>
        </div>

        <div className="offline-tips">
          <h3>📋 Qanday hal qilish mumkin:</h3>
          <ul>
            <li>📶 Wi-Fi yoki mobil ma'lumotlaringizni yoqing</li>
            <li>🔌 Router yoki modemdagi simlarni tekshiring</li>
            <li>🔄 Qurilmangizni qayta ishga tushiring</li>
            <li>✈️ Samolyot rejimini o'chiring</li>
          </ul>
        </div>

        <div className="offline-footer">
          <div className="signal-status">
            {[1, 2, 3, 4].map(bar => (
              <div
                key={bar}
                className={`signal-bar ${
                  NetworkService.getStatus() ? 'active' : ''
                }`}
              />
            ))}
          </div>
          <p>
            Internet aloqasi: {NetworkService.getStatus() ? 'Mavjud' : "Yo'q"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OfflinePage;
