/*! For license information please see background.js.LICENSE.txt */

// Enter Your password here
const kerberos_username = "your_username";
const kerberos_password = "your_password";

(() => {
  var t = {
      487: (t) => {
        var e = {
          utf8: {
            stringToBytes: function (t) {
              return e.bin.stringToBytes(unescape(encodeURIComponent(t)));
            },
            bytesToString: function (t) {
              return decodeURIComponent(escape(e.bin.bytesToString(t)));
            },
          },
          bin: {
            stringToBytes: function (t) {
              for (var e = [], r = 0; r < t.length; r++)
                e.push(255 & t.charCodeAt(r));
              return e;
            },
            bytesToString: function (t) {
              for (var e = [], r = 0; r < t.length; r++)
                e.push(String.fromCharCode(t[r]));
              return e.join("");
            },
          },
        };
        t.exports = e;
      },
      12: (t) => {
        var e, r;
        (e =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"),
          (r = {
            rotl: function (t, e) {
              return (t << e) | (t >>> (32 - e));
            },
            rotr: function (t, e) {
              return (t << (32 - e)) | (t >>> e);
            },
            endian: function (t) {
              if (t.constructor == Number)
                return (16711935 & r.rotl(t, 8)) | (4278255360 & r.rotl(t, 24));
              for (var e = 0; e < t.length; e++) t[e] = r.endian(t[e]);
              return t;
            },
            randomBytes: function (t) {
              for (var e = []; t > 0; t--)
                e.push(Math.floor(256 * Math.random()));
              return e;
            },
            bytesToWords: function (t) {
              for (var e = [], r = 0, n = 0; r < t.length; r++, n += 8)
                e[n >>> 5] |= t[r] << (24 - (n % 32));
              return e;
            },
            wordsToBytes: function (t) {
              for (var e = [], r = 0; r < 32 * t.length; r += 8)
                e.push((t[r >>> 5] >>> (24 - (r % 32))) & 255);
              return e;
            },
            bytesToHex: function (t) {
              for (var e = [], r = 0; r < t.length; r++)
                e.push((t[r] >>> 4).toString(16)),
                  e.push((15 & t[r]).toString(16));
              return e.join("");
            },
            hexToBytes: function (t) {
              for (var e = [], r = 0; r < t.length; r += 2)
                e.push(parseInt(t.substr(r, 2), 16));
              return e;
            },
            bytesToBase64: function (t) {
              for (var r = [], n = 0; n < t.length; n += 3)
                for (
                  var o = (t[n] << 16) | (t[n + 1] << 8) | t[n + 2], a = 0;
                  a < 4;
                  a++
                )
                  8 * n + 6 * a <= 8 * t.length
                    ? r.push(e.charAt((o >>> (6 * (3 - a))) & 63))
                    : r.push("=");
              return r.join("");
            },
            base64ToBytes: function (t) {
              t = t.replace(/[^A-Z0-9+\/]/gi, "");
              for (var r = [], n = 0, o = 0; n < t.length; o = ++n % 4)
                0 != o &&
                  r.push(
                    ((e.indexOf(t.charAt(n - 1)) &
                      (Math.pow(2, -2 * o + 8) - 1)) <<
                      (2 * o)) |
                      (e.indexOf(t.charAt(n)) >>> (6 - 2 * o))
                  );
              return r;
            },
          }),
          (t.exports = r);
      },
      738: (t) => {
        function e(t) {
          return (
            !!t.constructor &&
            "function" == typeof t.constructor.isBuffer &&
            t.constructor.isBuffer(t)
          );
        }
        t.exports = function (t) {
          return (
            null != t &&
            (e(t) ||
              (function (t) {
                return (
                  "function" == typeof t.readFloatLE &&
                  "function" == typeof t.slice &&
                  e(t.slice(0, 0))
                );
              })(t) ||
              !!t._isBuffer)
          );
        };
      },
      568: (t, e, r) => {
        var n, o, a, c, u;
        (n = r(12)),
          (o = r(487).utf8),
          (a = r(738)),
          (c = r(487).bin),
          ((u = function (t, e) {
            t.constructor == String
              ? (t =
                  e && "binary" === e.encoding
                    ? c.stringToBytes(t)
                    : o.stringToBytes(t))
              : a(t)
              ? (t = Array.prototype.slice.call(t, 0))
              : Array.isArray(t) ||
                t.constructor === Uint8Array ||
                (t = t.toString());
            for (
              var r = n.bytesToWords(t),
                s = 8 * t.length,
                i = 1732584193,
                l = -271733879,
                f = -1732584194,
                p = 271733878,
                h = 0;
              h < r.length;
              h++
            )
              r[h] =
                (16711935 & ((r[h] << 8) | (r[h] >>> 24))) |
                (4278255360 & ((r[h] << 24) | (r[h] >>> 8)));
            (r[s >>> 5] |= 128 << s % 32),
              (r[14 + (((s + 64) >>> 9) << 4)] = s);
            var d = u._ff,
              y = u._gg,
              g = u._hh,
              S = u._ii;
            for (h = 0; h < r.length; h += 16) {
              var v = i,
                b = l,
                m = f,
                T = p;
              (i = d(i, l, f, p, r[h + 0], 7, -680876936)),
                (p = d(p, i, l, f, r[h + 1], 12, -389564586)),
                (f = d(f, p, i, l, r[h + 2], 17, 606105819)),
                (l = d(l, f, p, i, r[h + 3], 22, -1044525330)),
                (i = d(i, l, f, p, r[h + 4], 7, -176418897)),
                (p = d(p, i, l, f, r[h + 5], 12, 1200080426)),
                (f = d(f, p, i, l, r[h + 6], 17, -1473231341)),
                (l = d(l, f, p, i, r[h + 7], 22, -45705983)),
                (i = d(i, l, f, p, r[h + 8], 7, 1770035416)),
                (p = d(p, i, l, f, r[h + 9], 12, -1958414417)),
                (f = d(f, p, i, l, r[h + 10], 17, -42063)),
                (l = d(l, f, p, i, r[h + 11], 22, -1990404162)),
                (i = d(i, l, f, p, r[h + 12], 7, 1804603682)),
                (p = d(p, i, l, f, r[h + 13], 12, -40341101)),
                (f = d(f, p, i, l, r[h + 14], 17, -1502002290)),
                (i = y(
                  i,
                  (l = d(l, f, p, i, r[h + 15], 22, 1236535329)),
                  f,
                  p,
                  r[h + 1],
                  5,
                  -165796510
                )),
                (p = y(p, i, l, f, r[h + 6], 9, -1069501632)),
                (f = y(f, p, i, l, r[h + 11], 14, 643717713)),
                (l = y(l, f, p, i, r[h + 0], 20, -373897302)),
                (i = y(i, l, f, p, r[h + 5], 5, -701558691)),
                (p = y(p, i, l, f, r[h + 10], 9, 38016083)),
                (f = y(f, p, i, l, r[h + 15], 14, -660478335)),
                (l = y(l, f, p, i, r[h + 4], 20, -405537848)),
                (i = y(i, l, f, p, r[h + 9], 5, 568446438)),
                (p = y(p, i, l, f, r[h + 14], 9, -1019803690)),
                (f = y(f, p, i, l, r[h + 3], 14, -187363961)),
                (l = y(l, f, p, i, r[h + 8], 20, 1163531501)),
                (i = y(i, l, f, p, r[h + 13], 5, -1444681467)),
                (p = y(p, i, l, f, r[h + 2], 9, -51403784)),
                (f = y(f, p, i, l, r[h + 7], 14, 1735328473)),
                (i = g(
                  i,
                  (l = y(l, f, p, i, r[h + 12], 20, -1926607734)),
                  f,
                  p,
                  r[h + 5],
                  4,
                  -378558
                )),
                (p = g(p, i, l, f, r[h + 8], 11, -2022574463)),
                (f = g(f, p, i, l, r[h + 11], 16, 1839030562)),
                (l = g(l, f, p, i, r[h + 14], 23, -35309556)),
                (i = g(i, l, f, p, r[h + 1], 4, -1530992060)),
                (p = g(p, i, l, f, r[h + 4], 11, 1272893353)),
                (f = g(f, p, i, l, r[h + 7], 16, -155497632)),
                (l = g(l, f, p, i, r[h + 10], 23, -1094730640)),
                (i = g(i, l, f, p, r[h + 13], 4, 681279174)),
                (p = g(p, i, l, f, r[h + 0], 11, -358537222)),
                (f = g(f, p, i, l, r[h + 3], 16, -722521979)),
                (l = g(l, f, p, i, r[h + 6], 23, 76029189)),
                (i = g(i, l, f, p, r[h + 9], 4, -640364487)),
                (p = g(p, i, l, f, r[h + 12], 11, -421815835)),
                (f = g(f, p, i, l, r[h + 15], 16, 530742520)),
                (i = S(
                  i,
                  (l = g(l, f, p, i, r[h + 2], 23, -995338651)),
                  f,
                  p,
                  r[h + 0],
                  6,
                  -198630844
                )),
                (p = S(p, i, l, f, r[h + 7], 10, 1126891415)),
                (f = S(f, p, i, l, r[h + 14], 15, -1416354905)),
                (l = S(l, f, p, i, r[h + 5], 21, -57434055)),
                (i = S(i, l, f, p, r[h + 12], 6, 1700485571)),
                (p = S(p, i, l, f, r[h + 3], 10, -1894986606)),
                (f = S(f, p, i, l, r[h + 10], 15, -1051523)),
                (l = S(l, f, p, i, r[h + 1], 21, -2054922799)),
                (i = S(i, l, f, p, r[h + 8], 6, 1873313359)),
                (p = S(p, i, l, f, r[h + 15], 10, -30611744)),
                (f = S(f, p, i, l, r[h + 6], 15, -1560198380)),
                (l = S(l, f, p, i, r[h + 13], 21, 1309151649)),
                (i = S(i, l, f, p, r[h + 4], 6, -145523070)),
                (p = S(p, i, l, f, r[h + 11], 10, -1120210379)),
                (f = S(f, p, i, l, r[h + 2], 15, 718787259)),
                (l = S(l, f, p, i, r[h + 9], 21, -343485551)),
                (i = (i + v) >>> 0),
                (l = (l + b) >>> 0),
                (f = (f + m) >>> 0),
                (p = (p + T) >>> 0);
            }
            return n.endian([i, l, f, p]);
          })._ff = function (t, e, r, n, o, a, c) {
            var u = t + ((e & r) | (~e & n)) + (o >>> 0) + c;
            return ((u << a) | (u >>> (32 - a))) + e;
          }),
          (u._gg = function (t, e, r, n, o, a, c) {
            var u = t + ((e & n) | (r & ~n)) + (o >>> 0) + c;
            return ((u << a) | (u >>> (32 - a))) + e;
          }),
          (u._hh = function (t, e, r, n, o, a, c) {
            var u = t + (e ^ r ^ n) + (o >>> 0) + c;
            return ((u << a) | (u >>> (32 - a))) + e;
          }),
          (u._ii = function (t, e, r, n, o, a, c) {
            var u = t + (r ^ (e | ~n)) + (o >>> 0) + c;
            return ((u << a) | (u >>> (32 - a))) + e;
          }),
          (u._blocksize = 16),
          (u._digestsize = 16),
          (t.exports = function (t, e) {
            if (null == t) throw new Error("Illegal argument " + t);
            var r = n.wordsToBytes(u(t, e));
            return e && e.asBytes
              ? r
              : e && e.asString
              ? c.bytesToString(r)
              : n.bytesToHex(r);
          });
      },
      207: (t, e, r) => {
        "use strict";
        r.r(e),
          r.d(e, { decodeToken: () => s, isExpired: () => i, useJwt: () => l });
        for (var n = r(294), o = new Map(), a = 0; a < 64; a++) {
          var c = a.toString(2),
            u = 6 - c.length;
          (c = "0".repeat(u) + c),
            o.set(
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt(
                a
              ),
              c
            );
        }
        function s(t) {
          try {
            if (3 !== t.split(".").length || "string" != typeof t) return null;
            var e =
                ((n = t.split(".")[1]),
                (a = (function (t) {
                  for (var e = "", r = 0; r < t.length; r++)
                    e += o.get(t.charCodeAt(r));
                  e = e.slice(0, e.length - (e.length % 8));
                  for (var n = [], a = 0; a < e.length / 8; a++)
                    n.push(e.slice(8 * a, 8 * a + 8));
                  return n;
                })(
                  (n = (n = (n = n.replaceAll("=", "")).replaceAll(
                    "-",
                    "+"
                  )).replaceAll("_", "/"))
                )),
                a.map(function (t) {
                  return parseInt(t, 2);
                })),
              r = decodeURIComponent(
                (function (t) {
                  for (var e, r = "", n = t.length, o = 0; o < n; o++)
                    (e = t[o]),
                      (r += String.fromCodePoint(
                        e > 251 && e < 254 && o + 5 < n
                          ? 1073741824 * (e - 252) +
                              ((t[++o] - 128) << 24) +
                              ((t[++o] - 128) << 18) +
                              ((t[++o] - 128) << 12) +
                              ((t[++o] - 128) << 6) +
                              t[++o] -
                              128
                          : e > 247 && e < 252 && o + 4 < n
                          ? ((e - 248) << 24) +
                            ((t[++o] - 128) << 18) +
                            ((t[++o] - 128) << 12) +
                            ((t[++o] - 128) << 6) +
                            t[++o] -
                            128
                          : e > 239 && e < 248 && o + 3 < n
                          ? ((e - 240) << 18) +
                            ((t[++o] - 128) << 12) +
                            ((t[++o] - 128) << 6) +
                            t[++o] -
                            128
                          : e > 223 && e < 240 && o + 2 < n
                          ? ((e - 224) << 12) +
                            ((t[++o] - 128) << 6) +
                            t[++o] -
                            128
                          : e > 191 && e < 224 && o + 1 < n
                          ? ((e - 192) << 6) + t[++o] - 128
                          : e
                      ));
                  return r;
                })(e)
              );
            return JSON.parse(r);
          } catch (t) {
            return (
              console.error("There was an error decoding token: ", t), null
            );
          }
          var n, a;
        }
        function i(t) {
          var e = s(t),
            r = !0;
          if (e && e.exp) {
            var n = new Date(0);
            n.setUTCSeconds(e.exp), (r = n.valueOf() < new Date().valueOf());
          }
          return r;
        }
        function l(t) {
          var e = (0, n.useState)(!1),
            r = e[0],
            o = e[1],
            a = (0, n.useState)(null),
            c = a[0],
            u = a[1];
          (0, n.useEffect)(
            function () {
              l(t);
            },
            [t]
          );
          var l = function (t) {
            u(s(t)), o(i(t));
          };
          return { isExpired: r, decodedToken: c, reEvaluateToken: l };
        }
      },
      408: (t, e) => {
        "use strict";
        Symbol.for("react.element"),
          Symbol.for("react.portal"),
          Symbol.for("react.fragment"),
          Symbol.for("react.strict_mode"),
          Symbol.for("react.profiler"),
          Symbol.for("react.provider"),
          Symbol.for("react.context"),
          Symbol.for("react.forward_ref"),
          Symbol.for("react.suspense"),
          Symbol.for("react.memo"),
          Symbol.for("react.lazy"),
          Symbol.iterator;
        var r = {
            isMounted: function () {
              return !1;
            },
            enqueueForceUpdate: function () {},
            enqueueReplaceState: function () {},
            enqueueSetState: function () {},
          },
          n = Object.assign,
          o = {};
        function a(t, e, n) {
          (this.props = t),
            (this.context = e),
            (this.refs = o),
            (this.updater = n || r);
        }
        function c() {}
        function u(t, e, n) {
          (this.props = t),
            (this.context = e),
            (this.refs = o),
            (this.updater = n || r);
        }
        (a.prototype.isReactComponent = {}),
          (a.prototype.setState = function (t, e) {
            if ("object" != typeof t && "function" != typeof t && null != t)
              throw Error(
                "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
              );
            this.updater.enqueueSetState(this, t, e, "setState");
          }),
          (a.prototype.forceUpdate = function (t) {
            this.updater.enqueueForceUpdate(this, t, "forceUpdate");
          }),
          (c.prototype = a.prototype);
        var s = (u.prototype = new c());
        (s.constructor = u), n(s, a.prototype), (s.isPureReactComponent = !0);
        Array.isArray, Object.prototype.hasOwnProperty;
        var i = { current: null };
        (e.useEffect = function (t, e) {
          return i.current.useEffect(t, e);
        }),
          (e.useState = function (t) {
            return i.current.useState(t);
          });
      },
      294: (t, e, r) => {
        "use strict";
        t.exports = r(408);
      },
    },
    e = {};
  function r(n) {
    var o = e[n];
    if (void 0 !== o) return o.exports;
    var a = (e[n] = { exports: {} });
    return t[n](a, a.exports, r), a.exports;
  }
  (r.d = (t, e) => {
    for (var n in e)
      r.o(e, n) &&
        !r.o(t, n) &&
        Object.defineProperty(t, n, { enumerable: !0, get: e[n] });
  }),
    (r.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
    (r.r = (t) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (() => {
      const t = r(568),
        e = r(207);
      let n = kerberos_password;
      (n = t(n)),
        document.addEventListener("logged-in", () => {
          location.reload();
        }),
        null ===
          (function () {
            try {
              const t = localStorage.getItem("OCS-JWT");
              return null === t ? (console.log("OCS-JWT not found"), null) : t;
            } catch (t) {
              return console.log(t), null;
            }
          })() &&
          ((captchaToken = (async function () {
            try {
              const t = await fetch("https://ocs.iitd.ac.in/api/captcha", {
                  method: "GET",
                  headers: { "Content-Type": "application/json" },
                }),
                e = await t.json();
              return console.log("Fetched Captcha Successfully"), e.token;
            } catch (t) {
              return console.log(t), null;
            }
          })()),
          captchaToken.then((t) => {
            null !== t &&
              (async function (t) {
                const r = e.decodeToken(t).captcha;
                try {
                  const e = await fetch(
                    "https://ocs.iitd.ac.in/api/student/login",
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        username: kerberos_username,
                        password: n,
                        captcha: r,
                        captchaToken: t,
                      }),
                    }
                  );
                  !(function (t) {
                    try {
                      localStorage.setItem("OCS-JWT", t),
                        console.log("Logged In Successfully"),
                        document.dispatchEvent(new Event("logged-in"));
                    } catch (t) {
                      console.log("Failed to set token"), console.log(t);
                    }
                  })(await e.json());
                } catch (t) {
                  console.log(t);
                }
              })(t);
          }));
    })();
})();
