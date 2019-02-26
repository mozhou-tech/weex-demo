// { "framework": "Vue"} 

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 55);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.createLink = createLink;
exports.hashToURL = hashToURL;
exports.createURL = createURL;
exports.i18n = i18n;
exports.parseLanguage = parseLanguage;
exports.setLanguage = setLanguage;
exports.clearStorageLanguage = clearStorageLanguage;
exports.getStorageLanguage = getStorageLanguage;
exports.getSystemLanguage = getSystemLanguage;
exports.getLanguage = getLanguage;
exports.setTitleBar = setTitleBar;
exports.fetchData = fetchData;
exports.saveData = saveData;
exports.readData = readData;
var stream = weex.requireModule('stream');
var storage = weex.requireModule('storage');
var navigator = weex.requireModule('navigator');

var encoder = exports.encoder = typeof encodeURIComponent === 'function' ? encodeURIComponent : typeof encodeURI === 'function' ? encodeURI : function (x) {
  return x;
};

var decoder = exports.decoder = typeof decodeURIComponent === 'function' ? decodeURIComponent : typeof decodeURI === 'function' ? decodeURI : function (x) {
  return x;
};

function encodeParams(params) {
  if (!params || (typeof params === 'undefined' ? 'undefined' : _typeof(params)) !== 'object') {
    return '';
  }
  var array = [];
  for (var key in params) {
    if (typeof params[key] === 'string') {
      array.push(encoder(key) + '=' + encoder(params[key]));
    }
  }
  return array.join('&');
}

function createLink(name) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var args = [];
  for (var key in params) {
    if (typeof params[key] === 'string') {
      args.push(encoder(key) + '=' + encoder(params[key]));
    }
  }
  var url = '' + getBaseURL() + name + '.weex.js';
  var paramString = args.join('&');
  if (WXEnvironment.platform === 'Web') {
    args.unshift('page=' + name + '.web.js');
    return '/?' + args.join('&');
  }
  if (WXEnvironment.appName === 'TB') {
    return url + '?_wx_tpl=' + url + '&' + paramString;
  }
  return url + (args.length ? '?' + paramString : '');
}

function hashToURL(hash) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (WXEnvironment.platform === 'Web') {
    return 'http://dotwe.org/raw/htmlVue/' + hash;
  }
  var url = 'http://dotwe.org/raw/dist/' + hash + '.bundle.wx';
  var paramString = encodeParams(params);
  if (WXEnvironment.appName === 'TB') {
    return url + '?_wx_tpl=' + url + '&' + paramString;
  }
  if (WXEnvironment.appName === 'WXSample') {
    return url + '?' + paramString;
  }
  return url + '?wx_weex=true&' + paramString;
}

function getBaseURL() {
  var bundleUrl = weex.config.bundleUrl;
  var isAndroidAssets = bundleUrl.indexOf('your_current_IP') >= 0 || bundleUrl.indexOf('file://assets/') >= 0;
  var isiOSAssets = bundleUrl.indexOf('file:///') >= 0 && bundleUrl.indexOf('WeexDemo.app') > 0;
  var matchURL = /(https?\:\/\/[^?]+)\??/i.exec(bundleUrl);
  if (isAndroidAssets) {
    return 'file://assets/';
  } else if (isiOSAssets) {
    // file:///var/mobile/Containers/Bundle/Application/{id}/WeexDemo.app/
    // file:///Users/{user}/Library/Developer/CoreSimulator/Devices/{id}/data/Containers/Bundle/Application/{id}/WeexDemo.app/
    return bundleUrl.substring(0, bundleUrl.lastIndexOf('/') + 1);
  } else if (matchURL && matchURL[1]) {
    return matchURL[1].replace(/\/\w+\.(weex|web)\.js$/i, '/');
  }
  return '';
}

function createURL(url) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return createLink('webview', {
    language: params.language || this && this.language || 'en',
    url: i18n(url),
    title: i18n(params.title)
  });
}

function i18n(text, language) {
  if (typeof text === 'string') {
    return text;
  }
  if (Object.prototype.toString.call(text) === '[object Object]') {
    var lang = this && this.language || language || 'en';
    return text[lang];
  }
}

var supportedLanguageRE = /(en|zh)\_?\w*/i;
function parseLanguage(language) {
  var match = supportedLanguageRE.exec(language + '');
  if (match && match[1]) {
    return match[1];
  }
  return '';
}

