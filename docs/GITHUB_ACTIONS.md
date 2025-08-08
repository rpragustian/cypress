# GitHub Actions Setup for Cypress API Testing

This repository includes a comprehensive GitHub Actions workflow for automated API testing with Cypress using Mochawesome reports.

## 📋 Available Workflow

### **Cypress API Tests** (`.github/workflows/cypress-api-tests.yml`)
- **Trigger**: Push to `main`/`develop`, Pull Requests, Manual dispatch
- **Features**:
  - ✅ Mochawesome HTML reports
  - 📊 Test statistics and success rates
  - 💬 Automatic PR comments with results
  - 📁 Artifact uploads (reports, screenshots)
  - 🔔 Failure notifications
  - 🎯 Optimized for API testing (no videos)

## 🚀 How to Use

### Automatic Triggers
The workflow automatically runs on:
- **Push** to `main` or `develop` branches
- **Pull Requests** to `main` or `develop` branches
- **Manual dispatch** via GitHub Actions tab

### Manual Execution
1. Go to **Actions** tab in your repository
2. Select the **Cypress API Tests** workflow
3. Click **Run workflow**
4. Choose branch and click **Run workflow**

## 📊 Reports and Artifacts

### Mochawesome Reports
- **Location**: `mochawesome-report/report.html`
- **Features**:
  - Test execution summary
  - Pass/fail statistics
  - Test duration metrics
  - Code coverage (if configured)
  - **Optimized for API testing** (no videos/screenshots)

## 💬 PR Comments

### Success Comment Example:
```
## ✅ API Test Results

**Summary:**
- ✅ **Passed:** 12
- ❌ **Failed:** 0
- ⏭️ **Skipped:** 0
- 📊 **Success Rate:** 100%
- ⏱️ **Duration:** 4500ms

**Test Files:**
- `simple-api-example.cy.js` (4/4 passed)
- `json-schema-validation.cy.js` (8/8 passed)

📋 [View Full Report](https://github.com/user/repo/actions/runs/123)
```

### Failure Comment Example:
```
## ❌ API Tests Failed

Some API tests have failed. Please check the [test results](https://github.com/user/repo/actions/runs/123) for more details.

**Next Steps:**
1. Review the test failures
2. Check if the API endpoints are working correctly
3. Verify the test data and schemas
4. Re-run the tests after fixes
```

## 🔧 Configuration

### Environment Variables
The workflow uses the following environment setup:
- **Node.js**: 18.x
- **Cypress**: Latest version
- **Cache**: npm dependencies

### Dependencies
The workflow automatically installs:
- `cypress`
- `mochawesome` (for HTML reports)
- `mochawesome-merge` (for merging reports)
- `mochawesome-report-generator` (for report generation)

### API Testing Optimizations
- **Videos Disabled**: No video recording for faster execution
- **Screenshots Disabled**: No screenshot capture for API tests
- **Faster Execution**: Reduced storage and processing overhead
- **Focused Reports**: Clean, API-focused test results

## 📁 Artifacts

### Available Artifacts
1. **cypress-results-{run_number}**
   - Contains: reports, screenshots
   - Retention: 90 days
   - **Note**: No videos (optimized for API testing)

2. **cypress-html-report-{run_number}**
   - Contains: Mochawesome HTML report
   - Retention: 90 days

## 🛠️ Local Development

### Running Tests Locally
```bash
# Install dependencies
npm install

# Run tests with Mochawesome reports
npm run cypress:run:reports

# Generate reports
npm run generate:reports
```

### Viewing Reports Locally
```bash
# Open Mochawesome report
open mochawesome-report/report.html
```

## 🔍 Troubleshooting

### Common Issues

1. **Tests failing in CI but passing locally**
   - Check API endpoint availability
   - Verify environment variables
   - Review timeout settings

2. **Report generation failing**
   - Ensure all dependencies are installed
   - Check file permissions
   - Verify output directory exists

3. **Artifacts not uploading**
   - Check GitHub Actions storage limits
   - Verify file paths are correct
   - Ensure workflow has proper permissions

### Debug Steps
1. Check the **Actions** tab for detailed logs
2. Download artifacts to inspect test results
3. Review PR comments for test summaries
4. Check Cypress configuration in `cypress.config.js`

## 📈 Monitoring and Metrics

### Key Metrics Tracked
- **Test Execution Time**: Total duration of test suite
- **Success Rate**: Percentage of passing tests
- **Failure Analysis**: Detailed breakdown of failures
- **Test Coverage**: Number of API endpoints tested

### Performance Optimization
- **Parallel Execution**: Tests run in parallel when possible
- **Caching**: npm dependencies are cached
- **Artifact Management**: Automatic cleanup of old artifacts
- **API-Focused**: No video/screenshot overhead

## 🔐 Security Considerations

### Best Practices
- ✅ No sensitive data in logs
- ✅ Secure environment variable handling
- ✅ Limited artifact retention
- ✅ Proper access controls

### Environment Variables
If you need to add sensitive data:
1. Go to repository **Settings** → **Secrets and variables** → **Actions**
2. Add secrets for API keys, tokens, etc.
3. Reference in workflows using `${{ secrets.SECRET_NAME }}`

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Cypress CI/CD Guide](https://docs.cypress.io/guides/continuous-integration/introduction)
- [Mochawesome Documentation](https://github.com/adamgruber/mochawesome)

---

**Last Updated**: $(date)
**Version**: 1.0.0
