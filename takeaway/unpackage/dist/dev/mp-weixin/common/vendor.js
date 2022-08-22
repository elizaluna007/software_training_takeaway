(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 3);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 4));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var realAtob;

var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;

if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");}

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;var result = '';var r1;var r2;var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 |
      (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));

      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) :
      r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) :
      String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

function sortObject(obj) {
  var sortObj = {};
  if (isPlainObject(obj)) {
    Object.keys(obj).sort().forEach(function (key) {
      sortObj[key] = obj[key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo|getSystemSetting|getAppAuthorizeSetting/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection', 'createPushMessage'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var LOCALE_ZH_HANS = 'zh-Hans';
var LOCALE_ZH_HANT = 'zh-Hant';
var LOCALE_EN = 'en';
var LOCALE_FR = 'fr';
var LOCALE_ES = 'es';

var messages = {};

var locale;

{
  locale = normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}

function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}

initI18nMessages();

var i18n = (0, _uniI18n.initVueI18n)(
locale,
{});

var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {var _this = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    } } };


var setLocale = i18n.setLocale;
var getLocale = i18n.getLocale;

function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale() });

  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {return watch(v);});
    } });

}

function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}

function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}

function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}

function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

function getLocale$1() {
  // 优先使用 $locale
  var app = getApp({
    allowDefault: true });

  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}

function setLocale$1(locale) {
  var app = getApp();
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {return fn({
        locale: locale });});

    return true;
  }
  return false;
}

var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}

if (typeof global !== 'undefined') {
  global.getLocale = getLocale$1;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale$1,
  setLocale: setLocale$1,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function useDeviceId(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.screenHeight - safeArea.bottom };

  }
}

function populateParameters(result) {var _result$brand =





  result.brand,brand = _result$brand === void 0 ? '' : _result$brand,_result$model = result.model,model = _result$model === void 0 ? '' : _result$model,_result$system = result.system,system = _result$system === void 0 ? '' : _result$system,_result$language = result.language,language = _result$language === void 0 ? '' : _result$language,theme = result.theme,version = result.version,platform = result.platform,fontSizeSetting = result.fontSizeSetting,SDKVersion = result.SDKVersion,pixelRatio = result.pixelRatio,deviceOrientation = result.deviceOrientation;
  // const isQuickApp = "mp-weixin".indexOf('quickapp-webview') !== -1

  // osName osVersion
  var osName = '';
  var osVersion = '';
  {
    osName = system.split(' ')[0] || '';
    osVersion = system.split(' ')[1] || '';
  }
  var hostVersion = version;

  // deviceType
  var deviceType = getGetDeviceType(result, model);

  // deviceModel
  var deviceBrand = getDeviceBrand(brand);

  // hostName
  var _hostName = getHostName(result);

  // deviceOrientation
  var _deviceOrientation = deviceOrientation; // 仅 微信 百度 支持

  // devicePixelRatio
  var _devicePixelRatio = pixelRatio;

  // SDKVersion
  var _SDKVersion = SDKVersion;

  // hostLanguage
  var hostLanguage = language.replace(/_/g, '-');

  // wx.getAccountInfoSync

  var parameters = {
    appId: "__UNI__1C25673",
    appName: "orange",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "3.5.3",
    uniRuntimeVersion: "3.5.3",
    uniPlatform: undefined || "mp-weixin",
    deviceBrand: deviceBrand,
    deviceModel: model,
    deviceType: deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion: osVersion,
    hostTheme: theme,
    hostVersion: hostVersion,
    hostLanguage: hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: undefined,
    osTheme: undefined,
    ua: undefined,
    hostPackageName: undefined,
    browserName: undefined,
    browserVersion: undefined };


  Object.assign(result, parameters);
}

function getGetDeviceType(result, model) {
  var deviceType = result.deviceType || 'phone';
  {
    var deviceTypeMaps = {
      ipad: 'pad',
      windows: 'pc',
      mac: 'pc' };

    var deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    var _model = model.toLocaleLowerCase();
    for (var index = 0; index < deviceTypeMapsKeys.length; index++) {
      var _m = deviceTypeMapsKeys[index];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}

function getDeviceBrand(brand) {
  var deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = brand.toLocaleLowerCase();
  }
  return deviceBrand;
}

function getAppLanguage(defaultLanguage) {
  return getLocale$1 ?
  getLocale$1() :
  defaultLanguage;
}

function getHostName(result) {
  var _platform = 'WeChat';
  var _hostName = result.hostName || _platform; // mp-jd
  {
    if (result.environment) {
      _hostName = result.environment;
    } else if (result.host && result.host.env) {
      _hostName = result.host.env;
    }
  }

  return _hostName;
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    useDeviceId(result);
    addSafeAreaInsets(result);
    populateParameters(result);
  } };


var showActionSheet = {
  args: function args(fromArgs) {
    if (typeof fromArgs === 'object') {
      fromArgs.alertText = fromArgs.title;
    }
  } };


var getAppBaseInfo = {
  returnValue: function returnValue(result) {var _result =
    result,version = _result.version,language = _result.language,SDKVersion = _result.SDKVersion,theme = _result.theme;

    var _hostName = getHostName(result);

    var hostLanguage = language.replace('_', '-');

    result = sortObject(Object.assign(result, {
      appId: "__UNI__1C25673",
      appName: "orange",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage),
      hostVersion: version,
      hostLanguage: hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme }));

  } };


var getDeviceInfo = {
  returnValue: function returnValue(result) {var _result2 =
    result,brand = _result2.brand,model = _result2.model;
    var deviceType = getGetDeviceType(result, model);
    var deviceBrand = getDeviceBrand(brand);
    useDeviceId(result);

    result = sortObject(Object.assign(result, {
      deviceType: deviceType,
      deviceBrand: deviceBrand,
      deviceModel: model }));

  } };


var getWindowInfo = {
  returnValue: function returnValue(result) {
    addSafeAreaInsets(result);

    result = sortObject(Object.assign(result, {
      windowTop: 0,
      windowBottom: 0 }));

  } };


var getAppAuthorizeSetting = {
  returnValue: function returnValue(result) {var
    locationReducedAccuracy = result.locationReducedAccuracy;

    result.locationAccuracy = 'unsupported';
    if (locationReducedAccuracy === true) {
      result.locationAccuracy = 'reduced';
    } else if (locationReducedAccuracy === false) {
      result.locationAccuracy = 'full';
    }
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  showActionSheet: showActionSheet,
  getAppBaseInfo: getAppBaseInfo,
  getDeviceInfo: getDeviceInfo,
  getWindowInfo: getWindowInfo,
  getAppAuthorizeSetting: getAppAuthorizeSetting };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


/**
                    * 框架内 try-catch
                    */
/**
                        * 开发者 try-catch
                        */
function tryCatch(fn) {
  return function () {
    try {
      return fn.apply(fn, arguments);
    } catch (e) {
      // TODO
      console.error(e);
    }
  };
}

function getApiCallbacks(params) {
  var apiCallbacks = {};
  for (var name in params) {
    var param = params[name];
    if (isFn(param)) {
      apiCallbacks[name] = tryCatch(param);
      delete params[name];
    }
  }
  return apiCallbacks;
}

var cid;
var cidErrMsg;
var enabled;

function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e) {}
  return message;
}

function invokePushCallback(
args)
{
  if (args.type === 'enabled') {
    enabled = true;
  } else if (args.type === 'clientId') {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === 'pushMsg') {
    var message = {
      type: 'receive',
      data: normalizePushMessage(args.message) };

    for (var i = 0; i < onPushMessageCallbacks.length; i++) {
      var callback = onPushMessageCallbacks[i];
      callback(message);
      // 该消息已被阻止
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === 'click') {
    onPushMessageCallbacks.forEach(function (callback) {
      callback({
        type: 'click',
        data: normalizePushMessage(args.message) });

    });
  }
}

var getPushCidCallbacks = [];

function invokeGetPushCidCallbacks(cid, errMsg) {
  getPushCidCallbacks.forEach(function (callback) {
    callback(cid, errMsg);
  });
  getPushCidCallbacks.length = 0;
}

function getPushClientId(args) {
  if (!isPlainObject(args)) {
    args = {};
  }var _getApiCallbacks =




  getApiCallbacks(args),success = _getApiCallbacks.success,fail = _getApiCallbacks.fail,complete = _getApiCallbacks.complete;
  var hasSuccess = isFn(success);
  var hasFail = isFn(fail);
  var hasComplete = isFn(complete);
  Promise.resolve().then(function () {
    if (typeof enabled === 'undefined') {
      enabled = false;
      cid = '';
      cidErrMsg = 'unipush is not enabled';
    }
    getPushCidCallbacks.push(function (cid, errMsg) {
      var res;
      if (cid) {
        res = {
          errMsg: 'getPushClientId:ok',
          cid: cid };

        hasSuccess && success(res);
      } else {
        res = {
          errMsg: 'getPushClientId:fail' + (errMsg ? ' ' + errMsg : '') };

        hasFail && fail(res);
      }
      hasComplete && complete(res);
    });
    if (typeof cid !== 'undefined') {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
}

var onPushMessageCallbacks = [];
// 不使用 defineOnApi 实现，是因为 defineOnApi 依赖 UniServiceJSBridge ，该对象目前在小程序上未提供，故简单实现
var onPushMessage = function onPushMessage(fn) {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};

var offPushMessage = function offPushMessage(fn) {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    var index = onPushMessageCallbacks.indexOf(fn);
    if (index > -1) {
      onPushMessageCallbacks.splice(index, 1);
    }
  }
};

var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getPushClientId: getPushClientId,
  onPushMessage: onPushMessage,
  offPushMessage: offPushMessage,
  invokePushCallback: invokePushCallback });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}

