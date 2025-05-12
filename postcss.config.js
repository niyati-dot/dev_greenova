/**
 * Greenova PostCSS Configuration
 *
 * This configuration processes CSS in stages:
 * 1. Imports and combines CSS files
 * 2. Processes modern CSS features
 * 3. Integrates PicoCSS (primary) and Tailwind CSS (secondary)
 * 4. Splits into critical and non-critical CSS
 * 5. Optimizes and minifies output
 */

module.exports = {
  plugins: [
    // Step 1: Import handling
    require('postcss-import'),

    // Step 2: Font loading and processing
    require('postcss-font-magician')({
      protocol: 'https:',
      formats: 'woff2 woff',
      display: 'swap',
    }),

    // Step 3: Modern CSS Features and Transformations
    require('postcss-preset-env')({
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

    // Step 4: Nesting support
    require('postcss-nested'),

    // Step 5: PicoCSS Integration (primary framework)
    require('@picocss/pico'),

    // Step 6: Tailwind CSS (secondary framework)
    require('@tailwindcss/postcss')({
      config: './greenova/theme/static_src/tailwind.config.js',
    }),

    // Step 7: Critical CSS splitting
    require('postcss-critical-split')({
      output: 'rest',
      startTag: '/* critical:start */',
      endTag: '/* critical:end */',
      blockTag: '/* critical */',
    }),

    // Step 8: Performance Optimizations
    require('postcss-combine-duplicated-selectors')({
      removeDuplicatedProperties: true,
    }),
    require('postcss-sort-media-queries'),

    // Step 9: Final optimizations
    require('autoprefixer'),
    require('cssnano')({
      preset: [
        'advanced',
        {
          discardComments: { removeAll: true },
          reduceIdents: false,
          zindex: false,
        },
      ],
    }),
  ],
};
