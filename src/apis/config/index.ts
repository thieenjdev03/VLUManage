// src/config/index.ts
const ENV = process.env.NODE_ENV;

export const API_BASE_URL = (() => {
  if (ENV === 'development') return 'http://localhost:3000';
  if (ENV === 'staging') return 'https://staging.api.example.com';
  return 'https://api.example.com';
})();