function initHook(name, options, isComponent) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"orange","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';var options = arguments.length > 3 ? arguments[3] : undefined;
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    {
      if (options.virtualHost) {
        properties.virtualHostStyle = {
          type: null,
          value: '' };

        properties.virtualHostClass = {
          type: null,
          value: '' };

      }
    }
    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this2.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            var _type = _this2.$vm.mpType === 'page' ? 'Page' : 'Component';
            var path = _this2.route || _this2.is;
            throw new Error("".concat(_type, " \"").concat(path, "\" does not have a method \"").concat(methodName, "\""));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this2.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initAppLocale(_vue.default, vm, normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN);

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file, options),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 101:
/*!***********************************************************************************************!*\
  !*** C:/Users/lenovo/Desktop/software_training_takeaway/takeaway/pages/my/provinceAndCity.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var data = [

{
  "name": "北京",
  "city": [{
    "name": "北京",
    "area": ["东城区", "西城区", "崇文区", "宣武区", "朝阳区", "丰台区", "石景山区", "海淀区", "门头沟区", "房山区", "通州区", "顺义区",
    "昌平区", "大兴区",
    "平谷区",
    "怀柔区", "密云县", "延庆县"] }] },




{
  "name": "天津",
  "city": [{
    "name": "天津",
    "area": ["和平区", "河东区", "河西区", "南开区", "河北区", "红桥区", "塘沽区", "汉沽区", "大港区", "东丽区", "西青区", "津南区",
    "北辰区", "武清区", "宝坻区",
    "宁河县", "静海县", "蓟  县"] }] },




{
  "name": "河北",
  "city": [

  {
    "name": "石家庄",
    "area": ["长安区", "桥东区", "桥西区", "新华区", "郊  区", "井陉矿区", "井陉县", "正定县", "栾城县", "行唐县", "灵寿县", "高邑县",
    "深泽县", "赞皇县",
    "无极县",
    "平山县", "元氏县", "赵  县", "辛集市", "藁城区", "晋州市", "新乐市", "鹿泉市"] },



  {
    "name": "唐山",
    "area": ["路南区", "路北区", "古冶区", "开平区", "新  区", "丰润县", "滦  县", "滦南县", "乐亭县", "迁西县", "玉田县", "唐海县",
    "遵化市", "丰南市",
    "迁安市"] },



  {
    "name": "秦皇岛",
    "area": ["海港区", "山海关区", "北戴河区", "青龙满族自治县", "昌黎县", "抚宁县", "卢龙县"] },


  {
    "name": "邯郸",
    "area": ["邯山区", "丛台区", "复兴区", "峰峰矿区", "邯郸县", "临漳县", "成安县", "大名县", "涉  县", "磁  县", "肥乡县", "永年县",
    "邱  县", "鸡泽县",
    "广平县", "馆陶县", "魏  县", "曲周县", "武安市"] },



  {
    "name": "邢台",
    "area": ["桥东区", "桥西区", "邢台县", "临城县", "内丘县", "柏乡县", "隆尧县", "任  县", "南和县", "宁晋县", "巨鹿县", "新河县",
    "广宗县", "平乡县",
    "威  县",
    "清河县", "临西县", "南宫市", "沙河市"] },



  {
    "name": "保定",
    "area": ["新市区", "北市区", "南市区", "满城县", "清苑县", "涞水县", "阜平县", "徐水县", "定兴县", "唐  县", "高阳县", "容城县",
    "涞源县", "望都县", "安新县",
    "易  县", "曲阳县", "蠡  县", "顺平县", "博野", "雄县", "涿州市", "定州市", "安国市", "高碑店市"] },



  {
    "name": "张家口",
    "area": ["桥东区", "桥西区", "宣化区", "下花园区", "宣化县", "张北县", "康保县", "沽源县", "尚义县", "蔚  县", "阳原县", "怀安县",
    "万全县", "怀来县",
    "涿鹿县",
    "赤城县", "崇礼县"] },



  {
    "name": "承德",
    "area": ["双桥区", "双滦区", "鹰手营子矿区", "承德县", "兴隆县", "平泉县", "滦平县", "隆化县", "丰宁满族自治县", "宽城满族自治县",
    "围场满族蒙古族自治县"] },



  {
    "name": "沧州",
    "area": ["新华区", "运河区", "沧  县", "青  县", "东光县", "海兴县", "盐山县", "肃宁县", "南皮县", "吴桥县", "献  县",
    "孟村回族自治县", "泊头市", "任丘市",
    "黄骅市", "河间市"] },



  {
    "name": "廊坊",
    "area": ["安次区", "固安县", "永清县", "香河县", "大城县", "文安县", "大厂回族自治县", "霸州市", "三河市"] },


  {
    "name": "衡水",
    "area": ["桃城区", "枣强县", "武邑县", "武强县", "饶阳县", "安平县", "故城县", "景  县", "阜城县", "冀州市", "深州市"] }] },





{
  "name": "山西",
  "city": [

  {
    "name": "太原",
    "area": ["小店区", "迎泽区", "杏花岭区", "尖草坪区", "万柏林区", "晋源区", "清徐县", "阳曲县", "娄烦县", "古交市"] },


  {
    "name": "大同",
    "area": ["城  区", "矿  区", "南郊区", "新荣区", "阳高县", "天镇县", "广灵县", "灵丘县", "浑源县", "左云县", "大同县"] },


  {
    "name": "阳泉",
    "area": ["城  区", "矿  区", "郊  区", "平定县", "盂  县"] },


  {
    "name": "长治",
    "area": ["城  区", "郊  区", "长治县", "襄垣县", "屯留县", "平顺县", "黎城县", "壶关县", "长子县", "武乡县", "沁  县", "沁源县",
    "潞城市"] },



  {
    "name": "晋城",
    "area": ["城  区", "沁水县", "阳城县", "陵川县", "泽州县", "高平市"] },


  {
    "name": "朔州",
    "area": ["朔城区", "平鲁区", "山阴县", "应  县", "右玉县", "怀仁县"] },


  {
    "name": "忻州",
    "area": ["忻府区", "原平市", "定襄县", "五台县", "代  县", "繁峙县", "宁武县", "静乐县", "神池县", "五寨县", "岢岚县", "河曲县",
    "保德县", "偏关县"] },



  {
    "name": "吕梁",
    "area": ["离石区", "孝义市", "汾阳市", "文水县", "交城县", "兴  县", "临  县", "柳林县", "石楼县", "岚  县", "方山县", "中阳县",
    "交口县"] },



  {
    "name": "晋中",
    "area": ["榆次市", "介休市", "榆社县", "左权县", "和顺县", "昔阳县", "寿阳县", "太谷县", "祁  县", "平遥县", "灵石县"] },


  {
    "name": "临汾",
    "area": ["临汾市", "侯马市", "霍州市", "曲沃县", "翼城县", "襄汾县", "洪洞县", "古  县", "安泽县", "浮山县", "吉  县", "乡宁县",
    "蒲  县", "大宁县",
    "永和县", "隰  县", "汾西县"] },



  {
    "name": "运城",
    "area": ["运城市", "永济市", "河津市", "芮城县", "临猗县", "万荣县", "新绛县", "稷山县", "闻喜县", "夏  县", "绛  县", "平陆县",
    "垣曲县"] }] },






{
  "name": "内蒙古",
  "city": [

  {
    "name": "呼和浩特",
    "area": ["新城区", "回民区", "玉泉区", "郊  区", "土默特左旗", "托克托县", "和林格尔县", "清水河县", "武川县"] },


  {
    "name": "包头",
    "area": ["东河区", "昆都伦区", "青山区", "石拐矿区", "白云矿区", "郊  区", "土默特右旗", "固阳县", "达尔罕茂明安联合旗"] },


  {
    "name": "乌海",
    "area": ["海勃湾区", "海南区", "乌达区"] },


  {
    "name": "赤峰",
    "area": ["红山区", "元宝山区", "松山区", "阿鲁科尔沁旗", "巴林左旗", "巴林右旗", "林西县", "克什克腾旗", "翁牛特旗", "喀喇沁旗", "宁城县",
    "敖汉旗"] },



  {
    "name": "呼伦贝尔",
    "area": ["海拉尔市", "满洲里市", "扎兰屯市", "牙克石市", "根河市", "额尔古纳市", "阿荣旗", "莫力达瓦达斡尔族自治旗", "鄂伦春自治旗",
    "鄂温克族自治旗", "新巴尔虎右旗",
    "新巴尔虎左旗", "陈巴尔虎旗"] },



  {
    "name": "兴安盟",
    "area": ["乌兰浩特市", "阿尔山市", "科尔沁右翼前旗", "科尔沁右翼中旗", "扎赉特旗", "突泉县"] },


  {
    "name": "通辽",
    "area": ["科尔沁区", "霍林郭勒市", "科尔沁左翼中旗", "科尔沁左翼后旗", "开鲁县", "库伦旗", "奈曼旗", "扎鲁特旗"] },


  {
    "name": "锡林郭勒盟",
    "area": ["二连浩特市", "锡林浩特市", "阿巴嘎旗", "苏尼特左旗", "苏尼特右旗", "东乌珠穆沁旗", "西乌珠穆沁旗", "太仆寺旗", "镶黄旗", "正镶白旗",
    "正蓝旗", "多伦县"] },



  {
    "name": "乌兰察布盟",
    "area": ["集宁市", "丰镇市", "卓资县", "化德县", "商都县", "兴和县", "凉城县", "察哈尔右翼前旗", "察哈尔右翼中旗", "察哈尔右翼后旗",
    "四子王旗"] },



  {
    "name": "伊克昭盟",
    "area": ["东胜市", "达拉特旗", "准格尔旗", "鄂托克前旗", "鄂托克旗", "杭锦旗", "乌审旗", "伊金霍洛旗"] },


  {
    "name": "巴彦淖尔盟",
    "area": ["临河市", "五原县", "磴口县", "乌拉特前旗", "乌拉特中旗", "乌拉特后旗", "杭锦后旗"] },


  {
    "name": "阿拉善盟",
    "area": ["阿拉善左旗", "阿拉善右旗", "额济纳旗"] }] },





{
  "name": "辽宁",
  "city": [

  {
    "name": "沈阳",
    "area": ["沈河区", "皇姑区", "和平区", "大东区", "铁西区", "苏家屯区", "东陵区", "于洪区", "新民市", "法库县", "辽中县", "康平县",
    "新城子区", "其他"] },



  {
    "name": "大连",
    "area": ["西岗区", "中山区", "沙河口区", "甘井子区", "旅顺口区", "金州区", "瓦房店市", "普兰店市", "庄河市", "长海县", "其他"] },


  {
    "name": "鞍山",
    "area": ["铁东区", "铁西区", "立山区", "千山区", "海城市", "台安县", "岫岩满族自治县", "其他"] },


  {
    "name": "抚顺",
    "area": ["顺城区", "新抚区", "东洲区", "望花区", "抚顺县", "清原满族自治县", "新宾满族自治县", "其他"] },


  {
    "name": "本溪",
    "area": ["平山区", "明山区", "溪湖区", "南芬区", "本溪满族自治县", "桓仁满族自治县", "其他"] },


  {
    "name": "丹东",
    "area": ["振兴区", "元宝区", "振安区", "东港市", "凤城市", "宽甸满族自治县", "其他"] },


  {
    "name": "锦州",
    "area": ["太和区", "古塔区", "凌河区", "凌海市", "黑山县", "义县", "北宁市", "其他"] },


  {
    "name": "营口",
    "area": ["站前区", "西市区", "鲅鱼圈区", "老边区", "大石桥市", "盖州市", "其他"] },


  {
    "name": "阜新",
    "area": ["海州区", "新邱区", "太平区", "清河门区", "细河区", "彰武县", "阜新蒙古族自治县", "其他"] },


  {
    "name": "辽阳",
    "area": ["白塔区", "文圣区", "宏伟区", "太子河区", "弓长岭区", "灯塔市", "辽阳县", "其他"] },


  {
    "name": "盘锦",
    "area": ["双台子区", "兴隆台区", "盘山县", "大洼县", "其他"] },


  {
    "name": "铁岭",
    "area": ["银州区", "清河区", "调兵山市", "开原市", "铁岭县", "昌图县", "西丰县", "其他"] },


  {
    "name": "朝阳",
    "area": ["双塔区", "龙城区", "凌源市", "北票市", "朝阳县", "建平县", "喀喇沁左翼蒙古族自治县", "其他"] },


  {
    "name": "葫芦岛",
    "area": ["龙港区", "南票区", "连山区", "兴城市", "绥中县", "建昌县", "其他"] },


  {
    "name": "其他",
    "area": ["其他"] }] },





{
  "name": "吉林",
  "city": [

  {
    "name": "长春",
    "area": ["朝阳区", "宽城区", "二道区", "南关区", "绿园区", "双阳区", "九台市", "榆树市", "德惠市", "农安县", "其他"] },


  {
    "name": "吉林",
    "area": ["船营区", "昌邑区", "龙潭区", "丰满区", "舒兰市", "桦甸市", "蛟河市", "磐石市", "永吉县", "其他"] },


  {
    "name": "四平",
    "area": ["铁西区", "铁东区", "公主岭市", "双辽市", "梨树县", "伊通满族自治县", "其他"] },


  {
    "name": "辽源",
    "area": ["龙山区", "西安区", "东辽县", "东丰县", "其他"] },


  {
    "name": "通化",
    "area": ["东昌区", "二道江区", "梅河口市", "集安市", "通化县", "辉南县", "柳河县", "其他"] },


  {
    "name": "白山",
    "area": ["八道江区", "江源区", "临江市", "靖宇县", "抚松县", "长白朝鲜族自治县", "其他"] },


  {
    "name": "松原",
    "area": ["宁江区", "乾安县", "长岭县", "扶余县", "前郭尔罗斯蒙古族自治县", "其他"] },


  {
    "name": "白城",
    "area": ["洮北区", "大安市", "洮南市", "镇赉县", "通榆县", "其他"] },


  {
    "name": "延边朝鲜族自治州",
    "area": ["延吉市", "图们市", "敦化市", "龙井市", "珲春市", "和龙市", "安图县", "汪清县", "其他"] },


  {
    "name": "其他",
    "area": ["其他"] }] },





{
  "name": "黑龙江",
  "city": [

  {
    "name": "哈尔滨",
    "area": ["松北区", "道里区", "南岗区", "平房区", "香坊区", "道外区", "呼兰区", "阿城区", "双城市", "尚志市", "五常市", "宾县",
    "方正县", "通河县", "巴彦县",
    "延寿县", "木兰县", "依兰县", "其他"] },



  {
    "name": "齐齐哈尔",
    "area": ["龙沙区", "昂昂溪区", "铁锋区", "建华区", "富拉尔基区", "碾子山区", "梅里斯达斡尔族区", "讷河市", "富裕县", "拜泉县", "甘南县",
    "依安县", "克山县",
    "泰来县",
    "克东县", "龙江县", "其他"] },



  {
    "name": "鹤岗",
    "area": ["兴山区", "工农区", "南山区", "兴安区", "向阳区", "东山区", "萝北县", "绥滨县", "其他"] },


  {
    "name": "双鸭山",
    "area": ["尖山区", "岭东区", "四方台区", "宝山区", "集贤县", "宝清县", "友谊县", "饶河县", "其他"] },


  {
    "name": "鸡西",
    "area": ["鸡冠区", "恒山区", "城子河区", "滴道区", "梨树区", "麻山区", "密山市", "虎林市", "鸡东县", "其他"] },


  {
    "name": "大庆",
    "area": ["萨尔图区", "红岗区", "龙凤区", "让胡路区", "大同区", "林甸县", "肇州县", "肇源县", "杜尔伯特蒙古族自治县", "其他"] },


  {
    "name": "伊春",
    "area": ["伊春区", "带岭区", "南岔区", "金山屯区", "西林区", "美溪区", "乌马河区", "翠峦区", "友好区", "上甘岭区", "五营区", "红星区",
    "新青区", "汤旺河区",
    "乌伊岭区", "铁力市", "嘉荫县", "其他"] },



  {
    "name": "牡丹江",
    "area": ["爱民区", "东安区", "阳明区", "西安区", "绥芬河市", "宁安市", "海林市", "穆棱市", "林口县", "东宁县", "其他"] },


  {
    "name": "佳木斯",
    "area": ["向阳区", "前进区", "东风区", "郊区", "同江市", "富锦市", "桦川县", "抚远县", "桦南县", "汤原县", "其他"] },


  {
    "name": "七台河",
    "area": ["桃山区", "新兴区", "茄子河区", "勃利县", "其他"] },


  {
    "name": "黑河",
    "area": ["爱辉区", "北安市", "五大连池市", "逊克县", "嫩江县", "孙吴县", "其他"] },


  {
    "name": "绥化",
    "area": ["北林区", "安达市", "肇东市", "海伦市", "绥棱县", "兰西县", "明水县", "青冈县", "庆安县", "望奎县", "其他"] },


  {
    "name": "大兴安岭地区",
    "area": ["呼玛县", "塔河县", "漠河县", "大兴安岭辖区", "其他"] },


  {
    "name": "其他",
    "area": ["其他"] }] },





{
  "name": "上海",
  "city": [

  {
    "name": "上海",
    "area": ["黄浦区", "卢湾区", "徐汇区", "长宁区", "静安区", "普陀区", "闸北区", "虹口区", "杨浦区", "宝山区", "闵行区", "嘉定区",
    "松江区", "金山区", "青浦区",
    "南汇区", "奉贤区", "浦东新区", "崇明县", "其他"] }] },






{
  "name": "江苏",
  "city": [

  {
    "name": "南京",
    "area": ["玄武区", "白下区", "秦淮区", "建邺区", "鼓楼区", "下关区", "栖霞区", "雨花台区", "浦口区", "江宁区", "六合区", "溧水县",
    "高淳县", "其他"] },



  {
    "name": "苏州",
    "area": ["金阊区", "平江区", "沧浪区", "虎丘区", "吴中区", "相城区", "常熟市", "张家港市", "昆山市", "吴江市", "太仓市", "其他"] },


  {
    "name": "无锡",
    "area": ["崇安区", "南长区", "北塘区", "滨湖区", "锡山区", "惠山区", "江阴市", "宜兴市", "其他"] },


  {
    "name": "常州",
    "area": ["钟楼区", "天宁区", "戚墅堰区", "新北区", "武进区", "金坛市", "溧阳市", "其他"] },


  {
    "name": "镇江",
    "area": ["京口区", "润州区", "丹徒区", "丹阳市", "扬中市", "句容市", "其他"] },


  {
    "name": "南通",
    "area": ["崇川区", "港闸区", "通州市", "如皋市", "海门市", "启东市", "海安县", "如东县", "其他"] },


  {
    "name": "泰州",
    "area": ["海陵区", "高港区", "姜堰市", "泰兴市", "靖江市", "兴化市", "其他"] },


  {
    "name": "扬州",
    "area": ["广陵区", "维扬区", "邗江区", "江都市", "仪征市", "高邮市", "宝应县", "其他"] },


  {
    "name": "盐城",
    "area": ["亭湖区", "盐都区", "大丰市", "东台市", "建湖县", "射阳县", "阜宁县", "滨海县", "响水县", "其他"] },


  {
    "name": "连云港",
    "area": ["新浦区", "海州区", "连云区", "东海县", "灌云县", "赣榆县", "灌南县", "其他"] },


  {
    "name": "徐州",
    "area": ["云龙区", "鼓楼区", "九里区", "泉山区", "贾汪区", "邳州市", "新沂市", "铜山县", "睢宁县", "沛县", "丰县", "其他"] },


  {
    "name": "淮安",
    "area": ["清河区", "清浦区", "楚州区", "淮阴区", "涟水县", "洪泽县", "金湖县", "盱眙县", "其他"] },


  {
    "name": "宿迁",
    "area": ["宿城区", "宿豫区", "沭阳县", "泗阳县", "泗洪县", "其他"] },


  {
    "name": "其他",
    "area": ["其他"] }] },





{
  "name": "浙江",
  "city": [

  {
    "name": "杭州",
    "area": ["拱墅区", "西湖区", "上城区", "下城区", "江干区", "滨江区", "余杭区", "萧山区", "建德市", "富阳市", "临安市", "桐庐县",
    "淳安县", "其他"] },



  {
    "name": "宁波",
    "area": ["海曙区", "江东区", "江北区", "镇海区", "北仑区", "鄞州区", "余姚市", "慈溪市", "奉化市", "宁海县", "象山县", "其他"] },


  {
    "name": "温州",
    "area": ["鹿城区", "龙湾区", "瓯海区", "瑞安市", "乐清市", "永嘉县", "洞头县", "平阳县", "苍南县", "文成县", "泰顺县", "其他"] },


  {
    "name": "嘉兴",
    "area": ["秀城区", "秀洲区", "海宁市", "平湖市", "桐乡市", "嘉善县", "海盐县", "其他"] },


  {
    "name": "湖州",
    "area": ["吴兴区", "南浔区", "长兴县", "德清县", "安吉县", "其他"] },


  {
    "name": "绍兴",
    "area": ["越城区", "诸暨市", "上虞市", "嵊州市", "绍兴县", "新昌县", "其他"] },


  {
    "name": "金华",
    "area": ["婺城区", "金东区", "兰溪市", "义乌市", "东阳市", "永康市", "武义县", "浦江县", "磐安县", "其他"] },


  {
    "name": "衢州",
    "area": ["柯城区", "衢江区", "江山市", "龙游县", "常山县", "开化县", "其他"] },


  {
    "name": "舟山",
    "area": ["定海区", "普陀区", "岱山县", "嵊泗县", "其他"] },


  {
    "name": "台州",
    "area": ["椒江区", "黄岩区", "路桥区", "临海市", "温岭市", "玉环县", "天台县", "仙居县", "三门县", "其他"] },


  {
    "name": "丽水",
    "area": ["莲都区", "龙泉市", "缙云县", "青田县", "云和县", "遂昌县", "松阳县", "庆元县", "景宁畲族自治县", "其他"] },


  {
    "name": "其他",
    "area": ["其他"] }] },





{
  "name": "安徽",
  "city": [

  {
    "name": "合肥",
    "area": ["庐阳区", "瑶海区", "蜀山区", "包河区", "长丰县", "肥东县", "肥西县", "其他"] },


  {
    "name": "芜湖",
    "area": ["镜湖区", "弋江区", "鸠江区", "三山区", "芜湖县", "南陵县", "繁昌县", "其他"] },


  {
    "name": "蚌埠",
    "area": ["蚌山区", "龙子湖区", "禹会区", "淮上区", "怀远县", "固镇县", "五河县", "其他"] },


  {
    "name": "淮南",
    "area": ["田家庵区", "大通区", "谢家集区", "八公山区", "潘集区", "凤台县", "其他"] },


  {
    "name": "马鞍山",
    "area": ["雨山区", "花山区", "金家庄区", "当涂县", "其他"] },


  {
    "name": "淮北",
    "area": ["相山区", "杜集区", "烈山区", "濉溪县", "其他"] },


  {
    "name": "铜陵",
    "area": ["铜官山区", "狮子山区", "郊区", "铜陵县", "其他"] },


  {
    "name": "安庆",
    "area": ["迎江区", "大观区", "宜秀区", "桐城市", "宿松县", "枞阳县", "太湖县", "怀宁县", "岳西县", "望江县", "潜山县", "其他"] },


  {
    "name": "黄山",
    "area": ["屯溪区", "黄山区", "徽州区", "休宁县", "歙县", "祁门县", "黟县", "其他"] },


  {
    "name": "滁州",
    "area": ["琅琊区", "南谯区", "天长市", "明光市", "全椒县", "来安县", "定远县", "凤阳县", "其他"] },


  {
    "name": "阜阳",
    "area": ["颍州区", "颍东区", "颍泉区", "界首市", "临泉县", "颍上县", "阜南县", "太和县", "其他"] },


  {
    "name": "宿州",
    "area": ["埇桥区", "萧县", "泗县", "砀山县", "灵璧县", "其他"] },


  {
    "name": "巢湖",
    "area": ["居巢区", "含山县", "无为县", "庐江县", "和县", "其他"] },


  {
    "name": "六安",
    "area": ["金安区", "裕安区", "寿县", "霍山县", "霍邱县", "舒城县", "金寨县", "其他"] },


  {
    "name": "亳州",
    "area": ["谯城区", "利辛县", "涡阳县", "蒙城县", "其他"] },


  {
    "name": "池州",
    "area": ["贵池区", "东至县", "石台县", "青阳县", "其他"] },


  {
    "name": "宣城",
    "area": ["宣州区", "宁国市", "广德县", "郎溪县", "泾县", "旌德县", "绩溪县", "其他"] },


  {
    "name": "其他",
    "area": ["其他"] }] },





{
  "name": "福建",
  "city": [

  {
    "name": "福州",
    "area": ["鼓楼区", "台江区", "仓山区", "马尾区", "晋安区", "福清市", "长乐市", "闽侯县", "闽清县", "永泰县", "连江县", "罗源县",
    "平潭县", "其他"] },



  {
    "name": "厦门",
    "area": ["思明区", "海沧区", "湖里区", "集美区", "同安区", "翔安区", "其他"] },


  {
    "name": "莆田",
    "area": ["城厢区", "涵江区", "荔城区", "秀屿区", "仙游县", "其他"] },


  {
    "name": "三明",
    "area": ["梅列区", "三元区", "永安市", "明溪县", "将乐县", "大田县", "宁化县", "建宁县", "沙县", "尤溪县", "清流县", "泰宁县",
    "其他"] },


  {
    "name": "泉州",
    "area": ["鲤城区", "丰泽区", "洛江区", "泉港区", "石狮市", "晋江市", "南安市", "惠安县", "永春县", "安溪县", "德化县", "金门县",
    "其他"] },



  {
    "name": "漳州",
    "area": ["芗城区", "龙文区", "龙海市", "平和县", "南靖县", "诏安县", "漳浦县", "华安县", "东山县", "长泰县", "云霄县", "其他"] },


  {
    "name": "南平",
    "area": ["延平区", "建瓯市", "邵武市", "武夷山市", "建阳市", "松溪县", "光泽县", "顺昌县", "浦城县", "政和县", "其他"] },


  {
    "name": "龙岩",
    "area": ["新罗区", "漳平市", "长汀县", "武平县", "上杭县", "永定县", "连城县", "其他"] },


  {
    "name": "宁德",
    "area": ["蕉城区", "福安市", "福鼎市", "寿宁县", "霞浦县", "柘荣县", "屏南县", "古田县", "周宁县", "其他"] },


  {
    "name": "其他",
    "area": ["其他"] }] },





{
  "name": "江西",
  "city": [

  {
    "name": "南昌",
    "area": ["东湖区", "西湖区", "青云谱区", "湾里区", "青山湖区", "新建县", "南昌县", "进贤县", "安义县", "其他"] },


  {
    "name": "景德镇",
    "area": ["珠山区", "昌江区", "乐平市", "浮梁县", "其他"] },


  {
    "name": "萍乡",
    "area": ["安源区", "湘东区", "莲花县", "上栗县", "芦溪县", "其他"] },


  {
    "name": "九江",
    "area": ["浔阳区", "庐山区", "瑞昌市", "九江县", "星子县", "武宁县", "彭泽县", "永修县", "修水县", "湖口县", "德安县", "都昌县",
    "其他"] },



  {
    "name": "新余",
    "area": ["渝水区", "分宜县", "其他"] },


  {
    "name": "鹰潭",
    "area": ["月湖区", "贵溪市", "余江县", "其他"] },


  {
    "name": "赣州",
    "area": ["章贡区", "瑞金市", "南康市", "石城县", "安远县", "赣县", "宁都县", "寻乌县", "兴国县", "定南县", "上犹县", "于都县",
    "龙南县", "崇义县", "信丰县",
    "全南县", "大余县", "会昌县", "其他"] },



  {
    "name": "吉安",
    "area": ["吉州区", "青原区", "井冈山市", "吉安县", "永丰县", "永新县", "新干县", "泰和县", "峡江县", "遂川县", "安福县", "吉水县",
    "万安县", "其他"] },



  {
    "name": "宜春",
    "area": ["袁州区", "丰城市", "樟树市", "高安市", "铜鼓县", "靖安县", "宜丰县", "奉新县", "万载县", "上高县", "其他"] },


  {
    "name": "抚州",
    "area": ["临川区", "南丰县", "乐安县", "金溪县", "南城县", "东乡县", "资溪县", "宜黄县", "广昌县", "黎川县", "崇仁县", "其他"] },


  {
    "name": "上饶",
    "area": ["信州区", "德兴市", "上饶县", "广丰县", "鄱阳县", "婺源县", "铅山县", "余干县", "横峰县", "弋阳县", "玉山县", "万年县",
    "其他"] },



  {
    "name": "其他",
    "area": ["其他"] }] },





{
  "name": "山东",
  "city": [

  {
    "name": "济南",
    "area": ["市中区", "历下区", "天桥区", "槐荫区", "历城区", "长清区", "章丘市", "平阴县", "济阳县", "商河县", "其他"] },


  {
    "name": "青岛",
    "area": ["市南区", "市北区", "城阳区", "四方区", "李沧区", "黄岛区", "崂山区", "胶南市", "胶州市", "平度市", "莱西市", "即墨市",
    "其他"] },



  {
    "name": "淄博",
    "area": ["张店区", "临淄区", "淄川区", "博山区", "周村区", "桓台县", "高青县", "沂源县", "其他"] },


  {
    "name": "枣庄",
    "area": ["市中区", "山亭区", "峄城区", "台儿庄区", "薛城区", "滕州市", "其他"] },


  {
    "name": "东营",
    "area": ["东营区", "河口区", "垦利县", "广饶县", "利津县", "其他"] },


  {
    "name": "烟台",
    "area": ["芝罘区", "福山区", "牟平区", "莱山区", "龙口市", "莱阳市", "莱州市", "招远市", "蓬莱市", "栖霞市", "海阳市", "长岛县",
    "其他"] },



  {
    "name": "潍坊",
    "area": ["潍城区", "寒亭区", "坊子区", "奎文区", "青州市", "诸城市", "寿光市", "安丘市", "高密市", "昌邑市", "昌乐县", "临朐县",
    "其他"] },



  {
    "name": "济宁",
    "area": ["市中区", "任城区", "曲阜市", "兖州市", "邹城市", "鱼台县", "金乡县", "嘉祥县", "微山县", "汶上县", "泗水县", "梁山县",
    "其他"] },



  {
    "name": "泰安",
    "area": ["泰山区", "岱岳区", "新泰市", "肥城市", "宁阳县", "东平县", "其他"] },


  {
    "name": "威海",
    "area": ["环翠区", "乳山市", "文登市", "荣成市", "其他"] },


  {
    "name": "日照",
    "area": ["东港区", "岚山区", "五莲县", "莒县", "其他"] },


  {
    "name": "莱芜",
    "area": ["莱城区", "钢城区", "其他"] },


  {
    "name": "临沂",
    "area": ["兰山区", "罗庄区", "河东区", "沂南县", "郯城县", "沂水县", "苍山县", "费县", "平邑县", "莒南县", "蒙阴县", "临沭县",
    "其他"] },


  {
    "name": "德州",
    "area": ["德城区", "乐陵市", "禹城市", "陵县", "宁津县", "齐河县", "武城县", "庆云县", "平原县", "夏津县", "临邑县", "其他"] },


  {
    "name": "聊城",
    "area": ["东昌府区", "临清市", "高唐县", "阳谷县", "茌平县", "莘县", "东阿县", "冠县", "其他"] },


  {
    "name": "滨州",
    "area": ["滨城区", "邹平县", "沾化县", "惠民县", "博兴县", "阳信县", "无棣县", "其他"] },


  {
    "name": "菏泽",
    "area": ["牡丹区", "鄄城县", "单县", "郓城县", "曹县", "定陶县", "巨野县", "东明县", "成武县", "其他"] },


  {
    "name": "其他",
    "area": ["其他"] }] },





{
  "name": "河南",
  "city": [

  {
    "name": "郑州",
    "area": ["中原区", "金水区", "二七区", "管城回族区", "上街区", "惠济区", "巩义市", "新郑市", "新密市", "登封市", "荥阳市", "中牟县",
    "其他"] },



  {
    "name": "开封",
    "area": ["鼓楼区", "龙亭区", "顺河回族区", "禹王台区", "金明区", "开封县", "尉氏县", "兰考县", "杞县", "通许县", "其他"] },


  {
    "name": "洛阳",
    "area": ["西工区", "老城区", "涧西区", "瀍河回族区", "洛龙区", "吉利区", "偃师市", "孟津县", "汝阳县", "伊川县", "洛宁县", "嵩县",
    "宜阳县", "新安县", "栾川县",
    "其他"] },



  {
    "name": "平顶山",
    "area": ["新华区", "卫东区", "湛河区", "石龙区", "汝州市", "舞钢市", "宝丰县", "叶县", "郏县", "鲁山县", "其他"] },


  {
    "name": "安阳",
    "area": ["北关区", "文峰区", "殷都区", "龙安区", "林州市", "安阳县", "滑县", "内黄县", "汤阴县", "其他"] },


  {
    "name": "鹤壁",
    "area": ["淇滨区", "山城区", "鹤山区", "浚县", "淇县", "其他"] },


  {
    "name": "新乡",
    "area": ["卫滨区", "红旗区", "凤泉区", "牧野区", "卫辉市", "辉县市", "新乡县", "获嘉县", "原阳县", "长垣县", "封丘县", "延津县",
    "其他"] },



  {
    "name": "焦作",
    "area": ["解放区", "中站区", "马村区", "山阳区", "沁阳市", "孟州市", "修武县", "温县", "武陟县", "博爱县", "其他"] },


  {
    "name": "濮阳",
    "area": ["华龙区", "濮阳县", "南乐县", "台前县", "清丰县", "范县", "其他"] },


  {
    "name": "许昌",
    "area": ["魏都区", "禹州市", "长葛市", "许昌县", "鄢陵县", "襄城县", "其他"] },


  {
    "name": "漯河",
    "area": ["源汇区", "郾城区", "召陵区", "临颍县", "舞阳县", "其他"] },


  {
    "name": "三门峡",
    "area": ["湖滨区", "义马市", "灵宝市", "渑池县", "卢氏县", "陕县", "其他"] },


  {
    "name": "南阳",
    "area": ["卧龙区", "宛城区", "邓州市", "桐柏县", "方城县", "淅川县", "镇平县", "唐河县", "南召县", "内乡县", "新野县", "社旗县",
    "西峡县", "其他"] },



  {
    "name": "商丘",
    "area": ["梁园区", "睢阳区", "永城市", "宁陵县", "虞城县", "民权县", "夏邑县", "柘城县", "睢县", "其他"] },


  {
    "name": "信阳",
    "area": ["浉河区", "平桥区", "潢川县", "淮滨县", "息县", "新县", "商城县", "固始县", "罗山县", "光山县", "其他"] },


  {
    "name": "周口",
    "area": ["川汇区", "项城市", "商水县", "淮阳县", "太康县", "鹿邑县", "西华县", "扶沟县", "沈丘县", "郸城县", "其他"] },


  {
    "name": "驻马店",
    "area": ["驿城区", "确山县", "新蔡县", "上蔡县", "西平县", "泌阳县", "平舆县", "汝南县", "遂平县", "正阳县", "其他"] },


  {
    "name": "焦作",
    "area": ["济源市", "其他"] },


  {
    "name": "其他",
    "area": ["其他"] }] },





{
  "name": "湖北",
  "city": [

  {
    "name": "武汉",
    "area": ["江岸区", "武昌区", "江汉区", "硚口区", "汉阳区", "青山区", "洪山区", "东西湖区", "汉南区", "蔡甸区", "江夏区", "黄陂区",
    "新洲区", "其他"] },



  {
    "name": "黄石",
    "area": ["黄石港区", "西塞山区", "下陆区", "铁山区", "大冶市", "阳新县", "其他"] },


  {
    "name": "十堰",
    "area": ["张湾区", "茅箭区", "丹江口市", "郧县", "竹山县", "房县", "郧西县", "竹溪县", "其他"] },


  {
    "name": "荆州",
    "area": ["沙市区", "荆州区", "洪湖市", "石首市", "松滋市", "监利县", "公安县", "江陵县", "其他"] },


  {
    "name": "宜昌",
    "area": ["西陵区", "伍家岗区", "点军区", "猇亭区", "夷陵区", "宜都市", "当阳市", "枝江市", "秭归县", "远安县", "兴山县",
    "五峰土家族自治县", "长阳土家族自治县",
    "其他"] },



  {
    "name": "襄樊",
    "area": ["襄城区", "樊城区", "襄阳区", "老河口市", "枣阳市", "宜城市", "南漳县", "谷城县", "保康县", "其他"] },


  {
    "name": "鄂州",
    "area": ["鄂城区", "华容区", "梁子湖区", "其他"] },


  {
    "name": "荆门",
    "area": ["东宝区", "掇刀区", "钟祥市", "京山县", "沙洋县", "其他"] },


  {
    "name": "孝感",
    "area": ["孝南区", "应城市", "安陆市", "汉川市", "云梦县", "大悟县", "孝昌县", "其他"] },


  {
    "name": "黄冈",
    "area": ["黄州区", "麻城市", "武穴市", "红安县", "罗田县", "浠水县", "蕲春县", "黄梅县", "英山县", "团风县", "其他"] },


  {
    "name": "咸宁",
    "area": ["咸安区", "赤壁市", "嘉鱼县", "通山县", "崇阳县", "通城县", "其他"] },


  {
    "name": "随州",
    "area": ["曾都区", "广水市", "其他"] },


  {
    "name": "恩施土家族苗族自治州",
    "area": ["恩施市", "利川市", "建始县", "来凤县", "巴东县", "鹤峰县", "宣恩县", "咸丰县", "其他"] },


  {
    "name": "仙桃",
    "area": ["仙桃"] },


  {
    "name": "天门",
    "area": ["天门"] },


  {
    "name": "潜江",
    "area": ["潜江"] },


  {
    "name": "神农架林区",
    "area": ["神农架林区"] },


  {
    "name": "其他",
    "area": ["其他"] }] },





{
  "name": "湖南",
  "city": [

  {
    "name": "长沙",
    "area": ["岳麓区", "芙蓉区", "天心区", "开福区", "雨花区", "浏阳市", "长沙县", "望城县", "宁乡县", "其他"] },


  {
    "name": "株洲",
    "area": ["天元区", "荷塘区", "芦淞区", "石峰区", "醴陵市", "株洲县", "炎陵县", "茶陵县", "攸县", "其他"] },


  {
    "name": "湘潭",
    "area": ["岳塘区", "雨湖区", "湘乡市", "韶山市", "湘潭县", "其他"] },


  {
    "name": "衡阳",
    "area": ["雁峰区", "珠晖区", "石鼓区", "蒸湘区", "南岳区", "耒阳市", "常宁市", "衡阳县", "衡东县", "衡山县", "衡南县", "祁东县",
    "其他"] },



  {
    "name": "邵阳",
    "area": ["双清区", "大祥区", "北塔区", "武冈市", "邵东县", "洞口县", "新邵县", "绥宁县", "新宁县", "邵阳县", "隆回县", "城步苗族自治县",
    "其他"] },



  {
    "name": "岳阳",
    "area": ["岳阳楼区", "云溪区", "君山区", "临湘市", "汨罗市", "岳阳县", "湘阴县", "平江县", "华容县", "其他"] },


  {
    "name": "常德",
    "area": ["武陵区", "鼎城区", "津市市", "澧县", "临澧县", "桃源县", "汉寿县", "安乡县", "石门县", "其他"] },


  {
    "name": "张家界",
    "area": ["永定区", "武陵源区", "慈利县", "桑植县", "其他"] },


  {
    "name": "益阳",
    "area": ["赫山区", "资阳区", "沅江市", "桃江县", "南县", "安化县", "其他"] },


  {
    "name": "郴州",
    "area": ["北湖区", "苏仙区", "资兴市", "宜章县", "汝城县", "安仁县", "嘉禾县", "临武县", "桂东县", "永兴县", "桂阳县", "其他"] },


  {
    "name": "永州",
    "area": ["冷水滩区", "零陵区", "祁阳县", "蓝山县", "宁远县", "新田县", "东安县", "江永县", "道县", "双牌县", "江华瑶族自治县", "其他"] },


  {
    "name": "怀化",
    "area": ["鹤城区", "洪江市", "会同县", "沅陵县", "辰溪县", "溆浦县", "中方县", "新晃侗族自治县", "芷江侗族自治县", "通道侗族自治县",
    "靖州苗族侗族自治县", "麻阳苗族自治县",
    "其他"] },



  {
    "name": "娄底",
    "area": ["娄星区", "冷水江市", "涟源市", "新化县", "双峰县", "其他"] },


  {
    "name": "湘西土家族苗族自治州",
    "area": ["吉首市", "古丈县", "龙山县", "永顺县", "凤凰县", "泸溪县", "保靖县", "花垣县", "其他"] },


  {
    "name": "其他",
    "area": ["其他"] }] },





{
  "name": "广东",
  "city": [

  {
    "name": "广州",
    "area": ["越秀区", "荔湾区", "海珠区", "天河区", "白云区", "黄埔区", "番禺区", "花都区", "南沙区", "萝岗区", "增城市", "从化市",
    "其他"] },



  {
    "name": "深圳",
    "area": ["福田区", "罗湖区", "南山区", "宝安区", "龙岗区", "盐田区", "其他"] },


  {
    "name": "东莞",
    "area": ["莞城", "常平", "塘厦", "塘厦", "塘厦", "其他"] },


  {
    "name": "中山",
    "area": ["中山"] },


  {
    "name": "潮州",
    "area": ["湘桥区", "潮安县", "饶平县", "其他"] },


  {
    "name": "揭阳",
    "area": ["榕城区", "揭东县", "揭西县", "惠来县", "普宁市", "其他"] },


  {
    "name": "云浮",
    "area": ["云城区", "新兴县", "郁南县", "云安县", "罗定市", "其他"] },


  {
    "name": "珠海",
    "area": ["香洲区", "斗门区", "金湾区", "其他"] },


  {
    "name": "汕头",
    "area": ["金平区", "濠江区", "龙湖区", "潮阳区", "潮南区", "澄海区", "南澳县", "其他"] },


  {
    "name": "韶关",
    "area": ["浈江区", "武江区", "曲江区", "乐昌市", "南雄市", "始兴县", "仁化县", "翁源县", "新丰县", "乳源瑶族自治县", "其他"] },


  {
    "name": "佛山",
    "area": ["禅城区", "南海区", "顺德区", "三水区", "高明区", "其他"] },


  {
    "name": "江门",
    "area": ["蓬江区", "江海区", "新会区", "恩平市", "台山市", "开平市", "鹤山市", "其他"] },


  {
    "name": "湛江",
    "area": ["赤坎区", "霞山区", "坡头区", "麻章区", "吴川市", "廉江市", "雷州市", "遂溪县", "徐闻县", "其他"] },


  {
    "name": "茂名",
    "area": ["茂南区", "茂港区", "化州市", "信宜市", "高州市", "电白县", "其他"] },


  {
    "name": "肇庆",
    "area": ["端州区", "鼎湖区", "高要市", "四会市", "广宁县", "怀集县", "封开县", "德庆县", "其他"] },


  {
    "name": "惠州",
    "area": ["惠城区", "惠阳区", "博罗县", "惠东县", "龙门县", "其他"] },


  {
    "name": "梅州",
    "area": ["梅江区", "兴宁市", "梅县", "大埔县", "丰顺县", "五华县", "平远县", "蕉岭县", "其他"] },


  {
    "name": "汕尾",
    "area": ["城区", "陆丰市", "海丰县", "陆河县", "其他"] },


  {
    "name": "河源",
    "area": ["源城区", "紫金县", "龙川县", "连平县", "和平县", "东源县", "其他"] },


  {
    "name": "阳江",
    "area": ["江城区", "阳春市", "阳西县", "阳东县", "其他"] },


  {
    "name": "清远",
    "area": ["清城区", "英德市", "连州市", "佛冈县", "阳山县", "清新县", "连山壮族瑶族自治县", "连南瑶族自治县", "其他"] }] },





{
  "name": "广西",
  "city": [

  {
    "name": "南宁",
    "area": ["青秀区", "兴宁区", "西乡塘区", "良庆区", "江南区", "邕宁区", "武鸣县", "隆安县", "马山县", "上林县", "宾阳县", "横县",
    "其他"] },



  {
    "name": "柳州",
    "area": ["城中区", "鱼峰区", "柳北区", "柳南区", "柳江县", "柳城县", "鹿寨县", "融安县", "融水苗族自治县", "三江侗族自治县", "其他"] },


  {
    "name": "桂林",
    "area": ["象山区", "秀峰区", "叠彩区", "七星区", "雁山区", "阳朔县", "临桂县", "灵川县", "全州县", "平乐县", "兴安县", "灌阳县",
    "荔浦县", "资源县", "永福县",
    "龙胜各族自治县", "恭城瑶族自治县", "其他"] },



  {
    "name": "梧州",
    "area": ["万秀区", "蝶山区", "长洲区", "岑溪市", "苍梧县", "藤县", "蒙山县", "其他"] },


  {
    "name": "北海",
    "area": ["海城区", "银海区", "铁山港区", "合浦县", "其他"] },


  {
    "name": "防城港",
    "area": ["港口区", "防城区", "东兴市", "上思县", "其他"] },


  {
    "name": "钦州",
    "area": ["钦南区", "钦北区", "灵山县", "浦北县", "其他"] },


  {
    "name": "贵港",
    "area": ["港北区", "港南区", "覃塘区", "桂平市", "平南县", "其他"] },


  {
    "name": "玉林",
    "area": ["玉州区", "北流市", "容县", "陆川县", "博白县", "兴业县", "其他"] },


  {
    "name": "百色",
    "area": ["右江区", "凌云县", "平果县", "西林县", "乐业县", "德保县", "田林县", "田阳县", "靖西县", "田东县", "那坡县", "隆林各族自治县",
    "其他"] },



  {
    "name": "贺州",
    "area": ["八步区", "钟山县", "昭平县", "富川瑶族自治县", "其他"] },


  {
    "name": "河池",
    "area": ["金城江区", "宜州市", "天峨县", "凤山县", "南丹县", "东兰县", "都安瑶族自治县", "罗城仫佬族自治县", "巴马瑶族自治县",
    "环江毛南族自治县", "大化瑶族自治县", "其他"] },



  {
    "name": "来宾",
    "area": ["兴宾区", "合山市", "象州县", "武宣县", "忻城县", "金秀瑶族自治县", "其他"] },


  {
    "name": "崇左",
    "area": ["江州区", "凭祥市", "宁明县", "扶绥县", "龙州县", "大新县", "天等县", "其他"] },


  {
    "name": "其他",
    "area": ["其他"] }] },





{
  "name": "海南",
  "city": [

  {
    "name": "海口",
    "area": ["龙华区", "秀英区", "琼山区", "美兰区", "其他"] },


  {
    "name": "三亚",
    "area": ["三亚市", "其他"] },


  {
    "name": "五指山",
    "area": ["五指山"] },


  {
    "name": "琼海",
    "area": ["琼海"] },


  {
    "name": "儋州",
    "area": ["儋州"] },


  {
    "name": "文昌",
    "area": ["文昌"] },


  {
    "name": "万宁",
    "area": ["万宁"] },


  {
    "name": "东方",
    "area": ["东方"] },


  {
    "name": "澄迈县",
    "area": ["澄迈县"] },


  {
    "name": "定安县",
    "area": ["定安县"] },


  {
    "name": "屯昌县",
    "area": ["屯昌县"] },


  {
    "name": "临高县",
    "area": ["临高县"] },


  {
    "name": "白沙黎族自治县",
    "area": ["白沙黎族自治县"] },


  {
    "name": "昌江黎族自治县",
    "area": ["昌江黎族自治县"] },


  {
    "name": "乐东黎族自治县",
    "area": ["乐东黎族自治县"] },


  {
    "name": "陵水黎族自治县",
    "area": ["陵水黎族自治县"] },


  {
    "name": "保亭黎族苗族自治县",
    "area": ["保亭黎族苗族自治县"] },


  {
    "name": "琼中黎族苗族自治县",
    "area": ["琼中黎族苗族自治县"] },


  {
    "name": "其他",
    "area": ["其他"] }] },





{
  "name": "重庆",
  "city": [

  {
    "name": "重庆",
    "area": ["渝中区", "大渡口区", "江北区", "南岸区", "北碚区", "渝北区", "巴南区", "长寿区", "双桥区", "沙坪坝区", "万盛区", "万州区",
    "涪陵区", "黔江区",
    "永川区",
    "合川区", "江津区", "九龙坡区", "南川区", "綦江县", "潼南县", "荣昌县", "璧山县", "大足县", "铜梁县", "梁平县", "开县",
    "忠县", "城口县", "垫江县", "武隆县",
    "丰都县", "奉节县", "云阳县", "巫溪县", "巫山县", "石柱土家族自治县", "秀山土家族苗族自治县", "酉阳土家族苗族自治县", "彭水苗族土家族自治县",
    "其他"] }] },






{
  "name": "四川",
  "city": [

  {
    "name": "成都",
    "area": ["青羊区", "锦江区", "金牛区", "武侯区", "成华区", "龙泉驿区", "青白江区", "新都区", "温江区", "都江堰市", "彭州市", "邛崃市",
    "崇州市", "金堂县",
    "郫县",
    "新津县", "双流县", "蒲江县", "大邑县", "其他"] },



  {
    "name": "自贡",
    "area": ["大安区", "自流井区", "贡井区", "沿滩区", "荣县", "富顺县", "其他"] },


  {
    "name": "攀枝花",
    "area": ["仁和区", "米易县", "盐边县", "东区", "西区", "其他"] },


  {
    "name": "泸州",
    "area": ["江阳区", "纳溪区", "龙马潭区", "泸县", "合江县", "叙永县", "古蔺县", "其他"] },


  {
    "name": "德阳",
    "area": ["旌阳区", "广汉市", "什邡市", "绵竹市", "罗江县", "中江县", "其他"] },


  {
    "name": "绵阳",
    "area": ["涪城区", "游仙区", "江油市", "盐亭县", "三台县", "平武县", "安县", "梓潼县", "北川羌族自治县", "其他"] },


  {
    "name": "广元",
    "area": ["元坝区", "朝天区", "青川县", "旺苍县", "剑阁县", "苍溪县", "市中区", "其他"] },


  {
    "name": "遂宁",
    "area": ["船山区", "安居区", "射洪县", "蓬溪县", "大英县", "其他"] },


  {
    "name": "内江",
    "area": ["市中区", "东兴区", "资中县", "隆昌县", "威远县", "其他"] },


  {
    "name": "乐山",
    "area": ["市中区", "五通桥区", "沙湾区", "金口河区", "峨眉山市", "夹江县", "井研县", "犍为县", "沐川县", "马边彝族自治县", "峨边彝族自治县",
    "其他"] },



  {
    "name": "南充",
    "area": ["顺庆区", "高坪区", "嘉陵区", "阆中市", "营山县", "蓬安县", "仪陇县", "南部县", "西充县", "其他"] },


  {
    "name": "眉山",
    "area": ["东坡区", "仁寿县", "彭山县", "洪雅县", "丹棱县", "青神县", "其他"] },


  {
    "name": "宜宾",
    "area": ["翠屏区", "宜宾县", "兴文县", "南溪县", "珙县", "长宁县", "高县", "江安县", "筠连县", "屏山县", "其他"] },


  {
    "name": "广安",
    "area": ["广安区", "华蓥市", "岳池县", "邻水县", "武胜县", "其他"] },


  {
    "name": "达州",
    "area": ["通川区", "万源市", "达县", "渠县", "宣汉县", "开江县", "大竹县", "其他"] },


  {
    "name": "雅安",
    "area": ["雨城区", "芦山县", "石棉县", "名山县", "天全县", "荥经县", "宝兴县", "汉源县", "其他"] },


  {
    "name": "巴中",
    "area": ["巴州区", "南江县", "平昌县", "通江县", "其他"] },


  {
    "name": "资阳",
    "area": ["雁江区", "简阳市", "安岳县", "乐至县", "其他"] },


  {
    "name": "阿坝藏族羌族自治州",
    "area": ["马尔康县", "九寨沟县", "红原县", "汶川县", "阿坝县", "理县", "若尔盖县", "小金县", "黑水县", "金川县", "松潘县", "壤塘县",
    "茂县", "其他"] },



  {
    "name": "甘孜藏族自治州",
    "area": ["康定县", "丹巴县", "炉霍县", "九龙县", "甘孜县", "雅江县", "新龙县", "道孚县", "白玉县", "理塘县", "德格县", "乡城县",
    "石渠县", "稻城县", "色达县",
    "巴塘县", "泸定县", "得荣县", "其他"] },



  {
    "name": "凉山彝族自治州",
    "area": ["西昌市", "美姑县", "昭觉县", "金阳县", "甘洛县", "布拖县", "雷波县", "普格县", "宁南县", "喜德县", "会东县", "越西县",
    "会理县", "盐源县", "德昌县",
    "冕宁县", "木里藏族自治县", "其他"] },



  {
    "name": "其他",
    "area": ["其他"] }] },





{
  "name": "贵州",
  "city": [

  {
    "name": "贵阳",
    "area": ["南明区", "云岩区", "花溪区", "乌当区", "白云区", "小河区", "清镇市", "开阳县", "修文县", "息烽县", "其他"] },


  {
    "name": "六盘水",
    "area": ["钟山区", "水城县", "盘县", "六枝特区", "其他"] },


  {
    "name": "遵义",
    "area": ["红花岗区", "汇川区", "赤水市", "仁怀市", "遵义县", "绥阳县", "桐梓县", "习水县", "凤冈县", "正安县", "余庆县", "湄潭县",
    "道真仡佬族苗族自治县",
    "务川仡佬族苗族自治县", "其他"] },



  {
    "name": "安顺",
    "area": ["西秀区", "普定县", "平坝县", "镇宁布依族苗族自治县", "紫云苗族布依族自治县", "关岭布依族苗族自治县", "其他"] },


  {
    "name": "铜仁地区",
    "area": ["铜仁市", "德江县", "江口县", "思南县", "石阡县", "玉屏侗族自治县", "松桃苗族自治县", "印江土家族苗族自治县", "沿河土家族自治县",
    "万山特区", "其他"] },



  {
    "name": "毕节地区",
    "area": ["毕节市", "黔西县", "大方县", "织金县", "金沙县", "赫章县", "纳雍县", "威宁彝族回族苗族自治县", "其他"] },


  {
    "name": "黔西南布依族苗族自治州",
    "area": ["兴义市", "望谟县", "兴仁县", "普安县", "册亨县", "晴隆县", "贞丰县", "安龙县", "其他"] },


  {
    "name": "黔东南苗族侗族自治州",
    "area": ["凯里市", "施秉县", "从江县", "锦屏县", "镇远县", "麻江县", "台江县", "天柱县", "黄平县", "榕江县", "剑河县", "三穗县",
    "雷山县", "黎平县", "岑巩县",
    "丹寨县", "其他"] },



  {
    "name": "黔南布依族苗族自治州",
    "area": ["都匀市", "福泉市", "贵定县", "惠水县", "罗甸县", "瓮安县", "荔波县", "龙里县", "平塘县", "长顺县", "独山县", "三都水族自治县",
    "其他"] },



  {
    "name": "其他",
    "area": ["其他"] }] },





{
  "name": "云南",
  "city": [

  {
    "name": "昆明",
    "area": ["盘龙区", "五华区", "官渡区", "西山区", "东川区", "安宁市", "呈贡县", "晋宁县", "富民县", "宜良县", "嵩明县", "石林彝族自治县",
    "禄劝彝族苗族自治县",
    "寻甸回族彝族自治县", "其他"] },



  {
    "name": "曲靖",
    "area": ["麒麟区", "宣威市", "马龙县", "沾益县", "富源县", "罗平县", "师宗县", "陆良县", "会泽县", "其他"] },


  {
    "name": "玉溪",
    "area": ["红塔区", "江川县", "澄江县", "通海县", "华宁县", "易门县", "峨山彝族自治县", "新平彝族傣族自治县", "元江哈尼族彝族傣族自治县", "其他"] },


  {
    "name": "保山",
    "area": ["隆阳区", "施甸县", "腾冲县", "龙陵县", "昌宁县", "其他"] },


  {
    "name": "昭通",
    "area": ["昭阳区", "鲁甸县", "巧家县", "盐津县", "大关县", "永善县", "绥江县", "镇雄县", "彝良县", "威信县", "水富县", "其他"] },


  {
    "name": "丽江",
    "area": ["古城区", "永胜县", "华坪县", "玉龙纳西族自治县", "宁蒗彝族自治县", "其他"] },


  {
    "name": "普洱",
    "area": ["思茅区", "普洱哈尼族彝族自治县", "墨江哈尼族自治县", "景东彝族自治县", "景谷傣族彝族自治县", "镇沅彝族哈尼族拉祜族自治县", "江城哈尼族彝族自治县",
    "孟连傣族拉祜族佤族自治县",
    "澜沧拉祜族自治县", "西盟佤族自治县", "其他"] },



  {
    "name": "临沧",
    "area": ["临翔区", "凤庆县", "云县", "永德县", "镇康县", "双江拉祜族佤族布朗族傣族自治县", "耿马傣族佤族自治县", "沧源佤族自治县", "其他"] },


  {
    "name": "德宏傣族景颇族自治州",
    "area": ["潞西市", "瑞丽市", "梁河县", "盈江县", "陇川县", "其他"] },


  {
    "name": "怒江傈僳族自治州",
    "area": ["泸水县", "福贡县", "贡山独龙族怒族自治县", "兰坪白族普米族自治县", "其他"] },


  {
    "name": "迪庆藏族自治州",
    "area": ["香格里拉县", "德钦县", "维西傈僳族自治县", "其他"] },


  {
    "name": "大理白族自治州",
    "area": ["大理市", "祥云县", "宾川县", "弥渡县", "永平县", "云龙县", "洱源县", "剑川县", "鹤庆县", "漾濞彝族自治县", "南涧彝族自治县",
    "巍山彝族回族自治县", "其他"] },



  {
    "name": "楚雄彝族自治州",
    "area": ["楚雄市", "双柏县", "牟定县", "南华县", "姚安县", "大姚县", "永仁县", "元谋县", "武定县", "禄丰县", "其他"] },


  {
    "name": "红河哈尼族彝族自治州",
    "area": ["蒙自县", "个旧市", "开远市", "绿春县", "建水县", "石屏县", "弥勒县", "泸西县", "元阳县", "红河县", "金平苗族瑶族傣族自治县",
    "河口瑶族自治县",
    "屏边苗族自治县",
    "其他"] },



  {
    "name": "文山壮族苗族自治州",
    "area": ["文山县", "砚山县", "西畴县", "麻栗坡县", "马关县", "丘北县", "广南县", "富宁县", "其他"] },


  {
    "name": "西双版纳傣族自治州",
    "area": ["景洪市", "勐海县", "勐腊县", "其他"] },


  {
    "name": "其他",
    "area": ["其他"] }] },





{
  "name": "西藏",
  "city": [

  {
    "name": "拉萨",
    "area": ["城关区", "林周县", "当雄县", "尼木县", "曲水县", "堆龙德庆县", "达孜县", "墨竹工卡县", "其他"] },


  {
    "name": "那曲地区",
    "area": ["那曲县", "嘉黎县", "比如县", "聂荣县", "安多县", "申扎县", "索县", "班戈县", "巴青县", "尼玛县", "其他"] },


  {
    "name": "昌都地区",
    "area": ["昌都县", "江达县", "贡觉县", "类乌齐县", "丁青县", "察雅县", "八宿县", "左贡县", "芒康县", "洛隆县", "边坝县", "其他"] },


  {
    "name": "林芝地区",
    "area": ["林芝县", "工布江达县", "米林县", "墨脱县", "波密县", "察隅县", "朗县", "其他"] },


  {
    "name": "山南地区",
    "area": ["乃东县", "扎囊县", "贡嘎县", "桑日县", "琼结县", "曲松县", "措美县", "洛扎县", "加查县", "隆子县", "错那县", "浪卡子县",
    "其他"] },



  {
    "name": "日喀则地区",
    "area": ["日喀则市", "南木林县", "江孜县", "定日县", "萨迦县", "拉孜县", "昂仁县", "谢通门县", "白朗县", "仁布县", "康马县", "定结县",
    "仲巴县", "亚东县",
    "吉隆县", "聂拉木县", "萨嘎县", "岗巴县", "其他"] },



  {
    "name": "阿里地区",
    "area": ["噶尔县", "普兰县", "札达县", "日土县", "革吉县", "改则县", "措勤县", "其他"] },


  {
    "name": "其他",
    "area": ["其他"] }] },





{
  "name": "陕西",
  "city": [

  {
    "name": "西安",
    "area": ["莲湖区", "新城区", "碑林区", "雁塔区", "灞桥区", "未央区", "阎良区", "临潼区", "长安区", "高陵县", "蓝田县", "户县",
    "周至县", "其他"] },



  {
    "name": "铜川",
    "area": ["耀州区", "王益区", "印台区", "宜君县", "其他"] },


  {
    "name": "宝鸡",
    "area": ["渭滨区", "金台区", "陈仓区", "岐山县", "凤翔县", "陇县", "太白县", "麟游县", "扶风县", "千阳县", "眉县", "凤县", "其他"] },


  {
    "name": "咸阳",
    "area": ["秦都区", "渭城区", "杨陵区", "兴平市", "礼泉县", "泾阳县", "永寿县", "三原县", "彬县", "旬邑县", "长武县", "乾县",
    "武功县", "淳化县", "其他"] },



  {
    "name": "渭南",
    "area": ["临渭区", "韩城市", "华阴市", "蒲城县", "潼关县", "白水县", "澄城县", "华县", "合阳县", "富平县", "大荔县", "其他"] },


  {
    "name": "延安",
    "area": ["宝塔区", "安塞县", "洛川县", "子长县", "黄陵县", "延川县", "富县", "延长县", "甘泉县", "宜川县", "志丹县", "黄龙县",
    "吴起县", "其他"] },



  {
    "name": "汉中",
    "area": ["汉台区", "留坝县", "镇巴县", "城固县", "南郑县", "洋县", "宁强县", "佛坪县", "勉县", "西乡县", "略阳县", "其他"] },


  {
    "name": "榆林",
    "area": ["榆阳区", "清涧县", "绥德县", "神木县", "佳县", "府谷县", "子洲县", "靖边县", "横山县", "米脂县", "吴堡县", "定边县",
    "其他"] },


  {
    "name": "安康",
    "area": ["汉滨区", "紫阳县", "岚皋县", "旬阳县", "镇坪县", "平利县", "石泉县", "宁陕县", "白河县", "汉阴县", "其他"] },


  {
    "name": "商洛",
    "area": ["商州区", "镇安县", "山阳县", "洛南县", "商南县", "丹凤县", "柞水县", "其他"] },


  {
    "name": "其他",
    "area": ["其他"] }] },





{
  "name": "甘肃",
  "city": [

  {
    "name": "兰州",
    "area": ["城关区", "七里河区", "西固区", "安宁区", "红古区", "永登县", "皋兰县", "榆中县", "其他"] },


  {
    "name": "嘉峪关",
    "area": ["嘉峪关市", "其他"] },


  {
    "name": "金昌",
    "area": ["金川区", "永昌县", "其他"] },


  {
    "name": "白银",
    "area": ["白银区", "平川区", "靖远县", "会宁县", "景泰县", "其他"] },


  {
    "name": "天水",
    "area": ["清水县", "秦安县", "甘谷县", "武山县", "张家川回族自治县", "北道区", "秦城区", "其他"] },


  {
    "name": "武威",
    "area": ["凉州区", "民勤县", "古浪县", "天祝藏族自治县", "其他"] },


  {
    "name": "酒泉",
    "area": ["肃州区", "玉门市", "敦煌市", "金塔县", "肃北蒙古族自治县", "阿克塞哈萨克族自治县", "安西县", "其他"] },


  {
    "name": "张掖",
    "area": ["甘州区", "民乐县", "临泽县", "高台县", "山丹县", "肃南裕固族自治县", "其他"] },


  {
    "name": "庆阳",
    "area": ["西峰区", "庆城县", "环县", "华池县", "合水县", "正宁县", "宁县", "镇原县", "其他"] },


  {
    "name": "平凉",
    "area": ["崆峒区", "泾川县", "灵台县", "崇信县", "华亭县", "庄浪县", "静宁县", "其他"] },


  {
    "name": "定西",
    "area": ["安定区", "通渭县", "临洮县", "漳县", "岷县", "渭源县", "陇西县", "其他"] },


  {
    "name": "陇南",
    "area": ["武都区", "成县", "宕昌县", "康县", "文县", "西和县", "礼县", "两当县", "徽县", "其他"] },


  {
    "name": "临夏回族自治州",
    "area": ["临夏市", "临夏县", "康乐县", "永靖县", "广河县", "和政县", "东乡族自治县", "积石山保安族东乡族撒拉族自治县", "其他"] },


  {
    "name": "甘南藏族自治州",
    "area": ["合作市", "临潭县", "卓尼县", "舟曲县", "迭部县", "玛曲县", "碌曲县", "夏河县", "其他"] },


  {
    "name": "其他",
    "area": ["其他"] }] },





{
  "name": "青海",
  "city": [

  {
    "name": "西宁",
    "area": ["城中区", "城东区", "城西区", "城北区", "湟源县", "湟中县", "大通回族土族自治县", "其他"] },


  {
    "name": "海东地区",
    "area": ["平安县", "乐都县", "民和回族土族自治县", "互助土族自治县", "化隆回族自治县", "循化撒拉族自治县", "其他"] },


  {
    "name": "海北藏族自治州",
    "area": ["海晏县", "祁连县", "刚察县", "门源回族自治县", "其他"] },


  {
    "name": "海南藏族自治州",
    "area": ["共和县", "同德县", "贵德县", "兴海县", "贵南县", "其他"] },


  {
    "name": "黄南藏族自治州",
    "area": ["同仁县", "尖扎县", "泽库县", "河南蒙古族自治县", "其他"] },


  {
    "name": "果洛藏族自治州",
    "area": ["玛沁县", "班玛县", "甘德县", "达日县", "久治县", "玛多县", "其他"] },


  {
    "name": "玉树藏族自治州",
    "area": ["玉树县", "杂多县", "称多县", "治多县", "囊谦县", "曲麻莱县", "其他"] },


  {
    "name": "海西蒙古族藏族自治州",
    "area": ["德令哈市", "格尔木市", "乌兰县", "都兰县", "天峻县", "其他"] },


  {
    "name": "其他",
    "area": ["其他"] }] },





{
  "name": "宁夏",
  "city": [

  {
    "name": "银川",
    "area": ["兴庆区", "西夏区", "金凤区", "灵武市", "永宁县", "贺兰县", "其他"] },


  {
    "name": "石嘴山",
    "area": ["大武口区", "惠农区", "平罗县", "其他"] },


  {
    "name": "吴忠",
    "area": ["利通区", "青铜峡市", "盐池县", "同心县", "其他"] },


  {
    "name": "固原",
    "area": ["原州区", "西吉县", "隆德县", "泾源县", "彭阳县", "其他"] },


  {
    "name": "中卫",
    "area": ["沙坡头区", "中宁县", "海原县", "其他"] },


  {
    "name": "其他",
    "area": ["其他"] }] },





{
  "name": "新疆",
  "city": [

  {
    "name": "乌鲁木齐",
    "area": ["天山区", "沙依巴克区", "新市区", "水磨沟区", "头屯河区", "达坂城区", "东山区", "乌鲁木齐县", "其他"] },


  {
    "name": "克拉玛依",
    "area": ["克拉玛依区", "独山子区", "白碱滩区", "乌尔禾区", "其他"] },


  {
    "name": "吐鲁番地区",
    "area": ["吐鲁番市", "托克逊县", "鄯善县", "其他"] },


  {
    "name": "哈密地区",
    "area": ["哈密市", "伊吾县", "巴里坤哈萨克自治县", "其他"] },


  {
    "name": "和田地区",
    "area": ["和田市", "和田县", "洛浦县", "民丰县", "皮山县", "策勒县", "于田县", "墨玉县", "其他"] },


  {
    "name": "阿克苏地区",
    "area": ["阿克苏市", "温宿县", "沙雅县", "拜城县", "阿瓦提县", "库车县", "柯坪县", "新和县", "乌什县", "其他"] },


  {
    "name": "喀什地区",
    "area": ["喀什市", "巴楚县", "泽普县", "伽师县", "叶城县", "岳普湖县", "疏勒县", "麦盖提县", "英吉沙县", "莎车县", "疏附县",
    "塔什库尔干塔吉克自治县", "其他"] },



  {
    "name": "克孜勒苏柯尔克孜自治州",
    "area": ["阿图什市", "阿合奇县", "乌恰县", "阿克陶县", "其他"] },


  {
    "name": "巴音郭楞蒙古自治州",
    "area": ["库尔勒市", "和静县", "尉犁县", "和硕县", "且末县", "博湖县", "轮台县", "若羌县", "焉耆回族自治县", "其他"] },


  {
    "name": "昌吉回族自治州",
    "area": ["昌吉市", "阜康市", "奇台县", "玛纳斯县", "吉木萨尔县", "呼图壁县", "木垒哈萨克自治县", "米泉市", "其他"] },


  {
    "name": "博尔塔拉蒙古自治州",
    "area": ["博乐市", "精河县", "温泉县", "其他"] },


  {
    "name": "石河子",
    "area": ["石河子"] },


  {
    "name": "阿拉尔",
    "area": ["阿拉尔"] },


  {
    "name": "图木舒克",
    "area": ["图木舒克"] },


  {
    "name": "五家渠",
    "area": ["五家渠"] },


  {
    "name": "伊犁哈萨克自治州",
    "area": ["伊宁市", "奎屯市", "伊宁县", "特克斯县", "尼勒克县", "昭苏县", "新源县", "霍城县", "巩留县", "察布查尔锡伯自治县", "塔城地区",
    "阿勒泰地区", "其他"] },



  {
    "name": "其他",
    "area": ["其他"] }] },





{
  "name": "台湾",
  "city": [

  {
    "name": "台湾",
    "area": ["台北市", "高雄市", "台北县", "桃园县", "新竹县", "苗栗县", "台中县", "彰化县", "南投县", "云林县", "嘉义县", "台南县",
    "高雄县", "屏东县", "宜兰县",
    "花莲县", "台东县", "澎湖县", "基隆市", "新竹市", "台中市", "嘉义市", "台南市", "其他"] },



  {
    "name": "其他",
    "area": ["其他"] }] },





{
  "name": "澳门",
  "city": [

  {
    "name": "澳门",
    "area": ["花地玛堂区", "圣安多尼堂区", "大堂区", "望德堂区", "风顺堂区", "嘉模堂区", "圣方济各堂区", "路凼", "其他"] }] },





{
  "name": "香港",
  "city": [

  {
    "name": "香港",
    "area": ["中西区", "湾仔区", "东区", "南区", "深水埗区", "油尖旺区", "九龙城区", "黄大仙区", "观塘区", "北区", "大埔区", "沙田区",
    "西贡区", "元朗区", "屯门区",
    "荃湾区", "葵青区", "离岛区", "其他"] }] },






{
  "name": "钓鱼岛",
  "city": [

  {
    "name": "钓鱼岛",
    "area": ["钓鱼岛"] }] }];








module.exports = {
  data: data };

/***/ }),

