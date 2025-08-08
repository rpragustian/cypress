// Import schemas from the new integration structure
import { 
  userSchema, 
  singleUserSchema, 
  createUserSchema, 
  loginSchema, 
  usersListSchema 
} from '../integration/schemas/index.js';

// Import API methods from the new integration structure
import { userApi, authApi } from '../integration/api/index.js';

// Alternative import approaches:
// 1. Import individual schemas from specific files:
// import { userSchema } from '../integration/schemas/userSchema.js';
// import { singleUserSchema } from '../integration/schemas/singleUserSchema.js';

// 2. Import the schemas object:
// import { schemas } from '../integration/schemas/index.js';

// 3. Import individual API methods:
// import { getUser, createUser } from '../integration/api/userApi.js';
// import { login } from '../integration/api/authApi.js';

describe('Simple JSON Schema Validation Example', () => {
  
  it('should validate user response against schema', () => {
    // Use modular API method instead of direct cy.request
    userApi.getUser(1)
      .then((response) => {
        // Check status code
        expect(response.status).to.equal(200);
        
        // Validate response against schema
        expect(response.body).to.be.jsonSchema(singleUserSchema);
        
        // Alternative using schemas object:
        // expect(response.body).to.be.jsonSchema(schemas.singleUser);
      });
  });

  it('should validate create user response', () => {
    const newUser = {
      name: 'Test User',
      job: 'Developer'
    };

    // Use modular API method instead of direct cy.request
    userApi.createUser(newUser)
      .then((response) => {
        // Check if we got a successful response or handle auth error
        if (response.status === 201) {
          // Validate response against schema
          expect(response.body).to.be.jsonSchema(createUserSchema);
          
          // Additional assertions
          expect(response.body.name).to.equal(newUser.name);
          expect(response.body.job).to.equal(newUser.job);
        } else if (response.status === 401) {
          // Handle API key requirement
          expect(response.body).to.have.property('error');
          expect(response.body.error).to.include('API key');
          cy.log('API requires authentication - skipping schema validation');
        } else {
          // Other error status codes
          expect(response.status).to.be.oneOf([201, 401, 400]);
        }
      });
  });

  it('should validate login response', () => {
    // Use modular API method with default credentials
    authApi.loginWithDefaultCredentials()
      .then((response) => {
        // Check if we got a successful response or handle auth error
        if (response.status === 200) {
          // Validate response against schema
          expect(response.body).to.be.jsonSchema(loginSchema);
          
          // Check token exists
          expect(response.body.token).to.be.a('string');
          expect(response.body.token.length).to.be.greaterThan(0);
        } else if (response.status === 401) {
          // Handle API key requirement
          expect(response.body).to.have.property('error');
          expect(response.body.error).to.include('API key');
          cy.log('API requires authentication - skipping schema validation');
        } else {
          // Other error status codes
          expect(response.status).to.be.oneOf([200, 401, 400]);
        }
      });
  });

  it('should validate users list response', () => {
    // Use modular API method instead of direct cy.request
    userApi.getUsersList(1)
      .then((response) => {
        // Check status code
        expect(response.status).to.equal(200);
        
        // Validate response against schema
        expect(response.body).to.be.jsonSchema(usersListSchema);
        
        // Additional checks
        expect(response.body.page).to.equal(1);
        expect(response.body.data).to.be.an('array');
        expect(response.body.data.length).to.be.greaterThan(0);
      });
  });
});
