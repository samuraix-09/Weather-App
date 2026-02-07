import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import WeatherCard from '../components/WeatherCard';
import SearchBar from '../components/SearchBar';
import Forecast from '../components/Forecast';
import HourlyForecast from '../components/HourlyForecast';

import { getWeatherData } from '../services/weatherAPI';
import NetworkService from '../services/networkService';
import { reverseGeocode } from '../services/locationService';
import { CITIES, DEFAULT_CITY } from '../utils/constants';

const HomePage = () => {
  const navigate = useNavigate();
  const locationTimerRef = useRef(null);
  const locatingRef = useRef(false);
  const locationSessionRef = useRef(0);

  const [selectedCity, setSelectedCity] = useState(DEFAULT_CITY);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isOnline, setIsOnline] = useState(NetworkService.getStatus());

  const [locationName, setLocationName] = useState(null);
  const [isLocating, setIsLocating] = useState(false);

  /* ================= GEOLOCATION ================= */

  const stopLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setIsLocating(false);
      return;
    }

    locationSessionRef.current += 1;
    locatingRef.current = false;
    if (locationTimerRef.current !== null) {
      clearInterval(locationTimerRef.current);
      locationTimerRef.current = null;
    }
    setLocationName(null);
    setIsLocating(false);
  }, []);

  const startLocation = useCallback(() => {
    if (!navigator.geolocation) return;

    if (locationTimerRef.current !== null) {
      clearInterval(locationTimerRef.current);
      locationTimerRef.current = null;
    }

    locationSessionRef.current += 1;
    const sessionId = locationSessionRef.current;
    locatingRef.current = true;
    setIsLocating(true);

    const locateOnce = async () => {
      if (!locatingRef.current || sessionId !== locationSessionRef.current) {
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async position => {
          if (
            !locatingRef.current ||
            sessionId !== locationSessionRef.current
          ) {
            return;
          }

          const { latitude, longitude } = position.coords;

          try {
            const place = await reverseGeocode(latitude, longitude);
            if (
              !locatingRef.current ||
              sessionId !== locationSessionRef.current
            ) {
              return;
            }
            setLocationName(place);

            const displayName =
              place.displayName || place.city || 'Joriy joylashuv';

            setSelectedCity({
              name: displayName,
              lat: latitude,
              lon: longitude,
            });
          } catch (err) {
            console.error('Reverse geocode error:', err);
          }
        },
        error => {
          console.log('Geolocation error:', error.message);
          locatingRef.current = false;
          setIsLocating(false);
          if (locationTimerRef.current !== null) {
            clearInterval(locationTimerRef.current);
            locationTimerRef.current = null;
          }
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 60000 }
      );
    };

    locateOnce();
    locationTimerRef.current = setInterval(locateOnce, 30000);
  }, []);

  /* ================= WEATHER ================= */

  const fetchWeatherData = useCallback(async () => {
    if (!selectedCity) return;

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
    stopLocation();
    setLocationName(null);
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
    if (!isOnline && weatherData === null) {
      navigate('/offline');
    }
  }, [isOnline, weatherData, navigate]);

  useEffect(() => {
    return () => {
      stopLocation();
    };
  }, [stopLocation]);

  if (!isOnline && weatherData === null) return null;

  /* ================= UI ================= */

  return (
    <div className="home-page">
      <header className="app-header">
        <h1>O'zbekiston Ob-havosi</h1>
        <p>Har bir shahar uchun aniq ob-havo</p>
        <div className="geo-controls">
          <button onClick={startLocation} disabled={isLocating}>
            Lokatsiyani olish
          </button>
          <button onClick={stopLocation} disabled={!isLocating}>
            To'xtatish
          </button>
        </div>
      </header>

      <div className="main-container">
        <SearchBar cities={CITIES} onSearch={handleSearch} />

        {!selectedCity && !loading && (
          <div className="info-container">
            <p>Shahar qidiring yoki lokatsiyani qo'lda ishga tushiring.</p>
          </div>
        )}

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
          selectedCity && (
            <>
              <WeatherCard
                weather={weatherData}
                city={locationName?.displayName || selectedCity.name}
                showDetails
              />

              {weatherData?.hourly?.length > 0 && (
                <HourlyForecast hourly={weatherData.hourly} />
              )}

              {weatherData?.daily?.length > 0 && (
                <Forecast daily={weatherData.daily} />
              )}
            </>
          )
        )}
      </div>
    </div>
  );
};

export default HomePage;