/***/ 102:
/*!*************************************************************************************!*\
  !*** C:/Users/lenovo/Desktop/software_training_takeaway/takeaway/static/l_or_r.jpg ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/l_or_r.jpg";

/***/ }),

/***/ 11:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 2:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 24:
/*!*************************************************************************************!*\
  !*** C:/Users/lenovo/Desktop/software_training_takeaway/takeaway/static/upload.png ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 27:
/*!****************************************************************************************************!*\
  !*** C:/Users/lenovo/Desktop/software_training_takeaway/takeaway/js_sdk/mmmm-image-tools/index.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.pathToBase64 = pathToBase64;exports.base64ToPath = base64ToPath;function getLocalFilePath(path) {
  if (path.indexOf('_www') === 0 || path.indexOf('_doc') === 0 || path.indexOf('_documents') === 0 || path.indexOf('_downloads') === 0) {
    return path;
  }
  if (path.indexOf('file://') === 0) {
    return path;
  }
  if (path.indexOf('/storage/emulated/0/') === 0) {
    return path;
  }
  if (path.indexOf('/') === 0) {
    var localFilePath = plus.io.convertAbsoluteFileSystem(path);
    if (localFilePath !== path) {
      return localFilePath;
    } else {
      path = path.substr(1);
    }
  }
  return '_www/' + path;
}

function dataUrlToBase64(str) {
  var array = str.split(',');
  return array[array.length - 1];
}

var index = 0;
function getNewFileId() {
  return Date.now() + String(index++);
}

function biggerThan(v1, v2) {
  var v1Array = v1.split('.');
  var v2Array = v2.split('.');
  var update = false;
  for (var index = 0; index < v2Array.length; index++) {
    var diff = v1Array[index] - v2Array[index];
    if (diff !== 0) {
      update = diff > 0;
      break;
    }
  }
  return update;
}

function pathToBase64(path) {
  return new Promise(function (resolve, reject) {
    if (typeof window === 'object' && 'document' in window) {
      if (typeof FileReader === 'function') {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', path, true);
        xhr.responseType = 'blob';
        xhr.onload = function () {
          if (this.status === 200) {
            var fileReader = new FileReader();
            fileReader.onload = function (e) {
              resolve(e.target.result);
            };
            fileReader.onerror = reject;
            fileReader.readAsDataURL(this.response);
          }
        };
        xhr.onerror = reject;
        xhr.send();
        return;
      }
      var canvas = document.createElement('canvas');
      var c2x = canvas.getContext('2d');
      var img = new Image();
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        c2x.drawImage(img, 0, 0);
        resolve(canvas.toDataURL());
        canvas.height = canvas.width = 0;
      };
      img.onerror = reject;
      img.src = path;
      return;
    }
    if (typeof plus === 'object') {
      plus.io.resolveLocalFileSystemURL(getLocalFilePath(path), function (entry) {
        entry.file(function (file) {
          var fileReader = new plus.io.FileReader();
          fileReader.onload = function (data) {
            resolve(data.target.result);
          };
          fileReader.onerror = function (error) {
            reject(error);
          };
          fileReader.readAsDataURL(file);
        }, function (error) {
          reject(error);
        });
      }, function (error) {
        reject(error);
      });
      return;
    }
    if (typeof wx === 'object' && wx.canIUse('getFileSystemManager')) {
      wx.getFileSystemManager().readFile({
        filePath: path,
        encoding: 'base64',
        success: function success(res) {
          resolve('data:image/png;base64,' + res.data);
        },
        fail: function fail(error) {
          reject(error);
        } });

      return;
    }
    reject(new Error('not support'));
  });
}

function base64ToPath(base64) {
  return new Promise(function (resolve, reject) {
    if (typeof window === 'object' && 'document' in window) {
      base64 = base64.split(',');
      var type = base64[0].match(/:(.*?);/)[1];
      var str = atob(base64[1]);
      var n = str.length;
      var array = new Uint8Array(n);
      while (n--) {
        array[n] = str.charCodeAt(n);
      }
      return resolve((window.URL || window.webkitURL).createObjectURL(new Blob([array], { type: type })));
    }
    var extName = base64.split(',')[0].match(/data\:\S+\/(\S+);/);
    if (extName) {
      extName = extName[1];
    } else {
      reject(new Error('base64 error'));
    }
    var fileName = getNewFileId() + '.' + extName;
    if (typeof plus === 'object') {
      var basePath = '_doc';
      var dirPath = 'uniapp_temp';
      var filePath = basePath + '/' + dirPath + '/' + fileName;
      if (!biggerThan(plus.os.name === 'Android' ? '1.9.9.80627' : '1.9.9.80472', plus.runtime.innerVersion)) {
        plus.io.resolveLocalFileSystemURL(basePath, function (entry) {
          entry.getDirectory(dirPath, {
            create: true,
            exclusive: false },
          function (entry) {
            entry.getFile(fileName, {
              create: true,
              exclusive: false },
            function (entry) {
              entry.createWriter(function (writer) {
                writer.onwrite = function () {
                  resolve(filePath);
                };
                writer.onerror = reject;
                writer.seek(0);
                writer.writeAsBinary(dataUrlToBase64(base64));
              }, reject);
            }, reject);
          }, reject);
        }, reject);
        return;
      }
      var bitmap = new plus.nativeObj.Bitmap(fileName);
      bitmap.loadBase64Data(base64, function () {
        bitmap.save(filePath, {}, function () {
          bitmap.clear();
          resolve(filePath);
        }, function (error) {
          bitmap.clear();
          reject(error);
        });
      }, function (error) {
        bitmap.clear();
        reject(error);
      });
      return;
    }
    if (typeof wx === 'object' && wx.canIUse('getFileSystemManager')) {
      var filePath = wx.env.USER_DATA_PATH + '/' + fileName;
      wx.getFileSystemManager().writeFile({
        filePath: filePath,
        data: dataUrlToBase64(base64),
        encoding: 'base64',
        success: function success() {
          resolve(filePath);
        },
        fail: function fail(error) {
          reject(error);
        } });

      return;
    }
    reject(new Error('not support'));
  });
}

/***/ }),

