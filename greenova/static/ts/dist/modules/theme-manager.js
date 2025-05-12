/**
 * Theme Manager Module
 *
 * This module manages the application's theme system, handling:
 * - Theme switching (light/dark/auto)
 * - System preference detection
 * - Local storage persistence
 * - WASM-based theme calculations
 */
export class ThemeManager {
  constructor(wasmModule) {
    this.wasmModule = wasmModule;
    this.config = {
      rootAttribute: 'data-theme',
      localStorageKey: 'greenova-theme',
      defaultScheme: 'auto',
    };
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.currentTheme = this.getStoredTheme();
  }
  /**
   * Initialize the theme manager
   */
  init() {
    try {
      const savedTheme = this.getStoredTheme();
      this.setThemeInWasm(savedTheme);
      this.applyTheme(savedTheme);
      this.setupSystemPreferenceListener();
      this.setupThemeToggleListeners();
    } catch (error) {
      console.error('Theme initialization failed:', error);
      this.applyThemeWithoutWasm('light');
    }
  }
  /**
   * Apply theme without WASM support
   */
  applyThemeWithoutWasm(theme) {
    const rootElement = document.documentElement;
    if (!rootElement) return;
    const effectiveTheme =
      theme === 'auto'
        ? this.getSystemPreference()
          ? 'dark'
          : 'light'
        : theme;
    rootElement.setAttribute(this.config.rootAttribute, effectiveTheme);
    this.currentTheme = theme;
  }
  /**
   * Get stored theme preference
   */
  getStoredTheme() {
    var _a;
    try {
      return (
        ((_a = window.localStorage) === null || _a === void 0
          ? void 0
          : _a.getItem(this.config.localStorageKey)) ||
        this.config.defaultScheme
      );
    } catch (_b) {
      return this.config.defaultScheme;
    }
  }
  /**
   * Set theme in WASM module
   */
  setThemeInWasm(theme) {
    try {
      const themeValue = this.getThemeValue(theme);
      this.wasmModule.setTheme(themeValue);
    } catch (error) {
      console.error('Failed to set theme in WASM:', error);
    }
  }
  /**
   * Get theme value for WASM module
   */
  getThemeValue(theme) {
    switch (theme) {
      case 'light':
        return this.wasmModule.THEME_LIGHT;
      case 'dark':
        return this.wasmModule.THEME_DARK;
      case 'auto':
      default:
        return this.wasmModule.THEME_AUTO;
    }
  }
  /**
   * Get system color scheme preference
   */
  getSystemPreference() {
    var _a, _b;
    return (_b =
      (_a = this.mediaQuery) === null || _a === void 0
        ? void 0
        : _a.matches) !== null && _b !== void 0
      ? _b
      : false;
  }
  /**
   * Apply theme to document
   */
  applyTheme(theme) {
    const rootElement = document.documentElement;
    if (!rootElement) return;
    try {
      if (theme === 'auto') {
        const systemPrefersDark = this.getSystemPreference() ? 1 : 0;
        const resolvedTheme = this.wasmModule.resolveTheme(systemPrefersDark);
        rootElement.setAttribute(
          this.config.rootAttribute,
          resolvedTheme === this.wasmModule.THEME_DARK ? 'dark' : 'light'
        );
      } else {
        rootElement.setAttribute(this.config.rootAttribute, theme);
      }
      this.currentTheme = theme;
      this.dispatchThemeChangedEvent(theme);
    } catch (error) {
      console.error('Failed to apply theme:', error);
      this.applyThemeWithoutWasm(theme);
    }
  }
  /**
   * Set up system preference change listener
   */
  setupSystemPreferenceListener() {
    var _a;
    if (
      !((_a = this.mediaQuery) === null || _a === void 0
        ? void 0
        : _a.addEventListener)
    )
      return;
    this.mediaQuery.addEventListener('change', () => {
      if (this.currentTheme === 'auto') {
        this.applyTheme('auto');
      }
    });
  }
  /**
   * Set up theme toggle button listeners
   */
  setupThemeToggleListeners() {
    document.querySelectorAll('[data-theme-toggle]').forEach((toggle) => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const targetTheme = toggle.getAttribute('data-theme-value') || 'auto';
        this.setTheme(targetTheme);
      });
    });
  }
  /**
   * Set and save theme preference
   */
  setTheme(theme) {
    var _a;
    try {
      (_a = window.localStorage) === null || _a === void 0
        ? void 0
        : _a.setItem(this.config.localStorageKey, theme);
      this.setThemeInWasm(theme);
      this.applyTheme(theme);
    } catch (error) {
      console.error('Failed to set theme:', error);
      this.applyThemeWithoutWasm(theme);
    }
  }
  /**
   * Dispatch theme changed event
   */
  dispatchThemeChangedEvent(theme) {
    try {
      window.dispatchEvent(
        new CustomEvent('themeChanged', {
          detail: { theme },
        })
      );
    } catch (error) {
      console.error('Failed to dispatch theme changed event:', error);
    }
  }
  /**
   * Get current theme
   */
  getCurrentTheme() {
    return this.currentTheme;
  }
  /**
   * Toggle between light and dark themes
   */
  toggleTheme() {
    const currentTheme = this.getCurrentTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
}
//# sourceMappingURL=theme-manager.js.map
