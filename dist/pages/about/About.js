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
/******/ 	return __webpack_require__(__webpack_require__.s = 35);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(6)
)

/* script */
__vue_exports__ = __webpack_require__(7)

/* template */
var __vue_template__ = __webpack_require__(8)
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
__vue_options__.__file = "/Users/jerrylau/WebstormProjects/weex-demo/src/components/AppInfoCard.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-1212dec2"
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
/* 6 */
/***/ (function(module, exports) {

module.exports = {
  "card": {
    "width": "650",
    "justifyContent": "center",
    "borderWidth": "1",
    "borderColor": "#DDDDDD",
    "borderRadius": "20",
    "paddingTop": "50",
    "paddingRight": "50",
    "paddingBottom": "50",
    "paddingLeft": "50",
    "marginTop": "50",
    "marginRight": "50",
    "marginBottom": "50",
    "marginLeft": "50",
    "backgroundColor": "#FFFFFF"
  },
  "title": {
    "fontSize": "34",
    "textAlign": "center",
    "color": "#808080",
    "marginBottom": "20"
  },
  "version": {
    "fontSize": "80",
    "textAlign": "center",
    "marginBottom": "30",
    "color": "#323232"
  },
  "group": {
    "marginTop": "10",
    "flexDirection": "row"
  },
  "label": {
    "width": "260",
    "fontSize": "32",
    "textAlign": "right",
    "color": "#888888"
  },
  "value": {
    "width": "230",
    "paddingLeft": "50",
    "fontSize": "32",
    "color": "#414141"
  }
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

var invalid = '- invalid -';
var unknown = '- - -';
exports.default = {
  data: function data() {
    return {
      version: invalid,
      jsfmVersion: invalid,
      platform: invalid,
      osVersion: invalid,
      deviceModel: invalid
    };
  },
  created: function created() {
    try {
      this.jsfmVersion = getJSFMVersion();
    } catch (e) {
      this.jsfmVersion = '≤ 0.15.6';
    }
    if ((typeof WXEnvironment === 'undefined' ? 'undefined' : _typeof(WXEnvironment)) === 'object') {
      this.version = WXEnvironment.weexVersion || unknown;
      this.platform = WXEnvironment.platform || unknown;
      this.osVersion = WXEnvironment.osVersion || unknown;
      this.deviceModel = WXEnvironment.deviceModel || unknown;
    }
  }
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["card"]
  }, [_c('div', {
    staticClass: ["info"]
  }, [_c('text', {
    staticClass: ["title"]
  }, [_vm._v("Weex SDK Version")]), _c('text', {
    staticClass: ["version"]
  }, [_vm._v(_vm._s(_vm.version))]), _c('div', {
    staticClass: ["group"]
  }, [_c('text', {
    staticClass: ["label"]
  }, [_vm._v("JS Framework")]), _c('text', {
    staticClass: ["value"]
  }, [_vm._v(_vm._s(_vm.jsfmVersion))])]), _c('div', {
    staticClass: ["group"]
  }, [_c('text', {
    staticClass: ["label"]
  }, [_vm._v("platform")]), _c('text', {
    staticClass: ["value"]
  }, [_vm._v(_vm._s(_vm.platform))])]), _c('div', {
    staticClass: ["group"]
  }, [_c('text', {
    staticClass: ["label"]
  }, [_vm._v("osVersion")]), _c('text', {
    staticClass: ["value"]
  }, [_vm._v(_vm._s(_vm.osVersion))])]), _c('div', {
    staticClass: ["group"]
  }, [_c('text', {
    staticClass: ["label"]
  }, [_vm._v("deviceModel")]), _c('text', {
    staticClass: ["value"]
  }, [_vm._v(_vm._s(_vm.deviceModel))])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aboutApp = exports.guideLessons = undefined;

var _sliders = __webpack_require__(20);

var _sliders2 = _interopRequireDefault(_sliders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var guideLessons = exports.guideLessons = _sliders2.default;

var aboutApp = exports.aboutApp = [{
  title: { en: 'Weex Official Website', zh: 'Weex 官方网站' },
  link: {
    en: 'http://weex-project.io/',
    zh: 'http://weex-project.io/cn/'
  }
}, {
  title: { en: 'Apache Software Foundation', zh: 'Apache 软件基金会' },
  link: 'http://www.apache.org/'
}, {
  title: { en: 'Who is using Weex', zh: '谁在使用 Weex' },
  link: {
    en: 'http://weex-project.io/who-is-using-weex.html',
    zh: 'http://weex-project.io/cn/who-is-using-weex.html'
  }
}, {
  title: { en: 'Contribution', zh: '参与贡献' },
  link: {
    en: 'http://weex-project.io/guide/contributing.html',
    zh: 'http://weex-project.io/cn/guide/contributing.html'
  }
}, {
  title: { en: 'Release Note', zh: '版本变更' },
  link: {
    en: 'http://weex-project.io/releasenote.html',
    zh: 'http://weex-project.io/cn/releasenote.html'
  }
}, {
  title: { en: 'FAQ', zh: '常见问题' },
  link: {
    en: 'http://weex-project.io/faq.html',
    zh: 'http://weex-project.io/cn/faq.html'
  }
}];

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ref, _ref2, _ref3;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = [{
  subject: 'weex',
  mainColor: '#00B4FF',
  title: { zh: '学习 Weex', en: 'Learn Weex' },
  poster: 'https://gw.alicdn.com/tfs/TB1.8Vdl9_I8KJjy0FoXXaFnVXa-3799-1615.png',
  posterBg: '#E5F7FF',
  posterStyle: {
    width: '650px',
    height: '304px'
  },
  copyright: {
    zh: '来自 http://weex-project.io/cn/',
    en: 'From http://weex-project.io/'
  },
  lessons: [{
    title: {
      zh: '快速入门',
      en: 'Getting Started'
    },
    docLink: {
      zh: 'http://weex-project.io/cn/guide/index.html',
      en: 'http://weex-project.io/guide/index.html'
    }
  }, {
    title: {
      zh: '工作原理',
      en: 'How it Works'
    },
    docLink: {
      zh: 'http://weex-project.io/cn/wiki/index.html',
      en: 'http://weex-project.io/wiki/index.html'
    }
  }, {
    title: {
      zh: 'Weex 中的前端框架',
      en: 'Front-end Frameworks'
    },
    docLink: {
      zh: 'http://weex-project.io/cn/guide/front-end-frameworks.html',
      en: 'http://weex-project.io/guide/front-end-frameworks.html'
    }
  }, {
    title: {
      zh: '在 Weex 中使用 Vue.js',
      en: 'Use Vue.js on Weex'
    },
    docLink: {
      zh: 'http://weex-project.io/cn/guide/use-vue.html',
      en: 'http://weex-project.io/guide/use-vue.html'
    }
  }, {
    title: {
      zh: '与 Web 平台的差异',
      en: 'Platform difference with Web'
    },
    docLink: {
      zh: 'http://weex-project.io/cn/wiki/platform-difference.html',
      en: 'http://weex-project.io/wiki/platform-difference.html'
    }
  }, {
    title: {
      zh: '集成 Weex 到已有应用',
      en: 'Integrate to Your App'
    },
    docLink: {
      zh: 'http://weex-project.io/cn/guide/integrate-to-your-app.html',
      en: 'http://weex-project.io/guide/integrate-to-your-app.html'
    }
  }, {
    title: {
      zh: '搭建开发环境',
      en: 'Set Up Dev Environment'
    },
    docLink: {
      zh: 'http://weex-project.io/cn/guide/set-up-env.html',
      en: 'http://weex-project.io/guide/set-up-env.html'
    }
  }, {
    title: {
      zh: '通用样式',
      en: 'Common Styles'
    },
    docLink: {
      zh: 'http://weex-project.io/cn/wiki/common-styles.html',
      en: 'http://weex-project.io/wiki/common-styles.html'
    }
  }, {
    title: {
      zh: '通用事件',
      en: 'Common Events'
    },
    docLink: {
      zh: 'http://weex-project.io/cn/wiki/common-events.html',
      en: 'http://weex-project.io/wiki/common-events.html'
    }
  }, {
    title: {
      zh: 'Weex 实例变量',
      en: 'The "weex" Variable'
    },
    docLink: {
      zh: 'http://weex-project.io/cn/references/weex-variable.html',
      en: 'http://weex-project.io/references/weex-variable.html'
    }
  }, {
    title: {
      zh: '内置组件',
      en: 'Built-in Components'
    },
    docLink: {
      zh: 'http://weex-project.io/cn/references/components/index.html',
      en: 'http://weex-project.io/references/components/index.html'
    }
  }, {
    title: {
      zh: '内置模块',
      en: 'Built-in Modules'
    },
    docLink: {
      zh: 'http://weex-project.io/cn/references/modules/index.html',
      en: 'http://weex-project.io/references/modules/index.html'
    }
  }, {
    title: {
      zh: '扩展 Android 组件/模块',
      en: 'Extend Android'
    },
    docLink: {
      zh: 'http://weex-project.io/cn/guide/extend-android.html',
      en: 'http://weex-project.io/guide/extend-android.html'
    }
  }, {
    title: {
      zh: '扩展 iOS 组件/模块',
      en: 'Extend iOS'
    },
    docLink: {
      zh: 'http://weex-project.io/cn/guide/extend-ios.html',
      en: 'http://weex-project.io/guide/extend-ios.html'
    }
  }, {
    title: {
      zh: '使用 weex-toolkit',
      en: 'Use weex-toolkit'
    },
    docLink: {
      zh: 'http://weex-project.io/cn/tools/toolkit.html',
      en: 'http://weex-project.io/tools/toolkit.html'
    }
  }, {
    title: {
      zh: '如何参与贡献',
      en: 'How to Contribute'
    },
    docLink: {
      zh: 'http://weex-project.io/cn/contributing.html',
      en: 'http://weex-project.io/contributing.html'
    }
  }]
}, (_ref = {
  subject: 'vue',
  mainColor: '#42b983',
  title: { zh: '学习 Vue.js', en: 'Learn Vue.js' },
  poster: 'https://gw.alicdn.com/tfs/TB1J_uKcMMPMeJjy1XdXXasrXXa-400-400.png',
  posterBg: '#E7FBF2',
  posterStyle: {
    width: '300px',
    height: '300px'
  }
}, _defineProperty(_ref, 'title', {
  zh: '学习 Vue.js',
  en: 'Learn Vue.js'
}), _defineProperty(_ref, 'copyright', {
  zh: '来自 https://cn.vuejs.org/',
  en: 'From https://vuejs.org/'
}), _defineProperty(_ref, 'lessons', [{
  title: {
    zh: 'Vue.js 是什么？',
    en: 'What is Vue.js ?'
  },
  docLink: {
    zh: 'https://cn.vuejs.org/v2/guide/index.html',
    en: 'https://vuejs.org/v2/guide/index.html'
  }
}, {
  title: {
    zh: '单文件组件',
    en: 'Single File Components'
  },
  docLink: {
    zh: 'https://cn.vuejs.org/v2/guide/single-file-components.html',
    en: 'https://vuejs.org/v2/guide/single-file-components.html'
  }
}, {
  title: {
    zh: '模板语法',
    en: 'Template Syntax'
  },
  docLink: {
    zh: 'https://cn.vuejs.org/v2/guide/syntax.html',
    en: 'https://vuejs.org/v2/guide/syntax.html'
  }
}, {
  title: {
    zh: 'Class 与 Style 绑定',
    en: 'Class and Style Bindings'
  },
  docLink: {
    zh: 'https://cn.vuejs.org/v2/guide/class-and-style.html',
    en: 'https://vuejs.org/v2/guide/class-and-style.html'
  }
}, {
  title: {
    zh: '条件渲染',
    en: 'Conditional Rendering'
  },
  docLink: {
    zh: 'https://cn.vuejs.org/v2/guide/conditional.html',
    en: 'https://vuejs.org/v2/guide/conditional.html'
  }
}, {
  title: {
    zh: '列表渲染',
    en: 'List Rendering'
  },
  docLink: {
    zh: 'https://cn.vuejs.org/v2/guide/list.html',
    en: 'https://vuejs.org/v2/guide/list.html'
  }
}, {
  title: {
    zh: '事件处理',
    en: 'Event Handling'
  },
  docLink: {
    zh: 'https://cn.vuejs.org/v2/guide/events.html',
    en: 'https://vuejs.org/v2/guide/events.html'
  }
}, {
  title: {
    zh: '表单输入绑定',
    en: 'Form Input Bindings'
  },
  docLink: {
    zh: 'https://cn.vuejs.org/v2/guide/forms.html',
    en: 'https://vuejs.org/v2/guide/forms.html'
  }
}, {
  title: {
    zh: 'Vue 实例',
    en: 'The Vue Instance'
  },
  docLink: {
    zh: 'https://cn.vuejs.org/v2/guide/instance.html',
    en: 'https://vuejs.org/v2/guide/instance.html'
  }
}, {
  title: {
    zh: '在 Weex 中使用 Vue.js',
    en: 'Use Vue.js on Weex'
  },
  docLink: {
    zh: 'http://weex-project.io/cn/guide/use-vue.html',
    en: 'http://weex-project.io/guide/use-vue.html'
  }
}, {
  title: {
    zh: '混合（mixins）',
    en: 'Mixins'
  },
  docLink: {
    zh: 'https://cn.vuejs.org/v2/guide/mixins.html',
    en: 'https://vuejs.org/v2/guide/mixins.html'
  }
}, {
  title: {
    zh: '过滤器（filters）',
    en: 'Filters'
  },
  docLink: {
    zh: 'https://cn.vuejs.org/v2/guide/filters.html',
    en: 'https://vuejs.org/v2/guide/filters.html'
  }
}, {
  title: {
    zh: '插件（plugins）',
    en: 'Plugins'
  },
  docLink: {
    zh: 'https://cn.vuejs.org/v2/guide/plugins.html',
    en: 'https://vuejs.org/v2/guide/plugins.html'
  }
}, {
  title: {
    zh: '自定义指令',
    en: 'Custom Directives'
  },
  docLink: {
    zh: 'https://cn.vuejs.org/v2/guide/custom-directive.html',
    en: 'https://vuejs.org/v2/guide/custom-directive.html'
  }
}, {
  title: {
    zh: '状态管理',
    en: 'State Management'
  },
  docLink: {
    zh: 'https://cn.vuejs.org/v2/guide/state-management.html',
    en: 'https://vuejs.org/v2/guide/state-management.html'
  }
}, {
  title: {
    zh: '深入响应式原理',
    en: 'Reactivity in Depth'
  },
  docLink: {
    zh: 'https://cn.vuejs.org/v2/guide/reactivity.html',
    en: 'https://vuejs.org/v2/guide/reactivity.html'
  }
}, {
  title: {
    zh: '渲染函数',
    en: 'Render Functions'
  },
  docLink: {
    zh: 'https://cn.vuejs.org/v2/guide/render-function.html',
    en: 'https://vuejs.org/v2/guide/render-function.html'
  }
}, {
  title: {
    zh: 'TypeScript 支持',
    en: 'TypeScript Support'
  },
  docLink: {
    zh: 'https://cn.vuejs.org/v2/guide/typescript.html',
    en: 'https://vuejs.org/v2/guide/typescript.html'
  }
}, {
  title: 'API',
  docLink: {
    zh: 'https://cn.vuejs.org/v2/api/',
    en: 'https://vuejs.org/v2/api/'
  }
}]), _ref), (_ref2 = {
  subject: 'javascript',
  mainColor: '#F7BD2A',
  title: { zh: '学习 Javascript', en: 'Learn Javascript' },
  poster: 'https://gw.alicdn.com/tfs/TB1bT98hMoQMeJjy0FpXXcTxpXa-1500-700.png',
  posterBg: '#FAF3EB',
  posterStyle: {
    width: '750px',
    height: '350px'
  }
}, _defineProperty(_ref2, 'title', {
  zh: '学习 Javascript',
  en: 'Learn Javascript'
}), _defineProperty(_ref2, 'copyright', {
  zh: '来自 MDN (Mozilla Developer Network)',
  en: 'From MDN (Mozilla Developer Network)'
}), _defineProperty(_ref2, 'lessons', [{
  title: {
    zh: '什么是 Javascript ？',
    en: 'What is Javascript ?'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/What_is_JavaScript',
    en: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript'
  }
}, {
  title: {
    zh: 'JavaScript基础',
    en: 'JavaScript basics'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Learn/Getting_started_with_the_web/JavaScript_basics',
    en: 'https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics'
  }
}, {
  title: {
    zh: '重新介绍 JavaScript',
    en: 'A re-introduction to JavaScript'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/A_re-introduction_to_JavaScript',
    en: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript'
  }
}, {
  title: {
    zh: '语法和数据类型',
    en: 'Grammar and types'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Grammar_and_types#Variable_scope',
    en: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Variable_scope'
  }
}, {
  title: {
    zh: '数据类型和数据结构',
    en: 'Data types and data structures'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures',
    en: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures'
  }
}, {
  title: {
    zh: '变量',
    en: 'Variables'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Variables',
    en: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Variables'
  }
}, {
  title: {
    zh: '数字和操作符',
    en: 'Numbers and operators'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Math',
    en: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Math'
  }
}, {
  title: {
    zh: '字符串',
    en: 'Handling text'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Strings',
    en: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Strings'
  }
}, {
  title: {
    zh: '常用的 String 方法',
    en: 'Useful string methods'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Useful_string_methods',
    en: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Useful_string_methods'
  }
}, {
  title: {
    zh: '数组',
    en: 'Arrays'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Arrays',
    en: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Arrays'
  }
}, {
  title: {
    zh: '函数',
    en: 'Functions'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Functions',
    en: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions'
  }
}, {
  title: {
    zh: 'JavaScript 对象基础',
    en: 'JavaScript object basics'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Basics',
    en: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics'
  }
}, {
  title: {
    zh: '使用对象',
    en: 'Working with objects'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Working_with_Objects',
    en: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects'
  }
}, {
  title: {
    zh: '使用 JSON 数据',
    en: 'Working with JSON'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/JSON',
    en: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON'
  }
}, {
  title: {
    zh: '对象模型的细节',
    en: 'Details of the object model'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Details_of_the_Object_Model',
    en: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Details_of_the_Object_Model'
  }
}, {
  title: {
    zh: '对象原型',
    en: 'Object prototypes'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes',
    en: 'https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Object_prototypes'
  }
}, {
  title: {
    zh: 'JavaScript 中的继承',
    en: 'Inheritance in JavaScript'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Inheritance',
    en: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance'
  }
}, {
  title: {
    zh: '继承与原型链',
    en: 'Inheritance and the prototype chain'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain',
    en: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain'
  }
}, {
  title: {
    zh: '严格模式',
    en: 'Strict mode'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode',
    en: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode'
  }
}, {
  title: {
    zh: '内存管理',
    en: 'Memory Management'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Memory_Management',
    en: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management'
  }
}, {
  title: {
    zh: '并发模型与事件循环',
    en: 'Concurrency model and Event Loop'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop',
    en: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop'
  }
}, {
  //   title: {
  //     zh: '索引集合类',
  //     en: 'Indexed collections'
  //   },
  //   docLink: {
  //     zh: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Indexed_collections',
  //     en: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections'
  //   }
  // }, {
  //   title: {
  //     zh: '带键的集合',
  //     en: 'Keyed collections'
  //   },
  //   docLink: {
  //     zh: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Keyed_collections',
  //     en: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Keyed_collections'
  //   }
  // }, {
  title: {
    zh: 'JavaScript 标准库',
    en: 'Standard built-in objects'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects',
    en: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects'
  }
}]), _ref2), (_ref3 = {
  subject: 'css',
  mainColor: '#F56FC6',
  title: { zh: '学习 CSS', en: 'Learn CSS' },
  titleColor: '#FFFFFF',
  poster: 'https://gw.alicdn.com/tfs/TB1k6anhMMPMeJjy1XdXXasrXXa-427-190.jpg',
  posterBg: '#FFA2DE',
  posterStyle: {
    width: '517px',
    height: '230px'
  }
}, _defineProperty(_ref3, 'title', {
  zh: '学习 CSS',
  en: 'Learn CSS'
}), _defineProperty(_ref3, 'copyright', {
  zh: '来自 MDN (Mozilla Developer Network)',
  en: 'From MDN (Mozilla Developer Network)'
}), _defineProperty(_ref3, 'lessons', [{
  title: {
    zh: '什么是 CSS ？',
    en: 'What is CSS ?'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Getting_started/What_is_CSS',
    en: 'https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_started/What_is_CSS'
  }
}, {
  title: {
    zh: 'CSS 语法',
    en: 'CSS Syntax'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Introduction_to_CSS/Syntax',
    en: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Syntax'
  }
}, {
  title: {
    zh: 'CSS的值和单位',
    en: 'CSS Values and Units'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Introduction_to_CSS/Values_and_units',
    en: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Values_and_units'
  }
}, {
  title: {
    zh: '盒模型',
    en: 'The Box Model'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Introduction_to_CSS/Box_model',
    en: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Box_model'
  }
}, {
  title: {
    zh: '盒模型的属性',
    en: 'Box Model Properties'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model',
    en: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model'
  }
}, {
  title: {
    zh: '定位布局',
    en: 'Positioning'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/%E5%AE%9A%E4%BD%8Dx',
    en: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/positioning'
  }
}, {
  title: {
    zh: '定位布局的属性',
    en: 'CSS Positioning'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Positioning',
    en: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning'
  }
}, {
  title: {
    zh: 'Flexbox 布局',
    en: 'Flexbox Layout'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Flexbox',
    en: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox'
  }
}, {
  title: {
    zh: 'Flexbox 布局的属性',
    en: 'CSS Flexible Box Layout'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout',
    en: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout'
  }
}, {
  title: {
    zh: 'Weex 中的通用样式',
    en: 'Common Styles in Weex'
  },
  docLink: {
    zh: 'http://weex-project.io/cn/references/common-style.html',
    en: 'http://weex-project.io/references/common-style.html'
  }
}, {
  title: {
    zh: 'Weex 中的文本样式',
    en: 'Text Styles in Weex'
  },
  docLink: {
    zh: 'http://weex-project.io/cn/references/text-style.html',
    en: 'http://weex-project.io/references/text-style.html'
  }
}, {
  title: {
    zh: '块格式化上下文(BFC)',
    en: 'Block Formatting Context'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context',
    en: 'https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context'
  }
}, {
  title: {
    zh: '视觉格式化模型',
    en: 'Visual Formatting Model'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Visual_formatting_model',
    en: 'https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Visual_formatting_model'
  }
}, {
  title: 'CSS Reference',
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference',
    en: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference'
  }
}]), _ref3)];

/***/ }),
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _About = __webpack_require__(36);

var _About2 = _interopRequireDefault(_About);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_About2.default.el = '#root';
new Vue(_About2.default);

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(37)
)

/* script */
__vue_exports__ = __webpack_require__(38)

/* template */
var __vue_template__ = __webpack_require__(39)
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
__vue_options__.__file = "/Users/jerrylau/WebstormProjects/weex-demo/src/pages/about/About.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-75501a17"
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
/* 37 */
/***/ (function(module, exports) {

module.exports = {
  "list": {
    "backgroundColor": "#F5F5F5"
  },
  "item": {
    "paddingTop": "30",
    "paddingBottom": "30",
    "paddingLeft": "60",
    "paddingRight": "40",
    "borderBottomWidth": "1",
    "borderBottomStyle": "solid",
    "borderBottomColor": "#E6E6E6",
    "backgroundColor": "#FFFFFF",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center"
  },
  "item-1": {
    "borderTopWidth": "1",
    "borderTopStyle": "solid",
    "borderTopColor": "#E6E6E6"
  },
  "item-title": {
    "fontSize": "42",
    "color": "#606060"
  },
  "item-value": {
    "fontSize": "36",
    "color": "#999999"
  },
  "arrow-icon": {
    "width": "22",
    "height": "36"
  },
  "copyright": {
    "marginTop": "50",
    "paddingBottom": "20"
  },
  "copyright-text": {
    "fontSize": "22",
    "color": "#A0A0A0",
    "textAlign": "center"
  }
}

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(0);

var utils = _interopRequireWildcard(_utils);

var _mock = __webpack_require__(19);

var _AppInfoCard = __webpack_require__(5);

var _AppInfoCard2 = _interopRequireDefault(_AppInfoCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var picker = weex.requireModule('picker'); //
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

var channel = new BroadcastChannel('language');
exports.default = {
  components: { AppInfoCard: _AppInfoCard2.default },
  data: function data() {
    return {
      language: 'en',
      followSystemLanguage: true,
      navigationBarOptions: {
        title: {
          zh: '关于 Weex',
          en: 'About Weex'
        }
      },
      dict: {
        FOLLOW_SYSTEM: { en: 'Follow System', zh: '跟随系统' },
        LANGUAGE: { en: 'Language', zh: '语言' }
      },
      aboutApp: _mock.aboutApp
    };
  },

  watch: {
    language: function language() {
      channel.postMessage({ language: this.language });
    }
  },
  computed: {
    languageName: function languageName() {
      if (this.followSystemLanguage) {
        return this.i18n(this.dict.FOLLOW_SYSTEM);
      }
      return this.i18n({ en: 'English', zh: '简体中文' });
    }
  },
  created: function created() {
    var _this = this;

    utils.readAbout(function (about) {
      _this.aboutApp = about;
    });
    utils.getStorageLanguage(function (lang) {
      return _this.followSystemLanguage = false;
    }, function () {
      return _this.followSystemLanguage = true;
    });
  },

  methods: {
    chooseLanguage: function chooseLanguage() {
      var _this2 = this;

      var options = ['', 'en', 'zh'];
      var index = this.followSystemLanguage ? 0 : options.indexOf(this.language);
      picker.pick({
        index: index,
        items: [this.i18n(this.dict.FOLLOW_SYSTEM), 'English', '中文']
      }, function (_ref) {
        var result = _ref.result,
            data = _ref.data;

        if (result === 'success') {
          var select = options[data];
          if (select) {
            _this2.followSystemLanguage = false;
            _this2.language = select;
            utils.setLanguage(select);
          } else {
            _this2.followSystemLanguage = true;
            utils.clearStorageLanguage();
            utils.getSystemLanguage(function (lang) {
              _this2.language = lang;
            }, function (error) {
              _this2.language = 'en';
            });
          }
        }
      });
    }
  }
};

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('list', {
    staticClass: ["list"]
  }, [_c('cell', {
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }, [_c('app-info-card')], 1), _vm._l((_vm.aboutApp), function(item, i) {
    return _c('cell', {
      key: i,
      class: ['item-cell', ("item-cell-" + (i+1))],
      appendAsTree: true,
      attrs: {
        "append": "tree"
      }
    }, [(item.link) ? _c('a', {
      class: ['item', ("item-" + (i+1))],
      attrs: {
        "href": _vm.createLink('webview', {
          language: _vm.language,
          url: _vm.i18n(item.link),
          title: _vm.i18n(item.title)
        })
      }
    }, [_c('text', {
      staticClass: ["item-title"]
    }, [_vm._v(_vm._s(_vm.i18n(item.title)))]), _c('image', {
      staticClass: ["arrow-icon"],
      attrs: {
        "src": "https://gw.alicdn.com/tfs/TB1iL2fkLDH8KJjy1XcXXcpdXXa-32-49.png"
      }
    })]) : _vm._e()])
  }), _c('cell', {
    staticClass: ["item-cell"],
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }, [_c('div', {
    staticClass: ["item"],
    on: {
      "click": _vm.chooseLanguage
    }
  }, [_c('text', {
    staticClass: ["item-title"]
  }, [_vm._v(_vm._s(_vm.i18n(_vm.dict.LANGUAGE)))]), _c('text', {
    staticClass: ["item-value"]
  }, [_vm._v(_vm._s(_vm.languageName))])])]), _vm._m(0)], 2)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('cell', {
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }, [_c('div', {
    staticClass: ["copyright"]
  }, [_c('text', {
    staticClass: ["copyright-text"]
  }, [_vm._v("Copyright(c) 2017 The Apache Software Foundation.")]), _c('text', {
    staticClass: ["copyright-text"]
  }, [_vm._v("Licensed under the Apache License, Version 2.0")])])])
}]}
module.exports.render._withStripped = true

/***/ })
/******/ ]);