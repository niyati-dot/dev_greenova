/*! For license information please see landing.bundle.js.LICENSE.txt */
!(function (t, e) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = e())
    : 'function' == typeof define && define.amd
      ? define([], e)
      : 'object' == typeof exports
        ? (exports.Greenova = e())
        : ((t.Greenova = t.Greenova || {}), (t.Greenova.landing = e()));
})(self, () =>
  (() => {
    'use strict';
    var t = {
        373: (t, e, r) => {
          r.d(e, { A: () => b });
          let n,
            i,
            o,
            s = 'undefined' != typeof Intl ? new Intl.Segmenter() : 0,
            a = (t) =>
              'string' == typeof t
                ? a(document.querySelectorAll(t))
                : 'length' in t
                  ? Array.from(t)
                  : [t],
            l = (t) => a(t).filter((t) => t instanceof HTMLElement),
            u = [],
            c = function () {},
            h = /\s+/g,
            f = new RegExp(
              '\\p{RI}\\p{RI}|\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?(\\u{200D}\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?)*|.',
              'gu'
            ),
            p = { left: 0, top: 0, width: 0, height: 0 },
            d = (t, e) => {
              if (e) {
                let r,
                  n,
                  i,
                  o,
                  s = new Set(t.join('').match(e) || u),
                  a = t.length;
                if (s.size)
                  for (; --a > -1; )
                    for (i of ((n = t[a]), s))
                      if (i.startsWith(n) && i.length > n.length) {
                        for (
                          r = 0, o = n;
                          i.startsWith((o += t[a + ++r])) &&
                          o.length < i.length;

                        );
                        if (r && o.length === i.length) {
                          (t[a] = i), t.splice(a + 1, r);
                          break;
                        }
                      }
              }
              return t;
            },
            g = (t) =>
              'inline' === window.getComputedStyle(t).display &&
              (t.style.display = 'inline-block'),
            m = (t, e, r) =>
              e.insertBefore(
                'string' == typeof t ? document.createTextNode(t) : t,
                r
              ),
            v = (t, e, r) => {
              let n = e[t + 'sClass'] || '',
                { tag: i = 'div', aria: o = 'auto', propIndex: s = !1 } = e,
                a = 'line' === t ? 'block' : 'inline-block',
                l = n.indexOf('++') > -1,
                u = (e) => {
                  let u = document.createElement(i),
                    c = r.length + 1;
                  return (
                    n && (u.className = n + (l ? ' ' + n + c : '')),
                    s && u.style.setProperty('--' + t, c + ''),
                    'none' !== o && u.setAttribute('aria-hidden', 'true'),
                    'span' !== i &&
                      ((u.style.position = 'relative'), (u.style.display = a)),
                    (u.textContent = e),
                    r.push(u),
                    u
                  );
                };
              return l && (n = n.replace('++', '')), (u.collection = r), u;
            },
            _ = (t, e, r, n, i, o, a, l, c, f) => {
              var p;
              let v,
                y,
                b,
                x,
                w,
                T,
                S,
                C,
                E,
                M,
                k,
                A,
                P,
                O,
                R,
                z,
                D,
                L,
                N = Array.from(t.childNodes),
                I = 0,
                {
                  wordDelimiter: F,
                  reduceWhiteSpace: B = !0,
                  prepareText: Y,
                } = e,
                X = t.getBoundingClientRect(),
                V = X,
                q =
                  !B &&
                  'pre' ===
                    window.getComputedStyle(t).whiteSpace.substring(0, 3),
                H = 0,
                U = r.collection;
              for (
                'object' == typeof F
                  ? ((b = F.delimiter || F), (y = F.replaceWith || ''))
                  : (y = '' === F ? '' : F || ' '),
                  v = ' ' !== y;
                I < N.length;
                I++
              )
                if (((x = N[I]), 3 === x.nodeType)) {
                  for (
                    R = x.textContent || '',
                      B
                        ? (R = R.replace(h, ' '))
                        : q && (R = R.replace(/\n/g, y + '\n')),
                      Y && (R = Y(R, t)),
                      x.textContent = R,
                      w = y || b ? R.split(b || y) : R.match(l) || u,
                      D = w[w.length - 1],
                      C = v ? ' ' === D.slice(-1) : !D,
                      D || w.pop(),
                      V = X,
                      S = v ? ' ' === w[0].charAt(0) : !w[0],
                      S && m(' ', t, x),
                      w[0] || w.shift(),
                      d(w, c),
                      (o && f) || (x.textContent = ''),
                      E = 1;
                    E <= w.length;
                    E++
                  )
                    if (
                      ((z = w[E - 1]),
                      !B &&
                        q &&
                        '\n' === z.charAt(0) &&
                        (null == (p = x.previousSibling) || p.remove(),
                        m(document.createElement('br'), t, x),
                        (z = z.slice(1))),
                      B || '' !== z)
                    )
                      if (' ' === z)
                        t.insertBefore(document.createTextNode(' '), x);
                      else {
                        if (
                          (v && ' ' === z.charAt(0) && m(' ', t, x),
                          H && 1 === E && !S && U.indexOf(H.parentNode) > -1
                            ? ((T = U[U.length - 1]),
                              T.appendChild(
                                document.createTextNode(n ? '' : z)
                              ))
                            : ((T = r(n ? '' : z)),
                              m(T, t, x),
                              H &&
                                1 === E &&
                                !S &&
                                T.insertBefore(H, T.firstChild)),
                          n)
                        )
                          for (
                            k = s
                              ? d(
                                  [...s.segment(z)].map((t) => t.segment),
                                  c
                                )
                              : z.match(l) || u,
                              L = 0;
                            L < k.length;
                            L++
                          )
                            T.appendChild(
                              ' ' === k[L]
                                ? document.createTextNode(' ')
                                : n(k[L])
                            );
                        if (o && f) {
                          if (
                            ((R = x.textContent =
                              R.substring(z.length + 1, R.length)),
                            (M = T.getBoundingClientRect()),
                            M.top > V.top && M.left <= V.left)
                          ) {
                            for (
                              A = t.cloneNode(), P = t.childNodes[0];
                              P && P !== T;

                            )
                              (O = P), (P = P.nextSibling), A.appendChild(O);
                            t.parentNode.insertBefore(A, t), i && g(A);
                          }
                          V = M;
                        }
                        (E < w.length || C) &&
                          m(
                            E >= w.length
                              ? ' '
                              : v && ' ' === z.slice(-1)
                                ? ' ' + y
                                : y,
                            t,
                            x
                          );
                      }
                    else m(y, t, x);
                  t.removeChild(x), (H = 0);
                } else
                  1 === x.nodeType &&
                    (a && a.indexOf(x) > -1
                      ? (U.indexOf(x.previousSibling) > -1 &&
                          U[U.length - 1].appendChild(x),
                        (H = x))
                      : (_(x, e, r, n, i, o, a, l, c, !0), (H = 0)),
                    i && g(x));
            };
          const y = class t {
            constructor(t, e) {
              (this.isSplit = !1),
                o || b.register(window.gsap),
                (this.elements = l(t)),
                (this.chars = []),
                (this.words = []),
                (this.lines = []),
                (this.masks = []),
                (this.vars = e),
                (this._split = () => this.isSplit && this.split(this.vars));
              let r,
                n = [],
                i = () => {
                  let t,
                    e = n.length;
                  for (; e--; ) {
                    t = n[e];
                    let r = t.element.offsetWidth;
                    if (r !== t.width)
                      return (t.width = r), void this._split();
                  }
                };
              (this._data = {
                orig: n,
                obs:
                  'undefined' != typeof ResizeObserver &&
                  new ResizeObserver(() => {
                    clearTimeout(r), (r = setTimeout(i, 200));
                  }),
              }),
                c(this),
                this.split(e);
            }
            split(t) {
              this.isSplit && this.revert(),
                (this.vars = t = t || this.vars || {});
              let e,
                {
                  type: r = 'chars,words,lines',
                  aria: n = 'auto',
                  deepSlice: o = !0,
                  smartWrap: s,
                  onSplit: u,
                  autoSplit: c = !1,
                  specialChars: h,
                  mask: d,
                } = this.vars,
                g = r.indexOf('lines') > -1,
                m = r.indexOf('chars') > -1,
                y = r.indexOf('words') > -1,
                b = m && !y && !g,
                x =
                  h &&
                  ('push' in h
                    ? new RegExp('(?:' + h.join('|') + ')', 'gu')
                    : h),
                w = x ? new RegExp(x.source + '|' + f.source, 'gu') : f,
                T = !!t.ignore && l(t.ignore),
                { orig: S, animTime: C, obs: E } = this._data;
              return (
                (m || y || g) &&
                  (this.elements.forEach((e, r) => {
                    (S[r] = {
                      element: e,
                      html: e.innerHTML,
                      ariaL: e.getAttribute('aria-label'),
                      ariaH: e.getAttribute('aria-hidden'),
                    }),
                      'auto' === n
                        ? e.setAttribute(
                            'aria-label',
                            (e.textContent || '').trim()
                          )
                        : 'hidden' === n &&
                          e.setAttribute('aria-hidden', 'true');
                    let i,
                      l,
                      u,
                      c,
                      h = [],
                      f = [],
                      d = [],
                      C = m ? v('char', t, h) : null,
                      E = v('word', t, f);
                    if ((_(e, t, E, C, b, o && (g || b), T, w, x, !1), g)) {
                      let r,
                        n = a(e.childNodes),
                        o = ((t, e, r, n) => {
                          let i = v('line', r, n),
                            o = window.getComputedStyle(t).textAlign || 'left';
                          return (r, n) => {
                            let s = i('');
                            for (
                              s.style.textAlign = o, t.insertBefore(s, e[r]);
                              r < n;
                              r++
                            )
                              s.appendChild(e[r]);
                            s.normalize();
                          };
                        })(e, n, t, d),
                        s = [],
                        l = 0,
                        u = n.map((t) =>
                          1 === t.nodeType ? t.getBoundingClientRect() : p
                        ),
                        c = p;
                      for (i = 0; i < n.length; i++)
                        (r = n[i]),
                          1 === r.nodeType &&
                            ('BR' === r.nodeName
                              ? (s.push(r),
                                o(l, i + 1),
                                (l = i + 1),
                                (c = u[l]))
                              : (i &&
                                  u[i].top > c.top &&
                                  u[i].left <= c.left &&
                                  (o(l, i), (l = i)),
                                (c = u[i])));
                      l < i && o(l, i),
                        s.forEach((t) => {
                          var e;
                          return null == (e = t.parentNode)
                            ? void 0
                            : e.removeChild(t);
                        });
                    }
                    if (!y) {
                      for (i = 0; i < f.length; i++)
                        if (
                          ((l = f[i]),
                          m || !l.nextSibling || 3 !== l.nextSibling.nodeType)
                        )
                          if (s && !g) {
                            for (
                              u = document.createElement('span'),
                                u.style.whiteSpace = 'nowrap';
                              l.firstChild;

                            )
                              u.appendChild(l.firstChild);
                            l.replaceWith(u);
                          } else l.replaceWith(...l.childNodes);
                        else
                          (c = l.nextSibling),
                            c &&
                              3 === c.nodeType &&
                              ((c.textContent =
                                (l.textContent || '') + (c.textContent || '')),
                              l.remove());
                      (f.length = 0), e.normalize();
                    }
                    this.lines.push(...d),
                      this.words.push(...f),
                      this.chars.push(...h);
                  }),
                  d &&
                    this[d] &&
                    this.masks.push(
                      ...this[d].map((t) => {
                        let e = t.cloneNode();
                        return (
                          t.replaceWith(e),
                          e.appendChild(t),
                          t.className &&
                            (e.className = t.className.replace(
                              /(\b\w+\b)/g,
                              '$1-mask'
                            )),
                          (e.style.overflow = 'clip'),
                          e
                        );
                      })
                    )),
                (this.isSplit = !0),
                i &&
                  (c
                    ? i.addEventListener('loadingdone', this._split)
                    : 'loading' === i.status &&
                      console.warn('SplitText called before fonts loaded')),
                (e = u && u(this)) &&
                  e.totalTime &&
                  (this._data.anim = C ? e.totalTime(C) : e),
                g &&
                  c &&
                  this.elements.forEach((t, e) => {
                    (S[e].width = t.offsetWidth), E && E.observe(t);
                  }),
                this
              );
            }
            revert() {
              var t, e;
              let { orig: r, anim: n, obs: o } = this._data;
              return (
                o && o.disconnect(),
                r.forEach(({ element: t, html: e, ariaL: r, ariaH: n }) => {
                  (t.innerHTML = e),
                    r
                      ? t.setAttribute('aria-label', r)
                      : t.removeAttribute('aria-label'),
                    n
                      ? t.setAttribute('aria-hidden', n)
                      : t.removeAttribute('aria-hidden');
                }),
                (this.chars.length =
                  this.words.length =
                  this.lines.length =
                  r.length =
                  this.masks.length =
                    0),
                (this.isSplit = !1),
                null == i || i.removeEventListener('loadingdone', this._split),
                n && ((this._data.animTime = n.totalTime()), n.revert()),
                null == (e = (t = this.vars).onRevert) || e.call(t, this),
                this
              );
            }
            static create(e, r) {
              return new t(e, r);
            }
            static register(t) {
              (n = n || t || window.gsap),
                n && ((a = n.utils.toArray), (c = n.core.context || c)),
                !o &&
                  window.innerWidth > 0 &&
                  ((i = document.fonts), (o = !0));
            }
          };
          y.version = '3.13.0';
          let b = y;
        },
        411: (t, e, r) => {
          r.d(e, { K: () => lt });
          var n = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
            i = /(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
            o = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi,
            s = /(^[#\.][a-z]|[a-y][a-z])/i,
            a = Math.PI / 180,
            l = (Math.PI, Math.sin),
            u = Math.cos,
            c = Math.abs,
            h = Math.sqrt,
            f =
              (Math.atan2,
              function (t) {
                return 'string' == typeof t;
              }),
            p = function (t) {
              return 'number' == typeof t;
            },
            d = 1e5,
            g = function (t) {
              return Math.round(t * d) / d || 0;
            };
          function m(t) {
            var e,
              r = 0;
            for (t.reverse(); r < t.length; r += 2)
              (e = t[r]), (t[r] = t[r + 1]), (t[r + 1] = e);
            t.reversed = !t.reversed;
          }
          var v = {
            rect: 'rx,ry,x,y,width,height',
            circle: 'r,cx,cy',
            ellipse: 'rx,ry,cx,cy',
            line: 'x1,x2,y1,y2',
          };
          function _(t, e) {
            var r,
              n,
              o,
              s,
              a,
              l,
              u,
              c,
              h,
              f,
              p,
              d,
              g,
              m,
              _,
              y,
              w,
              T,
              S,
              C,
              E,
              M,
              k = t.tagName.toLowerCase(),
              A = 0.552284749831;
            return 'path' !== k && t.getBBox
              ? ((l = (function (t, e) {
                  var r,
                    n = document.createElementNS(
                      'http://www.w3.org/2000/svg',
                      'path'
                    ),
                    i = [].slice.call(t.attributes),
                    o = i.length;
                  for (e = ',' + e + ','; --o > -1; )
                    (r = i[o].nodeName.toLowerCase()),
                      e.indexOf(',' + r + ',') < 0 &&
                        n.setAttributeNS(null, r, i[o].nodeValue);
                  return n;
                })(t, 'x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points')),
                (M = (function (t, e) {
                  for (
                    var r = e ? e.split(',') : [], n = {}, i = r.length;
                    --i > -1;

                  )
                    n[r[i]] = +t.getAttribute(r[i]) || 0;
                  return n;
                })(t, v[k])),
                'rect' === k
                  ? ((s = M.rx),
                    (a = M.ry || s),
                    (n = M.x),
                    (o = M.y),
                    (f = M.width - 2 * s),
                    (p = M.height - 2 * a),
                    (r =
                      s || a
                        ? 'M' +
                          (y = (m = (g = n + s) + f) + s) +
                          ',' +
                          (T = o + a) +
                          ' V' +
                          (S = T + p) +
                          ' C' +
                          [
                            y,
                            (C = S + a * A),
                            (_ = m + s * A),
                            (E = S + a),
                            m,
                            E,
                            m - (m - g) / 3,
                            E,
                            g + (m - g) / 3,
                            E,
                            g,
                            E,
                            (d = n + s * (1 - A)),
                            E,
                            n,
                            C,
                            n,
                            S,
                            n,
                            S - (S - T) / 3,
                            n,
                            T + (S - T) / 3,
                            n,
                            T,
                            n,
                            (w = o + a * (1 - A)),
                            d,
                            o,
                            g,
                            o,
                            g + (m - g) / 3,
                            o,
                            m - (m - g) / 3,
                            o,
                            m,
                            o,
                            _,
                            o,
                            y,
                            w,
                            y,
                            T,
                          ].join(',') +
                          'z'
                        : 'M' +
                          (n + f) +
                          ',' +
                          o +
                          ' v' +
                          p +
                          ' h' +
                          -f +
                          ' v' +
                          -p +
                          ' h' +
                          f +
                          'z'))
                  : 'circle' === k || 'ellipse' === k
                    ? ('circle' === k
                        ? (c = (s = a = M.r) * A)
                        : ((s = M.rx), (c = (a = M.ry) * A)),
                      (r =
                        'M' +
                        ((n = M.cx) + s) +
                        ',' +
                        (o = M.cy) +
                        ' C' +
                        [
                          n + s,
                          o + c,
                          n + (u = s * A),
                          o + a,
                          n,
                          o + a,
                          n - u,
                          o + a,
                          n - s,
                          o + c,
                          n - s,
                          o,
                          n - s,
                          o - c,
                          n - u,
                          o - a,
                          n,
                          o - a,
                          n + u,
                          o - a,
                          n + s,
                          o - c,
                          n + s,
                          o,
                        ].join(',') +
                        'z'))
                    : 'line' === k
                      ? (r =
                          'M' + M.x1 + ',' + M.y1 + ' L' + M.x2 + ',' + M.y2)
                      : ('polyline' !== k && 'polygon' !== k) ||
                        ((r =
                          'M' +
                          (n = (h =
                            (t.getAttribute('points') + '').match(i) ||
                            []).shift()) +
                          ',' +
                          (o = h.shift()) +
                          ' L' +
                          h.join(',')),
                        'polygon' === k && (r += ',' + n + ',' + o + 'z')),
                l.setAttribute('d', x((l._gsRawPath = b(r)))),
                e &&
                  t.parentNode &&
                  (t.parentNode.insertBefore(l, t),
                  t.parentNode.removeChild(t)),
                l)
              : t;
          }
          function y(t, e, r, n, i, o, s, f, p) {
            if (t !== f || e !== p) {
              (r = c(r)), (n = c(n));
              var d = (i % 360) * a,
                g = u(d),
                m = l(d),
                v = Math.PI,
                _ = 2 * v,
                y = (t - f) / 2,
                b = (e - p) / 2,
                x = g * y + m * b,
                w = -m * y + g * b,
                T = x * x,
                S = w * w,
                C = T / (r * r) + S / (n * n);
              C > 1 && ((r = h(C) * r), (n = h(C) * n));
              var E = r * r,
                M = n * n,
                k = (E * M - E * S - M * T) / (E * S + M * T);
              k < 0 && (k = 0);
              var A = (o === s ? -1 : 1) * h(k),
                P = A * ((r * w) / n),
                O = A * ((-n * x) / r),
                R = (t + f) / 2 + (g * P - m * O),
                z = (e + p) / 2 + (m * P + g * O),
                D = (x - P) / r,
                L = (w - O) / n,
                N = (-x - P) / r,
                I = (-w - O) / n,
                F = D * D + L * L,
                B = (L < 0 ? -1 : 1) * Math.acos(D / h(F)),
                Y =
                  (D * I - L * N < 0 ? -1 : 1) *
                  Math.acos((D * N + L * I) / h(F * (N * N + I * I)));
              isNaN(Y) && (Y = v),
                !s && Y > 0 ? (Y -= _) : s && Y < 0 && (Y += _),
                (B %= _),
                (Y %= _);
              var X,
                V = Math.ceil(c(Y) / (_ / 4)),
                q = [],
                H = Y / V,
                U = ((4 / 3) * l(H / 2)) / (1 + u(H / 2)),
                W = g * r,
                j = m * r,
                G = m * -n,
                Z = g * n;
              for (X = 0; X < V; X++)
                (x = u((i = B + X * H))),
                  (w = l(i)),
                  (D = u((i += H))),
                  (L = l(i)),
                  q.push(x - U * w, w + U * x, D + U * L, L - U * D, D, L);
              for (X = 0; X < q.length; X += 2)
                (x = q[X]),
                  (w = q[X + 1]),
                  (q[X] = x * W + w * G + R),
                  (q[X + 1] = x * j + w * Z + z);
              return (q[X - 2] = f), (q[X - 1] = p), q;
            }
          }
          function b(t) {
            var e,
              r,
              i,
              s,
              a,
              l,
              u,
              h,
              f,
              p,
              d,
              g,
              m,
              v,
              _,
              b =
                (t + '')
                  .replace(o, function (t) {
                    var e = +t;
                    return e < 1e-4 && e > -1e-4 ? 0 : e;
                  })
                  .match(n) || [],
              x = [],
              w = 0,
              T = 0,
              S = 2 / 3,
              C = b.length,
              E = 0,
              M = 'ERROR: malformed path: ' + t,
              k = function (t, e, r, n) {
                (p = (r - t) / 3),
                  (d = (n - e) / 3),
                  u.push(t + p, e + d, r - p, n - d, r, n);
              };
            if (!t || !isNaN(b[0]) || isNaN(b[1])) return console.log(M), x;
            for (e = 0; e < C; e++)
              if (
                ((m = a),
                isNaN(b[e]) ? (l = (a = b[e].toUpperCase()) !== b[e]) : e--,
                (i = +b[e + 1]),
                (s = +b[e + 2]),
                l && ((i += w), (s += T)),
                e || ((h = i), (f = s)),
                'M' === a)
              )
                u && (u.length < 8 ? (x.length -= 1) : (E += u.length)),
                  (w = h = i),
                  (T = f = s),
                  (u = [i, s]),
                  x.push(u),
                  (e += 2),
                  (a = 'L');
              else if ('C' === a)
                u || (u = [0, 0]),
                  l || (w = T = 0),
                  u.push(
                    i,
                    s,
                    w + 1 * b[e + 3],
                    T + 1 * b[e + 4],
                    (w += 1 * b[e + 5]),
                    (T += 1 * b[e + 6])
                  ),
                  (e += 6);
              else if ('S' === a)
                (p = w),
                  (d = T),
                  ('C' !== m && 'S' !== m) ||
                    ((p += w - u[u.length - 4]), (d += T - u[u.length - 3])),
                  l || (w = T = 0),
                  u.push(p, d, i, s, (w += 1 * b[e + 3]), (T += 1 * b[e + 4])),
                  (e += 4);
              else if ('Q' === a)
                (p = w + (i - w) * S),
                  (d = T + (s - T) * S),
                  l || (w = T = 0),
                  (w += 1 * b[e + 3]),
                  (T += 1 * b[e + 4]),
                  u.push(p, d, w + (i - w) * S, T + (s - T) * S, w, T),
                  (e += 4);
              else if ('T' === a)
                (p = w - u[u.length - 4]),
                  (d = T - u[u.length - 3]),
                  u.push(
                    w + p,
                    T + d,
                    i + (w + 1.5 * p - i) * S,
                    s + (T + 1.5 * d - s) * S,
                    (w = i),
                    (T = s)
                  ),
                  (e += 2);
              else if ('H' === a) k(w, T, (w = i), T), (e += 1);
              else if ('V' === a)
                k(w, T, w, (T = i + (l ? T - w : 0))), (e += 1);
              else if ('L' === a || 'Z' === a)
                'Z' === a && ((i = h), (s = f), (u.closed = !0)),
                  ('L' === a || c(w - i) > 0.5 || c(T - s) > 0.5) &&
                    (k(w, T, i, s), 'L' === a && (e += 2)),
                  (w = i),
                  (T = s);
              else if ('A' === a) {
                if (
                  ((v = b[e + 4]),
                  (_ = b[e + 5]),
                  (p = b[e + 6]),
                  (d = b[e + 7]),
                  (r = 7),
                  v.length > 1 &&
                    (v.length < 3
                      ? ((d = p), (p = _), r--)
                      : ((d = _), (p = v.substr(2)), (r -= 2)),
                    (_ = v.charAt(1)),
                    (v = v.charAt(0))),
                  (g = y(
                    w,
                    T,
                    +b[e + 1],
                    +b[e + 2],
                    +b[e + 3],
                    +v,
                    +_,
                    (l ? w : 0) + 1 * p,
                    (l ? T : 0) + 1 * d
                  )),
                  (e += r),
                  g)
                )
                  for (r = 0; r < g.length; r++) u.push(g[r]);
                (w = u[u.length - 2]), (T = u[u.length - 1]);
              } else console.log(M);
            return (
              (e = u.length) < 6
                ? (x.pop(), (e = 0))
                : u[0] === u[e - 2] && u[1] === u[e - 1] && (u.closed = !0),
              (x.totalPoints = E + e),
              x
            );
          }
          function x(t) {
            p(t[0]) && (t = [t]);
            var e,
              r,
              n,
              i,
              o = '',
              s = t.length;
            for (r = 0; r < s; r++) {
              for (
                i = t[r],
                  o += 'M' + g(i[0]) + ',' + g(i[1]) + ' C',
                  e = i.length,
                  n = 2;
                n < e;
                n++
              )
                o +=
                  g(i[n++]) +
                  ',' +
                  g(i[n++]) +
                  ' ' +
                  g(i[n++]) +
                  ',' +
                  g(i[n++]) +
                  ' ' +
                  g(i[n++]) +
                  ',' +
                  g(i[n]) +
                  ' ';
              i.closed && (o += 'z');
            }
            return o;
          }
          var w,
            T,
            S,
            C,
            E,
            M = function () {
              return (
                w ||
                ('undefined' != typeof window &&
                  (w = window.gsap) &&
                  w.registerPlugin &&
                  w)
              );
            },
            k = function (t) {
              return 'function' == typeof t;
            },
            A = Math.atan2,
            P = Math.cos,
            O = Math.sin,
            R = Math.sqrt,
            z = Math.PI,
            D = 2 * z,
            L = 0.3 * z,
            N = 0.7 * z,
            I = 1e20,
            F = /[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,
            B = /(^[#\.][a-z]|[a-y][a-z])/i,
            Y = /[achlmqstvz]/i,
            X = function (t) {
              return console && console.warn(t);
            },
            V = function (t) {
              var e,
                r = t.length,
                n = 0,
                i = 0;
              for (e = 0; e < r; e++) (n += t[e++]), (i += t[e]);
              return [n / (r / 2), i / (r / 2)];
            },
            q = function (t) {
              var e,
                r,
                n,
                i = t.length,
                o = t[0],
                s = o,
                a = t[1],
                l = a;
              for (n = 6; n < i; n += 6)
                (e = t[n]) > o ? (o = e) : e < s && (s = e),
                  (r = t[n + 1]) > a ? (a = r) : r < l && (l = r);
              return (
                (t.centerX = (o + s) / 2),
                (t.centerY = (a + l) / 2),
                (t.size = (o - s) * (a - l))
              );
            },
            H = function (t, e) {
              void 0 === e && (e = 3);
              for (
                var r,
                  n,
                  i,
                  o,
                  s,
                  a,
                  l,
                  u,
                  c,
                  h,
                  f,
                  p,
                  d,
                  g,
                  m,
                  v,
                  _ = t.length,
                  y = t[0][0],
                  b = y,
                  x = t[0][1],
                  w = x,
                  T = 1 / e;
                --_ > -1;

              )
                for (r = (s = t[_]).length, o = 6; o < r; o += 6)
                  for (
                    c = s[o],
                      h = s[o + 1],
                      f = s[o + 2] - c,
                      g = s[o + 3] - h,
                      p = s[o + 4] - c,
                      m = s[o + 5] - h,
                      d = s[o + 6] - c,
                      v = s[o + 7] - h,
                      a = e;
                    --a > -1;

                  )
                    (n =
                      ((l = T * a) * l * d +
                        3 * (u = 1 - l) * (l * p + u * f)) *
                        l +
                      c) > y
                      ? (y = n)
                      : n < b && (b = n),
                      (i = (l * l * v + 3 * u * (l * m + u * g)) * l + h) > x
                        ? (x = i)
                        : i < w && (w = i);
              return (
                (t.centerX = (y + b) / 2),
                (t.centerY = (x + w) / 2),
                (t.left = b),
                (t.width = y - b),
                (t.top = w),
                (t.height = x - w),
                (t.size = (y - b) * (x - w))
              );
            },
            U = function (t, e) {
              return e.length - t.length;
            },
            W = function (t, e) {
              var r = t.size || q(t),
                n = e.size || q(e);
              return Math.abs(n - r) < (r + n) / 20
                ? e.centerX - t.centerX || e.centerY - t.centerY
                : n - r;
            },
            j = function (t, e) {
              var r,
                n,
                i = t.slice(0),
                o = t.length,
                s = o - 2;
              for (e |= 0, r = 0; r < o; r++)
                (n = (r + e) % s), (t[r++] = i[n]), (t[r] = i[n + 1]);
            },
            G = function (t, e, r, n, i) {
              var o,
                s,
                a,
                l,
                u = t.length,
                c = 0,
                h = u - 2;
              for (r *= 6, s = 0; s < u; s += 6)
                (l = t[(o = (s + r) % h)] - (e[s] - n)),
                  (a = t[o + 1] - (e[s + 1] - i)),
                  (c += R(a * a + l * l));
              return c;
            },
            Z = function (t, e, r) {
              var n,
                i,
                o,
                s = t.length,
                a = V(t),
                l = V(e),
                u = l[0] - a[0],
                c = l[1] - a[1],
                h = G(t, e, 0, u, c),
                f = 0;
              for (o = 6; o < s; o += 6)
                (i = G(t, e, o / 6, u, c)) < h && ((h = i), (f = o));
              if (r)
                for (m((n = t.slice(0))), o = 6; o < s; o += 6)
                  (i = G(n, e, o / 6, u, c)) < h && ((h = i), (f = -o));
              return f / 6;
            },
            Q = function (t, e, r) {
              for (
                var n, i, o, s, a, l, u = t.length, c = I, h = 0, f = 0;
                --u > -1;

              )
                for (l = (n = t[u]).length, a = 0; a < l; a += 6)
                  (i = n[a] - e),
                    (o = n[a + 1] - r),
                    (s = R(i * i + o * o)) < c &&
                      ((c = s), (h = n[a]), (f = n[a + 1]));
              return [h, f];
            },
            $ = function (t, e, r, n, i, o) {
              var s,
                a,
                l,
                u,
                c = e.length,
                h = 0,
                f = Math.min(t.size || q(t), e[r].size || q(e[r])) * n,
                p = I,
                d = t.centerX + i,
                g = t.centerY + o;
              for (s = r; s < c && !((e[s].size || q(e[s])) < f); s++)
                (a = e[s].centerX - d),
                  (l = e[s].centerY - g),
                  (u = R(a * a + l * l)) < p && ((h = s), (p = u));
              return (u = e[h]), e.splice(h, 1), u;
            },
            K = function (t, e) {
              var r,
                n,
                i,
                o,
                s,
                a,
                l,
                u,
                c,
                h,
                f,
                p,
                d,
                g,
                m = 0,
                v = t.length,
                _ = e / ((v - 2) / 6);
              for (d = 2; d < v; d += 6)
                for (m += _; m > 0.999999; )
                  (r = t[d - 2]),
                    (n = t[d - 1]),
                    (i = t[d]),
                    (o = t[d + 1]),
                    (s = t[d + 2]),
                    (a = t[d + 3]),
                    (l = t[d + 4]),
                    (u = t[d + 5]),
                    (c = r + (i - r) * (g = 1 / ((Math.floor(m) || 1) + 1))),
                    (c += ((f = i + (s - i) * g) - c) * g),
                    (f += (s + (l - s) * g - f) * g),
                    (h = n + (o - n) * g),
                    (h += ((p = o + (a - o) * g) - h) * g),
                    (p += (a + (u - a) * g - p) * g),
                    t.splice(
                      d,
                      4,
                      r + (i - r) * g,
                      n + (o - n) * g,
                      c,
                      h,
                      c + (f - c) * g,
                      h + (p - h) * g,
                      f,
                      p,
                      s + (l - s) * g,
                      a + (u - a) * g
                    ),
                    (d += 6),
                    (v += 6),
                    m--;
              return t;
            },
            J = function (t, e, r, n, i) {
              var o,
                s,
                a,
                l,
                u,
                c,
                h,
                f = e.length - t.length,
                p = f > 0 ? e : t,
                d = f > 0 ? t : e,
                g = 0,
                v = 'complexity' === n ? U : W,
                _ = 'position' === n ? 0 : 'number' == typeof n ? n : 0.8,
                y = d.length,
                b = 'object' == typeof r && r.push ? r.slice(0) : [r],
                x = 'reverse' === b[0] || b[0] < 0,
                w = 'log' === r;
              if (d[0]) {
                if (
                  p.length > 1 &&
                  (t.sort(v),
                  e.sort(v),
                  p.size || H(p),
                  d.size || H(d),
                  (c = p.centerX - d.centerX),
                  (h = p.centerY - d.centerY),
                  v === W)
                )
                  for (y = 0; y < d.length; y++)
                    p.splice(y, 0, $(d[y], p, y, _, c, h));
                if (f)
                  for (
                    f < 0 && (f = -f),
                      p[0].length > d[0].length &&
                        K(d[0], ((p[0].length - d[0].length) / 6) | 0),
                      y = d.length;
                    g < f;

                  )
                    p[y].size || q(p[y]),
                      (l = (a = Q(d, p[y].centerX, p[y].centerY))[0]),
                      (u = a[1]),
                      (d[y++] = [l, u, l, u, l, u, l, u]),
                      (d.totalPoints += 8),
                      g++;
                for (y = 0; y < t.length; y++)
                  (o = e[y]),
                    (s = t[y]),
                    (f = o.length - s.length) < 0
                      ? K(o, (-f / 6) | 0)
                      : f > 0 && K(s, (f / 6) | 0),
                    x && !1 !== i && !s.reversed && m(s),
                    (r = b[y] || 0 === b[y] ? b[y] : 'auto') &&
                      (s.closed ||
                      (Math.abs(s[0] - s[s.length - 2]) < 0.5 &&
                        Math.abs(s[1] - s[s.length - 1]) < 0.5)
                        ? 'auto' === r || 'log' === r
                          ? ((b[y] = r = Z(s, o, !y || !1 === i)),
                            r < 0 && ((x = !0), m(s), (r = -r)),
                            j(s, 6 * r))
                          : 'reverse' !== r &&
                            (y && r < 0 && m(s), j(s, 6 * (r < 0 ? -r : r)))
                        : !x &&
                            (('auto' === r &&
                              Math.abs(o[0] - s[0]) +
                                Math.abs(o[1] - s[1]) +
                                Math.abs(o[o.length - 2] - s[s.length - 2]) +
                                Math.abs(o[o.length - 1] - s[s.length - 1]) >
                                Math.abs(o[0] - s[s.length - 2]) +
                                  Math.abs(o[1] - s[s.length - 1]) +
                                  Math.abs(o[o.length - 2] - s[0]) +
                                  Math.abs(o[o.length - 1] - s[1])) ||
                              r % 2)
                          ? (m(s), (b[y] = -1), (x = !0))
                          : 'auto' === r
                            ? (b[y] = 0)
                            : 'reverse' === r && (b[y] = -1),
                      s.closed !== o.closed && (s.closed = o.closed = !1));
                return (
                  w && X('shapeIndex:[' + b.join(',') + ']'),
                  (t.shapeIndex = b),
                  b
                );
              }
            },
            tt = function (t, e, r, n, i) {
              var o = b(t[0]),
                s = b(t[1]);
              J(o, s, e || 0 === e ? e : 'auto', r, i) &&
                ((t[0] = x(o)),
                (t[1] = x(s)),
                ('log' !== n && !0 !== n) ||
                  X('precompile:["' + t[0] + '","' + t[1] + '"]'));
            },
            et = function (t, e) {
              var r,
                n,
                i,
                o,
                s,
                a,
                l,
                u = 0,
                c = parseFloat(t[0]),
                h = parseFloat(t[1]),
                f = c + ',' + h + ' ',
                p = 0.999999;
              for (
                r = (0.5 * e) / (0.5 * (i = t.length) - 1), n = 0;
                n < i - 2;
                n += 2
              ) {
                if (
                  ((u += r),
                  (a = parseFloat(t[n + 2])),
                  (l = parseFloat(t[n + 3])),
                  u > p)
                )
                  for (s = 1 / (Math.floor(u) + 1), o = 1; u > p; )
                    (f +=
                      (c + (a - c) * s * o).toFixed(2) +
                      ',' +
                      (h + (l - h) * s * o).toFixed(2) +
                      ' '),
                      u--,
                      o++;
                (f += a + ',' + l + ' '), (c = a), (h = l);
              }
              return f;
            },
            rt = function (t) {
              var e = t[0].match(F) || [],
                r = t[1].match(F) || [],
                n = r.length - e.length;
              n > 0 ? (t[0] = et(e, n)) : (t[1] = et(r, -n));
            },
            nt = function (t, e) {
              for (
                var r,
                  n,
                  i,
                  o,
                  s,
                  a,
                  l,
                  u,
                  c,
                  h,
                  f,
                  p,
                  d = t.length,
                  g = 0.2 * (e || 1);
                --d > -1;

              ) {
                for (
                  f = (n = t[d]).isSmooth = n.isSmooth || [0, 0, 0, 0],
                    p = n.smoothData = n.smoothData || [0, 0, 0, 0],
                    f.length = 4,
                    u = n.length - 2,
                    l = 6;
                  l < u;
                  l += 6
                )
                  (i = n[l] - n[l - 2]),
                    (o = n[l + 1] - n[l - 1]),
                    (s = n[l + 2] - n[l]),
                    (a = n[l + 3] - n[l + 1]),
                    (c = A(o, i)),
                    (h = A(a, s)),
                    (r = Math.abs(c - h) < g) &&
                      ((p[l - 2] = c),
                      (p[l + 2] = h),
                      (p[l - 1] = R(i * i + o * o)),
                      (p[l + 3] = R(s * s + a * a))),
                    f.push(r, r, 0, 0, r, r);
                n[u] === n[0] &&
                  n[u + 1] === n[1] &&
                  ((i = n[0] - n[u - 2]),
                  (o = n[1] - n[u - 1]),
                  (s = n[2] - n[0]),
                  (a = n[3] - n[1]),
                  (c = A(o, i)),
                  (h = A(a, s)),
                  Math.abs(c - h) < g &&
                    ((p[u - 2] = c),
                    (p[2] = h),
                    (p[u - 1] = R(i * i + o * o)),
                    (p[3] = R(s * s + a * a)),
                    (f[u - 2] = f[u - 1] = !0)));
              }
              return t;
            },
            it = function (t) {
              var e = t.trim().split(' ');
              return {
                x:
                  (~t.indexOf('left')
                    ? 0
                    : ~t.indexOf('right')
                      ? 100
                      : isNaN(parseFloat(e[0]))
                        ? 50
                        : parseFloat(e[0])) / 100,
                y:
                  (~t.indexOf('top')
                    ? 0
                    : ~t.indexOf('bottom')
                      ? 100
                      : isNaN(parseFloat(e[1]))
                        ? 50
                        : parseFloat(e[1])) / 100,
              };
            },
            ot =
              'Use MorphSVGPlugin.convertToPath() to convert to a path before morphing.',
            st = function (t, e, r, n) {
              var i,
                o,
                s,
                a = this._origin,
                l = this._eOrigin,
                u = t[r] - a.x,
                c = t[r + 1] - a.y,
                h = R(u * u + c * c),
                f = A(c, u);
              return (
                (u = e[r] - l.x),
                (c = e[r + 1] - l.y),
                (o =
                  (s = i = A(c, u) - f) !== s % z ? s + (s < 0 ? D : -D) : s),
                !n && S && Math.abs(o + S.ca) < L && (n = S),
                (this._anchorPT = S =
                  {
                    _next: this._anchorPT,
                    t,
                    sa: f,
                    ca: n && o * n.ca < 0 && Math.abs(o) > N ? i : o,
                    sl: h,
                    cl: R(u * u + c * c) - h,
                    i: r,
                  })
              );
            },
            at = function (t) {
              (w = M()),
                (E = E || (w && w.plugins.morphSVG)),
                w && E
                  ? ((T = w.utils.toArray),
                    document,
                    (E.prototype._tweenRotation = st),
                    (C = 1))
                  : t && X('Please gsap.registerPlugin(MorphSVGPlugin)');
            },
            lt = {
              version: '3.13.0',
              name: 'morphSVG',
              rawVars: 1,
              register: function (t, e) {
                (w = t), (E = e), at();
              },
              init: function (t, e, r, n, i) {
                if ((C || at(1), !e)) return X('invalid shape'), !1;
                var o,
                  s,
                  a,
                  l,
                  u,
                  c,
                  h,
                  f,
                  p,
                  d,
                  g,
                  m,
                  v,
                  y,
                  w,
                  E,
                  M,
                  A,
                  P,
                  O,
                  R,
                  z;
                if (
                  (k(e) && (e = e.call(r, n, t, i)),
                  'string' == typeof e || e.getBBox || e[0])
                )
                  e = { shape: e };
                else if ('object' == typeof e) {
                  for (s in ((o = {}), e))
                    o[s] =
                      k(e[s]) && 'render' !== s ? e[s].call(r, n, t, i) : e[s];
                  e = o;
                }
                var D = t.nodeType ? window.getComputedStyle(t) : {},
                  L = D.fill + '',
                  N = !(
                    'none' === L ||
                    '0' === (L.match(F) || [])[3] ||
                    'evenodd' === D.fillRule
                  ),
                  I = (e.origin || '50 50').split(',');
                if (
                  ((u =
                    'POLYLINE' === (o = (t.nodeName + '').toUpperCase()) ||
                    'POLYGON' === o),
                  'PATH' !== o && !u && !e.prop)
                )
                  return X('Cannot morph a <' + o + '> element. ' + ot), !1;
                if (
                  ((s = 'PATH' === o ? 'd' : 'points'),
                  !e.prop && !k(t.setAttribute))
                )
                  return !1;
                if (
                  ((l = (function (t, e, r) {
                    var n, i;
                    return (
                      (!('string' == typeof t) ||
                        B.test(t) ||
                        (t.match(F) || []).length < 3) &&
                        ((n = T(t)[0])
                          ? ((i = (n.nodeName + '').toUpperCase()),
                            e &&
                              'PATH' !== i &&
                              ((n = _(n, !1)), (i = 'PATH')),
                            (t =
                              n.getAttribute('PATH' === i ? 'd' : 'points') ||
                              ''),
                            n === r &&
                              (t =
                                n.getAttributeNS(null, 'data-original') || t))
                          : (X('WARNING: invalid morph to: ' + t), (t = !1))),
                      t
                    );
                  })(e.shape || e.d || e.points || '', 'd' === s, t)),
                  u && Y.test(l))
                )
                  return X('A <' + o + '> cannot accept path data. ' + ot), !1;
                if (
                  ((c =
                    e.shapeIndex || 0 === e.shapeIndex
                      ? e.shapeIndex
                      : 'auto'),
                  (h = e.map || lt.defaultMap),
                  (this._prop = e.prop),
                  (this._render = e.render || lt.defaultRender),
                  (this._apply =
                    'updateTarget' in e
                      ? e.updateTarget
                      : lt.defaultUpdateTarget),
                  (this._rnd = Math.pow(
                    10,
                    isNaN(e.precision) ? 2 : +e.precision
                  )),
                  (this._tween = r),
                  l)
                ) {
                  if (
                    ((this._target = t),
                    (M = 'object' == typeof e.precompile),
                    (d = this._prop ? t[this._prop] : t.getAttribute(s)),
                    this._prop ||
                      t.getAttributeNS(null, 'data-original') ||
                      t.setAttributeNS(null, 'data-original', d),
                    'd' === s || this._prop)
                  ) {
                    if (
                      ((d = b(M ? e.precompile[0] : d)),
                      (g = b(M ? e.precompile[1] : l)),
                      !M && !J(d, g, c, h, N))
                    )
                      return !1;
                    for (
                      ('log' !== e.precompile && !0 !== e.precompile) ||
                        X('precompile:["' + x(d) + '","' + x(g) + '"]'),
                        (R = 'linear' !== (e.type || lt.defaultType)) &&
                          ((d = nt(d, e.smoothTolerance)),
                          (g = nt(g, e.smoothTolerance)),
                          d.size || H(d),
                          g.size || H(g),
                          (O = it(I[0])),
                          (this._origin = d.origin =
                            {
                              x: d.left + O.x * d.width,
                              y: d.top + O.y * d.height,
                            }),
                          I[1] && (O = it(I[1])),
                          (this._eOrigin = {
                            x: g.left + O.x * g.width,
                            y: g.top + O.y * g.height,
                          })),
                        this._rawPath = t._gsRawPath = d,
                        v = d.length;
                      --v > -1;

                    )
                      for (
                        w = d[v],
                          E = g[v],
                          f = w.isSmooth || [],
                          p = E.isSmooth || [],
                          y = w.length,
                          S = 0,
                          m = 0;
                        m < y;
                        m += 2
                      )
                        (E[m] === w[m] && E[m + 1] === w[m + 1]) ||
                          (R
                            ? f[m] && p[m]
                              ? ((A = w.smoothData),
                                (P = E.smoothData),
                                (z = m + (m === y - 4 ? 7 - y : 5)),
                                (this._controlPT = {
                                  _next: this._controlPT,
                                  i: m,
                                  j: v,
                                  l1s: A[m + 1],
                                  l1c: P[m + 1] - A[m + 1],
                                  l2s: A[z],
                                  l2c: P[z] - A[z],
                                }),
                                (a = this._tweenRotation(w, E, m + 2)),
                                this._tweenRotation(w, E, m, a),
                                this._tweenRotation(w, E, z - 1, a),
                                (m += 4))
                              : this._tweenRotation(w, E, m)
                            : ((a = this.add(
                                w,
                                m,
                                w[m],
                                E[m],
                                0,
                                0,
                                0,
                                0,
                                0,
                                1
                              )),
                              (a =
                                this.add(
                                  w,
                                  m + 1,
                                  w[m + 1],
                                  E[m + 1],
                                  0,
                                  0,
                                  0,
                                  0,
                                  0,
                                  1
                                ) || a)));
                  } else
                    a = this.add(
                      t,
                      'setAttribute',
                      t.getAttribute(s) + '',
                      l + '',
                      n,
                      i,
                      0,
                      (function (t) {
                        return isNaN(t)
                          ? rt
                          : function (e) {
                              rt(e),
                                (e[1] = (function (t, e) {
                                  if (!e) return t;
                                  var r,
                                    n,
                                    i,
                                    o = t.match(F) || [],
                                    s = o.length,
                                    a = '';
                                  for (
                                    'reverse' === e
                                      ? ((n = s - 1), (r = -2))
                                      : ((n =
                                          (2 * (parseInt(e, 10) || 0) +
                                            1 +
                                            100 * s) %
                                          s),
                                        (r = 2)),
                                      i = 0;
                                    i < s;
                                    i += 2
                                  )
                                    (a += o[n - 1] + ',' + o[n] + ' '),
                                      (n = (n + r) % s);
                                  return a;
                                })(e[1], parseInt(t, 10)));
                            };
                      })(c),
                      s
                    );
                  R &&
                    (this.add(
                      this._origin,
                      'x',
                      this._origin.x,
                      this._eOrigin.x,
                      0,
                      0,
                      0,
                      0,
                      0,
                      1
                    ),
                    (a = this.add(
                      this._origin,
                      'y',
                      this._origin.y,
                      this._eOrigin.y,
                      0,
                      0,
                      0,
                      0,
                      0,
                      1
                    ))),
                    a &&
                      (this._props.push('morphSVG'),
                      (a.end = l),
                      (a.endProp = s));
                }
                return 1;
              },
              render: function (t, e) {
                for (
                  var r,
                    n,
                    i,
                    o,
                    s,
                    a,
                    l,
                    u,
                    c,
                    h,
                    f,
                    p,
                    d = e._rawPath,
                    g = e._controlPT,
                    m = e._anchorPT,
                    v = e._rnd,
                    _ = e._target,
                    y = e._pt;
                  y;

                )
                  y.r(t, y.d), (y = y._next);
                if (1 === t && e._apply)
                  for (y = e._pt; y; )
                    y.end &&
                      (e._prop
                        ? (_[e._prop] = y.end)
                        : _.setAttribute(y.endProp, y.end)),
                      (y = y._next);
                else if (d) {
                  for (; m; )
                    (s = m.sa + t * m.ca),
                      (o = m.sl + t * m.cl),
                      (m.t[m.i] = e._origin.x + P(s) * o),
                      (m.t[m.i + 1] = e._origin.y + O(s) * o),
                      (m = m._next);
                  for (n = t < 0.5 ? 2 * t * t : (4 - 2 * t) * t - 1; g; )
                    (p =
                      (a = g.i) +
                      (a === (i = d[g.j]).length - 4 ? 7 - i.length : 5)),
                      (s = A(i[p] - i[a + 1], i[p - 1] - i[a])),
                      (h = O(s)),
                      (f = P(s)),
                      (u = i[a + 2]),
                      (c = i[a + 3]),
                      (o = g.l1s + n * g.l1c),
                      (i[a] = u - f * o),
                      (i[a + 1] = c - h * o),
                      (o = g.l2s + n * g.l2c),
                      (i[p - 1] = u + f * o),
                      (i[p] = c + h * o),
                      (g = g._next);
                  if (((_._gsRawPath = d), e._apply)) {
                    for (r = '', l = 0; l < d.length; l++)
                      for (
                        o = (i = d[l]).length,
                          r +=
                            'M' +
                            ((i[0] * v) | 0) / v +
                            ' ' +
                            ((i[1] * v) | 0) / v +
                            ' C',
                          a = 2;
                        a < o;
                        a++
                      )
                        r += ((i[a] * v) | 0) / v + ' ';
                    e._prop ? (_[e._prop] = r) : _.setAttribute('d', r);
                  }
                }
                e._render && d && e._render.call(e._tween, d, _);
              },
              kill: function (t) {
                this._pt = this._rawPath = 0;
              },
              getRawPath: function (t) {
                var e,
                  r = (t =
                    (f(t) && s.test(t) && document.querySelector(t)) || t)
                    .getAttribute
                    ? t
                    : 0;
                return r && (t = t.getAttribute('d'))
                  ? (r._gsPath || (r._gsPath = {}),
                    (e = r._gsPath[t]) && !e._dirty
                      ? e
                      : (r._gsPath[t] = b(t)))
                  : t
                    ? f(t)
                      ? b(t)
                      : p(t[0])
                        ? [t]
                        : t
                    : console.warn(
                        'Expecting a <path> element or an SVG path data string'
                      );
              },
              stringToRawPath: b,
              rawPathToString: x,
              normalizeStrings: function (t, e, r) {
                var n = r.shapeIndex,
                  i = r.map,
                  o = [t, e];
                return tt(o, n, i), o;
              },
              pathFilter: tt,
              pointsFilter: rt,
              getTotalSize: H,
              equalizeSegmentQuantity: J,
              convertToPath: function (t, e) {
                return T(t).map(function (t) {
                  return _(t, !1 !== e);
                });
              },
              defaultType: 'linear',
              defaultUpdateTarget: !0,
              defaultMap: 'size',
            };
          M() && w.registerPlugin(lt);
        },
      },
      e = {};
    function r(n) {
      var i = e[n];
      if (void 0 !== i) return i.exports;
      var o = (e[n] = { exports: {} });
      return t[n](o, o.exports, r), o.exports;
    }
    (r.d = (t, e) => {
      for (var n in e)
        r.o(e, n) &&
          !r.o(t, n) &&
          Object.defineProperty(t, n, { enumerable: !0, get: e[n] });
    }),
      (r.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
      (r.r = (t) => {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(t, '__esModule', { value: !0 });
      });
    var n = {};
    function i(t) {
      if (void 0 === t)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return t;
    }
    function o(t, e) {
      (t.prototype = Object.create(e.prototype)),
        (t.prototype.constructor = t),
        (t.__proto__ = e);
    }
    r.r(n), r.d(n, { default: () => au, initAnimations: () => ou });
    var s,
      a,
      l,
      u,
      c,
      h,
      f,
      p,
      d,
      g,
      m,
      v,
      _,
      y,
      b,
      x,
      w,
      T = {
        autoSleep: 120,
        force3D: 'auto',
        nullTargetWarn: 1,
        units: { lineHeight: '' },
      },
      S = { duration: 0.5, overwrite: !1, delay: 0 },
      C = 1e8,
      E = 1e-8,
      M = 2 * Math.PI,
      k = M / 4,
      A = 0,
      P = Math.sqrt,
      O = Math.cos,
      R = Math.sin,
      z = function (t) {
        return 'string' == typeof t;
      },
      D = function (t) {
        return 'function' == typeof t;
      },
      L = function (t) {
        return 'number' == typeof t;
      },
      N = function (t) {
        return void 0 === t;
      },
      I = function (t) {
        return 'object' == typeof t;
      },
      F = function (t) {
        return !1 !== t;
      },
      B = function () {
        return 'undefined' != typeof window;
      },
      Y = function (t) {
        return D(t) || z(t);
      },
      X =
        ('function' == typeof ArrayBuffer && ArrayBuffer.isView) ||
        function () {},
      V = Array.isArray,
      q = /(?:-?\.?\d|\.)+/gi,
      H = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
      U = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
      W = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
      j = /[+-]=-?[.\d]+/,
      G = /[^,'"\[\]\s]+/gi,
      Z = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
      Q = {},
      $ = {},
      K = function (t) {
        return ($ = kt(t, Q)) && kr;
      },
      J = function (t, e) {
        return console.warn(
          'Invalid property',
          t,
          'set to',
          e,
          'Missing plugin? gsap.registerPlugin()'
        );
      },
      tt = function (t, e) {
        return !e && console.warn(t);
      },
      et = function (t, e) {
        return (t && (Q[t] = e) && $ && ($[t] = e)) || Q;
      },
      rt = function () {
        return 0;
      },
      nt = { suppressEvents: !0, isStart: !0, kill: !1 },
      it = { suppressEvents: !0, kill: !1 },
      ot = { suppressEvents: !0 },
      st = {},
      at = [],
      lt = {},
      ut = {},
      ct = {},
      ht = 30,
      ft = [],
      pt = '',
      dt = function (t) {
        var e,
          r,
          n = t[0];
        if ((I(n) || D(n) || (t = [t]), !(e = (n._gsap || {}).harness))) {
          for (r = ft.length; r-- && !ft[r].targetTest(n); );
          e = ft[r];
        }
        for (r = t.length; r--; )
          (t[r] && (t[r]._gsap || (t[r]._gsap = new Ve(t[r], e)))) ||
            t.splice(r, 1);
        return t;
      },
      gt = function (t) {
        return t._gsap || dt(oe(t))[0]._gsap;
      },
      mt = function (t, e, r) {
        return (r = t[e]) && D(r)
          ? t[e]()
          : (N(r) && t.getAttribute && t.getAttribute(e)) || r;
      },
      vt = function (t, e) {
        return (t = t.split(',')).forEach(e) || t;
      },
      _t = function (t) {
        return Math.round(1e5 * t) / 1e5 || 0;
      },
      yt = function (t) {
        return Math.round(1e7 * t) / 1e7 || 0;
      },
      bt = function (t, e) {
        var r = e.charAt(0),
          n = parseFloat(e.substr(2));
        return (
          (t = parseFloat(t)),
          '+' === r ? t + n : '-' === r ? t - n : '*' === r ? t * n : t / n
        );
      },
      xt = function (t, e) {
        for (var r = e.length, n = 0; t.indexOf(e[n]) < 0 && ++n < r; );
        return n < r;
      },
      wt = function () {
        var t,
          e,
          r = at.length,
          n = at.slice(0);
        for (lt = {}, at.length = 0, t = 0; t < r; t++)
          (e = n[t]) &&
            e._lazy &&
            (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0);
      },
      Tt = function (t) {
        return !!(t._initted || t._startAt || t.add);
      },
      St = function (t, e, r, n) {
        at.length && !a && wt(),
          t.render(e, r, n || !!(a && e < 0 && Tt(t))),
          at.length && !a && wt();
      },
      Ct = function (t) {
        var e = parseFloat(t);
        return (e || 0 === e) && (t + '').match(G).length < 2
          ? e
          : z(t)
            ? t.trim()
            : t;
      },
      Et = function (t) {
        return t;
      },
      Mt = function (t, e) {
        for (var r in e) r in t || (t[r] = e[r]);
        return t;
      },
      kt = function (t, e) {
        for (var r in e) t[r] = e[r];
        return t;
      },
      At = function t(e, r) {
        for (var n in r)
          '__proto__' !== n &&
            'constructor' !== n &&
            'prototype' !== n &&
            (e[n] = I(r[n]) ? t(e[n] || (e[n] = {}), r[n]) : r[n]);
        return e;
      },
      Pt = function (t, e) {
        var r,
          n = {};
        for (r in t) r in e || (n[r] = t[r]);
        return n;
      },
      Ot = function (t) {
        var e,
          r = t.parent || u,
          n = t.keyframes
            ? ((e = V(t.keyframes)),
              function (t, r) {
                for (var n in r)
                  n in t ||
                    ('duration' === n && e) ||
                    'ease' === n ||
                    (t[n] = r[n]);
              })
            : Mt;
        if (F(t.inherit))
          for (; r; ) n(t, r.vars.defaults), (r = r.parent || r._dp);
        return t;
      },
      Rt = function (t, e, r, n, i) {
        void 0 === r && (r = '_first'), void 0 === n && (n = '_last');
        var o,
          s = t[n];
        if (i) for (o = e[i]; s && s[i] > o; ) s = s._prev;
        return (
          s
            ? ((e._next = s._next), (s._next = e))
            : ((e._next = t[r]), (t[r] = e)),
          e._next ? (e._next._prev = e) : (t[n] = e),
          (e._prev = s),
          (e.parent = e._dp = t),
          e
        );
      },
      zt = function (t, e, r, n) {
        void 0 === r && (r = '_first'), void 0 === n && (n = '_last');
        var i = e._prev,
          o = e._next;
        i ? (i._next = o) : t[r] === e && (t[r] = o),
          o ? (o._prev = i) : t[n] === e && (t[n] = i),
          (e._next = e._prev = e.parent = null);
      },
      Dt = function (t, e) {
        t.parent &&
          (!e || t.parent.autoRemoveChildren) &&
          t.parent.remove &&
          t.parent.remove(t),
          (t._act = 0);
      },
      Lt = function (t, e) {
        if (t && (!e || e._end > t._dur || e._start < 0))
          for (var r = t; r; ) (r._dirty = 1), (r = r.parent);
        return t;
      },
      Nt = function (t, e, r, n) {
        return (
          t._startAt &&
          (a
            ? t._startAt.revert(it)
            : (t.vars.immediateRender && !t.vars.autoRevert) ||
              t._startAt.render(e, !0, n))
        );
      },
      It = function t(e) {
        return !e || (e._ts && t(e.parent));
      },
      Ft = function (t) {
        return t._repeat
          ? Bt(t._tTime, (t = t.duration() + t._rDelay)) * t
          : 0;
      },
      Bt = function (t, e) {
        var r = Math.floor((t = yt(t / e)));
        return t && r === t ? r - 1 : r;
      },
      Yt = function (t, e) {
        return (
          (t - e._start) * e._ts +
          (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur)
        );
      },
      Xt = function (t) {
        return (t._end = yt(
          t._start + (t._tDur / Math.abs(t._ts || t._rts || E) || 0)
        ));
      },
      Vt = function (t, e) {
        var r = t._dp;
        return (
          r &&
            r.smoothChildTiming &&
            t._ts &&
            ((t._start = yt(
              r._time -
                (t._ts > 0
                  ? e / t._ts
                  : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)
            )),
            Xt(t),
            r._dirty || Lt(r, t)),
          t
        );
      },
      qt = function (t, e) {
        var r;
        if (
          ((e._time ||
            (!e._dur && e._initted) ||
            (e._start < t._time && (e._dur || !e.add))) &&
            ((r = Yt(t.rawTime(), e)),
            (!e._dur || ee(0, e.totalDuration(), r) - e._tTime > E) &&
              e.render(r, !0)),
          Lt(t, e)._dp && t._initted && t._time >= t._dur && t._ts)
        ) {
          if (t._dur < t.duration())
            for (r = t; r._dp; )
              r.rawTime() >= 0 && r.totalTime(r._tTime), (r = r._dp);
          t._zTime = -1e-8;
        }
      },
      Ht = function (t, e, r, n) {
        return (
          e.parent && Dt(e),
          (e._start = yt(
            (L(r) ? r : r || t !== u ? Kt(t, r, e) : t._time) + e._delay
          )),
          (e._end = yt(
            e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)
          )),
          Rt(t, e, '_first', '_last', t._sort ? '_start' : 0),
          Gt(e) || (t._recent = e),
          n || qt(t, e),
          t._ts < 0 && Vt(t, t._tTime),
          t
        );
      },
      Ut = function (t, e) {
        return (
          (Q.ScrollTrigger || J('scrollTrigger', e)) &&
          Q.ScrollTrigger.create(e, t)
        );
      },
      Wt = function (t, e, r, n, i) {
        return (
          Qe(t, e, i),
          t._initted
            ? !r &&
              t._pt &&
              !a &&
              ((t._dur && !1 !== t.vars.lazy) || (!t._dur && t.vars.lazy)) &&
              d !== Ae.frame
              ? (at.push(t), (t._lazy = [i, n]), 1)
              : void 0
            : 1
        );
      },
      jt = function t(e) {
        var r = e.parent;
        return (
          r && r._ts && r._initted && !r._lock && (r.rawTime() < 0 || t(r))
        );
      },
      Gt = function (t) {
        var e = t.data;
        return 'isFromStart' === e || 'isStart' === e;
      },
      Zt = function (t, e, r, n) {
        var i = t._repeat,
          o = yt(e) || 0,
          s = t._tTime / t._tDur;
        return (
          s && !n && (t._time *= o / t._dur),
          (t._dur = o),
          (t._tDur = i ? (i < 0 ? 1e10 : yt(o * (i + 1) + t._rDelay * i)) : o),
          s > 0 && !n && Vt(t, (t._tTime = t._tDur * s)),
          t.parent && Xt(t),
          r || Lt(t.parent, t),
          t
        );
      },
      Qt = function (t) {
        return t instanceof He ? Lt(t) : Zt(t, t._dur);
      },
      $t = { _start: 0, endTime: rt, totalDuration: rt },
      Kt = function t(e, r, n) {
        var i,
          o,
          s,
          a = e.labels,
          l = e._recent || $t,
          u = e.duration() >= C ? l.endTime(!1) : e._dur;
        return z(r) && (isNaN(r) || r in a)
          ? ((o = r.charAt(0)),
            (s = '%' === r.substr(-1)),
            (i = r.indexOf('=')),
            '<' === o || '>' === o
              ? (i >= 0 && (r = r.replace(/=/, '')),
                ('<' === o ? l._start : l.endTime(l._repeat >= 0)) +
                  (parseFloat(r.substr(1)) || 0) *
                    (s ? (i < 0 ? l : n).totalDuration() / 100 : 1))
              : i < 0
                ? (r in a || (a[r] = u), a[r])
                : ((o = parseFloat(r.charAt(i - 1) + r.substr(i + 1))),
                  s &&
                    n &&
                    (o = (o / 100) * (V(n) ? n[0] : n).totalDuration()),
                  i > 1 ? t(e, r.substr(0, i - 1), n) + o : u + o))
          : null == r
            ? u
            : +r;
      },
      Jt = function (t, e, r) {
        var n,
          i,
          o = L(e[1]),
          s = (o ? 2 : 1) + (t < 2 ? 0 : 1),
          a = e[s];
        if ((o && (a.duration = e[1]), (a.parent = r), t)) {
          for (n = a, i = r; i && !('immediateRender' in n); )
            (n = i.vars.defaults || {}), (i = F(i.vars.inherit) && i.parent);
          (a.immediateRender = F(n.immediateRender)),
            t < 2 ? (a.runBackwards = 1) : (a.startAt = e[s - 1]);
        }
        return new er(e[0], a, e[s + 1]);
      },
      te = function (t, e) {
        return t || 0 === t ? e(t) : e;
      },
      ee = function (t, e, r) {
        return r < t ? t : r > e ? e : r;
      },
      re = function (t, e) {
        return z(t) && (e = Z.exec(t)) ? e[1] : '';
      },
      ne = [].slice,
      ie = function (t, e) {
        return (
          t &&
          I(t) &&
          'length' in t &&
          ((!e && !t.length) || (t.length - 1 in t && I(t[0]))) &&
          !t.nodeType &&
          t !== c
        );
      },
      oe = function (t, e, r) {
        return l && !e && l.selector
          ? l.selector(t)
          : !z(t) || r || (!h && Pe())
            ? V(t)
              ? (function (t, e, r) {
                  return (
                    void 0 === r && (r = []),
                    t.forEach(function (t) {
                      var n;
                      return (z(t) && !e) || ie(t, 1)
                        ? (n = r).push.apply(n, oe(t))
                        : r.push(t);
                    }) || r
                  );
                })(t, r)
              : ie(t)
                ? ne.call(t, 0)
                : t
                  ? [t]
                  : []
            : ne.call((e || f).querySelectorAll(t), 0);
      },
      se = function (t) {
        return (
          (t = oe(t)[0] || tt('Invalid scope') || {}),
          function (e) {
            var r = t.current || t.nativeElement || t;
            return oe(
              e,
              r.querySelectorAll
                ? r
                : r === t
                  ? tt('Invalid scope') || f.createElement('div')
                  : t
            );
          }
        );
      },
      ae = function (t) {
        return t.sort(function () {
          return 0.5 - Math.random();
        });
      },
      le = function (t) {
        if (D(t)) return t;
        var e = I(t) ? t : { each: t },
          r = Ie(e.ease),
          n = e.from || 0,
          i = parseFloat(e.base) || 0,
          o = {},
          s = n > 0 && n < 1,
          a = isNaN(n) || s,
          l = e.axis,
          u = n,
          c = n;
        return (
          z(n)
            ? (u = c = { center: 0.5, edges: 0.5, end: 1 }[n] || 0)
            : !s && a && ((u = n[0]), (c = n[1])),
          function (t, s, h) {
            var f,
              p,
              d,
              g,
              m,
              v,
              _,
              y,
              b,
              x = (h || e).length,
              w = o[x];
            if (!w) {
              if (!(b = 'auto' === e.grid ? 0 : (e.grid || [1, C])[1])) {
                for (
                  _ = -C;
                  _ < (_ = h[b++].getBoundingClientRect().left) && b < x;

                );
                b < x && b--;
              }
              for (
                w = o[x] = [],
                  f = a ? Math.min(b, x) * u - 0.5 : n % b,
                  p = b === C ? 0 : a ? (x * c) / b - 0.5 : (n / b) | 0,
                  _ = 0,
                  y = C,
                  v = 0;
                v < x;
                v++
              )
                (d = (v % b) - f),
                  (g = p - ((v / b) | 0)),
                  (w[v] = m =
                    l ? Math.abs('y' === l ? g : d) : P(d * d + g * g)),
                  m > _ && (_ = m),
                  m < y && (y = m);
              'random' === n && ae(w),
                (w.max = _ - y),
                (w.min = y),
                (w.v = x =
                  (parseFloat(e.amount) ||
                    parseFloat(e.each) *
                      (b > x
                        ? x - 1
                        : l
                          ? 'y' === l
                            ? x / b
                            : b
                          : Math.max(b, x / b)) ||
                    0) * ('edges' === n ? -1 : 1)),
                (w.b = x < 0 ? i - x : i),
                (w.u = re(e.amount || e.each) || 0),
                (r = r && x < 0 ? Le(r) : r);
            }
            return (
              (x = (w[t] - w.min) / w.max || 0),
              yt(w.b + (r ? r(x) : x) * w.v) + w.u
            );
          }
        );
      },
      ue = function (t) {
        var e = Math.pow(10, ((t + '').split('.')[1] || '').length);
        return function (r) {
          var n = yt(Math.round(parseFloat(r) / t) * t * e);
          return (n - (n % 1)) / e + (L(r) ? 0 : re(r));
        };
      },
      ce = function (t, e) {
        var r,
          n,
          i = V(t);
        return (
          !i &&
            I(t) &&
            ((r = i = t.radius || C),
            t.values
              ? ((t = oe(t.values)), (n = !L(t[0])) && (r *= r))
              : (t = ue(t.increment))),
          te(
            e,
            i
              ? D(t)
                ? function (e) {
                    return (n = t(e)), Math.abs(n - e) <= r ? n : e;
                  }
                : function (e) {
                    for (
                      var i,
                        o,
                        s = parseFloat(n ? e.x : e),
                        a = parseFloat(n ? e.y : 0),
                        l = C,
                        u = 0,
                        c = t.length;
                      c--;

                    )
                      (i = n
                        ? (i = t[c].x - s) * i + (o = t[c].y - a) * o
                        : Math.abs(t[c] - s)) < l && ((l = i), (u = c));
                    return (
                      (u = !r || l <= r ? t[u] : e),
                      n || u === e || L(e) ? u : u + re(e)
                    );
                  }
              : ue(t)
          )
        );
      },
      he = function (t, e, r, n) {
        return te(V(t) ? !e : !0 === r ? !!(r = 0) : !n, function () {
          return V(t)
            ? t[~~(Math.random() * t.length)]
            : (r = r || 1e-5) &&
                (n = r < 1 ? Math.pow(10, (r + '').length - 2) : 1) &&
                Math.floor(
                  Math.round(
                    (t - r / 2 + Math.random() * (e - t + 0.99 * r)) / r
                  ) *
                    r *
                    n
                ) / n;
        });
      },
      fe = function (t, e, r) {
        return te(r, function (r) {
          return t[~~e(r)];
        });
      },
      pe = function (t) {
        for (var e, r, n, i, o = 0, s = ''; ~(e = t.indexOf('random(', o)); )
          (n = t.indexOf(')', e)),
            (i = '[' === t.charAt(e + 7)),
            (r = t.substr(e + 7, n - e - 7).match(i ? G : q)),
            (s +=
              t.substr(o, e - o) +
              he(i ? r : +r[0], i ? 0 : +r[1], +r[2] || 1e-5)),
            (o = n + 1);
        return s + t.substr(o, t.length - o);
      },
      de = function (t, e, r, n, i) {
        var o = e - t,
          s = n - r;
        return te(i, function (e) {
          return r + (((e - t) / o) * s || 0);
        });
      },
      ge = function (t, e, r) {
        var n,
          i,
          o,
          s = t.labels,
          a = C;
        for (n in s)
          (i = s[n] - e) < 0 == !!r &&
            i &&
            a > (i = Math.abs(i)) &&
            ((o = n), (a = i));
        return o;
      },
      me = function (t, e, r) {
        var n,
          i,
          o,
          s = t.vars,
          a = s[e],
          u = l,
          c = t._ctx;
        if (a)
          return (
            (n = s[e + 'Params']),
            (i = s.callbackScope || t),
            r && at.length && wt(),
            c && (l = c),
            (o = n ? a.apply(i, n) : a.call(i)),
            (l = u),
            o
          );
      },
      ve = function (t) {
        return (
          Dt(t),
          t.scrollTrigger && t.scrollTrigger.kill(!!a),
          t.progress() < 1 && me(t, 'onInterrupt'),
          t
        );
      },
      _e = [],
      ye = function (t) {
        if (t)
          if (((t = (!t.name && t.default) || t), B() || t.headless)) {
            var e = t.name,
              r = D(t),
              n =
                e && !r && t.init
                  ? function () {
                      this._props = [];
                    }
                  : t,
              i = {
                init: rt,
                render: cr,
                add: Ge,
                kill: fr,
                modifier: hr,
                rawVars: 0,
              },
              o = {
                targetTest: 0,
                get: 0,
                getSetter: sr,
                aliases: {},
                register: 0,
              };
            if ((Pe(), t !== n)) {
              if (ut[e]) return;
              Mt(n, Mt(Pt(t, i), o)),
                kt(n.prototype, kt(i, Pt(t, o))),
                (ut[(n.prop = e)] = n),
                t.targetTest && (ft.push(n), (st[e] = 1)),
                (e =
                  ('css' === e
                    ? 'CSS'
                    : e.charAt(0).toUpperCase() + e.substr(1)) + 'Plugin');
            }
            et(e, n), t.register && t.register(kr, n, gr);
          } else _e.push(t);
      },
      be = 255,
      xe = {
        aqua: [0, be, be],
        lime: [0, be, 0],
        silver: [192, 192, 192],
        black: [0, 0, 0],
        maroon: [128, 0, 0],
        teal: [0, 128, 128],
        blue: [0, 0, be],
        navy: [0, 0, 128],
        white: [be, be, be],
        olive: [128, 128, 0],
        yellow: [be, be, 0],
        orange: [be, 165, 0],
        gray: [128, 128, 128],
        purple: [128, 0, 128],
        green: [0, 128, 0],
        red: [be, 0, 0],
        pink: [be, 192, 203],
        cyan: [0, be, be],
        transparent: [be, be, be, 0],
      },
      we = function (t, e, r) {
        return (
          ((6 * (t += t < 0 ? 1 : t > 1 ? -1 : 0) < 1
            ? e + (r - e) * t * 6
            : t < 0.5
              ? r
              : 3 * t < 2
                ? e + (r - e) * (2 / 3 - t) * 6
                : e) *
            be +
            0.5) |
          0
        );
      },
      Te = function (t, e, r) {
        var n,
          i,
          o,
          s,
          a,
          l,
          u,
          c,
          h,
          f,
          p = t ? (L(t) ? [t >> 16, (t >> 8) & be, t & be] : 0) : xe.black;
        if (!p) {
          if ((',' === t.substr(-1) && (t = t.substr(0, t.length - 1)), xe[t]))
            p = xe[t];
          else if ('#' === t.charAt(0)) {
            if (
              (t.length < 6 &&
                ((n = t.charAt(1)),
                (i = t.charAt(2)),
                (o = t.charAt(3)),
                (t =
                  '#' +
                  n +
                  n +
                  i +
                  i +
                  o +
                  o +
                  (5 === t.length ? t.charAt(4) + t.charAt(4) : ''))),
              9 === t.length)
            )
              return [
                (p = parseInt(t.substr(1, 6), 16)) >> 16,
                (p >> 8) & be,
                p & be,
                parseInt(t.substr(7), 16) / 255,
              ];
            p = [(t = parseInt(t.substr(1), 16)) >> 16, (t >> 8) & be, t & be];
          } else if ('hsl' === t.substr(0, 3))
            if (((p = f = t.match(q)), e)) {
              if (~t.indexOf('='))
                return (p = t.match(H)), r && p.length < 4 && (p[3] = 1), p;
            } else
              (s = (+p[0] % 360) / 360),
                (a = +p[1] / 100),
                (n =
                  2 * (l = +p[2] / 100) -
                  (i = l <= 0.5 ? l * (a + 1) : l + a - l * a)),
                p.length > 3 && (p[3] *= 1),
                (p[0] = we(s + 1 / 3, n, i)),
                (p[1] = we(s, n, i)),
                (p[2] = we(s - 1 / 3, n, i));
          else p = t.match(q) || xe.transparent;
          p = p.map(Number);
        }
        return (
          e &&
            !f &&
            ((n = p[0] / be),
            (i = p[1] / be),
            (o = p[2] / be),
            (l = ((u = Math.max(n, i, o)) + (c = Math.min(n, i, o))) / 2),
            u === c
              ? (s = a = 0)
              : ((h = u - c),
                (a = l > 0.5 ? h / (2 - u - c) : h / (u + c)),
                (s =
                  u === n
                    ? (i - o) / h + (i < o ? 6 : 0)
                    : u === i
                      ? (o - n) / h + 2
                      : (n - i) / h + 4),
                (s *= 60)),
            (p[0] = ~~(s + 0.5)),
            (p[1] = ~~(100 * a + 0.5)),
            (p[2] = ~~(100 * l + 0.5))),
          r && p.length < 4 && (p[3] = 1),
          p
        );
      },
      Se = function (t) {
        var e = [],
          r = [],
          n = -1;
        return (
          t.split(Ee).forEach(function (t) {
            var i = t.match(U) || [];
            e.push.apply(e, i), r.push((n += i.length + 1));
          }),
          (e.c = r),
          e
        );
      },
      Ce = function (t, e, r) {
        var n,
          i,
          o,
          s,
          a = '',
          l = (t + a).match(Ee),
          u = e ? 'hsla(' : 'rgba(',
          c = 0;
        if (!l) return t;
        if (
          ((l = l.map(function (t) {
            return (
              (t = Te(t, e, 1)) &&
              u +
                (e
                  ? t[0] + ',' + t[1] + '%,' + t[2] + '%,' + t[3]
                  : t.join(',')) +
                ')'
            );
          })),
          r && ((o = Se(t)), (n = r.c).join(a) !== o.c.join(a)))
        )
          for (s = (i = t.replace(Ee, '1').split(U)).length - 1; c < s; c++)
            a +=
              i[c] +
              (~n.indexOf(c)
                ? l.shift() || u + '0,0,0,0)'
                : (o.length ? o : l.length ? l : r).shift());
        if (!i)
          for (s = (i = t.split(Ee)).length - 1; c < s; c++) a += i[c] + l[c];
        return a + i[s];
      },
      Ee = (function () {
        var t,
          e =
            '(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b';
        for (t in xe) e += '|' + t + '\\b';
        return new RegExp(e + ')', 'gi');
      })(),
      Me = /hsl[a]?\(/,
      ke = function (t) {
        var e,
          r = t.join(' ');
        if (((Ee.lastIndex = 0), Ee.test(r)))
          return (
            (e = Me.test(r)),
            (t[1] = Ce(t[1], e)),
            (t[0] = Ce(t[0], e, Se(t[1]))),
            !0
          );
      },
      Ae = (function () {
        var t,
          e,
          r,
          n,
          i,
          o,
          s = Date.now,
          a = 500,
          l = 33,
          u = s(),
          d = u,
          g = 1e3 / 240,
          v = g,
          _ = [],
          y = function r(c) {
            var h,
              f,
              p,
              m,
              y = s() - d,
              b = !0 === c;
            if (
              ((y > a || y < 0) && (u += y - l),
              ((h = (p = (d += y) - u) - v) > 0 || b) &&
                ((m = ++n.frame),
                (i = p - 1e3 * n.time),
                (n.time = p /= 1e3),
                (v += h + (h >= g ? 4 : g - h)),
                (f = 1)),
              b || (t = e(r)),
              f)
            )
              for (o = 0; o < _.length; o++) _[o](p, i, m, c);
          };
        return (n = {
          time: 0,
          frame: 0,
          tick: function () {
            y(!0);
          },
          deltaRatio: function (t) {
            return i / (1e3 / (t || 60));
          },
          wake: function () {
            p &&
              (!h &&
                B() &&
                ((c = h = window),
                (f = c.document || {}),
                (Q.gsap = kr),
                (c.gsapVersions || (c.gsapVersions = [])).push(kr.version),
                K($ || c.GreenSockGlobals || (!c.gsap && c) || {}),
                _e.forEach(ye)),
              (r =
                'undefined' != typeof requestAnimationFrame &&
                requestAnimationFrame),
              t && n.sleep(),
              (e =
                r ||
                function (t) {
                  return setTimeout(t, (v - 1e3 * n.time + 1) | 0);
                }),
              (m = 1),
              y(2));
          },
          sleep: function () {
            (r ? cancelAnimationFrame : clearTimeout)(t), (m = 0), (e = rt);
          },
          lagSmoothing: function (t, e) {
            (a = t || 1 / 0), (l = Math.min(e || 33, a));
          },
          fps: function (t) {
            (g = 1e3 / (t || 240)), (v = 1e3 * n.time + g);
          },
          add: function (t, e, r) {
            var i = e
              ? function (e, r, o, s) {
                  t(e, r, o, s), n.remove(i);
                }
              : t;
            return n.remove(t), _[r ? 'unshift' : 'push'](i), Pe(), i;
          },
          remove: function (t, e) {
            ~(e = _.indexOf(t)) && _.splice(e, 1) && o >= e && o--;
          },
          _listeners: _,
        });
      })(),
      Pe = function () {
        return !m && Ae.wake();
      },
      Oe = {},
      Re = /^[\d.\-M][\d.\-,\s]/,
      ze = /["']/g,
      De = function (t) {
        for (
          var e,
            r,
            n,
            i = {},
            o = t.substr(1, t.length - 3).split(':'),
            s = o[0],
            a = 1,
            l = o.length;
          a < l;
          a++
        )
          (r = o[a]),
            (e = a !== l - 1 ? r.lastIndexOf(',') : r.length),
            (n = r.substr(0, e)),
            (i[s] = isNaN(n) ? n.replace(ze, '').trim() : +n),
            (s = r.substr(e + 1).trim());
        return i;
      },
      Le = function (t) {
        return function (e) {
          return 1 - t(1 - e);
        };
      },
      Ne = function t(e, r) {
        for (var n, i = e._first; i; )
          i instanceof He
            ? t(i, r)
            : !i.vars.yoyoEase ||
              (i._yoyo && i._repeat) ||
              i._yoyo === r ||
              (i.timeline
                ? t(i.timeline, r)
                : ((n = i._ease),
                  (i._ease = i._yEase),
                  (i._yEase = n),
                  (i._yoyo = r))),
            (i = i._next);
      },
      Ie = function (t, e) {
        return (
          (t &&
            (D(t)
              ? t
              : Oe[t] ||
                (function (t) {
                  var e,
                    r,
                    n,
                    i,
                    o = (t + '').split('('),
                    s = Oe[o[0]];
                  return s && o.length > 1 && s.config
                    ? s.config.apply(
                        null,
                        ~t.indexOf('{')
                          ? [De(o[1])]
                          : ((e = t),
                            (r = e.indexOf('(') + 1),
                            (n = e.indexOf(')')),
                            (i = e.indexOf('(', r)),
                            e.substring(
                              r,
                              ~i && i < n ? e.indexOf(')', n + 1) : n
                            ))
                              .split(',')
                              .map(Ct)
                      )
                    : Oe._CE && Re.test(t)
                      ? Oe._CE('', t)
                      : s;
                })(t))) ||
          e
        );
      },
      Fe = function (t, e, r, n) {
        void 0 === r &&
          (r = function (t) {
            return 1 - e(1 - t);
          }),
          void 0 === n &&
            (n = function (t) {
              return t < 0.5 ? e(2 * t) / 2 : 1 - e(2 * (1 - t)) / 2;
            });
        var i,
          o = { easeIn: e, easeOut: r, easeInOut: n };
        return (
          vt(t, function (t) {
            for (var e in ((Oe[t] = Q[t] = o),
            (Oe[(i = t.toLowerCase())] = r),
            o))
              Oe[
                i +
                  ('easeIn' === e
                    ? '.in'
                    : 'easeOut' === e
                      ? '.out'
                      : '.inOut')
              ] = Oe[t + '.' + e] = o[e];
          }),
          o
        );
      },
      Be = function (t) {
        return function (e) {
          return e < 0.5 ? (1 - t(1 - 2 * e)) / 2 : 0.5 + t(2 * (e - 0.5)) / 2;
        };
      },
      Ye = function t(e, r, n) {
        var i = r >= 1 ? r : 1,
          o = (n || (e ? 0.3 : 0.45)) / (r < 1 ? r : 1),
          s = (o / M) * (Math.asin(1 / i) || 0),
          a = function (t) {
            return 1 === t ? 1 : i * Math.pow(2, -10 * t) * R((t - s) * o) + 1;
          },
          l =
            'out' === e
              ? a
              : 'in' === e
                ? function (t) {
                    return 1 - a(1 - t);
                  }
                : Be(a);
        return (
          (o = M / o),
          (l.config = function (r, n) {
            return t(e, r, n);
          }),
          l
        );
      },
      Xe = function t(e, r) {
        void 0 === r && (r = 1.70158);
        var n = function (t) {
            return t ? --t * t * ((r + 1) * t + r) + 1 : 0;
          },
          i =
            'out' === e
              ? n
              : 'in' === e
                ? function (t) {
                    return 1 - n(1 - t);
                  }
                : Be(n);
        return (
          (i.config = function (r) {
            return t(e, r);
          }),
          i
        );
      };
    vt('Linear,Quad,Cubic,Quart,Quint,Strong', function (t, e) {
      var r = e < 5 ? e + 1 : e;
      Fe(
        t + ',Power' + (r - 1),
        e
          ? function (t) {
              return Math.pow(t, r);
            }
          : function (t) {
              return t;
            },
        function (t) {
          return 1 - Math.pow(1 - t, r);
        },
        function (t) {
          return t < 0.5
            ? Math.pow(2 * t, r) / 2
            : 1 - Math.pow(2 * (1 - t), r) / 2;
        }
      );
    }),
      (Oe.Linear.easeNone = Oe.none = Oe.Linear.easeIn),
      Fe('Elastic', Ye('in'), Ye('out'), Ye()),
      (v = 7.5625),
      (b = 2 * (y = 1 / (_ = 2.75))),
      (x = 2.5 * y),
      Fe(
        'Bounce',
        function (t) {
          return 1 - w(1 - t);
        },
        (w = function (t) {
          return t < y
            ? v * t * t
            : t < b
              ? v * Math.pow(t - 1.5 / _, 2) + 0.75
              : t < x
                ? v * (t -= 2.25 / _) * t + 0.9375
                : v * Math.pow(t - 2.625 / _, 2) + 0.984375;
        })
      ),
      Fe('Expo', function (t) {
        return Math.pow(2, 10 * (t - 1)) * t + t * t * t * t * t * t * (1 - t);
      }),
      Fe('Circ', function (t) {
        return -(P(1 - t * t) - 1);
      }),
      Fe('Sine', function (t) {
        return 1 === t ? 1 : 1 - O(t * k);
      }),
      Fe('Back', Xe('in'), Xe('out'), Xe()),
      (Oe.SteppedEase =
        Oe.steps =
        Q.SteppedEase =
          {
            config: function (t, e) {
              void 0 === t && (t = 1);
              var r = 1 / t,
                n = t + (e ? 0 : 1),
                i = e ? 1 : 0;
              return function (t) {
                return (((n * ee(0, 0.99999999, t)) | 0) + i) * r;
              };
            },
          }),
      (S.ease = Oe['quad.out']),
      vt(
        'onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt',
        function (t) {
          return (pt += t + ',' + t + 'Params,');
        }
      );
    var Ve = function (t, e) {
        (this.id = A++),
          (t._gsap = this),
          (this.target = t),
          (this.harness = e),
          (this.get = e ? e.get : mt),
          (this.set = e ? e.getSetter : sr);
      },
      qe = (function () {
        function t(t) {
          (this.vars = t),
            (this._delay = +t.delay || 0),
            (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) &&
              ((this._rDelay = t.repeatDelay || 0),
              (this._yoyo = !!t.yoyo || !!t.yoyoEase)),
            (this._ts = 1),
            Zt(this, +t.duration, 1, 1),
            (this.data = t.data),
            l && ((this._ctx = l), l.data.push(this)),
            m || Ae.wake();
        }
        var e = t.prototype;
        return (
          (e.delay = function (t) {
            return t || 0 === t
              ? (this.parent &&
                  this.parent.smoothChildTiming &&
                  this.startTime(this._start + t - this._delay),
                (this._delay = t),
                this)
              : this._delay;
          }),
          (e.duration = function (t) {
            return arguments.length
              ? this.totalDuration(
                  this._repeat > 0 ? t + (t + this._rDelay) * this._repeat : t
                )
              : this.totalDuration() && this._dur;
          }),
          (e.totalDuration = function (t) {
            return arguments.length
              ? ((this._dirty = 0),
                Zt(
                  this,
                  this._repeat < 0
                    ? t
                    : (t - this._repeat * this._rDelay) / (this._repeat + 1)
                ))
              : this._tDur;
          }),
          (e.totalTime = function (t, e) {
            if ((Pe(), !arguments.length)) return this._tTime;
            var r = this._dp;
            if (r && r.smoothChildTiming && this._ts) {
              for (
                Vt(this, t), !r._dp || r.parent || qt(r, this);
                r && r.parent;

              )
                r.parent._time !==
                  r._start +
                    (r._ts >= 0
                      ? r._tTime / r._ts
                      : (r.totalDuration() - r._tTime) / -r._ts) &&
                  r.totalTime(r._tTime, !0),
                  (r = r.parent);
              !this.parent &&
                this._dp.autoRemoveChildren &&
                ((this._ts > 0 && t < this._tDur) ||
                  (this._ts < 0 && t > 0) ||
                  (!this._tDur && !t)) &&
                Ht(this._dp, this, this._start - this._delay);
            }
            return (
              (this._tTime !== t ||
                (!this._dur && !e) ||
                (this._initted && Math.abs(this._zTime) === E) ||
                (!t && !this._initted && (this.add || this._ptLookup))) &&
                (this._ts || (this._pTime = t), St(this, t, e)),
              this
            );
          }),
          (e.time = function (t, e) {
            return arguments.length
              ? this.totalTime(
                  Math.min(this.totalDuration(), t + Ft(this)) %
                    (this._dur + this._rDelay) || (t ? this._dur : 0),
                  e
                )
              : this._time;
          }),
          (e.totalProgress = function (t, e) {
            return arguments.length
              ? this.totalTime(this.totalDuration() * t, e)
              : this.totalDuration()
                ? Math.min(1, this._tTime / this._tDur)
                : this.rawTime() >= 0 && this._initted
                  ? 1
                  : 0;
          }),
          (e.progress = function (t, e) {
            return arguments.length
              ? this.totalTime(
                  this.duration() *
                    (!this._yoyo || 1 & this.iteration() ? t : 1 - t) +
                    Ft(this),
                  e
                )
              : this.duration()
                ? Math.min(1, this._time / this._dur)
                : this.rawTime() > 0
                  ? 1
                  : 0;
          }),
          (e.iteration = function (t, e) {
            var r = this.duration() + this._rDelay;
            return arguments.length
              ? this.totalTime(this._time + (t - 1) * r, e)
              : this._repeat
                ? Bt(this._tTime, r) + 1
                : 1;
          }),
          (e.timeScale = function (t, e) {
            if (!arguments.length) return -1e-8 === this._rts ? 0 : this._rts;
            if (this._rts === t) return this;
            var r =
              this.parent && this._ts
                ? Yt(this.parent._time, this)
                : this._tTime;
            return (
              (this._rts = +t || 0),
              (this._ts = this._ps || -1e-8 === t ? 0 : this._rts),
              this.totalTime(
                ee(-Math.abs(this._delay), this.totalDuration(), r),
                !1 !== e
              ),
              Xt(this),
              (function (t) {
                for (var e = t.parent; e && e.parent; )
                  (e._dirty = 1), e.totalDuration(), (e = e.parent);
                return t;
              })(this)
            );
          }),
          (e.paused = function (t) {
            return arguments.length
              ? (this._ps !== t &&
                  ((this._ps = t),
                  t
                    ? ((this._pTime =
                        this._tTime || Math.max(-this._delay, this.rawTime())),
                      (this._ts = this._act = 0))
                    : (Pe(),
                      (this._ts = this._rts),
                      this.totalTime(
                        this.parent && !this.parent.smoothChildTiming
                          ? this.rawTime()
                          : this._tTime || this._pTime,
                        1 === this.progress() &&
                          Math.abs(this._zTime) !== E &&
                          (this._tTime -= E)
                      ))),
                this)
              : this._ps;
          }),
          (e.startTime = function (t) {
            if (arguments.length) {
              this._start = t;
              var e = this.parent || this._dp;
              return (
                e && (e._sort || !this.parent) && Ht(e, this, t - this._delay),
                this
              );
            }
            return this._start;
          }),
          (e.endTime = function (t) {
            return (
              this._start +
              (F(t) ? this.totalDuration() : this.duration()) /
                Math.abs(this._ts || 1)
            );
          }),
          (e.rawTime = function (t) {
            var e = this.parent || this._dp;
            return e
              ? t &&
                (!this._ts ||
                  (this._repeat && this._time && this.totalProgress() < 1))
                ? this._tTime % (this._dur + this._rDelay)
                : this._ts
                  ? Yt(e.rawTime(t), this)
                  : this._tTime
              : this._tTime;
          }),
          (e.revert = function (t) {
            void 0 === t && (t = ot);
            var e = a;
            return (
              (a = t),
              Tt(this) &&
                (this.timeline && this.timeline.revert(t),
                this.totalTime(-0.01, t.suppressEvents)),
              'nested' !== this.data && !1 !== t.kill && this.kill(),
              (a = e),
              this
            );
          }),
          (e.globalTime = function (t) {
            for (var e = this, r = arguments.length ? t : e.rawTime(); e; )
              (r = e._start + r / (Math.abs(e._ts) || 1)), (e = e._dp);
            return !this.parent && this._sat ? this._sat.globalTime(t) : r;
          }),
          (e.repeat = function (t) {
            return arguments.length
              ? ((this._repeat = t === 1 / 0 ? -2 : t), Qt(this))
              : -2 === this._repeat
                ? 1 / 0
                : this._repeat;
          }),
          (e.repeatDelay = function (t) {
            if (arguments.length) {
              var e = this._time;
              return (this._rDelay = t), Qt(this), e ? this.time(e) : this;
            }
            return this._rDelay;
          }),
          (e.yoyo = function (t) {
            return arguments.length ? ((this._yoyo = t), this) : this._yoyo;
          }),
          (e.seek = function (t, e) {
            return this.totalTime(Kt(this, t), F(e));
          }),
          (e.restart = function (t, e) {
            return (
              this.play().totalTime(t ? -this._delay : 0, F(e)),
              this._dur || (this._zTime = -1e-8),
              this
            );
          }),
          (e.play = function (t, e) {
            return null != t && this.seek(t, e), this.reversed(!1).paused(!1);
          }),
          (e.reverse = function (t, e) {
            return (
              null != t && this.seek(t || this.totalDuration(), e),
              this.reversed(!0).paused(!1)
            );
          }),
          (e.pause = function (t, e) {
            return null != t && this.seek(t, e), this.paused(!0);
          }),
          (e.resume = function () {
            return this.paused(!1);
          }),
          (e.reversed = function (t) {
            return arguments.length
              ? (!!t !== this.reversed() &&
                  this.timeScale(-this._rts || (t ? -1e-8 : 0)),
                this)
              : this._rts < 0;
          }),
          (e.invalidate = function () {
            return (
              (this._initted = this._act = 0), (this._zTime = -1e-8), this
            );
          }),
          (e.isActive = function () {
            var t,
              e = this.parent || this._dp,
              r = this._start;
            return !(
              e &&
              !(
                this._ts &&
                this._initted &&
                e.isActive() &&
                (t = e.rawTime(!0)) >= r &&
                t < this.endTime(!0) - E
              )
            );
          }),
          (e.eventCallback = function (t, e, r) {
            var n = this.vars;
            return arguments.length > 1
              ? (e
                  ? ((n[t] = e),
                    r && (n[t + 'Params'] = r),
                    'onUpdate' === t && (this._onUpdate = e))
                  : delete n[t],
                this)
              : n[t];
          }),
          (e.then = function (t) {
            var e = this;
            return new Promise(function (r) {
              var n = D(t) ? t : Et,
                i = function () {
                  var t = e.then;
                  (e.then = null),
                    D(n) && (n = n(e)) && (n.then || n === e) && (e.then = t),
                    r(n),
                    (e.then = t);
                };
              (e._initted && 1 === e.totalProgress() && e._ts >= 0) ||
              (!e._tTime && e._ts < 0)
                ? i()
                : (e._prom = i);
            });
          }),
          (e.kill = function () {
            ve(this);
          }),
          t
        );
      })();
    Mt(qe.prototype, {
      _time: 0,
      _start: 0,
      _end: 0,
      _tTime: 0,
      _tDur: 0,
      _dirty: 0,
      _repeat: 0,
      _yoyo: !1,
      parent: null,
      _initted: !1,
      _rDelay: 0,
      _ts: 1,
      _dp: 0,
      ratio: 0,
      _zTime: -1e-8,
      _prom: 0,
      _ps: !1,
      _rts: 1,
    });
    var He = (function (t) {
      function e(e, r) {
        var n;
        return (
          void 0 === e && (e = {}),
          ((n = t.call(this, e) || this).labels = {}),
          (n.smoothChildTiming = !!e.smoothChildTiming),
          (n.autoRemoveChildren = !!e.autoRemoveChildren),
          (n._sort = F(e.sortChildren)),
          u && Ht(e.parent || u, i(n), r),
          e.reversed && n.reverse(),
          e.paused && n.paused(!0),
          e.scrollTrigger && Ut(i(n), e.scrollTrigger),
          n
        );
      }
      o(e, t);
      var r = e.prototype;
      return (
        (r.to = function (t, e, r) {
          return Jt(0, arguments, this), this;
        }),
        (r.from = function (t, e, r) {
          return Jt(1, arguments, this), this;
        }),
        (r.fromTo = function (t, e, r, n) {
          return Jt(2, arguments, this), this;
        }),
        (r.set = function (t, e, r) {
          return (
            (e.duration = 0),
            (e.parent = this),
            Ot(e).repeatDelay || (e.repeat = 0),
            (e.immediateRender = !!e.immediateRender),
            new er(t, e, Kt(this, r), 1),
            this
          );
        }),
        (r.call = function (t, e, r) {
          return Ht(this, er.delayedCall(0, t, e), r);
        }),
        (r.staggerTo = function (t, e, r, n, i, o, s) {
          return (
            (r.duration = e),
            (r.stagger = r.stagger || n),
            (r.onComplete = o),
            (r.onCompleteParams = s),
            (r.parent = this),
            new er(t, r, Kt(this, i)),
            this
          );
        }),
        (r.staggerFrom = function (t, e, r, n, i, o, s) {
          return (
            (r.runBackwards = 1),
            (Ot(r).immediateRender = F(r.immediateRender)),
            this.staggerTo(t, e, r, n, i, o, s)
          );
        }),
        (r.staggerFromTo = function (t, e, r, n, i, o, s, a) {
          return (
            (n.startAt = r),
            (Ot(n).immediateRender = F(n.immediateRender)),
            this.staggerTo(t, e, n, i, o, s, a)
          );
        }),
        (r.render = function (t, e, r) {
          var n,
            i,
            o,
            s,
            l,
            c,
            h,
            f,
            p,
            d,
            g,
            m,
            v = this._time,
            _ = this._dirty ? this.totalDuration() : this._tDur,
            y = this._dur,
            b = t <= 0 ? 0 : yt(t),
            x = this._zTime < 0 != t < 0 && (this._initted || !y);
          if (
            (this !== u && b > _ && t >= 0 && (b = _),
            b !== this._tTime || r || x)
          ) {
            if (
              (v !== this._time &&
                y &&
                ((b += this._time - v), (t += this._time - v)),
              (n = b),
              (p = this._start),
              (c = !(f = this._ts)),
              x && (y || (v = this._zTime), (t || !e) && (this._zTime = t)),
              this._repeat)
            ) {
              if (
                ((g = this._yoyo),
                (l = y + this._rDelay),
                this._repeat < -1 && t < 0)
              )
                return this.totalTime(100 * l + t, e, r);
              if (
                ((n = yt(b % l)),
                b === _
                  ? ((s = this._repeat), (n = y))
                  : ((s = ~~(d = yt(b / l))) && s === d && ((n = y), s--),
                    n > y && (n = y)),
                (d = Bt(this._tTime, l)),
                !v &&
                  this._tTime &&
                  d !== s &&
                  this._tTime - d * l - this._dur <= 0 &&
                  (d = s),
                g && 1 & s && ((n = y - n), (m = 1)),
                s !== d && !this._lock)
              ) {
                var w = g && 1 & d,
                  T = w === (g && 1 & s);
                if (
                  (s < d && (w = !w),
                  (v = w ? 0 : b % y ? y : b),
                  (this._lock = 1),
                  (this.render(v || (m ? 0 : yt(s * l)), e, !y)._lock = 0),
                  (this._tTime = b),
                  !e && this.parent && me(this, 'onRepeat'),
                  this.vars.repeatRefresh &&
                    !m &&
                    (this.invalidate()._lock = 1),
                  (v && v !== this._time) ||
                    c !== !this._ts ||
                    (this.vars.onRepeat && !this.parent && !this._act))
                )
                  return this;
                if (
                  ((y = this._dur),
                  (_ = this._tDur),
                  T &&
                    ((this._lock = 2),
                    (v = w ? y : -1e-4),
                    this.render(v, !0),
                    this.vars.repeatRefresh && !m && this.invalidate()),
                  (this._lock = 0),
                  !this._ts && !c)
                )
                  return this;
                Ne(this, m);
              }
            }
            if (
              (this._hasPause &&
                !this._forcing &&
                this._lock < 2 &&
                ((h = (function (t, e, r) {
                  var n;
                  if (r > e)
                    for (n = t._first; n && n._start <= r; ) {
                      if ('isPause' === n.data && n._start > e) return n;
                      n = n._next;
                    }
                  else
                    for (n = t._last; n && n._start >= r; ) {
                      if ('isPause' === n.data && n._start < e) return n;
                      n = n._prev;
                    }
                })(this, yt(v), yt(n))),
                h && (b -= n - (n = h._start))),
              (this._tTime = b),
              (this._time = n),
              (this._act = !f),
              this._initted ||
                ((this._onUpdate = this.vars.onUpdate),
                (this._initted = 1),
                (this._zTime = t),
                (v = 0)),
              !v && b && !e && !d && (me(this, 'onStart'), this._tTime !== b))
            )
              return this;
            if (n >= v && t >= 0)
              for (i = this._first; i; ) {
                if (
                  ((o = i._next),
                  (i._act || n >= i._start) && i._ts && h !== i)
                ) {
                  if (i.parent !== this) return this.render(t, e, r);
                  if (
                    (i.render(
                      i._ts > 0
                        ? (n - i._start) * i._ts
                        : (i._dirty ? i.totalDuration() : i._tDur) +
                            (n - i._start) * i._ts,
                      e,
                      r
                    ),
                    n !== this._time || (!this._ts && !c))
                  ) {
                    (h = 0), o && (b += this._zTime = -1e-8);
                    break;
                  }
                }
                i = o;
              }
            else {
              i = this._last;
              for (var S = t < 0 ? t : n; i; ) {
                if (
                  ((o = i._prev), (i._act || S <= i._end) && i._ts && h !== i)
                ) {
                  if (i.parent !== this) return this.render(t, e, r);
                  if (
                    (i.render(
                      i._ts > 0
                        ? (S - i._start) * i._ts
                        : (i._dirty ? i.totalDuration() : i._tDur) +
                            (S - i._start) * i._ts,
                      e,
                      r || (a && Tt(i))
                    ),
                    n !== this._time || (!this._ts && !c))
                  ) {
                    (h = 0), o && (b += this._zTime = S ? -1e-8 : E);
                    break;
                  }
                }
                i = o;
              }
            }
            if (
              h &&
              !e &&
              (this.pause(),
              (h.render(n >= v ? 0 : -1e-8)._zTime = n >= v ? 1 : -1),
              this._ts)
            )
              return (this._start = p), Xt(this), this.render(t, e, r);
            this._onUpdate && !e && me(this, 'onUpdate', !0),
              ((b === _ && this._tTime >= this.totalDuration()) ||
                (!b && v)) &&
                ((p !== this._start && Math.abs(f) === Math.abs(this._ts)) ||
                  this._lock ||
                  ((t || !y) &&
                    ((b === _ && this._ts > 0) || (!b && this._ts < 0)) &&
                    Dt(this, 1),
                  e ||
                    (t < 0 && !v) ||
                    (!b && !v && _) ||
                    (me(
                      this,
                      b === _ && t >= 0 ? 'onComplete' : 'onReverseComplete',
                      !0
                    ),
                    this._prom &&
                      !(b < _ && this.timeScale() > 0) &&
                      this._prom())));
          }
          return this;
        }),
        (r.add = function (t, e) {
          var r = this;
          if ((L(e) || (e = Kt(this, e, t)), !(t instanceof qe))) {
            if (V(t))
              return (
                t.forEach(function (t) {
                  return r.add(t, e);
                }),
                this
              );
            if (z(t)) return this.addLabel(t, e);
            if (!D(t)) return this;
            t = er.delayedCall(0, t);
          }
          return this !== t ? Ht(this, t, e) : this;
        }),
        (r.getChildren = function (t, e, r, n) {
          void 0 === t && (t = !0),
            void 0 === e && (e = !0),
            void 0 === r && (r = !0),
            void 0 === n && (n = -C);
          for (var i = [], o = this._first; o; )
            o._start >= n &&
              (o instanceof er
                ? e && i.push(o)
                : (r && i.push(o),
                  t && i.push.apply(i, o.getChildren(!0, e, r)))),
              (o = o._next);
          return i;
        }),
        (r.getById = function (t) {
          for (var e = this.getChildren(1, 1, 1), r = e.length; r--; )
            if (e[r].vars.id === t) return e[r];
        }),
        (r.remove = function (t) {
          return z(t)
            ? this.removeLabel(t)
            : D(t)
              ? this.killTweensOf(t)
              : (t.parent === this && zt(this, t),
                t === this._recent && (this._recent = this._last),
                Lt(this));
        }),
        (r.totalTime = function (e, r) {
          return arguments.length
            ? ((this._forcing = 1),
              !this._dp &&
                this._ts &&
                (this._start = yt(
                  Ae.time -
                    (this._ts > 0
                      ? e / this._ts
                      : (this.totalDuration() - e) / -this._ts)
                )),
              t.prototype.totalTime.call(this, e, r),
              (this._forcing = 0),
              this)
            : this._tTime;
        }),
        (r.addLabel = function (t, e) {
          return (this.labels[t] = Kt(this, e)), this;
        }),
        (r.removeLabel = function (t) {
          return delete this.labels[t], this;
        }),
        (r.addPause = function (t, e, r) {
          var n = er.delayedCall(0, e || rt, r);
          return (
            (n.data = 'isPause'),
            (this._hasPause = 1),
            Ht(this, n, Kt(this, t))
          );
        }),
        (r.removePause = function (t) {
          var e = this._first;
          for (t = Kt(this, t); e; )
            e._start === t && 'isPause' === e.data && Dt(e), (e = e._next);
        }),
        (r.killTweensOf = function (t, e, r) {
          for (var n = this.getTweensOf(t, r), i = n.length; i--; )
            Ue !== n[i] && n[i].kill(t, e);
          return this;
        }),
        (r.getTweensOf = function (t, e) {
          for (var r, n = [], i = oe(t), o = this._first, s = L(e); o; )
            o instanceof er
              ? xt(o._targets, i) &&
                (s
                  ? (!Ue || (o._initted && o._ts)) &&
                    o.globalTime(0) <= e &&
                    o.globalTime(o.totalDuration()) > e
                  : !e || o.isActive()) &&
                n.push(o)
              : (r = o.getTweensOf(i, e)).length && n.push.apply(n, r),
              (o = o._next);
          return n;
        }),
        (r.tweenTo = function (t, e) {
          e = e || {};
          var r,
            n = this,
            i = Kt(n, t),
            o = e,
            s = o.startAt,
            a = o.onStart,
            l = o.onStartParams,
            u = o.immediateRender,
            c = er.to(
              n,
              Mt(
                {
                  ease: e.ease || 'none',
                  lazy: !1,
                  immediateRender: !1,
                  time: i,
                  overwrite: 'auto',
                  duration:
                    e.duration ||
                    Math.abs(
                      (i - (s && 'time' in s ? s.time : n._time)) /
                        n.timeScale()
                    ) ||
                    E,
                  onStart: function () {
                    if ((n.pause(), !r)) {
                      var t =
                        e.duration ||
                        Math.abs(
                          (i - (s && 'time' in s ? s.time : n._time)) /
                            n.timeScale()
                        );
                      c._dur !== t && Zt(c, t, 0, 1).render(c._time, !0, !0),
                        (r = 1);
                    }
                    a && a.apply(c, l || []);
                  },
                },
                e
              )
            );
          return u ? c.render(0) : c;
        }),
        (r.tweenFromTo = function (t, e, r) {
          return this.tweenTo(e, Mt({ startAt: { time: Kt(this, t) } }, r));
        }),
        (r.recent = function () {
          return this._recent;
        }),
        (r.nextLabel = function (t) {
          return void 0 === t && (t = this._time), ge(this, Kt(this, t));
        }),
        (r.previousLabel = function (t) {
          return void 0 === t && (t = this._time), ge(this, Kt(this, t), 1);
        }),
        (r.currentLabel = function (t) {
          return arguments.length
            ? this.seek(t, !0)
            : this.previousLabel(this._time + E);
        }),
        (r.shiftChildren = function (t, e, r) {
          void 0 === r && (r = 0);
          for (var n, i = this._first, o = this.labels; i; )
            i._start >= r && ((i._start += t), (i._end += t)), (i = i._next);
          if (e) for (n in o) o[n] >= r && (o[n] += t);
          return Lt(this);
        }),
        (r.invalidate = function (e) {
          var r = this._first;
          for (this._lock = 0; r; ) r.invalidate(e), (r = r._next);
          return t.prototype.invalidate.call(this, e);
        }),
        (r.clear = function (t) {
          void 0 === t && (t = !0);
          for (var e, r = this._first; r; )
            (e = r._next), this.remove(r), (r = e);
          return (
            this._dp && (this._time = this._tTime = this._pTime = 0),
            t && (this.labels = {}),
            Lt(this)
          );
        }),
        (r.totalDuration = function (t) {
          var e,
            r,
            n,
            i = 0,
            o = this,
            s = o._last,
            a = C;
          if (arguments.length)
            return o.timeScale(
              (o._repeat < 0 ? o.duration() : o.totalDuration()) /
                (o.reversed() ? -t : t)
            );
          if (o._dirty) {
            for (n = o.parent; s; )
              (e = s._prev),
                s._dirty && s.totalDuration(),
                (r = s._start) > a && o._sort && s._ts && !o._lock
                  ? ((o._lock = 1), (Ht(o, s, r - s._delay, 1)._lock = 0))
                  : (a = r),
                r < 0 &&
                  s._ts &&
                  ((i -= r),
                  ((!n && !o._dp) || (n && n.smoothChildTiming)) &&
                    ((o._start += r / o._ts), (o._time -= r), (o._tTime -= r)),
                  o.shiftChildren(-r, !1, -Infinity),
                  (a = 0)),
                s._end > i && s._ts && (i = s._end),
                (s = e);
            Zt(o, o === u && o._time > i ? o._time : i, 1, 1), (o._dirty = 0);
          }
          return o._tDur;
        }),
        (e.updateRoot = function (t) {
          if ((u._ts && (St(u, Yt(t, u)), (d = Ae.frame)), Ae.frame >= ht)) {
            ht += T.autoSleep || 120;
            var e = u._first;
            if ((!e || !e._ts) && T.autoSleep && Ae._listeners.length < 2) {
              for (; e && !e._ts; ) e = e._next;
              e || Ae.sleep();
            }
          }
        }),
        e
      );
    })(qe);
    Mt(He.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 });
    var Ue,
      We,
      je = function (t, e, r, n, i, o, s) {
        var a,
          l,
          u,
          c,
          h,
          f,
          p,
          d,
          g = new gr(this._pt, t, e, 0, 1, ur, null, i),
          m = 0,
          v = 0;
        for (
          g.b = r,
            g.e = n,
            r += '',
            (p = ~(n += '').indexOf('random(')) && (n = pe(n)),
            o && (o((d = [r, n]), t, e), (r = d[0]), (n = d[1])),
            l = r.match(W) || [];
          (a = W.exec(n));

        )
          (c = a[0]),
            (h = n.substring(m, a.index)),
            u ? (u = (u + 1) % 5) : 'rgba(' === h.substr(-5) && (u = 1),
            c !== l[v++] &&
              ((f = parseFloat(l[v - 1]) || 0),
              (g._pt = {
                _next: g._pt,
                p: h || 1 === v ? h : ',',
                s: f,
                c: '=' === c.charAt(1) ? bt(f, c) - f : parseFloat(c) - f,
                m: u && u < 4 ? Math.round : 0,
              }),
              (m = W.lastIndex));
        return (
          (g.c = m < n.length ? n.substring(m, n.length) : ''),
          (g.fp = s),
          (j.test(n) || p) && (g.e = 0),
          (this._pt = g),
          g
        );
      },
      Ge = function (t, e, r, n, i, o, s, a, l, u) {
        D(n) && (n = n(i || 0, t, o));
        var c,
          h = t[e],
          f =
            'get' !== r
              ? r
              : D(h)
                ? l
                  ? t[
                      e.indexOf('set') || !D(t['get' + e.substr(3)])
                        ? e
                        : 'get' + e.substr(3)
                    ](l)
                  : t[e]()
                : h,
          p = D(h) ? (l ? ir : nr) : rr;
        if (
          (z(n) &&
            (~n.indexOf('random(') && (n = pe(n)),
            '=' === n.charAt(1) &&
              ((c = bt(f, n) + (re(f) || 0)) || 0 === c) &&
              (n = c)),
          !u || f !== n || We)
        )
          return isNaN(f * n) || '' === n
            ? (!h && !(e in t) && J(e, n),
              je.call(this, t, e, f, n, p, a || T.stringFilter, l))
            : ((c = new gr(
                this._pt,
                t,
                e,
                +f || 0,
                n - (f || 0),
                'boolean' == typeof h ? lr : ar,
                0,
                p
              )),
              l && (c.fp = l),
              s && c.modifier(s, this, t),
              (this._pt = c));
      },
      Ze = function (t, e, r, n, i, o) {
        var s, a, l, u;
        if (
          ut[t] &&
          !1 !==
            (s = new ut[t]()).init(
              i,
              s.rawVars
                ? e[t]
                : (function (t, e, r, n, i) {
                    if (
                      (D(t) && (t = Ke(t, i, e, r, n)),
                      !I(t) || (t.style && t.nodeType) || V(t) || X(t))
                    )
                      return z(t) ? Ke(t, i, e, r, n) : t;
                    var o,
                      s = {};
                    for (o in t) s[o] = Ke(t[o], i, e, r, n);
                    return s;
                  })(e[t], n, i, o, r),
              r,
              n,
              o
            ) &&
          ((r._pt = a = new gr(r._pt, i, t, 0, 1, s.render, s, 0, s.priority)),
          r !== g)
        )
          for (
            l = r._ptLookup[r._targets.indexOf(i)], u = s._props.length;
            u--;

          )
            l[s._props[u]] = a;
        return s;
      },
      Qe = function t(e, r, n) {
        var i,
          o,
          l,
          c,
          h,
          f,
          p,
          d,
          g,
          m,
          v,
          _,
          y,
          b = e.vars,
          x = b.ease,
          w = b.startAt,
          T = b.immediateRender,
          M = b.lazy,
          k = b.onUpdate,
          A = b.runBackwards,
          P = b.yoyoEase,
          O = b.keyframes,
          R = b.autoRevert,
          z = e._dur,
          D = e._startAt,
          L = e._targets,
          N = e.parent,
          I = N && 'nested' === N.data ? N.vars.targets : L,
          B = 'auto' === e._overwrite && !s,
          Y = e.timeline;
        if (
          (Y && (!O || !x) && (x = 'none'),
          (e._ease = Ie(x, S.ease)),
          (e._yEase = P ? Le(Ie(!0 === P ? x : P, S.ease)) : 0),
          P &&
            e._yoyo &&
            !e._repeat &&
            ((P = e._yEase), (e._yEase = e._ease), (e._ease = P)),
          (e._from = !Y && !!b.runBackwards),
          !Y || (O && !b.stagger))
        ) {
          if (
            ((_ = (d = L[0] ? gt(L[0]).harness : 0) && b[d.prop]),
            (i = Pt(b, st)),
            D &&
              (D._zTime < 0 && D.progress(1),
              r < 0 && A && T && !R
                ? D.render(-1, !0)
                : D.revert(A && z ? it : nt),
              (D._lazy = 0)),
            w)
          ) {
            if (
              (Dt(
                (e._startAt = er.set(
                  L,
                  Mt(
                    {
                      data: 'isStart',
                      overwrite: !1,
                      parent: N,
                      immediateRender: !0,
                      lazy: !D && F(M),
                      startAt: null,
                      delay: 0,
                      onUpdate:
                        k &&
                        function () {
                          return me(e, 'onUpdate');
                        },
                      stagger: 0,
                    },
                    w
                  )
                ))
              ),
              (e._startAt._dp = 0),
              (e._startAt._sat = e),
              r < 0 && (a || (!T && !R)) && e._startAt.revert(it),
              T && z && r <= 0 && n <= 0)
            )
              return void (r && (e._zTime = r));
          } else if (A && z && !D)
            if (
              (r && (T = !1),
              (l = Mt(
                {
                  overwrite: !1,
                  data: 'isFromStart',
                  lazy: T && !D && F(M),
                  immediateRender: T,
                  stagger: 0,
                  parent: N,
                },
                i
              )),
              _ && (l[d.prop] = _),
              Dt((e._startAt = er.set(L, l))),
              (e._startAt._dp = 0),
              (e._startAt._sat = e),
              r < 0 && (a ? e._startAt.revert(it) : e._startAt.render(-1, !0)),
              (e._zTime = r),
              T)
            ) {
              if (!r) return;
            } else t(e._startAt, E, E);
          for (
            e._pt = e._ptCache = 0, M = (z && F(M)) || (M && !z), o = 0;
            o < L.length;
            o++
          ) {
            if (
              ((p = (h = L[o])._gsap || dt(L)[o]._gsap),
              (e._ptLookup[o] = m = {}),
              lt[p.id] && at.length && wt(),
              (v = I === L ? o : I.indexOf(h)),
              d &&
                !1 !== (g = new d()).init(h, _ || i, e, v, I) &&
                ((e._pt = c =
                  new gr(e._pt, h, g.name, 0, 1, g.render, g, 0, g.priority)),
                g._props.forEach(function (t) {
                  m[t] = c;
                }),
                g.priority && (f = 1)),
              !d || _)
            )
              for (l in i)
                ut[l] && (g = Ze(l, i, e, v, h, I))
                  ? g.priority && (f = 1)
                  : (m[l] = c =
                      Ge.call(e, h, l, 'get', i[l], v, I, 0, b.stringFilter));
            e._op && e._op[o] && e.kill(h, e._op[o]),
              B &&
                e._pt &&
                ((Ue = e),
                u.killTweensOf(h, m, e.globalTime(r)),
                (y = !e.parent),
                (Ue = 0)),
              e._pt && M && (lt[p.id] = 1);
          }
          f && dr(e), e._onInit && e._onInit(e);
        }
        (e._onUpdate = k),
          (e._initted = (!e._op || e._pt) && !y),
          O && r <= 0 && Y.render(C, !0, !0);
      },
      $e = function (t, e, r, n) {
        var i,
          o,
          s = e.ease || n || 'power1.inOut';
        if (V(e))
          (o = r[t] || (r[t] = [])),
            e.forEach(function (t, r) {
              return o.push({ t: (r / (e.length - 1)) * 100, v: t, e: s });
            });
        else
          for (i in e)
            (o = r[i] || (r[i] = [])),
              'ease' === i || o.push({ t: parseFloat(t), v: e[i], e: s });
      },
      Ke = function (t, e, r, n, i) {
        return D(t)
          ? t.call(e, r, n, i)
          : z(t) && ~t.indexOf('random(')
            ? pe(t)
            : t;
      },
      Je = pt + 'repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert',
      tr = {};
    vt(Je + ',id,stagger,delay,duration,paused,scrollTrigger', function (t) {
      return (tr[t] = 1);
    });
    var er = (function (t) {
      function e(e, r, n, o) {
        var a;
        'number' == typeof r && ((n.duration = r), (r = n), (n = null));
        var l,
          c,
          h,
          f,
          p,
          d,
          g,
          m,
          v = (a = t.call(this, o ? r : Ot(r)) || this).vars,
          _ = v.duration,
          y = v.delay,
          b = v.immediateRender,
          x = v.stagger,
          w = v.overwrite,
          S = v.keyframes,
          C = v.defaults,
          E = v.scrollTrigger,
          M = v.yoyoEase,
          k = r.parent || u,
          A = (V(e) || X(e) ? L(e[0]) : 'length' in r) ? [e] : oe(e);
        if (
          ((a._targets = A.length
            ? dt(A)
            : tt(
                'GSAP target ' + e + ' not found. https://gsap.com',
                !T.nullTargetWarn
              ) || []),
          (a._ptLookup = []),
          (a._overwrite = w),
          S || x || Y(_) || Y(y))
        ) {
          if (
            ((r = a.vars),
            (l = a.timeline =
              new He({
                data: 'nested',
                defaults: C || {},
                targets: k && 'nested' === k.data ? k.vars.targets : A,
              })).kill(),
            (l.parent = l._dp = i(a)),
            (l._start = 0),
            x || Y(_) || Y(y))
          ) {
            if (((f = A.length), (g = x && le(x)), I(x)))
              for (p in x) ~Je.indexOf(p) && (m || (m = {}), (m[p] = x[p]));
            for (c = 0; c < f; c++)
              ((h = Pt(r, tr)).stagger = 0),
                M && (h.yoyoEase = M),
                m && kt(h, m),
                (d = A[c]),
                (h.duration = +Ke(_, i(a), c, d, A)),
                (h.delay = (+Ke(y, i(a), c, d, A) || 0) - a._delay),
                !x &&
                  1 === f &&
                  h.delay &&
                  ((a._delay = y = h.delay), (a._start += y), (h.delay = 0)),
                l.to(d, h, g ? g(c, d, A) : 0),
                (l._ease = Oe.none);
            l.duration() ? (_ = y = 0) : (a.timeline = 0);
          } else if (S) {
            Ot(Mt(l.vars.defaults, { ease: 'none' })),
              (l._ease = Ie(S.ease || r.ease || 'none'));
            var P,
              O,
              R,
              z = 0;
            if (V(S))
              S.forEach(function (t) {
                return l.to(A, t, '>');
              }),
                l.duration();
            else {
              for (p in ((h = {}), S))
                'ease' === p || 'easeEach' === p || $e(p, S[p], h, S.easeEach);
              for (p in h)
                for (
                  P = h[p].sort(function (t, e) {
                    return t.t - e.t;
                  }),
                    z = 0,
                    c = 0;
                  c < P.length;
                  c++
                )
                  ((R = {
                    ease: (O = P[c]).e,
                    duration: ((O.t - (c ? P[c - 1].t : 0)) / 100) * _,
                  })[p] = O.v),
                    l.to(A, R, z),
                    (z += R.duration);
              l.duration() < _ && l.to({}, { duration: _ - l.duration() });
            }
          }
          _ || a.duration((_ = l.duration()));
        } else a.timeline = 0;
        return (
          !0 !== w || s || ((Ue = i(a)), u.killTweensOf(A), (Ue = 0)),
          Ht(k, i(a), n),
          r.reversed && a.reverse(),
          r.paused && a.paused(!0),
          (b ||
            (!_ &&
              !S &&
              a._start === yt(k._time) &&
              F(b) &&
              It(i(a)) &&
              'nested' !== k.data)) &&
            ((a._tTime = -1e-8), a.render(Math.max(0, -y) || 0)),
          E && Ut(i(a), E),
          a
        );
      }
      o(e, t);
      var r = e.prototype;
      return (
        (r.render = function (t, e, r) {
          var n,
            i,
            o,
            s,
            l,
            u,
            c,
            h,
            f,
            p = this._time,
            d = this._tDur,
            g = this._dur,
            m = t < 0,
            v = t > d - E && !m ? d : t < E ? 0 : t;
          if (g) {
            if (
              v !== this._tTime ||
              !t ||
              r ||
              (!this._initted && this._tTime) ||
              (this._startAt && this._zTime < 0 !== m) ||
              this._lazy
            ) {
              if (((n = v), (h = this.timeline), this._repeat)) {
                if (((s = g + this._rDelay), this._repeat < -1 && m))
                  return this.totalTime(100 * s + t, e, r);
                if (
                  ((n = yt(v % s)),
                  v === d
                    ? ((o = this._repeat), (n = g))
                    : (o = ~~(l = yt(v / s))) && o === l
                      ? ((n = g), o--)
                      : n > g && (n = g),
                  (u = this._yoyo && 1 & o) &&
                    ((f = this._yEase), (n = g - n)),
                  (l = Bt(this._tTime, s)),
                  n === p && !r && this._initted && o === l)
                )
                  return (this._tTime = v), this;
                o !== l &&
                  (h && this._yEase && Ne(h, u),
                  this.vars.repeatRefresh &&
                    !u &&
                    !this._lock &&
                    n !== s &&
                    this._initted &&
                    ((this._lock = r = 1),
                    (this.render(yt(s * o), !0).invalidate()._lock = 0)));
              }
              if (!this._initted) {
                if (Wt(this, m ? t : n, r, e, v))
                  return (this._tTime = 0), this;
                if (
                  !(
                    p === this._time ||
                    (r && this.vars.repeatRefresh && o !== l)
                  )
                )
                  return this;
                if (g !== this._dur) return this.render(t, e, r);
              }
              if (
                ((this._tTime = v),
                (this._time = n),
                !this._act && this._ts && ((this._act = 1), (this._lazy = 0)),
                (this.ratio = c = (f || this._ease)(n / g)),
                this._from && (this.ratio = c = 1 - c),
                !p &&
                  v &&
                  !e &&
                  !l &&
                  (me(this, 'onStart'), this._tTime !== v))
              )
                return this;
              for (i = this._pt; i; ) i.r(c, i.d), (i = i._next);
              (h &&
                h.render(t < 0 ? t : h._dur * h._ease(n / this._dur), e, r)) ||
                (this._startAt && (this._zTime = t)),
                this._onUpdate &&
                  !e &&
                  (m && Nt(this, t, 0, r), me(this, 'onUpdate')),
                this._repeat &&
                  o !== l &&
                  this.vars.onRepeat &&
                  !e &&
                  this.parent &&
                  me(this, 'onRepeat'),
                (v !== this._tDur && v) ||
                  this._tTime !== v ||
                  (m && !this._onUpdate && Nt(this, t, 0, !0),
                  (t || !g) &&
                    ((v === this._tDur && this._ts > 0) ||
                      (!v && this._ts < 0)) &&
                    Dt(this, 1),
                  e ||
                    (m && !p) ||
                    !(v || p || u) ||
                    (me(
                      this,
                      v === d ? 'onComplete' : 'onReverseComplete',
                      !0
                    ),
                    this._prom &&
                      !(v < d && this.timeScale() > 0) &&
                      this._prom()));
            }
          } else
            !(function (t, e, r, n) {
              var i,
                o,
                s,
                l = t.ratio,
                u =
                  e < 0 ||
                  (!e &&
                    ((!t._start && jt(t) && (t._initted || !Gt(t))) ||
                      ((t._ts < 0 || t._dp._ts < 0) && !Gt(t))))
                    ? 0
                    : 1,
                c = t._rDelay,
                h = 0;
              if (
                (c &&
                  t._repeat &&
                  ((h = ee(0, t._tDur, e)),
                  (o = Bt(h, c)),
                  t._yoyo && 1 & o && (u = 1 - u),
                  o !== Bt(t._tTime, c) &&
                    ((l = 1 - u),
                    t.vars.repeatRefresh && t._initted && t.invalidate())),
                u !== l || a || n || t._zTime === E || (!e && t._zTime))
              ) {
                if (!t._initted && Wt(t, e, n, r, h)) return;
                for (
                  s = t._zTime,
                    t._zTime = e || (r ? E : 0),
                    r || (r = e && !s),
                    t.ratio = u,
                    t._from && (u = 1 - u),
                    t._time = 0,
                    t._tTime = h,
                    i = t._pt;
                  i;

                )
                  i.r(u, i.d), (i = i._next);
                e < 0 && Nt(t, e, 0, !0),
                  t._onUpdate && !r && me(t, 'onUpdate'),
                  h && t._repeat && !r && t.parent && me(t, 'onRepeat'),
                  (e >= t._tDur || e < 0) &&
                    t.ratio === u &&
                    (u && Dt(t, 1),
                    r ||
                      a ||
                      (me(t, u ? 'onComplete' : 'onReverseComplete', !0),
                      t._prom && t._prom()));
              } else t._zTime || (t._zTime = e);
            })(this, t, e, r);
          return this;
        }),
        (r.targets = function () {
          return this._targets;
        }),
        (r.invalidate = function (e) {
          return (
            (!e || !this.vars.runBackwards) && (this._startAt = 0),
            (this._pt =
              this._op =
              this._onUpdate =
              this._lazy =
              this.ratio =
                0),
            (this._ptLookup = []),
            this.timeline && this.timeline.invalidate(e),
            t.prototype.invalidate.call(this, e)
          );
        }),
        (r.resetTo = function (t, e, r, n, i) {
          m || Ae.wake(), this._ts || this.play();
          var o = Math.min(
            this._dur,
            (this._dp._time - this._start) * this._ts
          );
          return (
            this._initted || Qe(this, o),
            (function (t, e, r, n, i, o, s, a) {
              var l,
                u,
                c,
                h,
                f = ((t._pt && t._ptCache) || (t._ptCache = {}))[e];
              if (!f)
                for (
                  f = t._ptCache[e] = [],
                    c = t._ptLookup,
                    h = t._targets.length;
                  h--;

                ) {
                  if ((l = c[h][e]) && l.d && l.d._pt)
                    for (l = l.d._pt; l && l.p !== e && l.fp !== e; )
                      l = l._next;
                  if (!l)
                    return (
                      (We = 1),
                      (t.vars[e] = '+=0'),
                      Qe(t, s),
                      (We = 0),
                      a ? tt(e + ' not eligible for reset') : 1
                    );
                  f.push(l);
                }
              for (h = f.length; h--; )
                ((l = (u = f[h])._pt || u).s =
                  (!n && 0 !== n) || i ? l.s + (n || 0) + o * l.c : n),
                  (l.c = r - l.s),
                  u.e && (u.e = _t(r) + re(u.e)),
                  u.b && (u.b = l.s + re(u.b));
            })(this, t, e, r, n, this._ease(o / this._dur), o, i)
              ? this.resetTo(t, e, r, n, 1)
              : (Vt(this, 0),
                this.parent ||
                  Rt(
                    this._dp,
                    this,
                    '_first',
                    '_last',
                    this._dp._sort ? '_start' : 0
                  ),
                this.render(0))
          );
        }),
        (r.kill = function (t, e) {
          if ((void 0 === e && (e = 'all'), !(t || (e && 'all' !== e))))
            return (
              (this._lazy = this._pt = 0),
              this.parent
                ? ve(this)
                : this.scrollTrigger && this.scrollTrigger.kill(!!a),
              this
            );
          if (this.timeline) {
            var r = this.timeline.totalDuration();
            return (
              this.timeline.killTweensOf(t, e, Ue && !0 !== Ue.vars.overwrite)
                ._first || ve(this),
              this.parent &&
                r !== this.timeline.totalDuration() &&
                Zt(this, (this._dur * this.timeline._tDur) / r, 0, 1),
              this
            );
          }
          var n,
            i,
            o,
            s,
            l,
            u,
            c,
            h = this._targets,
            f = t ? oe(t) : h,
            p = this._ptLookup,
            d = this._pt;
          if (
            (!e || 'all' === e) &&
            (function (t, e) {
              for (
                var r = t.length, n = r === e.length;
                n && r-- && t[r] === e[r];

              );
              return r < 0;
            })(h, f)
          )
            return 'all' === e && (this._pt = 0), ve(this);
          for (
            n = this._op = this._op || [],
              'all' !== e &&
                (z(e) &&
                  ((l = {}),
                  vt(e, function (t) {
                    return (l[t] = 1);
                  }),
                  (e = l)),
                (e = (function (t, e) {
                  var r,
                    n,
                    i,
                    o,
                    s = t[0] ? gt(t[0]).harness : 0,
                    a = s && s.aliases;
                  if (!a) return e;
                  for (n in ((r = kt({}, e)), a))
                    if ((n in r))
                      for (i = (o = a[n].split(',')).length; i--; )
                        r[o[i]] = r[n];
                  return r;
                })(h, e))),
              c = h.length;
            c--;

          )
            if (~f.indexOf(h[c]))
              for (l in ((i = p[c]),
              'all' === e
                ? ((n[c] = e), (s = i), (o = {}))
                : ((o = n[c] = n[c] || {}), (s = e)),
              s))
                (u = i && i[l]) &&
                  (('kill' in u.d && !0 !== u.d.kill(l)) || zt(this, u, '_pt'),
                  delete i[l]),
                  'all' !== o && (o[l] = 1);
          return this._initted && !this._pt && d && ve(this), this;
        }),
        (e.to = function (t, r) {
          return new e(t, r, arguments[2]);
        }),
        (e.from = function (t, e) {
          return Jt(1, arguments);
        }),
        (e.delayedCall = function (t, r, n, i) {
          return new e(r, 0, {
            immediateRender: !1,
            lazy: !1,
            overwrite: !1,
            delay: t,
            onComplete: r,
            onReverseComplete: r,
            onCompleteParams: n,
            onReverseCompleteParams: n,
            callbackScope: i,
          });
        }),
        (e.fromTo = function (t, e, r) {
          return Jt(2, arguments);
        }),
        (e.set = function (t, r) {
          return (
            (r.duration = 0), r.repeatDelay || (r.repeat = 0), new e(t, r)
          );
        }),
        (e.killTweensOf = function (t, e, r) {
          return u.killTweensOf(t, e, r);
        }),
        e
      );
    })(qe);
    Mt(er.prototype, {
      _targets: [],
      _lazy: 0,
      _startAt: 0,
      _op: 0,
      _onInit: 0,
    }),
      vt('staggerTo,staggerFrom,staggerFromTo', function (t) {
        er[t] = function () {
          var e = new He(),
            r = ne.call(arguments, 0);
          return (
            r.splice('staggerFromTo' === t ? 5 : 4, 0, 0), e[t].apply(e, r)
          );
        };
      });
    var rr = function (t, e, r) {
        return (t[e] = r);
      },
      nr = function (t, e, r) {
        return t[e](r);
      },
      ir = function (t, e, r, n) {
        return t[e](n.fp, r);
      },
      or = function (t, e, r) {
        return t.setAttribute(e, r);
      },
      sr = function (t, e) {
        return D(t[e]) ? nr : N(t[e]) && t.setAttribute ? or : rr;
      },
      ar = function (t, e) {
        return e.set(e.t, e.p, Math.round(1e6 * (e.s + e.c * t)) / 1e6, e);
      },
      lr = function (t, e) {
        return e.set(e.t, e.p, !!(e.s + e.c * t), e);
      },
      ur = function (t, e) {
        var r = e._pt,
          n = '';
        if (!t && e.b) n = e.b;
        else if (1 === t && e.e) n = e.e;
        else {
          for (; r; )
            (n =
              r.p +
              (r.m
                ? r.m(r.s + r.c * t)
                : Math.round(1e4 * (r.s + r.c * t)) / 1e4) +
              n),
              (r = r._next);
          n += e.c;
        }
        e.set(e.t, e.p, n, e);
      },
      cr = function (t, e) {
        for (var r = e._pt; r; ) r.r(t, r.d), (r = r._next);
      },
      hr = function (t, e, r, n) {
        for (var i, o = this._pt; o; )
          (i = o._next), o.p === n && o.modifier(t, e, r), (o = i);
      },
      fr = function (t) {
        for (var e, r, n = this._pt; n; )
          (r = n._next),
            (n.p === t && !n.op) || n.op === t
              ? zt(this, n, '_pt')
              : n.dep || (e = 1),
            (n = r);
        return !e;
      },
      pr = function (t, e, r, n) {
        n.mSet(t, e, n.m.call(n.tween, r, n.mt), n);
      },
      dr = function (t) {
        for (var e, r, n, i, o = t._pt; o; ) {
          for (e = o._next, r = n; r && r.pr > o.pr; ) r = r._next;
          (o._prev = r ? r._prev : i) ? (o._prev._next = o) : (n = o),
            (o._next = r) ? (r._prev = o) : (i = o),
            (o = e);
        }
        t._pt = n;
      },
      gr = (function () {
        function t(t, e, r, n, i, o, s, a, l) {
          (this.t = e),
            (this.s = n),
            (this.c = i),
            (this.p = r),
            (this.r = o || ar),
            (this.d = s || this),
            (this.set = a || rr),
            (this.pr = l || 0),
            (this._next = t),
            t && (t._prev = this);
        }
        return (
          (t.prototype.modifier = function (t, e, r) {
            (this.mSet = this.mSet || this.set),
              (this.set = pr),
              (this.m = t),
              (this.mt = r),
              (this.tween = e);
          }),
          t
        );
      })();
    vt(
      pt +
        'parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger',
      function (t) {
        return (st[t] = 1);
      }
    ),
      (Q.TweenMax = Q.TweenLite = er),
      (Q.TimelineLite = Q.TimelineMax = He),
      (u = new He({
        sortChildren: !1,
        defaults: S,
        autoRemoveChildren: !0,
        id: 'root',
        smoothChildTiming: !0,
      })),
      (T.stringFilter = ke);
    var mr = [],
      vr = {},
      _r = [],
      yr = 0,
      br = 0,
      xr = function (t) {
        return (vr[t] || _r).map(function (t) {
          return t();
        });
      },
      wr = function () {
        var t = Date.now(),
          e = [];
        t - yr > 2 &&
          (xr('matchMediaInit'),
          mr.forEach(function (t) {
            var r,
              n,
              i,
              o,
              s = t.queries,
              a = t.conditions;
            for (n in s)
              (r = c.matchMedia(s[n]).matches) && (i = 1),
                r !== a[n] && ((a[n] = r), (o = 1));
            o && (t.revert(), i && e.push(t));
          }),
          xr('matchMediaRevert'),
          e.forEach(function (t) {
            return t.onMatch(t, function (e) {
              return t.add(null, e);
            });
          }),
          (yr = t),
          xr('matchMedia'));
      },
      Tr = (function () {
        function t(t, e) {
          (this.selector = e && se(e)),
            (this.data = []),
            (this._r = []),
            (this.isReverted = !1),
            (this.id = br++),
            t && this.add(t);
        }
        var e = t.prototype;
        return (
          (e.add = function (t, e, r) {
            D(t) && ((r = e), (e = t), (t = D));
            var n = this,
              i = function () {
                var t,
                  i = l,
                  o = n.selector;
                return (
                  i && i !== n && i.data.push(n),
                  r && (n.selector = se(r)),
                  (l = n),
                  (t = e.apply(n, arguments)),
                  D(t) && n._r.push(t),
                  (l = i),
                  (n.selector = o),
                  (n.isReverted = !1),
                  t
                );
              };
            return (
              (n.last = i),
              t === D
                ? i(n, function (t) {
                    return n.add(null, t);
                  })
                : t
                  ? (n[t] = i)
                  : i
            );
          }),
          (e.ignore = function (t) {
            var e = l;
            (l = null), t(this), (l = e);
          }),
          (e.getTweens = function () {
            var e = [];
            return (
              this.data.forEach(function (r) {
                return r instanceof t
                  ? e.push.apply(e, r.getTweens())
                  : r instanceof er &&
                      !(r.parent && 'nested' === r.parent.data) &&
                      e.push(r);
              }),
              e
            );
          }),
          (e.clear = function () {
            this._r.length = this.data.length = 0;
          }),
          (e.kill = function (t, e) {
            var r = this;
            if (
              (t
                ? (function () {
                    for (var e, n = r.getTweens(), i = r.data.length; i--; )
                      'isFlip' === (e = r.data[i]).data &&
                        (e.revert(),
                        e.getChildren(!0, !0, !1).forEach(function (t) {
                          return n.splice(n.indexOf(t), 1);
                        }));
                    for (
                      n
                        .map(function (t) {
                          return {
                            g:
                              t._dur ||
                              t._delay ||
                              (t._sat && !t._sat.vars.immediateRender)
                                ? t.globalTime(0)
                                : -1 / 0,
                            t,
                          };
                        })
                        .sort(function (t, e) {
                          return e.g - t.g || -1 / 0;
                        })
                        .forEach(function (e) {
                          return e.t.revert(t);
                        }),
                        i = r.data.length;
                      i--;

                    )
                      (e = r.data[i]) instanceof He
                        ? 'nested' !== e.data &&
                          (e.scrollTrigger && e.scrollTrigger.revert(),
                          e.kill())
                        : !(e instanceof er) && e.revert && e.revert(t);
                    r._r.forEach(function (e) {
                      return e(t, r);
                    }),
                      (r.isReverted = !0);
                  })()
                : this.data.forEach(function (t) {
                    return t.kill && t.kill();
                  }),
              this.clear(),
              e)
            )
              for (var n = mr.length; n--; )
                mr[n].id === this.id && mr.splice(n, 1);
          }),
          (e.revert = function (t) {
            this.kill(t || {});
          }),
          t
        );
      })(),
      Sr = (function () {
        function t(t) {
          (this.contexts = []), (this.scope = t), l && l.data.push(this);
        }
        var e = t.prototype;
        return (
          (e.add = function (t, e, r) {
            I(t) || (t = { matches: t });
            var n,
              i,
              o,
              s = new Tr(0, r || this.scope),
              a = (s.conditions = {});
            for (i in (l && !s.selector && (s.selector = l.selector),
            this.contexts.push(s),
            (e = s.add('onMatch', e)),
            (s.queries = t),
            t))
              'all' === i
                ? (o = 1)
                : (n = c.matchMedia(t[i])) &&
                  (mr.indexOf(s) < 0 && mr.push(s),
                  (a[i] = n.matches) && (o = 1),
                  n.addListener
                    ? n.addListener(wr)
                    : n.addEventListener('change', wr));
            return (
              o &&
                e(s, function (t) {
                  return s.add(null, t);
                }),
              this
            );
          }),
          (e.revert = function (t) {
            this.kill(t || {});
          }),
          (e.kill = function (t) {
            this.contexts.forEach(function (e) {
              return e.kill(t, !0);
            });
          }),
          t
        );
      })(),
      Cr = {
        registerPlugin: function () {
          for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
            e[r] = arguments[r];
          e.forEach(function (t) {
            return ye(t);
          });
        },
        timeline: function (t) {
          return new He(t);
        },
        getTweensOf: function (t, e) {
          return u.getTweensOf(t, e);
        },
        getProperty: function (t, e, r, n) {
          z(t) && (t = oe(t)[0]);
          var i = gt(t || {}).get,
            o = r ? Et : Ct;
          return (
            'native' === r && (r = ''),
            t
              ? e
                ? o(((ut[e] && ut[e].get) || i)(t, e, r, n))
                : function (e, r, n) {
                    return o(((ut[e] && ut[e].get) || i)(t, e, r, n));
                  }
              : t
          );
        },
        quickSetter: function (t, e, r) {
          if ((t = oe(t)).length > 1) {
            var n = t.map(function (t) {
                return kr.quickSetter(t, e, r);
              }),
              i = n.length;
            return function (t) {
              for (var e = i; e--; ) n[e](t);
            };
          }
          t = t[0] || {};
          var o = ut[e],
            s = gt(t),
            a = (s.harness && (s.harness.aliases || {})[e]) || e,
            l = o
              ? function (e) {
                  var n = new o();
                  (g._pt = 0),
                    n.init(t, r ? e + r : e, g, 0, [t]),
                    n.render(1, n),
                    g._pt && cr(1, g);
                }
              : s.set(t, a);
          return o
            ? l
            : function (e) {
                return l(t, a, r ? e + r : e, s, 1);
              };
        },
        quickTo: function (t, e, r) {
          var n,
            i = kr.to(
              t,
              Mt(
                (((n = {})[e] = '+=0.1'), (n.paused = !0), (n.stagger = 0), n),
                r || {}
              )
            ),
            o = function (t, r, n) {
              return i.resetTo(e, t, r, n);
            };
          return (o.tween = i), o;
        },
        isTweening: function (t) {
          return u.getTweensOf(t, !0).length > 0;
        },
        defaults: function (t) {
          return t && t.ease && (t.ease = Ie(t.ease, S.ease)), At(S, t || {});
        },
        config: function (t) {
          return At(T, t || {});
        },
        registerEffect: function (t) {
          var e = t.name,
            r = t.effect,
            n = t.plugins,
            i = t.defaults,
            o = t.extendTimeline;
          (n || '').split(',').forEach(function (t) {
            return (
              t &&
              !ut[t] &&
              !Q[t] &&
              tt(e + ' effect requires ' + t + ' plugin.')
            );
          }),
            (ct[e] = function (t, e, n) {
              return r(oe(t), Mt(e || {}, i), n);
            }),
            o &&
              (He.prototype[e] = function (t, r, n) {
                return this.add(ct[e](t, I(r) ? r : (n = r) && {}, this), n);
              });
        },
        registerEase: function (t, e) {
          Oe[t] = Ie(e);
        },
        parseEase: function (t, e) {
          return arguments.length ? Ie(t, e) : Oe;
        },
        getById: function (t) {
          return u.getById(t);
        },
        exportRoot: function (t, e) {
          void 0 === t && (t = {});
          var r,
            n,
            i = new He(t);
          for (
            i.smoothChildTiming = F(t.smoothChildTiming),
              u.remove(i),
              i._dp = 0,
              i._time = i._tTime = u._time,
              r = u._first;
            r;

          )
            (n = r._next),
              (!e &&
                !r._dur &&
                r instanceof er &&
                r.vars.onComplete === r._targets[0]) ||
                Ht(i, r, r._start - r._delay),
              (r = n);
          return Ht(u, i, 0), i;
        },
        context: function (t, e) {
          return t ? new Tr(t, e) : l;
        },
        matchMedia: function (t) {
          return new Sr(t);
        },
        matchMediaRefresh: function () {
          return (
            mr.forEach(function (t) {
              var e,
                r,
                n = t.conditions;
              for (r in n) n[r] && ((n[r] = !1), (e = 1));
              e && t.revert();
            }) || wr()
          );
        },
        addEventListener: function (t, e) {
          var r = vr[t] || (vr[t] = []);
          ~r.indexOf(e) || r.push(e);
        },
        removeEventListener: function (t, e) {
          var r = vr[t],
            n = r && r.indexOf(e);
          n >= 0 && r.splice(n, 1);
        },
        utils: {
          wrap: function t(e, r, n) {
            var i = r - e;
            return V(e)
              ? fe(e, t(0, e.length), r)
              : te(n, function (t) {
                  return ((i + ((t - e) % i)) % i) + e;
                });
          },
          wrapYoyo: function t(e, r, n) {
            var i = r - e,
              o = 2 * i;
            return V(e)
              ? fe(e, t(0, e.length - 1), r)
              : te(n, function (t) {
                  return (
                    e + ((t = (o + ((t - e) % o)) % o || 0) > i ? o - t : t)
                  );
                });
          },
          distribute: le,
          random: he,
          snap: ce,
          normalize: function (t, e, r) {
            return de(t, e, 0, 1, r);
          },
          getUnit: re,
          clamp: function (t, e, r) {
            return te(r, function (r) {
              return ee(t, e, r);
            });
          },
          splitColor: Te,
          toArray: oe,
          selector: se,
          mapRange: de,
          pipe: function () {
            for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
              e[r] = arguments[r];
            return function (t) {
              return e.reduce(function (t, e) {
                return e(t);
              }, t);
            };
          },
          unitize: function (t, e) {
            return function (r) {
              return t(parseFloat(r)) + (e || re(r));
            };
          },
          interpolate: function t(e, r, n, i) {
            var o = isNaN(e + r)
              ? 0
              : function (t) {
                  return (1 - t) * e + t * r;
                };
            if (!o) {
              var s,
                a,
                l,
                u,
                c,
                h = z(e),
                f = {};
              if ((!0 === n && (i = 1) && (n = null), h))
                (e = { p: e }), (r = { p: r });
              else if (V(e) && !V(r)) {
                for (l = [], u = e.length, c = u - 2, a = 1; a < u; a++)
                  l.push(t(e[a - 1], e[a]));
                u--,
                  (o = function (t) {
                    t *= u;
                    var e = Math.min(c, ~~t);
                    return l[e](t - e);
                  }),
                  (n = r);
              } else i || (e = kt(V(e) ? [] : {}, e));
              if (!l) {
                for (s in r) Ge.call(f, e, s, 'get', r[s]);
                o = function (t) {
                  return cr(t, f) || (h ? e.p : e);
                };
              }
            }
            return te(n, o);
          },
          shuffle: ae,
        },
        install: K,
        effects: ct,
        ticker: Ae,
        updateRoot: He.updateRoot,
        plugins: ut,
        globalTimeline: u,
        core: {
          PropTween: gr,
          globals: et,
          Tween: er,
          Timeline: He,
          Animation: qe,
          getCache: gt,
          _removeLinkedListItem: zt,
          reverting: function () {
            return a;
          },
          context: function (t) {
            return t && l && (l.data.push(t), (t._ctx = l)), l;
          },
          suppressOverwrites: function (t) {
            return (s = t);
          },
        },
      };
    vt('to,from,fromTo,delayedCall,set,killTweensOf', function (t) {
      return (Cr[t] = er[t]);
    }),
      Ae.add(He.updateRoot),
      (g = Cr.to({}, { duration: 0 }));
    var Er = function (t, e) {
        for (var r = t._pt; r && r.p !== e && r.op !== e && r.fp !== e; )
          r = r._next;
        return r;
      },
      Mr = function (t, e) {
        return {
          name: t,
          headless: 1,
          rawVars: 1,
          init: function (t, r, n) {
            n._onInit = function (t) {
              var n, i;
              if (
                (z(r) &&
                  ((n = {}),
                  vt(r, function (t) {
                    return (n[t] = 1);
                  }),
                  (r = n)),
                e)
              ) {
                for (i in ((n = {}), r)) n[i] = e(r[i]);
                r = n;
              }
              !(function (t, e) {
                var r,
                  n,
                  i,
                  o = t._targets;
                for (r in e)
                  for (n = o.length; n--; )
                    (i = t._ptLookup[n][r]) &&
                      (i = i.d) &&
                      (i._pt && (i = Er(i, r)),
                      i && i.modifier && i.modifier(e[r], t, o[n], r));
              })(t, r);
            };
          },
        };
      },
      kr =
        Cr.registerPlugin(
          {
            name: 'attr',
            init: function (t, e, r, n, i) {
              var o, s, a;
              for (o in ((this.tween = r), e))
                (a = t.getAttribute(o) || ''),
                  ((s = this.add(
                    t,
                    'setAttribute',
                    (a || 0) + '',
                    e[o],
                    n,
                    i,
                    0,
                    0,
                    o
                  )).op = o),
                  (s.b = a),
                  this._props.push(o);
            },
            render: function (t, e) {
              for (var r = e._pt; r; )
                a ? r.set(r.t, r.p, r.b, r) : r.r(t, r.d), (r = r._next);
            },
          },
          {
            name: 'endArray',
            headless: 1,
            init: function (t, e) {
              for (var r = e.length; r--; )
                this.add(t, r, t[r] || 0, e[r], 0, 0, 0, 0, 0, 1);
            },
          },
          Mr('roundProps', ue),
          Mr('modifiers'),
          Mr('snap', ce)
        ) || Cr;
    (er.version = He.version = kr.version = '3.13.0'),
      (p = 1),
      B() && Pe(),
      Oe.Power0,
      Oe.Power1,
      Oe.Power2,
      Oe.Power3,
      Oe.Power4,
      Oe.Linear,
      Oe.Quad,
      Oe.Cubic,
      Oe.Quart,
      Oe.Quint,
      Oe.Strong,
      Oe.Elastic,
      Oe.Back,
      Oe.SteppedEase,
      Oe.Bounce,
      Oe.Sine,
      Oe.Expo,
      Oe.Circ;
    var Ar,
      Pr,
      Or,
      Rr,
      zr,
      Dr,
      Lr,
      Nr,
      Ir = {},
      Fr = 180 / Math.PI,
      Br = Math.PI / 180,
      Yr = Math.atan2,
      Xr = /([A-Z])/g,
      Vr = /(left|right|width|margin|padding|x)/i,
      qr = /[\s,\(]\S/,
      Hr = {
        autoAlpha: 'opacity,visibility',
        scale: 'scaleX,scaleY',
        alpha: 'opacity',
      },
      Ur = function (t, e) {
        return e.set(
          e.t,
          e.p,
          Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u,
          e
        );
      },
      Wr = function (t, e) {
        return e.set(
          e.t,
          e.p,
          1 === t ? e.e : Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u,
          e
        );
      },
      jr = function (t, e) {
        return e.set(
          e.t,
          e.p,
          t ? Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u : e.b,
          e
        );
      },
      Gr = function (t, e) {
        var r = e.s + e.c * t;
        e.set(e.t, e.p, ~~(r + (r < 0 ? -0.5 : 0.5)) + e.u, e);
      },
      Zr = function (t, e) {
        return e.set(e.t, e.p, t ? e.e : e.b, e);
      },
      Qr = function (t, e) {
        return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e);
      },
      $r = function (t, e, r) {
        return (t.style[e] = r);
      },
      Kr = function (t, e, r) {
        return t.style.setProperty(e, r);
      },
      Jr = function (t, e, r) {
        return (t._gsap[e] = r);
      },
      tn = function (t, e, r) {
        return (t._gsap.scaleX = t._gsap.scaleY = r);
      },
      en = function (t, e, r, n, i) {
        var o = t._gsap;
        (o.scaleX = o.scaleY = r), o.renderTransform(i, o);
      },
      rn = function (t, e, r, n, i) {
        var o = t._gsap;
        (o[e] = r), o.renderTransform(i, o);
      },
      nn = 'transform',
      on = nn + 'Origin',
      sn = function t(e, r) {
        var n = this,
          i = this.target,
          o = i.style,
          s = i._gsap;
        if (e in Ir && o) {
          if (((this.tfm = this.tfm || {}), 'transform' === e))
            return Hr.transform.split(',').forEach(function (e) {
              return t.call(n, e, r);
            });
          if (
            (~(e = Hr[e] || e).indexOf(',')
              ? e.split(',').forEach(function (t) {
                  return (n.tfm[t] = Sn(i, t));
                })
              : (this.tfm[e] = s.x ? s[e] : Sn(i, e)),
            e === on && (this.tfm.zOrigin = s.zOrigin),
            this.props.indexOf(nn) >= 0)
          )
            return;
          s.svg &&
            ((this.svgo = i.getAttribute('data-svg-origin')),
            this.props.push(on, r, '')),
            (e = nn);
        }
        (o || r) && this.props.push(e, r, o[e]);
      },
      an = function (t) {
        t.translate &&
          (t.removeProperty('translate'),
          t.removeProperty('scale'),
          t.removeProperty('rotate'));
      },
      ln = function () {
        var t,
          e,
          r = this.props,
          n = this.target,
          i = n.style,
          o = n._gsap;
        for (t = 0; t < r.length; t += 3)
          r[t + 1]
            ? 2 === r[t + 1]
              ? n[r[t]](r[t + 2])
              : (n[r[t]] = r[t + 2])
            : r[t + 2]
              ? (i[r[t]] = r[t + 2])
              : i.removeProperty(
                  '--' === r[t].substr(0, 2)
                    ? r[t]
                    : r[t].replace(Xr, '-$1').toLowerCase()
                );
        if (this.tfm) {
          for (e in this.tfm) o[e] = this.tfm[e];
          o.svg &&
            (o.renderTransform(),
            n.setAttribute('data-svg-origin', this.svgo || '')),
            ((t = Lr()) && t.isStart) ||
              i[nn] ||
              (an(i),
              o.zOrigin &&
                i[on] &&
                ((i[on] += ' ' + o.zOrigin + 'px'),
                (o.zOrigin = 0),
                o.renderTransform()),
              (o.uncache = 1));
        }
      },
      un = function (t, e) {
        var r = { target: t, props: [], revert: ln, save: sn };
        return (
          t._gsap || kr.core.getCache(t),
          e &&
            t.style &&
            t.nodeType &&
            e.split(',').forEach(function (t) {
              return r.save(t);
            }),
          r
        );
      },
      cn = function (t, e) {
        var r = Pr.createElementNS
          ? Pr.createElementNS(
              (e || 'http://www.w3.org/1999/xhtml').replace(/^https/, 'http'),
              t
            )
          : Pr.createElement(t);
        return r && r.style ? r : Pr.createElement(t);
      },
      hn = function t(e, r, n) {
        var i = getComputedStyle(e);
        return (
          i[r] ||
          i.getPropertyValue(r.replace(Xr, '-$1').toLowerCase()) ||
          i.getPropertyValue(r) ||
          (!n && t(e, pn(r) || r, 1)) ||
          ''
        );
      },
      fn = 'O,Moz,ms,Ms,Webkit'.split(','),
      pn = function (t, e, r) {
        var n = (e || zr).style,
          i = 5;
        if (t in n && !r) return t;
        for (
          t = t.charAt(0).toUpperCase() + t.substr(1);
          i-- && !(fn[i] + t in n);

        );
        return i < 0 ? null : (3 === i ? 'ms' : i >= 0 ? fn[i] : '') + t;
      },
      dn = function () {
        'undefined' != typeof window &&
          window.document &&
          ((Ar = window),
          (Pr = Ar.document),
          (Or = Pr.documentElement),
          (zr = cn('div') || { style: {} }),
          cn('div'),
          (nn = pn(nn)),
          (on = nn + 'Origin'),
          (zr.style.cssText =
            'border-width:0;line-height:0;position:absolute;padding:0'),
          (Nr = !!pn('perspective')),
          (Lr = kr.core.reverting),
          (Rr = 1));
      },
      gn = function (t) {
        var e,
          r = t.ownerSVGElement,
          n = cn(
            'svg',
            (r && r.getAttribute('xmlns')) || 'http://www.w3.org/2000/svg'
          ),
          i = t.cloneNode(!0);
        (i.style.display = 'block'), n.appendChild(i), Or.appendChild(n);
        try {
          e = i.getBBox();
        } catch (t) {}
        return n.removeChild(i), Or.removeChild(n), e;
      },
      mn = function (t, e) {
        for (var r = e.length; r--; )
          if (t.hasAttribute(e[r])) return t.getAttribute(e[r]);
      },
      vn = function (t) {
        var e, r;
        try {
          e = t.getBBox();
        } catch (n) {
          (e = gn(t)), (r = 1);
        }
        return (
          (e && (e.width || e.height)) || r || (e = gn(t)),
          !e || e.width || e.x || e.y
            ? e
            : {
                x: +mn(t, ['x', 'cx', 'x1']) || 0,
                y: +mn(t, ['y', 'cy', 'y1']) || 0,
                width: 0,
                height: 0,
              }
        );
      },
      _n = function (t) {
        return !(!t.getCTM || (t.parentNode && !t.ownerSVGElement) || !vn(t));
      },
      yn = function (t, e) {
        if (e) {
          var r,
            n = t.style;
          e in Ir && e !== on && (e = nn),
            n.removeProperty
              ? (('ms' !== (r = e.substr(0, 2)) &&
                  'webkit' !== e.substr(0, 6)) ||
                  (e = '-' + e),
                n.removeProperty(
                  '--' === r ? e : e.replace(Xr, '-$1').toLowerCase()
                ))
              : n.removeAttribute(e);
        }
      },
      bn = function (t, e, r, n, i, o) {
        var s = new gr(t._pt, e, r, 0, 1, o ? Qr : Zr);
        return (t._pt = s), (s.b = n), (s.e = i), t._props.push(r), s;
      },
      xn = { deg: 1, rad: 1, turn: 1 },
      wn = { grid: 1, flex: 1 },
      Tn = function t(e, r, n, i) {
        var o,
          s,
          a,
          l,
          u = parseFloat(n) || 0,
          c = (n + '').trim().substr((u + '').length) || 'px',
          h = zr.style,
          f = Vr.test(r),
          p = 'svg' === e.tagName.toLowerCase(),
          d = (p ? 'client' : 'offset') + (f ? 'Width' : 'Height'),
          g = 100,
          m = 'px' === i,
          v = '%' === i;
        if (i === c || !u || xn[i] || xn[c]) return u;
        if (
          ('px' !== c && !m && (u = t(e, r, n, 'px')),
          (l = e.getCTM && _n(e)),
          (v || '%' === c) && (Ir[r] || ~r.indexOf('adius')))
        )
          return (
            (o = l ? e.getBBox()[f ? 'width' : 'height'] : e[d]),
            _t(v ? (u / o) * g : (u / 100) * o)
          );
        if (
          ((h[f ? 'width' : 'height'] = g + (m ? c : i)),
          (s =
            ('rem' !== i && ~r.indexOf('adius')) ||
            ('em' === i && e.appendChild && !p)
              ? e
              : e.parentNode),
          l && (s = (e.ownerSVGElement || {}).parentNode),
          (s && s !== Pr && s.appendChild) || (s = Pr.body),
          (a = s._gsap) &&
            v &&
            a.width &&
            f &&
            a.time === Ae.time &&
            !a.uncache)
        )
          return _t((u / a.width) * g);
        if (!v || ('height' !== r && 'width' !== r))
          (v || '%' === c) &&
            !wn[hn(s, 'display')] &&
            (h.position = hn(e, 'position')),
            s === e && (h.position = 'static'),
            s.appendChild(zr),
            (o = zr[d]),
            s.removeChild(zr),
            (h.position = 'absolute');
        else {
          var _ = e.style[r];
          (e.style[r] = g + i), (o = e[d]), _ ? (e.style[r] = _) : yn(e, r);
        }
        return (
          f && v && (((a = gt(s)).time = Ae.time), (a.width = s[d])),
          _t(m ? (o * u) / g : o && u ? (g / o) * u : 0)
        );
      },
      Sn = function (t, e, r, n) {
        var i;
        return (
          Rr || dn(),
          e in Hr &&
            'transform' !== e &&
            ~(e = Hr[e]).indexOf(',') &&
            (e = e.split(',')[0]),
          Ir[e] && 'transform' !== e
            ? ((i = Ln(t, n)),
              (i =
                'transformOrigin' !== e
                  ? i[e]
                  : i.svg
                    ? i.origin
                    : Nn(hn(t, on)) + ' ' + i.zOrigin + 'px'))
            : (!(i = t.style[e]) ||
                'auto' === i ||
                n ||
                ~(i + '').indexOf('calc(')) &&
              (i =
                (kn[e] && kn[e](t, e, r)) ||
                hn(t, e) ||
                mt(t, e) ||
                ('opacity' === e ? 1 : 0)),
          r && !~(i + '').trim().indexOf(' ') ? Tn(t, e, i, r) + r : i
        );
      },
      Cn = function (t, e, r, n) {
        if (!r || 'none' === r) {
          var i = pn(e, t, 1),
            o = i && hn(t, i, 1);
          o && o !== r
            ? ((e = i), (r = o))
            : 'borderColor' === e && (r = hn(t, 'borderTopColor'));
        }
        var s,
          a,
          l,
          u,
          c,
          h,
          f,
          p,
          d,
          g,
          m,
          v = new gr(this._pt, t.style, e, 0, 1, ur),
          _ = 0,
          y = 0;
        if (
          ((v.b = r),
          (v.e = n),
          (r += ''),
          'var(--' === (n += '').substring(0, 6) &&
            (n = hn(t, n.substring(4, n.indexOf(')')))),
          'auto' === n &&
            ((h = t.style[e]),
            (t.style[e] = n),
            (n = hn(t, e) || n),
            h ? (t.style[e] = h) : yn(t, e)),
          ke((s = [r, n])),
          (n = s[1]),
          (l = (r = s[0]).match(U) || []),
          (n.match(U) || []).length)
        ) {
          for (; (a = U.exec(n)); )
            (f = a[0]),
              (d = n.substring(_, a.index)),
              c
                ? (c = (c + 1) % 5)
                : ('rgba(' !== d.substr(-5) && 'hsla(' !== d.substr(-5)) ||
                  (c = 1),
              f !== (h = l[y++] || '') &&
                ((u = parseFloat(h) || 0),
                (m = h.substr((u + '').length)),
                '=' === f.charAt(1) && (f = bt(u, f) + m),
                (p = parseFloat(f)),
                (g = f.substr((p + '').length)),
                (_ = U.lastIndex - g.length),
                g ||
                  ((g = g || T.units[e] || m),
                  _ === n.length && ((n += g), (v.e += g))),
                m !== g && (u = Tn(t, e, h, g) || 0),
                (v._pt = {
                  _next: v._pt,
                  p: d || 1 === y ? d : ',',
                  s: u,
                  c: p - u,
                  m: (c && c < 4) || 'zIndex' === e ? Math.round : 0,
                }));
          v.c = _ < n.length ? n.substring(_, n.length) : '';
        } else v.r = 'display' === e && 'none' === n ? Qr : Zr;
        return j.test(n) && (v.e = 0), (this._pt = v), v;
      },
      En = {
        top: '0%',
        bottom: '100%',
        left: '0%',
        right: '100%',
        center: '50%',
      },
      Mn = function (t, e) {
        if (e.tween && e.tween._time === e.tween._dur) {
          var r,
            n,
            i,
            o = e.t,
            s = o.style,
            a = e.u,
            l = o._gsap;
          if ('all' === a || !0 === a) (s.cssText = ''), (n = 1);
          else
            for (i = (a = a.split(',')).length; --i > -1; )
              (r = a[i]),
                Ir[r] && ((n = 1), (r = 'transformOrigin' === r ? on : nn)),
                yn(o, r);
          n &&
            (yn(o, nn),
            l &&
              (l.svg && o.removeAttribute('transform'),
              (s.scale = s.rotate = s.translate = 'none'),
              Ln(o, 1),
              (l.uncache = 1),
              an(s)));
        }
      },
      kn = {
        clearProps: function (t, e, r, n, i) {
          if ('isFromStart' !== i.data) {
            var o = (t._pt = new gr(t._pt, e, r, 0, 0, Mn));
            return (o.u = n), (o.pr = -10), (o.tween = i), t._props.push(r), 1;
          }
        },
      },
      An = [1, 0, 0, 1, 0, 0],
      Pn = {},
      On = function (t) {
        return 'matrix(1, 0, 0, 1, 0, 0)' === t || 'none' === t || !t;
      },
      Rn = function (t) {
        var e = hn(t, nn);
        return On(e) ? An : e.substr(7).match(H).map(_t);
      },
      zn = function (t, e) {
        var r,
          n,
          i,
          o,
          s = t._gsap || gt(t),
          a = t.style,
          l = Rn(t);
        return s.svg && t.getAttribute('transform')
          ? '1,0,0,1,0,0' ===
            (l = [
              (i = t.transform.baseVal.consolidate().matrix).a,
              i.b,
              i.c,
              i.d,
              i.e,
              i.f,
            ]).join(',')
            ? An
            : l
          : (l !== An ||
              t.offsetParent ||
              t === Or ||
              s.svg ||
              ((i = a.display),
              (a.display = 'block'),
              ((r = t.parentNode) &&
                (t.offsetParent || t.getBoundingClientRect().width)) ||
                ((o = 1), (n = t.nextElementSibling), Or.appendChild(t)),
              (l = Rn(t)),
              i ? (a.display = i) : yn(t, 'display'),
              o &&
                (n
                  ? r.insertBefore(t, n)
                  : r
                    ? r.appendChild(t)
                    : Or.removeChild(t))),
            e && l.length > 6 ? [l[0], l[1], l[4], l[5], l[12], l[13]] : l);
      },
      Dn = function (t, e, r, n, i, o) {
        var s,
          a,
          l,
          u = t._gsap,
          c = i || zn(t, !0),
          h = u.xOrigin || 0,
          f = u.yOrigin || 0,
          p = u.xOffset || 0,
          d = u.yOffset || 0,
          g = c[0],
          m = c[1],
          v = c[2],
          _ = c[3],
          y = c[4],
          b = c[5],
          x = e.split(' '),
          w = parseFloat(x[0]) || 0,
          T = parseFloat(x[1]) || 0;
        r
          ? c !== An &&
            (a = g * _ - m * v) &&
            ((l = w * (-m / a) + T * (g / a) - (g * b - m * y) / a),
            (w = w * (_ / a) + T * (-v / a) + (v * b - _ * y) / a),
            (T = l))
          : ((w =
              (s = vn(t)).x + (~x[0].indexOf('%') ? (w / 100) * s.width : w)),
            (T =
              s.y +
              (~(x[1] || x[0]).indexOf('%') ? (T / 100) * s.height : T))),
          n || (!1 !== n && u.smooth)
            ? ((y = w - h),
              (b = T - f),
              (u.xOffset = p + (y * g + b * v) - y),
              (u.yOffset = d + (y * m + b * _) - b))
            : (u.xOffset = u.yOffset = 0),
          (u.xOrigin = w),
          (u.yOrigin = T),
          (u.smooth = !!n),
          (u.origin = e),
          (u.originIsAbsolute = !!r),
          (t.style[on] = '0px 0px'),
          o &&
            (bn(o, u, 'xOrigin', h, w),
            bn(o, u, 'yOrigin', f, T),
            bn(o, u, 'xOffset', p, u.xOffset),
            bn(o, u, 'yOffset', d, u.yOffset)),
          t.setAttribute('data-svg-origin', w + ' ' + T);
      },
      Ln = function (t, e) {
        var r = t._gsap || new Ve(t);
        if ('x' in r && !e && !r.uncache) return r;
        var n,
          i,
          o,
          s,
          a,
          l,
          u,
          c,
          h,
          f,
          p,
          d,
          g,
          m,
          v,
          _,
          y,
          b,
          x,
          w,
          S,
          C,
          E,
          M,
          k,
          A,
          P,
          O,
          R,
          z,
          D,
          L,
          N = t.style,
          I = r.scaleX < 0,
          F = 'px',
          B = 'deg',
          Y = getComputedStyle(t),
          X = hn(t, on) || '0';
        return (
          (n = i = o = l = u = c = h = f = p = 0),
          (s = a = 1),
          (r.svg = !(!t.getCTM || !_n(t))),
          Y.translate &&
            (('none' === Y.translate &&
              'none' === Y.scale &&
              'none' === Y.rotate) ||
              (N[nn] =
                ('none' !== Y.translate
                  ? 'translate3d(' +
                    (Y.translate + ' 0 0').split(' ').slice(0, 3).join(', ') +
                    ') '
                  : '') +
                ('none' !== Y.rotate ? 'rotate(' + Y.rotate + ') ' : '') +
                ('none' !== Y.scale
                  ? 'scale(' + Y.scale.split(' ').join(',') + ') '
                  : '') +
                ('none' !== Y[nn] ? Y[nn] : '')),
            (N.scale = N.rotate = N.translate = 'none')),
          (m = zn(t, r.svg)),
          r.svg &&
            (r.uncache
              ? ((k = t.getBBox()),
                (X = r.xOrigin - k.x + 'px ' + (r.yOrigin - k.y) + 'px'),
                (M = ''))
              : (M = !e && t.getAttribute('data-svg-origin')),
            Dn(t, M || X, !!M || r.originIsAbsolute, !1 !== r.smooth, m)),
          (d = r.xOrigin || 0),
          (g = r.yOrigin || 0),
          m !== An &&
            ((b = m[0]),
            (x = m[1]),
            (w = m[2]),
            (S = m[3]),
            (n = C = m[4]),
            (i = E = m[5]),
            6 === m.length
              ? ((s = Math.sqrt(b * b + x * x)),
                (a = Math.sqrt(S * S + w * w)),
                (l = b || x ? Yr(x, b) * Fr : 0),
                (h = w || S ? Yr(w, S) * Fr + l : 0) &&
                  (a *= Math.abs(Math.cos(h * Br))),
                r.svg &&
                  ((n -= d - (d * b + g * w)), (i -= g - (d * x + g * S))))
              : ((L = m[6]),
                (z = m[7]),
                (P = m[8]),
                (O = m[9]),
                (R = m[10]),
                (D = m[11]),
                (n = m[12]),
                (i = m[13]),
                (o = m[14]),
                (u = (v = Yr(L, R)) * Fr),
                v &&
                  ((M = C * (_ = Math.cos(-v)) + P * (y = Math.sin(-v))),
                  (k = E * _ + O * y),
                  (A = L * _ + R * y),
                  (P = C * -y + P * _),
                  (O = E * -y + O * _),
                  (R = L * -y + R * _),
                  (D = z * -y + D * _),
                  (C = M),
                  (E = k),
                  (L = A)),
                (c = (v = Yr(-w, R)) * Fr),
                v &&
                  ((_ = Math.cos(-v)),
                  (D = S * (y = Math.sin(-v)) + D * _),
                  (b = M = b * _ - P * y),
                  (x = k = x * _ - O * y),
                  (w = A = w * _ - R * y)),
                (l = (v = Yr(x, b)) * Fr),
                v &&
                  ((M = b * (_ = Math.cos(v)) + x * (y = Math.sin(v))),
                  (k = C * _ + E * y),
                  (x = x * _ - b * y),
                  (E = E * _ - C * y),
                  (b = M),
                  (C = k)),
                u &&
                  Math.abs(u) + Math.abs(l) > 359.9 &&
                  ((u = l = 0), (c = 180 - c)),
                (s = _t(Math.sqrt(b * b + x * x + w * w))),
                (a = _t(Math.sqrt(E * E + L * L))),
                (v = Yr(C, E)),
                (h = Math.abs(v) > 2e-4 ? v * Fr : 0),
                (p = D ? 1 / (D < 0 ? -D : D) : 0)),
            r.svg &&
              ((M = t.getAttribute('transform')),
              (r.forceCSS = t.setAttribute('transform', '') || !On(hn(t, nn))),
              M && t.setAttribute('transform', M))),
          Math.abs(h) > 90 &&
            Math.abs(h) < 270 &&
            (I
              ? ((s *= -1),
                (h += l <= 0 ? 180 : -180),
                (l += l <= 0 ? 180 : -180))
              : ((a *= -1), (h += h <= 0 ? 180 : -180))),
          (e = e || r.uncache),
          (r.x =
            n -
            ((r.xPercent =
              n &&
              ((!e && r.xPercent) ||
                (Math.round(t.offsetWidth / 2) === Math.round(-n) ? -50 : 0)))
              ? (t.offsetWidth * r.xPercent) / 100
              : 0) +
            F),
          (r.y =
            i -
            ((r.yPercent =
              i &&
              ((!e && r.yPercent) ||
                (Math.round(t.offsetHeight / 2) === Math.round(-i) ? -50 : 0)))
              ? (t.offsetHeight * r.yPercent) / 100
              : 0) +
            F),
          (r.z = o + F),
          (r.scaleX = _t(s)),
          (r.scaleY = _t(a)),
          (r.rotation = _t(l) + B),
          (r.rotationX = _t(u) + B),
          (r.rotationY = _t(c) + B),
          (r.skewX = h + B),
          (r.skewY = f + B),
          (r.transformPerspective = p + F),
          (r.zOrigin =
            parseFloat(X.split(' ')[2]) || (!e && r.zOrigin) || 0) &&
            (N[on] = Nn(X)),
          (r.xOffset = r.yOffset = 0),
          (r.force3D = T.force3D),
          (r.renderTransform = r.svg ? qn : Nr ? Vn : Fn),
          (r.uncache = 0),
          r
        );
      },
      Nn = function (t) {
        return (t = t.split(' '))[0] + ' ' + t[1];
      },
      In = function (t, e, r) {
        var n = re(e);
        return _t(parseFloat(e) + parseFloat(Tn(t, 'x', r + 'px', n))) + n;
      },
      Fn = function (t, e) {
        (e.z = '0px'),
          (e.rotationY = e.rotationX = '0deg'),
          (e.force3D = 0),
          Vn(t, e);
      },
      Bn = '0deg',
      Yn = '0px',
      Xn = ') ',
      Vn = function (t, e) {
        var r = e || this,
          n = r.xPercent,
          i = r.yPercent,
          o = r.x,
          s = r.y,
          a = r.z,
          l = r.rotation,
          u = r.rotationY,
          c = r.rotationX,
          h = r.skewX,
          f = r.skewY,
          p = r.scaleX,
          d = r.scaleY,
          g = r.transformPerspective,
          m = r.force3D,
          v = r.target,
          _ = r.zOrigin,
          y = '',
          b = ('auto' === m && t && 1 !== t) || !0 === m;
        if (_ && (c !== Bn || u !== Bn)) {
          var x,
            w = parseFloat(u) * Br,
            T = Math.sin(w),
            S = Math.cos(w);
          (w = parseFloat(c) * Br),
            (x = Math.cos(w)),
            (o = In(v, o, T * x * -_)),
            (s = In(v, s, -Math.sin(w) * -_)),
            (a = In(v, a, S * x * -_ + _));
        }
        g !== Yn && (y += 'perspective(' + g + Xn),
          (n || i) && (y += 'translate(' + n + '%, ' + i + '%) '),
          (b || o !== Yn || s !== Yn || a !== Yn) &&
            (y +=
              a !== Yn || b
                ? 'translate3d(' + o + ', ' + s + ', ' + a + ') '
                : 'translate(' + o + ', ' + s + Xn),
          l !== Bn && (y += 'rotate(' + l + Xn),
          u !== Bn && (y += 'rotateY(' + u + Xn),
          c !== Bn && (y += 'rotateX(' + c + Xn),
          (h === Bn && f === Bn) || (y += 'skew(' + h + ', ' + f + Xn),
          (1 === p && 1 === d) || (y += 'scale(' + p + ', ' + d + Xn),
          (v.style[nn] = y || 'translate(0, 0)');
      },
      qn = function (t, e) {
        var r,
          n,
          i,
          o,
          s,
          a = e || this,
          l = a.xPercent,
          u = a.yPercent,
          c = a.x,
          h = a.y,
          f = a.rotation,
          p = a.skewX,
          d = a.skewY,
          g = a.scaleX,
          m = a.scaleY,
          v = a.target,
          _ = a.xOrigin,
          y = a.yOrigin,
          b = a.xOffset,
          x = a.yOffset,
          w = a.forceCSS,
          T = parseFloat(c),
          S = parseFloat(h);
        (f = parseFloat(f)),
          (p = parseFloat(p)),
          (d = parseFloat(d)) && ((p += d = parseFloat(d)), (f += d)),
          f || p
            ? ((f *= Br),
              (p *= Br),
              (r = Math.cos(f) * g),
              (n = Math.sin(f) * g),
              (i = Math.sin(f - p) * -m),
              (o = Math.cos(f - p) * m),
              p &&
                ((d *= Br),
                (s = Math.tan(p - d)),
                (i *= s = Math.sqrt(1 + s * s)),
                (o *= s),
                d &&
                  ((s = Math.tan(d)),
                  (r *= s = Math.sqrt(1 + s * s)),
                  (n *= s))),
              (r = _t(r)),
              (n = _t(n)),
              (i = _t(i)),
              (o = _t(o)))
            : ((r = g), (o = m), (n = i = 0)),
          ((T && !~(c + '').indexOf('px')) ||
            (S && !~(h + '').indexOf('px'))) &&
            ((T = Tn(v, 'x', c, 'px')), (S = Tn(v, 'y', h, 'px'))),
          (_ || y || b || x) &&
            ((T = _t(T + _ - (_ * r + y * i) + b)),
            (S = _t(S + y - (_ * n + y * o) + x))),
          (l || u) &&
            ((s = v.getBBox()),
            (T = _t(T + (l / 100) * s.width)),
            (S = _t(S + (u / 100) * s.height))),
          (s =
            'matrix(' +
            r +
            ',' +
            n +
            ',' +
            i +
            ',' +
            o +
            ',' +
            T +
            ',' +
            S +
            ')'),
          v.setAttribute('transform', s),
          w && (v.style[nn] = s);
      },
      Hn = function (t, e, r, n, i) {
        var o,
          s,
          a = 360,
          l = z(i),
          u = parseFloat(i) * (l && ~i.indexOf('rad') ? Fr : 1) - n,
          c = n + u + 'deg';
        return (
          l &&
            ('short' === (o = i.split('_')[1]) &&
              (u %= a) != u % 180 &&
              (u += u < 0 ? a : -360),
            'cw' === o && u < 0
              ? (u = ((u + 36e9) % a) - ~~(u / a) * a)
              : 'ccw' === o &&
                u > 0 &&
                (u = ((u - 36e9) % a) - ~~(u / a) * a)),
          (t._pt = s = new gr(t._pt, e, r, n, u, Wr)),
          (s.e = c),
          (s.u = 'deg'),
          t._props.push(r),
          s
        );
      },
      Un = function (t, e) {
        for (var r in e) t[r] = e[r];
        return t;
      },
      Wn = function (t, e, r) {
        var n,
          i,
          o,
          s,
          a,
          l,
          u,
          c = Un({}, r._gsap),
          h = r.style;
        for (i in (c.svg
          ? ((o = r.getAttribute('transform')),
            r.setAttribute('transform', ''),
            (h[nn] = e),
            (n = Ln(r, 1)),
            yn(r, nn),
            r.setAttribute('transform', o))
          : ((o = getComputedStyle(r)[nn]),
            (h[nn] = e),
            (n = Ln(r, 1)),
            (h[nn] = o)),
        Ir))
          (o = c[i]) !== (s = n[i]) &&
            'perspective,force3D,transformOrigin,svgOrigin'.indexOf(i) < 0 &&
            ((a = re(o) !== (u = re(s)) ? Tn(r, i, o, u) : parseFloat(o)),
            (l = parseFloat(s)),
            (t._pt = new gr(t._pt, n, i, a, l - a, Ur)),
            (t._pt.u = u || 0),
            t._props.push(i));
        Un(n, c);
      };
    vt('padding,margin,Width,Radius', function (t, e) {
      var r = 'Top',
        n = 'Right',
        i = 'Bottom',
        o = 'Left',
        s = (e < 3 ? [r, n, i, o] : [r + o, r + n, i + n, i + o]).map(
          function (r) {
            return e < 2 ? t + r : 'border' + r + t;
          }
        );
      kn[e > 1 ? 'border' + t : t] = function (t, e, r, n, i) {
        var o, a;
        if (arguments.length < 4)
          return (
            (o = s.map(function (e) {
              return Sn(t, e, r);
            })),
            5 === (a = o.join(' ')).split(o[0]).length ? o[0] : a
          );
        (o = (n + '').split(' ')),
          (a = {}),
          s.forEach(function (t, e) {
            return (a[t] = o[e] = o[e] || o[((e - 1) / 2) | 0]);
          }),
          t.init(e, a, i);
      };
    });
    var jn,
      Gn,
      Zn = {
        name: 'css',
        register: dn,
        targetTest: function (t) {
          return t.style && t.nodeType;
        },
        init: function (t, e, r, n, i) {
          var o,
            s,
            a,
            l,
            u,
            c,
            h,
            f,
            p,
            d,
            g,
            m,
            v,
            _,
            y,
            b,
            x,
            w,
            S,
            C,
            E = this._props,
            M = t.style,
            k = r.vars.startAt;
          for (h in (Rr || dn(),
          (this.styles = this.styles || un(t)),
          (b = this.styles.props),
          (this.tween = r),
          e))
            if (
              'autoRound' !== h &&
              ((s = e[h]), !ut[h] || !Ze(h, e, r, n, t, i))
            )
              if (
                ((u = typeof s),
                (c = kn[h]),
                'function' === u && (u = typeof (s = s.call(r, n, t, i))),
                'string' === u && ~s.indexOf('random(') && (s = pe(s)),
                c)
              )
                c(this, t, h, s, r) && (y = 1);
              else if ('--' === h.substr(0, 2))
                (o = (getComputedStyle(t).getPropertyValue(h) + '').trim()),
                  (s += ''),
                  (Ee.lastIndex = 0),
                  Ee.test(o) || ((f = re(o)), (p = re(s))),
                  p ? f !== p && (o = Tn(t, h, o, p) + p) : f && (s += f),
                  this.add(M, 'setProperty', o, s, n, i, 0, 0, h),
                  E.push(h),
                  b.push(h, 0, M[h]);
              else if ('undefined' !== u) {
                if (
                  (k && h in k
                    ? ((o =
                        'function' == typeof k[h]
                          ? k[h].call(r, n, t, i)
                          : k[h]),
                      z(o) && ~o.indexOf('random(') && (o = pe(o)),
                      re(o + '') ||
                        'auto' === o ||
                        (o += T.units[h] || re(Sn(t, h)) || ''),
                      '=' === (o + '').charAt(1) && (o = Sn(t, h)))
                    : (o = Sn(t, h)),
                  (l = parseFloat(o)),
                  (d =
                    'string' === u && '=' === s.charAt(1) && s.substr(0, 2)) &&
                    (s = s.substr(2)),
                  (a = parseFloat(s)),
                  h in Hr &&
                    ('autoAlpha' === h &&
                      (1 === l &&
                        'hidden' === Sn(t, 'visibility') &&
                        a &&
                        (l = 0),
                      b.push('visibility', 0, M.visibility),
                      bn(
                        this,
                        M,
                        'visibility',
                        l ? 'inherit' : 'hidden',
                        a ? 'inherit' : 'hidden',
                        !a
                      )),
                    'scale' !== h &&
                      'transform' !== h &&
                      ~(h = Hr[h]).indexOf(',') &&
                      (h = h.split(',')[0])),
                  (g = h in Ir))
                )
                  if (
                    (this.styles.save(h),
                    'string' === u &&
                      'var(--' === s.substring(0, 6) &&
                      ((s = hn(t, s.substring(4, s.indexOf(')')))),
                      (a = parseFloat(s))),
                    m ||
                      (((v = t._gsap).renderTransform && !e.parseTransform) ||
                        Ln(t, e.parseTransform),
                      (_ = !1 !== e.smoothOrigin && v.smooth),
                      ((m = this._pt =
                        new gr(
                          this._pt,
                          M,
                          nn,
                          0,
                          1,
                          v.renderTransform,
                          v,
                          0,
                          -1
                        )).dep = 1)),
                    'scale' === h)
                  )
                    (this._pt = new gr(
                      this._pt,
                      v,
                      'scaleY',
                      v.scaleY,
                      (d ? bt(v.scaleY, d + a) : a) - v.scaleY || 0,
                      Ur
                    )),
                      (this._pt.u = 0),
                      E.push('scaleY', h),
                      (h += 'X');
                  else {
                    if ('transformOrigin' === h) {
                      b.push(on, 0, M[on]),
                        (w = void 0),
                        (S = void 0),
                        (C = void 0),
                        (S = (w = (x = s).split(' '))[0]),
                        (C = w[1] || '50%'),
                        ('top' !== S &&
                          'bottom' !== S &&
                          'left' !== C &&
                          'right' !== C) ||
                          ((x = S), (S = C), (C = x)),
                        (w[0] = En[S] || S),
                        (w[1] = En[C] || C),
                        (s = w.join(' ')),
                        v.svg
                          ? Dn(t, s, 0, _, 0, this)
                          : ((p = parseFloat(s.split(' ')[2]) || 0) !==
                              v.zOrigin &&
                              bn(this, v, 'zOrigin', v.zOrigin, p),
                            bn(this, M, h, Nn(o), Nn(s)));
                      continue;
                    }
                    if ('svgOrigin' === h) {
                      Dn(t, s, 1, _, 0, this);
                      continue;
                    }
                    if (h in Pn) {
                      Hn(this, v, h, l, d ? bt(l, d + s) : s);
                      continue;
                    }
                    if ('smoothOrigin' === h) {
                      bn(this, v, 'smooth', v.smooth, s);
                      continue;
                    }
                    if ('force3D' === h) {
                      v[h] = s;
                      continue;
                    }
                    if ('transform' === h) {
                      Wn(this, s, t);
                      continue;
                    }
                  }
                else h in M || (h = pn(h) || h);
                if (
                  g ||
                  ((a || 0 === a) && (l || 0 === l) && !qr.test(s) && h in M)
                )
                  a || (a = 0),
                    (f = (o + '').substr((l + '').length)) !==
                      (p = re(s) || (h in T.units ? T.units[h] : f)) &&
                      (l = Tn(t, h, o, p)),
                    (this._pt = new gr(
                      this._pt,
                      g ? v : M,
                      h,
                      l,
                      (d ? bt(l, d + a) : a) - l,
                      g || ('px' !== p && 'zIndex' !== h) || !1 === e.autoRound
                        ? Ur
                        : Gr
                    )),
                    (this._pt.u = p || 0),
                    f !== p &&
                      '%' !== p &&
                      ((this._pt.b = o), (this._pt.r = jr));
                else if (h in M) Cn.call(this, t, h, o, d ? d + s : s);
                else if (h in t)
                  this.add(t, h, o || t[h], d ? d + s : s, n, i);
                else if ('parseTransform' !== h) {
                  J(h, s);
                  continue;
                }
                g ||
                  (h in M
                    ? b.push(h, 0, M[h])
                    : 'function' == typeof t[h]
                      ? b.push(h, 2, t[h]())
                      : b.push(h, 1, o || t[h])),
                  E.push(h);
              }
          y && dr(this);
        },
        render: function (t, e) {
          if (e.tween._time || !Lr())
            for (var r = e._pt; r; ) r.r(t, r.d), (r = r._next);
          else e.styles.revert();
        },
        get: Sn,
        aliases: Hr,
        getSetter: function (t, e, r) {
          var n = Hr[e];
          return (
            n && n.indexOf(',') < 0 && (e = n),
            e in Ir && e !== on && (t._gsap.x || Sn(t, 'x'))
              ? r && Dr === r
                ? 'scale' === e
                  ? tn
                  : Jr
                : (Dr = r || {}) && ('scale' === e ? en : rn)
              : t.style && !N(t.style[e])
                ? $r
                : ~e.indexOf('-')
                  ? Kr
                  : sr(t, e)
          );
        },
        core: { _removeProperty: yn, _getMatrix: zn },
      };
    (kr.utils.checkPrefix = pn),
      (kr.core.getStyleSaver = un),
      (Gn = vt(
        'x,y,z,scale,scaleX,scaleY,xPercent,yPercent' +
          ',' +
          (jn = 'rotation,rotationX,rotationY,skewX,skewY') +
          ',transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective',
        function (t) {
          Ir[t] = 1;
        }
      )),
      vt(jn, function (t) {
        (T.units[t] = 'deg'), (Pn[t] = 1);
      }),
      (Hr[Gn[13]] = 'x,y,z,scale,scaleX,scaleY,xPercent,yPercent,' + jn),
      vt(
        '0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY',
        function (t) {
          var e = t.split(':');
          Hr[e[1]] = Gn[e[0]];
        }
      ),
      vt(
        'x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective',
        function (t) {
          T.units[t] = 'px';
        }
      ),
      kr.registerPlugin(Zn);
    var Qn = kr.registerPlugin(Zn) || kr;
    function $n(t, e) {
      for (var r = 0; r < e.length; r++) {
        var n = e[r];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          'value' in n && (n.writable = !0),
          Object.defineProperty(t, n.key, n);
      }
    }
    Qn.core.Tween;
    var Kn,
      Jn,
      ti,
      ei,
      ri,
      ni,
      ii,
      oi,
      si,
      ai,
      li,
      ui,
      ci,
      hi = function () {
        return (
          Kn ||
          ('undefined' != typeof window &&
            (Kn = window.gsap) &&
            Kn.registerPlugin &&
            Kn)
        );
      },
      fi = 1,
      pi = [],
      di = [],
      gi = [],
      mi = Date.now,
      vi = function (t, e) {
        return e;
      },
      _i = function (t, e) {
        return ~gi.indexOf(t) && gi[gi.indexOf(t) + 1][e];
      },
      yi = function (t) {
        return !!~ai.indexOf(t);
      },
      bi = function (t, e, r, n, i) {
        return t.addEventListener(e, r, { passive: !1 !== n, capture: !!i });
      },
      xi = function (t, e, r, n) {
        return t.removeEventListener(e, r, !!n);
      },
      wi = 'scrollLeft',
      Ti = 'scrollTop',
      Si = function () {
        return (li && li.isPressed) || di.cache++;
      },
      Ci = function (t, e) {
        var r = function r(n) {
          if (n || 0 === n) {
            fi && (ti.history.scrollRestoration = 'manual');
            var i = li && li.isPressed;
            (n = r.v = Math.round(n) || (li && li.iOS ? 1 : 0)),
              t(n),
              (r.cacheID = di.cache),
              i && vi('ss', n);
          } else
            (e || di.cache !== r.cacheID || vi('ref')) &&
              ((r.cacheID = di.cache), (r.v = t()));
          return r.v + r.offset;
        };
        return (r.offset = 0), t && r;
      },
      Ei = {
        s: wi,
        p: 'left',
        p2: 'Left',
        os: 'right',
        os2: 'Right',
        d: 'width',
        d2: 'Width',
        a: 'x',
        sc: Ci(function (t) {
          return arguments.length
            ? ti.scrollTo(t, Mi.sc())
            : ti.pageXOffset || ei[wi] || ri[wi] || ni[wi] || 0;
        }),
      },
      Mi = {
        s: Ti,
        p: 'top',
        p2: 'Top',
        os: 'bottom',
        os2: 'Bottom',
        d: 'height',
        d2: 'Height',
        a: 'y',
        op: Ei,
        sc: Ci(function (t) {
          return arguments.length
            ? ti.scrollTo(Ei.sc(), t)
            : ti.pageYOffset || ei[Ti] || ri[Ti] || ni[Ti] || 0;
        }),
      },
      ki = function (t, e) {
        return (
          ((e && e._ctx && e._ctx.selector) || Kn.utils.toArray)(t)[0] ||
          ('string' == typeof t && !1 !== Kn.config().nullTargetWarn
            ? console.warn('Element not found:', t)
            : null)
        );
      },
      Ai = function (t, e) {
        var r = e.s,
          n = e.sc;
        yi(t) && (t = ei.scrollingElement || ri);
        var i = di.indexOf(t),
          o = n === Mi.sc ? 1 : 2;
        !~i && (i = di.push(t) - 1), di[i + o] || bi(t, 'scroll', Si);
        var s = di[i + o],
          a =
            s ||
            (di[i + o] =
              Ci(_i(t, r), !0) ||
              (yi(t)
                ? n
                : Ci(function (e) {
                    return arguments.length ? (t[r] = e) : t[r];
                  })));
        return (
          (a.target = t),
          s || (a.smooth = 'smooth' === Kn.getProperty(t, 'scrollBehavior')),
          a
        );
      },
      Pi = function (t, e, r) {
        var n = t,
          i = t,
          o = mi(),
          s = o,
          a = e || 50,
          l = Math.max(500, 3 * a),
          u = function (t, e) {
            var l = mi();
            e || l - o > a
              ? ((i = n), (n = t), (s = o), (o = l))
              : r
                ? (n += t)
                : (n = i + ((t - i) / (l - s)) * (o - s));
          };
        return {
          update: u,
          reset: function () {
            (i = n = r ? 0 : n), (s = o = 0);
          },
          getVelocity: function (t) {
            var e = s,
              a = i,
              c = mi();
            return (
              (t || 0 === t) && t !== n && u(t),
              o === s || c - s > l
                ? 0
                : ((n + (r ? a : -a)) / ((r ? c : o) - e)) * 1e3
            );
          },
        };
      },
      Oi = function (t, e) {
        return (
          e && !t._gsapAllow && t.preventDefault(),
          t.changedTouches ? t.changedTouches[0] : t
        );
      },
      Ri = function (t) {
        var e = Math.max.apply(Math, t),
          r = Math.min.apply(Math, t);
        return Math.abs(e) >= Math.abs(r) ? e : r;
      },
      zi = function () {
        var t, e, r, n;
        (si = Kn.core.globals().ScrollTrigger) &&
          si.core &&
          ((t = si.core),
          (e = t.bridge || {}),
          (r = t._scrollers),
          (n = t._proxies),
          r.push.apply(r, di),
          n.push.apply(n, gi),
          (di = r),
          (gi = n),
          (vi = function (t, r) {
            return e[t](r);
          }));
      },
      Di = function (t) {
        return (
          (Kn = t || hi()),
          !Jn &&
            Kn &&
            'undefined' != typeof document &&
            document.body &&
            ((ti = window),
            (ei = document),
            (ri = ei.documentElement),
            (ni = ei.body),
            (ai = [ti, ei, ri, ni]),
            Kn.utils.clamp,
            (ci = Kn.core.context || function () {}),
            (oi = 'onpointerenter' in ni ? 'pointer' : 'mouse'),
            (ii = Li.isTouch =
              ti.matchMedia &&
              ti.matchMedia('(hover: none), (pointer: coarse)').matches
                ? 1
                : 'ontouchstart' in ti ||
                    navigator.maxTouchPoints > 0 ||
                    navigator.msMaxTouchPoints > 0
                  ? 2
                  : 0),
            (ui = Li.eventTypes =
              (
                'ontouchstart' in ri
                  ? 'touchstart,touchmove,touchcancel,touchend'
                  : 'onpointerdown' in ri
                    ? 'pointerdown,pointermove,pointercancel,pointerup'
                    : 'mousedown,mousemove,mouseup,mouseup'
              ).split(',')),
            setTimeout(function () {
              return (fi = 0);
            }, 500),
            zi(),
            (Jn = 1)),
          Jn
        );
      };
    (Ei.op = Mi), (di.cache = 0);
    var Li = (function () {
      function t(t) {
        this.init(t);
      }
      var e, r;
      return (
        (t.prototype.init = function (t) {
          Jn || Di(Kn) || console.warn('Please gsap.registerPlugin(Observer)'),
            si || zi();
          var e = t.tolerance,
            r = t.dragMinimum,
            n = t.type,
            i = t.target,
            o = t.lineHeight,
            s = t.debounce,
            a = t.preventDefault,
            l = t.onStop,
            u = t.onStopDelay,
            c = t.ignore,
            h = t.wheelSpeed,
            f = t.event,
            p = t.onDragStart,
            d = t.onDragEnd,
            g = t.onDrag,
            m = t.onPress,
            v = t.onRelease,
            _ = t.onRight,
            y = t.onLeft,
            b = t.onUp,
            x = t.onDown,
            w = t.onChangeX,
            T = t.onChangeY,
            S = t.onChange,
            C = t.onToggleX,
            E = t.onToggleY,
            M = t.onHover,
            k = t.onHoverEnd,
            A = t.onMove,
            P = t.ignoreCheck,
            O = t.isNormalizer,
            R = t.onGestureStart,
            z = t.onGestureEnd,
            D = t.onWheel,
            L = t.onEnable,
            N = t.onDisable,
            I = t.onClick,
            F = t.scrollSpeed,
            B = t.capture,
            Y = t.allowClicks,
            X = t.lockAxis,
            V = t.onLockAxis;
          (this.target = i = ki(i) || ri),
            (this.vars = t),
            c && (c = Kn.utils.toArray(c)),
            (e = e || 1e-9),
            (r = r || 0),
            (h = h || 1),
            (F = F || 1),
            (n = n || 'wheel,touch,pointer'),
            (s = !1 !== s),
            o || (o = parseFloat(ti.getComputedStyle(ni).lineHeight) || 22);
          var q,
            H,
            U,
            W,
            j,
            G,
            Z,
            Q = this,
            $ = 0,
            K = 0,
            J = t.passive || (!a && !1 !== t.passive),
            tt = Ai(i, Ei),
            et = Ai(i, Mi),
            rt = tt(),
            nt = et(),
            it =
              ~n.indexOf('touch') &&
              !~n.indexOf('pointer') &&
              'pointerdown' === ui[0],
            ot = yi(i),
            st = i.ownerDocument || ei,
            at = [0, 0, 0],
            lt = [0, 0, 0],
            ut = 0,
            ct = function () {
              return (ut = mi());
            },
            ht = function (t, e) {
              return (
                ((Q.event = t) &&
                  c &&
                  (function (t, e) {
                    for (var r = e.length; r--; )
                      if (e[r] === t || e[r].contains(t)) return !0;
                    return !1;
                  })(t.target, c)) ||
                (e && it && 'touch' !== t.pointerType) ||
                (P && P(t, e))
              );
            },
            ft = function () {
              var t = (Q.deltaX = Ri(at)),
                r = (Q.deltaY = Ri(lt)),
                n = Math.abs(t) >= e,
                i = Math.abs(r) >= e;
              S && (n || i) && S(Q, t, r, at, lt),
                n &&
                  (_ && Q.deltaX > 0 && _(Q),
                  y && Q.deltaX < 0 && y(Q),
                  w && w(Q),
                  C && Q.deltaX < 0 != $ < 0 && C(Q),
                  ($ = Q.deltaX),
                  (at[0] = at[1] = at[2] = 0)),
                i &&
                  (x && Q.deltaY > 0 && x(Q),
                  b && Q.deltaY < 0 && b(Q),
                  T && T(Q),
                  E && Q.deltaY < 0 != K < 0 && E(Q),
                  (K = Q.deltaY),
                  (lt[0] = lt[1] = lt[2] = 0)),
                (W || U) &&
                  (A && A(Q),
                  U && (p && 1 === U && p(Q), g && g(Q), (U = 0)),
                  (W = !1)),
                G && !(G = !1) && V && V(Q),
                j && (D(Q), (j = !1)),
                (q = 0);
            },
            pt = function (t, e, r) {
              (at[r] += t),
                (lt[r] += e),
                Q._vx.update(t),
                Q._vy.update(e),
                s ? q || (q = requestAnimationFrame(ft)) : ft();
            },
            dt = function (t, e) {
              X &&
                !Z &&
                ((Q.axis = Z = Math.abs(t) > Math.abs(e) ? 'x' : 'y'),
                (G = !0)),
                'y' !== Z && ((at[2] += t), Q._vx.update(t, !0)),
                'x' !== Z && ((lt[2] += e), Q._vy.update(e, !0)),
                s ? q || (q = requestAnimationFrame(ft)) : ft();
            },
            gt = function (t) {
              if (!ht(t, 1)) {
                var e = (t = Oi(t, a)).clientX,
                  n = t.clientY,
                  i = e - Q.x,
                  o = n - Q.y,
                  s = Q.isDragging;
                (Q.x = e),
                  (Q.y = n),
                  (s ||
                    ((i || o) &&
                      (Math.abs(Q.startX - e) >= r ||
                        Math.abs(Q.startY - n) >= r))) &&
                    ((U = s ? 2 : 1), s || (Q.isDragging = !0), dt(i, o));
              }
            },
            mt = (Q.onPress = function (t) {
              ht(t, 1) ||
                (t && t.button) ||
                ((Q.axis = Z = null),
                H.pause(),
                (Q.isPressed = !0),
                (t = Oi(t)),
                ($ = K = 0),
                (Q.startX = Q.x = t.clientX),
                (Q.startY = Q.y = t.clientY),
                Q._vx.reset(),
                Q._vy.reset(),
                bi(O ? i : st, ui[1], gt, J, !0),
                (Q.deltaX = Q.deltaY = 0),
                m && m(Q));
            }),
            vt = (Q.onRelease = function (t) {
              if (!ht(t, 1)) {
                xi(O ? i : st, ui[1], gt, !0);
                var e = !isNaN(Q.y - Q.startY),
                  r = Q.isDragging,
                  n =
                    r &&
                    (Math.abs(Q.x - Q.startX) > 3 ||
                      Math.abs(Q.y - Q.startY) > 3),
                  o = Oi(t);
                !n &&
                  e &&
                  (Q._vx.reset(),
                  Q._vy.reset(),
                  a &&
                    Y &&
                    Kn.delayedCall(0.08, function () {
                      if (mi() - ut > 300 && !t.defaultPrevented)
                        if (t.target.click) t.target.click();
                        else if (st.createEvent) {
                          var e = st.createEvent('MouseEvents');
                          e.initMouseEvent(
                            'click',
                            !0,
                            !0,
                            ti,
                            1,
                            o.screenX,
                            o.screenY,
                            o.clientX,
                            o.clientY,
                            !1,
                            !1,
                            !1,
                            !1,
                            0,
                            null
                          ),
                            t.target.dispatchEvent(e);
                        }
                    })),
                  (Q.isDragging = Q.isGesturing = Q.isPressed = !1),
                  l && r && !O && H.restart(!0),
                  U && ft(),
                  d && r && d(Q),
                  v && v(Q, n);
              }
            }),
            _t = function (t) {
              return (
                t.touches &&
                t.touches.length > 1 &&
                (Q.isGesturing = !0) &&
                R(t, Q.isDragging)
              );
            },
            yt = function () {
              return (Q.isGesturing = !1) || z(Q);
            },
            bt = function (t) {
              if (!ht(t)) {
                var e = tt(),
                  r = et();
                pt((e - rt) * F, (r - nt) * F, 1),
                  (rt = e),
                  (nt = r),
                  l && H.restart(!0);
              }
            },
            xt = function (t) {
              if (!ht(t)) {
                (t = Oi(t, a)), D && (j = !0);
                var e =
                  (1 === t.deltaMode
                    ? o
                    : 2 === t.deltaMode
                      ? ti.innerHeight
                      : 1) * h;
                pt(t.deltaX * e, t.deltaY * e, 0), l && !O && H.restart(!0);
              }
            },
            wt = function (t) {
              if (!ht(t)) {
                var e = t.clientX,
                  r = t.clientY,
                  n = e - Q.x,
                  i = r - Q.y;
                (Q.x = e),
                  (Q.y = r),
                  (W = !0),
                  l && H.restart(!0),
                  (n || i) && dt(n, i);
              }
            },
            Tt = function (t) {
              (Q.event = t), M(Q);
            },
            St = function (t) {
              (Q.event = t), k(Q);
            },
            Ct = function (t) {
              return ht(t) || (Oi(t, a) && I(Q));
            };
          (H = Q._dc =
            Kn.delayedCall(u || 0.25, function () {
              Q._vx.reset(), Q._vy.reset(), H.pause(), l && l(Q);
            }).pause()),
            (Q.deltaX = Q.deltaY = 0),
            (Q._vx = Pi(0, 50, !0)),
            (Q._vy = Pi(0, 50, !0)),
            (Q.scrollX = tt),
            (Q.scrollY = et),
            (Q.isDragging = Q.isGesturing = Q.isPressed = !1),
            ci(this),
            (Q.enable = function (t) {
              return (
                Q.isEnabled ||
                  (bi(ot ? st : i, 'scroll', Si),
                  n.indexOf('scroll') >= 0 &&
                    bi(ot ? st : i, 'scroll', bt, J, B),
                  n.indexOf('wheel') >= 0 && bi(i, 'wheel', xt, J, B),
                  ((n.indexOf('touch') >= 0 && ii) ||
                    n.indexOf('pointer') >= 0) &&
                    (bi(i, ui[0], mt, J, B),
                    bi(st, ui[2], vt),
                    bi(st, ui[3], vt),
                    Y && bi(i, 'click', ct, !0, !0),
                    I && bi(i, 'click', Ct),
                    R && bi(st, 'gesturestart', _t),
                    z && bi(st, 'gestureend', yt),
                    M && bi(i, oi + 'enter', Tt),
                    k && bi(i, oi + 'leave', St),
                    A && bi(i, oi + 'move', wt)),
                  (Q.isEnabled = !0),
                  (Q.isDragging = Q.isGesturing = Q.isPressed = W = U = !1),
                  Q._vx.reset(),
                  Q._vy.reset(),
                  (rt = tt()),
                  (nt = et()),
                  t && t.type && mt(t),
                  L && L(Q)),
                Q
              );
            }),
            (Q.disable = function () {
              Q.isEnabled &&
                (pi.filter(function (t) {
                  return t !== Q && yi(t.target);
                }).length || xi(ot ? st : i, 'scroll', Si),
                Q.isPressed &&
                  (Q._vx.reset(),
                  Q._vy.reset(),
                  xi(O ? i : st, ui[1], gt, !0)),
                xi(ot ? st : i, 'scroll', bt, B),
                xi(i, 'wheel', xt, B),
                xi(i, ui[0], mt, B),
                xi(st, ui[2], vt),
                xi(st, ui[3], vt),
                xi(i, 'click', ct, !0),
                xi(i, 'click', Ct),
                xi(st, 'gesturestart', _t),
                xi(st, 'gestureend', yt),
                xi(i, oi + 'enter', Tt),
                xi(i, oi + 'leave', St),
                xi(i, oi + 'move', wt),
                (Q.isEnabled = Q.isPressed = Q.isDragging = !1),
                N && N(Q));
            }),
            (Q.kill = Q.revert =
              function () {
                Q.disable();
                var t = pi.indexOf(Q);
                t >= 0 && pi.splice(t, 1), li === Q && (li = 0);
              }),
            pi.push(Q),
            O && yi(i) && (li = Q),
            Q.enable(f);
        }),
        (e = t),
        (r = [
          {
            key: 'velocityX',
            get: function () {
              return this._vx.getVelocity();
            },
          },
          {
            key: 'velocityY',
            get: function () {
              return this._vy.getVelocity();
            },
          },
        ]) && $n(e.prototype, r),
        t
      );
    })();
    (Li.version = '3.13.0'),
      (Li.create = function (t) {
        return new Li(t);
      }),
      (Li.register = Di),
      (Li.getAll = function () {
        return pi.slice();
      }),
      (Li.getById = function (t) {
        return pi.filter(function (e) {
          return e.vars.id === t;
        })[0];
      }),
      hi() && Kn.registerPlugin(Li);
    var Ni,
      Ii,
      Fi,
      Bi,
      Yi,
      Xi,
      Vi,
      qi,
      Hi,
      Ui,
      Wi,
      ji,
      Gi,
      Zi,
      Qi,
      $i,
      Ki,
      Ji,
      to,
      eo,
      ro,
      no,
      io,
      oo,
      so,
      ao,
      lo,
      uo,
      co,
      ho,
      fo,
      po,
      go,
      mo,
      vo,
      _o,
      yo,
      bo,
      xo = 1,
      wo = Date.now,
      To = wo(),
      So = 0,
      Co = 0,
      Eo = function (t, e, r) {
        var n =
          Yo(t) && ('clamp(' === t.substr(0, 6) || t.indexOf('max') > -1);
        return (r['_' + e + 'Clamp'] = n), n ? t.substr(6, t.length - 7) : t;
      },
      Mo = function (t, e) {
        return !e || (Yo(t) && 'clamp(' === t.substr(0, 6))
          ? t
          : 'clamp(' + t + ')';
      },
      ko = function t() {
        return Co && requestAnimationFrame(t);
      },
      Ao = function () {
        return (Zi = 1);
      },
      Po = function () {
        return (Zi = 0);
      },
      Oo = function (t) {
        return t;
      },
      Ro = function (t) {
        return Math.round(1e5 * t) / 1e5 || 0;
      },
      zo = function () {
        return 'undefined' != typeof window;
      },
      Do = function () {
        return Ni || (zo() && (Ni = window.gsap) && Ni.registerPlugin && Ni);
      },
      Lo = function (t) {
        return !!~Vi.indexOf(t);
      },
      No = function (t) {
        return (
          ('Height' === t ? fo : Fi['inner' + t]) ||
          Yi['client' + t] ||
          Xi['client' + t]
        );
      },
      Io = function (t) {
        return (
          _i(t, 'getBoundingClientRect') ||
          (Lo(t)
            ? function () {
                return (Qs.width = Fi.innerWidth), (Qs.height = fo), Qs;
              }
            : function () {
                return us(t);
              })
        );
      },
      Fo = function (t, e) {
        var r = e.s,
          n = e.d2,
          i = e.d,
          o = e.a;
        return Math.max(
          0,
          (r = 'scroll' + n) && (o = _i(t, r))
            ? o() - Io(t)()[i]
            : Lo(t)
              ? (Yi[r] || Xi[r]) - No(n)
              : t[r] - t['offset' + n]
        );
      },
      Bo = function (t, e) {
        for (var r = 0; r < to.length; r += 3)
          (!e || ~e.indexOf(to[r + 1])) && t(to[r], to[r + 1], to[r + 2]);
      },
      Yo = function (t) {
        return 'string' == typeof t;
      },
      Xo = function (t) {
        return 'function' == typeof t;
      },
      Vo = function (t) {
        return 'number' == typeof t;
      },
      qo = function (t) {
        return 'object' == typeof t;
      },
      Ho = function (t, e, r) {
        return t && t.progress(e ? 0 : 1) && r && t.pause();
      },
      Uo = function (t, e) {
        if (t.enabled) {
          var r = t._ctx
            ? t._ctx.add(function () {
                return e(t);
              })
            : e(t);
          r && r.totalTime && (t.callbackAnimation = r);
        }
      },
      Wo = Math.abs,
      jo = 'left',
      Go = 'right',
      Zo = 'bottom',
      Qo = 'width',
      $o = 'height',
      Ko = 'Right',
      Jo = 'Left',
      ts = 'Top',
      es = 'Bottom',
      rs = 'padding',
      ns = 'margin',
      is = 'Width',
      os = 'Height',
      ss = 'px',
      as = function (t) {
        return Fi.getComputedStyle(t);
      },
      ls = function (t, e) {
        for (var r in e) r in t || (t[r] = e[r]);
        return t;
      },
      us = function (t, e) {
        var r =
            e &&
            'matrix(1, 0, 0, 1, 0, 0)' !== as(t)[Qi] &&
            Ni.to(t, {
              x: 0,
              y: 0,
              xPercent: 0,
              yPercent: 0,
              rotation: 0,
              rotationX: 0,
              rotationY: 0,
              scale: 1,
              skewX: 0,
              skewY: 0,
            }).progress(1),
          n = t.getBoundingClientRect();
        return r && r.progress(0).kill(), n;
      },
      cs = function (t, e) {
        var r = e.d2;
        return t['offset' + r] || t['client' + r] || 0;
      },
      hs = function (t) {
        var e,
          r = [],
          n = t.labels,
          i = t.duration();
        for (e in n) r.push(n[e] / i);
        return r;
      },
      fs = function (t) {
        var e = Ni.utils.snap(t),
          r =
            Array.isArray(t) &&
            t.slice(0).sort(function (t, e) {
              return t - e;
            });
        return r
          ? function (t, n, i) {
              var o;
              if ((void 0 === i && (i = 0.001), !n)) return e(t);
              if (n > 0) {
                for (t -= i, o = 0; o < r.length; o++)
                  if (r[o] >= t) return r[o];
                return r[o - 1];
              }
              for (o = r.length, t += i; o--; ) if (r[o] <= t) return r[o];
              return r[0];
            }
          : function (r, n, i) {
              void 0 === i && (i = 0.001);
              var o = e(r);
              return !n || Math.abs(o - r) < i || o - r < 0 == n < 0
                ? o
                : e(n < 0 ? r - t : r + t);
            };
      },
      ps = function (t, e, r, n) {
        return r.split(',').forEach(function (r) {
          return t(e, r, n);
        });
      },
      ds = function (t, e, r, n, i) {
        return t.addEventListener(e, r, { passive: !n, capture: !!i });
      },
      gs = function (t, e, r, n) {
        return t.removeEventListener(e, r, !!n);
      },
      ms = function (t, e, r) {
        (r = r && r.wheelHandler) && (t(e, 'wheel', r), t(e, 'touchmove', r));
      },
      vs = {
        startColor: 'green',
        endColor: 'red',
        indent: 0,
        fontSize: '16px',
        fontWeight: 'normal',
      },
      _s = { toggleActions: 'play', anticipatePin: 0 },
      ys = { top: 0, left: 0, center: 0.5, bottom: 1, right: 1 },
      bs = function (t, e) {
        if (Yo(t)) {
          var r = t.indexOf('='),
            n = ~r ? +(t.charAt(r - 1) + 1) * parseFloat(t.substr(r + 1)) : 0;
          ~r &&
            (t.indexOf('%') > r && (n *= e / 100), (t = t.substr(0, r - 1))),
            (t =
              n +
              (t in ys
                ? ys[t] * e
                : ~t.indexOf('%')
                  ? (parseFloat(t) * e) / 100
                  : parseFloat(t) || 0));
        }
        return t;
      },
      xs = function (t, e, r, n, i, o, s, a) {
        var l = i.startColor,
          u = i.endColor,
          c = i.fontSize,
          h = i.indent,
          f = i.fontWeight,
          p = Bi.createElement('div'),
          d = Lo(r) || 'fixed' === _i(r, 'pinType'),
          g = -1 !== t.indexOf('scroller'),
          m = d ? Xi : r,
          v = -1 !== t.indexOf('start'),
          _ = v ? l : u,
          y =
            'border-color:' +
            _ +
            ';font-size:' +
            c +
            ';color:' +
            _ +
            ';font-weight:' +
            f +
            ';pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;';
        return (
          (y += 'position:' + ((g || a) && d ? 'fixed;' : 'absolute;')),
          (g || a || !d) &&
            (y += (n === Mi ? Go : Zo) + ':' + (o + parseFloat(h)) + 'px;'),
          s &&
            (y +=
              'box-sizing:border-box;text-align:left;width:' +
              s.offsetWidth +
              'px;'),
          (p._isStart = v),
          p.setAttribute(
            'class',
            'gsap-marker-' + t + (e ? ' marker-' + e : '')
          ),
          (p.style.cssText = y),
          (p.innerText = e || 0 === e ? t + '-' + e : t),
          m.children[0] ? m.insertBefore(p, m.children[0]) : m.appendChild(p),
          (p._offset = p['offset' + n.op.d2]),
          ws(p, 0, n, v),
          p
        );
      },
      ws = function (t, e, r, n) {
        var i = { display: 'block' },
          o = r[n ? 'os2' : 'p2'],
          s = r[n ? 'p2' : 'os2'];
        (t._isFlipped = n),
          (i[r.a + 'Percent'] = n ? -100 : 0),
          (i[r.a] = n ? '1px' : 0),
          (i['border' + o + is] = 1),
          (i['border' + s + is] = 0),
          (i[r.p] = e + 'px'),
          Ni.set(t, i);
      },
      Ts = [],
      Ss = {},
      Cs = function () {
        return wo() - So > 34 && (vo || (vo = requestAnimationFrame(qs)));
      },
      Es = function () {
        (!io || !io.isPressed || io.startX > Xi.clientWidth) &&
          (di.cache++,
          io ? vo || (vo = requestAnimationFrame(qs)) : qs(),
          So || Rs('scrollStart'),
          (So = wo()));
      },
      Ms = function () {
        (ao = Fi.innerWidth), (so = Fi.innerHeight);
      },
      ks = function (t) {
        di.cache++,
          (!0 === t ||
            (!Gi &&
              !no &&
              !Bi.fullscreenElement &&
              !Bi.webkitFullscreenElement &&
              (!oo ||
                ao !== Fi.innerWidth ||
                Math.abs(Fi.innerHeight - so) > 0.25 * Fi.innerHeight))) &&
            qi.restart(!0);
      },
      As = {},
      Ps = [],
      Os = function t() {
        return gs(na, 'scrollEnd', t) || Ys(!0);
      },
      Rs = function (t) {
        return (
          (As[t] &&
            As[t].map(function (t) {
              return t();
            })) ||
          Ps
        );
      },
      zs = [],
      Ds = function (t) {
        for (var e = 0; e < zs.length; e += 5)
          (!t || (zs[e + 4] && zs[e + 4].query === t)) &&
            ((zs[e].style.cssText = zs[e + 1]),
            zs[e].getBBox && zs[e].setAttribute('transform', zs[e + 2] || ''),
            (zs[e + 3].uncache = 1));
      },
      Ls = function (t, e) {
        var r;
        for ($i = 0; $i < Ts.length; $i++)
          !(r = Ts[$i]) ||
            (e && r._ctx !== e) ||
            (t ? r.kill(1) : r.revert(!0, !0));
        (po = !0), e && Ds(e), e || Rs('revert');
      },
      Ns = function (t, e) {
        di.cache++,
          (e || !_o) &&
            di.forEach(function (t) {
              return Xo(t) && t.cacheID++ && (t.rec = 0);
            }),
          Yo(t) && (Fi.history.scrollRestoration = co = t);
      },
      Is = 0,
      Fs = function () {
        Xi.appendChild(ho),
          (fo = (!io && ho.offsetHeight) || Fi.innerHeight),
          Xi.removeChild(ho);
      },
      Bs = function (t) {
        return Hi(
          '.gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end'
        ).forEach(function (e) {
          return (e.style.display = t ? 'none' : 'block');
        });
      },
      Ys = function (t, e) {
        if (
          ((Yi = Bi.documentElement),
          (Xi = Bi.body),
          (Vi = [Fi, Bi, Yi, Xi]),
          !So || t || po)
        ) {
          Fs(),
            (_o = na.isRefreshing = !0),
            di.forEach(function (t) {
              return Xo(t) && ++t.cacheID && (t.rec = t());
            });
          var r = Rs('refreshInit');
          eo && na.sort(),
            e || Ls(),
            di.forEach(function (t) {
              Xo(t) &&
                (t.smooth && (t.target.style.scrollBehavior = 'auto'), t(0));
            }),
            Ts.slice(0).forEach(function (t) {
              return t.refresh();
            }),
            (po = !1),
            Ts.forEach(function (t) {
              if (t._subPinOffset && t.pin) {
                var e = t.vars.horizontal ? 'offsetWidth' : 'offsetHeight',
                  r = t.pin[e];
                t.revert(!0, 1), t.adjustPinSpacing(t.pin[e] - r), t.refresh();
              }
            }),
            (go = 1),
            Bs(!0),
            Ts.forEach(function (t) {
              var e = Fo(t.scroller, t._dir),
                r = 'max' === t.vars.end || (t._endClamp && t.end > e),
                n = t._startClamp && t.start >= e;
              (r || n) &&
                t.setPositions(
                  n ? e - 1 : t.start,
                  r ? Math.max(n ? e : t.start + 1, e) : t.end,
                  !0
                );
            }),
            Bs(!1),
            (go = 0),
            r.forEach(function (t) {
              return t && t.render && t.render(-1);
            }),
            di.forEach(function (t) {
              Xo(t) &&
                (t.smooth &&
                  requestAnimationFrame(function () {
                    return (t.target.style.scrollBehavior = 'smooth');
                  }),
                t.rec && t(t.rec));
            }),
            Ns(co, 1),
            qi.pause(),
            Is++,
            (_o = 2),
            qs(2),
            Ts.forEach(function (t) {
              return Xo(t.vars.onRefresh) && t.vars.onRefresh(t);
            }),
            (_o = na.isRefreshing = !1),
            Rs('refresh');
        } else ds(na, 'scrollEnd', Os);
      },
      Xs = 0,
      Vs = 1,
      qs = function (t) {
        if (2 === t || (!_o && !po)) {
          (na.isUpdating = !0), bo && bo.update(0);
          var e = Ts.length,
            r = wo(),
            n = r - To >= 50,
            i = e && Ts[0].scroll();
          if (
            ((Vs = Xs > i ? -1 : 1),
            _o || (Xs = i),
            n &&
              (So && !Zi && r - So > 200 && ((So = 0), Rs('scrollEnd')),
              (Wi = To),
              (To = r)),
            Vs < 0)
          ) {
            for ($i = e; $i-- > 0; ) Ts[$i] && Ts[$i].update(0, n);
            Vs = 1;
          } else for ($i = 0; $i < e; $i++) Ts[$i] && Ts[$i].update(0, n);
          na.isUpdating = !1;
        }
        vo = 0;
      },
      Hs = [
        jo,
        'top',
        Zo,
        Go,
        ns + es,
        ns + Ko,
        ns + ts,
        ns + Jo,
        'display',
        'flexShrink',
        'float',
        'zIndex',
        'gridColumnStart',
        'gridColumnEnd',
        'gridRowStart',
        'gridRowEnd',
        'gridArea',
        'justifySelf',
        'alignSelf',
        'placeSelf',
        'order',
      ],
      Us = Hs.concat([
        Qo,
        $o,
        'boxSizing',
        'max' + is,
        'max' + os,
        'position',
        ns,
        rs,
        rs + ts,
        rs + Ko,
        rs + es,
        rs + Jo,
      ]),
      Ws = function (t, e, r, n) {
        if (!t._gsap.swappedIn) {
          for (var i, o = Hs.length, s = e.style, a = t.style; o--; )
            s[(i = Hs[o])] = r[i];
          (s.position = 'absolute' === r.position ? 'absolute' : 'relative'),
            'inline' === r.display && (s.display = 'inline-block'),
            (a[Zo] = a[Go] = 'auto'),
            (s.flexBasis = r.flexBasis || 'auto'),
            (s.overflow = 'visible'),
            (s.boxSizing = 'border-box'),
            (s[Qo] = cs(t, Ei) + ss),
            (s[$o] = cs(t, Mi) + ss),
            (s[rs] = a[ns] = a.top = a[jo] = '0'),
            Gs(n),
            (a[Qo] = a['max' + is] = r[Qo]),
            (a[$o] = a['max' + os] = r[$o]),
            (a[rs] = r[rs]),
            t.parentNode !== e &&
              (t.parentNode.insertBefore(e, t), e.appendChild(t)),
            (t._gsap.swappedIn = !0);
        }
      },
      js = /([A-Z])/g,
      Gs = function (t) {
        if (t) {
          var e,
            r,
            n = t.t.style,
            i = t.length,
            o = 0;
          for ((t.t._gsap || Ni.core.getCache(t.t)).uncache = 1; o < i; o += 2)
            (r = t[o + 1]),
              (e = t[o]),
              r
                ? (n[e] = r)
                : n[e] && n.removeProperty(e.replace(js, '-$1').toLowerCase());
        }
      },
      Zs = function (t) {
        for (var e = Us.length, r = t.style, n = [], i = 0; i < e; i++)
          n.push(Us[i], r[Us[i]]);
        return (n.t = t), n;
      },
      Qs = { left: 0, top: 0 },
      $s = function (t, e, r, n, i, o, s, a, l, u, c, h, f, p) {
        Xo(t) && (t = t(a)),
          Yo(t) &&
            'max' === t.substr(0, 3) &&
            (t = h + ('=' === t.charAt(4) ? bs('0' + t.substr(3), r) : 0));
        var d,
          g,
          m,
          v = f ? f.time() : 0;
        if ((f && f.seek(0), isNaN(t) || (t = +t), Vo(t)))
          f &&
            (t = Ni.utils.mapRange(
              f.scrollTrigger.start,
              f.scrollTrigger.end,
              0,
              h,
              t
            )),
            s && ws(s, r, n, !0);
        else {
          Xo(e) && (e = e(a));
          var _,
            y,
            b,
            x,
            w = (t || '0').split(' ');
          (m = ki(e, a) || Xi),
            ((_ = us(m) || {}) && (_.left || _.top)) ||
              'none' !== as(m).display ||
              ((x = m.style.display),
              (m.style.display = 'block'),
              (_ = us(m)),
              x ? (m.style.display = x) : m.style.removeProperty('display')),
            (y = bs(w[0], _[n.d])),
            (b = bs(w[1] || '0', r)),
            (t = _[n.p] - l[n.p] - u + y + i - b),
            s && ws(s, b, n, r - b < 20 || (s._isStart && b > 20)),
            (r -= r - b);
        }
        if ((p && ((a[p] = t || -0.001), t < 0 && (t = 0)), o)) {
          var T = t + r,
            S = o._isStart;
          (d = 'scroll' + n.d2),
            ws(
              o,
              T,
              n,
              (S && T > 20) ||
                (!S && (c ? Math.max(Xi[d], Yi[d]) : o.parentNode[d]) <= T + 1)
            ),
            c &&
              ((l = us(s)),
              c && (o.style[n.op.p] = l[n.op.p] - n.op.m - o._offset + ss));
        }
        return (
          f &&
            m &&
            ((d = us(m)),
            f.seek(h),
            (g = us(m)),
            (f._caScrollDist = d[n.p] - g[n.p]),
            (t = (t / f._caScrollDist) * h)),
          f && f.seek(v),
          f ? t : Math.round(t)
        );
      },
      Ks = /(webkit|moz|length|cssText|inset)/i,
      Js = function (t, e, r, n) {
        if (t.parentNode !== e) {
          var i,
            o,
            s = t.style;
          if (e === Xi) {
            for (i in ((t._stOrig = s.cssText), (o = as(t))))
              +i ||
                Ks.test(i) ||
                !o[i] ||
                'string' != typeof s[i] ||
                '0' === i ||
                (s[i] = o[i]);
            (s.top = r), (s.left = n);
          } else s.cssText = t._stOrig;
          (Ni.core.getCache(t).uncache = 1), e.appendChild(t);
        }
      },
      ta = function (t, e, r) {
        var n = e,
          i = n;
        return function (e) {
          var o = Math.round(t());
          return (
            o !== n &&
              o !== i &&
              Math.abs(o - n) > 3 &&
              Math.abs(o - i) > 3 &&
              ((e = o), r && r()),
            (i = n),
            (n = Math.round(e))
          );
        };
      },
      ea = function (t, e, r) {
        var n = {};
        (n[e.p] = '+=' + r), Ni.set(t, n);
      },
      ra = function (t, e) {
        var r = Ai(t, e),
          n = '_scroll' + e.p2,
          i = function e(i, o, s, a, l) {
            var u = e.tween,
              c = o.onComplete,
              h = {};
            s = s || r();
            var f = ta(r, s, function () {
              u.kill(), (e.tween = 0);
            });
            return (
              (l = (a && l) || 0),
              (a = a || i - s),
              u && u.kill(),
              (o[n] = i),
              (o.inherit = !1),
              (o.modifiers = h),
              (h[n] = function () {
                return f(s + a * u.ratio + l * u.ratio * u.ratio);
              }),
              (o.onUpdate = function () {
                di.cache++, e.tween && qs();
              }),
              (o.onComplete = function () {
                (e.tween = 0), c && c.call(u);
              }),
              (u = e.tween = Ni.to(t, o))
            );
          };
        return (
          (t[n] = r),
          (r.wheelHandler = function () {
            return i.tween && i.tween.kill() && (i.tween = 0);
          }),
          ds(t, 'wheel', r.wheelHandler),
          na.isTouch && ds(t, 'touchmove', r.wheelHandler),
          i
        );
      },
      na = (function () {
        function t(e, r) {
          Ii ||
            t.register(Ni) ||
            console.warn('Please gsap.registerPlugin(ScrollTrigger)'),
            uo(this),
            this.init(e, r);
        }
        return (
          (t.prototype.init = function (e, r) {
            if (
              ((this.progress = this.start = 0),
              this.vars && this.kill(!0, !0),
              Co)
            ) {
              var n,
                i,
                o,
                s,
                a,
                l,
                u,
                c,
                h,
                f,
                p,
                d,
                g,
                m,
                v,
                _,
                y,
                b,
                x,
                w,
                T,
                S,
                C,
                E,
                M,
                k,
                A,
                P,
                O,
                R,
                z,
                D,
                L,
                N,
                I,
                F,
                B,
                Y,
                X,
                V,
                q,
                H,
                U = (e = ls(
                  Yo(e) || Vo(e) || e.nodeType ? { trigger: e } : e,
                  _s
                )),
                W = U.onUpdate,
                j = U.toggleClass,
                G = U.id,
                Z = U.onToggle,
                Q = U.onRefresh,
                $ = U.scrub,
                K = U.trigger,
                J = U.pin,
                tt = U.pinSpacing,
                et = U.invalidateOnRefresh,
                rt = U.anticipatePin,
                nt = U.onScrubComplete,
                it = U.onSnapComplete,
                ot = U.once,
                st = U.snap,
                at = U.pinReparent,
                lt = U.pinSpacer,
                ut = U.containerAnimation,
                ct = U.fastScrollEnd,
                ht = U.preventOverlaps,
                ft =
                  e.horizontal || (e.containerAnimation && !1 !== e.horizontal)
                    ? Ei
                    : Mi,
                pt = !$ && 0 !== $,
                dt = ki(e.scroller || Fi),
                gt = Ni.core.getCache(dt),
                mt = Lo(dt),
                vt =
                  'fixed' ===
                  ('pinType' in e
                    ? e.pinType
                    : _i(dt, 'pinType') || (mt && 'fixed')),
                _t = [e.onEnter, e.onLeave, e.onEnterBack, e.onLeaveBack],
                yt = pt && e.toggleActions.split(' '),
                bt = 'markers' in e ? e.markers : _s.markers,
                xt = mt ? 0 : parseFloat(as(dt)['border' + ft.p2 + is]) || 0,
                wt = this,
                Tt =
                  e.onRefreshInit &&
                  function () {
                    return e.onRefreshInit(wt);
                  },
                St = (function (t, e, r) {
                  var n = r.d,
                    i = r.d2,
                    o = r.a;
                  return (o = _i(t, 'getBoundingClientRect'))
                    ? function () {
                        return o()[n];
                      }
                    : function () {
                        return (e ? No(i) : t['client' + i]) || 0;
                      };
                })(dt, mt, ft),
                Ct = (function (t, e) {
                  return !e || ~gi.indexOf(t)
                    ? Io(t)
                    : function () {
                        return Qs;
                      };
                })(dt, mt),
                Et = 0,
                Mt = 0,
                kt = 0,
                At = Ai(dt, ft);
              if (
                ((wt._startClamp = wt._endClamp = !1),
                (wt._dir = ft),
                (rt *= 45),
                (wt.scroller = dt),
                (wt.scroll = ut ? ut.time.bind(ut) : At),
                (s = At()),
                (wt.vars = e),
                (r = r || e.animation),
                'refreshPriority' in e &&
                  ((eo = 1), -9999 === e.refreshPriority && (bo = wt)),
                (gt.tweenScroll = gt.tweenScroll || {
                  top: ra(dt, Mi),
                  left: ra(dt, Ei),
                }),
                (wt.tweenTo = n = gt.tweenScroll[ft.p]),
                (wt.scrubDuration = function (t) {
                  (L = Vo(t) && t)
                    ? D
                      ? D.duration(t)
                      : (D = Ni.to(r, {
                          ease: 'expo',
                          totalProgress: '+=0',
                          inherit: !1,
                          duration: L,
                          paused: !0,
                          onComplete: function () {
                            return nt && nt(wt);
                          },
                        }))
                    : (D && D.progress(1).kill(), (D = 0));
                }),
                r &&
                  ((r.vars.lazy = !1),
                  (r._initted && !wt.isReverted) ||
                    (!1 !== r.vars.immediateRender &&
                      !1 !== e.immediateRender &&
                      r.duration() &&
                      r.render(0, !0, !0)),
                  (wt.animation = r.pause()),
                  (r.scrollTrigger = wt),
                  wt.scrubDuration($),
                  (R = 0),
                  G || (G = r.vars.id)),
                st &&
                  ((qo(st) && !st.push) || (st = { snapTo: st }),
                  'scrollBehavior' in Xi.style &&
                    Ni.set(mt ? [Xi, Yi] : dt, { scrollBehavior: 'auto' }),
                  di.forEach(function (t) {
                    return (
                      Xo(t) &&
                      t.target === (mt ? Bi.scrollingElement || Yi : dt) &&
                      (t.smooth = !1)
                    );
                  }),
                  (o = Xo(st.snapTo)
                    ? st.snapTo
                    : 'labels' === st.snapTo
                      ? (function (t) {
                          return function (e) {
                            return Ni.utils.snap(hs(t), e);
                          };
                        })(r)
                      : 'labelsDirectional' === st.snapTo
                        ? ((V = r),
                          function (t, e) {
                            return fs(hs(V))(t, e.direction);
                          })
                        : !1 !== st.directional
                          ? function (t, e) {
                              return fs(st.snapTo)(
                                t,
                                wo() - Mt < 500 ? 0 : e.direction
                              );
                            }
                          : Ni.utils.snap(st.snapTo)),
                  (N = st.duration || { min: 0.1, max: 2 }),
                  (N = qo(N) ? Ui(N.min, N.max) : Ui(N, N)),
                  (I = Ni.delayedCall(st.delay || L / 2 || 0.1, function () {
                    var t = At(),
                      e = wo() - Mt < 500,
                      i = n.tween;
                    if (
                      !(e || Math.abs(wt.getVelocity()) < 10) ||
                      i ||
                      Zi ||
                      Et === t
                    )
                      wt.isActive && Et !== t && I.restart(!0);
                    else {
                      var s,
                        a,
                        c = (t - l) / m,
                        h = r && !pt ? r.totalProgress() : c,
                        f = e ? 0 : ((h - z) / (wo() - Wi)) * 1e3 || 0,
                        p = Ni.utils.clamp(-c, 1 - c, (Wo(f / 2) * f) / 0.185),
                        d = c + (!1 === st.inertia ? 0 : p),
                        g = st,
                        v = g.onStart,
                        _ = g.onInterrupt,
                        y = g.onComplete;
                      if (
                        ((s = o(d, wt)),
                        Vo(s) || (s = d),
                        (a = Math.max(0, Math.round(l + s * m))),
                        t <= u && t >= l && a !== t)
                      ) {
                        if (i && !i._initted && i.data <= Wo(a - t)) return;
                        !1 === st.inertia && (p = s - c),
                          n(
                            a,
                            {
                              duration: N(
                                Wo(
                                  (0.185 * Math.max(Wo(d - h), Wo(s - h))) /
                                    f /
                                    0.05 || 0
                                )
                              ),
                              ease: st.ease || 'power3',
                              data: Wo(a - t),
                              onInterrupt: function () {
                                return I.restart(!0) && _ && _(wt);
                              },
                              onComplete: function () {
                                wt.update(),
                                  (Et = At()),
                                  r &&
                                    !pt &&
                                    (D
                                      ? D.resetTo(
                                          'totalProgress',
                                          s,
                                          r._tTime / r._tDur
                                        )
                                      : r.progress(s)),
                                  (R = z =
                                    r && !pt
                                      ? r.totalProgress()
                                      : wt.progress),
                                  it && it(wt),
                                  y && y(wt);
                              },
                            },
                            t,
                            p * m,
                            a - t - p * m
                          ),
                          v && v(wt, n.tween);
                      }
                    }
                  }).pause())),
                G && (Ss[G] = wt),
                (X =
                  (K = wt.trigger = ki(K || (!0 !== J && J))) &&
                  K._gsap &&
                  K._gsap.stRevert) && (X = X(wt)),
                (J = !0 === J ? K : ki(J)),
                Yo(j) && (j = { targets: K, className: j }),
                J &&
                  (!1 === tt ||
                    tt === ns ||
                    (tt =
                      !(
                        !tt &&
                        J.parentNode &&
                        J.parentNode.style &&
                        'flex' === as(J.parentNode).display
                      ) && rs),
                  (wt.pin = J),
                  (i = Ni.core.getCache(J)).spacer
                    ? (v = i.pinState)
                    : (lt &&
                        ((lt = ki(lt)) &&
                          !lt.nodeType &&
                          (lt = lt.current || lt.nativeElement),
                        (i.spacerIsNative = !!lt),
                        lt && (i.spacerState = Zs(lt))),
                      (i.spacer = b = lt || Bi.createElement('div')),
                      b.classList.add('pin-spacer'),
                      G && b.classList.add('pin-spacer-' + G),
                      (i.pinState = v = Zs(J))),
                  !1 !== e.force3D && Ni.set(J, { force3D: !0 }),
                  (wt.spacer = b = i.spacer),
                  (O = as(J)),
                  (E = O[tt + ft.os2]),
                  (w = Ni.getProperty(J)),
                  (T = Ni.quickSetter(J, ft.a, ss)),
                  Ws(J, b, O),
                  (y = Zs(J))),
                bt)
              ) {
                (d = qo(bt) ? ls(bt, vs) : vs),
                  (f = xs('scroller-start', G, dt, ft, d, 0)),
                  (p = xs('scroller-end', G, dt, ft, d, 0, f)),
                  (x = f['offset' + ft.op.d2]);
                var Pt = ki(_i(dt, 'content') || dt);
                (c = this.markerStart = xs('start', G, Pt, ft, d, x, 0, ut)),
                  (h = this.markerEnd = xs('end', G, Pt, ft, d, x, 0, ut)),
                  ut && (Y = Ni.quickSetter([c, h], ft.a, ss)),
                  vt ||
                    (gi.length && !0 === _i(dt, 'fixedMarkers')) ||
                    ((H = as((q = mt ? Xi : dt)).position),
                    (q.style.position =
                      'absolute' === H || 'fixed' === H ? H : 'relative'),
                    Ni.set([f, p], { force3D: !0 }),
                    (k = Ni.quickSetter(f, ft.a, ss)),
                    (P = Ni.quickSetter(p, ft.a, ss)));
              }
              if (ut) {
                var Ot = ut.vars.onUpdate,
                  Rt = ut.vars.onUpdateParams;
                ut.eventCallback('onUpdate', function () {
                  wt.update(0, 0, 1), Ot && Ot.apply(ut, Rt || []);
                });
              }
              if (
                ((wt.previous = function () {
                  return Ts[Ts.indexOf(wt) - 1];
                }),
                (wt.next = function () {
                  return Ts[Ts.indexOf(wt) + 1];
                }),
                (wt.revert = function (t, e) {
                  if (!e) return wt.kill(!0);
                  var n = !1 !== t || !wt.enabled,
                    i = Gi;
                  n !== wt.isReverted &&
                    (n &&
                      ((F = Math.max(At(), wt.scroll.rec || 0)),
                      (kt = wt.progress),
                      (B = r && r.progress())),
                    c &&
                      [c, h, f, p].forEach(function (t) {
                        return (t.style.display = n ? 'none' : 'block');
                      }),
                    n && ((Gi = wt), wt.update(n)),
                    !J ||
                      (at && wt.isActive) ||
                      (n
                        ? (function (t, e, r) {
                            Gs(r);
                            var n = t._gsap;
                            if (n.spacerIsNative) Gs(n.spacerState);
                            else if (t._gsap.swappedIn) {
                              var i = e.parentNode;
                              i && (i.insertBefore(t, e), i.removeChild(e));
                            }
                            t._gsap.swappedIn = !1;
                          })(J, b, v)
                        : Ws(J, b, as(J), M)),
                    n || wt.update(n),
                    (Gi = i),
                    (wt.isReverted = n));
                }),
                (wt.refresh = function (i, o, d, x) {
                  if ((!Gi && wt.enabled) || o)
                    if (J && i && So) ds(t, 'scrollEnd', Os);
                    else {
                      !_o && Tt && Tt(wt),
                        (Gi = wt),
                        n.tween && !d && (n.tween.kill(), (n.tween = 0)),
                        D && D.pause(),
                        et &&
                          r &&
                          (r.revert({ kill: !1 }).invalidate(),
                          r.getChildren &&
                            r.getChildren(!0, !0, !1).forEach(function (t) {
                              return (
                                t.vars.immediateRender && t.render(0, !0, !0)
                              );
                            })),
                        wt.isReverted || wt.revert(!0, !0),
                        (wt._subPinOffset = !1);
                      var T,
                        E,
                        k,
                        P,
                        O,
                        R,
                        z,
                        L,
                        N,
                        Y,
                        X,
                        V,
                        q,
                        H = St(),
                        U = Ct(),
                        W = ut ? ut.duration() : Fo(dt, ft),
                        j = m <= 0.01 || !m,
                        G = 0,
                        Z = x || 0,
                        $ = qo(d) ? d.end : e.end,
                        rt = e.endTrigger || K,
                        nt = qo(d)
                          ? d.start
                          : e.start ||
                            (0 !== e.start && K ? (J ? '0 0' : '0 100%') : 0),
                        it = (wt.pinnedContainer =
                          e.pinnedContainer && ki(e.pinnedContainer, wt)),
                        ot = (K && Math.max(0, Ts.indexOf(wt))) || 0,
                        st = ot;
                      for (
                        bt &&
                        qo(d) &&
                        ((V = Ni.getProperty(f, ft.p)),
                        (q = Ni.getProperty(p, ft.p)));
                        st-- > 0;

                      )
                        (R = Ts[st]).end || R.refresh(0, 1) || (Gi = wt),
                          !(z = R.pin) ||
                            (z !== K && z !== J && z !== it) ||
                            R.isReverted ||
                            (Y || (Y = []), Y.unshift(R), R.revert(!0, !0)),
                          R !== Ts[st] && (ot--, st--);
                      for (
                        Xo(nt) && (nt = nt(wt)),
                          nt = Eo(nt, 'start', wt),
                          l =
                            $s(
                              nt,
                              K,
                              H,
                              ft,
                              At(),
                              c,
                              f,
                              wt,
                              U,
                              xt,
                              vt,
                              W,
                              ut,
                              wt._startClamp && '_startClamp'
                            ) || (J ? -0.001 : 0),
                          Xo($) && ($ = $(wt)),
                          Yo($) &&
                            !$.indexOf('+=') &&
                            (~$.indexOf(' ')
                              ? ($ = (Yo(nt) ? nt.split(' ')[0] : '') + $)
                              : ((G = bs($.substr(2), H)),
                                ($ = Yo(nt)
                                  ? nt
                                  : (ut
                                      ? Ni.utils.mapRange(
                                          0,
                                          ut.duration(),
                                          ut.scrollTrigger.start,
                                          ut.scrollTrigger.end,
                                          l
                                        )
                                      : l) + G),
                                (rt = K))),
                          $ = Eo($, 'end', wt),
                          u =
                            Math.max(
                              l,
                              $s(
                                $ || (rt ? '100% 0' : W),
                                rt,
                                H,
                                ft,
                                At() + G,
                                h,
                                p,
                                wt,
                                U,
                                xt,
                                vt,
                                W,
                                ut,
                                wt._endClamp && '_endClamp'
                              )
                            ) || -0.001,
                          G = 0,
                          st = ot;
                        st--;

                      )
                        (z = (R = Ts[st]).pin) &&
                          R.start - R._pinPush <= l &&
                          !ut &&
                          R.end > 0 &&
                          ((T =
                            R.end -
                            (wt._startClamp ? Math.max(0, R.start) : R.start)),
                          ((z === K && R.start - R._pinPush < l) ||
                            z === it) &&
                            isNaN(nt) &&
                            (G += T * (1 - R.progress)),
                          z === J && (Z += T));
                      if (
                        ((l += G),
                        (u += G),
                        wt._startClamp && (wt._startClamp += G),
                        wt._endClamp &&
                          !_o &&
                          ((wt._endClamp = u || -0.001),
                          (u = Math.min(u, Fo(dt, ft)))),
                        (m = u - l || ((l -= 0.01) && 0.001)),
                        j &&
                          (kt = Ni.utils.clamp(
                            0,
                            1,
                            Ni.utils.normalize(l, u, F)
                          )),
                        (wt._pinPush = Z),
                        c &&
                          G &&
                          (((T = {})[ft.a] = '+=' + G),
                          it && (T[ft.p] = '-=' + At()),
                          Ni.set([c, h], T)),
                        !J || (go && wt.end >= Fo(dt, ft)))
                      ) {
                        if (K && At() && !ut)
                          for (E = K.parentNode; E && E !== Xi; )
                            E._pinOffset &&
                              ((l -= E._pinOffset), (u -= E._pinOffset)),
                              (E = E.parentNode);
                      } else
                        (T = as(J)),
                          (P = ft === Mi),
                          (k = At()),
                          (S = parseFloat(w(ft.a)) + Z),
                          !W &&
                            u > 1 &&
                            ((X = {
                              style: (X = (mt ? Bi.scrollingElement || Yi : dt)
                                .style),
                              value: X['overflow' + ft.a.toUpperCase()],
                            }),
                            mt &&
                              'scroll' !==
                                as(Xi)['overflow' + ft.a.toUpperCase()] &&
                              (X.style['overflow' + ft.a.toUpperCase()] =
                                'scroll')),
                          Ws(J, b, T),
                          (y = Zs(J)),
                          (E = us(J, !0)),
                          (L = vt && Ai(dt, P ? Ei : Mi)()),
                          tt
                            ? (((M = [tt + ft.os2, m + Z + ss]).t = b),
                              (st = tt === rs ? cs(J, ft) + m + Z : 0) &&
                                (M.push(ft.d, st + ss),
                                'auto' !== b.style.flexBasis &&
                                  (b.style.flexBasis = st + ss)),
                              Gs(M),
                              it &&
                                Ts.forEach(function (t) {
                                  t.pin === it &&
                                    !1 !== t.vars.pinSpacing &&
                                    (t._subPinOffset = !0);
                                }),
                              vt && At(F))
                            : (st = cs(J, ft)) &&
                              'auto' !== b.style.flexBasis &&
                              (b.style.flexBasis = st + ss),
                          vt &&
                            (((O = {
                              top: E.top + (P ? k - l : L) + ss,
                              left: E.left + (P ? L : k - l) + ss,
                              boxSizing: 'border-box',
                              position: 'fixed',
                            })[Qo] = O['max' + is] =
                              Math.ceil(E.width) + ss),
                            (O[$o] = O['max' + os] = Math.ceil(E.height) + ss),
                            (O[ns] =
                              O[ns + ts] =
                              O[ns + Ko] =
                              O[ns + es] =
                              O[ns + Jo] =
                                '0'),
                            (O[rs] = T[rs]),
                            (O[rs + ts] = T[rs + ts]),
                            (O[rs + Ko] = T[rs + Ko]),
                            (O[rs + es] = T[rs + es]),
                            (O[rs + Jo] = T[rs + Jo]),
                            (_ = (function (t, e, r) {
                              for (
                                var n, i = [], o = t.length, s = r ? 8 : 0;
                                s < o;
                                s += 2
                              )
                                (n = t[s]),
                                  i.push(n, n in e ? e[n] : t[s + 1]);
                              return (i.t = t.t), i;
                            })(v, O, at)),
                            _o && At(0)),
                          r
                            ? ((N = r._initted),
                              ro(1),
                              r.render(r.duration(), !0, !0),
                              (C = w(ft.a) - S + m + Z),
                              (A = Math.abs(m - C) > 1),
                              vt && A && _.splice(_.length - 2, 2),
                              r.render(0, !0, !0),
                              N || r.invalidate(!0),
                              r.parent || r.totalTime(r.totalTime()),
                              ro(0))
                            : (C = m),
                          X &&
                            (X.value
                              ? (X.style['overflow' + ft.a.toUpperCase()] =
                                  X.value)
                              : X.style.removeProperty('overflow-' + ft.a));
                      Y &&
                        Y.forEach(function (t) {
                          return t.revert(!1, !0);
                        }),
                        (wt.start = l),
                        (wt.end = u),
                        (s = a = _o ? F : At()),
                        ut || _o || (s < F && At(F), (wt.scroll.rec = 0)),
                        wt.revert(!1, !0),
                        (Mt = wo()),
                        I && ((Et = -1), I.restart(!0)),
                        (Gi = 0),
                        r &&
                          pt &&
                          (r._initted || B) &&
                          r.progress() !== B &&
                          r.progress(B || 0, !0).render(r.time(), !0, !0),
                        (j ||
                          kt !== wt.progress ||
                          ut ||
                          et ||
                          (r && !r._initted)) &&
                          (r &&
                            !pt &&
                            (r._initted ||
                              kt ||
                              !1 !== r.vars.immediateRender) &&
                            r.totalProgress(
                              ut && l < -0.001 && !kt
                                ? Ni.utils.normalize(l, u, 0)
                                : kt,
                              !0
                            ),
                          (wt.progress = j || (s - l) / m === kt ? 0 : kt)),
                        J &&
                          tt &&
                          (b._pinOffset = Math.round(wt.progress * C)),
                        D && D.invalidate(),
                        isNaN(V) ||
                          ((V -= Ni.getProperty(f, ft.p)),
                          (q -= Ni.getProperty(p, ft.p)),
                          ea(f, ft, V),
                          ea(c, ft, V - (x || 0)),
                          ea(p, ft, q),
                          ea(h, ft, q - (x || 0))),
                        j && !_o && wt.update(),
                        !Q || _o || g || ((g = !0), Q(wt), (g = !1));
                    }
                }),
                (wt.getVelocity = function () {
                  return ((At() - a) / (wo() - Wi)) * 1e3 || 0;
                }),
                (wt.endAnimation = function () {
                  Ho(wt.callbackAnimation),
                    r &&
                      (D
                        ? D.progress(1)
                        : r.paused()
                          ? pt || Ho(r, wt.direction < 0, 1)
                          : Ho(r, r.reversed()));
                }),
                (wt.labelToScroll = function (t) {
                  return (
                    (r &&
                      r.labels &&
                      (l || wt.refresh() || l) +
                        (r.labels[t] / r.duration()) * m) ||
                    0
                  );
                }),
                (wt.getTrailing = function (t) {
                  var e = Ts.indexOf(wt),
                    r =
                      wt.direction > 0
                        ? Ts.slice(0, e).reverse()
                        : Ts.slice(e + 1);
                  return (
                    Yo(t)
                      ? r.filter(function (e) {
                          return e.vars.preventOverlaps === t;
                        })
                      : r
                  ).filter(function (t) {
                    return wt.direction > 0 ? t.end <= l : t.start >= u;
                  });
                }),
                (wt.update = function (t, e, i) {
                  if (!ut || i || t) {
                    var o,
                      c,
                      h,
                      p,
                      d,
                      g,
                      v,
                      x = !0 === _o ? F : wt.scroll(),
                      w = t ? 0 : (x - l) / m,
                      M = w < 0 ? 0 : w > 1 ? 1 : w || 0,
                      O = wt.progress;
                    if (
                      (e &&
                        ((a = s),
                        (s = ut ? At() : x),
                        st &&
                          ((z = R), (R = r && !pt ? r.totalProgress() : M))),
                      rt &&
                        J &&
                        !Gi &&
                        !xo &&
                        So &&
                        (!M && l < x + ((x - a) / (wo() - Wi)) * rt
                          ? (M = 1e-4)
                          : 1 === M &&
                            u > x + ((x - a) / (wo() - Wi)) * rt &&
                            (M = 0.9999)),
                      M !== O && wt.enabled)
                    ) {
                      if (
                        ((p =
                          (d =
                            (o = wt.isActive = !!M && M < 1) !=
                            (!!O && O < 1)) || !!M != !!O),
                        (wt.direction = M > O ? 1 : -1),
                        (wt.progress = M),
                        p &&
                          !Gi &&
                          ((c = M && !O ? 0 : 1 === M ? 1 : 1 === O ? 2 : 3),
                          pt &&
                            ((h =
                              (!d && 'none' !== yt[c + 1] && yt[c + 1]) ||
                              yt[c]),
                            (v =
                              r &&
                              ('complete' === h || 'reset' === h || h in r)))),
                        ht &&
                          (d || v) &&
                          (v || $ || !r) &&
                          (Xo(ht)
                            ? ht(wt)
                            : wt.getTrailing(ht).forEach(function (t) {
                                return t.endAnimation();
                              })),
                        pt ||
                          (!D || Gi || xo
                            ? r && r.totalProgress(M, !(!Gi || (!Mt && !t)))
                            : (D._dp._time - D._start !== D._time &&
                                D.render(D._dp._time - D._start),
                              D.resetTo
                                ? D.resetTo(
                                    'totalProgress',
                                    M,
                                    r._tTime / r._tDur
                                  )
                                : ((D.vars.totalProgress = M),
                                  D.invalidate().restart()))),
                        J)
                      )
                        if ((t && tt && (b.style[tt + ft.os2] = E), vt)) {
                          if (p) {
                            if (
                              ((g =
                                !t &&
                                M > O &&
                                u + 1 > x &&
                                x + 1 >= Fo(dt, ft)),
                              at)
                            )
                              if (t || (!o && !g)) Js(J, b);
                              else {
                                var L = us(J, !0),
                                  N = x - l;
                                Js(
                                  J,
                                  Xi,
                                  L.top + (ft === Mi ? N : 0) + ss,
                                  L.left + (ft === Mi ? 0 : N) + ss
                                );
                              }
                            Gs(o || g ? _ : y),
                              (A && M < 1 && o) ||
                                T(S + (1 !== M || g ? 0 : C));
                          }
                        } else T(Ro(S + C * M));
                      st && !n.tween && !Gi && !xo && I.restart(!0),
                        j &&
                          (d || (ot && M && (M < 1 || !mo))) &&
                          Hi(j.targets).forEach(function (t) {
                            return t.classList[o || ot ? 'add' : 'remove'](
                              j.className
                            );
                          }),
                        W && !pt && !t && W(wt),
                        p && !Gi
                          ? (pt &&
                              (v &&
                                ('complete' === h
                                  ? r.pause().totalProgress(1)
                                  : 'reset' === h
                                    ? r.restart(!0).pause()
                                    : 'restart' === h
                                      ? r.restart(!0)
                                      : r[h]()),
                              W && W(wt)),
                            (!d && mo) ||
                              (Z && d && Uo(wt, Z),
                              _t[c] && Uo(wt, _t[c]),
                              ot && (1 === M ? wt.kill(!1, 1) : (_t[c] = 0)),
                              d ||
                                (_t[(c = 1 === M ? 1 : 3)] && Uo(wt, _t[c]))),
                            ct &&
                              !o &&
                              Math.abs(wt.getVelocity()) >
                                (Vo(ct) ? ct : 2500) &&
                              (Ho(wt.callbackAnimation),
                              D
                                ? D.progress(1)
                                : Ho(r, 'reverse' === h ? 1 : !M, 1)))
                          : pt && W && !Gi && W(wt);
                    }
                    if (P) {
                      var B = ut
                        ? (x / ut.duration()) * (ut._caScrollDist || 0)
                        : x;
                      k(B + (f._isFlipped ? 1 : 0)), P(B);
                    }
                    Y && Y((-x / ut.duration()) * (ut._caScrollDist || 0));
                  }
                }),
                (wt.enable = function (e, r) {
                  wt.enabled ||
                    ((wt.enabled = !0),
                    ds(dt, 'resize', ks),
                    mt || ds(dt, 'scroll', Es),
                    Tt && ds(t, 'refreshInit', Tt),
                    !1 !== e && ((wt.progress = kt = 0), (s = a = Et = At())),
                    !1 !== r && wt.refresh());
                }),
                (wt.getTween = function (t) {
                  return t && n ? n.tween : D;
                }),
                (wt.setPositions = function (t, e, r, n) {
                  if (ut) {
                    var i = ut.scrollTrigger,
                      o = ut.duration(),
                      s = i.end - i.start;
                    (t = i.start + (s * t) / o), (e = i.start + (s * e) / o);
                  }
                  wt.refresh(
                    !1,
                    !1,
                    {
                      start: Mo(t, r && !!wt._startClamp),
                      end: Mo(e, r && !!wt._endClamp),
                    },
                    n
                  ),
                    wt.update();
                }),
                (wt.adjustPinSpacing = function (t) {
                  if (M && t) {
                    var e = M.indexOf(ft.d) + 1;
                    (M[e] = parseFloat(M[e]) + t + ss),
                      (M[1] = parseFloat(M[1]) + t + ss),
                      Gs(M);
                  }
                }),
                (wt.disable = function (e, r) {
                  if (
                    wt.enabled &&
                    (!1 !== e && wt.revert(!0, !0),
                    (wt.enabled = wt.isActive = !1),
                    r || (D && D.pause()),
                    (F = 0),
                    i && (i.uncache = 1),
                    Tt && gs(t, 'refreshInit', Tt),
                    I &&
                      (I.pause(), n.tween && n.tween.kill() && (n.tween = 0)),
                    !mt)
                  ) {
                    for (var o = Ts.length; o--; )
                      if (Ts[o].scroller === dt && Ts[o] !== wt) return;
                    gs(dt, 'resize', ks), mt || gs(dt, 'scroll', Es);
                  }
                }),
                (wt.kill = function (t, n) {
                  wt.disable(t, n), D && !n && D.kill(), G && delete Ss[G];
                  var o = Ts.indexOf(wt);
                  o >= 0 && Ts.splice(o, 1),
                    o === $i && Vs > 0 && $i--,
                    (o = 0),
                    Ts.forEach(function (t) {
                      return t.scroller === wt.scroller && (o = 1);
                    }),
                    o || _o || (wt.scroll.rec = 0),
                    r &&
                      ((r.scrollTrigger = null),
                      t && r.revert({ kill: !1 }),
                      n || r.kill()),
                    c &&
                      [c, h, f, p].forEach(function (t) {
                        return t.parentNode && t.parentNode.removeChild(t);
                      }),
                    bo === wt && (bo = 0),
                    J &&
                      (i && (i.uncache = 1),
                      (o = 0),
                      Ts.forEach(function (t) {
                        return t.pin === J && o++;
                      }),
                      o || (i.spacer = 0)),
                    e.onKill && e.onKill(wt);
                }),
                Ts.push(wt),
                wt.enable(!1, !1),
                X && X(wt),
                r && r.add && !m)
              ) {
                var zt = wt.update;
                (wt.update = function () {
                  (wt.update = zt), di.cache++, l || u || wt.refresh();
                }),
                  Ni.delayedCall(0.01, wt.update),
                  (m = 0.01),
                  (l = u = 0);
              } else wt.refresh();
              J &&
                (function () {
                  if (yo !== Is) {
                    var t = (yo = Is);
                    requestAnimationFrame(function () {
                      return t === Is && Ys(!0);
                    });
                  }
                })();
            } else this.update = this.refresh = this.kill = Oo;
          }),
          (t.register = function (e) {
            return (
              Ii ||
                ((Ni = e || Do()),
                zo() && window.document && t.enable(),
                (Ii = Co)),
              Ii
            );
          }),
          (t.defaults = function (t) {
            if (t) for (var e in t) _s[e] = t[e];
            return _s;
          }),
          (t.disable = function (t, e) {
            (Co = 0),
              Ts.forEach(function (r) {
                return r[e ? 'kill' : 'disable'](t);
              }),
              gs(Fi, 'wheel', Es),
              gs(Bi, 'scroll', Es),
              clearInterval(ji),
              gs(Bi, 'touchcancel', Oo),
              gs(Xi, 'touchstart', Oo),
              ps(gs, Bi, 'pointerdown,touchstart,mousedown', Ao),
              ps(gs, Bi, 'pointerup,touchend,mouseup', Po),
              qi.kill(),
              Bo(gs);
            for (var r = 0; r < di.length; r += 3)
              ms(gs, di[r], di[r + 1]), ms(gs, di[r], di[r + 2]);
          }),
          (t.enable = function () {
            if (
              ((Fi = window),
              (Bi = document),
              (Yi = Bi.documentElement),
              (Xi = Bi.body),
              Ni &&
                ((Hi = Ni.utils.toArray),
                (Ui = Ni.utils.clamp),
                (uo = Ni.core.context || Oo),
                (ro = Ni.core.suppressOverwrites || Oo),
                (co = Fi.history.scrollRestoration || 'auto'),
                (Xs = Fi.pageYOffset || 0),
                Ni.core.globals('ScrollTrigger', t),
                Xi))
            ) {
              (Co = 1),
                ((ho = document.createElement('div')).style.height = '100vh'),
                (ho.style.position = 'absolute'),
                Fs(),
                ko(),
                Li.register(Ni),
                (t.isTouch = Li.isTouch),
                (lo =
                  Li.isTouch &&
                  /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent)),
                (oo = 1 === Li.isTouch),
                ds(Fi, 'wheel', Es),
                (Vi = [Fi, Bi, Yi, Xi]),
                Ni.matchMedia
                  ? ((t.matchMedia = function (t) {
                      var e,
                        r = Ni.matchMedia();
                      for (e in t) r.add(e, t[e]);
                      return r;
                    }),
                    Ni.addEventListener('matchMediaInit', function () {
                      return Ls();
                    }),
                    Ni.addEventListener('matchMediaRevert', function () {
                      return Ds();
                    }),
                    Ni.addEventListener('matchMedia', function () {
                      Ys(0, 1), Rs('matchMedia');
                    }),
                    Ni.matchMedia().add(
                      '(orientation: portrait)',
                      function () {
                        return Ms(), Ms;
                      }
                    ))
                  : console.warn('Requires GSAP 3.11.0 or later'),
                Ms(),
                ds(Bi, 'scroll', Es);
              var e,
                r,
                n = Xi.hasAttribute('style'),
                i = Xi.style,
                o = i.borderTopStyle,
                s = Ni.core.Animation.prototype;
              for (
                s.revert ||
                  Object.defineProperty(s, 'revert', {
                    value: function () {
                      return this.time(-0.01, !0);
                    },
                  }),
                  i.borderTopStyle = 'solid',
                  e = us(Xi),
                  Mi.m = Math.round(e.top + Mi.sc()) || 0,
                  Ei.m = Math.round(e.left + Ei.sc()) || 0,
                  o
                    ? (i.borderTopStyle = o)
                    : i.removeProperty('border-top-style'),
                  n ||
                    (Xi.setAttribute('style', ''),
                    Xi.removeAttribute('style')),
                  ji = setInterval(Cs, 250),
                  Ni.delayedCall(0.5, function () {
                    return (xo = 0);
                  }),
                  ds(Bi, 'touchcancel', Oo),
                  ds(Xi, 'touchstart', Oo),
                  ps(ds, Bi, 'pointerdown,touchstart,mousedown', Ao),
                  ps(ds, Bi, 'pointerup,touchend,mouseup', Po),
                  Qi = Ni.utils.checkPrefix('transform'),
                  Us.push(Qi),
                  Ii = wo(),
                  qi = Ni.delayedCall(0.2, Ys).pause(),
                  to = [
                    Bi,
                    'visibilitychange',
                    function () {
                      var t = Fi.innerWidth,
                        e = Fi.innerHeight;
                      Bi.hidden
                        ? ((Ki = t), (Ji = e))
                        : (Ki === t && Ji === e) || ks();
                    },
                    Bi,
                    'DOMContentLoaded',
                    Ys,
                    Fi,
                    'load',
                    Ys,
                    Fi,
                    'resize',
                    ks,
                  ],
                  Bo(ds),
                  Ts.forEach(function (t) {
                    return t.enable(0, 1);
                  }),
                  r = 0;
                r < di.length;
                r += 3
              )
                ms(gs, di[r], di[r + 1]), ms(gs, di[r], di[r + 2]);
            }
          }),
          (t.config = function (e) {
            'limitCallbacks' in e && (mo = !!e.limitCallbacks);
            var r = e.syncInterval;
            (r && clearInterval(ji)) || ((ji = r) && setInterval(Cs, r)),
              'ignoreMobileResize' in e &&
                (oo = 1 === t.isTouch && e.ignoreMobileResize),
              'autoRefreshEvents' in e &&
                (Bo(gs) || Bo(ds, e.autoRefreshEvents || 'none'),
                (no = -1 === (e.autoRefreshEvents + '').indexOf('resize')));
          }),
          (t.scrollerProxy = function (t, e) {
            var r = ki(t),
              n = di.indexOf(r),
              i = Lo(r);
            ~n && di.splice(n, i ? 6 : 2),
              e && (i ? gi.unshift(Fi, e, Xi, e, Yi, e) : gi.unshift(r, e));
          }),
          (t.clearMatchMedia = function (t) {
            Ts.forEach(function (e) {
              return e._ctx && e._ctx.query === t && e._ctx.kill(!0, !0);
            });
          }),
          (t.isInViewport = function (t, e, r) {
            var n = (Yo(t) ? ki(t) : t).getBoundingClientRect(),
              i = n[r ? Qo : $o] * e || 0;
            return r
              ? n.right - i > 0 && n.left + i < Fi.innerWidth
              : n.bottom - i > 0 && n.top + i < Fi.innerHeight;
          }),
          (t.positionInViewport = function (t, e, r) {
            Yo(t) && (t = ki(t));
            var n = t.getBoundingClientRect(),
              i = n[r ? Qo : $o],
              o =
                null == e
                  ? i / 2
                  : e in ys
                    ? ys[e] * i
                    : ~e.indexOf('%')
                      ? (parseFloat(e) * i) / 100
                      : parseFloat(e) || 0;
            return r
              ? (n.left + o) / Fi.innerWidth
              : (n.top + o) / Fi.innerHeight;
          }),
          (t.killAll = function (t) {
            if (
              (Ts.slice(0).forEach(function (t) {
                return 'ScrollSmoother' !== t.vars.id && t.kill();
              }),
              !0 !== t)
            ) {
              var e = As.killAll || [];
              (As = {}),
                e.forEach(function (t) {
                  return t();
                });
            }
          }),
          t
        );
      })();
    (na.version = '3.13.0'),
      (na.saveStyles = function (t) {
        return t
          ? Hi(t).forEach(function (t) {
              if (t && t.style) {
                var e = zs.indexOf(t);
                e >= 0 && zs.splice(e, 5),
                  zs.push(
                    t,
                    t.style.cssText,
                    t.getBBox && t.getAttribute('transform'),
                    Ni.core.getCache(t),
                    uo()
                  );
              }
            })
          : zs;
      }),
      (na.revert = function (t, e) {
        return Ls(!t, e);
      }),
      (na.create = function (t, e) {
        return new na(t, e);
      }),
      (na.refresh = function (t) {
        return t ? ks(!0) : (Ii || na.register()) && Ys(!0);
      }),
      (na.update = function (t) {
        return ++di.cache && qs(!0 === t ? 2 : 0);
      }),
      (na.clearScrollMemory = Ns),
      (na.maxScroll = function (t, e) {
        return Fo(t, e ? Ei : Mi);
      }),
      (na.getScrollFunc = function (t, e) {
        return Ai(ki(t), e ? Ei : Mi);
      }),
      (na.getById = function (t) {
        return Ss[t];
      }),
      (na.getAll = function () {
        return Ts.filter(function (t) {
          return 'ScrollSmoother' !== t.vars.id;
        });
      }),
      (na.isScrolling = function () {
        return !!So;
      }),
      (na.snapDirectional = fs),
      (na.addEventListener = function (t, e) {
        var r = As[t] || (As[t] = []);
        ~r.indexOf(e) || r.push(e);
      }),
      (na.removeEventListener = function (t, e) {
        var r = As[t],
          n = r && r.indexOf(e);
        n >= 0 && r.splice(n, 1);
      }),
      (na.batch = function (t, e) {
        var r,
          n = [],
          i = {},
          o = e.interval || 0.016,
          s = e.batchMax || 1e9,
          a = function (t, e) {
            var r = [],
              n = [],
              i = Ni.delayedCall(o, function () {
                e(r, n), (r = []), (n = []);
              }).pause();
            return function (t) {
              r.length || i.restart(!0),
                r.push(t.trigger),
                n.push(t),
                s <= r.length && i.progress(1);
            };
          };
        for (r in e)
          i[r] =
            'on' === r.substr(0, 2) && Xo(e[r]) && 'onRefreshInit' !== r
              ? a(0, e[r])
              : e[r];
        return (
          Xo(s) &&
            ((s = s()),
            ds(na, 'refresh', function () {
              return (s = e.batchMax());
            })),
          Hi(t).forEach(function (t) {
            var e = {};
            for (r in i) e[r] = i[r];
            (e.trigger = t), n.push(na.create(e));
          }),
          n
        );
      });
    var ia,
      oa = function (t, e, r, n) {
        return (
          e > n ? t(n) : e < 0 && t(0),
          r > n ? (n - e) / (r - e) : r < 0 ? e / (e - r) : 1
        );
      },
      sa = function t(e, r) {
        !0 === r
          ? e.style.removeProperty('touch-action')
          : (e.style.touchAction =
              !0 === r
                ? 'auto'
                : r
                  ? 'pan-' + r + (Li.isTouch ? ' pinch-zoom' : '')
                  : 'none'),
          e === Yi && t(Xi, r);
      },
      aa = { auto: 1, scroll: 1 },
      la = function (t) {
        var e,
          r = t.event,
          n = t.target,
          i = t.axis,
          o = (r.changedTouches ? r.changedTouches[0] : r).target,
          s = o._gsap || Ni.core.getCache(o),
          a = wo();
        if (!s._isScrollT || a - s._isScrollT > 2e3) {
          for (
            ;
            o &&
            o !== Xi &&
            ((o.scrollHeight <= o.clientHeight &&
              o.scrollWidth <= o.clientWidth) ||
              (!aa[(e = as(o)).overflowY] && !aa[e.overflowX]));

          )
            o = o.parentNode;
          (s._isScroll =
            o &&
            o !== n &&
            !Lo(o) &&
            (aa[(e = as(o)).overflowY] || aa[e.overflowX])),
            (s._isScrollT = a);
        }
        (s._isScroll || 'x' === i) &&
          (r.stopPropagation(), (r._gsapAllow = !0));
      },
      ua = function (t, e, r, n) {
        return Li.create({
          target: t,
          capture: !0,
          debounce: !1,
          lockAxis: !0,
          type: e,
          onWheel: (n = n && la),
          onPress: n,
          onDrag: n,
          onScroll: n,
          onEnable: function () {
            return r && ds(Bi, Li.eventTypes[0], ha, !1, !0);
          },
          onDisable: function () {
            return gs(Bi, Li.eventTypes[0], ha, !0);
          },
        });
      },
      ca = /(input|label|select|textarea)/i,
      ha = function (t) {
        var e = ca.test(t.target.tagName);
        (e || ia) && ((t._gsapAllow = !0), (ia = e));
      };
    function fa(t, e) {
      for (var r = 0; r < e.length; r++) {
        var n = e[r];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          'value' in n && (n.writable = !0),
          Object.defineProperty(t, n.key, n);
      }
    }
    (na.sort = function (t) {
      if (Xo(t)) return Ts.sort(t);
      var e = Fi.pageYOffset || 0;
      return (
        na.getAll().forEach(function (t) {
          return (t._sortY = t.trigger
            ? e + t.trigger.getBoundingClientRect().top
            : t.start + Fi.innerHeight);
        }),
        Ts.sort(
          t ||
            function (t, e) {
              return (
                -1e6 * (t.vars.refreshPriority || 0) +
                (t.vars.containerAnimation ? 1e6 : t._sortY) -
                ((e.vars.containerAnimation ? 1e6 : e._sortY) +
                  -1e6 * (e.vars.refreshPriority || 0))
              );
            }
        )
      );
    }),
      (na.observe = function (t) {
        return new Li(t);
      }),
      (na.normalizeScroll = function (t) {
        if (void 0 === t) return io;
        if (!0 === t && io) return io.enable();
        if (!1 === t) return io && io.kill(), void (io = t);
        var e =
          t instanceof Li
            ? t
            : (function (t) {
                qo(t) || (t = {}),
                  (t.preventDefault = t.isNormalizer = t.allowClicks = !0),
                  t.type || (t.type = 'wheel,touch'),
                  (t.debounce = !!t.debounce),
                  (t.id = t.id || 'normalizer');
                var e,
                  r,
                  n,
                  i,
                  o,
                  s,
                  a,
                  l,
                  u = t,
                  c = u.normalizeScrollX,
                  h = u.momentum,
                  f = u.allowNestedScroll,
                  p = u.onRelease,
                  d = ki(t.target) || Yi,
                  g = Ni.core.globals().ScrollSmoother,
                  m = g && g.get(),
                  v =
                    lo &&
                    ((t.content && ki(t.content)) ||
                      (m && !1 !== t.content && !m.smooth() && m.content())),
                  _ = Ai(d, Mi),
                  y = Ai(d, Ei),
                  b = 1,
                  x =
                    (Li.isTouch && Fi.visualViewport
                      ? Fi.visualViewport.scale * Fi.visualViewport.width
                      : Fi.outerWidth) / Fi.innerWidth,
                  w = 0,
                  T = Xo(h)
                    ? function () {
                        return h(e);
                      }
                    : function () {
                        return h || 2.8;
                      },
                  S = ua(d, t.type, !0, f),
                  C = function () {
                    return (i = !1);
                  },
                  E = Oo,
                  M = Oo,
                  k = function () {
                    (r = Fo(d, Mi)),
                      (M = Ui(lo ? 1 : 0, r)),
                      c && (E = Ui(0, Fo(d, Ei))),
                      (n = Is);
                  },
                  A = function () {
                    (v._gsap.y = Ro(parseFloat(v._gsap.y) + _.offset) + 'px'),
                      (v.style.transform =
                        'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ' +
                        parseFloat(v._gsap.y) +
                        ', 0, 1)'),
                      (_.offset = _.cacheID = 0);
                  },
                  P = function () {
                    k(),
                      o.isActive() &&
                        o.vars.scrollY > r &&
                        (_() > r
                          ? o.progress(1) && _(r)
                          : o.resetTo('scrollY', r));
                  };
                return (
                  v && Ni.set(v, { y: '+=0' }),
                  (t.ignoreCheck = function (t) {
                    return (
                      (lo &&
                        'touchmove' === t.type &&
                        (function () {
                          if (i) {
                            requestAnimationFrame(C);
                            var t = Ro(e.deltaY / 2),
                              r = M(_.v - t);
                            if (v && r !== _.v + _.offset) {
                              _.offset = r - _.v;
                              var n = Ro(
                                (parseFloat(v && v._gsap.y) || 0) - _.offset
                              );
                              (v.style.transform =
                                'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ' +
                                n +
                                ', 0, 1)'),
                                (v._gsap.y = n + 'px'),
                                (_.cacheID = di.cache),
                                qs();
                            }
                            return !0;
                          }
                          _.offset && A(), (i = !0);
                        })()) ||
                      (b > 1.05 && 'touchstart' !== t.type) ||
                      e.isGesturing ||
                      (t.touches && t.touches.length > 1)
                    );
                  }),
                  (t.onPress = function () {
                    i = !1;
                    var t = b;
                    (b = Ro(
                      ((Fi.visualViewport && Fi.visualViewport.scale) || 1) / x
                    )),
                      o.pause(),
                      t !== b && sa(d, b > 1.01 || (!c && 'x')),
                      (s = y()),
                      (a = _()),
                      k(),
                      (n = Is);
                  }),
                  (t.onRelease = t.onGestureStart =
                    function (t, e) {
                      if ((_.offset && A(), e)) {
                        di.cache++;
                        var n,
                          i,
                          s = T();
                        c &&
                          ((i = (n = y()) + (0.05 * s * -t.velocityX) / 0.227),
                          (s *= oa(y, n, i, Fo(d, Ei))),
                          (o.vars.scrollX = E(i))),
                          (i = (n = _()) + (0.05 * s * -t.velocityY) / 0.227),
                          (s *= oa(_, n, i, Fo(d, Mi))),
                          (o.vars.scrollY = M(i)),
                          o.invalidate().duration(s).play(0.01),
                          ((lo && o.vars.scrollY >= r) || n >= r - 1) &&
                            Ni.to({}, { onUpdate: P, duration: s });
                      } else l.restart(!0);
                      p && p(t);
                    }),
                  (t.onWheel = function () {
                    o._ts && o.pause(),
                      wo() - w > 1e3 && ((n = 0), (w = wo()));
                  }),
                  (t.onChange = function (t, e, r, i, o) {
                    if (
                      (Is !== n && k(),
                      e &&
                        c &&
                        y(
                          E(i[2] === e ? s + (t.startX - t.x) : y() + e - i[1])
                        ),
                      r)
                    ) {
                      _.offset && A();
                      var l = o[2] === r,
                        u = l ? a + t.startY - t.y : _() + r - o[1],
                        h = M(u);
                      l && u !== h && (a += h - u), _(h);
                    }
                    (r || e) && qs();
                  }),
                  (t.onEnable = function () {
                    sa(d, !c && 'x'),
                      na.addEventListener('refresh', P),
                      ds(Fi, 'resize', P),
                      _.smooth &&
                        ((_.target.style.scrollBehavior = 'auto'),
                        (_.smooth = y.smooth = !1)),
                      S.enable();
                  }),
                  (t.onDisable = function () {
                    sa(d, !0),
                      gs(Fi, 'resize', P),
                      na.removeEventListener('refresh', P),
                      S.kill();
                  }),
                  (t.lockAxis = !1 !== t.lockAxis),
                  ((e = new Li(t)).iOS = lo),
                  lo && !_() && _(1),
                  lo && Ni.ticker.add(Oo),
                  (l = e._dc),
                  (o = Ni.to(e, {
                    ease: 'power4',
                    paused: !0,
                    inherit: !1,
                    scrollX: c ? '+=0.1' : '+=0',
                    scrollY: '+=0.1',
                    modifiers: {
                      scrollY: ta(_, _(), function () {
                        return o.pause();
                      }),
                    },
                    onUpdate: qs,
                    onComplete: l.vars.onComplete,
                  })),
                  e
                );
              })(t);
        return (
          io && io.target === e.target && io.kill(),
          Lo(e.target) && (io = e),
          e
        );
      }),
      (na.core = {
        _getVelocityProp: Pi,
        _inputObserver: ua,
        _scrollers: di,
        _proxies: gi,
        bridge: {
          ss: function () {
            So || Rs('scrollStart'), (So = wo());
          },
          ref: function () {
            return Gi;
          },
        },
      }),
      Do() && Ni.registerPlugin(na);
    var pa,
      da,
      ga,
      ma,
      va,
      _a,
      ya,
      ba,
      xa,
      wa,
      Ta,
      Sa,
      Ca,
      Ea,
      Ma,
      ka = function () {
        return 'undefined' != typeof window;
      },
      Aa = function () {
        return pa || (ka() && (pa = window.gsap) && pa.registerPlugin && pa);
      },
      Pa = function (t) {
        return xa.maxScroll(t || ga);
      },
      Oa = (function () {
        function t(e) {
          var r = this;
          da ||
            t.register(pa) ||
            console.warn('Please gsap.registerPlugin(ScrollSmoother)'),
            (e = this.vars = e || {}),
            wa && wa.kill(),
            (wa = this),
            Ea(this);
          var n,
            i,
            o,
            s,
            a,
            l,
            u,
            c,
            h,
            f,
            p,
            d,
            g,
            m,
            v,
            _,
            y = e,
            b = y.smoothTouch,
            x = y.onUpdate,
            w = y.onStop,
            T = y.smooth,
            S = y.onFocusIn,
            C = y.normalizeScroll,
            E = y.wholePixels,
            M = this,
            k = e.effectsPrefix || '',
            A = xa.getScrollFunc(ga),
            P =
              1 === xa.isTouch
                ? !0 === b
                  ? 0.8
                  : parseFloat(b) || 0
                : 0 === T || !1 === T
                  ? 0
                  : parseFloat(T) || 0.8,
            O = (P && +e.speed) || 1,
            R = 0,
            z = 0,
            D = 1,
            L = Sa(0),
            N = function () {
              return L.update(-R);
            },
            I = { y: 0 },
            F = function () {
              return (n.style.overflow = 'visible');
            },
            B = function (t) {
              t.update();
              var e = t.getTween();
              e && (e.pause(), (e._time = e._dur), (e._tTime = e._tDur)),
                (v = !1),
                t.animation.progress(t.progress, !0);
            },
            Y = function (e, r) {
              ((e !== R && !f) || r) &&
                (E && (e = Math.round(e)),
                P &&
                  ((n.style.transform =
                    'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ' +
                    e +
                    ', 0, 1)'),
                  (n._gsap.y = e + 'px')),
                (z = e - R),
                (R = e),
                xa.isUpdating || t.isRefreshing || xa.update());
            },
            X = function (t) {
              return arguments.length
                ? (t < 0 && (t = 0),
                  (I.y = -t),
                  (v = !0),
                  f ? (R = -t) : Y(-t),
                  xa.isRefreshing ? s.update() : A(t / O),
                  this)
                : -R;
            },
            V =
              'undefined' != typeof ResizeObserver &&
              !1 !== e.autoResize &&
              new ResizeObserver(function () {
                if (!xa.isRefreshing) {
                  var t = Pa(i) * O;
                  t < -R && X(t), Ma.restart(!0);
                }
              }),
            q = function (t) {
              (i.scrollTop = 0),
                (t.target.contains && t.target.contains(i)) ||
                  (S && !1 === S(r, t)) ||
                  (xa.isInViewport(t.target) ||
                    t.target === _ ||
                    r.scrollTo(t.target, !1, 'center center'),
                  (_ = t.target));
            },
            H = function (t, e) {
              if (t < e.start) return t;
              var r = isNaN(e.ratio) ? 1 : e.ratio,
                n = e.end - e.start,
                i = t - e.start,
                o = e.offset || 0,
                s = e.pins || [],
                a = s.offset || 0,
                l =
                  (e._startClamp && e.start <= 0) || (e.pins && e.pins.offset)
                    ? 0
                    : e._endClamp && e.end === Pa()
                      ? 1
                      : 0.5;
              return (
                s.forEach(function (e) {
                  (n -= e.distance), e.nativeStart <= t && (i -= e.distance);
                }),
                a && (i *= (n - a / r) / n),
                t + (i - o * l) / r - i
              );
            },
            U = function t(e, r, n) {
              n || (e.pins.length = e.pins.offset = 0);
              var i,
                o,
                s,
                a,
                l,
                u,
                c,
                h,
                f = e.pins,
                p = e.markers;
              for (c = 0; c < r.length; c++)
                if (
                  ((h = r[c]),
                  e.trigger &&
                    h.trigger &&
                    e !== h &&
                    (h.trigger === e.trigger ||
                      h.pinnedContainer === e.trigger ||
                      e.trigger.contains(h.trigger)) &&
                    ((l = h._startNative || h._startClamp || h.start),
                    (u = h._endNative || h._endClamp || h.end),
                    (s = H(l, e)),
                    (a = h.pin && u > 0 ? s + (u - l) : H(u, e)),
                    h.setPositions(
                      s,
                      a,
                      !0,
                      (h._startClamp ? Math.max(0, s) : s) - l
                    ),
                    h.markerStart &&
                      p.push(
                        pa.quickSetter([h.markerStart, h.markerEnd], 'y', 'px')
                      ),
                    h.pin && h.end > 0 && !n))
                ) {
                  if (
                    ((i = h.end - h.start), (o = e._startClamp && h.start < 0))
                  ) {
                    if (e.start > 0)
                      return (
                        e.setPositions(
                          0,
                          e.end + (e._startNative - e.start),
                          !0
                        ),
                        void t(e, r)
                      );
                    (i += h.start), (f.offset = -h.start);
                  }
                  f.push({
                    start: h.start,
                    nativeStart: l,
                    end: h.end,
                    distance: i,
                    trig: h,
                  }),
                    e.setPositions(e.start, e.end + (o ? -h.start : i), !0);
                }
            },
            W = function (t, e) {
              a.forEach(function (r) {
                return U(r, t, e);
              });
            },
            j = function () {
              (va = ma.documentElement),
                (_a = ma.body),
                F(),
                requestAnimationFrame(F),
                a &&
                  (xa.getAll().forEach(function (t) {
                    (t._startNative = t.start), (t._endNative = t.end);
                  }),
                  a.forEach(function (t) {
                    var e = t._startClamp || t.start,
                      r = t.autoSpeed
                        ? Math.min(Pa(), t.end)
                        : e + Math.abs((t.end - e) / t.ratio),
                      n = r - t.end;
                    if ((e -= n / 2) > (r -= n / 2)) {
                      var i = e;
                      (e = r), (r = i);
                    }
                    t._startClamp && e < 0
                      ? ((n =
                          (r = t.ratio < 0 ? Pa() : t.end / t.ratio) - t.end),
                        (e = 0))
                      : (t.ratio < 0 || (t._endClamp && r >= Pa())) &&
                        (n =
                          ((r = Pa()) -
                            (e =
                              t.ratio < 0 || t.ratio > 1
                                ? 0
                                : r - (r - t.start) / t.ratio)) *
                            t.ratio -
                          (t.end - t.start)),
                      (t.offset = n || 1e-4),
                      (t.pins.length = t.pins.offset = 0),
                      t.setPositions(e, r, !0);
                  }),
                  W(xa.sort())),
                L.reset();
            },
            G = function () {
              return xa.addEventListener('refresh', j);
            },
            Z = function () {
              return (
                a &&
                a.forEach(function (t) {
                  return t.vars.onRefresh(t);
                })
              );
            },
            Q = function () {
              return (
                a &&
                  a.forEach(function (t) {
                    return t.vars.onRefreshInit(t);
                  }),
                Z
              );
            },
            $ = function (t, e, r, n) {
              return function () {
                var i = 'function' == typeof e ? e(r, n) : e;
                i ||
                  0 === i ||
                  (i =
                    n.getAttribute('data-' + k + t) ||
                    ('speed' === t ? 1 : 0)),
                  n.setAttribute('data-' + k + t, i);
                var o = 'clamp(' === (i + '').substr(0, 6);
                return { clamp: o, value: o ? i.substr(6, i.length - 7) : i };
              };
            },
            K = function (t, e, r, n, o) {
              o = ('function' == typeof o ? o(n, t) : o) || 0;
              var s,
                l,
                u,
                c,
                h,
                f,
                p = $('speed', e, n, t),
                d = $('lag', r, n, t),
                g = pa.getProperty(t, 'y'),
                m = t._gsap,
                v = [],
                _ = function () {
                  (e = p()),
                    (r = parseFloat(d().value)),
                    (s = parseFloat(e.value) || 1),
                    (u = 'auto' === e.value),
                    (h =
                      u || (l && l._startClamp && l.start <= 0) || v.offset
                        ? 0
                        : l && l._endClamp && l.end === Pa()
                          ? 1
                          : 0.5),
                    c && c.kill(),
                    (c =
                      r &&
                      pa.to(t, {
                        ease: Ta,
                        overwrite: !1,
                        y: '+=0',
                        duration: r,
                      })),
                    l && ((l.ratio = s), (l.autoSpeed = u));
                },
                y = function () {
                  (m.y = g + 'px'), m.renderTransform(1), _();
                },
                b = [],
                x = 0,
                w = function (e) {
                  if (u) {
                    y();
                    var r = (function (t, e) {
                      var r,
                        n,
                        i = t.parentNode || va,
                        o = t.getBoundingClientRect(),
                        s = i.getBoundingClientRect(),
                        a = s.top - o.top,
                        l = s.bottom - o.bottom,
                        u = (Math.abs(a) > Math.abs(l) ? a : l) / (1 - e),
                        c = -u * e;
                      return (
                        u > 0 &&
                          ((n =
                            0.5 == (r = s.height / (ga.innerHeight + s.height))
                              ? 2 * s.height
                              : 2 *
                                Math.min(
                                  s.height,
                                  Math.abs((-u * r) / (2 * r - 1))
                                ) *
                                (e || 1)),
                          (c += e ? -n * e : -n / 2),
                          (u += n)),
                        { change: u, offset: c }
                      );
                    })(t, ba(0, 1, -e.start / (e.end - e.start)));
                    (x = r.change), (f = r.offset);
                  } else
                    (f = v.offset || 0), (x = (e.end - e.start - f) * (1 - s));
                  v.forEach(function (t) {
                    return (x -= t.distance * (1 - s));
                  }),
                    (e.offset = x || 0.001),
                    e.vars.onUpdate(e),
                    c && c.progress(1);
                };
              return (
                _(),
                (1 !== s || u || c) &&
                  ((l = xa.create({
                    trigger: u ? t.parentNode : t,
                    start: function () {
                      return e.clamp
                        ? 'clamp(top bottom+=' + o + ')'
                        : 'top bottom+=' + o;
                    },
                    end: function () {
                      return e.value < 0
                        ? 'max'
                        : e.clamp
                          ? 'clamp(bottom top-=' + o + ')'
                          : 'bottom top-=' + o;
                    },
                    scroller: i,
                    scrub: !0,
                    refreshPriority: -999,
                    onRefreshInit: y,
                    onRefresh: w,
                    onKill: function (t) {
                      var e = a.indexOf(t);
                      e >= 0 && a.splice(e, 1), y();
                    },
                    onUpdate: function (t) {
                      var e,
                        r,
                        n,
                        i,
                        o = g + x * (t.progress - h),
                        s = v.length,
                        a = 0;
                      if (t.offset) {
                        if (s) {
                          for (r = -R, n = t.end; s--; ) {
                            if (
                              (e = v[s]).trig.isActive ||
                              (r >= e.start && r <= e.end)
                            )
                              return void (
                                c &&
                                ((e.trig.progress +=
                                  e.trig.direction < 0 ? 0.001 : -0.001),
                                e.trig.update(0, 0, 1),
                                c.resetTo('y', parseFloat(m.y), -z, !0),
                                D && c.progress(1))
                              );
                            r > e.end && (a += e.distance), (n -= e.distance);
                          }
                          o =
                            g +
                            a +
                            x *
                              ((pa.utils.clamp(t.start, t.end, r) -
                                t.start -
                                a) /
                                (n - t.start) -
                                h);
                        }
                        b.length &&
                          !u &&
                          b.forEach(function (t) {
                            return t(o - a);
                          }),
                          (i = o + f),
                          (o = Math.round(1e5 * i) / 1e5 || 0),
                          c
                            ? (c.resetTo('y', o, -z, !0), D && c.progress(1))
                            : ((m.y = o + 'px'), m.renderTransform(1));
                      }
                    },
                  })),
                  w(l),
                  (pa.core.getCache(l.trigger).stRevert = Q),
                  (l.startY = g),
                  (l.pins = v),
                  (l.markers = b),
                  (l.ratio = s),
                  (l.autoSpeed = u),
                  (t.style.willChange = 'transform')),
                l
              );
            };
          function J() {
            return (
              (o = n.clientHeight),
              (n.style.overflow = 'visible'),
              (_a.style.height =
                ga.innerHeight + (o - ga.innerHeight) / O + 'px'),
              o - ga.innerHeight
            );
          }
          G(),
            xa.addEventListener('killAll', G),
            pa.delayedCall(0.5, function () {
              return (D = 0);
            }),
            (this.scrollTop = X),
            (this.scrollTo = function (t, e, n) {
              var i = pa.utils.clamp(
                0,
                Pa(),
                isNaN(t) ? r.offset(t, n, !!e && !f) : +t
              );
              e
                ? f
                  ? pa.to(r, {
                      duration: P,
                      scrollTop: i,
                      overwrite: 'auto',
                      ease: Ta,
                    })
                  : A(i)
                : X(i);
            }),
            (this.offset = function (t, e, r) {
              var n,
                i = (t = ya(t)[0]).style.cssText,
                o = xa.create({ trigger: t, start: e || 'top top' });
              return (
                a && (D ? xa.refresh() : W([o], !0)),
                (n = o.start / (r ? O : 1)),
                o.kill(!1),
                (t.style.cssText = i),
                (pa.core.getCache(t).uncache = 1),
                n
              );
            }),
            (this.content = function (t) {
              if (arguments.length) {
                var e =
                  ya(t || '#smooth-content')[0] ||
                  console.warn(
                    'ScrollSmoother needs a valid content element.'
                  ) ||
                  _a.children[0];
                return (
                  e !== n &&
                    ((h = (n = e).getAttribute('style') || ''),
                    V && V.observe(n),
                    pa.set(n, {
                      overflow: 'visible',
                      width: '100%',
                      boxSizing: 'border-box',
                      y: '+=0',
                    }),
                    P || pa.set(n, { clearProps: 'transform' })),
                  this
                );
              }
              return n;
            }),
            (this.wrapper = function (t) {
              return arguments.length
                ? ((i =
                    ya(t || '#smooth-wrapper')[0] ||
                    (function (t) {
                      var e = ma.querySelector('.ScrollSmoother-wrapper');
                      return (
                        e ||
                          ((e = ma.createElement('div')).classList.add(
                            'ScrollSmoother-wrapper'
                          ),
                          t.parentNode.insertBefore(e, t),
                          e.appendChild(t)),
                        e
                      );
                    })(n)),
                  (c = i.getAttribute('style') || ''),
                  J(),
                  pa.set(
                    i,
                    P
                      ? {
                          overflow: 'hidden',
                          position: 'fixed',
                          height: '100%',
                          width: '100%',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                        }
                      : {
                          overflow: 'visible',
                          position: 'relative',
                          width: '100%',
                          height: 'auto',
                          top: 'auto',
                          bottom: 'auto',
                          left: 'auto',
                          right: 'auto',
                        }
                  ),
                  this)
                : i;
            }),
            (this.effects = function (t, e) {
              var r;
              if ((a || (a = []), !t)) return a.slice(0);
              (t = ya(t)).forEach(function (t) {
                for (var e = a.length; e--; )
                  a[e].trigger === t && a[e].kill();
              });
              var n,
                i,
                o = (e = e || {}),
                s = o.speed,
                l = o.lag,
                u = o.effectsPadding,
                c = [];
              for (n = 0; n < t.length; n++)
                (i = K(t[n], s, l, n, u)) && c.push(i);
              return (
                (r = a).push.apply(r, c), !1 !== e.refresh && xa.refresh(), c
              );
            }),
            (this.sections = function (t, e) {
              var r;
              if ((l || (l = []), !t)) return l.slice(0);
              var n = ya(t).map(function (t) {
                return xa.create({
                  trigger: t,
                  start: 'top 120%',
                  end: 'bottom -20%',
                  onToggle: function (e) {
                    (t.style.opacity = e.isActive ? '1' : '0'),
                      (t.style.pointerEvents = e.isActive ? 'all' : 'none');
                  },
                });
              });
              return (
                e && e.add ? (r = l).push.apply(r, n) : (l = n.slice(0)), n
              );
            }),
            this.content(e.content),
            this.wrapper(e.wrapper),
            (this.render = function (t) {
              return Y(t || 0 === t ? t : R);
            }),
            (this.getVelocity = function () {
              return L.getVelocity(-R);
            }),
            xa.scrollerProxy(i, {
              scrollTop: X,
              scrollHeight: function () {
                return J() && _a.scrollHeight;
              },
              fixedMarkers: !1 !== e.fixedMarkers && !!P,
              content: n,
              getBoundingClientRect: function () {
                return {
                  top: 0,
                  left: 0,
                  width: ga.innerWidth,
                  height: ga.innerHeight,
                };
              },
            }),
            xa.defaults({ scroller: i });
          var tt = xa.getAll().filter(function (t) {
            return t.scroller === ga || t.scroller === i;
          });
          tt.forEach(function (t) {
            return t.revert(!0, !0);
          }),
            (s = xa.create({
              animation: pa.fromTo(
                I,
                {
                  y: function () {
                    return (m = 0), 0;
                  },
                },
                {
                  y: function () {
                    return (m = 1), -J();
                  },
                  immediateRender: !1,
                  ease: 'none',
                  data: 'ScrollSmoother',
                  duration: 100,
                  onUpdate: function () {
                    if (m) {
                      var t = v;
                      t && (B(s), (I.y = R)), Y(I.y, t), N(), x && !f && x(M);
                    }
                  },
                }
              ),
              onRefreshInit: function (e) {
                if (!t.isRefreshing) {
                  if (((t.isRefreshing = !0), a)) {
                    var r = xa.getAll().filter(function (t) {
                      return !!t.pin;
                    });
                    a.forEach(function (t) {
                      t.vars.pinnedContainer ||
                        r.forEach(function (e) {
                          if (e.pin.contains(t.trigger)) {
                            var r = t.vars;
                            (r.pinnedContainer = e.pin),
                              (t.vars = null),
                              t.init(r, t.animation);
                          }
                        });
                    });
                  }
                  var n = e.getTween();
                  (g = n && n._end > n._dp._time),
                    (d = R),
                    (I.y = 0),
                    P &&
                      (1 === xa.isTouch && (i.style.position = 'absolute'),
                      (i.scrollTop = 0),
                      1 === xa.isTouch && (i.style.position = 'fixed'));
                }
              },
              onRefresh: function (e) {
                e.animation.invalidate(),
                  e.setPositions(e.start, J() / O),
                  g || B(e),
                  (I.y = -A() * O),
                  Y(I.y),
                  D ||
                    (g && (v = !1),
                    e.animation.progress(
                      pa.utils.clamp(0, 1, d / O / -e.end)
                    )),
                  g && ((e.progress -= 0.001), e.update()),
                  (t.isRefreshing = !1);
              },
              id: 'ScrollSmoother',
              scroller: ga,
              invalidateOnRefresh: !0,
              start: 0,
              refreshPriority: -9999,
              end: function () {
                return J() / O;
              },
              onScrubComplete: function () {
                L.reset(), w && w(r);
              },
              scrub: P || !0,
            })),
            (this.smooth = function (t) {
              return (
                arguments.length &&
                  ((O = ((P = t || 0) && +e.speed) || 1), s.scrubDuration(t)),
                s.getTween() ? s.getTween().duration() : 0
              );
            }),
            s.getTween() && (s.getTween().vars.ease = e.ease || Ta),
            (this.scrollTrigger = s),
            e.effects &&
              this.effects(
                !0 === e.effects
                  ? '[data-' + k + 'speed], [data-' + k + 'lag]'
                  : e.effects,
                { effectsPadding: e.effectsPadding, refresh: !1 }
              ),
            e.sections &&
              this.sections(!0 === e.sections ? '[data-section]' : e.sections),
            tt.forEach(function (t) {
              (t.vars.scroller = i),
                t.revert(!1, !0),
                t.init(t.vars, t.animation);
            }),
            (this.paused = function (t, e) {
              return arguments.length
                ? (!!f !== t &&
                    (t
                      ? (s.getTween() && s.getTween().pause(),
                        A(-R / O),
                        L.reset(),
                        (p = xa.normalizeScroll()) && p.disable(),
                        ((f = xa.observe({
                          preventDefault: !0,
                          type: 'wheel,touch,scroll',
                          debounce: !1,
                          allowClicks: !0,
                          onChangeY: function () {
                            return X(-R);
                          },
                        })).nested = Ca(
                          va,
                          'wheel,touch,scroll',
                          !0,
                          !1 !== e
                        )))
                      : (f.nested.kill(),
                        f.kill(),
                        (f = 0),
                        p && p.enable(),
                        (s.progress = (-R / O - s.start) / (s.end - s.start)),
                        B(s))),
                  this)
                : !!f;
            }),
            (this.kill = this.revert =
              function () {
                r.paused(!1), B(s), s.kill();
                for (var t = (a || []).concat(l || []), e = t.length; e--; )
                  t[e].kill();
                xa.scrollerProxy(i),
                  xa.removeEventListener('killAll', G),
                  xa.removeEventListener('refresh', j),
                  (i.style.cssText = c),
                  (n.style.cssText = h);
                var o = xa.defaults({});
                o && o.scroller === i && xa.defaults({ scroller: ga }),
                  r.normalizer && xa.normalizeScroll(!1),
                  clearInterval(u),
                  (wa = null),
                  V && V.disconnect(),
                  _a.style.removeProperty('height'),
                  ga.removeEventListener('focusin', q);
              }),
            (this.refresh = function (t, e) {
              return s.refresh(t, e);
            }),
            C &&
              (this.normalizer = xa.normalizeScroll(
                !0 === C ? { debounce: !0, content: !P && n } : C
              )),
            xa.config(e),
            'scrollBehavior' in ga.getComputedStyle(_a) &&
              pa.set([_a, va], { scrollBehavior: 'auto' }),
            ga.addEventListener('focusin', q),
            (u = setInterval(N, 250)),
            'loading' === ma.readyState ||
              requestAnimationFrame(function () {
                return xa.refresh();
              });
        }
        var e, r;
        return (
          (t.register = function (e) {
            return (
              da ||
                ((pa = e || Aa()),
                ka() &&
                  window.document &&
                  ((ga = window),
                  (ma = document),
                  (va = ma.documentElement),
                  (_a = ma.body)),
                pa &&
                  ((ya = pa.utils.toArray),
                  (ba = pa.utils.clamp),
                  (Ta = pa.parseEase('expo')),
                  (Ea = pa.core.context || function () {}),
                  (xa = pa.core.globals().ScrollTrigger),
                  pa.core.globals('ScrollSmoother', t),
                  _a &&
                    xa &&
                    ((Ma = pa
                      .delayedCall(0.2, function () {
                        return xa.isRefreshing || (wa && wa.refresh());
                      })
                      .pause()),
                    (Sa = xa.core._getVelocityProp),
                    (Ca = xa.core._inputObserver),
                    (t.refresh = xa.refresh),
                    (da = 1)))),
              da
            );
          }),
          (e = t),
          (r = [
            {
              key: 'progress',
              get: function () {
                return this.scrollTrigger
                  ? this.scrollTrigger.animation._time / 100
                  : 0;
              },
            },
          ]) && fa(e.prototype, r),
          t
        );
      })();
    (Oa.version = '3.13.0'),
      (Oa.create = function (t) {
        return wa && t && wa.content() === ya(t.content)[0] ? wa : new Oa(t);
      }),
      (Oa.get = function () {
        return wa;
      }),
      Aa() && pa.registerPlugin(Oa);
    var Ra,
      za,
      Da,
      La,
      Na,
      Ia,
      Fa,
      Ba,
      Ya,
      Xa = 'transform',
      Va = Xa + 'Origin',
      qa = function (t) {
        var e = t.ownerDocument || t;
        !(Xa in t.style) &&
          'msTransform' in t.style &&
          (Va = (Xa = 'msTransform') + 'Origin');
        for (; e.parentNode && (e = e.parentNode); );
        if (((za = window), (Fa = new Ja()), e)) {
          (Ra = e),
            (Da = e.documentElement),
            (La = e.body),
            ((Ba = Ra.createElementNS(
              'http://www.w3.org/2000/svg',
              'g'
            )).style.transform = 'none');
          var r = e.createElement('div'),
            n = e.createElement('div'),
            i = e && (e.body || e.firstElementChild);
          i &&
            i.appendChild &&
            (i.appendChild(r),
            r.appendChild(n),
            r.setAttribute(
              'style',
              'position:static;transform:translate3d(0,0,1px)'
            ),
            (Ya = n.offsetParent !== r),
            i.removeChild(r));
        }
        return e;
      },
      Ha = [],
      Ua = [],
      Wa = function () {
        return (
          za.pageYOffset || Ra.scrollTop || Da.scrollTop || La.scrollTop || 0
        );
      },
      ja = function () {
        return (
          za.pageXOffset ||
          Ra.scrollLeft ||
          Da.scrollLeft ||
          La.scrollLeft ||
          0
        );
      },
      Ga = function (t) {
        return (
          t.ownerSVGElement ||
          ('svg' === (t.tagName + '').toLowerCase() ? t : null)
        );
      },
      Za = function t(e) {
        return (
          'fixed' === za.getComputedStyle(e).position ||
          ((e = e.parentNode) && 1 === e.nodeType ? t(e) : void 0)
        );
      },
      Qa = function t(e, r) {
        if (e.parentNode && (Ra || qa(e))) {
          var n = Ga(e),
            i = n
              ? n.getAttribute('xmlns') || 'http://www.w3.org/2000/svg'
              : 'http://www.w3.org/1999/xhtml',
            o = n ? (r ? 'rect' : 'g') : 'div',
            s = 2 !== r ? 0 : 100,
            a = 3 === r ? 100 : 0,
            l =
              'position:absolute;display:block;pointer-events:none;margin:0;padding:0;',
            u = Ra.createElementNS
              ? Ra.createElementNS(i.replace(/^https/, 'http'), o)
              : Ra.createElement(o);
          return (
            r &&
              (n
                ? (Ia || (Ia = t(e)),
                  u.setAttribute('width', 0.01),
                  u.setAttribute('height', 0.01),
                  u.setAttribute(
                    'transform',
                    'translate(' + s + ',' + a + ')'
                  ),
                  Ia.appendChild(u))
                : (Na || ((Na = t(e)).style.cssText = l),
                  (u.style.cssText =
                    l +
                    'width:0.1px;height:0.1px;top:' +
                    a +
                    'px;left:' +
                    s +
                    'px'),
                  Na.appendChild(u))),
            u
          );
        }
        throw 'Need document and parent.';
      },
      $a = function (t) {
        var e,
          r = t.getCTM();
        return (
          r ||
            ((e = t.style[Xa]),
            (t.style[Xa] = 'none'),
            t.appendChild(Ba),
            (r = Ba.getCTM()),
            t.removeChild(Ba),
            e
              ? (t.style[Xa] = e)
              : t.style.removeProperty(
                  Xa.replace(/([A-Z])/g, '-$1').toLowerCase()
                )),
          r || Fa.clone()
        );
      },
      Ka = function (t, e, r, n, i, o, s) {
        return (
          (t.a = e), (t.b = r), (t.c = n), (t.d = i), (t.e = o), (t.f = s), t
        );
      },
      Ja = (function () {
        function t(t, e, r, n, i, o) {
          void 0 === t && (t = 1),
            void 0 === e && (e = 0),
            void 0 === r && (r = 0),
            void 0 === n && (n = 1),
            void 0 === i && (i = 0),
            void 0 === o && (o = 0),
            Ka(this, t, e, r, n, i, o);
        }
        var e = t.prototype;
        return (
          (e.inverse = function () {
            var t = this.a,
              e = this.b,
              r = this.c,
              n = this.d,
              i = this.e,
              o = this.f,
              s = t * n - e * r || 1e-10;
            return Ka(
              this,
              n / s,
              -e / s,
              -r / s,
              t / s,
              (r * o - n * i) / s,
              -(t * o - e * i) / s
            );
          }),
          (e.multiply = function (t) {
            var e = this.a,
              r = this.b,
              n = this.c,
              i = this.d,
              o = this.e,
              s = this.f,
              a = t.a,
              l = t.c,
              u = t.b,
              c = t.d,
              h = t.e,
              f = t.f;
            return Ka(
              this,
              a * e + u * n,
              a * r + u * i,
              l * e + c * n,
              l * r + c * i,
              o + h * e + f * n,
              s + h * r + f * i
            );
          }),
          (e.clone = function () {
            return new t(this.a, this.b, this.c, this.d, this.e, this.f);
          }),
          (e.equals = function (t) {
            var e = this.a,
              r = this.b,
              n = this.c,
              i = this.d,
              o = this.e,
              s = this.f;
            return (
              e === t.a &&
              r === t.b &&
              n === t.c &&
              i === t.d &&
              o === t.e &&
              s === t.f
            );
          }),
          (e.apply = function (t, e) {
            void 0 === e && (e = {});
            var r = t.x,
              n = t.y,
              i = this.a,
              o = this.b,
              s = this.c,
              a = this.d,
              l = this.e,
              u = this.f;
            return (
              (e.x = r * i + n * s + l || 0), (e.y = r * o + n * a + u || 0), e
            );
          }),
          t
        );
      })();
    function tl(t, e, r, n) {
      if (!t || !t.parentNode || (Ra || qa(t)).documentElement === t)
        return new Ja();
      var i = (function (t) {
          for (var e, r; t && t !== La; )
            (r = t._gsap) && r.uncache && r.get(t, 'x'),
              r &&
                !r.scaleX &&
                !r.scaleY &&
                r.renderTransform &&
                ((r.scaleX = r.scaleY = 1e-4),
                r.renderTransform(1, r),
                e ? e.push(r) : (e = [r])),
              (t = t.parentNode);
          return e;
        })(t),
        o = Ga(t) ? Ha : Ua,
        s = (function (t, e) {
          var r,
            n,
            i,
            o,
            s,
            a,
            l = Ga(t),
            u = t === l,
            c = l ? Ha : Ua,
            h = t.parentNode,
            f =
              h && !l && h.shadowRoot && h.shadowRoot.appendChild
                ? h.shadowRoot
                : h;
          if (t === za) return t;
          if (
            (c.length || c.push(Qa(t, 1), Qa(t, 2), Qa(t, 3)),
            (r = l ? Ia : Na),
            l)
          )
            u
              ? ((o = -(i = $a(t)).e / i.a), (s = -i.f / i.d), (n = Fa))
              : t.getBBox
                ? ((i = t.getBBox()),
                  (n = (n = t.transform ? t.transform.baseVal : {})
                    .numberOfItems
                    ? n.numberOfItems > 1
                      ? (function (t) {
                          for (
                            var e = new Ja(), r = 0;
                            r < t.numberOfItems;
                            r++
                          )
                            e.multiply(t.getItem(r).matrix);
                          return e;
                        })(n)
                      : n.getItem(0).matrix
                    : Fa),
                  (o = n.a * i.x + n.c * i.y),
                  (s = n.b * i.x + n.d * i.y))
                : ((n = new Ja()), (o = s = 0)),
              e && 'g' === t.tagName.toLowerCase() && (o = s = 0),
              (u ? l : h).appendChild(r),
              r.setAttribute(
                'transform',
                'matrix(' +
                  n.a +
                  ',' +
                  n.b +
                  ',' +
                  n.c +
                  ',' +
                  n.d +
                  ',' +
                  (n.e + o) +
                  ',' +
                  (n.f + s) +
                  ')'
              );
          else {
            if (((o = s = 0), Ya))
              for (
                n = t.offsetParent, i = t;
                i && (i = i.parentNode) && i !== n && i.parentNode;

              )
                (za.getComputedStyle(i)[Xa] + '').length > 4 &&
                  ((o = i.offsetLeft), (s = i.offsetTop), (i = 0));
            if (
              'absolute' !== (a = za.getComputedStyle(t)).position &&
              'fixed' !== a.position
            )
              for (n = t.offsetParent; h && h !== n; )
                (o += h.scrollLeft || 0),
                  (s += h.scrollTop || 0),
                  (h = h.parentNode);
            ((i = r.style).top = t.offsetTop - s + 'px'),
              (i.left = t.offsetLeft - o + 'px'),
              (i[Xa] = a[Xa]),
              (i[Va] = a[Va]),
              (i.position = 'fixed' === a.position ? 'fixed' : 'absolute'),
              f.appendChild(r);
          }
          return r;
        })(t, r),
        a = o[0].getBoundingClientRect(),
        l = o[1].getBoundingClientRect(),
        u = o[2].getBoundingClientRect(),
        c = s.parentNode,
        h = !n && Za(t),
        f = new Ja(
          (l.left - a.left) / 100,
          (l.top - a.top) / 100,
          (u.left - a.left) / 100,
          (u.top - a.top) / 100,
          a.left + (h ? 0 : ja()),
          a.top + (h ? 0 : Wa())
        );
      if ((c.removeChild(s), i))
        for (a = i.length; a--; )
          ((l = i[a]).scaleX = l.scaleY = 0), l.renderTransform(1, l);
      return e ? f.inverse() : f;
    }
    var el,
      rl,
      nl,
      il,
      ol,
      sl,
      al,
      ll,
      ul = 1,
      cl = function (t, e) {
        return t.actions.forEach(function (t) {
          return t.vars[e] && t.vars[e](t);
        });
      },
      hl = {},
      fl = 180 / Math.PI,
      pl = Math.PI / 180,
      dl = {},
      gl = {},
      ml = {},
      vl = function (t) {
        return 'string' == typeof t ? t.split(' ').join('').split(',') : t;
      },
      _l = vl('onStart,onUpdate,onComplete,onReverseComplete,onInterrupt'),
      yl = vl(
        'transform,transformOrigin,width,height,position,top,left,opacity,zIndex,maxWidth,maxHeight,minWidth,minHeight'
      ),
      bl = function (t) {
        return el(t)[0] || console.warn('Element not found:', t);
      },
      xl = function (t) {
        return Math.round(1e4 * t) / 1e4 || 0;
      },
      wl = function (t, e, r) {
        return t.forEach(function (t) {
          return t.classList[r](e);
        });
      },
      Tl = {
        zIndex: 1,
        kill: 1,
        simple: 1,
        spin: 1,
        clearProps: 1,
        targets: 1,
        toggleClass: 1,
        onComplete: 1,
        onUpdate: 1,
        onInterrupt: 1,
        onStart: 1,
        delay: 1,
        repeat: 1,
        repeatDelay: 1,
        yoyo: 1,
        scale: 1,
        fade: 1,
        absolute: 1,
        props: 1,
        onEnter: 1,
        onLeave: 1,
        custom: 1,
        paused: 1,
        nested: 1,
        prune: 1,
        absoluteOnLeave: 1,
      },
      Sl = {
        zIndex: 1,
        simple: 1,
        clearProps: 1,
        scale: 1,
        absolute: 1,
        fitChild: 1,
        getVars: 1,
        props: 1,
      },
      Cl = function (t) {
        return t.replace(/([A-Z])/g, '-$1').toLowerCase();
      },
      El = function (t, e) {
        var r,
          n = {};
        for (r in t) e[r] || (n[r] = t[r]);
        return n;
      },
      Ml = {},
      kl = function (t) {
        var e = (Ml[t] = vl(t));
        return (ml[t] = e.concat(yl)), e;
      },
      Al = function t(e, r, n) {
        void 0 === n && (n = 0);
        for (
          var i = e.parentNode,
            o = 1e3 * Math.pow(10, n) * (r ? -1 : 1),
            s = r ? 900 * -o : 0;
          e;

        )
          (s += o), (e = e.previousSibling);
        return i ? s + t(i, r, n + 1) : s;
      },
      Pl = function (t, e, r) {
        return (
          t.forEach(function (t) {
            return (t.d = Al(r ? t.element : t.t, e));
          }),
          t.sort(function (t, e) {
            return t.d - e.d;
          }),
          t
        );
      },
      Ol = function (t, e) {
        for (
          var r,
            n,
            i = t.element.style,
            o = (t.css = t.css || []),
            s = e.length;
          s--;

        )
          (n = i[(r = e[s])] || i.getPropertyValue(r)),
            o.push(n ? r : gl[r] || (gl[r] = Cl(r)), n);
        return i;
      },
      Rl = function (t) {
        var e = t.css,
          r = t.element.style,
          n = 0;
        for (t.cache.uncache = 1; n < e.length; n += 2)
          e[n + 1] ? (r[e[n]] = e[n + 1]) : r.removeProperty(e[n]);
        !e[e.indexOf('transform') + 1] &&
          r.translate &&
          (r.removeProperty('translate'),
          r.removeProperty('scale'),
          r.removeProperty('rotate'));
      },
      zl = function (t, e) {
        t.forEach(function (t) {
          return (t.a.cache.uncache = 1);
        }),
          e || t.finalStates.forEach(Rl);
      },
      Dl =
        'paddingTop,paddingRight,paddingBottom,paddingLeft,gridArea,transition'.split(
          ','
        ),
      Ll = function (t, e, r) {
        var n,
          i,
          o,
          s = t.element,
          a = t.width,
          l = t.height,
          u = t.uncache,
          c = t.getProp,
          h = s.style,
          f = 4;
        if (('object' != typeof e && (e = t), nl && 1 !== r))
          return (
            nl._abs.push({ t: s, b: t, a: t, sd: 0 }),
            nl._final.push(function () {
              return (t.cache.uncache = 1) && Rl(t);
            }),
            s
          );
        for (
          i = 'none' === c('display'),
            (t.isVisible && !i) ||
              (i && (Ol(t, ['display']).display = e.display),
              (t.matrix = e.matrix),
              (t.width = a = t.width || e.width),
              (t.height = l = t.height || e.height)),
            Ol(t, Dl),
            o = window.getComputedStyle(s);
          f--;

        )
          h[Dl[f]] = o[Dl[f]];
        if (
          ((h.gridArea = '1 / 1 / 1 / 1'),
          (h.transition = 'none'),
          (h.position = 'absolute'),
          (h.width = a + 'px'),
          (h.height = l + 'px'),
          h.top || (h.top = '0px'),
          h.left || (h.left = '0px'),
          u)
        )
          n = new Jl(s);
        else if ((((n = El(t, dl)).position = 'absolute'), t.simple)) {
          var p = s.getBoundingClientRect();
          n.matrix = new Ja(1, 0, 0, 1, p.left + ja(), p.top + Wa());
        } else n.matrix = tl(s, !1, !1, !0);
        return (
          (n = Vl(n, t, !0)), (t.x = sl(n.x, 0.01)), (t.y = sl(n.y, 0.01)), s
        );
      },
      Nl = function (t, e) {
        return (
          !0 !== e &&
            ((e = el(e)),
            (t = t.filter(function (t) {
              if (-1 !== e.indexOf((t.sd < 0 ? t.b : t.a).element)) return !0;
              t.t._gsap.renderTransform(1),
                t.b.isVisible &&
                  ((t.t.style.width = t.b.width + 'px'),
                  (t.t.style.height = t.b.height + 'px'));
            }))),
          t
        );
      },
      Il = function (t) {
        return Pl(t, !0).forEach(function (t) {
          return (
            (t.a.isVisible || t.b.isVisible) &&
            Ll(t.sd < 0 ? t.b : t.a, t.b, 1)
          );
        });
      },
      Fl = function (t, e, r, n) {
        return t instanceof Jl
          ? t
          : t instanceof Kl
            ? (function (t, e) {
                return (e && t.idLookup[Fl(e).id]) || t.elementStates[0];
              })(t, n)
            : new Jl(
                'string' == typeof t
                  ? bl(t) || console.warn(t + ' not found')
                  : t,
                e,
                r
              );
      },
      Bl = function (t, e) {
        var r,
          n = t.style || t;
        for (r in e) n[r] = e[r];
      },
      Yl = function (t) {
        return t.map(function (t) {
          return t.element;
        });
      },
      Xl = function (t, e, r) {
        return t && e.length && r.add(t(Yl(e), r, new Kl(e, 0, !0)), 0);
      },
      Vl = function (t, e, r, n, i, o) {
        var s,
          a,
          l,
          u,
          c,
          h,
          f,
          p = t.element,
          d = t.cache,
          g = t.parent,
          m = t.x,
          v = t.y,
          _ = e.width,
          y = e.height,
          b = e.scaleX,
          x = e.scaleY,
          w = e.rotation,
          T = e.bounds,
          S = o && al && al(p, 'transform,width,height'),
          C = t,
          E = e.matrix,
          M = E.e,
          k = E.f,
          A =
            t.bounds.width !== T.width ||
            t.bounds.height !== T.height ||
            t.scaleX !== b ||
            t.scaleY !== x ||
            t.rotation !== w,
          P = !A && t.simple && e.simple && !i;
        return (
          P || !g
            ? ((b = x = 1), (w = s = 0))
            : ((c = (function (t) {
                var e = t._gsap || rl.core.getCache(t);
                return e.gmCache === rl.ticker.frame
                  ? e.gMatrix
                  : ((e.gmCache = rl.ticker.frame),
                    (e.gMatrix = tl(t, !0, !1, !0)));
              })(g)),
              (h = c
                .clone()
                .multiply(
                  e.ctm ? e.matrix.clone().multiply(e.ctm) : e.matrix
                )),
              (w = xl(Math.atan2(h.b, h.a) * fl)),
              (s = xl(Math.atan2(h.c, h.d) * fl + w) % 360),
              (b = Math.sqrt(Math.pow(h.a, 2) + Math.pow(h.b, 2))),
              (x =
                Math.sqrt(Math.pow(h.c, 2) + Math.pow(h.d, 2)) *
                Math.cos(s * pl)),
              i &&
                ((i = el(i)[0]),
                (u = rl.getProperty(i)),
                (f =
                  i.getBBox && 'function' == typeof i.getBBox && i.getBBox()),
                (C = {
                  scaleX: u('scaleX'),
                  scaleY: u('scaleY'),
                  width: f ? f.width : Math.ceil(parseFloat(u('width', 'px'))),
                  height: f ? f.height : parseFloat(u('height', 'px')),
                })),
              (d.rotation = w + 'deg'),
              (d.skewX = s + 'deg')),
          r
            ? ((b *= _ !== C.width && C.width ? _ / C.width : 1),
              (x *= y !== C.height && C.height ? y / C.height : 1),
              (d.scaleX = b),
              (d.scaleY = x))
            : ((_ = sl((_ * b) / C.scaleX, 0)),
              (y = sl((y * x) / C.scaleY, 0)),
              (p.style.width = _ + 'px'),
              (p.style.height = y + 'px')),
          n && Bl(p, e.props),
          P || !g
            ? ((m += M - t.matrix.e), (v += k - t.matrix.f))
            : A || g !== e.parent
              ? (d.renderTransform(1, d),
                (h = tl(i || p, !1, !1, !0)),
                (a = c.apply({ x: h.e, y: h.f })),
                (m += (l = c.apply({ x: M, y: k })).x - a.x),
                (v += l.y - a.y))
              : ((c.e = c.f = 0),
                (m += (l = c.apply({ x: M - t.matrix.e, y: k - t.matrix.f }))
                  .x),
                (v += l.y)),
          (m = sl(m, 0.02)),
          (v = sl(v, 0.02)),
          !o || o instanceof Jl
            ? ((d.x = m + 'px'), (d.y = v + 'px'), d.renderTransform(1, d))
            : S && S.revert(),
          o &&
            ((o.x = m),
            (o.y = v),
            (o.rotation = w),
            (o.skewX = s),
            r
              ? ((o.scaleX = b), (o.scaleY = x))
              : ((o.width = _), (o.height = y))),
          o || d
        );
      },
      ql = function (t, e) {
        return t instanceof Kl ? t : new Kl(t, e);
      },
      Hl = function (t, e, r) {
        var n = t.idLookup[r],
          i = t.alt[r];
        return !i.isVisible ||
          ((e.getElementState(i.element) || i).isVisible && n.isVisible)
          ? n
          : i;
      },
      Ul = [],
      Wl = 'width,height,overflowX,overflowY'.split(','),
      jl = function (t) {
        if (t !== ll) {
          var e = ol.style,
            r = ol.clientWidth === window.outerWidth,
            n = ol.clientHeight === window.outerHeight,
            i = 4;
          if (t && (r || n)) {
            for (; i--; ) Ul[i] = e[Wl[i]];
            r && ((e.width = ol.clientWidth + 'px'), (e.overflowY = 'hidden')),
              n &&
                ((e.height = ol.clientHeight + 'px'),
                (e.overflowX = 'hidden')),
              (ll = t);
          } else if (ll) {
            for (; i--; )
              Ul[i] ? (e[Wl[i]] = Ul[i]) : e.removeProperty(Cl(Wl[i]));
            ll = t;
          }
        }
      },
      Gl = function (t, e, r, n) {
        (t instanceof Kl && e instanceof Kl) ||
          console.warn('Not a valid state object.');
        var i,
          o,
          s,
          a,
          l,
          u,
          c,
          h,
          f,
          p,
          d,
          g,
          m,
          v,
          _,
          y = (r = r || {}),
          b = y.clearProps,
          x = y.onEnter,
          w = y.onLeave,
          T = y.absolute,
          S = y.absoluteOnLeave,
          C = y.custom,
          E = y.delay,
          M = y.paused,
          k = y.repeat,
          A = y.repeatDelay,
          P = y.yoyo,
          O = y.toggleClass,
          R = y.nested,
          z = y.zIndex,
          D = y.scale,
          L = y.fade,
          N = y.stagger,
          I = y.spin,
          F = y.prune,
          B = ('props' in r ? r : t).props,
          Y = El(r, Tl),
          X = rl.timeline({
            delay: E,
            paused: M,
            repeat: k,
            repeatDelay: A,
            yoyo: P,
            data: 'isFlip',
          }),
          V = Y,
          q = [],
          H = [],
          U = [],
          W = [],
          j = !0 === I ? 1 : I || 0,
          G =
            'function' == typeof I
              ? I
              : function () {
                  return j;
                },
          Z = t.interrupted || e.interrupted,
          Q = X[1 !== n ? 'to' : 'from'];
        for (o in e.idLookup)
          (d = e.alt[o] ? Hl(e, t, o) : e.idLookup[o]),
            (l = d.element),
            (p = t.idLookup[o]),
            t.alt[o] &&
              l === p.element &&
              (t.alt[o].isVisible || !d.isVisible) &&
              (p = t.alt[o]),
            p
              ? ((u = {
                  t: l,
                  b: p,
                  a: d,
                  sd: p.element === l ? 0 : d.isVisible ? 1 : -1,
                }),
                U.push(u),
                u.sd &&
                  (u.sd < 0 && ((u.b = d), (u.a = p)),
                  Z && Ol(u.b, B ? ml[B] : yl),
                  L &&
                    U.push(
                      (u.swap = {
                        t: p.element,
                        b: u.b,
                        a: u.a,
                        sd: -u.sd,
                        swap: u,
                      })
                    )),
                (l._flip = p.element._flip = nl ? nl.timeline : X))
              : d.isVisible &&
                (U.push({
                  t: l,
                  b: El(d, { isVisible: 1 }),
                  a: d,
                  sd: 0,
                  entering: 1,
                }),
                (l._flip = nl ? nl.timeline : X));
        B &&
          (Ml[B] || kl(B)).forEach(function (t) {
            return (Y[t] = function (e) {
              return U[e].a.props[t];
            });
          }),
          (U.finalStates = f = []),
          (g = function () {
            for (Pl(U), jl(!0), a = 0; a < U.length; a++)
              (u = U[a]),
                (m = u.a),
                (v = u.b),
                !F || m.isDifferent(v) || u.entering
                  ? ((l = u.t),
                    R && !(u.sd < 0) && a && (m.matrix = tl(l, !1, !1, !0)),
                    v.isVisible && m.isVisible
                      ? (u.sd < 0
                          ? ((c = new Jl(l, B, t.simple)),
                            Vl(c, m, D, 0, 0, c),
                            (c.matrix = tl(l, !1, !1, !0)),
                            (c.css = u.b.css),
                            (u.a = m = c),
                            L && (l.style.opacity = Z ? v.opacity : m.opacity),
                            N && W.push(l))
                          : u.sd > 0 &&
                            L &&
                            (l.style.opacity = Z
                              ? m.opacity - v.opacity
                              : '0'),
                        Vl(m, v, D, B))
                      : v.isVisible !== m.isVisible &&
                        (v.isVisible
                          ? m.isVisible ||
                            ((v.css = m.css),
                            H.push(v),
                            U.splice(a--, 1),
                            T && R && Vl(m, v, D, B))
                          : (m.isVisible && q.push(m), U.splice(a--, 1))),
                    D ||
                      ((l.style.maxWidth = Math.max(m.width, v.width) + 'px'),
                      (l.style.maxHeight =
                        Math.max(m.height, v.height) + 'px'),
                      (l.style.minWidth = Math.min(m.width, v.width) + 'px'),
                      (l.style.minHeight =
                        Math.min(m.height, v.height) + 'px')),
                    R && O && l.classList.add(O))
                  : U.splice(a--, 1),
                f.push(m);
            var e;
            if (
              (O &&
                ((e = f.map(function (t) {
                  return t.element;
                })),
                R &&
                  e.forEach(function (t) {
                    return t.classList.remove(O);
                  })),
              jl(!1),
              D
                ? ((Y.scaleX = function (t) {
                    return U[t].a.scaleX;
                  }),
                  (Y.scaleY = function (t) {
                    return U[t].a.scaleY;
                  }))
                : ((Y.width = function (t) {
                    return U[t].a.width + 'px';
                  }),
                  (Y.height = function (t) {
                    return U[t].a.height + 'px';
                  }),
                  (Y.autoRound = r.autoRound || !1)),
              (Y.x = function (t) {
                return U[t].a.x + 'px';
              }),
              (Y.y = function (t) {
                return U[t].a.y + 'px';
              }),
              (Y.rotation = function (t) {
                return U[t].a.rotation + (I ? 360 * G(t, h[t], h) : 0);
              }),
              (Y.skewX = function (t) {
                return U[t].a.skewX;
              }),
              (h = U.map(function (t) {
                return t.t;
              })),
              (z || 0 === z) &&
                ((Y.modifiers = {
                  zIndex: function () {
                    return z;
                  },
                }),
                (Y.zIndex = z),
                (Y.immediateRender = !1 !== r.immediateRender)),
              L &&
                (Y.opacity = function (t) {
                  return U[t].sd < 0
                    ? 0
                    : U[t].sd > 0
                      ? U[t].a.opacity
                      : '+=0';
                }),
              W.length)
            ) {
              N = rl.utils.distribute(N);
              var n = h.slice(W.length);
              Y.stagger = function (t, e) {
                return N(~W.indexOf(e) ? h.indexOf(U[t].swap.t) : t, e, n);
              };
            }
            if (
              (_l.forEach(function (t) {
                return r[t] && X.eventCallback(t, r[t], r[t + 'Params']);
              }),
              C && h.length)
            )
              for (o in ((V = El(Y, Tl)),
              'scale' in C &&
                ((C.scaleX = C.scaleY = C.scale), delete C.scale),
              C))
                ((i = El(C[o], Sl))[o] = Y[o]),
                  !('duration' in i) &&
                    'duration' in Y &&
                    (i.duration = Y.duration),
                  (i.stagger = Y.stagger),
                  Q.call(X, h, i, 0),
                  delete V[o];
            (h.length || H.length || q.length) &&
              (O &&
                X.add(function () {
                  return wl(e, O, X._zTime < 0 ? 'remove' : 'add');
                }, 0) &&
                !M &&
                wl(e, O, 'add'),
              h.length && Q.call(X, h, V, 0)),
              Xl(x, q, X),
              Xl(w, H, X);
            var p = nl && nl.timeline;
            p &&
              (p.add(X, 0),
              nl._final.push(function () {
                return zl(U, !b);
              })),
              (s = X.duration()),
              X.call(function () {
                var t = X.time() >= s;
                t && !p && zl(U, !b), O && wl(e, O, t ? 'remove' : 'add');
              });
          }),
          S &&
            (T = U.filter(function (t) {
              return !t.sd && !t.a.isVisible && t.b.isVisible;
            }).map(function (t) {
              return t.a.element;
            })),
          nl
            ? (T && (_ = nl._abs).push.apply(_, Nl(U, T)), nl._run.push(g))
            : (T && Il(Nl(U, T)), g());
        var $ = nl ? nl.timeline : X;
        return (
          ($.revert = function () {
            return Ql($, 1, 1);
          }),
          $
        );
      },
      Zl = function t(e) {
        e.vars.onInterrupt &&
          e.vars.onInterrupt.apply(e, e.vars.onInterruptParams || []),
          e.getChildren(!0, !1, !0).forEach(t);
      },
      Ql = function (t, e, r) {
        if (t && t.progress() < 1 && (!t.paused() || r))
          return e && (Zl(t), e < 2 && t.progress(1), t.kill()), !0;
      },
      $l = function (t) {
        for (
          var e,
            r = (t.idLookup = {}),
            n = (t.alt = {}),
            i = t.elementStates,
            o = i.length;
          o--;

        )
          r[(e = i[o]).id] ? (n[e.id] = e) : (r[e.id] = e);
      },
      Kl = (function () {
        function t(t, e, r) {
          if (
            ((this.props = e && e.props),
            (this.simple = !(!e || !e.simple)),
            r)
          )
            (this.targets = Yl(t)), (this.elementStates = t), $l(this);
          else {
            this.targets = el(t);
            var n = e && (!1 === e.kill || (e.batch && !e.kill));
            nl && !n && nl._kill.push(this), this.update(n || !!nl);
          }
        }
        var e = t.prototype;
        return (
          (e.update = function (t) {
            var e = this;
            return (
              (this.elementStates = this.targets.map(function (t) {
                return new Jl(t, e.props, e.simple);
              })),
              $l(this),
              this.interrupt(t),
              this.recordInlineStyles(),
              this
            );
          }),
          (e.clear = function () {
            return (
              (this.targets.length = this.elementStates.length = 0),
              $l(this),
              this
            );
          }),
          (e.fit = function (t, e, r) {
            for (
              var n,
                i,
                o = Pl(this.elementStates.slice(0), !1, !0),
                s = (t || this).idLookup,
                a = 0;
              a < o.length;
              a++
            )
              (n = o[a]),
                r && (n.matrix = tl(n.element, !1, !1, !0)),
                (i = s[n.id]) && Vl(n, i, e, !0, 0, n),
                (n.matrix = tl(n.element, !1, !1, !0));
            return this;
          }),
          (e.getProperty = function (t, e) {
            var r = this.getElementState(t) || dl;
            return (e in r ? r : r.props || dl)[e];
          }),
          (e.add = function (t) {
            for (
              var e,
                r,
                n,
                i = t.targets.length,
                o = this.idLookup,
                s = this.alt;
              i--;

            )
              (n = o[(r = t.elementStates[i]).id]) &&
              (r.element === n.element ||
                (s[r.id] && s[r.id].element === r.element))
                ? ((e = this.elementStates.indexOf(
                    r.element === n.element ? n : s[r.id]
                  )),
                  this.targets.splice(e, 1, t.targets[i]),
                  this.elementStates.splice(e, 1, r))
                : (this.targets.push(t.targets[i]),
                  this.elementStates.push(r));
            return (
              t.interrupted && (this.interrupted = !0),
              t.simple || (this.simple = !1),
              $l(this),
              this
            );
          }),
          (e.compare = function (t) {
            var e,
              r,
              n,
              i,
              o,
              s,
              a,
              l,
              u = t.idLookup,
              c = this.idLookup,
              h = [],
              f = [],
              p = [],
              d = [],
              g = [],
              m = t.alt,
              v = this.alt,
              _ = function (t, e, r) {
                return (
                  (t.isVisible !== e.isVisible
                    ? t.isVisible
                      ? p
                      : d
                    : t.isVisible
                      ? f
                      : h
                  ).push(r) && g.push(r)
                );
              },
              y = function (t, e, r) {
                return g.indexOf(r) < 0 && _(t, e, r);
              };
            for (n in u)
              (o = m[n]),
                (s = v[n]),
                (i = (e = o ? Hl(t, this, n) : u[n]).element),
                (r = c[n]),
                s
                  ? ((l =
                      r.isVisible || (!s.isVisible && i === r.element)
                        ? r
                        : s),
                    (a =
                      !o ||
                      e.isVisible ||
                      o.isVisible ||
                      l.element !== o.element
                        ? e
                        : o).isVisible &&
                    l.isVisible &&
                    a.element !== l.element
                      ? ((a.isDifferent(l) ? f : h).push(a.element, l.element),
                        g.push(a.element, l.element))
                      : _(a, l, a.element),
                    o && a.element === o.element && (o = u[n]),
                    y(a.element !== r.element && o ? o : a, r, r.element),
                    y(o && o.element === s.element ? o : a, s, s.element),
                    o && y(o, s.element === o.element ? s : r, o.element))
                  : (r
                      ? r.isDifferent(e)
                        ? _(e, r, i)
                        : h.push(i)
                      : p.push(i),
                    o && y(o, r, o.element));
            for (n in c)
              u[n] || (d.push(c[n].element), v[n] && d.push(v[n].element));
            return { changed: f, unchanged: h, enter: p, leave: d };
          }),
          (e.recordInlineStyles = function () {
            for (
              var t = ml[this.props] || yl, e = this.elementStates.length;
              e--;

            )
              Ol(this.elementStates[e], t);
          }),
          (e.interrupt = function (t) {
            var e = this,
              r = [];
            this.targets.forEach(function (n) {
              var i = n._flip,
                o = Ql(i, t ? 0 : 1);
              t &&
                o &&
                r.indexOf(i) < 0 &&
                i.add(function () {
                  return e.updateVisibility();
                }),
                o && r.push(i);
            }),
              !t && r.length && this.updateVisibility(),
              this.interrupted || (this.interrupted = !!r.length);
          }),
          (e.updateVisibility = function () {
            this.elementStates.forEach(function (t) {
              var e = t.element.getBoundingClientRect();
              (t.isVisible = !!(e.width || e.height || e.top || e.left)),
                (t.uncache = 1);
            });
          }),
          (e.getElementState = function (t) {
            return this.elementStates[this.targets.indexOf(bl(t))];
          }),
          (e.makeAbsolute = function () {
            return Pl(this.elementStates.slice(0), !0, !0).map(Ll);
          }),
          t
        );
      })(),
      Jl = (function () {
        function t(t, e, r) {
          (this.element = t), this.update(e, r);
        }
        var e = t.prototype;
        return (
          (e.isDifferent = function (t) {
            var e = this.bounds,
              r = t.bounds;
            return (
              e.top !== r.top ||
              e.left !== r.left ||
              e.width !== r.width ||
              e.height !== r.height ||
              !this.matrix.equals(t.matrix) ||
              this.opacity !== t.opacity ||
              (this.props &&
                t.props &&
                JSON.stringify(this.props) !== JSON.stringify(t.props))
            );
          }),
          (e.update = function (t, e) {
            var r,
              n,
              i = this,
              o = i.element,
              s = rl.getProperty(o),
              a = rl.core.getCache(o),
              l = o.getBoundingClientRect(),
              u =
                o.getBBox &&
                'function' == typeof o.getBBox &&
                'svg' !== o.nodeName.toLowerCase() &&
                o.getBBox(),
              c = e
                ? new Ja(1, 0, 0, 1, l.left + ja(), l.top + Wa())
                : tl(o, !1, !1, !0);
            (a.uncache = 1),
              (i.getProp = s),
              (i.element = o),
              (i.id =
                ((n = (r = o).getAttribute('data-flip-id')) ||
                  r.setAttribute('data-flip-id', (n = 'auto-' + ul++)),
                n)),
              (i.matrix = c),
              (i.cache = a),
              (i.bounds = l),
              (i.isVisible = !!(l.width || l.height || l.left || l.top)),
              (i.display = s('display')),
              (i.position = s('position')),
              (i.parent = o.parentNode),
              (i.x = s('x')),
              (i.y = s('y')),
              (i.scaleX = a.scaleX),
              (i.scaleY = a.scaleY),
              (i.rotation = s('rotation')),
              (i.skewX = s('skewX')),
              (i.opacity = s('opacity')),
              (i.width = u ? u.width : sl(s('width', 'px'), 0.04)),
              (i.height = u ? u.height : sl(s('height', 'px'), 0.04)),
              t &&
                (function (t, e) {
                  for (
                    var r = rl.getProperty(t.element, null, 'native'),
                      n = (t.props = {}),
                      i = e.length;
                    i--;

                  )
                    n[e[i]] = (r(e[i]) + '').trim();
                  n.zIndex && (n.zIndex = parseFloat(n.zIndex) || 0);
                })(i, Ml[t] || kl(t)),
              (i.ctm =
                o.getCTM &&
                'svg' === o.nodeName.toLowerCase() &&
                $a(o).inverse()),
              (i.simple =
                e || (1 === xl(c.a) && !xl(c.b) && !xl(c.c) && 1 === xl(c.d))),
              (i.uncache = 0);
          }),
          t
        );
      })(),
      tu = (function () {
        function t(t, e) {
          (this.vars = t),
            (this.batch = e),
            (this.states = []),
            (this.timeline = e.timeline);
        }
        var e = t.prototype;
        return (
          (e.getStateById = function (t) {
            for (var e = this.states.length; e--; )
              if (this.states[e].idLookup[t]) return this.states[e];
          }),
          (e.kill = function () {
            this.batch.remove(this);
          }),
          t
        );
      })(),
      eu = (function () {
        function t(t) {
          (this.id = t),
            (this.actions = []),
            (this._kill = []),
            (this._final = []),
            (this._abs = []),
            (this._run = []),
            (this.data = {}),
            (this.state = new Kl()),
            (this.timeline = rl.timeline());
        }
        var e = t.prototype;
        return (
          (e.add = function (t) {
            var e = this.actions.filter(function (e) {
              return e.vars === t;
            });
            return e.length
              ? e[0]
              : ((e = new tu(
                  'function' == typeof t ? { animate: t } : t,
                  this
                )),
                this.actions.push(e),
                e);
          }),
          (e.remove = function (t) {
            var e = this.actions.indexOf(t);
            return e >= 0 && this.actions.splice(e, 1), this;
          }),
          (e.getState = function (t) {
            var e = this,
              r = nl,
              n = il;
            return (
              (nl = this),
              this.state.clear(),
              (this._kill.length = 0),
              this.actions.forEach(function (r) {
                r.vars.getState &&
                  ((r.states.length = 0),
                  (il = r),
                  (r.state = r.vars.getState(r))),
                  t &&
                    r.states.forEach(function (t) {
                      return e.state.add(t);
                    });
              }),
              (il = n),
              (nl = r),
              this.killConflicts(),
              this
            );
          }),
          (e.animate = function () {
            var t,
              e,
              r = this,
              n = nl,
              i = this.timeline,
              o = this.actions.length;
            for (
              nl = this,
                i.clear(),
                this._abs.length = this._final.length = this._run.length = 0,
                this.actions.forEach(function (t) {
                  t.vars.animate && t.vars.animate(t);
                  var e,
                    r,
                    n = t.vars.onEnter,
                    i = t.vars.onLeave,
                    o = t.targets;
                  o &&
                    o.length &&
                    (n || i) &&
                    ((e = new Kl()),
                    t.states.forEach(function (t) {
                      return e.add(t);
                    }),
                    (r = e.compare(ru.getState(o))).enter.length &&
                      n &&
                      n(r.enter),
                    r.leave.length && i && i(r.leave));
                }),
                Il(this._abs),
                this._run.forEach(function (t) {
                  return t();
                }),
                e = i.duration(),
                t = this._final.slice(0),
                i.add(function () {
                  e <= i.time() &&
                    (t.forEach(function (t) {
                      return t();
                    }),
                    cl(r, 'onComplete'));
                }),
                nl = n;
              o--;

            )
              this.actions[o].vars.once && this.actions[o].kill();
            return cl(this, 'onStart'), i.restart(), this;
          }),
          (e.loadState = function (t) {
            t ||
              (t = function () {
                return 0;
              });
            var e = [];
            return (
              this.actions.forEach(function (r) {
                if (r.vars.loadState) {
                  var n,
                    i = function i(o) {
                      o && (r.targets = o),
                        ~(n = e.indexOf(i)) &&
                          (e.splice(n, 1), e.length || t());
                    };
                  e.push(i), r.vars.loadState(i);
                }
              }),
              e.length || t(),
              this
            );
          }),
          (e.setState = function () {
            return (
              this.actions.forEach(function (t) {
                return (t.targets = t.vars.setState && t.vars.setState(t));
              }),
              this
            );
          }),
          (e.killConflicts = function (t) {
            return (
              this.state.interrupt(t),
              this._kill.forEach(function (e) {
                return e.interrupt(t);
              }),
              this
            );
          }),
          (e.run = function (t, e) {
            var r = this;
            return (
              this !== nl &&
                (t || this.getState(e),
                this.loadState(function () {
                  r._killed || (r.setState(), r.animate());
                })),
              this
            );
          }),
          (e.clear = function (t) {
            this.state.clear(), t || (this.actions.length = 0);
          }),
          (e.getStateById = function (t) {
            for (var e, r = this.actions.length; r--; )
              if ((e = this.actions[r].getStateById(t))) return e;
            return this.state.idLookup[t] && this.state;
          }),
          (e.kill = function () {
            (this._killed = 1), this.clear(), delete hl[this.id];
          }),
          t
        );
      })(),
      ru = (function () {
        function t() {}
        return (
          (t.getState = function (e, r) {
            var n = ql(e, r);
            return (
              il && il.states.push(n),
              r && r.batch && t.batch(r.batch).state.add(n),
              n
            );
          }),
          (t.from = function (t, e) {
            return (
              'clearProps' in (e = e || {}) || (e.clearProps = !0),
              Gl(
                t,
                ql(e.targets || t.targets, {
                  props: e.props || t.props,
                  simple: e.simple,
                  kill: !!e.kill,
                }),
                e,
                -1
              )
            );
          }),
          (t.to = function (t, e) {
            return Gl(
              t,
              ql(e.targets || t.targets, {
                props: e.props || t.props,
                simple: e.simple,
                kill: !!e.kill,
              }),
              e,
              1
            );
          }),
          (t.fromTo = function (t, e, r) {
            return Gl(t, e, r);
          }),
          (t.fit = function (t, e, r) {
            var n = r ? El(r, Sl) : {},
              i = r || n,
              o = i.absolute,
              s = i.scale,
              a = i.getVars,
              l = i.props,
              u = i.runBackwards,
              c = i.onComplete,
              h = i.simple,
              f = r && r.fitChild && bl(r.fitChild),
              p = Fl(e, l, h, t),
              d = Fl(t, 0, h, p),
              g = l ? ml[l] : yl,
              m = rl.context();
            return (
              l && Bl(n, p.props),
              Ol(d, g),
              u &&
                ('immediateRender' in n || (n.immediateRender = !0),
                (n.onComplete = function () {
                  Rl(d), c && c.apply(this, arguments);
                })),
              o && Ll(d, p),
              (n = Vl(
                d,
                p,
                s || f,
                !n.duration && l,
                f,
                n.duration || a ? n : 0
              )),
              'object' == typeof r && 'zIndex' in r && (n.zIndex = r.zIndex),
              m &&
                !a &&
                m.add(function () {
                  return function () {
                    return Rl(d);
                  };
                }),
              a ? n : n.duration ? rl.to(d.element, n) : null
            );
          }),
          (t.makeAbsolute = function (t, e) {
            return (t instanceof Kl ? t : new Kl(t, e)).makeAbsolute();
          }),
          (t.batch = function (t) {
            return t || (t = 'default'), hl[t] || (hl[t] = new eu(t));
          }),
          (t.killFlipsOf = function (t, e) {
            (t instanceof Kl ? t.targets : el(t)).forEach(function (t) {
              return t && Ql(t._flip, !1 !== e ? 1 : 2);
            });
          }),
          (t.isFlipping = function (e) {
            var r = t.getByTarget(e);
            return !!r && r.isActive();
          }),
          (t.getByTarget = function (t) {
            return (bl(t) || dl)._flip;
          }),
          (t.getElementState = function (t, e) {
            return new Jl(bl(t), e);
          }),
          (t.convertCoordinates = function (t, e, r) {
            var n = tl(e, !0, !0).multiply(tl(t));
            return r ? n.apply(r) : n;
          }),
          (t.register = function (t) {
            if ((ol = 'undefined' != typeof document && document.body)) {
              (rl = t),
                qa(ol),
                (el = rl.utils.toArray),
                (al = rl.core.getStyleSaver);
              var e = rl.utils.snap(0.1);
              sl = function (t, r) {
                return e(parseFloat(t) + r);
              };
            }
          }),
          t
        );
      })();
    let nu, iu;
    (ru.version = '3.13.0'),
      'undefined' != typeof window &&
        window.gsap &&
        window.gsap.registerPlugin(ru),
      Qn.registerPlugin(na, Oa, ru);
    try {
      nu = r(373).A || window.SplitText;
    } catch (t) {}
    try {
      iu = r(411).K || window.MorphSVGPlugin;
    } catch (t) {}
    function ou() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
        return (
          document.documentElement.classList.add('reduced-motion'),
          document.body.classList.add('reduced-motion'),
          void Array.from(
            document.querySelectorAll(
              '.reveal-element, .reveal-text, .fade-in, .slide-up'
            )
          ).forEach((t) => {
            (t.style.opacity = '1'),
              (t.style.transform = 'none'),
              (t.style.visibility = 'visible'),
              t.removeAttribute('aria-hidden');
          })
        );
      !(function () {
        const t = document.querySelector('#smooth-wrapper'),
          e = document.querySelector('#smooth-content');
        if (t && e)
          try {
            Oa.create({
              wrapper: t,
              content: e,
              smooth: 1.5,
              effects: !0,
              normalizeScroll: !0,
              ignoreMobileResize: !0,
            });
          } catch (t) {
            console.error('Error initializing ScrollSmoother:', t);
          }
        Array.from(document.querySelectorAll('.reveal-element')).forEach(
          (t) => {
            const e = parseFloat(t.dataset.delay || '0');
            t.setAttribute('aria-hidden', 'true'),
              na.create({
                trigger: t,
                start: 'top 85%',
                once: !0,
                onEnter: () => {
                  Qn.fromTo(
                    t,
                    { y: 50, opacity: 0 },
                    {
                      y: 0,
                      opacity: 1,
                      duration: 0.8,
                      delay: e,
                      ease: 'power2.out',
                      onComplete: () => {
                        t.removeAttribute('aria-hidden');
                      },
                    }
                  );
                },
              });
          }
        ),
          Array.from(document.querySelectorAll('.counter')).forEach((t) => {
            const e = parseInt(t.dataset.target || '0', 10);
            t.setAttribute('aria-live', 'polite'),
              na.create({
                trigger: t,
                start: 'top 85%',
                once: !0,
                onEnter: () => {
                  Qn.fromTo(
                    t,
                    { textContent: '0' },
                    {
                      textContent: String(e),
                      duration: 2,
                      ease: 'power1.inOut',
                      snap: { textContent: 1 },
                      onUpdate: function () {
                        t.textContent = Math.round(
                          Number(t.textContent || '0')
                        ).toString();
                      },
                    }
                  );
                },
              });
          });
        const r = document.querySelector('.footer-container');
        r &&
          na.create({
            trigger: r,
            start: 'top 95%',
            once: !0,
            onEnter: () => {
              Qn.fromTo(
                r,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
              );
            },
          });
      })(),
        (function () {
          Array.from(document.querySelectorAll('.btn-animated')).forEach(
            (t) => {
              t.addEventListener('mouseenter', () => {
                Qn.to(t, { scale: 1.05, duration: 0.3, ease: 'power1.out' });
              }),
                t.addEventListener('mouseleave', () => {
                  Qn.to(t, { scale: 1, duration: 0.3, ease: 'power1.out' });
                });
            }
          ),
            Array.from(document.querySelectorAll('.feature-card')).forEach(
              (t) => {
                const e = t.querySelector('.feature-icon');
                t.addEventListener('mouseenter', () => {
                  Qn.to(t, {
                    y: -10,
                    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
                    duration: 0.3,
                    ease: 'power2.out',
                  }),
                    e &&
                      Qn.to(e, {
                        rotate: 5,
                        scale: 1.1,
                        duration: 0.4,
                        ease: 'power1.out',
                      });
                }),
                  t.addEventListener('mouseleave', () => {
                    Qn.to(t, {
                      y: 0,
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                      duration: 0.3,
                      ease: 'power2.out',
                    }),
                      e &&
                        Qn.to(e, {
                          rotate: 0,
                          scale: 1,
                          duration: 0.4,
                          ease: 'power1.out',
                        });
                  });
              }
            );
          const t = document.querySelector('.scroll-indicator');
          t &&
            Qn.to(t, {
              y: 10,
              duration: 1.5,
              repeat: -1,
              yoyo: !0,
              ease: 'power1.inOut',
            }),
            Array.from(document.querySelectorAll('.float-animation')).forEach(
              (t) => {
                Qn.to(t, {
                  y: -20,
                  duration: 2.5,
                  repeat: -1,
                  yoyo: !0,
                  ease: 'power1.inOut',
                });
              }
            ),
            Array.from(
              document.querySelectorAll(
                '.btn-animated, .feature-card, a, button'
              )
            ).forEach((t) => {
              t.addEventListener('focus', () => {
                t.classList.add('focus-visible');
              }),
                t.addEventListener('blur', () => {
                  t.classList.remove('focus-visible');
                });
            });
        })(),
        (function () {
          const t = document.querySelector('.hero-section');
          if (!t) return;
          const e = Qn.timeline({ defaults: { ease: 'power2.out' } }),
            r = t.querySelector('.hero-title');
          if (r && nu) {
            const t = new nu(r, {
              type: 'words,chars',
              wordsClass: 'word-inner',
            });
            e.fromTo(
              t.words,
              { y: '100%', opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, stagger: 0.05 }
            );
          } else
            r &&
              e.fromTo(
                r,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8 }
              );
          const n = Array.from(t.querySelectorAll('.word-inner')),
            i = t.querySelector('.hero-description'),
            o = t.querySelector('.hero-cta'),
            s = t.querySelector('.hero-image'),
            a = Array.from(t.querySelectorAll('.hero-stats .stat-card')),
            l = t.querySelector('.scroll-indicator');
          n.length > 0 &&
            e.fromTo(n, { y: '100%' }, { y: 0, duration: 0.8, stagger: 0.05 }),
            i &&
              e.fromTo(
                i,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6 },
                '-=0.4'
              ),
            o &&
              e.fromTo(
                o,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6 },
                '-=0.2'
              ),
            s &&
              e.fromTo(
                s,
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 0.8 },
                '-=0.5'
              ),
            a.length > 0 &&
              e.fromTo(
                a,
                { opacity: 0, x: 20 },
                { opacity: 1, x: 0, duration: 0.6, stagger: 0.2 },
                '-=0.4'
              ),
            l &&
              e.fromTo(
                l,
                { opacity: 0, y: -10 },
                { opacity: 1, y: 0, duration: 0.5 },
                '-=0.2'
              );
          const u = document.querySelector('.feature-svg');
          if (u && iu) {
            const t = 'M10 24L20 34L38 14',
              e = u.querySelector('path');
            e &&
              Qn.to(e, {
                morphSVG: { shape: t },
                duration: 1.2,
                delay: 0.5,
                ease: 'power2.inOut',
                repeat: 1,
                yoyo: !0,
              });
          }
        })();
    }
    function su() {
      const t = document.querySelector('.testimonial-carousel'),
        e = null == t ? void 0 : t.querySelector('.testimonial-track'),
        r = Array.from(
          (null == t ? void 0 : t.querySelectorAll('.testimonial-card')) || []
        ),
        n = Array.from(
          (null == t ? void 0 : t.querySelectorAll('.testimonial-dot')) || []
        );
      if (!t || !e || !r || !n || r.length < 2) return;
      let i,
        o = 0;
      const s = r.length;
      function a(t) {
        (o = t),
          Qn.to(e, {
            x: -r[0].offsetWidth * o,
            duration: 0.7,
            ease: 'power2.inOut',
            onUpdate: () => {
              r.forEach((t, e) => {
                t.setAttribute('tabindex', e === o ? '0' : '-1'),
                  t.setAttribute('aria-hidden', e === o ? 'false' : 'true');
              }),
                n.forEach((t, e) => {
                  t.classList.toggle('active', e === o),
                    t.setAttribute('aria-current', e === o ? 'true' : 'false');
                });
            },
          });
      }
      function l() {
        a((o + 1) % s);
      }
      function u() {
        i = window.setInterval(l, 6e3);
      }
      function c() {
        i && window.clearInterval(i);
      }
      t.setAttribute('aria-live', 'polite'),
        r.forEach((t, e) => {
          t.setAttribute('tabindex', e === o ? '0' : '-1'),
            t.setAttribute('aria-hidden', e === o ? 'false' : 'true');
        }),
        n.forEach((t, e) => {
          t.addEventListener('click', () => a(e)),
            t.addEventListener('keydown', (t) => {
              'ArrowLeft' === t.key
                ? (t.preventDefault(),
                  a((o - 1 + s) % s),
                  n[(o + s) % s].focus())
                : 'ArrowRight' === t.key &&
                  (t.preventDefault(), l(), n[(o + s) % s].focus());
            });
        }),
        t.addEventListener('mouseenter', c),
        t.addEventListener('mouseleave', u),
        t.addEventListener('focusin', c),
        t.addEventListener('focusout', (e) => {
          t.contains(e.relatedTarget) || u();
        }),
        window.addEventListener('resize', () => a(o)),
        a(0),
        u();
    }
    nu && Qn.registerPlugin(nu),
      iu && Qn.registerPlugin(iu),
      document.addEventListener('DOMContentLoaded', () => {
        ou(), su();
      }),
      document.body.addEventListener('htmx:afterSwap', () => {
        ou(), su();
      });
    const au = ou;
    return n;
  })()
);
//# sourceMappingURL=landing.bundle.js.map
