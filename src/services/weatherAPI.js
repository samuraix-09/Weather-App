import axios from 'axios';
import { CITIES } from '../utils/constants';

const API_URL = 'https://api.open-meteo.com/v1/forecast';

// Asosiy ob-havo ma'lumotlarini olish
export const getWeatherData = async (latitude, longitude) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        latitude,
        longitude,
        current:
          'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,pressure_msl',
        hourly:
          'temperature_2m,precipitation_probability,weather_code,wind_speed_10m',
        daily:
          'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,wind_speed_10m_max',
        timezone: 'auto',
        forecast_days: 7,
      },
      timeout: 10000,
    });

    // Ma'lumotlarni qayta ishlash
    const data = response.data;

    // Soatlik ma'lumotlarni qayta ishlash (har 3 soatda)
    const hourly = [];
    for (let i = 0; i < 24 && i < data.hourly.time.length; i += 3) {
      hourly.push({
        time: new Date(data.hourly.time[i]),
        temperature: data.hourly.temperature_2m[i],
        precipitation: data.hourly.precipitation_probability[i],
        weather_code: data.hourly.weather_code[i],
        wind_speed: data.hourly.wind_speed_10m[i],
      });
    }

    // Kunlik ma'lumotlarni qayta ishlash
    const daily = [];
    for (let i = 0; i < 7 && i < data.daily.time.length; i++) {
      daily.push({
        date: new Date(data.daily.time[i]),
        max_temp: data.daily.temperature_2m_max[i],
        min_temp: data.daily.temperature_2m_min[i],
        weather_code: data.daily.weather_code[i],
        precipitation: data.daily.precipitation_sum[i],
        wind_speed: data.daily.wind_speed_10m_max[i],
        sunrise: new Date(data.daily.sunrise[i]),
        sunset: new Date(data.daily.sunset[i]),
      });
    }

    return {
      current: {
        temperature: data.current.temperature_2m,
        feels_like: data.current.apparent_temperature,
        humidity: data.current.relative_humidity_2m,
        precipitation: data.current.precipitation,
        weather_code: data.current.weather_code,
        wind_speed: data.current.wind_speed_10m,
        wind_direction: data.current.wind_direction_10m,
        pressure: data.current.pressure_msl,
        time: new Date(data.current.time),
      },
      hourly,
      daily,
    };
  } catch (error) {
    console.error('Weather API error:', error);
    throw new Error(
      error.response?.status === 404
        ? 'Shahar topilmadi'
        : "Ob-havo ma'lumotlarini olishda xatolik"
    );
  }
};

// Shahar koordinatalarini olish
export const getCityCoordinates = cityName => {
  const city = CITIES.find(
    c => c.name.toLowerCase() === cityName.toLowerCase()
  );
  return city ? { lat: city.lat, lon: city.lon } : null;
};