/***/ 3:
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {Object.defineProperty(exports, "__esModule", { value: true });exports.compileI18nJsonStr = compileI18nJsonStr;exports.hasI18nJson = hasI18nJson;exports.initVueI18n = initVueI18n;exports.isI18nStr = isI18nStr;exports.normalizeLocale = normalizeLocale;exports.parseI18nJson = parseI18nJson;exports.resolveLocale = resolveLocale;exports.isString = exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isArray = Array.isArray;
var isObject = function isObject(val) {return val !== null && typeof val === 'object';};
var defaultDelimiters = ['{', '}'];var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();exports.Formatter = BaseFormatter;

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {var _ref2 = _slicedToArray(_ref, 2),startDelimiter = _ref2[0],endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
        text += char;
      }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else
        {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }
  return compiled;
}

var LOCALE_ZH_HANS = 'zh-Hans';exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {return hasOwnProperty.call(val, key);};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}
function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {var locale = _ref3.locale,fallbackLocale = _ref3.fallbackLocale,messages = _ref3.messages,watcher = _ref3.watcher,formater = _ref3.formater;_classCallCheck(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "add", value: function add(
    locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else
        {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else
      {
        this.messages[locale] = message;
      }
    } }, { key: "f", value: function f(
    message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    } }, { key: "t", value: function t(
    key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else
      {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    } }]);return I18n;}();exports.I18n = I18n;


