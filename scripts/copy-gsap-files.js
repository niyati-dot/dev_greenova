/**
 * Script to copy GSAP files from node_modules to the static directory
 * This ensures that GSAP is available locally instead of via CDN
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Define source and destination directories
const gsapSourceDir = path.join(rootDir, 'node_modules', 'gsap', 'dist');
const gsapDestDir = path.join(
  rootDir,
  'greenova',
  'static',
  'js',
  'vendors',
  'gsap'
);

// Ensure destination directory exists
if (!fs.existsSync(gsapDestDir)) {
  fs.mkdirSync(gsapDestDir, { recursive: true });
  console.log(`Created directory: ${gsapDestDir}`);
}

// Files to copy
const filesToCopy = [
  'gsap.min.js',
  'ScrollTrigger.min.js',
  'ScrollSmoother.min.js',
  'Flip.min.js',
];

// Copy each file
filesToCopy.forEach((file) => {
  const sourcePath = path.join(gsapSourceDir, file);
  const destPath = path.join(gsapDestDir, file);

  try {
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`✅ Copied ${file} to ${gsapDestDir}`);
    } else {
      console.error(`❌ Source file not found: ${sourcePath}`);
    }
  } catch (error) {
    console.error(`❌ Error copying ${file}: ${error.message}`);
  }
});

console.log('GSAP files copying process complete.');
