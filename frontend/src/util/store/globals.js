const API_URL = window.webpackHotUpdate ? 'http://localhost:3000/api' : '/api'; // is in dev mode
const projects = `${API_URL}/projects`
const endpoints = `${API_URL}/endpoints`;
const auth = `${API_URL}/auth`;

export default {
  API_URL,
  // PROJECTS //
  GET_ALL_PROJECTS_URL: `${projects}/all`, // GET
  GET_PROJECT_URL: projects, // GET with :id
  CREATE_PROJECT_URL: `${projects}/create`, // POST wiht body
  UPDATE_PROJECT_URL: `${projects}/update`, // PATCH with body
  REPLACE_PROJECT_URL: `${projects}/replace`, // PUT with body
  DELETE_PROJECT_URL: `${projects}/delete`, // DELETE with :id
  // ENDPOINTS //
  ADD_ENDPOINT_URL: `${endpoints}/add`, // POST with body
  GET_ALL_ENDPOINTS_URL: `${endpoints}/get-all`, // GET
  GET_ENDPOINT_URL: `${endpoints}/get`, // GET with :id || POST with filter in body
  UPDATE_ENDPOINT_URL: `${endpoints}/update`, // PATCH with body
  REPLACE_ENDPOINT_URL: `${endpoints}/replace`, // PUT with body
  DELETE_ENDPOINT_URL: `${endpoints}/delete`, // DELETE with :id
  // AUTH //
  SIGNUP_URL: `${auth}/signup`, // POST
  LOGIN_URL: `${auth}/login`, // POST
  // PUBLIC //
  GET_PUBLIC_PROJECT_URL: `${API_URL}/public` // GET with :id
}