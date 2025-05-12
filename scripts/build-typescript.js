import { exec } from 'child_process';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Copy WASM files to the static directory
function copyWasmFiles() {
  const sourceDir = path.resolve(__dirname, '../greenova/static/as/build');
  const destDir = path.resolve(__dirname, '../greenova/static/dist/wasm');

  // Ensure destination directory exists
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  // Copy optimized and debug WASM files
  ['optimized.wasm', 'debug.wasm'].forEach((file) => {
    const sourcePath = path.join(sourceDir, file);
    const destPath = path.join(destDir, file);
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`Copied ${file} to ${destDir}`);
    }
  });
}

// Run TypeScript compilation
const projectPath = path.resolve(
  __dirname,
  '../greenova/static/ts/tsconfig.json'
);
console.log(`Using TypeScript config at: ${projectPath}`);

exec(
  `npx tsc --project "${projectPath}" --pretty`,
  {
    cwd: __dirname,
  },
  (error, stdout, stderr) => {
    if (stdout) {
      console.log(`Compiler output: ${stdout}`);
    }

    if (stderr) {
      console.error(`Stderr: ${stderr}`);
    }

    if (error) {
      console.error(`Error: ${error.message}`);
      console.error('TypeScript compilation failed. Check the errors above.');
      process.exit(1);
    } else {
      console.log('TypeScript compilation completed successfully.');
      // After successful TypeScript compilation, copy WASM files
      copyWasmFiles();
    }
  }
);
