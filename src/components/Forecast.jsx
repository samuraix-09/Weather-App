import React from 'react';
import PropTypes from 'prop-types';
import WeatherIcon from './WeatherIcon';
import { formatDate, formatTemperature } from '../utils/weatherUtils';

const Forecast = ({ daily }) => {
  if (!daily || daily.length === 0) {
    return null;
  }

  // Birinchi 5 kunni olish
  const nextDays = daily.slice(0, 5);

  return (
    <div className="forecast-container">
      <h3 className="forecast-title">Keyingi 5 kun</h3>
      <div className="forecast-grid">
        {nextDays.map((day, index) => {
          const date = formatDate(day.date);
          return (
            <div key={index} className="forecast-day">
              <div className="day-header">
                <span className="day-name">{date}</span>
                <WeatherIcon code={day.weather_code} size={40} />
              </div>
              <div className="day-temperatures">
                <span className="temp-max">
                  {formatTemperature(day.max_temp)}°
                </span>
                <span className="temp-min">
                  {formatTemperature(day.min_temp)}°
                </span>
              </div>
              <div className="day-details">
                <span className="precipitation">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 12H20C20.55 12 21 12.45 21 13C21 13.55 20.55 14 20 14H18C17.45 14 17 13.55 17 13C17 12.45 17.45 12 18 12ZM18 16H20C20.55 16 21 16.45 21 17C21 17.55 20.55 18 20 18H18C17.45 18 17 17.55 17 17C17 16.45 17.45 16 18 16ZM18 8H20C20.55 8 21 8.45 21 9C21 9.55 20.55 10 20 10H18C17.45 10 17 9.55 17 9C17 8.45 17.45 8 18 8ZM8 12H10C10.55 12 11 12.45 11 13C11 13.55 10.55 14 10 14H8C7.45 14 7 13.55 7 13C7 12.45 7.45 12 8 12ZM8 16H10C10.55 16 11 16.45 11 17C11 17.55 10.55 18 10 18H8C7.45 18 7 17.55 7 17C7 16.45 7.45 16 8 16ZM8 8H10C10.55 8 11 8.45 11 9C11 9.55 10.55 10 10 10H8C7.45 10 7 9.55 7 9C7 8.45 7.45 8 8 8ZM6 12C7.1 12 8 11.1 8 10C8 8.9 7.1 8 6 8C4.9 8 4 8.9 4 10C4 11.1 4.9 12 6 12ZM6 16C7.1 16 8 15.1 8 14C8 12.9 7.1 12 6 12C4.9 12 4 12.9 4 14C4 15.1 4.9 16 6 16ZM6 8C7.1 8 8 7.1 8 6C8 4.9 7.1 4 6 4C4.9 4 4 4.9 4 6C4 7.1 4.9 8 6 8Z"
                      fill="#3b82f6"
                    />
                  </svg>
                  {day.precipitation}mm
                </span>
                <span className="wind">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 9H16C17.1 9 18 8.1 18 7C18 5.9 17.1 5 16 5H4V9ZM4 13H12C13.1 13 14 12.1 14 11C14 9.9 13.1 9 12 9H4V13ZM4 17H14C15.1 17 16 16.1 16 15C16 13.9 15.1 13 14 13H4V17ZM20 13H22V15H20V13ZM20 9H22V11H20V9ZM20 17H22V19H20V17Z"
                      fill="#6b7280"
                    />
                  </svg>
                  {formatTemperature(day.wind_speed)}km/h
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Forecast.propTypes = {
  daily: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      max_temp: PropTypes.number.isRequired,
      min_temp: PropTypes.number.isRequired,
      weather_code: PropTypes.number.isRequired,
      precipitation: PropTypes.number.isRequired,
      wind_speed: PropTypes.number.isRequired,
    })
  ),
};

export default Forecast;
