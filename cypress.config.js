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
    // Mochawesome configuration
    reporter: 'mochawesome',
    reporterOptions: {
      mochawesome: {
        outputDir: 'mochawesome-report',
        overwrite: false,
        html: true,
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
        timestamp: true
      }
    }
  },
  // Configure for API testing
  env: {
    apiBaseUrl: "https://reqres.in/api",
  },
});
