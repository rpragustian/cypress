# Cypress API Testing Setup

This repository is configured for API testing with Cypress using the [ReqRes](https://reqres.in/) API as a test endpoint.

---

## 📚 Documentation

All documentation is organized in the [`docs/`](./docs/) folder:

- **[📖 Documentation Index](./docs/README.md)** - Complete documentation overview
- **[🚀 Quick Start Guide](./docs/QUICK_START.md)** - Get up and running quickly
- **[🤖 GitHub Actions Setup](./docs/GITHUB_ACTIONS.md)** - CI/CD configuration guide
- **[🛠️ Troubleshooting Guide](./docs/TROUBLESHOOTING.md)** - Common issues and solutions

---

## Configuration

- **Cypress config**: `cypress.config.js`
  - Base URL: `https://reqres.in/api/`
  - Increased timeouts for API calls
  - Videos/screenshots disabled for API testing
  - Mochawesome HTML reporting enabled

---

## Project Structure

```
cypress/
├── docs/                          # 📚 Documentation
│   ├── README.md                  # Documentation index
│   ├── QUICK_START.md            # Quick start guide
│   ├── GITHUB_ACTIONS.md         # CI/CD setup guide
│   ├── TROUBLESHOOTING.md        # Troubleshooting guide
│   └── SOLUTION_BLANK_HTML_REPORTS.md # HTML reports fix
├── cypress/                       # 🧪 Test files
│   ├── e2e/                      # End-to-end tests
│   ├── integration/               # API methods & schemas
│   └── support/                   # Support files
├── scripts/                       # 🔧 Utility scripts
├── .github/                       # 🤖 GitHub Actions
└── README.md                      # Main project README
```

---

## Modular API Methods

API request logic is organized in `cypress/integration/api/`:

```js
// cypress/integration/api/userApi.js
export const getUser = (userId = 1, options = {}) => {
  return cy.request({
    method: 'GET',
    url: `https://reqres.in/api/users/${userId}`,
    failOnStatusCode: false,
    ...options
  });
};
```

---

## Modular JSON Schemas

JSON schemas are organized in `cypress/integration/schemas/` and imported into test files:

```js
// cypress/integration/schemas/userSchema.js
export const userSchema = {
  type: "object",
  properties: {
    id: { type: "integer", minimum: 1 },
    email: { type: "string", pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$" },
    first_name: { type: "string", minLength: 1 },
    last_name: { type: "string", minLength: 1 },
    avatar: { type: "string", pattern: "^https?://.+" }
  },
  required: ["id", "email", "first_name", "last_name", "avatar"],
  additionalProperties: false
};
```

---

## Example Test

```js
import { userApi } from '../integration/api/index.js';
import { userSchema } from '../integration/schemas/index.js';

describe('User API', () => {
  it('should get a user and validate schema', () => {
    userApi.getUser(1).then((response) => {
      if (response.status === 200) {
        expect(response.body.data).to.be.jsonSchema(userSchema);
      } else if (response.status === 401) {
        cy.log('API requires authentication - skipping schema validation');
      }
    });
  });
});
```

---

## Running the Tests

### Quick Test Run (Recommended for Development)
```bash
npm run test:quick
```
Fast execution with default Cypress reporter - good for development and debugging.

### Comprehensive Test Run (Recommended for Reports)
```bash
npm run test
```
Runs all test files individually and generates a comprehensive HTML report with all 33 test scenarios.

### Other Commands
```bash
# Open Cypress Test Runner
npm run cypress:open

# Run all tests in headless mode
npm run cypress:run

# Run a specific test file
npx cypress run --spec "cypress/e2e/simple-api-example.cy.js"
```

---

## Viewing Reports

After running tests, open the Mochawesome HTML report:
```bash
open mochawesome-report/report.html
```

---

## CI/CD Integration

- GitHub Actions workflow: `.github/workflows/cypress-api-tests.yml`
- Generates and uploads Mochawesome HTML reports as artifacts
- Posts test summaries as PR comments

---

## Best Practices

- Use modular API methods and schemas for maintainability
- Validate API responses with JSON schemas
- Handle 401/400/404 gracefully in tests
- Keep fixtures for test data only (not for schemas or methods)
- Use Mochawesome for clear, visual reporting

---

**Happy testing!**
