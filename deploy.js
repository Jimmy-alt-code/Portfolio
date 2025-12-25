#!/usr/bin/env node

/**
 * Deployment script to build and push to gh-pages branch
 * This script builds the Next.js static export and pushes it to the gh-pages branch
 * Cross-platform compatible (Windows, Mac, Linux)
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Cross-platform directory removal
function removeDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach((file) => {
      const curPath = path.join(dirPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        removeDir(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dirPath);
  }
}

// Cross-platform directory copy
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('🚀 Starting deployment to gh-pages branch...\n');

try {
  // Step 1: Build the project
  console.log('📦 Building project...');
  execSync('npm run build', { 
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });

  // Step 2: Check if out directory exists
  const outDir = path.join(process.cwd(), 'out');
  if (!fs.existsSync(outDir)) {
    throw new Error('Build failed: out directory not found');
  }

  console.log('✅ Build completed successfully\n');

  // Step 3: Create a temporary directory for gh-pages
  const tempDir = path.join(process.cwd(), '.deploy-temp');
  
  // Clean up temp directory if it exists
  if (fs.existsSync(tempDir)) {
    console.log('🧹 Cleaning up previous deployment temp directory...');
    removeDir(tempDir);
  }

  // Step 4: Initialize gh-pages branch
  console.log('🌿 Setting up gh-pages branch...');
  const remoteUrl = execSync('git config --get remote.origin.url', { encoding: 'utf-8', shell: true }).trim();
  
  // Always create fresh deployment directory
  console.log('📝 Initializing deployment repository...');
  fs.mkdirSync(tempDir, { recursive: true });
  execSync('git init', { cwd: tempDir, stdio: 'inherit', shell: true });
  execSync('git checkout -b gh-pages', { cwd: tempDir, stdio: 'inherit', shell: true });
  
  // Check if remote already exists before adding
  try {
    execSync('git remote get-url origin', { cwd: tempDir, stdio: 'pipe', shell: true });
  } catch (e) {
    execSync(`git remote add origin "${remoteUrl}"`, { cwd: tempDir, stdio: 'inherit', shell: true });
  }

  // Step 5: Copy build output to temp directory
  console.log('📋 Copying build files...');
  
  // Remove all files except .git
  const files = fs.readdirSync(tempDir);
  files.forEach(file => {
    if (file !== '.git') {
      const filePath = path.join(tempDir, file);
      if (fs.statSync(filePath).isDirectory()) {
        removeDir(filePath);
      } else {
        fs.unlinkSync(filePath);
      }
    }
  });

  // Copy all files from out to temp
  const outFiles = fs.readdirSync(outDir);
  for (const file of outFiles) {
    const srcPath = path.join(outDir, file);
    const destPath = path.join(tempDir, file);
    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }

  // Add .nojekyll file to prevent Jekyll processing (important for Next.js static export)
  fs.writeFileSync(path.join(tempDir, '.nojekyll'), '');

  // Step 6: Commit and push
  console.log('💾 Committing changes...');
  execSync(`git add -A`, { cwd: tempDir, stdio: 'inherit', shell: true });
  
  const commitMessage = (process.argv[2] || `Deploy: ${new Date().toISOString()}`).replace(/"/g, '\\"');
  try {
    execSync(`git commit -m "${commitMessage}"`, { cwd: tempDir, stdio: 'inherit', shell: true });
  } catch (e) {
    // Check if there are any changes to commit
    const status = execSync(`git status --porcelain`, { cwd: tempDir, encoding: 'utf-8', shell: true }).trim();
    if (status.length === 0) {
      console.log('⚠️  No changes to commit (files are up to date)');
    } else {
      throw e;
    }
  }

  console.log('🚀 Pushing to gh-pages branch...');
  execSync(`git push origin gh-pages --force`, { cwd: tempDir, stdio: 'inherit', shell: true });

  // Step 7: Clean up
  console.log('🧹 Cleaning up...');
  removeDir(tempDir);

  console.log('\n✅ Deployment completed successfully!');
  console.log('🌐 Your site should be live at: https://<username>.github.io/Portfolio/');
  console.log('\n📝 Note: Make sure GitHub Pages is configured to deploy from the gh-pages branch in your repository settings.');

} catch (error) {
  console.error('\n❌ Deployment failed:', error.message);
  process.exit(1);
}
