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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ({

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _About = __webpack_require__(23);

var _About2 = _interopRequireDefault(_About);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_About2.default.el = '#root';
new Vue(_About2.default);

/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(24)
)

/* script */
__vue_exports__ = __webpack_require__(25)

/* template */
var __vue_template__ = __webpack_require__(26)
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
__vue_options__.__file = "/Users/jerrylau/WebstormProjects/awesome-app/src/pages/About.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-2c11fd19"
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

/***/ 24:
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

/***/ 25:
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

/***/ 26:
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

/***/ })

/******/ });