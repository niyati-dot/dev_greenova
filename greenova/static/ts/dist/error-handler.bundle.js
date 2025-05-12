!(function (e, r) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = r())
    : 'function' == typeof define && define.amd
      ? define([], r)
      : 'object' == typeof exports
        ? (exports.Greenova = r())
        : ((e.Greenova = e.Greenova || {}),
          (e.Greenova['error-handler'] = r()));
})(self, () =>
  (() => {
    'use strict';
    var e = {
        d: (r, t) => {
          for (var o in t)
            e.o(t, o) &&
              !e.o(r, o) &&
              Object.defineProperty(r, o, { enumerable: !0, get: t[o] });
        },
        o: (e, r) => Object.prototype.hasOwnProperty.call(e, r),
        r: (e) => {
          'undefined' != typeof Symbol &&
            Symbol.toStringTag &&
            Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
            Object.defineProperty(e, '__esModule', { value: !0 });
        },
      },
      r = {};
    e.r(r), e.d(r, { ErrorHandler: () => t });
    class t {
      constructor(e) {
        this.wasmModule = e;
      }
      init() {
        this.setupGlobalHandlers();
      }
      setupGlobalHandlers() {
        window.addEventListener('error', (e) => {
          var r, t;
          return (
            this.handleError({
              type: 'unhandled',
              message:
                (null === (r = e.error) || void 0 === r
                  ? void 0
                  : r.message) || 'Unknown error',
              source: e.filename || 'unknown',
              lineno: e.lineno,
              stack: null === (t = e.error) || void 0 === t ? void 0 : t.stack,
            }),
            !0
          );
        }),
          window.addEventListener('unhandledrejection', (e) => {
            var r, t;
            this.handleError({
              type: 'promise',
              message:
                (null === (r = e.reason) || void 0 === r
                  ? void 0
                  : r.message) || 'Unhandled promise rejection',
              stack:
                null === (t = e.reason) || void 0 === t ? void 0 : t.stack,
            });
          }),
          document.body.addEventListener('htmx:responseError', (e) => {
            const r = e,
              t = r.detail.xhr;
            if (
              (this.handleError({
                type: 'htmx',
                status: t.status,
                url: r.detail.requestConfig.path,
                message: `HTMX request failed with status ${t.status}`,
              }),
              t.status >= 500)
            ) {
              const e = r.detail.target;
              e &&
                (e.innerHTML =
                  '\n            <div class="notice error" role="alert">\n              <p>Sorry, something went wrong with this request. Please try again.</p>\n            </div>\n          ');
            }
          });
      }
      handleError(e) {
        console.error('[Greenova Error]', e),
          this.wasmModule.recordError(
            this.wasmModule.ERROR_GENERAL,
            e.status || 0
          );
        const r = Object.assign(
          {
            message: e.message || 'Unknown error',
            type: e.type || 'general',
            url: window.location.href,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
          },
          e
        );
        e.message && !this.isLocalDevelopment() && this.sendErrorToServer(r);
      }
      sendErrorToServer(e) {
        const r = new Blob([JSON.stringify(e)], { type: 'application/json' });
        navigator.sendBeacon
          ? navigator.sendBeacon('/api/log-client-error/', r)
          : fetch('/api/log-client-error/', {
              method: 'POST',
              body: r,
              headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRFToken': this.getCSRFToken(),
              },
              keepalive: !0,
            }).catch(() => {});
      }
      isLocalDevelopment() {
        const e = window.location.hostname;
        return 'localhost' === e || '127.0.0.1' === e;
      }
      getCSRFToken() {
        var e;
        const r = `; ${document.cookie}`.split('; csrftoken=');
        return (
          (2 === r.length &&
            (null === (e = r.pop()) || void 0 === e
              ? void 0
              : e.split(';').shift())) ||
          ''
        );
      }
      reportError(e, r = {}) {
        this.handleError({
          type: 'manual',
          message: e instanceof Error ? e.message : String(e),
          stack: e instanceof Error ? e.stack : null,
          context: r,
        });
      }
    }
    return r;
  })()
);
//# sourceMappingURL=error-handler.bundle.js.map
