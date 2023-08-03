// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"12OVJ":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "8282664131610b93";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"ku39B":[function(require,module,exports) {
let e, t, o, r;
const a = document.body.querySelector(".loading-container");
function n(e, t, o, r) {
    let a;
    "enter" === (t = t.toLowerCase()) ? void 0 === o ? function(e) {
        let t = e[0].parentNode;
        for (let o of (t.classList.add("row-rejection"), e))o.classList.add("cell-rejection");
        setTimeout(()=>{
            for (let o of (t.classList.remove("row-rejection"), e))o.classList.remove("cell-rejection");
        }, 1e3);
    }(e) : function(e, t, o) {
        for(let r = 0; r < t.length; r++){
            let a, n = e[r];
            for (let e of o)e.innerText.toLowerCase() === n.innerText.toLowerCase() && (a = e);
            let s = t[r], l = document.querySelector(".switch__checkbox").getAttribute("data-theme");
            n.classList.add("game-board-validation"), a.classList.add("keyboard-validation"), n.style.animationDelay = `${.15 * r}s`, a.style.animationDelay = `${.15 * r}s`, setTimeout(()=>{
                !0 === s ? (n.classList.add("game-board__letter--correct"), a.classList.add("keyboard__letter--correct"), "dark" === l && (n.classList.add("game-board__letter--correct-dark"), a.classList.add("keyboard__letter--correct-dark"))) : "close" === s ? (n.classList.add("game-board__letter--close"), a.classList.add("keyboard__letter--close"), "dark" === l && (n.classList.add("game-board__letter--close-dark"), a.classList.add("keyboard__letter--close-dark"))) : (n.classList.add("game-board__letter--missing"), a.classList.add("keyboard__letter--missing"), "dark" === l && (n.classList.add("game-board__letter--missing-dark"), a.classList.add("keyboard__letter--missing-dark")));
            }, 500 + 150 * r), setTimeout(()=>{
                a.classList.remove("keyboard-validation"), a.style.removeProperty("animation-delay");
            }, 1e3 + 150 * r);
        }
    }(e, o, r) : "backspace" === t ? ((a = e.querySelector(".letter-text")).classList.add("letter-removing"), setTimeout(()=>a.innerText = "", 200), setTimeout(()=>a.classList.remove("letter-removing"), 200)) : function(e) {
        let t;
        for (let o of e)"" !== o.innerText && (t = o);
        let o = t.querySelector(".letter-text");
        o.classList.add("letter-adding"), setTimeout(()=>o.classList.remove("letter-adding"), 200);
    }(e);
}
function s(e, t) {
    let o;
    let r = t.toLowerCase();
    if ("backspace" === r) (o = document.querySelector(".backspace-button")).classList.add("backspace-typing");
    else if ("enter" === r) (o = document.querySelector(".enter-button")).classList.add("enter-typing");
    else {
        for (let t of e)if (t.innerHTML.toLowerCase() === r) {
            o = t;
            break;
        }
        o.classList.add("letter-typing");
    }
    if (void 0 === o) {
        l();
        return;
    }
}
const l = ()=>{
    console.log(`Know what the button said to the clicker? 
~crying in sadness~ 
it just feels like, you're always pushing me away 😢`);
};
function c(e) {
    e.classList.add("dialog-entry");
}
function i(e) {
    e.classList.remove("dialog-entry"), e.classList.add("dialog-exit"), setTimeout(()=>{
        e.classList.remove("dialog-exit");
    }, 500);
}
function d(e, t) {
    return "backspace" === (t = t.toLowerCase()) ? function(e) {
        for(let t = e.length - 1; t >= 0; t--)if ("" !== e[t].innerText) {
            n(e[t], "backspace");
            break;
        }
        return !0;
    }(e) : "enter" === t || (u(t) ? function(e, t) {
        let o;
        for (let t of e)if ("" === t.innerText) {
            o = t;
            break;
        }
        return void 0 !== o && (o.childNodes[0].innerText = t.toUpperCase(), !0);
    }(e, t) : void 0);
}
const u = (e)=>/^[a-zA-Z]$/.test(e), f = document.querySelector(".settings-dialog"), m = document.querySelector(".how-to-play-dialog"), y = document.querySelector(".theme-switch"), b = y.querySelector(".switch__checkbox");
let g = function() {
    let e = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return e ? "dark" : "light";
}(), h = !0;
const k = [
    "feedback-message",
    "header__title",
    "keyboard",
    "theme-switch"
], w = [
    [
        "game-board__letter--missing",
        "game-board__letter--close",
        "game-board__letter--correct",
        "keyboard__letter--missing",
        "keyboard__letter--close",
        "keyboard__letter--correct",
        "fake-letter--missing",
        "fake-letter--close",
        "fake-letter--correct"
    ],
    [
        "game-board__letter",
        "keyboard__letter",
        "row-separator",
        "fake-letter",
        "subheader-text",
        "how-to-play__headings",
        "how-to-play__list",
        "loading-container",
        "loading-spinner"
    ]
], L = document.body.querySelectorAll(".light-theme__svg"), v = document.body.querySelectorAll(".dark-theme__svg");
function _(o) {
    "settings" === o ? (c(f), f.showModal(), f.focus()) : "howToPlay" === o && (c(m), m.showModal(), m.focus()), U(), document.addEventListener("keydown", e = (e)=>{
        "Escape" === e.key && (e.preventDefault(), S(o));
    }), document.addEventListener("click", t = (e)=>{
        e.target instanceof HTMLDialogElement && S(o);
    });
}
function S(o) {
    if ("settings" === o) {
        let e = document.body.querySelector(".settings-btn");
        i(f), setTimeout(()=>{
            f.close(), e.blur();
        }, 450);
    } else if ("howToPlay" === o) {
        let e = document.body.querySelector(".how-to-play-btn");
        i(m), setTimeout(()=>{
            m.close(), e.blur();
        }, 450);
    }
    document.removeEventListener("keydown", e), document.removeEventListener("click", t), j();
}
function p() {
    _("settings");
}
function T() {
    S("settings");
}
function E() {
    let e, t, o = b.getAttribute("data-theme"), r = (e = [], k.forEach((t)=>{
        let o = document.body.querySelector(`.${t}`);
        e.push(o);
    }), e), a = (t = [], w.forEach((e)=>{
        e.forEach((e)=>{
            let o = document.body.querySelectorAll(`.${e}`);
            t.push(o);
        });
    }), t);
    "light" === o || !0 === h ? function(e, t) {
        b.setAttribute("data-theme", "dark"), $(L, v, "dark");
        let o = document.body;
        o.classList.add("body--dark");
        let r = document.body.querySelector("header");
        r.classList.add("header--dark");
        let a = document.body.querySelectorAll("dialog");
        a.forEach((e)=>{
            e.classList.add("dialog--dark");
        }), e.length > 0 && q(e, "add"), t.length > 0 && C(t, "add");
    }(r, a) : function(e, t) {
        b.setAttribute("data-theme", "light"), $(L, v, "light");
        let o = document.body;
        o.classList.remove("body--dark");
        let r = document.body.querySelector("header");
        r.classList.remove("header--dark");
        let a = document.body.querySelectorAll("dialog");
        a.forEach((e)=>{
            e.classList.remove("dialog--dark");
        }), e.length > 0 && q(e, "remove"), t.length > 0 && C(t, "remove");
    }(r, a);
}
function q(e, t) {
    e.forEach((e)=>{
        for (let o of e.classList)k.includes(o) && ("add" === t ? e.classList.add(`${o}--dark`) : "remove" === t && e.classList.remove(`${o}--dark`));
    });
}
function C(e, t) {
    e.forEach((e)=>{
        e.length > 0 && e.forEach((e)=>{
            for (let o of e.classList){
                let r = w[0], a = w[1];
                r.includes(o) ? "add" === t ? e.classList.add(`${o}-dark`) : "remove" === t && e.classList.remove(`${o}-dark`) : a.includes(o) && ("add" === t ? e.classList.add(`${o}--dark`) : "remove" === t && e.classList.remove(`${o}--dark`));
            }
        });
    });
}
function $(e, t, o) {
    "light" === o ? (e.forEach((e)=>{
        e.removeAttribute("hidden");
    }), t.forEach((e)=>{
        e.setAttribute("hidden", "true");
    })) : "dark" === o && (t.forEach((e)=>{
        e.removeAttribute("hidden");
    }), e.forEach((e)=>{
        e.setAttribute("hidden", "true");
    }));
}
function D() {
    _("howToPlay");
    let e = document.querySelector(".fake-game-row").children;
    !function(e) {
        for(let t = 0; t < e.length; t++){
            let o = e[t];
            setTimeout(()=>{
                o.classList.add("game-board-validation");
            }, 200 + 150 * t), setTimeout(()=>{
                o.classList.remove("game-board-validation");
            }, 1200 + 150 * t);
        }
    }(e);
}
function A() {
    S("howToPlay");
}
async function x() {
    let e = M();
    return null === localStorage.getItem("wordOfTheDay") || e ? await R() : function(e) {
        let t = 26, o = "", r = [];
        for(; "" !== e;)r.push(e.substring(0, t)), e = e.slice(t), t += 17;
        for (let e of r)o += String.fromCharCode(e[11].charCodeAt(0) + 64);
        return o;
    }(localStorage.getItem("wordOfTheDay"));
}
async function R() {
    let e = await I();
    return localStorage.setItem("wordOfTheDay", function(e) {
        let t = [
            "!",
            "$",
            "7",
            "&",
            "?",
            "p",
            "q",
            "r",
            "/",
            "<",
            "g",
            ".",
            "5",
            "i",
            " ",
            "9",
            "4",
            "-",
            ")",
            "D",
            "T",
            "R",
            "{",
            "}",
            "U",
            "Z",
            "t",
            "K",
            "P",
            "~",
            ";",
            "|",
            ":",
            "z",
            "V",
            "W",
            "X",
            "+",
            "=",
            "G",
            "H",
            "I",
            "@",
            "#",
            "%",
            "3",
            ">",
            "^",
            "c",
            "d"
        ], o = t.length, r = 26, a = "";
        for (let n of e){
            for(let e = 0; e < r; e++)11 === e ? a += String.fromCharCode(n.charCodeAt(0) - 64) : a += t[parseInt(100 * Math.random()) % o];
            r += 17;
        }
        return a;
    }(e)), e;
}
async function I() {
    let e = fetch("https://words.dev-apis.com/word-of-the-day");
    return e.then((e)=>e.json()).then((e)=>e.word).catch(()=>{
        G(`Server error 😐`, !1);
    });
}
function M() {
    let e = null === localStorage.getItem("currentDay");
    if (e) return P(), !0;
    {
        let e = N();
        return e !== localStorage.getItem("currentDay");
    }
}
function N() {
    let e = new Date, t = `${e.getUTCDate()}/${e.getUTCMonth() + 1}/${e.getUTCFullYear()}`;
    return t;
}
function P() {
    localStorage.setItem("currentDay", N());
}
const O = document.querySelector(".keyboard"), H = document.querySelectorAll(".keyboard__letter");
function j() {
    B(), document.body.addEventListener("keyup", J), z();
}
function U() {
    document.body.removeEventListener("keydown", o), document.body.removeEventListener("keyup", J), O.removeEventListener("click", r);
}
async function B() {
    let e = await x();
    document.body.addEventListener("keydown", o = function(t) {
        if (X.currentRow < 6) {
            let o = document.querySelectorAll(".game-board__row")[X.currentRow].children, r = t.key;
            if (d(o, r) && ("Backspace" !== r && "Enter" !== r && n(o, r), "Enter" !== r && s(H, r), "Enter" === r)) {
                let t = document.activeElement;
                (t instanceof HTMLBodyElement || t.classList.contains(".enter-button")) && (s(H, r), K(o, H, e));
            }
        }
    });
}
function J(e) {
    let t = e.key;
    !function(e, t) {
        let o;
        let r = t.toLowerCase();
        if ("backspace" === r) o = document.querySelector(".backspace-button");
        else if ("enter" === r) o = document.querySelector(".enter-button");
        else for (let t of e)if (t.innerHTML.toLowerCase() === r) {
            o = t;
            break;
        }
        if (void 0 === o) {
            l();
            return;
        }
        setTimeout(()=>{
            o.classList.contains("backspace-typing") ? o.classList.remove("backspace-typing") : o.classList.contains("enter-typing") ? o.classList.remove("enter-typing") : o.classList.contains("letter-typing") && o.classList.remove("letter-typing");
        }, 150);
    }(H, t);
}
async function z() {
    let e = await x();
    O.addEventListener("click", r = function(t) {
        if (X.currentRow < 6) {
            let o = document.querySelector(".game-board__row[data-state='TBD']").children, r = t.target;
            (r instanceof HTMLButtonElement || r instanceof HTMLImageElement) && (r instanceof HTMLImageElement || r.classList.contains("backspace-button") ? d(o, "Backspace") : r.classList.contains("enter-button") ? (d(o, "Enter"), K(o, H, e)) : d(o, r.innerHTML) && n(o, r.innerHTML), r.blur());
        }
    });
}
let W = !1;
function G(e, t, o) {
    let r = document.querySelector(".feedback-message");
    r.innerHTML = `${e}`, W || (r.classList.add("fade-in-feedback"), W = !0, t || (setTimeout(()=>{
        r.classList.remove("fade-in-feedback"), r.classList.add("fade-out-feedback");
    }, 1e3 * o), setTimeout(()=>{
        r.classList.remove("fade-out-feedback"), W = !1;
    }, 1e3 * o + 500)));
}
async function K(e, t, o) {
    if (function(e) {
        let t = !1;
        for(let o = 0; o < e.length; o++)if ("" === e[o].innerText) {
            G("Not Enough Letters", !1, 1), n(e, "enter"), t = !1;
            break;
        } else t = !0;
        return t;
    }(e)) {
        a.style.visibility = "visible";
        let r = function(e) {
            let t = "";
            for (let o of e)t += o.textContent;
            return t;
        }(e), s = await Y(o, r, e, t);
        a.style.visibility = "hidden", !1 === s ? n(e, "enter") : (n(e, "enter", s, t), document.querySelectorAll(".game-board__row")[X.currentRow].dataset.state = "DONE", setTimeout(()=>{
            Q.currentRow = X.currentRow, function(e) {
                for(let t = 0; t < 5; t++){
                    Q.rowsData[Q.currentRow][t] = e[t].childNodes[0].innerText;
                    let o = e[t].classList, r = "game-board__letter--";
                    o.contains(`${r}correct`) ? Q.rowsClasses[Q.currentRow][t] = `${r}correct` : o.contains(`${r}close`) ? Q.rowsClasses[Q.currentRow][t] = `${r}close` : o.contains(`${r}missing`) && (Q.rowsClasses[Q.currentRow][t] = `${r}missing`);
                }
            }(e), function() {
                let e = document.querySelectorAll(".keyboard__letter:not(.enter-button):not(.backspace-button)"), t = "keyboard__letter--";
                for(let o = 0; o < 26; o++){
                    let r = e[o].classList;
                    r.contains(`${t}correct`) ? Q.keyboardClasses[o][1] = `${t}correct` : r.contains(`${t}close`) ? Q.keyboardClasses[o][1] = `${t}close` : r.contains(`${t}missing`) && (Q.keyboardClasses[o][1] = `${t}missing`);
                }
            }(), X.isSolved && (Q.isSolved = !0), localStorage.setItem("userProgress", JSON.stringify(Q));
        }, 1200)), !1 !== s && (X.isSolved ? U() : X.currentRow < 6 && setTimeout(()=>{
            X.currentRow++;
        }, 1200));
    }
}
async function Y(e, t) {
    if (void 0 === e) return !1;
    let o = await Z(e, t);
    if (!1 === o) return !1;
    for (let e of o)if (!0 === e) X.isSolved = !0;
    else {
        X.isSolved = !1;
        break;
    }
    if (X.isSolved) switch(X.currentRow){
        case 0:
            G("Exceptional", !1, 2.5);
            break;
        case 1:
            G("Incredible", !1, 2.5);
            break;
        case 2:
            G("Impressive", !1, 2.5);
            break;
        case 3:
            G("Great", !1, 2.5);
            break;
        case 4:
            G("Nice", !1, 2.5);
            break;
        default:
            G("Phew", !1, 2.5);
    }
    else 5 === X.currentRow && G(`Correct word: ${e.toUpperCase()}`, !0);
    return o;
}
async function Z(e, t) {
    let o = await V(t);
    if (!1 === o) return G("Not In Word List", !1, 1.5), !1;
    if (void 0 === o) return !1;
    if (/\d/.test(e) || e.length !== t.length) return G("Server Error, Enjoy a cookie while we work on it \uD83D\uDE19", !0), !1;
    let r = Array.from(t, ()=>!1);
    e = e.toLowerCase(), t = t.toLowerCase();
    for(let o = 0; o < e.length; o++){
        var a;
        let n = function(e, t) {
            let o = [], r = e.indexOf(t);
            for(; -1 !== r;)o.push(r), r = e.indexOf(t, r + 1);
            return o;
        }(t, e[o]);
        1 === n.length ? (a = n[0], a === o ? r[a] = !0 : !1 === r[a] && (r[a] = "close")) : function(e, t, o) {
            let r = new Map;
            e.forEach((e)=>{
                let o = Math.abs(e - t);
                r.set(`${e}`, o);
            });
            let a = F(r);
            r.delete(a), Number(a) === t ? o[a] = !0 : !1 === o[a] ? o[a] = "close" : function(e, t) {
                for(; e.size > 0;){
                    let o = F(e);
                    if (e.delete(o), !1 === t[o]) {
                        t[o] = "close";
                        break;
                    }
                }
            }(r, o);
        }(n, o, r);
    }
    return r;
}
function F(e) {
    return [
        ...e.entries()
    ].reduce((e, [t, o])=>o < e[1] ? [
            t,
            o
        ] : e, [
        null,
        1 / 0
    ])[0];
}
async function V(e) {
    let t = await fetch("https://words.dev-apis.com/validate-word", {
        method: "POST",
        body: JSON.stringify({
            word: `${e}`
        }),
        headers: {
            "Content-Type": "application/json",
            Connection: "keep-alive"
        }
    }).catch(()=>{
        G("Server Error, please check your internet connection \uD83D\uDE1E", !1, 3);
    });
    if (void 0 === t) return;
    let o = await t.json();
    return o.validWord;
}
const X = {
    currentRow: 0,
    isSolved: !1
}, Q = JSON.parse(null === localStorage.getItem("userProgress") || M() ? function() {
    let [e, t, o] = [
        [],
        [],
        []
    ];
    for(let o = 0; o < 6; o++)e[o] = [
        ,
        ,
        ,
        ,
        , 
    ].fill(""), t[o] = [
        ,
        ,
        ,
        ,
        , 
    ].fill("");
    let r = document.querySelectorAll(".keyboard__letter:not(.enter-button):not(.backspace-button)");
    for(let e = 0; e < 26; e++)o[e] = [
        r[e].innerText,
        ""
    ];
    return localStorage.setItem("userProgress", JSON.stringify({
        currentRow: -1,
        rowsData: e,
        rowsClasses: t,
        keyboardClasses: o,
        isSolved: !1
    })), localStorage.getItem("userProgress");
}() : localStorage.getItem("userProgress"));
async function ee(e) {
    if (X.currentRow = e.currentRow + 1, X.isSolved = e.isSolved, function() {
        let e = document.querySelectorAll(".game-board__row");
        for(let t = 0; t <= Q.currentRow; t++){
            let o = e[t], r = o.children;
            o.setAttribute("data-state", "DONE");
            for(let e = 0; e < r.length; e++){
                let o = r[e], a = o.childNodes[0];
                a.innerText = Q.rowsData[t][e];
                let n = Q.rowsClasses[t][e];
                o.classList.add("game-board-validation"), o.style.animationDelay = `${.03 * t}s`, o.classList.add(n);
            }
        }
    }(), function() {
        let e = document.querySelectorAll(".keyboard__letter:not(.enter-button):not(.backspace-button)");
        for(let t = 0; t < e.length; t++){
            let o = e[t], r = Q.keyboardClasses[t][1];
            "" !== r && (o.classList.add("keyboard-validation"), o.style.animationDelay = `${.03 * t}s`, o.classList.add(r), setTimeout(()=>{
                o.classList.remove("keyboard-validation"), o.style.removeProperty("animation-delay");
            }, 1e3 + 30 * t));
        }
    }(), 5 !== e.currentRow || e.isSolved) e.isSolved && G(`Excellent work!, You solved today's word in the ${[
        "first",
        "second",
        "third",
        "fourth",
        "fifth",
        "sixth"
    ][e.currentRow]} row`, !0);
    else {
        let e = await x();
        G(`Correct word: ${e.toUpperCase()}`, !0);
    }
}
const et = M();
-1 === Q.currentRow || et || ee(Q), "dark" === g && (b.setAttribute("data-theme", "dark"), E(), h = !1, b.click()), Q.isSolved || j(), function() {
    let e = document.querySelector(".settings-btn"), t = document.querySelector(".settings-close");
    e.addEventListener("click", p), t.addEventListener("click", T);
}(), b.addEventListener("click", E), function() {
    let e = document.body.querySelector(".how-to-play-btn"), t = document.body.querySelector(".how-to-play-close");
    e.addEventListener("click", D), t.addEventListener("click", A);
}(), et && (localStorage.removeItem("currentDay"), P());

},{}]},["12OVJ","ku39B"], "ku39B", "parcelRequiree354")

//# sourceMappingURL=index.31610b93.js.map
