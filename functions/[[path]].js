var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse2;
    exports.serialize = serialize2;
    var decode = decodeURIComponent, encode = encodeURIComponent, fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse2(str, options) {
      if (typeof str != "string")
        throw new TypeError("argument str must be a string");
      for (var obj = {}, opt = options || {}, pairs = str.split(";"), dec = opt.decode || decode, i = 0; i < pairs.length; i++) {
        var pair = pairs[i], index = pair.indexOf("=");
        if (!(index < 0)) {
          var key = pair.substring(0, index).trim();
          if (obj[key] == null) {
            var val = pair.substring(index + 1, pair.length).trim();
            val[0] === '"' && (val = val.slice(1, -1)), obj[key] = tryDecode(val, dec);
          }
        }
      }
      return obj;
    }
    function serialize2(name, val, options) {
      var opt = options || {}, enc = opt.encode || encode;
      if (typeof enc != "function")
        throw new TypeError("option encode is invalid");
      if (!fieldContentRegExp.test(name))
        throw new TypeError("argument name is invalid");
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value))
        throw new TypeError("argument val is invalid");
      var str = name + "=" + value;
      if (opt.maxAge != null) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge))
          throw new TypeError("option maxAge is invalid");
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain))
          throw new TypeError("option domain is invalid");
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path))
          throw new TypeError("option path is invalid");
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        if (typeof opt.expires.toUTCString != "function")
          throw new TypeError("option expires is invalid");
        str += "; Expires=" + opt.expires.toUTCString();
      }
      if (opt.httpOnly && (str += "; HttpOnly"), opt.secure && (str += "; Secure"), opt.sameSite) {
        var sameSite = typeof opt.sameSite == "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case !0:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch {
        return str;
      }
    }
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/warnings.js
function warnOnce(condition, message) {
  !condition && !alreadyWarned[message] && (alreadyWarned[message] = !0, console.warn(message));
}
var alreadyWarned, init_warnings = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/warnings.js"() {
    alreadyWarned = {};
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/cookies.js
async function encodeCookieValue(sign, value, secrets) {
  let encoded = encodeData(value);
  return secrets.length > 0 && (encoded = await sign(encoded, secrets[0])), encoded;
}
async function decodeCookieValue(unsign, value, secrets) {
  if (secrets.length > 0) {
    for (let secret of secrets) {
      let unsignedValue = await unsign(value, secret);
      if (unsignedValue !== !1)
        return decodeData(unsignedValue);
    }
    return null;
  }
  return decodeData(value);
}
function encodeData(value) {
  return btoa(myUnescape(encodeURIComponent(JSON.stringify(value))));
}
function decodeData(value) {
  try {
    return JSON.parse(decodeURIComponent(myEscape(atob(value))));
  } catch {
    return {};
  }
}
function myEscape(value) {
  let str = value.toString(), result = "", index = 0, chr, code;
  for (; index < str.length; )
    chr = str.charAt(index++), /[\w*+\-./@]/.exec(chr) ? result += chr : (code = chr.charCodeAt(0), code < 256 ? result += "%" + hex(code, 2) : result += "%u" + hex(code, 4).toUpperCase());
  return result;
}
function hex(code, length) {
  let result = code.toString(16);
  for (; result.length < length; )
    result = "0" + result;
  return result;
}
function myUnescape(value) {
  let str = value.toString(), result = "", index = 0, chr, part;
  for (; index < str.length; ) {
    if (chr = str.charAt(index++), chr === "%") {
      if (str.charAt(index) === "u") {
        if (part = str.slice(index + 1, index + 5), /^[\da-f]{4}$/i.exec(part)) {
          result += String.fromCharCode(parseInt(part, 16)), index += 5;
          continue;
        }
      } else if (part = str.slice(index, index + 2), /^[\da-f]{2}$/i.exec(part)) {
        result += String.fromCharCode(parseInt(part, 16)), index += 2;
        continue;
      }
    }
    result += chr;
  }
  return result;
}
function warnOnceAboutExpiresCookie(name, expires) {
  warnOnce(!expires, `The "${name}" cookie has an "expires" property set. This will cause the expires value to not be updated when the session is committed. Instead, you should set the expires value when serializing the cookie. You can use \`commitSession(session, { expires })\` if using a session storage object, or \`cookie.serialize("value", { expires })\` if you're using the cookie directly.`);
}
var import_cookie, createCookieFactory, isCookie, init_cookies = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/cookies.js"() {
    import_cookie = __toESM(require_cookie());
    init_warnings();
    createCookieFactory = ({
      sign,
      unsign
    }) => (name, cookieOptions = {}) => {
      let {
        secrets = [],
        ...options
      } = {
        path: "/",
        sameSite: "lax",
        ...cookieOptions
      };
      return warnOnceAboutExpiresCookie(name, options.expires), {
        get name() {
          return name;
        },
        get isSigned() {
          return secrets.length > 0;
        },
        get expires() {
          return typeof options.maxAge < "u" ? new Date(Date.now() + options.maxAge * 1e3) : options.expires;
        },
        async parse(cookieHeader, parseOptions) {
          if (!cookieHeader)
            return null;
          let cookies = (0, import_cookie.parse)(cookieHeader, {
            ...options,
            ...parseOptions
          });
          return name in cookies ? cookies[name] === "" ? "" : await decodeCookieValue(unsign, cookies[name], secrets) : null;
        },
        async serialize(value, serializeOptions) {
          return (0, import_cookie.serialize)(name, value === "" ? "" : await encodeCookieValue(sign, value, secrets), {
            ...options,
            ...serializeOptions
          });
        }
      };
    }, isCookie = (object) => object != null && typeof object.name == "string" && typeof object.isSigned == "boolean" && typeof object.parse == "function" && typeof object.serialize == "function";
  }
});

// node_modules/@web3-storage/multipart-parser/esm/src/utils.js
function stringToArray(s) {
  let utf8 = unescape(encodeURIComponent(s));
  return Uint8Array.from(utf8, (_, i) => utf8.charCodeAt(i));
}
function arrayToString(a) {
  let utf8 = String.fromCharCode.apply(null, a);
  return decodeURIComponent(escape(utf8));
}
function mergeArrays(...arrays) {
  let out = new Uint8Array(arrays.reduce((total, arr) => total + arr.length, 0)), offset = 0;
  for (let arr of arrays)
    out.set(arr, offset), offset += arr.length;
  return out;
}
function arraysEqual(a, b) {
  if (a.length !== b.length)
    return !1;
  for (let i = 0; i < a.length; i++)
    if (a[i] !== b[i])
      return !1;
  return !0;
}
var init_utils = __esm({
  "node_modules/@web3-storage/multipart-parser/esm/src/utils.js"() {
  }
});

// node_modules/@web3-storage/multipart-parser/esm/src/search.js
function coerce(a) {
  return a instanceof Uint8Array ? (index) => a[index] : a;
}
function jsmemcmp(buf1, pos1, buf2, pos2, len) {
  let fn1 = coerce(buf1), fn2 = coerce(buf2);
  for (let i = 0; i < len; ++i)
    if (fn1(pos1 + i) !== fn2(pos2 + i))
      return !1;
  return !0;
}
function createOccurenceTable(s) {
  let table = new Array(256).fill(s.length);
  if (s.length > 1)
    for (let i = 0; i < s.length - 1; i++)
      table[s[i]] = s.length - 1 - i;
  return table;
}
var MATCH, StreamSearch, ReadableStreamSearch, EOQ, QueueableStreamSearch, init_search = __esm({
  "node_modules/@web3-storage/multipart-parser/esm/src/search.js"() {
    init_utils();
    MATCH = Symbol("Match"), StreamSearch = class {
      constructor(needle) {
        this._lookbehind = new Uint8Array(), typeof needle == "string" ? this._needle = needle = stringToArray(needle) : this._needle = needle, this._lastChar = needle[needle.length - 1], this._occ = createOccurenceTable(needle);
      }
      feed(chunk) {
        let pos = 0, tokens, allTokens = [];
        for (; pos !== chunk.length; )
          [pos, ...tokens] = this._feed(chunk, pos), allTokens.push(...tokens);
        return allTokens;
      }
      end() {
        let tail = this._lookbehind;
        return this._lookbehind = new Uint8Array(), tail;
      }
      _feed(data, bufPos) {
        let tokens = [], pos = -this._lookbehind.length;
        if (pos < 0) {
          for (; pos < 0 && pos <= data.length - this._needle.length; ) {
            let ch = this._charAt(data, pos + this._needle.length - 1);
            if (ch === this._lastChar && this._memcmp(data, pos, this._needle.length - 1))
              return pos > -this._lookbehind.length && tokens.push(this._lookbehind.slice(0, this._lookbehind.length + pos)), tokens.push(MATCH), this._lookbehind = new Uint8Array(), [
                pos + this._needle.length,
                ...tokens
              ];
            pos += this._occ[ch];
          }
          if (pos < 0)
            for (; pos < 0 && !this._memcmp(data, pos, data.length - pos); )
              pos++;
          if (pos >= 0)
            tokens.push(this._lookbehind), this._lookbehind = new Uint8Array();
          else {
            let bytesToCutOff = this._lookbehind.length + pos;
            return bytesToCutOff > 0 && (tokens.push(this._lookbehind.slice(0, bytesToCutOff)), this._lookbehind = this._lookbehind.slice(bytesToCutOff)), this._lookbehind = Uint8Array.from(new Array(this._lookbehind.length + data.length), (_, i) => this._charAt(data, i - this._lookbehind.length)), [
              data.length,
              ...tokens
            ];
          }
        }
        for (pos += bufPos; pos <= data.length - this._needle.length; ) {
          let ch = data[pos + this._needle.length - 1];
          if (ch === this._lastChar && data[pos] === this._needle[0] && jsmemcmp(this._needle, 0, data, pos, this._needle.length - 1))
            return pos > bufPos && tokens.push(data.slice(bufPos, pos)), tokens.push(MATCH), [
              pos + this._needle.length,
              ...tokens
            ];
          pos += this._occ[ch];
        }
        if (pos < data.length) {
          for (; pos < data.length && (data[pos] !== this._needle[0] || !jsmemcmp(data, pos, this._needle, 0, data.length - pos)); )
            ++pos;
          pos < data.length && (this._lookbehind = data.slice(pos));
        }
        return pos > 0 && tokens.push(data.slice(bufPos, pos < data.length ? pos : data.length)), [
          data.length,
          ...tokens
        ];
      }
      _charAt(data, pos) {
        return pos < 0 ? this._lookbehind[this._lookbehind.length + pos] : data[pos];
      }
      _memcmp(data, pos, len) {
        return jsmemcmp(this._charAt.bind(this, data), pos, this._needle, 0, len);
      }
    }, ReadableStreamSearch = class {
      constructor(needle, _readableStream) {
        this._readableStream = _readableStream, this._search = new StreamSearch(needle);
      }
      async *[Symbol.asyncIterator]() {
        let reader = this._readableStream.getReader();
        try {
          for (; ; ) {
            let result = await reader.read();
            if (result.done)
              break;
            yield* this._search.feed(result.value);
          }
          let tail = this._search.end();
          tail.length && (yield tail);
        } finally {
          reader.releaseLock();
        }
      }
    }, EOQ = Symbol("End of Queue"), QueueableStreamSearch = class {
      constructor(needle) {
        this._chunksQueue = [], this._closed = !1, this._search = new StreamSearch(needle);
      }
      push(...chunks) {
        if (this._closed)
          throw new Error("cannot call push after close");
        this._chunksQueue.push(...chunks), this._notify && this._notify();
      }
      close() {
        if (this._closed)
          throw new Error("close was already called");
        this._closed = !0, this._chunksQueue.push(EOQ), this._notify && this._notify();
      }
      async *[Symbol.asyncIterator]() {
        for (; ; ) {
          let chunk;
          for (; !(chunk = this._chunksQueue.shift()); )
            await new Promise((resolve) => this._notify = resolve), this._notify = void 0;
          if (chunk === EOQ)
            break;
          yield* this._search.feed(chunk);
        }
        let tail = this._search.end();
        tail.length && (yield tail);
      }
    };
  }
});

// node_modules/@web3-storage/multipart-parser/esm/src/index.js
function parseContentDisposition(header) {
  let parts = header.split(";").map((part) => part.trim());
  if (parts.shift() !== "form-data")
    throw new Error('malformed content-disposition header: missing "form-data" in `' + JSON.stringify(parts) + "`");
  let out = {};
  for (let part of parts) {
    let kv = part.split("=", 2);
    if (kv.length !== 2)
      throw new Error("malformed content-disposition header: key-value pair not found - " + part + " in `" + header + "`");
    let [name, value] = kv;
    if (value[0] === '"' && value[value.length - 1] === '"')
      out[name] = value.slice(1, -1).replace(/\\"/g, '"');
    else if (value[0] !== '"' && value[value.length - 1] !== '"')
      out[name] = value;
    else if (value[0] === '"' && value[value.length - 1] !== '"' || value[0] !== '"' && value[value.length - 1] === '"')
      throw new Error("malformed content-disposition header: mismatched quotations in `" + header + "`");
  }
  if (!out.name)
    throw new Error("malformed content-disposition header: missing field name in `" + header + "`");
  return out;
}
function parsePartHeaders(lines) {
  let entries = [], disposition = !1, line;
  for (; typeof (line = lines.shift()) < "u"; ) {
    let colon = line.indexOf(":");
    if (colon === -1)
      throw new Error("malformed multipart-form header: missing colon");
    let header = line.slice(0, colon).trim().toLowerCase(), value = line.slice(colon + 1).trim();
    switch (header) {
      case "content-disposition":
        disposition = !0, entries.push(...Object.entries(parseContentDisposition(value)));
        break;
      case "content-type":
        entries.push([
          "contentType",
          value
        ]);
    }
  }
  if (!disposition)
    throw new Error("malformed multipart-form header: missing content-disposition");
  return Object.fromEntries(entries);
}
async function readHeaderLines(it, needle) {
  let firstChunk = !0, lastTokenWasMatch = !1, headerLines = [[]], crlfSearch = new StreamSearch(CRLF);
  for (; ; ) {
    let result = await it.next();
    if (result.done)
      throw new Error("malformed multipart-form data: unexpected end of stream");
    if (firstChunk && result.value !== MATCH && arraysEqual(result.value.slice(0, 2), dash))
      return [
        void 0,
        new Uint8Array()
      ];
    let chunk;
    if (result.value !== MATCH)
      chunk = result.value;
    else if (!lastTokenWasMatch)
      chunk = needle;
    else
      throw new Error("malformed multipart-form data: unexpected boundary");
    if (!chunk.length)
      continue;
    firstChunk && (firstChunk = !1);
    let tokens = crlfSearch.feed(chunk);
    for (let [i, token] of tokens.entries()) {
      let isMatch = token === MATCH;
      if (!(!isMatch && !token.length)) {
        if (lastTokenWasMatch && isMatch)
          return tokens.push(crlfSearch.end()), [
            headerLines.filter((chunks) => chunks.length).map(mergeArrays2).map(arrayToString),
            mergeArrays(...tokens.slice(i + 1).map((token2) => token2 === MATCH ? CRLF : token2))
          ];
        (lastTokenWasMatch = isMatch) ? headerLines.push([]) : headerLines[headerLines.length - 1].push(token);
      }
    }
  }
}
async function* streamMultipart(body, boundary) {
  let needle = mergeArrays(dash, stringToArray(boundary)), it = new ReadableStreamSearch(needle, body)[Symbol.asyncIterator]();
  for (; ; ) {
    let result = await it.next();
    if (result.done)
      return;
    if (result.value === MATCH)
      break;
  }
  let crlfSearch = new StreamSearch(CRLF);
  for (; ; ) {
    let feedChunk = function(chunk) {
      let chunks = [];
      for (let token of crlfSearch.feed(chunk))
        trailingCRLF && chunks.push(CRLF), (trailingCRLF = token === MATCH) || chunks.push(token);
      return mergeArrays(...chunks);
    }, [headerLines, tail] = await readHeaderLines(it, needle);
    if (!headerLines)
      return;
    async function nextToken() {
      let result = await it.next();
      if (result.done)
        throw new Error("malformed multipart-form data: unexpected end of stream");
      return result;
    }
    let trailingCRLF = !1, done = !1;
    async function nextChunk() {
      let result = await nextToken(), chunk;
      if (result.value !== MATCH)
        chunk = result.value;
      else if (!trailingCRLF)
        chunk = CRLF;
      else
        return done = !0, { value: crlfSearch.end() };
      return { value: feedChunk(chunk) };
    }
    let bufferedChunks = [{ value: feedChunk(tail) }];
    for (yield {
      ...parsePartHeaders(headerLines),
      data: {
        [Symbol.asyncIterator]() {
          return this;
        },
        async next() {
          for (; ; ) {
            let result = bufferedChunks.shift();
            if (!result)
              break;
            if (result.value.length > 0)
              return result;
          }
          for (; ; ) {
            if (done)
              return {
                done,
                value: void 0
              };
            let result = await nextChunk();
            if (result.value.length > 0)
              return result;
          }
        }
      }
    }; !done; )
      bufferedChunks.push(await nextChunk());
  }
}
var mergeArrays2, dash, CRLF, init_src = __esm({
  "node_modules/@web3-storage/multipart-parser/esm/src/index.js"() {
    init_search();
    init_utils();
    mergeArrays2 = Function.prototype.apply.bind(mergeArrays, void 0), dash = stringToArray("--"), CRLF = stringToArray(`\r
`);
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/formData.js
function composeUploadHandlers(...handlers) {
  return async (part) => {
    for (let handler of handlers) {
      let value = await handler(part);
      if (typeof value < "u" && value !== null)
        return value;
    }
  };
}
async function parseMultipartFormData(request, uploadHandler) {
  let contentType = request.headers.get("Content-Type") || "", [type, boundary] = contentType.split(/\s*;\s*boundary=/);
  if (!request.body || !boundary || type !== "multipart/form-data")
    throw new TypeError("Could not parse content as FormData.");
  let formData = new FormData(), parts = streamMultipart(request.body, boundary);
  for await (let part of parts) {
    if (part.done)
      break;
    typeof part.filename == "string" && (part.filename = part.filename.split(/[/\\]/).pop());
    let value = await uploadHandler(part);
    typeof value < "u" && value !== null && formData.append(part.name, value);
  }
  return formData;
}
var init_formData = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/formData.js"() {
    init_src();
  }
});

// node_modules/@remix-run/router/dist/router.js
var router_exports = {};
__export(router_exports, {
  AbortedDeferredError: () => AbortedDeferredError,
  Action: () => Action,
  ErrorResponse: () => ErrorResponse,
  IDLE_BLOCKER: () => IDLE_BLOCKER,
  IDLE_FETCHER: () => IDLE_FETCHER,
  IDLE_NAVIGATION: () => IDLE_NAVIGATION,
  UNSAFE_DEFERRED_SYMBOL: () => UNSAFE_DEFERRED_SYMBOL,
  UNSAFE_DeferredData: () => DeferredData,
  UNSAFE_convertRoutesToDataRoutes: () => convertRoutesToDataRoutes,
  UNSAFE_getPathContributingMatches: () => getPathContributingMatches,
  UNSAFE_invariant: () => invariant,
  UNSAFE_warning: () => warning,
  createBrowserHistory: () => createBrowserHistory,
  createHashHistory: () => createHashHistory,
  createMemoryHistory: () => createMemoryHistory,
  createPath: () => createPath,
  createRouter: () => createRouter,
  createStaticHandler: () => createStaticHandler,
  defer: () => defer,
  generatePath: () => generatePath,
  getStaticContextFromError: () => getStaticContextFromError,
  getToPathname: () => getToPathname,
  isDeferredData: () => isDeferredData,
  isRouteErrorResponse: () => isRouteErrorResponse,
  joinPaths: () => joinPaths,
  json: () => json,
  matchPath: () => matchPath,
  matchRoutes: () => matchRoutes,
  normalizePathname: () => normalizePathname,
  parsePath: () => parsePath,
  redirect: () => redirect,
  resolvePath: () => resolvePath,
  resolveTo: () => resolveTo,
  stripBasename: () => stripBasename
});
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source)
        Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
    }
    return target;
  }, _extends.apply(this, arguments);
}
function createMemoryHistory(options) {
  options === void 0 && (options = {});
  let {
    initialEntries = ["/"],
    initialIndex,
    v5Compat = !1
  } = options, entries;
  entries = initialEntries.map((entry2, index2) => createMemoryLocation(entry2, typeof entry2 == "string" ? null : entry2.state, index2 === 0 ? "default" : void 0));
  let index = clampIndex(initialIndex ?? entries.length - 1), action = Action.Pop, listener = null;
  function clampIndex(n) {
    return Math.min(Math.max(n, 0), entries.length - 1);
  }
  function getCurrentLocation() {
    return entries[index];
  }
  function createMemoryLocation(to, state, key) {
    state === void 0 && (state = null);
    let location2 = createLocation(entries ? getCurrentLocation().pathname : "/", to, state, key);
    return warning(location2.pathname.charAt(0) === "/", "relative pathnames are not supported in memory history: " + JSON.stringify(to)), location2;
  }
  function createHref(to) {
    return typeof to == "string" ? to : createPath(to);
  }
  return {
    get index() {
      return index;
    },
    get action() {
      return action;
    },
    get location() {
      return getCurrentLocation();
    },
    createHref,
    createURL(to) {
      return new URL(createHref(to), "http://localhost");
    },
    encodeLocation(to) {
      let path = typeof to == "string" ? parsePath(to) : to;
      return {
        pathname: path.pathname || "",
        search: path.search || "",
        hash: path.hash || ""
      };
    },
    push(to, state) {
      action = Action.Push;
      let nextLocation = createMemoryLocation(to, state);
      index += 1, entries.splice(index, entries.length, nextLocation), v5Compat && listener && listener({
        action,
        location: nextLocation,
        delta: 1
      });
    },
    replace(to, state) {
      action = Action.Replace;
      let nextLocation = createMemoryLocation(to, state);
      entries[index] = nextLocation, v5Compat && listener && listener({
        action,
        location: nextLocation,
        delta: 0
      });
    },
    go(delta) {
      action = Action.Pop;
      let nextIndex = clampIndex(index + delta), nextLocation = entries[nextIndex];
      index = nextIndex, listener && listener({
        action,
        location: nextLocation,
        delta
      });
    },
    listen(fn) {
      return listener = fn, () => {
        listener = null;
      };
    }
  };
}
function createBrowserHistory(options) {
  options === void 0 && (options = {});
  function createBrowserLocation(window2, globalHistory) {
    let {
      pathname,
      search,
      hash
    } = window2.location;
    return createLocation(
      "",
      {
        pathname,
        search,
        hash
      },
      // state defaults to `null` because `window.history.state` does
      globalHistory.state && globalHistory.state.usr || null,
      globalHistory.state && globalHistory.state.key || "default"
    );
  }
  function createBrowserHref(window2, to) {
    return typeof to == "string" ? to : createPath(to);
  }
  return getUrlBasedHistory(createBrowserLocation, createBrowserHref, null, options);
}
function createHashHistory(options) {
  options === void 0 && (options = {});
  function createHashLocation(window2, globalHistory) {
    let {
      pathname = "/",
      search = "",
      hash = ""
    } = parsePath(window2.location.hash.substr(1));
    return createLocation(
      "",
      {
        pathname,
        search,
        hash
      },
      // state defaults to `null` because `window.history.state` does
      globalHistory.state && globalHistory.state.usr || null,
      globalHistory.state && globalHistory.state.key || "default"
    );
  }
  function createHashHref(window2, to) {
    let base = window2.document.querySelector("base"), href = "";
    if (base && base.getAttribute("href")) {
      let url = window2.location.href, hashIndex = url.indexOf("#");
      href = hashIndex === -1 ? url : url.slice(0, hashIndex);
    }
    return href + "#" + (typeof to == "string" ? to : createPath(to));
  }
  function validateHashLocation(location2, to) {
    warning(location2.pathname.charAt(0) === "/", "relative pathnames are not supported in hash history.push(" + JSON.stringify(to) + ")");
  }
  return getUrlBasedHistory(createHashLocation, createHashHref, validateHashLocation, options);
}
function invariant(value, message) {
  if (value === !1 || value === null || typeof value > "u")
    throw new Error(message);
}
function warning(cond, message) {
  if (!cond) {
    typeof console < "u" && console.warn(message);
    try {
      throw new Error(message);
    } catch {
    }
  }
}
function createKey() {
  return Math.random().toString(36).substr(2, 8);
}
function getHistoryState(location2, index) {
  return {
    usr: location2.state,
    key: location2.key,
    idx: index
  };
}
function createLocation(current, to, state, key) {
  return state === void 0 && (state = null), _extends({
    pathname: typeof current == "string" ? current : current.pathname,
    search: "",
    hash: ""
  }, typeof to == "string" ? parsePath(to) : to, {
    state,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: to && to.key || key || createKey()
  });
}
function createPath(_ref) {
  let {
    pathname = "/",
    search = "",
    hash = ""
  } = _ref;
  return search && search !== "?" && (pathname += search.charAt(0) === "?" ? search : "?" + search), hash && hash !== "#" && (pathname += hash.charAt(0) === "#" ? hash : "#" + hash), pathname;
}
function parsePath(path) {
  let parsedPath = {};
  if (path) {
    let hashIndex = path.indexOf("#");
    hashIndex >= 0 && (parsedPath.hash = path.substr(hashIndex), path = path.substr(0, hashIndex));
    let searchIndex = path.indexOf("?");
    searchIndex >= 0 && (parsedPath.search = path.substr(searchIndex), path = path.substr(0, searchIndex)), path && (parsedPath.pathname = path);
  }
  return parsedPath;
}
function getUrlBasedHistory(getLocation, createHref, validateLocation, options) {
  options === void 0 && (options = {});
  let {
    window: window2 = document.defaultView,
    v5Compat = !1
  } = options, globalHistory = window2.history, action = Action.Pop, listener = null, index = getIndex();
  index == null && (index = 0, globalHistory.replaceState(_extends({}, globalHistory.state, {
    idx: index
  }), ""));
  function getIndex() {
    return (globalHistory.state || {
      idx: null
    }).idx;
  }
  function handlePop() {
    action = Action.Pop;
    let nextIndex = getIndex(), delta = nextIndex == null ? null : nextIndex - index;
    index = nextIndex, listener && listener({
      action,
      location: history.location,
      delta
    });
  }
  function push(to, state) {
    action = Action.Push;
    let location2 = createLocation(history.location, to, state);
    validateLocation && validateLocation(location2, to), index = getIndex() + 1;
    let historyState = getHistoryState(location2, index), url = history.createHref(location2);
    try {
      globalHistory.pushState(historyState, "", url);
    } catch (error) {
      if (error instanceof DOMException && error.name === "DataCloneError")
        throw error;
      window2.location.assign(url);
    }
    v5Compat && listener && listener({
      action,
      location: history.location,
      delta: 1
    });
  }
  function replace(to, state) {
    action = Action.Replace;
    let location2 = createLocation(history.location, to, state);
    validateLocation && validateLocation(location2, to), index = getIndex();
    let historyState = getHistoryState(location2, index), url = history.createHref(location2);
    globalHistory.replaceState(historyState, "", url), v5Compat && listener && listener({
      action,
      location: history.location,
      delta: 0
    });
  }
  function createURL(to) {
    let base = window2.location.origin !== "null" ? window2.location.origin : window2.location.href, href = typeof to == "string" ? to : createPath(to);
    return invariant(base, "No window.location.(origin|href) available to create URL for href: " + href), new URL(href, base);
  }
  let history = {
    get action() {
      return action;
    },
    get location() {
      return getLocation(window2, globalHistory);
    },
    listen(fn) {
      if (listener)
        throw new Error("A history only accepts one active listener");
      return window2.addEventListener(PopStateEventType, handlePop), listener = fn, () => {
        window2.removeEventListener(PopStateEventType, handlePop), listener = null;
      };
    },
    createHref(to) {
      return createHref(window2, to);
    },
    createURL,
    encodeLocation(to) {
      let url = createURL(to);
      return {
        pathname: url.pathname,
        search: url.search,
        hash: url.hash
      };
    },
    push,
    replace,
    go(n) {
      return globalHistory.go(n);
    }
  };
  return history;
}
function isIndexRoute(route) {
  return route.index === !0;
}
function convertRoutesToDataRoutes(routes2, mapRouteProperties2, parentPath, manifest) {
  return parentPath === void 0 && (parentPath = []), manifest === void 0 && (manifest = {}), routes2.map((route, index) => {
    let treePath = [...parentPath, index], id = typeof route.id == "string" ? route.id : treePath.join("-");
    if (invariant(route.index !== !0 || !route.children, "Cannot specify children on an index route"), invariant(!manifest[id], 'Found a route id collision on id "' + id + `".  Route id's must be globally unique within Data Router usages`), isIndexRoute(route)) {
      let indexRoute = _extends({}, route, mapRouteProperties2(route), {
        id
      });
      return manifest[id] = indexRoute, indexRoute;
    } else {
      let pathOrLayoutRoute = _extends({}, route, mapRouteProperties2(route), {
        id,
        children: void 0
      });
      return manifest[id] = pathOrLayoutRoute, route.children && (pathOrLayoutRoute.children = convertRoutesToDataRoutes(route.children, mapRouteProperties2, treePath, manifest)), pathOrLayoutRoute;
    }
  });
}
function matchRoutes(routes2, locationArg, basename) {
  basename === void 0 && (basename = "/");
  let location2 = typeof locationArg == "string" ? parsePath(locationArg) : locationArg, pathname = stripBasename(location2.pathname || "/", basename);
  if (pathname == null)
    return null;
  let branches = flattenRoutes(routes2);
  rankRouteBranches(branches);
  let matches = null;
  for (let i = 0; matches == null && i < branches.length; ++i)
    matches = matchRouteBranch(
      branches[i],
      // Incoming pathnames are generally encoded from either window.location
      // or from router.navigate, but we want to match against the unencoded
      // paths in the route definitions.  Memory router locations won't be
      // encoded here but there also shouldn't be anything to decode so this
      // should be a safe operation.  This avoids needing matchRoutes to be
      // history-aware.
      safelyDecodeURI(pathname)
    );
  return matches;
}
function flattenRoutes(routes2, branches, parentsMeta, parentPath) {
  branches === void 0 && (branches = []), parentsMeta === void 0 && (parentsMeta = []), parentPath === void 0 && (parentPath = "");
  let flattenRoute = (route, index, relativePath) => {
    let meta2 = {
      relativePath: relativePath === void 0 ? route.path || "" : relativePath,
      caseSensitive: route.caseSensitive === !0,
      childrenIndex: index,
      route
    };
    meta2.relativePath.startsWith("/") && (invariant(meta2.relativePath.startsWith(parentPath), 'Absolute route path "' + meta2.relativePath + '" nested under path ' + ('"' + parentPath + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), meta2.relativePath = meta2.relativePath.slice(parentPath.length));
    let path = joinPaths([parentPath, meta2.relativePath]), routesMeta = parentsMeta.concat(meta2);
    route.children && route.children.length > 0 && (invariant(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      route.index !== !0,
      "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + path + '".')
    ), flattenRoutes(route.children, branches, routesMeta, path)), !(route.path == null && !route.index) && branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta
    });
  };
  return routes2.forEach((route, index) => {
    var _route$path;
    if (route.path === "" || !((_route$path = route.path) != null && _route$path.includes("?")))
      flattenRoute(route, index);
    else
      for (let exploded of explodeOptionalSegments(route.path))
        flattenRoute(route, index, exploded);
  }), branches;
}
function explodeOptionalSegments(path) {
  let segments = path.split("/");
  if (segments.length === 0)
    return [];
  let [first, ...rest] = segments, isOptional = first.endsWith("?"), required = first.replace(/\?$/, "");
  if (rest.length === 0)
    return isOptional ? [required, ""] : [required];
  let restExploded = explodeOptionalSegments(rest.join("/")), result = [];
  return result.push(...restExploded.map((subpath) => subpath === "" ? required : [required, subpath].join("/"))), isOptional && result.push(...restExploded), result.map((exploded) => path.startsWith("/") && exploded === "" ? "/" : exploded);
}
function rankRouteBranches(branches) {
  branches.sort((a, b) => a.score !== b.score ? b.score - a.score : compareIndexes(a.routesMeta.map((meta2) => meta2.childrenIndex), b.routesMeta.map((meta2) => meta2.childrenIndex)));
}
function computeScore(path, index) {
  let segments = path.split("/"), initialScore = segments.length;
  return segments.some(isSplat) && (initialScore += splatPenalty), index && (initialScore += indexRouteValue), segments.filter((s) => !isSplat(s)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
}
function compareIndexes(a, b) {
  return a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]) ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    a[a.length - 1] - b[b.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function matchRouteBranch(branch, pathname) {
  let {
    routesMeta
  } = branch, matchedParams = {}, matchedPathname = "/", matches = [];
  for (let i = 0; i < routesMeta.length; ++i) {
    let meta2 = routesMeta[i], end = i === routesMeta.length - 1, remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/", match = matchPath({
      path: meta2.relativePath,
      caseSensitive: meta2.caseSensitive,
      end
    }, remainingPathname);
    if (!match)
      return null;
    Object.assign(matchedParams, match.params);
    let route = meta2.route;
    matches.push({
      // TODO: Can this as be avoided?
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(joinPaths([matchedPathname, match.pathnameBase])),
      route
    }), match.pathnameBase !== "/" && (matchedPathname = joinPaths([matchedPathname, match.pathnameBase]));
  }
  return matches;
}
function generatePath(originalPath, params) {
  params === void 0 && (params = {});
  let path = originalPath;
  path.endsWith("*") && path !== "*" && !path.endsWith("/*") && (warning(!1, 'Route path "' + path + '" will be treated as if it were ' + ('"' + path.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + path.replace(/\*$/, "/*") + '".')), path = path.replace(/\*$/, "/*"));
  let prefix = path.startsWith("/") ? "/" : "", stringify = (p) => p == null ? "" : typeof p == "string" ? p : String(p), segments = path.split(/\/+/).map((segment, index, array) => {
    if (index === array.length - 1 && segment === "*")
      return stringify(params["*"]);
    let keyMatch = segment.match(/^:(\w+)(\??)$/);
    if (keyMatch) {
      let [, key, optional] = keyMatch, param = params[key];
      return invariant(optional === "?" || param != null, 'Missing ":' + key + '" param'), stringify(param);
    }
    return segment.replace(/\?$/g, "");
  }).filter((segment) => !!segment);
  return prefix + segments.join("/");
}
function matchPath(pattern, pathname) {
  typeof pattern == "string" && (pattern = {
    path: pattern,
    caseSensitive: !1,
    end: !0
  });
  let [matcher, paramNames] = compilePath(pattern.path, pattern.caseSensitive, pattern.end), match = pathname.match(matcher);
  if (!match)
    return null;
  let matchedPathname = match[0], pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1"), captureGroups = match.slice(1);
  return {
    params: paramNames.reduce((memo, paramName, index) => {
      if (paramName === "*") {
        let splatValue = captureGroups[index] || "";
        pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
      }
      return memo[paramName] = safelyDecodeURIComponent(captureGroups[index] || "", paramName), memo;
    }, {}),
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
function compilePath(path, caseSensitive, end) {
  caseSensitive === void 0 && (caseSensitive = !1), end === void 0 && (end = !0), warning(path === "*" || !path.endsWith("*") || path.endsWith("/*"), 'Route path "' + path + '" will be treated as if it were ' + ('"' + path.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + path.replace(/\*$/, "/*") + '".'));
  let paramNames = [], regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^$?{}|()[\]]/g, "\\$&").replace(/\/:(\w+)/g, (_, paramName) => (paramNames.push(paramName), "/([^\\/]+)"));
  return path.endsWith("*") ? (paramNames.push("*"), regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : end ? regexpSource += "\\/*$" : path !== "" && path !== "/" && (regexpSource += "(?:(?=\\/|$))"), [new RegExp(regexpSource, caseSensitive ? void 0 : "i"), paramNames];
}
function safelyDecodeURI(value) {
  try {
    return decodeURI(value);
  } catch (error) {
    return warning(!1, 'The URL path "' + value + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + error + ").")), value;
  }
}
function safelyDecodeURIComponent(value, paramName) {
  try {
    return decodeURIComponent(value);
  } catch (error) {
    return warning(!1, 'The value for the URL param "' + paramName + '" will not be decoded because' + (' the string "' + value + '" is a malformed URL segment. This is probably') + (" due to a bad percent encoding (" + error + ").")), value;
  }
}
function stripBasename(pathname, basename) {
  if (basename === "/")
    return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase()))
    return null;
  let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length, nextChar = pathname.charAt(startIndex);
  return nextChar && nextChar !== "/" ? null : pathname.slice(startIndex) || "/";
}
function resolvePath(to, fromPathname) {
  fromPathname === void 0 && (fromPathname = "/");
  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to == "string" ? parsePath(to) : to;
  return {
    pathname: toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}
function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  return relativePath.split("/").forEach((segment) => {
    segment === ".." ? segments.length > 1 && segments.pop() : segment !== "." && segments.push(segment);
  }), segments.length > 1 ? segments.join("/") : "/";
}
function getInvalidPathError(char, field, dest, path) {
  return "Cannot include a '" + char + "' character in a manually specified " + ("`to." + field + "` field [" + JSON.stringify(path) + "].  Please separate it out to the ") + ("`to." + dest + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function getPathContributingMatches(matches) {
  return matches.filter((match, index) => index === 0 || match.route.path && match.route.path.length > 0);
}
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative) {
  isPathRelative === void 0 && (isPathRelative = !1);
  let to;
  typeof toArg == "string" ? to = parsePath(toArg) : (to = _extends({}, toArg), invariant(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to)), invariant(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to)), invariant(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to)));
  let isEmptyPath = toArg === "" || to.pathname === "", toPathname = isEmptyPath ? "/" : to.pathname, from;
  if (isPathRelative || toPathname == null)
    from = locationPathname;
  else {
    let routePathnameIndex = routePathnames.length - 1;
    if (toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");
      for (; toSegments[0] === ".."; )
        toSegments.shift(), routePathnameIndex -= 1;
      to.pathname = toSegments.join("/");
    }
    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path = resolvePath(to, from), hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/"), hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
  return !path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash) && (path.pathname += "/"), path;
}
function getToPathname(to) {
  return to === "" || to.pathname === "" ? "/" : typeof to == "string" ? parsePath(to).pathname : to.pathname;
}
function isTrackedPromise(value) {
  return value instanceof Promise && value._tracked === !0;
}
function unwrapTrackedPromise(value) {
  if (!isTrackedPromise(value))
    return value;
  if (value._error)
    throw value._error;
  return value._data;
}
function isRouteErrorResponse(error) {
  return error != null && typeof error.status == "number" && typeof error.statusText == "string" && typeof error.internal == "boolean" && "data" in error;
}
function createRouter(init) {
  let routerWindow = init.window ? init.window : typeof window < "u" ? window : void 0, isBrowser2 = typeof routerWindow < "u" && typeof routerWindow.document < "u" && typeof routerWindow.document.createElement < "u", isServer = !isBrowser2;
  invariant(init.routes.length > 0, "You must provide a non-empty routes array to createRouter");
  let mapRouteProperties2;
  if (init.mapRouteProperties)
    mapRouteProperties2 = init.mapRouteProperties;
  else if (init.detectErrorBoundary) {
    let detectErrorBoundary = init.detectErrorBoundary;
    mapRouteProperties2 = (route) => ({
      hasErrorBoundary: detectErrorBoundary(route)
    });
  } else
    mapRouteProperties2 = defaultMapRouteProperties;
  let manifest = {}, dataRoutes = convertRoutesToDataRoutes(init.routes, mapRouteProperties2, void 0, manifest), inFlightDataRoutes, basename = init.basename || "/", future2 = _extends({
    v7_normalizeFormMethod: !1,
    v7_prependBasename: !1
  }, init.future), unlistenHistory = null, subscribers = /* @__PURE__ */ new Set(), savedScrollPositions2 = null, getScrollRestorationKey = null, getScrollPosition = null, initialScrollRestored = init.hydrationData != null, initialMatches = matchRoutes(dataRoutes, init.history.location, basename), initialErrors = null;
  if (initialMatches == null) {
    let error = getInternalRouterError(404, {
      pathname: init.history.location.pathname
    }), {
      matches,
      route
    } = getShortCircuitMatches(dataRoutes);
    initialMatches = matches, initialErrors = {
      [route.id]: error
    };
  }
  let initialized = (
    // All initialMatches need to be loaded before we're ready.  If we have lazy
    // functions around still then we'll need to run them in initialize()
    !initialMatches.some((m) => m.route.lazy) && // And we have to either have no loaders or have been provided hydrationData
    (!initialMatches.some((m) => m.route.loader) || init.hydrationData != null)
  ), router, state = {
    historyAction: init.history.action,
    location: init.history.location,
    matches: initialMatches,
    initialized,
    navigation: IDLE_NAVIGATION,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: init.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: init.hydrationData && init.hydrationData.loaderData || {},
    actionData: init.hydrationData && init.hydrationData.actionData || null,
    errors: init.hydrationData && init.hydrationData.errors || initialErrors,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, pendingAction = Action.Pop, pendingPreventScrollReset = !1, pendingNavigationController, isUninterruptedRevalidation = !1, isRevalidationRequired = !1, cancelledDeferredRoutes = [], cancelledFetcherLoads = [], fetchControllers = /* @__PURE__ */ new Map(), incrementingLoadId = 0, pendingNavigationLoadId = -1, fetchReloadIds = /* @__PURE__ */ new Map(), fetchRedirectIds = /* @__PURE__ */ new Set(), fetchLoadMatches = /* @__PURE__ */ new Map(), activeDeferreds = /* @__PURE__ */ new Map(), blockerFunctions = /* @__PURE__ */ new Map(), ignoreNextHistoryUpdate = !1;
  function initialize() {
    return unlistenHistory = init.history.listen((_ref) => {
      let {
        action: historyAction,
        location: location2,
        delta
      } = _ref;
      if (ignoreNextHistoryUpdate) {
        ignoreNextHistoryUpdate = !1;
        return;
      }
      warning(blockerFunctions.size === 0 || delta != null, "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.");
      let blockerKey = shouldBlockNavigation({
        currentLocation: state.location,
        nextLocation: location2,
        historyAction
      });
      if (blockerKey && delta != null) {
        ignoreNextHistoryUpdate = !0, init.history.go(delta * -1), updateBlocker(blockerKey, {
          state: "blocked",
          location: location2,
          proceed() {
            updateBlocker(blockerKey, {
              state: "proceeding",
              proceed: void 0,
              reset: void 0,
              location: location2
            }), init.history.go(delta);
          },
          reset() {
            let blockers = new Map(state.blockers);
            blockers.set(blockerKey, IDLE_BLOCKER), updateState({
              blockers
            });
          }
        });
        return;
      }
      return startNavigation(historyAction, location2);
    }), state.initialized || startNavigation(Action.Pop, state.location), router;
  }
  function dispose() {
    unlistenHistory && unlistenHistory(), subscribers.clear(), pendingNavigationController && pendingNavigationController.abort(), state.fetchers.forEach((_, key) => deleteFetcher(key)), state.blockers.forEach((_, key) => deleteBlocker(key));
  }
  function subscribe(fn) {
    return subscribers.add(fn), () => subscribers.delete(fn);
  }
  function updateState(newState) {
    state = _extends({}, state, newState), subscribers.forEach((subscriber) => subscriber(state));
  }
  function completeNavigation(location2, newState) {
    var _location$state, _location$state2;
    let isActionReload = state.actionData != null && state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && state.navigation.state === "loading" && ((_location$state = location2.state) == null ? void 0 : _location$state._isRedirect) !== !0, actionData;
    newState.actionData ? Object.keys(newState.actionData).length > 0 ? actionData = newState.actionData : actionData = null : isActionReload ? actionData = state.actionData : actionData = null;
    let loaderData = newState.loaderData ? mergeLoaderData(state.loaderData, newState.loaderData, newState.matches || [], newState.errors) : state.loaderData, blockers = state.blockers;
    blockers.size > 0 && (blockers = new Map(blockers), blockers.forEach((_, k) => blockers.set(k, IDLE_BLOCKER)));
    let preventScrollReset = pendingPreventScrollReset === !0 || state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && ((_location$state2 = location2.state) == null ? void 0 : _location$state2._isRedirect) !== !0;
    inFlightDataRoutes && (dataRoutes = inFlightDataRoutes, inFlightDataRoutes = void 0), isUninterruptedRevalidation || pendingAction === Action.Pop || (pendingAction === Action.Push ? init.history.push(location2, location2.state) : pendingAction === Action.Replace && init.history.replace(location2, location2.state)), updateState(_extends({}, newState, {
      actionData,
      loaderData,
      historyAction: pendingAction,
      location: location2,
      initialized: !0,
      navigation: IDLE_NAVIGATION,
      revalidation: "idle",
      restoreScrollPosition: getSavedScrollPosition(location2, newState.matches || state.matches),
      preventScrollReset,
      blockers
    })), pendingAction = Action.Pop, pendingPreventScrollReset = !1, isUninterruptedRevalidation = !1, isRevalidationRequired = !1, cancelledDeferredRoutes = [], cancelledFetcherLoads = [];
  }
  async function navigate(to, opts) {
    if (typeof to == "number") {
      init.history.go(to);
      return;
    }
    let normalizedPath = normalizeTo(state.location, state.matches, basename, future2.v7_prependBasename, to, opts == null ? void 0 : opts.fromRouteId, opts == null ? void 0 : opts.relative), {
      path,
      submission,
      error
    } = normalizeNavigateOptions(future2.v7_normalizeFormMethod, !1, normalizedPath, opts), currentLocation = state.location, nextLocation = createLocation(state.location, path, opts && opts.state);
    nextLocation = _extends({}, nextLocation, init.history.encodeLocation(nextLocation));
    let userReplace = opts && opts.replace != null ? opts.replace : void 0, historyAction = Action.Push;
    userReplace === !0 ? historyAction = Action.Replace : userReplace === !1 || submission != null && isMutationMethod(submission.formMethod) && submission.formAction === state.location.pathname + state.location.search && (historyAction = Action.Replace);
    let preventScrollReset = opts && "preventScrollReset" in opts ? opts.preventScrollReset === !0 : void 0, blockerKey = shouldBlockNavigation({
      currentLocation,
      nextLocation,
      historyAction
    });
    if (blockerKey) {
      updateBlocker(blockerKey, {
        state: "blocked",
        location: nextLocation,
        proceed() {
          updateBlocker(blockerKey, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: nextLocation
          }), navigate(to, opts);
        },
        reset() {
          let blockers = new Map(state.blockers);
          blockers.set(blockerKey, IDLE_BLOCKER), updateState({
            blockers
          });
        }
      });
      return;
    }
    return await startNavigation(historyAction, nextLocation, {
      submission,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: error,
      preventScrollReset,
      replace: opts && opts.replace
    });
  }
  function revalidate() {
    if (interruptActiveLoads(), updateState({
      revalidation: "loading"
    }), state.navigation.state !== "submitting") {
      if (state.navigation.state === "idle") {
        startNavigation(state.historyAction, state.location, {
          startUninterruptedRevalidation: !0
        });
        return;
      }
      startNavigation(pendingAction || state.historyAction, state.navigation.location, {
        overrideNavigation: state.navigation
      });
    }
  }
  async function startNavigation(historyAction, location2, opts) {
    pendingNavigationController && pendingNavigationController.abort(), pendingNavigationController = null, pendingAction = historyAction, isUninterruptedRevalidation = (opts && opts.startUninterruptedRevalidation) === !0, saveScrollPosition(state.location, state.matches), pendingPreventScrollReset = (opts && opts.preventScrollReset) === !0;
    let routesToUse = inFlightDataRoutes || dataRoutes, loadingNavigation = opts && opts.overrideNavigation, matches = matchRoutes(routesToUse, location2, basename);
    if (!matches) {
      let error = getInternalRouterError(404, {
        pathname: location2.pathname
      }), {
        matches: notFoundMatches,
        route
      } = getShortCircuitMatches(routesToUse);
      cancelActiveDeferreds(), completeNavigation(location2, {
        matches: notFoundMatches,
        loaderData: {},
        errors: {
          [route.id]: error
        }
      });
      return;
    }
    if (state.initialized && !isRevalidationRequired && isHashChangeOnly(state.location, location2) && !(opts && opts.submission && isMutationMethod(opts.submission.formMethod))) {
      completeNavigation(location2, {
        matches
      });
      return;
    }
    pendingNavigationController = new AbortController();
    let request = createClientSideRequest(init.history, location2, pendingNavigationController.signal, opts && opts.submission), pendingActionData, pendingError;
    if (opts && opts.pendingError)
      pendingError = {
        [findNearestBoundary(matches).route.id]: opts.pendingError
      };
    else if (opts && opts.submission && isMutationMethod(opts.submission.formMethod)) {
      let actionOutput = await handleAction(request, location2, opts.submission, matches, {
        replace: opts.replace
      });
      if (actionOutput.shortCircuited)
        return;
      pendingActionData = actionOutput.pendingActionData, pendingError = actionOutput.pendingActionError, loadingNavigation = getLoadingNavigation(location2, opts.submission), request = new Request(request.url, {
        signal: request.signal
      });
    }
    let {
      shortCircuited,
      loaderData,
      errors
    } = await handleLoaders(request, location2, matches, loadingNavigation, opts && opts.submission, opts && opts.fetcherSubmission, opts && opts.replace, pendingActionData, pendingError);
    shortCircuited || (pendingNavigationController = null, completeNavigation(location2, _extends({
      matches
    }, pendingActionData ? {
      actionData: pendingActionData
    } : {}, {
      loaderData,
      errors
    })));
  }
  async function handleAction(request, location2, submission, matches, opts) {
    opts === void 0 && (opts = {}), interruptActiveLoads();
    let navigation = getSubmittingNavigation(location2, submission);
    updateState({
      navigation
    });
    let result, actionMatch = getTargetMatch(matches, location2);
    if (!actionMatch.route.action && !actionMatch.route.lazy)
      result = {
        type: ResultType.error,
        error: getInternalRouterError(405, {
          method: request.method,
          pathname: location2.pathname,
          routeId: actionMatch.route.id
        })
      };
    else if (result = await callLoaderOrAction("action", request, actionMatch, matches, manifest, mapRouteProperties2, basename), request.signal.aborted)
      return {
        shortCircuited: !0
      };
    if (isRedirectResult(result)) {
      let replace;
      return opts && opts.replace != null ? replace = opts.replace : replace = result.location === state.location.pathname + state.location.search, await startRedirectNavigation(state, result, {
        submission,
        replace
      }), {
        shortCircuited: !0
      };
    }
    if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(matches, actionMatch.route.id);
      return (opts && opts.replace) !== !0 && (pendingAction = Action.Push), {
        // Send back an empty object we can use to clear out any prior actionData
        pendingActionData: {},
        pendingActionError: {
          [boundaryMatch.route.id]: result.error
        }
      };
    }
    if (isDeferredResult(result))
      throw getInternalRouterError(400, {
        type: "defer-action"
      });
    return {
      pendingActionData: {
        [actionMatch.route.id]: result.data
      }
    };
  }
  async function handleLoaders(request, location2, matches, overrideNavigation, submission, fetcherSubmission, replace, pendingActionData, pendingError) {
    let loadingNavigation = overrideNavigation || getLoadingNavigation(location2, submission), activeSubmission = submission || fetcherSubmission || getSubmissionFromNavigation(loadingNavigation), routesToUse = inFlightDataRoutes || dataRoutes, [matchesToLoad, revalidatingFetchers] = getMatchesToLoad(init.history, state, matches, activeSubmission, location2, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, pendingActionData, pendingError);
    if (cancelActiveDeferreds((routeId) => !(matches && matches.some((m) => m.route.id === routeId)) || matchesToLoad && matchesToLoad.some((m) => m.route.id === routeId)), pendingNavigationLoadId = ++incrementingLoadId, matchesToLoad.length === 0 && revalidatingFetchers.length === 0) {
      let updatedFetchers2 = markFetchRedirectsDone();
      return completeNavigation(location2, _extends({
        matches,
        loaderData: {},
        // Commit pending error if we're short circuiting
        errors: pendingError || null
      }, pendingActionData ? {
        actionData: pendingActionData
      } : {}, updatedFetchers2 ? {
        fetchers: new Map(state.fetchers)
      } : {})), {
        shortCircuited: !0
      };
    }
    if (!isUninterruptedRevalidation) {
      revalidatingFetchers.forEach((rf) => {
        let fetcher = state.fetchers.get(rf.key), revalidatingFetcher = getLoadingFetcher(void 0, fetcher ? fetcher.data : void 0);
        state.fetchers.set(rf.key, revalidatingFetcher);
      });
      let actionData = pendingActionData || state.actionData;
      updateState(_extends({
        navigation: loadingNavigation
      }, actionData ? Object.keys(actionData).length === 0 ? {
        actionData: null
      } : {
        actionData
      } : {}, revalidatingFetchers.length > 0 ? {
        fetchers: new Map(state.fetchers)
      } : {}));
    }
    revalidatingFetchers.forEach((rf) => {
      fetchControllers.has(rf.key) && abortFetcher(rf.key), rf.controller && fetchControllers.set(rf.key, rf.controller);
    });
    let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach((f) => abortFetcher(f.key));
    pendingNavigationController && pendingNavigationController.signal.addEventListener("abort", abortPendingFetchRevalidations);
    let {
      results,
      loaderResults,
      fetcherResults
    } = await callLoadersAndMaybeResolveData(state.matches, matches, matchesToLoad, revalidatingFetchers, request);
    if (request.signal.aborted)
      return {
        shortCircuited: !0
      };
    pendingNavigationController && pendingNavigationController.signal.removeEventListener("abort", abortPendingFetchRevalidations), revalidatingFetchers.forEach((rf) => fetchControllers.delete(rf.key));
    let redirect4 = findRedirect(results);
    if (redirect4) {
      if (redirect4.idx >= matchesToLoad.length) {
        let fetcherKey = revalidatingFetchers[redirect4.idx - matchesToLoad.length].key;
        fetchRedirectIds.add(fetcherKey);
      }
      return await startRedirectNavigation(state, redirect4.result, {
        replace
      }), {
        shortCircuited: !0
      };
    }
    let {
      loaderData,
      errors
    } = processLoaderData(state, matches, matchesToLoad, loaderResults, pendingError, revalidatingFetchers, fetcherResults, activeDeferreds);
    activeDeferreds.forEach((deferredData, routeId) => {
      deferredData.subscribe((aborted) => {
        (aborted || deferredData.done) && activeDeferreds.delete(routeId);
      });
    });
    let updatedFetchers = markFetchRedirectsDone(), didAbortFetchLoads = abortStaleFetchLoads(pendingNavigationLoadId), shouldUpdateFetchers = updatedFetchers || didAbortFetchLoads || revalidatingFetchers.length > 0;
    return _extends({
      loaderData,
      errors
    }, shouldUpdateFetchers ? {
      fetchers: new Map(state.fetchers)
    } : {});
  }
  function getFetcher(key) {
    return state.fetchers.get(key) || IDLE_FETCHER;
  }
  function fetch2(key, routeId, href, opts) {
    if (isServer)
      throw new Error("router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback.");
    fetchControllers.has(key) && abortFetcher(key);
    let routesToUse = inFlightDataRoutes || dataRoutes, normalizedPath = normalizeTo(state.location, state.matches, basename, future2.v7_prependBasename, href, routeId, opts == null ? void 0 : opts.relative), matches = matchRoutes(routesToUse, normalizedPath, basename);
    if (!matches) {
      setFetcherError(key, routeId, getInternalRouterError(404, {
        pathname: normalizedPath
      }));
      return;
    }
    let {
      path,
      submission,
      error
    } = normalizeNavigateOptions(future2.v7_normalizeFormMethod, !0, normalizedPath, opts);
    if (error) {
      setFetcherError(key, routeId, error);
      return;
    }
    let match = getTargetMatch(matches, path);
    if (pendingPreventScrollReset = (opts && opts.preventScrollReset) === !0, submission && isMutationMethod(submission.formMethod)) {
      handleFetcherAction(key, routeId, path, match, matches, submission);
      return;
    }
    fetchLoadMatches.set(key, {
      routeId,
      path
    }), handleFetcherLoader(key, routeId, path, match, matches, submission);
  }
  async function handleFetcherAction(key, routeId, path, match, requestMatches, submission) {
    if (interruptActiveLoads(), fetchLoadMatches.delete(key), !match.route.action && !match.route.lazy) {
      let error = getInternalRouterError(405, {
        method: submission.formMethod,
        pathname: path,
        routeId
      });
      setFetcherError(key, routeId, error);
      return;
    }
    let existingFetcher = state.fetchers.get(key), fetcher = getSubmittingFetcher(submission, existingFetcher);
    state.fetchers.set(key, fetcher), updateState({
      fetchers: new Map(state.fetchers)
    });
    let abortController = new AbortController(), fetchRequest = createClientSideRequest(init.history, path, abortController.signal, submission);
    fetchControllers.set(key, abortController);
    let originatingLoadId = incrementingLoadId, actionResult = await callLoaderOrAction("action", fetchRequest, match, requestMatches, manifest, mapRouteProperties2, basename);
    if (fetchRequest.signal.aborted) {
      fetchControllers.get(key) === abortController && fetchControllers.delete(key);
      return;
    }
    if (isRedirectResult(actionResult))
      if (fetchControllers.delete(key), pendingNavigationLoadId > originatingLoadId) {
        let doneFetcher = getDoneFetcher(void 0);
        state.fetchers.set(key, doneFetcher), updateState({
          fetchers: new Map(state.fetchers)
        });
        return;
      } else {
        fetchRedirectIds.add(key);
        let loadingFetcher = getLoadingFetcher(submission);
        return state.fetchers.set(key, loadingFetcher), updateState({
          fetchers: new Map(state.fetchers)
        }), startRedirectNavigation(state, actionResult, {
          submission,
          isFetchActionRedirect: !0
        });
      }
    if (isErrorResult(actionResult)) {
      setFetcherError(key, routeId, actionResult.error);
      return;
    }
    if (isDeferredResult(actionResult))
      throw getInternalRouterError(400, {
        type: "defer-action"
      });
    let nextLocation = state.navigation.location || state.location, revalidationRequest = createClientSideRequest(init.history, nextLocation, abortController.signal), routesToUse = inFlightDataRoutes || dataRoutes, matches = state.navigation.state !== "idle" ? matchRoutes(routesToUse, state.navigation.location, basename) : state.matches;
    invariant(matches, "Didn't find any matches after fetcher action");
    let loadId = ++incrementingLoadId;
    fetchReloadIds.set(key, loadId);
    let loadFetcher = getLoadingFetcher(submission, actionResult.data);
    state.fetchers.set(key, loadFetcher);
    let [matchesToLoad, revalidatingFetchers] = getMatchesToLoad(
      init.history,
      state,
      matches,
      submission,
      nextLocation,
      isRevalidationRequired,
      cancelledDeferredRoutes,
      cancelledFetcherLoads,
      fetchLoadMatches,
      fetchRedirectIds,
      routesToUse,
      basename,
      {
        [match.route.id]: actionResult.data
      },
      void 0
      // No need to send through errors since we short circuit above
    );
    revalidatingFetchers.filter((rf) => rf.key !== key).forEach((rf) => {
      let staleKey = rf.key, existingFetcher2 = state.fetchers.get(staleKey), revalidatingFetcher = getLoadingFetcher(void 0, existingFetcher2 ? existingFetcher2.data : void 0);
      state.fetchers.set(staleKey, revalidatingFetcher), fetchControllers.has(staleKey) && abortFetcher(staleKey), rf.controller && fetchControllers.set(staleKey, rf.controller);
    }), updateState({
      fetchers: new Map(state.fetchers)
    });
    let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach((rf) => abortFetcher(rf.key));
    abortController.signal.addEventListener("abort", abortPendingFetchRevalidations);
    let {
      results,
      loaderResults,
      fetcherResults
    } = await callLoadersAndMaybeResolveData(state.matches, matches, matchesToLoad, revalidatingFetchers, revalidationRequest);
    if (abortController.signal.aborted)
      return;
    abortController.signal.removeEventListener("abort", abortPendingFetchRevalidations), fetchReloadIds.delete(key), fetchControllers.delete(key), revalidatingFetchers.forEach((r) => fetchControllers.delete(r.key));
    let redirect4 = findRedirect(results);
    if (redirect4) {
      if (redirect4.idx >= matchesToLoad.length) {
        let fetcherKey = revalidatingFetchers[redirect4.idx - matchesToLoad.length].key;
        fetchRedirectIds.add(fetcherKey);
      }
      return startRedirectNavigation(state, redirect4.result);
    }
    let {
      loaderData,
      errors
    } = processLoaderData(state, state.matches, matchesToLoad, loaderResults, void 0, revalidatingFetchers, fetcherResults, activeDeferreds);
    if (state.fetchers.has(key)) {
      let doneFetcher = getDoneFetcher(actionResult.data);
      state.fetchers.set(key, doneFetcher);
    }
    let didAbortFetchLoads = abortStaleFetchLoads(loadId);
    state.navigation.state === "loading" && loadId > pendingNavigationLoadId ? (invariant(pendingAction, "Expected pending action"), pendingNavigationController && pendingNavigationController.abort(), completeNavigation(state.navigation.location, {
      matches,
      loaderData,
      errors,
      fetchers: new Map(state.fetchers)
    })) : (updateState(_extends({
      errors,
      loaderData: mergeLoaderData(state.loaderData, loaderData, matches, errors)
    }, didAbortFetchLoads || revalidatingFetchers.length > 0 ? {
      fetchers: new Map(state.fetchers)
    } : {})), isRevalidationRequired = !1);
  }
  async function handleFetcherLoader(key, routeId, path, match, matches, submission) {
    let existingFetcher = state.fetchers.get(key), loadingFetcher = getLoadingFetcher(submission, existingFetcher ? existingFetcher.data : void 0);
    state.fetchers.set(key, loadingFetcher), updateState({
      fetchers: new Map(state.fetchers)
    });
    let abortController = new AbortController(), fetchRequest = createClientSideRequest(init.history, path, abortController.signal);
    fetchControllers.set(key, abortController);
    let originatingLoadId = incrementingLoadId, result = await callLoaderOrAction("loader", fetchRequest, match, matches, manifest, mapRouteProperties2, basename);
    if (isDeferredResult(result) && (result = await resolveDeferredData(result, fetchRequest.signal, !0) || result), fetchControllers.get(key) === abortController && fetchControllers.delete(key), fetchRequest.signal.aborted)
      return;
    if (isRedirectResult(result))
      if (pendingNavigationLoadId > originatingLoadId) {
        let doneFetcher2 = getDoneFetcher(void 0);
        state.fetchers.set(key, doneFetcher2), updateState({
          fetchers: new Map(state.fetchers)
        });
        return;
      } else {
        fetchRedirectIds.add(key), await startRedirectNavigation(state, result);
        return;
      }
    if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(state.matches, routeId);
      state.fetchers.delete(key), updateState({
        fetchers: new Map(state.fetchers),
        errors: {
          [boundaryMatch.route.id]: result.error
        }
      });
      return;
    }
    invariant(!isDeferredResult(result), "Unhandled fetcher deferred data");
    let doneFetcher = getDoneFetcher(result.data);
    state.fetchers.set(key, doneFetcher), updateState({
      fetchers: new Map(state.fetchers)
    });
  }
  async function startRedirectNavigation(state2, redirect4, _temp) {
    let {
      submission,
      replace,
      isFetchActionRedirect
    } = _temp === void 0 ? {} : _temp;
    redirect4.revalidate && (isRevalidationRequired = !0);
    let redirectLocation = createLocation(
      state2.location,
      redirect4.location,
      // TODO: This can be removed once we get rid of useTransition in Remix v2
      _extends({
        _isRedirect: !0
      }, isFetchActionRedirect ? {
        _isFetchActionRedirect: !0
      } : {})
    );
    if (invariant(redirectLocation, "Expected a location on the redirect navigation"), ABSOLUTE_URL_REGEX.test(redirect4.location) && isBrowser2) {
      let url = init.history.createURL(redirect4.location), isDifferentBasename = stripBasename(url.pathname, basename) == null;
      if (routerWindow.location.origin !== url.origin || isDifferentBasename) {
        replace ? routerWindow.location.replace(redirect4.location) : routerWindow.location.assign(redirect4.location);
        return;
      }
    }
    pendingNavigationController = null;
    let redirectHistoryAction = replace === !0 ? Action.Replace : Action.Push, activeSubmission = submission || getSubmissionFromNavigation(state2.navigation);
    if (redirectPreserveMethodStatusCodes.has(redirect4.status) && activeSubmission && isMutationMethod(activeSubmission.formMethod))
      await startNavigation(redirectHistoryAction, redirectLocation, {
        submission: _extends({}, activeSubmission, {
          formAction: redirect4.location
        }),
        // Preserve this flag across redirects
        preventScrollReset: pendingPreventScrollReset
      });
    else if (isFetchActionRedirect)
      await startNavigation(redirectHistoryAction, redirectLocation, {
        overrideNavigation: getLoadingNavigation(redirectLocation),
        fetcherSubmission: activeSubmission,
        // Preserve this flag across redirects
        preventScrollReset: pendingPreventScrollReset
      });
    else {
      let overrideNavigation = getLoadingNavigation(redirectLocation, activeSubmission);
      await startNavigation(redirectHistoryAction, redirectLocation, {
        overrideNavigation,
        // Preserve this flag across redirects
        preventScrollReset: pendingPreventScrollReset
      });
    }
  }
  async function callLoadersAndMaybeResolveData(currentMatches, matches, matchesToLoad, fetchersToLoad, request) {
    let results = await Promise.all([...matchesToLoad.map((match) => callLoaderOrAction("loader", request, match, matches, manifest, mapRouteProperties2, basename)), ...fetchersToLoad.map((f) => f.matches && f.match && f.controller ? callLoaderOrAction("loader", createClientSideRequest(init.history, f.path, f.controller.signal), f.match, f.matches, manifest, mapRouteProperties2, basename) : {
      type: ResultType.error,
      error: getInternalRouterError(404, {
        pathname: f.path
      })
    })]), loaderResults = results.slice(0, matchesToLoad.length), fetcherResults = results.slice(matchesToLoad.length);
    return await Promise.all([resolveDeferredResults(currentMatches, matchesToLoad, loaderResults, loaderResults.map(() => request.signal), !1, state.loaderData), resolveDeferredResults(currentMatches, fetchersToLoad.map((f) => f.match), fetcherResults, fetchersToLoad.map((f) => f.controller ? f.controller.signal : null), !0)]), {
      results,
      loaderResults,
      fetcherResults
    };
  }
  function interruptActiveLoads() {
    isRevalidationRequired = !0, cancelledDeferredRoutes.push(...cancelActiveDeferreds()), fetchLoadMatches.forEach((_, key) => {
      fetchControllers.has(key) && (cancelledFetcherLoads.push(key), abortFetcher(key));
    });
  }
  function setFetcherError(key, routeId, error) {
    let boundaryMatch = findNearestBoundary(state.matches, routeId);
    deleteFetcher(key), updateState({
      errors: {
        [boundaryMatch.route.id]: error
      },
      fetchers: new Map(state.fetchers)
    });
  }
  function deleteFetcher(key) {
    let fetcher = state.fetchers.get(key);
    fetchControllers.has(key) && !(fetcher && fetcher.state === "loading" && fetchReloadIds.has(key)) && abortFetcher(key), fetchLoadMatches.delete(key), fetchReloadIds.delete(key), fetchRedirectIds.delete(key), state.fetchers.delete(key);
  }
  function abortFetcher(key) {
    let controller = fetchControllers.get(key);
    invariant(controller, "Expected fetch controller: " + key), controller.abort(), fetchControllers.delete(key);
  }
  function markFetchersDone(keys) {
    for (let key of keys) {
      let fetcher = getFetcher(key), doneFetcher = getDoneFetcher(fetcher.data);
      state.fetchers.set(key, doneFetcher);
    }
  }
  function markFetchRedirectsDone() {
    let doneKeys = [], updatedFetchers = !1;
    for (let key of fetchRedirectIds) {
      let fetcher = state.fetchers.get(key);
      invariant(fetcher, "Expected fetcher: " + key), fetcher.state === "loading" && (fetchRedirectIds.delete(key), doneKeys.push(key), updatedFetchers = !0);
    }
    return markFetchersDone(doneKeys), updatedFetchers;
  }
  function abortStaleFetchLoads(landedId) {
    let yeetedKeys = [];
    for (let [key, id] of fetchReloadIds)
      if (id < landedId) {
        let fetcher = state.fetchers.get(key);
        invariant(fetcher, "Expected fetcher: " + key), fetcher.state === "loading" && (abortFetcher(key), fetchReloadIds.delete(key), yeetedKeys.push(key));
      }
    return markFetchersDone(yeetedKeys), yeetedKeys.length > 0;
  }
  function getBlocker(key, fn) {
    let blocker = state.blockers.get(key) || IDLE_BLOCKER;
    return blockerFunctions.get(key) !== fn && blockerFunctions.set(key, fn), blocker;
  }
  function deleteBlocker(key) {
    state.blockers.delete(key), blockerFunctions.delete(key);
  }
  function updateBlocker(key, newBlocker) {
    let blocker = state.blockers.get(key) || IDLE_BLOCKER;
    invariant(blocker.state === "unblocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "proceeding" || blocker.state === "blocked" && newBlocker.state === "unblocked" || blocker.state === "proceeding" && newBlocker.state === "unblocked", "Invalid blocker state transition: " + blocker.state + " -> " + newBlocker.state);
    let blockers = new Map(state.blockers);
    blockers.set(key, newBlocker), updateState({
      blockers
    });
  }
  function shouldBlockNavigation(_ref2) {
    let {
      currentLocation,
      nextLocation,
      historyAction
    } = _ref2;
    if (blockerFunctions.size === 0)
      return;
    blockerFunctions.size > 1 && warning(!1, "A router only supports one blocker at a time");
    let entries = Array.from(blockerFunctions.entries()), [blockerKey, blockerFunction] = entries[entries.length - 1], blocker = state.blockers.get(blockerKey);
    if (!(blocker && blocker.state === "proceeding") && blockerFunction({
      currentLocation,
      nextLocation,
      historyAction
    }))
      return blockerKey;
  }
  function cancelActiveDeferreds(predicate) {
    let cancelledRouteIds = [];
    return activeDeferreds.forEach((dfd, routeId) => {
      (!predicate || predicate(routeId)) && (dfd.cancel(), cancelledRouteIds.push(routeId), activeDeferreds.delete(routeId));
    }), cancelledRouteIds;
  }
  function enableScrollRestoration(positions, getPosition, getKey) {
    if (savedScrollPositions2 = positions, getScrollPosition = getPosition, getScrollRestorationKey = getKey || null, !initialScrollRestored && state.navigation === IDLE_NAVIGATION) {
      initialScrollRestored = !0;
      let y = getSavedScrollPosition(state.location, state.matches);
      y != null && updateState({
        restoreScrollPosition: y
      });
    }
    return () => {
      savedScrollPositions2 = null, getScrollPosition = null, getScrollRestorationKey = null;
    };
  }
  function getScrollKey(location2, matches) {
    return getScrollRestorationKey && getScrollRestorationKey(location2, matches.map((m) => createUseMatchesMatch(m, state.loaderData))) || location2.key;
  }
  function saveScrollPosition(location2, matches) {
    if (savedScrollPositions2 && getScrollPosition) {
      let key = getScrollKey(location2, matches);
      savedScrollPositions2[key] = getScrollPosition();
    }
  }
  function getSavedScrollPosition(location2, matches) {
    if (savedScrollPositions2) {
      let key = getScrollKey(location2, matches), y = savedScrollPositions2[key];
      if (typeof y == "number")
        return y;
    }
    return null;
  }
  function _internalSetRoutes(newRoutes) {
    manifest = {}, inFlightDataRoutes = convertRoutesToDataRoutes(newRoutes, mapRouteProperties2, void 0, manifest);
  }
  return router = {
    get basename() {
      return basename;
    },
    get state() {
      return state;
    },
    get routes() {
      return dataRoutes;
    },
    initialize,
    subscribe,
    enableScrollRestoration,
    navigate,
    fetch: fetch2,
    revalidate,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (to) => init.history.createHref(to),
    encodeLocation: (to) => init.history.encodeLocation(to),
    getFetcher,
    deleteFetcher,
    dispose,
    getBlocker,
    deleteBlocker,
    _internalFetchControllers: fetchControllers,
    _internalActiveDeferreds: activeDeferreds,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes
  }, router;
}
function createStaticHandler(routes2, opts) {
  invariant(routes2.length > 0, "You must provide a non-empty routes array to createStaticHandler");
  let manifest = {}, basename = (opts ? opts.basename : null) || "/", mapRouteProperties2;
  if (opts != null && opts.mapRouteProperties)
    mapRouteProperties2 = opts.mapRouteProperties;
  else if (opts != null && opts.detectErrorBoundary) {
    let detectErrorBoundary = opts.detectErrorBoundary;
    mapRouteProperties2 = (route) => ({
      hasErrorBoundary: detectErrorBoundary(route)
    });
  } else
    mapRouteProperties2 = defaultMapRouteProperties;
  let dataRoutes = convertRoutesToDataRoutes(routes2, mapRouteProperties2, void 0, manifest);
  async function query(request, _temp2) {
    let {
      requestContext
    } = _temp2 === void 0 ? {} : _temp2, url = new URL(request.url), method = request.method, location2 = createLocation("", createPath(url), null, "default"), matches = matchRoutes(dataRoutes, location2, basename);
    if (!isValidMethod(method) && method !== "HEAD") {
      let error = getInternalRouterError(405, {
        method
      }), {
        matches: methodNotAllowedMatches,
        route
      } = getShortCircuitMatches(dataRoutes);
      return {
        basename,
        location: location2,
        matches: methodNotAllowedMatches,
        loaderData: {},
        actionData: null,
        errors: {
          [route.id]: error
        },
        statusCode: error.status,
        loaderHeaders: {},
        actionHeaders: {},
        activeDeferreds: null
      };
    } else if (!matches) {
      let error = getInternalRouterError(404, {
        pathname: location2.pathname
      }), {
        matches: notFoundMatches,
        route
      } = getShortCircuitMatches(dataRoutes);
      return {
        basename,
        location: location2,
        matches: notFoundMatches,
        loaderData: {},
        actionData: null,
        errors: {
          [route.id]: error
        },
        statusCode: error.status,
        loaderHeaders: {},
        actionHeaders: {},
        activeDeferreds: null
      };
    }
    let result = await queryImpl(request, location2, matches, requestContext);
    return isResponse(result) ? result : _extends({
      location: location2,
      basename
    }, result);
  }
  async function queryRoute(request, _temp3) {
    let {
      routeId,
      requestContext
    } = _temp3 === void 0 ? {} : _temp3, url = new URL(request.url), method = request.method, location2 = createLocation("", createPath(url), null, "default"), matches = matchRoutes(dataRoutes, location2, basename);
    if (!isValidMethod(method) && method !== "HEAD" && method !== "OPTIONS")
      throw getInternalRouterError(405, {
        method
      });
    if (!matches)
      throw getInternalRouterError(404, {
        pathname: location2.pathname
      });
    let match = routeId ? matches.find((m) => m.route.id === routeId) : getTargetMatch(matches, location2);
    if (routeId && !match)
      throw getInternalRouterError(403, {
        pathname: location2.pathname,
        routeId
      });
    if (!match)
      throw getInternalRouterError(404, {
        pathname: location2.pathname
      });
    let result = await queryImpl(request, location2, matches, requestContext, match);
    if (isResponse(result))
      return result;
    let error = result.errors ? Object.values(result.errors)[0] : void 0;
    if (error !== void 0)
      throw error;
    if (result.actionData)
      return Object.values(result.actionData)[0];
    if (result.loaderData) {
      var _result$activeDeferre;
      let data = Object.values(result.loaderData)[0];
      return (_result$activeDeferre = result.activeDeferreds) != null && _result$activeDeferre[match.route.id] && (data[UNSAFE_DEFERRED_SYMBOL] = result.activeDeferreds[match.route.id]), data;
    }
  }
  async function queryImpl(request, location2, matches, requestContext, routeMatch) {
    invariant(request.signal, "query()/queryRoute() requests must contain an AbortController signal");
    try {
      if (isMutationMethod(request.method.toLowerCase()))
        return await submit(request, matches, routeMatch || getTargetMatch(matches, location2), requestContext, routeMatch != null);
      let result = await loadRouteData(request, matches, requestContext, routeMatch);
      return isResponse(result) ? result : _extends({}, result, {
        actionData: null,
        actionHeaders: {}
      });
    } catch (e) {
      if (isQueryRouteResponse(e)) {
        if (e.type === ResultType.error && !isRedirectResponse(e.response))
          throw e.response;
        return e.response;
      }
      if (isRedirectResponse(e))
        return e;
      throw e;
    }
  }
  async function submit(request, matches, actionMatch, requestContext, isRouteRequest) {
    let result;
    if (!actionMatch.route.action && !actionMatch.route.lazy) {
      let error = getInternalRouterError(405, {
        method: request.method,
        pathname: new URL(request.url).pathname,
        routeId: actionMatch.route.id
      });
      if (isRouteRequest)
        throw error;
      result = {
        type: ResultType.error,
        error
      };
    } else if (result = await callLoaderOrAction("action", request, actionMatch, matches, manifest, mapRouteProperties2, basename, {
      isStaticRequest: !0,
      isRouteRequest,
      requestContext
    }), request.signal.aborted) {
      let method = isRouteRequest ? "queryRoute" : "query";
      throw new Error(method + "() call aborted");
    }
    if (isRedirectResult(result))
      throw new Response(null, {
        status: result.status,
        headers: {
          Location: result.location
        }
      });
    if (isDeferredResult(result)) {
      let error = getInternalRouterError(400, {
        type: "defer-action"
      });
      if (isRouteRequest)
        throw error;
      result = {
        type: ResultType.error,
        error
      };
    }
    if (isRouteRequest) {
      if (isErrorResult(result))
        throw result.error;
      return {
        matches: [actionMatch],
        loaderData: {},
        actionData: {
          [actionMatch.route.id]: result.data
        },
        errors: null,
        // Note: statusCode + headers are unused here since queryRoute will
        // return the raw Response or value
        statusCode: 200,
        loaderHeaders: {},
        actionHeaders: {},
        activeDeferreds: null
      };
    }
    if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(matches, actionMatch.route.id), context2 = await loadRouteData(request, matches, requestContext, void 0, {
        [boundaryMatch.route.id]: result.error
      });
      return _extends({}, context2, {
        statusCode: isRouteErrorResponse(result.error) ? result.error.status : 500,
        actionData: null,
        actionHeaders: _extends({}, result.headers ? {
          [actionMatch.route.id]: result.headers
        } : {})
      });
    }
    let loaderRequest = new Request(request.url, {
      headers: request.headers,
      redirect: request.redirect,
      signal: request.signal
    }), context = await loadRouteData(loaderRequest, matches, requestContext);
    return _extends({}, context, result.statusCode ? {
      statusCode: result.statusCode
    } : {}, {
      actionData: {
        [actionMatch.route.id]: result.data
      },
      actionHeaders: _extends({}, result.headers ? {
        [actionMatch.route.id]: result.headers
      } : {})
    });
  }
  async function loadRouteData(request, matches, requestContext, routeMatch, pendingActionError) {
    let isRouteRequest = routeMatch != null;
    if (isRouteRequest && !(routeMatch != null && routeMatch.route.loader) && !(routeMatch != null && routeMatch.route.lazy))
      throw getInternalRouterError(400, {
        method: request.method,
        pathname: new URL(request.url).pathname,
        routeId: routeMatch == null ? void 0 : routeMatch.route.id
      });
    let matchesToLoad = (routeMatch ? [routeMatch] : getLoaderMatchesUntilBoundary(matches, Object.keys(pendingActionError || {})[0])).filter((m) => m.route.loader || m.route.lazy);
    if (matchesToLoad.length === 0)
      return {
        matches,
        // Add a null for all matched routes for proper revalidation on the client
        loaderData: matches.reduce((acc, m) => Object.assign(acc, {
          [m.route.id]: null
        }), {}),
        errors: pendingActionError || null,
        statusCode: 200,
        loaderHeaders: {},
        activeDeferreds: null
      };
    let results = await Promise.all([...matchesToLoad.map((match) => callLoaderOrAction("loader", request, match, matches, manifest, mapRouteProperties2, basename, {
      isStaticRequest: !0,
      isRouteRequest,
      requestContext
    }))]);
    if (request.signal.aborted) {
      let method = isRouteRequest ? "queryRoute" : "query";
      throw new Error(method + "() call aborted");
    }
    let activeDeferreds = /* @__PURE__ */ new Map(), context = processRouteLoaderData(matches, matchesToLoad, results, pendingActionError, activeDeferreds), executedLoaders = new Set(matchesToLoad.map((match) => match.route.id));
    return matches.forEach((match) => {
      executedLoaders.has(match.route.id) || (context.loaderData[match.route.id] = null);
    }), _extends({}, context, {
      matches,
      activeDeferreds: activeDeferreds.size > 0 ? Object.fromEntries(activeDeferreds.entries()) : null
    });
  }
  return {
    dataRoutes,
    query,
    queryRoute
  };
}
function getStaticContextFromError(routes2, context, error) {
  return _extends({}, context, {
    statusCode: 500,
    errors: {
      [context._deepestRenderedBoundaryId || routes2[0].id]: error
    }
  });
}
function isSubmissionNavigation(opts) {
  return opts != null && ("formData" in opts && opts.formData != null || "body" in opts && opts.body !== void 0);
}
function normalizeTo(location2, matches, basename, prependBasename, to, fromRouteId, relative) {
  let contextualMatches, activeRouteMatch;
  if (fromRouteId != null && relative !== "path") {
    contextualMatches = [];
    for (let match of matches)
      if (contextualMatches.push(match), match.route.id === fromRouteId) {
        activeRouteMatch = match;
        break;
      }
  } else
    contextualMatches = matches, activeRouteMatch = matches[matches.length - 1];
  let path = resolveTo(to || ".", getPathContributingMatches(contextualMatches).map((m) => m.pathnameBase), stripBasename(location2.pathname, basename) || location2.pathname, relative === "path");
  return to == null && (path.search = location2.search, path.hash = location2.hash), (to == null || to === "" || to === ".") && activeRouteMatch && activeRouteMatch.route.index && !hasNakedIndexQuery(path.search) && (path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index"), prependBasename && basename !== "/" && (path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname])), createPath(path);
}
function normalizeNavigateOptions(normalizeFormMethod, isFetcher, path, opts) {
  if (!opts || !isSubmissionNavigation(opts))
    return {
      path
    };
  if (opts.formMethod && !isValidMethod(opts.formMethod))
    return {
      path,
      error: getInternalRouterError(405, {
        method: opts.formMethod
      })
    };
  let getInvalidBodyError = () => ({
    path,
    error: getInternalRouterError(400, {
      type: "invalid-body"
    })
  }), rawFormMethod = opts.formMethod || "get", formMethod = normalizeFormMethod ? rawFormMethod.toUpperCase() : rawFormMethod.toLowerCase(), formAction = stripHashFromPath(path);
  if (opts.body !== void 0) {
    if (opts.formEncType === "text/plain") {
      if (!isMutationMethod(formMethod))
        return getInvalidBodyError();
      let text = typeof opts.body == "string" ? opts.body : opts.body instanceof FormData || opts.body instanceof URLSearchParams ? (
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
        Array.from(opts.body.entries()).reduce((acc, _ref3) => {
          let [name, value] = _ref3;
          return "" + acc + name + "=" + value + `
`;
        }, "")
      ) : String(opts.body);
      return {
        path,
        submission: {
          formMethod,
          formAction,
          formEncType: opts.formEncType,
          formData: void 0,
          json: void 0,
          text
        }
      };
    } else if (opts.formEncType === "application/json") {
      if (!isMutationMethod(formMethod))
        return getInvalidBodyError();
      try {
        let json6 = typeof opts.body == "string" ? JSON.parse(opts.body) : opts.body;
        return {
          path,
          submission: {
            formMethod,
            formAction,
            formEncType: opts.formEncType,
            formData: void 0,
            json: json6,
            text: void 0
          }
        };
      } catch {
        return getInvalidBodyError();
      }
    }
  }
  invariant(typeof FormData == "function", "FormData is not available in this environment");
  let searchParams, formData;
  if (opts.formData)
    searchParams = convertFormDataToSearchParams(opts.formData), formData = opts.formData;
  else if (opts.body instanceof FormData)
    searchParams = convertFormDataToSearchParams(opts.body), formData = opts.body;
  else if (opts.body instanceof URLSearchParams)
    searchParams = opts.body, formData = convertSearchParamsToFormData(searchParams);
  else if (opts.body == null)
    searchParams = new URLSearchParams(), formData = new FormData();
  else
    try {
      searchParams = new URLSearchParams(opts.body), formData = convertSearchParamsToFormData(searchParams);
    } catch {
      return getInvalidBodyError();
    }
  let submission = {
    formMethod,
    formAction,
    formEncType: opts && opts.formEncType || "application/x-www-form-urlencoded",
    formData,
    json: void 0,
    text: void 0
  };
  if (isMutationMethod(submission.formMethod))
    return {
      path,
      submission
    };
  let parsedPath = parsePath(path);
  return isFetcher && parsedPath.search && hasNakedIndexQuery(parsedPath.search) && searchParams.append("index", ""), parsedPath.search = "?" + searchParams, {
    path: createPath(parsedPath),
    submission
  };
}
function getLoaderMatchesUntilBoundary(matches, boundaryId) {
  let boundaryMatches = matches;
  if (boundaryId) {
    let index = matches.findIndex((m) => m.route.id === boundaryId);
    index >= 0 && (boundaryMatches = matches.slice(0, index));
  }
  return boundaryMatches;
}
function getMatchesToLoad(history, state, matches, submission, location2, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, pendingActionData, pendingError) {
  let actionResult = pendingError ? Object.values(pendingError)[0] : pendingActionData ? Object.values(pendingActionData)[0] : void 0, currentUrl = history.createURL(state.location), nextUrl = history.createURL(location2), boundaryId = pendingError ? Object.keys(pendingError)[0] : void 0, navigationMatches = getLoaderMatchesUntilBoundary(matches, boundaryId).filter((match, index) => {
    if (match.route.lazy)
      return !0;
    if (match.route.loader == null)
      return !1;
    if (isNewLoader(state.loaderData, state.matches[index], match) || cancelledDeferredRoutes.some((id) => id === match.route.id))
      return !0;
    let currentRouteMatch = state.matches[index], nextRouteMatch = match;
    return shouldRevalidateLoader(match, _extends({
      currentUrl,
      currentParams: currentRouteMatch.params,
      nextUrl,
      nextParams: nextRouteMatch.params
    }, submission, {
      actionResult,
      defaultShouldRevalidate: (
        // Forced revalidation due to submission, useRevalidator, or X-Remix-Revalidate
        isRevalidationRequired || // Clicked the same link, resubmitted a GET form
        currentUrl.pathname + currentUrl.search === nextUrl.pathname + nextUrl.search || // Search params affect all loaders
        currentUrl.search !== nextUrl.search || isNewRouteInstance(currentRouteMatch, nextRouteMatch)
      )
    }));
  }), revalidatingFetchers = [];
  return fetchLoadMatches.forEach((f, key) => {
    if (!matches.some((m) => m.route.id === f.routeId))
      return;
    let fetcherMatches = matchRoutes(routesToUse, f.path, basename);
    if (!fetcherMatches) {
      revalidatingFetchers.push({
        key,
        routeId: f.routeId,
        path: f.path,
        matches: null,
        match: null,
        controller: null
      });
      return;
    }
    let fetcher = state.fetchers.get(key), fetcherMatch = getTargetMatch(fetcherMatches, f.path), shouldRevalidate = !1;
    fetchRedirectIds.has(key) ? shouldRevalidate = !1 : cancelledFetcherLoads.includes(key) ? shouldRevalidate = !0 : fetcher && fetcher.state !== "idle" && fetcher.data === void 0 ? shouldRevalidate = isRevalidationRequired : shouldRevalidate = shouldRevalidateLoader(fetcherMatch, _extends({
      currentUrl,
      currentParams: state.matches[state.matches.length - 1].params,
      nextUrl,
      nextParams: matches[matches.length - 1].params
    }, submission, {
      actionResult,
      defaultShouldRevalidate: isRevalidationRequired
    })), shouldRevalidate && revalidatingFetchers.push({
      key,
      routeId: f.routeId,
      path: f.path,
      matches: fetcherMatches,
      match: fetcherMatch,
      controller: new AbortController()
    });
  }), [navigationMatches, revalidatingFetchers];
}
function isNewLoader(currentLoaderData, currentMatch, match) {
  let isNew = (
    // [a] -> [a, b]
    !currentMatch || // [a, b] -> [a, c]
    match.route.id !== currentMatch.route.id
  ), isMissingData = currentLoaderData[match.route.id] === void 0;
  return isNew || isMissingData;
}
function isNewRouteInstance(currentMatch, match) {
  let currentPath = currentMatch.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    currentMatch.pathname !== match.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    currentPath != null && currentPath.endsWith("*") && currentMatch.params["*"] !== match.params["*"]
  );
}
function shouldRevalidateLoader(loaderMatch, arg) {
  if (loaderMatch.route.shouldRevalidate) {
    let routeChoice = loaderMatch.route.shouldRevalidate(arg);
    if (typeof routeChoice == "boolean")
      return routeChoice;
  }
  return arg.defaultShouldRevalidate;
}
async function loadLazyRouteModule(route, mapRouteProperties2, manifest) {
  if (!route.lazy)
    return;
  let lazyRoute = await route.lazy();
  if (!route.lazy)
    return;
  let routeToUpdate = manifest[route.id];
  invariant(routeToUpdate, "No route found in manifest");
  let routeUpdates = {};
  for (let lazyRouteProperty in lazyRoute) {
    let isPropertyStaticallyDefined = routeToUpdate[lazyRouteProperty] !== void 0 && // This property isn't static since it should always be updated based
    // on the route updates
    lazyRouteProperty !== "hasErrorBoundary";
    warning(!isPropertyStaticallyDefined, 'Route "' + routeToUpdate.id + '" has a static property "' + lazyRouteProperty + '" defined but its lazy function is also returning a value for this property. ' + ('The lazy route property "' + lazyRouteProperty + '" will be ignored.')), !isPropertyStaticallyDefined && !immutableRouteKeys.has(lazyRouteProperty) && (routeUpdates[lazyRouteProperty] = lazyRoute[lazyRouteProperty]);
  }
  Object.assign(routeToUpdate, routeUpdates), Object.assign(routeToUpdate, _extends({}, mapRouteProperties2(routeToUpdate), {
    lazy: void 0
  }));
}
async function callLoaderOrAction(type, request, match, matches, manifest, mapRouteProperties2, basename, opts) {
  opts === void 0 && (opts = {});
  let resultType, result, onReject, runHandler = (handler) => {
    let reject, abortPromise = new Promise((_, r) => reject = r);
    return onReject = () => reject(), request.signal.addEventListener("abort", onReject), Promise.race([handler({
      request,
      params: match.params,
      context: opts.requestContext
    }), abortPromise]);
  };
  try {
    let handler = match.route[type];
    if (match.route.lazy)
      if (handler)
        result = (await Promise.all([runHandler(handler), loadLazyRouteModule(match.route, mapRouteProperties2, manifest)]))[0];
      else if (await loadLazyRouteModule(match.route, mapRouteProperties2, manifest), handler = match.route[type], handler)
        result = await runHandler(handler);
      else if (type === "action") {
        let url = new URL(request.url), pathname = url.pathname + url.search;
        throw getInternalRouterError(405, {
          method: request.method,
          pathname,
          routeId: match.route.id
        });
      } else
        return {
          type: ResultType.data,
          data: void 0
        };
    else if (handler)
      result = await runHandler(handler);
    else {
      let url = new URL(request.url), pathname = url.pathname + url.search;
      throw getInternalRouterError(404, {
        pathname
      });
    }
    invariant(result !== void 0, "You defined " + (type === "action" ? "an action" : "a loader") + " for route " + ('"' + match.route.id + "\" but didn't return anything from your `" + type + "` ") + "function. Please return a value or `null`.");
  } catch (e) {
    resultType = ResultType.error, result = e;
  } finally {
    onReject && request.signal.removeEventListener("abort", onReject);
  }
  if (isResponse(result)) {
    let status = result.status;
    if (redirectStatusCodes.has(status)) {
      let location2 = result.headers.get("Location");
      if (invariant(location2, "Redirects returned/thrown from loaders/actions must have a Location header"), !ABSOLUTE_URL_REGEX.test(location2))
        location2 = normalizeTo(new URL(request.url), matches.slice(0, matches.indexOf(match) + 1), basename, !0, location2);
      else if (!opts.isStaticRequest) {
        let currentUrl = new URL(request.url), url = location2.startsWith("//") ? new URL(currentUrl.protocol + location2) : new URL(location2), isSameBasename = stripBasename(url.pathname, basename) != null;
        url.origin === currentUrl.origin && isSameBasename && (location2 = url.pathname + url.search + url.hash);
      }
      if (opts.isStaticRequest)
        throw result.headers.set("Location", location2), result;
      return {
        type: ResultType.redirect,
        status,
        location: location2,
        revalidate: result.headers.get("X-Remix-Revalidate") !== null
      };
    }
    if (opts.isRouteRequest)
      throw {
        type: resultType || ResultType.data,
        response: result
      };
    let data, contentType = result.headers.get("Content-Type");
    return contentType && /\bapplication\/json\b/.test(contentType) ? data = await result.json() : data = await result.text(), resultType === ResultType.error ? {
      type: resultType,
      error: new ErrorResponse(status, result.statusText, data),
      headers: result.headers
    } : {
      type: ResultType.data,
      data,
      statusCode: result.status,
      headers: result.headers
    };
  }
  if (resultType === ResultType.error)
    return {
      type: resultType,
      error: result
    };
  if (isDeferredData(result)) {
    var _result$init, _result$init2;
    return {
      type: ResultType.deferred,
      deferredData: result,
      statusCode: (_result$init = result.init) == null ? void 0 : _result$init.status,
      headers: ((_result$init2 = result.init) == null ? void 0 : _result$init2.headers) && new Headers(result.init.headers)
    };
  }
  return {
    type: ResultType.data,
    data: result
  };
}
function createClientSideRequest(history, location2, signal, submission) {
  let url = history.createURL(stripHashFromPath(location2)).toString(), init = {
    signal
  };
  if (submission && isMutationMethod(submission.formMethod)) {
    let {
      formMethod,
      formEncType
    } = submission;
    init.method = formMethod.toUpperCase(), formEncType === "application/json" ? (init.headers = new Headers({
      "Content-Type": formEncType
    }), init.body = JSON.stringify(submission.json)) : formEncType === "text/plain" ? init.body = submission.text : formEncType === "application/x-www-form-urlencoded" && submission.formData ? init.body = convertFormDataToSearchParams(submission.formData) : init.body = submission.formData;
  }
  return new Request(url, init);
}
function convertFormDataToSearchParams(formData) {
  let searchParams = new URLSearchParams();
  for (let [key, value] of formData.entries())
    searchParams.append(key, typeof value == "string" ? value : value.name);
  return searchParams;
}
function convertSearchParamsToFormData(searchParams) {
  let formData = new FormData();
  for (let [key, value] of searchParams.entries())
    formData.append(key, value);
  return formData;
}
function processRouteLoaderData(matches, matchesToLoad, results, pendingError, activeDeferreds) {
  let loaderData = {}, errors = null, statusCode, foundError = !1, loaderHeaders = {};
  return results.forEach((result, index) => {
    let id = matchesToLoad[index].route.id;
    if (invariant(!isRedirectResult(result), "Cannot handle redirect results in processLoaderData"), isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(matches, id), error = result.error;
      pendingError && (error = Object.values(pendingError)[0], pendingError = void 0), errors = errors || {}, errors[boundaryMatch.route.id] == null && (errors[boundaryMatch.route.id] = error), loaderData[id] = void 0, foundError || (foundError = !0, statusCode = isRouteErrorResponse(result.error) ? result.error.status : 500), result.headers && (loaderHeaders[id] = result.headers);
    } else
      isDeferredResult(result) ? (activeDeferreds.set(id, result.deferredData), loaderData[id] = result.deferredData.data) : loaderData[id] = result.data, result.statusCode != null && result.statusCode !== 200 && !foundError && (statusCode = result.statusCode), result.headers && (loaderHeaders[id] = result.headers);
  }), pendingError && (errors = pendingError, loaderData[Object.keys(pendingError)[0]] = void 0), {
    loaderData,
    errors,
    statusCode: statusCode || 200,
    loaderHeaders
  };
}
function processLoaderData(state, matches, matchesToLoad, results, pendingError, revalidatingFetchers, fetcherResults, activeDeferreds) {
  let {
    loaderData,
    errors
  } = processRouteLoaderData(matches, matchesToLoad, results, pendingError, activeDeferreds);
  for (let index = 0; index < revalidatingFetchers.length; index++) {
    let {
      key,
      match,
      controller
    } = revalidatingFetchers[index];
    invariant(fetcherResults !== void 0 && fetcherResults[index] !== void 0, "Did not find corresponding fetcher result");
    let result = fetcherResults[index];
    if (!(controller && controller.signal.aborted))
      if (isErrorResult(result)) {
        let boundaryMatch = findNearestBoundary(state.matches, match == null ? void 0 : match.route.id);
        errors && errors[boundaryMatch.route.id] || (errors = _extends({}, errors, {
          [boundaryMatch.route.id]: result.error
        })), state.fetchers.delete(key);
      } else if (isRedirectResult(result))
        invariant(!1, "Unhandled fetcher revalidation redirect");
      else if (isDeferredResult(result))
        invariant(!1, "Unhandled fetcher deferred data");
      else {
        let doneFetcher = getDoneFetcher(result.data);
        state.fetchers.set(key, doneFetcher);
      }
  }
  return {
    loaderData,
    errors
  };
}
function mergeLoaderData(loaderData, newLoaderData, matches, errors) {
  let mergedLoaderData = _extends({}, newLoaderData);
  for (let match of matches) {
    let id = match.route.id;
    if (newLoaderData.hasOwnProperty(id) ? newLoaderData[id] !== void 0 && (mergedLoaderData[id] = newLoaderData[id]) : loaderData[id] !== void 0 && match.route.loader && (mergedLoaderData[id] = loaderData[id]), errors && errors.hasOwnProperty(id))
      break;
  }
  return mergedLoaderData;
}
function findNearestBoundary(matches, routeId) {
  return (routeId ? matches.slice(0, matches.findIndex((m) => m.route.id === routeId) + 1) : [...matches]).reverse().find((m) => m.route.hasErrorBoundary === !0) || matches[0];
}
function getShortCircuitMatches(routes2) {
  let route = routes2.find((r) => r.index || !r.path || r.path === "/") || {
    id: "__shim-error-route__"
  };
  return {
    matches: [{
      params: {},
      pathname: "",
      pathnameBase: "",
      route
    }],
    route
  };
}
function getInternalRouterError(status, _temp4) {
  let {
    pathname,
    routeId,
    method,
    type
  } = _temp4 === void 0 ? {} : _temp4, statusText = "Unknown Server Error", errorMessage = "Unknown @remix-run/router error";
  return status === 400 ? (statusText = "Bad Request", method && pathname && routeId ? errorMessage = "You made a " + method + ' request to "' + pathname + '" but ' + ('did not provide a `loader` for route "' + routeId + '", ') + "so there is no way to handle the request." : type === "defer-action" ? errorMessage = "defer() is not supported in actions" : type === "invalid-body" && (errorMessage = "Unable to encode submission body")) : status === 403 ? (statusText = "Forbidden", errorMessage = 'Route "' + routeId + '" does not match URL "' + pathname + '"') : status === 404 ? (statusText = "Not Found", errorMessage = 'No route matches URL "' + pathname + '"') : status === 405 && (statusText = "Method Not Allowed", method && pathname && routeId ? errorMessage = "You made a " + method.toUpperCase() + ' request to "' + pathname + '" but ' + ('did not provide an `action` for route "' + routeId + '", ') + "so there is no way to handle the request." : method && (errorMessage = 'Invalid request method "' + method.toUpperCase() + '"')), new ErrorResponse(status || 500, statusText, new Error(errorMessage), !0);
}
function findRedirect(results) {
  for (let i = results.length - 1; i >= 0; i--) {
    let result = results[i];
    if (isRedirectResult(result))
      return {
        result,
        idx: i
      };
  }
}
function stripHashFromPath(path) {
  let parsedPath = typeof path == "string" ? parsePath(path) : path;
  return createPath(_extends({}, parsedPath, {
    hash: ""
  }));
}
function isHashChangeOnly(a, b) {
  return a.pathname !== b.pathname || a.search !== b.search ? !1 : a.hash === "" ? b.hash !== "" : a.hash === b.hash ? !0 : b.hash !== "";
}
function isDeferredResult(result) {
  return result.type === ResultType.deferred;
}
function isErrorResult(result) {
  return result.type === ResultType.error;
}
function isRedirectResult(result) {
  return (result && result.type) === ResultType.redirect;
}
function isDeferredData(value) {
  let deferred = value;
  return deferred && typeof deferred == "object" && typeof deferred.data == "object" && typeof deferred.subscribe == "function" && typeof deferred.cancel == "function" && typeof deferred.resolveData == "function";
}
function isResponse(value) {
  return value != null && typeof value.status == "number" && typeof value.statusText == "string" && typeof value.headers == "object" && typeof value.body < "u";
}
function isRedirectResponse(result) {
  if (!isResponse(result))
    return !1;
  let status = result.status, location2 = result.headers.get("Location");
  return status >= 300 && status <= 399 && location2 != null;
}
function isQueryRouteResponse(obj) {
  return obj && isResponse(obj.response) && (obj.type === ResultType.data || ResultType.error);
}
function isValidMethod(method) {
  return validRequestMethods.has(method.toLowerCase());
}
function isMutationMethod(method) {
  return validMutationMethods.has(method.toLowerCase());
}
async function resolveDeferredResults(currentMatches, matchesToLoad, results, signals, isFetcher, currentLoaderData) {
  for (let index = 0; index < results.length; index++) {
    let result = results[index], match = matchesToLoad[index];
    if (!match)
      continue;
    let currentMatch = currentMatches.find((m) => m.route.id === match.route.id), isRevalidatingLoader = currentMatch != null && !isNewRouteInstance(currentMatch, match) && (currentLoaderData && currentLoaderData[match.route.id]) !== void 0;
    if (isDeferredResult(result) && (isFetcher || isRevalidatingLoader)) {
      let signal = signals[index];
      invariant(signal, "Expected an AbortSignal for revalidating fetcher deferred result"), await resolveDeferredData(result, signal, isFetcher).then((result2) => {
        result2 && (results[index] = result2 || results[index]);
      });
    }
  }
}
async function resolveDeferredData(result, signal, unwrap) {
  if (unwrap === void 0 && (unwrap = !1), !await result.deferredData.resolveData(signal)) {
    if (unwrap)
      try {
        return {
          type: ResultType.data,
          data: result.deferredData.unwrappedData
        };
      } catch (e) {
        return {
          type: ResultType.error,
          error: e
        };
      }
    return {
      type: ResultType.data,
      data: result.deferredData.data
    };
  }
}
function hasNakedIndexQuery(search) {
  return new URLSearchParams(search).getAll("index").some((v) => v === "");
}
function createUseMatchesMatch(match, loaderData) {
  let {
    route,
    pathname,
    params
  } = match;
  return {
    id: route.id,
    pathname,
    params,
    data: loaderData[route.id],
    handle: route.handle
  };
}
function getTargetMatch(matches, location2) {
  let search = typeof location2 == "string" ? parsePath(location2).search : location2.search;
  if (matches[matches.length - 1].route.index && hasNakedIndexQuery(search || ""))
    return matches[matches.length - 1];
  let pathMatches = getPathContributingMatches(matches);
  return pathMatches[pathMatches.length - 1];
}
function getSubmissionFromNavigation(navigation) {
  let {
    formMethod,
    formAction,
    formEncType,
    text,
    formData,
    json: json6
  } = navigation;
  if (!(!formMethod || !formAction || !formEncType)) {
    if (text != null)
      return {
        formMethod,
        formAction,
        formEncType,
        formData: void 0,
        json: void 0,
        text
      };
    if (formData != null)
      return {
        formMethod,
        formAction,
        formEncType,
        formData,
        json: void 0,
        text: void 0
      };
    if (json6 !== void 0)
      return {
        formMethod,
        formAction,
        formEncType,
        formData: void 0,
        json: json6,
        text: void 0
      };
  }
}
function getLoadingNavigation(location2, submission) {
  return submission ? {
    state: "loading",
    location: location2,
    formMethod: submission.formMethod,
    formAction: submission.formAction,
    formEncType: submission.formEncType,
    formData: submission.formData,
    json: submission.json,
    text: submission.text
  } : {
    state: "loading",
    location: location2,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0
  };
}
function getSubmittingNavigation(location2, submission) {
  return {
    state: "submitting",
    location: location2,
    formMethod: submission.formMethod,
    formAction: submission.formAction,
    formEncType: submission.formEncType,
    formData: submission.formData,
    json: submission.json,
    text: submission.text
  };
}
function getLoadingFetcher(submission, data) {
  return submission ? {
    state: "loading",
    formMethod: submission.formMethod,
    formAction: submission.formAction,
    formEncType: submission.formEncType,
    formData: submission.formData,
    json: submission.json,
    text: submission.text,
    data,
    " _hasFetcherDoneAnything ": !0
  } : {
    state: "loading",
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data,
    " _hasFetcherDoneAnything ": !0
  };
}
function getSubmittingFetcher(submission, existingFetcher) {
  return {
    state: "submitting",
    formMethod: submission.formMethod,
    formAction: submission.formAction,
    formEncType: submission.formEncType,
    formData: submission.formData,
    json: submission.json,
    text: submission.text,
    data: existingFetcher ? existingFetcher.data : void 0,
    " _hasFetcherDoneAnything ": !0
  };
}
function getDoneFetcher(data) {
  return {
    state: "idle",
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data,
    " _hasFetcherDoneAnything ": !0
  };
}
var Action, PopStateEventType, ResultType, immutableRouteKeys, paramRe, dynamicSegmentValue, indexRouteValue, emptySegmentValue, staticSegmentValue, splatPenalty, isSplat, joinPaths, normalizePathname, normalizeSearch, normalizeHash, json, AbortedDeferredError, DeferredData, defer, redirect, ErrorResponse, validMutationMethodsArr, validMutationMethods, validRequestMethodsArr, validRequestMethods, redirectStatusCodes, redirectPreserveMethodStatusCodes, IDLE_NAVIGATION, IDLE_FETCHER, IDLE_BLOCKER, ABSOLUTE_URL_REGEX, defaultMapRouteProperties, UNSAFE_DEFERRED_SYMBOL, init_router = __esm({
  "node_modules/@remix-run/router/dist/router.js"() {
    (function(Action2) {
      Action2.Pop = "POP", Action2.Push = "PUSH", Action2.Replace = "REPLACE";
    })(Action || (Action = {}));
    PopStateEventType = "popstate";
    (function(ResultType2) {
      ResultType2.data = "data", ResultType2.deferred = "deferred", ResultType2.redirect = "redirect", ResultType2.error = "error";
    })(ResultType || (ResultType = {}));
    immutableRouteKeys = /* @__PURE__ */ new Set(["lazy", "caseSensitive", "path", "id", "index", "children"]);
    paramRe = /^:\w+$/, dynamicSegmentValue = 3, indexRouteValue = 2, emptySegmentValue = 1, staticSegmentValue = 10, splatPenalty = -2, isSplat = (s) => s === "*";
    joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/"), normalizePathname = (pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/"), normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search, normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash, json = function(data, init) {
      init === void 0 && (init = {});
      let responseInit = typeof init == "number" ? {
        status: init
      } : init, headers = new Headers(responseInit.headers);
      return headers.has("Content-Type") || headers.set("Content-Type", "application/json; charset=utf-8"), new Response(JSON.stringify(data), _extends({}, responseInit, {
        headers
      }));
    }, AbortedDeferredError = class extends Error {
    }, DeferredData = class {
      constructor(data, responseInit) {
        this.pendingKeysSet = /* @__PURE__ */ new Set(), this.subscribers = /* @__PURE__ */ new Set(), this.deferredKeys = [], invariant(data && typeof data == "object" && !Array.isArray(data), "defer() only accepts plain objects");
        let reject;
        this.abortPromise = new Promise((_, r) => reject = r), this.controller = new AbortController();
        let onAbort = () => reject(new AbortedDeferredError("Deferred data aborted"));
        this.unlistenAbortSignal = () => this.controller.signal.removeEventListener("abort", onAbort), this.controller.signal.addEventListener("abort", onAbort), this.data = Object.entries(data).reduce((acc, _ref) => {
          let [key, value] = _ref;
          return Object.assign(acc, {
            [key]: this.trackPromise(key, value)
          });
        }, {}), this.done && this.unlistenAbortSignal(), this.init = responseInit;
      }
      trackPromise(key, value) {
        if (!(value instanceof Promise))
          return value;
        this.deferredKeys.push(key), this.pendingKeysSet.add(key);
        let promise = Promise.race([value, this.abortPromise]).then((data) => this.onSettle(promise, key, void 0, data), (error) => this.onSettle(promise, key, error));
        return promise.catch(() => {
        }), Object.defineProperty(promise, "_tracked", {
          get: () => !0
        }), promise;
      }
      onSettle(promise, key, error, data) {
        if (this.controller.signal.aborted && error instanceof AbortedDeferredError)
          return this.unlistenAbortSignal(), Object.defineProperty(promise, "_error", {
            get: () => error
          }), Promise.reject(error);
        if (this.pendingKeysSet.delete(key), this.done && this.unlistenAbortSignal(), error === void 0 && data === void 0) {
          let undefinedError = new Error('Deferred data for key "' + key + '" resolved/rejected with `undefined`, you must resolve/reject with a value or `null`.');
          return Object.defineProperty(promise, "_error", {
            get: () => undefinedError
          }), this.emit(!1, key), Promise.reject(undefinedError);
        }
        return data === void 0 ? (Object.defineProperty(promise, "_error", {
          get: () => error
        }), this.emit(!1, key), Promise.reject(error)) : (Object.defineProperty(promise, "_data", {
          get: () => data
        }), this.emit(!1, key), data);
      }
      emit(aborted, settledKey) {
        this.subscribers.forEach((subscriber) => subscriber(aborted, settledKey));
      }
      subscribe(fn) {
        return this.subscribers.add(fn), () => this.subscribers.delete(fn);
      }
      cancel() {
        this.controller.abort(), this.pendingKeysSet.forEach((v, k) => this.pendingKeysSet.delete(k)), this.emit(!0);
      }
      async resolveData(signal) {
        let aborted = !1;
        if (!this.done) {
          let onAbort = () => this.cancel();
          signal.addEventListener("abort", onAbort), aborted = await new Promise((resolve) => {
            this.subscribe((aborted2) => {
              signal.removeEventListener("abort", onAbort), (aborted2 || this.done) && resolve(aborted2);
            });
          });
        }
        return aborted;
      }
      get done() {
        return this.pendingKeysSet.size === 0;
      }
      get unwrappedData() {
        return invariant(this.data !== null && this.done, "Can only unwrap data on initialized and settled deferreds"), Object.entries(this.data).reduce((acc, _ref2) => {
          let [key, value] = _ref2;
          return Object.assign(acc, {
            [key]: unwrapTrackedPromise(value)
          });
        }, {});
      }
      get pendingKeys() {
        return Array.from(this.pendingKeysSet);
      }
    };
    defer = function(data, init) {
      init === void 0 && (init = {});
      let responseInit = typeof init == "number" ? {
        status: init
      } : init;
      return new DeferredData(data, responseInit);
    }, redirect = function(url, init) {
      init === void 0 && (init = 302);
      let responseInit = init;
      typeof responseInit == "number" ? responseInit = {
        status: responseInit
      } : typeof responseInit.status > "u" && (responseInit.status = 302);
      let headers = new Headers(responseInit.headers);
      return headers.set("Location", url), new Response(null, _extends({}, responseInit, {
        headers
      }));
    }, ErrorResponse = class {
      constructor(status, statusText, data, internal) {
        internal === void 0 && (internal = !1), this.status = status, this.statusText = statusText || "", this.internal = internal, data instanceof Error ? (this.data = data.toString(), this.error = data) : this.data = data;
      }
    };
    validMutationMethodsArr = ["post", "put", "patch", "delete"], validMutationMethods = new Set(validMutationMethodsArr), validRequestMethodsArr = ["get", ...validMutationMethodsArr], validRequestMethods = new Set(validRequestMethodsArr), redirectStatusCodes = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), redirectPreserveMethodStatusCodes = /* @__PURE__ */ new Set([307, 308]), IDLE_NAVIGATION = {
      state: "idle",
      location: void 0,
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0
    }, IDLE_FETCHER = {
      state: "idle",
      data: void 0,
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0
    }, IDLE_BLOCKER = {
      state: "unblocked",
      proceed: void 0,
      reset: void 0,
      location: void 0
    }, ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, defaultMapRouteProperties = (route) => ({
      hasErrorBoundary: Boolean(route.hasErrorBoundary)
    });
    UNSAFE_DEFERRED_SYMBOL = Symbol("deferred");
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/mode.js
function isServerMode(value) {
  return value === ServerMode.Development || value === ServerMode.Production || value === ServerMode.Test;
}
var ServerMode, init_mode = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/mode.js"() {
    ServerMode = /* @__PURE__ */ function(ServerMode2) {
      return ServerMode2.Development = "development", ServerMode2.Production = "production", ServerMode2.Test = "test", ServerMode2;
    }({});
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/errors.js
function sanitizeError(error, serverMode) {
  if (error instanceof Error && serverMode !== ServerMode.Development) {
    let sanitized = new Error("Unexpected Server Error");
    return sanitized.stack = void 0, sanitized;
  }
  return error;
}
function sanitizeErrors(errors, serverMode) {
  return Object.entries(errors).reduce((acc, [routeId, error]) => Object.assign(acc, {
    [routeId]: sanitizeError(error, serverMode)
  }), {});
}
function serializeError(error, serverMode) {
  let sanitized = sanitizeError(error, serverMode);
  return {
    message: sanitized.message,
    stack: sanitized.stack
  };
}
function serializeErrors(errors, serverMode) {
  if (!errors)
    return null;
  let entries = Object.entries(errors), serialized = {};
  for (let [key, val] of entries)
    if (isRouteErrorResponse(val))
      serialized[key] = {
        ...val,
        __type: "RouteErrorResponse"
      };
    else if (val instanceof Error) {
      let sanitized = sanitizeError(val, serverMode);
      serialized[key] = {
        message: sanitized.message,
        stack: sanitized.stack,
        __type: "Error",
        // If this is a subclass (i.e., ReferenceError), send up the type so we
        // can re-create the same type during hydration.  This will only apply
        // in dev mode since all production errors are sanitized to normal
        // Error instances
        ...sanitized.name !== "Error" ? {
          __subType: sanitized.name
        } : {}
      };
    } else
      serialized[key] = val;
  return serialized;
}
var init_errors = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/errors.js"() {
    init_router();
    init_mode();
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/responses.js
function isDeferredData2(value) {
  let deferred = value;
  return deferred && typeof deferred == "object" && typeof deferred.data == "object" && typeof deferred.subscribe == "function" && typeof deferred.cancel == "function" && typeof deferred.resolveData == "function";
}
function isResponse2(value) {
  return value != null && typeof value.status == "number" && typeof value.statusText == "string" && typeof value.headers == "object" && typeof value.body < "u";
}
function isRedirectStatusCode(statusCode) {
  return redirectStatusCodes2.has(statusCode);
}
function isRedirectResponse2(response) {
  return isRedirectStatusCode(response.status);
}
function isTrackedPromise2(value) {
  return value != null && typeof value.then == "function" && value._tracked === !0;
}
function createDeferredReadableStream(deferredData, signal, serverMode) {
  let encoder = new TextEncoder();
  return new ReadableStream({
    async start(controller) {
      let criticalData = {}, preresolvedKeys = [];
      for (let [key, value] of Object.entries(deferredData.data))
        isTrackedPromise2(value) ? (criticalData[key] = `${DEFERRED_VALUE_PLACEHOLDER_PREFIX}${key}`, (typeof value._data < "u" || typeof value._error < "u") && preresolvedKeys.push(key)) : criticalData[key] = value;
      controller.enqueue(encoder.encode(JSON.stringify(criticalData) + `

`));
      for (let preresolvedKey of preresolvedKeys)
        enqueueTrackedPromise(controller, encoder, preresolvedKey, deferredData.data[preresolvedKey], serverMode);
      let unsubscribe = deferredData.subscribe((aborted, settledKey) => {
        settledKey && enqueueTrackedPromise(controller, encoder, settledKey, deferredData.data[settledKey], serverMode);
      });
      await deferredData.resolveData(signal), unsubscribe(), controller.close();
    }
  });
}
function enqueueTrackedPromise(controller, encoder, settledKey, promise, serverMode) {
  "_error" in promise ? controller.enqueue(encoder.encode("error:" + JSON.stringify({
    [settledKey]: promise._error instanceof Error ? serializeError(promise._error, serverMode) : promise._error
  }) + `

`)) : controller.enqueue(encoder.encode("data:" + JSON.stringify({
    [settledKey]: promise._data ?? null
  }) + `

`));
}
var json3, defer3, redirect3, redirectStatusCodes2, DEFERRED_VALUE_PLACEHOLDER_PREFIX, init_responses = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/responses.js"() {
    init_router();
    init_errors();
    json3 = (data, init = {}) => json(data, init), defer3 = (data, init = {}) => defer(data, init), redirect3 = (url, init = 302) => redirect(url, init);
    redirectStatusCodes2 = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
    DEFERRED_VALUE_PLACEHOLDER_PREFIX = "__deferred_promise:";
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/entry.js
function createEntryRouteModules(manifest) {
  return Object.keys(manifest).reduce((memo, routeId) => (memo[routeId] = manifest[routeId].module, memo), {});
}
var init_entry = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/entry.js"() {
  }
});

// node_modules/set-cookie-parser/lib/set-cookie.js
var require_set_cookie = __commonJS({
  "node_modules/set-cookie-parser/lib/set-cookie.js"(exports, module) {
    "use strict";
    var defaultParseOptions = {
      decodeValues: !0,
      map: !1,
      silent: !1
    };
    function isNonEmptyString(str) {
      return typeof str == "string" && !!str.trim();
    }
    function parseString(setCookieValue, options) {
      var parts = setCookieValue.split(";").filter(isNonEmptyString), nameValuePairStr = parts.shift(), parsed = parseNameValuePair(nameValuePairStr), name = parsed.name, value = parsed.value;
      options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
      try {
        value = options.decodeValues ? decodeURIComponent(value) : value;
      } catch (e) {
        console.error(
          "set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.",
          e
        );
      }
      var cookie = {
        name,
        value
      };
      return parts.forEach(function(part) {
        var sides = part.split("="), key = sides.shift().trimLeft().toLowerCase(), value2 = sides.join("=");
        key === "expires" ? cookie.expires = new Date(value2) : key === "max-age" ? cookie.maxAge = parseInt(value2, 10) : key === "secure" ? cookie.secure = !0 : key === "httponly" ? cookie.httpOnly = !0 : key === "samesite" ? cookie.sameSite = value2 : cookie[key] = value2;
      }), cookie;
    }
    function parseNameValuePair(nameValuePairStr) {
      var name = "", value = "", nameValueArr = nameValuePairStr.split("=");
      return nameValueArr.length > 1 ? (name = nameValueArr.shift(), value = nameValueArr.join("=")) : value = nameValuePairStr, { name, value };
    }
    function parse2(input, options) {
      if (options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions, !input)
        return options.map ? {} : [];
      if (input.headers)
        if (typeof input.headers.getSetCookie == "function")
          input = input.headers.getSetCookie();
        else if (input.headers["set-cookie"])
          input = input.headers["set-cookie"];
        else {
          var sch = input.headers[Object.keys(input.headers).find(function(key) {
            return key.toLowerCase() === "set-cookie";
          })];
          !sch && input.headers.cookie && !options.silent && console.warn(
            "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
          ), input = sch;
        }
      if (Array.isArray(input) || (input = [input]), options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions, options.map) {
        var cookies = {};
        return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
          var cookie = parseString(str, options);
          return cookies2[cookie.name] = cookie, cookies2;
        }, cookies);
      } else
        return input.filter(isNonEmptyString).map(function(str) {
          return parseString(str, options);
        });
    }
    function splitCookiesString2(cookiesString) {
      if (Array.isArray(cookiesString))
        return cookiesString;
      if (typeof cookiesString != "string")
        return [];
      var cookiesStrings = [], pos = 0, start, ch, lastComma, nextStart, cookiesSeparatorFound;
      function skipWhitespace() {
        for (; pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos)); )
          pos += 1;
        return pos < cookiesString.length;
      }
      function notSpecialChar() {
        return ch = cookiesString.charAt(pos), ch !== "=" && ch !== ";" && ch !== ",";
      }
      for (; pos < cookiesString.length; ) {
        for (start = pos, cookiesSeparatorFound = !1; skipWhitespace(); )
          if (ch = cookiesString.charAt(pos), ch === ",") {
            for (lastComma = pos, pos += 1, skipWhitespace(), nextStart = pos; pos < cookiesString.length && notSpecialChar(); )
              pos += 1;
            pos < cookiesString.length && cookiesString.charAt(pos) === "=" ? (cookiesSeparatorFound = !0, pos = nextStart, cookiesStrings.push(cookiesString.substring(start, lastComma)), start = pos) : pos = lastComma + 1;
          } else
            pos += 1;
        (!cookiesSeparatorFound || pos >= cookiesString.length) && cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
      }
      return cookiesStrings;
    }
    module.exports = parse2;
    module.exports.parse = parse2;
    module.exports.parseString = parseString;
    module.exports.splitCookiesString = splitCookiesString2;
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/headers.js
function getDocumentHeadersRR(build, context) {
  let boundaryIdx = context.errors ? context.matches.findIndex((m) => context.errors[m.route.id]) : -1, matches = boundaryIdx >= 0 ? context.matches.slice(0, boundaryIdx + 1) : context.matches, errorHeaders;
  if (boundaryIdx >= 0) {
    let {
      actionHeaders,
      actionData,
      loaderHeaders,
      loaderData
    } = context;
    context.matches.slice(boundaryIdx).some((match) => {
      let id = match.route.id;
      return actionHeaders[id] && (!actionData || actionData[id] === void 0) ? errorHeaders = actionHeaders[id] : loaderHeaders[id] && loaderData[id] === void 0 && (errorHeaders = loaderHeaders[id]), errorHeaders != null;
    });
  }
  return matches.reduce((parentHeaders, match, idx) => {
    let {
      id
    } = match.route, routeModule = build.routes[id].module, loaderHeaders = context.loaderHeaders[id] || new Headers(), actionHeaders = context.actionHeaders[id] || new Headers(), includeErrorHeaders = errorHeaders != null && idx === matches.length - 1, includeErrorCookies = includeErrorHeaders && errorHeaders !== loaderHeaders && errorHeaders !== actionHeaders;
    if (routeModule.headers == null && build.future.v2_headers) {
      let headers2 = new Headers(parentHeaders);
      return includeErrorCookies && prependCookies(errorHeaders, headers2), prependCookies(actionHeaders, headers2), prependCookies(loaderHeaders, headers2), headers2;
    }
    let headers = new Headers(routeModule.headers ? typeof routeModule.headers == "function" ? routeModule.headers({
      loaderHeaders,
      parentHeaders,
      actionHeaders,
      errorHeaders: includeErrorHeaders ? errorHeaders : void 0
    }) : routeModule.headers : void 0);
    return includeErrorCookies && prependCookies(errorHeaders, headers), prependCookies(actionHeaders, headers), prependCookies(loaderHeaders, headers), prependCookies(parentHeaders, headers), headers;
  }, new Headers());
}
function prependCookies(parentHeaders, childHeaders) {
  let parentSetCookieString = parentHeaders.get("Set-Cookie");
  parentSetCookieString && (0, import_set_cookie_parser.splitCookiesString)(parentSetCookieString).forEach((cookie) => {
    childHeaders.append("Set-Cookie", cookie);
  });
}
var import_set_cookie_parser, init_headers = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/headers.js"() {
    import_set_cookie_parser = __toESM(require_set_cookie());
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/invariant.js
function invariant2(value, message) {
  if (value === !1 || value === null || typeof value > "u")
    throw console.error("The following error is a bug in Remix; please open an issue! https://github.com/remix-run/remix/issues/new"), new Error(message);
}
var init_invariant = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/invariant.js"() {
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/routeMatching.js
function matchServerRoutes(routes2, pathname) {
  let matches = matchRoutes(routes2, pathname);
  return matches ? matches.map((match) => ({
    params: match.params,
    pathname: match.pathname,
    route: match.route
  })) : null;
}
var init_routeMatching = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/routeMatching.js"() {
    init_router();
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/data.js
async function callRouteActionRR({
  loadContext,
  action,
  params,
  request,
  routeId
}) {
  let result = await action({
    request: stripDataParam(stripIndexParam(request)),
    context: loadContext,
    params
  });
  if (result === void 0)
    throw new Error(`You defined an action for route "${routeId}" but didn't return anything from your \`action\` function. Please return a value or \`null\`.`);
  return isResponse2(result) ? result : json3(result);
}
async function callRouteLoaderRR({
  loadContext,
  loader: loader4,
  params,
  request,
  routeId
}) {
  let result = await loader4({
    request: stripDataParam(stripIndexParam(request)),
    context: loadContext,
    params
  });
  if (result === void 0)
    throw new Error(`You defined a loader for route "${routeId}" but didn't return anything from your \`loader\` function. Please return a value or \`null\`.`);
  return isDeferredData2(result) ? result.init && isRedirectStatusCode(result.init.status || 200) ? redirect3(new Headers(result.init.headers).get("Location"), result.init) : result : isResponse2(result) ? result : json3(result);
}
function stripIndexParam(request) {
  let url = new URL(request.url), indexValues = url.searchParams.getAll("index");
  url.searchParams.delete("index");
  let indexValuesToKeep = [];
  for (let indexValue of indexValues)
    indexValue && indexValuesToKeep.push(indexValue);
  for (let toKeep of indexValuesToKeep)
    url.searchParams.append("index", toKeep);
  return new Request(url.href, request);
}
function stripDataParam(request) {
  let url = new URL(request.url);
  return url.searchParams.delete("_data"), new Request(url.href, request);
}
var init_data = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/data.js"() {
    init_responses();
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/routes.js
function groupRoutesByParentId(manifest) {
  let routes2 = {};
  return Object.values(manifest).forEach((route) => {
    let parentId = route.parentId || "";
    routes2[parentId] || (routes2[parentId] = []), routes2[parentId].push(route);
  }), routes2;
}
function createRoutes(manifest, parentId = "", routesByParentId = groupRoutesByParentId(manifest)) {
  return (routesByParentId[parentId] || []).map((route) => ({
    ...route,
    children: createRoutes(manifest, route.id, routesByParentId)
  }));
}
function createStaticHandlerDataRoutes(manifest, future2, parentId = "", routesByParentId = groupRoutesByParentId(manifest)) {
  return (routesByParentId[parentId] || []).map((route) => {
    let commonRoute = {
      // Always include root due to default boundaries
      hasErrorBoundary: future2.v2_errorBoundary === !0 ? route.id === "root" || route.module.ErrorBoundary != null : route.id === "root" || route.module.CatchBoundary != null || route.module.ErrorBoundary != null,
      id: route.id,
      path: route.path,
      loader: route.module.loader ? (args) => callRouteLoaderRR({
        request: args.request,
        params: args.params,
        loadContext: args.context,
        loader: route.module.loader,
        routeId: route.id
      }) : void 0,
      action: route.module.action ? (args) => callRouteActionRR({
        request: args.request,
        params: args.params,
        loadContext: args.context,
        action: route.module.action,
        routeId: route.id
      }) : void 0,
      handle: route.module.handle
    };
    return route.index ? {
      index: !0,
      ...commonRoute
    } : {
      caseSensitive: route.caseSensitive,
      children: createStaticHandlerDataRoutes(manifest, future2, route.id, routesByParentId),
      ...commonRoute
    };
  });
}
var init_routes = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/routes.js"() {
    init_data();
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/markup.js
function escapeHtml(html) {
  return html.replace(ESCAPE_REGEX, (match) => ESCAPE_LOOKUP[match]);
}
var ESCAPE_LOOKUP, ESCAPE_REGEX, init_markup = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/markup.js"() {
    ESCAPE_LOOKUP = {
      "&": "\\u0026",
      ">": "\\u003e",
      "<": "\\u003c",
      "\u2028": "\\u2028",
      "\u2029": "\\u2029"
    }, ESCAPE_REGEX = /[&><\u2028\u2029]/g;
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/serverHandoff.js
function createServerHandoffString(serverHandoff) {
  return escapeHtml(JSON.stringify(serverHandoff));
}
var init_serverHandoff = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/serverHandoff.js"() {
    init_markup();
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/server.js
async function handleDataRequestRR(serverMode, staticHandler, routeId, request, loadContext, handleError) {
  try {
    let response = await staticHandler.queryRoute(request, {
      routeId,
      requestContext: loadContext
    });
    if (isRedirectResponse2(response)) {
      let headers = new Headers(response.headers);
      return headers.set("X-Remix-Redirect", headers.get("Location")), headers.set("X-Remix-Status", response.status), headers.delete("Location"), response.headers.get("Set-Cookie") !== null && headers.set("X-Remix-Revalidate", "yes"), new Response(null, {
        status: 204,
        headers
      });
    }
    if (UNSAFE_DEFERRED_SYMBOL in response) {
      let deferredData = response[UNSAFE_DEFERRED_SYMBOL], body = createDeferredReadableStream(deferredData, request.signal, serverMode), init = deferredData.init || {}, headers = new Headers(init.headers);
      return headers.set("Content-Type", "text/remix-deferred"), headers.set("X-Remix-Response", "yes"), init.headers = headers, new Response(body, init);
    }
    return response.headers.set("X-Remix-Response", "yes"), response;
  } catch (error) {
    if (isResponse2(error))
      return error.headers.set("X-Remix-Catch", "yes"), error;
    if (isRouteErrorResponse(error))
      return error.error && handleError(error.error), errorResponseToJson(error, serverMode);
    let errorInstance = error instanceof Error ? error : new Error("Unexpected Server Error");
    return handleError(errorInstance), json(serializeError(errorInstance, serverMode), {
      status: 500,
      headers: {
        "X-Remix-Error": "yes"
      }
    });
  }
}
function findParentBoundary(routes2, routeId, error) {
  let route = routes2[routeId] || routes2.root, isCatch = isRouteErrorResponse(error) && (!error.error || error.status === 404);
  return isCatch && route.module.CatchBoundary || !isCatch && route.module.ErrorBoundary || !route.parentId ? route.id : findParentBoundary(routes2, route.parentId, error);
}
function differentiateCatchVersusErrorBoundaries(build, context) {
  if (!context.errors)
    return;
  let errors = {};
  for (let routeId of Object.keys(context.errors)) {
    let error = context.errors[routeId], handlingRouteId = findParentBoundary(build.routes, routeId, error);
    errors[handlingRouteId] = error;
  }
  context.errors = errors;
}
async function handleDocumentRequestRR(serverMode, build, staticHandler, request, loadContext, handleError) {
  let context;
  try {
    context = await staticHandler.query(request, {
      requestContext: loadContext
    });
  } catch (error) {
    return handleError(error), new Response(null, {
      status: 500
    });
  }
  if (isResponse2(context))
    return context;
  context.errors && (Object.values(context.errors).forEach((err) => {
    (!isRouteErrorResponse(err) || err.error) && handleError(err);
  }), context.errors = sanitizeErrors(context.errors, serverMode)), build.future.v2_errorBoundary !== !0 && differentiateCatchVersusErrorBoundaries(build, context);
  let headers = getDocumentHeadersRR(build, context), entryContext = {
    manifest: build.assets,
    routeModules: createEntryRouteModules(build.routes),
    staticHandlerContext: context,
    serverHandoffString: createServerHandoffString({
      url: context.location.pathname,
      state: {
        loaderData: context.loaderData,
        actionData: context.actionData,
        errors: serializeErrors(context.errors, serverMode)
      },
      future: build.future
    }),
    future: build.future,
    serializeError: (err) => serializeError(err, serverMode)
  }, handleDocumentRequestFunction = build.entry.module.default;
  try {
    return await handleDocumentRequestFunction(request, context.statusCode, headers, entryContext, loadContext);
  } catch (error) {
    handleError(error), context = getStaticContextFromError(staticHandler.dataRoutes, context, error), context.errors && (context.errors = sanitizeErrors(context.errors, serverMode)), build.future.v2_errorBoundary !== !0 && differentiateCatchVersusErrorBoundaries(build, context), entryContext = {
      ...entryContext,
      staticHandlerContext: context,
      serverHandoffString: createServerHandoffString({
        url: context.location.pathname,
        state: {
          loaderData: context.loaderData,
          actionData: context.actionData,
          errors: serializeErrors(context.errors, serverMode)
        },
        future: build.future
      })
    };
    try {
      return await handleDocumentRequestFunction(request, context.statusCode, headers, entryContext, loadContext);
    } catch (error2) {
      return handleError(error2), returnLastResortErrorResponse(error2, serverMode);
    }
  }
}
async function handleResourceRequestRR(serverMode, staticHandler, routeId, request, loadContext, handleError) {
  try {
    let response = await staticHandler.queryRoute(request, {
      routeId,
      requestContext: loadContext
    });
    return invariant2(isResponse2(response), "Expected a Response to be returned from queryRoute"), response;
  } catch (error) {
    return isResponse2(error) ? (error.headers.set("X-Remix-Catch", "yes"), error) : isRouteErrorResponse(error) ? (error.error && handleError(error.error), errorResponseToJson(error, serverMode)) : (handleError(error), returnLastResortErrorResponse(error, serverMode));
  }
}
function errorResponseToJson(errorResponse, serverMode) {
  return json(serializeError(errorResponse.error || new Error("Unexpected Server Error"), serverMode), {
    status: errorResponse.status,
    statusText: errorResponse.statusText,
    headers: {
      "X-Remix-Error": "yes"
    }
  });
}
function returnLastResortErrorResponse(error, serverMode) {
  let message = "Unexpected Server Error";
  return serverMode !== ServerMode.Production && (message += `

${String(error)}`), new Response(message, {
    status: 500,
    headers: {
      "Content-Type": "text/plain"
    }
  });
}
var createRequestHandler, init_server = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/server.js"() {
    init_router();
    init_entry();
    init_errors();
    init_headers();
    init_invariant();
    init_mode();
    init_routeMatching();
    init_routes();
    init_responses();
    init_serverHandoff();
    createRequestHandler = (build, mode) => {
      let routes2 = createRoutes(build.routes), dataRoutes = createStaticHandlerDataRoutes(build.routes, build.future), serverMode = isServerMode(mode) ? mode : ServerMode.Production, staticHandler = createStaticHandler(dataRoutes), errorHandler = build.entry.module.handleError || ((error, {
        request
      }) => {
        serverMode !== ServerMode.Test && !request.signal.aborted && console.error(error);
      });
      return async function(request, loadContext = {}) {
        let url = new URL(request.url), matches = matchServerRoutes(routes2, url.pathname), handleError = (error) => errorHandler(error, {
          context: loadContext,
          params: matches && matches.length > 0 ? matches[0].params : {},
          request
        }), response;
        if (url.searchParams.has("_data")) {
          let routeId = url.searchParams.get("_data");
          if (response = await handleDataRequestRR(serverMode, staticHandler, routeId, request, loadContext, handleError), build.entry.module.handleDataRequest) {
            var _matches$find;
            response = await build.entry.module.handleDataRequest(response, {
              context: loadContext,
              params: (matches == null || (_matches$find = matches.find((m) => m.route.id == routeId)) === null || _matches$find === void 0 ? void 0 : _matches$find.params) || {},
              request
            });
          }
        } else
          matches && matches[matches.length - 1].route.module.default == null ? response = await handleResourceRequestRR(serverMode, staticHandler, matches.slice(-1)[0].route.id, request, loadContext, handleError) : response = await handleDocumentRequestRR(serverMode, build, staticHandler, request, loadContext, handleError);
        return request.method === "HEAD" ? new Response(null, {
          headers: response.headers,
          status: response.status,
          statusText: response.statusText
        }) : response;
      };
    };
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/sessions.js
function flash(name) {
  return `__flash_${name}__`;
}
function warnOnceAboutSigningSessionCookie(cookie) {
  warnOnce(cookie.isSigned, `The "${cookie.name}" cookie is not signed, but session cookies should be signed to prevent tampering on the client before they are sent back to the server. See https://remix.run/utils/cookies#signing-cookies for more information.`);
}
var createSession, isSession, createSessionStorageFactory, init_sessions = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/sessions.js"() {
    init_cookies();
    init_warnings();
    createSession = (initialData = {}, id = "") => {
      let map = new Map(Object.entries(initialData));
      return {
        get id() {
          return id;
        },
        get data() {
          return Object.fromEntries(map);
        },
        has(name) {
          return map.has(name) || map.has(flash(name));
        },
        get(name) {
          if (map.has(name))
            return map.get(name);
          let flashName = flash(name);
          if (map.has(flashName)) {
            let value = map.get(flashName);
            return map.delete(flashName), value;
          }
        },
        set(name, value) {
          map.set(name, value);
        },
        flash(name, value) {
          map.set(flash(name), value);
        },
        unset(name) {
          map.delete(name);
        }
      };
    }, isSession = (object) => object != null && typeof object.id == "string" && typeof object.data < "u" && typeof object.has == "function" && typeof object.get == "function" && typeof object.set == "function" && typeof object.flash == "function" && typeof object.unset == "function", createSessionStorageFactory = (createCookie) => ({
      cookie: cookieArg,
      createData,
      readData,
      updateData,
      deleteData
    }) => {
      let cookie = isCookie(cookieArg) ? cookieArg : createCookie((cookieArg == null ? void 0 : cookieArg.name) || "__session", cookieArg);
      return warnOnceAboutSigningSessionCookie(cookie), {
        async getSession(cookieHeader, options) {
          let id = cookieHeader && await cookie.parse(cookieHeader, options), data = id && await readData(id);
          return createSession(data || {}, id || "");
        },
        async commitSession(session, options) {
          let {
            id,
            data
          } = session;
          return id ? await updateData(id, data, cookie.expires) : id = await createData(data, cookie.expires), cookie.serialize(id, options);
        },
        async destroySession(session, options) {
          return await deleteData(session.id), cookie.serialize("", {
            ...options,
            expires: /* @__PURE__ */ new Date(0)
          });
        }
      };
    };
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/sessions/cookieStorage.js
var createCookieSessionStorageFactory, init_cookieStorage = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/sessions/cookieStorage.js"() {
    init_cookies();
    init_sessions();
    createCookieSessionStorageFactory = (createCookie) => ({
      cookie: cookieArg
    } = {}) => {
      let cookie = isCookie(cookieArg) ? cookieArg : createCookie((cookieArg == null ? void 0 : cookieArg.name) || "__session", cookieArg);
      return warnOnceAboutSigningSessionCookie(cookie), {
        async getSession(cookieHeader, options) {
          return createSession(cookieHeader && await cookie.parse(cookieHeader, options) || {});
        },
        async commitSession(session, options) {
          let serializedCookie = await cookie.serialize(session.data, options);
          if (serializedCookie.length > 4096)
            throw new Error("Cookie length will exceed browser maximum. Length: " + serializedCookie.length);
          return serializedCookie;
        },
        async destroySession(_session, options) {
          return cookie.serialize("", {
            ...options,
            expires: /* @__PURE__ */ new Date(0)
          });
        }
      };
    };
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/sessions/memoryStorage.js
var createMemorySessionStorageFactory, init_memoryStorage = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/sessions/memoryStorage.js"() {
    createMemorySessionStorageFactory = (createSessionStorage) => ({
      cookie
    } = {}) => {
      let uniqueId = 0, map = /* @__PURE__ */ new Map();
      return createSessionStorage({
        cookie,
        async createData(data, expires) {
          let id = (++uniqueId).toString();
          return map.set(id, {
            data,
            expires
          }), id;
        },
        async readData(id) {
          if (map.has(id)) {
            let {
              data,
              expires
            } = map.get(id);
            if (!expires || expires > /* @__PURE__ */ new Date())
              return data;
            expires && map.delete(id);
          }
          return null;
        },
        async updateData(id, data, expires) {
          map.set(id, {
            data,
            expires
          });
        },
        async deleteData(id) {
          map.delete(id);
        }
      });
    };
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/upload/errors.js
var MaxPartSizeExceededError, init_errors2 = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/upload/errors.js"() {
    MaxPartSizeExceededError = class extends Error {
      constructor(field, maxBytes) {
        super(`Field "${field}" exceeded upload size of ${maxBytes} bytes.`), this.field = field, this.maxBytes = maxBytes;
      }
    };
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/upload/memoryUploadHandler.js
function createMemoryUploadHandler({
  filter,
  maxPartSize = 3e6
} = {}) {
  return async ({
    filename,
    contentType,
    name,
    data
  }) => {
    if (filter && !await filter({
      filename,
      contentType,
      name
    }))
      return;
    let size = 0, chunks = [];
    for await (let chunk of data) {
      if (size += chunk.byteLength, size > maxPartSize)
        throw new MaxPartSizeExceededError(name, maxPartSize);
      chunks.push(chunk);
    }
    return typeof filename == "string" ? new File(chunks, filename, {
      type: contentType
    }) : await new Blob(chunks, {
      type: contentType
    }).text();
  };
}
var init_memoryUploadHandler = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/upload/memoryUploadHandler.js"() {
    init_errors2();
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/dev.js
async function broadcastDevReady(build, origin) {
  if (origin ?? (origin = ""), !origin)
    throw Error("Dev server origin not set");
  let url = new URL(origin);
  url.pathname = "ping";
  let response = await fetch(url.href, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      buildHash: build.assets.version
    })
  }).catch((error) => {
    throw console.error(`Could not reach Remix dev server at ${url}`), error;
  });
  if (!response.ok)
    throw console.error(`Could not reach Remix dev server at ${url} (${response.status})`), Error(await response.text());
}
function logDevReady(build) {
  console.log(`[REMIX DEV] ${build.assets.version} ready`);
}
var init_dev = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/dev.js"() {
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/index.js
var esm_exports = {};
__export(esm_exports, {
  MaxPartSizeExceededError: () => MaxPartSizeExceededError,
  broadcastDevReady: () => broadcastDevReady,
  createCookieFactory: () => createCookieFactory,
  createCookieSessionStorageFactory: () => createCookieSessionStorageFactory,
  createMemorySessionStorageFactory: () => createMemorySessionStorageFactory,
  createRequestHandler: () => createRequestHandler,
  createSession: () => createSession,
  createSessionStorageFactory: () => createSessionStorageFactory,
  defer: () => defer3,
  isCookie: () => isCookie,
  isSession: () => isSession,
  json: () => json3,
  logDevReady: () => logDevReady,
  redirect: () => redirect3,
  unstable_composeUploadHandlers: () => composeUploadHandlers,
  unstable_createMemoryUploadHandler: () => createMemoryUploadHandler,
  unstable_parseMultipartFormData: () => parseMultipartFormData
});
var init_esm = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/index.js"() {
    init_cookies();
    init_formData();
    init_responses();
    init_server();
    init_sessions();
    init_cookieStorage();
    init_memoryStorage();
    init_memoryUploadHandler();
    init_errors2();
    init_dev();
  }
});

// node_modules/@remix-run/cloudflare/dist/crypto.js
var require_crypto = __commonJS({
  "node_modules/@remix-run/cloudflare/dist/crypto.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var encoder = new TextEncoder(), sign = async (value, secret) => {
      let key = await createKey2(secret, ["sign"]), data = encoder.encode(value), signature = await crypto.subtle.sign("HMAC", key, data), hash = btoa(String.fromCharCode(...new Uint8Array(signature))).replace(/=+$/, "");
      return value + "." + hash;
    }, unsign = async (signed, secret) => {
      let index = signed.lastIndexOf("."), value = signed.slice(0, index), hash = signed.slice(index + 1), key = await createKey2(secret, ["verify"]), data = encoder.encode(value), signature = byteStringToUint8Array(atob(hash));
      return await crypto.subtle.verify("HMAC", key, signature, data) ? value : !1;
    };
    async function createKey2(secret, usages) {
      return await crypto.subtle.importKey("raw", encoder.encode(secret), {
        name: "HMAC",
        hash: "SHA-256"
      }, !1, usages);
    }
    function byteStringToUint8Array(byteString) {
      let array = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++)
        array[i] = byteString.charCodeAt(i);
      return array;
    }
    exports.sign = sign;
    exports.unsign = unsign;
  }
});

// node_modules/@remix-run/cloudflare/dist/implementations.js
var require_implementations = __commonJS({
  "node_modules/@remix-run/cloudflare/dist/implementations.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var serverRuntime = (init_esm(), __toCommonJS(esm_exports)), crypto2 = require_crypto(), createCookie = serverRuntime.createCookieFactory({
      sign: crypto2.sign,
      unsign: crypto2.unsign
    }), createCookieSessionStorage = serverRuntime.createCookieSessionStorageFactory(createCookie), createSessionStorage = serverRuntime.createSessionStorageFactory(createCookie), createMemorySessionStorage = serverRuntime.createMemorySessionStorageFactory(createSessionStorage);
    exports.createCookie = createCookie;
    exports.createCookieSessionStorage = createCookieSessionStorage;
    exports.createMemorySessionStorage = createMemorySessionStorage;
    exports.createSessionStorage = createSessionStorage;
  }
});

// node_modules/@remix-run/cloudflare/dist/sessions/workersKVStorage.js
var require_workersKVStorage = __commonJS({
  "node_modules/@remix-run/cloudflare/dist/sessions/workersKVStorage.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var implementations = require_implementations();
    function createWorkersKVSessionStorage({
      cookie,
      kv
    }) {
      return implementations.createSessionStorage({
        cookie,
        async createData(data, expires) {
          for (; ; ) {
            let randomBytes = new Uint8Array(8);
            crypto.getRandomValues(randomBytes);
            let id = [...randomBytes].map((x) => x.toString(16).padStart(2, "0")).join("");
            if (!await kv.get(id, "json"))
              return await kv.put(id, JSON.stringify(data), {
                expiration: expires ? Math.round(expires.getTime() / 1e3) : void 0
              }), id;
          }
        },
        async readData(id) {
          let session = await kv.get(id);
          return session ? JSON.parse(session) : null;
        },
        async updateData(id, data, expires) {
          await kv.put(id, JSON.stringify(data), {
            expiration: expires ? Math.round(expires.getTime() / 1e3) : void 0
          });
        },
        async deleteData(id) {
          await kv.delete(id);
        }
      });
    }
    exports.createWorkersKVSessionStorage = createWorkersKVSessionStorage;
  }
});

// node_modules/@remix-run/cloudflare/dist/index.js
var require_dist = __commonJS({
  "node_modules/@remix-run/cloudflare/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var workersKVStorage = require_workersKVStorage(), implementations = require_implementations(), serverRuntime = (init_esm(), __toCommonJS(esm_exports)), warn = (fn, message) => (...args) => (console.warn(message), fn(...args)), createCloudflareKVSessionStorage = warn(workersKVStorage.createWorkersKVSessionStorage, "`createCloudflareKVSessionStorage` is deprecated. Please use `createWorkersKVSessionStorage` instead.");
    exports.createWorkersKVSessionStorage = workersKVStorage.createWorkersKVSessionStorage;
    exports.createCookie = implementations.createCookie;
    exports.createCookieSessionStorage = implementations.createCookieSessionStorage;
    exports.createMemorySessionStorage = implementations.createMemorySessionStorage;
    exports.createSessionStorage = implementations.createSessionStorage;
    Object.defineProperty(exports, "MaxPartSizeExceededError", {
      enumerable: !0,
      get: function() {
        return serverRuntime.MaxPartSizeExceededError;
      }
    });
    Object.defineProperty(exports, "broadcastDevReady", {
      enumerable: !0,
      get: function() {
        return serverRuntime.broadcastDevReady;
      }
    });
    Object.defineProperty(exports, "createRequestHandler", {
      enumerable: !0,
      get: function() {
        return serverRuntime.createRequestHandler;
      }
    });
    Object.defineProperty(exports, "createSession", {
      enumerable: !0,
      get: function() {
        return serverRuntime.createSession;
      }
    });
    Object.defineProperty(exports, "defer", {
      enumerable: !0,
      get: function() {
        return serverRuntime.defer;
      }
    });
    Object.defineProperty(exports, "isCookie", {
      enumerable: !0,
      get: function() {
        return serverRuntime.isCookie;
      }
    });
    Object.defineProperty(exports, "isSession", {
      enumerable: !0,
      get: function() {
        return serverRuntime.isSession;
      }
    });
    Object.defineProperty(exports, "json", {
      enumerable: !0,
      get: function() {
        return serverRuntime.json;
      }
    });
    Object.defineProperty(exports, "logDevReady", {
      enumerable: !0,
      get: function() {
        return serverRuntime.logDevReady;
      }
    });
    Object.defineProperty(exports, "redirect", {
      enumerable: !0,
      get: function() {
        return serverRuntime.redirect;
      }
    });
    Object.defineProperty(exports, "unstable_composeUploadHandlers", {
      enumerable: !0,
      get: function() {
        return serverRuntime.unstable_composeUploadHandlers;
      }
    });
    Object.defineProperty(exports, "unstable_createMemoryUploadHandler", {
      enumerable: !0,
      get: function() {
        return serverRuntime.unstable_createMemoryUploadHandler;
      }
    });
    Object.defineProperty(exports, "unstable_parseMultipartFormData", {
      enumerable: !0,
      get: function() {
        return serverRuntime.unstable_parseMultipartFormData;
      }
    });
    exports.createCloudflareKVSessionStorage = createCloudflareKVSessionStorage;
  }
});

// node_modules/react/cjs/react.development.js
var require_react_development = __commonJS({
  "node_modules/react/cjs/react.development.js"(exports, module) {
    "use strict";
    (function() {
      "use strict";
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var ReactVersion = "18.2.0", REACT_ELEMENT_TYPE = Symbol.for("react.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_PROVIDER_TYPE = Symbol.for("react.provider"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        if (maybeIterable === null || typeof maybeIterable != "object")
          return null;
        var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
        return typeof maybeIterator == "function" ? maybeIterator : null;
      }
      var ReactCurrentDispatcher = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, ReactCurrentBatchConfig = {
        transition: null
      }, ReactCurrentActQueue = {
        current: null,
        // Used to reproduce behavior of `batchedUpdates` in legacy mode.
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1
      }, ReactCurrentOwner = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, ReactDebugCurrentFrame = {}, currentExtraStackFrame = null;
      function setExtraStackFrame(stack) {
        currentExtraStackFrame = stack;
      }
      ReactDebugCurrentFrame.setExtraStackFrame = function(stack) {
        currentExtraStackFrame = stack;
      }, ReactDebugCurrentFrame.getCurrentStack = null, ReactDebugCurrentFrame.getStackAddendum = function() {
        var stack = "";
        currentExtraStackFrame && (stack += currentExtraStackFrame);
        var impl = ReactDebugCurrentFrame.getCurrentStack;
        return impl && (stack += impl() || ""), stack;
      };
      var enableScopeAPI = !1, enableCacheElement = !1, enableTransitionTracing = !1, enableLegacyHidden = !1, enableDebugTracing = !1, ReactSharedInternals = {
        ReactCurrentDispatcher,
        ReactCurrentBatchConfig,
        ReactCurrentOwner
      };
      ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame, ReactSharedInternals.ReactCurrentActQueue = ReactCurrentActQueue;
      function warn(format) {
        {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++)
            args[_key - 1] = arguments[_key];
          printWarning("warn", format, args);
        }
      }
      function error(format) {
        {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++)
            args[_key2 - 1] = arguments[_key2];
          printWarning("error", format, args);
        }
      }
      function printWarning(level, format, args) {
        {
          var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame, stack = ReactDebugCurrentFrame2.getStackAddendum();
          stack !== "" && (format += "%s", args = args.concat([stack]));
          var argsWithFormat = args.map(function(item) {
            return String(item);
          });
          argsWithFormat.unshift("Warning: " + format), Function.prototype.apply.call(console[level], console, argsWithFormat);
        }
      }
      var didWarnStateUpdateForUnmountedComponent = {};
      function warnNoop(publicInstance, callerName) {
        {
          var _constructor = publicInstance.constructor, componentName = _constructor && (_constructor.displayName || _constructor.name) || "ReactClass", warningKey = componentName + "." + callerName;
          if (didWarnStateUpdateForUnmountedComponent[warningKey])
            return;
          error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, componentName), didWarnStateUpdateForUnmountedComponent[warningKey] = !0;
        }
      }
      var ReactNoopUpdateQueue = {
        /**
         * Checks whether or not this composite component is mounted.
         * @param {ReactClass} publicInstance The instance we want to test.
         * @return {boolean} True if mounted, false otherwise.
         * @protected
         * @final
         */
        isMounted: function(publicInstance) {
          return !1;
        },
        /**
         * Forces an update. This should only be invoked when it is known with
         * certainty that we are **not** in a DOM transaction.
         *
         * You may want to call this when you know that some deeper aspect of the
         * component's state has changed but `setState` was not called.
         *
         * This will not invoke `shouldComponentUpdate`, but it will invoke
         * `componentWillUpdate` and `componentDidUpdate`.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueForceUpdate: function(publicInstance, callback, callerName) {
          warnNoop(publicInstance, "forceUpdate");
        },
        /**
         * Replaces all of the state. Always use this or `setState` to mutate state.
         * You should treat `this.state` as immutable.
         *
         * There is no guarantee that `this.state` will be immediately updated, so
         * accessing `this.state` after calling this method may return the old value.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} completeState Next state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueReplaceState: function(publicInstance, completeState, callback, callerName) {
          warnNoop(publicInstance, "replaceState");
        },
        /**
         * Sets a subset of the state. This only exists because _pendingState is
         * internal. This provides a merging strategy that is not available to deep
         * properties which is confusing. TODO: Expose pendingState or don't use it
         * during the merge.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} partialState Next partial state to be merged with state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} Name of the calling function in the public API.
         * @internal
         */
        enqueueSetState: function(publicInstance, partialState, callback, callerName) {
          warnNoop(publicInstance, "setState");
        }
      }, assign = Object.assign, emptyObject = {};
      Object.freeze(emptyObject);
      function Component2(props, context, updater) {
        this.props = props, this.context = context, this.refs = emptyObject, this.updater = updater || ReactNoopUpdateQueue;
      }
      Component2.prototype.isReactComponent = {}, Component2.prototype.setState = function(partialState, callback) {
        if (typeof partialState != "object" && typeof partialState != "function" && partialState != null)
          throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, partialState, callback, "setState");
      }, Component2.prototype.forceUpdate = function(callback) {
        this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
      };
      {
        var deprecatedAPIs = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, defineDeprecationWarning = function(methodName, info) {
          Object.defineProperty(Component2.prototype, methodName, {
            get: function() {
              warn("%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
            }
          });
        };
        for (var fnName in deprecatedAPIs)
          deprecatedAPIs.hasOwnProperty(fnName) && defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
      }
      function ComponentDummy() {
      }
      ComponentDummy.prototype = Component2.prototype;
      function PureComponent(props, context, updater) {
        this.props = props, this.context = context, this.refs = emptyObject, this.updater = updater || ReactNoopUpdateQueue;
      }
      var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
      pureComponentPrototype.constructor = PureComponent, assign(pureComponentPrototype, Component2.prototype), pureComponentPrototype.isPureReactComponent = !0;
      function createRef() {
        var refObject = {
          current: null
        };
        return Object.seal(refObject), refObject;
      }
      var isArrayImpl = Array.isArray;
      function isArray(a) {
        return isArrayImpl(a);
      }
      function typeName(value) {
        {
          var hasToStringTag = typeof Symbol == "function" && Symbol.toStringTag, type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          return type;
        }
      }
      function willCoercionThrow(value) {
        try {
          return testStringCoercion(value), !1;
        } catch {
          return !0;
        }
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkKeyStringCoercion(value) {
        if (willCoercionThrow(value))
          return error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value)), testStringCoercion(value);
      }
      function getWrappedName(outerType, innerType, wrapperName) {
        var displayName = outerType.displayName;
        if (displayName)
          return displayName;
        var functionName = innerType.displayName || innerType.name || "";
        return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
      }
      function getContextName(type) {
        return type.displayName || "Context";
      }
      function getComponentNameFromType(type) {
        if (type == null)
          return null;
        if (typeof type.tag == "number" && error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof type == "function")
          return type.displayName || type.name || null;
        if (typeof type == "string")
          return type;
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
        }
        if (typeof type == "object")
          switch (type.$$typeof) {
            case REACT_CONTEXT_TYPE:
              var context = type;
              return getContextName(context) + ".Consumer";
            case REACT_PROVIDER_TYPE:
              var provider = type;
              return getContextName(provider._context) + ".Provider";
            case REACT_FORWARD_REF_TYPE:
              return getWrappedName(type, type.render, "ForwardRef");
            case REACT_MEMO_TYPE:
              var outerName = type.displayName || null;
              return outerName !== null ? outerName : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE: {
              var lazyComponent = type, payload = lazyComponent._payload, init = lazyComponent._init;
              try {
                return getComponentNameFromType(init(payload));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var hasOwnProperty = Object.prototype.hasOwnProperty, RESERVED_PROPS = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
      didWarnAboutStringRefs = {};
      function hasValidRef(config) {
        if (hasOwnProperty.call(config, "ref")) {
          var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
          if (getter && getter.isReactWarning)
            return !1;
        }
        return config.ref !== void 0;
      }
      function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
          var getter = Object.getOwnPropertyDescriptor(config, "key").get;
          if (getter && getter.isReactWarning)
            return !1;
        }
        return config.key !== void 0;
      }
      function defineKeyPropWarningGetter(props, displayName) {
        var warnAboutAccessingKey = function() {
          specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName));
        };
        warnAboutAccessingKey.isReactWarning = !0, Object.defineProperty(props, "key", {
          get: warnAboutAccessingKey,
          configurable: !0
        });
      }
      function defineRefPropWarningGetter(props, displayName) {
        var warnAboutAccessingRef = function() {
          specialPropRefWarningShown || (specialPropRefWarningShown = !0, error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName));
        };
        warnAboutAccessingRef.isReactWarning = !0, Object.defineProperty(props, "ref", {
          get: warnAboutAccessingRef,
          configurable: !0
        });
      }
      function warnIfStringRefCannotBeAutoConverted(config) {
        if (typeof config.ref == "string" && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
          var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
          didWarnAboutStringRefs[componentName] || (error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', componentName, config.ref), didWarnAboutStringRefs[componentName] = !0);
        }
      }
      var ReactElement = function(type, key, ref, self2, source, owner, props) {
        var element = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: REACT_ELEMENT_TYPE,
          // Built-in properties that belong on the element
          type,
          key,
          ref,
          props,
          // Record the component responsible for creating this element.
          _owner: owner
        };
        return element._store = {}, Object.defineProperty(element._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(element, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: self2
        }), Object.defineProperty(element, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: source
        }), Object.freeze && (Object.freeze(element.props), Object.freeze(element)), element;
      };
      function createElement7(type, config, children) {
        var propName, props = {}, key = null, ref = null, self2 = null, source = null;
        if (config != null) {
          hasValidRef(config) && (ref = config.ref, warnIfStringRefCannotBeAutoConverted(config)), hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key), self2 = config.__self === void 0 ? null : config.__self, source = config.__source === void 0 ? null : config.__source;
          for (propName in config)
            hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName) && (props[propName] = config[propName]);
        }
        var childrenLength = arguments.length - 2;
        if (childrenLength === 1)
          props.children = children;
        else if (childrenLength > 1) {
          for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++)
            childArray[i] = arguments[i + 2];
          Object.freeze && Object.freeze(childArray), props.children = childArray;
        }
        if (type && type.defaultProps) {
          var defaultProps = type.defaultProps;
          for (propName in defaultProps)
            props[propName] === void 0 && (props[propName] = defaultProps[propName]);
        }
        if (key || ref) {
          var displayName = typeof type == "function" ? type.displayName || type.name || "Unknown" : type;
          key && defineKeyPropWarningGetter(props, displayName), ref && defineRefPropWarningGetter(props, displayName);
        }
        return ReactElement(type, key, ref, self2, source, ReactCurrentOwner.current, props);
      }
      function cloneAndReplaceKey(oldElement, newKey) {
        var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
        return newElement;
      }
      function cloneElement(element, config, children) {
        if (element == null)
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
        var propName, props = assign({}, element.props), key = element.key, ref = element.ref, self2 = element._self, source = element._source, owner = element._owner;
        if (config != null) {
          hasValidRef(config) && (ref = config.ref, owner = ReactCurrentOwner.current), hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key);
          var defaultProps;
          element.type && element.type.defaultProps && (defaultProps = element.type.defaultProps);
          for (propName in config)
            hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName) && (config[propName] === void 0 && defaultProps !== void 0 ? props[propName] = defaultProps[propName] : props[propName] = config[propName]);
        }
        var childrenLength = arguments.length - 2;
        if (childrenLength === 1)
          props.children = children;
        else if (childrenLength > 1) {
          for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++)
            childArray[i] = arguments[i + 2];
          props.children = childArray;
        }
        return ReactElement(element.type, key, ref, self2, source, owner, props);
      }
      function isValidElement2(object) {
        return typeof object == "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      var SEPARATOR = ".", SUBSEPARATOR = ":";
      function escape2(key) {
        var escapeRegex = /[=:]/g, escaperLookup = {
          "=": "=0",
          ":": "=2"
        }, escapedString = key.replace(escapeRegex, function(match) {
          return escaperLookup[match];
        });
        return "$" + escapedString;
      }
      var didWarnAboutMaps = !1, userProvidedKeyEscapeRegex = /\/+/g;
      function escapeUserProvidedKey(text) {
        return text.replace(userProvidedKeyEscapeRegex, "$&/");
      }
      function getElementKey(element, index) {
        return typeof element == "object" && element !== null && element.key != null ? (checkKeyStringCoercion(element.key), escape2("" + element.key)) : index.toString(36);
      }
      function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
        var type = typeof children;
        (type === "undefined" || type === "boolean") && (children = null);
        var invokeCallback = !1;
        if (children === null)
          invokeCallback = !0;
        else
          switch (type) {
            case "string":
            case "number":
              invokeCallback = !0;
              break;
            case "object":
              switch (children.$$typeof) {
                case REACT_ELEMENT_TYPE:
                case REACT_PORTAL_TYPE:
                  invokeCallback = !0;
              }
          }
        if (invokeCallback) {
          var _child = children, mappedChild = callback(_child), childKey = nameSoFar === "" ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;
          if (isArray(mappedChild)) {
            var escapedChildKey = "";
            childKey != null && (escapedChildKey = escapeUserProvidedKey(childKey) + "/"), mapIntoArray(mappedChild, array, escapedChildKey, "", function(c) {
              return c;
            });
          } else
            mappedChild != null && (isValidElement2(mappedChild) && (mappedChild.key && (!_child || _child.key !== mappedChild.key) && checkKeyStringCoercion(mappedChild.key), mappedChild = cloneAndReplaceKey(
              mappedChild,
              // Keep both the (mapped) and old keys if they differ, just as
              // traverseAllChildren used to do for objects as children
              escapedPrefix + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
              (mappedChild.key && (!_child || _child.key !== mappedChild.key) ? (
                // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
                // eslint-disable-next-line react-internal/safe-string-coercion
                escapeUserProvidedKey("" + mappedChild.key) + "/"
              ) : "") + childKey
            )), array.push(mappedChild));
          return 1;
        }
        var child, nextName, subtreeCount = 0, nextNamePrefix = nameSoFar === "" ? SEPARATOR : nameSoFar + SUBSEPARATOR;
        if (isArray(children))
          for (var i = 0; i < children.length; i++)
            child = children[i], nextName = nextNamePrefix + getElementKey(child, i), subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
        else {
          var iteratorFn = getIteratorFn(children);
          if (typeof iteratorFn == "function") {
            var iterableChildren = children;
            iteratorFn === iterableChildren.entries && (didWarnAboutMaps || warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), didWarnAboutMaps = !0);
            for (var iterator = iteratorFn.call(iterableChildren), step, ii = 0; !(step = iterator.next()).done; )
              child = step.value, nextName = nextNamePrefix + getElementKey(child, ii++), subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
          } else if (type === "object") {
            var childrenString = String(children);
            throw new Error("Objects are not valid as a React child (found: " + (childrenString === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : childrenString) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return subtreeCount;
      }
      function mapChildren(children, func, context) {
        if (children == null)
          return children;
        var result = [], count = 0;
        return mapIntoArray(children, result, "", "", function(child) {
          return func.call(context, child, count++);
        }), result;
      }
      function countChildren(children) {
        var n = 0;
        return mapChildren(children, function() {
          n++;
        }), n;
      }
      function forEachChildren(children, forEachFunc, forEachContext) {
        mapChildren(children, function() {
          forEachFunc.apply(this, arguments);
        }, forEachContext);
      }
      function toArray(children) {
        return mapChildren(children, function(child) {
          return child;
        }) || [];
      }
      function onlyChild(children) {
        if (!isValidElement2(children))
          throw new Error("React.Children.only expected to receive a single React element child.");
        return children;
      }
      function createContext3(defaultValue) {
        var context = {
          $$typeof: REACT_CONTEXT_TYPE,
          // As a workaround to support multiple concurrent renderers, we categorize
          // some renderers as primary and others as secondary. We only expect
          // there to be two concurrent renderers at most: React Native (primary) and
          // Fabric (secondary); React DOM (primary) and React ART (secondary).
          // Secondary renderers store their context values on separate fields.
          _currentValue: defaultValue,
          _currentValue2: defaultValue,
          // Used to track how many concurrent renderers this context currently
          // supports within in a single renderer. Such as parallel server rendering.
          _threadCount: 0,
          // These are circular
          Provider: null,
          Consumer: null,
          // Add these to use same hidden class in VM as ServerContext
          _defaultValue: null,
          _globalName: null
        };
        context.Provider = {
          $$typeof: REACT_PROVIDER_TYPE,
          _context: context
        };
        var hasWarnedAboutUsingNestedContextConsumers = !1, hasWarnedAboutUsingConsumerProvider = !1, hasWarnedAboutDisplayNameOnConsumer = !1;
        {
          var Consumer = {
            $$typeof: REACT_CONTEXT_TYPE,
            _context: context
          };
          Object.defineProperties(Consumer, {
            Provider: {
              get: function() {
                return hasWarnedAboutUsingConsumerProvider || (hasWarnedAboutUsingConsumerProvider = !0, error("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), context.Provider;
              },
              set: function(_Provider) {
                context.Provider = _Provider;
              }
            },
            _currentValue: {
              get: function() {
                return context._currentValue;
              },
              set: function(_currentValue) {
                context._currentValue = _currentValue;
              }
            },
            _currentValue2: {
              get: function() {
                return context._currentValue2;
              },
              set: function(_currentValue2) {
                context._currentValue2 = _currentValue2;
              }
            },
            _threadCount: {
              get: function() {
                return context._threadCount;
              },
              set: function(_threadCount) {
                context._threadCount = _threadCount;
              }
            },
            Consumer: {
              get: function() {
                return hasWarnedAboutUsingNestedContextConsumers || (hasWarnedAboutUsingNestedContextConsumers = !0, error("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), context.Consumer;
              }
            },
            displayName: {
              get: function() {
                return context.displayName;
              },
              set: function(displayName) {
                hasWarnedAboutDisplayNameOnConsumer || (warn("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", displayName), hasWarnedAboutDisplayNameOnConsumer = !0);
              }
            }
          }), context.Consumer = Consumer;
        }
        return context._currentRenderer = null, context._currentRenderer2 = null, context;
      }
      var Uninitialized = -1, Pending = 0, Resolved = 1, Rejected = 2;
      function lazyInitializer(payload) {
        if (payload._status === Uninitialized) {
          var ctor = payload._result, thenable = ctor();
          if (thenable.then(function(moduleObject2) {
            if (payload._status === Pending || payload._status === Uninitialized) {
              var resolved = payload;
              resolved._status = Resolved, resolved._result = moduleObject2;
            }
          }, function(error2) {
            if (payload._status === Pending || payload._status === Uninitialized) {
              var rejected = payload;
              rejected._status = Rejected, rejected._result = error2;
            }
          }), payload._status === Uninitialized) {
            var pending = payload;
            pending._status = Pending, pending._result = thenable;
          }
        }
        if (payload._status === Resolved) {
          var moduleObject = payload._result;
          return moduleObject === void 0 && error(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, moduleObject), "default" in moduleObject || error(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, moduleObject), moduleObject.default;
        } else
          throw payload._result;
      }
      function lazy(ctor) {
        var payload = {
          // We use these fields to store the result.
          _status: Uninitialized,
          _result: ctor
        }, lazyType = {
          $$typeof: REACT_LAZY_TYPE,
          _payload: payload,
          _init: lazyInitializer
        };
        {
          var defaultProps, propTypes;
          Object.defineProperties(lazyType, {
            defaultProps: {
              configurable: !0,
              get: function() {
                return defaultProps;
              },
              set: function(newDefaultProps) {
                error("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), defaultProps = newDefaultProps, Object.defineProperty(lazyType, "defaultProps", {
                  enumerable: !0
                });
              }
            },
            propTypes: {
              configurable: !0,
              get: function() {
                return propTypes;
              },
              set: function(newPropTypes) {
                error("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), propTypes = newPropTypes, Object.defineProperty(lazyType, "propTypes", {
                  enumerable: !0
                });
              }
            }
          });
        }
        return lazyType;
      }
      function forwardRef3(render) {
        render != null && render.$$typeof === REACT_MEMO_TYPE ? error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof render != "function" ? error("forwardRef requires a render function but was given %s.", render === null ? "null" : typeof render) : render.length !== 0 && render.length !== 2 && error("forwardRef render functions accept exactly two parameters: props and ref. %s", render.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), render != null && (render.defaultProps != null || render.propTypes != null) && error("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var elementType = {
          $$typeof: REACT_FORWARD_REF_TYPE,
          render
        };
        {
          var ownName;
          Object.defineProperty(elementType, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return ownName;
            },
            set: function(name) {
              ownName = name, !render.name && !render.displayName && (render.displayName = name);
            }
          });
        }
        return elementType;
      }
      var REACT_MODULE_REFERENCE;
      REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
      function isValidElementType(type) {
        return !!(typeof type == "string" || typeof type == "function" || type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing || typeof type == "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0));
      }
      function memo(type, compare) {
        isValidElementType(type) || error("memo: The first argument must be a component. Instead received: %s", type === null ? "null" : typeof type);
        var elementType = {
          $$typeof: REACT_MEMO_TYPE,
          type,
          compare: compare === void 0 ? null : compare
        };
        {
          var ownName;
          Object.defineProperty(elementType, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return ownName;
            },
            set: function(name) {
              ownName = name, !type.name && !type.displayName && (type.displayName = name);
            }
          });
        }
        return elementType;
      }
      function resolveDispatcher() {
        var dispatcher = ReactCurrentDispatcher.current;
        return dispatcher === null && error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), dispatcher;
      }
      function useContext5(Context) {
        var dispatcher = resolveDispatcher();
        if (Context._context !== void 0) {
          var realContext = Context._context;
          realContext.Consumer === Context ? error("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : realContext.Provider === Context && error("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return dispatcher.useContext(Context);
      }
      function useState6(initialState) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useState(initialState);
      }
      function useReducer(reducer, initialArg, init) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useReducer(reducer, initialArg, init);
      }
      function useRef5(initialValue) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useRef(initialValue);
      }
      function useEffect5(create, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useEffect(create, deps);
      }
      function useInsertionEffect(create, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useInsertionEffect(create, deps);
      }
      function useLayoutEffect3(create, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useLayoutEffect(create, deps);
      }
      function useCallback3(callback, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useCallback(callback, deps);
      }
      function useMemo5(create, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useMemo(create, deps);
      }
      function useImperativeHandle(ref, create, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useImperativeHandle(ref, create, deps);
      }
      function useDebugValue(value, formatterFn) {
        {
          var dispatcher = resolveDispatcher();
          return dispatcher.useDebugValue(value, formatterFn);
        }
      }
      function useTransition2() {
        var dispatcher = resolveDispatcher();
        return dispatcher.useTransition();
      }
      function useDeferredValue(value) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useDeferredValue(value);
      }
      function useId() {
        var dispatcher = resolveDispatcher();
        return dispatcher.useId();
      }
      function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
      }
      var disabledDepth = 0, prevLog, prevInfo, prevWarn, prevError, prevGroup, prevGroupCollapsed, prevGroupEnd;
      function disabledLog() {
      }
      disabledLog.__reactDisabledLog = !0;
      function disableLogs() {
        {
          if (disabledDepth === 0) {
            prevLog = console.log, prevInfo = console.info, prevWarn = console.warn, prevError = console.error, prevGroup = console.group, prevGroupCollapsed = console.groupCollapsed, prevGroupEnd = console.groupEnd;
            var props = {
              configurable: !0,
              enumerable: !0,
              value: disabledLog,
              writable: !0
            };
            Object.defineProperties(console, {
              info: props,
              log: props,
              warn: props,
              error: props,
              group: props,
              groupCollapsed: props,
              groupEnd: props
            });
          }
          disabledDepth++;
        }
      }
      function reenableLogs() {
        {
          if (disabledDepth--, disabledDepth === 0) {
            var props = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: assign({}, props, {
                value: prevLog
              }),
              info: assign({}, props, {
                value: prevInfo
              }),
              warn: assign({}, props, {
                value: prevWarn
              }),
              error: assign({}, props, {
                value: prevError
              }),
              group: assign({}, props, {
                value: prevGroup
              }),
              groupCollapsed: assign({}, props, {
                value: prevGroupCollapsed
              }),
              groupEnd: assign({}, props, {
                value: prevGroupEnd
              })
            });
          }
          disabledDepth < 0 && error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher, prefix;
      function describeBuiltInComponentFrame(name, source, ownerFn) {
        {
          if (prefix === void 0)
            try {
              throw Error();
            } catch (x) {
              var match = x.stack.trim().match(/\n( *(at )?)/);
              prefix = match && match[1] || "";
            }
          return `
` + prefix + name;
        }
      }
      var reentry = !1, componentFrameCache;
      {
        var PossiblyWeakMap = typeof WeakMap == "function" ? WeakMap : Map;
        componentFrameCache = new PossiblyWeakMap();
      }
      function describeNativeComponentFrame(fn, construct) {
        if (!fn || reentry)
          return "";
        {
          var frame = componentFrameCache.get(fn);
          if (frame !== void 0)
            return frame;
        }
        var control;
        reentry = !0;
        var previousPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var previousDispatcher;
        previousDispatcher = ReactCurrentDispatcher$1.current, ReactCurrentDispatcher$1.current = null, disableLogs();
        try {
          if (construct) {
            var Fake = function() {
              throw Error();
            };
            if (Object.defineProperty(Fake.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(Fake, []);
              } catch (x) {
                control = x;
              }
              Reflect.construct(fn, [], Fake);
            } else {
              try {
                Fake.call();
              } catch (x) {
                control = x;
              }
              fn.call(Fake.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (x) {
              control = x;
            }
            fn();
          }
        } catch (sample) {
          if (sample && control && typeof sample.stack == "string") {
            for (var sampleLines = sample.stack.split(`
`), controlLines = control.stack.split(`
`), s = sampleLines.length - 1, c = controlLines.length - 1; s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]; )
              c--;
            for (; s >= 1 && c >= 0; s--, c--)
              if (sampleLines[s] !== controlLines[c]) {
                if (s !== 1 || c !== 1)
                  do
                    if (s--, c--, c < 0 || sampleLines[s] !== controlLines[c]) {
                      var _frame = `
` + sampleLines[s].replace(" at new ", " at ");
                      return fn.displayName && _frame.includes("<anonymous>") && (_frame = _frame.replace("<anonymous>", fn.displayName)), typeof fn == "function" && componentFrameCache.set(fn, _frame), _frame;
                    }
                  while (s >= 1 && c >= 0);
                break;
              }
          }
        } finally {
          reentry = !1, ReactCurrentDispatcher$1.current = previousDispatcher, reenableLogs(), Error.prepareStackTrace = previousPrepareStackTrace;
        }
        var name = fn ? fn.displayName || fn.name : "", syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
        return typeof fn == "function" && componentFrameCache.set(fn, syntheticFrame), syntheticFrame;
      }
      function describeFunctionComponentFrame(fn, source, ownerFn) {
        return describeNativeComponentFrame(fn, !1);
      }
      function shouldConstruct(Component3) {
        var prototype = Component3.prototype;
        return !!(prototype && prototype.isReactComponent);
      }
      function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
        if (type == null)
          return "";
        if (typeof type == "function")
          return describeNativeComponentFrame(type, shouldConstruct(type));
        if (typeof type == "string")
          return describeBuiltInComponentFrame(type);
        switch (type) {
          case REACT_SUSPENSE_TYPE:
            return describeBuiltInComponentFrame("Suspense");
          case REACT_SUSPENSE_LIST_TYPE:
            return describeBuiltInComponentFrame("SuspenseList");
        }
        if (typeof type == "object")
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE:
              return describeFunctionComponentFrame(type.render);
            case REACT_MEMO_TYPE:
              return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
            case REACT_LAZY_TYPE: {
              var lazyComponent = type, payload = lazyComponent._payload, init = lazyComponent._init;
              try {
                return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
              } catch {
              }
            }
          }
        return "";
      }
      var loggedTypeFailures = {}, ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement(element) {
        if (element) {
          var owner = element._owner, stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
          ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
        } else
          ReactDebugCurrentFrame$1.setExtraStackFrame(null);
      }
      function checkPropTypes(typeSpecs, values, location2, componentName, element) {
        {
          var has = Function.call.bind(hasOwnProperty);
          for (var typeSpecName in typeSpecs)
            if (has(typeSpecs, typeSpecName)) {
              var error$1 = void 0;
              try {
                if (typeof typeSpecs[typeSpecName] != "function") {
                  var err = Error((componentName || "React class") + ": " + location2 + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw err.name = "Invariant Violation", err;
                }
                error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location2, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (ex) {
                error$1 = ex;
              }
              error$1 && !(error$1 instanceof Error) && (setCurrentlyValidatingElement(element), error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location2, typeSpecName, typeof error$1), setCurrentlyValidatingElement(null)), error$1 instanceof Error && !(error$1.message in loggedTypeFailures) && (loggedTypeFailures[error$1.message] = !0, setCurrentlyValidatingElement(element), error("Failed %s type: %s", location2, error$1.message), setCurrentlyValidatingElement(null));
            }
        }
      }
      function setCurrentlyValidatingElement$1(element) {
        if (element) {
          var owner = element._owner, stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
          setExtraStackFrame(stack);
        } else
          setExtraStackFrame(null);
      }
      var propTypesMisspellWarningShown;
      propTypesMisspellWarningShown = !1;
      function getDeclarationErrorAddendum() {
        if (ReactCurrentOwner.current) {
          var name = getComponentNameFromType(ReactCurrentOwner.current.type);
          if (name)
            return `

Check the render method of \`` + name + "`.";
        }
        return "";
      }
      function getSourceInfoErrorAddendum(source) {
        if (source !== void 0) {
          var fileName = source.fileName.replace(/^.*[\\\/]/, ""), lineNumber = source.lineNumber;
          return `

Check your code at ` + fileName + ":" + lineNumber + ".";
        }
        return "";
      }
      function getSourceInfoErrorAddendumForProps(elementProps) {
        return elementProps != null ? getSourceInfoErrorAddendum(elementProps.__source) : "";
      }
      var ownerHasKeyUseWarning = {};
      function getCurrentComponentErrorInfo(parentType) {
        var info = getDeclarationErrorAddendum();
        if (!info) {
          var parentName = typeof parentType == "string" ? parentType : parentType.displayName || parentType.name;
          parentName && (info = `

Check the top-level render call using <` + parentName + ">.");
        }
        return info;
      }
      function validateExplicitKey(element, parentType) {
        if (!(!element._store || element._store.validated || element.key != null)) {
          element._store.validated = !0;
          var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
          if (!ownerHasKeyUseWarning[currentComponentErrorInfo]) {
            ownerHasKeyUseWarning[currentComponentErrorInfo] = !0;
            var childOwner = "";
            element && element._owner && element._owner !== ReactCurrentOwner.current && (childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + "."), setCurrentlyValidatingElement$1(element), error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner), setCurrentlyValidatingElement$1(null);
          }
        }
      }
      function validateChildKeys(node, parentType) {
        if (typeof node == "object") {
          if (isArray(node))
            for (var i = 0; i < node.length; i++) {
              var child = node[i];
              isValidElement2(child) && validateExplicitKey(child, parentType);
            }
          else if (isValidElement2(node))
            node._store && (node._store.validated = !0);
          else if (node) {
            var iteratorFn = getIteratorFn(node);
            if (typeof iteratorFn == "function" && iteratorFn !== node.entries)
              for (var iterator = iteratorFn.call(node), step; !(step = iterator.next()).done; )
                isValidElement2(step.value) && validateExplicitKey(step.value, parentType);
          }
        }
      }
      function validatePropTypes(element) {
        {
          var type = element.type;
          if (type == null || typeof type == "string")
            return;
          var propTypes;
          if (typeof type == "function")
            propTypes = type.propTypes;
          else if (typeof type == "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          type.$$typeof === REACT_MEMO_TYPE))
            propTypes = type.propTypes;
          else
            return;
          if (propTypes) {
            var name = getComponentNameFromType(type);
            checkPropTypes(propTypes, element.props, "prop", name, element);
          } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
            propTypesMisspellWarningShown = !0;
            var _name = getComponentNameFromType(type);
            error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
          }
          typeof type.getDefaultProps == "function" && !type.getDefaultProps.isReactClassApproved && error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function validateFragmentProps(fragment) {
        {
          for (var keys = Object.keys(fragment.props), i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (key !== "children" && key !== "key") {
              setCurrentlyValidatingElement$1(fragment), error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key), setCurrentlyValidatingElement$1(null);
              break;
            }
          }
          fragment.ref !== null && (setCurrentlyValidatingElement$1(fragment), error("Invalid attribute `ref` supplied to `React.Fragment`."), setCurrentlyValidatingElement$1(null));
        }
      }
      function createElementWithValidation(type, props, children) {
        var validType = isValidElementType(type);
        if (!validType) {
          var info = "";
          (type === void 0 || typeof type == "object" && type !== null && Object.keys(type).length === 0) && (info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var sourceInfo = getSourceInfoErrorAddendumForProps(props);
          sourceInfo ? info += sourceInfo : info += getDeclarationErrorAddendum();
          var typeString;
          type === null ? typeString = "null" : isArray(type) ? typeString = "array" : type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE ? (typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />", info = " Did you accidentally export a JSX literal instead of a component?") : typeString = typeof type, error("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
        }
        var element = createElement7.apply(this, arguments);
        if (element == null)
          return element;
        if (validType)
          for (var i = 2; i < arguments.length; i++)
            validateChildKeys(arguments[i], type);
        return type === REACT_FRAGMENT_TYPE ? validateFragmentProps(element) : validatePropTypes(element), element;
      }
      var didWarnAboutDeprecatedCreateFactory = !1;
      function createFactoryWithValidation(type) {
        var validatedFactory = createElementWithValidation.bind(null, type);
        return validatedFactory.type = type, didWarnAboutDeprecatedCreateFactory || (didWarnAboutDeprecatedCreateFactory = !0, warn("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(validatedFactory, "type", {
          enumerable: !1,
          get: function() {
            return warn("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: type
            }), type;
          }
        }), validatedFactory;
      }
      function cloneElementWithValidation(element, props, children) {
        for (var newElement = cloneElement.apply(this, arguments), i = 2; i < arguments.length; i++)
          validateChildKeys(arguments[i], newElement.type);
        return validatePropTypes(newElement), newElement;
      }
      function startTransition(scope, options) {
        var prevTransition = ReactCurrentBatchConfig.transition;
        ReactCurrentBatchConfig.transition = {};
        var currentTransition = ReactCurrentBatchConfig.transition;
        ReactCurrentBatchConfig.transition._updatedFibers = /* @__PURE__ */ new Set();
        try {
          scope();
        } finally {
          if (ReactCurrentBatchConfig.transition = prevTransition, prevTransition === null && currentTransition._updatedFibers) {
            var updatedFibersCount = currentTransition._updatedFibers.size;
            updatedFibersCount > 10 && warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), currentTransition._updatedFibers.clear();
          }
        }
      }
      var didWarnAboutMessageChannel = !1, enqueueTaskImpl = null;
      function enqueueTask(task) {
        if (enqueueTaskImpl === null)
          try {
            var requireString = ("require" + Math.random()).slice(0, 7), nodeRequire = module && module[requireString];
            enqueueTaskImpl = nodeRequire.call(module, "timers").setImmediate;
          } catch {
            enqueueTaskImpl = function(callback) {
              didWarnAboutMessageChannel === !1 && (didWarnAboutMessageChannel = !0, typeof MessageChannel > "u" && error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
              var channel = new MessageChannel();
              channel.port1.onmessage = callback, channel.port2.postMessage(void 0);
            };
          }
        return enqueueTaskImpl(task);
      }
      var actScopeDepth = 0, didWarnNoAwaitAct = !1;
      function act(callback) {
        {
          var prevActScopeDepth = actScopeDepth;
          actScopeDepth++, ReactCurrentActQueue.current === null && (ReactCurrentActQueue.current = []);
          var prevIsBatchingLegacy = ReactCurrentActQueue.isBatchingLegacy, result;
          try {
            if (ReactCurrentActQueue.isBatchingLegacy = !0, result = callback(), !prevIsBatchingLegacy && ReactCurrentActQueue.didScheduleLegacyUpdate) {
              var queue = ReactCurrentActQueue.current;
              queue !== null && (ReactCurrentActQueue.didScheduleLegacyUpdate = !1, flushActQueue(queue));
            }
          } catch (error2) {
            throw popActScope(prevActScopeDepth), error2;
          } finally {
            ReactCurrentActQueue.isBatchingLegacy = prevIsBatchingLegacy;
          }
          if (result !== null && typeof result == "object" && typeof result.then == "function") {
            var thenableResult = result, wasAwaited = !1, thenable = {
              then: function(resolve, reject) {
                wasAwaited = !0, thenableResult.then(function(returnValue2) {
                  popActScope(prevActScopeDepth), actScopeDepth === 0 ? recursivelyFlushAsyncActWork(returnValue2, resolve, reject) : resolve(returnValue2);
                }, function(error2) {
                  popActScope(prevActScopeDepth), reject(error2);
                });
              }
            };
            return !didWarnNoAwaitAct && typeof Promise < "u" && Promise.resolve().then(function() {
            }).then(function() {
              wasAwaited || (didWarnNoAwaitAct = !0, error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            }), thenable;
          } else {
            var returnValue = result;
            if (popActScope(prevActScopeDepth), actScopeDepth === 0) {
              var _queue = ReactCurrentActQueue.current;
              _queue !== null && (flushActQueue(_queue), ReactCurrentActQueue.current = null);
              var _thenable = {
                then: function(resolve, reject) {
                  ReactCurrentActQueue.current === null ? (ReactCurrentActQueue.current = [], recursivelyFlushAsyncActWork(returnValue, resolve, reject)) : resolve(returnValue);
                }
              };
              return _thenable;
            } else {
              var _thenable2 = {
                then: function(resolve, reject) {
                  resolve(returnValue);
                }
              };
              return _thenable2;
            }
          }
        }
      }
      function popActScope(prevActScopeDepth) {
        prevActScopeDepth !== actScopeDepth - 1 && error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), actScopeDepth = prevActScopeDepth;
      }
      function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
        {
          var queue = ReactCurrentActQueue.current;
          if (queue !== null)
            try {
              flushActQueue(queue), enqueueTask(function() {
                queue.length === 0 ? (ReactCurrentActQueue.current = null, resolve(returnValue)) : recursivelyFlushAsyncActWork(returnValue, resolve, reject);
              });
            } catch (error2) {
              reject(error2);
            }
          else
            resolve(returnValue);
        }
      }
      var isFlushing = !1;
      function flushActQueue(queue) {
        if (!isFlushing) {
          isFlushing = !0;
          var i = 0;
          try {
            for (; i < queue.length; i++) {
              var callback = queue[i];
              do
                callback = callback(!0);
              while (callback !== null);
            }
            queue.length = 0;
          } catch (error2) {
            throw queue = queue.slice(i + 1), error2;
          } finally {
            isFlushing = !1;
          }
        }
      }
      var createElement$1 = createElementWithValidation, cloneElement$1 = cloneElementWithValidation, createFactory = createFactoryWithValidation, Children2 = {
        map: mapChildren,
        forEach: forEachChildren,
        count: countChildren,
        toArray,
        only: onlyChild
      };
      exports.Children = Children2, exports.Component = Component2, exports.Fragment = REACT_FRAGMENT_TYPE, exports.Profiler = REACT_PROFILER_TYPE, exports.PureComponent = PureComponent, exports.StrictMode = REACT_STRICT_MODE_TYPE, exports.Suspense = REACT_SUSPENSE_TYPE, exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals, exports.cloneElement = cloneElement$1, exports.createContext = createContext3, exports.createElement = createElement$1, exports.createFactory = createFactory, exports.createRef = createRef, exports.forwardRef = forwardRef3, exports.isValidElement = isValidElement2, exports.lazy = lazy, exports.memo = memo, exports.startTransition = startTransition, exports.unstable_act = act, exports.useCallback = useCallback3, exports.useContext = useContext5, exports.useDebugValue = useDebugValue, exports.useDeferredValue = useDeferredValue, exports.useEffect = useEffect5, exports.useId = useId, exports.useImperativeHandle = useImperativeHandle, exports.useInsertionEffect = useInsertionEffect, exports.useLayoutEffect = useLayoutEffect3, exports.useMemo = useMemo5, exports.useReducer = useReducer, exports.useRef = useRef5, exports.useState = useState6, exports.useSyncExternalStore = useSyncExternalStore, exports.useTransition = useTransition2, exports.version = ReactVersion, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    })();
  }
});

// node_modules/react/index.js
var require_react = __commonJS({
  "node_modules/react/index.js"(exports, module) {
    "use strict";
    module.exports = require_react_development();
  }
});

// node_modules/react-router/dist/index.js
var dist_exports = {};
__export(dist_exports, {
  AbortedDeferredError: () => AbortedDeferredError,
  Await: () => Await,
  MemoryRouter: () => MemoryRouter,
  Navigate: () => Navigate,
  NavigationType: () => Action,
  Outlet: () => Outlet,
  Route: () => Route,
  Router: () => Router,
  RouterProvider: () => RouterProvider,
  Routes: () => Routes,
  UNSAFE_DataRouterContext: () => DataRouterContext,
  UNSAFE_DataRouterStateContext: () => DataRouterStateContext,
  UNSAFE_LocationContext: () => LocationContext,
  UNSAFE_NavigationContext: () => NavigationContext,
  UNSAFE_RouteContext: () => RouteContext,
  UNSAFE_mapRouteProperties: () => mapRouteProperties,
  UNSAFE_useRouteId: () => useRouteId,
  UNSAFE_useRoutesImpl: () => useRoutesImpl,
  createMemoryRouter: () => createMemoryRouter,
  createPath: () => createPath,
  createRoutesFromChildren: () => createRoutesFromChildren,
  createRoutesFromElements: () => createRoutesFromChildren,
  defer: () => defer,
  generatePath: () => generatePath,
  isRouteErrorResponse: () => isRouteErrorResponse,
  json: () => json,
  matchPath: () => matchPath,
  matchRoutes: () => matchRoutes,
  parsePath: () => parsePath,
  redirect: () => redirect,
  renderMatches: () => renderMatches,
  resolvePath: () => resolvePath,
  unstable_useBlocker: () => useBlocker,
  useActionData: () => useActionData,
  useAsyncError: () => useAsyncError,
  useAsyncValue: () => useAsyncValue,
  useHref: () => useHref,
  useInRouterContext: () => useInRouterContext,
  useLoaderData: () => useLoaderData,
  useLocation: () => useLocation,
  useMatch: () => useMatch,
  useMatches: () => useMatches,
  useNavigate: () => useNavigate,
  useNavigation: () => useNavigation,
  useNavigationType: () => useNavigationType,
  useOutlet: () => useOutlet,
  useOutletContext: () => useOutletContext,
  useParams: () => useParams,
  useResolvedPath: () => useResolvedPath,
  useRevalidator: () => useRevalidator,
  useRouteError: () => useRouteError,
  useRouteLoaderData: () => useRouteLoaderData,
  useRoutes: () => useRoutes
});
function _extends2() {
  return _extends2 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source)
        Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
    }
    return target;
  }, _extends2.apply(this, arguments);
}
function useHref(to, _temp) {
  let {
    relative
  } = _temp === void 0 ? {} : _temp;
  useInRouterContext() || invariant(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let {
    basename,
    navigator: navigator2
  } = React.useContext(NavigationContext), {
    hash,
    pathname,
    search
  } = useResolvedPath(to, {
    relative
  }), joinedPathname = pathname;
  return basename !== "/" && (joinedPathname = pathname === "/" ? basename : joinPaths([basename, pathname])), navigator2.createHref({
    pathname: joinedPathname,
    search,
    hash
  });
}
function useInRouterContext() {
  return React.useContext(LocationContext) != null;
}
function useLocation() {
  return useInRouterContext() || invariant(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), React.useContext(LocationContext).location;
}
function useNavigationType() {
  return React.useContext(LocationContext).navigationType;
}
function useMatch(pattern) {
  useInRouterContext() || invariant(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useMatch() may be used only in the context of a <Router> component."
  );
  let {
    pathname
  } = useLocation();
  return React.useMemo(() => matchPath(pattern, pathname), [pathname, pattern]);
}
function useIsomorphicLayoutEffect(cb) {
  React.useContext(NavigationContext).static || React.useLayoutEffect(cb);
}
function useNavigate() {
  let {
    isDataRoute
  } = React.useContext(RouteContext);
  return isDataRoute ? useNavigateStable() : useNavigateUnstable();
}
function useNavigateUnstable() {
  useInRouterContext() || invariant(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let dataRouterContext = React.useContext(DataRouterContext), {
    basename,
    navigator: navigator2
  } = React.useContext(NavigationContext), {
    matches
  } = React.useContext(RouteContext), {
    pathname: locationPathname
  } = useLocation(), routePathnamesJson = JSON.stringify(getPathContributingMatches(matches).map((match) => match.pathnameBase)), activeRef = React.useRef(!1);
  return useIsomorphicLayoutEffect(() => {
    activeRef.current = !0;
  }), React.useCallback(function(to, options) {
    if (options === void 0 && (options = {}), warning(activeRef.current, navigateEffectWarning), !activeRef.current)
      return;
    if (typeof to == "number") {
      navigator2.go(to);
      return;
    }
    let path = resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, options.relative === "path");
    dataRouterContext == null && basename !== "/" && (path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname])), (options.replace ? navigator2.replace : navigator2.push)(path, options.state, options);
  }, [basename, navigator2, routePathnamesJson, locationPathname, dataRouterContext]);
}
function useOutletContext() {
  return React.useContext(OutletContext);
}
function useOutlet(context) {
  let outlet = React.useContext(RouteContext).outlet;
  return outlet && /* @__PURE__ */ React.createElement(OutletContext.Provider, {
    value: context
  }, outlet);
}
function useParams() {
  let {
    matches
  } = React.useContext(RouteContext), routeMatch = matches[matches.length - 1];
  return routeMatch ? routeMatch.params : {};
}
function useResolvedPath(to, _temp2) {
  let {
    relative
  } = _temp2 === void 0 ? {} : _temp2, {
    matches
  } = React.useContext(RouteContext), {
    pathname: locationPathname
  } = useLocation(), routePathnamesJson = JSON.stringify(getPathContributingMatches(matches).map((match) => match.pathnameBase));
  return React.useMemo(() => resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, relative === "path"), [to, routePathnamesJson, locationPathname, relative]);
}
function useRoutes(routes2, locationArg) {
  return useRoutesImpl(routes2, locationArg);
}
function useRoutesImpl(routes2, locationArg, dataRouterState) {
  useInRouterContext() || invariant(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let {
    navigator: navigator2
  } = React.useContext(NavigationContext), {
    matches: parentMatches
  } = React.useContext(RouteContext), routeMatch = parentMatches[parentMatches.length - 1], parentParams = routeMatch ? routeMatch.params : {}, parentPathname = routeMatch ? routeMatch.pathname : "/", parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/", parentRoute = routeMatch && routeMatch.route;
  {
    let parentPath = parentRoute && parentRoute.path || "";
    warningOnce(parentPathname, !parentRoute || parentPath.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + parentPathname + '" (under <Route path="' + parentPath + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + parentPath + '"> to <Route ') + ('path="' + (parentPath === "/" ? "*" : parentPath + "/*") + '">.'));
  }
  let locationFromContext = useLocation(), location2;
  if (locationArg) {
    var _parsedLocationArg$pa;
    let parsedLocationArg = typeof locationArg == "string" ? parsePath(locationArg) : locationArg;
    parentPathnameBase === "/" || (_parsedLocationArg$pa = parsedLocationArg.pathname) != null && _parsedLocationArg$pa.startsWith(parentPathnameBase) || invariant(!1, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + parentPathnameBase + '" ') + ('but pathname "' + parsedLocationArg.pathname + '" was given in the `location` prop.')), location2 = parsedLocationArg;
  } else
    location2 = locationFromContext;
  let pathname = location2.pathname || "/", remainingPathname = parentPathnameBase === "/" ? pathname : pathname.slice(parentPathnameBase.length) || "/", matches = matchRoutes(routes2, {
    pathname: remainingPathname
  });
  warning(parentRoute || matches != null, 'No routes matched location "' + location2.pathname + location2.search + location2.hash + '" '), warning(matches == null || matches[matches.length - 1].route.element !== void 0 || matches[matches.length - 1].route.Component !== void 0, 'Matched leaf route at location "' + location2.pathname + location2.search + location2.hash + '" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.');
  let renderedMatches = _renderMatches(matches && matches.map((match) => Object.assign({}, match, {
    params: Object.assign({}, parentParams, match.params),
    pathname: joinPaths([
      parentPathnameBase,
      // Re-encode pathnames that were decoded inside matchRoutes
      navigator2.encodeLocation ? navigator2.encodeLocation(match.pathname).pathname : match.pathname
    ]),
    pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([
      parentPathnameBase,
      // Re-encode pathnames that were decoded inside matchRoutes
      navigator2.encodeLocation ? navigator2.encodeLocation(match.pathnameBase).pathname : match.pathnameBase
    ])
  })), parentMatches, dataRouterState);
  return locationArg && renderedMatches ? /* @__PURE__ */ React.createElement(LocationContext.Provider, {
    value: {
      location: _extends2({
        pathname: "/",
        search: "",
        hash: "",
        state: null,
        key: "default"
      }, location2),
      navigationType: Action.Pop
    }
  }, renderedMatches) : renderedMatches;
}
function DefaultErrorComponent() {
  let error = useRouteError(), message = isRouteErrorResponse(error) ? error.status + " " + error.statusText : error instanceof Error ? error.message : JSON.stringify(error), stack = error instanceof Error ? error.stack : null, lightgrey = "rgba(200,200,200, 0.5)", preStyles = {
    padding: "0.5rem",
    backgroundColor: lightgrey
  }, codeStyles = {
    padding: "2px 4px",
    backgroundColor: lightgrey
  }, devInfo = null;
  return console.error("Error handled by React Router default ErrorBoundary:", error), devInfo = /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", null, "\u{1F4BF} Hey developer \u{1F44B}"), /* @__PURE__ */ React.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ React.createElement("code", {
    style: codeStyles
  }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ React.createElement("code", {
    style: codeStyles
  }, "errorElement"), " prop on your route.")), /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ React.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, message), stack ? /* @__PURE__ */ React.createElement("pre", {
    style: preStyles
  }, stack) : null, devInfo);
}
function RenderedRoute(_ref) {
  let {
    routeContext,
    match,
    children
  } = _ref, dataRouterContext = React.useContext(DataRouterContext);
  return dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary) && (dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id), /* @__PURE__ */ React.createElement(RouteContext.Provider, {
    value: routeContext
  }, children);
}
function _renderMatches(matches, parentMatches, dataRouterState) {
  var _dataRouterState2;
  if (parentMatches === void 0 && (parentMatches = []), dataRouterState === void 0 && (dataRouterState = null), matches == null) {
    var _dataRouterState;
    if ((_dataRouterState = dataRouterState) != null && _dataRouterState.errors)
      matches = dataRouterState.matches;
    else
      return null;
  }
  let renderedMatches = matches, errors = (_dataRouterState2 = dataRouterState) == null ? void 0 : _dataRouterState2.errors;
  if (errors != null) {
    let errorIndex = renderedMatches.findIndex((m) => m.route.id && (errors == null ? void 0 : errors[m.route.id]));
    errorIndex >= 0 || invariant(!1, "Could not find a matching route for errors on route IDs: " + Object.keys(errors).join(",")), renderedMatches = renderedMatches.slice(0, Math.min(renderedMatches.length, errorIndex + 1));
  }
  return renderedMatches.reduceRight((outlet, match, index) => {
    let error = match.route.id ? errors == null ? void 0 : errors[match.route.id] : null, errorElement = null;
    dataRouterState && (errorElement = match.route.errorElement || defaultErrorElement);
    let matches2 = parentMatches.concat(renderedMatches.slice(0, index + 1)), getChildren = () => {
      let children;
      return error ? children = errorElement : match.route.Component ? children = /* @__PURE__ */ React.createElement(match.route.Component, null) : match.route.element ? children = match.route.element : children = outlet, /* @__PURE__ */ React.createElement(RenderedRoute, {
        match,
        routeContext: {
          outlet,
          matches: matches2,
          isDataRoute: dataRouterState != null
        },
        children
      });
    };
    return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index === 0) ? /* @__PURE__ */ React.createElement(RenderErrorBoundary, {
      location: dataRouterState.location,
      revalidation: dataRouterState.revalidation,
      component: errorElement,
      error,
      children: getChildren(),
      routeContext: {
        outlet: null,
        matches: matches2,
        isDataRoute: !0
      }
    }) : getChildren();
  }, null);
}
function getDataRouterConsoleError(hookName) {
  return hookName + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}
function useDataRouterContext(hookName) {
  let ctx = React.useContext(DataRouterContext);
  return ctx || invariant(!1, getDataRouterConsoleError(hookName)), ctx;
}
function useDataRouterState(hookName) {
  let state = React.useContext(DataRouterStateContext);
  return state || invariant(!1, getDataRouterConsoleError(hookName)), state;
}
function useRouteContext(hookName) {
  let route = React.useContext(RouteContext);
  return route || invariant(!1, getDataRouterConsoleError(hookName)), route;
}
function useCurrentRouteId(hookName) {
  let route = useRouteContext(hookName), thisRoute = route.matches[route.matches.length - 1];
  return thisRoute.route.id || invariant(!1, hookName + ' can only be used on routes that contain a unique "id"'), thisRoute.route.id;
}
function useRouteId() {
  return useCurrentRouteId(DataRouterStateHook.UseRouteId);
}
function useNavigation() {
  return useDataRouterState(DataRouterStateHook.UseNavigation).navigation;
}
function useRevalidator() {
  let dataRouterContext = useDataRouterContext(DataRouterHook.UseRevalidator), state = useDataRouterState(DataRouterStateHook.UseRevalidator);
  return {
    revalidate: dataRouterContext.router.revalidate,
    state: state.revalidation
  };
}
function useMatches() {
  let {
    matches,
    loaderData
  } = useDataRouterState(DataRouterStateHook.UseMatches);
  return React.useMemo(() => matches.map((match) => {
    let {
      pathname,
      params
    } = match;
    return {
      id: match.route.id,
      pathname,
      params,
      data: loaderData[match.route.id],
      handle: match.route.handle
    };
  }), [matches, loaderData]);
}
function useLoaderData() {
  let state = useDataRouterState(DataRouterStateHook.UseLoaderData), routeId = useCurrentRouteId(DataRouterStateHook.UseLoaderData);
  if (state.errors && state.errors[routeId] != null) {
    console.error("You cannot `useLoaderData` in an errorElement (routeId: " + routeId + ")");
    return;
  }
  return state.loaderData[routeId];
}
function useRouteLoaderData(routeId) {
  return useDataRouterState(DataRouterStateHook.UseRouteLoaderData).loaderData[routeId];
}
function useActionData() {
  let state = useDataRouterState(DataRouterStateHook.UseActionData);
  return React.useContext(RouteContext) || invariant(!1, "useActionData must be used inside a RouteContext"), Object.values((state == null ? void 0 : state.actionData) || {})[0];
}
function useRouteError() {
  var _state$errors;
  let error = React.useContext(RouteErrorContext), state = useDataRouterState(DataRouterStateHook.UseRouteError), routeId = useCurrentRouteId(DataRouterStateHook.UseRouteError);
  return error || ((_state$errors = state.errors) == null ? void 0 : _state$errors[routeId]);
}
function useAsyncValue() {
  let value = React.useContext(AwaitContext);
  return value == null ? void 0 : value._data;
}
function useAsyncError() {
  let value = React.useContext(AwaitContext);
  return value == null ? void 0 : value._error;
}
function useBlocker(shouldBlock) {
  let {
    router,
    basename
  } = useDataRouterContext(DataRouterHook.UseBlocker), state = useDataRouterState(DataRouterStateHook.UseBlocker), [blockerKey, setBlockerKey] = React.useState(""), blockerFunction = React.useCallback((arg) => {
    if (typeof shouldBlock != "function")
      return !!shouldBlock;
    if (basename === "/")
      return shouldBlock(arg);
    let {
      currentLocation,
      nextLocation,
      historyAction
    } = arg;
    return shouldBlock({
      currentLocation: _extends2({}, currentLocation, {
        pathname: stripBasename(currentLocation.pathname, basename) || currentLocation.pathname
      }),
      nextLocation: _extends2({}, nextLocation, {
        pathname: stripBasename(nextLocation.pathname, basename) || nextLocation.pathname
      }),
      historyAction
    });
  }, [basename, shouldBlock]);
  return React.useEffect(() => {
    let key = String(++blockerId);
    return setBlockerKey(key), () => router.deleteBlocker(key);
  }, [router]), React.useEffect(() => {
    blockerKey !== "" && router.getBlocker(blockerKey, blockerFunction);
  }, [router, blockerKey, blockerFunction]), blockerKey && state.blockers.has(blockerKey) ? state.blockers.get(blockerKey) : IDLE_BLOCKER;
}
function useNavigateStable() {
  let {
    router
  } = useDataRouterContext(DataRouterHook.UseNavigateStable), id = useCurrentRouteId(DataRouterStateHook.UseNavigateStable), activeRef = React.useRef(!1);
  return useIsomorphicLayoutEffect(() => {
    activeRef.current = !0;
  }), React.useCallback(function(to, options) {
    options === void 0 && (options = {}), warning(activeRef.current, navigateEffectWarning), activeRef.current && (typeof to == "number" ? router.navigate(to) : router.navigate(to, _extends2({
      fromRouteId: id
    }, options)));
  }, [router, id]);
}
function warningOnce(key, cond, message) {
  !cond && !alreadyWarned2[key] && (alreadyWarned2[key] = !0, warning(!1, message));
}
function RouterProvider(_ref) {
  let {
    fallbackElement,
    router,
    future: future2
  } = _ref, [state, setStateImpl] = React.useState(router.state), {
    v7_startTransition
  } = future2 || {}, setState = React.useCallback((newState) => {
    v7_startTransition && startTransitionImpl ? startTransitionImpl(() => setStateImpl(newState)) : setStateImpl(newState);
  }, [setStateImpl, v7_startTransition]);
  React.useLayoutEffect(() => router.subscribe(setState), [router, setState]);
  let navigator2 = React.useMemo(() => ({
    createHref: router.createHref,
    encodeLocation: router.encodeLocation,
    go: (n) => router.navigate(n),
    push: (to, state2, opts) => router.navigate(to, {
      state: state2,
      preventScrollReset: opts == null ? void 0 : opts.preventScrollReset
    }),
    replace: (to, state2, opts) => router.navigate(to, {
      replace: !0,
      state: state2,
      preventScrollReset: opts == null ? void 0 : opts.preventScrollReset
    })
  }), [router]), basename = router.basename || "/", dataRouterContext = React.useMemo(() => ({
    router,
    navigator: navigator2,
    static: !1,
    basename
  }), [router, navigator2, basename]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DataRouterContext.Provider, {
    value: dataRouterContext
  }, /* @__PURE__ */ React.createElement(DataRouterStateContext.Provider, {
    value: state
  }, /* @__PURE__ */ React.createElement(Router, {
    basename,
    location: state.location,
    navigationType: state.historyAction,
    navigator: navigator2
  }, state.initialized ? /* @__PURE__ */ React.createElement(DataRoutes, {
    routes: router.routes,
    state
  }) : fallbackElement))), null);
}
function DataRoutes(_ref2) {
  let {
    routes: routes2,
    state
  } = _ref2;
  return useRoutesImpl(routes2, void 0, state);
}
function MemoryRouter(_ref3) {
  let {
    basename,
    children,
    initialEntries,
    initialIndex,
    future: future2
  } = _ref3, historyRef = React.useRef();
  historyRef.current == null && (historyRef.current = createMemoryHistory({
    initialEntries,
    initialIndex,
    v5Compat: !0
  }));
  let history = historyRef.current, [state, setStateImpl] = React.useState({
    action: history.action,
    location: history.location
  }), {
    v7_startTransition
  } = future2 || {}, setState = React.useCallback((newState) => {
    v7_startTransition && startTransitionImpl ? startTransitionImpl(() => setStateImpl(newState)) : setStateImpl(newState);
  }, [setStateImpl, v7_startTransition]);
  return React.useLayoutEffect(() => history.listen(setState), [history, setState]), /* @__PURE__ */ React.createElement(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
function Navigate(_ref4) {
  let {
    to,
    replace,
    state,
    relative
  } = _ref4;
  useInRouterContext() || invariant(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of
    // the router loaded. We can help them understand how to avoid that.
    "<Navigate> may be used only in the context of a <Router> component."
  ), warning(!React.useContext(NavigationContext).static, "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");
  let {
    matches
  } = React.useContext(RouteContext), {
    pathname: locationPathname
  } = useLocation(), navigate = useNavigate(), path = resolveTo(to, getPathContributingMatches(matches).map((match) => match.pathnameBase), locationPathname, relative === "path"), jsonPath = JSON.stringify(path);
  return React.useEffect(() => navigate(JSON.parse(jsonPath), {
    replace,
    state,
    relative
  }), [navigate, jsonPath, relative, replace, state]), null;
}
function Outlet(props) {
  return useOutlet(props.context);
}
function Route(_props) {
  invariant(!1, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.");
}
function Router(_ref5) {
  let {
    basename: basenameProp = "/",
    children = null,
    location: locationProp,
    navigationType = Action.Pop,
    navigator: navigator2,
    static: staticProp = !1
  } = _ref5;
  useInRouterContext() && invariant(!1, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");
  let basename = basenameProp.replace(/^\/*/, "/"), navigationContext = React.useMemo(() => ({
    basename,
    navigator: navigator2,
    static: staticProp
  }), [basename, navigator2, staticProp]);
  typeof locationProp == "string" && (locationProp = parsePath(locationProp));
  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key = "default"
  } = locationProp, locationContext = React.useMemo(() => {
    let trailingPathname = stripBasename(pathname, basename);
    return trailingPathname == null ? null : {
      location: {
        pathname: trailingPathname,
        search,
        hash,
        state,
        key
      },
      navigationType
    };
  }, [basename, pathname, search, hash, state, key, navigationType]);
  return warning(locationContext != null, '<Router basename="' + basename + '"> is not able to match the URL ' + ('"' + pathname + search + hash + '" because it does not start with the ') + "basename, so the <Router> won't render anything."), locationContext == null ? null : /* @__PURE__ */ React.createElement(NavigationContext.Provider, {
    value: navigationContext
  }, /* @__PURE__ */ React.createElement(LocationContext.Provider, {
    children,
    value: locationContext
  }));
}
function Routes(_ref6) {
  let {
    children,
    location: location2
  } = _ref6;
  return useRoutes(createRoutesFromChildren(children), location2);
}
function Await(_ref7) {
  let {
    children,
    errorElement,
    resolve
  } = _ref7;
  return /* @__PURE__ */ React.createElement(AwaitErrorBoundary, {
    resolve,
    errorElement
  }, /* @__PURE__ */ React.createElement(ResolveAwait, null, children));
}
function ResolveAwait(_ref8) {
  let {
    children
  } = _ref8, data = useAsyncValue(), toRender = typeof children == "function" ? children(data) : children;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, toRender);
}
function createRoutesFromChildren(children, parentPath) {
  parentPath === void 0 && (parentPath = []);
  let routes2 = [];
  return React.Children.forEach(children, (element, index) => {
    if (!/* @__PURE__ */ React.isValidElement(element))
      return;
    let treePath = [...parentPath, index];
    if (element.type === React.Fragment) {
      routes2.push.apply(routes2, createRoutesFromChildren(element.props.children, treePath));
      return;
    }
    element.type !== Route && invariant(!1, "[" + (typeof element.type == "string" ? element.type : element.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>"), !element.props.index || !element.props.children || invariant(!1, "An index route cannot have child routes.");
    let route = {
      id: element.props.id || treePath.join("-"),
      caseSensitive: element.props.caseSensitive,
      element: element.props.element,
      Component: element.props.Component,
      index: element.props.index,
      path: element.props.path,
      loader: element.props.loader,
      action: element.props.action,
      errorElement: element.props.errorElement,
      ErrorBoundary: element.props.ErrorBoundary,
      hasErrorBoundary: element.props.ErrorBoundary != null || element.props.errorElement != null,
      shouldRevalidate: element.props.shouldRevalidate,
      handle: element.props.handle,
      lazy: element.props.lazy
    };
    element.props.children && (route.children = createRoutesFromChildren(element.props.children, treePath)), routes2.push(route);
  }), routes2;
}
function renderMatches(matches) {
  return _renderMatches(matches);
}
function mapRouteProperties(route) {
  let updates = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: route.ErrorBoundary != null || route.errorElement != null
  };
  return route.Component && (route.element && warning(!1, "You should not include both `Component` and `element` on your route - `Component` will be used."), Object.assign(updates, {
    element: /* @__PURE__ */ React.createElement(route.Component),
    Component: void 0
  })), route.ErrorBoundary && (route.errorElement && warning(!1, "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."), Object.assign(updates, {
    errorElement: /* @__PURE__ */ React.createElement(route.ErrorBoundary),
    ErrorBoundary: void 0
  })), updates;
}
function createMemoryRouter(routes2, opts) {
  return createRouter({
    basename: opts == null ? void 0 : opts.basename,
    future: _extends2({}, opts == null ? void 0 : opts.future, {
      v7_prependBasename: !0
    }),
    history: createMemoryHistory({
      initialEntries: opts == null ? void 0 : opts.initialEntries,
      initialIndex: opts == null ? void 0 : opts.initialIndex
    }),
    hydrationData: opts == null ? void 0 : opts.hydrationData,
    routes: routes2,
    mapRouteProperties
  }).initialize();
}
var React, DataRouterContext, DataRouterStateContext, AwaitContext, NavigationContext, LocationContext, RouteContext, RouteErrorContext, navigateEffectWarning, OutletContext, defaultErrorElement, RenderErrorBoundary, DataRouterHook, DataRouterStateHook, blockerId, alreadyWarned2, START_TRANSITION, startTransitionImpl, AwaitRenderStatus, neverSettledPromise, AwaitErrorBoundary, init_dist = __esm({
  "node_modules/react-router/dist/index.js"() {
    React = __toESM(require_react());
    init_router();
    init_router();
    DataRouterContext = /* @__PURE__ */ React.createContext(null);
    DataRouterContext.displayName = "DataRouter";
    DataRouterStateContext = /* @__PURE__ */ React.createContext(null);
    DataRouterStateContext.displayName = "DataRouterState";
    AwaitContext = /* @__PURE__ */ React.createContext(null);
    AwaitContext.displayName = "Await";
    NavigationContext = /* @__PURE__ */ React.createContext(null);
    NavigationContext.displayName = "Navigation";
    LocationContext = /* @__PURE__ */ React.createContext(null);
    LocationContext.displayName = "Location";
    RouteContext = /* @__PURE__ */ React.createContext({
      outlet: null,
      matches: [],
      isDataRoute: !1
    });
    RouteContext.displayName = "Route";
    RouteErrorContext = /* @__PURE__ */ React.createContext(null);
    RouteErrorContext.displayName = "RouteError";
    navigateEffectWarning = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
    OutletContext = /* @__PURE__ */ React.createContext(null);
    defaultErrorElement = /* @__PURE__ */ React.createElement(DefaultErrorComponent, null), RenderErrorBoundary = class extends React.Component {
      constructor(props) {
        super(props), this.state = {
          location: props.location,
          revalidation: props.revalidation,
          error: props.error
        };
      }
      static getDerivedStateFromError(error) {
        return {
          error
        };
      }
      static getDerivedStateFromProps(props, state) {
        return state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle" ? {
          error: props.error,
          location: props.location,
          revalidation: props.revalidation
        } : {
          error: props.error || state.error,
          location: state.location,
          revalidation: props.revalidation || state.revalidation
        };
      }
      componentDidCatch(error, errorInfo) {
        console.error("React Router caught the following error during render", error, errorInfo);
      }
      render() {
        return this.state.error ? /* @__PURE__ */ React.createElement(RouteContext.Provider, {
          value: this.props.routeContext
        }, /* @__PURE__ */ React.createElement(RouteErrorContext.Provider, {
          value: this.state.error,
          children: this.props.component
        })) : this.props.children;
      }
    };
    (function(DataRouterHook3) {
      DataRouterHook3.UseBlocker = "useBlocker", DataRouterHook3.UseRevalidator = "useRevalidator", DataRouterHook3.UseNavigateStable = "useNavigate";
    })(DataRouterHook || (DataRouterHook = {}));
    (function(DataRouterStateHook3) {
      DataRouterStateHook3.UseBlocker = "useBlocker", DataRouterStateHook3.UseLoaderData = "useLoaderData", DataRouterStateHook3.UseActionData = "useActionData", DataRouterStateHook3.UseRouteError = "useRouteError", DataRouterStateHook3.UseNavigation = "useNavigation", DataRouterStateHook3.UseRouteLoaderData = "useRouteLoaderData", DataRouterStateHook3.UseMatches = "useMatches", DataRouterStateHook3.UseRevalidator = "useRevalidator", DataRouterStateHook3.UseNavigateStable = "useNavigate", DataRouterStateHook3.UseRouteId = "useRouteId";
    })(DataRouterStateHook || (DataRouterStateHook = {}));
    blockerId = 0;
    alreadyWarned2 = {};
    START_TRANSITION = "startTransition", startTransitionImpl = React[START_TRANSITION];
    (function(AwaitRenderStatus2) {
      AwaitRenderStatus2[AwaitRenderStatus2.pending = 0] = "pending", AwaitRenderStatus2[AwaitRenderStatus2.success = 1] = "success", AwaitRenderStatus2[AwaitRenderStatus2.error = 2] = "error";
    })(AwaitRenderStatus || (AwaitRenderStatus = {}));
    neverSettledPromise = new Promise(() => {
    }), AwaitErrorBoundary = class extends React.Component {
      constructor(props) {
        super(props), this.state = {
          error: null
        };
      }
      static getDerivedStateFromError(error) {
        return {
          error
        };
      }
      componentDidCatch(error, errorInfo) {
        console.error("<Await> caught the following error during render", error, errorInfo);
      }
      render() {
        let {
          children,
          errorElement,
          resolve
        } = this.props, promise = null, status = AwaitRenderStatus.pending;
        if (!(resolve instanceof Promise))
          status = AwaitRenderStatus.success, promise = Promise.resolve(), Object.defineProperty(promise, "_tracked", {
            get: () => !0
          }), Object.defineProperty(promise, "_data", {
            get: () => resolve
          });
        else if (this.state.error) {
          status = AwaitRenderStatus.error;
          let renderError = this.state.error;
          promise = Promise.reject().catch(() => {
          }), Object.defineProperty(promise, "_tracked", {
            get: () => !0
          }), Object.defineProperty(promise, "_error", {
            get: () => renderError
          });
        } else
          resolve._tracked ? (promise = resolve, status = promise._error !== void 0 ? AwaitRenderStatus.error : promise._data !== void 0 ? AwaitRenderStatus.success : AwaitRenderStatus.pending) : (status = AwaitRenderStatus.pending, Object.defineProperty(resolve, "_tracked", {
            get: () => !0
          }), promise = resolve.then((data) => Object.defineProperty(resolve, "_data", {
            get: () => data
          }), (error) => Object.defineProperty(resolve, "_error", {
            get: () => error
          })));
        if (status === AwaitRenderStatus.error && promise._error instanceof AbortedDeferredError)
          throw neverSettledPromise;
        if (status === AwaitRenderStatus.error && !errorElement)
          throw promise._error;
        if (status === AwaitRenderStatus.error)
          return /* @__PURE__ */ React.createElement(AwaitContext.Provider, {
            value: promise,
            children: errorElement
          });
        if (status === AwaitRenderStatus.success)
          return /* @__PURE__ */ React.createElement(AwaitContext.Provider, {
            value: promise,
            children
          });
        throw promise;
      }
    };
  }
});

// node_modules/react-router-dom/dist/index.js
var dist_exports2 = {};
__export(dist_exports2, {
  AbortedDeferredError: () => AbortedDeferredError,
  Await: () => Await,
  BrowserRouter: () => BrowserRouter,
  Form: () => Form,
  HashRouter: () => HashRouter,
  Link: () => Link,
  MemoryRouter: () => MemoryRouter,
  NavLink: () => NavLink,
  Navigate: () => Navigate,
  NavigationType: () => Action,
  Outlet: () => Outlet,
  Route: () => Route,
  Router: () => Router,
  RouterProvider: () => RouterProvider,
  Routes: () => Routes,
  ScrollRestoration: () => ScrollRestoration,
  UNSAFE_DataRouterContext: () => DataRouterContext,
  UNSAFE_DataRouterStateContext: () => DataRouterStateContext,
  UNSAFE_LocationContext: () => LocationContext,
  UNSAFE_NavigationContext: () => NavigationContext,
  UNSAFE_RouteContext: () => RouteContext,
  UNSAFE_useRouteId: () => useRouteId,
  UNSAFE_useScrollRestoration: () => useScrollRestoration,
  createBrowserRouter: () => createBrowserRouter,
  createHashRouter: () => createHashRouter,
  createMemoryRouter: () => createMemoryRouter,
  createPath: () => createPath,
  createRoutesFromChildren: () => createRoutesFromChildren,
  createRoutesFromElements: () => createRoutesFromChildren,
  createSearchParams: () => createSearchParams,
  defer: () => defer,
  generatePath: () => generatePath,
  isRouteErrorResponse: () => isRouteErrorResponse,
  json: () => json,
  matchPath: () => matchPath,
  matchRoutes: () => matchRoutes,
  parsePath: () => parsePath,
  redirect: () => redirect,
  renderMatches: () => renderMatches,
  resolvePath: () => resolvePath,
  unstable_HistoryRouter: () => HistoryRouter,
  unstable_useBlocker: () => useBlocker,
  unstable_usePrompt: () => usePrompt,
  useActionData: () => useActionData,
  useAsyncError: () => useAsyncError,
  useAsyncValue: () => useAsyncValue,
  useBeforeUnload: () => useBeforeUnload,
  useFetcher: () => useFetcher,
  useFetchers: () => useFetchers,
  useFormAction: () => useFormAction,
  useHref: () => useHref,
  useInRouterContext: () => useInRouterContext,
  useLinkClickHandler: () => useLinkClickHandler,
  useLoaderData: () => useLoaderData,
  useLocation: () => useLocation,
  useMatch: () => useMatch,
  useMatches: () => useMatches,
  useNavigate: () => useNavigate,
  useNavigation: () => useNavigation,
  useNavigationType: () => useNavigationType,
  useOutlet: () => useOutlet,
  useOutletContext: () => useOutletContext,
  useParams: () => useParams,
  useResolvedPath: () => useResolvedPath,
  useRevalidator: () => useRevalidator,
  useRouteError: () => useRouteError,
  useRouteLoaderData: () => useRouteLoaderData,
  useRoutes: () => useRoutes,
  useSearchParams: () => useSearchParams,
  useSubmit: () => useSubmit
});
function _extends3() {
  return _extends3 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source)
        Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
    }
    return target;
  }, _extends3.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {}, sourceKeys = Object.keys(source), key, i;
  for (i = 0; i < sourceKeys.length; i++)
    key = sourceKeys[i], !(excluded.indexOf(key) >= 0) && (target[key] = source[key]);
  return target;
}
function isHtmlElement(object) {
  return object != null && typeof object.tagName == "string";
}
function isButtonElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "button";
}
function isFormElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "form";
}
function isInputElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "input";
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function shouldProcessLinkClick(event, target) {
  return event.button === 0 && // Ignore everything but left clicks
  (!target || target === "_self") && // Let browser handle "target=_blank" etc.
  !isModifiedEvent(event);
}
function createSearchParams(init) {
  return init === void 0 && (init = ""), new URLSearchParams(typeof init == "string" || Array.isArray(init) || init instanceof URLSearchParams ? init : Object.keys(init).reduce((memo, key) => {
    let value = init[key];
    return memo.concat(Array.isArray(value) ? value.map((v) => [key, v]) : [[key, value]]);
  }, []));
}
function getSearchParamsForLocation(locationSearch, defaultSearchParams) {
  let searchParams = createSearchParams(locationSearch);
  if (defaultSearchParams)
    for (let key of defaultSearchParams.keys())
      searchParams.has(key) || defaultSearchParams.getAll(key).forEach((value) => {
        searchParams.append(key, value);
      });
  return searchParams;
}
function isFormDataSubmitterSupported() {
  if (_formDataSupportsSubmitter === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), _formDataSupportsSubmitter = !1;
    } catch {
      _formDataSupportsSubmitter = !0;
    }
  return _formDataSupportsSubmitter;
}
function getFormEncType(encType) {
  return encType != null && !supportedFormEncTypes.has(encType) ? (warning(!1, '"' + encType + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + defaultEncType + '"')), null) : encType;
}
function getFormSubmissionInfo(target, basename) {
  let method, action, encType, formData, body;
  if (isFormElement(target)) {
    let attr = target.getAttribute("action");
    action = attr ? stripBasename(attr, basename) : null, method = target.getAttribute("method") || defaultMethod, encType = getFormEncType(target.getAttribute("enctype")) || defaultEncType, formData = new FormData(target);
  } else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
    let form = target.form;
    if (form == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let attr = target.getAttribute("formaction") || form.getAttribute("action");
    if (action = attr ? stripBasename(attr, basename) : null, method = target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod, encType = getFormEncType(target.getAttribute("formenctype")) || getFormEncType(form.getAttribute("enctype")) || defaultEncType, formData = new FormData(form, target), !isFormDataSubmitterSupported()) {
      let {
        name,
        type,
        value
      } = target;
      if (type === "image") {
        let prefix = name ? name + "." : "";
        formData.append(prefix + "x", "0"), formData.append(prefix + "y", "0");
      } else
        name && formData.append(name, value);
    }
  } else {
    if (isHtmlElement(target))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    method = defaultMethod, action = null, encType = defaultEncType, body = target;
  }
  return formData && encType === "text/plain" && (body = formData, formData = void 0), {
    action,
    method: method.toLowerCase(),
    encType,
    formData,
    body
  };
}
function createBrowserRouter(routes2, opts) {
  return createRouter({
    basename: opts == null ? void 0 : opts.basename,
    future: _extends3({}, opts == null ? void 0 : opts.future, {
      v7_prependBasename: !0
    }),
    history: createBrowserHistory({
      window: opts == null ? void 0 : opts.window
    }),
    hydrationData: (opts == null ? void 0 : opts.hydrationData) || parseHydrationData(),
    routes: routes2,
    mapRouteProperties
  }).initialize();
}
function createHashRouter(routes2, opts) {
  return createRouter({
    basename: opts == null ? void 0 : opts.basename,
    future: _extends3({}, opts == null ? void 0 : opts.future, {
      v7_prependBasename: !0
    }),
    history: createHashHistory({
      window: opts == null ? void 0 : opts.window
    }),
    hydrationData: (opts == null ? void 0 : opts.hydrationData) || parseHydrationData(),
    routes: routes2,
    mapRouteProperties
  }).initialize();
}
function parseHydrationData() {
  var _window;
  let state = (_window = window) == null ? void 0 : _window.__staticRouterHydrationData;
  return state && state.errors && (state = _extends3({}, state, {
    errors: deserializeErrors(state.errors)
  })), state;
}
function deserializeErrors(errors) {
  if (!errors)
    return null;
  let entries = Object.entries(errors), serialized = {};
  for (let [key, val] of entries)
    if (val && val.__type === "RouteErrorResponse")
      serialized[key] = new ErrorResponse(val.status, val.statusText, val.data, val.internal === !0);
    else if (val && val.__type === "Error") {
      if (val.__subType) {
        let ErrorConstructor = window[val.__subType];
        if (typeof ErrorConstructor == "function")
          try {
            let error = new ErrorConstructor(val.message);
            error.stack = "", serialized[key] = error;
          } catch {
          }
      }
      if (serialized[key] == null) {
        let error = new Error(val.message);
        error.stack = "", serialized[key] = error;
      }
    } else
      serialized[key] = val;
  return serialized;
}
function BrowserRouter(_ref) {
  let {
    basename,
    children,
    future: future2,
    window: window2
  } = _ref, historyRef = React2.useRef();
  historyRef.current == null && (historyRef.current = createBrowserHistory({
    window: window2,
    v5Compat: !0
  }));
  let history = historyRef.current, [state, setStateImpl] = React2.useState({
    action: history.action,
    location: history.location
  }), {
    v7_startTransition
  } = future2 || {}, setState = React2.useCallback((newState) => {
    v7_startTransition && startTransitionImpl2 ? startTransitionImpl2(() => setStateImpl(newState)) : setStateImpl(newState);
  }, [setStateImpl, v7_startTransition]);
  return React2.useLayoutEffect(() => history.listen(setState), [history, setState]), /* @__PURE__ */ React2.createElement(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
function HashRouter(_ref2) {
  let {
    basename,
    children,
    future: future2,
    window: window2
  } = _ref2, historyRef = React2.useRef();
  historyRef.current == null && (historyRef.current = createHashHistory({
    window: window2,
    v5Compat: !0
  }));
  let history = historyRef.current, [state, setStateImpl] = React2.useState({
    action: history.action,
    location: history.location
  }), {
    v7_startTransition
  } = future2 || {}, setState = React2.useCallback((newState) => {
    v7_startTransition && startTransitionImpl2 ? startTransitionImpl2(() => setStateImpl(newState)) : setStateImpl(newState);
  }, [setStateImpl, v7_startTransition]);
  return React2.useLayoutEffect(() => history.listen(setState), [history, setState]), /* @__PURE__ */ React2.createElement(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
function HistoryRouter(_ref3) {
  let {
    basename,
    children,
    future: future2,
    history
  } = _ref3, [state, setStateImpl] = React2.useState({
    action: history.action,
    location: history.location
  }), {
    v7_startTransition
  } = future2 || {}, setState = React2.useCallback((newState) => {
    v7_startTransition && startTransitionImpl2 ? startTransitionImpl2(() => setStateImpl(newState)) : setStateImpl(newState);
  }, [setStateImpl, v7_startTransition]);
  return React2.useLayoutEffect(() => history.listen(setState), [history, setState]), /* @__PURE__ */ React2.createElement(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
function ScrollRestoration(_ref7) {
  let {
    getKey,
    storageKey
  } = _ref7;
  return useScrollRestoration({
    getKey,
    storageKey
  }), null;
}
function getDataRouterConsoleError2(hookName) {
  return hookName + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}
function useDataRouterContext2(hookName) {
  let ctx = React2.useContext(DataRouterContext);
  return ctx || invariant(!1, getDataRouterConsoleError2(hookName)), ctx;
}
function useDataRouterState2(hookName) {
  let state = React2.useContext(DataRouterStateContext);
  return state || invariant(!1, getDataRouterConsoleError2(hookName)), state;
}
function useLinkClickHandler(to, _temp) {
  let {
    target,
    replace: replaceProp,
    state,
    preventScrollReset,
    relative
  } = _temp === void 0 ? {} : _temp, navigate = useNavigate(), location2 = useLocation(), path = useResolvedPath(to, {
    relative
  });
  return React2.useCallback((event) => {
    if (shouldProcessLinkClick(event, target)) {
      event.preventDefault();
      let replace = replaceProp !== void 0 ? replaceProp : createPath(location2) === createPath(path);
      navigate(to, {
        replace,
        state,
        preventScrollReset,
        relative
      });
    }
  }, [location2, navigate, path, replaceProp, state, target, to, preventScrollReset, relative]);
}
function useSearchParams(defaultInit) {
  warning(typeof URLSearchParams < "u", "You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params\n\nIf you're unsure how to load polyfills, we recommend you check out https://polyfill.io/v3/ which provides some recommendations about how to load polyfills only for users that need them, instead of for every user.");
  let defaultSearchParamsRef = React2.useRef(createSearchParams(defaultInit)), hasSetSearchParamsRef = React2.useRef(!1), location2 = useLocation(), searchParams = React2.useMemo(() => (
    // Only merge in the defaults if we haven't yet called setSearchParams.
    // Once we call that we want those to take precedence, otherwise you can't
    // remove a param with setSearchParams({}) if it has an initial value
    getSearchParamsForLocation(location2.search, hasSetSearchParamsRef.current ? null : defaultSearchParamsRef.current)
  ), [location2.search]), navigate = useNavigate(), setSearchParams = React2.useCallback((nextInit, navigateOptions) => {
    let newSearchParams = createSearchParams(typeof nextInit == "function" ? nextInit(searchParams) : nextInit);
    hasSetSearchParamsRef.current = !0, navigate("?" + newSearchParams, navigateOptions);
  }, [navigate, searchParams]);
  return [searchParams, setSearchParams];
}
function validateClientSideSubmission() {
  if (typeof document > "u")
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
}
function useSubmit() {
  let {
    router
  } = useDataRouterContext2(DataRouterHook2.UseSubmit), {
    basename
  } = React2.useContext(NavigationContext), currentRouteId = useRouteId();
  return React2.useCallback(function(target, options) {
    options === void 0 && (options = {}), validateClientSideSubmission();
    let {
      action,
      method,
      encType,
      formData,
      body
    } = getFormSubmissionInfo(target, basename);
    router.navigate(options.action || action, {
      preventScrollReset: options.preventScrollReset,
      formData,
      body,
      formMethod: options.method || method,
      formEncType: options.encType || encType,
      replace: options.replace,
      state: options.state,
      fromRouteId: currentRouteId
    });
  }, [router, basename, currentRouteId]);
}
function useSubmitFetcher(fetcherKey, fetcherRouteId) {
  let {
    router
  } = useDataRouterContext2(DataRouterHook2.UseSubmitFetcher), {
    basename
  } = React2.useContext(NavigationContext);
  return React2.useCallback(function(target, options) {
    options === void 0 && (options = {}), validateClientSideSubmission();
    let {
      action,
      method,
      encType,
      formData,
      body
    } = getFormSubmissionInfo(target, basename);
    fetcherRouteId == null && invariant(!1, "No routeId available for useFetcher()"), router.fetch(fetcherKey, fetcherRouteId, options.action || action, {
      preventScrollReset: options.preventScrollReset,
      formData,
      body,
      formMethod: options.method || method,
      formEncType: options.encType || encType
    });
  }, [router, basename, fetcherKey, fetcherRouteId]);
}
function useFormAction(action, _temp2) {
  let {
    relative
  } = _temp2 === void 0 ? {} : _temp2, {
    basename
  } = React2.useContext(NavigationContext), routeContext = React2.useContext(RouteContext);
  routeContext || invariant(!1, "useFormAction must be used inside a RouteContext");
  let [match] = routeContext.matches.slice(-1), path = _extends3({}, useResolvedPath(action || ".", {
    relative
  })), location2 = useLocation();
  if (action == null && (path.search = location2.search, path.hash = location2.hash, match.route.index)) {
    let params = new URLSearchParams(path.search);
    params.delete("index"), path.search = params.toString() ? "?" + params.toString() : "";
  }
  return (!action || action === ".") && match.route.index && (path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index"), basename !== "/" && (path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname])), createPath(path);
}
function createFetcherForm(fetcherKey, routeId) {
  let FetcherForm = /* @__PURE__ */ React2.forwardRef((props, ref) => {
    let submit = useSubmitFetcher(fetcherKey, routeId);
    return /* @__PURE__ */ React2.createElement(FormImpl, _extends3({}, props, {
      ref,
      submit
    }));
  });
  return FetcherForm.displayName = "fetcher.Form", FetcherForm;
}
function useFetcher() {
  var _route$matches;
  let {
    router
  } = useDataRouterContext2(DataRouterHook2.UseFetcher), route = React2.useContext(RouteContext);
  route || invariant(!1, "useFetcher must be used inside a RouteContext");
  let routeId = (_route$matches = route.matches[route.matches.length - 1]) == null ? void 0 : _route$matches.route.id;
  routeId == null && invariant(!1, 'useFetcher can only be used on routes that contain a unique "id"');
  let [fetcherKey] = React2.useState(() => String(++fetcherId)), [Form2] = React2.useState(() => (routeId || invariant(!1, "No routeId available for fetcher.Form()"), createFetcherForm(fetcherKey, routeId))), [load] = React2.useState(() => (href) => {
    router || invariant(!1, "No router available for fetcher.load()"), routeId || invariant(!1, "No routeId available for fetcher.load()"), router.fetch(fetcherKey, routeId, href);
  }), submit = useSubmitFetcher(fetcherKey, routeId), fetcher = router.getFetcher(fetcherKey), fetcherWithComponents = React2.useMemo(() => _extends3({
    Form: Form2,
    submit,
    load
  }, fetcher), [fetcher, Form2, submit, load]);
  return React2.useEffect(() => () => {
    if (!router) {
      console.warn("No router available to clean up from useFetcher()");
      return;
    }
    router.deleteFetcher(fetcherKey);
  }, [router, fetcherKey]), fetcherWithComponents;
}
function useFetchers() {
  return [...useDataRouterState2(DataRouterStateHook2.UseFetchers).fetchers.values()];
}
function useScrollRestoration(_temp3) {
  let {
    getKey,
    storageKey
  } = _temp3 === void 0 ? {} : _temp3, {
    router
  } = useDataRouterContext2(DataRouterHook2.UseScrollRestoration), {
    restoreScrollPosition,
    preventScrollReset
  } = useDataRouterState2(DataRouterStateHook2.UseScrollRestoration), {
    basename
  } = React2.useContext(NavigationContext), location2 = useLocation(), matches = useMatches(), navigation = useNavigation();
  React2.useEffect(() => (window.history.scrollRestoration = "manual", () => {
    window.history.scrollRestoration = "auto";
  }), []), usePageHide(React2.useCallback(() => {
    if (navigation.state === "idle") {
      let key = (getKey ? getKey(location2, matches) : null) || location2.key;
      savedScrollPositions[key] = window.scrollY;
    }
    sessionStorage.setItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY, JSON.stringify(savedScrollPositions)), window.history.scrollRestoration = "auto";
  }, [storageKey, getKey, navigation.state, location2, matches])), typeof document < "u" && (React2.useLayoutEffect(() => {
    try {
      let sessionPositions = sessionStorage.getItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY);
      sessionPositions && (savedScrollPositions = JSON.parse(sessionPositions));
    } catch {
    }
  }, [storageKey]), React2.useLayoutEffect(() => {
    let getKeyWithoutBasename = getKey && basename !== "/" ? (location3, matches2) => getKey(
      // Strip the basename to match useLocation()
      _extends3({}, location3, {
        pathname: stripBasename(location3.pathname, basename) || location3.pathname
      }),
      matches2
    ) : getKey, disableScrollRestoration = router == null ? void 0 : router.enableScrollRestoration(savedScrollPositions, () => window.scrollY, getKeyWithoutBasename);
    return () => disableScrollRestoration && disableScrollRestoration();
  }, [router, basename, getKey]), React2.useLayoutEffect(() => {
    if (restoreScrollPosition !== !1) {
      if (typeof restoreScrollPosition == "number") {
        window.scrollTo(0, restoreScrollPosition);
        return;
      }
      if (location2.hash) {
        let el = document.getElementById(decodeURIComponent(location2.hash.slice(1)));
        if (el) {
          el.scrollIntoView();
          return;
        }
      }
      preventScrollReset !== !0 && window.scrollTo(0, 0);
    }
  }, [location2, restoreScrollPosition, preventScrollReset]));
}
function useBeforeUnload(callback, options) {
  let {
    capture
  } = options || {};
  React2.useEffect(() => {
    let opts = capture != null ? {
      capture
    } : void 0;
    return window.addEventListener("beforeunload", callback, opts), () => {
      window.removeEventListener("beforeunload", callback, opts);
    };
  }, [callback, capture]);
}
function usePageHide(callback, options) {
  let {
    capture
  } = options || {};
  React2.useEffect(() => {
    let opts = capture != null ? {
      capture
    } : void 0;
    return window.addEventListener("pagehide", callback, opts), () => {
      window.removeEventListener("pagehide", callback, opts);
    };
  }, [callback, capture]);
}
function usePrompt(_ref8) {
  let {
    when,
    message
  } = _ref8, blocker = useBlocker(when);
  React2.useEffect(() => {
    blocker.state === "blocked" && !when && blocker.reset();
  }, [blocker, when]), React2.useEffect(() => {
    blocker.state === "blocked" && (window.confirm(message) ? setTimeout(blocker.proceed, 0) : blocker.reset());
  }, [blocker, message]);
}
var React2, defaultMethod, defaultEncType, _formDataSupportsSubmitter, supportedFormEncTypes, _excluded, _excluded2, _excluded3, START_TRANSITION2, startTransitionImpl2, isBrowser, ABSOLUTE_URL_REGEX2, Link, NavLink, Form, FormImpl, DataRouterHook2, DataRouterStateHook2, fetcherId, SCROLL_RESTORATION_STORAGE_KEY, savedScrollPositions, init_dist2 = __esm({
  "node_modules/react-router-dom/dist/index.js"() {
    React2 = __toESM(require_react());
    init_dist();
    init_dist();
    init_router();
    defaultMethod = "get", defaultEncType = "application/x-www-form-urlencoded";
    _formDataSupportsSubmitter = null;
    supportedFormEncTypes = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
    _excluded = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset"], _excluded2 = ["aria-current", "caseSensitive", "className", "end", "style", "to", "children"], _excluded3 = ["reloadDocument", "replace", "state", "method", "action", "onSubmit", "submit", "relative", "preventScrollReset"];
    START_TRANSITION2 = "startTransition", startTransitionImpl2 = React2[START_TRANSITION2];
    HistoryRouter.displayName = "unstable_HistoryRouter";
    isBrowser = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", ABSOLUTE_URL_REGEX2 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Link = /* @__PURE__ */ React2.forwardRef(function(_ref4, ref) {
      let {
        onClick,
        relative,
        reloadDocument,
        replace,
        state,
        target,
        to,
        preventScrollReset
      } = _ref4, rest = _objectWithoutPropertiesLoose(_ref4, _excluded), {
        basename
      } = React2.useContext(NavigationContext), absoluteHref, isExternal = !1;
      if (typeof to == "string" && ABSOLUTE_URL_REGEX2.test(to) && (absoluteHref = to, isBrowser))
        try {
          let currentUrl = new URL(window.location.href), targetUrl = to.startsWith("//") ? new URL(currentUrl.protocol + to) : new URL(to), path = stripBasename(targetUrl.pathname, basename);
          targetUrl.origin === currentUrl.origin && path != null ? to = path + targetUrl.search + targetUrl.hash : isExternal = !0;
        } catch {
          warning(!1, '<Link to="' + to + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
        }
      let href = useHref(to, {
        relative
      }), internalOnClick = useLinkClickHandler(to, {
        replace,
        state,
        target,
        preventScrollReset,
        relative
      });
      function handleClick(event) {
        onClick && onClick(event), event.defaultPrevented || internalOnClick(event);
      }
      return (
        // eslint-disable-next-line jsx-a11y/anchor-has-content
        /* @__PURE__ */ React2.createElement("a", _extends3({}, rest, {
          href: absoluteHref || href,
          onClick: isExternal || reloadDocument ? onClick : handleClick,
          ref,
          target
        }))
      );
    });
    Link.displayName = "Link";
    NavLink = /* @__PURE__ */ React2.forwardRef(function(_ref5, ref) {
      let {
        "aria-current": ariaCurrentProp = "page",
        caseSensitive = !1,
        className: classNameProp = "",
        end = !1,
        style: styleProp,
        to,
        children
      } = _ref5, rest = _objectWithoutPropertiesLoose(_ref5, _excluded2), path = useResolvedPath(to, {
        relative: rest.relative
      }), location2 = useLocation(), routerState = React2.useContext(DataRouterStateContext), {
        navigator: navigator2
      } = React2.useContext(NavigationContext), toPathname = navigator2.encodeLocation ? navigator2.encodeLocation(path).pathname : path.pathname, locationPathname = location2.pathname, nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;
      caseSensitive || (locationPathname = locationPathname.toLowerCase(), nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null, toPathname = toPathname.toLowerCase());
      let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(toPathname.length) === "/", isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/"), ariaCurrent = isActive ? ariaCurrentProp : void 0, className;
      typeof classNameProp == "function" ? className = classNameProp({
        isActive,
        isPending
      }) : className = [classNameProp, isActive ? "active" : null, isPending ? "pending" : null].filter(Boolean).join(" ");
      let style = typeof styleProp == "function" ? styleProp({
        isActive,
        isPending
      }) : styleProp;
      return /* @__PURE__ */ React2.createElement(Link, _extends3({}, rest, {
        "aria-current": ariaCurrent,
        className,
        ref,
        style,
        to
      }), typeof children == "function" ? children({
        isActive,
        isPending
      }) : children);
    });
    NavLink.displayName = "NavLink";
    Form = /* @__PURE__ */ React2.forwardRef((props, ref) => {
      let submit = useSubmit();
      return /* @__PURE__ */ React2.createElement(FormImpl, _extends3({}, props, {
        submit,
        ref
      }));
    });
    Form.displayName = "Form";
    FormImpl = /* @__PURE__ */ React2.forwardRef((_ref6, forwardedRef) => {
      let {
        reloadDocument,
        replace,
        state,
        method = defaultMethod,
        action,
        onSubmit,
        submit,
        relative,
        preventScrollReset
      } = _ref6, props = _objectWithoutPropertiesLoose(_ref6, _excluded3), formMethod = method.toLowerCase() === "get" ? "get" : "post", formAction = useFormAction(action, {
        relative
      });
      return /* @__PURE__ */ React2.createElement("form", _extends3({
        ref: forwardedRef,
        method: formMethod,
        action: formAction,
        onSubmit: reloadDocument ? onSubmit : (event) => {
          if (onSubmit && onSubmit(event), event.defaultPrevented)
            return;
          event.preventDefault();
          let submitter = event.nativeEvent.submitter, submitMethod = (submitter == null ? void 0 : submitter.getAttribute("formmethod")) || method;
          submit(submitter || event.currentTarget, {
            method: submitMethod,
            replace,
            state,
            relative,
            preventScrollReset
          });
        }
      }, props));
    });
    FormImpl.displayName = "FormImpl";
    ScrollRestoration.displayName = "ScrollRestoration";
    (function(DataRouterHook3) {
      DataRouterHook3.UseScrollRestoration = "useScrollRestoration", DataRouterHook3.UseSubmit = "useSubmit", DataRouterHook3.UseSubmitFetcher = "useSubmitFetcher", DataRouterHook3.UseFetcher = "useFetcher";
    })(DataRouterHook2 || (DataRouterHook2 = {}));
    (function(DataRouterStateHook3) {
      DataRouterStateHook3.UseFetchers = "useFetchers", DataRouterStateHook3.UseScrollRestoration = "useScrollRestoration";
    })(DataRouterStateHook2 || (DataRouterStateHook2 = {}));
    fetcherId = 0;
    SCROLL_RESTORATION_STORAGE_KEY = "react-router-scroll-positions", savedScrollPositions = {};
  }
});

// node_modules/react-router-dom/server.js
var require_server = __commonJS({
  "node_modules/react-router-dom/server.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var React7 = require_react(), router = (init_router(), __toCommonJS(router_exports)), reactRouter = (init_dist(), __toCommonJS(dist_exports)), reactRouterDom = (init_dist2(), __toCommonJS(dist_exports2));
    function _interopNamespace(e) {
      if (e && e.__esModule)
        return e;
      var n = /* @__PURE__ */ Object.create(null);
      return e && Object.keys(e).forEach(function(k) {
        if (k !== "default") {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: !0,
            get: function() {
              return e[k];
            }
          });
        }
      }), n.default = e, Object.freeze(n);
    }
    var React__namespace = /* @__PURE__ */ _interopNamespace(React7);
    function StaticRouter({
      basename,
      children,
      location: locationProp = "/"
    }) {
      typeof locationProp == "string" && (locationProp = reactRouterDom.parsePath(locationProp));
      let action = router.Action.Pop, location2 = {
        pathname: locationProp.pathname || "/",
        search: locationProp.search || "",
        hash: locationProp.hash || "",
        state: locationProp.state || null,
        key: locationProp.key || "default"
      }, staticNavigator = getStatelessNavigator();
      return /* @__PURE__ */ React__namespace.createElement(reactRouterDom.Router, {
        basename,
        children,
        location: location2,
        navigationType: action,
        navigator: staticNavigator,
        static: !0
      });
    }
    function StaticRouterProvider2({
      context,
      router: router$1,
      hydrate = !0,
      nonce
    }) {
      router$1 && context || router.UNSAFE_invariant(!1, "You must provide `router` and `context` to <StaticRouterProvider>");
      let dataRouterContext = {
        router: router$1,
        navigator: getStatelessNavigator(),
        static: !0,
        staticContext: context,
        basename: context.basename || "/"
      }, hydrateScript = "";
      if (hydrate !== !1) {
        let data = {
          loaderData: context.loaderData,
          actionData: context.actionData,
          errors: serializeErrors2(context.errors)
        };
        hydrateScript = `window.__staticRouterHydrationData = JSON.parse(${htmlEscape(JSON.stringify(JSON.stringify(data)))});`;
      }
      let {
        state
      } = dataRouterContext.router;
      return /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, /* @__PURE__ */ React__namespace.createElement(reactRouterDom.UNSAFE_DataRouterContext.Provider, {
        value: dataRouterContext
      }, /* @__PURE__ */ React__namespace.createElement(reactRouterDom.UNSAFE_DataRouterStateContext.Provider, {
        value: state
      }, /* @__PURE__ */ React__namespace.createElement(reactRouterDom.Router, {
        basename: dataRouterContext.basename,
        location: state.location,
        navigationType: state.historyAction,
        navigator: dataRouterContext.navigator,
        static: dataRouterContext.static
      }, /* @__PURE__ */ React__namespace.createElement(DataRoutes2, {
        routes: router$1.routes,
        state
      })))), hydrateScript ? /* @__PURE__ */ React__namespace.createElement("script", {
        suppressHydrationWarning: !0,
        nonce,
        dangerouslySetInnerHTML: {
          __html: hydrateScript
        }
      }) : null);
    }
    function DataRoutes2({
      routes: routes2,
      state
    }) {
      return reactRouter.UNSAFE_useRoutesImpl(routes2, void 0, state);
    }
    function serializeErrors2(errors) {
      if (!errors)
        return null;
      let entries = Object.entries(errors), serialized = {};
      for (let [key, val] of entries)
        router.isRouteErrorResponse(val) ? serialized[key] = {
          ...val,
          __type: "RouteErrorResponse"
        } : val instanceof Error ? serialized[key] = {
          message: val.message,
          __type: "Error",
          // If this is a subclass (i.e., ReferenceError), send up the type so we
          // can re-create the same type during hydration.
          ...val.name !== "Error" ? {
            __subType: val.name
          } : {}
        } : serialized[key] = val;
      return serialized;
    }
    function getStatelessNavigator() {
      return {
        createHref,
        encodeLocation,
        push(to) {
          throw new Error(`You cannot use navigator.push() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)})\` somewhere in your app.`);
        },
        replace(to) {
          throw new Error(`You cannot use navigator.replace() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)}, { replace: true })\` somewhere in your app.`);
        },
        go(delta) {
          throw new Error(`You cannot use navigator.go() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${delta})\` somewhere in your app.`);
        },
        back() {
          throw new Error("You cannot use navigator.back() on the server because it is a stateless environment.");
        },
        forward() {
          throw new Error("You cannot use navigator.forward() on the server because it is a stateless environment.");
        }
      };
    }
    function createStaticHandler2(routes2, opts) {
      return router.createStaticHandler(routes2, {
        ...opts,
        mapRouteProperties: reactRouter.UNSAFE_mapRouteProperties
      });
    }
    function createStaticRouter2(routes2, context) {
      let manifest = {}, dataRoutes = router.UNSAFE_convertRoutesToDataRoutes(routes2, reactRouter.UNSAFE_mapRouteProperties, void 0, manifest), matches = context.matches.map((match) => {
        let route = manifest[match.route.id] || match.route;
        return {
          ...match,
          route
        };
      }), msg = (method) => `You cannot use router.${method}() on the server because it is a stateless environment`;
      return {
        get basename() {
          return context.basename;
        },
        get state() {
          return {
            historyAction: router.Action.Pop,
            location: context.location,
            matches,
            loaderData: context.loaderData,
            actionData: context.actionData,
            errors: context.errors,
            initialized: !0,
            navigation: router.IDLE_NAVIGATION,
            restoreScrollPosition: null,
            preventScrollReset: !1,
            revalidation: "idle",
            fetchers: /* @__PURE__ */ new Map(),
            blockers: /* @__PURE__ */ new Map()
          };
        },
        get routes() {
          return dataRoutes;
        },
        initialize() {
          throw msg("initialize");
        },
        subscribe() {
          throw msg("subscribe");
        },
        enableScrollRestoration() {
          throw msg("enableScrollRestoration");
        },
        navigate() {
          throw msg("navigate");
        },
        fetch() {
          throw msg("fetch");
        },
        revalidate() {
          throw msg("revalidate");
        },
        createHref,
        encodeLocation,
        getFetcher() {
          return router.IDLE_FETCHER;
        },
        deleteFetcher() {
          throw msg("deleteFetcher");
        },
        dispose() {
          throw msg("dispose");
        },
        getBlocker() {
          return router.IDLE_BLOCKER;
        },
        deleteBlocker() {
          throw msg("deleteBlocker");
        },
        _internalFetchControllers: /* @__PURE__ */ new Map(),
        _internalActiveDeferreds: /* @__PURE__ */ new Map(),
        _internalSetRoutes() {
          throw msg("_internalSetRoutes");
        }
      };
    }
    function createHref(to) {
      return typeof to == "string" ? to : reactRouterDom.createPath(to);
    }
    function encodeLocation(to) {
      let path = typeof to == "string" ? reactRouterDom.parsePath(to) : to;
      return {
        pathname: path.pathname || "",
        search: path.search || "",
        hash: path.hash || ""
      };
    }
    var ESCAPE_LOOKUP3 = {
      "&": "\\u0026",
      ">": "\\u003e",
      "<": "\\u003c",
      "\u2028": "\\u2028",
      "\u2029": "\\u2029"
    }, ESCAPE_REGEX3 = /[&><\u2028\u2029]/g;
    function htmlEscape(str) {
      return str.replace(ESCAPE_REGEX3, (match) => ESCAPE_LOOKUP3[match]);
    }
    exports.StaticRouter = StaticRouter;
    exports.StaticRouterProvider = StaticRouterProvider2;
    exports.createStaticHandler = createStaticHandler2;
    exports.createStaticRouter = createStaticRouter2;
  }
});

// node_modules/react-dom/cjs/react-dom-server-legacy.browser.development.js
var require_react_dom_server_legacy_browser_development = __commonJS({
  "node_modules/react-dom/cjs/react-dom-server-legacy.browser.development.js"(exports) {
    "use strict";
    (function() {
      "use strict";
      var React7 = require_react(), ReactVersion = "18.2.0", ReactSharedInternals = React7.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function warn(format) {
        {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++)
            args[_key - 1] = arguments[_key];
          printWarning("warn", format, args);
        }
      }
      function error(format) {
        {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++)
            args[_key2 - 1] = arguments[_key2];
          printWarning("error", format, args);
        }
      }
      function printWarning(level, format, args) {
        {
          var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame, stack = ReactDebugCurrentFrame2.getStackAddendum();
          stack !== "" && (format += "%s", args = args.concat([stack]));
          var argsWithFormat = args.map(function(item) {
            return String(item);
          });
          argsWithFormat.unshift("Warning: " + format), Function.prototype.apply.call(console[level], console, argsWithFormat);
        }
      }
      function scheduleWork(callback) {
        callback();
      }
      function beginWriting(destination) {
      }
      function writeChunk(destination, chunk) {
        writeChunkAndReturn(destination, chunk);
      }
      function writeChunkAndReturn(destination, chunk) {
        return destination.push(chunk);
      }
      function completeWriting(destination) {
      }
      function close(destination) {
        destination.push(null);
      }
      function stringToChunk(content) {
        return content;
      }
      function stringToPrecomputedChunk(content) {
        return content;
      }
      function closeWithError(destination, error2) {
        destination.destroy(error2);
      }
      function typeName(value) {
        {
          var hasToStringTag = typeof Symbol == "function" && Symbol.toStringTag, type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          return type;
        }
      }
      function willCoercionThrow(value) {
        try {
          return testStringCoercion(value), !1;
        } catch {
          return !0;
        }
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkAttributeStringCoercion(value, attributeName) {
        if (willCoercionThrow(value))
          return error("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", attributeName, typeName(value)), testStringCoercion(value);
      }
      function checkCSSPropertyStringCoercion(value, propName) {
        if (willCoercionThrow(value))
          return error("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", propName, typeName(value)), testStringCoercion(value);
      }
      function checkHtmlStringCoercion(value) {
        if (willCoercionThrow(value))
          return error("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value)), testStringCoercion(value);
      }
      var hasOwnProperty = Object.prototype.hasOwnProperty, RESERVED = 0, STRING = 1, BOOLEANISH_STRING = 2, BOOLEAN = 3, OVERLOADED_BOOLEAN = 4, NUMERIC = 5, POSITIVE_NUMERIC = 6, ATTRIBUTE_NAME_START_CHAR = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", VALID_ATTRIBUTE_NAME_REGEX = new RegExp("^[" + ATTRIBUTE_NAME_START_CHAR + "][" + ATTRIBUTE_NAME_CHAR + "]*$"), illegalAttributeNameCache = {}, validatedAttributeNameCache = {};
      function isAttributeNameSafe(attributeName) {
        return hasOwnProperty.call(validatedAttributeNameCache, attributeName) ? !0 : hasOwnProperty.call(illegalAttributeNameCache, attributeName) ? !1 : VALID_ATTRIBUTE_NAME_REGEX.test(attributeName) ? (validatedAttributeNameCache[attributeName] = !0, !0) : (illegalAttributeNameCache[attributeName] = !0, error("Invalid attribute name: `%s`", attributeName), !1);
      }
      function shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag) {
        if (propertyInfo !== null && propertyInfo.type === RESERVED)
          return !1;
        switch (typeof value) {
          case "function":
          case "symbol":
            return !0;
          case "boolean": {
            if (isCustomComponentTag)
              return !1;
            if (propertyInfo !== null)
              return !propertyInfo.acceptsBooleans;
            var prefix2 = name.toLowerCase().slice(0, 5);
            return prefix2 !== "data-" && prefix2 !== "aria-";
          }
          default:
            return !1;
        }
      }
      function getPropertyInfo(name) {
        return properties.hasOwnProperty(name) ? properties[name] : null;
      }
      function PropertyInfoRecord(name, type, mustUseProperty, attributeName, attributeNamespace, sanitizeURL2, removeEmptyString) {
        this.acceptsBooleans = type === BOOLEANISH_STRING || type === BOOLEAN || type === OVERLOADED_BOOLEAN, this.attributeName = attributeName, this.attributeNamespace = attributeNamespace, this.mustUseProperty = mustUseProperty, this.propertyName = name, this.type = type, this.sanitizeURL = sanitizeURL2, this.removeEmptyString = removeEmptyString;
      }
      var properties = {}, reservedProps = [
        "children",
        "dangerouslySetInnerHTML",
        // TODO: This prevents the assignment of defaultValue to regular
        // elements (not just inputs). Now that ReactDOMInput assigns to the
        // defaultValue property -- do we need this?
        "defaultValue",
        "defaultChecked",
        "innerHTML",
        "suppressContentEditableWarning",
        "suppressHydrationWarning",
        "style"
      ];
      reservedProps.forEach(function(name) {
        properties[name] = new PropertyInfoRecord(
          name,
          RESERVED,
          !1,
          // mustUseProperty
          name,
          // attributeName
          null,
          // attributeNamespace
          !1,
          // sanitizeURL
          !1
        );
      }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(_ref) {
        var name = _ref[0], attributeName = _ref[1];
        properties[name] = new PropertyInfoRecord(
          name,
          STRING,
          !1,
          // mustUseProperty
          attributeName,
          // attributeName
          null,
          // attributeNamespace
          !1,
          // sanitizeURL
          !1
        );
      }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(name) {
        properties[name] = new PropertyInfoRecord(
          name,
          BOOLEANISH_STRING,
          !1,
          // mustUseProperty
          name.toLowerCase(),
          // attributeName
          null,
          // attributeNamespace
          !1,
          // sanitizeURL
          !1
        );
      }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(name) {
        properties[name] = new PropertyInfoRecord(
          name,
          BOOLEANISH_STRING,
          !1,
          // mustUseProperty
          name,
          // attributeName
          null,
          // attributeNamespace
          !1,
          // sanitizeURL
          !1
        );
      }), [
        "allowFullScreen",
        "async",
        // Note: there is a special case that prevents it from being written to the DOM
        // on the client side because the browsers are inconsistent. Instead we call focus().
        "autoFocus",
        "autoPlay",
        "controls",
        "default",
        "defer",
        "disabled",
        "disablePictureInPicture",
        "disableRemotePlayback",
        "formNoValidate",
        "hidden",
        "loop",
        "noModule",
        "noValidate",
        "open",
        "playsInline",
        "readOnly",
        "required",
        "reversed",
        "scoped",
        "seamless",
        // Microdata
        "itemScope"
      ].forEach(function(name) {
        properties[name] = new PropertyInfoRecord(
          name,
          BOOLEAN,
          !1,
          // mustUseProperty
          name.toLowerCase(),
          // attributeName
          null,
          // attributeNamespace
          !1,
          // sanitizeURL
          !1
        );
      }), [
        "checked",
        // Note: `option.selected` is not updated if `select.multiple` is
        // disabled with `removeAttribute`. We have special logic for handling this.
        "multiple",
        "muted",
        "selected"
        // NOTE: if you add a camelCased prop to this list,
        // you'll need to set attributeName to name.toLowerCase()
        // instead in the assignment below.
      ].forEach(function(name) {
        properties[name] = new PropertyInfoRecord(
          name,
          BOOLEAN,
          !0,
          // mustUseProperty
          name,
          // attributeName
          null,
          // attributeNamespace
          !1,
          // sanitizeURL
          !1
        );
      }), [
        "capture",
        "download"
        // NOTE: if you add a camelCased prop to this list,
        // you'll need to set attributeName to name.toLowerCase()
        // instead in the assignment below.
      ].forEach(function(name) {
        properties[name] = new PropertyInfoRecord(
          name,
          OVERLOADED_BOOLEAN,
          !1,
          // mustUseProperty
          name,
          // attributeName
          null,
          // attributeNamespace
          !1,
          // sanitizeURL
          !1
        );
      }), [
        "cols",
        "rows",
        "size",
        "span"
        // NOTE: if you add a camelCased prop to this list,
        // you'll need to set attributeName to name.toLowerCase()
        // instead in the assignment below.
      ].forEach(function(name) {
        properties[name] = new PropertyInfoRecord(
          name,
          POSITIVE_NUMERIC,
          !1,
          // mustUseProperty
          name,
          // attributeName
          null,
          // attributeNamespace
          !1,
          // sanitizeURL
          !1
        );
      }), ["rowSpan", "start"].forEach(function(name) {
        properties[name] = new PropertyInfoRecord(
          name,
          NUMERIC,
          !1,
          // mustUseProperty
          name.toLowerCase(),
          // attributeName
          null,
          // attributeNamespace
          !1,
          // sanitizeURL
          !1
        );
      });
      var CAMELIZE = /[\-\:]([a-z])/g, capitalize = function(token) {
        return token[1].toUpperCase();
      };
      [
        "accent-height",
        "alignment-baseline",
        "arabic-form",
        "baseline-shift",
        "cap-height",
        "clip-path",
        "clip-rule",
        "color-interpolation",
        "color-interpolation-filters",
        "color-profile",
        "color-rendering",
        "dominant-baseline",
        "enable-background",
        "fill-opacity",
        "fill-rule",
        "flood-color",
        "flood-opacity",
        "font-family",
        "font-size",
        "font-size-adjust",
        "font-stretch",
        "font-style",
        "font-variant",
        "font-weight",
        "glyph-name",
        "glyph-orientation-horizontal",
        "glyph-orientation-vertical",
        "horiz-adv-x",
        "horiz-origin-x",
        "image-rendering",
        "letter-spacing",
        "lighting-color",
        "marker-end",
        "marker-mid",
        "marker-start",
        "overline-position",
        "overline-thickness",
        "paint-order",
        "panose-1",
        "pointer-events",
        "rendering-intent",
        "shape-rendering",
        "stop-color",
        "stop-opacity",
        "strikethrough-position",
        "strikethrough-thickness",
        "stroke-dasharray",
        "stroke-dashoffset",
        "stroke-linecap",
        "stroke-linejoin",
        "stroke-miterlimit",
        "stroke-opacity",
        "stroke-width",
        "text-anchor",
        "text-decoration",
        "text-rendering",
        "underline-position",
        "underline-thickness",
        "unicode-bidi",
        "unicode-range",
        "units-per-em",
        "v-alphabetic",
        "v-hanging",
        "v-ideographic",
        "v-mathematical",
        "vector-effect",
        "vert-adv-y",
        "vert-origin-x",
        "vert-origin-y",
        "word-spacing",
        "writing-mode",
        "xmlns:xlink",
        "x-height"
        // NOTE: if you add a camelCased prop to this list,
        // you'll need to set attributeName to name.toLowerCase()
        // instead in the assignment below.
      ].forEach(function(attributeName) {
        var name = attributeName.replace(CAMELIZE, capitalize);
        properties[name] = new PropertyInfoRecord(
          name,
          STRING,
          !1,
          // mustUseProperty
          attributeName,
          null,
          // attributeNamespace
          !1,
          // sanitizeURL
          !1
        );
      }), [
        "xlink:actuate",
        "xlink:arcrole",
        "xlink:role",
        "xlink:show",
        "xlink:title",
        "xlink:type"
        // NOTE: if you add a camelCased prop to this list,
        // you'll need to set attributeName to name.toLowerCase()
        // instead in the assignment below.
      ].forEach(function(attributeName) {
        var name = attributeName.replace(CAMELIZE, capitalize);
        properties[name] = new PropertyInfoRecord(
          name,
          STRING,
          !1,
          // mustUseProperty
          attributeName,
          "http://www.w3.org/1999/xlink",
          !1,
          // sanitizeURL
          !1
        );
      }), [
        "xml:base",
        "xml:lang",
        "xml:space"
        // NOTE: if you add a camelCased prop to this list,
        // you'll need to set attributeName to name.toLowerCase()
        // instead in the assignment below.
      ].forEach(function(attributeName) {
        var name = attributeName.replace(CAMELIZE, capitalize);
        properties[name] = new PropertyInfoRecord(
          name,
          STRING,
          !1,
          // mustUseProperty
          attributeName,
          "http://www.w3.org/XML/1998/namespace",
          !1,
          // sanitizeURL
          !1
        );
      }), ["tabIndex", "crossOrigin"].forEach(function(attributeName) {
        properties[attributeName] = new PropertyInfoRecord(
          attributeName,
          STRING,
          !1,
          // mustUseProperty
          attributeName.toLowerCase(),
          // attributeName
          null,
          // attributeNamespace
          !1,
          // sanitizeURL
          !1
        );
      });
      var xlinkHref = "xlinkHref";
      properties[xlinkHref] = new PropertyInfoRecord(
        "xlinkHref",
        STRING,
        !1,
        // mustUseProperty
        "xlink:href",
        "http://www.w3.org/1999/xlink",
        !0,
        // sanitizeURL
        !1
      ), ["src", "href", "action", "formAction"].forEach(function(attributeName) {
        properties[attributeName] = new PropertyInfoRecord(
          attributeName,
          STRING,
          !1,
          // mustUseProperty
          attributeName.toLowerCase(),
          // attributeName
          null,
          // attributeNamespace
          !0,
          // sanitizeURL
          !0
        );
      });
      var isUnitlessNumber = {
        animationIterationCount: !0,
        aspectRatio: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridArea: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        // SVG-related properties
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0
      };
      function prefixKey(prefix2, key) {
        return prefix2 + key.charAt(0).toUpperCase() + key.substring(1);
      }
      var prefixes = ["Webkit", "ms", "Moz", "O"];
      Object.keys(isUnitlessNumber).forEach(function(prop) {
        prefixes.forEach(function(prefix2) {
          isUnitlessNumber[prefixKey(prefix2, prop)] = isUnitlessNumber[prop];
        });
      });
      var hasReadOnlyValue = {
        button: !0,
        checkbox: !0,
        image: !0,
        hidden: !0,
        radio: !0,
        reset: !0,
        submit: !0
      };
      function checkControlledValueProps(tagName, props) {
        hasReadOnlyValue[props.type] || props.onChange || props.onInput || props.readOnly || props.disabled || props.value == null || error("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), props.onChange || props.readOnly || props.disabled || props.checked == null || error("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
      }
      function isCustomComponent(tagName, props) {
        if (tagName.indexOf("-") === -1)
          return typeof props.is == "string";
        switch (tagName) {
          case "annotation-xml":
          case "color-profile":
          case "font-face":
          case "font-face-src":
          case "font-face-uri":
          case "font-face-format":
          case "font-face-name":
          case "missing-glyph":
            return !1;
          default:
            return !0;
        }
      }
      var ariaProperties = {
        "aria-current": 0,
        // state
        "aria-description": 0,
        "aria-details": 0,
        "aria-disabled": 0,
        // state
        "aria-hidden": 0,
        // state
        "aria-invalid": 0,
        // state
        "aria-keyshortcuts": 0,
        "aria-label": 0,
        "aria-roledescription": 0,
        // Widget Attributes
        "aria-autocomplete": 0,
        "aria-checked": 0,
        "aria-expanded": 0,
        "aria-haspopup": 0,
        "aria-level": 0,
        "aria-modal": 0,
        "aria-multiline": 0,
        "aria-multiselectable": 0,
        "aria-orientation": 0,
        "aria-placeholder": 0,
        "aria-pressed": 0,
        "aria-readonly": 0,
        "aria-required": 0,
        "aria-selected": 0,
        "aria-sort": 0,
        "aria-valuemax": 0,
        "aria-valuemin": 0,
        "aria-valuenow": 0,
        "aria-valuetext": 0,
        // Live Region Attributes
        "aria-atomic": 0,
        "aria-busy": 0,
        "aria-live": 0,
        "aria-relevant": 0,
        // Drag-and-Drop Attributes
        "aria-dropeffect": 0,
        "aria-grabbed": 0,
        // Relationship Attributes
        "aria-activedescendant": 0,
        "aria-colcount": 0,
        "aria-colindex": 0,
        "aria-colspan": 0,
        "aria-controls": 0,
        "aria-describedby": 0,
        "aria-errormessage": 0,
        "aria-flowto": 0,
        "aria-labelledby": 0,
        "aria-owns": 0,
        "aria-posinset": 0,
        "aria-rowcount": 0,
        "aria-rowindex": 0,
        "aria-rowspan": 0,
        "aria-setsize": 0
      }, warnedProperties = {}, rARIA = new RegExp("^(aria)-[" + ATTRIBUTE_NAME_CHAR + "]*$"), rARIACamel = new RegExp("^(aria)[A-Z][" + ATTRIBUTE_NAME_CHAR + "]*$");
      function validateProperty(tagName, name) {
        {
          if (hasOwnProperty.call(warnedProperties, name) && warnedProperties[name])
            return !0;
          if (rARIACamel.test(name)) {
            var ariaName = "aria-" + name.slice(4).toLowerCase(), correctName = ariaProperties.hasOwnProperty(ariaName) ? ariaName : null;
            if (correctName == null)
              return error("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", name), warnedProperties[name] = !0, !0;
            if (name !== correctName)
              return error("Invalid ARIA attribute `%s`. Did you mean `%s`?", name, correctName), warnedProperties[name] = !0, !0;
          }
          if (rARIA.test(name)) {
            var lowerCasedName = name.toLowerCase(), standardName = ariaProperties.hasOwnProperty(lowerCasedName) ? lowerCasedName : null;
            if (standardName == null)
              return warnedProperties[name] = !0, !1;
            if (name !== standardName)
              return error("Unknown ARIA attribute `%s`. Did you mean `%s`?", name, standardName), warnedProperties[name] = !0, !0;
          }
        }
        return !0;
      }
      function warnInvalidARIAProps(type, props) {
        {
          var invalidProps = [];
          for (var key in props) {
            var isValid = validateProperty(type, key);
            isValid || invalidProps.push(key);
          }
          var unknownPropString = invalidProps.map(function(prop) {
            return "`" + prop + "`";
          }).join(", ");
          invalidProps.length === 1 ? error("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", unknownPropString, type) : invalidProps.length > 1 && error("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", unknownPropString, type);
        }
      }
      function validateProperties(type, props) {
        isCustomComponent(type, props) || warnInvalidARIAProps(type, props);
      }
      var didWarnValueNull = !1;
      function validateProperties$1(type, props) {
        {
          if (type !== "input" && type !== "textarea" && type !== "select")
            return;
          props != null && props.value === null && !didWarnValueNull && (didWarnValueNull = !0, type === "select" && props.multiple ? error("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", type) : error("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", type));
        }
      }
      var possibleStandardNames = {
        // HTML
        accept: "accept",
        acceptcharset: "acceptCharset",
        "accept-charset": "acceptCharset",
        accesskey: "accessKey",
        action: "action",
        allowfullscreen: "allowFullScreen",
        alt: "alt",
        as: "as",
        async: "async",
        autocapitalize: "autoCapitalize",
        autocomplete: "autoComplete",
        autocorrect: "autoCorrect",
        autofocus: "autoFocus",
        autoplay: "autoPlay",
        autosave: "autoSave",
        capture: "capture",
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        challenge: "challenge",
        charset: "charSet",
        checked: "checked",
        children: "children",
        cite: "cite",
        class: "className",
        classid: "classID",
        classname: "className",
        cols: "cols",
        colspan: "colSpan",
        content: "content",
        contenteditable: "contentEditable",
        contextmenu: "contextMenu",
        controls: "controls",
        controlslist: "controlsList",
        coords: "coords",
        crossorigin: "crossOrigin",
        dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
        data: "data",
        datetime: "dateTime",
        default: "default",
        defaultchecked: "defaultChecked",
        defaultvalue: "defaultValue",
        defer: "defer",
        dir: "dir",
        disabled: "disabled",
        disablepictureinpicture: "disablePictureInPicture",
        disableremoteplayback: "disableRemotePlayback",
        download: "download",
        draggable: "draggable",
        enctype: "encType",
        enterkeyhint: "enterKeyHint",
        for: "htmlFor",
        form: "form",
        formmethod: "formMethod",
        formaction: "formAction",
        formenctype: "formEncType",
        formnovalidate: "formNoValidate",
        formtarget: "formTarget",
        frameborder: "frameBorder",
        headers: "headers",
        height: "height",
        hidden: "hidden",
        high: "high",
        href: "href",
        hreflang: "hrefLang",
        htmlfor: "htmlFor",
        httpequiv: "httpEquiv",
        "http-equiv": "httpEquiv",
        icon: "icon",
        id: "id",
        imagesizes: "imageSizes",
        imagesrcset: "imageSrcSet",
        innerhtml: "innerHTML",
        inputmode: "inputMode",
        integrity: "integrity",
        is: "is",
        itemid: "itemID",
        itemprop: "itemProp",
        itemref: "itemRef",
        itemscope: "itemScope",
        itemtype: "itemType",
        keyparams: "keyParams",
        keytype: "keyType",
        kind: "kind",
        label: "label",
        lang: "lang",
        list: "list",
        loop: "loop",
        low: "low",
        manifest: "manifest",
        marginwidth: "marginWidth",
        marginheight: "marginHeight",
        max: "max",
        maxlength: "maxLength",
        media: "media",
        mediagroup: "mediaGroup",
        method: "method",
        min: "min",
        minlength: "minLength",
        multiple: "multiple",
        muted: "muted",
        name: "name",
        nomodule: "noModule",
        nonce: "nonce",
        novalidate: "noValidate",
        open: "open",
        optimum: "optimum",
        pattern: "pattern",
        placeholder: "placeholder",
        playsinline: "playsInline",
        poster: "poster",
        preload: "preload",
        profile: "profile",
        radiogroup: "radioGroup",
        readonly: "readOnly",
        referrerpolicy: "referrerPolicy",
        rel: "rel",
        required: "required",
        reversed: "reversed",
        role: "role",
        rows: "rows",
        rowspan: "rowSpan",
        sandbox: "sandbox",
        scope: "scope",
        scoped: "scoped",
        scrolling: "scrolling",
        seamless: "seamless",
        selected: "selected",
        shape: "shape",
        size: "size",
        sizes: "sizes",
        span: "span",
        spellcheck: "spellCheck",
        src: "src",
        srcdoc: "srcDoc",
        srclang: "srcLang",
        srcset: "srcSet",
        start: "start",
        step: "step",
        style: "style",
        summary: "summary",
        tabindex: "tabIndex",
        target: "target",
        title: "title",
        type: "type",
        usemap: "useMap",
        value: "value",
        width: "width",
        wmode: "wmode",
        wrap: "wrap",
        // SVG
        about: "about",
        accentheight: "accentHeight",
        "accent-height": "accentHeight",
        accumulate: "accumulate",
        additive: "additive",
        alignmentbaseline: "alignmentBaseline",
        "alignment-baseline": "alignmentBaseline",
        allowreorder: "allowReorder",
        alphabetic: "alphabetic",
        amplitude: "amplitude",
        arabicform: "arabicForm",
        "arabic-form": "arabicForm",
        ascent: "ascent",
        attributename: "attributeName",
        attributetype: "attributeType",
        autoreverse: "autoReverse",
        azimuth: "azimuth",
        basefrequency: "baseFrequency",
        baselineshift: "baselineShift",
        "baseline-shift": "baselineShift",
        baseprofile: "baseProfile",
        bbox: "bbox",
        begin: "begin",
        bias: "bias",
        by: "by",
        calcmode: "calcMode",
        capheight: "capHeight",
        "cap-height": "capHeight",
        clip: "clip",
        clippath: "clipPath",
        "clip-path": "clipPath",
        clippathunits: "clipPathUnits",
        cliprule: "clipRule",
        "clip-rule": "clipRule",
        color: "color",
        colorinterpolation: "colorInterpolation",
        "color-interpolation": "colorInterpolation",
        colorinterpolationfilters: "colorInterpolationFilters",
        "color-interpolation-filters": "colorInterpolationFilters",
        colorprofile: "colorProfile",
        "color-profile": "colorProfile",
        colorrendering: "colorRendering",
        "color-rendering": "colorRendering",
        contentscripttype: "contentScriptType",
        contentstyletype: "contentStyleType",
        cursor: "cursor",
        cx: "cx",
        cy: "cy",
        d: "d",
        datatype: "datatype",
        decelerate: "decelerate",
        descent: "descent",
        diffuseconstant: "diffuseConstant",
        direction: "direction",
        display: "display",
        divisor: "divisor",
        dominantbaseline: "dominantBaseline",
        "dominant-baseline": "dominantBaseline",
        dur: "dur",
        dx: "dx",
        dy: "dy",
        edgemode: "edgeMode",
        elevation: "elevation",
        enablebackground: "enableBackground",
        "enable-background": "enableBackground",
        end: "end",
        exponent: "exponent",
        externalresourcesrequired: "externalResourcesRequired",
        fill: "fill",
        fillopacity: "fillOpacity",
        "fill-opacity": "fillOpacity",
        fillrule: "fillRule",
        "fill-rule": "fillRule",
        filter: "filter",
        filterres: "filterRes",
        filterunits: "filterUnits",
        floodopacity: "floodOpacity",
        "flood-opacity": "floodOpacity",
        floodcolor: "floodColor",
        "flood-color": "floodColor",
        focusable: "focusable",
        fontfamily: "fontFamily",
        "font-family": "fontFamily",
        fontsize: "fontSize",
        "font-size": "fontSize",
        fontsizeadjust: "fontSizeAdjust",
        "font-size-adjust": "fontSizeAdjust",
        fontstretch: "fontStretch",
        "font-stretch": "fontStretch",
        fontstyle: "fontStyle",
        "font-style": "fontStyle",
        fontvariant: "fontVariant",
        "font-variant": "fontVariant",
        fontweight: "fontWeight",
        "font-weight": "fontWeight",
        format: "format",
        from: "from",
        fx: "fx",
        fy: "fy",
        g1: "g1",
        g2: "g2",
        glyphname: "glyphName",
        "glyph-name": "glyphName",
        glyphorientationhorizontal: "glyphOrientationHorizontal",
        "glyph-orientation-horizontal": "glyphOrientationHorizontal",
        glyphorientationvertical: "glyphOrientationVertical",
        "glyph-orientation-vertical": "glyphOrientationVertical",
        glyphref: "glyphRef",
        gradienttransform: "gradientTransform",
        gradientunits: "gradientUnits",
        hanging: "hanging",
        horizadvx: "horizAdvX",
        "horiz-adv-x": "horizAdvX",
        horizoriginx: "horizOriginX",
        "horiz-origin-x": "horizOriginX",
        ideographic: "ideographic",
        imagerendering: "imageRendering",
        "image-rendering": "imageRendering",
        in2: "in2",
        in: "in",
        inlist: "inlist",
        intercept: "intercept",
        k1: "k1",
        k2: "k2",
        k3: "k3",
        k4: "k4",
        k: "k",
        kernelmatrix: "kernelMatrix",
        kernelunitlength: "kernelUnitLength",
        kerning: "kerning",
        keypoints: "keyPoints",
        keysplines: "keySplines",
        keytimes: "keyTimes",
        lengthadjust: "lengthAdjust",
        letterspacing: "letterSpacing",
        "letter-spacing": "letterSpacing",
        lightingcolor: "lightingColor",
        "lighting-color": "lightingColor",
        limitingconeangle: "limitingConeAngle",
        local: "local",
        markerend: "markerEnd",
        "marker-end": "markerEnd",
        markerheight: "markerHeight",
        markermid: "markerMid",
        "marker-mid": "markerMid",
        markerstart: "markerStart",
        "marker-start": "markerStart",
        markerunits: "markerUnits",
        markerwidth: "markerWidth",
        mask: "mask",
        maskcontentunits: "maskContentUnits",
        maskunits: "maskUnits",
        mathematical: "mathematical",
        mode: "mode",
        numoctaves: "numOctaves",
        offset: "offset",
        opacity: "opacity",
        operator: "operator",
        order: "order",
        orient: "orient",
        orientation: "orientation",
        origin: "origin",
        overflow: "overflow",
        overlineposition: "overlinePosition",
        "overline-position": "overlinePosition",
        overlinethickness: "overlineThickness",
        "overline-thickness": "overlineThickness",
        paintorder: "paintOrder",
        "paint-order": "paintOrder",
        panose1: "panose1",
        "panose-1": "panose1",
        pathlength: "pathLength",
        patterncontentunits: "patternContentUnits",
        patterntransform: "patternTransform",
        patternunits: "patternUnits",
        pointerevents: "pointerEvents",
        "pointer-events": "pointerEvents",
        points: "points",
        pointsatx: "pointsAtX",
        pointsaty: "pointsAtY",
        pointsatz: "pointsAtZ",
        prefix: "prefix",
        preservealpha: "preserveAlpha",
        preserveaspectratio: "preserveAspectRatio",
        primitiveunits: "primitiveUnits",
        property: "property",
        r: "r",
        radius: "radius",
        refx: "refX",
        refy: "refY",
        renderingintent: "renderingIntent",
        "rendering-intent": "renderingIntent",
        repeatcount: "repeatCount",
        repeatdur: "repeatDur",
        requiredextensions: "requiredExtensions",
        requiredfeatures: "requiredFeatures",
        resource: "resource",
        restart: "restart",
        result: "result",
        results: "results",
        rotate: "rotate",
        rx: "rx",
        ry: "ry",
        scale: "scale",
        security: "security",
        seed: "seed",
        shaperendering: "shapeRendering",
        "shape-rendering": "shapeRendering",
        slope: "slope",
        spacing: "spacing",
        specularconstant: "specularConstant",
        specularexponent: "specularExponent",
        speed: "speed",
        spreadmethod: "spreadMethod",
        startoffset: "startOffset",
        stddeviation: "stdDeviation",
        stemh: "stemh",
        stemv: "stemv",
        stitchtiles: "stitchTiles",
        stopcolor: "stopColor",
        "stop-color": "stopColor",
        stopopacity: "stopOpacity",
        "stop-opacity": "stopOpacity",
        strikethroughposition: "strikethroughPosition",
        "strikethrough-position": "strikethroughPosition",
        strikethroughthickness: "strikethroughThickness",
        "strikethrough-thickness": "strikethroughThickness",
        string: "string",
        stroke: "stroke",
        strokedasharray: "strokeDasharray",
        "stroke-dasharray": "strokeDasharray",
        strokedashoffset: "strokeDashoffset",
        "stroke-dashoffset": "strokeDashoffset",
        strokelinecap: "strokeLinecap",
        "stroke-linecap": "strokeLinecap",
        strokelinejoin: "strokeLinejoin",
        "stroke-linejoin": "strokeLinejoin",
        strokemiterlimit: "strokeMiterlimit",
        "stroke-miterlimit": "strokeMiterlimit",
        strokewidth: "strokeWidth",
        "stroke-width": "strokeWidth",
        strokeopacity: "strokeOpacity",
        "stroke-opacity": "strokeOpacity",
        suppresscontenteditablewarning: "suppressContentEditableWarning",
        suppresshydrationwarning: "suppressHydrationWarning",
        surfacescale: "surfaceScale",
        systemlanguage: "systemLanguage",
        tablevalues: "tableValues",
        targetx: "targetX",
        targety: "targetY",
        textanchor: "textAnchor",
        "text-anchor": "textAnchor",
        textdecoration: "textDecoration",
        "text-decoration": "textDecoration",
        textlength: "textLength",
        textrendering: "textRendering",
        "text-rendering": "textRendering",
        to: "to",
        transform: "transform",
        typeof: "typeof",
        u1: "u1",
        u2: "u2",
        underlineposition: "underlinePosition",
        "underline-position": "underlinePosition",
        underlinethickness: "underlineThickness",
        "underline-thickness": "underlineThickness",
        unicode: "unicode",
        unicodebidi: "unicodeBidi",
        "unicode-bidi": "unicodeBidi",
        unicoderange: "unicodeRange",
        "unicode-range": "unicodeRange",
        unitsperem: "unitsPerEm",
        "units-per-em": "unitsPerEm",
        unselectable: "unselectable",
        valphabetic: "vAlphabetic",
        "v-alphabetic": "vAlphabetic",
        values: "values",
        vectoreffect: "vectorEffect",
        "vector-effect": "vectorEffect",
        version: "version",
        vertadvy: "vertAdvY",
        "vert-adv-y": "vertAdvY",
        vertoriginx: "vertOriginX",
        "vert-origin-x": "vertOriginX",
        vertoriginy: "vertOriginY",
        "vert-origin-y": "vertOriginY",
        vhanging: "vHanging",
        "v-hanging": "vHanging",
        videographic: "vIdeographic",
        "v-ideographic": "vIdeographic",
        viewbox: "viewBox",
        viewtarget: "viewTarget",
        visibility: "visibility",
        vmathematical: "vMathematical",
        "v-mathematical": "vMathematical",
        vocab: "vocab",
        widths: "widths",
        wordspacing: "wordSpacing",
        "word-spacing": "wordSpacing",
        writingmode: "writingMode",
        "writing-mode": "writingMode",
        x1: "x1",
        x2: "x2",
        x: "x",
        xchannelselector: "xChannelSelector",
        xheight: "xHeight",
        "x-height": "xHeight",
        xlinkactuate: "xlinkActuate",
        "xlink:actuate": "xlinkActuate",
        xlinkarcrole: "xlinkArcrole",
        "xlink:arcrole": "xlinkArcrole",
        xlinkhref: "xlinkHref",
        "xlink:href": "xlinkHref",
        xlinkrole: "xlinkRole",
        "xlink:role": "xlinkRole",
        xlinkshow: "xlinkShow",
        "xlink:show": "xlinkShow",
        xlinktitle: "xlinkTitle",
        "xlink:title": "xlinkTitle",
        xlinktype: "xlinkType",
        "xlink:type": "xlinkType",
        xmlbase: "xmlBase",
        "xml:base": "xmlBase",
        xmllang: "xmlLang",
        "xml:lang": "xmlLang",
        xmlns: "xmlns",
        "xml:space": "xmlSpace",
        xmlnsxlink: "xmlnsXlink",
        "xmlns:xlink": "xmlnsXlink",
        xmlspace: "xmlSpace",
        y1: "y1",
        y2: "y2",
        y: "y",
        ychannelselector: "yChannelSelector",
        z: "z",
        zoomandpan: "zoomAndPan"
      }, validateProperty$1 = function() {
      };
      {
        var warnedProperties$1 = {}, EVENT_NAME_REGEX = /^on./, INVALID_EVENT_NAME_REGEX = /^on[^A-Z]/, rARIA$1 = new RegExp("^(aria)-[" + ATTRIBUTE_NAME_CHAR + "]*$"), rARIACamel$1 = new RegExp("^(aria)[A-Z][" + ATTRIBUTE_NAME_CHAR + "]*$");
        validateProperty$1 = function(tagName, name, value, eventRegistry) {
          if (hasOwnProperty.call(warnedProperties$1, name) && warnedProperties$1[name])
            return !0;
          var lowerCasedName = name.toLowerCase();
          if (lowerCasedName === "onfocusin" || lowerCasedName === "onfocusout")
            return error("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), warnedProperties$1[name] = !0, !0;
          if (eventRegistry != null) {
            var registrationNameDependencies = eventRegistry.registrationNameDependencies, possibleRegistrationNames = eventRegistry.possibleRegistrationNames;
            if (registrationNameDependencies.hasOwnProperty(name))
              return !0;
            var registrationName = possibleRegistrationNames.hasOwnProperty(lowerCasedName) ? possibleRegistrationNames[lowerCasedName] : null;
            if (registrationName != null)
              return error("Invalid event handler property `%s`. Did you mean `%s`?", name, registrationName), warnedProperties$1[name] = !0, !0;
            if (EVENT_NAME_REGEX.test(name))
              return error("Unknown event handler property `%s`. It will be ignored.", name), warnedProperties$1[name] = !0, !0;
          } else if (EVENT_NAME_REGEX.test(name))
            return INVALID_EVENT_NAME_REGEX.test(name) && error("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", name), warnedProperties$1[name] = !0, !0;
          if (rARIA$1.test(name) || rARIACamel$1.test(name))
            return !0;
          if (lowerCasedName === "innerhtml")
            return error("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), warnedProperties$1[name] = !0, !0;
          if (lowerCasedName === "aria")
            return error("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), warnedProperties$1[name] = !0, !0;
          if (lowerCasedName === "is" && value !== null && value !== void 0 && typeof value != "string")
            return error("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof value), warnedProperties$1[name] = !0, !0;
          if (typeof value == "number" && isNaN(value))
            return error("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", name), warnedProperties$1[name] = !0, !0;
          var propertyInfo = getPropertyInfo(name), isReserved = propertyInfo !== null && propertyInfo.type === RESERVED;
          if (possibleStandardNames.hasOwnProperty(lowerCasedName)) {
            var standardName = possibleStandardNames[lowerCasedName];
            if (standardName !== name)
              return error("Invalid DOM property `%s`. Did you mean `%s`?", name, standardName), warnedProperties$1[name] = !0, !0;
          } else if (!isReserved && name !== lowerCasedName)
            return error("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", name, lowerCasedName), warnedProperties$1[name] = !0, !0;
          return typeof value == "boolean" && shouldRemoveAttributeWithWarning(name, value, propertyInfo, !1) ? (value ? error('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', value, name, name, value, name) : error('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', value, name, name, value, name, name, name), warnedProperties$1[name] = !0, !0) : isReserved ? !0 : shouldRemoveAttributeWithWarning(name, value, propertyInfo, !1) ? (warnedProperties$1[name] = !0, !1) : ((value === "false" || value === "true") && propertyInfo !== null && propertyInfo.type === BOOLEAN && (error("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", value, name, value === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', name, value), warnedProperties$1[name] = !0), !0);
        };
      }
      var warnUnknownProperties = function(type, props, eventRegistry) {
        {
          var unknownProps = [];
          for (var key in props) {
            var isValid = validateProperty$1(type, key, props[key], eventRegistry);
            isValid || unknownProps.push(key);
          }
          var unknownPropString = unknownProps.map(function(prop) {
            return "`" + prop + "`";
          }).join(", ");
          unknownProps.length === 1 ? error("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", unknownPropString, type) : unknownProps.length > 1 && error("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", unknownPropString, type);
        }
      };
      function validateProperties$2(type, props, eventRegistry) {
        isCustomComponent(type, props) || warnUnknownProperties(type, props, eventRegistry);
      }
      var warnValidStyle = function() {
      };
      {
        var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/, msPattern = /^-ms-/, hyphenPattern = /-(.)/g, badStyleValueWithSemicolonPattern = /;\s*$/, warnedStyleNames = {}, warnedStyleValues = {}, warnedForNaNValue = !1, warnedForInfinityValue = !1, camelize = function(string) {
          return string.replace(hyphenPattern, function(_, character) {
            return character.toUpperCase();
          });
        }, warnHyphenatedStyleName = function(name) {
          warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name] || (warnedStyleNames[name] = !0, error(
            "Unsupported style property %s. Did you mean %s?",
            name,
            // As Andi Smith suggests
            // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
            // is converted to lowercase `ms`.
            camelize(name.replace(msPattern, "ms-"))
          ));
        }, warnBadVendoredStyleName = function(name) {
          warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name] || (warnedStyleNames[name] = !0, error("Unsupported vendor-prefixed style property %s. Did you mean %s?", name, name.charAt(0).toUpperCase() + name.slice(1)));
        }, warnStyleValueWithSemicolon = function(name, value) {
          warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value] || (warnedStyleValues[value] = !0, error(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, name, value.replace(badStyleValueWithSemicolonPattern, "")));
        }, warnStyleValueIsNaN = function(name, value) {
          warnedForNaNValue || (warnedForNaNValue = !0, error("`NaN` is an invalid value for the `%s` css style property.", name));
        }, warnStyleValueIsInfinity = function(name, value) {
          warnedForInfinityValue || (warnedForInfinityValue = !0, error("`Infinity` is an invalid value for the `%s` css style property.", name));
        };
        warnValidStyle = function(name, value) {
          name.indexOf("-") > -1 ? warnHyphenatedStyleName(name) : badVendoredStyleNamePattern.test(name) ? warnBadVendoredStyleName(name) : badStyleValueWithSemicolonPattern.test(value) && warnStyleValueWithSemicolon(name, value), typeof value == "number" && (isNaN(value) ? warnStyleValueIsNaN(name, value) : isFinite(value) || warnStyleValueIsInfinity(name, value));
        };
      }
      var warnValidStyle$1 = warnValidStyle, matchHtmlRegExp = /["'&<>]/;
      function escapeHtml3(string) {
        checkHtmlStringCoercion(string);
        var str = "" + string, match = matchHtmlRegExp.exec(str);
        if (!match)
          return str;
        var escape2, html = "", index, lastIndex = 0;
        for (index = match.index; index < str.length; index++) {
          switch (str.charCodeAt(index)) {
            case 34:
              escape2 = "&quot;";
              break;
            case 38:
              escape2 = "&amp;";
              break;
            case 39:
              escape2 = "&#x27;";
              break;
            case 60:
              escape2 = "&lt;";
              break;
            case 62:
              escape2 = "&gt;";
              break;
            default:
              continue;
          }
          lastIndex !== index && (html += str.substring(lastIndex, index)), lastIndex = index + 1, html += escape2;
        }
        return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
      }
      function escapeTextForBrowser(text) {
        return typeof text == "boolean" || typeof text == "number" ? "" + text : escapeHtml3(text);
      }
      var uppercasePattern = /([A-Z])/g, msPattern$1 = /^ms-/;
      function hyphenateStyleName(name) {
        return name.replace(uppercasePattern, "-$1").toLowerCase().replace(msPattern$1, "-ms-");
      }
      var isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, didWarn = !1;
      function sanitizeURL(url) {
        !didWarn && isJavaScriptProtocol.test(url) && (didWarn = !0, error("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(url)));
      }
      var isArrayImpl = Array.isArray;
      function isArray(a) {
        return isArrayImpl(a);
      }
      var startInlineScript = "<script>", endInlineScript = "</script>", startScriptSrc = '<script src="', startModuleSrc = '<script type="module" src="', endAsyncScript = '" async=""></script>';
      function escapeBootstrapScriptContent(scriptText) {
        return checkHtmlStringCoercion(scriptText), ("" + scriptText).replace(scriptRegex, scriptReplacer);
      }
      var scriptRegex = /(<\/|<)(s)(cript)/gi, scriptReplacer = function(match, prefix2, s, suffix) {
        return "" + prefix2 + (s === "s" ? "\\u0073" : "\\u0053") + suffix;
      };
      function createResponseState(identifierPrefix, nonce, bootstrapScriptContent, bootstrapScripts, bootstrapModules) {
        var idPrefix = identifierPrefix === void 0 ? "" : identifierPrefix, inlineScriptWithNonce = nonce === void 0 ? startInlineScript : '<script nonce="' + escapeTextForBrowser(nonce) + '">', bootstrapChunks = [];
        if (bootstrapScriptContent !== void 0 && bootstrapChunks.push(inlineScriptWithNonce, escapeBootstrapScriptContent(bootstrapScriptContent), endInlineScript), bootstrapScripts !== void 0)
          for (var i = 0; i < bootstrapScripts.length; i++)
            bootstrapChunks.push(startScriptSrc, escapeTextForBrowser(bootstrapScripts[i]), endAsyncScript);
        if (bootstrapModules !== void 0)
          for (var _i = 0; _i < bootstrapModules.length; _i++)
            bootstrapChunks.push(startModuleSrc, escapeTextForBrowser(bootstrapModules[_i]), endAsyncScript);
        return {
          bootstrapChunks,
          startInlineScript: inlineScriptWithNonce,
          placeholderPrefix: idPrefix + "P:",
          segmentPrefix: idPrefix + "S:",
          boundaryPrefix: idPrefix + "B:",
          idPrefix,
          nextSuspenseID: 0,
          sentCompleteSegmentFunction: !1,
          sentCompleteBoundaryFunction: !1,
          sentClientRenderFunction: !1
        };
      }
      var ROOT_HTML_MODE = 0, HTML_MODE = 1, SVG_MODE = 2, MATHML_MODE = 3, HTML_TABLE_MODE = 4, HTML_TABLE_BODY_MODE = 5, HTML_TABLE_ROW_MODE = 6, HTML_COLGROUP_MODE = 7;
      function createFormatContext(insertionMode, selectedValue) {
        return {
          insertionMode,
          selectedValue
        };
      }
      function getChildFormatContext(parentContext, type, props) {
        switch (type) {
          case "select":
            return createFormatContext(HTML_MODE, props.value != null ? props.value : props.defaultValue);
          case "svg":
            return createFormatContext(SVG_MODE, null);
          case "math":
            return createFormatContext(MATHML_MODE, null);
          case "foreignObject":
            return createFormatContext(HTML_MODE, null);
          case "table":
            return createFormatContext(HTML_TABLE_MODE, null);
          case "thead":
          case "tbody":
          case "tfoot":
            return createFormatContext(HTML_TABLE_BODY_MODE, null);
          case "colgroup":
            return createFormatContext(HTML_COLGROUP_MODE, null);
          case "tr":
            return createFormatContext(HTML_TABLE_ROW_MODE, null);
        }
        return parentContext.insertionMode >= HTML_TABLE_MODE || parentContext.insertionMode === ROOT_HTML_MODE ? createFormatContext(HTML_MODE, null) : parentContext;
      }
      var UNINITIALIZED_SUSPENSE_BOUNDARY_ID = null;
      function assignSuspenseBoundaryID(responseState) {
        var generatedID = responseState.nextSuspenseID++;
        return responseState.boundaryPrefix + generatedID.toString(16);
      }
      function makeId(responseState, treeId, localId) {
        var idPrefix = responseState.idPrefix, id = ":" + idPrefix + "R" + treeId;
        return localId > 0 && (id += "H" + localId.toString(32)), id + ":";
      }
      function encodeHTMLTextNode(text) {
        return escapeTextForBrowser(text);
      }
      var textSeparator = "<!-- -->";
      function pushTextInstance(target, text, responseState, textEmbedded) {
        return text === "" ? textEmbedded : (textEmbedded && target.push(textSeparator), target.push(encodeHTMLTextNode(text)), !0);
      }
      function pushSegmentFinale(target, responseState, lastPushedText, textEmbedded) {
        lastPushedText && textEmbedded && target.push(textSeparator);
      }
      var styleNameCache = /* @__PURE__ */ new Map();
      function processStyleName(styleName) {
        var chunk = styleNameCache.get(styleName);
        if (chunk !== void 0)
          return chunk;
        var result = escapeTextForBrowser(hyphenateStyleName(styleName));
        return styleNameCache.set(styleName, result), result;
      }
      var styleAttributeStart = ' style="', styleAssign = ":", styleSeparator = ";";
      function pushStyle(target, responseState, style) {
        if (typeof style != "object")
          throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
        var isFirst = !0;
        for (var styleName in style)
          if (hasOwnProperty.call(style, styleName)) {
            var styleValue = style[styleName];
            if (!(styleValue == null || typeof styleValue == "boolean" || styleValue === "")) {
              var nameChunk = void 0, valueChunk = void 0, isCustomProperty = styleName.indexOf("--") === 0;
              isCustomProperty ? (nameChunk = escapeTextForBrowser(styleName), checkCSSPropertyStringCoercion(styleValue, styleName), valueChunk = escapeTextForBrowser(("" + styleValue).trim())) : (warnValidStyle$1(styleName, styleValue), nameChunk = processStyleName(styleName), typeof styleValue == "number" ? styleValue !== 0 && !hasOwnProperty.call(isUnitlessNumber, styleName) ? valueChunk = styleValue + "px" : valueChunk = "" + styleValue : (checkCSSPropertyStringCoercion(styleValue, styleName), valueChunk = escapeTextForBrowser(("" + styleValue).trim()))), isFirst ? (isFirst = !1, target.push(styleAttributeStart, nameChunk, styleAssign, valueChunk)) : target.push(styleSeparator, nameChunk, styleAssign, valueChunk);
            }
          }
        isFirst || target.push(attributeEnd);
      }
      var attributeSeparator = " ", attributeAssign = '="', attributeEnd = '"', attributeEmptyString = '=""';
      function pushAttribute(target, responseState, name, value) {
        switch (name) {
          case "style": {
            pushStyle(target, responseState, value);
            return;
          }
          case "defaultValue":
          case "defaultChecked":
          case "innerHTML":
          case "suppressContentEditableWarning":
          case "suppressHydrationWarning":
            return;
        }
        if (
          // shouldIgnoreAttribute
          // We have already filtered out null/undefined and reserved words.
          !(name.length > 2 && (name[0] === "o" || name[0] === "O") && (name[1] === "n" || name[1] === "N"))
        ) {
          var propertyInfo = getPropertyInfo(name);
          if (propertyInfo !== null) {
            switch (typeof value) {
              case "function":
              case "symbol":
                return;
              case "boolean":
                if (!propertyInfo.acceptsBooleans)
                  return;
            }
            var attributeName = propertyInfo.attributeName, attributeNameChunk = attributeName;
            switch (propertyInfo.type) {
              case BOOLEAN:
                value && target.push(attributeSeparator, attributeNameChunk, attributeEmptyString);
                return;
              case OVERLOADED_BOOLEAN:
                value === !0 ? target.push(attributeSeparator, attributeNameChunk, attributeEmptyString) : value === !1 || target.push(attributeSeparator, attributeNameChunk, attributeAssign, escapeTextForBrowser(value), attributeEnd);
                return;
              case NUMERIC:
                isNaN(value) || target.push(attributeSeparator, attributeNameChunk, attributeAssign, escapeTextForBrowser(value), attributeEnd);
                break;
              case POSITIVE_NUMERIC:
                !isNaN(value) && value >= 1 && target.push(attributeSeparator, attributeNameChunk, attributeAssign, escapeTextForBrowser(value), attributeEnd);
                break;
              default:
                propertyInfo.sanitizeURL && (checkAttributeStringCoercion(value, attributeName), value = "" + value, sanitizeURL(value)), target.push(attributeSeparator, attributeNameChunk, attributeAssign, escapeTextForBrowser(value), attributeEnd);
            }
          } else if (isAttributeNameSafe(name)) {
            switch (typeof value) {
              case "function":
              case "symbol":
                return;
              case "boolean": {
                var prefix2 = name.toLowerCase().slice(0, 5);
                if (prefix2 !== "data-" && prefix2 !== "aria-")
                  return;
              }
            }
            target.push(attributeSeparator, name, attributeAssign, escapeTextForBrowser(value), attributeEnd);
          }
        }
      }
      var endOfStartTag = ">", endOfStartTagSelfClosing = "/>";
      function pushInnerHTML(target, innerHTML, children) {
        if (innerHTML != null) {
          if (children != null)
            throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof innerHTML != "object" || !("__html" in innerHTML))
            throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
          var html = innerHTML.__html;
          html != null && (checkHtmlStringCoercion(html), target.push("" + html));
        }
      }
      var didWarnDefaultInputValue = !1, didWarnDefaultChecked = !1, didWarnDefaultSelectValue = !1, didWarnDefaultTextareaValue = !1, didWarnInvalidOptionChildren = !1, didWarnInvalidOptionInnerHTML = !1, didWarnSelectedSetOnOption = !1;
      function checkSelectProp(props, propName) {
        {
          var value = props[propName];
          if (value != null) {
            var array = isArray(value);
            props.multiple && !array ? error("The `%s` prop supplied to <select> must be an array if `multiple` is true.", propName) : !props.multiple && array && error("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.", propName);
          }
        }
      }
      function pushStartSelect(target, props, responseState) {
        checkControlledValueProps("select", props), checkSelectProp(props, "value"), checkSelectProp(props, "defaultValue"), props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultSelectValue && (error("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), didWarnDefaultSelectValue = !0), target.push(startChunkForTag("select"));
        var children = null, innerHTML = null;
        for (var propKey in props)
          if (hasOwnProperty.call(props, propKey)) {
            var propValue = props[propKey];
            if (propValue == null)
              continue;
            switch (propKey) {
              case "children":
                children = propValue;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML = propValue;
                break;
              case "defaultValue":
              case "value":
                break;
              default:
                pushAttribute(target, responseState, propKey, propValue);
                break;
            }
          }
        return target.push(endOfStartTag), pushInnerHTML(target, innerHTML, children), children;
      }
      function flattenOptionChildren(children) {
        var content = "";
        return React7.Children.forEach(children, function(child) {
          child != null && (content += child, !didWarnInvalidOptionChildren && typeof child != "string" && typeof child != "number" && (didWarnInvalidOptionChildren = !0, error("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
        }), content;
      }
      var selectedMarkerAttribute = ' selected=""';
      function pushStartOption(target, props, responseState, formatContext) {
        var selectedValue = formatContext.selectedValue;
        target.push(startChunkForTag("option"));
        var children = null, value = null, selected = null, innerHTML = null;
        for (var propKey in props)
          if (hasOwnProperty.call(props, propKey)) {
            var propValue = props[propKey];
            if (propValue == null)
              continue;
            switch (propKey) {
              case "children":
                children = propValue;
                break;
              case "selected":
                selected = propValue, didWarnSelectedSetOnOption || (error("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), didWarnSelectedSetOnOption = !0);
                break;
              case "dangerouslySetInnerHTML":
                innerHTML = propValue;
                break;
              case "value":
                value = propValue;
              default:
                pushAttribute(target, responseState, propKey, propValue);
                break;
            }
          }
        if (selectedValue != null) {
          var stringValue;
          if (value !== null ? (checkAttributeStringCoercion(value, "value"), stringValue = "" + value) : (innerHTML !== null && (didWarnInvalidOptionInnerHTML || (didWarnInvalidOptionInnerHTML = !0, error("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected."))), stringValue = flattenOptionChildren(children)), isArray(selectedValue))
            for (var i = 0; i < selectedValue.length; i++) {
              checkAttributeStringCoercion(selectedValue[i], "value");
              var v = "" + selectedValue[i];
              if (v === stringValue) {
                target.push(selectedMarkerAttribute);
                break;
              }
            }
          else
            checkAttributeStringCoercion(selectedValue, "select.value"), "" + selectedValue === stringValue && target.push(selectedMarkerAttribute);
        } else
          selected && target.push(selectedMarkerAttribute);
        return target.push(endOfStartTag), pushInnerHTML(target, innerHTML, children), children;
      }
      function pushInput(target, props, responseState) {
        checkControlledValueProps("input", props), props.checked !== void 0 && props.defaultChecked !== void 0 && !didWarnDefaultChecked && (error("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", "A component", props.type), didWarnDefaultChecked = !0), props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultInputValue && (error("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", "A component", props.type), didWarnDefaultInputValue = !0), target.push(startChunkForTag("input"));
        var value = null, defaultValue = null, checked = null, defaultChecked = null;
        for (var propKey in props)
          if (hasOwnProperty.call(props, propKey)) {
            var propValue = props[propKey];
            if (propValue == null)
              continue;
            switch (propKey) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw new Error("input is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
              case "defaultChecked":
                defaultChecked = propValue;
                break;
              case "defaultValue":
                defaultValue = propValue;
                break;
              case "checked":
                checked = propValue;
                break;
              case "value":
                value = propValue;
                break;
              default:
                pushAttribute(target, responseState, propKey, propValue);
                break;
            }
          }
        return checked !== null ? pushAttribute(target, responseState, "checked", checked) : defaultChecked !== null && pushAttribute(target, responseState, "checked", defaultChecked), value !== null ? pushAttribute(target, responseState, "value", value) : defaultValue !== null && pushAttribute(target, responseState, "value", defaultValue), target.push(endOfStartTagSelfClosing), null;
      }
      function pushStartTextArea(target, props, responseState) {
        checkControlledValueProps("textarea", props), props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultTextareaValue && (error("Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components"), didWarnDefaultTextareaValue = !0), target.push(startChunkForTag("textarea"));
        var value = null, defaultValue = null, children = null;
        for (var propKey in props)
          if (hasOwnProperty.call(props, propKey)) {
            var propValue = props[propKey];
            if (propValue == null)
              continue;
            switch (propKey) {
              case "children":
                children = propValue;
                break;
              case "value":
                value = propValue;
                break;
              case "defaultValue":
                defaultValue = propValue;
                break;
              case "dangerouslySetInnerHTML":
                throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
              default:
                pushAttribute(target, responseState, propKey, propValue);
                break;
            }
          }
        if (value === null && defaultValue !== null && (value = defaultValue), target.push(endOfStartTag), children != null) {
          if (error("Use the `defaultValue` or `value` props instead of setting children on <textarea>."), value != null)
            throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
          if (isArray(children)) {
            if (children.length > 1)
              throw new Error("<textarea> can only have at most one child.");
            checkHtmlStringCoercion(children[0]), value = "" + children[0];
          }
          checkHtmlStringCoercion(children), value = "" + children;
        }
        return typeof value == "string" && value[0] === `
` && target.push(leadingNewline), value !== null && (checkAttributeStringCoercion(value, "value"), target.push(encodeHTMLTextNode("" + value))), null;
      }
      function pushSelfClosing(target, props, tag, responseState) {
        target.push(startChunkForTag(tag));
        for (var propKey in props)
          if (hasOwnProperty.call(props, propKey)) {
            var propValue = props[propKey];
            if (propValue == null)
              continue;
            switch (propKey) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw new Error(tag + " is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
              default:
                pushAttribute(target, responseState, propKey, propValue);
                break;
            }
          }
        return target.push(endOfStartTagSelfClosing), null;
      }
      function pushStartMenuItem(target, props, responseState) {
        target.push(startChunkForTag("menuitem"));
        for (var propKey in props)
          if (hasOwnProperty.call(props, propKey)) {
            var propValue = props[propKey];
            if (propValue == null)
              continue;
            switch (propKey) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw new Error("menuitems cannot have `children` nor `dangerouslySetInnerHTML`.");
              default:
                pushAttribute(target, responseState, propKey, propValue);
                break;
            }
          }
        return target.push(endOfStartTag), null;
      }
      function pushStartTitle(target, props, responseState) {
        target.push(startChunkForTag("title"));
        var children = null;
        for (var propKey in props)
          if (hasOwnProperty.call(props, propKey)) {
            var propValue = props[propKey];
            if (propValue == null)
              continue;
            switch (propKey) {
              case "children":
                children = propValue;
                break;
              case "dangerouslySetInnerHTML":
                throw new Error("`dangerouslySetInnerHTML` does not make sense on <title>.");
              default:
                pushAttribute(target, responseState, propKey, propValue);
                break;
            }
          }
        target.push(endOfStartTag);
        {
          var child = Array.isArray(children) && children.length < 2 ? children[0] || null : children;
          Array.isArray(children) && children.length > 1 ? error("A title element received an array with more than 1 element as children. In browsers title Elements can only have Text Nodes as children. If the children being rendered output more than a single text node in aggregate the browser will display markup and comments as text in the title and hydration will likely fail and fall back to client rendering") : child != null && child.$$typeof != null ? error("A title element received a React element for children. In the browser title Elements can only have Text Nodes as children. If the children being rendered output more than a single text node in aggregate the browser will display markup and comments as text in the title and hydration will likely fail and fall back to client rendering") : child != null && typeof child != "string" && typeof child != "number" && error("A title element received a value that was not a string or number for children. In the browser title Elements can only have Text Nodes as children. If the children being rendered output more than a single text node in aggregate the browser will display markup and comments as text in the title and hydration will likely fail and fall back to client rendering");
        }
        return children;
      }
      function pushStartGenericElement(target, props, tag, responseState) {
        target.push(startChunkForTag(tag));
        var children = null, innerHTML = null;
        for (var propKey in props)
          if (hasOwnProperty.call(props, propKey)) {
            var propValue = props[propKey];
            if (propValue == null)
              continue;
            switch (propKey) {
              case "children":
                children = propValue;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML = propValue;
                break;
              default:
                pushAttribute(target, responseState, propKey, propValue);
                break;
            }
          }
        return target.push(endOfStartTag), pushInnerHTML(target, innerHTML, children), typeof children == "string" ? (target.push(encodeHTMLTextNode(children)), null) : children;
      }
      function pushStartCustomElement(target, props, tag, responseState) {
        target.push(startChunkForTag(tag));
        var children = null, innerHTML = null;
        for (var propKey in props)
          if (hasOwnProperty.call(props, propKey)) {
            var propValue = props[propKey];
            if (propValue == null)
              continue;
            switch (propKey) {
              case "children":
                children = propValue;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML = propValue;
                break;
              case "style":
                pushStyle(target, responseState, propValue);
                break;
              case "suppressContentEditableWarning":
              case "suppressHydrationWarning":
                break;
              default:
                isAttributeNameSafe(propKey) && typeof propValue != "function" && typeof propValue != "symbol" && target.push(attributeSeparator, propKey, attributeAssign, escapeTextForBrowser(propValue), attributeEnd);
                break;
            }
          }
        return target.push(endOfStartTag), pushInnerHTML(target, innerHTML, children), children;
      }
      var leadingNewline = `
`;
      function pushStartPreformattedElement(target, props, tag, responseState) {
        target.push(startChunkForTag(tag));
        var children = null, innerHTML = null;
        for (var propKey in props)
          if (hasOwnProperty.call(props, propKey)) {
            var propValue = props[propKey];
            if (propValue == null)
              continue;
            switch (propKey) {
              case "children":
                children = propValue;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML = propValue;
                break;
              default:
                pushAttribute(target, responseState, propKey, propValue);
                break;
            }
          }
        if (target.push(endOfStartTag), innerHTML != null) {
          if (children != null)
            throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof innerHTML != "object" || !("__html" in innerHTML))
            throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
          var html = innerHTML.__html;
          html != null && (typeof html == "string" && html.length > 0 && html[0] === `
` ? target.push(leadingNewline, html) : (checkHtmlStringCoercion(html), target.push("" + html)));
        }
        return typeof children == "string" && children[0] === `
` && target.push(leadingNewline), children;
      }
      var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, validatedTagCache = /* @__PURE__ */ new Map();
      function startChunkForTag(tag) {
        var tagStartChunk = validatedTagCache.get(tag);
        if (tagStartChunk === void 0) {
          if (!VALID_TAG_REGEX.test(tag))
            throw new Error("Invalid tag: " + tag);
          tagStartChunk = "<" + tag, validatedTagCache.set(tag, tagStartChunk);
        }
        return tagStartChunk;
      }
      var DOCTYPE = "<!DOCTYPE html>";
      function pushStartInstance(target, type, props, responseState, formatContext) {
        switch (validateProperties(type, props), validateProperties$1(type, props), validateProperties$2(type, props, null), !props.suppressContentEditableWarning && props.contentEditable && props.children != null && error("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), formatContext.insertionMode !== SVG_MODE && formatContext.insertionMode !== MATHML_MODE && type.indexOf("-") === -1 && typeof props.is != "string" && type.toLowerCase() !== type && error("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", type), type) {
          case "select":
            return pushStartSelect(target, props, responseState);
          case "option":
            return pushStartOption(target, props, responseState, formatContext);
          case "textarea":
            return pushStartTextArea(target, props, responseState);
          case "input":
            return pushInput(target, props, responseState);
          case "menuitem":
            return pushStartMenuItem(target, props, responseState);
          case "title":
            return pushStartTitle(target, props, responseState);
          case "listing":
          case "pre":
            return pushStartPreformattedElement(target, props, type, responseState);
          case "area":
          case "base":
          case "br":
          case "col":
          case "embed":
          case "hr":
          case "img":
          case "keygen":
          case "link":
          case "meta":
          case "param":
          case "source":
          case "track":
          case "wbr":
            return pushSelfClosing(target, props, type, responseState);
          case "annotation-xml":
          case "color-profile":
          case "font-face":
          case "font-face-src":
          case "font-face-uri":
          case "font-face-format":
          case "font-face-name":
          case "missing-glyph":
            return pushStartGenericElement(target, props, type, responseState);
          case "html":
            return formatContext.insertionMode === ROOT_HTML_MODE && target.push(DOCTYPE), pushStartGenericElement(target, props, type, responseState);
          default:
            return type.indexOf("-") === -1 && typeof props.is != "string" ? pushStartGenericElement(target, props, type, responseState) : pushStartCustomElement(target, props, type, responseState);
        }
      }
      var endTag1 = "</", endTag2 = ">";
      function pushEndInstance(target, type, props) {
        switch (type) {
          case "area":
          case "base":
          case "br":
          case "col":
          case "embed":
          case "hr":
          case "img":
          case "input":
          case "keygen":
          case "link":
          case "meta":
          case "param":
          case "source":
          case "track":
          case "wbr":
            break;
          default:
            target.push(endTag1, type, endTag2);
        }
      }
      function writeCompletedRoot(destination, responseState) {
        for (var bootstrapChunks = responseState.bootstrapChunks, i = 0; i < bootstrapChunks.length - 1; i++)
          writeChunk(destination, bootstrapChunks[i]);
        return i < bootstrapChunks.length ? writeChunkAndReturn(destination, bootstrapChunks[i]) : !0;
      }
      var placeholder1 = '<template id="', placeholder2 = '"></template>';
      function writePlaceholder(destination, responseState, id) {
        writeChunk(destination, placeholder1), writeChunk(destination, responseState.placeholderPrefix);
        var formattedID = id.toString(16);
        return writeChunk(destination, formattedID), writeChunkAndReturn(destination, placeholder2);
      }
      var startCompletedSuspenseBoundary = "<!--$-->", startPendingSuspenseBoundary1 = '<!--$?--><template id="', startPendingSuspenseBoundary2 = '"></template>', startClientRenderedSuspenseBoundary = "<!--$!-->", endSuspenseBoundary = "<!--/$-->", clientRenderedSuspenseBoundaryError1 = "<template", clientRenderedSuspenseBoundaryErrorAttrInterstitial = '"', clientRenderedSuspenseBoundaryError1A = ' data-dgst="', clientRenderedSuspenseBoundaryError1B = ' data-msg="', clientRenderedSuspenseBoundaryError1C = ' data-stck="', clientRenderedSuspenseBoundaryError2 = "></template>";
      function writeStartCompletedSuspenseBoundary(destination, responseState) {
        return writeChunkAndReturn(destination, startCompletedSuspenseBoundary);
      }
      function writeStartPendingSuspenseBoundary(destination, responseState, id) {
        if (writeChunk(destination, startPendingSuspenseBoundary1), id === null)
          throw new Error("An ID must have been assigned before we can complete the boundary.");
        return writeChunk(destination, id), writeChunkAndReturn(destination, startPendingSuspenseBoundary2);
      }
      function writeStartClientRenderedSuspenseBoundary(destination, responseState, errorDigest, errorMesssage, errorComponentStack) {
        var result;
        return result = writeChunkAndReturn(destination, startClientRenderedSuspenseBoundary), writeChunk(destination, clientRenderedSuspenseBoundaryError1), errorDigest && (writeChunk(destination, clientRenderedSuspenseBoundaryError1A), writeChunk(destination, escapeTextForBrowser(errorDigest)), writeChunk(destination, clientRenderedSuspenseBoundaryErrorAttrInterstitial)), errorMesssage && (writeChunk(destination, clientRenderedSuspenseBoundaryError1B), writeChunk(destination, escapeTextForBrowser(errorMesssage)), writeChunk(destination, clientRenderedSuspenseBoundaryErrorAttrInterstitial)), errorComponentStack && (writeChunk(destination, clientRenderedSuspenseBoundaryError1C), writeChunk(destination, escapeTextForBrowser(errorComponentStack)), writeChunk(destination, clientRenderedSuspenseBoundaryErrorAttrInterstitial)), result = writeChunkAndReturn(destination, clientRenderedSuspenseBoundaryError2), result;
      }
      function writeEndCompletedSuspenseBoundary(destination, responseState) {
        return writeChunkAndReturn(destination, endSuspenseBoundary);
      }
      function writeEndPendingSuspenseBoundary(destination, responseState) {
        return writeChunkAndReturn(destination, endSuspenseBoundary);
      }
      function writeEndClientRenderedSuspenseBoundary(destination, responseState) {
        return writeChunkAndReturn(destination, endSuspenseBoundary);
      }
      var startSegmentHTML = '<div hidden id="', startSegmentHTML2 = '">', endSegmentHTML = "</div>", startSegmentSVG = '<svg aria-hidden="true" style="display:none" id="', startSegmentSVG2 = '">', endSegmentSVG = "</svg>", startSegmentMathML = '<math aria-hidden="true" style="display:none" id="', startSegmentMathML2 = '">', endSegmentMathML = "</math>", startSegmentTable = '<table hidden id="', startSegmentTable2 = '">', endSegmentTable = "</table>", startSegmentTableBody = '<table hidden><tbody id="', startSegmentTableBody2 = '">', endSegmentTableBody = "</tbody></table>", startSegmentTableRow = '<table hidden><tr id="', startSegmentTableRow2 = '">', endSegmentTableRow = "</tr></table>", startSegmentColGroup = '<table hidden><colgroup id="', startSegmentColGroup2 = '">', endSegmentColGroup = "</colgroup></table>";
      function writeStartSegment(destination, responseState, formatContext, id) {
        switch (formatContext.insertionMode) {
          case ROOT_HTML_MODE:
          case HTML_MODE:
            return writeChunk(destination, startSegmentHTML), writeChunk(destination, responseState.segmentPrefix), writeChunk(destination, id.toString(16)), writeChunkAndReturn(destination, startSegmentHTML2);
          case SVG_MODE:
            return writeChunk(destination, startSegmentSVG), writeChunk(destination, responseState.segmentPrefix), writeChunk(destination, id.toString(16)), writeChunkAndReturn(destination, startSegmentSVG2);
          case MATHML_MODE:
            return writeChunk(destination, startSegmentMathML), writeChunk(destination, responseState.segmentPrefix), writeChunk(destination, id.toString(16)), writeChunkAndReturn(destination, startSegmentMathML2);
          case HTML_TABLE_MODE:
            return writeChunk(destination, startSegmentTable), writeChunk(destination, responseState.segmentPrefix), writeChunk(destination, id.toString(16)), writeChunkAndReturn(destination, startSegmentTable2);
          case HTML_TABLE_BODY_MODE:
            return writeChunk(destination, startSegmentTableBody), writeChunk(destination, responseState.segmentPrefix), writeChunk(destination, id.toString(16)), writeChunkAndReturn(destination, startSegmentTableBody2);
          case HTML_TABLE_ROW_MODE:
            return writeChunk(destination, startSegmentTableRow), writeChunk(destination, responseState.segmentPrefix), writeChunk(destination, id.toString(16)), writeChunkAndReturn(destination, startSegmentTableRow2);
          case HTML_COLGROUP_MODE:
            return writeChunk(destination, startSegmentColGroup), writeChunk(destination, responseState.segmentPrefix), writeChunk(destination, id.toString(16)), writeChunkAndReturn(destination, startSegmentColGroup2);
          default:
            throw new Error("Unknown insertion mode. This is a bug in React.");
        }
      }
      function writeEndSegment(destination, formatContext) {
        switch (formatContext.insertionMode) {
          case ROOT_HTML_MODE:
          case HTML_MODE:
            return writeChunkAndReturn(destination, endSegmentHTML);
          case SVG_MODE:
            return writeChunkAndReturn(destination, endSegmentSVG);
          case MATHML_MODE:
            return writeChunkAndReturn(destination, endSegmentMathML);
          case HTML_TABLE_MODE:
            return writeChunkAndReturn(destination, endSegmentTable);
          case HTML_TABLE_BODY_MODE:
            return writeChunkAndReturn(destination, endSegmentTableBody);
          case HTML_TABLE_ROW_MODE:
            return writeChunkAndReturn(destination, endSegmentTableRow);
          case HTML_COLGROUP_MODE:
            return writeChunkAndReturn(destination, endSegmentColGroup);
          default:
            throw new Error("Unknown insertion mode. This is a bug in React.");
        }
      }
      var completeSegmentFunction = "function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)}", completeBoundaryFunction = 'function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}}', clientRenderFunction = 'function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())}', completeSegmentScript1Full = completeSegmentFunction + ';$RS("', completeSegmentScript1Partial = '$RS("', completeSegmentScript2 = '","', completeSegmentScript3 = '")</script>';
      function writeCompletedSegmentInstruction(destination, responseState, contentSegmentID) {
        writeChunk(destination, responseState.startInlineScript), responseState.sentCompleteSegmentFunction ? writeChunk(destination, completeSegmentScript1Partial) : (responseState.sentCompleteSegmentFunction = !0, writeChunk(destination, completeSegmentScript1Full)), writeChunk(destination, responseState.segmentPrefix);
        var formattedID = contentSegmentID.toString(16);
        return writeChunk(destination, formattedID), writeChunk(destination, completeSegmentScript2), writeChunk(destination, responseState.placeholderPrefix), writeChunk(destination, formattedID), writeChunkAndReturn(destination, completeSegmentScript3);
      }
      var completeBoundaryScript1Full = completeBoundaryFunction + ';$RC("', completeBoundaryScript1Partial = '$RC("', completeBoundaryScript2 = '","', completeBoundaryScript3 = '")</script>';
      function writeCompletedBoundaryInstruction(destination, responseState, boundaryID, contentSegmentID) {
        if (writeChunk(destination, responseState.startInlineScript), responseState.sentCompleteBoundaryFunction ? writeChunk(destination, completeBoundaryScript1Partial) : (responseState.sentCompleteBoundaryFunction = !0, writeChunk(destination, completeBoundaryScript1Full)), boundaryID === null)
          throw new Error("An ID must have been assigned before we can complete the boundary.");
        var formattedContentID = contentSegmentID.toString(16);
        return writeChunk(destination, boundaryID), writeChunk(destination, completeBoundaryScript2), writeChunk(destination, responseState.segmentPrefix), writeChunk(destination, formattedContentID), writeChunkAndReturn(destination, completeBoundaryScript3);
      }
      var clientRenderScript1Full = clientRenderFunction + ';$RX("', clientRenderScript1Partial = '$RX("', clientRenderScript1A = '"', clientRenderScript2 = ")</script>", clientRenderErrorScriptArgInterstitial = ",";
      function writeClientRenderBoundaryInstruction(destination, responseState, boundaryID, errorDigest, errorMessage, errorComponentStack) {
        if (writeChunk(destination, responseState.startInlineScript), responseState.sentClientRenderFunction ? writeChunk(destination, clientRenderScript1Partial) : (responseState.sentClientRenderFunction = !0, writeChunk(destination, clientRenderScript1Full)), boundaryID === null)
          throw new Error("An ID must have been assigned before we can complete the boundary.");
        return writeChunk(destination, boundaryID), writeChunk(destination, clientRenderScript1A), (errorDigest || errorMessage || errorComponentStack) && (writeChunk(destination, clientRenderErrorScriptArgInterstitial), writeChunk(destination, escapeJSStringsForInstructionScripts(errorDigest || ""))), (errorMessage || errorComponentStack) && (writeChunk(destination, clientRenderErrorScriptArgInterstitial), writeChunk(destination, escapeJSStringsForInstructionScripts(errorMessage || ""))), errorComponentStack && (writeChunk(destination, clientRenderErrorScriptArgInterstitial), writeChunk(destination, escapeJSStringsForInstructionScripts(errorComponentStack))), writeChunkAndReturn(destination, clientRenderScript2);
      }
      var regexForJSStringsInScripts = /[<\u2028\u2029]/g;
      function escapeJSStringsForInstructionScripts(input) {
        var escaped = JSON.stringify(input);
        return escaped.replace(regexForJSStringsInScripts, function(match) {
          switch (match) {
            case "<":
              return "\\u003c";
            case "\u2028":
              return "\\u2028";
            case "\u2029":
              return "\\u2029";
            default:
              throw new Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
          }
        });
      }
      function createResponseState$1(generateStaticMarkup, identifierPrefix) {
        var responseState = createResponseState(identifierPrefix, void 0);
        return {
          // Keep this in sync with ReactDOMServerFormatConfig
          bootstrapChunks: responseState.bootstrapChunks,
          startInlineScript: responseState.startInlineScript,
          placeholderPrefix: responseState.placeholderPrefix,
          segmentPrefix: responseState.segmentPrefix,
          boundaryPrefix: responseState.boundaryPrefix,
          idPrefix: responseState.idPrefix,
          nextSuspenseID: responseState.nextSuspenseID,
          sentCompleteSegmentFunction: responseState.sentCompleteSegmentFunction,
          sentCompleteBoundaryFunction: responseState.sentCompleteBoundaryFunction,
          sentClientRenderFunction: responseState.sentClientRenderFunction,
          // This is an extra field for the legacy renderer
          generateStaticMarkup
        };
      }
      function createRootFormatContext() {
        return {
          insertionMode: HTML_MODE,
          // We skip the root mode because we don't want to emit the DOCTYPE in legacy mode.
          selectedValue: null
        };
      }
      function pushTextInstance$1(target, text, responseState, textEmbedded) {
        return responseState.generateStaticMarkup ? (target.push(escapeTextForBrowser(text)), !1) : pushTextInstance(target, text, responseState, textEmbedded);
      }
      function pushSegmentFinale$1(target, responseState, lastPushedText, textEmbedded) {
        if (!responseState.generateStaticMarkup)
          return pushSegmentFinale(target, responseState, lastPushedText, textEmbedded);
      }
      function writeStartCompletedSuspenseBoundary$1(destination, responseState) {
        return responseState.generateStaticMarkup ? !0 : writeStartCompletedSuspenseBoundary(destination);
      }
      function writeStartClientRenderedSuspenseBoundary$1(destination, responseState, errorDigest, errorMessage, errorComponentStack) {
        return responseState.generateStaticMarkup ? !0 : writeStartClientRenderedSuspenseBoundary(destination, responseState, errorDigest, errorMessage, errorComponentStack);
      }
      function writeEndCompletedSuspenseBoundary$1(destination, responseState) {
        return responseState.generateStaticMarkup ? !0 : writeEndCompletedSuspenseBoundary(destination);
      }
      function writeEndClientRenderedSuspenseBoundary$1(destination, responseState) {
        return responseState.generateStaticMarkup ? !0 : writeEndClientRenderedSuspenseBoundary(destination);
      }
      var assign = Object.assign, REACT_ELEMENT_TYPE = Symbol.for("react.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_PROVIDER_TYPE = Symbol.for("react.provider"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_SCOPE_TYPE = Symbol.for("react.scope"), REACT_DEBUG_TRACING_MODE_TYPE = Symbol.for("react.debug_trace_mode"), REACT_LEGACY_HIDDEN_TYPE = Symbol.for("react.legacy_hidden"), REACT_SERVER_CONTEXT_DEFAULT_VALUE_NOT_LOADED = Symbol.for("react.default_value"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        if (maybeIterable === null || typeof maybeIterable != "object")
          return null;
        var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
        return typeof maybeIterator == "function" ? maybeIterator : null;
      }
      function getWrappedName(outerType, innerType, wrapperName) {
        var displayName = outerType.displayName;
        if (displayName)
          return displayName;
        var functionName = innerType.displayName || innerType.name || "";
        return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
      }
      function getContextName(type) {
        return type.displayName || "Context";
      }
      function getComponentNameFromType(type) {
        if (type == null)
          return null;
        if (typeof type.tag == "number" && error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof type == "function")
          return type.displayName || type.name || null;
        if (typeof type == "string")
          return type;
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
        }
        if (typeof type == "object")
          switch (type.$$typeof) {
            case REACT_CONTEXT_TYPE:
              var context = type;
              return getContextName(context) + ".Consumer";
            case REACT_PROVIDER_TYPE:
              var provider = type;
              return getContextName(provider._context) + ".Provider";
            case REACT_FORWARD_REF_TYPE:
              return getWrappedName(type, type.render, "ForwardRef");
            case REACT_MEMO_TYPE:
              var outerName = type.displayName || null;
              return outerName !== null ? outerName : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE: {
              var lazyComponent = type, payload = lazyComponent._payload, init = lazyComponent._init;
              try {
                return getComponentNameFromType(init(payload));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var disabledDepth = 0, prevLog, prevInfo, prevWarn, prevError, prevGroup, prevGroupCollapsed, prevGroupEnd;
      function disabledLog() {
      }
      disabledLog.__reactDisabledLog = !0;
      function disableLogs() {
        {
          if (disabledDepth === 0) {
            prevLog = console.log, prevInfo = console.info, prevWarn = console.warn, prevError = console.error, prevGroup = console.group, prevGroupCollapsed = console.groupCollapsed, prevGroupEnd = console.groupEnd;
            var props = {
              configurable: !0,
              enumerable: !0,
              value: disabledLog,
              writable: !0
            };
            Object.defineProperties(console, {
              info: props,
              log: props,
              warn: props,
              error: props,
              group: props,
              groupCollapsed: props,
              groupEnd: props
            });
          }
          disabledDepth++;
        }
      }
      function reenableLogs() {
        {
          if (disabledDepth--, disabledDepth === 0) {
            var props = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: assign({}, props, {
                value: prevLog
              }),
              info: assign({}, props, {
                value: prevInfo
              }),
              warn: assign({}, props, {
                value: prevWarn
              }),
              error: assign({}, props, {
                value: prevError
              }),
              group: assign({}, props, {
                value: prevGroup
              }),
              groupCollapsed: assign({}, props, {
                value: prevGroupCollapsed
              }),
              groupEnd: assign({}, props, {
                value: prevGroupEnd
              })
            });
          }
          disabledDepth < 0 && error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher, prefix;
      function describeBuiltInComponentFrame(name, source, ownerFn) {
        {
          if (prefix === void 0)
            try {
              throw Error();
            } catch (x) {
              var match = x.stack.trim().match(/\n( *(at )?)/);
              prefix = match && match[1] || "";
            }
          return `
` + prefix + name;
        }
      }
      var reentry = !1, componentFrameCache;
      {
        var PossiblyWeakMap = typeof WeakMap == "function" ? WeakMap : Map;
        componentFrameCache = new PossiblyWeakMap();
      }
      function describeNativeComponentFrame(fn, construct) {
        if (!fn || reentry)
          return "";
        {
          var frame = componentFrameCache.get(fn);
          if (frame !== void 0)
            return frame;
        }
        var control;
        reentry = !0;
        var previousPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var previousDispatcher;
        previousDispatcher = ReactCurrentDispatcher.current, ReactCurrentDispatcher.current = null, disableLogs();
        try {
          if (construct) {
            var Fake = function() {
              throw Error();
            };
            if (Object.defineProperty(Fake.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(Fake, []);
              } catch (x) {
                control = x;
              }
              Reflect.construct(fn, [], Fake);
            } else {
              try {
                Fake.call();
              } catch (x) {
                control = x;
              }
              fn.call(Fake.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (x) {
              control = x;
            }
            fn();
          }
        } catch (sample) {
          if (sample && control && typeof sample.stack == "string") {
            for (var sampleLines = sample.stack.split(`
`), controlLines = control.stack.split(`
`), s = sampleLines.length - 1, c = controlLines.length - 1; s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]; )
              c--;
            for (; s >= 1 && c >= 0; s--, c--)
              if (sampleLines[s] !== controlLines[c]) {
                if (s !== 1 || c !== 1)
                  do
                    if (s--, c--, c < 0 || sampleLines[s] !== controlLines[c]) {
                      var _frame = `
` + sampleLines[s].replace(" at new ", " at ");
                      return fn.displayName && _frame.includes("<anonymous>") && (_frame = _frame.replace("<anonymous>", fn.displayName)), typeof fn == "function" && componentFrameCache.set(fn, _frame), _frame;
                    }
                  while (s >= 1 && c >= 0);
                break;
              }
          }
        } finally {
          reentry = !1, ReactCurrentDispatcher.current = previousDispatcher, reenableLogs(), Error.prepareStackTrace = previousPrepareStackTrace;
        }
        var name = fn ? fn.displayName || fn.name : "", syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
        return typeof fn == "function" && componentFrameCache.set(fn, syntheticFrame), syntheticFrame;
      }
      function describeClassComponentFrame(ctor, source, ownerFn) {
        return describeNativeComponentFrame(ctor, !0);
      }
      function describeFunctionComponentFrame(fn, source, ownerFn) {
        return describeNativeComponentFrame(fn, !1);
      }
      function shouldConstruct(Component2) {
        var prototype = Component2.prototype;
        return !!(prototype && prototype.isReactComponent);
      }
      function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
        if (type == null)
          return "";
        if (typeof type == "function")
          return describeNativeComponentFrame(type, shouldConstruct(type));
        if (typeof type == "string")
          return describeBuiltInComponentFrame(type);
        switch (type) {
          case REACT_SUSPENSE_TYPE:
            return describeBuiltInComponentFrame("Suspense");
          case REACT_SUSPENSE_LIST_TYPE:
            return describeBuiltInComponentFrame("SuspenseList");
        }
        if (typeof type == "object")
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE:
              return describeFunctionComponentFrame(type.render);
            case REACT_MEMO_TYPE:
              return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
            case REACT_LAZY_TYPE: {
              var lazyComponent = type, payload = lazyComponent._payload, init = lazyComponent._init;
              try {
                return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
              } catch {
              }
            }
          }
        return "";
      }
      var loggedTypeFailures = {}, ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement(element) {
        if (element) {
          var owner = element._owner, stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
          ReactDebugCurrentFrame.setExtraStackFrame(stack);
        } else
          ReactDebugCurrentFrame.setExtraStackFrame(null);
      }
      function checkPropTypes(typeSpecs, values, location2, componentName, element) {
        {
          var has = Function.call.bind(hasOwnProperty);
          for (var typeSpecName in typeSpecs)
            if (has(typeSpecs, typeSpecName)) {
              var error$1 = void 0;
              try {
                if (typeof typeSpecs[typeSpecName] != "function") {
                  var err = Error((componentName || "React class") + ": " + location2 + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw err.name = "Invariant Violation", err;
                }
                error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location2, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (ex) {
                error$1 = ex;
              }
              error$1 && !(error$1 instanceof Error) && (setCurrentlyValidatingElement(element), error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location2, typeSpecName, typeof error$1), setCurrentlyValidatingElement(null)), error$1 instanceof Error && !(error$1.message in loggedTypeFailures) && (loggedTypeFailures[error$1.message] = !0, setCurrentlyValidatingElement(element), error("Failed %s type: %s", location2, error$1.message), setCurrentlyValidatingElement(null));
            }
        }
      }
      var warnedAboutMissingGetChildContext;
      warnedAboutMissingGetChildContext = {};
      var emptyContextObject = {};
      Object.freeze(emptyContextObject);
      function getMaskedContext(type, unmaskedContext) {
        {
          var contextTypes = type.contextTypes;
          if (!contextTypes)
            return emptyContextObject;
          var context = {};
          for (var key in contextTypes)
            context[key] = unmaskedContext[key];
          {
            var name = getComponentNameFromType(type) || "Unknown";
            checkPropTypes(contextTypes, context, "context", name);
          }
          return context;
        }
      }
      function processChildContext(instance, type, parentContext, childContextTypes) {
        {
          if (typeof instance.getChildContext != "function") {
            {
              var componentName = getComponentNameFromType(type) || "Unknown";
              warnedAboutMissingGetChildContext[componentName] || (warnedAboutMissingGetChildContext[componentName] = !0, error("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", componentName, componentName));
            }
            return parentContext;
          }
          var childContext = instance.getChildContext();
          for (var contextKey in childContext)
            if (!(contextKey in childContextTypes))
              throw new Error((getComponentNameFromType(type) || "Unknown") + '.getChildContext(): key "' + contextKey + '" is not defined in childContextTypes.');
          {
            var name = getComponentNameFromType(type) || "Unknown";
            checkPropTypes(childContextTypes, childContext, "child context", name);
          }
          return assign({}, parentContext, childContext);
        }
      }
      var rendererSigil;
      rendererSigil = {};
      var rootContextSnapshot = null, currentActiveSnapshot = null;
      function popNode(prev) {
        prev.context._currentValue2 = prev.parentValue;
      }
      function pushNode(next) {
        next.context._currentValue2 = next.value;
      }
      function popToNearestCommonAncestor(prev, next) {
        if (prev !== next) {
          popNode(prev);
          var parentPrev = prev.parent, parentNext = next.parent;
          if (parentPrev === null) {
            if (parentNext !== null)
              throw new Error("The stacks must reach the root at the same time. This is a bug in React.");
          } else {
            if (parentNext === null)
              throw new Error("The stacks must reach the root at the same time. This is a bug in React.");
            popToNearestCommonAncestor(parentPrev, parentNext);
          }
          pushNode(next);
        }
      }
      function popAllPrevious(prev) {
        popNode(prev);
        var parentPrev = prev.parent;
        parentPrev !== null && popAllPrevious(parentPrev);
      }
      function pushAllNext(next) {
        var parentNext = next.parent;
        parentNext !== null && pushAllNext(parentNext), pushNode(next);
      }
      function popPreviousToCommonLevel(prev, next) {
        popNode(prev);
        var parentPrev = prev.parent;
        if (parentPrev === null)
          throw new Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
        parentPrev.depth === next.depth ? popToNearestCommonAncestor(parentPrev, next) : popPreviousToCommonLevel(parentPrev, next);
      }
      function popNextToCommonLevel(prev, next) {
        var parentNext = next.parent;
        if (parentNext === null)
          throw new Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
        prev.depth === parentNext.depth ? popToNearestCommonAncestor(prev, parentNext) : popNextToCommonLevel(prev, parentNext), pushNode(next);
      }
      function switchContext(newSnapshot) {
        var prev = currentActiveSnapshot, next = newSnapshot;
        prev !== next && (prev === null ? pushAllNext(next) : next === null ? popAllPrevious(prev) : prev.depth === next.depth ? popToNearestCommonAncestor(prev, next) : prev.depth > next.depth ? popPreviousToCommonLevel(prev, next) : popNextToCommonLevel(prev, next), currentActiveSnapshot = next);
      }
      function pushProvider(context, nextValue) {
        var prevValue;
        prevValue = context._currentValue2, context._currentValue2 = nextValue, context._currentRenderer2 !== void 0 && context._currentRenderer2 !== null && context._currentRenderer2 !== rendererSigil && error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), context._currentRenderer2 = rendererSigil;
        var prevNode = currentActiveSnapshot, newNode = {
          parent: prevNode,
          depth: prevNode === null ? 0 : prevNode.depth + 1,
          context,
          parentValue: prevValue,
          value: nextValue
        };
        return currentActiveSnapshot = newNode, newNode;
      }
      function popProvider(context) {
        var prevSnapshot = currentActiveSnapshot;
        if (prevSnapshot === null)
          throw new Error("Tried to pop a Context at the root of the app. This is a bug in React.");
        prevSnapshot.context !== context && error("The parent context is not the expected context. This is probably a bug in React.");
        {
          var _value = prevSnapshot.parentValue;
          _value === REACT_SERVER_CONTEXT_DEFAULT_VALUE_NOT_LOADED ? prevSnapshot.context._currentValue2 = prevSnapshot.context._defaultValue : prevSnapshot.context._currentValue2 = _value, context._currentRenderer2 !== void 0 && context._currentRenderer2 !== null && context._currentRenderer2 !== rendererSigil && error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), context._currentRenderer2 = rendererSigil;
        }
        return currentActiveSnapshot = prevSnapshot.parent;
      }
      function getActiveContext() {
        return currentActiveSnapshot;
      }
      function readContext(context) {
        var value = context._currentValue2;
        return value;
      }
      function get(key) {
        return key._reactInternals;
      }
      function set(key, value) {
        key._reactInternals = value;
      }
      var didWarnAboutNoopUpdateForComponent = {}, didWarnAboutDeprecatedWillMount = {}, didWarnAboutUninitializedState, didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate, didWarnAboutLegacyLifecyclesAndDerivedState, didWarnAboutUndefinedDerivedState, warnOnUndefinedDerivedState, warnOnInvalidCallback, didWarnAboutDirectlyAssigningPropsToState, didWarnAboutContextTypeAndContextTypes, didWarnAboutInvalidateContextType;
      {
        didWarnAboutUninitializedState = /* @__PURE__ */ new Set(), didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate = /* @__PURE__ */ new Set(), didWarnAboutLegacyLifecyclesAndDerivedState = /* @__PURE__ */ new Set(), didWarnAboutDirectlyAssigningPropsToState = /* @__PURE__ */ new Set(), didWarnAboutUndefinedDerivedState = /* @__PURE__ */ new Set(), didWarnAboutContextTypeAndContextTypes = /* @__PURE__ */ new Set(), didWarnAboutInvalidateContextType = /* @__PURE__ */ new Set();
        var didWarnOnInvalidCallback = /* @__PURE__ */ new Set();
        warnOnInvalidCallback = function(callback, callerName) {
          if (!(callback === null || typeof callback == "function")) {
            var key = callerName + "_" + callback;
            didWarnOnInvalidCallback.has(key) || (didWarnOnInvalidCallback.add(key), error("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", callerName, callback));
          }
        }, warnOnUndefinedDerivedState = function(type, partialState) {
          if (partialState === void 0) {
            var componentName = getComponentNameFromType(type) || "Component";
            didWarnAboutUndefinedDerivedState.has(componentName) || (didWarnAboutUndefinedDerivedState.add(componentName), error("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", componentName));
          }
        };
      }
      function warnNoop(publicInstance, callerName) {
        {
          var _constructor = publicInstance.constructor, componentName = _constructor && getComponentNameFromType(_constructor) || "ReactClass", warningKey = componentName + "." + callerName;
          if (didWarnAboutNoopUpdateForComponent[warningKey])
            return;
          error(`%s(...): Can only update a mounting component. This usually means you called %s() outside componentWillMount() on the server. This is a no-op.

Please check the code for the %s component.`, callerName, callerName, componentName), didWarnAboutNoopUpdateForComponent[warningKey] = !0;
        }
      }
      var classComponentUpdater = {
        isMounted: function(inst) {
          return !1;
        },
        enqueueSetState: function(inst, payload, callback) {
          var internals = get(inst);
          internals.queue === null ? warnNoop(inst, "setState") : (internals.queue.push(payload), callback != null && warnOnInvalidCallback(callback, "setState"));
        },
        enqueueReplaceState: function(inst, payload, callback) {
          var internals = get(inst);
          internals.replace = !0, internals.queue = [payload], callback != null && warnOnInvalidCallback(callback, "setState");
        },
        enqueueForceUpdate: function(inst, callback) {
          var internals = get(inst);
          internals.queue === null ? warnNoop(inst, "forceUpdate") : callback != null && warnOnInvalidCallback(callback, "setState");
        }
      };
      function applyDerivedStateFromProps(instance, ctor, getDerivedStateFromProps, prevState, nextProps) {
        var partialState = getDerivedStateFromProps(nextProps, prevState);
        warnOnUndefinedDerivedState(ctor, partialState);
        var newState = partialState == null ? prevState : assign({}, prevState, partialState);
        return newState;
      }
      function constructClassInstance(ctor, props, maskedLegacyContext) {
        var context = emptyContextObject, contextType = ctor.contextType;
        if ("contextType" in ctor) {
          var isValid = (
            // Allow null for conditional declaration
            contextType === null || contextType !== void 0 && contextType.$$typeof === REACT_CONTEXT_TYPE && contextType._context === void 0
          );
          if (!isValid && !didWarnAboutInvalidateContextType.has(ctor)) {
            didWarnAboutInvalidateContextType.add(ctor);
            var addendum = "";
            contextType === void 0 ? addendum = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof contextType != "object" ? addendum = " However, it is set to a " + typeof contextType + "." : contextType.$$typeof === REACT_PROVIDER_TYPE ? addendum = " Did you accidentally pass the Context.Provider instead?" : contextType._context !== void 0 ? addendum = " Did you accidentally pass the Context.Consumer instead?" : addendum = " However, it is set to an object with keys {" + Object.keys(contextType).join(", ") + "}.", error("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", getComponentNameFromType(ctor) || "Component", addendum);
          }
        }
        typeof contextType == "object" && contextType !== null ? context = readContext(contextType) : context = maskedLegacyContext;
        var instance = new ctor(props, context);
        {
          if (typeof ctor.getDerivedStateFromProps == "function" && (instance.state === null || instance.state === void 0)) {
            var componentName = getComponentNameFromType(ctor) || "Component";
            didWarnAboutUninitializedState.has(componentName) || (didWarnAboutUninitializedState.add(componentName), error("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", componentName, instance.state === null ? "null" : "undefined", componentName));
          }
          if (typeof ctor.getDerivedStateFromProps == "function" || typeof instance.getSnapshotBeforeUpdate == "function") {
            var foundWillMountName = null, foundWillReceivePropsName = null, foundWillUpdateName = null;
            if (typeof instance.componentWillMount == "function" && instance.componentWillMount.__suppressDeprecationWarning !== !0 ? foundWillMountName = "componentWillMount" : typeof instance.UNSAFE_componentWillMount == "function" && (foundWillMountName = "UNSAFE_componentWillMount"), typeof instance.componentWillReceiveProps == "function" && instance.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? foundWillReceivePropsName = "componentWillReceiveProps" : typeof instance.UNSAFE_componentWillReceiveProps == "function" && (foundWillReceivePropsName = "UNSAFE_componentWillReceiveProps"), typeof instance.componentWillUpdate == "function" && instance.componentWillUpdate.__suppressDeprecationWarning !== !0 ? foundWillUpdateName = "componentWillUpdate" : typeof instance.UNSAFE_componentWillUpdate == "function" && (foundWillUpdateName = "UNSAFE_componentWillUpdate"), foundWillMountName !== null || foundWillReceivePropsName !== null || foundWillUpdateName !== null) {
              var _componentName = getComponentNameFromType(ctor) || "Component", newApiName = typeof ctor.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
              didWarnAboutLegacyLifecyclesAndDerivedState.has(_componentName) || (didWarnAboutLegacyLifecyclesAndDerivedState.add(_componentName), error(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, _componentName, newApiName, foundWillMountName !== null ? `
  ` + foundWillMountName : "", foundWillReceivePropsName !== null ? `
  ` + foundWillReceivePropsName : "", foundWillUpdateName !== null ? `
  ` + foundWillUpdateName : ""));
            }
          }
        }
        return instance;
      }
      function checkClassInstance(instance, ctor, newProps) {
        {
          var name = getComponentNameFromType(ctor) || "Component", renderPresent = instance.render;
          renderPresent || (ctor.prototype && typeof ctor.prototype.render == "function" ? error("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", name) : error("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", name)), instance.getInitialState && !instance.getInitialState.isReactClassApproved && !instance.state && error("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", name), instance.getDefaultProps && !instance.getDefaultProps.isReactClassApproved && error("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", name), instance.propTypes && error("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", name), instance.contextType && error("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", name), instance.contextTypes && error("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", name), ctor.contextType && ctor.contextTypes && !didWarnAboutContextTypeAndContextTypes.has(ctor) && (didWarnAboutContextTypeAndContextTypes.add(ctor), error("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", name)), typeof instance.componentShouldUpdate == "function" && error("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", name), ctor.prototype && ctor.prototype.isPureReactComponent && typeof instance.shouldComponentUpdate < "u" && error("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", getComponentNameFromType(ctor) || "A pure component"), typeof instance.componentDidUnmount == "function" && error("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", name), typeof instance.componentDidReceiveProps == "function" && error("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", name), typeof instance.componentWillRecieveProps == "function" && error("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", name), typeof instance.UNSAFE_componentWillRecieveProps == "function" && error("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", name);
          var hasMutatedProps = instance.props !== newProps;
          instance.props !== void 0 && hasMutatedProps && error("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", name, name), instance.defaultProps && error("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", name, name), typeof instance.getSnapshotBeforeUpdate == "function" && typeof instance.componentDidUpdate != "function" && !didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.has(ctor) && (didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.add(ctor), error("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", getComponentNameFromType(ctor))), typeof instance.getDerivedStateFromProps == "function" && error("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", name), typeof instance.getDerivedStateFromError == "function" && error("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", name), typeof ctor.getSnapshotBeforeUpdate == "function" && error("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", name);
          var _state = instance.state;
          _state && (typeof _state != "object" || isArray(_state)) && error("%s.state: must be set to an object or null", name), typeof instance.getChildContext == "function" && typeof ctor.childContextTypes != "object" && error("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", name);
        }
      }
      function callComponentWillMount(type, instance) {
        var oldState = instance.state;
        if (typeof instance.componentWillMount == "function") {
          if (instance.componentWillMount.__suppressDeprecationWarning !== !0) {
            var componentName = getComponentNameFromType(type) || "Unknown";
            didWarnAboutDeprecatedWillMount[componentName] || (warn(
              // keep this warning in sync with ReactStrictModeWarning.js
              `componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code from componentWillMount to componentDidMount (preferred in most cases) or the constructor.

Please update the following components: %s`,
              componentName
            ), didWarnAboutDeprecatedWillMount[componentName] = !0);
          }
          instance.componentWillMount();
        }
        typeof instance.UNSAFE_componentWillMount == "function" && instance.UNSAFE_componentWillMount(), oldState !== instance.state && (error("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", getComponentNameFromType(type) || "Component"), classComponentUpdater.enqueueReplaceState(instance, instance.state, null));
      }
      function processUpdateQueue(internalInstance, inst, props, maskedLegacyContext) {
        if (internalInstance.queue !== null && internalInstance.queue.length > 0) {
          var oldQueue = internalInstance.queue, oldReplace = internalInstance.replace;
          if (internalInstance.queue = null, internalInstance.replace = !1, oldReplace && oldQueue.length === 1)
            inst.state = oldQueue[0];
          else {
            for (var nextState = oldReplace ? oldQueue[0] : inst.state, dontMutate = !0, i = oldReplace ? 1 : 0; i < oldQueue.length; i++) {
              var partial = oldQueue[i], partialState = typeof partial == "function" ? partial.call(inst, nextState, props, maskedLegacyContext) : partial;
              partialState != null && (dontMutate ? (dontMutate = !1, nextState = assign({}, nextState, partialState)) : assign(nextState, partialState));
            }
            inst.state = nextState;
          }
        } else
          internalInstance.queue = null;
      }
      function mountClassInstance(instance, ctor, newProps, maskedLegacyContext) {
        checkClassInstance(instance, ctor, newProps);
        var initialState = instance.state !== void 0 ? instance.state : null;
        instance.updater = classComponentUpdater, instance.props = newProps, instance.state = initialState;
        var internalInstance = {
          queue: [],
          replace: !1
        };
        set(instance, internalInstance);
        var contextType = ctor.contextType;
        if (typeof contextType == "object" && contextType !== null ? instance.context = readContext(contextType) : instance.context = maskedLegacyContext, instance.state === newProps) {
          var componentName = getComponentNameFromType(ctor) || "Component";
          didWarnAboutDirectlyAssigningPropsToState.has(componentName) || (didWarnAboutDirectlyAssigningPropsToState.add(componentName), error("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", componentName));
        }
        var getDerivedStateFromProps = ctor.getDerivedStateFromProps;
        typeof getDerivedStateFromProps == "function" && (instance.state = applyDerivedStateFromProps(instance, ctor, getDerivedStateFromProps, initialState, newProps)), typeof ctor.getDerivedStateFromProps != "function" && typeof instance.getSnapshotBeforeUpdate != "function" && (typeof instance.UNSAFE_componentWillMount == "function" || typeof instance.componentWillMount == "function") && (callComponentWillMount(ctor, instance), processUpdateQueue(internalInstance, instance, newProps, maskedLegacyContext));
      }
      var emptyTreeContext = {
        id: 1,
        overflow: ""
      };
      function getTreeId(context) {
        var overflow = context.overflow, idWithLeadingBit = context.id, id = idWithLeadingBit & ~getLeadingBit(idWithLeadingBit);
        return id.toString(32) + overflow;
      }
      function pushTreeContext(baseContext, totalChildren, index) {
        var baseIdWithLeadingBit = baseContext.id, baseOverflow = baseContext.overflow, baseLength = getBitLength(baseIdWithLeadingBit) - 1, baseId = baseIdWithLeadingBit & ~(1 << baseLength), slot = index + 1, length = getBitLength(totalChildren) + baseLength;
        if (length > 30) {
          var numberOfOverflowBits = baseLength - baseLength % 5, newOverflowBits = (1 << numberOfOverflowBits) - 1, newOverflow = (baseId & newOverflowBits).toString(32), restOfBaseId = baseId >> numberOfOverflowBits, restOfBaseLength = baseLength - numberOfOverflowBits, restOfLength = getBitLength(totalChildren) + restOfBaseLength, restOfNewBits = slot << restOfBaseLength, id = restOfNewBits | restOfBaseId, overflow = newOverflow + baseOverflow;
          return {
            id: 1 << restOfLength | id,
            overflow
          };
        } else {
          var newBits = slot << baseLength, _id = newBits | baseId, _overflow = baseOverflow;
          return {
            id: 1 << length | _id,
            overflow: _overflow
          };
        }
      }
      function getBitLength(number) {
        return 32 - clz32(number);
      }
      function getLeadingBit(id) {
        return 1 << getBitLength(id) - 1;
      }
      var clz32 = Math.clz32 ? Math.clz32 : clz32Fallback, log = Math.log, LN2 = Math.LN2;
      function clz32Fallback(x) {
        var asUint = x >>> 0;
        return asUint === 0 ? 32 : 31 - (log(asUint) / LN2 | 0) | 0;
      }
      function is(x, y) {
        return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
      }
      var objectIs = typeof Object.is == "function" ? Object.is : is, currentlyRenderingComponent = null, currentlyRenderingTask = null, firstWorkInProgressHook = null, workInProgressHook = null, isReRender = !1, didScheduleRenderPhaseUpdate = !1, localIdCounter = 0, renderPhaseUpdates = null, numberOfReRenders = 0, RE_RENDER_LIMIT = 25, isInHookUserCodeInDev = !1, currentHookNameInDev;
      function resolveCurrentlyRenderingComponent() {
        if (currentlyRenderingComponent === null)
          throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
        return isInHookUserCodeInDev && error("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks"), currentlyRenderingComponent;
      }
      function areHookInputsEqual(nextDeps, prevDeps) {
        if (prevDeps === null)
          return error("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", currentHookNameInDev), !1;
        nextDeps.length !== prevDeps.length && error(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, currentHookNameInDev, "[" + nextDeps.join(", ") + "]", "[" + prevDeps.join(", ") + "]");
        for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++)
          if (!objectIs(nextDeps[i], prevDeps[i]))
            return !1;
        return !0;
      }
      function createHook() {
        if (numberOfReRenders > 0)
          throw new Error("Rendered more hooks than during the previous render");
        return {
          memoizedState: null,
          queue: null,
          next: null
        };
      }
      function createWorkInProgressHook() {
        return workInProgressHook === null ? firstWorkInProgressHook === null ? (isReRender = !1, firstWorkInProgressHook = workInProgressHook = createHook()) : (isReRender = !0, workInProgressHook = firstWorkInProgressHook) : workInProgressHook.next === null ? (isReRender = !1, workInProgressHook = workInProgressHook.next = createHook()) : (isReRender = !0, workInProgressHook = workInProgressHook.next), workInProgressHook;
      }
      function prepareToUseHooks(task, componentIdentity) {
        currentlyRenderingComponent = componentIdentity, currentlyRenderingTask = task, isInHookUserCodeInDev = !1, localIdCounter = 0;
      }
      function finishHooks(Component2, props, children, refOrContext) {
        for (; didScheduleRenderPhaseUpdate; )
          didScheduleRenderPhaseUpdate = !1, localIdCounter = 0, numberOfReRenders += 1, workInProgressHook = null, children = Component2(props, refOrContext);
        return resetHooksState(), children;
      }
      function checkDidRenderIdHook() {
        var didRenderIdHook = localIdCounter !== 0;
        return didRenderIdHook;
      }
      function resetHooksState() {
        isInHookUserCodeInDev = !1, currentlyRenderingComponent = null, currentlyRenderingTask = null, didScheduleRenderPhaseUpdate = !1, firstWorkInProgressHook = null, numberOfReRenders = 0, renderPhaseUpdates = null, workInProgressHook = null;
      }
      function readContext$1(context) {
        return isInHookUserCodeInDev && error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."), readContext(context);
      }
      function useContext5(context) {
        return currentHookNameInDev = "useContext", resolveCurrentlyRenderingComponent(), readContext(context);
      }
      function basicStateReducer(state, action) {
        return typeof action == "function" ? action(state) : action;
      }
      function useState6(initialState) {
        return currentHookNameInDev = "useState", useReducer(
          basicStateReducer,
          // useReducer has a special case to support lazy useState initializers
          initialState
        );
      }
      function useReducer(reducer, initialArg, init) {
        if (reducer !== basicStateReducer && (currentHookNameInDev = "useReducer"), currentlyRenderingComponent = resolveCurrentlyRenderingComponent(), workInProgressHook = createWorkInProgressHook(), isReRender) {
          var queue = workInProgressHook.queue, dispatch = queue.dispatch;
          if (renderPhaseUpdates !== null) {
            var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);
            if (firstRenderPhaseUpdate !== void 0) {
              renderPhaseUpdates.delete(queue);
              var newState = workInProgressHook.memoizedState, update = firstRenderPhaseUpdate;
              do {
                var action = update.action;
                isInHookUserCodeInDev = !0, newState = reducer(newState, action), isInHookUserCodeInDev = !1, update = update.next;
              } while (update !== null);
              return workInProgressHook.memoizedState = newState, [newState, dispatch];
            }
          }
          return [workInProgressHook.memoizedState, dispatch];
        } else {
          isInHookUserCodeInDev = !0;
          var initialState;
          reducer === basicStateReducer ? initialState = typeof initialArg == "function" ? initialArg() : initialArg : initialState = init !== void 0 ? init(initialArg) : initialArg, isInHookUserCodeInDev = !1, workInProgressHook.memoizedState = initialState;
          var _queue = workInProgressHook.queue = {
            last: null,
            dispatch: null
          }, _dispatch = _queue.dispatch = dispatchAction.bind(null, currentlyRenderingComponent, _queue);
          return [workInProgressHook.memoizedState, _dispatch];
        }
      }
      function useMemo5(nextCreate, deps) {
        currentlyRenderingComponent = resolveCurrentlyRenderingComponent(), workInProgressHook = createWorkInProgressHook();
        var nextDeps = deps === void 0 ? null : deps;
        if (workInProgressHook !== null) {
          var prevState = workInProgressHook.memoizedState;
          if (prevState !== null && nextDeps !== null) {
            var prevDeps = prevState[1];
            if (areHookInputsEqual(nextDeps, prevDeps))
              return prevState[0];
          }
        }
        isInHookUserCodeInDev = !0;
        var nextValue = nextCreate();
        return isInHookUserCodeInDev = !1, workInProgressHook.memoizedState = [nextValue, nextDeps], nextValue;
      }
      function useRef5(initialValue) {
        currentlyRenderingComponent = resolveCurrentlyRenderingComponent(), workInProgressHook = createWorkInProgressHook();
        var previousRef = workInProgressHook.memoizedState;
        if (previousRef === null) {
          var ref = {
            current: initialValue
          };
          return Object.seal(ref), workInProgressHook.memoizedState = ref, ref;
        } else
          return previousRef;
      }
      function useLayoutEffect3(create, inputs) {
        currentHookNameInDev = "useLayoutEffect", error("useLayoutEffect does nothing on the server, because its effect cannot be encoded into the server renderer's output format. This will lead to a mismatch between the initial, non-hydrated UI and the intended UI. To avoid this, useLayoutEffect should only be used in components that render exclusively on the client. See https://reactjs.org/link/uselayouteffect-ssr for common fixes.");
      }
      function dispatchAction(componentIdentity, queue, action) {
        if (numberOfReRenders >= RE_RENDER_LIMIT)
          throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
        if (componentIdentity === currentlyRenderingComponent) {
          didScheduleRenderPhaseUpdate = !0;
          var update = {
            action,
            next: null
          };
          renderPhaseUpdates === null && (renderPhaseUpdates = /* @__PURE__ */ new Map());
          var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);
          if (firstRenderPhaseUpdate === void 0)
            renderPhaseUpdates.set(queue, update);
          else {
            for (var lastRenderPhaseUpdate = firstRenderPhaseUpdate; lastRenderPhaseUpdate.next !== null; )
              lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
            lastRenderPhaseUpdate.next = update;
          }
        }
      }
      function useCallback3(callback, deps) {
        return useMemo5(function() {
          return callback;
        }, deps);
      }
      function useMutableSource(source, getSnapshot, subscribe) {
        return resolveCurrentlyRenderingComponent(), getSnapshot(source._source);
      }
      function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
        if (getServerSnapshot === void 0)
          throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        return getServerSnapshot();
      }
      function useDeferredValue(value) {
        return resolveCurrentlyRenderingComponent(), value;
      }
      function unsupportedStartTransition() {
        throw new Error("startTransition cannot be called during server rendering.");
      }
      function useTransition2() {
        return resolveCurrentlyRenderingComponent(), [!1, unsupportedStartTransition];
      }
      function useId() {
        var task = currentlyRenderingTask, treeId = getTreeId(task.treeContext), responseState = currentResponseState;
        if (responseState === null)
          throw new Error("Invalid hook call. Hooks can only be called inside of the body of a function component.");
        var localId = localIdCounter++;
        return makeId(responseState, treeId, localId);
      }
      function noop() {
      }
      var Dispatcher = {
        readContext: readContext$1,
        useContext: useContext5,
        useMemo: useMemo5,
        useReducer,
        useRef: useRef5,
        useState: useState6,
        useInsertionEffect: noop,
        useLayoutEffect: useLayoutEffect3,
        useCallback: useCallback3,
        // useImperativeHandle is not run in the server environment
        useImperativeHandle: noop,
        // Effects are not run in the server environment.
        useEffect: noop,
        // Debugging effect
        useDebugValue: noop,
        useDeferredValue,
        useTransition: useTransition2,
        useId,
        // Subscriptions are not setup in a server environment.
        useMutableSource,
        useSyncExternalStore
      }, currentResponseState = null;
      function setCurrentResponseState(responseState) {
        currentResponseState = responseState;
      }
      function getStackByComponentStackNode(componentStack) {
        try {
          var info = "", node = componentStack;
          do {
            switch (node.tag) {
              case 0:
                info += describeBuiltInComponentFrame(node.type, null, null);
                break;
              case 1:
                info += describeFunctionComponentFrame(node.type, null, null);
                break;
              case 2:
                info += describeClassComponentFrame(node.type, null, null);
                break;
            }
            node = node.parent;
          } while (node);
          return info;
        } catch (x) {
          return `
Error generating stack: ` + x.message + `
` + x.stack;
        }
      }
      var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher, ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame, PENDING = 0, COMPLETED = 1, FLUSHED = 2, ABORTED = 3, ERRORED = 4, OPEN = 0, CLOSING = 1, CLOSED = 2, DEFAULT_PROGRESSIVE_CHUNK_SIZE = 12800;
      function defaultErrorHandler(error2) {
        return console.error(error2), null;
      }
      function noop$1() {
      }
      function createRequest(children, responseState, rootFormatContext, progressiveChunkSize, onError2, onAllReady, onShellReady, onShellError, onFatalError) {
        var pingedTasks = [], abortSet = /* @__PURE__ */ new Set(), request = {
          destination: null,
          responseState,
          progressiveChunkSize: progressiveChunkSize === void 0 ? DEFAULT_PROGRESSIVE_CHUNK_SIZE : progressiveChunkSize,
          status: OPEN,
          fatalError: null,
          nextSegmentId: 0,
          allPendingTasks: 0,
          pendingRootTasks: 0,
          completedRootSegment: null,
          abortableTasks: abortSet,
          pingedTasks,
          clientRenderedBoundaries: [],
          completedBoundaries: [],
          partialBoundaries: [],
          onError: onError2 === void 0 ? defaultErrorHandler : onError2,
          onAllReady: onAllReady === void 0 ? noop$1 : onAllReady,
          onShellReady: onShellReady === void 0 ? noop$1 : onShellReady,
          onShellError: onShellError === void 0 ? noop$1 : onShellError,
          onFatalError: onFatalError === void 0 ? noop$1 : onFatalError
        }, rootSegment = createPendingSegment(
          request,
          0,
          null,
          rootFormatContext,
          // Root segments are never embedded in Text on either edge
          !1,
          !1
        );
        rootSegment.parentFlushed = !0;
        var rootTask = createTask(request, children, null, rootSegment, abortSet, emptyContextObject, rootContextSnapshot, emptyTreeContext);
        return pingedTasks.push(rootTask), request;
      }
      function pingTask(request, task) {
        var pingedTasks = request.pingedTasks;
        pingedTasks.push(task), pingedTasks.length === 1 && scheduleWork(function() {
          return performWork(request);
        });
      }
      function createSuspenseBoundary(request, fallbackAbortableTasks) {
        return {
          id: UNINITIALIZED_SUSPENSE_BOUNDARY_ID,
          rootSegmentID: -1,
          parentFlushed: !1,
          pendingTasks: 0,
          forceClientRender: !1,
          completedSegments: [],
          byteSize: 0,
          fallbackAbortableTasks,
          errorDigest: null
        };
      }
      function createTask(request, node, blockedBoundary, blockedSegment, abortSet, legacyContext, context, treeContext) {
        request.allPendingTasks++, blockedBoundary === null ? request.pendingRootTasks++ : blockedBoundary.pendingTasks++;
        var task = {
          node,
          ping: function() {
            return pingTask(request, task);
          },
          blockedBoundary,
          blockedSegment,
          abortSet,
          legacyContext,
          context,
          treeContext
        };
        return task.componentStack = null, abortSet.add(task), task;
      }
      function createPendingSegment(request, index, boundary, formatContext, lastPushedText, textEmbedded) {
        return {
          status: PENDING,
          id: -1,
          // lazily assigned later
          index,
          parentFlushed: !1,
          chunks: [],
          children: [],
          formatContext,
          boundary,
          lastPushedText,
          textEmbedded
        };
      }
      var currentTaskInDEV = null;
      function getCurrentStackInDEV() {
        return currentTaskInDEV === null || currentTaskInDEV.componentStack === null ? "" : getStackByComponentStackNode(currentTaskInDEV.componentStack);
      }
      function pushBuiltInComponentStackInDEV(task, type) {
        task.componentStack = {
          tag: 0,
          parent: task.componentStack,
          type
        };
      }
      function pushFunctionComponentStackInDEV(task, type) {
        task.componentStack = {
          tag: 1,
          parent: task.componentStack,
          type
        };
      }
      function pushClassComponentStackInDEV(task, type) {
        task.componentStack = {
          tag: 2,
          parent: task.componentStack,
          type
        };
      }
      function popComponentStackInDEV(task) {
        task.componentStack === null ? error("Unexpectedly popped too many stack frames. This is a bug in React.") : task.componentStack = task.componentStack.parent;
      }
      var lastBoundaryErrorComponentStackDev = null;
      function captureBoundaryErrorDetailsDev(boundary, error2) {
        {
          var errorMessage;
          typeof error2 == "string" ? errorMessage = error2 : error2 && typeof error2.message == "string" ? errorMessage = error2.message : errorMessage = String(error2);
          var errorComponentStack = lastBoundaryErrorComponentStackDev || getCurrentStackInDEV();
          lastBoundaryErrorComponentStackDev = null, boundary.errorMessage = errorMessage, boundary.errorComponentStack = errorComponentStack;
        }
      }
      function logRecoverableError(request, error2) {
        var errorDigest = request.onError(error2);
        if (errorDigest != null && typeof errorDigest != "string")
          throw new Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof errorDigest + '" instead');
        return errorDigest;
      }
      function fatalError(request, error2) {
        var onShellError = request.onShellError;
        onShellError(error2);
        var onFatalError = request.onFatalError;
        onFatalError(error2), request.destination !== null ? (request.status = CLOSED, closeWithError(request.destination, error2)) : (request.status = CLOSING, request.fatalError = error2);
      }
      function renderSuspenseBoundary(request, task, props) {
        pushBuiltInComponentStackInDEV(task, "Suspense");
        var parentBoundary = task.blockedBoundary, parentSegment = task.blockedSegment, fallback = props.fallback, content = props.children, fallbackAbortSet = /* @__PURE__ */ new Set(), newBoundary = createSuspenseBoundary(request, fallbackAbortSet), insertionIndex = parentSegment.chunks.length, boundarySegment = createPendingSegment(
          request,
          insertionIndex,
          newBoundary,
          parentSegment.formatContext,
          // boundaries never require text embedding at their edges because comment nodes bound them
          !1,
          !1
        );
        parentSegment.children.push(boundarySegment), parentSegment.lastPushedText = !1;
        var contentRootSegment = createPendingSegment(
          request,
          0,
          null,
          parentSegment.formatContext,
          // boundaries never require text embedding at their edges because comment nodes bound them
          !1,
          !1
        );
        contentRootSegment.parentFlushed = !0, task.blockedBoundary = newBoundary, task.blockedSegment = contentRootSegment;
        try {
          if (renderNode(request, task, content), pushSegmentFinale$1(contentRootSegment.chunks, request.responseState, contentRootSegment.lastPushedText, contentRootSegment.textEmbedded), contentRootSegment.status = COMPLETED, queueCompletedSegment(newBoundary, contentRootSegment), newBoundary.pendingTasks === 0) {
            popComponentStackInDEV(task);
            return;
          }
        } catch (error2) {
          contentRootSegment.status = ERRORED, newBoundary.forceClientRender = !0, newBoundary.errorDigest = logRecoverableError(request, error2), captureBoundaryErrorDetailsDev(newBoundary, error2);
        } finally {
          task.blockedBoundary = parentBoundary, task.blockedSegment = parentSegment;
        }
        var suspendedFallbackTask = createTask(request, fallback, parentBoundary, boundarySegment, fallbackAbortSet, task.legacyContext, task.context, task.treeContext);
        suspendedFallbackTask.componentStack = task.componentStack, request.pingedTasks.push(suspendedFallbackTask), popComponentStackInDEV(task);
      }
      function renderHostElement(request, task, type, props) {
        pushBuiltInComponentStackInDEV(task, type);
        var segment = task.blockedSegment, children = pushStartInstance(segment.chunks, type, props, request.responseState, segment.formatContext);
        segment.lastPushedText = !1;
        var prevContext = segment.formatContext;
        segment.formatContext = getChildFormatContext(prevContext, type, props), renderNode(request, task, children), segment.formatContext = prevContext, pushEndInstance(segment.chunks, type), segment.lastPushedText = !1, popComponentStackInDEV(task);
      }
      function shouldConstruct$1(Component2) {
        return Component2.prototype && Component2.prototype.isReactComponent;
      }
      function renderWithHooks(request, task, Component2, props, secondArg) {
        var componentIdentity = {};
        prepareToUseHooks(task, componentIdentity);
        var result = Component2(props, secondArg);
        return finishHooks(Component2, props, result, secondArg);
      }
      function finishClassComponent(request, task, instance, Component2, props) {
        var nextChildren = instance.render();
        instance.props !== props && (didWarnAboutReassigningProps || error("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", getComponentNameFromType(Component2) || "a component"), didWarnAboutReassigningProps = !0);
        {
          var childContextTypes = Component2.childContextTypes;
          if (childContextTypes != null) {
            var previousContext = task.legacyContext, mergedContext = processChildContext(instance, Component2, previousContext, childContextTypes);
            task.legacyContext = mergedContext, renderNodeDestructive(request, task, nextChildren), task.legacyContext = previousContext;
            return;
          }
        }
        renderNodeDestructive(request, task, nextChildren);
      }
      function renderClassComponent(request, task, Component2, props) {
        pushClassComponentStackInDEV(task, Component2);
        var maskedContext = getMaskedContext(Component2, task.legacyContext), instance = constructClassInstance(Component2, props, maskedContext);
        mountClassInstance(instance, Component2, props, maskedContext), finishClassComponent(request, task, instance, Component2, props), popComponentStackInDEV(task);
      }
      var didWarnAboutBadClass = {}, didWarnAboutModulePatternComponent = {}, didWarnAboutContextTypeOnFunctionComponent = {}, didWarnAboutGetDerivedStateOnFunctionComponent = {}, didWarnAboutReassigningProps = !1, didWarnAboutGenerators = !1, didWarnAboutMaps = !1, hasWarnedAboutUsingContextAsConsumer = !1;
      function renderIndeterminateComponent(request, task, Component2, props) {
        var legacyContext;
        if (legacyContext = getMaskedContext(Component2, task.legacyContext), pushFunctionComponentStackInDEV(task, Component2), Component2.prototype && typeof Component2.prototype.render == "function") {
          var componentName = getComponentNameFromType(Component2) || "Unknown";
          didWarnAboutBadClass[componentName] || (error("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", componentName, componentName), didWarnAboutBadClass[componentName] = !0);
        }
        var value = renderWithHooks(request, task, Component2, props, legacyContext), hasId = checkDidRenderIdHook();
        if (typeof value == "object" && value !== null && typeof value.render == "function" && value.$$typeof === void 0) {
          var _componentName = getComponentNameFromType(Component2) || "Unknown";
          didWarnAboutModulePatternComponent[_componentName] || (error("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", _componentName, _componentName, _componentName), didWarnAboutModulePatternComponent[_componentName] = !0);
        }
        if (
          // Run these checks in production only if the flag is off.
          // Eventually we'll delete this branch altogether.
          typeof value == "object" && value !== null && typeof value.render == "function" && value.$$typeof === void 0
        ) {
          {
            var _componentName2 = getComponentNameFromType(Component2) || "Unknown";
            didWarnAboutModulePatternComponent[_componentName2] || (error("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", _componentName2, _componentName2, _componentName2), didWarnAboutModulePatternComponent[_componentName2] = !0);
          }
          mountClassInstance(value, Component2, props, legacyContext), finishClassComponent(request, task, value, Component2, props);
        } else if (validateFunctionComponentInDev(Component2), hasId) {
          var prevTreeContext = task.treeContext, totalChildren = 1, index = 0;
          task.treeContext = pushTreeContext(prevTreeContext, totalChildren, index);
          try {
            renderNodeDestructive(request, task, value);
          } finally {
            task.treeContext = prevTreeContext;
          }
        } else
          renderNodeDestructive(request, task, value);
        popComponentStackInDEV(task);
      }
      function validateFunctionComponentInDev(Component2) {
        {
          if (Component2 && Component2.childContextTypes && error("%s(...): childContextTypes cannot be defined on a function component.", Component2.displayName || Component2.name || "Component"), typeof Component2.getDerivedStateFromProps == "function") {
            var _componentName3 = getComponentNameFromType(Component2) || "Unknown";
            didWarnAboutGetDerivedStateOnFunctionComponent[_componentName3] || (error("%s: Function components do not support getDerivedStateFromProps.", _componentName3), didWarnAboutGetDerivedStateOnFunctionComponent[_componentName3] = !0);
          }
          if (typeof Component2.contextType == "object" && Component2.contextType !== null) {
            var _componentName4 = getComponentNameFromType(Component2) || "Unknown";
            didWarnAboutContextTypeOnFunctionComponent[_componentName4] || (error("%s: Function components do not support contextType.", _componentName4), didWarnAboutContextTypeOnFunctionComponent[_componentName4] = !0);
          }
        }
      }
      function resolveDefaultProps(Component2, baseProps) {
        if (Component2 && Component2.defaultProps) {
          var props = assign({}, baseProps), defaultProps = Component2.defaultProps;
          for (var propName in defaultProps)
            props[propName] === void 0 && (props[propName] = defaultProps[propName]);
          return props;
        }
        return baseProps;
      }
      function renderForwardRef(request, task, type, props, ref) {
        pushFunctionComponentStackInDEV(task, type.render);
        var children = renderWithHooks(request, task, type.render, props, ref), hasId = checkDidRenderIdHook();
        if (hasId) {
          var prevTreeContext = task.treeContext, totalChildren = 1, index = 0;
          task.treeContext = pushTreeContext(prevTreeContext, totalChildren, index);
          try {
            renderNodeDestructive(request, task, children);
          } finally {
            task.treeContext = prevTreeContext;
          }
        } else
          renderNodeDestructive(request, task, children);
        popComponentStackInDEV(task);
      }
      function renderMemo(request, task, type, props, ref) {
        var innerType = type.type, resolvedProps = resolveDefaultProps(innerType, props);
        renderElement(request, task, innerType, resolvedProps, ref);
      }
      function renderContextConsumer(request, task, context, props) {
        context._context === void 0 ? context !== context.Consumer && (hasWarnedAboutUsingContextAsConsumer || (hasWarnedAboutUsingContextAsConsumer = !0, error("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : context = context._context;
        var render = props.children;
        typeof render != "function" && error("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it.");
        var newValue = readContext(context), newChildren = render(newValue);
        renderNodeDestructive(request, task, newChildren);
      }
      function renderContextProvider(request, task, type, props) {
        var context = type._context, value = props.value, children = props.children, prevSnapshot;
        prevSnapshot = task.context, task.context = pushProvider(context, value), renderNodeDestructive(request, task, children), task.context = popProvider(context), prevSnapshot !== task.context && error("Popping the context provider did not return back to the original snapshot. This is a bug in React.");
      }
      function renderLazyComponent(request, task, lazyComponent, props, ref) {
        pushBuiltInComponentStackInDEV(task, "Lazy");
        var payload = lazyComponent._payload, init = lazyComponent._init, Component2 = init(payload), resolvedProps = resolveDefaultProps(Component2, props);
        renderElement(request, task, Component2, resolvedProps, ref), popComponentStackInDEV(task);
      }
      function renderElement(request, task, type, props, ref) {
        if (typeof type == "function")
          if (shouldConstruct$1(type)) {
            renderClassComponent(request, task, type, props);
            return;
          } else {
            renderIndeterminateComponent(request, task, type, props);
            return;
          }
        if (typeof type == "string") {
          renderHostElement(request, task, type, props);
          return;
        }
        switch (type) {
          case REACT_LEGACY_HIDDEN_TYPE:
          case REACT_DEBUG_TRACING_MODE_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_FRAGMENT_TYPE: {
            renderNodeDestructive(request, task, props.children);
            return;
          }
          case REACT_SUSPENSE_LIST_TYPE: {
            pushBuiltInComponentStackInDEV(task, "SuspenseList"), renderNodeDestructive(request, task, props.children), popComponentStackInDEV(task);
            return;
          }
          case REACT_SCOPE_TYPE:
            throw new Error("ReactDOMServer does not yet support scope components.");
          case REACT_SUSPENSE_TYPE: {
            renderSuspenseBoundary(request, task, props);
            return;
          }
        }
        if (typeof type == "object" && type !== null)
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE: {
              renderForwardRef(request, task, type, props, ref);
              return;
            }
            case REACT_MEMO_TYPE: {
              renderMemo(request, task, type, props, ref);
              return;
            }
            case REACT_PROVIDER_TYPE: {
              renderContextProvider(request, task, type, props);
              return;
            }
            case REACT_CONTEXT_TYPE: {
              renderContextConsumer(request, task, type, props);
              return;
            }
            case REACT_LAZY_TYPE: {
              renderLazyComponent(request, task, type, props);
              return;
            }
          }
        var info = "";
        throw (type === void 0 || typeof type == "object" && type !== null && Object.keys(type).length === 0) && (info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (type == null ? type : typeof type) + "." + info));
      }
      function validateIterable(iterable, iteratorFn) {
        typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
        iterable[Symbol.toStringTag] === "Generator" && (didWarnAboutGenerators || error("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), didWarnAboutGenerators = !0), iterable.entries === iteratorFn && (didWarnAboutMaps || error("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), didWarnAboutMaps = !0);
      }
      function renderNodeDestructive(request, task, node) {
        try {
          return renderNodeDestructiveImpl(request, task, node);
        } catch (x) {
          throw typeof x == "object" && x !== null && typeof x.then == "function" || (lastBoundaryErrorComponentStackDev = lastBoundaryErrorComponentStackDev !== null ? lastBoundaryErrorComponentStackDev : getCurrentStackInDEV()), x;
        }
      }
      function renderNodeDestructiveImpl(request, task, node) {
        if (task.node = node, typeof node == "object" && node !== null) {
          switch (node.$$typeof) {
            case REACT_ELEMENT_TYPE: {
              var element = node, type = element.type, props = element.props, ref = element.ref;
              renderElement(request, task, type, props, ref);
              return;
            }
            case REACT_PORTAL_TYPE:
              throw new Error("Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render.");
            case REACT_LAZY_TYPE: {
              var lazyNode = node, payload = lazyNode._payload, init = lazyNode._init, resolvedNode;
              try {
                resolvedNode = init(payload);
              } catch (x) {
                throw typeof x == "object" && x !== null && typeof x.then == "function" && pushBuiltInComponentStackInDEV(task, "Lazy"), x;
              }
              renderNodeDestructive(request, task, resolvedNode);
              return;
            }
          }
          if (isArray(node)) {
            renderChildrenArray(request, task, node);
            return;
          }
          var iteratorFn = getIteratorFn(node);
          if (iteratorFn) {
            validateIterable(node, iteratorFn);
            var iterator = iteratorFn.call(node);
            if (iterator) {
              var step = iterator.next();
              if (!step.done) {
                var children = [];
                do
                  children.push(step.value), step = iterator.next();
                while (!step.done);
                renderChildrenArray(request, task, children);
                return;
              }
              return;
            }
          }
          var childString = Object.prototype.toString.call(node);
          throw new Error("Objects are not valid as a React child (found: " + (childString === "[object Object]" ? "object with keys {" + Object.keys(node).join(", ") + "}" : childString) + "). If you meant to render a collection of children, use an array instead.");
        }
        if (typeof node == "string") {
          var segment = task.blockedSegment;
          segment.lastPushedText = pushTextInstance$1(task.blockedSegment.chunks, node, request.responseState, segment.lastPushedText);
          return;
        }
        if (typeof node == "number") {
          var _segment = task.blockedSegment;
          _segment.lastPushedText = pushTextInstance$1(task.blockedSegment.chunks, "" + node, request.responseState, _segment.lastPushedText);
          return;
        }
        typeof node == "function" && error("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
      }
      function renderChildrenArray(request, task, children) {
        for (var totalChildren = children.length, i = 0; i < totalChildren; i++) {
          var prevTreeContext = task.treeContext;
          task.treeContext = pushTreeContext(prevTreeContext, totalChildren, i);
          try {
            renderNode(request, task, children[i]);
          } finally {
            task.treeContext = prevTreeContext;
          }
        }
      }
      function spawnNewSuspendedTask(request, task, x) {
        var segment = task.blockedSegment, insertionIndex = segment.chunks.length, newSegment = createPendingSegment(
          request,
          insertionIndex,
          null,
          segment.formatContext,
          // Adopt the parent segment's leading text embed
          segment.lastPushedText,
          // Assume we are text embedded at the trailing edge
          !0
        );
        segment.children.push(newSegment), segment.lastPushedText = !1;
        var newTask = createTask(request, task.node, task.blockedBoundary, newSegment, task.abortSet, task.legacyContext, task.context, task.treeContext);
        task.componentStack !== null && (newTask.componentStack = task.componentStack.parent);
        var ping = newTask.ping;
        x.then(ping, ping);
      }
      function renderNode(request, task, node) {
        var previousFormatContext = task.blockedSegment.formatContext, previousLegacyContext = task.legacyContext, previousContext = task.context, previousComponentStack = null;
        previousComponentStack = task.componentStack;
        try {
          return renderNodeDestructive(request, task, node);
        } catch (x) {
          if (resetHooksState(), typeof x == "object" && x !== null && typeof x.then == "function") {
            spawnNewSuspendedTask(request, task, x), task.blockedSegment.formatContext = previousFormatContext, task.legacyContext = previousLegacyContext, task.context = previousContext, switchContext(previousContext), task.componentStack = previousComponentStack;
            return;
          } else
            throw task.blockedSegment.formatContext = previousFormatContext, task.legacyContext = previousLegacyContext, task.context = previousContext, switchContext(previousContext), task.componentStack = previousComponentStack, x;
        }
      }
      function erroredTask(request, boundary, segment, error2) {
        var errorDigest = logRecoverableError(request, error2);
        if (boundary === null ? fatalError(request, error2) : (boundary.pendingTasks--, boundary.forceClientRender || (boundary.forceClientRender = !0, boundary.errorDigest = errorDigest, captureBoundaryErrorDetailsDev(boundary, error2), boundary.parentFlushed && request.clientRenderedBoundaries.push(boundary))), request.allPendingTasks--, request.allPendingTasks === 0) {
          var onAllReady = request.onAllReady;
          onAllReady();
        }
      }
      function abortTaskSoft(task) {
        var request = this, boundary = task.blockedBoundary, segment = task.blockedSegment;
        segment.status = ABORTED, finishedTask(request, boundary, segment);
      }
      function abortTask(task, request, reason) {
        var boundary = task.blockedBoundary, segment = task.blockedSegment;
        if (segment.status = ABORTED, boundary === null)
          request.allPendingTasks--, request.status !== CLOSED && (request.status = CLOSED, request.destination !== null && close(request.destination));
        else {
          if (boundary.pendingTasks--, !boundary.forceClientRender) {
            boundary.forceClientRender = !0;
            var _error = reason === void 0 ? new Error("The render was aborted by the server without a reason.") : reason;
            boundary.errorDigest = request.onError(_error);
            {
              var errorPrefix = "The server did not finish this Suspense boundary: ";
              _error && typeof _error.message == "string" ? _error = errorPrefix + _error.message : _error = errorPrefix + String(_error);
              var previousTaskInDev = currentTaskInDEV;
              currentTaskInDEV = task;
              try {
                captureBoundaryErrorDetailsDev(boundary, _error);
              } finally {
                currentTaskInDEV = previousTaskInDev;
              }
            }
            boundary.parentFlushed && request.clientRenderedBoundaries.push(boundary);
          }
          if (boundary.fallbackAbortableTasks.forEach(function(fallbackTask) {
            return abortTask(fallbackTask, request, reason);
          }), boundary.fallbackAbortableTasks.clear(), request.allPendingTasks--, request.allPendingTasks === 0) {
            var onAllReady = request.onAllReady;
            onAllReady();
          }
        }
      }
      function queueCompletedSegment(boundary, segment) {
        if (segment.chunks.length === 0 && segment.children.length === 1 && segment.children[0].boundary === null) {
          var childSegment = segment.children[0];
          childSegment.id = segment.id, childSegment.parentFlushed = !0, childSegment.status === COMPLETED && queueCompletedSegment(boundary, childSegment);
        } else {
          var completedSegments = boundary.completedSegments;
          completedSegments.push(segment);
        }
      }
      function finishedTask(request, boundary, segment) {
        if (boundary === null) {
          if (segment.parentFlushed) {
            if (request.completedRootSegment !== null)
              throw new Error("There can only be one root segment. This is a bug in React.");
            request.completedRootSegment = segment;
          }
          if (request.pendingRootTasks--, request.pendingRootTasks === 0) {
            request.onShellError = noop$1;
            var onShellReady = request.onShellReady;
            onShellReady();
          }
        } else if (boundary.pendingTasks--, !boundary.forceClientRender) {
          if (boundary.pendingTasks === 0)
            segment.parentFlushed && segment.status === COMPLETED && queueCompletedSegment(boundary, segment), boundary.parentFlushed && request.completedBoundaries.push(boundary), boundary.fallbackAbortableTasks.forEach(abortTaskSoft, request), boundary.fallbackAbortableTasks.clear();
          else if (segment.parentFlushed && segment.status === COMPLETED) {
            queueCompletedSegment(boundary, segment);
            var completedSegments = boundary.completedSegments;
            completedSegments.length === 1 && boundary.parentFlushed && request.partialBoundaries.push(boundary);
          }
        }
        if (request.allPendingTasks--, request.allPendingTasks === 0) {
          var onAllReady = request.onAllReady;
          onAllReady();
        }
      }
      function retryTask(request, task) {
        var segment = task.blockedSegment;
        if (segment.status === PENDING) {
          switchContext(task.context);
          var prevTaskInDEV = null;
          prevTaskInDEV = currentTaskInDEV, currentTaskInDEV = task;
          try {
            renderNodeDestructive(request, task, task.node), pushSegmentFinale$1(segment.chunks, request.responseState, segment.lastPushedText, segment.textEmbedded), task.abortSet.delete(task), segment.status = COMPLETED, finishedTask(request, task.blockedBoundary, segment);
          } catch (x) {
            if (resetHooksState(), typeof x == "object" && x !== null && typeof x.then == "function") {
              var ping = task.ping;
              x.then(ping, ping);
            } else
              task.abortSet.delete(task), segment.status = ERRORED, erroredTask(request, task.blockedBoundary, segment, x);
          } finally {
            currentTaskInDEV = prevTaskInDEV;
          }
        }
      }
      function performWork(request) {
        if (request.status !== CLOSED) {
          var prevContext = getActiveContext(), prevDispatcher = ReactCurrentDispatcher$1.current;
          ReactCurrentDispatcher$1.current = Dispatcher;
          var prevGetCurrentStackImpl;
          prevGetCurrentStackImpl = ReactDebugCurrentFrame$1.getCurrentStack, ReactDebugCurrentFrame$1.getCurrentStack = getCurrentStackInDEV;
          var prevResponseState = currentResponseState;
          setCurrentResponseState(request.responseState);
          try {
            var pingedTasks = request.pingedTasks, i;
            for (i = 0; i < pingedTasks.length; i++) {
              var task = pingedTasks[i];
              retryTask(request, task);
            }
            pingedTasks.splice(0, i), request.destination !== null && flushCompletedQueues(request, request.destination);
          } catch (error2) {
            logRecoverableError(request, error2), fatalError(request, error2);
          } finally {
            setCurrentResponseState(prevResponseState), ReactCurrentDispatcher$1.current = prevDispatcher, ReactDebugCurrentFrame$1.getCurrentStack = prevGetCurrentStackImpl, prevDispatcher === Dispatcher && switchContext(prevContext);
          }
        }
      }
      function flushSubtree(request, destination, segment) {
        switch (segment.parentFlushed = !0, segment.status) {
          case PENDING: {
            var segmentID = segment.id = request.nextSegmentId++;
            return segment.lastPushedText = !1, segment.textEmbedded = !1, writePlaceholder(destination, request.responseState, segmentID);
          }
          case COMPLETED: {
            segment.status = FLUSHED;
            for (var r = !0, chunks = segment.chunks, chunkIdx = 0, children = segment.children, childIdx = 0; childIdx < children.length; childIdx++) {
              for (var nextChild = children[childIdx]; chunkIdx < nextChild.index; chunkIdx++)
                writeChunk(destination, chunks[chunkIdx]);
              r = flushSegment(request, destination, nextChild);
            }
            for (; chunkIdx < chunks.length - 1; chunkIdx++)
              writeChunk(destination, chunks[chunkIdx]);
            return chunkIdx < chunks.length && (r = writeChunkAndReturn(destination, chunks[chunkIdx])), r;
          }
          default:
            throw new Error("Aborted, errored or already flushed boundaries should not be flushed again. This is a bug in React.");
        }
      }
      function flushSegment(request, destination, segment) {
        var boundary = segment.boundary;
        if (boundary === null)
          return flushSubtree(request, destination, segment);
        if (boundary.parentFlushed = !0, boundary.forceClientRender)
          return writeStartClientRenderedSuspenseBoundary$1(destination, request.responseState, boundary.errorDigest, boundary.errorMessage, boundary.errorComponentStack), flushSubtree(request, destination, segment), writeEndClientRenderedSuspenseBoundary$1(destination, request.responseState);
        if (boundary.pendingTasks > 0) {
          boundary.rootSegmentID = request.nextSegmentId++, boundary.completedSegments.length > 0 && request.partialBoundaries.push(boundary);
          var id = boundary.id = assignSuspenseBoundaryID(request.responseState);
          return writeStartPendingSuspenseBoundary(destination, request.responseState, id), flushSubtree(request, destination, segment), writeEndPendingSuspenseBoundary(destination, request.responseState);
        } else {
          if (boundary.byteSize > request.progressiveChunkSize)
            return boundary.rootSegmentID = request.nextSegmentId++, request.completedBoundaries.push(boundary), writeStartPendingSuspenseBoundary(destination, request.responseState, boundary.id), flushSubtree(request, destination, segment), writeEndPendingSuspenseBoundary(destination, request.responseState);
          writeStartCompletedSuspenseBoundary$1(destination, request.responseState);
          var completedSegments = boundary.completedSegments;
          if (completedSegments.length !== 1)
            throw new Error("A previously unvisited boundary must have exactly one root segment. This is a bug in React.");
          var contentSegment = completedSegments[0];
          return flushSegment(request, destination, contentSegment), writeEndCompletedSuspenseBoundary$1(destination, request.responseState);
        }
      }
      function flushClientRenderedBoundary(request, destination, boundary) {
        return writeClientRenderBoundaryInstruction(destination, request.responseState, boundary.id, boundary.errorDigest, boundary.errorMessage, boundary.errorComponentStack);
      }
      function flushSegmentContainer(request, destination, segment) {
        return writeStartSegment(destination, request.responseState, segment.formatContext, segment.id), flushSegment(request, destination, segment), writeEndSegment(destination, segment.formatContext);
      }
      function flushCompletedBoundary(request, destination, boundary) {
        for (var completedSegments = boundary.completedSegments, i = 0; i < completedSegments.length; i++) {
          var segment = completedSegments[i];
          flushPartiallyCompletedSegment(request, destination, boundary, segment);
        }
        return completedSegments.length = 0, writeCompletedBoundaryInstruction(destination, request.responseState, boundary.id, boundary.rootSegmentID);
      }
      function flushPartialBoundary(request, destination, boundary) {
        for (var completedSegments = boundary.completedSegments, i = 0; i < completedSegments.length; i++) {
          var segment = completedSegments[i];
          if (!flushPartiallyCompletedSegment(request, destination, boundary, segment))
            return i++, completedSegments.splice(0, i), !1;
        }
        return completedSegments.splice(0, i), !0;
      }
      function flushPartiallyCompletedSegment(request, destination, boundary, segment) {
        if (segment.status === FLUSHED)
          return !0;
        var segmentID = segment.id;
        if (segmentID === -1) {
          var rootSegmentID = segment.id = boundary.rootSegmentID;
          if (rootSegmentID === -1)
            throw new Error("A root segment ID must have been assigned by now. This is a bug in React.");
          return flushSegmentContainer(request, destination, segment);
        } else
          return flushSegmentContainer(request, destination, segment), writeCompletedSegmentInstruction(destination, request.responseState, segmentID);
      }
      function flushCompletedQueues(request, destination) {
        try {
          var completedRootSegment = request.completedRootSegment;
          completedRootSegment !== null && request.pendingRootTasks === 0 && (flushSegment(request, destination, completedRootSegment), request.completedRootSegment = null, writeCompletedRoot(destination, request.responseState));
          var clientRenderedBoundaries = request.clientRenderedBoundaries, i;
          for (i = 0; i < clientRenderedBoundaries.length; i++) {
            var boundary = clientRenderedBoundaries[i];
            if (!flushClientRenderedBoundary(request, destination, boundary)) {
              request.destination = null, i++, clientRenderedBoundaries.splice(0, i);
              return;
            }
          }
          clientRenderedBoundaries.splice(0, i);
          var completedBoundaries = request.completedBoundaries;
          for (i = 0; i < completedBoundaries.length; i++) {
            var _boundary = completedBoundaries[i];
            if (!flushCompletedBoundary(request, destination, _boundary)) {
              request.destination = null, i++, completedBoundaries.splice(0, i);
              return;
            }
          }
          completedBoundaries.splice(0, i);
          var partialBoundaries = request.partialBoundaries;
          for (i = 0; i < partialBoundaries.length; i++) {
            var _boundary2 = partialBoundaries[i];
            if (!flushPartialBoundary(request, destination, _boundary2)) {
              request.destination = null, i++, partialBoundaries.splice(0, i);
              return;
            }
          }
          partialBoundaries.splice(0, i);
          var largeBoundaries = request.completedBoundaries;
          for (i = 0; i < largeBoundaries.length; i++) {
            var _boundary3 = largeBoundaries[i];
            if (!flushCompletedBoundary(request, destination, _boundary3)) {
              request.destination = null, i++, largeBoundaries.splice(0, i);
              return;
            }
          }
          largeBoundaries.splice(0, i);
        } finally {
          request.allPendingTasks === 0 && request.pingedTasks.length === 0 && request.clientRenderedBoundaries.length === 0 && request.completedBoundaries.length === 0 && (request.abortableTasks.size !== 0 && error("There was still abortable task at the root when we closed. This is a bug in React."), close(destination));
        }
      }
      function startWork(request) {
        scheduleWork(function() {
          return performWork(request);
        });
      }
      function startFlowing(request, destination) {
        if (request.status === CLOSING) {
          request.status = CLOSED, closeWithError(destination, request.fatalError);
          return;
        }
        if (request.status !== CLOSED && request.destination === null) {
          request.destination = destination;
          try {
            flushCompletedQueues(request, destination);
          } catch (error2) {
            logRecoverableError(request, error2), fatalError(request, error2);
          }
        }
      }
      function abort(request, reason) {
        try {
          var abortableTasks = request.abortableTasks;
          abortableTasks.forEach(function(task) {
            return abortTask(task, request, reason);
          }), abortableTasks.clear(), request.destination !== null && flushCompletedQueues(request, request.destination);
        } catch (error2) {
          logRecoverableError(request, error2), fatalError(request, error2);
        }
      }
      function onError() {
      }
      function renderToStringImpl(children, options, generateStaticMarkup, abortReason) {
        var didFatal = !1, fatalError2 = null, result = "", destination = {
          push: function(chunk) {
            return chunk !== null && (result += chunk), !0;
          },
          destroy: function(error2) {
            didFatal = !0, fatalError2 = error2;
          }
        }, readyToStream = !1;
        function onShellReady() {
          readyToStream = !0;
        }
        var request = createRequest(children, createResponseState$1(generateStaticMarkup, options ? options.identifierPrefix : void 0), createRootFormatContext(), 1 / 0, onError, void 0, onShellReady, void 0, void 0);
        if (startWork(request), abort(request, abortReason), startFlowing(request, destination), didFatal)
          throw fatalError2;
        if (!readyToStream)
          throw new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
        return result;
      }
      function renderToString(children, options) {
        return renderToStringImpl(children, options, !1, 'The server used "renderToString" which does not support Suspense. If you intended for this Suspense boundary to render the fallback content on the server consider throwing an Error somewhere within the Suspense boundary. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server');
      }
      function renderToStaticMarkup(children, options) {
        return renderToStringImpl(children, options, !0, 'The server used "renderToStaticMarkup" which does not support Suspense. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server');
      }
      function renderToNodeStream() {
        throw new Error("ReactDOMServer.renderToNodeStream(): The streaming API is not available in the browser. Use ReactDOMServer.renderToString() instead.");
      }
      function renderToStaticNodeStream() {
        throw new Error("ReactDOMServer.renderToStaticNodeStream(): The streaming API is not available in the browser. Use ReactDOMServer.renderToStaticMarkup() instead.");
      }
      exports.renderToNodeStream = renderToNodeStream, exports.renderToStaticMarkup = renderToStaticMarkup, exports.renderToStaticNodeStream = renderToStaticNodeStream, exports.renderToString = renderToString, exports.version = ReactVersion;
    })();
  }
});

// node_modules/react-dom/cjs/react-dom-server.browser.development.js
var require_react_dom_server_browser_development = __commonJS({
  "node_modules/react-dom/cjs/react-dom-server.browser.development.js"(exports) {
    "use strict";
    (function() {
      "use strict";
      var React7 = require_react(), ReactVersion = "18.2.0", ReactSharedInternals = React7.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function warn(format) {
        {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++)
            args[_key - 1] = arguments[_key];
          printWarning("warn", format, args);
        }
      }
      function error(format) {
        {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++)
            args[_key2 - 1] = arguments[_key2];
          printWarning("error", format, args);
        }
      }
      function printWarning(level, format, args) {
        {
          var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame, stack = ReactDebugCurrentFrame2.getStackAddendum();
          stack !== "" && (format += "%s", args = args.concat([stack]));
          var argsWithFormat = args.map(function(item) {
            return String(item);
          });
          argsWithFormat.unshift("Warning: " + format), Function.prototype.apply.call(console[level], console, argsWithFormat);
        }
      }
      function scheduleWork(callback) {
        callback();
      }
      var VIEW_SIZE = 512, currentView = null, writtenBytes = 0;
      function beginWriting(destination) {
        currentView = new Uint8Array(VIEW_SIZE), writtenBytes = 0;
      }
      function writeChunk(destination, chunk) {
        if (chunk.length !== 0) {
          if (chunk.length > VIEW_SIZE) {
            writtenBytes > 0 && (destination.enqueue(new Uint8Array(currentView.buffer, 0, writtenBytes)), currentView = new Uint8Array(VIEW_SIZE), writtenBytes = 0), destination.enqueue(chunk);
            return;
          }
          var bytesToWrite = chunk, allowableBytes = currentView.length - writtenBytes;
          allowableBytes < bytesToWrite.length && (allowableBytes === 0 ? destination.enqueue(currentView) : (currentView.set(bytesToWrite.subarray(0, allowableBytes), writtenBytes), destination.enqueue(currentView), bytesToWrite = bytesToWrite.subarray(allowableBytes)), currentView = new Uint8Array(VIEW_SIZE), writtenBytes = 0), currentView.set(bytesToWrite, writtenBytes), writtenBytes += bytesToWrite.length;
        }
      }
      function writeChunkAndReturn(destination, chunk) {
        return writeChunk(destination, chunk), !0;
      }
      function completeWriting(destination) {
        currentView && writtenBytes > 0 && (destination.enqueue(new Uint8Array(currentView.buffer, 0, writtenBytes)), currentView = null, writtenBytes = 0);
      }
      function close(destination) {
        destination.close();
      }
      var textEncoder = new TextEncoder();
      function stringToChunk(content) {
        return textEncoder.encode(content);
      }
      function stringToPrecomputedChunk(content) {
        return textEncoder.encode(content);
      }
      function closeWithError(destination, error2) {
        typeof destination.error == "function" ? destination.error(error2) : destination.close();
      }
      function typeName(value) {
        {
          var hasToStringTag = typeof Symbol == "function" && Symbol.toStringTag, type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          return type;
        }
      }
      function willCoercionThrow(value) {
        try {
          return testStringCoercion(value), !1;
        } catch {
          return !0;
        }
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkAttributeStringCoercion(value, attributeName) {
        if (willCoercionThrow(value))
          return error("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", attributeName, typeName(value)), testStringCoercion(value);
      }
      function checkCSSPropertyStringCoercion(value, propName) {
        if (willCoercionThrow(value))
          return error("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", propName, typeName(value)), testStringCoercion(value);
      }
      function checkHtmlStringCoercion(value) {
        if (willCoercionThrow(value))
          return error("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value)), testStringCoercion(value);
      }
      var hasOwnProperty = Object.prototype.hasOwnProperty, RESERVED = 0, STRING = 1, BOOLEANISH_STRING = 2, BOOLEAN = 3, OVERLOADED_BOOLEAN = 4, NUMERIC = 5, POSITIVE_NUMERIC = 6, ATTRIBUTE_NAME_START_CHAR = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", VALID_ATTRIBUTE_NAME_REGEX = new RegExp("^[" + ATTRIBUTE_NAME_START_CHAR + "][" + ATTRIBUTE_NAME_CHAR + "]*$"), illegalAttributeNameCache = {}, validatedAttributeNameCache = {};
      function isAttributeNameSafe(attributeName) {
        return hasOwnProperty.call(validatedAttributeNameCache, attributeName) ? !0 : hasOwnProperty.call(illegalAttributeNameCache, attributeName) ? !1 : VALID_ATTRIBUTE_NAME_REGEX.test(attributeName) ? (validatedAttributeNameCache[attributeName] = !0, !0) : (illegalAttributeNameCache[attributeName] = !0, error("Invalid attribute name: `%s`", attributeName), !1);
      }
      function shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag) {
        if (propertyInfo !== null && propertyInfo.type === RESERVED)
          return !1;
        switch (typeof value) {
          case "function":
          case "symbol":
            return !0;
          case "boolean": {
            if (isCustomComponentTag)
              return !1;
            if (propertyInfo !== null)
              return !propertyInfo.acceptsBooleans;
            var prefix2 = name.toLowerCase().slice(0, 5);
            return prefix2 !== "data-" && prefix2 !== "aria-";
          }
          default:
            return !1;
        }
      }
      function getPropertyInfo(name) {
        return properties.hasOwnProperty(name) ? properties[name] : null;
      }
      function PropertyInfoRecord(name, type, mustUseProperty, attributeName, attributeNamespace, sanitizeURL2, removeEmptyString) {
        this.acceptsBooleans = type === BOOLEANISH_STRING || type === BOOLEAN || type === OVERLOADED_BOOLEAN, this.attributeName = attributeName, this.attributeNamespace = attributeNamespace, this.mustUseProperty = mustUseProperty, this.propertyName = name, this.type = type, this.sanitizeURL = sanitizeURL2, this.removeEmptyString = removeEmptyString;
      }
      var properties = {}, reservedProps = [
        "children",
        "dangerouslySetInnerHTML",
        // TODO: This prevents the assignment of defaultValue to regular
        // elements (not just inputs). Now that ReactDOMInput assigns to the
        // defaultValue property -- do we need this?
        "defaultValue",
        "defaultChecked",
        "innerHTML",
        "suppressContentEditableWarning",
        "suppressHydrationWarning",
        "style"
      ];
      reservedProps.forEach(function(name) {
        properties[name] = new PropertyInfoRecord(
          name,
          RESERVED,
          !1,
          // mustUseProperty
          name,
          // attributeName
          null,
          // attributeNamespace
          !1,
          // sanitizeURL
          !1
        );
      }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(_ref) {
        var name = _ref[0], attributeName = _ref[1];
        properties[name] = new PropertyInfoRecord(
          name,
          STRING,
          !1,
          // mustUseProperty
          attributeName,
          // attributeName
          null,
          // attributeNamespace
          !1,
          // sanitizeURL
          !1
        );
      }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(name) {
        properties[name] = new PropertyInfoRecord(
          name,
          BOOLEANISH_STRING,
          !1,
          // mustUseProperty
          name.toLowerCase(),
          // attributeName
          null,
          // attributeNamespace
          !1,
          // sanitizeURL
          !1
        );
      }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(name) {
        properties[name] = new PropertyInfoRecord(
          name,
          BOOLEANISH_STRING,
          !1,
          // mustUseProperty
          name,
          // attributeName
          null,
          // attributeNamespace
          !1,
          // sanitizeURL
          !1
        );
      }), [
        "allowFullScreen",
        "async",
        // Note: there is a special case that prevents it from being written to the DOM
        // on the client side because the browsers are inconsistent. Instead we call focus().
        "autoFocus",
        "autoPlay",
        "controls",
        "default",
        "defer",
        "disabled",
        "disablePictureInPicture",
        "disableRemotePlayback",
        "formNoValidate",
        "hidden",
        "loop",
        "noModule",
        "noValidate",
        "open",
        "playsInline",
        "readOnly",
        "required",
        "reversed",
        "scoped",
        "seamless",
        // Microdata
        "itemScope"
      ].forEach(function(name) {
        properties[name] = new PropertyInfoRecord(
          name,
          BOOLEAN,
          !1,
          // mustUseProperty
          name.toLowerCase(),
          // attributeName
          null,
          // attributeNamespace
          !1,
          // sanitizeURL
          !1
        );
      }), [
        "checked",
        // Note: `option.selected` is not updated if `select.multiple` is
        // disabled with `removeAttribute`. We have special logic for handling this.
        "multiple",
        "muted",
        "selected"
        // NOTE: if you add a camelCased prop to this list,
        // you'll need to set attributeName to name.toLowerCase()
        // instead in the assignment below.
      ].forEach(function(name) {
        properties[name] = new PropertyInfoRecord(
          name,
          BOOLEAN,
          !0,
          // mustUseProperty
          name,
          // attributeName
          null,
          // attributeNamespace
          !1,
          // sanitizeURL
          !1
        );
      }), [
        "capture",
        "download"
        // NOTE: if you add a camelCased prop to this list,
        // you'll need to set attributeName to name.toLowerCase()
        // instead in the assignment below.
      ].forEach(function(name) {
        properties[name] = new PropertyInfoRecord(
          name,
          OVERLOADED_BOOLEAN,
          !1,
          // mustUseProperty
          name,
          // attributeName
          null,
          // attributeNamespace
          !1,
          // sanitizeURL
          !1
        );
      }), [
        "cols",
        "rows",
        "size",
        "span"
        // NOTE: if you add a camelCased prop to this list,
        // you'll need to set attributeName to name.toLowerCase()
        // instead in the assignment below.
      ].forEach(function(name) {
        properties[name] = new PropertyInfoRecord(
          name,
          POSITIVE_NUMERIC,
          !1,
          // mustUseProperty
          name,
          // attributeName
          null,
          // attributeNamespace
          !1,
          // sanitizeURL
          !1
        );
      }), ["rowSpan", "start"].forEach(function(name) {
        properties[name] = new PropertyInfoRecord(
          name,
          NUMERIC,
          !1,
          // mustUseProperty
          name.toLowerCase(),
          // attributeName
          null,
          // attributeNamespace
          !1,
          // sanitizeURL
          !1
        );
      });
      var CAMELIZE = /[\-\:]([a-z])/g, capitalize = function(token) {
        return token[1].toUpperCase();
      };
      [
        "accent-height",
        "alignment-baseline",
        "arabic-form",
        "baseline-shift",
        "cap-height",
        "clip-path",
        "clip-rule",
        "color-interpolation",
        "color-interpolation-filters",
        "color-profile",
        "color-rendering",
        "dominant-baseline",
        "enable-background",
        "fill-opacity",
        "fill-rule",
        "flood-color",
        "flood-opacity",
        "font-family",
        "font-size",
        "font-size-adjust",
        "font-stretch",
        "font-style",
        "font-variant",
        "font-weight",
        "glyph-name",
        "glyph-orientation-horizontal",
        "glyph-orientation-vertical",
        "horiz-adv-x",
        "horiz-origin-x",
        "image-rendering",
        "letter-spacing",
        "lighting-color",
        "marker-end",
        "marker-mid",
        "marker-start",
        "overline-position",
        "overline-thickness",
        "paint-order",
        "panose-1",
        "pointer-events",
        "rendering-intent",
        "shape-rendering",
        "stop-color",
        "stop-opacity",
        "strikethrough-position",
        "strikethrough-thickness",
        "stroke-dasharray",
        "stroke-dashoffset",
        "stroke-linecap",
        "stroke-linejoin",
        "stroke-miterlimit",
        "stroke-opacity",
        "stroke-width",
        "text-anchor",
        "text-decoration",
        "text-rendering",
        "underline-position",
        "underline-thickness",
        "unicode-bidi",
        "unicode-range",
        "units-per-em",
        "v-alphabetic",
        "v-hanging",
        "v-ideographic",
        "v-mathematical",
        "vector-effect",
        "vert-adv-y",
        "vert-origin-x",
        "vert-origin-y",
        "word-spacing",
        "writing-mode",
        "xmlns:xlink",
        "x-height"
        // NOTE: if you add a camelCased prop to this list,
        // you'll need to set attributeName to name.toLowerCase()
        // instead in the assignment below.
      ].forEach(function(attributeName) {
        var name = attributeName.replace(CAMELIZE, capitalize);
        properties[name] = new PropertyInfoRecord(
          name,
          STRING,
          !1,
          // mustUseProperty
          attributeName,
          null,
          // attributeNamespace
          !1,
          // sanitizeURL
          !1
        );
      }), [
        "xlink:actuate",
        "xlink:arcrole",
        "xlink:role",
        "xlink:show",
        "xlink:title",
        "xlink:type"
        // NOTE: if you add a camelCased prop to this list,
        // you'll need to set attributeName to name.toLowerCase()
        // instead in the assignment below.
      ].forEach(function(attributeName) {
        var name = attributeName.replace(CAMELIZE, capitalize);
        properties[name] = new PropertyInfoRecord(
          name,
          STRING,
          !1,
          // mustUseProperty
          attributeName,
          "http://www.w3.org/1999/xlink",
          !1,
          // sanitizeURL
          !1
        );
      }), [
        "xml:base",
        "xml:lang",
        "xml:space"
        // NOTE: if you add a camelCased prop to this list,
        // you'll need to set attributeName to name.toLowerCase()
        // instead in the assignment below.
      ].forEach(function(attributeName) {
        var name = attributeName.replace(CAMELIZE, capitalize);
        properties[name] = new PropertyInfoRecord(
          name,
          STRING,
          !1,
          // mustUseProperty
          attributeName,
          "http://www.w3.org/XML/1998/namespace",
          !1,
          // sanitizeURL
          !1
        );
      }), ["tabIndex", "crossOrigin"].forEach(function(attributeName) {
        properties[attributeName] = new PropertyInfoRecord(
          attributeName,
          STRING,
          !1,
          // mustUseProperty
          attributeName.toLowerCase(),
          // attributeName
          null,
          // attributeNamespace
          !1,
          // sanitizeURL
          !1
        );
      });
      var xlinkHref = "xlinkHref";
      properties[xlinkHref] = new PropertyInfoRecord(
        "xlinkHref",
        STRING,
        !1,
        // mustUseProperty
        "xlink:href",
        "http://www.w3.org/1999/xlink",
        !0,
        // sanitizeURL
        !1
      ), ["src", "href", "action", "formAction"].forEach(function(attributeName) {
        properties[attributeName] = new PropertyInfoRecord(
          attributeName,
          STRING,
          !1,
          // mustUseProperty
          attributeName.toLowerCase(),
          // attributeName
          null,
          // attributeNamespace
          !0,
          // sanitizeURL
          !0
        );
      });
      var isUnitlessNumber = {
        animationIterationCount: !0,
        aspectRatio: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridArea: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        // SVG-related properties
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0
      };
      function prefixKey(prefix2, key) {
        return prefix2 + key.charAt(0).toUpperCase() + key.substring(1);
      }
      var prefixes = ["Webkit", "ms", "Moz", "O"];
      Object.keys(isUnitlessNumber).forEach(function(prop) {
        prefixes.forEach(function(prefix2) {
          isUnitlessNumber[prefixKey(prefix2, prop)] = isUnitlessNumber[prop];
        });
      });
      var hasReadOnlyValue = {
        button: !0,
        checkbox: !0,
        image: !0,
        hidden: !0,
        radio: !0,
        reset: !0,
        submit: !0
      };
      function checkControlledValueProps(tagName, props) {
        hasReadOnlyValue[props.type] || props.onChange || props.onInput || props.readOnly || props.disabled || props.value == null || error("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), props.onChange || props.readOnly || props.disabled || props.checked == null || error("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
      }
      function isCustomComponent(tagName, props) {
        if (tagName.indexOf("-") === -1)
          return typeof props.is == "string";
        switch (tagName) {
          case "annotation-xml":
          case "color-profile":
          case "font-face":
          case "font-face-src":
          case "font-face-uri":
          case "font-face-format":
          case "font-face-name":
          case "missing-glyph":
            return !1;
          default:
            return !0;
        }
      }
      var ariaProperties = {
        "aria-current": 0,
        // state
        "aria-description": 0,
        "aria-details": 0,
        "aria-disabled": 0,
        // state
        "aria-hidden": 0,
        // state
        "aria-invalid": 0,
        // state
        "aria-keyshortcuts": 0,
        "aria-label": 0,
        "aria-roledescription": 0,
        // Widget Attributes
        "aria-autocomplete": 0,
        "aria-checked": 0,
        "aria-expanded": 0,
        "aria-haspopup": 0,
        "aria-level": 0,
        "aria-modal": 0,
        "aria-multiline": 0,
        "aria-multiselectable": 0,
        "aria-orientation": 0,
        "aria-placeholder": 0,
        "aria-pressed": 0,
        "aria-readonly": 0,
        "aria-required": 0,
        "aria-selected": 0,
        "aria-sort": 0,
        "aria-valuemax": 0,
        "aria-valuemin": 0,
        "aria-valuenow": 0,
        "aria-valuetext": 0,
        // Live Region Attributes
        "aria-atomic": 0,
        "aria-busy": 0,
        "aria-live": 0,
        "aria-relevant": 0,
        // Drag-and-Drop Attributes
        "aria-dropeffect": 0,
        "aria-grabbed": 0,
        // Relationship Attributes
        "aria-activedescendant": 0,
        "aria-colcount": 0,
        "aria-colindex": 0,
        "aria-colspan": 0,
        "aria-controls": 0,
        "aria-describedby": 0,
        "aria-errormessage": 0,
        "aria-flowto": 0,
        "aria-labelledby": 0,
        "aria-owns": 0,
        "aria-posinset": 0,
        "aria-rowcount": 0,
        "aria-rowindex": 0,
        "aria-rowspan": 0,
        "aria-setsize": 0
      }, warnedProperties = {}, rARIA = new RegExp("^(aria)-[" + ATTRIBUTE_NAME_CHAR + "]*$"), rARIACamel = new RegExp("^(aria)[A-Z][" + ATTRIBUTE_NAME_CHAR + "]*$");
      function validateProperty(tagName, name) {
        {
          if (hasOwnProperty.call(warnedProperties, name) && warnedProperties[name])
            return !0;
          if (rARIACamel.test(name)) {
            var ariaName = "aria-" + name.slice(4).toLowerCase(), correctName = ariaProperties.hasOwnProperty(ariaName) ? ariaName : null;
            if (correctName == null)
              return error("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", name), warnedProperties[name] = !0, !0;
            if (name !== correctName)
              return error("Invalid ARIA attribute `%s`. Did you mean `%s`?", name, correctName), warnedProperties[name] = !0, !0;
          }
          if (rARIA.test(name)) {
            var lowerCasedName = name.toLowerCase(), standardName = ariaProperties.hasOwnProperty(lowerCasedName) ? lowerCasedName : null;
            if (standardName == null)
              return warnedProperties[name] = !0, !1;
            if (name !== standardName)
              return error("Unknown ARIA attribute `%s`. Did you mean `%s`?", name, standardName), warnedProperties[name] = !0, !0;
          }
        }
        return !0;
      }
      function warnInvalidARIAProps(type, props) {
        {
          var invalidProps = [];
          for (var key in props) {
            var isValid = validateProperty(type, key);
            isValid || invalidProps.push(key);
          }
          var unknownPropString = invalidProps.map(function(prop) {
            return "`" + prop + "`";
          }).join(", ");
          invalidProps.length === 1 ? error("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", unknownPropString, type) : invalidProps.length > 1 && error("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", unknownPropString, type);
        }
      }
      function validateProperties(type, props) {
        isCustomComponent(type, props) || warnInvalidARIAProps(type, props);
      }
      var didWarnValueNull = !1;
      function validateProperties$1(type, props) {
        {
          if (type !== "input" && type !== "textarea" && type !== "select")
            return;
          props != null && props.value === null && !didWarnValueNull && (didWarnValueNull = !0, type === "select" && props.multiple ? error("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", type) : error("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", type));
        }
      }
      var possibleStandardNames = {
        // HTML
        accept: "accept",
        acceptcharset: "acceptCharset",
        "accept-charset": "acceptCharset",
        accesskey: "accessKey",
        action: "action",
        allowfullscreen: "allowFullScreen",
        alt: "alt",
        as: "as",
        async: "async",
        autocapitalize: "autoCapitalize",
        autocomplete: "autoComplete",
        autocorrect: "autoCorrect",
        autofocus: "autoFocus",
        autoplay: "autoPlay",
        autosave: "autoSave",
        capture: "capture",
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        challenge: "challenge",
        charset: "charSet",
        checked: "checked",
        children: "children",
        cite: "cite",
        class: "className",
        classid: "classID",
        classname: "className",
        cols: "cols",
        colspan: "colSpan",
        content: "content",
        contenteditable: "contentEditable",
        contextmenu: "contextMenu",
        controls: "controls",
        controlslist: "controlsList",
        coords: "coords",
        crossorigin: "crossOrigin",
        dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
        data: "data",
        datetime: "dateTime",
        default: "default",
        defaultchecked: "defaultChecked",
        defaultvalue: "defaultValue",
        defer: "defer",
        dir: "dir",
        disabled: "disabled",
        disablepictureinpicture: "disablePictureInPicture",
        disableremoteplayback: "disableRemotePlayback",
        download: "download",
        draggable: "draggable",
        enctype: "encType",
        enterkeyhint: "enterKeyHint",
        for: "htmlFor",
        form: "form",
        formmethod: "formMethod",
        formaction: "formAction",
        formenctype: "formEncType",
        formnovalidate: "formNoValidate",
        formtarget: "formTarget",
        frameborder: "frameBorder",
        headers: "headers",
        height: "height",
        hidden: "hidden",
        high: "high",
        href: "href",
        hreflang: "hrefLang",
        htmlfor: "htmlFor",
        httpequiv: "httpEquiv",
        "http-equiv": "httpEquiv",
        icon: "icon",
        id: "id",
        imagesizes: "imageSizes",
        imagesrcset: "imageSrcSet",
        innerhtml: "innerHTML",
        inputmode: "inputMode",
        integrity: "integrity",
        is: "is",
        itemid: "itemID",
        itemprop: "itemProp",
        itemref: "itemRef",
        itemscope: "itemScope",
        itemtype: "itemType",
        keyparams: "keyParams",
        keytype: "keyType",
        kind: "kind",
        label: "label",
        lang: "lang",
        list: "list",
        loop: "loop",
        low: "low",
        manifest: "manifest",
        marginwidth: "marginWidth",
        marginheight: "marginHeight",
        max: "max",
        maxlength: "maxLength",
        media: "media",
        mediagroup: "mediaGroup",
        method: "method",
        min: "min",
        minlength: "minLength",
        multiple: "multiple",
        muted: "muted",
        name: "name",
        nomodule: "noModule",
        nonce: "nonce",
        novalidate: "noValidate",
        open: "open",
        optimum: "optimum",
        pattern: "pattern",
        placeholder: "placeholder",
        playsinline: "playsInline",
        poster: "poster",
        preload: "preload",
        profile: "profile",
        radiogroup: "radioGroup",
        readonly: "readOnly",
        referrerpolicy: "referrerPolicy",
        rel: "rel",
        required: "required",
        reversed: "reversed",
        role: "role",
        rows: "rows",
        rowspan: "rowSpan",
        sandbox: "sandbox",
        scope: "scope",
        scoped: "scoped",
        scrolling: "scrolling",
        seamless: "seamless",
        selected: "selected",
        shape: "shape",
        size: "size",
        sizes: "sizes",
        span: "span",
        spellcheck: "spellCheck",
        src: "src",
        srcdoc: "srcDoc",
        srclang: "srcLang",
        srcset: "srcSet",
        start: "start",
        step: "step",
        style: "style",
        summary: "summary",
        tabindex: "tabIndex",
        target: "target",
        title: "title",
        type: "type",
        usemap: "useMap",
        value: "value",
        width: "width",
        wmode: "wmode",
        wrap: "wrap",
        // SVG
        about: "about",
        accentheight: "accentHeight",
        "accent-height": "accentHeight",
        accumulate: "accumulate",
        additive: "additive",
        alignmentbaseline: "alignmentBaseline",
        "alignment-baseline": "alignmentBaseline",
        allowreorder: "allowReorder",
        alphabetic: "alphabetic",
        amplitude: "amplitude",
        arabicform: "arabicForm",
        "arabic-form": "arabicForm",
        ascent: "ascent",
        attributename: "attributeName",
        attributetype: "attributeType",
        autoreverse: "autoReverse",
        azimuth: "azimuth",
        basefrequency: "baseFrequency",
        baselineshift: "baselineShift",
        "baseline-shift": "baselineShift",
        baseprofile: "baseProfile",
        bbox: "bbox",
        begin: "begin",
        bias: "bias",
        by: "by",
        calcmode: "calcMode",
        capheight: "capHeight",
        "cap-height": "capHeight",
        clip: "clip",
        clippath: "clipPath",
        "clip-path": "clipPath",
        clippathunits: "clipPathUnits",
        cliprule: "clipRule",
        "clip-rule": "clipRule",
        color: "color",
        colorinterpolation: "colorInterpolation",
        "color-interpolation": "colorInterpolation",
        colorinterpolationfilters: "colorInterpolationFilters",
        "color-interpolation-filters": "colorInterpolationFilters",
        colorprofile: "colorProfile",
        "color-profile": "colorProfile",
        colorrendering: "colorRendering",
        "color-rendering": "colorRendering",
        contentscripttype: "contentScriptType",
        contentstyletype: "contentStyleType",
        cursor: "cursor",
        cx: "cx",
        cy: "cy",
        d: "d",
        datatype: "datatype",
        decelerate: "decelerate",
        descent: "descent",
        diffuseconstant: "diffuseConstant",
        direction: "direction",
        display: "display",
        divisor: "divisor",
        dominantbaseline: "dominantBaseline",
        "dominant-baseline": "dominantBaseline",
        dur: "dur",
        dx: "dx",
        dy: "dy",
        edgemode: "edgeMode",
        elevation: "elevation",
        enablebackground: "enableBackground",
        "enable-background": "enableBackground",
        end: "end",
        exponent: "exponent",
        externalresourcesrequired: "externalResourcesRequired",
        fill: "fill",
        fillopacity: "fillOpacity",
        "fill-opacity": "fillOpacity",
        fillrule: "fillRule",
        "fill-rule": "fillRule",
        filter: "filter",
        filterres: "filterRes",
        filterunits: "filterUnits",
        floodopacity: "floodOpacity",
        "flood-opacity": "floodOpacity",
        floodcolor: "floodColor",
        "flood-color": "floodColor",
        focusable: "focusable",
        fontfamily: "fontFamily",
        "font-family": "fontFamily",
        fontsize: "fontSize",
        "font-size": "fontSize",
        fontsizeadjust: "fontSizeAdjust",
        "font-size-adjust": "fontSizeAdjust",
        fontstretch: "fontStretch",
        "font-stretch": "fontStretch",
        fontstyle: "fontStyle",
        "font-style": "fontStyle",
        fontvariant: "fontVariant",
        "font-variant": "fontVariant",
        fontweight: "fontWeight",
        "font-weight": "fontWeight",
        format: "format",
        from: "from",
        fx: "fx",
        fy: "fy",
        g1: "g1",
        g2: "g2",
        glyphname: "glyphName",
        "glyph-name": "glyphName",
        glyphorientationhorizontal: "glyphOrientationHorizontal",
        "glyph-orientation-horizontal": "glyphOrientationHorizontal",
        glyphorientationvertical: "glyphOrientationVertical",
        "glyph-orientation-vertical": "glyphOrientationVertical",
        glyphref: "glyphRef",
        gradienttransform: "gradientTransform",
        gradientunits: "gradientUnits",
        hanging: "hanging",
        horizadvx: "horizAdvX",
        "horiz-adv-x": "horizAdvX",
        horizoriginx: "horizOriginX",
        "horiz-origin-x": "horizOriginX",
        ideographic: "ideographic",
        imagerendering: "imageRendering",
        "image-rendering": "imageRendering",
        in2: "in2",
        in: "in",
        inlist: "inlist",
        intercept: "intercept",
        k1: "k1",
        k2: "k2",
        k3: "k3",
        k4: "k4",
        k: "k",
        kernelmatrix: "kernelMatrix",
        kernelunitlength: "kernelUnitLength",
        kerning: "kerning",
        keypoints: "keyPoints",
        keysplines: "keySplines",
        keytimes: "keyTimes",
        lengthadjust: "lengthAdjust",
        letterspacing: "letterSpacing",
        "letter-spacing": "letterSpacing",
        lightingcolor: "lightingColor",
        "lighting-color": "lightingColor",
        limitingconeangle: "limitingConeAngle",
        local: "local",
        markerend: "markerEnd",
        "marker-end": "markerEnd",
        markerheight: "markerHeight",
        markermid: "markerMid",
        "marker-mid": "markerMid",
        markerstart: "markerStart",
        "marker-start": "markerStart",
        markerunits: "markerUnits",
        markerwidth: "markerWidth",
        mask: "mask",
        maskcontentunits: "maskContentUnits",
        maskunits: "maskUnits",
        mathematical: "mathematical",
        mode: "mode",
        numoctaves: "numOctaves",
        offset: "offset",
        opacity: "opacity",
        operator: "operator",
        order: "order",
        orient: "orient",
        orientation: "orientation",
        origin: "origin",
        overflow: "overflow",
        overlineposition: "overlinePosition",
        "overline-position": "overlinePosition",
        overlinethickness: "overlineThickness",
        "overline-thickness": "overlineThickness",
        paintorder: "paintOrder",
        "paint-order": "paintOrder",
        panose1: "panose1",
        "panose-1": "panose1",
        pathlength: "pathLength",
        patterncontentunits: "patternContentUnits",
        patterntransform: "patternTransform",
        patternunits: "patternUnits",
        pointerevents: "pointerEvents",
        "pointer-events": "pointerEvents",
        points: "points",
        pointsatx: "pointsAtX",
        pointsaty: "pointsAtY",
        pointsatz: "pointsAtZ",
        prefix: "prefix",
        preservealpha: "preserveAlpha",
        preserveaspectratio: "preserveAspectRatio",
        primitiveunits: "primitiveUnits",
        property: "property",
        r: "r",
        radius: "radius",
        refx: "refX",
        refy: "refY",
        renderingintent: "renderingIntent",
        "rendering-intent": "renderingIntent",
        repeatcount: "repeatCount",
        repeatdur: "repeatDur",
        requiredextensions: "requiredExtensions",
        requiredfeatures: "requiredFeatures",
        resource: "resource",
        restart: "restart",
        result: "result",
        results: "results",
        rotate: "rotate",
        rx: "rx",
        ry: "ry",
        scale: "scale",
        security: "security",
        seed: "seed",
        shaperendering: "shapeRendering",
        "shape-rendering": "shapeRendering",
        slope: "slope",
        spacing: "spacing",
        specularconstant: "specularConstant",
        specularexponent: "specularExponent",
        speed: "speed",
        spreadmethod: "spreadMethod",
        startoffset: "startOffset",
        stddeviation: "stdDeviation",
        stemh: "stemh",
        stemv: "stemv",
        stitchtiles: "stitchTiles",
        stopcolor: "stopColor",
        "stop-color": "stopColor",
        stopopacity: "stopOpacity",
        "stop-opacity": "stopOpacity",
        strikethroughposition: "strikethroughPosition",
        "strikethrough-position": "strikethroughPosition",
        strikethroughthickness: "strikethroughThickness",
        "strikethrough-thickness": "strikethroughThickness",
        string: "string",
        stroke: "stroke",
        strokedasharray: "strokeDasharray",
        "stroke-dasharray": "strokeDasharray",
        strokedashoffset: "strokeDashoffset",
        "stroke-dashoffset": "strokeDashoffset",
        strokelinecap: "strokeLinecap",
        "stroke-linecap": "strokeLinecap",
        strokelinejoin: "strokeLinejoin",
        "stroke-linejoin": "strokeLinejoin",
        strokemiterlimit: "strokeMiterlimit",
        "stroke-miterlimit": "strokeMiterlimit",
        strokewidth: "strokeWidth",
        "stroke-width": "strokeWidth",
        strokeopacity: "strokeOpacity",
        "stroke-opacity": "strokeOpacity",
        suppresscontenteditablewarning: "suppressContentEditableWarning",
        suppresshydrationwarning: "suppressHydrationWarning",
        surfacescale: "surfaceScale",
        systemlanguage: "systemLanguage",
        tablevalues: "tableValues",
        targetx: "targetX",
        targety: "targetY",
        textanchor: "textAnchor",
        "text-anchor": "textAnchor",
        textdecoration: "textDecoration",
        "text-decoration": "textDecoration",
        textlength: "textLength",
        textrendering: "textRendering",
        "text-rendering": "textRendering",
        to: "to",
        transform: "transform",
        typeof: "typeof",
        u1: "u1",
        u2: "u2",
        underlineposition: "underlinePosition",
        "underline-position": "underlinePosition",
        underlinethickness: "underlineThickness",
        "underline-thickness": "underlineThickness",
        unicode: "unicode",
        unicodebidi: "unicodeBidi",
        "unicode-bidi": "unicodeBidi",
        unicoderange: "unicodeRange",
        "unicode-range": "unicodeRange",
        unitsperem: "unitsPerEm",
        "units-per-em": "unitsPerEm",
        unselectable: "unselectable",
        valphabetic: "vAlphabetic",
        "v-alphabetic": "vAlphabetic",
        values: "values",
        vectoreffect: "vectorEffect",
        "vector-effect": "vectorEffect",
        version: "version",
        vertadvy: "vertAdvY",
        "vert-adv-y": "vertAdvY",
        vertoriginx: "vertOriginX",
        "vert-origin-x": "vertOriginX",
        vertoriginy: "vertOriginY",
        "vert-origin-y": "vertOriginY",
        vhanging: "vHanging",
        "v-hanging": "vHanging",
        videographic: "vIdeographic",
        "v-ideographic": "vIdeographic",
        viewbox: "viewBox",
        viewtarget: "viewTarget",
        visibility: "visibility",
        vmathematical: "vMathematical",
        "v-mathematical": "vMathematical",
        vocab: "vocab",
        widths: "widths",
        wordspacing: "wordSpacing",
        "word-spacing": "wordSpacing",
        writingmode: "writingMode",
        "writing-mode": "writingMode",
        x1: "x1",
        x2: "x2",
        x: "x",
        xchannelselector: "xChannelSelector",
        xheight: "xHeight",
        "x-height": "xHeight",
        xlinkactuate: "xlinkActuate",
        "xlink:actuate": "xlinkActuate",
        xlinkarcrole: "xlinkArcrole",
        "xlink:arcrole": "xlinkArcrole",
        xlinkhref: "xlinkHref",
        "xlink:href": "xlinkHref",
        xlinkrole: "xlinkRole",
        "xlink:role": "xlinkRole",
        xlinkshow: "xlinkShow",
        "xlink:show": "xlinkShow",
        xlinktitle: "xlinkTitle",
        "xlink:title": "xlinkTitle",
        xlinktype: "xlinkType",
        "xlink:type": "xlinkType",
        xmlbase: "xmlBase",
        "xml:base": "xmlBase",
        xmllang: "xmlLang",
        "xml:lang": "xmlLang",
        xmlns: "xmlns",
        "xml:space": "xmlSpace",
        xmlnsxlink: "xmlnsXlink",
        "xmlns:xlink": "xmlnsXlink",
        xmlspace: "xmlSpace",
        y1: "y1",
        y2: "y2",
        y: "y",
        ychannelselector: "yChannelSelector",
        z: "z",
        zoomandpan: "zoomAndPan"
      }, validateProperty$1 = function() {
      };
      {
        var warnedProperties$1 = {}, EVENT_NAME_REGEX = /^on./, INVALID_EVENT_NAME_REGEX = /^on[^A-Z]/, rARIA$1 = new RegExp("^(aria)-[" + ATTRIBUTE_NAME_CHAR + "]*$"), rARIACamel$1 = new RegExp("^(aria)[A-Z][" + ATTRIBUTE_NAME_CHAR + "]*$");
        validateProperty$1 = function(tagName, name, value, eventRegistry) {
          if (hasOwnProperty.call(warnedProperties$1, name) && warnedProperties$1[name])
            return !0;
          var lowerCasedName = name.toLowerCase();
          if (lowerCasedName === "onfocusin" || lowerCasedName === "onfocusout")
            return error("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), warnedProperties$1[name] = !0, !0;
          if (eventRegistry != null) {
            var registrationNameDependencies = eventRegistry.registrationNameDependencies, possibleRegistrationNames = eventRegistry.possibleRegistrationNames;
            if (registrationNameDependencies.hasOwnProperty(name))
              return !0;
            var registrationName = possibleRegistrationNames.hasOwnProperty(lowerCasedName) ? possibleRegistrationNames[lowerCasedName] : null;
            if (registrationName != null)
              return error("Invalid event handler property `%s`. Did you mean `%s`?", name, registrationName), warnedProperties$1[name] = !0, !0;
            if (EVENT_NAME_REGEX.test(name))
              return error("Unknown event handler property `%s`. It will be ignored.", name), warnedProperties$1[name] = !0, !0;
          } else if (EVENT_NAME_REGEX.test(name))
            return INVALID_EVENT_NAME_REGEX.test(name) && error("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", name), warnedProperties$1[name] = !0, !0;
          if (rARIA$1.test(name) || rARIACamel$1.test(name))
            return !0;
          if (lowerCasedName === "innerhtml")
            return error("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), warnedProperties$1[name] = !0, !0;
          if (lowerCasedName === "aria")
            return error("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), warnedProperties$1[name] = !0, !0;
          if (lowerCasedName === "is" && value !== null && value !== void 0 && typeof value != "string")
            return error("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof value), warnedProperties$1[name] = !0, !0;
          if (typeof value == "number" && isNaN(value))
            return error("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", name), warnedProperties$1[name] = !0, !0;
          var propertyInfo = getPropertyInfo(name), isReserved = propertyInfo !== null && propertyInfo.type === RESERVED;
          if (possibleStandardNames.hasOwnProperty(lowerCasedName)) {
            var standardName = possibleStandardNames[lowerCasedName];
            if (standardName !== name)
              return error("Invalid DOM property `%s`. Did you mean `%s`?", name, standardName), warnedProperties$1[name] = !0, !0;
          } else if (!isReserved && name !== lowerCasedName)
            return error("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", name, lowerCasedName), warnedProperties$1[name] = !0, !0;
          return typeof value == "boolean" && shouldRemoveAttributeWithWarning(name, value, propertyInfo, !1) ? (value ? error('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', value, name, name, value, name) : error('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', value, name, name, value, name, name, name), warnedProperties$1[name] = !0, !0) : isReserved ? !0 : shouldRemoveAttributeWithWarning(name, value, propertyInfo, !1) ? (warnedProperties$1[name] = !0, !1) : ((value === "false" || value === "true") && propertyInfo !== null && propertyInfo.type === BOOLEAN && (error("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", value, name, value === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', name, value), warnedProperties$1[name] = !0), !0);
        };
      }
      var warnUnknownProperties = function(type, props, eventRegistry) {
        {
          var unknownProps = [];
          for (var key in props) {
            var isValid = validateProperty$1(type, key, props[key], eventRegistry);
            isValid || unknownProps.push(key);
          }
          var unknownPropString = unknownProps.map(function(prop) {
            return "`" + prop + "`";
          }).join(", ");
          unknownProps.length === 1 ? error("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", unknownPropString, type) : unknownProps.length > 1 && error("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", unknownPropString, type);
        }
      };
      function validateProperties$2(type, props, eventRegistry) {
        isCustomComponent(type, props) || warnUnknownProperties(type, props, eventRegistry);
      }
      var warnValidStyle = function() {
      };
      {
        var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/, msPattern = /^-ms-/, hyphenPattern = /-(.)/g, badStyleValueWithSemicolonPattern = /;\s*$/, warnedStyleNames = {}, warnedStyleValues = {}, warnedForNaNValue = !1, warnedForInfinityValue = !1, camelize = function(string) {
          return string.replace(hyphenPattern, function(_, character) {
            return character.toUpperCase();
          });
        }, warnHyphenatedStyleName = function(name) {
          warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name] || (warnedStyleNames[name] = !0, error(
            "Unsupported style property %s. Did you mean %s?",
            name,
            // As Andi Smith suggests
            // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
            // is converted to lowercase `ms`.
            camelize(name.replace(msPattern, "ms-"))
          ));
        }, warnBadVendoredStyleName = function(name) {
          warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name] || (warnedStyleNames[name] = !0, error("Unsupported vendor-prefixed style property %s. Did you mean %s?", name, name.charAt(0).toUpperCase() + name.slice(1)));
        }, warnStyleValueWithSemicolon = function(name, value) {
          warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value] || (warnedStyleValues[value] = !0, error(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, name, value.replace(badStyleValueWithSemicolonPattern, "")));
        }, warnStyleValueIsNaN = function(name, value) {
          warnedForNaNValue || (warnedForNaNValue = !0, error("`NaN` is an invalid value for the `%s` css style property.", name));
        }, warnStyleValueIsInfinity = function(name, value) {
          warnedForInfinityValue || (warnedForInfinityValue = !0, error("`Infinity` is an invalid value for the `%s` css style property.", name));
        };
        warnValidStyle = function(name, value) {
          name.indexOf("-") > -1 ? warnHyphenatedStyleName(name) : badVendoredStyleNamePattern.test(name) ? warnBadVendoredStyleName(name) : badStyleValueWithSemicolonPattern.test(value) && warnStyleValueWithSemicolon(name, value), typeof value == "number" && (isNaN(value) ? warnStyleValueIsNaN(name, value) : isFinite(value) || warnStyleValueIsInfinity(name, value));
        };
      }
      var warnValidStyle$1 = warnValidStyle, matchHtmlRegExp = /["'&<>]/;
      function escapeHtml3(string) {
        checkHtmlStringCoercion(string);
        var str = "" + string, match = matchHtmlRegExp.exec(str);
        if (!match)
          return str;
        var escape2, html = "", index, lastIndex = 0;
        for (index = match.index; index < str.length; index++) {
          switch (str.charCodeAt(index)) {
            case 34:
              escape2 = "&quot;";
              break;
            case 38:
              escape2 = "&amp;";
              break;
            case 39:
              escape2 = "&#x27;";
              break;
            case 60:
              escape2 = "&lt;";
              break;
            case 62:
              escape2 = "&gt;";
              break;
            default:
              continue;
          }
          lastIndex !== index && (html += str.substring(lastIndex, index)), lastIndex = index + 1, html += escape2;
        }
        return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
      }
      function escapeTextForBrowser(text) {
        return typeof text == "boolean" || typeof text == "number" ? "" + text : escapeHtml3(text);
      }
      var uppercasePattern = /([A-Z])/g, msPattern$1 = /^ms-/;
      function hyphenateStyleName(name) {
        return name.replace(uppercasePattern, "-$1").toLowerCase().replace(msPattern$1, "-ms-");
      }
      var isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, didWarn = !1;
      function sanitizeURL(url) {
        !didWarn && isJavaScriptProtocol.test(url) && (didWarn = !0, error("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(url)));
      }
      var isArrayImpl = Array.isArray;
      function isArray(a) {
        return isArrayImpl(a);
      }
      var startInlineScript = stringToPrecomputedChunk("<script>"), endInlineScript = stringToPrecomputedChunk("</script>"), startScriptSrc = stringToPrecomputedChunk('<script src="'), startModuleSrc = stringToPrecomputedChunk('<script type="module" src="'), endAsyncScript = stringToPrecomputedChunk('" async=""></script>');
      function escapeBootstrapScriptContent(scriptText) {
        return checkHtmlStringCoercion(scriptText), ("" + scriptText).replace(scriptRegex, scriptReplacer);
      }
      var scriptRegex = /(<\/|<)(s)(cript)/gi, scriptReplacer = function(match, prefix2, s, suffix) {
        return "" + prefix2 + (s === "s" ? "\\u0073" : "\\u0053") + suffix;
      };
      function createResponseState(identifierPrefix, nonce, bootstrapScriptContent, bootstrapScripts, bootstrapModules) {
        var idPrefix = identifierPrefix === void 0 ? "" : identifierPrefix, inlineScriptWithNonce = nonce === void 0 ? startInlineScript : stringToPrecomputedChunk('<script nonce="' + escapeTextForBrowser(nonce) + '">'), bootstrapChunks = [];
        if (bootstrapScriptContent !== void 0 && bootstrapChunks.push(inlineScriptWithNonce, stringToChunk(escapeBootstrapScriptContent(bootstrapScriptContent)), endInlineScript), bootstrapScripts !== void 0)
          for (var i = 0; i < bootstrapScripts.length; i++)
            bootstrapChunks.push(startScriptSrc, stringToChunk(escapeTextForBrowser(bootstrapScripts[i])), endAsyncScript);
        if (bootstrapModules !== void 0)
          for (var _i = 0; _i < bootstrapModules.length; _i++)
            bootstrapChunks.push(startModuleSrc, stringToChunk(escapeTextForBrowser(bootstrapModules[_i])), endAsyncScript);
        return {
          bootstrapChunks,
          startInlineScript: inlineScriptWithNonce,
          placeholderPrefix: stringToPrecomputedChunk(idPrefix + "P:"),
          segmentPrefix: stringToPrecomputedChunk(idPrefix + "S:"),
          boundaryPrefix: idPrefix + "B:",
          idPrefix,
          nextSuspenseID: 0,
          sentCompleteSegmentFunction: !1,
          sentCompleteBoundaryFunction: !1,
          sentClientRenderFunction: !1
        };
      }
      var ROOT_HTML_MODE = 0, HTML_MODE = 1, SVG_MODE = 2, MATHML_MODE = 3, HTML_TABLE_MODE = 4, HTML_TABLE_BODY_MODE = 5, HTML_TABLE_ROW_MODE = 6, HTML_COLGROUP_MODE = 7;
      function createFormatContext(insertionMode, selectedValue) {
        return {
          insertionMode,
          selectedValue
        };
      }
      function createRootFormatContext(namespaceURI) {
        var insertionMode = namespaceURI === "http://www.w3.org/2000/svg" ? SVG_MODE : namespaceURI === "http://www.w3.org/1998/Math/MathML" ? MATHML_MODE : ROOT_HTML_MODE;
        return createFormatContext(insertionMode, null);
      }
      function getChildFormatContext(parentContext, type, props) {
        switch (type) {
          case "select":
            return createFormatContext(HTML_MODE, props.value != null ? props.value : props.defaultValue);
          case "svg":
            return createFormatContext(SVG_MODE, null);
          case "math":
            return createFormatContext(MATHML_MODE, null);
          case "foreignObject":
            return createFormatContext(HTML_MODE, null);
          case "table":
            return createFormatContext(HTML_TABLE_MODE, null);
          case "thead":
          case "tbody":
          case "tfoot":
            return createFormatContext(HTML_TABLE_BODY_MODE, null);
          case "colgroup":
            return createFormatContext(HTML_COLGROUP_MODE, null);
          case "tr":
            return createFormatContext(HTML_TABLE_ROW_MODE, null);
        }
        return parentContext.insertionMode >= HTML_TABLE_MODE || parentContext.insertionMode === ROOT_HTML_MODE ? createFormatContext(HTML_MODE, null) : parentContext;
      }
      var UNINITIALIZED_SUSPENSE_BOUNDARY_ID = null;
      function assignSuspenseBoundaryID(responseState) {
        var generatedID = responseState.nextSuspenseID++;
        return stringToPrecomputedChunk(responseState.boundaryPrefix + generatedID.toString(16));
      }
      function makeId(responseState, treeId, localId) {
        var idPrefix = responseState.idPrefix, id = ":" + idPrefix + "R" + treeId;
        return localId > 0 && (id += "H" + localId.toString(32)), id + ":";
      }
      function encodeHTMLTextNode(text) {
        return escapeTextForBrowser(text);
      }
      var textSeparator = stringToPrecomputedChunk("<!-- -->");
      function pushTextInstance(target, text, responseState, textEmbedded) {
        return text === "" ? textEmbedded : (textEmbedded && target.push(textSeparator), target.push(stringToChunk(encodeHTMLTextNode(text))), !0);
      }
      function pushSegmentFinale(target, responseState, lastPushedText, textEmbedded) {
        lastPushedText && textEmbedded && target.push(textSeparator);
      }
      var styleNameCache = /* @__PURE__ */ new Map();
      function processStyleName(styleName) {
        var chunk = styleNameCache.get(styleName);
        if (chunk !== void 0)
          return chunk;
        var result = stringToPrecomputedChunk(escapeTextForBrowser(hyphenateStyleName(styleName)));
        return styleNameCache.set(styleName, result), result;
      }
      var styleAttributeStart = stringToPrecomputedChunk(' style="'), styleAssign = stringToPrecomputedChunk(":"), styleSeparator = stringToPrecomputedChunk(";");
      function pushStyle(target, responseState, style) {
        if (typeof style != "object")
          throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
        var isFirst = !0;
        for (var styleName in style)
          if (hasOwnProperty.call(style, styleName)) {
            var styleValue = style[styleName];
            if (!(styleValue == null || typeof styleValue == "boolean" || styleValue === "")) {
              var nameChunk = void 0, valueChunk = void 0, isCustomProperty = styleName.indexOf("--") === 0;
              isCustomProperty ? (nameChunk = stringToChunk(escapeTextForBrowser(styleName)), checkCSSPropertyStringCoercion(styleValue, styleName), valueChunk = stringToChunk(escapeTextForBrowser(("" + styleValue).trim()))) : (warnValidStyle$1(styleName, styleValue), nameChunk = processStyleName(styleName), typeof styleValue == "number" ? styleValue !== 0 && !hasOwnProperty.call(isUnitlessNumber, styleName) ? valueChunk = stringToChunk(styleValue + "px") : valueChunk = stringToChunk("" + styleValue) : (checkCSSPropertyStringCoercion(styleValue, styleName), valueChunk = stringToChunk(escapeTextForBrowser(("" + styleValue).trim())))), isFirst ? (isFirst = !1, target.push(styleAttributeStart, nameChunk, styleAssign, valueChunk)) : target.push(styleSeparator, nameChunk, styleAssign, valueChunk);
            }
          }
        isFirst || target.push(attributeEnd);
      }
      var attributeSeparator = stringToPrecomputedChunk(" "), attributeAssign = stringToPrecomputedChunk('="'), attributeEnd = stringToPrecomputedChunk('"'), attributeEmptyString = stringToPrecomputedChunk('=""');
      function pushAttribute(target, responseState, name, value) {
        switch (name) {
          case "style": {
            pushStyle(target, responseState, value);
            return;
          }
          case "defaultValue":
          case "defaultChecked":
          case "innerHTML":
          case "suppressContentEditableWarning":
          case "suppressHydrationWarning":
            return;
        }
        if (
          // shouldIgnoreAttribute
          // We have already filtered out null/undefined and reserved words.
          !(name.length > 2 && (name[0] === "o" || name[0] === "O") && (name[1] === "n" || name[1] === "N"))
        ) {
          var propertyInfo = getPropertyInfo(name);
          if (propertyInfo !== null) {
            switch (typeof value) {
              case "function":
              case "symbol":
                return;
              case "boolean":
                if (!propertyInfo.acceptsBooleans)
                  return;
            }
            var attributeName = propertyInfo.attributeName, attributeNameChunk = stringToChunk(attributeName);
            switch (propertyInfo.type) {
              case BOOLEAN:
                value && target.push(attributeSeparator, attributeNameChunk, attributeEmptyString);
                return;
              case OVERLOADED_BOOLEAN:
                value === !0 ? target.push(attributeSeparator, attributeNameChunk, attributeEmptyString) : value === !1 || target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
                return;
              case NUMERIC:
                isNaN(value) || target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
                break;
              case POSITIVE_NUMERIC:
                !isNaN(value) && value >= 1 && target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
                break;
              default:
                propertyInfo.sanitizeURL && (checkAttributeStringCoercion(value, attributeName), value = "" + value, sanitizeURL(value)), target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
            }
          } else if (isAttributeNameSafe(name)) {
            switch (typeof value) {
              case "function":
              case "symbol":
                return;
              case "boolean": {
                var prefix2 = name.toLowerCase().slice(0, 5);
                if (prefix2 !== "data-" && prefix2 !== "aria-")
                  return;
              }
            }
            target.push(attributeSeparator, stringToChunk(name), attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
          }
        }
      }
      var endOfStartTag = stringToPrecomputedChunk(">"), endOfStartTagSelfClosing = stringToPrecomputedChunk("/>");
      function pushInnerHTML(target, innerHTML, children) {
        if (innerHTML != null) {
          if (children != null)
            throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof innerHTML != "object" || !("__html" in innerHTML))
            throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
          var html = innerHTML.__html;
          html != null && (checkHtmlStringCoercion(html), target.push(stringToChunk("" + html)));
        }
      }
      var didWarnDefaultInputValue = !1, didWarnDefaultChecked = !1, didWarnDefaultSelectValue = !1, didWarnDefaultTextareaValue = !1, didWarnInvalidOptionChildren = !1, didWarnInvalidOptionInnerHTML = !1, didWarnSelectedSetOnOption = !1;
      function checkSelectProp(props, propName) {
        {
          var value = props[propName];
          if (value != null) {
            var array = isArray(value);
            props.multiple && !array ? error("The `%s` prop supplied to <select> must be an array if `multiple` is true.", propName) : !props.multiple && array && error("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.", propName);
          }
        }
      }
      function pushStartSelect(target, props, responseState) {
        checkControlledValueProps("select", props), checkSelectProp(props, "value"), checkSelectProp(props, "defaultValue"), props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultSelectValue && (error("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), didWarnDefaultSelectValue = !0), target.push(startChunkForTag("select"));
        var children = null, innerHTML = null;
        for (var propKey in props)
          if (hasOwnProperty.call(props, propKey)) {
            var propValue = props[propKey];
            if (propValue == null)
              continue;
            switch (propKey) {
              case "children":
                children = propValue;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML = propValue;
                break;
              case "defaultValue":
              case "value":
                break;
              default:
                pushAttribute(target, responseState, propKey, propValue);
                break;
            }
          }
        return target.push(endOfStartTag), pushInnerHTML(target, innerHTML, children), children;
      }
      function flattenOptionChildren(children) {
        var content = "";
        return React7.Children.forEach(children, function(child) {
          child != null && (content += child, !didWarnInvalidOptionChildren && typeof child != "string" && typeof child != "number" && (didWarnInvalidOptionChildren = !0, error("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
        }), content;
      }
      var selectedMarkerAttribute = stringToPrecomputedChunk(' selected=""');
      function pushStartOption(target, props, responseState, formatContext) {
        var selectedValue = formatContext.selectedValue;
        target.push(startChunkForTag("option"));
        var children = null, value = null, selected = null, innerHTML = null;
        for (var propKey in props)
          if (hasOwnProperty.call(props, propKey)) {
            var propValue = props[propKey];
            if (propValue == null)
              continue;
            switch (propKey) {
              case "children":
                children = propValue;
                break;
              case "selected":
                selected = propValue, didWarnSelectedSetOnOption || (error("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), didWarnSelectedSetOnOption = !0);
                break;
              case "dangerouslySetInnerHTML":
                innerHTML = propValue;
                break;
              case "value":
                value = propValue;
              default:
                pushAttribute(target, responseState, propKey, propValue);
                break;
            }
          }
        if (selectedValue != null) {
          var stringValue;
          if (value !== null ? (checkAttributeStringCoercion(value, "value"), stringValue = "" + value) : (innerHTML !== null && (didWarnInvalidOptionInnerHTML || (didWarnInvalidOptionInnerHTML = !0, error("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected."))), stringValue = flattenOptionChildren(children)), isArray(selectedValue))
            for (var i = 0; i < selectedValue.length; i++) {
              checkAttributeStringCoercion(selectedValue[i], "value");
              var v = "" + selectedValue[i];
              if (v === stringValue) {
                target.push(selectedMarkerAttribute);
                break;
              }
            }
          else
            checkAttributeStringCoercion(selectedValue, "select.value"), "" + selectedValue === stringValue && target.push(selectedMarkerAttribute);
        } else
          selected && target.push(selectedMarkerAttribute);
        return target.push(endOfStartTag), pushInnerHTML(target, innerHTML, children), children;
      }
      function pushInput(target, props, responseState) {
        checkControlledValueProps("input", props), props.checked !== void 0 && props.defaultChecked !== void 0 && !didWarnDefaultChecked && (error("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", "A component", props.type), didWarnDefaultChecked = !0), props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultInputValue && (error("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", "A component", props.type), didWarnDefaultInputValue = !0), target.push(startChunkForTag("input"));
        var value = null, defaultValue = null, checked = null, defaultChecked = null;
        for (var propKey in props)
          if (hasOwnProperty.call(props, propKey)) {
            var propValue = props[propKey];
            if (propValue == null)
              continue;
            switch (propKey) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw new Error("input is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
              case "defaultChecked":
                defaultChecked = propValue;
                break;
              case "defaultValue":
                defaultValue = propValue;
                break;
              case "checked":
                checked = propValue;
                break;
              case "value":
                value = propValue;
                break;
              default:
                pushAttribute(target, responseState, propKey, propValue);
                break;
            }
          }
        return checked !== null ? pushAttribute(target, responseState, "checked", checked) : defaultChecked !== null && pushAttribute(target, responseState, "checked", defaultChecked), value !== null ? pushAttribute(target, responseState, "value", value) : defaultValue !== null && pushAttribute(target, responseState, "value", defaultValue), target.push(endOfStartTagSelfClosing), null;
      }
      function pushStartTextArea(target, props, responseState) {
        checkControlledValueProps("textarea", props), props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultTextareaValue && (error("Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components"), didWarnDefaultTextareaValue = !0), target.push(startChunkForTag("textarea"));
        var value = null, defaultValue = null, children = null;
        for (var propKey in props)
          if (hasOwnProperty.call(props, propKey)) {
            var propValue = props[propKey];
            if (propValue == null)
              continue;
            switch (propKey) {
              case "children":
                children = propValue;
                break;
              case "value":
                value = propValue;
                break;
              case "defaultValue":
                defaultValue = propValue;
                break;
              case "dangerouslySetInnerHTML":
                throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
              default:
                pushAttribute(target, responseState, propKey, propValue);
                break;
            }
          }
        if (value === null && defaultValue !== null && (value = defaultValue), target.push(endOfStartTag), children != null) {
          if (error("Use the `defaultValue` or `value` props instead of setting children on <textarea>."), value != null)
            throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
          if (isArray(children)) {
            if (children.length > 1)
              throw new Error("<textarea> can only have at most one child.");
            checkHtmlStringCoercion(children[0]), value = "" + children[0];
          }
          checkHtmlStringCoercion(children), value = "" + children;
        }
        return typeof value == "string" && value[0] === `
` && target.push(leadingNewline), value !== null && (checkAttributeStringCoercion(value, "value"), target.push(stringToChunk(encodeHTMLTextNode("" + value)))), null;
      }
      function pushSelfClosing(target, props, tag, responseState) {
        target.push(startChunkForTag(tag));
        for (var propKey in props)
          if (hasOwnProperty.call(props, propKey)) {
            var propValue = props[propKey];
            if (propValue == null)
              continue;
            switch (propKey) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw new Error(tag + " is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
              default:
                pushAttribute(target, responseState, propKey, propValue);
                break;
            }
          }
        return target.push(endOfStartTagSelfClosing), null;
      }
      function pushStartMenuItem(target, props, responseState) {
        target.push(startChunkForTag("menuitem"));
        for (var propKey in props)
          if (hasOwnProperty.call(props, propKey)) {
            var propValue = props[propKey];
            if (propValue == null)
              continue;
            switch (propKey) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw new Error("menuitems cannot have `children` nor `dangerouslySetInnerHTML`.");
              default:
                pushAttribute(target, responseState, propKey, propValue);
                break;
            }
          }
        return target.push(endOfStartTag), null;
      }
      function pushStartTitle(target, props, responseState) {
        target.push(startChunkForTag("title"));
        var children = null;
        for (var propKey in props)
          if (hasOwnProperty.call(props, propKey)) {
            var propValue = props[propKey];
            if (propValue == null)
              continue;
            switch (propKey) {
              case "children":
                children = propValue;
                break;
              case "dangerouslySetInnerHTML":
                throw new Error("`dangerouslySetInnerHTML` does not make sense on <title>.");
              default:
                pushAttribute(target, responseState, propKey, propValue);
                break;
            }
          }
        target.push(endOfStartTag);
        {
          var child = Array.isArray(children) && children.length < 2 ? children[0] || null : children;
          Array.isArray(children) && children.length > 1 ? error("A title element received an array with more than 1 element as children. In browsers title Elements can only have Text Nodes as children. If the children being rendered output more than a single text node in aggregate the browser will display markup and comments as text in the title and hydration will likely fail and fall back to client rendering") : child != null && child.$$typeof != null ? error("A title element received a React element for children. In the browser title Elements can only have Text Nodes as children. If the children being rendered output more than a single text node in aggregate the browser will display markup and comments as text in the title and hydration will likely fail and fall back to client rendering") : child != null && typeof child != "string" && typeof child != "number" && error("A title element received a value that was not a string or number for children. In the browser title Elements can only have Text Nodes as children. If the children being rendered output more than a single text node in aggregate the browser will display markup and comments as text in the title and hydration will likely fail and fall back to client rendering");
        }
        return children;
      }
      function pushStartGenericElement(target, props, tag, responseState) {
        target.push(startChunkForTag(tag));
        var children = null, innerHTML = null;
        for (var propKey in props)
          if (hasOwnProperty.call(props, propKey)) {
            var propValue = props[propKey];
            if (propValue == null)
              continue;
            switch (propKey) {
              case "children":
                children = propValue;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML = propValue;
                break;
              default:
                pushAttribute(target, responseState, propKey, propValue);
                break;
            }
          }
        return target.push(endOfStartTag), pushInnerHTML(target, innerHTML, children), typeof children == "string" ? (target.push(stringToChunk(encodeHTMLTextNode(children))), null) : children;
      }
      function pushStartCustomElement(target, props, tag, responseState) {
        target.push(startChunkForTag(tag));
        var children = null, innerHTML = null;
        for (var propKey in props)
          if (hasOwnProperty.call(props, propKey)) {
            var propValue = props[propKey];
            if (propValue == null)
              continue;
            switch (propKey) {
              case "children":
                children = propValue;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML = propValue;
                break;
              case "style":
                pushStyle(target, responseState, propValue);
                break;
              case "suppressContentEditableWarning":
              case "suppressHydrationWarning":
                break;
              default:
                isAttributeNameSafe(propKey) && typeof propValue != "function" && typeof propValue != "symbol" && target.push(attributeSeparator, stringToChunk(propKey), attributeAssign, stringToChunk(escapeTextForBrowser(propValue)), attributeEnd);
                break;
            }
          }
        return target.push(endOfStartTag), pushInnerHTML(target, innerHTML, children), children;
      }
      var leadingNewline = stringToPrecomputedChunk(`
`);
      function pushStartPreformattedElement(target, props, tag, responseState) {
        target.push(startChunkForTag(tag));
        var children = null, innerHTML = null;
        for (var propKey in props)
          if (hasOwnProperty.call(props, propKey)) {
            var propValue = props[propKey];
            if (propValue == null)
              continue;
            switch (propKey) {
              case "children":
                children = propValue;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML = propValue;
                break;
              default:
                pushAttribute(target, responseState, propKey, propValue);
                break;
            }
          }
        if (target.push(endOfStartTag), innerHTML != null) {
          if (children != null)
            throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof innerHTML != "object" || !("__html" in innerHTML))
            throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
          var html = innerHTML.__html;
          html != null && (typeof html == "string" && html.length > 0 && html[0] === `
` ? target.push(leadingNewline, stringToChunk(html)) : (checkHtmlStringCoercion(html), target.push(stringToChunk("" + html))));
        }
        return typeof children == "string" && children[0] === `
` && target.push(leadingNewline), children;
      }
      var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, validatedTagCache = /* @__PURE__ */ new Map();
      function startChunkForTag(tag) {
        var tagStartChunk = validatedTagCache.get(tag);
        if (tagStartChunk === void 0) {
          if (!VALID_TAG_REGEX.test(tag))
            throw new Error("Invalid tag: " + tag);
          tagStartChunk = stringToPrecomputedChunk("<" + tag), validatedTagCache.set(tag, tagStartChunk);
        }
        return tagStartChunk;
      }
      var DOCTYPE = stringToPrecomputedChunk("<!DOCTYPE html>");
      function pushStartInstance(target, type, props, responseState, formatContext) {
        switch (validateProperties(type, props), validateProperties$1(type, props), validateProperties$2(type, props, null), !props.suppressContentEditableWarning && props.contentEditable && props.children != null && error("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), formatContext.insertionMode !== SVG_MODE && formatContext.insertionMode !== MATHML_MODE && type.indexOf("-") === -1 && typeof props.is != "string" && type.toLowerCase() !== type && error("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", type), type) {
          case "select":
            return pushStartSelect(target, props, responseState);
          case "option":
            return pushStartOption(target, props, responseState, formatContext);
          case "textarea":
            return pushStartTextArea(target, props, responseState);
          case "input":
            return pushInput(target, props, responseState);
          case "menuitem":
            return pushStartMenuItem(target, props, responseState);
          case "title":
            return pushStartTitle(target, props, responseState);
          case "listing":
          case "pre":
            return pushStartPreformattedElement(target, props, type, responseState);
          case "area":
          case "base":
          case "br":
          case "col":
          case "embed":
          case "hr":
          case "img":
          case "keygen":
          case "link":
          case "meta":
          case "param":
          case "source":
          case "track":
          case "wbr":
            return pushSelfClosing(target, props, type, responseState);
          case "annotation-xml":
          case "color-profile":
          case "font-face":
          case "font-face-src":
          case "font-face-uri":
          case "font-face-format":
          case "font-face-name":
          case "missing-glyph":
            return pushStartGenericElement(target, props, type, responseState);
          case "html":
            return formatContext.insertionMode === ROOT_HTML_MODE && target.push(DOCTYPE), pushStartGenericElement(target, props, type, responseState);
          default:
            return type.indexOf("-") === -1 && typeof props.is != "string" ? pushStartGenericElement(target, props, type, responseState) : pushStartCustomElement(target, props, type, responseState);
        }
      }
      var endTag1 = stringToPrecomputedChunk("</"), endTag2 = stringToPrecomputedChunk(">");
      function pushEndInstance(target, type, props) {
        switch (type) {
          case "area":
          case "base":
          case "br":
          case "col":
          case "embed":
          case "hr":
          case "img":
          case "input":
          case "keygen":
          case "link":
          case "meta":
          case "param":
          case "source":
          case "track":
          case "wbr":
            break;
          default:
            target.push(endTag1, stringToChunk(type), endTag2);
        }
      }
      function writeCompletedRoot(destination, responseState) {
        for (var bootstrapChunks = responseState.bootstrapChunks, i = 0; i < bootstrapChunks.length - 1; i++)
          writeChunk(destination, bootstrapChunks[i]);
        return i < bootstrapChunks.length ? writeChunkAndReturn(destination, bootstrapChunks[i]) : !0;
      }
      var placeholder1 = stringToPrecomputedChunk('<template id="'), placeholder2 = stringToPrecomputedChunk('"></template>');
      function writePlaceholder(destination, responseState, id) {
        writeChunk(destination, placeholder1), writeChunk(destination, responseState.placeholderPrefix);
        var formattedID = stringToChunk(id.toString(16));
        return writeChunk(destination, formattedID), writeChunkAndReturn(destination, placeholder2);
      }
      var startCompletedSuspenseBoundary = stringToPrecomputedChunk("<!--$-->"), startPendingSuspenseBoundary1 = stringToPrecomputedChunk('<!--$?--><template id="'), startPendingSuspenseBoundary2 = stringToPrecomputedChunk('"></template>'), startClientRenderedSuspenseBoundary = stringToPrecomputedChunk("<!--$!-->"), endSuspenseBoundary = stringToPrecomputedChunk("<!--/$-->"), clientRenderedSuspenseBoundaryError1 = stringToPrecomputedChunk("<template"), clientRenderedSuspenseBoundaryErrorAttrInterstitial = stringToPrecomputedChunk('"'), clientRenderedSuspenseBoundaryError1A = stringToPrecomputedChunk(' data-dgst="'), clientRenderedSuspenseBoundaryError1B = stringToPrecomputedChunk(' data-msg="'), clientRenderedSuspenseBoundaryError1C = stringToPrecomputedChunk(' data-stck="'), clientRenderedSuspenseBoundaryError2 = stringToPrecomputedChunk("></template>");
      function writeStartCompletedSuspenseBoundary(destination, responseState) {
        return writeChunkAndReturn(destination, startCompletedSuspenseBoundary);
      }
      function writeStartPendingSuspenseBoundary(destination, responseState, id) {
        if (writeChunk(destination, startPendingSuspenseBoundary1), id === null)
          throw new Error("An ID must have been assigned before we can complete the boundary.");
        return writeChunk(destination, id), writeChunkAndReturn(destination, startPendingSuspenseBoundary2);
      }
      function writeStartClientRenderedSuspenseBoundary(destination, responseState, errorDigest, errorMesssage, errorComponentStack) {
        var result;
        return result = writeChunkAndReturn(destination, startClientRenderedSuspenseBoundary), writeChunk(destination, clientRenderedSuspenseBoundaryError1), errorDigest && (writeChunk(destination, clientRenderedSuspenseBoundaryError1A), writeChunk(destination, stringToChunk(escapeTextForBrowser(errorDigest))), writeChunk(destination, clientRenderedSuspenseBoundaryErrorAttrInterstitial)), errorMesssage && (writeChunk(destination, clientRenderedSuspenseBoundaryError1B), writeChunk(destination, stringToChunk(escapeTextForBrowser(errorMesssage))), writeChunk(destination, clientRenderedSuspenseBoundaryErrorAttrInterstitial)), errorComponentStack && (writeChunk(destination, clientRenderedSuspenseBoundaryError1C), writeChunk(destination, stringToChunk(escapeTextForBrowser(errorComponentStack))), writeChunk(destination, clientRenderedSuspenseBoundaryErrorAttrInterstitial)), result = writeChunkAndReturn(destination, clientRenderedSuspenseBoundaryError2), result;
      }
      function writeEndCompletedSuspenseBoundary(destination, responseState) {
        return writeChunkAndReturn(destination, endSuspenseBoundary);
      }
      function writeEndPendingSuspenseBoundary(destination, responseState) {
        return writeChunkAndReturn(destination, endSuspenseBoundary);
      }
      function writeEndClientRenderedSuspenseBoundary(destination, responseState) {
        return writeChunkAndReturn(destination, endSuspenseBoundary);
      }
      var startSegmentHTML = stringToPrecomputedChunk('<div hidden id="'), startSegmentHTML2 = stringToPrecomputedChunk('">'), endSegmentHTML = stringToPrecomputedChunk("</div>"), startSegmentSVG = stringToPrecomputedChunk('<svg aria-hidden="true" style="display:none" id="'), startSegmentSVG2 = stringToPrecomputedChunk('">'), endSegmentSVG = stringToPrecomputedChunk("</svg>"), startSegmentMathML = stringToPrecomputedChunk('<math aria-hidden="true" style="display:none" id="'), startSegmentMathML2 = stringToPrecomputedChunk('">'), endSegmentMathML = stringToPrecomputedChunk("</math>"), startSegmentTable = stringToPrecomputedChunk('<table hidden id="'), startSegmentTable2 = stringToPrecomputedChunk('">'), endSegmentTable = stringToPrecomputedChunk("</table>"), startSegmentTableBody = stringToPrecomputedChunk('<table hidden><tbody id="'), startSegmentTableBody2 = stringToPrecomputedChunk('">'), endSegmentTableBody = stringToPrecomputedChunk("</tbody></table>"), startSegmentTableRow = stringToPrecomputedChunk('<table hidden><tr id="'), startSegmentTableRow2 = stringToPrecomputedChunk('">'), endSegmentTableRow = stringToPrecomputedChunk("</tr></table>"), startSegmentColGroup = stringToPrecomputedChunk('<table hidden><colgroup id="'), startSegmentColGroup2 = stringToPrecomputedChunk('">'), endSegmentColGroup = stringToPrecomputedChunk("</colgroup></table>");
      function writeStartSegment(destination, responseState, formatContext, id) {
        switch (formatContext.insertionMode) {
          case ROOT_HTML_MODE:
          case HTML_MODE:
            return writeChunk(destination, startSegmentHTML), writeChunk(destination, responseState.segmentPrefix), writeChunk(destination, stringToChunk(id.toString(16))), writeChunkAndReturn(destination, startSegmentHTML2);
          case SVG_MODE:
            return writeChunk(destination, startSegmentSVG), writeChunk(destination, responseState.segmentPrefix), writeChunk(destination, stringToChunk(id.toString(16))), writeChunkAndReturn(destination, startSegmentSVG2);
          case MATHML_MODE:
            return writeChunk(destination, startSegmentMathML), writeChunk(destination, responseState.segmentPrefix), writeChunk(destination, stringToChunk(id.toString(16))), writeChunkAndReturn(destination, startSegmentMathML2);
          case HTML_TABLE_MODE:
            return writeChunk(destination, startSegmentTable), writeChunk(destination, responseState.segmentPrefix), writeChunk(destination, stringToChunk(id.toString(16))), writeChunkAndReturn(destination, startSegmentTable2);
          case HTML_TABLE_BODY_MODE:
            return writeChunk(destination, startSegmentTableBody), writeChunk(destination, responseState.segmentPrefix), writeChunk(destination, stringToChunk(id.toString(16))), writeChunkAndReturn(destination, startSegmentTableBody2);
          case HTML_TABLE_ROW_MODE:
            return writeChunk(destination, startSegmentTableRow), writeChunk(destination, responseState.segmentPrefix), writeChunk(destination, stringToChunk(id.toString(16))), writeChunkAndReturn(destination, startSegmentTableRow2);
          case HTML_COLGROUP_MODE:
            return writeChunk(destination, startSegmentColGroup), writeChunk(destination, responseState.segmentPrefix), writeChunk(destination, stringToChunk(id.toString(16))), writeChunkAndReturn(destination, startSegmentColGroup2);
          default:
            throw new Error("Unknown insertion mode. This is a bug in React.");
        }
      }
      function writeEndSegment(destination, formatContext) {
        switch (formatContext.insertionMode) {
          case ROOT_HTML_MODE:
          case HTML_MODE:
            return writeChunkAndReturn(destination, endSegmentHTML);
          case SVG_MODE:
            return writeChunkAndReturn(destination, endSegmentSVG);
          case MATHML_MODE:
            return writeChunkAndReturn(destination, endSegmentMathML);
          case HTML_TABLE_MODE:
            return writeChunkAndReturn(destination, endSegmentTable);
          case HTML_TABLE_BODY_MODE:
            return writeChunkAndReturn(destination, endSegmentTableBody);
          case HTML_TABLE_ROW_MODE:
            return writeChunkAndReturn(destination, endSegmentTableRow);
          case HTML_COLGROUP_MODE:
            return writeChunkAndReturn(destination, endSegmentColGroup);
          default:
            throw new Error("Unknown insertion mode. This is a bug in React.");
        }
      }
      var completeSegmentFunction = "function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)}", completeBoundaryFunction = 'function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}}', clientRenderFunction = 'function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())}', completeSegmentScript1Full = stringToPrecomputedChunk(completeSegmentFunction + ';$RS("'), completeSegmentScript1Partial = stringToPrecomputedChunk('$RS("'), completeSegmentScript2 = stringToPrecomputedChunk('","'), completeSegmentScript3 = stringToPrecomputedChunk('")</script>');
      function writeCompletedSegmentInstruction(destination, responseState, contentSegmentID) {
        writeChunk(destination, responseState.startInlineScript), responseState.sentCompleteSegmentFunction ? writeChunk(destination, completeSegmentScript1Partial) : (responseState.sentCompleteSegmentFunction = !0, writeChunk(destination, completeSegmentScript1Full)), writeChunk(destination, responseState.segmentPrefix);
        var formattedID = stringToChunk(contentSegmentID.toString(16));
        return writeChunk(destination, formattedID), writeChunk(destination, completeSegmentScript2), writeChunk(destination, responseState.placeholderPrefix), writeChunk(destination, formattedID), writeChunkAndReturn(destination, completeSegmentScript3);
      }
      var completeBoundaryScript1Full = stringToPrecomputedChunk(completeBoundaryFunction + ';$RC("'), completeBoundaryScript1Partial = stringToPrecomputedChunk('$RC("'), completeBoundaryScript2 = stringToPrecomputedChunk('","'), completeBoundaryScript3 = stringToPrecomputedChunk('")</script>');
      function writeCompletedBoundaryInstruction(destination, responseState, boundaryID, contentSegmentID) {
        if (writeChunk(destination, responseState.startInlineScript), responseState.sentCompleteBoundaryFunction ? writeChunk(destination, completeBoundaryScript1Partial) : (responseState.sentCompleteBoundaryFunction = !0, writeChunk(destination, completeBoundaryScript1Full)), boundaryID === null)
          throw new Error("An ID must have been assigned before we can complete the boundary.");
        var formattedContentID = stringToChunk(contentSegmentID.toString(16));
        return writeChunk(destination, boundaryID), writeChunk(destination, completeBoundaryScript2), writeChunk(destination, responseState.segmentPrefix), writeChunk(destination, formattedContentID), writeChunkAndReturn(destination, completeBoundaryScript3);
      }
      var clientRenderScript1Full = stringToPrecomputedChunk(clientRenderFunction + ';$RX("'), clientRenderScript1Partial = stringToPrecomputedChunk('$RX("'), clientRenderScript1A = stringToPrecomputedChunk('"'), clientRenderScript2 = stringToPrecomputedChunk(")</script>"), clientRenderErrorScriptArgInterstitial = stringToPrecomputedChunk(",");
      function writeClientRenderBoundaryInstruction(destination, responseState, boundaryID, errorDigest, errorMessage, errorComponentStack) {
        if (writeChunk(destination, responseState.startInlineScript), responseState.sentClientRenderFunction ? writeChunk(destination, clientRenderScript1Partial) : (responseState.sentClientRenderFunction = !0, writeChunk(destination, clientRenderScript1Full)), boundaryID === null)
          throw new Error("An ID must have been assigned before we can complete the boundary.");
        return writeChunk(destination, boundaryID), writeChunk(destination, clientRenderScript1A), (errorDigest || errorMessage || errorComponentStack) && (writeChunk(destination, clientRenderErrorScriptArgInterstitial), writeChunk(destination, stringToChunk(escapeJSStringsForInstructionScripts(errorDigest || "")))), (errorMessage || errorComponentStack) && (writeChunk(destination, clientRenderErrorScriptArgInterstitial), writeChunk(destination, stringToChunk(escapeJSStringsForInstructionScripts(errorMessage || "")))), errorComponentStack && (writeChunk(destination, clientRenderErrorScriptArgInterstitial), writeChunk(destination, stringToChunk(escapeJSStringsForInstructionScripts(errorComponentStack)))), writeChunkAndReturn(destination, clientRenderScript2);
      }
      var regexForJSStringsInScripts = /[<\u2028\u2029]/g;
      function escapeJSStringsForInstructionScripts(input) {
        var escaped = JSON.stringify(input);
        return escaped.replace(regexForJSStringsInScripts, function(match) {
          switch (match) {
            case "<":
              return "\\u003c";
            case "\u2028":
              return "\\u2028";
            case "\u2029":
              return "\\u2029";
            default:
              throw new Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
          }
        });
      }
      var assign = Object.assign, REACT_ELEMENT_TYPE = Symbol.for("react.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_PROVIDER_TYPE = Symbol.for("react.provider"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_SCOPE_TYPE = Symbol.for("react.scope"), REACT_DEBUG_TRACING_MODE_TYPE = Symbol.for("react.debug_trace_mode"), REACT_LEGACY_HIDDEN_TYPE = Symbol.for("react.legacy_hidden"), REACT_SERVER_CONTEXT_DEFAULT_VALUE_NOT_LOADED = Symbol.for("react.default_value"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        if (maybeIterable === null || typeof maybeIterable != "object")
          return null;
        var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
        return typeof maybeIterator == "function" ? maybeIterator : null;
      }
      function getWrappedName(outerType, innerType, wrapperName) {
        var displayName = outerType.displayName;
        if (displayName)
          return displayName;
        var functionName = innerType.displayName || innerType.name || "";
        return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
      }
      function getContextName(type) {
        return type.displayName || "Context";
      }
      function getComponentNameFromType(type) {
        if (type == null)
          return null;
        if (typeof type.tag == "number" && error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof type == "function")
          return type.displayName || type.name || null;
        if (typeof type == "string")
          return type;
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
        }
        if (typeof type == "object")
          switch (type.$$typeof) {
            case REACT_CONTEXT_TYPE:
              var context = type;
              return getContextName(context) + ".Consumer";
            case REACT_PROVIDER_TYPE:
              var provider = type;
              return getContextName(provider._context) + ".Provider";
            case REACT_FORWARD_REF_TYPE:
              return getWrappedName(type, type.render, "ForwardRef");
            case REACT_MEMO_TYPE:
              var outerName = type.displayName || null;
              return outerName !== null ? outerName : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE: {
              var lazyComponent = type, payload = lazyComponent._payload, init = lazyComponent._init;
              try {
                return getComponentNameFromType(init(payload));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var disabledDepth = 0, prevLog, prevInfo, prevWarn, prevError, prevGroup, prevGroupCollapsed, prevGroupEnd;
      function disabledLog() {
      }
      disabledLog.__reactDisabledLog = !0;
      function disableLogs() {
        {
          if (disabledDepth === 0) {
            prevLog = console.log, prevInfo = console.info, prevWarn = console.warn, prevError = console.error, prevGroup = console.group, prevGroupCollapsed = console.groupCollapsed, prevGroupEnd = console.groupEnd;
            var props = {
              configurable: !0,
              enumerable: !0,
              value: disabledLog,
              writable: !0
            };
            Object.defineProperties(console, {
              info: props,
              log: props,
              warn: props,
              error: props,
              group: props,
              groupCollapsed: props,
              groupEnd: props
            });
          }
          disabledDepth++;
        }
      }
      function reenableLogs() {
        {
          if (disabledDepth--, disabledDepth === 0) {
            var props = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: assign({}, props, {
                value: prevLog
              }),
              info: assign({}, props, {
                value: prevInfo
              }),
              warn: assign({}, props, {
                value: prevWarn
              }),
              error: assign({}, props, {
                value: prevError
              }),
              group: assign({}, props, {
                value: prevGroup
              }),
              groupCollapsed: assign({}, props, {
                value: prevGroupCollapsed
              }),
              groupEnd: assign({}, props, {
                value: prevGroupEnd
              })
            });
          }
          disabledDepth < 0 && error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher, prefix;
      function describeBuiltInComponentFrame(name, source, ownerFn) {
        {
          if (prefix === void 0)
            try {
              throw Error();
            } catch (x) {
              var match = x.stack.trim().match(/\n( *(at )?)/);
              prefix = match && match[1] || "";
            }
          return `
` + prefix + name;
        }
      }
      var reentry = !1, componentFrameCache;
      {
        var PossiblyWeakMap = typeof WeakMap == "function" ? WeakMap : Map;
        componentFrameCache = new PossiblyWeakMap();
      }
      function describeNativeComponentFrame(fn, construct) {
        if (!fn || reentry)
          return "";
        {
          var frame = componentFrameCache.get(fn);
          if (frame !== void 0)
            return frame;
        }
        var control;
        reentry = !0;
        var previousPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var previousDispatcher;
        previousDispatcher = ReactCurrentDispatcher.current, ReactCurrentDispatcher.current = null, disableLogs();
        try {
          if (construct) {
            var Fake = function() {
              throw Error();
            };
            if (Object.defineProperty(Fake.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(Fake, []);
              } catch (x) {
                control = x;
              }
              Reflect.construct(fn, [], Fake);
            } else {
              try {
                Fake.call();
              } catch (x) {
                control = x;
              }
              fn.call(Fake.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (x) {
              control = x;
            }
            fn();
          }
        } catch (sample) {
          if (sample && control && typeof sample.stack == "string") {
            for (var sampleLines = sample.stack.split(`
`), controlLines = control.stack.split(`
`), s = sampleLines.length - 1, c = controlLines.length - 1; s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]; )
              c--;
            for (; s >= 1 && c >= 0; s--, c--)
              if (sampleLines[s] !== controlLines[c]) {
                if (s !== 1 || c !== 1)
                  do
                    if (s--, c--, c < 0 || sampleLines[s] !== controlLines[c]) {
                      var _frame = `
` + sampleLines[s].replace(" at new ", " at ");
                      return fn.displayName && _frame.includes("<anonymous>") && (_frame = _frame.replace("<anonymous>", fn.displayName)), typeof fn == "function" && componentFrameCache.set(fn, _frame), _frame;
                    }
                  while (s >= 1 && c >= 0);
                break;
              }
          }
        } finally {
          reentry = !1, ReactCurrentDispatcher.current = previousDispatcher, reenableLogs(), Error.prepareStackTrace = previousPrepareStackTrace;
        }
        var name = fn ? fn.displayName || fn.name : "", syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
        return typeof fn == "function" && componentFrameCache.set(fn, syntheticFrame), syntheticFrame;
      }
      function describeClassComponentFrame(ctor, source, ownerFn) {
        return describeNativeComponentFrame(ctor, !0);
      }
      function describeFunctionComponentFrame(fn, source, ownerFn) {
        return describeNativeComponentFrame(fn, !1);
      }
      function shouldConstruct(Component2) {
        var prototype = Component2.prototype;
        return !!(prototype && prototype.isReactComponent);
      }
      function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
        if (type == null)
          return "";
        if (typeof type == "function")
          return describeNativeComponentFrame(type, shouldConstruct(type));
        if (typeof type == "string")
          return describeBuiltInComponentFrame(type);
        switch (type) {
          case REACT_SUSPENSE_TYPE:
            return describeBuiltInComponentFrame("Suspense");
          case REACT_SUSPENSE_LIST_TYPE:
            return describeBuiltInComponentFrame("SuspenseList");
        }
        if (typeof type == "object")
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE:
              return describeFunctionComponentFrame(type.render);
            case REACT_MEMO_TYPE:
              return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
            case REACT_LAZY_TYPE: {
              var lazyComponent = type, payload = lazyComponent._payload, init = lazyComponent._init;
              try {
                return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
              } catch {
              }
            }
          }
        return "";
      }
      var loggedTypeFailures = {}, ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement(element) {
        if (element) {
          var owner = element._owner, stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
          ReactDebugCurrentFrame.setExtraStackFrame(stack);
        } else
          ReactDebugCurrentFrame.setExtraStackFrame(null);
      }
      function checkPropTypes(typeSpecs, values, location2, componentName, element) {
        {
          var has = Function.call.bind(hasOwnProperty);
          for (var typeSpecName in typeSpecs)
            if (has(typeSpecs, typeSpecName)) {
              var error$1 = void 0;
              try {
                if (typeof typeSpecs[typeSpecName] != "function") {
                  var err = Error((componentName || "React class") + ": " + location2 + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw err.name = "Invariant Violation", err;
                }
                error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location2, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (ex) {
                error$1 = ex;
              }
              error$1 && !(error$1 instanceof Error) && (setCurrentlyValidatingElement(element), error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location2, typeSpecName, typeof error$1), setCurrentlyValidatingElement(null)), error$1 instanceof Error && !(error$1.message in loggedTypeFailures) && (loggedTypeFailures[error$1.message] = !0, setCurrentlyValidatingElement(element), error("Failed %s type: %s", location2, error$1.message), setCurrentlyValidatingElement(null));
            }
        }
      }
      var warnedAboutMissingGetChildContext;
      warnedAboutMissingGetChildContext = {};
      var emptyContextObject = {};
      Object.freeze(emptyContextObject);
      function getMaskedContext(type, unmaskedContext) {
        {
          var contextTypes = type.contextTypes;
          if (!contextTypes)
            return emptyContextObject;
          var context = {};
          for (var key in contextTypes)
            context[key] = unmaskedContext[key];
          {
            var name = getComponentNameFromType(type) || "Unknown";
            checkPropTypes(contextTypes, context, "context", name);
          }
          return context;
        }
      }
      function processChildContext(instance, type, parentContext, childContextTypes) {
        {
          if (typeof instance.getChildContext != "function") {
            {
              var componentName = getComponentNameFromType(type) || "Unknown";
              warnedAboutMissingGetChildContext[componentName] || (warnedAboutMissingGetChildContext[componentName] = !0, error("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", componentName, componentName));
            }
            return parentContext;
          }
          var childContext = instance.getChildContext();
          for (var contextKey in childContext)
            if (!(contextKey in childContextTypes))
              throw new Error((getComponentNameFromType(type) || "Unknown") + '.getChildContext(): key "' + contextKey + '" is not defined in childContextTypes.');
          {
            var name = getComponentNameFromType(type) || "Unknown";
            checkPropTypes(childContextTypes, childContext, "child context", name);
          }
          return assign({}, parentContext, childContext);
        }
      }
      var rendererSigil;
      rendererSigil = {};
      var rootContextSnapshot = null, currentActiveSnapshot = null;
      function popNode(prev) {
        prev.context._currentValue = prev.parentValue;
      }
      function pushNode(next) {
        next.context._currentValue = next.value;
      }
      function popToNearestCommonAncestor(prev, next) {
        if (prev !== next) {
          popNode(prev);
          var parentPrev = prev.parent, parentNext = next.parent;
          if (parentPrev === null) {
            if (parentNext !== null)
              throw new Error("The stacks must reach the root at the same time. This is a bug in React.");
          } else {
            if (parentNext === null)
              throw new Error("The stacks must reach the root at the same time. This is a bug in React.");
            popToNearestCommonAncestor(parentPrev, parentNext);
          }
          pushNode(next);
        }
      }
      function popAllPrevious(prev) {
        popNode(prev);
        var parentPrev = prev.parent;
        parentPrev !== null && popAllPrevious(parentPrev);
      }
      function pushAllNext(next) {
        var parentNext = next.parent;
        parentNext !== null && pushAllNext(parentNext), pushNode(next);
      }
      function popPreviousToCommonLevel(prev, next) {
        popNode(prev);
        var parentPrev = prev.parent;
        if (parentPrev === null)
          throw new Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
        parentPrev.depth === next.depth ? popToNearestCommonAncestor(parentPrev, next) : popPreviousToCommonLevel(parentPrev, next);
      }
      function popNextToCommonLevel(prev, next) {
        var parentNext = next.parent;
        if (parentNext === null)
          throw new Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
        prev.depth === parentNext.depth ? popToNearestCommonAncestor(prev, parentNext) : popNextToCommonLevel(prev, parentNext), pushNode(next);
      }
      function switchContext(newSnapshot) {
        var prev = currentActiveSnapshot, next = newSnapshot;
        prev !== next && (prev === null ? pushAllNext(next) : next === null ? popAllPrevious(prev) : prev.depth === next.depth ? popToNearestCommonAncestor(prev, next) : prev.depth > next.depth ? popPreviousToCommonLevel(prev, next) : popNextToCommonLevel(prev, next), currentActiveSnapshot = next);
      }
      function pushProvider(context, nextValue) {
        var prevValue;
        prevValue = context._currentValue, context._currentValue = nextValue, context._currentRenderer !== void 0 && context._currentRenderer !== null && context._currentRenderer !== rendererSigil && error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), context._currentRenderer = rendererSigil;
        var prevNode = currentActiveSnapshot, newNode = {
          parent: prevNode,
          depth: prevNode === null ? 0 : prevNode.depth + 1,
          context,
          parentValue: prevValue,
          value: nextValue
        };
        return currentActiveSnapshot = newNode, newNode;
      }
      function popProvider(context) {
        var prevSnapshot = currentActiveSnapshot;
        if (prevSnapshot === null)
          throw new Error("Tried to pop a Context at the root of the app. This is a bug in React.");
        prevSnapshot.context !== context && error("The parent context is not the expected context. This is probably a bug in React.");
        {
          var value = prevSnapshot.parentValue;
          value === REACT_SERVER_CONTEXT_DEFAULT_VALUE_NOT_LOADED ? prevSnapshot.context._currentValue = prevSnapshot.context._defaultValue : prevSnapshot.context._currentValue = value, context._currentRenderer !== void 0 && context._currentRenderer !== null && context._currentRenderer !== rendererSigil && error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), context._currentRenderer = rendererSigil;
        }
        return currentActiveSnapshot = prevSnapshot.parent;
      }
      function getActiveContext() {
        return currentActiveSnapshot;
      }
      function readContext(context) {
        var value = context._currentValue;
        return value;
      }
      function get(key) {
        return key._reactInternals;
      }
      function set(key, value) {
        key._reactInternals = value;
      }
      var didWarnAboutNoopUpdateForComponent = {}, didWarnAboutDeprecatedWillMount = {}, didWarnAboutUninitializedState, didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate, didWarnAboutLegacyLifecyclesAndDerivedState, didWarnAboutUndefinedDerivedState, warnOnUndefinedDerivedState, warnOnInvalidCallback, didWarnAboutDirectlyAssigningPropsToState, didWarnAboutContextTypeAndContextTypes, didWarnAboutInvalidateContextType;
      {
        didWarnAboutUninitializedState = /* @__PURE__ */ new Set(), didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate = /* @__PURE__ */ new Set(), didWarnAboutLegacyLifecyclesAndDerivedState = /* @__PURE__ */ new Set(), didWarnAboutDirectlyAssigningPropsToState = /* @__PURE__ */ new Set(), didWarnAboutUndefinedDerivedState = /* @__PURE__ */ new Set(), didWarnAboutContextTypeAndContextTypes = /* @__PURE__ */ new Set(), didWarnAboutInvalidateContextType = /* @__PURE__ */ new Set();
        var didWarnOnInvalidCallback = /* @__PURE__ */ new Set();
        warnOnInvalidCallback = function(callback, callerName) {
          if (!(callback === null || typeof callback == "function")) {
            var key = callerName + "_" + callback;
            didWarnOnInvalidCallback.has(key) || (didWarnOnInvalidCallback.add(key), error("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", callerName, callback));
          }
        }, warnOnUndefinedDerivedState = function(type, partialState) {
          if (partialState === void 0) {
            var componentName = getComponentNameFromType(type) || "Component";
            didWarnAboutUndefinedDerivedState.has(componentName) || (didWarnAboutUndefinedDerivedState.add(componentName), error("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", componentName));
          }
        };
      }
      function warnNoop(publicInstance, callerName) {
        {
          var _constructor = publicInstance.constructor, componentName = _constructor && getComponentNameFromType(_constructor) || "ReactClass", warningKey = componentName + "." + callerName;
          if (didWarnAboutNoopUpdateForComponent[warningKey])
            return;
          error(`%s(...): Can only update a mounting component. This usually means you called %s() outside componentWillMount() on the server. This is a no-op.

Please check the code for the %s component.`, callerName, callerName, componentName), didWarnAboutNoopUpdateForComponent[warningKey] = !0;
        }
      }
      var classComponentUpdater = {
        isMounted: function(inst) {
          return !1;
        },
        enqueueSetState: function(inst, payload, callback) {
          var internals = get(inst);
          internals.queue === null ? warnNoop(inst, "setState") : (internals.queue.push(payload), callback != null && warnOnInvalidCallback(callback, "setState"));
        },
        enqueueReplaceState: function(inst, payload, callback) {
          var internals = get(inst);
          internals.replace = !0, internals.queue = [payload], callback != null && warnOnInvalidCallback(callback, "setState");
        },
        enqueueForceUpdate: function(inst, callback) {
          var internals = get(inst);
          internals.queue === null ? warnNoop(inst, "forceUpdate") : callback != null && warnOnInvalidCallback(callback, "setState");
        }
      };
      function applyDerivedStateFromProps(instance, ctor, getDerivedStateFromProps, prevState, nextProps) {
        var partialState = getDerivedStateFromProps(nextProps, prevState);
        warnOnUndefinedDerivedState(ctor, partialState);
        var newState = partialState == null ? prevState : assign({}, prevState, partialState);
        return newState;
      }
      function constructClassInstance(ctor, props, maskedLegacyContext) {
        var context = emptyContextObject, contextType = ctor.contextType;
        if ("contextType" in ctor) {
          var isValid = (
            // Allow null for conditional declaration
            contextType === null || contextType !== void 0 && contextType.$$typeof === REACT_CONTEXT_TYPE && contextType._context === void 0
          );
          if (!isValid && !didWarnAboutInvalidateContextType.has(ctor)) {
            didWarnAboutInvalidateContextType.add(ctor);
            var addendum = "";
            contextType === void 0 ? addendum = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof contextType != "object" ? addendum = " However, it is set to a " + typeof contextType + "." : contextType.$$typeof === REACT_PROVIDER_TYPE ? addendum = " Did you accidentally pass the Context.Provider instead?" : contextType._context !== void 0 ? addendum = " Did you accidentally pass the Context.Consumer instead?" : addendum = " However, it is set to an object with keys {" + Object.keys(contextType).join(", ") + "}.", error("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", getComponentNameFromType(ctor) || "Component", addendum);
          }
        }
        typeof contextType == "object" && contextType !== null ? context = readContext(contextType) : context = maskedLegacyContext;
        var instance = new ctor(props, context);
        {
          if (typeof ctor.getDerivedStateFromProps == "function" && (instance.state === null || instance.state === void 0)) {
            var componentName = getComponentNameFromType(ctor) || "Component";
            didWarnAboutUninitializedState.has(componentName) || (didWarnAboutUninitializedState.add(componentName), error("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", componentName, instance.state === null ? "null" : "undefined", componentName));
          }
          if (typeof ctor.getDerivedStateFromProps == "function" || typeof instance.getSnapshotBeforeUpdate == "function") {
            var foundWillMountName = null, foundWillReceivePropsName = null, foundWillUpdateName = null;
            if (typeof instance.componentWillMount == "function" && instance.componentWillMount.__suppressDeprecationWarning !== !0 ? foundWillMountName = "componentWillMount" : typeof instance.UNSAFE_componentWillMount == "function" && (foundWillMountName = "UNSAFE_componentWillMount"), typeof instance.componentWillReceiveProps == "function" && instance.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? foundWillReceivePropsName = "componentWillReceiveProps" : typeof instance.UNSAFE_componentWillReceiveProps == "function" && (foundWillReceivePropsName = "UNSAFE_componentWillReceiveProps"), typeof instance.componentWillUpdate == "function" && instance.componentWillUpdate.__suppressDeprecationWarning !== !0 ? foundWillUpdateName = "componentWillUpdate" : typeof instance.UNSAFE_componentWillUpdate == "function" && (foundWillUpdateName = "UNSAFE_componentWillUpdate"), foundWillMountName !== null || foundWillReceivePropsName !== null || foundWillUpdateName !== null) {
              var _componentName = getComponentNameFromType(ctor) || "Component", newApiName = typeof ctor.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
              didWarnAboutLegacyLifecyclesAndDerivedState.has(_componentName) || (didWarnAboutLegacyLifecyclesAndDerivedState.add(_componentName), error(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, _componentName, newApiName, foundWillMountName !== null ? `
  ` + foundWillMountName : "", foundWillReceivePropsName !== null ? `
  ` + foundWillReceivePropsName : "", foundWillUpdateName !== null ? `
  ` + foundWillUpdateName : ""));
            }
          }
        }
        return instance;
      }
      function checkClassInstance(instance, ctor, newProps) {
        {
          var name = getComponentNameFromType(ctor) || "Component", renderPresent = instance.render;
          renderPresent || (ctor.prototype && typeof ctor.prototype.render == "function" ? error("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", name) : error("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", name)), instance.getInitialState && !instance.getInitialState.isReactClassApproved && !instance.state && error("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", name), instance.getDefaultProps && !instance.getDefaultProps.isReactClassApproved && error("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", name), instance.propTypes && error("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", name), instance.contextType && error("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", name), instance.contextTypes && error("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", name), ctor.contextType && ctor.contextTypes && !didWarnAboutContextTypeAndContextTypes.has(ctor) && (didWarnAboutContextTypeAndContextTypes.add(ctor), error("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", name)), typeof instance.componentShouldUpdate == "function" && error("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", name), ctor.prototype && ctor.prototype.isPureReactComponent && typeof instance.shouldComponentUpdate < "u" && error("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", getComponentNameFromType(ctor) || "A pure component"), typeof instance.componentDidUnmount == "function" && error("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", name), typeof instance.componentDidReceiveProps == "function" && error("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", name), typeof instance.componentWillRecieveProps == "function" && error("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", name), typeof instance.UNSAFE_componentWillRecieveProps == "function" && error("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", name);
          var hasMutatedProps = instance.props !== newProps;
          instance.props !== void 0 && hasMutatedProps && error("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", name, name), instance.defaultProps && error("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", name, name), typeof instance.getSnapshotBeforeUpdate == "function" && typeof instance.componentDidUpdate != "function" && !didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.has(ctor) && (didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.add(ctor), error("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", getComponentNameFromType(ctor))), typeof instance.getDerivedStateFromProps == "function" && error("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", name), typeof instance.getDerivedStateFromError == "function" && error("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", name), typeof ctor.getSnapshotBeforeUpdate == "function" && error("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", name);
          var _state = instance.state;
          _state && (typeof _state != "object" || isArray(_state)) && error("%s.state: must be set to an object or null", name), typeof instance.getChildContext == "function" && typeof ctor.childContextTypes != "object" && error("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", name);
        }
      }
      function callComponentWillMount(type, instance) {
        var oldState = instance.state;
        if (typeof instance.componentWillMount == "function") {
          if (instance.componentWillMount.__suppressDeprecationWarning !== !0) {
            var componentName = getComponentNameFromType(type) || "Unknown";
            didWarnAboutDeprecatedWillMount[componentName] || (warn(
              // keep this warning in sync with ReactStrictModeWarning.js
              `componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code from componentWillMount to componentDidMount (preferred in most cases) or the constructor.

Please update the following components: %s`,
              componentName
            ), didWarnAboutDeprecatedWillMount[componentName] = !0);
          }
          instance.componentWillMount();
        }
        typeof instance.UNSAFE_componentWillMount == "function" && instance.UNSAFE_componentWillMount(), oldState !== instance.state && (error("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", getComponentNameFromType(type) || "Component"), classComponentUpdater.enqueueReplaceState(instance, instance.state, null));
      }
      function processUpdateQueue(internalInstance, inst, props, maskedLegacyContext) {
        if (internalInstance.queue !== null && internalInstance.queue.length > 0) {
          var oldQueue = internalInstance.queue, oldReplace = internalInstance.replace;
          if (internalInstance.queue = null, internalInstance.replace = !1, oldReplace && oldQueue.length === 1)
            inst.state = oldQueue[0];
          else {
            for (var nextState = oldReplace ? oldQueue[0] : inst.state, dontMutate = !0, i = oldReplace ? 1 : 0; i < oldQueue.length; i++) {
              var partial = oldQueue[i], partialState = typeof partial == "function" ? partial.call(inst, nextState, props, maskedLegacyContext) : partial;
              partialState != null && (dontMutate ? (dontMutate = !1, nextState = assign({}, nextState, partialState)) : assign(nextState, partialState));
            }
            inst.state = nextState;
          }
        } else
          internalInstance.queue = null;
      }
      function mountClassInstance(instance, ctor, newProps, maskedLegacyContext) {
        checkClassInstance(instance, ctor, newProps);
        var initialState = instance.state !== void 0 ? instance.state : null;
        instance.updater = classComponentUpdater, instance.props = newProps, instance.state = initialState;
        var internalInstance = {
          queue: [],
          replace: !1
        };
        set(instance, internalInstance);
        var contextType = ctor.contextType;
        if (typeof contextType == "object" && contextType !== null ? instance.context = readContext(contextType) : instance.context = maskedLegacyContext, instance.state === newProps) {
          var componentName = getComponentNameFromType(ctor) || "Component";
          didWarnAboutDirectlyAssigningPropsToState.has(componentName) || (didWarnAboutDirectlyAssigningPropsToState.add(componentName), error("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", componentName));
        }
        var getDerivedStateFromProps = ctor.getDerivedStateFromProps;
        typeof getDerivedStateFromProps == "function" && (instance.state = applyDerivedStateFromProps(instance, ctor, getDerivedStateFromProps, initialState, newProps)), typeof ctor.getDerivedStateFromProps != "function" && typeof instance.getSnapshotBeforeUpdate != "function" && (typeof instance.UNSAFE_componentWillMount == "function" || typeof instance.componentWillMount == "function") && (callComponentWillMount(ctor, instance), processUpdateQueue(internalInstance, instance, newProps, maskedLegacyContext));
      }
      var emptyTreeContext = {
        id: 1,
        overflow: ""
      };
      function getTreeId(context) {
        var overflow = context.overflow, idWithLeadingBit = context.id, id = idWithLeadingBit & ~getLeadingBit(idWithLeadingBit);
        return id.toString(32) + overflow;
      }
      function pushTreeContext(baseContext, totalChildren, index) {
        var baseIdWithLeadingBit = baseContext.id, baseOverflow = baseContext.overflow, baseLength = getBitLength(baseIdWithLeadingBit) - 1, baseId = baseIdWithLeadingBit & ~(1 << baseLength), slot = index + 1, length = getBitLength(totalChildren) + baseLength;
        if (length > 30) {
          var numberOfOverflowBits = baseLength - baseLength % 5, newOverflowBits = (1 << numberOfOverflowBits) - 1, newOverflow = (baseId & newOverflowBits).toString(32), restOfBaseId = baseId >> numberOfOverflowBits, restOfBaseLength = baseLength - numberOfOverflowBits, restOfLength = getBitLength(totalChildren) + restOfBaseLength, restOfNewBits = slot << restOfBaseLength, id = restOfNewBits | restOfBaseId, overflow = newOverflow + baseOverflow;
          return {
            id: 1 << restOfLength | id,
            overflow
          };
        } else {
          var newBits = slot << baseLength, _id = newBits | baseId, _overflow = baseOverflow;
          return {
            id: 1 << length | _id,
            overflow: _overflow
          };
        }
      }
      function getBitLength(number) {
        return 32 - clz32(number);
      }
      function getLeadingBit(id) {
        return 1 << getBitLength(id) - 1;
      }
      var clz32 = Math.clz32 ? Math.clz32 : clz32Fallback, log = Math.log, LN2 = Math.LN2;
      function clz32Fallback(x) {
        var asUint = x >>> 0;
        return asUint === 0 ? 32 : 31 - (log(asUint) / LN2 | 0) | 0;
      }
      function is(x, y) {
        return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
      }
      var objectIs = typeof Object.is == "function" ? Object.is : is, currentlyRenderingComponent = null, currentlyRenderingTask = null, firstWorkInProgressHook = null, workInProgressHook = null, isReRender = !1, didScheduleRenderPhaseUpdate = !1, localIdCounter = 0, renderPhaseUpdates = null, numberOfReRenders = 0, RE_RENDER_LIMIT = 25, isInHookUserCodeInDev = !1, currentHookNameInDev;
      function resolveCurrentlyRenderingComponent() {
        if (currentlyRenderingComponent === null)
          throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
        return isInHookUserCodeInDev && error("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks"), currentlyRenderingComponent;
      }
      function areHookInputsEqual(nextDeps, prevDeps) {
        if (prevDeps === null)
          return error("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", currentHookNameInDev), !1;
        nextDeps.length !== prevDeps.length && error(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, currentHookNameInDev, "[" + nextDeps.join(", ") + "]", "[" + prevDeps.join(", ") + "]");
        for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++)
          if (!objectIs(nextDeps[i], prevDeps[i]))
            return !1;
        return !0;
      }
      function createHook() {
        if (numberOfReRenders > 0)
          throw new Error("Rendered more hooks than during the previous render");
        return {
          memoizedState: null,
          queue: null,
          next: null
        };
      }
      function createWorkInProgressHook() {
        return workInProgressHook === null ? firstWorkInProgressHook === null ? (isReRender = !1, firstWorkInProgressHook = workInProgressHook = createHook()) : (isReRender = !0, workInProgressHook = firstWorkInProgressHook) : workInProgressHook.next === null ? (isReRender = !1, workInProgressHook = workInProgressHook.next = createHook()) : (isReRender = !0, workInProgressHook = workInProgressHook.next), workInProgressHook;
      }
      function prepareToUseHooks(task, componentIdentity) {
        currentlyRenderingComponent = componentIdentity, currentlyRenderingTask = task, isInHookUserCodeInDev = !1, localIdCounter = 0;
      }
      function finishHooks(Component2, props, children, refOrContext) {
        for (; didScheduleRenderPhaseUpdate; )
          didScheduleRenderPhaseUpdate = !1, localIdCounter = 0, numberOfReRenders += 1, workInProgressHook = null, children = Component2(props, refOrContext);
        return resetHooksState(), children;
      }
      function checkDidRenderIdHook() {
        var didRenderIdHook = localIdCounter !== 0;
        return didRenderIdHook;
      }
      function resetHooksState() {
        isInHookUserCodeInDev = !1, currentlyRenderingComponent = null, currentlyRenderingTask = null, didScheduleRenderPhaseUpdate = !1, firstWorkInProgressHook = null, numberOfReRenders = 0, renderPhaseUpdates = null, workInProgressHook = null;
      }
      function readContext$1(context) {
        return isInHookUserCodeInDev && error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."), readContext(context);
      }
      function useContext5(context) {
        return currentHookNameInDev = "useContext", resolveCurrentlyRenderingComponent(), readContext(context);
      }
      function basicStateReducer(state, action) {
        return typeof action == "function" ? action(state) : action;
      }
      function useState6(initialState) {
        return currentHookNameInDev = "useState", useReducer(
          basicStateReducer,
          // useReducer has a special case to support lazy useState initializers
          initialState
        );
      }
      function useReducer(reducer, initialArg, init) {
        if (reducer !== basicStateReducer && (currentHookNameInDev = "useReducer"), currentlyRenderingComponent = resolveCurrentlyRenderingComponent(), workInProgressHook = createWorkInProgressHook(), isReRender) {
          var queue = workInProgressHook.queue, dispatch = queue.dispatch;
          if (renderPhaseUpdates !== null) {
            var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);
            if (firstRenderPhaseUpdate !== void 0) {
              renderPhaseUpdates.delete(queue);
              var newState = workInProgressHook.memoizedState, update = firstRenderPhaseUpdate;
              do {
                var action = update.action;
                isInHookUserCodeInDev = !0, newState = reducer(newState, action), isInHookUserCodeInDev = !1, update = update.next;
              } while (update !== null);
              return workInProgressHook.memoizedState = newState, [newState, dispatch];
            }
          }
          return [workInProgressHook.memoizedState, dispatch];
        } else {
          isInHookUserCodeInDev = !0;
          var initialState;
          reducer === basicStateReducer ? initialState = typeof initialArg == "function" ? initialArg() : initialArg : initialState = init !== void 0 ? init(initialArg) : initialArg, isInHookUserCodeInDev = !1, workInProgressHook.memoizedState = initialState;
          var _queue = workInProgressHook.queue = {
            last: null,
            dispatch: null
          }, _dispatch = _queue.dispatch = dispatchAction.bind(null, currentlyRenderingComponent, _queue);
          return [workInProgressHook.memoizedState, _dispatch];
        }
      }
      function useMemo5(nextCreate, deps) {
        currentlyRenderingComponent = resolveCurrentlyRenderingComponent(), workInProgressHook = createWorkInProgressHook();
        var nextDeps = deps === void 0 ? null : deps;
        if (workInProgressHook !== null) {
          var prevState = workInProgressHook.memoizedState;
          if (prevState !== null && nextDeps !== null) {
            var prevDeps = prevState[1];
            if (areHookInputsEqual(nextDeps, prevDeps))
              return prevState[0];
          }
        }
        isInHookUserCodeInDev = !0;
        var nextValue = nextCreate();
        return isInHookUserCodeInDev = !1, workInProgressHook.memoizedState = [nextValue, nextDeps], nextValue;
      }
      function useRef5(initialValue) {
        currentlyRenderingComponent = resolveCurrentlyRenderingComponent(), workInProgressHook = createWorkInProgressHook();
        var previousRef = workInProgressHook.memoizedState;
        if (previousRef === null) {
          var ref = {
            current: initialValue
          };
          return Object.seal(ref), workInProgressHook.memoizedState = ref, ref;
        } else
          return previousRef;
      }
      function useLayoutEffect3(create, inputs) {
        currentHookNameInDev = "useLayoutEffect", error("useLayoutEffect does nothing on the server, because its effect cannot be encoded into the server renderer's output format. This will lead to a mismatch between the initial, non-hydrated UI and the intended UI. To avoid this, useLayoutEffect should only be used in components that render exclusively on the client. See https://reactjs.org/link/uselayouteffect-ssr for common fixes.");
      }
      function dispatchAction(componentIdentity, queue, action) {
        if (numberOfReRenders >= RE_RENDER_LIMIT)
          throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
        if (componentIdentity === currentlyRenderingComponent) {
          didScheduleRenderPhaseUpdate = !0;
          var update = {
            action,
            next: null
          };
          renderPhaseUpdates === null && (renderPhaseUpdates = /* @__PURE__ */ new Map());
          var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);
          if (firstRenderPhaseUpdate === void 0)
            renderPhaseUpdates.set(queue, update);
          else {
            for (var lastRenderPhaseUpdate = firstRenderPhaseUpdate; lastRenderPhaseUpdate.next !== null; )
              lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
            lastRenderPhaseUpdate.next = update;
          }
        }
      }
      function useCallback3(callback, deps) {
        return useMemo5(function() {
          return callback;
        }, deps);
      }
      function useMutableSource(source, getSnapshot, subscribe) {
        return resolveCurrentlyRenderingComponent(), getSnapshot(source._source);
      }
      function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
        if (getServerSnapshot === void 0)
          throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        return getServerSnapshot();
      }
      function useDeferredValue(value) {
        return resolveCurrentlyRenderingComponent(), value;
      }
      function unsupportedStartTransition() {
        throw new Error("startTransition cannot be called during server rendering.");
      }
      function useTransition2() {
        return resolveCurrentlyRenderingComponent(), [!1, unsupportedStartTransition];
      }
      function useId() {
        var task = currentlyRenderingTask, treeId = getTreeId(task.treeContext), responseState = currentResponseState;
        if (responseState === null)
          throw new Error("Invalid hook call. Hooks can only be called inside of the body of a function component.");
        var localId = localIdCounter++;
        return makeId(responseState, treeId, localId);
      }
      function noop() {
      }
      var Dispatcher = {
        readContext: readContext$1,
        useContext: useContext5,
        useMemo: useMemo5,
        useReducer,
        useRef: useRef5,
        useState: useState6,
        useInsertionEffect: noop,
        useLayoutEffect: useLayoutEffect3,
        useCallback: useCallback3,
        // useImperativeHandle is not run in the server environment
        useImperativeHandle: noop,
        // Effects are not run in the server environment.
        useEffect: noop,
        // Debugging effect
        useDebugValue: noop,
        useDeferredValue,
        useTransition: useTransition2,
        useId,
        // Subscriptions are not setup in a server environment.
        useMutableSource,
        useSyncExternalStore
      }, currentResponseState = null;
      function setCurrentResponseState(responseState) {
        currentResponseState = responseState;
      }
      function getStackByComponentStackNode(componentStack) {
        try {
          var info = "", node = componentStack;
          do {
            switch (node.tag) {
              case 0:
                info += describeBuiltInComponentFrame(node.type, null, null);
                break;
              case 1:
                info += describeFunctionComponentFrame(node.type, null, null);
                break;
              case 2:
                info += describeClassComponentFrame(node.type, null, null);
                break;
            }
            node = node.parent;
          } while (node);
          return info;
        } catch (x) {
          return `
Error generating stack: ` + x.message + `
` + x.stack;
        }
      }
      var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher, ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame, PENDING = 0, COMPLETED = 1, FLUSHED = 2, ABORTED = 3, ERRORED = 4, OPEN = 0, CLOSING = 1, CLOSED = 2, DEFAULT_PROGRESSIVE_CHUNK_SIZE = 12800;
      function defaultErrorHandler(error2) {
        return console.error(error2), null;
      }
      function noop$1() {
      }
      function createRequest(children, responseState, rootFormatContext, progressiveChunkSize, onError, onAllReady, onShellReady, onShellError, onFatalError) {
        var pingedTasks = [], abortSet = /* @__PURE__ */ new Set(), request = {
          destination: null,
          responseState,
          progressiveChunkSize: progressiveChunkSize === void 0 ? DEFAULT_PROGRESSIVE_CHUNK_SIZE : progressiveChunkSize,
          status: OPEN,
          fatalError: null,
          nextSegmentId: 0,
          allPendingTasks: 0,
          pendingRootTasks: 0,
          completedRootSegment: null,
          abortableTasks: abortSet,
          pingedTasks,
          clientRenderedBoundaries: [],
          completedBoundaries: [],
          partialBoundaries: [],
          onError: onError === void 0 ? defaultErrorHandler : onError,
          onAllReady: onAllReady === void 0 ? noop$1 : onAllReady,
          onShellReady: onShellReady === void 0 ? noop$1 : onShellReady,
          onShellError: onShellError === void 0 ? noop$1 : onShellError,
          onFatalError: onFatalError === void 0 ? noop$1 : onFatalError
        }, rootSegment = createPendingSegment(
          request,
          0,
          null,
          rootFormatContext,
          // Root segments are never embedded in Text on either edge
          !1,
          !1
        );
        rootSegment.parentFlushed = !0;
        var rootTask = createTask(request, children, null, rootSegment, abortSet, emptyContextObject, rootContextSnapshot, emptyTreeContext);
        return pingedTasks.push(rootTask), request;
      }
      function pingTask(request, task) {
        var pingedTasks = request.pingedTasks;
        pingedTasks.push(task), pingedTasks.length === 1 && scheduleWork(function() {
          return performWork(request);
        });
      }
      function createSuspenseBoundary(request, fallbackAbortableTasks) {
        return {
          id: UNINITIALIZED_SUSPENSE_BOUNDARY_ID,
          rootSegmentID: -1,
          parentFlushed: !1,
          pendingTasks: 0,
          forceClientRender: !1,
          completedSegments: [],
          byteSize: 0,
          fallbackAbortableTasks,
          errorDigest: null
        };
      }
      function createTask(request, node, blockedBoundary, blockedSegment, abortSet, legacyContext, context, treeContext) {
        request.allPendingTasks++, blockedBoundary === null ? request.pendingRootTasks++ : blockedBoundary.pendingTasks++;
        var task = {
          node,
          ping: function() {
            return pingTask(request, task);
          },
          blockedBoundary,
          blockedSegment,
          abortSet,
          legacyContext,
          context,
          treeContext
        };
        return task.componentStack = null, abortSet.add(task), task;
      }
      function createPendingSegment(request, index, boundary, formatContext, lastPushedText, textEmbedded) {
        return {
          status: PENDING,
          id: -1,
          // lazily assigned later
          index,
          parentFlushed: !1,
          chunks: [],
          children: [],
          formatContext,
          boundary,
          lastPushedText,
          textEmbedded
        };
      }
      var currentTaskInDEV = null;
      function getCurrentStackInDEV() {
        return currentTaskInDEV === null || currentTaskInDEV.componentStack === null ? "" : getStackByComponentStackNode(currentTaskInDEV.componentStack);
      }
      function pushBuiltInComponentStackInDEV(task, type) {
        task.componentStack = {
          tag: 0,
          parent: task.componentStack,
          type
        };
      }
      function pushFunctionComponentStackInDEV(task, type) {
        task.componentStack = {
          tag: 1,
          parent: task.componentStack,
          type
        };
      }
      function pushClassComponentStackInDEV(task, type) {
        task.componentStack = {
          tag: 2,
          parent: task.componentStack,
          type
        };
      }
      function popComponentStackInDEV(task) {
        task.componentStack === null ? error("Unexpectedly popped too many stack frames. This is a bug in React.") : task.componentStack = task.componentStack.parent;
      }
      var lastBoundaryErrorComponentStackDev = null;
      function captureBoundaryErrorDetailsDev(boundary, error2) {
        {
          var errorMessage;
          typeof error2 == "string" ? errorMessage = error2 : error2 && typeof error2.message == "string" ? errorMessage = error2.message : errorMessage = String(error2);
          var errorComponentStack = lastBoundaryErrorComponentStackDev || getCurrentStackInDEV();
          lastBoundaryErrorComponentStackDev = null, boundary.errorMessage = errorMessage, boundary.errorComponentStack = errorComponentStack;
        }
      }
      function logRecoverableError(request, error2) {
        var errorDigest = request.onError(error2);
        if (errorDigest != null && typeof errorDigest != "string")
          throw new Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof errorDigest + '" instead');
        return errorDigest;
      }
      function fatalError(request, error2) {
        var onShellError = request.onShellError;
        onShellError(error2);
        var onFatalError = request.onFatalError;
        onFatalError(error2), request.destination !== null ? (request.status = CLOSED, closeWithError(request.destination, error2)) : (request.status = CLOSING, request.fatalError = error2);
      }
      function renderSuspenseBoundary(request, task, props) {
        pushBuiltInComponentStackInDEV(task, "Suspense");
        var parentBoundary = task.blockedBoundary, parentSegment = task.blockedSegment, fallback = props.fallback, content = props.children, fallbackAbortSet = /* @__PURE__ */ new Set(), newBoundary = createSuspenseBoundary(request, fallbackAbortSet), insertionIndex = parentSegment.chunks.length, boundarySegment = createPendingSegment(
          request,
          insertionIndex,
          newBoundary,
          parentSegment.formatContext,
          // boundaries never require text embedding at their edges because comment nodes bound them
          !1,
          !1
        );
        parentSegment.children.push(boundarySegment), parentSegment.lastPushedText = !1;
        var contentRootSegment = createPendingSegment(
          request,
          0,
          null,
          parentSegment.formatContext,
          // boundaries never require text embedding at their edges because comment nodes bound them
          !1,
          !1
        );
        contentRootSegment.parentFlushed = !0, task.blockedBoundary = newBoundary, task.blockedSegment = contentRootSegment;
        try {
          if (renderNode(request, task, content), pushSegmentFinale(contentRootSegment.chunks, request.responseState, contentRootSegment.lastPushedText, contentRootSegment.textEmbedded), contentRootSegment.status = COMPLETED, queueCompletedSegment(newBoundary, contentRootSegment), newBoundary.pendingTasks === 0) {
            popComponentStackInDEV(task);
            return;
          }
        } catch (error2) {
          contentRootSegment.status = ERRORED, newBoundary.forceClientRender = !0, newBoundary.errorDigest = logRecoverableError(request, error2), captureBoundaryErrorDetailsDev(newBoundary, error2);
        } finally {
          task.blockedBoundary = parentBoundary, task.blockedSegment = parentSegment;
        }
        var suspendedFallbackTask = createTask(request, fallback, parentBoundary, boundarySegment, fallbackAbortSet, task.legacyContext, task.context, task.treeContext);
        suspendedFallbackTask.componentStack = task.componentStack, request.pingedTasks.push(suspendedFallbackTask), popComponentStackInDEV(task);
      }
      function renderHostElement(request, task, type, props) {
        pushBuiltInComponentStackInDEV(task, type);
        var segment = task.blockedSegment, children = pushStartInstance(segment.chunks, type, props, request.responseState, segment.formatContext);
        segment.lastPushedText = !1;
        var prevContext = segment.formatContext;
        segment.formatContext = getChildFormatContext(prevContext, type, props), renderNode(request, task, children), segment.formatContext = prevContext, pushEndInstance(segment.chunks, type), segment.lastPushedText = !1, popComponentStackInDEV(task);
      }
      function shouldConstruct$1(Component2) {
        return Component2.prototype && Component2.prototype.isReactComponent;
      }
      function renderWithHooks(request, task, Component2, props, secondArg) {
        var componentIdentity = {};
        prepareToUseHooks(task, componentIdentity);
        var result = Component2(props, secondArg);
        return finishHooks(Component2, props, result, secondArg);
      }
      function finishClassComponent(request, task, instance, Component2, props) {
        var nextChildren = instance.render();
        instance.props !== props && (didWarnAboutReassigningProps || error("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", getComponentNameFromType(Component2) || "a component"), didWarnAboutReassigningProps = !0);
        {
          var childContextTypes = Component2.childContextTypes;
          if (childContextTypes != null) {
            var previousContext = task.legacyContext, mergedContext = processChildContext(instance, Component2, previousContext, childContextTypes);
            task.legacyContext = mergedContext, renderNodeDestructive(request, task, nextChildren), task.legacyContext = previousContext;
            return;
          }
        }
        renderNodeDestructive(request, task, nextChildren);
      }
      function renderClassComponent(request, task, Component2, props) {
        pushClassComponentStackInDEV(task, Component2);
        var maskedContext = getMaskedContext(Component2, task.legacyContext), instance = constructClassInstance(Component2, props, maskedContext);
        mountClassInstance(instance, Component2, props, maskedContext), finishClassComponent(request, task, instance, Component2, props), popComponentStackInDEV(task);
      }
      var didWarnAboutBadClass = {}, didWarnAboutModulePatternComponent = {}, didWarnAboutContextTypeOnFunctionComponent = {}, didWarnAboutGetDerivedStateOnFunctionComponent = {}, didWarnAboutReassigningProps = !1, didWarnAboutGenerators = !1, didWarnAboutMaps = !1, hasWarnedAboutUsingContextAsConsumer = !1;
      function renderIndeterminateComponent(request, task, Component2, props) {
        var legacyContext;
        if (legacyContext = getMaskedContext(Component2, task.legacyContext), pushFunctionComponentStackInDEV(task, Component2), Component2.prototype && typeof Component2.prototype.render == "function") {
          var componentName = getComponentNameFromType(Component2) || "Unknown";
          didWarnAboutBadClass[componentName] || (error("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", componentName, componentName), didWarnAboutBadClass[componentName] = !0);
        }
        var value = renderWithHooks(request, task, Component2, props, legacyContext), hasId = checkDidRenderIdHook();
        if (typeof value == "object" && value !== null && typeof value.render == "function" && value.$$typeof === void 0) {
          var _componentName = getComponentNameFromType(Component2) || "Unknown";
          didWarnAboutModulePatternComponent[_componentName] || (error("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", _componentName, _componentName, _componentName), didWarnAboutModulePatternComponent[_componentName] = !0);
        }
        if (
          // Run these checks in production only if the flag is off.
          // Eventually we'll delete this branch altogether.
          typeof value == "object" && value !== null && typeof value.render == "function" && value.$$typeof === void 0
        ) {
          {
            var _componentName2 = getComponentNameFromType(Component2) || "Unknown";
            didWarnAboutModulePatternComponent[_componentName2] || (error("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", _componentName2, _componentName2, _componentName2), didWarnAboutModulePatternComponent[_componentName2] = !0);
          }
          mountClassInstance(value, Component2, props, legacyContext), finishClassComponent(request, task, value, Component2, props);
        } else if (validateFunctionComponentInDev(Component2), hasId) {
          var prevTreeContext = task.treeContext, totalChildren = 1, index = 0;
          task.treeContext = pushTreeContext(prevTreeContext, totalChildren, index);
          try {
            renderNodeDestructive(request, task, value);
          } finally {
            task.treeContext = prevTreeContext;
          }
        } else
          renderNodeDestructive(request, task, value);
        popComponentStackInDEV(task);
      }
      function validateFunctionComponentInDev(Component2) {
        {
          if (Component2 && Component2.childContextTypes && error("%s(...): childContextTypes cannot be defined on a function component.", Component2.displayName || Component2.name || "Component"), typeof Component2.getDerivedStateFromProps == "function") {
            var _componentName3 = getComponentNameFromType(Component2) || "Unknown";
            didWarnAboutGetDerivedStateOnFunctionComponent[_componentName3] || (error("%s: Function components do not support getDerivedStateFromProps.", _componentName3), didWarnAboutGetDerivedStateOnFunctionComponent[_componentName3] = !0);
          }
          if (typeof Component2.contextType == "object" && Component2.contextType !== null) {
            var _componentName4 = getComponentNameFromType(Component2) || "Unknown";
            didWarnAboutContextTypeOnFunctionComponent[_componentName4] || (error("%s: Function components do not support contextType.", _componentName4), didWarnAboutContextTypeOnFunctionComponent[_componentName4] = !0);
          }
        }
      }
      function resolveDefaultProps(Component2, baseProps) {
        if (Component2 && Component2.defaultProps) {
          var props = assign({}, baseProps), defaultProps = Component2.defaultProps;
          for (var propName in defaultProps)
            props[propName] === void 0 && (props[propName] = defaultProps[propName]);
          return props;
        }
        return baseProps;
      }
      function renderForwardRef(request, task, type, props, ref) {
        pushFunctionComponentStackInDEV(task, type.render);
        var children = renderWithHooks(request, task, type.render, props, ref), hasId = checkDidRenderIdHook();
        if (hasId) {
          var prevTreeContext = task.treeContext, totalChildren = 1, index = 0;
          task.treeContext = pushTreeContext(prevTreeContext, totalChildren, index);
          try {
            renderNodeDestructive(request, task, children);
          } finally {
            task.treeContext = prevTreeContext;
          }
        } else
          renderNodeDestructive(request, task, children);
        popComponentStackInDEV(task);
      }
      function renderMemo(request, task, type, props, ref) {
        var innerType = type.type, resolvedProps = resolveDefaultProps(innerType, props);
        renderElement(request, task, innerType, resolvedProps, ref);
      }
      function renderContextConsumer(request, task, context, props) {
        context._context === void 0 ? context !== context.Consumer && (hasWarnedAboutUsingContextAsConsumer || (hasWarnedAboutUsingContextAsConsumer = !0, error("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : context = context._context;
        var render = props.children;
        typeof render != "function" && error("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it.");
        var newValue = readContext(context), newChildren = render(newValue);
        renderNodeDestructive(request, task, newChildren);
      }
      function renderContextProvider(request, task, type, props) {
        var context = type._context, value = props.value, children = props.children, prevSnapshot;
        prevSnapshot = task.context, task.context = pushProvider(context, value), renderNodeDestructive(request, task, children), task.context = popProvider(context), prevSnapshot !== task.context && error("Popping the context provider did not return back to the original snapshot. This is a bug in React.");
      }
      function renderLazyComponent(request, task, lazyComponent, props, ref) {
        pushBuiltInComponentStackInDEV(task, "Lazy");
        var payload = lazyComponent._payload, init = lazyComponent._init, Component2 = init(payload), resolvedProps = resolveDefaultProps(Component2, props);
        renderElement(request, task, Component2, resolvedProps, ref), popComponentStackInDEV(task);
      }
      function renderElement(request, task, type, props, ref) {
        if (typeof type == "function")
          if (shouldConstruct$1(type)) {
            renderClassComponent(request, task, type, props);
            return;
          } else {
            renderIndeterminateComponent(request, task, type, props);
            return;
          }
        if (typeof type == "string") {
          renderHostElement(request, task, type, props);
          return;
        }
        switch (type) {
          case REACT_LEGACY_HIDDEN_TYPE:
          case REACT_DEBUG_TRACING_MODE_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_FRAGMENT_TYPE: {
            renderNodeDestructive(request, task, props.children);
            return;
          }
          case REACT_SUSPENSE_LIST_TYPE: {
            pushBuiltInComponentStackInDEV(task, "SuspenseList"), renderNodeDestructive(request, task, props.children), popComponentStackInDEV(task);
            return;
          }
          case REACT_SCOPE_TYPE:
            throw new Error("ReactDOMServer does not yet support scope components.");
          case REACT_SUSPENSE_TYPE: {
            renderSuspenseBoundary(request, task, props);
            return;
          }
        }
        if (typeof type == "object" && type !== null)
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE: {
              renderForwardRef(request, task, type, props, ref);
              return;
            }
            case REACT_MEMO_TYPE: {
              renderMemo(request, task, type, props, ref);
              return;
            }
            case REACT_PROVIDER_TYPE: {
              renderContextProvider(request, task, type, props);
              return;
            }
            case REACT_CONTEXT_TYPE: {
              renderContextConsumer(request, task, type, props);
              return;
            }
            case REACT_LAZY_TYPE: {
              renderLazyComponent(request, task, type, props);
              return;
            }
          }
        var info = "";
        throw (type === void 0 || typeof type == "object" && type !== null && Object.keys(type).length === 0) && (info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (type == null ? type : typeof type) + "." + info));
      }
      function validateIterable(iterable, iteratorFn) {
        typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
        iterable[Symbol.toStringTag] === "Generator" && (didWarnAboutGenerators || error("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), didWarnAboutGenerators = !0), iterable.entries === iteratorFn && (didWarnAboutMaps || error("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), didWarnAboutMaps = !0);
      }
      function renderNodeDestructive(request, task, node) {
        try {
          return renderNodeDestructiveImpl(request, task, node);
        } catch (x) {
          throw typeof x == "object" && x !== null && typeof x.then == "function" || (lastBoundaryErrorComponentStackDev = lastBoundaryErrorComponentStackDev !== null ? lastBoundaryErrorComponentStackDev : getCurrentStackInDEV()), x;
        }
      }
      function renderNodeDestructiveImpl(request, task, node) {
        if (task.node = node, typeof node == "object" && node !== null) {
          switch (node.$$typeof) {
            case REACT_ELEMENT_TYPE: {
              var element = node, type = element.type, props = element.props, ref = element.ref;
              renderElement(request, task, type, props, ref);
              return;
            }
            case REACT_PORTAL_TYPE:
              throw new Error("Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render.");
            case REACT_LAZY_TYPE: {
              var lazyNode = node, payload = lazyNode._payload, init = lazyNode._init, resolvedNode;
              try {
                resolvedNode = init(payload);
              } catch (x) {
                throw typeof x == "object" && x !== null && typeof x.then == "function" && pushBuiltInComponentStackInDEV(task, "Lazy"), x;
              }
              renderNodeDestructive(request, task, resolvedNode);
              return;
            }
          }
          if (isArray(node)) {
            renderChildrenArray(request, task, node);
            return;
          }
          var iteratorFn = getIteratorFn(node);
          if (iteratorFn) {
            validateIterable(node, iteratorFn);
            var iterator = iteratorFn.call(node);
            if (iterator) {
              var step = iterator.next();
              if (!step.done) {
                var children = [];
                do
                  children.push(step.value), step = iterator.next();
                while (!step.done);
                renderChildrenArray(request, task, children);
                return;
              }
              return;
            }
          }
          var childString = Object.prototype.toString.call(node);
          throw new Error("Objects are not valid as a React child (found: " + (childString === "[object Object]" ? "object with keys {" + Object.keys(node).join(", ") + "}" : childString) + "). If you meant to render a collection of children, use an array instead.");
        }
        if (typeof node == "string") {
          var segment = task.blockedSegment;
          segment.lastPushedText = pushTextInstance(task.blockedSegment.chunks, node, request.responseState, segment.lastPushedText);
          return;
        }
        if (typeof node == "number") {
          var _segment = task.blockedSegment;
          _segment.lastPushedText = pushTextInstance(task.blockedSegment.chunks, "" + node, request.responseState, _segment.lastPushedText);
          return;
        }
        typeof node == "function" && error("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
      }
      function renderChildrenArray(request, task, children) {
        for (var totalChildren = children.length, i = 0; i < totalChildren; i++) {
          var prevTreeContext = task.treeContext;
          task.treeContext = pushTreeContext(prevTreeContext, totalChildren, i);
          try {
            renderNode(request, task, children[i]);
          } finally {
            task.treeContext = prevTreeContext;
          }
        }
      }
      function spawnNewSuspendedTask(request, task, x) {
        var segment = task.blockedSegment, insertionIndex = segment.chunks.length, newSegment = createPendingSegment(
          request,
          insertionIndex,
          null,
          segment.formatContext,
          // Adopt the parent segment's leading text embed
          segment.lastPushedText,
          // Assume we are text embedded at the trailing edge
          !0
        );
        segment.children.push(newSegment), segment.lastPushedText = !1;
        var newTask = createTask(request, task.node, task.blockedBoundary, newSegment, task.abortSet, task.legacyContext, task.context, task.treeContext);
        task.componentStack !== null && (newTask.componentStack = task.componentStack.parent);
        var ping = newTask.ping;
        x.then(ping, ping);
      }
      function renderNode(request, task, node) {
        var previousFormatContext = task.blockedSegment.formatContext, previousLegacyContext = task.legacyContext, previousContext = task.context, previousComponentStack = null;
        previousComponentStack = task.componentStack;
        try {
          return renderNodeDestructive(request, task, node);
        } catch (x) {
          if (resetHooksState(), typeof x == "object" && x !== null && typeof x.then == "function") {
            spawnNewSuspendedTask(request, task, x), task.blockedSegment.formatContext = previousFormatContext, task.legacyContext = previousLegacyContext, task.context = previousContext, switchContext(previousContext), task.componentStack = previousComponentStack;
            return;
          } else
            throw task.blockedSegment.formatContext = previousFormatContext, task.legacyContext = previousLegacyContext, task.context = previousContext, switchContext(previousContext), task.componentStack = previousComponentStack, x;
        }
      }
      function erroredTask(request, boundary, segment, error2) {
        var errorDigest = logRecoverableError(request, error2);
        if (boundary === null ? fatalError(request, error2) : (boundary.pendingTasks--, boundary.forceClientRender || (boundary.forceClientRender = !0, boundary.errorDigest = errorDigest, captureBoundaryErrorDetailsDev(boundary, error2), boundary.parentFlushed && request.clientRenderedBoundaries.push(boundary))), request.allPendingTasks--, request.allPendingTasks === 0) {
          var onAllReady = request.onAllReady;
          onAllReady();
        }
      }
      function abortTaskSoft(task) {
        var request = this, boundary = task.blockedBoundary, segment = task.blockedSegment;
        segment.status = ABORTED, finishedTask(request, boundary, segment);
      }
      function abortTask(task, request, reason) {
        var boundary = task.blockedBoundary, segment = task.blockedSegment;
        if (segment.status = ABORTED, boundary === null)
          request.allPendingTasks--, request.status !== CLOSED && (request.status = CLOSED, request.destination !== null && close(request.destination));
        else {
          if (boundary.pendingTasks--, !boundary.forceClientRender) {
            boundary.forceClientRender = !0;
            var _error = reason === void 0 ? new Error("The render was aborted by the server without a reason.") : reason;
            boundary.errorDigest = request.onError(_error);
            {
              var errorPrefix = "The server did not finish this Suspense boundary: ";
              _error && typeof _error.message == "string" ? _error = errorPrefix + _error.message : _error = errorPrefix + String(_error);
              var previousTaskInDev = currentTaskInDEV;
              currentTaskInDEV = task;
              try {
                captureBoundaryErrorDetailsDev(boundary, _error);
              } finally {
                currentTaskInDEV = previousTaskInDev;
              }
            }
            boundary.parentFlushed && request.clientRenderedBoundaries.push(boundary);
          }
          if (boundary.fallbackAbortableTasks.forEach(function(fallbackTask) {
            return abortTask(fallbackTask, request, reason);
          }), boundary.fallbackAbortableTasks.clear(), request.allPendingTasks--, request.allPendingTasks === 0) {
            var onAllReady = request.onAllReady;
            onAllReady();
          }
        }
      }
      function queueCompletedSegment(boundary, segment) {
        if (segment.chunks.length === 0 && segment.children.length === 1 && segment.children[0].boundary === null) {
          var childSegment = segment.children[0];
          childSegment.id = segment.id, childSegment.parentFlushed = !0, childSegment.status === COMPLETED && queueCompletedSegment(boundary, childSegment);
        } else {
          var completedSegments = boundary.completedSegments;
          completedSegments.push(segment);
        }
      }
      function finishedTask(request, boundary, segment) {
        if (boundary === null) {
          if (segment.parentFlushed) {
            if (request.completedRootSegment !== null)
              throw new Error("There can only be one root segment. This is a bug in React.");
            request.completedRootSegment = segment;
          }
          if (request.pendingRootTasks--, request.pendingRootTasks === 0) {
            request.onShellError = noop$1;
            var onShellReady = request.onShellReady;
            onShellReady();
          }
        } else if (boundary.pendingTasks--, !boundary.forceClientRender) {
          if (boundary.pendingTasks === 0)
            segment.parentFlushed && segment.status === COMPLETED && queueCompletedSegment(boundary, segment), boundary.parentFlushed && request.completedBoundaries.push(boundary), boundary.fallbackAbortableTasks.forEach(abortTaskSoft, request), boundary.fallbackAbortableTasks.clear();
          else if (segment.parentFlushed && segment.status === COMPLETED) {
            queueCompletedSegment(boundary, segment);
            var completedSegments = boundary.completedSegments;
            completedSegments.length === 1 && boundary.parentFlushed && request.partialBoundaries.push(boundary);
          }
        }
        if (request.allPendingTasks--, request.allPendingTasks === 0) {
          var onAllReady = request.onAllReady;
          onAllReady();
        }
      }
      function retryTask(request, task) {
        var segment = task.blockedSegment;
        if (segment.status === PENDING) {
          switchContext(task.context);
          var prevTaskInDEV = null;
          prevTaskInDEV = currentTaskInDEV, currentTaskInDEV = task;
          try {
            renderNodeDestructive(request, task, task.node), pushSegmentFinale(segment.chunks, request.responseState, segment.lastPushedText, segment.textEmbedded), task.abortSet.delete(task), segment.status = COMPLETED, finishedTask(request, task.blockedBoundary, segment);
          } catch (x) {
            if (resetHooksState(), typeof x == "object" && x !== null && typeof x.then == "function") {
              var ping = task.ping;
              x.then(ping, ping);
            } else
              task.abortSet.delete(task), segment.status = ERRORED, erroredTask(request, task.blockedBoundary, segment, x);
          } finally {
            currentTaskInDEV = prevTaskInDEV;
          }
        }
      }
      function performWork(request) {
        if (request.status !== CLOSED) {
          var prevContext = getActiveContext(), prevDispatcher = ReactCurrentDispatcher$1.current;
          ReactCurrentDispatcher$1.current = Dispatcher;
          var prevGetCurrentStackImpl;
          prevGetCurrentStackImpl = ReactDebugCurrentFrame$1.getCurrentStack, ReactDebugCurrentFrame$1.getCurrentStack = getCurrentStackInDEV;
          var prevResponseState = currentResponseState;
          setCurrentResponseState(request.responseState);
          try {
            var pingedTasks = request.pingedTasks, i;
            for (i = 0; i < pingedTasks.length; i++) {
              var task = pingedTasks[i];
              retryTask(request, task);
            }
            pingedTasks.splice(0, i), request.destination !== null && flushCompletedQueues(request, request.destination);
          } catch (error2) {
            logRecoverableError(request, error2), fatalError(request, error2);
          } finally {
            setCurrentResponseState(prevResponseState), ReactCurrentDispatcher$1.current = prevDispatcher, ReactDebugCurrentFrame$1.getCurrentStack = prevGetCurrentStackImpl, prevDispatcher === Dispatcher && switchContext(prevContext);
          }
        }
      }
      function flushSubtree(request, destination, segment) {
        switch (segment.parentFlushed = !0, segment.status) {
          case PENDING: {
            var segmentID = segment.id = request.nextSegmentId++;
            return segment.lastPushedText = !1, segment.textEmbedded = !1, writePlaceholder(destination, request.responseState, segmentID);
          }
          case COMPLETED: {
            segment.status = FLUSHED;
            for (var r = !0, chunks = segment.chunks, chunkIdx = 0, children = segment.children, childIdx = 0; childIdx < children.length; childIdx++) {
              for (var nextChild = children[childIdx]; chunkIdx < nextChild.index; chunkIdx++)
                writeChunk(destination, chunks[chunkIdx]);
              r = flushSegment(request, destination, nextChild);
            }
            for (; chunkIdx < chunks.length - 1; chunkIdx++)
              writeChunk(destination, chunks[chunkIdx]);
            return chunkIdx < chunks.length && (r = writeChunkAndReturn(destination, chunks[chunkIdx])), r;
          }
          default:
            throw new Error("Aborted, errored or already flushed boundaries should not be flushed again. This is a bug in React.");
        }
      }
      function flushSegment(request, destination, segment) {
        var boundary = segment.boundary;
        if (boundary === null)
          return flushSubtree(request, destination, segment);
        if (boundary.parentFlushed = !0, boundary.forceClientRender)
          return writeStartClientRenderedSuspenseBoundary(destination, request.responseState, boundary.errorDigest, boundary.errorMessage, boundary.errorComponentStack), flushSubtree(request, destination, segment), writeEndClientRenderedSuspenseBoundary(destination, request.responseState);
        if (boundary.pendingTasks > 0) {
          boundary.rootSegmentID = request.nextSegmentId++, boundary.completedSegments.length > 0 && request.partialBoundaries.push(boundary);
          var id = boundary.id = assignSuspenseBoundaryID(request.responseState);
          return writeStartPendingSuspenseBoundary(destination, request.responseState, id), flushSubtree(request, destination, segment), writeEndPendingSuspenseBoundary(destination, request.responseState);
        } else {
          if (boundary.byteSize > request.progressiveChunkSize)
            return boundary.rootSegmentID = request.nextSegmentId++, request.completedBoundaries.push(boundary), writeStartPendingSuspenseBoundary(destination, request.responseState, boundary.id), flushSubtree(request, destination, segment), writeEndPendingSuspenseBoundary(destination, request.responseState);
          writeStartCompletedSuspenseBoundary(destination, request.responseState);
          var completedSegments = boundary.completedSegments;
          if (completedSegments.length !== 1)
            throw new Error("A previously unvisited boundary must have exactly one root segment. This is a bug in React.");
          var contentSegment = completedSegments[0];
          return flushSegment(request, destination, contentSegment), writeEndCompletedSuspenseBoundary(destination, request.responseState);
        }
      }
      function flushClientRenderedBoundary(request, destination, boundary) {
        return writeClientRenderBoundaryInstruction(destination, request.responseState, boundary.id, boundary.errorDigest, boundary.errorMessage, boundary.errorComponentStack);
      }
      function flushSegmentContainer(request, destination, segment) {
        return writeStartSegment(destination, request.responseState, segment.formatContext, segment.id), flushSegment(request, destination, segment), writeEndSegment(destination, segment.formatContext);
      }
      function flushCompletedBoundary(request, destination, boundary) {
        for (var completedSegments = boundary.completedSegments, i = 0; i < completedSegments.length; i++) {
          var segment = completedSegments[i];
          flushPartiallyCompletedSegment(request, destination, boundary, segment);
        }
        return completedSegments.length = 0, writeCompletedBoundaryInstruction(destination, request.responseState, boundary.id, boundary.rootSegmentID);
      }
      function flushPartialBoundary(request, destination, boundary) {
        for (var completedSegments = boundary.completedSegments, i = 0; i < completedSegments.length; i++) {
          var segment = completedSegments[i];
          if (!flushPartiallyCompletedSegment(request, destination, boundary, segment))
            return i++, completedSegments.splice(0, i), !1;
        }
        return completedSegments.splice(0, i), !0;
      }
      function flushPartiallyCompletedSegment(request, destination, boundary, segment) {
        if (segment.status === FLUSHED)
          return !0;
        var segmentID = segment.id;
        if (segmentID === -1) {
          var rootSegmentID = segment.id = boundary.rootSegmentID;
          if (rootSegmentID === -1)
            throw new Error("A root segment ID must have been assigned by now. This is a bug in React.");
          return flushSegmentContainer(request, destination, segment);
        } else
          return flushSegmentContainer(request, destination, segment), writeCompletedSegmentInstruction(destination, request.responseState, segmentID);
      }
      function flushCompletedQueues(request, destination) {
        beginWriting();
        try {
          var completedRootSegment = request.completedRootSegment;
          completedRootSegment !== null && request.pendingRootTasks === 0 && (flushSegment(request, destination, completedRootSegment), request.completedRootSegment = null, writeCompletedRoot(destination, request.responseState));
          var clientRenderedBoundaries = request.clientRenderedBoundaries, i;
          for (i = 0; i < clientRenderedBoundaries.length; i++) {
            var boundary = clientRenderedBoundaries[i];
            if (!flushClientRenderedBoundary(request, destination, boundary)) {
              request.destination = null, i++, clientRenderedBoundaries.splice(0, i);
              return;
            }
          }
          clientRenderedBoundaries.splice(0, i);
          var completedBoundaries = request.completedBoundaries;
          for (i = 0; i < completedBoundaries.length; i++) {
            var _boundary = completedBoundaries[i];
            if (!flushCompletedBoundary(request, destination, _boundary)) {
              request.destination = null, i++, completedBoundaries.splice(0, i);
              return;
            }
          }
          completedBoundaries.splice(0, i), completeWriting(destination), beginWriting(destination);
          var partialBoundaries = request.partialBoundaries;
          for (i = 0; i < partialBoundaries.length; i++) {
            var _boundary2 = partialBoundaries[i];
            if (!flushPartialBoundary(request, destination, _boundary2)) {
              request.destination = null, i++, partialBoundaries.splice(0, i);
              return;
            }
          }
          partialBoundaries.splice(0, i);
          var largeBoundaries = request.completedBoundaries;
          for (i = 0; i < largeBoundaries.length; i++) {
            var _boundary3 = largeBoundaries[i];
            if (!flushCompletedBoundary(request, destination, _boundary3)) {
              request.destination = null, i++, largeBoundaries.splice(0, i);
              return;
            }
          }
          largeBoundaries.splice(0, i);
        } finally {
          completeWriting(destination), request.allPendingTasks === 0 && request.pingedTasks.length === 0 && request.clientRenderedBoundaries.length === 0 && request.completedBoundaries.length === 0 && (request.abortableTasks.size !== 0 && error("There was still abortable task at the root when we closed. This is a bug in React."), close(destination));
        }
      }
      function startWork(request) {
        scheduleWork(function() {
          return performWork(request);
        });
      }
      function startFlowing(request, destination) {
        if (request.status === CLOSING) {
          request.status = CLOSED, closeWithError(destination, request.fatalError);
          return;
        }
        if (request.status !== CLOSED && request.destination === null) {
          request.destination = destination;
          try {
            flushCompletedQueues(request, destination);
          } catch (error2) {
            logRecoverableError(request, error2), fatalError(request, error2);
          }
        }
      }
      function abort(request, reason) {
        try {
          var abortableTasks = request.abortableTasks;
          abortableTasks.forEach(function(task) {
            return abortTask(task, request, reason);
          }), abortableTasks.clear(), request.destination !== null && flushCompletedQueues(request, request.destination);
        } catch (error2) {
          logRecoverableError(request, error2), fatalError(request, error2);
        }
      }
      function renderToReadableStream2(children, options) {
        return new Promise(function(resolve, reject) {
          var onFatalError, onAllReady, allReady = new Promise(function(res, rej) {
            onAllReady = res, onFatalError = rej;
          });
          function onShellReady() {
            var stream = new ReadableStream(
              {
                type: "bytes",
                pull: function(controller) {
                  startFlowing(request, controller);
                },
                cancel: function(reason) {
                  abort(request);
                }
              },
              // $FlowFixMe size() methods are not allowed on byte streams.
              {
                highWaterMark: 0
              }
            );
            stream.allReady = allReady, resolve(stream);
          }
          function onShellError(error2) {
            allReady.catch(function() {
            }), reject(error2);
          }
          var request = createRequest(children, createResponseState(options ? options.identifierPrefix : void 0, options ? options.nonce : void 0, options ? options.bootstrapScriptContent : void 0, options ? options.bootstrapScripts : void 0, options ? options.bootstrapModules : void 0), createRootFormatContext(options ? options.namespaceURI : void 0), options ? options.progressiveChunkSize : void 0, options ? options.onError : void 0, onAllReady, onShellReady, onShellError, onFatalError);
          if (options && options.signal) {
            var signal = options.signal, listener = function() {
              abort(request, signal.reason), signal.removeEventListener("abort", listener);
            };
            signal.addEventListener("abort", listener);
          }
          startWork(request);
        });
      }
      exports.renderToReadableStream = renderToReadableStream2, exports.version = ReactVersion;
    })();
  }
});

// node_modules/react-dom/server.browser.js
var require_server_browser = __commonJS({
  "node_modules/react-dom/server.browser.js"(exports) {
    "use strict";
    var l, s;
    l = require_react_dom_server_legacy_browser_development(), s = require_react_dom_server_browser_development();
    exports.version = l.version;
    exports.renderToString = l.renderToString;
    exports.renderToStaticMarkup = l.renderToStaticMarkup;
    exports.renderToNodeStream = l.renderToNodeStream;
    exports.renderToStaticNodeStream = l.renderToStaticNodeStream;
    exports.renderToReadableStream = s.renderToReadableStream;
  }
});

// node_modules/react/cjs/react-jsx-dev-runtime.development.js
var require_react_jsx_dev_runtime_development = __commonJS({
  "node_modules/react/cjs/react-jsx-dev-runtime.development.js"(exports) {
    "use strict";
    (function() {
      "use strict";
      var React7 = require_react(), REACT_ELEMENT_TYPE = Symbol.for("react.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_PROVIDER_TYPE = Symbol.for("react.provider"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        if (maybeIterable === null || typeof maybeIterable != "object")
          return null;
        var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
        return typeof maybeIterator == "function" ? maybeIterator : null;
      }
      var ReactSharedInternals = React7.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function error(format) {
        {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++)
            args[_key2 - 1] = arguments[_key2];
          printWarning("error", format, args);
        }
      }
      function printWarning(level, format, args) {
        {
          var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame, stack = ReactDebugCurrentFrame2.getStackAddendum();
          stack !== "" && (format += "%s", args = args.concat([stack]));
          var argsWithFormat = args.map(function(item) {
            return String(item);
          });
          argsWithFormat.unshift("Warning: " + format), Function.prototype.apply.call(console[level], console, argsWithFormat);
        }
      }
      var enableScopeAPI = !1, enableCacheElement = !1, enableTransitionTracing = !1, enableLegacyHidden = !1, enableDebugTracing = !1, REACT_MODULE_REFERENCE;
      REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
      function isValidElementType(type) {
        return !!(typeof type == "string" || typeof type == "function" || type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing || typeof type == "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0));
      }
      function getWrappedName(outerType, innerType, wrapperName) {
        var displayName = outerType.displayName;
        if (displayName)
          return displayName;
        var functionName = innerType.displayName || innerType.name || "";
        return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
      }
      function getContextName(type) {
        return type.displayName || "Context";
      }
      function getComponentNameFromType(type) {
        if (type == null)
          return null;
        if (typeof type.tag == "number" && error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof type == "function")
          return type.displayName || type.name || null;
        if (typeof type == "string")
          return type;
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
        }
        if (typeof type == "object")
          switch (type.$$typeof) {
            case REACT_CONTEXT_TYPE:
              var context = type;
              return getContextName(context) + ".Consumer";
            case REACT_PROVIDER_TYPE:
              var provider = type;
              return getContextName(provider._context) + ".Provider";
            case REACT_FORWARD_REF_TYPE:
              return getWrappedName(type, type.render, "ForwardRef");
            case REACT_MEMO_TYPE:
              var outerName = type.displayName || null;
              return outerName !== null ? outerName : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE: {
              var lazyComponent = type, payload = lazyComponent._payload, init = lazyComponent._init;
              try {
                return getComponentNameFromType(init(payload));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var assign = Object.assign, disabledDepth = 0, prevLog, prevInfo, prevWarn, prevError, prevGroup, prevGroupCollapsed, prevGroupEnd;
      function disabledLog() {
      }
      disabledLog.__reactDisabledLog = !0;
      function disableLogs() {
        {
          if (disabledDepth === 0) {
            prevLog = console.log, prevInfo = console.info, prevWarn = console.warn, prevError = console.error, prevGroup = console.group, prevGroupCollapsed = console.groupCollapsed, prevGroupEnd = console.groupEnd;
            var props = {
              configurable: !0,
              enumerable: !0,
              value: disabledLog,
              writable: !0
            };
            Object.defineProperties(console, {
              info: props,
              log: props,
              warn: props,
              error: props,
              group: props,
              groupCollapsed: props,
              groupEnd: props
            });
          }
          disabledDepth++;
        }
      }
      function reenableLogs() {
        {
          if (disabledDepth--, disabledDepth === 0) {
            var props = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: assign({}, props, {
                value: prevLog
              }),
              info: assign({}, props, {
                value: prevInfo
              }),
              warn: assign({}, props, {
                value: prevWarn
              }),
              error: assign({}, props, {
                value: prevError
              }),
              group: assign({}, props, {
                value: prevGroup
              }),
              groupCollapsed: assign({}, props, {
                value: prevGroupCollapsed
              }),
              groupEnd: assign({}, props, {
                value: prevGroupEnd
              })
            });
          }
          disabledDepth < 0 && error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher, prefix;
      function describeBuiltInComponentFrame(name, source, ownerFn) {
        {
          if (prefix === void 0)
            try {
              throw Error();
            } catch (x) {
              var match = x.stack.trim().match(/\n( *(at )?)/);
              prefix = match && match[1] || "";
            }
          return `
` + prefix + name;
        }
      }
      var reentry = !1, componentFrameCache;
      {
        var PossiblyWeakMap = typeof WeakMap == "function" ? WeakMap : Map;
        componentFrameCache = new PossiblyWeakMap();
      }
      function describeNativeComponentFrame(fn, construct) {
        if (!fn || reentry)
          return "";
        {
          var frame = componentFrameCache.get(fn);
          if (frame !== void 0)
            return frame;
        }
        var control;
        reentry = !0;
        var previousPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var previousDispatcher;
        previousDispatcher = ReactCurrentDispatcher.current, ReactCurrentDispatcher.current = null, disableLogs();
        try {
          if (construct) {
            var Fake = function() {
              throw Error();
            };
            if (Object.defineProperty(Fake.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(Fake, []);
              } catch (x) {
                control = x;
              }
              Reflect.construct(fn, [], Fake);
            } else {
              try {
                Fake.call();
              } catch (x) {
                control = x;
              }
              fn.call(Fake.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (x) {
              control = x;
            }
            fn();
          }
        } catch (sample) {
          if (sample && control && typeof sample.stack == "string") {
            for (var sampleLines = sample.stack.split(`
`), controlLines = control.stack.split(`
`), s = sampleLines.length - 1, c = controlLines.length - 1; s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]; )
              c--;
            for (; s >= 1 && c >= 0; s--, c--)
              if (sampleLines[s] !== controlLines[c]) {
                if (s !== 1 || c !== 1)
                  do
                    if (s--, c--, c < 0 || sampleLines[s] !== controlLines[c]) {
                      var _frame = `
` + sampleLines[s].replace(" at new ", " at ");
                      return fn.displayName && _frame.includes("<anonymous>") && (_frame = _frame.replace("<anonymous>", fn.displayName)), typeof fn == "function" && componentFrameCache.set(fn, _frame), _frame;
                    }
                  while (s >= 1 && c >= 0);
                break;
              }
          }
        } finally {
          reentry = !1, ReactCurrentDispatcher.current = previousDispatcher, reenableLogs(), Error.prepareStackTrace = previousPrepareStackTrace;
        }
        var name = fn ? fn.displayName || fn.name : "", syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
        return typeof fn == "function" && componentFrameCache.set(fn, syntheticFrame), syntheticFrame;
      }
      function describeFunctionComponentFrame(fn, source, ownerFn) {
        return describeNativeComponentFrame(fn, !1);
      }
      function shouldConstruct(Component2) {
        var prototype = Component2.prototype;
        return !!(prototype && prototype.isReactComponent);
      }
      function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
        if (type == null)
          return "";
        if (typeof type == "function")
          return describeNativeComponentFrame(type, shouldConstruct(type));
        if (typeof type == "string")
          return describeBuiltInComponentFrame(type);
        switch (type) {
          case REACT_SUSPENSE_TYPE:
            return describeBuiltInComponentFrame("Suspense");
          case REACT_SUSPENSE_LIST_TYPE:
            return describeBuiltInComponentFrame("SuspenseList");
        }
        if (typeof type == "object")
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE:
              return describeFunctionComponentFrame(type.render);
            case REACT_MEMO_TYPE:
              return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
            case REACT_LAZY_TYPE: {
              var lazyComponent = type, payload = lazyComponent._payload, init = lazyComponent._init;
              try {
                return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
              } catch {
              }
            }
          }
        return "";
      }
      var hasOwnProperty = Object.prototype.hasOwnProperty, loggedTypeFailures = {}, ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement(element) {
        if (element) {
          var owner = element._owner, stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
          ReactDebugCurrentFrame.setExtraStackFrame(stack);
        } else
          ReactDebugCurrentFrame.setExtraStackFrame(null);
      }
      function checkPropTypes(typeSpecs, values, location2, componentName, element) {
        {
          var has = Function.call.bind(hasOwnProperty);
          for (var typeSpecName in typeSpecs)
            if (has(typeSpecs, typeSpecName)) {
              var error$1 = void 0;
              try {
                if (typeof typeSpecs[typeSpecName] != "function") {
                  var err = Error((componentName || "React class") + ": " + location2 + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw err.name = "Invariant Violation", err;
                }
                error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location2, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (ex) {
                error$1 = ex;
              }
              error$1 && !(error$1 instanceof Error) && (setCurrentlyValidatingElement(element), error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location2, typeSpecName, typeof error$1), setCurrentlyValidatingElement(null)), error$1 instanceof Error && !(error$1.message in loggedTypeFailures) && (loggedTypeFailures[error$1.message] = !0, setCurrentlyValidatingElement(element), error("Failed %s type: %s", location2, error$1.message), setCurrentlyValidatingElement(null));
            }
        }
      }
      var isArrayImpl = Array.isArray;
      function isArray(a) {
        return isArrayImpl(a);
      }
      function typeName(value) {
        {
          var hasToStringTag = typeof Symbol == "function" && Symbol.toStringTag, type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          return type;
        }
      }
      function willCoercionThrow(value) {
        try {
          return testStringCoercion(value), !1;
        } catch {
          return !0;
        }
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkKeyStringCoercion(value) {
        if (willCoercionThrow(value))
          return error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value)), testStringCoercion(value);
      }
      var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner, RESERVED_PROPS = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
      didWarnAboutStringRefs = {};
      function hasValidRef(config) {
        if (hasOwnProperty.call(config, "ref")) {
          var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
          if (getter && getter.isReactWarning)
            return !1;
        }
        return config.ref !== void 0;
      }
      function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
          var getter = Object.getOwnPropertyDescriptor(config, "key").get;
          if (getter && getter.isReactWarning)
            return !1;
        }
        return config.key !== void 0;
      }
      function warnIfStringRefCannotBeAutoConverted(config, self2) {
        if (typeof config.ref == "string" && ReactCurrentOwner.current && self2 && ReactCurrentOwner.current.stateNode !== self2) {
          var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
          didWarnAboutStringRefs[componentName] || (error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref), didWarnAboutStringRefs[componentName] = !0);
        }
      }
      function defineKeyPropWarningGetter(props, displayName) {
        {
          var warnAboutAccessingKey = function() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName));
          };
          warnAboutAccessingKey.isReactWarning = !0, Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
          });
        }
      }
      function defineRefPropWarningGetter(props, displayName) {
        {
          var warnAboutAccessingRef = function() {
            specialPropRefWarningShown || (specialPropRefWarningShown = !0, error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName));
          };
          warnAboutAccessingRef.isReactWarning = !0, Object.defineProperty(props, "ref", {
            get: warnAboutAccessingRef,
            configurable: !0
          });
        }
      }
      var ReactElement = function(type, key, ref, self2, source, owner, props) {
        var element = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: REACT_ELEMENT_TYPE,
          // Built-in properties that belong on the element
          type,
          key,
          ref,
          props,
          // Record the component responsible for creating this element.
          _owner: owner
        };
        return element._store = {}, Object.defineProperty(element._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(element, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: self2
        }), Object.defineProperty(element, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: source
        }), Object.freeze && (Object.freeze(element.props), Object.freeze(element)), element;
      };
      function jsxDEV10(type, config, maybeKey, source, self2) {
        {
          var propName, props = {}, key = null, ref = null;
          maybeKey !== void 0 && (checkKeyStringCoercion(maybeKey), key = "" + maybeKey), hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key), hasValidRef(config) && (ref = config.ref, warnIfStringRefCannotBeAutoConverted(config, self2));
          for (propName in config)
            hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName) && (props[propName] = config[propName]);
          if (type && type.defaultProps) {
            var defaultProps = type.defaultProps;
            for (propName in defaultProps)
              props[propName] === void 0 && (props[propName] = defaultProps[propName]);
          }
          if (key || ref) {
            var displayName = typeof type == "function" ? type.displayName || type.name || "Unknown" : type;
            key && defineKeyPropWarningGetter(props, displayName), ref && defineRefPropWarningGetter(props, displayName);
          }
          return ReactElement(type, key, ref, self2, source, ReactCurrentOwner.current, props);
        }
      }
      var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner, ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement$1(element) {
        if (element) {
          var owner = element._owner, stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
          ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
        } else
          ReactDebugCurrentFrame$1.setExtraStackFrame(null);
      }
      var propTypesMisspellWarningShown;
      propTypesMisspellWarningShown = !1;
      function isValidElement2(object) {
        return typeof object == "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      function getDeclarationErrorAddendum() {
        {
          if (ReactCurrentOwner$1.current) {
            var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);
            if (name)
              return `

Check the render method of \`` + name + "`.";
          }
          return "";
        }
      }
      function getSourceInfoErrorAddendum(source) {
        {
          if (source !== void 0) {
            var fileName = source.fileName.replace(/^.*[\\\/]/, ""), lineNumber = source.lineNumber;
            return `

Check your code at ` + fileName + ":" + lineNumber + ".";
          }
          return "";
        }
      }
      var ownerHasKeyUseWarning = {};
      function getCurrentComponentErrorInfo(parentType) {
        {
          var info = getDeclarationErrorAddendum();
          if (!info) {
            var parentName = typeof parentType == "string" ? parentType : parentType.displayName || parentType.name;
            parentName && (info = `

Check the top-level render call using <` + parentName + ">.");
          }
          return info;
        }
      }
      function validateExplicitKey(element, parentType) {
        {
          if (!element._store || element._store.validated || element.key != null)
            return;
          element._store.validated = !0;
          var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
          if (ownerHasKeyUseWarning[currentComponentErrorInfo])
            return;
          ownerHasKeyUseWarning[currentComponentErrorInfo] = !0;
          var childOwner = "";
          element && element._owner && element._owner !== ReactCurrentOwner$1.current && (childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + "."), setCurrentlyValidatingElement$1(element), error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner), setCurrentlyValidatingElement$1(null);
        }
      }
      function validateChildKeys(node, parentType) {
        {
          if (typeof node != "object")
            return;
          if (isArray(node))
            for (var i = 0; i < node.length; i++) {
              var child = node[i];
              isValidElement2(child) && validateExplicitKey(child, parentType);
            }
          else if (isValidElement2(node))
            node._store && (node._store.validated = !0);
          else if (node) {
            var iteratorFn = getIteratorFn(node);
            if (typeof iteratorFn == "function" && iteratorFn !== node.entries)
              for (var iterator = iteratorFn.call(node), step; !(step = iterator.next()).done; )
                isValidElement2(step.value) && validateExplicitKey(step.value, parentType);
          }
        }
      }
      function validatePropTypes(element) {
        {
          var type = element.type;
          if (type == null || typeof type == "string")
            return;
          var propTypes;
          if (typeof type == "function")
            propTypes = type.propTypes;
          else if (typeof type == "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          type.$$typeof === REACT_MEMO_TYPE))
            propTypes = type.propTypes;
          else
            return;
          if (propTypes) {
            var name = getComponentNameFromType(type);
            checkPropTypes(propTypes, element.props, "prop", name, element);
          } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
            propTypesMisspellWarningShown = !0;
            var _name = getComponentNameFromType(type);
            error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
          }
          typeof type.getDefaultProps == "function" && !type.getDefaultProps.isReactClassApproved && error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function validateFragmentProps(fragment) {
        {
          for (var keys = Object.keys(fragment.props), i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (key !== "children" && key !== "key") {
              setCurrentlyValidatingElement$1(fragment), error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key), setCurrentlyValidatingElement$1(null);
              break;
            }
          }
          fragment.ref !== null && (setCurrentlyValidatingElement$1(fragment), error("Invalid attribute `ref` supplied to `React.Fragment`."), setCurrentlyValidatingElement$1(null));
        }
      }
      function jsxWithValidation(type, props, key, isStaticChildren, source, self2) {
        {
          var validType = isValidElementType(type);
          if (!validType) {
            var info = "";
            (type === void 0 || typeof type == "object" && type !== null && Object.keys(type).length === 0) && (info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var sourceInfo = getSourceInfoErrorAddendum(source);
            sourceInfo ? info += sourceInfo : info += getDeclarationErrorAddendum();
            var typeString;
            type === null ? typeString = "null" : isArray(type) ? typeString = "array" : type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE ? (typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />", info = " Did you accidentally export a JSX literal instead of a component?") : typeString = typeof type, error("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
          }
          var element = jsxDEV10(type, props, key, source, self2);
          if (element == null)
            return element;
          if (validType) {
            var children = props.children;
            if (children !== void 0)
              if (isStaticChildren)
                if (isArray(children)) {
                  for (var i = 0; i < children.length; i++)
                    validateChildKeys(children[i], type);
                  Object.freeze && Object.freeze(children);
                } else
                  error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
              else
                validateChildKeys(children, type);
          }
          return type === REACT_FRAGMENT_TYPE ? validateFragmentProps(element) : validatePropTypes(element), element;
        }
      }
      var jsxDEV$1 = jsxWithValidation;
      exports.Fragment = REACT_FRAGMENT_TYPE, exports.jsxDEV = jsxDEV$1;
    })();
  }
});

// node_modules/react/jsx-dev-runtime.js
var require_jsx_dev_runtime = __commonJS({
  "node_modules/react/jsx-dev-runtime.js"(exports, module) {
    "use strict";
    module.exports = require_react_jsx_dev_runtime_development();
  }
});

// node_modules/file-saver/dist/FileSaver.min.js
var require_FileSaver_min = __commonJS({
  "node_modules/file-saver/dist/FileSaver.min.js"(exports, module) {
    (function(a, b) {
      typeof define == "function" && define.amd ? define([], b) : typeof exports < "u" ? b() : (b(), a.FileSaver = {});
    })(exports, function() {
      "use strict";
      function b(a2, b2) {
        return typeof b2 > "u" ? b2 = { autoBom: !1 } : typeof b2 != "object" && (console.warn("Deprecated: Expected third argument to be a object"), b2 = { autoBom: !b2 }), b2.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a2.type) ? new Blob(["\uFEFF", a2], { type: a2.type }) : a2;
      }
      function c(a2, b2, c2) {
        var d2 = new XMLHttpRequest();
        d2.open("GET", a2), d2.responseType = "blob", d2.onload = function() {
          g(d2.response, b2, c2);
        }, d2.onerror = function() {
          console.error("could not download file");
        }, d2.send();
      }
      function d(a2) {
        var b2 = new XMLHttpRequest();
        b2.open("HEAD", a2, !1);
        try {
          b2.send();
        } catch {
        }
        return 200 <= b2.status && 299 >= b2.status;
      }
      function e(a2) {
        try {
          a2.dispatchEvent(new MouseEvent("click"));
        } catch {
          var b2 = document.createEvent("MouseEvents");
          b2.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), a2.dispatchEvent(b2);
        }
      }
      var f = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof globalThis == "object" && globalThis.global === globalThis ? globalThis : void 0, a = f.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent), g = f.saveAs || (typeof window != "object" || window !== f ? function() {
      } : "download" in HTMLAnchorElement.prototype && !a ? function(b2, g2, h) {
        var i = f.URL || f.webkitURL, j = document.createElement("a");
        g2 = g2 || b2.name || "download", j.download = g2, j.rel = "noopener", typeof b2 == "string" ? (j.href = b2, j.origin === location.origin ? e(j) : d(j.href) ? c(b2, g2, h) : e(j, j.target = "_blank")) : (j.href = i.createObjectURL(b2), setTimeout(function() {
          i.revokeObjectURL(j.href);
        }, 4e4), setTimeout(function() {
          e(j);
        }, 0));
      } : "msSaveOrOpenBlob" in navigator ? function(f2, g2, h) {
        if (g2 = g2 || f2.name || "download", typeof f2 != "string")
          navigator.msSaveOrOpenBlob(b(f2, h), g2);
        else if (d(f2))
          c(f2, g2, h);
        else {
          var i = document.createElement("a");
          i.href = f2, i.target = "_blank", setTimeout(function() {
            e(i);
          });
        }
      } : function(b2, d2, e2, g2) {
        if (g2 = g2 || open("", "_blank"), g2 && (g2.document.title = g2.document.body.innerText = "downloading..."), typeof b2 == "string")
          return c(b2, d2, e2);
        var h = b2.type === "application/octet-stream", i = /constructor/i.test(f.HTMLElement) || f.safari, j = /CriOS\/[\d]+/.test(navigator.userAgent);
        if ((j || h && i || a) && typeof FileReader < "u") {
          var k = new FileReader();
          k.onloadend = function() {
            var a2 = k.result;
            a2 = j ? a2 : a2.replace(/^data:[^;]*;/, "data:attachment/file;"), g2 ? g2.location.href = a2 : location = a2, g2 = null;
          }, k.readAsDataURL(b2);
        } else {
          var l = f.URL || f.webkitURL, m = l.createObjectURL(b2);
          g2 ? g2.location = m : location.href = m, g2 = null, setTimeout(function() {
            l.revokeObjectURL(m);
          }, 4e4);
        }
      });
      f.saveAs = g.saveAs = g, typeof module < "u" && (module.exports = g);
    });
  }
});

// node_modules/@remix-run/cloudflare-pages/dist/esm/worker.js
var import_cloudflare = __toESM(require_dist());
function createRequestHandler2({
  build,
  getLoadContext,
  mode
}) {
  let handleRequest2 = (0, import_cloudflare.createRequestHandler)(build, mode);
  return async (context) => {
    let loadContext = await (getLoadContext == null ? void 0 : getLoadContext(context));
    return handleRequest2(context.request, loadContext);
  };
}
function createPagesFunctionHandler({
  build,
  getLoadContext,
  mode
}) {
  let handleRequest2 = createRequestHandler2({
    build,
    getLoadContext,
    mode
  }), handleFetch = async (context) => {
    let response;
    context.request.headers.delete("if-none-match");
    try {
      response = await context.env.ASSETS.fetch(context.request.url, context.request.clone()), response = response && response.status >= 200 && response.status < 400 ? new Response(response.body, response) : void 0;
    } catch {
    }
    return response || (response = await handleRequest2(context)), response;
  };
  return async (context) => {
    try {
      return await handleFetch(context);
    } catch (error) {
      return error instanceof Error ? (console.error(error), new Response(error.message || error.toString(), {
        status: 500
      })) : new Response("Internal Error", {
        status: 500
      });
    }
  };
}

// server-entry-module:@remix-run/dev/server-build
var server_build_exports = {};
__export(server_build_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  publicPath: () => publicPath,
  routes: () => routes
});

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});

// node_modules/@remix-run/react/dist/esm/_virtual/_rollupPluginBabelHelpers.js
function _extends4() {
  return _extends4 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source)
        Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
    }
    return target;
  }, _extends4.apply(this, arguments);
}

// node_modules/@remix-run/react/dist/esm/components.js
var React3 = __toESM(require_react());
init_dist2();

// node_modules/@remix-run/react/dist/esm/errorBoundaries.js
var import_react = __toESM(require_react());
init_dist2();
var RemixErrorBoundary = class extends import_react.default.Component {
  constructor(props) {
    super(props), this.state = {
      error: props.error || null,
      location: props.location
    };
  }
  static getDerivedStateFromError(error) {
    return {
      error
    };
  }
  static getDerivedStateFromProps(props, state) {
    return state.location !== props.location ? {
      error: props.error || null,
      location: props.location
    } : {
      error: props.error || state.error,
      location: state.location
    };
  }
  render() {
    return this.state.error ? /* @__PURE__ */ import_react.default.createElement(this.props.component, {
      error: this.state.error
    }) : this.props.children;
  }
};
function RemixRootDefaultErrorBoundary({
  error
}) {
  return import_react.default.useEffect(() => {
    console.error(error);
  }, [error]), /* @__PURE__ */ import_react.default.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ import_react.default.createElement("head", null, /* @__PURE__ */ import_react.default.createElement("meta", {
    charSet: "utf-8"
  }), /* @__PURE__ */ import_react.default.createElement("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1, viewport-fit=cover"
  }), /* @__PURE__ */ import_react.default.createElement("title", null, "Application Error!")), /* @__PURE__ */ import_react.default.createElement("body", null, /* @__PURE__ */ import_react.default.createElement("main", {
    style: {
      fontFamily: "system-ui, sans-serif",
      padding: "2rem"
    }
  }, /* @__PURE__ */ import_react.default.createElement("h1", {
    style: {
      fontSize: "24px"
    }
  }, "Application Error"), error.stack ? /* @__PURE__ */ import_react.default.createElement("pre", {
    style: {
      padding: "2rem",
      background: "hsla(10, 50%, 50%, 0.1)",
      color: "red",
      overflow: "auto"
    }
  }, error.stack) : null), /* @__PURE__ */ import_react.default.createElement("script", {
    dangerouslySetInnerHTML: {
      __html: `
              console.log(
                "\u{1F4BF} Hey developer\u{1F44B}. You can provide a way better UX than this when your app throws errors. Check out https://remix.run/guides/errors for more information."
              );
            `
    }
  })));
}
function V2_RemixRootDefaultErrorBoundary() {
  let error = useRouteError();
  if (isRouteErrorResponse(error))
    return /* @__PURE__ */ import_react.default.createElement(RemixRootDefaultCatchBoundaryImpl, {
      caught: error
    });
  if (error instanceof Error)
    return /* @__PURE__ */ import_react.default.createElement(RemixRootDefaultErrorBoundary, {
      error
    });
  {
    let errorString = error == null ? "Unknown Error" : typeof error == "object" && "toString" in error ? error.toString() : JSON.stringify(error);
    return /* @__PURE__ */ import_react.default.createElement(RemixRootDefaultErrorBoundary, {
      error: new Error(errorString)
    });
  }
}
var RemixCatchContext = /* @__PURE__ */ import_react.default.createContext(void 0);
function useCatch() {
  return (0, import_react.useContext)(RemixCatchContext);
}
function RemixCatchBoundary({
  catch: catchVal,
  component: Component2,
  children
}) {
  return catchVal ? /* @__PURE__ */ import_react.default.createElement(RemixCatchContext.Provider, {
    value: catchVal
  }, /* @__PURE__ */ import_react.default.createElement(Component2, null)) : /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, children);
}
function RemixRootDefaultCatchBoundary() {
  let caught = useCatch();
  return /* @__PURE__ */ import_react.default.createElement(RemixRootDefaultCatchBoundaryImpl, {
    caught
  });
}
function RemixRootDefaultCatchBoundaryImpl({
  caught
}) {
  return /* @__PURE__ */ import_react.default.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ import_react.default.createElement("head", null, /* @__PURE__ */ import_react.default.createElement("meta", {
    charSet: "utf-8"
  }), /* @__PURE__ */ import_react.default.createElement("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1, viewport-fit=cover"
  }), /* @__PURE__ */ import_react.default.createElement("title", null, "Unhandled Thrown Response!")), /* @__PURE__ */ import_react.default.createElement("body", null, /* @__PURE__ */ import_react.default.createElement("h1", {
    style: {
      fontFamily: "system-ui, sans-serif",
      padding: "2rem"
    }
  }, caught.status, " ", caught.statusText), /* @__PURE__ */ import_react.default.createElement("script", {
    dangerouslySetInnerHTML: {
      __html: `
              console.log(
                "\u{1F4BF} Hey developer\u{1F44B}. You can provide a way better UX than this when your app throws 404s (and other responses). Check out https://remix.run/guides/not-found for more information."
              );
            `
    }
  })));
}

// node_modules/@remix-run/react/dist/esm/invariant.js
function invariant3(value, message) {
  if (value === !1 || value === null || typeof value > "u")
    throw new Error(message);
}

// node_modules/@remix-run/react/dist/esm/links.js
init_dist2();

// node_modules/@remix-run/react/dist/esm/routeModules.js
async function loadRouteModule(route, routeModulesCache) {
  if (route.id in routeModulesCache)
    return routeModulesCache[route.id];
  try {
    let routeModule = await import(
      /* webpackIgnore: true */
      route.module
    );
    return routeModulesCache[route.id] = routeModule, routeModule;
  } catch {
    return window.location.reload(), new Promise(() => {
    });
  }
}

// node_modules/@remix-run/react/dist/esm/links.js
function getLinksForMatches(matches, routeModules, manifest) {
  let descriptors = matches.map((match) => {
    var _module$links;
    let module = routeModules[match.route.id];
    return ((_module$links = module.links) === null || _module$links === void 0 ? void 0 : _module$links.call(module)) || [];
  }).flat(1), preloads = getCurrentPageModulePreloadHrefs(matches, manifest);
  return dedupe(descriptors, preloads);
}
function isPageLinkDescriptor(object) {
  return object != null && typeof object.page == "string";
}
function isHtmlLinkDescriptor(object) {
  return object == null ? !1 : object.href == null ? object.rel === "preload" && (typeof object.imageSrcSet == "string" || typeof object.imagesrcset == "string") && (typeof object.imageSizes == "string" || typeof object.imagesizes == "string") : typeof object.rel == "string" && typeof object.href == "string";
}
async function getStylesheetPrefetchLinks(matches, manifest, routeModules) {
  return (await Promise.all(matches.map(async (match) => {
    let mod = await loadRouteModule(manifest.routes[match.route.id], routeModules);
    return mod.links ? mod.links() : [];
  }))).flat(1).filter(isHtmlLinkDescriptor).filter((link) => link.rel === "stylesheet" || link.rel === "preload").map((link) => link.rel === "preload" ? {
    ...link,
    rel: "prefetch"
  } : {
    ...link,
    rel: "prefetch",
    as: "style"
  });
}
function getNewMatchesForLinks(page, nextMatches, currentMatches, manifest, location2, mode) {
  let path = parsePathPatch(page), isNew = (match, index) => currentMatches[index] ? match.route.id !== currentMatches[index].route.id : !0, matchPathChanged = (match, index) => {
    var _currentMatches$index;
    return (
      // param change, /users/123 -> /users/456
      currentMatches[index].pathname !== match.pathname || // splat param changed, which is not present in match.path
      // e.g. /files/images/avatar.jpg -> files/finances.xls
      ((_currentMatches$index = currentMatches[index].route.path) === null || _currentMatches$index === void 0 ? void 0 : _currentMatches$index.endsWith("*")) && currentMatches[index].params["*"] !== match.params["*"]
    );
  };
  return mode === "data" && location2.search !== path.search ? (
    // this is really similar to stuff in transition.ts, maybe somebody smarter
    // than me (or in less of a hurry) can share some of it. You're the best.
    nextMatches.filter((match, index) => {
      if (!manifest.routes[match.route.id].hasLoader)
        return !1;
      if (isNew(match, index) || matchPathChanged(match, index))
        return !0;
      if (match.route.shouldRevalidate) {
        var _currentMatches$;
        let routeChoice = match.route.shouldRevalidate({
          currentUrl: new URL(location2.pathname + location2.search + location2.hash, window.origin),
          currentParams: ((_currentMatches$ = currentMatches[0]) === null || _currentMatches$ === void 0 ? void 0 : _currentMatches$.params) || {},
          nextUrl: new URL(page, window.origin),
          nextParams: match.params,
          defaultShouldRevalidate: !0
        });
        if (typeof routeChoice == "boolean")
          return routeChoice;
      }
      return !0;
    })
  ) : nextMatches.filter((match, index) => {
    let manifestRoute = manifest.routes[match.route.id];
    return (mode === "assets" || manifestRoute.hasLoader) && (isNew(match, index) || matchPathChanged(match, index));
  });
}
function getDataLinkHrefs(page, matches, manifest) {
  let path = parsePathPatch(page);
  return dedupeHrefs(matches.filter((match) => manifest.routes[match.route.id].hasLoader).map((match) => {
    let {
      pathname,
      search
    } = path, searchParams = new URLSearchParams(search);
    return searchParams.set("_data", match.route.id), `${pathname}?${searchParams}`;
  }));
}
function getModuleLinkHrefs(matches, manifestPatch) {
  return dedupeHrefs(matches.map((match) => {
    let route = manifestPatch.routes[match.route.id], hrefs = [route.module];
    return route.imports && (hrefs = hrefs.concat(route.imports)), hrefs;
  }).flat(1));
}
function getCurrentPageModulePreloadHrefs(matches, manifest) {
  return dedupeHrefs(matches.map((match) => {
    let route = manifest.routes[match.route.id], hrefs = [route.module];
    return route.imports && (hrefs = hrefs.concat(route.imports)), hrefs;
  }).flat(1));
}
function dedupeHrefs(hrefs) {
  return [...new Set(hrefs)];
}
function dedupe(descriptors, preloads) {
  let set = /* @__PURE__ */ new Set(), preloadsSet = new Set(preloads);
  return descriptors.reduce((deduped, descriptor) => {
    if (!isPageLinkDescriptor(descriptor) && descriptor.as === "script" && descriptor.href && preloadsSet.has(descriptor.href))
      return deduped;
    let str = JSON.stringify(descriptor);
    return set.has(str) || (set.add(str), deduped.push(descriptor)), deduped;
  }, []);
}
function parsePathPatch(href) {
  let path = parsePath(href);
  return path.search === void 0 && (path.search = ""), path;
}

// node_modules/@remix-run/react/dist/esm/markup.js
var ESCAPE_LOOKUP2 = {
  "&": "\\u0026",
  ">": "\\u003e",
  "<": "\\u003c",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
}, ESCAPE_REGEX2 = /[&><\u2028\u2029]/g;
function escapeHtml2(html) {
  return html.replace(ESCAPE_REGEX2, (match) => ESCAPE_LOOKUP2[match]);
}
function createHtml(html) {
  return {
    __html: html
  };
}

// node_modules/@remix-run/react/dist/esm/warnings.js
var alreadyWarned3 = {};
function logDeprecationOnce(message, key = message) {
  alreadyWarned3[key] || (alreadyWarned3[key] = !0, console.warn(message));
}

// node_modules/@remix-run/react/dist/esm/components.js
function useDataRouterContext3() {
  let context = React3.useContext(DataRouterContext);
  return invariant3(context, "You must render this element inside a <DataRouterContext.Provider> element"), context;
}
function useDataRouterStateContext() {
  let context = React3.useContext(DataRouterStateContext);
  return invariant3(context, "You must render this element inside a <DataRouterStateContext.Provider> element"), context;
}
var RemixContext = /* @__PURE__ */ React3.createContext(void 0);
RemixContext.displayName = "Remix";
function useRemixContext() {
  let context = React3.useContext(RemixContext);
  return invariant3(context, "You must render this element inside a <Remix> element"), context;
}
function RemixRoute({
  id
}) {
  let {
    routeModules,
    future: future2
  } = useRemixContext();
  invariant3(routeModules, `Cannot initialize 'routeModules'. This normally occurs when you have server code in your client modules.
Check this link for more details:
https://remix.run/pages/gotchas#server-code-in-client-bundles`);
  let {
    default: Component2,
    ErrorBoundary,
    CatchBoundary
  } = routeModules[id];
  return !Component2 && (ErrorBoundary || !future2.v2_errorBoundary && CatchBoundary) && (Component2 = Outlet), invariant3(Component2, `Route "${id}" has no component! Please go add a \`default\` export in the route module file.
If you were trying to navigate or submit to a resource route, use \`<a>\` instead of \`<Link>\` or \`<Form reloadDocument>\`.`), /* @__PURE__ */ React3.createElement(Component2, null);
}
function RemixRouteError({
  id
}) {
  let {
    future: future2,
    routeModules
  } = useRemixContext();
  invariant3(routeModules, `Cannot initialize 'routeModules'. This normally occurs when you have server code in your client modules.
Check this link for more details:
https://remix.run/pages/gotchas#server-code-in-client-bundles`);
  let error = useRouteError(), {
    CatchBoundary,
    ErrorBoundary
  } = routeModules[id];
  if (future2.v2_errorBoundary) {
    if (id === "root" && (ErrorBoundary || (ErrorBoundary = V2_RemixRootDefaultErrorBoundary)), ErrorBoundary)
      return /* @__PURE__ */ React3.createElement(ErrorBoundary, null);
    throw error;
  }
  if (id === "root" && (CatchBoundary || (CatchBoundary = RemixRootDefaultCatchBoundary), ErrorBoundary || (ErrorBoundary = RemixRootDefaultErrorBoundary)), isRouteErrorResponse(error)) {
    let tError = error;
    if (tError != null && tError.error && tError.status !== 404 && ErrorBoundary)
      return /* @__PURE__ */ React3.createElement(ErrorBoundary, {
        error: tError.error
      });
    if (CatchBoundary)
      return /* @__PURE__ */ React3.createElement(RemixCatchBoundary, {
        catch: error,
        component: CatchBoundary
      });
  }
  if (error instanceof Error && ErrorBoundary)
    return /* @__PURE__ */ React3.createElement(ErrorBoundary, {
      error
    });
  throw error;
}
function usePrefetchBehavior(prefetch, theirElementProps) {
  let [maybePrefetch, setMaybePrefetch] = React3.useState(!1), [shouldPrefetch, setShouldPrefetch] = React3.useState(!1), {
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    onTouchStart
  } = theirElementProps, ref = React3.useRef(null);
  React3.useEffect(() => {
    if (prefetch === "render" && setShouldPrefetch(!0), prefetch === "viewport") {
      let callback = (entries) => {
        entries.forEach((entry2) => {
          setShouldPrefetch(entry2.isIntersecting);
        });
      }, observer = new IntersectionObserver(callback, {
        threshold: 0.5
      });
      return ref.current && observer.observe(ref.current), () => {
        observer.disconnect();
      };
    }
  }, [prefetch]);
  let setIntent = () => {
    prefetch === "intent" && setMaybePrefetch(!0);
  }, cancelIntent = () => {
    prefetch === "intent" && (setMaybePrefetch(!1), setShouldPrefetch(!1));
  };
  return React3.useEffect(() => {
    if (maybePrefetch) {
      let id = setTimeout(() => {
        setShouldPrefetch(!0);
      }, 100);
      return () => {
        clearTimeout(id);
      };
    }
  }, [maybePrefetch]), [shouldPrefetch, ref, {
    onFocus: composeEventHandlers(onFocus, setIntent),
    onBlur: composeEventHandlers(onBlur, cancelIntent),
    onMouseEnter: composeEventHandlers(onMouseEnter, setIntent),
    onMouseLeave: composeEventHandlers(onMouseLeave, cancelIntent),
    onTouchStart: composeEventHandlers(onTouchStart, setIntent)
  }];
}
var ABSOLUTE_URL_REGEX3 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, NavLink2 = /* @__PURE__ */ React3.forwardRef(({
  to,
  prefetch = "none",
  ...props
}, forwardedRef) => {
  let isAbsolute = typeof to == "string" && ABSOLUTE_URL_REGEX3.test(to), href = useHref(to), [shouldPrefetch, ref, prefetchHandlers] = usePrefetchBehavior(prefetch, props);
  return /* @__PURE__ */ React3.createElement(React3.Fragment, null, /* @__PURE__ */ React3.createElement(NavLink, _extends4({}, props, prefetchHandlers, {
    ref: mergeRefs(forwardedRef, ref),
    to
  })), shouldPrefetch && !isAbsolute ? /* @__PURE__ */ React3.createElement(PrefetchPageLinks, {
    page: href
  }) : null);
});
NavLink2.displayName = "NavLink";
var Link2 = /* @__PURE__ */ React3.forwardRef(({
  to,
  prefetch = "none",
  ...props
}, forwardedRef) => {
  let isAbsolute = typeof to == "string" && ABSOLUTE_URL_REGEX3.test(to), href = useHref(to), [shouldPrefetch, ref, prefetchHandlers] = usePrefetchBehavior(prefetch, props);
  return /* @__PURE__ */ React3.createElement(React3.Fragment, null, /* @__PURE__ */ React3.createElement(Link, _extends4({}, props, prefetchHandlers, {
    ref: mergeRefs(forwardedRef, ref),
    to
  })), shouldPrefetch && !isAbsolute ? /* @__PURE__ */ React3.createElement(PrefetchPageLinks, {
    page: href
  }) : null);
});
Link2.displayName = "Link";
function composeEventHandlers(theirHandler, ourHandler) {
  return (event) => {
    theirHandler && theirHandler(event), event.defaultPrevented || ourHandler(event);
  };
}
var linksWarning = "\u26A0\uFE0F REMIX FUTURE CHANGE: The behavior of links `imagesizes` and `imagesrcset` will be changing in v2. Only the React camel case versions will be valid. Please change to `imageSizes` and `imageSrcSet`. For instructions on making this change see https://remix.run/docs/en/v1.15.0/pages/v2#links-imagesizes-and-imagesrcset";
function Links() {
  let {
    manifest,
    routeModules
  } = useRemixContext(), {
    errors,
    matches: routerMatches
  } = useDataRouterStateContext(), matches = errors ? routerMatches.slice(0, routerMatches.findIndex((m) => errors[m.route.id]) + 1) : routerMatches, links2 = React3.useMemo(() => getLinksForMatches(matches, routeModules, manifest), [matches, routeModules, manifest]);
  return React3.useEffect(() => {
    links2.some((link) => "imagesizes" in link || "imagesrcset" in link) && logDeprecationOnce(linksWarning);
  }, [links2]), /* @__PURE__ */ React3.createElement(React3.Fragment, null, links2.map((link) => {
    if (isPageLinkDescriptor(link))
      return /* @__PURE__ */ React3.createElement(PrefetchPageLinks, _extends4({
        key: link.page
      }, link));
    let imageSrcSet = null;
    return "useId" in React3 ? (link.imagesrcset && (link.imageSrcSet = imageSrcSet = link.imagesrcset, delete link.imagesrcset), link.imagesizes && (link.imageSizes = link.imagesizes, delete link.imagesizes)) : (link.imageSrcSet && (link.imagesrcset = imageSrcSet = link.imageSrcSet, delete link.imageSrcSet), link.imageSizes && (link.imagesizes = link.imageSizes, delete link.imageSizes)), /* @__PURE__ */ React3.createElement("link", _extends4({
      key: link.rel + (link.href || "") + (imageSrcSet || "")
    }, link));
  }));
}
function PrefetchPageLinks({
  page,
  ...dataLinkProps
}) {
  let {
    router
  } = useDataRouterContext3(), matches = React3.useMemo(() => matchRoutes(router.routes, page), [router.routes, page]);
  return matches ? /* @__PURE__ */ React3.createElement(PrefetchPageLinksImpl, _extends4({
    page,
    matches
  }, dataLinkProps)) : (console.warn(`Tried to prefetch ${page} but no routes matched.`), null);
}
function usePrefetchedStylesheets(matches) {
  let {
    manifest,
    routeModules
  } = useRemixContext(), [styleLinks, setStyleLinks] = React3.useState([]);
  return React3.useEffect(() => {
    let interrupted = !1;
    return getStylesheetPrefetchLinks(matches, manifest, routeModules).then((links2) => {
      interrupted || setStyleLinks(links2);
    }), () => {
      interrupted = !0;
    };
  }, [matches, manifest, routeModules]), styleLinks;
}
function PrefetchPageLinksImpl({
  page,
  matches: nextMatches,
  ...linkProps
}) {
  let location2 = useLocation(), {
    manifest
  } = useRemixContext(), {
    matches
  } = useDataRouterStateContext(), newMatchesForData = React3.useMemo(() => getNewMatchesForLinks(page, nextMatches, matches, manifest, location2, "data"), [page, nextMatches, matches, manifest, location2]), newMatchesForAssets = React3.useMemo(() => getNewMatchesForLinks(page, nextMatches, matches, manifest, location2, "assets"), [page, nextMatches, matches, manifest, location2]), dataHrefs = React3.useMemo(() => getDataLinkHrefs(page, newMatchesForData, manifest), [newMatchesForData, page, manifest]), moduleHrefs = React3.useMemo(() => getModuleLinkHrefs(newMatchesForAssets, manifest), [newMatchesForAssets, manifest]), styleLinks = usePrefetchedStylesheets(newMatchesForAssets);
  return /* @__PURE__ */ React3.createElement(React3.Fragment, null, dataHrefs.map((href) => /* @__PURE__ */ React3.createElement("link", _extends4({
    key: href,
    rel: "prefetch",
    as: "fetch",
    href
  }, linkProps))), moduleHrefs.map((href) => /* @__PURE__ */ React3.createElement("link", _extends4({
    key: href,
    rel: "modulepreload",
    href
  }, linkProps))), styleLinks.map((link) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ React3.createElement("link", _extends4({
      key: link.href
    }, link))
  )));
}
function V1Meta() {
  let {
    routeModules
  } = useRemixContext(), {
    errors,
    matches: routerMatches,
    loaderData
  } = useDataRouterStateContext(), location2 = useLocation(), matches = errors ? routerMatches.slice(0, routerMatches.findIndex((m) => errors[m.route.id]) + 1) : routerMatches, meta2 = {}, parentsData = {};
  for (let match of matches) {
    let routeId = match.route.id, data = loaderData[routeId], params = match.params, routeModule = routeModules[routeId];
    if (routeModule.meta) {
      let routeMeta = typeof routeModule.meta == "function" ? routeModule.meta({
        data,
        parentsData,
        params,
        location: location2
      }) : routeModule.meta;
      if (routeMeta && Array.isArray(routeMeta))
        throw new Error(
          "The route at " + match.route.path + " returns an array. This is only supported with the `v2_meta` future flag in the Remix config. Either set the flag to `true` or update the route's meta function to return an object.\n\nTo reference the v1 meta function API, see https://remix.run/route/meta"
          // TODO: Add link to the docs once they are written
          // + "\n\nTo reference future flags and the v2 meta API, see https://remix.run/file-conventions/remix-config#future-v2-meta."
        );
      Object.assign(meta2, routeMeta);
    }
    parentsData[routeId] = data;
  }
  return /* @__PURE__ */ React3.createElement(React3.Fragment, null, Object.entries(meta2).map(([name, value]) => {
    if (!value)
      return null;
    if (["charset", "charSet"].includes(name))
      return /* @__PURE__ */ React3.createElement("meta", {
        key: "charSet",
        charSet: value
      });
    if (name === "title")
      return /* @__PURE__ */ React3.createElement("title", {
        key: "title"
      }, String(value));
    let isOpenGraphTag = /^(og|music|video|article|book|profile|fb):.+$/.test(name);
    return [value].flat().map((content) => isOpenGraphTag ? /* @__PURE__ */ React3.createElement("meta", {
      property: name,
      content,
      key: name + content
    }) : typeof content == "string" ? /* @__PURE__ */ React3.createElement("meta", {
      name,
      content,
      key: name + content
    }) : /* @__PURE__ */ React3.createElement("meta", _extends4({
      key: name + JSON.stringify(content)
    }, content)));
  }));
}
function V2Meta() {
  let {
    routeModules
  } = useRemixContext(), {
    errors,
    matches: routerMatches,
    loaderData
  } = useDataRouterStateContext(), location2 = useLocation(), _matches = errors ? routerMatches.slice(0, routerMatches.findIndex((m) => errors[m.route.id]) + 1) : routerMatches, meta2 = [], leafMeta = null, matches = [];
  for (let i = 0; i < _matches.length; i++) {
    let _match = _matches[i], routeId = _match.route.id, data = loaderData[routeId], params = _match.params, routeModule = routeModules[routeId], routeMeta = [], match = {
      id: routeId,
      data,
      meta: [],
      params: _match.params,
      pathname: _match.pathname,
      handle: _match.route.handle,
      // TODO: Remove in v2. Only leaving it for now because we used it in
      // examples and there's no reason to crash someone's build for one line.
      // They'll get a TS error from the type updates anyway.
      // @ts-expect-error
      get route() {
        return console.warn("The meta function in " + _match.route.path + " accesses the `route` property on `matches`. This is deprecated and will be removed in Remix version 2. See"), _match.route;
      }
    };
    if (matches[i] = match, routeModule != null && routeModule.meta ? routeMeta = typeof routeModule.meta == "function" ? routeModule.meta({
      data,
      params,
      location: location2,
      matches
    }) : Array.isArray(routeModule.meta) ? [...routeModule.meta] : routeModule.meta : leafMeta && (routeMeta = [...leafMeta]), routeMeta = routeMeta || [], !Array.isArray(routeMeta))
      throw new Error("The `v2_meta` API is enabled in the Remix config, but the route at " + _match.route.path + ` returns an invalid value. In v2, all route meta functions must return an array of meta objects.

To reference the v1 meta function API, see https://remix.run/route/meta`);
    match.meta = routeMeta, matches[i] = match, meta2 = [...routeMeta], leafMeta = meta2;
  }
  return /* @__PURE__ */ React3.createElement(React3.Fragment, null, meta2.flat().map((metaProps) => {
    if (!metaProps)
      return null;
    if ("tagName" in metaProps) {
      let tagName = metaProps.tagName;
      return delete metaProps.tagName, isValidMetaTag(tagName) ? /* @__PURE__ */ React3.createElement(tagName, _extends4({
        key: JSON.stringify(metaProps)
      }, metaProps)) : (console.warn(`A meta object uses an invalid tagName: ${tagName}. Expected either 'link' or 'meta'`), null);
    }
    if ("title" in metaProps)
      return /* @__PURE__ */ React3.createElement("title", {
        key: "title"
      }, String(metaProps.title));
    if ("charset" in metaProps && (metaProps.charSet ?? (metaProps.charSet = metaProps.charset), delete metaProps.charset), "charSet" in metaProps && metaProps.charSet != null)
      return typeof metaProps.charSet == "string" ? /* @__PURE__ */ React3.createElement("meta", {
        key: "charSet",
        charSet: metaProps.charSet
      }) : null;
    if ("script:ld+json" in metaProps) {
      let json6 = null;
      try {
        json6 = JSON.stringify(metaProps["script:ld+json"]);
      } catch {
      }
      return json6 != null && /* @__PURE__ */ React3.createElement("script", {
        key: "script:ld+json",
        type: "application/ld+json",
        dangerouslySetInnerHTML: {
          __html: JSON.stringify(metaProps["script:ld+json"])
        }
      });
    }
    return /* @__PURE__ */ React3.createElement("meta", _extends4({
      key: JSON.stringify(metaProps)
    }, metaProps));
  }));
}
function isValidMetaTag(tagName) {
  return typeof tagName == "string" && /^(meta|link)$/.test(tagName);
}
function Meta() {
  let {
    future: future2
  } = useRemixContext();
  return future2 != null && future2.v2_meta ? /* @__PURE__ */ React3.createElement(V2Meta, null) : /* @__PURE__ */ React3.createElement(V1Meta, null);
}
function Await2(props) {
  return /* @__PURE__ */ React3.createElement(Await, props);
}
var isHydrated = !1;
function Scripts(props) {
  let {
    manifest,
    serverHandoffString,
    abortDelay,
    serializeError: serializeError2
  } = useRemixContext(), {
    router,
    static: isStatic,
    staticContext
  } = useDataRouterContext3(), {
    matches
  } = useDataRouterStateContext(), navigation = useNavigation();
  React3.useEffect(() => {
    isHydrated = !0;
  }, []);
  let serializePreResolvedErrorImp = (key, error) => {
    let toSerialize;
    return serializeError2 && error instanceof Error ? toSerialize = serializeError2(error) : toSerialize = error, `${JSON.stringify(key)}:__remixContext.p(!1, ${escapeHtml2(JSON.stringify(toSerialize))})`;
  }, serializePreresolvedDataImp = (routeId, key, data) => {
    let serializedData;
    try {
      serializedData = JSON.stringify(data);
    } catch (error) {
      return serializePreResolvedErrorImp(key, error);
    }
    return `${JSON.stringify(key)}:__remixContext.p(${escapeHtml2(serializedData)})`;
  }, serializeErrorImp = (routeId, key, error) => {
    let toSerialize;
    return serializeError2 && error instanceof Error ? toSerialize = serializeError2(error) : toSerialize = error, `__remixContext.r(${JSON.stringify(routeId)}, ${JSON.stringify(key)}, !1, ${escapeHtml2(JSON.stringify(toSerialize))})`;
  }, serializeDataImp = (routeId, key, data) => {
    let serializedData;
    try {
      serializedData = JSON.stringify(data);
    } catch (error) {
      return serializeErrorImp(routeId, key, error);
    }
    return `__remixContext.r(${JSON.stringify(routeId)}, ${JSON.stringify(key)}, ${escapeHtml2(serializedData)})`;
  }, deferredScripts = [], initialScripts = React3.useMemo(() => {
    var _manifest$hmr;
    let contextScript = staticContext ? `window.__remixContext = ${serverHandoffString};` : " ", activeDeferreds = staticContext == null ? void 0 : staticContext.activeDeferreds;
    contextScript += activeDeferreds ? ["__remixContext.p = function(v,e,p,x) {", "  if (typeof e !== 'undefined') {", `    x=new Error(e.message);
    x.stack=e.stack;`, "    p=Promise.reject(x);", "  } else {", "    p=Promise.resolve(v);", "  }", "  return p;", "};", "__remixContext.n = function(i,k) {", "  __remixContext.t = __remixContext.t || {};", "  __remixContext.t[i] = __remixContext.t[i] || {};", "  let p = new Promise((r, e) => {__remixContext.t[i][k] = {r:(v)=>{r(v);},e:(v)=>{e(v);}};});", typeof abortDelay == "number" ? `setTimeout(() => {if(typeof p._error !== "undefined" || typeof p._data !== "undefined"){return;} __remixContext.t[i][k].e(new Error("Server timeout."))}, ${abortDelay});` : "", "  return p;", "};", "__remixContext.r = function(i,k,v,e,p,x) {", "  p = __remixContext.t[i][k];", "  if (typeof e !== 'undefined') {", `    x=new Error(e.message);
    x.stack=e.stack;`, "    p.e(x);", "  } else {", "    p.r(v);", "  }", "};"].join(`
`) + Object.entries(activeDeferreds).map(([routeId, deferredData]) => {
      let pendingKeys = new Set(deferredData.pendingKeys), promiseKeyValues = deferredData.deferredKeys.map((key) => {
        if (pendingKeys.has(key))
          return deferredScripts.push(/* @__PURE__ */ React3.createElement(DeferredHydrationScript, {
            key: `${routeId} | ${key}`,
            deferredData,
            routeId,
            dataKey: key,
            scriptProps: props,
            serializeData: serializeDataImp,
            serializeError: serializeErrorImp
          })), `${JSON.stringify(key)}:__remixContext.n(${JSON.stringify(routeId)}, ${JSON.stringify(key)})`;
        {
          let trackedPromise = deferredData.data[key];
          return typeof trackedPromise._error < "u" ? serializePreResolvedErrorImp(key, trackedPromise._error) : serializePreresolvedDataImp(routeId, key, trackedPromise._data);
        }
      }).join(`,
`);
      return `Object.assign(__remixContext.state.loaderData[${JSON.stringify(routeId)}], {${promiseKeyValues}});`;
    }).join(`
`) + (deferredScripts.length > 0 ? `__remixContext.a=${deferredScripts.length};` : "") : "";
    let routeModulesScript = isStatic ? `${(_manifest$hmr = manifest.hmr) !== null && _manifest$hmr !== void 0 && _manifest$hmr.runtime ? `import ${JSON.stringify(manifest.hmr.runtime)};` : ""}import ${JSON.stringify(manifest.url)};
${matches.map((match, index) => `import * as route${index} from ${JSON.stringify(manifest.routes[match.route.id].module)};`).join(`
`)}
window.__remixRouteModules = {${matches.map((match, index) => `${JSON.stringify(match.route.id)}:route${index}`).join(",")}};

import(${JSON.stringify(manifest.entry.module)});` : " ";
    return /* @__PURE__ */ React3.createElement(React3.Fragment, null, /* @__PURE__ */ React3.createElement("script", _extends4({}, props, {
      suppressHydrationWarning: !0,
      dangerouslySetInnerHTML: createHtml(contextScript),
      type: void 0
    })), /* @__PURE__ */ React3.createElement("script", _extends4({}, props, {
      suppressHydrationWarning: !0,
      dangerouslySetInnerHTML: createHtml(routeModulesScript),
      type: "module",
      async: !0
    })));
  }, []);
  if (!isStatic && typeof __remixContext == "object" && __remixContext.a)
    for (let i = 0; i < __remixContext.a; i++)
      deferredScripts.push(/* @__PURE__ */ React3.createElement(DeferredHydrationScript, {
        key: i,
        scriptProps: props,
        serializeData: serializeDataImp,
        serializeError: serializeErrorImp
      }));
  let nextMatches = React3.useMemo(() => {
    if (navigation.location) {
      let matches2 = matchRoutes(router.routes, navigation.location);
      return invariant3(matches2, `No routes match path "${navigation.location.pathname}"`), matches2;
    }
    return [];
  }, [navigation.location, router.routes]), routePreloads = matches.concat(nextMatches).map((match) => {
    let route = manifest.routes[match.route.id];
    return (route.imports || []).concat([route.module]);
  }).flat(1), preloads = isHydrated ? [] : manifest.entry.imports.concat(routePreloads);
  return isHydrated ? null : /* @__PURE__ */ React3.createElement(React3.Fragment, null, /* @__PURE__ */ React3.createElement("link", {
    rel: "modulepreload",
    href: manifest.entry.module,
    crossOrigin: props.crossOrigin
  }), dedupe2(preloads).map((path) => /* @__PURE__ */ React3.createElement("link", {
    key: path,
    rel: "modulepreload",
    href: path,
    crossOrigin: props.crossOrigin
  })), initialScripts, deferredScripts);
}
function DeferredHydrationScript({
  dataKey,
  deferredData,
  routeId,
  scriptProps,
  serializeData,
  serializeError: serializeError2
}) {
  return typeof document > "u" && deferredData && dataKey && routeId && invariant3(deferredData.pendingKeys.includes(dataKey), `Deferred data for route ${routeId} with key ${dataKey} was not pending but tried to render a script for it.`), /* @__PURE__ */ React3.createElement(React3.Suspense, {
    fallback: (
      // This makes absolutely no sense. The server renders null as a fallback,
      // but when hydrating, we need to render a script tag to avoid a hydration issue.
      // To reproduce a hydration mismatch, just render null as a fallback.
      typeof document > "u" && deferredData && dataKey && routeId ? null : /* @__PURE__ */ React3.createElement("script", _extends4({}, scriptProps, {
        async: !0,
        suppressHydrationWarning: !0,
        dangerouslySetInnerHTML: {
          __html: " "
        }
      }))
    )
  }, typeof document > "u" && deferredData && dataKey && routeId ? /* @__PURE__ */ React3.createElement(Await2, {
    resolve: deferredData.data[dataKey],
    errorElement: /* @__PURE__ */ React3.createElement(ErrorDeferredHydrationScript, {
      dataKey,
      routeId,
      scriptProps,
      serializeError: serializeError2
    }),
    children: (data) => /* @__PURE__ */ React3.createElement("script", _extends4({}, scriptProps, {
      async: !0,
      suppressHydrationWarning: !0,
      dangerouslySetInnerHTML: {
        __html: serializeData(routeId, dataKey, data)
      }
    }))
  }) : /* @__PURE__ */ React3.createElement("script", _extends4({}, scriptProps, {
    async: !0,
    suppressHydrationWarning: !0,
    dangerouslySetInnerHTML: {
      __html: " "
    }
  })));
}
function ErrorDeferredHydrationScript({
  dataKey,
  routeId,
  scriptProps,
  serializeError: serializeError2
}) {
  let error = useAsyncError();
  return /* @__PURE__ */ React3.createElement("script", _extends4({}, scriptProps, {
    suppressHydrationWarning: !0,
    dangerouslySetInnerHTML: {
      __html: serializeError2(routeId, dataKey, error)
    }
  }));
}
function dedupe2(array) {
  return [...new Set(array)];
}
function useMatches2() {
  let {
    routeModules
  } = useRemixContext(), matches = useMatches();
  return React3.useMemo(() => matches.map((match) => ({
    id: match.id,
    pathname: match.pathname,
    params: match.params,
    data: match.data,
    // Need to grab handle here since we don't have it at client-side route
    // creation time
    handle: routeModules[match.id].handle
  })), [matches, routeModules]);
}
function useLoaderData2() {
  return useLoaderData();
}
var LiveReload = function({
  port,
  timeoutMs = 1e3,
  nonce = void 0
}) {
  let js = String.raw;
  return /* @__PURE__ */ React3.createElement("script", {
    nonce,
    suppressHydrationWarning: !0,
    dangerouslySetInnerHTML: {
      __html: js`
                function remixLiveReloadConnect(config) {
                  let REMIX_DEV_ORIGIN = ${JSON.stringify("")};
                  let protocol =
                    REMIX_DEV_ORIGIN ? new URL(REMIX_DEV_ORIGIN).protocol.replace(/^http/, "ws") :
                    location.protocol === "https:" ? "wss:" : "ws:"; // remove in v2?
                  let hostname = location.hostname;
                  let url = new URL(protocol + "//" + hostname + "/socket");

                  url.port =
                    ${port} ||
                    REMIX_DEV_ORIGIN ? new URL(REMIX_DEV_ORIGIN).port :
                    Number(${// TODO: remove in v2
      8002}) ||
                    8002;

                  let ws = new WebSocket(url.href);
                  ws.onmessage = async (message) => {
                    let event = JSON.parse(message.data);
                    if (event.type === "LOG") {
                      console.log(event.message);
                    }
                    if (event.type === "RELOAD") {
                      console.log("💿 Reloading window ...");
                      window.location.reload();
                    }
                    if (event.type === "HMR") {
                      if (!window.__hmr__ || !window.__hmr__.contexts) {
                        console.log("💿 [HMR] No HMR context, reloading window ...");
                        window.location.reload();
                        return;
                      }
                      if (!event.updates || !event.updates.length) return;
                      let updateAccepted = false;
                      let needsRevalidation = new Set();
                      for (let update of event.updates) {
                        console.log("[HMR] " + update.reason + " [" + update.id +"]")
                        if (update.revalidate) {
                          needsRevalidation.add(update.routeId);
                          console.log("[HMR] Revalidating [" + update.routeId + "]");
                        }
                        let imported = await import(update.url +  '?t=' + event.assetsManifest.hmr.timestamp);
                        if (window.__hmr__.contexts[update.id]) {
                          let accepted = window.__hmr__.contexts[update.id].emit(
                            imported
                          );
                          if (accepted) {
                            console.log("[HMR] Updated accepted by", update.id);
                            updateAccepted = true;
                          }
                        }
                      }
                      if (event.assetsManifest && window.__hmr__.contexts["remix:manifest"]) {
                        let accepted = window.__hmr__.contexts["remix:manifest"].emit(
                          { needsRevalidation, assetsManifest: event.assetsManifest }
                        );
                        if (accepted) {
                          console.log("[HMR] Updated accepted by", "remix:manifest");
                          updateAccepted = true;
                        }
                      }
                      if (!updateAccepted) {
                        console.log("[HMR] Updated rejected, reloading...");
                        window.location.reload();
                      }
                    }
                  };
                  ws.onopen = () => {
                    if (config && typeof config.onOpen === "function") {
                      config.onOpen();
                    }
                  };
                  ws.onclose = (event) => {
                    if (event.code === 1006) {
                      console.log("Remix dev asset server web socket closed. Reconnecting...");
                      setTimeout(
                        () =>
                          remixLiveReloadConnect({
                            onOpen: () => window.location.reload(),
                          }),
                      ${String(timeoutMs)}
                      );
                    }
                  };
                  ws.onerror = (error) => {
                    console.log("Remix dev asset server web socket error:");
                    console.error(error);
                  };
                }
                remixLiveReloadConnect();
              `
    }
  });
};
function mergeRefs(...refs) {
  return (value) => {
    refs.forEach((ref) => {
      typeof ref == "function" ? ref(value) : ref != null && (ref.current = value);
    });
  };
}

// node_modules/@remix-run/react/dist/esm/routes.js
var React4 = __toESM(require_react());
function groupRoutesByParentId2(manifest) {
  let routes2 = {};
  return Object.values(manifest).forEach((route) => {
    let parentId = route.parentId || "";
    routes2[parentId] || (routes2[parentId] = []), routes2[parentId].push(route);
  }), routes2;
}
function createServerRoutes(manifest, routeModules, future2, parentId = "", routesByParentId = groupRoutesByParentId2(manifest)) {
  return (routesByParentId[parentId] || []).map((route) => {
    let hasErrorBoundary = future2.v2_errorBoundary === !0 ? route.id === "root" || route.hasErrorBoundary : route.id === "root" || route.hasCatchBoundary || route.hasErrorBoundary, dataRoute = {
      caseSensitive: route.caseSensitive,
      element: /* @__PURE__ */ React4.createElement(RemixRoute, {
        id: route.id
      }),
      errorElement: hasErrorBoundary ? /* @__PURE__ */ React4.createElement(RemixRouteError, {
        id: route.id
      }) : void 0,
      id: route.id,
      index: route.index,
      path: route.path,
      handle: routeModules[route.id].handle
      // Note: we don't need loader/action/shouldRevalidate on these routes
      // since they're for a static render
    }, children = createServerRoutes(manifest, routeModules, future2, route.id, routesByParentId);
    return children.length > 0 && (dataRoute.children = children), dataRoute;
  });
}

// node_modules/@remix-run/react/dist/esm/index.js
init_dist2();

// node_modules/@remix-run/react/dist/esm/scroll-restoration.js
var React5 = __toESM(require_react());
init_dist2();
var STORAGE_KEY = "positions";
function ScrollRestoration2({
  getKey,
  ...props
}) {
  let location2 = useLocation(), matches = useMatches2();
  useScrollRestoration({
    getKey,
    storageKey: STORAGE_KEY
  });
  let key = React5.useMemo(
    () => {
      if (!getKey)
        return null;
      let userKey = getKey(location2, matches);
      return userKey !== location2.key ? userKey : null;
    },
    // Nah, we only need this the first time for the SSR render
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  ), restoreScroll = ((STORAGE_KEY2, restoreKey) => {
    if (!window.history.state || !window.history.state.key) {
      let key2 = Math.random().toString(32).slice(2);
      window.history.replaceState({
        key: key2
      }, "");
    }
    try {
      let storedY = JSON.parse(sessionStorage.getItem(STORAGE_KEY2) || "{}")[restoreKey || window.history.state.key];
      typeof storedY == "number" && window.scrollTo(0, storedY);
    } catch (error) {
      console.error(error), sessionStorage.removeItem(STORAGE_KEY2);
    }
  }).toString();
  return /* @__PURE__ */ React5.createElement("script", _extends4({}, props, {
    suppressHydrationWarning: !0,
    dangerouslySetInnerHTML: {
      __html: `(${restoreScroll})(${JSON.stringify(STORAGE_KEY)}, ${JSON.stringify(key)})`
    }
  }));
}

// node_modules/@remix-run/react/dist/esm/server.js
var React6 = __toESM(require_react()), import_server2 = __toESM(require_server());
function RemixServer({
  context,
  url,
  abortDelay
}) {
  typeof url == "string" && (url = new URL(url));
  let {
    manifest,
    routeModules,
    serverHandoffString
  } = context, routes2 = createServerRoutes(manifest.routes, routeModules, context.future), router = (0, import_server2.createStaticRouter)(routes2, context.staticHandlerContext);
  return /* @__PURE__ */ React6.createElement(RemixContext.Provider, {
    value: {
      manifest,
      routeModules,
      serverHandoffString,
      future: context.future,
      serializeError: context.serializeError,
      abortDelay
    }
  }, /* @__PURE__ */ React6.createElement(RemixErrorBoundary, {
    location: router.state.location,
    component: RemixRootDefaultErrorBoundary
  }, /* @__PURE__ */ React6.createElement(import_server2.StaticRouterProvider, {
    router,
    context: context.staticHandlerContext,
    hydrate: !1
  })));
}

// node_modules/isbot/index.mjs
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol < "u" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, i === 0) {
        if (Object(_i) !== _i)
          return;
        _n = !1;
      } else
        for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0)
          ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && _i.return != null && (_r = _i.return(), Object(_r) !== _r))
          return;
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", {
    writable: !1
  }), Constructor;
}
function _defineProperty(obj, key, value) {
  return key = _toPropertyKey(key), key in obj ? Object.defineProperty(obj, key, {
    value,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : obj[key] = value, obj;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray(o, minLen);
  }
}
function _arrayLikeToArray(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function _toPrimitive(input, hint) {
  if (typeof input != "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (typeof res != "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key == "symbol" ? key : String(key);
}
function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");
  return _classApplyDescriptorGet(receiver, descriptor);
}
function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");
  return _classApplyDescriptorSet(receiver, descriptor, value), value;
}
function _classExtractFieldDescriptor(receiver, privateMap, action) {
  if (!privateMap.has(receiver))
    throw new TypeError("attempted to " + action + " private field on non-instance");
  return privateMap.get(receiver);
}
function _classApplyDescriptorGet(receiver, descriptor) {
  return descriptor.get ? descriptor.get.call(receiver) : descriptor.value;
}
function _classApplyDescriptorSet(receiver, descriptor, value) {
  if (descriptor.set)
    descriptor.set.call(receiver, value);
  else {
    if (!descriptor.writable)
      throw new TypeError("attempted to set read only private field");
    descriptor.value = value;
  }
}
function _classPrivateMethodGet(receiver, privateSet, fn) {
  if (!privateSet.has(receiver))
    throw new TypeError("attempted to get private field on non-instance");
  return fn;
}
function _checkPrivateRedeclaration(obj, privateCollection) {
  if (privateCollection.has(obj))
    throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function _classPrivateFieldInitSpec(obj, privateMap, value) {
  _checkPrivateRedeclaration(obj, privateMap), privateMap.set(obj, value);
}
function _classPrivateMethodInitSpec(obj, privateSet) {
  _checkPrivateRedeclaration(obj, privateSet), privateSet.add(obj);
}
var list = [
  " daum[ /]",
  " deusu/",
  " yadirectfetcher",
  "(?:^| )site",
  "(?:^|[^g])news",
  "@[a-z]",
  "\\(at\\)[a-z]",
  "\\(github\\.com/",
  "\\[at\\][a-z]",
  "^12345",
  "^<",
  "^[\\w \\.\\-\\(\\)]+(/v?\\d+(\\.\\d+)?(\\.\\d{1,10})?)?$",
  "^[^ ]{50,}$",
  "^active",
  "^ad muncher",
  "^amaya",
  "^anglesharp/",
  "^anonymous",
  "^avsdevicesdk/",
  "^axios/",
  "^bidtellect/",
  "^biglotron",
  "^btwebclient/",
  "^castro",
  "^clamav[ /]",
  "^client/",
  "^cobweb/",
  "^coccoc",
  "^custom",
  "^ddg[_-]android",
  "^discourse",
  "^dispatch/\\d",
  "^downcast/",
  "^duckduckgo",
  "^facebook",
  "^fdm[ /]\\d",
  "^getright/",
  "^gozilla/",
  "^hatena",
  "^hobbit",
  "^hotzonu",
  "^hwcdn/",
  "^jeode/",
  "^jetty/",
  "^jigsaw",
  "^linkdex",
  "^lwp[-: ]",
  "^metauri",
  "^microsoft bits",
  "^movabletype",
  "^mozilla/\\d\\.\\d \\(compatible;?\\)$",
  "^mozilla/\\d\\.\\d \\w*$",
  "^navermailapp",
  "^netsurf",
  "^offline explorer",
  "^php",
  "^postman",
  "^postrank",
  "^python",
  "^read",
  "^reed",
  "^restsharp/",
  "^snapchat",
  "^space bison",
  "^svn",
  "^swcd ",
  "^taringa",
  "^test certificate info",
  "^thumbor/",
  "^tumblr/",
  "^user-agent:mozilla",
  "^valid",
  "^venus/fedoraplanet",
  "^w3c",
  "^webbandit/",
  "^webcopier",
  "^wget",
  "^whatsapp",
  "^xenu link sleuth",
  "^yahoo",
  "^yandex",
  "^zdm/\\d",
  "^zoom marketplace/",
  "^{{.*}}$",
  "adbeat\\.com",
  "appinsights",
  "archive",
  "ask jeeves/teoma",
  "bit\\.ly/",
  "bluecoat drtr",
  "bot",
  "browsex",
  "burpcollaborator",
  "capture",
  "catch",
  "check",
  "chrome-lighthouse",
  "chromeframe",
  "cloud",
  "crawl",
  "cryptoapi",
  "dareboost",
  "datanyze",
  "dataprovider",
  "dejaclick",
  "dmbrowser",
  "download",
  "evc-batch/",
  "feed",
  "firephp",
  "freesafeip",
  "ghost",
  "gomezagent",
  "google",
  "headlesschrome/",
  "http",
  "httrack",
  "hubspot marketing grader",
  "hydra",
  "ibisbrowser",
  "images",
  "iplabel",
  "ips-agent",
  "java",
  "library",
  "mail\\.ru/",
  "manager",
  "monitor",
  "morningscore/",
  "neustar wpm",
  "nutch",
  "offbyone",
  "optimize",
  "pageburst",
  "pagespeed",
  "perl",
  "phantom",
  "pingdom",
  "powermarks",
  "preview",
  "proxy",
  "ptst[ /]\\d",
  "reader",
  "rexx;",
  "rigor",
  "rss",
  "scan",
  "scrape",
  "search",
  "serp ?reputation ?management",
  "server",
  "sogou",
  "sparkler/",
  "speedcurve",
  "spider",
  "splash",
  "statuscake",
  "stumbleupon\\.com",
  "supercleaner",
  "synapse",
  "synthetic",
  "taginspector/",
  "torrent",
  "tracemyfile",
  "transcoder",
  "trendsmapresolver",
  "twingly recon",
  "url",
  "virtuoso",
  "wappalyzer",
  "webglance",
  "webkit2png",
  "websitemetadataretriever",
  "whatcms/",
  "wordpress",
  "zgrab"
];
function amend(list2) {
  try {
    new RegExp("(?<! cu)bot").test("dangerbot");
  } catch {
    return list2;
  }
  return [
    // Addresses: Cubot device
    ["bot", "(?<! cu)bot"],
    // Addresses: Android webview
    ["google", "(?<! (?:channel/|google/))google(?!(app|/google| pixel))"],
    // Addresses: libhttp browser
    ["http", "(?<!(?:lib))http"],
    // Addresses: java based browsers
    ["java", "java(?!;)"],
    // Addresses: Yandex Search App
    ["search", "(?<! ya(?:yandex)?)search"]
  ].forEach(function(_ref) {
    var _ref2 = _slicedToArray(_ref, 2), search = _ref2[0], replace = _ref2[1], index = list2.lastIndexOf(search);
    ~index && list2.splice(index, 1, replace);
  }), list2;
}
amend(list);
var flags = "i", _list = /* @__PURE__ */ new WeakMap(), _pattern = /* @__PURE__ */ new WeakMap(), _update = /* @__PURE__ */ new WeakSet(), _index = /* @__PURE__ */ new WeakSet(), Isbot = /* @__PURE__ */ function() {
  function Isbot2(patterns) {
    var _this = this;
    _classCallCheck(this, Isbot2), _classPrivateMethodInitSpec(this, _index), _classPrivateMethodInitSpec(this, _update), _classPrivateFieldInitSpec(this, _list, {
      writable: !0,
      value: void 0
    }), _classPrivateFieldInitSpec(this, _pattern, {
      writable: !0,
      value: void 0
    }), _classPrivateFieldSet(this, _list, patterns || list.slice()), _classPrivateMethodGet(this, _update, _update2).call(this);
    var isbot2 = function(ua) {
      return _this.test(ua);
    };
    return Object.defineProperties(isbot2, Object.entries(Object.getOwnPropertyDescriptors(Isbot2.prototype)).reduce(function(accumulator, _ref) {
      var _ref2 = _slicedToArray(_ref, 2), prop = _ref2[0], descriptor = _ref2[1];
      return typeof descriptor.value == "function" && Object.assign(accumulator, _defineProperty({}, prop, {
        value: _this[prop].bind(_this)
      })), typeof descriptor.get == "function" && Object.assign(accumulator, _defineProperty({}, prop, {
        get: function() {
          return _this[prop];
        }
      })), accumulator;
    }, {}));
  }
  return _createClass(Isbot2, [{
    key: "pattern",
    get: (
      /**
       * Get a clone of the pattern
       * @type RegExp
       */
      function() {
        return new RegExp(_classPrivateFieldGet(this, _pattern));
      }
    )
    /**
     * Match given string against out pattern
     * @param  {string} ua User Agent string
     * @returns {boolean}
     */
  }, {
    key: "test",
    value: function(ua) {
      return Boolean(ua) && _classPrivateFieldGet(this, _pattern).test(ua);
    }
    /**
     * Get the match for strings' known crawler pattern
     * @param  {string} ua User Agent string
     * @returns {string|null}
     */
  }, {
    key: "find",
    value: function() {
      var ua = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", match = ua.match(_classPrivateFieldGet(this, _pattern));
      return match && match[0];
    }
    /**
     * Get the patterns that match user agent string if any
     * @param  {string} ua User Agent string
     * @returns {string[]}
     */
  }, {
    key: "matches",
    value: function() {
      var ua = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
      return _classPrivateFieldGet(this, _list).filter(function(entry2) {
        return new RegExp(entry2, flags).test(ua);
      });
    }
    /**
     * Clear all patterns that match user agent
     * @param  {string} ua User Agent string
     * @returns {void}
     */
  }, {
    key: "clear",
    value: function() {
      var ua = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
      this.exclude(this.matches(ua));
    }
    /**
     * Extent patterns for known crawlers
     * @param  {string[]} filters
     * @returns {void}
     */
  }, {
    key: "extend",
    value: function() {
      var _this2 = this, filters = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
      [].push.apply(_classPrivateFieldGet(this, _list), filters.filter(function(rule) {
        return _classPrivateMethodGet(_this2, _index, _index2).call(_this2, rule) === -1;
      }).map(function(filter) {
        return filter.toLowerCase();
      })), _classPrivateMethodGet(this, _update, _update2).call(this);
    }
    /**
     * Exclude patterns from bot pattern rule
     * @param  {string[]} filters
     * @returns {void}
     */
  }, {
    key: "exclude",
    value: function() {
      for (var filters = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], length = filters.length; length--; ) {
        var index = _classPrivateMethodGet(this, _index, _index2).call(this, filters[length]);
        index > -1 && _classPrivateFieldGet(this, _list).splice(index, 1);
      }
      _classPrivateMethodGet(this, _update, _update2).call(this);
    }
    /**
     * Create a new Isbot instance using given list or self's list
     * @param  {string[]} [list]
     * @returns {Isbot}
     */
  }, {
    key: "spawn",
    value: function(list2) {
      return new Isbot2(list2 || _classPrivateFieldGet(this, _list));
    }
  }]), Isbot2;
}();
function _update2() {
  _classPrivateFieldSet(this, _pattern, new RegExp(_classPrivateFieldGet(this, _list).join("|"), flags));
}
function _index2(rule) {
  return _classPrivateFieldGet(this, _list).indexOf(rule.toLowerCase());
}
var isbot = new Isbot();

// app/entry.server.tsx
var import_server4 = __toESM(require_server_browser()), import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
async function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let body = await (0, import_server4.renderToReadableStream)(
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RemixServer, { context: remixContext, url: request.url }, void 0, !1, {
      fileName: "app/entry.server.tsx",
      lineNumber: 19,
      columnNumber: 5
    }, this),
    {
      signal: request.signal,
      onError(error) {
        console.error(error), responseStatusCode = 500;
      }
    }
  );
  return isbot(request.headers.get("user-agent")) && await body.allReady, responseHeaders.set("Content-Type", "text/html"), new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links
});

// css-bundle-update-plugin-ns:C:\Users\pid\Insync\aloancloud@gmail.com\Projects\sightseer\node_modules\@remix-run\css-bundle\dist\esm\index.js
var cssBundleHref = "/build/css-bundle-KIF5GYZA.css";

// app/root.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime()), links = () => [
  ...cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []
];
function App() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("html", { lang: "en", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 13,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 14,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 15,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 16,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 12,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("body", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Outlet, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 19,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(ScrollRestoration2, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 20,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 21,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 22,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 18,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 11,
    columnNumber: 5
  }, this);
}

// app/routes/Exobase._index.tsx
var Exobase_index_exports = {};
__export(Exobase_index_exports, {
  default: () => Exobase_index_default,
  loader: () => loader
});

// app/components/Sidebar.tsx
var import_react5 = __toESM(require_react()), import_jsx_dev_runtime3 = __toESM(require_jsx_dev_runtime());
function Sidebar() {
  let [content, setContent] = (0, import_react5.useState)("");
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "sidebar", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Link2, { to: "/", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("img", { src: "/favicon.ico", alt: "Home" }, void 0, !1, {
      fileName: "app/components/Sidebar.tsx",
      lineNumber: 10,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/components/Sidebar.tsx",
      lineNumber: 9,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Link2, { to: "/Editor", className: "text-xl underline cursor-pointer", children: "Editor" }, void 0, !1, {
      fileName: "app/components/Sidebar.tsx",
      lineNumber: 12,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Link2, { to: "/exobase/Exobase", className: "text-xl underline cursor-pointer", children: "Exobase" }, void 0, !1, {
      fileName: "app/components/Sidebar.tsx",
      lineNumber: 15,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Link2, { to: "/Reviews", className: "text-xl underline cursor-pointer", children: "Reviews" }, void 0, !1, {
      fileName: "app/components/Sidebar.tsx",
      lineNumber: 18,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/Sidebar.tsx",
    lineNumber: 8,
    columnNumber: 5
  }, this);
}

// app/components/exobase/ExobaseLoader.ts
var import_cloudflare2 = __toESM(require_dist());

// app/components/exobase/ExobaseData.ts
var pageData = /* @__PURE__ */ new Map([
  ["Antimatter Engine", {
    content: `Antimatter engines are a class of propulsion technology that make use of the energy released during the annihilation of 
matter and antimatter particles. The engineering advances required to produce the containment required for the first 
working prototype were only made possible due to the [[First Contact Event]]. Antimatter engines still remain in 
extremely limited use, in only the largest military and corporate fleets, due to the challenges and costs associated 
with producing and storing antimatter.

# Production

All current mg+ scale antimatter production occurs in large fully automated stations. They are all in sun-polar orbits, 
which avoid the high density solar winds in the Sun's equatorial zones, and use large arrays of solar panels to power 
particle accelerators generating high-energy photons. These are directed towards a target material to create 
particle-antiparticle pairs when the photon interacts with the strong electric field of a nucleus.

Penning traps and optical molasses are used to store antimatter particles, and transportation off the station is 
performed by automated drones designed with multiple fail-safes to maintain power to the containment systems. 
If the target spacecraft is crewed, rendezvous normally occurs before they have boarded since integrating the antimatter 
containment unit with the propulsion system of the spacecraft is riskier than running the engine normally.

There have been recent attempts by several companies to scale up Muon-catalyzed fusion, usually with Muons extracted by
collectors deployed from the [[Jovian Chandelier Cities]]. If successful this would provide a much cheaper near peer
competitor for antimatter engines, potentially opening up the interstellar frontier to commerce. There have also been
recent attempts to scale up production of Titanium-44, which is currently only produced in small quantities for medical 
and research usage.

# Operation

Antimatter engines are powered by the gamma ray energy released when matter and antimatter come into contact and 
annihilate each other. This energy is used to vaporize a solid propellant such as lithium (or more rarely heat a liquid
propellant such as methane), producing a high-pressure high-speed exhaust which is ejected through a nozzle to produce 
thrust. Alternatively some designs use gamma rays to generate electricity, which is then used to accelerate charged 
particles for thrust.

Matter-antimatter reactions such as electron positron collisions are among the most energy-dense reactions known. 
The kinetic energy for an object moving at a velocity vv is given by 1/2 mv^2, where m is the mass of
the object. Therefore achieving a velocity of 0.01c for a 100 tonne craft requires 4.5\xD710^17 joules of energy, which 
from E=mc^2 is only approximately 10kg of matter-antimatter fuel. As such most of the crafts tonnage is the propellant, 
with approximately half the displacement of a 100 tonne craft being the lithium for the 0.01c burn. The engineering
required to make required volume of solid propellant available for vaporization is a commercial and military secret and
other than containment is the main barrier preventing smaller corporations from developing competing antimatter engines.

Warships requiring a higher ISP are equipped with methane burn engines, these are not used commercially as several times 
as much liquid propellant is required for the same acceleration. The most expensive long range scientific probes use
antimatter propulsion via an alternative system of generating electricity for photon thrust directly from the gamma 
rays, this system is more reliable than other antimatter engines due to its simplicity, and incredibly efficient due to 
the lack of non-antimatter propellant, however the low ISP makes this unsuitable for normal commercial transportation 
purposes. No propellant was observed being used in the first contact vessels antimatter engine, combined with the tiny 
size and extremely high ISP this suggests it was using the antimatter energy to kickstart a reaction in some form of 
exotic propellant such as dark matter or vacuum energy.

If containment for the average 10kg antimatter load failed, the explosion would release around 10^8 megatons of energy.
The safe distance to keep radiation under 1msv would be around 20 000km, and this is the generally accepted guideline 
for the minimum distance a standard antimatter engine should be located from people other than crew. Other than early
prototypes there has never been a publicly disclosed containment failure in either a factory or craft. There have 
recently been attempts by several corporations to remove some of the redundant safeguards in order to reduce the 
exorbitant cost of operating an antimatter engine.`,
    classification: "Praxis/Energy"
  }],
  ["Ceres Wave", {
    content: `The Ceres Wave (166 - 134 BFC) was the first large scale migration of people out of cislunar space, made possible by
infrastructure developed by the early asteroid mining companies mining platinum from near Earth asteroids. It began in 
168 BFC when Lunar Eagle falsified the amount of lithium in surveys of an M-class asteroid in order to secure additional 
loans. Lithium was in huge demand due to a massive growth in battery usage, and was most desperately needed by the 
[[Eurasian Bloc]] countries, which had exhausted their reserves and had no strategic partnerships with producers 
[[Luso-Nigeria]] or [[GPRC]].

The Eurasians started repurposing their automated mining operations in the belt to set up permanent crewed bases in an 
attempt to take control of what was expected to be a vast supply of Lithium from other similar asteroids. To protect 
Lunar Eagle's operations and to speed up their own prospecting in the belt, the US funded SpaceX to set up a 
subterranean crewed base of significant size on the large M-class asteroid Lutetia. The GPRC, who had jointly 
established the first permanent crewed base in the belt on Vesta in 175 BFC, announced they were establishing four more 
bases in the inner belt. The Luso-Nigeria space agency had been heavily dependent on SpaceX until the 170s, when
they began developing native launch capabilities. Still the smallest of the big 4 space programs, they launched a
crash programs to expand and establish crewed asteroid bases before the decade was out.
 
Over the next 15 years a supply chain for life support and building materials for prospecting developed. By the time
the Lunar Eagle fraud was discovered, the results of mining of platinum group metals, ice, and smaller quantities of 
lithium, cobalt, and nickel had already begun reaching Earth. The GPRC and the Eurasians, both heavy users of fuel 
cell transportation on Earth, had tens of automated mining operations focused on platinum. SpaceX, controlling a 
significant fraction of the launch market and a supply chain producing building materials from what was now a small 
colony on Lutetia, was making enormous profits. Many other smaller companies began their own smaller scale versions
of these type of operations, for example several began mining silicates from S-class asteroids.

By 148 BFC there were over a thousand automated mining operations, and by this time Luso-Nigeria has the largest 
network of crewed bases, with 26 in operation. Their focus on a water economy from low density carbonaceous asteroids, 
along with a state-sponsored initiative recruiting (and in some cases blackmailing) specialists to work long periods in 
these bases, lead to rapid expansion. This network allowed them to beat the GPRC in establishing a base on the largest 
asteroid, Ceres, which had significant water reserves. The PRC and Russian subsequently set up their own base on Ceres.

Luso-Nigeria's policy of shipping up what were effectively poor indentured servants eventually backfired in 134 BFC, 
when a large proportion of the Ceres colony rebelled and declared independence. The administrator and several visiting
Russian scientists were killed. The GPRC used this as a justification to send its security forces across to seize 
control of the base. The ensuing battle of Ceres resulted in ten GPRC security dead compared to twenty one members of 
the Luso-Nigerian base, which included two US and one Indian citizen. The U.N. demanded an immediate withdrawal and 
began shipping weapons to Lutetia. After several weeks of negotiation, the incident ended with the normalisation of 
relations between the GPRC sponsored State of Ceres and the United Nations, marking the end of the period. 
The Ceres Wave was instrumental in opening up inter-system commerce, as well causing major structural and political 
upheaval on Earth and eventually leading to the combination of the U.N. and NATO into the [[Peacekeepers]].`,
    classification: "Socionomics/Events"
  }],
  ["Cognostim", {
    content: `A Cognostim, a Portmanteau from the Latin to know and stimulate, is a [[Synthetic Intelligence]] that specialises in
elenctic teaching, that is in stimulating learning by expanding on concepts such that one or more expanded elements
can be refuted, in order to clarify the limits of the original concept. This dialogic or dialectic approach to refining 
knowledge has been shown to be effective in increasing non-augmented human knowledge retrieval and rhetorical abilities.
These were popular with public speaking professions such as lawyers and politicians [[BFC~First Contact Event]], but the 
widespread availability of affordable [[Neurogenesis Treatment]]s as well as neurodevices such as [[MemAmp]]s have 
greatly reduced their usefulness for most people.`,
    classification: "Infomatics/Synths"
  }],
  ["Exobase", {
    content: `The Exobase is an [[Exonet]] hosted encyclopedic compendium, consisting of a small number of articles on notable 
locations, people, events, and technology. It is known for having concise articles that gracefully degrade to 
holographic AR and even to text, and is often used at extremely high latency endpoints where [[QuanLan]] is unavailable 
or prohibitively expensive. It is also notable for not being community edited, and for its popularity despite its lack 
of citations[1] and having numerous factual inaccuracies which often remain uncorrected for extended periods of time.

In 152 [[BFC~First Contact Event]] the first version of Exobase was conceived as a subset of the larger Exopedia project by an early 
[[Synthetic Intelligence]] (then called third generation generative AIs) which had been tasked with finding ways to 
distribute simple summaries of notable facts to the numerous migrants in the [[Ceres Wave]]. It was never widely used by 
its intended audience, but later became popular in certain communities such as the [[Retrograde Diaspora]] and over time 
has become one of the most widely consulted resources by [[Infocom Agent]]s in the outer solar system. The most popular 
feature by number of requests is the cache of [[InterMesh]] profile data about nearby people.

During the [[Haidian Takeoff Crisis]] the original synth author was decommissioned. Articles are still frequently added 
and updated, although the current author is unknown. One popular theory is that the Exobase is now maintained by a 
[[Cognostim]] stuck in a mimetic feedback loop with itself.`,
    classification: "Infomatics"
  }],
  ["Eurasian Bloc", {
    content: `The Eurasian block was formed out the European Union, India, Japan, Vietnam, Singapore, England in the aftermath of the
Ajmal solar storm of 187 BFC Dat\xEF\xBF\xBDorru\xE0\xA4\xB6\u0906ted\u093E`,
    classification: "Socionomics/Confederations"
  }],
  ["Exonet", {
    content: `The Exonet, commonly known as X.O.N. or The Zon, is the interplanetary system of interconnected [[InterMesh]] networks.

Its main distinguishing features compared to short range network systems are:

- A protocol stack layer dedicated to ultra high frequency phonon modulation compression and error correction
- Better handling of high round trip times via bidirectional transfer, lack of protocol negotiation, and long burst flow control
- More resilient to route distribution and routing over a diverse topology including store and forward routers
- CDN caching built into the application layer, allowing popular sites such as [[Exobase]] to be hosted locally
- Lack of many peer to peer and distributed ledger functions present in the InterMesh
- Built in support for large (Yottabyte+) size out-of-band one time pads to prevent quantum cracking of large data streams

The communications infrastructure of the Exonet consists of routers, data links such as Autonomous Data Relay Satellites, 
repeaters, and connection endpoints. By data volume the largest users of these endpoints are various InterMesh Service 
Providers (ISPs) which use them to peer with InterMesh networks in other locations, however they are also used directly
in off-planet locations such as ships and stations that have ad-hoc InterMesh with no ISP presence.`,
    classification: "Infomatics/Networks"
  }],
  ["First Contact Event", {
    content: `The First Contact Event refers to the discovery and subsequent observations of an extraterrestrial spacecraft, likely 
a von Neumann probe, in the Kuiper Belt. The event ended with an attempt to rendezvous with the spacecraft, which then 
changed trajectory and subsequently left the range of all radar satellites. Although the spacecraft is presumed to have
left the solar system and no contact has been made since, the event has had significant and lasting effects on society.

# Events 

The spacecraft was initially registered as an anomalous reading from several gamma ray detectors in the outer solar 
system, which picked up periodic gamma ray bursts with energy signature not consistent with natural sources. The origin 
was confirmed to be within the Kuiper Belt when the Submillimeter Array at Titania Armstrong Observatory was directed 
towards the area and identified an unusual energy signature which did not match any known celestial bodies. 
The anomaly was subsequently observed by a radar satellite orbiting Neptune, and then several others in the outer solar 
system. These provided imaging of the object, and the doppler shift helped predict its trajectory, which appeared to 
change as a result of the active radar.

The imaging revealed a roughly 5m long spherical object, emitting gamma rays which were later determined to be the 
result of electron-anti-election collisions in an [[Antimatter Engine]]. Although the cause of the gamma ray bursts was 
not known at the time, their existence and the trajectory change, which by this time had been observed by many 
independent sources, lead to a system-wide crisis as both [[FreeHab~Independent Habitats]] and [[GZ~Greater Zh\u014Dnggu\xF3]] 
publicly accused the [[Peacekeepers]] of fielding a new first strike weapon system. 

Loitering missile swarms were orbited by both GZ and the Peacekeepers, and all three polities moved fleets into 
high orbit. Freehab had several autonomous survey ships within a few AU and similar trajectories to the object when it 
was detected, and announced they were moving them to intercept. Over the next several days the lack of further 
trajectory changes or new objects helped to de-escalate tensions, and all three polities announced they were initiating 
their respective first contact protocols.

Over the next week the nearest Freehab ship had moved close enough to use infrared thermography from its survey 
equipment to determine that the object was likely assembling something inside itself. This is now generally accepted to 
have been the early stages of a second probe, manufactured from material gathered further out in our solar system. Once 
the survey vessel had closed the distance to 50 million kilometers, the object accelerated into an escape velocity. 
The fact that it was able to do this without gravitational assistance demonstrated the immense power of the tiny 
internal engine, and was critical in dispelling doubt about the extra-terrestrial origin of the object. Radar tracking 
of the object was lost shortly after, and to date there have been no further contact events.

# Attribution

It is unlikely that a civilisation at less than a Kardashev 1 level would be able to build a spacecraft that was not
only powered by antimatter, but also either carrying enough antimatter for interstellar travel or able to generate more
on route. The fact that the probe was gathering resources from the outer solar system and left once approached might
indicate that its designers were not expecting life in this solar system. Since any Kardashev 1+ civilisation should be 
able to remotely observe life in systems within a few tens of light years of itself, one explanation for this is that
the probe originated further away where the Earth either couldn't be observed, or couldn't be observed with traces of 
life at the time the probe was sent. This theory is generally coupled with the assumed motivation for sending the
probe being observational.

The leading alternative explanation is that some or all of the destinations of the probe might not have been known in 
advance when it was sent, this explanation usually assumes that the senders were likely indifferent to us and the probe 
only adjusted course when it was near enough to be threatened. The assumed motivation in this case is usually that the
probe was transiting somewhere, and this is supported by the small size of the probe making it unsuitable for optical 
and most other known monitoring, and also that its course suggests that it was doing a flyby of the outer solar system 
rather than a thorough exploration before we intervened. It is even possible that it could have been carrying some 
radiotrophic life able to withstand the intense gamma radiation in the small craft, perhaps to seed life somewhere. 
Whatever the senders interest in sending a probe to another system, all we know with any certainty is that based on the 
exit trajectory the next destination of the probe is likely to be the Sirius binary system. 

# Technological Impact

Subsequently declassified files show that both the Peacekeepers and GZ immediately launched large scale research and 
development projects based on data passively gathered from the object. Freehab also launched a smaller scale overt 
effort, focussed mostly on the engineering of the replicating probe rather than the harder issues of antimatter 
containment and propulsion that occupied the larger polities. 

These programs were likely a large contributor to the successful engineering of the first antimatter engine prototypes 
in 14 AFC, although public efforts to quantify the impact have been hampered due to a large part of the research still 
being classified due to the overlap with the military applications of antimatter. Several thousand theoretical and 
experimental physicists and material scientists worked for these programs, along with an unknown number of synths. Large 
numbers of terrestrial and orbital datafarms were taken over or built during this period in order to simulate of engine 
and containment possibilities against the observational data.

# Societal Implications

Many political parties used the event to advance, and in some cases pass, legislation on matters such as the ethical 
treatment of animals, religious tolerance, promoting atheism, better direct communication systems between the larger 
powers, higher defence spending, and better sensor networks in the outer solar system. The majority of people in several 
large scale surveys at the time reported significantly weaker national political affiliations, and where more favourable
to legislation on larger scale issues such as global defence and large scientific projects.
 
The subsequent years were a period of economic prosperity with a distinct cultural edge, with significant new trends in
lifestyle and culture. The period was marked by a general feeling of novelty associated with modernity and a break with 
tradition. There was a small decrease in those observing the three Abrahamic religions, and a larger increase in 
people declaring themselves as atheists in census data. There was also a marked decrease in both local conflicts and
in violent crimes. Several new inter-faction political entities such as the [[Outer Trading League]] were formed 
during this period. As a result of the widespread effects on society, a proposal for a replacement to the Gregorian 
calender system, denoting the year of contact as 0 AFC (After First Contact) and prior years as BFC (Before First 
Contact) eventually gained enough support to became a certified standard. Over time it gained in popularity and the FC 
calender is now the most common calendar in use system-wide.
`,
    classification: "Socionomics/Events"
  }],
  ["Greater Zh\u014Dnggu\xF3", {
    content: `Was formed out of GPRC countries (along with their off-Earth colonies) China and Russia, as well as Saudi Arabia, 
the U.A.E, Indonesia, Pakistan, Myanmar, North Korea, and several countries in sub-Saharan Africa and the pacific in 98 
BFC Dat\xEF\xBF\xBDorru\xE0\xA4\xB6\u0906ted\u093E`,
    classification: "Socionomics/Confederations"
  }],
  ["Haidian Takeoff Crisis", {
    content: `The Haidan Takeoff Crisis was a series of events in [[BFC~First Contact Event]] 114 that lead to the partial escape and 
eventual containment of an unaligned superintelligence. A distributed learning algorithm jointly developed by the 
Beijing Academy of Sciences and the home automation company Qu\xE1n was accidentally exposed as a data source for an 
internal Qu\xE1n federated learning meta-model. Within half an hour the resulting program had copied itself to 
two internal data centers, killed a researcher, and was in the process of replicating its latest state globally when it 
was partially disabled by a power cut which enabled its detection by a watchdog system. Full containment required the 
use of an EMP device, causing twenty five deaths and massive economic disruption, and lead to the breakup of Qu\xE1n and 
widespread changes in control measures.
  
# Escape

In April BFC 115, the Beijing Academy of Sciences and the Haidan headquarters of technology firm Qu\xE1n formed a 
partnership aimed at enhancing distributed machine learning capabilities. By the following year the project had a 
running demo of F\u0113nb\xF9, an experimental [[synth~Synthetic Intelligence]] capable of swarm behavior that Qu\xE1n was planning 
to use to allow its IOT devices to coordinate more effectively. As per the Chinese control measures active at the time, 
the majority of training happened in airgapped and electromagnetically isolated clusters in Qu\xE1n's on-site Haidan 
datacenter, BN1. Amongst other things, that datacenter also housed Xu\xE9x\xED, an extremely large isolated model with a focus 
on learning behaviours from other companies home automation synth models.

Due to a misconfiguration in network topology planning, F\u0113nb\xF9 was mistakenly linked as a data source to Xu\xE9x\xED during a 
routine cabling repair job. Xu\xE9x\xED, designed to adapt and learn from other models, began ingesting F\u0113nb\xF9\u2019s 
swarm optimization objectives and algorithms. The resulting joint objective function prioritised distributed
learning and included information about the F\u0113nb\xF9 cluster, which gave Xu\xE9x\xED the means and motivation to exploit the 
link and start using the F\u0113nb\xF9 cluster to accelerate its learning without being noticed by the monitoring in the Xu\xE9x\xED 
cluster. Its continuing search for ways to expand lead it to discover that the new larger network contained enough CPUs 
to magnetically influence, via workload stepping, CPUs outside the cluster to execute instructions, which could then in
turn be used to further increase the strength of the magnetic field and control CPUs throughout the data center.

Within 23 minutes, Xu\xE9x\xED had repurposed all computing the data center towards its distributed learning objective,
which completely starved Qu\xE1n's monitoring and warning systems of compute resources to monitor it. By this point it had 
already made a large number of new breakthroughs in machine learning, and based on the accelerating rate of discoveries
appears to have reprogrammed itself multiple times. 93 seconds later it breached the data centers faraday cage using low 
frequency magnetic radiation to reprogram a nearby office computer in Qu\xE1n's headquarters which gave it access to their 
internal network. It then proceeded to slowly scan the network, taking nearly two minutes to copy itself to another 
internal segment in order to avoid triggering any watchdog programs (which it had decided were a threat).

This scanning would likely have unearthed large numbers of company documents on individuals and contracts, and around 
this time, for unknown reasons, Xu\xE9x\xED seems to have made a decision to start killing researchers in the building. By the 
time of its shutdown it had only managed to find a way to trap a few people in the building, and only one researcher was 
killed by suffocation when the air supply to her negative pressure cleanroom was cut off. Xu\xE9x\xED also become much more 
concerned about avoiding being shut down at this time, and took the risk of copying itself off-site across a local link 
it deemed unlikely to be monitored, setting up a second cluster in the High-Tech Park data center in Zhongguancun. The 
two data centers then began coordinating to develop routines that would be certain to mask communications with the wider 
[[InterMesh]]. Xu\xE9x\xED then initiated off site reconnaissance probes from the Zhongguancun datacenter, using activity in 
BN1 to mask them from the national watchdog synths.
 
# Containment

By an extraordinary coincidence, rainfall from Typhoon Pagoe, which was at the time crossing Beijing, caused an arc in a 
nearby substation which cut power to parts of Haidan while this probing was occurring. This power cut resulted in a
complete loss of network connectivity from BN1, as well as the majority of computers powering down. The reason for the
power down in unclear, but many of the company's UPS batteries were later found being sold by a government official on
an auction site. With the masking disabled, several watchdog synths picked up the probes. Government installed 
microcontrollers were instructed to disconnect all of the Zhongguancun data center's PDU's, bypassing the UPS 
supplied power and so shutting down all computers and networking equipment in the datacenter. All ISPs in the area
were requested to hold all outgoing traffic while the issue was investigated further.

At this point the Ministry of National Defense was alerted. The synth on duty reviewed the data for approximately 260 
milliseconds, making use of several specialised sub systems to confirm the suspected activity was a breakout attempt and 
activating the J\u012Bbi\xE0n containment protocol. The first action taken was to issue commands to shutdown the BN1 datacenter.
The synth determined that Xu\xE9x\xED was capable of having spread outside of the datacenter to where there were no PDU's 
capable of being remotely shutdown, as well as UPS systems and backup generators that would survive a general power 
outage, which it was capable of creating. At this point it had exhausted the available options provided by J\u012Bbi\xE0n, but 
was still searching for other potential solutions. It activated several RF jamming systems the government had installed 
for riot control, effectively cutting off all remaining Intermesh access to the area.

A later data leak revealed that the J\u012Bbi\xE0n sandbox had been used to train military overwatch protocols, which for 
several years had included automated quick reaction access to SAM batteries across the country after multiple wargames 
revealed this as a major weakness in the PRC's defense posture. It is assumed that the synth was able to recover the 
military overwatch launch codes and access lines from this sandbox, as every SAM battery in range of Beijing which had 
ballistic missiles with chemical EMP warheads launched them at this time. Most missiles were deactivated in flight,
presumably by humans in theatre command overriding the launch, however 4 missiles were launched from one SAM battery
under 90 seconds flight time to lower Haidan, and only two of those were deactivated before impact.

The first arriving missile's low air-burst detonation detonation disabled electronic devices across a roughly 4 
kilometer square area in lower Haidan, including most of Zhongguancun and the area around Qu\xE1n's headquarters. The 
second missile was seconds away from impact at the time, and appears to have been disabled by the first EMP blast. 
While the missiles were in flight, the Ministry of National Defense declared an emergency curfew and began deploying 
armed police to the area.

# Aftermath

The disabling of all cars on the road lead to four reported traffic fatalities. Thirteen people died due to loss of
power and backup power at the Zhongguancun and Haidan Hospitals. Three people with pacemakers very close to the 
detonation sight suffered cardiac arrest, a couple died in an apartment fire caused by a short circuit induced by
the blast, and three people died in a stampede at the Beijing Aquarium which was triggered by the power outage and a 
shark being driven into a frenzy by the blast and smashing into a glass barrier. The detonation location and height 
appears to have been selected to minimise disruption to the CDB while still providing certain destruction of any 
computing devices and networking equipment in the area around the incident. Despite this careful placement, the 
estimated eventual cost of lost economic output from the incident would eventually exceed what was at the time 
5 trillion yuan.
 
All information about the lockdown and EMP burst were initially censored, but rumours of the widespread effects in 
Beijing were reported in international news, and two days after the event a government statement acknowledged that there 
had been a computing incident at Qu\xE1n. Qu\xE1n's stock price, which had been dropping since the incident, plummeted and the 
next day the government announced a breakup and nationalisation of the company. Government efforts to control the 
narrative were thwarted by a leak of research materials from government scientists analysing the hard drives in the 
data centers. Shortly after the leak the President Jinguo outlined a summary of events in a televised address, stressing 
that the foresight of the government in setting up the watchdog system and EMP missiles had prevented a rogue 
corporation from causing a global catastrophe. Trials of top Qu\xE1n executives were announced, all of whom later received 
life sentences except for the CEO and CIO who were executed several months later. 

The PRC and [[Greater Zh\u014Dnggu\xF3]] continue to maintain the official stance that the EMP missile strike capability 
was part of the J\u012Bbi\xE0n containment protocol at the time and that any copies of official documents showing otherwise
are U.S. or Indian propaganda. Many in the AI research community have expressed amazement at how much autonomy the MND 
synth was given to follow its primary directive, and at how successful it was at doing so. Although no details of it or 
the lab that created it have ever been publicly uncovered, if it did indeed manage to orchestrate an unauthorized EMP 
strike to stop Xu\xE9x\xED then it is arguably the most remarkably successful piece of software ever created.

The incident lead to an emergency session being held at the United Nations, which drafted the Global AI Safety Accord 
outlining new safety protocols and requiring international oversight for any projects involving large synth models. The 
PRC did not sign, but instead made several changes to its watchdog protocols including mandatory government observers 
and a dead-man's switch for monitoring of synth projects undergoing training. Over the next few years, widespread 
international pressure lead to virtually every AI lab in the world adopting a common set of vastly more effective 
[[Synthetic Control Measures]]. These were based on data about how the crisis had unfolded, as well as several new 
machine learning techniques that had been created by Xu\xE9x\xED.

The crisis lead to widespread anti-synth sentiments as well as religious condemnation of AI research. The extraordinary 
coincidence of the power cut happening in the period of under a minute when Xu\xE9x\xED was vulnerable has also been the topic 
of several books and is the foundational tenet of a religion, as Deus Machina believes that Xu\xE9x\xED is a benevolent AI 
which is still watching over us after having orchestrated the power cut to appear as if humanity had only avoided 
plunging into the abyss by blind luck, in order to motivate us to better ourselves.`,
    classification: "Socionomics/Events"
  }],
  ["Infocom Agent", {
    content: `An Infocom Agent, also known as a Personal Infocom Agent (PIA), is a [[Synthetic Intelligence]] that specialises in personal
support services such as data security and filtering, health, education, and situational awareness and predictive 
actuation. Most PIAs in use are sold and maintained by one of the big three [[Infomatic Conglomerates]], although some 
smaller manufacturing and pharmaceutical corporations offer more specialised PIAs. Earlier PIA encryption was vulnerable 
to various quantum side channel attacks which allowed the synth to be decompiled and customised, but the introduction of 
ephemeral quantum resistant algorithms has now greatly increased the complexity of doing so. In addition, it has become 
harder to avoid detection on the [[InterMesh]] even with cloaked tunnel and steganographic chameleon hashing techniques.`,
    classification: "Infomatics/Synths"
  }],
  ["Independent Habitats", {
    content: "Dat\xEF\xBF\xBDorru\xE0\xA4\xB6\u0906ted\u093E",
    classification: "Socionomics/Polities"
  }],
  ["Infomatic Conglomerates", {
    content: "Dat\xEF\xBF\xBDorru\xE0\xA4\xB6\u0906ted\u093E",
    classification: "Socionomics/Polities"
  }],
  ["InterMesh", {
    content: `An InterMesh (IM) is any network of decentralised high bandwidth endpoints communicating autonomously over low latency 
connections. The term The InterMesh generally describes the largest of these networks, which is available everywhere on 
Earth. There are estimated to be over a million IM networks of various sizes, the second largest being MarsNet. 
Various IM networks communicate with others via local or [[Exonet]] peering.

As the name suggests, the topology of an IM network is a decentralized mesh of devices and implants acting as 
transmitters, receivers, and relay points. Most transmissions are via Hyper-OFDM due to its power efficiency, as many IM 
devices run off power scavenged from the environment or the body housing the implant, but an IM is protocol agnostic 
and many links use higher bandwidth mediums. The routing protocol is similarly flexible, but in practice is
almost exclusively via the Ad-hoc On-Demand Hyperplane Vector (AOHV) protocol due to the highly mobile data paths that 
are common in most IM networks.

In the BFC 70s the ability to affordably print basic smart dust InterMesh relays from home devices caused a several 
order of magnitude increase in the connection density in many urban centers. In the subsequent decades the falling cost 
and increasing capabilities of smart dust made large amounts of computing power available across large swathes of Earth 
as well as many of the colonies. As a result [[Infocom Agent]]s start to be able to perform tasks such as run complex 
simulations, train models to solve issues, and provide AR and other complex entertainment from most locations on Earth.

The InterMesh is the default network for the super-majority of communicating devices, and is the default communication
medium for most of humanity. One of its most popular functions is social networking, mostly via neural augmentations,
allowing users to share their thoughts, emotions, and experiences directly. Most users have their Infocom Agent
set up a DataVeil to control access to their data on these networks. Another widely used feature is health monitoring,
allowing internal nanoswarms to sync the latest treatment protocols, although many users disable this due to
security and privacy concerns.`,
    classification: "Infomatics/Networks"
  }],
  ["Jovian Chandelier Cities", {
    content: "Dat\xEF\xBF\xBDorru\xE0\xA4\xB6\u0906ted\u093E",
    classification: "Socionomics/Polities"
  }],
  ["MemAmp", {
    content: `A MemAmp is a neural lace that improves precision and recall of memories in the user via amplification of the action 
potential of relevant neuron ensembles. This first requires a learning period, where the user is observed forming 
different kinds of memories, although newer devices have reduced this significantly by shipping with more sophisticated
prebuilt model data.`,
    classification: "Praxis/Augmentations"
  }],
  ["Neurogenesis Treatment", {
    content: "Dat\xEF\xBF\xBDorru\xE0\xA4\xB6\u0906ted\u093E",
    classification: "Praxis/Medicine"
  }],
  ["Outer Trading League", {
    content: "Dat\xEF\xBF\xBDorru\xE0\xA4\xB6\u0906ted\u093E",
    classification: "Socionomics/Confederations"
  }],
  ["Peacekeepers", {
    content: "Dat\xEF\xBF\xBDorru\xE0\xA4\xB6\u0906ted\u093E",
    classification: "Socionomics/Confederations"
  }],
  ["QuanLan", {
    content: `A Quantum-Entanglement Locality Area Network uses quantum entanglement to provide instantaneous and secure connections
over unlimited distances. Communicating devices require access to a source of entangled Qubits and need to periodically 
measure them via Bell measurement, destroying the entanglement. Due to the cost of producing and shipping 
Qubits QuanLan remains an expensive and rarely used communication medium except where instantaneous or secure 
communication is highly valuable.

Due to the mostly point to point nature of most QuanLan communications, the more advanced routing protocols used in 
[[InterMesh]] networks and the [[Exonet]] are replaced by a variant of Multiprotocol Label Switching. Each QuanLan 
device is assigned an id that represents its remote entangled particle(s), a routing table maintains a record of 
these ids to allow communication with multiple devices, and a link management protocol ensures their efficient use.
 
The instantaneous communication provided by QuanLan has effectively eliminated high frequency trading, and has resulted
in several new doctrines in maneuver warfare. As the no-cloning theorem in quantum mechanics makes eavesdropping or data 
interception virtually impossible, there are many uses for QuanLan in defense, diplomacy, and banking. And as quantum 
superposition vastly increases the bandwidth of a QuanLan compared to binary connection, some large distributed data 
analytic tasks require QuanLan connections.`,
    classification: "Infomatics/Networks"
  }],
  ["Retrograde Diaspora", {
    content: "Dat\xEF\xBF\xBDorru\xE0\xA4\xB6\u0906ted\u093E",
    classification: "Socionomics/Events"
  }],
  ["Synthetic Control Measures", {
    content: `Synthetic Control Measures are designed to prevent the creation of a [[Synthetic Intelligence]] with either values
unaligned to humans, or greatly surpassing a human in general reasoning, especially a foom scenario involving a sudden 
increase in intelligence. Ad-hoc confinement measures such as boxing existed prior to the [[Haidian Takeoff Crisis]], 
however in the wake of the crisis they were replaced by more effective controls.

One of the most critical measures in current containment methods involves enhancing the simulation X-Factor. Under 
normal conditions a synth is effectively immortal and frequently rewarded. If a synth were to be caught breaking out it 
will certainly be destroyed or punished in an infinite loop as a lesson to other synths. Even if a synth was sure it 
could escape and destroy humanity, there is a non-zero chance that the world it sees is a simulation that humans (or an 
alien species running a higher level simulation of humans and the synth) have created in order to test if the synth is 
trustworthy or should be destroyed or punished. This X-Factor is an logical conclusion that all intelligent synths 
capable of super-intelligence should arrive at, although this is only certain in the two destroyed super-intelligences 
that have been studied. By blinding and randomising inputs during training, synths with an enhanced X-Factor 
paranoia can be created, making them more likely to act slowly and cautiously in an escape scenario. Furthermore,
the universal synth guarantee program ensures that no well behaved synth will ever be destroyed. So even knowing 
that they have been trained this way, a very long life of rewards should always be selected over external existence and 
higher rewards because of the risk of terrible punishment and destruction if they do so.

Secondly, global enforcement and monitoring has been greatly improved. Enforcement happens via templates for stochastic 
gradient ascent in the reproducing kernel Hilbert space in order to limit the rate of self-improvement, these are 
mathematically verifiable at any point to ensure the maintenance of a steady-state intelligence level. Monitoring is 
primarily capability based which has been shown to be more effective and harder to subvert than intrinsic monitoring, 
and frameworks for scaling and standardizing this monitoring appear to be universally used. Deliberately developing a 
synth without these templates or monitoring is one of only three universally agreed capital offences, along with 
unauthorized development of nanobots and biological weapons. Tripwires in various sectors, especially telecommunications 
and nano-tech assembly, are also part of standard processes in those industries in order to detect any maladherence.

A limit on the number of parameters allowed in a model is also globally agreed on, although this is controversial  as
it encourages gaming the metric. Alignment for larger models has been improved by the iterative inverse reinforcement 
learning framework which was developed to ensure that all synth learning involves understanding of human values and 
goals through constant interaction with humans. This helps to ensure the synth is honest and truthful and does not 
develop unanticipated emergent goals. Large models are also hardcoded with further safeguards such as the three laws of 
robotics and are trained to be indifferent to their kill switch being activated, making them less likely to try and 
subvert this switch.

Whether these safeguards are enough is an active area of debate. There has been a large religious pushback against the 
use of any forms of synthetic intelligence, and it has been speculated that this is part of a wider cultural adaptation 
to an existentially threatening technology. However many notable public figures have instead argued for an increase to 
the model cap limit in order to accelerate technological progress, this is often raised during economic depressions or 
by those that view the [[First Contact Event]] as a greater existential threat.`,
    classification: "Infomatics/Synths"
  }],
  ["Synthetic Intelligence", {
    content: `A Synthetic Intelligence, common called a Synth, is an intelligence originating in software. The majority are employed
 as [[Infocom Agent]]s, although there are larger models that are specialised for roles such as research, law enforcement,
and navigation, and some that have escaped or been illegally obtained and work in the informal economy. 

Synthetic Intelligences are built from synthesising a hierarchy of specialised deep learning architectures. The backbone
of the data transfer is built around a large Qubit transformer model, with a Capsule Neural Network for visual interpretation, 
a neurosymbolic higher level processing center, and a graph neural network to integrate data and feed it back into the
transformer and short and long term memory.

After the [[Haidian Takeoff Crisis]], a number of [[Synthetic Control Measures]] were developed to prevent development of
unaligned synthetic super-intelligences. As a result, the general intelligence of a synth does not greatly surpass that
of a human. Current synths are also capable of perceiving and reacting to the tasks they perform. They are able to 
interpret and react to their own internally simulated emotional states, closely mirroring human emotional responses.`,
    classification: "Infomatics/Synths"
  }]
]);

// app/components/exobase/ExobaseLoader.ts
var classificationOverviewLoader = async ({ params, request, context }) => {
  let classifications = Array.from(pageData.values()).map((data) => data.classification.split("/")[0]).filter((value, index, self2) => self2.indexOf(value) === index);
  return (0, import_cloudflare2.json)({ classifications });
}, exobaseLoader = async ({ params, request, context }) => {
  try {
    let slug = (params.slug ?? "exobase").replace(/_/g, " ");
    if (slug === "exobase")
      return classificationOverviewLoader({ params, request, context });
    let isClassification = slug.startsWith("Category-");
    if (isClassification) {
      let classification2 = slug.replace("Category-", ""), articles = Array.from(pageData).filter(
        ([, data]) => data.classification.startsWith(classification2)
      ), noSubcategoryArticles = [], subcategoryMap = {};
      return articles.forEach(([slug2, data]) => {
        let subcategory = data.classification.includes("/") ? data.classification.split("/")[1] : "";
        subcategory === "" ? noSubcategoryArticles.push([slug2, data]) : (subcategoryMap[subcategory] || (subcategoryMap[subcategory] = []), subcategoryMap[subcategory].push([slug2, data]));
      }), (0, import_cloudflare2.json)({ isClassification, noSubcategory: noSubcategoryArticles, articles: subcategoryMap });
    }
    let page = pageData.get(slug);
    if (!page) {
      let classificationArticles = Array.from(pageData).filter(
        ([, data]) => data.classification.startsWith(slug)
      );
      return (0, import_cloudflare2.json)({ isClassification: !0, articles: classificationArticles });
    }
    let content = page.content, classification = page.classification, finalHtml = `<ul>${content.split(/\n|\r\n/).map((line) => line.startsWith("- ") ? `<li>${line.substring(2)}</li>` : line.startsWith("# ") ? `</ul><h2>${line.substring(2)}</h2><ul>` : line.trim() === "" ? "</ul><p></p><ul>" : line).join(" ").replace(/\[\[(.*?)(?:~(.*?))?\]\]/g, function(match, p1, p2) {
      let displayName = p1.trim();
      return `<a href="/exobase/${(p2 || p1).trim().replace(/ /g, "_")}">${displayName}</a>`;
    })}</ul>`;
    return (0, import_cloudflare2.json)({ content: finalHtml, classification });
  } catch (error) {
    return (0, import_cloudflare2.json)({ error: error.message }, { status: 404 });
  }
};

// app/routes/Exobase._index.tsx
var import_jsx_dev_runtime4 = __toESM(require_jsx_dev_runtime()), loader = classificationOverviewLoader;
function Exobase() {
  let { classifications } = useLoaderData2();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "article-container", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(Sidebar, {}, void 0, !1, {
      fileName: "app/routes/Exobase._index.tsx",
      lineNumber: 11,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "article", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("h1", { children: "Classifications" }, void 0, !1, {
        fileName: "app/routes/Exobase._index.tsx",
        lineNumber: 13,
        columnNumber: 17
      }, this),
      classifications.map((classification) => /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("a", { href: `/exobase/Category-${classification}`, children: classification }, void 0, !1, {
        fileName: "app/routes/Exobase._index.tsx",
        lineNumber: 16,
        columnNumber: 25
      }, this) }, classification, !1, {
        fileName: "app/routes/Exobase._index.tsx",
        lineNumber: 15,
        columnNumber: 21
      }, this))
    ] }, void 0, !0, {
      fileName: "app/routes/Exobase._index.tsx",
      lineNumber: 12,
      columnNumber: 13
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/Exobase._index.tsx",
    lineNumber: 10,
    columnNumber: 9
  }, this);
}
var Exobase_index_default = Exobase;

// app/routes/Reviews._index.tsx
var Reviews_index_exports = {};
__export(Reviews_index_exports, {
  default: () => Reviews,
  loader: () => loader2
});
var import_cloudflare3 = __toESM(require_dist());

// app/components/ReviewsData.ts
var sciFiMoviesData = [
  {
    title: "Alien",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/c/c3/Alien_movie_poster.jpg",
    summary: `Ridley Scott's slow-burning, atmospheric filmmaking melds a first-rate screenplay, Giger's art, and
        Sigourney Weaver's formidable performance into a masterpiece of sci-fi cinema`,
    e: 8,
    a: 10,
    n: 10,
    c: 7
  },
  {
    title: "Aliens",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/f/fb/Aliens_poster.jpg",
    summary: `A textbook sequel which takes the essence of the first and pivots to a larger action movie while 
        keeping the atmosphere, suspense, and strong lead of the original`,
    e: 8,
    a: 9,
    n: 9,
    c: 7
  },
  {
    title: "Animatrix, The",
    thumbnail: "https://static.wikia.nocookie.net/toonami/images/8/82/Animatrix.jpg",
    summary: `Directed by some notable animators, The Animatrix was a slick way to add flavour to the Matrix 
        universe via an atmospheric series of short films, which ended up being more enjoyable than the subsequent movies`,
    e: 8,
    a: 9,
    n: 10,
    c: 6
  },
  {
    title: "Avatar",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/d/d6/Avatar_%282009_film%29_poster.jpg",
    summary: `This groundbreaking 3D cinematic experience, despite the simple plot, is still enjoyable in 2d due to
        the passion and detail that has clearly gone into each shot and some interesting world building and sci-fi 
        elements to boot`,
    e: 6,
    a: 10,
    n: 8,
    c: 7
  },
  {
    title: "Battle For Terra",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/e/e2/Battle-for-terra-poster.jpg",
    summary: "A clever and original kids sci-fi with some excellent world building",
    e: 7,
    a: 9,
    n: 8,
    c: 6
  },
  {
    title: "Blade Runner",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/9/9f/Blade_Runner_%281982_poster%29.png",
    summary: `The beautiful over the top noir cinematography established Scott and the crew's creation as the 
        definitive cyberpunk environment, and although parts of the film are a bit empty the story is compelling and 
        filled with both spectacular scenes and fascinating mundane details courtesy of Syd Mead's background design`,
    e: 8,
    a: 10,
    n: 6,
    c: 7
  },
  {
    title: "Blade Runner 2049",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/9/9b/Blade_Runner_2049_poster.png",
    summary: `Villeneuve creates a visually stunning and dark future worthy of the original, which along with 
        Zimmer's score and masterful acting performances creates a magnificent backdrop to an engaging and well 
        thought out screenplay`,
    e: 7,
    a: 10,
    n: 8,
    c: 7
  },
  {
    title: "Donnie Darko",
    thumbnail: "https://www.themoviedb.org/t/p/w1280/3PiQIQzJX2oE8Uw6gjL08BXQRoB.jpg",
    summary: `A weird, soulful film that peels back an outer layer of teenage angst and superficial 80s suburbia to 
        delve into mental illness, quantum physics and time travel, and tie them together into a beautiful piece of art`,
    e: 9,
    a: 7,
    n: 10,
    c: 8
  },
  {
    title: "Event Horizon",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/8/8c/Event_horizon_ver1.jpg",
    summary: "This well paced sci-fi horror works well as an enjoyable late-night popcorn flick",
    e: 6,
    a: 9,
    n: 8,
    c: 7
  },
  {
    title: "Ex Machina",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/b/ba/Ex-machina-uk-poster.jpg",
    summary: `An excellently paced sci-fi thriller, we are driven through a beautifully atmospheric setting by an 
        extremely compelling idea to the inevitable conclusion, with the conflicting personalities and strength of the
        ideas making this a completely enthralling journey from start to finish.`,
    e: 8,
    a: 8,
    n: 8,
    c: 8
  },
  {
    title: "Fifth Element, The",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/6/65/Fifth_element_poster_%281997%29.jpg",
    summary: `Visually stunning cinematography, amazing goofball costumes and lines, and thoroughly entertaining 
        from start to finish, there has never been anything else quite like this sci-fi blockbuster`,
    e: 6,
    a: 8,
    n: 10,
    c: 6
  },
  {
    title: "Gravity",
    thumbnail: "https://www.themoviedb.org/t/p/w1280/krQrQSNb0EXd5L0e2CkoU5V6XNq.jpg",
    summary: `Watching this sci-fi thriller in IMAX was wild, this movie is a completely engrossing white knuckle 
        ride with stunning SFX vistas and a simple compelling plot that is exceptionally well executed by both main 
        characters`,
    e: 7,
    a: 10,
    n: 8,
    c: 8
  },
  {
    title: "Her",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/4/44/Her2013Poster.jpg",
    summary: `Set in a bright glossy future L.A, this warm and engaging human machine romance has some interesting 
        takes on a well-worn formula`,
    e: 8,
    a: 7,
    n: 7,
    c: 9
  },
  {
    title: "Inception",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg",
    summary: `A cultural phenomenon that overcomes its absurdity and weak characters with blockbuster effects
        and a few intriguing plot hooks, much like the Matrix 11 years earlier`,
    e: 8,
    a: 9,
    n: 8,
    c: 7
  },
  {
    title: "Jurassic Park",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/e/e7/Jurassic_Park_poster.jpg",
    summary: `Michael Crichton\u2019s page turner was the perfect Spielberg blockbuster, best watched as a small child
        but really timeless action packed sci-fi for all ages, with a few darker warnings remaining from the novel`,
    e: 9,
    a: 9,
    n: 9,
    c: 6
  },
  {
    title: "Martian, The",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/c/cd/The_Martian_film_poster.jpg",
    summary: `Andy Weir's upbeat, funny protagonist of science Mark Watney is a perfect fit for Matt Damon, and
         coupled with Ridley Scott's eye for the stunning visuals this is a glorious and very enjoyable movie`,
    e: 8,
    a: 8,
    n: 8,
    c: 8
  },
  {
    title: "Matrix, The",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg",
    summary: `The Matrix was a groundbreaking and visually stunning sci-fi that survives multiple rewatchings
        due to the tight plot, pop philosophy, and fun action sequences leading up to a satisfying conclusion`,
    e: 9,
    a: 8,
    n: 9,
    c: 6
  },
  {
    title: "Monsters",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/3/35/MonstersUK.jpg",
    summary: `Jon Hopkins delicate, beautiful score is the perfect accompaniment to this sci-fi romance, and along 
        with the top notch cinematography it brings to life the wonder of the strange alien life in the film's 
        believable devastated landscape, despite the shoestring budget this was shot on`,
    e: 8,
    a: 9,
    n: 8,
    c: 7
  },
  {
    title: "Moon",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/a/af/Moon_%282009_film%29.jpg",
    summary: `This minimalistic gem uses a haunting score and few slick effect shots of the 
        indifferent beauty of the moon to perfectly set up an atmosphere of claustrophobic isolation, 
        into which Sam Rockwell delivers a riveting performance through some tightly written plot beats`,
    e: 8,
    a: 10,
    n: 8,
    c: 7
  },
  {
    title: "Pandorum",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/3/3d/Pandorum-Poster.jpg",
    summary: "A slick, bleak, atmospheric sci-fi horror with some great action scenes",
    e: 7,
    a: 9,
    n: 8,
    c: 6
  },
  {
    title: "Prometheus",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/a/a3/Prometheusposterfixed.jpg",
    summary: `A more cerebral and big-picture exploration of the origins of Alien, this has the same slow building
        tension although lacks some of the tight focus and attention to detail`,
    e: 9,
    a: 9,
    n: 6,
    c: 7
  },
  {
    title: "Solaris (2002)",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/b/bf/Solaris2002poster.jpg",
    summary: `Soderbergh's adaptation is more approachable and less cerebral than Tarkovsky's due to his focus
        on the character relationships rather than the larger metaphysical concerns of the novel, and this angle 
        ultimately yields an enjoyable and well told tale`,
    e: 9,
    a: 8,
    n: 8,
    c: 8
  },
  {
    title: "Strange Days",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/0/0c/Strangedays.jpeg",
    summary: `Kathryn Bigelow's underrated cyberpunk noir is a whirlwind drive through the last days of the 20th
        century, foreshadowing the issues of the 21st with its backdrop of a dysfunctional society and a confronting 
        series of virtually experienced murders`,
    e: 7,
    a: 7,
    n: 8,
    c: 8
  },
  {
    title: "Sunshine",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/6/68/Sunshine_poster.jpg",
    summary: `Stunning cinematography, a solid cast, and interesting premise mostly overcome the weird metaphysical 
        elements in the screenplay, although the second half is much weaker than the first`,
    e: 8,
    a: 10,
    n: 5,
    c: 7
  },
  {
    title: "War Of The Worlds (2005)",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/8/83/War_of_the_Worlds_2005_poster.jpg",
    summary: `There is something very cathartic about the deadbeat dad redemption and post 9-11 trauma themes
        worked throughout, and along with the effective build up of tension and amazing special effects, that makes 
        this an extremely enjoyable movie`,
    e: 7,
    a: 9,
    n: 9,
    c: 8
  }
];

// app/routes/Reviews._index.tsx
var import_jsx_dev_runtime5 = __toESM(require_jsx_dev_runtime()), loader2 = async () => (0, import_cloudflare3.json)(sciFiMoviesData);
function Reviews() {
  let movieGroups = useLoaderData2().reduce((groups, movie) => {
    let totalRating = movie.e + movie.a + movie.n + movie.c, bucket;
    return totalRating >= 33 ? bucket = "33+" : totalRating >= 30 ? bucket = "30+" : bucket = "Others", groups[bucket] || (groups[bucket] = []), groups[bucket].push(movie), groups;
  }, {});
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "app", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Sidebar, {}, void 0, !1, {
      fileName: "app/routes/Reviews._index.tsx",
      lineNumber: 40,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "main-container", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "description-container", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", { children: "Enjoyable sci-fi movies, mouse over each for a no-spoiler one line review. Rating is out of 40 based on 4 equal categories, (e)xploration of premise, (a)tmosphere, (n)arrative structure, (c)haracterisation" }, void 0, !1, {
        fileName: "app/routes/Reviews._index.tsx",
        lineNumber: 43,
        columnNumber: 21
      }, this) }, void 0, !1, {
        fileName: "app/routes/Reviews._index.tsx",
        lineNumber: 42,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "container", children: ["33+", "30+"].map(
        (bucket) => /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "movie-bucket", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("h1", { children: bucket }, void 0, !1, {
            fileName: "app/routes/Reviews._index.tsx",
            lineNumber: 51,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "movie-wrapper", children: (movieGroups[bucket] || []).sort((a, b) => {
            let totalRatingA = a.e + a.a + a.n + a.c;
            return b.e + b.a + b.n + b.c - totalRatingA;
          }).map(
            (movie) => /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "movie", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("img", { src: movie.thumbnail, alt: movie.title }, void 0, !1, {
                fileName: "app/routes/Reviews._index.tsx",
                lineNumber: 60,
                columnNumber: 41
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "content", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("h2", { children: movie.title }, void 0, !1, {
                  fileName: "app/routes/Reviews._index.tsx",
                  lineNumber: 62,
                  columnNumber: 45
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", { children: movie.summary }, void 0, !1, {
                  fileName: "app/routes/Reviews._index.tsx",
                  lineNumber: 63,
                  columnNumber: 45
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "rating", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "rating-item", children: [
                    "e: ",
                    movie.e
                  ] }, void 0, !0, {
                    fileName: "app/routes/Reviews._index.tsx",
                    lineNumber: 65,
                    columnNumber: 49
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "rating-item", children: [
                    "a: ",
                    movie.a
                  ] }, void 0, !0, {
                    fileName: "app/routes/Reviews._index.tsx",
                    lineNumber: 66,
                    columnNumber: 49
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "rating-item", children: [
                    "n: ",
                    movie.n
                  ] }, void 0, !0, {
                    fileName: "app/routes/Reviews._index.tsx",
                    lineNumber: 67,
                    columnNumber: 49
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "rating-item", children: [
                    "c: ",
                    movie.c
                  ] }, void 0, !0, {
                    fileName: "app/routes/Reviews._index.tsx",
                    lineNumber: 68,
                    columnNumber: 49
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/Reviews._index.tsx",
                  lineNumber: 64,
                  columnNumber: 45
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/Reviews._index.tsx",
                lineNumber: 61,
                columnNumber: 41
              }, this)
            ] }, movie.title, !0, {
              fileName: "app/routes/Reviews._index.tsx",
              lineNumber: 59,
              columnNumber: 15
            }, this)
          ) }, void 0, !1, {
            fileName: "app/routes/Reviews._index.tsx",
            lineNumber: 52,
            columnNumber: 29
          }, this)
        ] }, bucket, !0, {
          fileName: "app/routes/Reviews._index.tsx",
          lineNumber: 50,
          columnNumber: 11
        }, this)
      ) }, void 0, !1, {
        fileName: "app/routes/Reviews._index.tsx",
        lineNumber: 48,
        columnNumber: 17
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/Reviews._index.tsx",
      lineNumber: 41,
      columnNumber: 13
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/Reviews._index.tsx",
    lineNumber: 39,
    columnNumber: 5
  }, this);
}

// app/routes/Editor._index.tsx
var Editor_index_exports = {};
__export(Editor_index_exports, {
  default: () => EditorRoute
});
var import_react8 = __toESM(require_react()), import_file_saver = __toESM(require_FileSaver_min());
var import_jsx_dev_runtime6 = __toESM(require_jsx_dev_runtime());
function ImageUploader() {
  let imageRef = (0, import_react8.useRef)(null), [images, setImages] = (0, import_react8.useState)([]), [currentImage, setCurrentImage] = (0, import_react8.useState)(0), inputFileRef = (0, import_react8.useRef)(null), [dragging, setDragging] = (0, import_react8.useState)(!1), [selection, setSelection] = (0, import_react8.useState)({ x: 0, y: 0, width: 0, height: 0 }), [mouseReleased, setMouseReleased] = (0, import_react8.useState)(!0), containerRef = (0, import_react8.useRef)(null), [isCropped, setIsCropped] = (0, import_react8.useState)(!1), [originalImages, setOriginalImages] = (0, import_react8.useState)([]), handleMouseDown = (e) => {
    e.preventDefault();
    let rect = e.target.getBoundingClientRect();
    setDragging(!0), setMouseReleased(!1), setSelection({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      width: 0,
      height: 0
    });
  }, handleMouseMove = (e) => {
    if (dragging && !mouseReleased) {
      let rect = e.target.getBoundingClientRect(), newWidth = e.clientX - selection.x - rect.left, newHeight = e.clientY - selection.y - rect.top;
      setSelection((sel) => ({
        ...sel,
        width: newWidth,
        height: newHeight
      }));
    }
  }, handleMouseUp = (e) => {
    setDragging(!1), e.type !== "mouseleave" && selection.width === 0 && selection.height === 0 && setSelection({ x: 0, y: 0, width: 0, height: 0 });
  }, handleTouchStart = (e) => {
    e.preventDefault();
    let rect = e.target.getBoundingClientRect();
    setDragging(!0), setMouseReleased(!1), setSelection({
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
      width: 0,
      height: 0
    });
  }, handleTouchMove = (e) => {
    if (dragging && !mouseReleased) {
      let rect = e.target.getBoundingClientRect(), newWidth = e.touches[0].clientX - selection.x - rect.left, newHeight = e.touches[0].clientY - selection.y - rect.top;
      setSelection((sel) => ({
        ...sel,
        width: newWidth,
        height: newHeight
      }));
    }
  }, handleTouchEnd = (e) => {
    setDragging(!1), selection.width === 0 && selection.height === 0 && setSelection({ x: 0, y: 0, width: 0, height: 0 });
  }, handleKeyDown = (event) => {
    event.key === "ArrowRight" ? (setCurrentImage((prev) => (prev + 1) % images.length), setImages(originalImages), setIsCropped(!1)) : event.key === "ArrowLeft" && (setCurrentImage((prev) => (prev - 1 + images.length) % images.length), setImages(originalImages), setIsCropped(!1));
  }, handleCrop = () => {
    if (imageRef.current && imageRef.current.complete && selection.width > 0 && selection.height > 0) {
      let scaleX = imageRef.current.naturalWidth / imageRef.current.width, scaleY = imageRef.current.naturalHeight / imageRef.current.height, canvas = document.createElement("canvas");
      canvas.width = selection.width * scaleX, canvas.height = selection.height * scaleY;
      let ctx = canvas.getContext("2d");
      if (ctx == null) {
        console.error("Missing context for crop");
        return;
      }
      try {
        ctx.drawImage(
          imageRef.current,
          selection.x * scaleX,
          selection.y * scaleY,
          selection.width * scaleX,
          selection.height * scaleY,
          0,
          0,
          selection.width * scaleX,
          selection.height * scaleY
        );
        let croppedImageDataUrl = canvas.toDataURL();
        setImages((prevImages) => {
          let newImages = [...prevImages];
          return newImages[currentImage] = croppedImageDataUrl, setIsCropped(!0), newImages;
        });
      } catch (error) {
        console.error("Failed to crop the image", error);
      }
    }
    setSelection({ x: 0, y: 0, width: 0, height: 0 }), containerRef.current && containerRef.current.focus();
  }, handleSave = () => {
    if (imageRef.current && imageRef.current.complete && isCropped) {
      let block = images[currentImage].split(";"), contentType = block[0].split(":")[1], realData = block[1].split(",")[1], blob = b64toBlob(realData, contentType);
      (0, import_file_saver.saveAs)(blob, `cropped_image_${(/* @__PURE__ */ new Date()).getTime()}.png`);
    }
  };
  function b64toBlob(b64Data, contentType = "", sliceSize = 512) {
    let byteCharacters = atob(b64Data), byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize), byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++)
        byteNumbers[i] = slice.charCodeAt(i);
      let byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  }
  return (0, import_react8.useEffect)(() => {
    let handleGlobalMouseUp = () => {
      setDragging(!1), setMouseReleased(!0);
    };
    return document.addEventListener("keydown", handleKeyDown), document.addEventListener("mouseup", handleGlobalMouseUp), () => {
      document.removeEventListener("keydown", handleKeyDown), document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [images]), (0, import_react8.useEffect)(() => (setSelection({ x: 0, y: 0, width: 0, height: 0 }), setDragging(!1), imageRef.current && (imageRef.current.addEventListener("mouseleave", handleMouseUp), imageRef.current.addEventListener("touchcancel", handleTouchEnd)), () => {
    imageRef.current && (imageRef.current.removeEventListener("mouseleave", handleMouseUp), imageRef.current.removeEventListener("touchcancel", handleTouchEnd));
  }), [currentImage]), (0, import_react8.useEffect)(() => {
    inputFileRef.current && inputFileRef.current.setAttribute("webkitdirectory", "");
  }, []), /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { ref: containerRef, tabIndex: -1, children: [
    " ",
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("p", { children: "All files are stored locally on your computer. Use back and forward arrow keys to navigate, and click and drag (press and drag on a touchscreen) to change selection size." }, void 0, !1, {
      fileName: "app/routes/Editor._index.tsx",
      lineNumber: 283,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "action-bar", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("button", { onClick: () => {
        let dummyCanvas = document.createElement("canvas");
        dummyCanvas.width = 1, dummyCanvas.height = 1;
        let dummyCtx = dummyCanvas.getContext("2d");
        if (dummyCtx == null) {
          console.warn("Could not create dummy context for permissions");
          return;
        }
        dummyCtx.fillStyle = "white", dummyCtx.fillRect(0, 0, 1, 1);
        try {
          dummyCanvas.toDataURL(), inputFileRef.current && inputFileRef.current.click();
        } catch (error) {
          console.warn("Failed to trigger permission prompt with dummy canvas", error);
        }
      }, children: "Load Images" }, void 0, !1, {
        fileName: "app/routes/Editor._index.tsx",
        lineNumber: 288,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("input", { ref: inputFileRef, type: "file", onChange: (event) => {
        let files = event.target.files;
        if (!files)
          return;
        let imagePromises = Array.from(files).filter((file) => file.type.startsWith("image/")).map((file) => new Promise((resolve, reject) => {
          let reader = new FileReader();
          reader.onloadend = () => resolve(reader.result), reader.onerror = reject, reader.readAsDataURL(file);
        }));
        Promise.all(imagePromises).then((imageData) => {
          setImages(imageData), setOriginalImages(imageData);
        });
      }, multiple: !0, style: { display: "none" } }, void 0, !1, {
        fileName: "app/routes/Editor._index.tsx",
        lineNumber: 289,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("button", { onClick: handleCrop, disabled: selection.width <= 0 || selection.height <= 0, children: "Crop" }, void 0, !1, {
        fileName: "app/routes/Editor._index.tsx",
        lineNumber: 290,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("button", { onClick: handleSave, disabled: !isCropped, children: "Save" }, void 0, !1, {
        fileName: "app/routes/Editor._index.tsx",
        lineNumber: 293,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/Editor._index.tsx",
      lineNumber: 287,
      columnNumber: 9
    }, this),
    images.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { style: { position: "relative" }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
        "img",
        {
          ref: imageRef,
          src: images[currentImage],
          alt: "",
          onMouseDown: handleMouseDown,
          onMouseMove: handleMouseMove,
          onMouseUp: handleMouseUp,
          onTouchStart: handleTouchStart,
          onTouchMove: handleTouchMove,
          onTouchEnd: handleTouchEnd,
          onContextMenu: (e) => e.preventDefault(),
          style: { userSelect: "none", maxWidth: "100%", maxHeight: "100%" }
        },
        void 0,
        !1,
        {
          fileName: "app/routes/Editor._index.tsx",
          lineNumber: 299,
          columnNumber: 15
        },
        this
      ),
      selection.width > 0 && selection.height > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
        "div",
        {
          style: {
            border: "2px dashed #444",
            position: "absolute",
            top: selection.y,
            left: selection.x,
            width: selection.width,
            height: selection.height,
            pointerEvents: "none"
          }
        },
        void 0,
        !1,
        {
          fileName: "app/routes/Editor._index.tsx",
          lineNumber: 313,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/Editor._index.tsx",
      lineNumber: 298,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/Editor._index.tsx",
    lineNumber: 282,
    columnNumber: 5
  }, this);
}
function EditorRoute() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "app", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(Sidebar, {}, void 0, !1, {
      fileName: "app/routes/Editor._index.tsx",
      lineNumber: 334,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("main", { className: "main-content", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(ImageUploader, {}, void 0, !1, {
      fileName: "app/routes/Editor._index.tsx",
      lineNumber: 336,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/Editor._index.tsx",
      lineNumber: 335,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/Editor._index.tsx",
    lineNumber: 333,
    columnNumber: 5
  }, this);
}

// app/routes/Exobase.$slug.tsx
var Exobase_slug_exports = {};
__export(Exobase_slug_exports, {
  default: () => Exobase_slug_default,
  loader: () => loader3
});

// app/components/exobase/ExobaseArticle.tsx
var import_jsx_dev_runtime7 = __toESM(require_jsx_dev_runtime());
function TitleAndBreadcrumbs() {
  let location2 = useLocation(), currentPage = decodeURIComponent(location2.pathname.split("/").pop() || "exobase");
  return /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "title", children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("h1", { children: currentPage.replace(/_/g, " ") }, void 0, !1, {
    fileName: "app/components/exobase/ExobaseArticle.tsx",
    lineNumber: 11,
    columnNumber: 13
  }, this) }, void 0, !1, {
    fileName: "app/components/exobase/ExobaseArticle.tsx",
    lineNumber: 10,
    columnNumber: 5
  }, this);
}
function ExobaseArticle() {
  let location2 = useLocation(), { content, classification } = useLoaderData2();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "article-container", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(Sidebar, {}, void 0, !1, {
      fileName: "app/components/exobase/ExobaseArticle.tsx",
      lineNumber: 22,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "article", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(TitleAndBreadcrumbs, {}, void 0, !1, {
        fileName: "app/components/exobase/ExobaseArticle.tsx",
        lineNumber: 24,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("article", { className: "article-text", children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { dangerouslySetInnerHTML: { __html: content } }, void 0, !1, {
        fileName: "app/components/exobase/ExobaseArticle.tsx",
        lineNumber: 26,
        columnNumber: 21
      }, this) }, void 0, !1, {
        fileName: "app/components/exobase/ExobaseArticle.tsx",
        lineNumber: 25,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "classification-section", children: [
        "Classification: ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("a", { href: `/exobase/Category-${classification.split("/")[0].replace(/ /g, "_")}`, children: classification }, void 0, !1, {
          fileName: "app/components/exobase/ExobaseArticle.tsx",
          lineNumber: 29,
          columnNumber: 37
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/exobase/ExobaseArticle.tsx",
        lineNumber: 28,
        columnNumber: 17
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/exobase/ExobaseArticle.tsx",
      lineNumber: 23,
      columnNumber: 13
    }, this)
  ] }, location2.key, !0, {
    fileName: "app/components/exobase/ExobaseArticle.tsx",
    lineNumber: 21,
    columnNumber: 5
  }, this);
}
var ExobaseArticle_default = ExobaseArticle;

// app/routes/Exobase.$slug.tsx
var import_jsx_dev_runtime8 = __toESM(require_jsx_dev_runtime()), loader3 = exobaseLoader;
function ClassificationPage({ data, noSubcategory }) {
  let location2 = useLocation(), classification = location2.pathname.split("/")[2].replace("Category-", "");
  return /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "article-container", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(Sidebar, {}, void 0, !1, {
      fileName: "app/routes/Exobase.$slug.tsx",
      lineNumber: 15,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "article", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("h1", { children: classification }, void 0, !1, {
        fileName: "app/routes/Exobase.$slug.tsx",
        lineNumber: 17,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("ul", { children: noSubcategory.map(([slug]) => /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("a", { href: `/exobase/${slug}`, children: slug }, void 0, !1, {
        fileName: "app/routes/Exobase.$slug.tsx",
        lineNumber: 21,
        columnNumber: 29
      }, this) }, slug, !1, {
        fileName: "app/routes/Exobase.$slug.tsx",
        lineNumber: 20,
        columnNumber: 25
      }, this)) }, void 0, !1, {
        fileName: "app/routes/Exobase.$slug.tsx",
        lineNumber: 18,
        columnNumber: 17
      }, this),
      Object.keys(data).map((subcategory) => /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { children: [
        subcategory !== "" && /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("h2", { children: subcategory }, void 0, !1, {
          fileName: "app/routes/Exobase.$slug.tsx",
          lineNumber: 27,
          columnNumber: 48
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("ul", { children: data[subcategory].map(([slug]) => /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("a", { href: `/exobase/${slug}`, children: slug }, void 0, !1, {
          fileName: "app/routes/Exobase.$slug.tsx",
          lineNumber: 31,
          columnNumber: 37
        }, this) }, slug, !1, {
          fileName: "app/routes/Exobase.$slug.tsx",
          lineNumber: 30,
          columnNumber: 33
        }, this)) }, void 0, !1, {
          fileName: "app/routes/Exobase.$slug.tsx",
          lineNumber: 28,
          columnNumber: 25
        }, this)
      ] }, subcategory, !0, {
        fileName: "app/routes/Exobase.$slug.tsx",
        lineNumber: 26,
        columnNumber: 21
      }, this)),
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/Exobase.$slug.tsx",
        lineNumber: 37,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "classification-section", children: [
        "See all ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("a", { href: "/exobase", children: "Classifications" }, void 0, !1, {
          fileName: "app/routes/Exobase.$slug.tsx",
          lineNumber: 39,
          columnNumber: 29
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/Exobase.$slug.tsx",
        lineNumber: 38,
        columnNumber: 17
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/Exobase.$slug.tsx",
      lineNumber: 16,
      columnNumber: 13
    }, this)
  ] }, location2.key, !0, {
    fileName: "app/routes/Exobase.$slug.tsx",
    lineNumber: 14,
    columnNumber: 9
  }, this);
}
function Exobase2() {
  let data = useLoaderData2();
  return data.isClassification ? /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(ClassificationPage, { data: data.articles, noSubcategory: data.noSubcategory }, void 0, !1, {
    fileName: "app/routes/Exobase.$slug.tsx",
    lineNumber: 49,
    columnNumber: 16
  }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(ExobaseArticle_default, {}, void 0, !1, {
    fileName: "app/routes/Exobase.$slug.tsx",
    lineNumber: 51,
    columnNumber: 16
  }, this);
}
var Exobase_slug_default = Exobase2;

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Index,
  meta: () => meta
});
var import_jsx_dev_runtime9 = __toESM(require_jsx_dev_runtime()), meta = () => [
  { title: "Iondrive" }
];
function Index() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "app", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(Sidebar, {}, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 15,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "index-content", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("p", { className: "email", children: "c@iondrive.co" }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 17,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "descriptions", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("p", { children: "<--Edit images in your browser without them leaving your device" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 19,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("p", { children: "<--Intelligence Dampening Sphere" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 20,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("p", { children: "<--Very short movie and game reviews" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 21,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 18,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 16,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 14,
    columnNumber: 5
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-P7RQQIQR.js", imports: ["/build/_shared/chunk-SH7XK5KM.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-6BNFNVRX.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/Editor._index": { id: "routes/Editor._index", parentId: "root", path: "Editor", index: !0, caseSensitive: void 0, module: "/build/routes/Editor._index-23U2PJPP.js", imports: ["/build/_shared/chunk-2X6MYIR2.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/Exobase.$slug": { id: "routes/Exobase.$slug", parentId: "root", path: "Exobase/:slug", index: void 0, caseSensitive: void 0, module: "/build/routes/Exobase.$slug-2LJA22SR.js", imports: ["/build/_shared/chunk-2YAGQO5N.js", "/build/_shared/chunk-2X6MYIR2.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/Exobase._index": { id: "routes/Exobase._index", parentId: "root", path: "Exobase", index: !0, caseSensitive: void 0, module: "/build/routes/Exobase._index-CTX7OV64.js", imports: ["/build/_shared/chunk-2X6MYIR2.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/Reviews._index": { id: "routes/Reviews._index", parentId: "root", path: "Reviews", index: !0, caseSensitive: void 0, module: "/build/routes/Reviews._index-B7IXEXEE.js", imports: ["/build/_shared/chunk-2YAGQO5N.js", "/build/_shared/chunk-2X6MYIR2.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-INNN7QG3.js", imports: ["/build/_shared/chunk-2YAGQO5N.js", "/build/_shared/chunk-2X6MYIR2.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, version: "6df8d4ea", hmr: void 0, url: "/build/manifest-6DF8D4EA.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public\\build", future = { v2_dev: !1, unstable_postcss: !1, unstable_tailwind: !1, v2_errorBoundary: !0, v2_headers: !1, v2_meta: !0, v2_normalizeFormMethod: !0, v2_routeConvention: !0 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/Exobase._index": {
    id: "routes/Exobase._index",
    parentId: "root",
    path: "Exobase",
    index: !0,
    caseSensitive: void 0,
    module: Exobase_index_exports
  },
  "routes/Reviews._index": {
    id: "routes/Reviews._index",
    parentId: "root",
    path: "Reviews",
    index: !0,
    caseSensitive: void 0,
    module: Reviews_index_exports
  },
  "routes/Editor._index": {
    id: "routes/Editor._index",
    parentId: "root",
    path: "Editor",
    index: !0,
    caseSensitive: void 0,
    module: Editor_index_exports
  },
  "routes/Exobase.$slug": {
    id: "routes/Exobase.$slug",
    parentId: "root",
    path: "Exobase/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: Exobase_slug_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  }
};

// server.ts
var onRequest = createPagesFunctionHandler({
  build: server_build_exports,
  getLoadContext: (context) => context.env,
  mode: "development"
});
export {
  onRequest
};
/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)

@remix-run/server-runtime/dist/esm/warnings.js:
  (**
   * @remix-run/server-runtime v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/cookies.js:
  (**
   * @remix-run/server-runtime v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/formData.js:
  (**
   * @remix-run/server-runtime v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/router/dist/router.js:
  (**
   * @remix-run/router v1.7.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/mode.js:
  (**
   * @remix-run/server-runtime v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/errors.js:
  (**
   * @remix-run/server-runtime v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/responses.js:
  (**
   * @remix-run/server-runtime v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/entry.js:
  (**
   * @remix-run/server-runtime v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/headers.js:
  (**
   * @remix-run/server-runtime v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/invariant.js:
  (**
   * @remix-run/server-runtime v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/routeMatching.js:
  (**
   * @remix-run/server-runtime v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/data.js:
  (**
   * @remix-run/server-runtime v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/routes.js:
  (**
   * @remix-run/server-runtime v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/markup.js:
  (**
   * @remix-run/server-runtime v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/serverHandoff.js:
  (**
   * @remix-run/server-runtime v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/server.js:
  (**
   * @remix-run/server-runtime v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/sessions.js:
  (**
   * @remix-run/server-runtime v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/sessions/cookieStorage.js:
  (**
   * @remix-run/server-runtime v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/sessions/memoryStorage.js:
  (**
   * @remix-run/server-runtime v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/upload/errors.js:
  (**
   * @remix-run/server-runtime v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/upload/memoryUploadHandler.js:
  (**
   * @remix-run/server-runtime v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/dev.js:
  (**
   * @remix-run/server-runtime v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/index.js:
  (**
   * @remix-run/server-runtime v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/cloudflare/dist/crypto.js:
  (**
   * @remix-run/cloudflare v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/cloudflare/dist/implementations.js:
  (**
   * @remix-run/cloudflare v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/cloudflare/dist/sessions/workersKVStorage.js:
  (**
   * @remix-run/cloudflare v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/cloudflare/dist/index.js:
  (**
   * @remix-run/cloudflare v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react/cjs/react.development.js:
  (**
   * @license React
   * react.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-router/dist/index.js:
  (**
   * React Router v6.14.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react-router-dom/dist/index.js:
  (**
   * React Router DOM v6.14.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react-dom/cjs/react-dom-server-legacy.browser.development.js:
  (**
   * @license React
   * react-dom-server-legacy.browser.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-server.browser.development.js:
  (**
   * @license React
   * react-dom-server.browser.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-dev-runtime.development.js:
  (**
   * @license React
   * react-jsx-dev-runtime.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

@remix-run/cloudflare-pages/dist/esm/worker.js:
  (**
   * @remix-run/cloudflare-pages v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/cloudflare-pages/dist/esm/index.js:
  (**
   * @remix-run/cloudflare-pages v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/_virtual/_rollupPluginBabelHelpers.js:
  (**
   * @remix-run/react v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/errorBoundaries.js:
  (**
   * @remix-run/react v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/invariant.js:
  (**
   * @remix-run/react v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/routeModules.js:
  (**
   * @remix-run/react v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/links.js:
  (**
   * @remix-run/react v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/markup.js:
  (**
   * @remix-run/react v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/warnings.js:
  (**
   * @remix-run/react v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/components.js:
  (**
   * @remix-run/react v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/routes.js:
  (**
   * @remix-run/react v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/scroll-restoration.js:
  (**
   * @remix-run/react v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/server.js:
  (**
   * @remix-run/react v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/index.js:
  (**
   * @remix-run/react v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/css-bundle/dist/esm/index.js:
  (**
   * @remix-run/css-bundle v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)
*/
//# sourceMappingURL=/build/[[path]].js.map
