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
