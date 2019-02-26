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
/******/ 	return __webpack_require__(__webpack_require__.s = 60);
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

/***/ 60:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _News = __webpack_require__(61);

var _News2 = _interopRequireDefault(_News);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_News2.default.el = '#root';
new Vue(_News2.default);

/***/ }),

/***/ 61:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(62)
)

/* script */
__vue_exports__ = __webpack_require__(63)

/* template */
var __vue_template__ = __webpack_require__(64)
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
__vue_options__.__file = "/Users/jerrylau/WebstormProjects/weex-demo/src/pages/news/News.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-18ea014a"
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

/***/ 62:
/***/ (function(module, exports) {

module.exports = {
  "list": {
    "backgroundColor": "#F1F1F1"
  },
  "refresh": {
    "width": "750",
    "alignItems": "center",
    "backgroundColor": "#808080"
  },
  "indicator-text": {
    "color": "#C5C5C5",
    "fontSize": "34",
    "paddingTop": "50",
    "paddingRight": "50",
    "paddingBottom": "50",
    "paddingLeft": "50",
    "textAlign": "center"
  },
  "cell": {
    "alignItems": "center"
  },
  "message-time": {
    "marginTop": "25",
    "justifyContent": "center"
  },
  "time-text": {
    "paddingTop": "5",
    "paddingBottom": "5",
    "paddingLeft": "18",
    "paddingRight": "18",
    "backgroundColor": "rgba(0,0,0,0.1)",
    "fontSize": "25",
    "borderRadius": "8",
    "color": "#FEFEFE"
  },
  "message-box": {
    "borderWidth": "1",
    "borderColor": "#DDDDDD",
    "borderRadius": "15",
    "backgroundColor": "#FFFFFF",
    "marginTop": "25",
    "marginBottom": "35",
    "backgroundColor:active": "#F8F8F8"
  },
  "related-article": {
    "borderTopWidth": "1",
    "borderTopColor": "#E6E6E6",
    "flexDirection": "row",
    "alignItems": "center",
    "paddingTop": "10",
    "paddingBottom": "15",
    "paddingLeft": "30",
    "paddingRight": "20",
    "backgroundColor": "#FEFEFE"
  },
  "poster": {
    "width": "680",
    "height": "340",
    "backgroundColor": "#D2D2D2"
  },
  "title": {
    "width": "680",
    "paddingTop": "30",
    "paddingRight": "30",
    "paddingBottom": "30",
    "paddingLeft": "30",
    "fontSize": "38",
    "color": "#323232"
  },
  "shortcut": {
    "width": "80",
    "height": "80"
  },
  "subtitle": {
    "width": "550",
    "paddingRight": "25",
    "fontSize": "34",
    "color": "#454545"
  },
  "summary": {
    "width": "680",
    "marginTop": "-20",
    "paddingLeft": "30",
    "paddingRight": "30",
    "paddingBottom": "30",
    "fontSize": "28",
    "color": "#929292",
    "lines": 3
  }
}

/***/ }),

/***/ 63:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(0);

var modal = weex.requireModule('modal'); //
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
  data: function data() {
    var dict = {
      REFRESH: { en: 'Release to refresh', zh: '释放刷新' },
      REFRESHING: { en: 'Fetching ...', zh: '正在加载……' },
      UPDATED: { en: 'Updated', zh: '已更新' },
      LOAD_MERE: { en: 'Load more', zh: '加载更多' },
      NO_MORE_NEWS: { en: 'No more news', zh: '到底了' }
    };
    return {
      language: 'en',
      navigationBarOptions: {
        // backgroundColor: '#5F5F5F',
        title: {
          zh: '资讯',
          en: 'News'
        }
      },
      dict: dict,
      refreshNote: dict.REFRESH,
      refreshing: false,
      visibleCount: 6,
      news: []
    };
  },

  computed: {
    visibleNews: function visibleNews() {
      return this.news.slice(0, this.visibleCount);
    }
  },
  beforeCreate: function beforeCreate() {
    var _this = this;

    (0, _utils.readNews)(function (news) {
      return _this.news = news;
    });
    (0, _utils.fetchNews)(function (res) {
      if (Array.isArray(res.news)) {
        (0, _utils.saveNews)(res);
        _this.news = res.news;
      }
    });
  },

  methods: {
    refresh: function refresh() {
      var _this2 = this;

      this.refreshing = true;
      this.refreshNote = this.dict.REFRESHING;
      var finish = function finish() {
        _this2.refreshing = false;
        setTimeout(function () {
          _this2.refreshNote = _this2.dict.REFRESH;
        }, 500);
      };
      (0, _utils.fetchNews)(function (res) {
        if (Array.isArray(res.news)) {
          if (_this2.news.length === res.news.length) {
            modal.toast({
              message: _this2.i18n(_this2.dict.UPDATED)
            });
          }
          _this2.news = res.news;
          finish();
        }
        setTimeout(function () {
          return finish();
        }, 5000);
      });
    },
    loadmore: function loadmore() {
      var step = 4;
      var currentCount = this.visibleCount;
      this.visibleCount = Math.min(currentCount + step, this.news.length);
      modal.toast({
        message: this.visibleCount > currentCount ? this.i18n(this.dict.LOAD_MERE) : this.i18n(this.dict.NO_MORE_NEWS)
      });
    }
  }
};

/***/ }),

/***/ 64:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('list', {
    staticClass: ["list"],
    attrs: {
      "loadmoreoffset": "10"
    },
    on: {
      "loadmore": _vm.loadmore
    }
  }, [_c('refresh', {
    staticClass: ["refresh"],
    attrs: {
      "display": _vm.refreshing ? 'show' : 'hide'
    },
    on: {
      "refresh": _vm.refresh
    }
  }, [_c('text', {
    staticClass: ["indicator-text"]
  }, [_vm._v(_vm._s(_vm.i18n(_vm.refreshNote)))])]), _vm._l((_vm.visibleNews), function(item, i) {
    return _c('cell', {
      key: i,
      staticClass: ["cell"],
      appendAsTree: true,
      attrs: {
        "append": "tree"
      }
    }, [(item.time) ? _c('div', {
      staticClass: ["message-time"]
    }, [_c('text', {
      staticClass: ["time-text"]
    }, [_vm._v(_vm._s(_vm.i18n(item.time)))])]) : _vm._e(), (item.type === 'article') ? _c('div', {
      staticClass: ["message-box"]
    }, [_c('a', {
      staticClass: ["article"],
      attrs: {
        "href": _vm.createURL(item.link)
      }
    }, [_c('image', {
      staticClass: ["poster"],
      attrs: {
        "resize": "cover",
        "src": item.poster
      }
    }), _c('text', {
      staticClass: ["title"]
    }, [_vm._v(_vm._s(item.title))]), (item.summary) ? _c('text', {
      staticClass: ["summary"],
      attrs: {
        "lines": 3
      }
    }, [_vm._v(_vm._s(item.summary))]) : _vm._e(), _c('div', {
      staticClass: ["related"]
    }, _vm._l((item.related), function(sub) {
      return _c('a', {
        key: sub.title,
        staticClass: ["related-article"],
        attrs: {
          "href": _vm.createURL(sub.link)
        }
      }, [_c('text', {
        staticClass: ["subtitle"]
      }, [_vm._v(_vm._s(sub.title))]), _c('image', {
        staticClass: ["shortcut"],
        attrs: {
          "resize": "cover",
          "src": sub.poster
        }
      })])
    }))])]) : _vm._e()])
  })], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ })

/******/ });