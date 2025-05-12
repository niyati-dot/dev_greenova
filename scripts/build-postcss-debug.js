// Debugging PostCSS pipeline
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import postcss from 'postcss';
import postcssImport from 'postcss-import';
import postcssNested from 'postcss-nested';
import postcssPresentEnv from 'postcss-preset-env';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config = {
  inputFile: path.resolve(
    __dirname,
    '../greenova/theme/static_src/src/styles.css'
  ),
  outputDir: path.resolve(__dirname, '../greenova/static/css/dist'),
  debugOutputFile: 'debug-styles.css',
  sourceMap: process.env.NODE_ENV === 'development',
};

if (!fs.existsSync(config.outputDir)) {
  fs.mkdirSync(config.outputDir, { recursive: true });
}

console.log('Debugging PostCSS pipeline...');
console.log(`Input: ${config.inputFile}`);
console.log(`Output directory: ${config.outputDir}`);

// Custom critical CSS extraction logic
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

try {
  const css = fs.readFileSync(config.inputFile, 'utf8');

  const processor = postcss([
    postcssImport,
    postcssNested,
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

  processor
    .process(css, {
      from: config.inputFile,
      to: path.join(config.outputDir, config.debugOutputFile),
      map: config.sourceMap ? { inline: true } : false,
    })
    .then((result) => {
      const { critical, nonCritical } = extractCriticalCSS(result.root);

      fs.writeFileSync(
        path.join(config.outputDir, 'critical-styles.css'),
        critical
      );
      fs.writeFileSync(
        path.join(config.outputDir, 'non-critical-styles.css'),
        nonCritical
      );

      console.log('✓ Critical and non-critical CSS extracted successfully.');
    })
    .catch((error) => {
      console.error('Error during PostCSS processing:', error);
      process.exit(1);
    });
} catch (err) {
  console.error('Error reading input file:', err);
  process.exit(1);
}