function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else
  {
    appVm.$watch(function () {return appVm.$locale;}, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {var _ref4 =
    [
    messages,
    locale];locale = _ref4[0];messages = _ref4[1];

  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale =
    typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale ||
    LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    } };

}

var isString = function isString(val) {return typeof val === 'string';};exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else
    {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else
    {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {var locale = _ref5.locale,locales = _ref5.locales,delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name] });

    }
  });
  localeValues.unshift({ locale: locale, values: locales[locale] });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  }
  catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else
  {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else
  if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}

function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {return locales.indexOf(locale) > -1;});
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 4:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2022 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou' || vm.mpHost === 'mp-xhs'){//百度、快手、小红书 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"orange","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"orange","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"orange","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"orange","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      (this.$scope['_triggerEvent'] || this.$scope['triggerEvent']).call(this.$scope, event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 5:
/*!******************************************************************************!*\
  !*** C:/Users/lenovo/Desktop/software_training_takeaway/takeaway/pages.json ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 56:
/*!******************************************************************************************!*\
  !*** C:/Users/lenovo/Desktop/software_training_takeaway/takeaway/static/star_yellow.png ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 57:
/*!****************************************************************************************!*\
  !*** C:/Users/lenovo/Desktop/software_training_takeaway/takeaway/static/star_grey.png ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 66:
/*!***********************************************************************************!*\
  !*** C:/Users/lenovo/Desktop/software_training_takeaway/takeaway/static/loca.png ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 77:
/*!**********************************************************************************!*\
  !*** C:/Users/lenovo/Desktop/software_training_takeaway/takeaway/static/eye.png ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 78:
/*!*************************************************************************************!*\
  !*** C:/Users/lenovo/Desktop/software_training_takeaway/takeaway/static/no_eye.png ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map