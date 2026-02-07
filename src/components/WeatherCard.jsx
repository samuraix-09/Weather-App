import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/WeatherCard.css';
import WeatherIcon from './WeatherIcon';
import {
  formatTemperature,
  getWeatherDescription,
} from '../utils/weatherUtils';

const WeatherCard = ({ weather, city, showDetails = true }) => {
  if (!weather || !weather.current) {
    return (
      <div className="weather-card loading">
        <div className="loading-spinner" />
        <p>Ob-havo yuklanmoqda...</p>
      </div>
    );
  }

  const { current } = weather;

  return (
    <div className="weather-card">
      <div className="weather-header">
        <div className="location-info">
          <h2 className="city-name">{city}</h2>
          <p className="weather-description">
            {getWeatherDescription(current.weather_code)}
          </p>
        </div>
        <div className="temperature-section">
          <WeatherIcon code={current.weather_code} size={80} />
          <div className="temperature-display">
            <span className="temperature">
              {formatTemperature(current.temperature)}°
            </span>
            <span className="feels-like">
              Hissalanish: {formatTemperature(current.feels_like)}°
            </span>
          </div>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">Namlik</span>
          <span className="detail-value">{current.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Shamol</span>
          <span className="detail-value">{current.wind_speed} km/h</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Bosim</span>
          <span className="detail-value">
            {Math.round(current.pressure)} hPa
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Yog'ingarchilik</span>
          <span className="detail-value">{current.precipitation} mm</span>
        </div>
      </div>

      {showDetails && (
        <div className="card-footer">
          <Link to={`/details/${city}`} className="details-link">
            Batafsil ma'lumot →
          </Link>
        </div>
      )}
    </div>
  );
};

WeatherCard.propTypes = {
  weather: PropTypes.shape({
    current: PropTypes.shape({
      temperature: PropTypes.number,
      feels_like: PropTypes.number,
      humidity: PropTypes.number,
      wind_speed: PropTypes.number,
      pressure: PropTypes.number,
      precipitation: PropTypes.number,
      weather_code: PropTypes.number,
    }),
  }),
  city: PropTypes.string.isRequired,
  showDetails: PropTypes.bool,
};

export default WeatherCard;
