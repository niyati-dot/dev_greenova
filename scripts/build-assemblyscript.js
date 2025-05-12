/**
 * AssemblyScript Build Script
 *
 * This script builds the AssemblyScript code in the project, generating
 * optimized and debug WebAssembly modules.
 */

import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

// Source and output paths
const SOURCE_DIR = path.resolve('greenova/static/as/assembly');
const OUTPUT_DIR = path.resolve('greenova/static/as/build');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Get the entry file
const entryFile = path.join(SOURCE_DIR, 'index.ts');

// Check if entry file exists
if (!fs.existsSync(entryFile)) {
  console.error(`Entry file not found: ${entryFile}`);
  process.exit(1);
}

// Path to AssemblyScript CLI
const ascPath = path.resolve('node_modules/.bin/asc');

// Build optimized version
exec(
  `${ascPath} ${entryFile} --outFile ${path.join(OUTPUT_DIR, 'optimized.wasm')} --textFile ${path.join(OUTPUT_DIR, 'optimized.wat')} --sourceMap --measure -O3 --shrinkLevel 2 --noAssert --initialMemory=1`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
    }
    console.log(`Stdout: ${stdout}`);
    console.log('Optimized build completed successfully.');

    // Build debug version
    exec(
      `${ascPath} ${entryFile} --outFile ${path.join(OUTPUT_DIR, 'debug.wasm')} --textFile ${path.join(OUTPUT_DIR, 'debug.wat')} --sourceMap --debug`,
      (debugError, debugStdout, debugStderr) => {
        if (debugError) {
          console.error(`Error: ${debugError.message}`);
          process.exit(1);
        }
        if (debugStderr) {
          console.error(`Stderr: ${debugStderr}`);
        }
        console.log(`Stdout: ${debugStdout}`);
        console.log('Debug build completed successfully.');
      }
    );
  }
);
