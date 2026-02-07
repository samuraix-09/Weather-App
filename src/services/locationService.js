export const reverseGeocode = async (lat, lon) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'weather-app',
    },
  });

  if (!response.ok) {
    throw new Error('Location aniqlanmadi');
  }

  const data = await response.json();

  const address = data.address || {};

  const city =
    address.city ||
    address.town ||
    address.village ||
    address.hamlet ||
    address.suburb ||
    address.county ||
    address.state ||
    'Joriy joylashuv';

  return {
    city,
    region: address.state || '',
    country: address.country || '',
    displayName: city,
  };
};

export const geocodeCities = async (query, limit = 5) => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    query
  )}&limit=${limit}&addressdetails=1`;

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'weather-app',
    },
  });

  if (!response.ok) {
    throw new Error('Shahar topilmadi');
  }

  const data = await response.json();
  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }

  return data
    .map(item => {
      const name =
        item?.address?.city ||
        item?.address?.town ||
        item?.address?.village ||
        item?.address?.hamlet ||
        item?.address?.state ||
        item?.display_name ||
        query;

      return {
        name,
        displayName: item?.display_name || name,
        region: item?.address?.state || '',
        country: item?.address?.country || '',
        lat: Number(item.lat),
        lon: Number(item.lon),
      };
    })
    .filter(item => Number.isFinite(item.lat) && Number.isFinite(item.lon));
};
