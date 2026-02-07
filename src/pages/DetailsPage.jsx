import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import WeatherIcon from '../components/WeatherIcon';
import Forecast from '../components/Forecast';
import HourlyForecast from '../components/HourlyForecast';
import { getWeatherData } from '../services/weatherAPI';
import { CITIES } from '../utils/constants';
import {
  formatDate,
  formatTemperature,
  getWeatherDescription,
  getWeatherColor,
} from '../utils/weatherUtils';

const DetailsPage = () => {
  const { cityName } = useParams();
  const navigate = useNavigate();
  const [city, setCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('today');

  const fetchWeatherData = async cityData => {
    setLoading(true);
    setError(null);

    try {
      const data = await getWeatherData(cityData.lat, cityData.lon);
      setWeatherData(data);
    } catch (err) {
      setError(err.message || "Ob-havo ma'lumotlarini olishda xatolik");
      console.error('Details fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const foundCity = CITIES.find(
      c => c.name.toLowerCase() === cityName?.toLowerCase()
    );

    if (!foundCity) {
      setError('Shahar topilmadi');
      setLoading(false);
      return;
    }

    setCity(foundCity);
    fetchWeatherData(foundCity);
  }, [cityName]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleRefresh = () => {
    if (city) {
      fetchWeatherData(city);
    }
  };

  if (loading) {
    return (
      <div className="details-page loading">
        <div className="loading-container">
          <div className="loading-spinner" />
          <p>Ma'lumotlar yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (error || !city) {
    return (
      <div className="details-page error">
        <div className="error-container">
          <div className="error-icon">!</div>
          <h2>{error || 'Shahar topilmadi'}</h2>
          <button onClick={handleBack} className="back-button">
            Ortga qaytish
          </button>
        </div>
      </div>
    );
  }

  const { current } = weatherData;
  const weatherColor = getWeatherColor(current.weather_code);

  return (
    <div className="details-page">
      <header className="details-header">
        <button onClick={handleBack} className="back-button">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
        </button>
        <h1 className="city-title">{city.name}</h1>
        <button onClick={handleRefresh} className="refresh-button">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
          </svg>
        </button>
      </header>

      <div className="details-container">
        <div className="current-weather-section">
          <div className="weather-overview">
            <div className="weather-icon-large">
              <WeatherIcon code={current.weather_code} size={120} />
            </div>
            <div className="weather-summary">
              <div className="temperature-display">
                <span className="current-temp">
                  {formatTemperature(current.temperature)}�
                </span>
                <span className="feels-like">
                  Hissalanish: {formatTemperature(current.feels_like)}�
                </span>
              </div>
              <p className="weather-description">
                {getWeatherDescription(current.weather_code)}
              </p>
              <p className="current-date">{formatDate(current.time)}</p>
            </div>
          </div>

          <div
            className="weather-stats"
            style={{ borderTop: `3px solid ${weatherColor}` }}
          >
            <div className="stat-item">
              <span className="stat-label">Namlik</span>
              <span className="stat-value">{current.humidity}%</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Shamol</span>
              <span className="stat-value">{current.wind_speed} km/h</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Bosim</span>
              <span className="stat-value">
                {Math.round(current.pressure)} hPa
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Yog'ingarchilik</span>
              <span className="stat-value">{current.precipitation} mm</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Shamol yo'nalishi</span>
              <span className="stat-value">{current.wind_direction}�</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">So'nggi yangilanish</span>
              <span className="stat-value">
                {current.time.toLocaleTimeString('uz-UZ', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>
        </div>

        <div className="tabs-section">
          <div className="tabs-header">
            <button
              className={`tab-button ${activeTab === 'today' ? 'active' : ''}`}
              onClick={() => setActiveTab('today')}
            >
              Bugun
            </button>
            <button
              className={`tab-button ${activeTab === 'hourly' ? 'active' : ''}`}
              onClick={() => setActiveTab('hourly')}
            >
              Soatlik
            </button>
            <button
              className={`tab-button ${activeTab === 'forecast' ? 'active' : ''}`}
              onClick={() => setActiveTab('forecast')}
            >
              Prognoz
            </button>
          </div>

          <div className="tabs-content">
            {activeTab === 'today' && (
              <div className="tab-pane today-pane">
                <h3>Bugun ob-havo tafsilotlari</h3>
                <p>
                  Bugun ob-havo{' '}
                  {getWeatherDescription(current.weather_code).toLowerCase()}.
                  Harorat {formatTemperature(current.temperature)}�C atrofida,
                  shamol tezligi {current.wind_speed} km/soat. Namlik darajasi{' '}
                  {current.humidity}% ni tashkil qilmoqda.
                </p>
              </div>
            )}

            {activeTab === 'hourly' && weatherData.hourly && (
              <div className="tab-pane hourly-pane">
                <HourlyForecast hourly={weatherData.hourly} />
              </div>
            )}

            {activeTab === 'forecast' && weatherData.daily && (
              <div className="tab-pane forecast-pane">
                <Forecast daily={weatherData.daily} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
