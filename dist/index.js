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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ({

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(11)
)

/* script */
__vue_exports__ = __webpack_require__(12)

/* template */
var __vue_template__ = __webpack_require__(13)
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
__vue_options__.__file = "/Users/jerrylau/WebstormProjects/awesome-app/src/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-2964abc9"
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

/***/ 11:
/***/ (function(module, exports) {

module.exports = {
  "wrapper": {
    "alignItems": "center",
    "justifyContent": "center"
  }
}

/***/ }),

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _functions = __webpack_require__(43);

//
//
//
//
//
//

var navigator = weex.requireModule('navigator');
exports.default = {
    created: function created() {
        navigator.push({ url: (0, _functions.getEntryUrl)("pages/Login"), animated: "true" });
    },

    methods: {}
};

/***/ }),

/***/ 13:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wrapper"]
  }, [_c('text', [_vm._v("loading...")])])
}]}
module.exports.render._withStripped = true

/***/ }),

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getBaseURL = getBaseURL;
exports.getEntryUrl = getEntryUrl;
exports.httpPost = httpPost;
exports.httpGet = httpGet;
var stream = weex.requireModule('stream') || {};
var modal = weex.requireModule('modal') || {};

function getBaseURL() {
    return "https://www.easy-mock.com/mock/5c75f1b3ce20c029e6dca80a";
}

function getEntryUrl(name) {
    var arr = weex.config.bundleUrl.split('/');
    arr.pop();
    arr.pop();
    arr.push('dist/' + name + '.js');
    console.log(arr.join('/'));

    // console.log(arr)
    // arr.push("dist/" + name + '.js');
    // 判断当前的环境，适配web端
    if (weex.config.env.platform === "Web") {
        return '/' + name + '.html';
    } else {
        var _arr = weex.config.bundleUrl.split('/');
        _arr.pop();
        _arr.pop();
        _arr.push('dist/' + name + '.js');
        modal.toast({
            message: _arr.join('/'),
            duration: 13
        });
        return _arr.join('/');
    }
}

function httpPost(path, body) {
    var done = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
    var fail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

    try {
        stream.fetch({
            url: getBaseURL() + path,
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            type: 'json',
            body: body
        }, function (res) {
            if (res.ok && res.data) {
                done(res.data);
            } else {
                fail(res);
            }
        });
    } catch (err) {
        console.error(err);
        fail(err);
    }
}

function httpGet(path, body) {
    var done = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
    var fail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

    try {
        stream.fetch({
            url: getBaseURL() + path,
            method: 'get',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            type: 'json',
            body: body
        }, function (res) {
            if (res.ok && res.data) {
                done(res.data);
            } else {
                fail(res);
            }
        });
    } catch (err) {
        console.error(err);
        fail(err);
    }
}

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(10);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_index2.default.el = '#root';
new Vue(_index2.default);

/***/ })

/******/ });