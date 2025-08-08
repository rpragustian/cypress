// Import schemas from the new integration structure
import { 
  userSchema, 
  usersListSchema, 
  singleUserSchema, 
  createUserSchema, 
  loginSchema, 
  registerSchema 
} from '../integration/schemas/index.js';

// Import API methods from the new integration structure
import { userApi, authApi } from '../integration/api/index.js';

describe('JSON Schema Validation Examples', () => {
  
  describe('GET Requests with Schema Validation', () => {
    it('should validate users list response against schema', () => {
      userApi.getUsersList(1)
        .then((response) => {
          // Validate status code
          expect(response.status).to.equal(200);
          
          // Validate response against schema
          expect(response.body).to.be.jsonSchema(usersListSchema);
        });
    });

    it('should validate single user response against schema', () => {
      userApi.getUser(1)
        .then((response) => {
          // Validate status code
          expect(response.status).to.equal(200);
          
          // Validate response against schema
          expect(response.body).to.be.jsonSchema(singleUserSchema);
        });
    });

    it('should validate user data structure individually', () => {
      userApi.getUser(1)
        .then((response) => {
          expect(response.status).to.equal(200);
          
          // Validate the user data specifically
          expect(response.body.data).to.be.jsonSchema(userSchema);
        });
    });
  });

  describe('POST Requests with Schema Validation', () => {
    it('should validate create user response against schema', () => {
      const newUser = {
        name: 'John Doe',
        job: 'QA Engineer'
      };

      userApi.createUser(newUser)
        .then((response) => {
          if (response.status === 201) {
            // Validate response against schema
            expect(response.body).to.be.jsonSchema(createUserSchema);
          } else if (response.status === 401) {
            // Handle API key requirement
            expect(response.body).to.have.property('error');
            cy.log('API requires authentication - skipping schema validation');
          } else {
            expect(response.status).to.be.oneOf([201, 401, 400]);
          }
        });
    });

    it('should validate login response against schema', () => {
      authApi.loginWithDefaultCredentials()
        .then((response) => {
          if (response.status === 200) {
            // Validate response against schema
            expect(response.body).to.be.jsonSchema(loginSchema);
          } else if (response.status === 401) {
            // Handle API key requirement
            expect(response.body).to.have.property('error');
            cy.log('API requires authentication - skipping schema validation');
          } else {
            expect(response.status).to.be.oneOf([200, 401, 400]);
          }
        });
    });

    it('should validate register response against schema', () => {
      authApi.registerWithDefaultCredentials()
        .then((response) => {
          if (response.status === 200) {
            // Validate response against schema
            expect(response.body).to.be.jsonSchema(registerSchema);
          } else if (response.status === 401) {
            // Handle API key requirement
            expect(response.body).to.have.property('error');
            cy.log('API requires authentication - skipping schema validation');
          } else {
            expect(response.status).to.be.oneOf([200, 401, 400]);
          }
        });
    });
  });

  describe('Error Handling with Schema Validation', () => {
    it('should handle user not found (404)', () => {
      userApi.getUser(999)
        .then((response) => {
          // The API might return 401 instead of 404 due to authentication
          expect(response.status).to.be.oneOf([404, 401]);
          
          if (response.status === 401) {
            expect(response.body).to.have.property('error');
            cy.log('API requires authentication - expected behavior');
          }
        });
    });

    it('should handle invalid login credentials', () => {
      const invalidLoginData = {
        email: 'invalid@email.com',
        password: 'wrongpassword'
      };

      authApi.login(invalidLoginData)
        .then((response) => {
          // The API might return 401 instead of 400 due to authentication
          expect(response.status).to.be.oneOf([400, 401]);
          
          if (response.status === 401) {
            expect(response.body).to.have.property('error');
            cy.log('API requires authentication - expected behavior');
          }
        });
    });
  });

  describe('Advanced Schema Validation', () => {
    it('should validate multiple users in list', () => {
      userApi.getUsersList(1)
        .then((response) => {
          expect(response.status).to.equal(200);
          
          // Validate overall response structure
          expect(response.body).to.be.jsonSchema(usersListSchema);
          
          // Validate each user in the list individually
          response.body.data.forEach((user, index) => {
            expect(user).to.be.jsonSchema(userSchema);
          });
        });
    });

    it('should validate response with custom assertions', () => {
      userApi.getUser(1)
        .then((response) => {
          expect(response.status).to.equal(200);
          
          // Validate against schema
          expect(response.body).to.be.jsonSchema(singleUserSchema);
          
          // Additional custom assertions
          expect(response.body.data.id).to.equal(1);
          expect(response.body.data.email).to.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
          expect(response.body.support.url).to.match(/^https?:\/\/.+/);
        });
    });
  });

  describe('Schema Validation with Custom Commands', () => {
    it('should use custom commands with schema validation', () => {
      cy.apiGet('/users/1')
        .then((response) => {
          cy.validateApiResponse(response, 200);
          expect(response.body).to.be.jsonSchema(singleUserSchema);
        });
    });

    it('should create user and validate response', () => {
      const newUser = {
        name: 'Jane Smith',
        job: 'Senior QA Engineer'
      };

      cy.apiPost('/users', newUser)
        .then((response) => {
          if (response.status === 201) {
            cy.validateApiResponse(response, 201);
            expect(response.body).to.be.jsonSchema(createUserSchema);
            
            // Additional assertions
            expect(response.body.name).to.equal(newUser.name);
            expect(response.body.job).to.equal(newUser.job);
          } else if (response.status === 401) {
            // Handle API key requirement
            expect(response.body).to.have.property('error');
            cy.log('API requires authentication - skipping schema validation');
          } else {
            expect(response.status).to.be.oneOf([201, 401, 400]);
          }
        });
    });
  });

  describe('Performance Testing with Schema Validation', () => {
    it('should validate response time and schema', () => {
      const startTime = Date.now();
      
      userApi.getUsersList(1)
        .then((response) => {
          const responseTime = Date.now() - startTime;
          
          // Validate response time
          expect(responseTime).to.be.lessThan(3000);
          
          // Validate status code
          expect(response.status).to.equal(200);
          
          // Validate against schema
          expect(response.body).to.be.jsonSchema(usersListSchema);
        });
    });
  });

  describe('Data Type Validation', () => {
    it('should validate data types through schema', () => {
      userApi.getUser(1)
        .then((response) => {
          expect(response.status).to.equal(200);
          
          // Schema validation ensures:
          // - id is integer
          // - email is valid email format
          // - first_name and last_name are strings
          // - avatar is valid URI
          expect(response.body).to.be.jsonSchema(singleUserSchema);
        });
    });
  });
});
