const API_URL = window.webpackHotUpdate ? 'http://localhost:3000/api' : '/api'; // is in dev mode
const endpoints = `${API_URL}/endpoints`;

export default {
  API_URL,
  GET_ALL_ENDPOINTS_URL: `${endpoints}/get-all`
}