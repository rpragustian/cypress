// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Custom API testing commands
Cypress.Commands.add('apiGet', (endpoint, options = {}) => {
  return cy.request({
    method: 'GET',
    url: `${Cypress.env('apiBaseUrl')}${endpoint}`,
    failOnStatusCode: false,
    ...options
  });
});

Cypress.Commands.add('apiPost', (endpoint, body, options = {}) => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('apiBaseUrl')}${endpoint}`,
    body,
    failOnStatusCode: false,
    ...options
  });
});

Cypress.Commands.add('apiPut', (endpoint, body, options = {}) => {
  return cy.request({
    method: 'PUT',
    url: `${Cypress.env('apiBaseUrl')}${endpoint}`,
    body,
    failOnStatusCode: false,
    ...options
  });
});

Cypress.Commands.add('apiDelete', (endpoint, options = {}) => {
  return cy.request({
    method: 'DELETE',
    url: `${Cypress.env('apiBaseUrl')}${endpoint}`,
    failOnStatusCode: false,
    ...options
  });
});

// Helper command to validate API response structure
Cypress.Commands.add('validateApiResponse', (response, expectedStatus = 200) => {
  expect(response.status).to.equal(expectedStatus);
  expect(response.body).to.not.be.null;
  return response;
});

// Setup chai-json-schema-ajv for JSON schema validation
import chaiJsonSchema from 'chai-json-schema-ajv';
chai.use(chaiJsonSchema);