function setLanguage(language) {
  var lang = parseLanguage(language);
  if (lang) {
    storage.setItem('WEEX_PLAYGROUND_LANGUAGE', lang);
  }
}

function clearStorageLanguage() {
  storage.removeItem('WEEX_PLAYGROUND_LANGUAGE');
}

function getStorageLanguage(done) {
  var fail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

  if (!(typeof done === 'undefined' ? 'undefined' : _typeof(done)) === 'function') {
    return;
  }
  try {
    storage.getItem('WEEX_PLAYGROUND_LANGUAGE', function (event) {
      if (event.result === 'success') {
        var lang = parseLanguage(event.data);
        lang ? done(lang) : fail();
      } else {
        fail(event);
      }
    });
  } catch (err) {
    fail(err);
  }
}

function getSystemLanguage(done) {
  var fail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

  if (!(typeof done === 'undefined' ? 'undefined' : _typeof(done)) === 'function') {
    return;
  }
  if (WXEnvironment.platform.toLowerCase() === 'web') {
    var lang = parseLanguage(window.navigator.language);
    lang ? done(lang) : fail();
  } else {
    try {
      var locale = weex.requireModule('locale') || weex.requireModule('local');
      var useSync = false;
      var resSync = locale.getLanguage(function (language) {
        var lang = parseLanguage(language);
        if (lang) {
          useSync || done(lang);
        } else {
          fail();
        }
      });
      var langSync = parseLanguage(resSync);
      if (langSync) {
        useSync = true;
        done(langSync);
      } else {
        fail();
      }
    } catch (e) {
      fail(e);
    }
  }
}

var languageRE = /.+[\?\&]{1}language=([\d\w]+)[\?\&]?.*/i;
function getLanguage() {
  var done = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

  var match = languageRE.exec(weex.config.bundleUrl || '');
  var lang = parseLanguage(match && match[1]);
  if (lang) {
    done(lang);
  } else {
    getStorageLanguage(done, function () {
      getSystemLanguage(done, function () {
        done('en');
      });
    });
  }
}

function setTitleBar(options) {
  var language = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';

  if (Object.prototype.toString.apply(options) !== '[object Object]') {
    return;
  }
  var titleBar = weex.requireModule('titleBar');
  if (options.color || options.backgroundColor) {
    try {
      titleBar.setStyle({
        foregroundColor: options.color || '#FFFFFF',
        backgroundColor: options.backgroundColor || '#00B4FF'
      });
    } catch (e) {}
  }
  var title = i18n(options.title, language);
  if (title) {
    try {
      titleBar.setTitle(title);
    } catch (e) {}
  }
}

var storageKeys = {
  doodle: 'WEEX_PLAYGROUND_APP_DOODLE',
  guide: 'WEEX_PLAYGROUND_APP_GUIDE',
  examples: 'WEEX_PLAYGROUND_APP_EXAMPLES',
  news: 'WEEX_PLAYGROUND_APP_NEWS',
  about: 'WEEX_PLAYGROUND_APP_ABOUT'
};
function fetchData(name) {
  var done = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  var fail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

  try {
    stream.fetch({
      url: 'http://dotwe.org/query/weex-playground-app',
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      type: 'json',
      body: 'name=' + name
    }, function (res) {
      if (res.ok && res.data && res.data.success) {
        done(res.data);
      } else {
        fail(res);
      }
    });
  } catch (err) {
    fail(err);
  }
}
function saveData(name, result) {
  var key = storageKeys[name];
  if (!key) return;
  if (result && (typeof result === 'undefined' ? 'undefined' : _typeof(result)) === 'object') {
    result.timestamp = Date.now();
    storage.setItem(key, JSON.stringify(result));
  }
}
function readData(name) {
  var done = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  var fail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

  var key = storageKeys[name];
  if (!key) return fail();
  try {
    storage.getItem(key, function (event) {
      if (event.result === 'success') {
        var result = JSON.parse(event.data);
        if (result && Array.isArray(result[name])) {
          return done(result[name]);
        }
      }
      fail(event);
    });
  } catch (e) {
    fail(e);
  }
}

