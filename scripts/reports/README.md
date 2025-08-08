# Report Generation Scripts

This folder contains scripts for generating comprehensive test reports.

## Files

### `generate-report.js`
**Main report generator** - Runs all test files individually and generates a comprehensive HTML report with all test scenarios.

**Usage:**
```bash
npm run test
# or
node scripts/reports/generate-report.js
```

**Features:**
- Runs all 4 test files individually
- Generates separate JSON reports for each file
- Merges all reports into a comprehensive HTML report
- Shows detailed test summary with statistics
- Includes test file breakdown

### `quick-test.js`
**Quick test runner** - Runs all tests with default Cypress reporter (no comprehensive report).

**Usage:**
```bash
npm run test:quick
# or
node scripts/reports/quick-test.js
```

**Features:**
- Fast execution
- Uses default Cypress reporter
- No report generation overhead
- Good for development and quick checks

## Test Files Covered

1. **api-testing.cy.js** - 12 scenarios
   - GET, POST, PUT, DELETE requests
   - Error handling
   - Response time testing
   - Data validation

2. **json-schema-validation.cy.js** - 14 scenarios
   - Schema validation for all endpoints
   - Advanced validation techniques
   - Custom commands with schema validation
   - Performance testing with schema validation

3. **simple-api-example.cy.js** - 3 scenarios
   - Basic API testing
   - User creation
   - Error handling

4. **simple-schema-example.cy.js** - 4 scenarios
   - Basic schema validation
   - User and authentication testing

**Total: 33 test scenarios**

## Output

- **Comprehensive Report**: `mochawesome-report/report.html`
- **JSON Data**: `mochawesome-report/output.json`
- **Individual Reports**: `mochawesome-report/mochawesome-*.json`
