# Cypress API Testing Setup

This repository is configured for API testing with Cypress using the [ReqRes](https://reqres.in/) API as a test endpoint.

## Configuration

### Cypress Configuration (`cypress.config.js`)
- Base URL: `https://reqres.in/api/`
- Increased timeouts for API calls
- Environment variables for API base URL

## Two Approaches for API Testing

### Approach 1: Custom Commands (`cypress/support/commands.js`)
The following custom commands are available for API testing:

- `cy.apiGet(endpoint, options)` - GET requests
- `cy.apiPost(endpoint, body, options)` - POST requests  
- `cy.apiPut(endpoint, body, options)` - PUT requests
- `cy.apiDelete(endpoint, options)` - DELETE requests
- `cy.validateApiResponse(response, expectedStatus)` - Validate response structure

### Approach 2: Utility Methods (`cypress/support/api-utils.js`)
A class-based approach with utility methods:

- `apiUtils.get(endpoint, options)` - GET requests
- `apiUtils.post(endpoint, body, options)` - POST requests
- `apiUtils.put(endpoint, body, options)` - PUT requests
- `apiUtils.delete(endpoint, options)` - DELETE requests
- `apiUtils.validateResponse(response, expectedStatus)` - Validate response
- `apiUtils.validateUserData(user)` - Validate user data structure
- `apiUtils.validateResponseTime(startTime, maxTime)` - Validate response time
- `apiUtils.createTestUser(name, job)` - Create test user data
- `apiUtils.createLoginCredentials(email, password)` - Create login credentials

## JSON Schema Validation

### Schema Files (`cypress/fixtures/`)
The following JSON schema files are available for response validation:

- `user.json` - Individual user data structure
- `users-list.json` - Users list response structure
- `single-user.json` - Single user response structure
- `create-user.json` - Create user response structure
- `login.json` - Login response structure
- `register.json` - Register response structure

### Schema Validator (`cypress/support/schema-validator.js`)
Custom utility for JSON schema validation using Ajv:

- `cy.validateJsonSchema(response, schemaName, testName)` - Custom command for schema validation
- `schemaValidator.validateData(data, schemaName, testName)` - Validate specific data
- `schemaValidator.validateResponse(response, schemaName, testName)` - Validate API response

## Test Files

### 1. Simple API Example (`cypress/e2e/simple-api-example.cy.js`)
Basic examples using standard `cy.request()` method.

### 2. Comprehensive API Testing (`cypress/e2e/api-testing.cy.js`)
Advanced examples using custom commands approach.

### 3. Simple Schema Example (`cypress/e2e/simple-schema-example.cy.js`)
Basic JSON schema validation examples using fixtures.

### 4. JSON Schema Validation (`cypress/e2e/json-schema-validation.cy.js`)
Comprehensive JSON schema validation examples.

## Running the Tests

### Run all API tests:
```bash
npx cypress run --spec "cypress/e2e/*api*.cy.js"
```

### Run schema validation tests:
```bash
npx cypress run --spec "cypress/e2e/*schema*.cy.js"
```

### Run specific test file:
```bash
npx cypress run --spec "cypress/e2e/simple-schema-example.cy.js"
```

### Open Cypress Test Runner:
```bash
npx cypress open
```

## Example Test Scenarios

### Using Custom Commands:
```javascript
describe('User API Tests', () => {
  it('should create and retrieve a user', () => {
    const newUser = {
      name: 'John Doe',
      job: 'QA Engineer'
    };

    cy.apiPost('/users', newUser)
      .then((response) => {
        cy.validateApiResponse(response, 201);
        expect(response.body.name).to.equal(newUser.name);
      });
  });
});
```

### Using Utility Methods:
```javascript
describe('User API Tests', () => {
  it('should create and retrieve a user', () => {
    const newUser = apiUtils.createTestUser('John Doe', 'QA Engineer');
    
    apiUtils.post('/users', newUser)
      .then((response) => {
        apiUtils.validateResponse(response, 201);
        expect(response.body.name).to.equal(newUser.name);
      });
  });
});
```

### Using JSON Schema Validation:
```javascript
describe('User API Tests', () => {
  it('should validate user response against schema', () => {
    cy.request('GET', 'https://reqres.in/api/users/1')
      .then((response) => {
        expect(response.status).to.equal(200);
        
        // Validate response against JSON schema
        cy.validateJsonSchema(response, 'single-user.json', 'User Response');
      });
  });
});
```

## JSON Schema Validation Examples

### Basic Schema Validation:
```javascript
// Validate API response against schema
cy.validateJsonSchema(response, 'user.json', 'User Response');
```

### Validate Specific Data:
```javascript
// Validate user data specifically
schemaValidator.validateData(
  response.body.data, 
  'user.json', 
  'User Data'
);
```

### Validate Multiple Items:
```javascript
// Validate each user in a list
response.body.data.forEach((user, index) => {
  schemaValidator.validateData(user, 'user.json', `User ${index + 1}`);
});
```

## Advantages of JSON Schema Validation

1. **Strict Type Checking**: Ensures data types match expected schema
2. **Format Validation**: Validates email, URI, date-time formats
3. **Required Field Validation**: Ensures all required fields are present
4. **Consistent Validation**: Same validation rules across all tests
5. **Clear Error Messages**: Detailed error messages for validation failures
6. **Reusable Schemas**: Schemas can be reused across multiple tests
7. **API Contract Testing**: Ensures API responses match expected contract
8. **Fixtures Integration**: Schemas stored in fixtures for easy management

## API Endpoints Used

The tests use the following ReqRes API endpoints:
- `GET /users` - Get list of users
- `GET /users/{id}` - Get single user
- `POST /users` - Create user
- `PUT /users/{id}` - Update user
- `DELETE /users/{id}` - Delete user
- `POST /login` - User login
- `POST /register` - User registration

## Best Practices

1. **Choose your approach**: Use custom commands for simple scenarios, utility methods for complex ones
2. **Use JSON schemas** for consistent response validation
3. **Store schemas in fixtures** for easy management and reuse
4. **Validate response structure** and data types
5. **Test error scenarios** (404, 400, etc.)
6. **Check response times** for performance
7. **Validate data formats** (emails, URLs, etc.)
8. **Use descriptive test names** that explain the scenario
9. **Group related tests** using `describe` blocks
10. **Create reusable schemas** for common response patterns
11. **Combine schema validation** with custom assertions for comprehensive testing

## Troubleshooting

- If tests fail due to network issues, increase the `requestTimeout` in `cypress.config.js`
- For slow APIs, adjust the `defaultCommandTimeout` setting
- Use `failOnStatusCode: false` when testing error responses
- The utility methods approach provides better error messages and debugging information
- JSON schema validation provides detailed error messages for validation failures
- Schemas stored in fixtures are automatically loaded by Cypress
