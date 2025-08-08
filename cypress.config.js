const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://reqres.in/api/",
    // Configure for API testing
    experimentalModifyObstructiveThirdPartyCode: true,
    // Increase timeout for API calls
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    // Configure for CI/CD - Disable videos for API testing
    video: false,
    screenshotOnRunFailure: false, // Also disable screenshots for API testing
    trashAssetsBeforeRuns: true,
    // Mochawesome configuration - optimized for CI
    reporter: 'mochawesome',
    reporterOptions: {
      mochawesome: {
        outputDir: 'mochawesome-report',
        overwrite: false,
        html: false,
        json: true,
        reportTitle: 'Cypress API Testing Report',
        reportPageTitle: 'API Test Results',
        embeddedScreenshots: false, // Disable embedded screenshots for API testing
        inlineAssets: true,
        saveAllAttempts: false,
        code: true,
        charts: true,
        quiet: false,
        displayDuration: true,
        duration: true,
        timestamp: true,
        // Additional settings for better CI compatibility
        reportFilename: 'mochawesome',
        saveHtml: true,
        saveJson: true,
        consoleReporter: 'spec',
        useInlineDiffs: false
      }
    }
  },
  // Configure for API testing
  env: {
    apiBaseUrl: "https://reqres.in/api",
  },
  // Additional CI-specific settings
  retries: {
    runMode: 0, // No retries in CI
    openMode: 0
  },
  // Ensure proper file handling in CI
  trashAssetsBeforeRuns: true,
  // Disable video recording for faster execution
  video: false,
  // Disable screenshots for API testing
  screenshotOnRunFailure: false
});
