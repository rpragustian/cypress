const { execSync } = require('child_process');

console.log('⚡ Quick Test Run\n');

try {
  console.log('🔄 Running all tests with Cypress...\n');
  
  // Run all tests with default reporter
  execSync('npx cypress run', { stdio: 'inherit' });
  
  console.log('\n✅ Quick test run completed!');
  console.log('💡 For comprehensive reports, run: npm run test');
  
} catch (error) {
  console.error('❌ Error running tests:', error.message);
  process.exit(1);
}
