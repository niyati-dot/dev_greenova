!(function (e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
      ? define([], t)
      : 'object' == typeof exports
        ? (exports.Greenova = t())
        : ((e.Greenova = e.Greenova || {}), (e.Greenova['wasm-loader'] = t()));
})(self, () =>
  (() => {
    'use strict';
    var e = {
        d: (t, r) => {
          for (var o in r)
            e.o(r, o) &&
              !e.o(t, o) &&
              Object.defineProperty(t, o, { enumerable: !0, get: r[o] });
        },
        o: (e, t) => Object.prototype.hasOwnProperty.call(e, t),
        r: (e) => {
          'undefined' != typeof Symbol &&
            Symbol.toStringTag &&
            Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
            Object.defineProperty(e, '__esModule', { value: !0 });
        },
      },
      t = {};
    e.r(t), e.d(t, { initializeWasmModule: () => n });
    var r = function (e, t, r, o) {
      return new (r || (r = Promise))(function (n, i) {
        function s(e) {
          try {
            l(o.next(e));
          } catch (e) {
            i(e);
          }
        }
        function a(e) {
          try {
            l(o.throw(e));
          } catch (e) {
            i(e);
          }
        }
        function l(e) {
          var t;
          e.done
            ? n(e.value)
            : ((t = e.value),
              t instanceof r
                ? t
                : new r(function (e) {
                    e(t);
                  })).then(s, a);
        }
        l((o = o.apply(e, t || [])).next());
      });
    };
    class o {
      constructor() {
        (this.THEME_LIGHT = 0),
          (this.THEME_DARK = 1),
          (this.THEME_AUTO = 2),
          (this.ERROR_NONE = 0),
          (this.ERROR_GENERAL = 1),
          (this.ERROR_THEME = 2),
          (this.ERROR_ANIMATION = 3),
          (this.memory = new WebAssembly.Memory({ initial: 1 }));
      }
      getTheme() {
        return 0;
      }
      setTheme() {}
      resolveTheme(e) {
        return e ? 1 : 0;
      }
      getLastErrorCode() {
        return 0;
      }
      getLastErrorDetails() {
        return 0;
      }
      recordError() {}
      clearError() {}
      linearEasing(e, t) {
        return e / t;
      }
      easeInOutEasing(e, t) {
        return e / t;
      }
      calculateAnimationHeight() {
        return 0;
      }
    }
    function n() {
      return r(this, void 0, void 0, function* () {
        if (
          !(function () {
            try {
              return (
                'object' == typeof WebAssembly &&
                'function' == typeof WebAssembly.instantiate &&
                'function' == typeof WebAssembly.Memory &&
                'function' == typeof WebAssembly.compile &&
                'function' == typeof WebAssembly.Instance
              );
            } catch (e) {
              return !1;
            }
          })()
        )
          return (
            console.warn(
              'WebAssembly is not supported, using fallback module'
            ),
            new o()
          );
        try {
          const e = new URL(
              '/static/as/build/optimized.wasm',
              window.location.origin
            ).href,
            t = yield (function (e) {
              return r(this, arguments, void 0, function* (e, t = 3, r = 1e3) {
                let o;
                for (let n = 0; n < t; n++)
                  try {
                    return yield fetch(e);
                  } catch (e) {
                    if (((o = e), n === t - 1)) break;
                    yield new Promise((e) => setTimeout(e, r * (n + 1)));
                  }
                throw o || new Error('Failed to fetch after retries');
              });
            })(e);
          if (!t.ok)
            throw new Error(`Failed to fetch WASM module: ${t.statusText}`);
          const o = yield t.arrayBuffer();
          if (!o) throw new Error('Empty WASM buffer received');
          const n = new WebAssembly.Memory({ initial: 2, maximum: 10 }),
            { instance: i } = yield WebAssembly.instantiate(o, {
              env: {
                memory: n,
                abort: (e, t, r, o) => {
                  throw (
                    (console.error('WASM module aborted:', {
                      message: e,
                      fileName: t,
                      lineNumber: r,
                      columnNumber: o,
                    }),
                    new Error('WASM module aborted'))
                  );
                },
              },
            });
          if (!(null == i ? void 0 : i.exports))
            throw new Error('WASM instance exports not found');
          return i.exports;
        } catch (e) {
          return (
            console.error('WASM initialization failed:', e),
            console.warn('Falling back to JavaScript implementation'),
            new o()
          );
        }
      });
    }
    return t;
  })()
);
//# sourceMappingURL=wasm-loader.bundle.js.map
