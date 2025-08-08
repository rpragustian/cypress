const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Generating comprehensive test report...\n');

// Clean up existing reports
if (fs.existsSync('mochawesome-report')) {
  fs.rmSync('mochawesome-report', { recursive: true, force: true });
}
fs.mkdirSync('mochawesome-report');

// Test files to run
const testFiles = [
  'cypress/e2e/api-testing.cy.js',
  'cypress/e2e/json-schema-validation.cy.js', 
  'cypress/e2e/simple-api-example.cy.js',
  'cypress/e2e/simple-schema-example.cy.js'
];

let totalTests = 0;
let totalPasses = 0;
let totalFailures = 0;

console.log('📋 Running all test files individually...\n');

// Run each test file separately
testFiles.forEach((testFile, index) => {
  console.log(`🔄 Running ${testFile} (${index + 1}/${testFiles.length})...`);
  
  try {
    // Run the test file
    execSync(`npx cypress run --spec "${testFile}" --reporter mochawesome`, { 
      stdio: 'inherit' 
    });
    
    // Rename the generated JSON file to avoid conflicts
    const oldPath = 'mochawesome-report/mochawesome.json';
    const newPath = `mochawesome-report/mochawesome-${index + 1}.json`;
    
    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath);
      
      // Read the JSON to get test counts
      const jsonData = JSON.parse(fs.readFileSync(newPath, 'utf8'));
      const stats = jsonData.stats;
      totalTests += stats.tests;
      totalPasses += stats.passes;
      totalFailures += stats.failures;
      
      console.log(`✅ ${testFile}: ${stats.tests} tests, ${stats.passes} passed, ${stats.failures} failed\n`);
    }
    
  } catch (error) {
    console.error(`❌ Error running ${testFile}:`, error.message);
  }
});

console.log('🔗 Merging all test results...');

// Merge all JSON files
try {
  execSync('npx mochawesome-merge mochawesome-report/mochawesome-*.json > mochawesome-report/output.json', { stdio: 'inherit' });
  
  // Generate final HTML report
  execSync('npx marge mochawesome-report/output.json -f report -o mochawesome-report', { stdio: 'inherit' });
  
  console.log('\n✅ Comprehensive test report generated successfully!');
  console.log('📊 Report location: mochawesome-report/report.html');
  
  // Display final summary
  console.log(`\n📈 Final Test Summary:`);
  console.log(`   Total Tests: ${totalTests}`);
  console.log(`   Passed: ${totalPasses}`);
  console.log(`   Failed: ${totalFailures}`);
  console.log(`   Success Rate: ${Math.round((totalPasses / totalTests) * 100)}%`);
  
} catch (error) {
  console.error('❌ Error generating final report:', error.message);
  process.exit(1);
}
