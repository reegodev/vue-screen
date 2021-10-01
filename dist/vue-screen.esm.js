function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var inBrowser = typeof window !== 'undefined';
var debounce = function debounce(callback, wait) {
  var timeout; // eslint-disable-next-line func-names

  return function () {
    var context = this; // eslint-disable-next-line prefer-rest-params

    var args = arguments; // eslint-disable-next-line func-names

    var later = function later() {
      timeout = null;
      callback.apply(context, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
var parseSemver = function parseSemver(version) {
  var fragments = version.split('.');
  var major = parseInt(fragments[0], 10);
  return {
    major: typeof major === 'number' ? major : 1,
    minor: parseInt(fragments[1], 10) || 0,
    patch: parseInt(fragments[2], 10) || 0
  };
};
var checkVersion = function checkVersion(current, required) {
  var currentVersion = parseSemver(current);
  var requiredVersion = parseSemver(required);
  return currentVersion.major > requiredVersion.major || currentVersion.major === requiredVersion.major && currentVersion.minor > requiredVersion.minor || currentVersion.major === requiredVersion.major && currentVersion.minor === requiredVersion.minor && currentVersion.patch >= requiredVersion.patch;
};

var bootstrap = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
};

var bulma = {
  mobile: 0,
  tablet: 769,
  desktop: 1024,
  widescreen: 1216,
  fullhd: 1408
};

var foundation = {
  small: 0,
  medium: 640,
  large: 1024
};

var materialize = {
  s: 0,
  m: 601,
  l: 993,
  xl: 1201
};

var semantic = {
  mobile: 0,
  tablet: 768,
  computer: 992,
  large: 1201
};

var tailwind = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

var grids = {
  bootstrap: bootstrap,
  bulma: bulma,
  foundation: foundation,
  materialize: materialize,
  'semantic-ui': semantic,
  tailwind: tailwind
};

var Vue;
var MIN_VUE_VERSION = '2.6.0'; // GoogleBot default screen size

var DEFAULT_WIDTH = 410;
var DEFAULT_HEIGHT = 730;
var DEFAULT_FRAMEWORK = 'tailwind';
var DEBOUNCE_MS = 100;
var RESERVED_KEYS = ['width', 'height', 'touch', 'portrait', 'landscape', 'config'];
var CUSTOM_FRAMEWORK_NAME = '__CUSTOM__';
var DEFAULT_ORDERS = {
  bootstrap: ['xs', 'sm', 'md', 'lg', 'xl'],
  bulma: ['mobile', 'tablet', 'desktop', 'widescreen', 'fullhd'],
  foundation: ['small', 'medium', 'large'],
  materialize: ['s', 'm', 'l', 'xl'],
  'semantic-ui': ['mobile', 'tablet', 'computer', 'large'],
  tailwind: ['xs', 'sm', 'md', 'lg', 'xl']
};
var Plugin =
/*#__PURE__*/
function () {
  /**
   * Class constructor
   *
   * @param {object | string} breakpoints
   */
  function Plugin() {
    var breakpoints = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    _classCallCheck(this, Plugin);

    this.callbacks = {};
    this.framework = '';
    this.config = Plugin.parseBreakpoints(breakpoints);
    this.createScreen();
    this.init();
  }
  /**
   * Parse the breakpoints parameter and return a Breakpoint object
   *
   * @param {object | string} breakpoints
   * @returns {object}
   */


  _createClass(Plugin, [{
    key: "init",

    /**
     * Init the reactive object
     */
    value: function init() {
      this.attachResize();
      this.checkTouch();
      this.setScreenSize();
    }
    /**
     * Attach a listener to the window resize event
     */

  }, {
    key: "attachResize",
    value: function attachResize() {
      if (inBrowser) {
        window.addEventListener('resize', debounce(this.setScreenSize.bind(this), DEBOUNCE_MS));
      }
    }
    /**
     * Set the screen size
     */

  }, {
    key: "setScreenSize",
    value: function setScreenSize() {
      if (inBrowser) {
        this.screen.width = window.innerWidth;
        this.screen.height = window.innerHeight;
        this.runCallbacks();
        this.findCurrentBreakpoint();
      }
    }
    /**
     * Run callbacks
     */

  }, {
    key: "runCallbacks",
    value: function runCallbacks() {
      var _this = this;

      Object.keys(this.callbacks).forEach(function (key) {
        _this.screen[key] = _this.callbacks[key].call(null, _this.screen);
      });
    }
    /**
     * Calculate the current breakpoint name based on "order" property
     */

  }, {
    key: "findCurrentBreakpoint",
    value: function findCurrentBreakpoint() {
      var _this2 = this;

      this.screen.breakpoint = this.config.breakpointsOrder.reduce(function (activeBreakpoint, currentBreakpoint) {
        if (_this2.screen[currentBreakpoint]) {
          return currentBreakpoint;
        }

        return activeBreakpoint;
      }, this.config.breakpointsOrder[0]);
    }
    /**
     * Check touch screen capability
     */

  }, {
    key: "checkTouch",
    value: function checkTouch() {
      if (inBrowser) {
        this.screen.touch = 'ontouchstart' in window;
      }
    }
    /**
     * Create the reactive object
     */

  }, {
    key: "createScreen",
    value: function createScreen() {
      var _this3 = this;

      var breakpointKeys = Object.keys(this.config).filter(function (key) {
        return key !== 'breakpointsOrder';
      });
      this.screen = Vue.observable({
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
        touch: true,
        portrait: true,
        landscape: false,
        breakpoint: this.config.breakpointsOrder[0],
        breakpointsOrder: this.config.breakpointsOrder,
        config: this.config
      });
      this.findCurrentBreakpoint();
      breakpointKeys.forEach(function (name) {
        if (RESERVED_KEYS.indexOf(name) >= 0) {
          throw new Error("Invalid breakpoint name: \"".concat(name, "\". This key is reserved."));
        }

        Vue.set(_this3.screen, name, false);
      });

      if (inBrowser) {
        this.initMediaQueries();
      }
    }
    /**
     * Initialize the media queries to test
     */

  }, {
    key: "initMediaQueries",
    value: function initMediaQueries() {
      var _this4 = this;

      Object.keys(this.config).filter(function (key) {
        return key !== 'breakpointsOrder';
      }).forEach(function (name) {
        var w = null;

        if (name !== 'breakpointsOrder') {
          var width = _this4.config[name];

          if (typeof width === 'function') {
            _this4.callbacks[name] = width;
          } else if (typeof width === 'number') {
            w = "".concat(width, "px");
          } else if (typeof width === 'string') {
            w = width;
          } else {
            _this4.screen[name] = width;
          }
        }

        if (w) {
          var _query = window.matchMedia("(min-width: ".concat(w, ")"));

          if ('addEventListener' in _query) {
            _query.addEventListener('change', function (e) {
              return _this4.mediaStateChanged(name, e.matches);
            });
          } else {
            _query.addListener(function (e) {
              return _this4.mediaStateChanged(name, e.matches);
            });
          }

          _this4.mediaStateChanged(name, _query.matches);
        }
      });
      var query = window.matchMedia('(orientation: portrait)');

      if ('addEventListener' in query) {
        query.addEventListener('change', function (e) {
          _this4.mediaStateChanged('portrait', e.matches);

          _this4.mediaStateChanged('landscape', !e.matches);
        });
      } else {
        query.addListener(function (e) {
          _this4.mediaStateChanged('portrait', e.matches);

          _this4.mediaStateChanged('landscape', !e.matches);
        });
      }

      this.mediaStateChanged('portrait', query.matches);
      this.mediaStateChanged('landscape', !query.matches);
    }
    /**
     * Set the media query state on the reactive object
     *
     * @param {string} name
     * @param {boolean} matches
     */

  }, {
    key: "mediaStateChanged",
    value: function mediaStateChanged(name, matches) {
      Vue.set(this.screen, name, matches);
    }
    /**
     * Install the plugin
     *
     * @param {Vue} vue
     * @param {object} options
     */

  }], [{
    key: "parseBreakpoints",
    value: function parseBreakpoints(breakpoints) {
      if (_typeof(breakpoints) === 'object') {
        if (breakpoints.extend) {
          this.framework = breakpoints.extend.toString(); // eslint-disable-next-line no-param-reassign

          delete breakpoints.extend;
          return Object.assign({}, breakpoints, Plugin.getBreakpoints());
        }

        this.framework = CUSTOM_FRAMEWORK_NAME;
        return _objectSpread2({
          breakpointsOrder: Object.keys(breakpoints).filter(function (key) {
            return key !== 'breakpointsOrder';
          })
        }, breakpoints);
      }

      this.framework = breakpoints.toString();
      return Plugin.getBreakpoints();
    }
    /**
     * Get the breakpoints of one of the supported frameworks
     *
     * @param {string} framework
     * @returns {object}
     */

  }, {
    key: "getBreakpoints",
    value: function getBreakpoints() {
      if (!this.framework) {
        // eslint-disable-next-line no-param-reassign
        this.framework = DEFAULT_FRAMEWORK;
      }

      if (!grids[this.framework]) {
        throw new Error("Cannot find grid breakpoints for framework \"".concat(this.framework, "\""));
      }

      return _objectSpread2({}, grids[this.framework], {
        breakpointsOrder: DEFAULT_ORDERS[this.framework]
      });
    }
  }, {
    key: "install",
    value: function install(vue, options) {
      Vue = vue;

      if (!checkVersion(Vue.version, MIN_VUE_VERSION)) {
        throw Error("VueScreen requires at least Vue ".concat(MIN_VUE_VERSION));
      } // eslint-disable-next-line no-param-reassign


      Vue.prototype.$screen = new Plugin(options).screen;
    }
  }]);

  return Plugin;
}();

if (inBrowser && window.Vue) {
  window.Vue.use(Plugin);
}

export default Plugin;