var fetchExamples = exports.fetchExamples = function fetchExamples() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return fetchData.apply(undefined, ['examples'].concat(args));
};
var saveExamples = exports.saveExamples = function saveExamples() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return saveData.apply(undefined, ['examples'].concat(args));
};
var readExamples = exports.readExamples = function readExamples() {
  for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  return readData.apply(undefined, ['examples'].concat(args));
};

var fetchGuide = exports.fetchGuide = function fetchGuide() {
  for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    args[_key4] = arguments[_key4];
  }

  return fetchData.apply(undefined, ['guide'].concat(args));
};
var saveGuide = exports.saveGuide = function saveGuide() {
  for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    args[_key5] = arguments[_key5];
  }

  return saveData.apply(undefined, ['guide'].concat(args));
};
var readGuide = exports.readGuide = function readGuide() {
  for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    args[_key6] = arguments[_key6];
  }

  return readData.apply(undefined, ['guide'].concat(args));
};

var fetchAbout = exports.fetchAbout = function fetchAbout() {
  for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
    args[_key7] = arguments[_key7];
  }

  return fetchData.apply(undefined, ['about'].concat(args));
};
var saveAbout = exports.saveAbout = function saveAbout() {
  for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
    args[_key8] = arguments[_key8];
  }

  return saveData.apply(undefined, ['about'].concat(args));
};
var readAbout = exports.readAbout = function readAbout() {
  for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
    args[_key9] = arguments[_key9];
  }

  return readData.apply(undefined, ['about'].concat(args));
};

var fetchDoodle = exports.fetchDoodle = function fetchDoodle() {
  for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
    args[_key10] = arguments[_key10];
  }

  return fetchData.apply(undefined, ['doodle'].concat(args));
};
var fetchNews = exports.fetchNews = function fetchNews() {
  for (var _len11 = arguments.length, args = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
    args[_key11] = arguments[_key11];
  }

  return fetchData.apply(undefined, ['news'].concat(args));
};
var saveNews = exports.saveNews = function saveNews() {
  for (var _len12 = arguments.length, args = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
    args[_key12] = arguments[_key12];
  }

  return saveData.apply(undefined, ['news'].concat(args));
};
var readNews = exports.readNews = function readNews() {
  for (var _len13 = arguments.length, args = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
    args[_key13] = arguments[_key13];
  }

  return readData.apply(undefined, ['news'].concat(args));
};

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(2)
)

/* script */
__vue_exports__ = __webpack_require__(3)

/* template */
var __vue_template__ = __webpack_require__(4)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/jerrylau/WebstormProjects/weex-demo/src/components/ExampleScroller.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-eb3cb078"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = {
  "scroller": {
    "flexDirection": "row",
    "backgroundColor": "#FDFDFD",
    "paddingTop": "20",
    "paddingRight": "20",
    "paddingBottom": "20",
    "paddingLeft": "20",
    "height": "600"
  },
  "example-box": {
    "justifyContent": "space-between",
    "alignItems": "center",
    "paddingLeft": "6",
    "paddingRight": "6",
    "width": "310"
  },
  "screenshot": {
    "width": "270",
    "height": "422",
    "borderWidth": "1",
    "borderColor": "#DDDDDD"
  },
  "title": {
    "height": "75",
    "justifyContent": "center"
  },
  "title-text": {
    "fontSize": "32",
    "textAlign": "center",
    "color": "#606060",
    "paddingTop": "10",
    "paddingBottom": "10"
  },
  "example-tips": {
    "paddingTop": "10",
    "paddingBottom": "10"
  },
  "example-tips-text": {
    "fontSize": "28",
    "textAlign": "center",
    "color": "#A5A5A5"
  }
}

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: {
    language: {
      type: String,
      default: 'en'
    },
    examples: {
      type: Array,
      required: true
    }
  },
  data: function data() {
    return {
      VIEW_SOURCE: {
        en: 'view source',
        zh: '查看源码'
      }
    };
  },

  methods: {
    createSourceURL: function createSourceURL(hash) {
      var hashString = this.i18n(hash);
      return this.createURL('http://dotwe.org/source/' + hashString, {
        language: this.language,
        title: this.i18n(this.VIEW_SOURCE)
      });
    }
  }
};

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('scroller', {
    staticClass: ["scroller"],
    attrs: {
      "scrollDirection": "horizontal"
    }
  }, _vm._l((_vm.examples), function(example, i) {
    return _c('div', {
      key: i,
      staticClass: ["example-box"]
    }, [_c('div', {
      staticClass: ["title"]
    }, [_c('text', {
      staticClass: ["title-text"]
    }, [_vm._v(_vm._s(_vm.i18n(example.title)))])]), _c('div', {
      staticStyle: {
        alignItems: "center"
      }
    }, [_c('a', {
      attrs: {
        "href": _vm._f("hashToURL")(_vm.i18n(example.hash))
      }
    }, [_c('image', {
      staticClass: ["screenshot"],
      attrs: {
        "src": _vm.i18n(example.screenshot)
      }
    })]), _c('a', {
      staticClass: ["example-tips"],
      attrs: {
        "href": _vm.createSourceURL(example.hash)
      }
    }, [_c('text', {
      staticClass: ["example-tips-text"]
    }, [_vm._v(_vm._s(_vm.i18n(_vm.VIEW_SOURCE)))])])])])
  }))
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Login = __webpack_require__(56);

