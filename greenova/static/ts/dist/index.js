/**
 * Greenova Application TypeScript Entry Point
 *
 * This file serves as the main coordination point between:
 * 1. JavaScript modules that have been migrated to TypeScript
 * 2. The AssemblyScript WASM module for performance-critical operations
 * 3. The DOM and browser environment
 */
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import { initializeWasmModule } from './utils/wasm-loader';
import { AppModules } from './modules/app-modules';
import { ErrorHandler } from './modules/error-handler';
import { Foldable } from './modules/foldable';
import { ThemeManager } from './modules/theme-manager';
/**
 * Initialize the application when WASM is ready
 */
function initializeApp() {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      // Load WASM module first for critical operations
      const wasmModule = yield initializeWasmModule();
      // Create the main application object
      const app = {
        core: {
          init: () => {
            console.log('Greenova application initialized');
            // Initialize all modules
            Object.keys(app.modules).forEach((module) => {
              var _a;
              if (
                module !== 'core' &&
                typeof ((_a = app.modules[module]) === null || _a === void 0
                  ? void 0
                  : _a.init) === 'function'
              ) {
                try {
                  app.modules[module].init();
                } catch (err) {
                  app.errorHandler.reportError(
                    `Error initializing module ${module}:`,
                    err
                  );
                }
              }
            });
            // Set up global event listeners
            document.addEventListener('htmx:afterSettle', () => {
              // Re-initialize modules on htmx content changes
              app.foldable.init();
            });
          },
          loadStylesheet: (href, id) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            if (id) {
              link.id = id;
            }
            document.head.appendChild(link);
          },
        },
        modules: new AppModules(),
        errorHandler: new ErrorHandler(wasmModule),
        foldable: new Foldable(wasmModule),
        theme: new ThemeManager(wasmModule),
      };
      // Initialize the error handler first
      app.errorHandler.init();
      // Initialize theme early to prevent flash
      app.theme.init();
      // Export the app to global scope
      window.GreenovaApp = app;
      // Initialize the core application
      app.core.init();
      return app;
    } catch (err) {
      console.error('Failed to initialize application:', err);
      // Fallback to traditional JS if WASM fails
      const legacyScripts = [
        '/static/js/modules/error-handler.js',
        '/static/js/modules/theme-init.js',
        '/static/js/modules/foldable.js',
        '/static/js/app.js',
      ];
      // Load the legacy JavaScript as fallback
      legacyScripts.forEach((script) => {
        const scriptEl = document.createElement('script');
        scriptEl.src = script;
        document.body.appendChild(scriptEl);
      });
    }
  });
}
// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initializeApp().catch((err) => {
    console.error('Critical application initialization error:', err);
  });
});
/**
 * Entry point for Greenova TypeScript modules
 */
export { initializeWasmModule } from './utils/wasm-loader';
export { ThemeManager } from './modules/theme-manager';
//# sourceMappingURL=index.js.map
