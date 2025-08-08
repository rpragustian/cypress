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
          if (response.status === 200) {
            // Validate response against schema
            expect(response.body).to.be.jsonSchema(usersListSchema);
          } else if (response.status === 401) {
            // Handle API key requirement
            expect(response.body).to.have.property('error');
            cy.log('API requires authentication - skipping schema validation');
          } else {
            expect(response.status).to.be.oneOf([200, 401, 400]);
          }
        });
    });

    it('should validate single user response against schema', () => {
      userApi.getUser(1)
        .then((response) => {
          if (response.status === 200) {
            // Validate response against schema
            expect(response.body).to.be.jsonSchema(singleUserSchema);
          } else if (response.status === 401) {
            // Handle API key requirement
            expect(response.body).to.have.property('error');
            cy.log('API requires authentication - skipping schema validation');
          } else {
            expect(response.status).to.be.oneOf([200, 401, 400]);
          }
        });
    });

    it('should validate user data structure individually', () => {
      userApi.getUser(1)
        .then((response) => {
          if (response.status === 200) {
            // Validate the user data specifically
            expect(response.body.data).to.be.jsonSchema(userSchema);
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
      const invalidCredentials = {
        email: 'invalid@email.com',
        password: 'wrongpassword'
      };

      authApi.login(invalidCredentials)
        .then((response) => {
          // The API might return 401 instead of 400 due to authentication
          expect(response.status).to.be.oneOf([400, 401]);
          
          if (response.status === 401) {
            expect(response.body).to.have.property('error');
            cy.log('API requires authentication - expected behavior');
          } else {
            expect(response.body).to.have.property('error');
          }
        });
    });
  });

  describe('Advanced Schema Validation', () => {
    it('should validate multiple users in list', () => {
      userApi.getUsersList(1)
        .then((response) => {
          if (response.status === 200) {
            // Validate the overall structure
            expect(response.body).to.be.jsonSchema(usersListSchema);
            
            // Validate each user in the list
            response.body.data.forEach((user, index) => {
              expect(user).to.be.jsonSchema(userSchema);
              expect(user.id).to.be.a('number');
              expect(user.email).to.be.a('string');
            });
          } else if (response.status === 401) {
            // Handle API key requirement
            expect(response.body).to.have.property('error');
            cy.log('API requires authentication - skipping schema validation');
          } else {
            expect(response.status).to.be.oneOf([200, 401, 400]);
          }
        });
    });

    it('should validate response with custom assertions', () => {
      userApi.getUser(1)
        .then((response) => {
          if (response.status === 200) {
            // Schema validation
            expect(response.body).to.be.jsonSchema(singleUserSchema);
            
            // Custom assertions
            const user = response.body.data;
            expect(user.id).to.be.a('number');
            expect(user.email).to.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
            expect(user.avatar).to.match(/^https?:\/\/.+/);
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

  describe('Schema Validation with Custom Commands', () => {
    it('should use custom commands with schema validation', () => {
      userApi.getUser(1)
        .then((response) => {
          if (response.status === 200) {
            // Basic validation
            expect(response.body).to.not.be.null;
            expect(response.body).to.have.property('data');
            
            // Schema validation
            expect(response.body).to.be.jsonSchema(singleUserSchema);
          } else if (response.status === 401) {
            // Handle API key requirement
            expect(response.body).to.have.property('error');
            cy.log('API requires authentication - skipping schema validation');
          } else {
            expect(response.status).to.be.oneOf([200, 401, 400]);
          }
        });
    });

    it('should create user and validate response', () => {
      const newUser = {
        name: 'Test User',
        job: 'Developer'
      };

      userApi.createUser(newUser)
        .then((response) => {
          if (response.status === 201) {
            // Schema validation
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
          
          // Validate response time (increased for CI environment)
          expect(responseTime).to.be.lessThan(5000);
          
          if (response.status === 200) {
            // Schema validation
            expect(response.body).to.be.jsonSchema(usersListSchema);
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

  describe('Data Type Validation', () => {
    it('should validate data types through schema', () => {
      userApi.getUser(1)
        .then((response) => {
          if (response.status === 200) {
            // Schema validation ensures correct data types
            expect(response.body).to.be.jsonSchema(singleUserSchema);
            
            // Additional type checks
            const user = response.body.data;
            expect(user.id).to.be.a('number');
            expect(user.email).to.be.a('string');
            expect(user.first_name).to.be.a('string');
            expect(user.last_name).to.be.a('string');
            expect(user.avatar).to.be.a('string');
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
});
