!(function (e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
      ? define([], t)
      : 'object' == typeof exports
        ? (exports.Greenova = t())
        : ((e.Greenova = e.Greenova || {}), (e.Greenova['app-modules'] = t()));
})(self, () =>
  (() => {
    'use strict';
    var e = {
        d: (t, o) => {
          for (var n in o)
            e.o(o, n) &&
              !e.o(t, n) &&
              Object.defineProperty(t, n, { enumerable: !0, get: o[n] });
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
    e.r(t), e.d(t, { AppModules: () => c });
    class o {
      setupGlobalEventListeners() {
        document
          .querySelectorAll('.message[data-auto-dismiss]')
          .forEach((e) => {
            setTimeout(() => {
              e instanceof HTMLElement &&
                e.setAttribute &&
                e.setAttribute(
                  'classes',
                  'add fade-out:0s, remove message:1s'
                );
            }, 5e3);
          });
      }
      loadStylesheet(e, t) {
        const o = document.createElement('link');
        (o.rel = 'stylesheet'),
          (o.href = e),
          t && (o.id = t),
          document.head.appendChild(o);
      }
      init() {
        document.querySelector && window.addEventListener
          ? (void 0 === window.htmx
              ? console.warn('HTMX not loaded')
              : console.log('HTMX loaded successfully'),
            this.setupGlobalEventListeners())
          : console.warn('Browser unsupported, skipping JS initialization');
      }
    }
    class n {
      init() {
        document.addEventListener('change', (e) => {
          const t = e.target;
          t &&
            t.matches('#project-select') &&
            this.handleProjectChange(t.value);
        }),
          this.restoreProjectSelection(),
          this.updateAddObligationButton();
      }
      handleProjectChange(e) {
        e && sessionStorage.setItem('lastProjectId', e),
          window.htmx &&
            (window.htmx.trigger('#chart-container', 'refreshCharts'),
            window.htmx.trigger(
              '#obligations-container',
              'refreshObligations'
            )),
          this.updateAddObligationButton();
      }
      restoreProjectSelection() {
        const e = document.getElementById('project-select'),
          t = sessionStorage.getItem('lastProjectId');
        e && t && ((e.value = t), e.dispatchEvent(new Event('change')));
      }
      updateAddObligationButton() {
        const e = document.getElementById('project-select'),
          t = document.querySelector('.add-obligation-btn');
        if (e && t) {
          const o = e.value;
          if (o) {
            const e = (t.getAttribute('href') || '').split('?')[0];
            t.setAttribute('href', `${e}?project_id=${o}`);
          }
        }
      }
    }
    class r {
      init() {
        document.addEventListener('htmx:afterSettle', () => {
          const e = document.getElementById('chartScroll');
          e && this.setupChartNavigation(e);
        });
      }
      setupChartNavigation(e) {
        e.addEventListener('keydown', (t) => {
          'ArrowLeft' === t.key
            ? (t.preventDefault(), this.scrollCharts(e, 'left'))
            : 'ArrowRight' === t.key &&
              (t.preventDefault(), this.scrollCharts(e, 'right'));
        });
      }
      scrollCharts(e, t) {
        e &&
          e.scrollBy({ left: 'left' === t ? -320 : 320, behavior: 'smooth' });
      }
    }
    class i {
      init() {
        this.setupTableScrolling(),
          document.addEventListener('htmx:afterSettle', () =>
            this.setupTableScrolling()
          );
      }
      setupTableScrolling() {
        document.querySelectorAll('.table-container').forEach((e) => {
          const t = e.querySelector('.horizontal-scroll'),
            o = e.querySelector('.scroll-indicator');
          if (t && !o) {
            const o = document.createElement('div');
            o.className = 'scroll-indicator';
            const n = document.createElement('div');
            (n.className = 'scroll-thumb'),
              o.appendChild(n),
              e.appendChild(o),
              t.addEventListener('scroll', () =>
                this.updateScrollIndicator(t, n)
              ),
              this.updateScrollIndicator(t, n);
          }
        });
      }
      updateScrollIndicator(e, t) {
        if (!e || !t) return;
        const o = e.scrollWidth,
          n = e.clientWidth,
          r = (n / o) * 100,
          i = (e.scrollLeft / (o - n)) * (100 - r);
        (t.style.width = `${r}%`), (t.style.marginLeft = `${i}%`);
      }
      exportToCSV(e, t) {
        if (!e) return;
        const o = Array.from(e.querySelectorAll('tr')),
          n = Array.from(o[0].querySelectorAll('th')).map((e) => {
            var t;
            return `"${(null === (t = e.textContent) || void 0 === t ? void 0 : t.trim().replace(/"/g, '""')) || ''}"`;
          }),
          r = o.slice(1).map((e) =>
            Array.from(e.querySelectorAll('td')).map((e) => {
              var t;
              return `"${(null === (t = e.textContent) || void 0 === t ? void 0 : t.trim().replace(/"/g, '""')) || ''}"`;
            })
          ),
          i = [n.join(','), ...r.map((e) => e.join(','))].join('\n'),
          s = new Blob([i], { type: 'text/csv;charset=utf-8;' }),
          a = URL.createObjectURL(s),
          l = document.createElement('a');
        l.setAttribute('href', a),
          l.setAttribute('download', t),
          (l.style.display = 'none'),
          document.body.appendChild(l),
          l.click(),
          document.body.removeChild(l);
      }
    }
    class s {
      init() {
        void 0 !== window.htmx &&
          (document.body.addEventListener('htmx:beforeRequest', (e) => {
            const t = e.detail.target;
            t.matches('#obligations-container, #chart-container') &&
              (t.innerHTML =
                '<div class="notice" role="status" aria-busy="true">Loading...</div>');
          }),
          document.body.addEventListener('htmx:responseError', (e) => {
            e.detail.target.innerHTML =
              '\n        <div class="notice error" role="alert">\n          <p>Error loading data. Please try again.</p>\n        </div>\n      ';
          }),
          document.addEventListener('htmx:afterSettle', (e) => {
            const t = e;
            t.detail.triggerSpec &&
              t.detail.triggerSpec.includes('obligation:statusChanged') &&
              window.htmx.trigger('#chart-container', 'refreshCharts');
          }),
          document.body.addEventListener('htmx:afterSwap', (e) => {
            const t = e.detail.target;
            t.hasAttribute('data-animate-entrance') &&
              t.setAttribute('classes', 'add fade-in');
          }),
          void 0 !== window.PathDeps &&
            document.body.addEventListener('htmx:afterRequest', (e) => {
              const t = e;
              if (!t.detail.successful || 'GET' === t.detail.xhr.method)
                return;
              const o = t.detail.requestConfig.path;
              o &&
                o.includes('/obligations/') &&
                window.PathDeps &&
                (window.PathDeps.refresh('/obligations/'),
                window.PathDeps.refresh('/mechanisms/charts/'),
                window.PathDeps.refresh('/dashboard/overdue-count/'));
            }));
      }
    }
    class a {
      init() {
        document.addEventListener('submit', (e) => {
          const t = e.target;
          t.matches('#obligations-filter-form') &&
            (e.preventDefault(), this.handleFilterFormSubmit(t));
        }),
          document.addEventListener('click', (e) => {
            const t = e.target;
            if (t.matches('.remove-filter')) {
              e.preventDefault();
              const o = t.getAttribute('data-filter-type'),
                n = t.getAttribute('data-filter-value');
              o && n && this.removeFilter(o, n);
            }
          });
      }
      handleFilterFormSubmit(e) {
        const t = document.getElementById('filter-count');
        if (t) {
          const o = Array.from(
            e.querySelectorAll('select, input[type="text"]')
          ).filter((e) => {
            const t = e;
            return t.value && '' !== t.value;
          }).length;
          (t.textContent = o.toString()), (t.hidden = 0 === o);
        }
      }
      removeFilter(e, t) {
        const o = document.querySelector(`select[name="${e}"]`);
        o &&
          (Array.from(o.options).forEach((e) => {
            e.value === t && (e.selected = !1);
          }),
          o.dispatchEvent(new Event('change')));
      }
    }
    class l {
      init() {
        document.addEventListener('click', (e) => {
          e.target.matches('#print-obligations') &&
            (e.preventDefault(), window.print());
        }),
          document.addEventListener('click', (e) => {
            if (e.target.matches('#export-obligations')) {
              e.preventDefault();
              const t = document.querySelector('table');
              t && new i().exportToCSV(t, 'obligations_export.csv');
            }
          }),
          document.addEventListener('click', (e) => {
            var t;
            const o = e.target;
            if (
              o.matches('.obligation-link') ||
              o.closest('.obligation-link')
            ) {
              document.body.classList.add('loading');
              const e =
                null ===
                  (t = document.querySelector('input[name="project_id"]')) ||
                void 0 === t
                  ? void 0
                  : t.value;
              e && sessionStorage.setItem('lastProjectId', e);
            }
          });
      }
    }
    class c {
      constructor() {
        (this.core = new o()),
          (this.projects = new n()),
          (this.charts = new r()),
          (this.tables = new i()),
          (this.htmxHandlers = new s()),
          (this.forms = new a()),
          (this.documentActions = new l());
      }
    }
    return t;
  })()
);
//# sourceMappingURL=app-modules.bundle.js.map
