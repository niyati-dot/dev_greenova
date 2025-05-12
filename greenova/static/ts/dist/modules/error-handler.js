/**
 * Greenova TypeScript Error Handler
 *
 * This module provides centralized error handling for TypeScript applications,
 * leveraging the AssemblyScript WASM module for critical error processing.
 */
/**
 * Error Handler class
 */
export class ErrorHandler {
  constructor(wasmModule) {
    this.wasmModule = wasmModule;
  }
  /**
   * Initialize the error handler
   */
  init() {
    this.setupGlobalHandlers();
  }
  /**
   * Setup global error handlers
   */
  setupGlobalHandlers() {
    // Global error handler to catch unhandled exceptions
    window.addEventListener('error', (event) => {
      var _a, _b;
      this.handleError({
        type: 'unhandled',
        message:
          ((_a = event.error) === null || _a === void 0
            ? void 0
            : _a.message) || 'Unknown error',
        source: event.filename || 'unknown',
        lineno: event.lineno,
        stack:
          (_b = event.error) === null || _b === void 0 ? void 0 : _b.stack,
      });
      return true;
    });
    // Promise rejection handler for unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      var _a, _b;
      this.handleError({
        type: 'promise',
        message:
          ((_a = event.reason) === null || _a === void 0
            ? void 0
            : _a.message) || 'Unhandled promise rejection',
        stack:
          (_b = event.reason) === null || _b === void 0 ? void 0 : _b.stack,
      });
    });
    // HTMX specific error handler for request failures
    document.body.addEventListener('htmx:responseError', (event) => {
      const htmxEvent = event;
      const response = htmxEvent.detail.xhr;
      this.handleError({
        type: 'htmx',
        status: response.status,
        url: htmxEvent.detail.requestConfig.path,
        message: `HTMX request failed with status ${response.status}`,
      });
      // For 5xx errors, show a user-friendly message in the target
      if (response.status >= 500) {
        const target = htmxEvent.detail.target;
        if (target) {
          target.innerHTML = `
            <div class="notice error" role="alert">
              <p>Sorry, something went wrong with this request. Please try again.</p>
            </div>
          `;
        }
      }
    });
  }
  /**
   * Handle an error by logging it and optionally sending to server
   * @param errorInfo Error information
   */
  handleError(errorInfo) {
    // Log to console for debugging
    console.error('[Greenova Error]', errorInfo);
    // Record error in WASM module
    this.wasmModule.recordError(
      this.wasmModule.ERROR_GENERAL,
      errorInfo.status || 0
    );
    // Create a standardized error object
    const errorData = Object.assign(
      {
        message: errorInfo.message || 'Unknown error',
        type: errorInfo.type || 'general',
        url: window.location.href,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
      },
      errorInfo
    );
    // If we have a viable error and are in production mode, send to server
    if (errorInfo.message && !this.isLocalDevelopment()) {
      this.sendErrorToServer(errorData);
    }
  }
  /**
   * Send error data to server for logging
   * @param errorData Error information to send
   */
  sendErrorToServer(errorData) {
    // Use a simple fetch with keep-alive: false to ensure error reporting
    // doesn't hang if the page is being unloaded
    const blob = new Blob([JSON.stringify(errorData)], {
      type: 'application/json',
    });
    // Only attempt to send if navigator.sendBeacon is available
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/log-client-error/', blob);
    } else {
      // Fallback to fetch for older browsers
      fetch('/api/log-client-error/', {
        method: 'POST',
        body: blob,
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRFToken': this.getCSRFToken(),
        },
        keepalive: true,
      }).catch(() => {
        // Silent catch - we don't want errors in error reporting
      });
    }
  }
  /**
   * Check if we're in local development mode
   * @returns True if local development
   */
  isLocalDevelopment() {
    const host = window.location.hostname;
    return host === 'localhost' || host === '127.0.0.1';
  }
  /**
   * Get CSRF token from cookies for secure requests
   * @returns CSRF token
   */
  getCSRFToken() {
    var _a;
    const name = 'csrftoken';
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return (
        ((_a = parts.pop()) === null || _a === void 0
          ? void 0
          : _a.split(';').shift()) || ''
      );
    }
    return '';
  }
  /**
   * Report an error manually
   * @param error Error object or message
   * @param context Additional context information
   */
  reportError(error, context = {}) {
    this.handleError({
      type: 'manual',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : null,
      context: context,
    });
  }
}
//# sourceMappingURL=error-handler.js.map
