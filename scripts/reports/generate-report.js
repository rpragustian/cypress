const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Cypress API Testing Report Generator\n');

// Configuration
const TEST_FILES = [
  'cypress/e2e/api-testing.cy.js',
  'cypress/e2e/json-schema-validation.cy.js', 
  'cypress/e2e/simple-api-example.cy.js',
  'cypress/e2e/simple-schema-example.cy.js'
];

const REPORT_DIR = 'mochawesome-report';

// Clean up existing reports
if (fs.existsSync(REPORT_DIR)) {
  fs.rmSync(REPORT_DIR, { recursive: true, force: true });
}
fs.mkdirSync(REPORT_DIR);

let totalTests = 0;
let totalPasses = 0;
let totalFailures = 0;
let totalDuration = 0;

console.log('📋 Running all test files individually...\n');

// Run each test file separately
TEST_FILES.forEach((testFile, index) => {
  console.log(`🔄 Running ${testFile} (${index + 1}/${TEST_FILES.length})...`);
  
  try {
    // Run the test file
    execSync(`npx cypress run --spec "${testFile}" --reporter mochawesome`, { 
      stdio: 'inherit' 
    });
    
    // Rename the generated JSON file to avoid conflicts
    const oldPath = `${REPORT_DIR}/mochawesome.json`;
    const newPath = `${REPORT_DIR}/mochawesome-${index + 1}.json`;
    
    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath);
      
      // Read the JSON to get test counts
      const jsonData = JSON.parse(fs.readFileSync(newPath, 'utf8'));
      const stats = jsonData.stats;
      totalTests += stats.tests;
      totalPasses += stats.passes;
      totalFailures += stats.failures;
      totalDuration += stats.duration;
      
      console.log(`✅ ${testFile}: ${stats.tests} tests, ${stats.passes} passed, ${stats.failures} failed\n`);
    }
    
  } catch (error) {
    console.error(`❌ Error running ${testFile}:`, error.message);
  }
});

console.log('🔗 Merging all test results...');

// Merge all JSON files
try {
  execSync(`npx mochawesome-merge ${REPORT_DIR}/mochawesome-*.json > ${REPORT_DIR}/output.json`, { stdio: 'inherit' });
  
  // Generate final HTML report
  execSync(`npx marge ${REPORT_DIR}/output.json -f report -o ${REPORT_DIR}`, { stdio: 'inherit' });
  
  console.log('\n✅ Comprehensive test report generated successfully!');
  console.log('📊 Report location: mochawesome-report/report.html');
  
  // Display final summary
  console.log(`\n📈 Final Test Summary:`);
  console.log(`   Total Tests: ${totalTests}`);
  console.log(`   Passed: ${totalPasses}`);
  console.log(`   Failed: ${totalFailures}`);
  console.log(`   Duration: ${Math.round(totalDuration / 1000)}s`);
  console.log(`   Success Rate: ${Math.round((totalPasses / totalTests) * 100)}%`);
  
  // Display test file breakdown
  console.log(`\n📁 Test Files:`);
  TEST_FILES.forEach((file, index) => {
    const jsonPath = `${REPORT_DIR}/mochawesome-${index + 1}.json`;
    if (fs.existsSync(jsonPath)) {
      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      const stats = data.stats;
      console.log(`   ${file}: ${stats.tests} tests`);
    }
  });
  
} catch (error) {
  console.error('❌ Error generating final report:', error.message);
  process.exit(1);
}
