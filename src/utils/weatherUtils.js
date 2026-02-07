import { WEATHER_CODES } from './constants';

// Haroratni formatlash
export const formatTemperature = temp => {
  if (temp === undefined || temp === null) return '--';
  return Math.round(temp);
};

// Vaqtni formatlash
export const formatTime = timestamp => {
  if (!timestamp) return '--:--';
  const date = new Date(timestamp);
  return date.toLocaleTimeString('uz-UZ', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Sana formatlash
export const formatDate = timestamp => {
  if (!timestamp) return '--';
  const date = new Date(timestamp);
  const options = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  };
  return date.toLocaleDateString('uz-UZ', options);
};

// Ob-havo tavsifini olish
export const getWeatherDescription = code => {
  return WEATHER_CODES[code]?.uz || 'Nomalum';
};

// Ob-havo rangini olish
export const getWeatherColor = code => {
  const colors = {
    sunny: '#fbbf24',
    'mostly-sunny': '#f59e0b',
    'partly-cloudy': '#60a5fa',
    cloudy: '#94a3b8',
    fog: '#9ca3af',
    'light-rain': '#38bdf8',
    rain: '#0ea5e9',
    'heavy-rain': '#0369a1',
    snow: '#e2e8f0',
    thunderstorm: '#7c3aed',
  };

  const icon = WEATHER_CODES[code]?.icon || 'sunny';
  return colors[icon] || colors.sunny;
};
