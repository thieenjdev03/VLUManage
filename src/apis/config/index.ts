const API_BASE_URL = !window.location.href.includes('localhost')
  ? import.meta.env.VITE_API_URL_PROD // Production API
  : import.meta.env.VITE_API_URL; // Development API

console.log('Base API URL:', API_BASE_URL);

export default API_BASE_URL;
