!(function (e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
      ? define([], t)
      : 'object' == typeof exports
        ? (exports.Greenova = t())
        : ((e.Greenova = e.Greenova || {}), (e.Greenova.foldable = t()));
})(self, () =>
  (() => {
    'use strict';
    var e = {
        d: (t, s) => {
          for (var a in s)
            e.o(s, a) &&
              !e.o(t, a) &&
              Object.defineProperty(t, a, { enumerable: !0, get: s[a] });
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
    e.r(t), e.d(t, { Foldable: () => s });
    class s {
      constructor(e) {
        (this.wasmModule = e),
          (this.selectors = {
            foldable: '[data-foldable]',
            trigger: '[data-foldable-trigger]',
            content: '[data-foldable-content]',
            expanded: '[data-foldable-expanded="true"]',
          }),
          (this.classes = {
            hidden: 'hidden',
            expanded: 'expanded',
            collapsed: 'collapsed',
            animating: 'animating',
          }),
          (this.attrs = {
            expanded: 'data-foldable-expanded',
            animationDuration: 'data-animation-duration',
          });
      }
      init() {
        if (void 0 !== window._hyperscript) {
          const e = document.querySelectorAll(
            `${this.selectors.foldable}:not([_])`
          );
          this.initElements(e);
        } else {
          const e = document.querySelectorAll(this.selectors.foldable);
          this.initElements(e);
        }
        this.setupMutationObserver(), this.setupHtmxHandlers();
      }
      initElements(e) {
        e.forEach((e) => {
          if (e.hasAttribute('data-foldable-initialized')) return;
          const t = e.querySelector(this.selectors.trigger),
            s = e.querySelector(this.selectors.content);
          if (!t || !s)
            return void console.warn(
              'Foldable missing trigger or content:',
              e
            );
          const a =
            e.hasAttribute(this.attrs.expanded) &&
            'true' === e.getAttribute(this.attrs.expanded);
          t.setAttribute('aria-expanded', a ? 'true' : 'false'),
            t.setAttribute('aria-controls', this.ensureId(s)),
            a || s.classList.add(this.classes.hidden),
            t.addEventListener('click', (t) => {
              t.preventDefault(), this.toggleFoldable(e);
            }),
            e.setAttribute('data-foldable-initialized', 'true');
        });
      }
      toggleFoldable(e) {
        const t = e.querySelector(this.selectors.trigger),
          s = e.querySelector(this.selectors.content);
        if (s.classList.contains(this.classes.animating)) return;
        const a = 'true' === t.getAttribute('aria-expanded');
        t.setAttribute('aria-expanded', a ? 'false' : 'true'),
          a ? this.animateCollapse(e, s) : this.animateExpand(e, s);
      }
      animateCollapse(e, t) {
        (t.style.height = `${t.scrollHeight}px`),
          t.offsetHeight,
          t.classList.add(this.classes.animating),
          (t.style.height = '0');
        const s = parseInt(
          e.getAttribute(this.attrs.animationDuration) || '300',
          10
        );
        setTimeout(() => {
          t.classList.add(this.classes.hidden),
            t.classList.remove(this.classes.animating),
            (t.style.height = ''),
            e.setAttribute(this.attrs.expanded, 'false'),
            e.dispatchEvent(
              new CustomEvent('foldable:collapsed', {
                bubbles: !0,
                detail: { foldable: e },
              })
            );
        }, s);
      }
      animateExpand(e, t) {
        t.classList.remove(this.classes.hidden);
        const s = t.scrollHeight;
        (t.style.height = '0'),
          t.offsetHeight,
          t.classList.add(this.classes.animating),
          (t.style.height = `${s}px`);
        const a = parseInt(
            e.getAttribute(this.attrs.animationDuration) || '300',
            10
          ),
          i = this.wasmModule.easeInOutEasing(a, a);
        setTimeout(() => {
          t.classList.remove(this.classes.animating),
            (t.style.height = ''),
            e.setAttribute(this.attrs.expanded, 'true'),
            e.dispatchEvent(
              new CustomEvent('foldable:expanded', {
                bubbles: !0,
                detail: { foldable: e },
              })
            );
        }, i);
      }
      ensureId(e) {
        return (
          e.id ||
            (e.id = `foldable-content-${Math.random().toString(36).substr(2, 9)}`),
          e.id
        );
      }
      setupMutationObserver() {
        window.MutationObserver &&
          new MutationObserver((e) => {
            let t = !1;
            e.forEach((e) => {
              'childList' === e.type && e.addedNodes.length && (t = !0);
            }),
              t && this.init();
          }).observe(document.body, { childList: !0, subtree: !0 });
      }
      setupHtmxHandlers() {
        document.addEventListener('htmx:afterSwap', () => {
          this.init();
        });
      }
      toggle(e) {
        const t = e.closest(this.selectors.foldable);
        t && this.toggleFoldable(t);
      }
      expand(e) {
        const t = e.closest(this.selectors.foldable);
        if (t) {
          const e = t.querySelector(this.selectors.trigger);
          e &&
            'false' === e.getAttribute('aria-expanded') &&
            this.toggleFoldable(t);
        }
      }
      collapse(e) {
        const t = e.closest(this.selectors.foldable);
        if (t) {
          const e = t.querySelector(this.selectors.trigger);
          e &&
            'true' === e.getAttribute('aria-expanded') &&
            this.toggleFoldable(t);
        }
      }
    }
    return t;
  })()
);
//# sourceMappingURL=foldable.bundle.js.map
