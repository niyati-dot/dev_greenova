!(function (e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
      ? define([], t)
      : 'object' == typeof exports
        ? (exports.Greenova = t())
        : ((e.Greenova = e.Greenova || {}), (e.Greenova.helper = t()));
})(self, () =>
  (() => {
    'use strict';
    var e = {
        d: (t, o) => {
          for (var r in o)
            e.o(o, r) &&
              !e.o(t, r) &&
              Object.defineProperty(t, r, { enumerable: !0, get: o[r] });
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
    function o(e, t) {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: !1,
      }).format(e);
    }
    function r(e) {
      return e.reduce((e, t) => e + t, 0);
    }
    return e.r(t), e.d(t, { calculateSum: () => r, formatDate: () => o }), t;
  })()
);
//# sourceMappingURL=helper.bundle.js.map
