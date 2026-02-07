import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import WeatherCard from '../components/WeatherCard';
import SearchBar from '../components/SearchBar';
import Forecast from '../components/Forecast';
import HourlyForecast from '../components/HourlyForecast';
import GeolocationPermission from '../components/GeolocationPermission';

import { getWeatherData } from '../services/weatherAPI';
import NetworkService from '../services/networkService';
import { reverseGeocode } from '../services/locationService';
import { CITIES, DEFAULT_CITY } from '../utils/constants';

const HomePage = () => {
  const navigate = useNavigate();

  const [selectedCity, setSelectedCity] = useState(DEFAULT_CITY);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isOnline, setIsOnline] = useState(NetworkService.getStatus());

  const [locationName, setLocationName] = useState(null);
  const [showGeoModal, setShowGeoModal] = useState(false);

  /* ================= GEOLOCATION ================= */

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;

        try {
          const place = await reverseGeocode(latitude, longitude);
          setLocationName(place);

          // CITIES bilan mos shaharni topish
          const matchedCity = CITIES.find(
            c => c.name.toLowerCase() === place.city.toLowerCase()
          );

          const displayName =
            place.displayName || place.city || 'Joriy joylashuv';

          if (matchedCity) {
            setSelectedCity({
              name: displayName,
              lat: latitude,
              lon: longitude,
            });
          } else {
            setSelectedCity({
              name: displayName,
              lat: latitude,
              lon: longitude,
            });
          }
        } catch (err) {
          console.error('Reverse geocode error:', err);
        }
      },
      error => {
        console.log('Geolocation error:', error.message);
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );

    setShowGeoModal(false);
  }, []);

  const checkGeolocationPermission = useCallback(async () => {
    if (!navigator.permissions) return;

    try {
      const result = await navigator.permissions.query({ name: 'geolocation' });

      if (result.state === 'granted') {
        getCurrentLocation();
      } else if (result.state === 'prompt') {
        setShowGeoModal(true);
      }
    } catch (e) {
      console.log('Permission check failed:', e);
    }
  }, [getCurrentLocation]);

  /* ================= WEATHER ================= */

  const fetchWeatherData = useCallback(async () => {
    if (!isOnline) {
      setError("Internet aloqasi yo'q");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getWeatherData(selectedCity.lat, selectedCity.lon);
      setWeatherData(data);
    } catch (err) {
      setError(err.message || "Ob-havo ma'lumotlarini olishda xatolik");
    } finally {
      setLoading(false);
    }
  }, [isOnline, selectedCity]);

  const handleSearch = city => {
    setSelectedCity(city);
  };

  const handleRetry = () => {
    fetchWeatherData();
  };

  /* ================= NETWORK ================= */
  useEffect(() => {
    const handleNetworkChange = status => {
      setIsOnline(status);
      if (status && selectedCity) {
        fetchWeatherData();
      }
    };

    NetworkService.addListener(handleNetworkChange);

    return () => {
      NetworkService.removeListener(handleNetworkChange);
    };
  }, [selectedCity, fetchWeatherData]);

  useEffect(() => {
    if (selectedCity && isOnline) {
      fetchWeatherData();
    }
  }, [selectedCity, isOnline, fetchWeatherData]);

  useEffect(() => {
    checkGeolocationPermission();
  }, [checkGeolocationPermission]);

  useEffect(() => {
    if (!isOnline && weatherData === null) {
      navigate('/offline');
    }
  }, [isOnline, weatherData, navigate]);

  if (!isOnline && weatherData === null) return null;

  /* ================= UI ================= */

  return (
    <div className="home-page">
      {showGeoModal && (
        <GeolocationPermission
          onAllow={getCurrentLocation}
          onClose={() => setShowGeoModal(false)}
        />
      )}

      <header className="app-header">
        <h1>O'zbekiston Ob-havosi</h1>
        <p>Har bir shahar uchun aniq ob-havo</p>
      </header>

      <div className="main-container">
        <SearchBar cities={CITIES} onSearch={handleSearch} />

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner" />
            <p>Yuklanmoqda...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p>{error}</p>
            <button onClick={handleRetry}>Qayta urinish</button>
          </div>
        ) : (
          <>
            <WeatherCard
              weather={weatherData}
              city={locationName?.displayName || selectedCity.name}
              showDetails
            />

            {weatherData.hourly?.length > 0 && (
              <HourlyForecast hourly={weatherData.hourly} />
            )}

            {weatherData.daily?.length > 0 && (
              <Forecast daily={weatherData.daily} />
            )}
          </>
        )}

        <div className="quick-cities">
          <h3>Tezkor shaharlar</h3>
          <div className="city-buttons">
            {CITIES.filter(c => c.name !== selectedCity.name)
              .slice(0, 4)
              .map(city => (
                <button key={city.name} onClick={() => handleSearch(city)}>
                  {city.name}
                </button>
              ))}
          </div>
        </div>
      </div>

      <footer className="app-footer">
        <p>
          Ma'lumotlar{' '}
          <a href="https://open-meteo.com" target="_blank" rel="noreferrer">
            Open-Meteo
          </a>{' '}
          tomonidan taqdim etiladi
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
