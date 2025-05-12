import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    'app-modules': './greenova/static/ts/src/modules/app-modules.ts',
    'error-handler': './greenova/static/ts/src/modules/error-handler.ts',
    foldable: './greenova/static/ts/src/modules/foldable.ts',
    'theme-manager': './greenova/static/ts/src/modules/theme-manager.ts',
    helper: './greenova/static/ts/src/utils/helper.ts',
    'wasm-loader': './greenova/static/ts/src/utils/wasm-loader.ts',
    landing: './greenova/static/ts/src/pages/landing.ts',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@modules': resolve(__dirname, 'greenova/static/ts/src/modules'),
      '@utils': resolve(__dirname, 'greenova/static/ts/src/utils'),
      '@pages': resolve(__dirname, 'greenova/static/ts/src/pages'),
    },
  },
  output: {
    filename: '[name].bundle.js',
    path: resolve(__dirname, 'greenova/static/ts/dist'),
    library: ['Greenova', '[name]'],
    libraryTarget: 'umd',
    clean: true,
  },
  devtool: 'source-map',
};
