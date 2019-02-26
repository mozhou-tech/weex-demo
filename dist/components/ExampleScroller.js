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
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
/******/ })
/************************************************************************/
/******/ ({

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

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ExampleScroller = __webpack_require__(1);

var _ExampleScroller2 = _interopRequireDefault(_ExampleScroller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_ExampleScroller2.default.el = '#root';
new Vue(_ExampleScroller2.default);

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

/***/ })

/******/ });