import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import '../styles/SearchBar.css';
import { geocodeCities } from '../services/locationService';

const SearchBar = ({ onSearch, cities }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    const handleClickOutside = event => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const value = query.trim();
    if (!value) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const timer = setTimeout(async () => {
      const requestId = ++requestIdRef.current;
      setIsSearching(true);
      try {
        const remote = await geocodeCities(value, 6);
        if (requestIdRef.current === requestId) {
          setSuggestions(remote);
          setShowSuggestions(true);
        }
      } catch (error) {
        console.error('Geocode error:', error);
      } finally {
        if (requestIdRef.current === requestId) {
          setIsSearching(false);
        }
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [query, cities]);

  const handleInputChange = e => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectCity = city => {
    onSearch(city);
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const value = query.trim();
    if (!value) return;

    const exactCity = suggestions.find(
      c => c.name.toLowerCase() === value.toLowerCase()
    );

    if (exactCity) {
      onSearch(exactCity);
      setQuery('');
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsSearching(true);
    try {
      const remote = await geocodeCities(value, 1);
      if (remote[0]) {
        onSearch(remote[0]);
        setQuery('');
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } catch (error) {
      console.error('Geocode error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="search-container" ref={searchRef}>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-input-wrapper">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => {
              setSuggestions(query.trim() ? suggestions : cities);
              setShowSuggestions(true);
            }}
            placeholder="Shahar nomini kiriting..."
            className="search-input"
            aria-label="Shahar qidirish"
          />
          <button type="submit" className="search-button">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestions-dropdown">
              {suggestions.map((city, index) => (
                <button
                  key={`${city.name}-${index}`}
                  type="button"
                  className="suggestion-item"
                  onClick={() => handleSelectCity(city)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') handleSelectCity(city);
                  }}
                >
                  <span className="suggestion-icon">?</span>
                  <span className="suggestion-text">
                    <span className="suggestion-name">{city.name}</span>
                    {(city.region || city.country || city.displayName) && (
                      <span className="suggestion-meta">
                        {city.region || city.country || city.displayName}
                      </span>
                    )}
                  </span>
                </button>
              ))}
            </div>
          )}

          {showSuggestions && suggestions.length === 0 && !isSearching && (
            <div className="suggestions-dropdown">
              <div className="suggestion-item">Natija topilmadi</div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      lat: PropTypes.number.isRequired,
      lon: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default SearchBar;
