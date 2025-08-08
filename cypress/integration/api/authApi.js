// Authentication API methods for testing
// Import this in test files: import { authApi } from '../integration/api/authApi.js';

/**
 * Login with email and password
 * @param {object} credentials - Login credentials
 * @param {string} credentials.email - User email
 * @param {string} credentials.password - User password
 * @param {object} options - Additional request options
 * @returns {Cypress.Chainable} - Cypress request chain
 */
export const login = (credentials, options = {}) => {
  return cy.request({
    method: 'POST',
    url: 'https://reqres.in/api/login',
    body: credentials,
    failOnStatusCode: false,
    ...options
  });
};

/**
 * Register a new user
 * @param {object} userData - Registration data
 * @param {string} userData.email - User email
 * @param {string} userData.password - User password
 * @param {object} options - Additional request options
 * @returns {Cypress.Chainable} - Cypress request chain
 */
export const register = (userData, options = {}) => {
  return cy.request({
    method: 'POST',
    url: 'https://reqres.in/api/register',
    body: userData,
    failOnStatusCode: false,
    ...options
  });
};

/**
 * Login with default test credentials
 * @param {object} options - Additional request options
 * @returns {Cypress.Chainable} - Cypress request chain
 */
export const loginWithDefaultCredentials = (options = {}) => {
  return login({
    email: 'eve.holt@reqres.in',
    password: 'cityslicka'
  }, options);
};

/**
 * Register with default test credentials
 * @param {object} options - Additional request options
 * @returns {Cypress.Chainable} - Cypress request chain
 */
export const registerWithDefaultCredentials = (options = {}) => {
  return register({
    email: 'eve.holt@reqres.in',
    password: 'pistol'
  }, options);
};

// Export all auth API methods as a single object
export const authApi = {
  login,
  register,
  loginWithDefaultCredentials,
  registerWithDefaultCredentials
};