var _Login2 = _interopRequireDefault(_Login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Login2.default.el = '#root';
new Vue(_Login2.default);

/***/ }),

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(57)
)

/* script */
__vue_exports__ = __webpack_require__(58)

/* template */
var __vue_template__ = __webpack_require__(59)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/jerrylau/WebstormProjects/weex-demo/src/pages/login/Login.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-659840cf"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),

/***/ 57:
/***/ (function(module, exports) {

module.exports = {
  "example-list": {
    "width": "750",
    "position": "absolute",
    "top": 0,
    "bottom": "100",
    "backgroundColor": "#F5F5F5"
  },
  "group-info": {
    "backgroundColor": "#FFFFFF"
  },
  "loading": {
    "flex": 1,
    "justifyContent": "center",
    "alignItems": "center"
  },
  "loading-text": {
    "fontSize": "60",
    "color": "#BBBBBB"
  },
  "group-title": {
    "width": "750",
    "paddingTop": "20",
    "paddingBottom": "35",
    "fontSize": "40",
    "textAlign": "center",
    "color": "#00B4FF",
    "backgroundImage": "linear-gradient(to bottom, #E3F5FB, #F9FEFF)"
  },
  "group-desc": {
    "fontSize": "28",
    "color": "#999999",
    "marginTop": "10",
    "marginLeft": "30",
    "marginRight": "40"
  },
  "doc-link": {
    "marginTop": "10",
    "marginRight": "60",
    "marginBottom": "20"
  },
  "doc-link-text": {
    "fontSize": "26",
    "color": "rgba(0,189,255,0.6)",
    "textAlign": "right"
  },
  "section": {
    "paddingBottom": "30"
  },
  "tabbar": {
    "width": "750",
    "position": "fixed",
    "bottom": 0,
    "height": "100",
    "flexDirection": "row",
    "justifyContent": "space-around",
    "alignItems": "flex-end",
    "backgroundColor": "#E6E6E6"
  },
  "tab-cell": {
    "width": "186",
    "height": "100",
    "borderTopWidth": "2",
    "borderTopStyle": "solid",
    "borderTopColor": "#DDDDDD",
    "justifyContent": "center",
    "backgroundColor": "#FCFCFC",
    "transitionProperty": "backgroundColor",
    "transitionDuration": 200
  },
  "@TRANSITION": {
    "tab-cell": {
      "property": "backgroundColor",
      "duration": 200
    },
    "tab-name": {
      "property": "color,fontSize",
      "duration": 100
    }
  },
  "active-tab-cell": {
    "borderTopColor": "rgba(0,189,255,0.8)",
    "backgroundColor": "#BDECFF"
  },
  "tab-name": {
    "textAlign": "center",
    "color": "#666666",
    "transitionProperty": "color,fontSize",
    "transitionDuration": 100
  },
  "tab-name-zh": {
    "fontSize": "36"
  },
  "tab-name-en": {
    "fontSize": "30"
  },
  "active-tab-name-zh": {
    "color": "#00B4FF",
    "fontSize": "42",
    "fontWeight": "bold"
  },
  "active-tab-name-en": {
    "color": "#00B4FF",
    "fontSize": "30",
    "fontWeight": "bold"
  }
}

/***/ }),

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(0);

var _ExampleScroller = __webpack_require__(1);

