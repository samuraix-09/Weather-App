import React from 'react';
import PropTypes from 'prop-types';
import WeatherIcon from './WeatherIcon';
import { formatTime, formatTemperature } from '../utils/weatherUtils';

const HourlyForecast = ({ hourly }) => {
  if (!hourly || hourly.length === 0) {
    return null;
  }

  return (
    <div className="hourly-forecast-container">
      <h3 className="hourly-title">Soatlik prognoz</h3>
      <div className="hourly-scroll">
        {hourly.map((hour, index) => (
          <div key={index} className="hourly-item">
            <span className="hour-time">{formatTime(hour.time)}</span>
            <div className="hour-icon">
              <WeatherIcon code={hour.weather_code} size={40} />
            </div>
            <div className="hour-details">
              <span className="hour-temp">
                {formatTemperature(hour.temperature)}°
              </span>
              <div className="hour-precipitation">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 12H20C20.55 12 21 12.45 21 13C21 13.55 20.55 14 20 14H18C17.45 14 17 13.55 17 13C17 12.45 17.45 12 18 12Z"
                    fill="#3b82f6"
                  />
                </svg>
                <span>{hour.precipitation}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

HourlyForecast.propTypes = {
  hourly: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.instanceOf(Date).isRequired,
      temperature: PropTypes.number.isRequired,
      precipitation: PropTypes.number.isRequired,
      weather_code: PropTypes.number.isRequired,
      wind_speed: PropTypes.number.isRequired,
    })
  ),
};

export default HourlyForecast;
