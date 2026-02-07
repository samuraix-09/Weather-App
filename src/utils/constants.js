// Shaharlar ro'yxati
export const CITIES = [
  { name: 'Toshkent', lat: 41.2646, lon: 69.2163 },
  { name: 'Samarqand', lat: 39.627, lon: 66.975 },
  { name: 'Buxoro', lat: 39.768, lon: 64.4556 },
  { name: 'Andijon', lat: 40.7833, lon: 72.3333 },
  { name: "Farg'ona", lat: 40.3864, lon: 71.7864 },
  { name: 'Namangan', lat: 40.9983, lon: 71.6726 },
  { name: 'Qarshi', lat: 38.8616, lon: 65.7846 },
  { name: 'Nukus', lat: 42.4531, lon: 59.6103 },
];

// Ob-havo kodlari
export const WEATHER_CODES = {
  0: { uz: 'Ochiq osmon', icon: 'sunny' },
  1: { uz: 'Asosan ochiq', icon: 'mostly-sunny' },
  2: { uz: "O'zgaruvchan bulutli", icon: 'partly-cloudy' },
  3: { uz: 'Bulutli', icon: 'cloudy' },
  45: { uz: 'Tuman', icon: 'fog' },
  48: { uz: 'Muzli tuman', icon: 'fog' },
  51: { uz: 'Yengil yomgir', icon: 'light-rain' },
  53: { uz: "O'rtacha yomg'ir", icon: 'rain' },
  55: { uz: 'Kuchli yomgir', icon: 'heavy-rain' },
  61: { uz: 'Yengil yomgir', icon: 'light-rain' },
  63: { uz: "O'rtacha yomg'ir", icon: 'rain' },
  65: { uz: 'Kuchli yomgir', icon: 'heavy-rain' },
  71: { uz: 'Yengil qor', icon: 'snow' },
  73: { uz: "O'rtacha qor", icon: 'snow' },
  75: { uz: 'Kuchli qor', icon: 'snow' },
  80: { uz: 'Yomgirli shabada', icon: 'heavy-rain' },
  95: { uz: 'Momaqaldiroq', icon: 'thunderstorm' },
};

// Ranglar
export const COLORS = {
  primary: '#2563eb',
  secondary: '#7c3aed',
  success: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
  light: '#f8fafc',
  dark: '#1e293b',
};

// Default shahar
export const DEFAULT_CITY = CITIES[0];
