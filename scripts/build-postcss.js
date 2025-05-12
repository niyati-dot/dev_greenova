// Enhanced PostCSS build script for Greenova
// Processes CSS and splits into critical and secondary stylesheets
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';
import postcssPresentEnv from 'postcss-preset-env';
import postcssImport from 'postcss-import';
import postcssNested from 'postcss-nested';
import postcssCombineDuplicatedSelectors from 'postcss-combine-duplicated-selectors';
import postcssSortMediaQueries from 'postcss-sort-media-queries';
import postcssFontMagician from 'postcss-font-magician';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

// ES Module compatible __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration
const config = {
  inputFile: path.resolve(
    __dirname,
    '../greenova/theme/static_src/src/styles.css'
  ),
  outputDir: path.resolve(__dirname, '../greenova/static/css/dist'),
  criticalOutputFile: 'critical-secondary-styles.css',
  secondaryOutputFile: 'secondary-styles.css',
  tailwindConfigPath: path.resolve(
    __dirname,
    '../greenova/theme/static_src/tailwind.config.js'
  ),
  sourceMap: process.env.NODE_ENV === 'development',
};

// Create output directory if it doesn't exist
if (!fs.existsSync(config.outputDir)) {
  fs.mkdirSync(config.outputDir, { recursive: true });
}

// Log the process start
console.log('Building CSS with PostCSS...');
console.log(`Input: ${config.inputFile}`);
console.log(`Output directory: ${config.outputDir}`);

// Removed postcss-critical-split and replaced with custom critical CSS extraction logic
const extractCriticalCSS = (css) => {
  const criticalCSS = [];
  const nonCriticalCSS = [];

  css.walkRules((rule) => {
    if (rule.toString().includes('/* critical:start */')) {
      criticalCSS.push(rule);
    } else {
      nonCriticalCSS.push(rule);
    }
  });

  return {
    critical: criticalCSS.map((rule) => rule.toString()).join('\n'),
    nonCritical: nonCriticalCSS.map((rule) => rule.toString()).join('\n'),
  };
};

// Read the input CSS file
try {
  const css = fs.readFileSync(config.inputFile, 'utf8');

  // Configure the CSS processor
  const processor = postcss([
    postcssImport,
    postcssFontMagician({
      protocol: 'https:',
      formats: 'woff2 woff',
      display: 'swap',
    }),
    postcssPresentEnv({
      stage: 1,
      features: {
        'nesting-rules': true,
        'custom-properties': true,
        'custom-media-queries': true,
        'media-query-ranges': true,
        'custom-selectors': true,
        'gap-properties': true,
        'focus-visible-pseudo-class': true,
        'focus-within-pseudo-class': true,
        'color-functional-notation': true,
      },
      autoprefixer: {
        grid: true,
      },
    }),
    postcssNested,
    tailwindcss(config.tailwindConfigPath),
    postcssCombineDuplicatedSelectors({
      removeDuplicatedProperties: true,
    }),
    postcssSortMediaQueries,
    autoprefixer,
    cssnano({
      preset: [
        'advanced',
        {
          discardComments: { removeAll: true },
          reduceIdents: false,
          zindex: false,
        },
      ],
    }),
  ]);

  // Process the CSS
  processor
    .process(css, {
      from: config.inputFile,
      to: path.join(config.outputDir, config.criticalOutputFile),
      map: config.sourceMap ? { inline: true } : false,
    })
    .then((result) => {
      const { critical, nonCritical } = extractCriticalCSS(result.root);

      fs.writeFileSync(
        path.join(config.outputDir, config.criticalOutputFile),
        critical
      );
      fs.writeFileSync(
        path.join(config.outputDir, config.secondaryOutputFile),
        nonCritical
      );

      console.log('✓ Critical and non-critical CSS extracted successfully.');
    })
    .catch((error) => {
      console.error('Error processing CSS:', error);
      process.exit(1);
    });
} catch (err) {
  console.error('Error reading input file:', err);
  process.exit(1);
}