var _ExampleScroller2 = _interopRequireDefault(_ExampleScroller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import getExamples from '../../examples'
// const exampleMap = getExamples({ scope: 'mobile', filterTODO: true })
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var exampleMap = [];
var useStorage = false;
exports.default = {
  components: { ExampleScroller: _ExampleScroller2.default },
  data: function data() {
    return {
      navigationBarOptions: {
        title: {
          zh: '使用 Weex 的例子',
          en: 'Weex Examples'
        }
      },
      examples: exampleMap,
      showLoading: false,
      language: 'en',
      activeTab: 'component',
      activeGroup: 'div',
      dict: {
        READ_MORE: { en: 'read more', zh: '查看更多' }
      }
    };
  },
  beforeCreate: function beforeCreate() {
    var _this = this;

    // read examples from storage
    (0, _utils.readExamples)(function (examples) {
      _this.examples = examples;
      if (WXEnvironment.platform.toLowerCase() !== 'web') {
        useStorage = true;
      }
    });

    // update examples to storage
    (0, _utils.fetchExamples)(function (result) {
      (0, _utils.saveExamples)(result);
      if (!useStorage) {
        _this.examples = result.examples;
      }
    });

    setTimeout(function () {
      _this.showLoading = true;
    }, 400);
  },

  computed: {
    tabs: function tabs() {
      return this.examples.map(function (group) {
        return {
          type: group.type,
          name: group.name
        };
      });
    },
    currentTab: function currentTab() {
      var _this2 = this;

      return this.examples.filter(function (tab) {
        return tab.type === _this2.activeTab;
      })[0];
    }
  },
  methods: {
    toggleTab: function toggleTab(tabType) {
      this.activeTab = tabType;
      this.activeGroup = this.currentTab.group[0].type;
    }
  }
};

/***/ }),

/***/ 59:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wrapper"]
  }, [(_vm.examples && _vm.examples.length) ? _c('list', {
    staticClass: ["example-list"]
  }, [_vm._l((_vm.currentTab.group), function(exampleGroup) {
    return [(exampleGroup && exampleGroup.title || exampleGroup.name) ? _c('cell', {
      key: exampleGroup.type,
      ref: exampleGroup.type,
      refInFor: true,
      staticClass: ["group-info"],
      appendAsTree: true,
      attrs: {
        "append": "tree"
      }
    }, [_c('text', {
      staticClass: ["group-title"]
    }, [_vm._v(_vm._s(_vm.i18n(exampleGroup.title || exampleGroup.name)))]), (exampleGroup.desc) ? _c('text', {
      staticClass: ["group-desc"]
    }, [_vm._v(_vm._s(_vm.i18n(exampleGroup.desc)))]) : _vm._e(), (exampleGroup.desc && exampleGroup.docLink) ? _c('a', {
      staticClass: ["doc-link"],
      attrs: {
        "href": _vm.createURL(_vm.i18n(exampleGroup.docLink))
      }
    }, [_c('text', {
      staticClass: ["doc-link-text"]
    }, [_vm._v(_vm._s(_vm.i18n(_vm.dict.READ_MORE)) + " >>")])]) : _vm._e()]) : _vm._e(), _c('cell', {
      key: exampleGroup.type + '-examples',
      staticClass: ["section"],
      appendAsTree: true,
      attrs: {
        "append": "tree"
      }
    }, [_c('example-scroller', {
      attrs: {
        "language": _vm.language,
        "examples": exampleGroup.examples
      }
    })], 1)]
  })], 2) : (_vm.showLoading) ? _c('div', {
    staticClass: ["loading"]
  }, [_c('text', {
    staticClass: ["loading-text"]
  }, [_vm._v("loading ...")])]) : _vm._e(), (_vm.tabs && _vm.tabs.length) ? _c('div', {
    staticClass: ["tabbar"]
  }, _vm._l((_vm.tabs), function(tab) {
    return _c('div', {
      key: tab.type,
      class: ['tab-cell', tab.type === _vm.activeTab ? 'active-tab-cell' : ''],
      on: {
        "click": function($event) {
          _vm.toggleTab(tab.type)
        }
      }
    }, [_c('text', {
      class: [
        'tab-name',
        ("tab-name-" + _vm.language),
        tab.type === _vm.activeTab ? ("active-tab-name-" + _vm.language) : ''
      ]
    }, [_vm._v(_vm._s(_vm.i18n(tab.name)))])])
  })) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ })

/******/ });