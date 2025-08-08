#!/usr/bin/env node

/**
 * Test script to verify report generation works correctly
 * Run this script to test the report generation process locally
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🧪 Testing Report Generation Process...\n');

// Step 1: Clean previous reports
console.log('1️⃣ Cleaning previous reports...');
try {
  if (fs.existsSync('mochawesome-report')) {
    fs.rmSync('mochawesome-report', { recursive: true, force: true });
  }
  fs.mkdirSync('mochawesome-report', { recursive: true });
  console.log('✅ Cleaned previous reports');
} catch (error) {
  console.error('❌ Failed to clean reports:', error.message);
  process.exit(1);
}

// Step 2: Run Cypress tests
console.log('\n2️⃣ Running Cypress tests...');
try {
  execSync('npm run cypress:run:reports', { stdio: 'inherit' });
  console.log('✅ Cypress tests completed');
} catch (error) {
  console.error('❌ Cypress tests failed:', error.message);
  process.exit(1);
}

// Step 3: Check if JSON files were generated
console.log('\n3️⃣ Checking generated JSON files...');
try {
  const jsonFiles = fs.readdirSync('mochawesome-report')
    .filter(file => file.endsWith('.json') && file !== 'output.json');
  
  if (jsonFiles.length === 0) {
    console.log('⚠️  No JSON files found, creating empty report...');
    const emptyReport = {
      stats: {
        suites: 0,
        tests: 0,
        passes: 0,
        pending: 0,
        failures: 0,
        testsRegistered: 0,
        passPercent: 0,
        pendingPercent: 0,
        other: 0,
        hasOther: false,
        skipped: 0,
        hasSkipped: false,
        start: new Date().toISOString(),
        end: new Date().toISOString(),
        duration: 0
      },
      results: [],
      meta: {
        mocha: { version: "7.2.0" },
        mochawesome: {
          options: {
            quiet: false,
            reportFilename: "mochawesome",
            saveHtml: true,
            saveJson: true,
            consoleReporter: "spec",
            useInlineDiffs: false,
            code: true
          },
          version: "7.1.3"
        },
        marge: {
          options: {
            mochawesome: {
              outputDir: "mochawesome-report",
              overwrite: false,
              html: false,
              json: true,
              reportTitle: "Cypress API Testing Report",
              reportPageTitle: "API Test Results",
              embeddedScreenshots: false,
              inlineAssets: true,
              saveAllAttempts: false,
              code: true,
              charts: true,
              quiet: false,
              displayDuration: true,
              duration: true,
              timestamp: true
            }
          },
          version: "6.2.0"
        }
      }
    };
    fs.writeFileSync('mochawesome-report/mochawesome.json', JSON.stringify(emptyReport, null, 2));
  } else {
    console.log(`✅ Found ${jsonFiles.length} JSON files:`, jsonFiles.join(', '));
  }
} catch (error) {
  console.error('❌ Failed to check JSON files:', error.message);
  process.exit(1);
}

// Step 4: Merge JSON reports
console.log('\n4️⃣ Merging JSON reports...');
try {
  execSync('npx mochawesome-merge mochawesome-report/*.json > mochawesome-report/output.json', { stdio: 'inherit' });
  console.log('✅ JSON reports merged');
} catch (error) {
  console.error('❌ Failed to merge JSON reports:', error.message);
  process.exit(1);
}

// Step 5: Generate HTML report
console.log('\n5️⃣ Generating HTML report...');
try {
  execSync('npx marge mochawesome-report/output.json -f report -o mochawesome-report --reportTitle "Cypress API Test Results"', { stdio: 'inherit' });
  console.log('✅ HTML report generated');
} catch (error) {
  console.error('❌ Failed to generate HTML report:', error.message);
  process.exit(1);
}

// Step 6: Verify final files
console.log('\n6️⃣ Verifying generated files...');
try {
  const files = fs.readdirSync('mochawesome-report');
  console.log('📁 Files in mochawesome-report:');
  files.forEach(file => {
    const filePath = path.join('mochawesome-report', file);
    const stats = fs.statSync(filePath);
    console.log(`   ${file} (${stats.size} bytes)`);
  });

  // Check if report.html exists and has content
  if (fs.existsSync('mochawesome-report/report.html')) {
    const reportSize = fs.statSync('mochawesome-report/report.html').size;
    console.log(`\n📊 HTML Report Size: ${reportSize} bytes`);
    
    if (reportSize > 1000) {
      console.log('✅ HTML report appears to be properly generated');
    } else {
      console.log('⚠️  HTML report seems too small, may be empty');
    }
  } else {
    console.log('❌ HTML report not found');
    process.exit(1);
  }

  // Check if assets directory exists
  if (fs.existsSync('mochawesome-report/assets')) {
    const assets = fs.readdirSync('mochawesome-report/assets');
    console.log(`\n📦 Assets directory contains ${assets.length} files`);
  } else {
    console.log('⚠️  Assets directory not found');
  }

} catch (error) {
  console.error('❌ Failed to verify files:', error.message);
  process.exit(1);
}

console.log('\n🎉 Report generation test completed successfully!');
console.log('\n📋 Next steps:');
console.log('   1. Open mochawesome-report/report.html in your browser');
console.log('   2. Check that the report displays correctly');
console.log('   3. Verify that all test results are shown');
console.log('   4. If everything looks good, the GitHub Actions workflow should work too');
