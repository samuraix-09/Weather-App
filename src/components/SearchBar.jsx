import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import '../styles/SearchBar.css';

const SearchBar = ({ onSearch, cities }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

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

  const handleInputChange = e => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length > 0) {
      const filtered = cities.filter(city =>
        city.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions(cities);
      setShowSuggestions(true);
    }
  };

  const handleSelectCity = city => {
    setQuery(city.name);
    setShowSuggestions(false);
    onSearch(city);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim()) {
      const city = cities.find(c =>
        c.name.toLowerCase().includes(query.toLowerCase())
      );
      if (city) {
        onSearch(city);
        setShowSuggestions(false);
      }
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
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>{city.name}</span>
                </button>
              ))}
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
