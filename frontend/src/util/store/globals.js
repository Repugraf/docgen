const API_URL = window.webpackHotUpdate ? 'http://localhost:3000/api' : '/api'; // is in dev mode
const endpoints = `${API_URL}/endpoints`;

export default {
  API_URL,
  ADD_ENDPOINT_URL: `${endpoints}/add`, // POST with body
  GET_ALL_ENDPOINTS_URL: `${endpoints}/get-all`, // GET
  GET_ENDPOINT_URL: `${endpoints}/get`, // GET with :id || POST with filter in body
  UPDATE_ENDPOINT_URL: `${endpoints}/update`, // PATCH with body
  DELETE_ENDPOINT_URL: `${endpoints}/delete` // DELETE with :id
}