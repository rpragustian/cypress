# Troubleshooting: Blank HTML Reports in GitHub Actions

## Problem Description
You're experiencing blank or empty HTML reports when downloading artifacts from GitHub Actions, even though the tests are running successfully.

## Root Causes and Solutions

### 1. **Corrupted JSON Files**
**Problem**: The `output.json` file becomes corrupted during the merge process.

**Solution**: The updated workflow now includes:
- Clean previous reports before running tests
- Better error handling for JSON merging
- Verification steps to ensure files exist

### 2. **Missing Dependencies**
**Problem**: Mochawesome dependencies are not properly installed in CI environment.

**Solution**: Ensure these dependencies are installed:
```bash
npm install mochawesome mochawesome-merge mochawesome-report-generator --save-dev
```

### 3. **File Path Issues**
**Problem**: Reports are generated in wrong directories or with wrong names.

**Solution**: The workflow now:
- Creates the `mochawesome-report` directory explicitly
- Uses absolute paths for report generation
- Verifies file existence before processing

### 4. **Report Generation Timing**
**Problem**: HTML report generation fails due to timing issues.

**Solution**: The workflow now:
- Separates JSON merging and HTML generation into distinct steps
- Adds verification steps to confirm report generation
- Provides fallback for missing reports

## Debugging Steps

### 1. Check Workflow Logs
Look for these messages in your GitHub Actions logs:
```
✓ Reports saved: /path/to/mochawesome-report/mochawesome.json
✓ Reports saved: /path/to/mochawesome-report/mochawesome.html
```

### 2. Verify File Sizes
The HTML report should be at least 50KB. Check the artifact size:
```bash
# In workflow logs
echo "Report size: $(wc -c < mochawesome-report/report.html) bytes"
```

### 3. Check JSON Structure
Verify the `output.json` file is valid:
```bash
# In workflow logs
cat mochawesome-report/output.json | jq '.stats'
```

## Common Error Messages

### "Unexpected end of JSON input"
**Cause**: Corrupted JSON file
**Solution**: Clean previous reports before running tests

### "No JSON reports found"
**Cause**: Tests didn't generate JSON files
**Solution**: Check if tests are actually running and passing

### "HTML report not found"
**Cause**: Report generation failed
**Solution**: Check if `output.json` exists and is valid

## Manual Testing

To test locally and verify the issue:

```bash
# Clean previous reports
rm -rf mochawesome-report/

# Run tests
npm run cypress:run:reports

# Merge reports
npx mochawesome-merge mochawesome-report/*.json > mochawesome-report/output.json

# Generate HTML
npx marge mochawesome-report/output.json -f report -o mochawesome-report

# Verify
ls -la mochawesome-report/
```

## Expected File Structure

After successful execution, you should have:
```
mochawesome-report/
├── mochawesome.json
├── mochawesome.html
├── output.json
├── report.html
└── assets/
    ├── app.css
    ├── app.js
    └── (font files)
```

## Workflow Improvements

The updated workflow includes:

1. **Clean Environment**: Removes previous reports before running tests
2. **Error Handling**: Checks for file existence before processing
3. **Verification**: Confirms report generation was successful
4. **Fallback**: Creates empty report if no tests run
5. **Better Logging**: More detailed output for debugging

## If Problems Persist

1. **Check Cypress Configuration**: Ensure `cypress.config.js` has correct reporter settings
2. **Update Dependencies**: Make sure all reporting packages are up to date
3. **Test Locally**: Run the exact same commands locally to reproduce the issue
4. **Check Permissions**: Ensure the workflow has proper file system permissions

## Quick Fix Commands

If you need to manually fix a broken report:

```bash
# Remove corrupted files
rm -f mochawesome-report/output.json
rm -f mochawesome-report/report.html

# Regenerate from existing JSON files
npx mochawesome-merge mochawesome-report/*.json > mochawesome-report/output.json
npx marge mochawesome-report/output.json -f report -o mochawesome-report
```

## Support

If you continue to experience issues:
1. Check the GitHub Actions logs for specific error messages
2. Verify all dependencies are correctly installed
3. Test the workflow locally using GitHub Actions runner
4. Consider using alternative reporting tools if needed
