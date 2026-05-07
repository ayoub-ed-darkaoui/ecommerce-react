export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000/api';

export const isNetworkError = (error) =>
  error instanceof TypeError && /fetch/i.test(error.message || '');
