!(function (e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
      ? define([], t)
      : 'object' == typeof exports
        ? (exports.Greenova = t())
        : ((e.Greenova = e.Greenova || {}),
          (e.Greenova['theme-manager'] = t()));
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
    e.r(t), e.d(t, { ThemeManager: () => r });
    class r {
      constructor(e) {
        (this.wasmModule = e),
          (this.config = {
            rootAttribute: 'data-theme',
            localStorageKey: 'greenova-theme',
            defaultScheme: 'auto',
          }),
          (this.mediaQuery = window.matchMedia(
            '(prefers-color-scheme: dark)'
          )),
          (this.currentTheme = this.getStoredTheme());
      }
      init() {
        try {
          const e = this.getStoredTheme();
          this.setThemeInWasm(e),
            this.applyTheme(e),
            this.setupSystemPreferenceListener(),
            this.setupThemeToggleListeners();
        } catch (e) {
          console.error('Theme initialization failed:', e),
            this.applyThemeWithoutWasm('light');
        }
      }
      applyThemeWithoutWasm(e) {
        const t = document.documentElement;
        if (!t) return;
        const r =
          'auto' === e ? (this.getSystemPreference() ? 'dark' : 'light') : e;
        t.setAttribute(this.config.rootAttribute, r), (this.currentTheme = e);
      }
      getStoredTheme() {
        var e;
        try {
          return (
            (null === (e = window.localStorage) || void 0 === e
              ? void 0
              : e.getItem(this.config.localStorageKey)) ||
            this.config.defaultScheme
          );
        } catch (e) {
          return this.config.defaultScheme;
        }
      }
      setThemeInWasm(e) {
        try {
          const t = this.getThemeValue(e);
          this.wasmModule.setTheme(t);
        } catch (e) {
          console.error('Failed to set theme in WASM:', e);
        }
      }
      getThemeValue(e) {
        switch (e) {
          case 'light':
            return this.wasmModule.THEME_LIGHT;
          case 'dark':
            return this.wasmModule.THEME_DARK;
          default:
            return this.wasmModule.THEME_AUTO;
        }
      }
      getSystemPreference() {
        var e, t;
        return (
          null !==
            (t =
              null === (e = this.mediaQuery) || void 0 === e
                ? void 0
                : e.matches) &&
          void 0 !== t &&
          t
        );
      }
      applyTheme(e) {
        const t = document.documentElement;
        if (t)
          try {
            if ('auto' === e) {
              const e = this.getSystemPreference() ? 1 : 0,
                r = this.wasmModule.resolveTheme(e);
              t.setAttribute(
                this.config.rootAttribute,
                r === this.wasmModule.THEME_DARK ? 'dark' : 'light'
              );
            } else t.setAttribute(this.config.rootAttribute, e);
            (this.currentTheme = e), this.dispatchThemeChangedEvent(e);
          } catch (t) {
            console.error('Failed to apply theme:', t),
              this.applyThemeWithoutWasm(e);
          }
      }
      setupSystemPreferenceListener() {
        var e;
        (null === (e = this.mediaQuery) || void 0 === e
          ? void 0
          : e.addEventListener) &&
          this.mediaQuery.addEventListener('change', () => {
            'auto' === this.currentTheme && this.applyTheme('auto');
          });
      }
      setupThemeToggleListeners() {
        document.querySelectorAll('[data-theme-toggle]').forEach((e) => {
          e.addEventListener('click', (t) => {
            t.preventDefault();
            const r = e.getAttribute('data-theme-value') || 'auto';
            this.setTheme(r);
          });
        });
      }
      setTheme(e) {
        var t;
        try {
          null === (t = window.localStorage) ||
            void 0 === t ||
            t.setItem(this.config.localStorageKey, e),
            this.setThemeInWasm(e),
            this.applyTheme(e);
        } catch (t) {
          console.error('Failed to set theme:', t),
            this.applyThemeWithoutWasm(e);
        }
      }
      dispatchThemeChangedEvent(e) {
        try {
          window.dispatchEvent(
            new CustomEvent('themeChanged', { detail: { theme: e } })
          );
        } catch (e) {
          console.error('Failed to dispatch theme changed event:', e);
        }
      }
      getCurrentTheme() {
        return this.currentTheme;
      }
      toggleTheme() {
        const e = 'light' === this.getCurrentTheme() ? 'dark' : 'light';
        this.setTheme(e);
      }
    }
    return t;
  })()
);
//# sourceMappingURL=theme-manager.bundle.js.map
