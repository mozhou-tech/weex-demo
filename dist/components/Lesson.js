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
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
/******/ })
/************************************************************************/
/******/ ({

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(16)
)

/* script */
__vue_exports__ = __webpack_require__(17)

/* template */
var __vue_template__ = __webpack_require__(18)
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
__vue_options__.__file = "/Users/jerrylau/WebstormProjects/weex-demo/src/components/Lesson.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-a9a41130"
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

/***/ 16:
/***/ (function(module, exports) {

module.exports = {
  "center": {
    "alignItems": "center",
    "justifyContent": "center"
  },
  "title": {
    "fontSize": "60",
    "textAlign": "center",
    "marginTop": "60",
    "marginBottom": "60",
    "color": "#606060"
  },
  "lesson": {
    "borderBottomWidth": "1",
    "borderBottomStyle": "solid",
    "borderBottomColor": "#EEEEEE",
    "flexDirection": "row",
    "alignItems": "center"
  },
  "lesson-zh": {
    "width": "600"
  },
  "lesson-en": {
    "width": "630"
  },
  "lesson-index": {
    "color": "#777777",
    "textAlign": "right",
    "paddingRight": "30"
  },
  "lesson-title": {
    "paddingTop": "35",
    "paddingBottom": "35"
  },
  "lesson-index-zh": {
    "fontSize": "46",
    "width": "120"
  },
  "lesson-title-zh": {
    "fontSize": "42",
    "width": "480"
  },
  "lesson-index-en": {
    "fontSize": "42",
    "width": "100"
  },
  "lesson-title-en": {
    "fontSize": "38",
    "width": "530"
  },
  "footer": {
    "height": "120",
    "paddingTop": "40"
  },
  "copyright": {
    "fontSize": "22",
    "color": "#A0A0A0",
    "textAlign": "center"
  }
}

/***/ }),

/***/ 17:
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

exports.default = {
  props: ['mainColor', 'title', 'copyright', 'lessons'],
  data: function data() {
    return {
      language: 'en'
    };
  }
};

/***/ }),

/***/ 18:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wrapper"]
  }, [_c('div', {
    staticClass: ["center"]
  }, [_c('text', {
    staticClass: ["title"]
  }, [_vm._v(_vm._s(_vm.i18n(_vm.title)))])]), _vm._l((_vm.lessons), function(lesson, i) {
    return _c('div', {
      key: i,
      staticClass: ["center"]
    }, [_c('a', {
      class: ['lesson', ("lesson-" + _vm.language)],
      attrs: {
        "href": _vm.createLink('webview', {
          url: _vm.i18n(lesson.docLink),
          title: _vm.i18n(lesson.title)
        })
      }
    }, [_c('text', {
      class: ['lesson-index', ("lesson-index-" + _vm.language)]
    }, [_vm._v(_vm._s(i + 1) + ".")]), _c('text', {
      class: ['lesson-title', ("lesson-title-" + _vm.language)],
      style: {
        color: _vm.mainColor
      }
    }, [_vm._v(_vm._s(_vm.i18n(lesson.title)))])])])
  }), _c('div', {
    staticClass: ["footer", "center"]
  }, [_c('text', {
    staticClass: ["copyright"]
  }, [_vm._v(_vm._s(_vm.i18n(_vm.copyright)))])])], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Lesson = __webpack_require__(15);

var _Lesson2 = _interopRequireDefault(_Lesson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Lesson2.default.el = '#root';
new Vue(_Lesson2.default);

/***/ })

/******/ });