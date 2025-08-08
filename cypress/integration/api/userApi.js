// User API methods for testing
// Import this in test files: import { userApi } from '../integration/api/userApi.js';

/**
 * Get a single user by ID
 * @param {number} userId - The user ID to fetch
 * @param {object} options - Additional request options
 * @returns {Cypress.Chainable} - Cypress request chain
 */
export const getUser = (userId = 1, options = {}) => {
  return cy.request({
    method: 'GET',
    url: `https://reqres.in/api/users/${userId}`,
    failOnStatusCode: false,
    ...options
  });
};

/**
 * Get users list with pagination
 * @param {number} page - Page number (default: 1)
 * @param {object} options - Additional request options
 * @returns {Cypress.Chainable} - Cypress request chain
 */
export const getUsersList = (page = 1, options = {}) => {
  return cy.request({
    method: 'GET',
    url: `https://reqres.in/api/users?page=${page}`,
    failOnStatusCode: false,
    ...options
  });
};

/**
 * Create a new user
 * @param {object} userData - User data to create
 * @param {object} options - Additional request options
 * @returns {Cypress.Chainable} - Cypress request chain
 */
export const createUser = (userData, options = {}) => {
  return cy.request({
    method: 'POST',
    url: 'https://reqres.in/api/users',
    body: userData,
    failOnStatusCode: false,
    ...options
  });
};

/**
 * Update a user
 * @param {number} userId - The user ID to update
 * @param {object} userData - Updated user data
 * @param {object} options - Additional request options
 * @returns {Cypress.Chainable} - Cypress request chain
 */
export const updateUser = (userId, userData, options = {}) => {
  return cy.request({
    method: 'PUT',
    url: `https://reqres.in/api/users/${userId}`,
    body: userData,
    failOnStatusCode: false,
    ...options
  });
};

/**
 * Delete a user
 * @param {number} userId - The user ID to delete
 * @param {object} options - Additional request options
 * @returns {Cypress.Chainable} - Cypress request chain
 */
export const deleteUser = (userId, options = {}) => {
  return cy.request({
    method: 'DELETE',
    url: `https://reqres.in/api/users/${userId}`,
    failOnStatusCode: false,
    ...options
  });
};

// Export all user API methods as a single object
export const userApi = {
  getUser,
  getUsersList,
  createUser,
  updateUser,
  deleteUser
};
