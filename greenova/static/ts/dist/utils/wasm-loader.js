/**
 * WebAssembly Module Loader
 *
 * This utility handles loading and initializing the AssemblyScript WASM module
 * and provides a typed interface for interacting with it.
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
/**
 * Implementation of a fallback module when WASM is not available
 */
class FallbackWasmModule {
  constructor() {
    this.THEME_LIGHT = 0;
    this.THEME_DARK = 1;
    this.THEME_AUTO = 2;
    this.ERROR_NONE = 0;
    this.ERROR_GENERAL = 1;
    this.ERROR_THEME = 2;
    this.ERROR_ANIMATION = 3;
    this.memory = new WebAssembly.Memory({ initial: 1 });
  }
  getTheme() {
    return 0;
  }
  setTheme() {
    /* no-op */
  }
  resolveTheme(systemPrefersDark) {
    return systemPrefersDark ? 1 : 0;
  }
  getLastErrorCode() {
    return 0;
  }
  getLastErrorDetails() {
    return 0;
  }
  recordError() {
    /* no-op */
  }
  clearError() {
    /* no-op */
  }
  linearEasing(current, duration) {
    return current / duration;
  }
  easeInOutEasing(current, duration) {
    return current / duration;
  }
  calculateAnimationHeight() {
    return 0;
  }
}
/**
 * Initialize the WebAssembly module with proper fallback
 */
export function initializeWasmModule() {
  return __awaiter(this, void 0, void 0, function* () {
    if (!isWasmSupported()) {
      console.warn('WebAssembly is not supported, using fallback module');
      return new FallbackWasmModule();
    }
    try {
      const wasmPath = new URL(
        '/static/as/build/optimized.wasm',
        window.location.origin
      ).href;
      const response = yield fetchWithRetry(wasmPath);
      if (!response.ok) {
        throw new Error(`Failed to fetch WASM module: ${response.statusText}`);
      }
      const buffer = yield response.arrayBuffer();
      if (!buffer) {
        throw new Error('Empty WASM buffer received');
      }
      const memory = new WebAssembly.Memory({
        initial: 2,
        maximum: 10,
      });
      const { instance } = yield WebAssembly.instantiate(buffer, {
        env: {
          memory,
          abort: (message, fileName, lineNumber, columnNumber) => {
            console.error('WASM module aborted:', {
              message,
              fileName,
              lineNumber,
              columnNumber,
            });
            throw new Error('WASM module aborted');
          },
        },
      });
      if (
        !(instance === null || instance === void 0 ? void 0 : instance.exports)
      ) {
        throw new Error('WASM instance exports not found');
      }
      return instance.exports;
    } catch (error) {
      console.error('WASM initialization failed:', error);
      console.warn('Falling back to JavaScript implementation');
      return new FallbackWasmModule();
    }
  });
}
/**
 * Fetch with retry logic
 */
function fetchWithRetry(url_1) {
  return __awaiter(
    this,
    arguments,
    void 0,
    function* (url, retries = 3, backoff = 1000) {
      let lastError;
      for (let i = 0; i < retries; i++) {
        try {
          return yield fetch(url);
        } catch (error) {
          lastError = error;
          if (i === retries - 1) break;
          yield new Promise((resolve) =>
            setTimeout(resolve, backoff * (i + 1))
          );
        }
      }
      throw lastError || new Error('Failed to fetch after retries');
    }
  );
}
/**
 * Check if WebAssembly is supported in the current browser
 */
function isWasmSupported() {
  try {
    if (typeof WebAssembly !== 'object') return false;
    // Check if required WebAssembly functions exist and are callable
    if (typeof WebAssembly.instantiate !== 'function') return false;
    if (typeof WebAssembly.Memory !== 'function') return false;
    if (typeof WebAssembly.compile !== 'function') return false;
    if (typeof WebAssembly.Instance !== 'function') return false;
    return true;
  } catch (_a) {
    return false;
  }
}
//# sourceMappingURL=wasm-loader.js.map
