import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // LocalStorage dan sevimli shaharlarni olish
    const loadFavorites = () => {
      try {
        const stored = localStorage.getItem('weatherFavorites');
        if (stored) {
          setFavorites(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Favorites load error:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const handleRemoveFavorite = cityName => {
    const updated = favorites.filter(city => city.name !== cityName);
    setFavorites(updated);
    localStorage.setItem('weatherFavorites', JSON.stringify(updated));
  };

  const handleClearAll = () => {
    if (window.confirm("Barcha sevimli shaharlarni o'chirmoqchimisiz?")) {
      setFavorites([]);
      localStorage.removeItem('weatherFavorites');
    }
  };

  const handleViewCity = city => {
    navigate(`/details/${city.name}`);
  };

  if (loading) {
    return (
      <div className="favorites-page loading">
        <div className="loading-container">
          <div className="loading-spinner" />
          <p>Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <header className="favorites-header">
        <Link to="/" className="back-link">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
        </Link>
        <h1>Sevimli Shaharlar</h1>
        <button
          onClick={handleClearAll}
          disabled={favorites.length === 0}
          className="clear-button"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
          </svg>
        </button>
      </header>

      <div className="favorites-container">
        {favorites.length === 0 ? (
          <div className="empty-favorites">
            <div className="empty-icon">
              <svg viewBox="0 0 100 100" width="80" height="80">
                <path
                  d="M50 15 L65 40 L95 45 L75 65 L80 95 L50 80 L20 95 L25 65 L5 45 L35 40 Z"
                  fill="#fbbf24"
                  stroke="#f59e0b"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <h2>Sevimli shaharlar yo'q</h2>
            <p>
              Shaharlarni sevimlilarga qo'shish uchun asosiy sahifaga o'ting
            </p>
            <Link to="/" className="go-home-button">
              Asosiy sahifaga o'tish
            </Link>
          </div>
        ) : (
          <>
            <div className="favorites-count">
              <span className="count-number">{favorites.length}</span>
              <span className="count-label">ta shahar</span>
            </div>

            <div className="favorites-list">
              {favorites.map((city, index) => (
                <div key={index} className="favorite-city-card">
                  <div className="city-info">
                    <div className="city-rank">{index + 1}</div>
                    <div className="city-details">
                      <h3 className="city-name">{city.name}</h3>
                      <p className="city-coordinates">
                        {city.lat.toFixed(2)}°N, {city.lon.toFixed(2)}°E
                      </p>
                    </div>
                  </div>

                  <div className="city-actions">
                    <button
                      onClick={() => handleViewCity(city)}
                      className="view-button"
                      title="Ko'rish"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        fill="currentColor"
                      >
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleRemoveFavorite(city.name)}
                      className="remove-button"
                      title="O'chirish"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        fill="currentColor"
                      >
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <footer className="favorites-footer">
        <p>
          Shaharlarni sevimlilarga qo'shish uchun asosiy sahifadagi yulduzcha
          belgisini bosing
        </p>
      </footer>
    </div>
  );
};

export default FavoritesPage;
