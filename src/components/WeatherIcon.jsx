import React from 'react';
import PropTypes from 'prop-types';
import { WEATHER_CODES } from '../utils/constants';

const WeatherIcon = ({ code, size = 64, className = '' }) => {
  const getIconComponent = () => {
    const iconType = WEATHER_CODES[code]?.icon || 'sunny';

    switch (iconType) {
      case 'sunny':
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="weather-icon-sunny"
          >
            <defs>
              <radialGradient
                id="sunCore"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(32 32) rotate(90) scale(16)"
              >
                <stop offset="0%" stopColor="#fde68a" />
                <stop offset="70%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f59e0b" />
              </radialGradient>
            </defs>
            <circle cx="32" cy="32" r="16" fill="url(#sunCore)" />
            <g stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round">
              <path d="M32 10V6" />
              <path d="M32 58V54" />
              <path d="M54 32H58" />
              <path d="M6 32H10" />
              <path d="M47.5 16.5L51 13" />
              <path d="M13 51L16.5 47.5" />
              <path d="M16.5 16.5L13 13" />
              <path d="M51 51L47.5 47.5" />
            </g>
          </svg>
        );

      case 'mostly-sunny':
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="weather-icon-mostly-sunny"
          >
            <defs>
              <radialGradient
                id="sunSoft"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(22 22) rotate(90) scale(12)"
              >
                <stop offset="0%" stopColor="#fde68a" />
                <stop offset="70%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#d97706" />
              </radialGradient>
              <linearGradient
                id="cloudSoft"
                x1="6"
                y1="18"
                x2="34"
                y2="40"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#e2e8f0" />
              </linearGradient>
            </defs>
            <circle cx="22" cy="22" r="12" fill="url(#sunSoft)" />
            <path
              d="M12 44C21 44 28 37 28 29C28 21 21 14 12 14C3 14 -4 21 -4 29C-4 37 3 44 12 44Z"
              fill="url(#cloudSoft)"
              stroke="#cbd5e1"
              strokeWidth="1.5"
            />
          </svg>
        );

      case 'partly-cloudy':
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="weather-icon-partly-cloudy"
          >
            <defs>
              <radialGradient
                id="sunWarm"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(18 18) rotate(90) scale(10)"
              >
                <stop offset="0%" stopColor="#fde68a" />
                <stop offset="75%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f59e0b" />
              </radialGradient>
              <linearGradient
                id="cloud1"
                x1="2"
                y1="16"
                x2="26"
                y2="42"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="100%" stopColor="#e2e8f0" />
              </linearGradient>
              <linearGradient
                id="cloud2"
                x1="24"
                y1="20"
                x2="58"
                y2="48"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#dbeafe" />
              </linearGradient>
            </defs>
            <circle cx="18" cy="18" r="10" fill="url(#sunWarm)" />
            <path
              d="M8 40C16 40 22 34 22 26C22 18 16 12 8 12C0 12 -6 18 -6 26C-6 34 0 40 8 40Z"
              fill="url(#cloud1)"
              stroke="#cbd5e1"
              strokeWidth="1.5"
            />
            <path
              d="M40 46C49 46 56 39 56 31C56 23 49 16 40 16C31 16 24 23 24 31C24 39 31 46 40 46Z"
              fill="url(#cloud2)"
              stroke="#94a3b8"
              strokeWidth="2"
            />
          </svg>
        );

      case 'cloudy':
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="weather-icon-cloudy"
          >
            <defs>
              <linearGradient
                id="cloudDark"
                x1="6"
                y1="10"
                x2="36"
                y2="40"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#e2e8f0" />
                <stop offset="100%" stopColor="#cbd5f5" />
              </linearGradient>
              <linearGradient
                id="cloudLight"
                x1="20"
                y1="12"
                x2="58"
                y2="44"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="100%" stopColor="#e2e8f0" />
              </linearGradient>
            </defs>
            <path
              d="M20 38C29 38 36 31 36 23C36 15 29 8 20 8C11 8 4 15 4 23C4 31 11 38 20 38Z"
              fill="url(#cloudDark)"
              stroke="#94a3b8"
              strokeWidth="1.5"
            />
            <path
              d="M42 42C51 42 58 35 58 27C58 19 51 12 42 12C33 12 26 19 26 27C26 35 33 42 42 42Z"
              fill="url(#cloudLight)"
              stroke="#64748b"
              strokeWidth="2"
            />
          </svg>
        );

      case 'fog':
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="weather-icon-fog"
          >
            <path
              d="M10 40C18 40 24 34 24 26C24 18 18 12 10 12C2 12 -4 18 -4 26C-4 34 2 40 10 40Z"
              fill="#f1f5f9"
              stroke="#cbd5e1"
              strokeWidth="1"
            />
            <path
              d="M40 44C48 44 54 38 54 30C54 22 48 16 40 16C32 16 26 22 26 30C26 38 32 44 40 44Z"
              fill="#ffffff"
              stroke="#94a3b8"
              strokeWidth="2"
            />
            <g stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round">
              <path d="M4 32H60" />
              <path d="M8 38H56" />
              <path d="M12 44H52" />
            </g>
          </svg>
        );

      case 'light-rain':
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="weather-icon-light-rain"
          >
            <path
              d="M32 40C42 40 50 32 50 22C50 12 42 4 32 4C22 4 14 12 14 22C14 32 22 40 32 40Z"
              fill="#e0f2fe"
              stroke="#38bdf8"
              strokeWidth="2"
            />
            <g stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round">
              <path d="M22 44L22 52" />
              <path d="M30 42L30 50" />
              <path d="M38 44L38 52" />
            </g>
          </svg>
        );

      case 'rain':
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="weather-icon-rain"
          >
            <path
              d="M32 44C42 44 50 36 50 26C50 16 42 8 32 8C22 8 14 16 14 26C14 36 22 44 32 44Z"
              fill="#bae6fd"
              stroke="#0ea5e9"
              strokeWidth="2"
            />
            <g stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round">
              <path d="M20 48L20 56" />
              <path d="M26 46L26 54" />
              <path d="M32 48L32 56" />
              <path d="M38 46L38 54" />
              <path d="M44 48L44 56" />
            </g>
          </svg>
        );

      case 'heavy-rain':
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="weather-icon-heavy-rain"
          >
            <path
              d="M32 48C42 48 50 40 50 30C50 20 42 12 32 12C22 12 14 20 14 30C14 40 22 48 32 48Z"
              fill="#7dd3fc"
              stroke="#0369a1"
              strokeWidth="2.5"
            />
            <g stroke="#0369a1" strokeWidth="3" strokeLinecap="round">
              <path d="M18 50L18 60" />
              <path d="M24 48L24 58" />
              <path d="M30 50L30 60" />
              <path d="M36 48L36 58" />
              <path d="M42 50L42 60" />
              <path d="M48 48L48 58" />
            </g>
          </svg>
        );

      case 'snow':
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="weather-icon-snow"
          >
            <path
              d="M32 44C42 44 50 36 50 26C50 16 42 8 32 8C22 8 14 16 14 26C14 36 22 44 32 44Z"
              fill="#f0f9ff"
              stroke="#bae6fd"
              strokeWidth="2"
            />
            <g fill="#bae6fd">
              <circle cx="22" cy="50" r="2" />
              <circle cx="28" cy="54" r="2" />
              <circle cx="34" cy="50" r="2" />
              <circle cx="40" cy="54" r="2" />
              <circle cx="46" cy="50" r="2" />
              <circle cx="16" cy="54" r="2" />
            </g>
          </svg>
        );

      case 'thunderstorm':
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="weather-icon-thunderstorm"
          >
            <path
              d="M32 48C42 48 50 40 50 30C50 20 42 12 32 12C22 12 14 20 14 30C14 40 22 48 32 48Z"
              fill="#4c1d95"
              stroke="#7c3aed"
              strokeWidth="2"
            />
            <path fill="#fbbf24" d="M28 30L22 38H30L26 48L34 36H26L28 30Z" />
            <g stroke="#fbbf24" strokeWidth="2" strokeLinecap="round">
              <path d="M20 50L20 58" />
              <path d="M38 46L38 54" />
            </g>
          </svg>
        );

      default:
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="32" cy="32" r="16" fill="#fbbf24" />
          </svg>
        );
    }
  };

  return (
    <div
      className={`weather-icon ${className}`}
      style={{ width: size, height: size }}
    >
      {getIconComponent()}
    </div>
  );
};

WeatherIcon.propTypes = {
  code: PropTypes.number.isRequired,
  size: PropTypes.number,
  className: PropTypes.string,
};

export default WeatherIcon;
