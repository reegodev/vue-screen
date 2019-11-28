import Vue from 'vue';

var inBrowser = typeof window !== 'undefined';
var debounce = function (callback, delay) {
    var timeout;
    return function () {
        var context = this;
        var args = arguments;
        var later = function () {
            timeout = null;
            callback.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = window.setTimeout(later, delay);
    };
};
var parseSemver = function (version) {
    var _a = version.split('.').map(function (fragment) { return parseInt(fragment) || 0; }), major = _a[0], minor = _a[1], patch = _a[2];
    return {
        major: major || 1,
        minor: minor,
        patch: patch,
    };
};
var checkVersion = function (current, required) {
    var currentVersion = parseSemver(current);
    var requiredVersion = parseSemver(required);
    return (currentVersion.major > requiredVersion.major
        || (currentVersion.major === requiredVersion.major
            && currentVersion.minor > requiredVersion.minor)
        || (currentVersion.major === requiredVersion.major
            && currentVersion.minor === requiredVersion.minor
            && currentVersion.patch >= requiredVersion.patch));
};

var bootstrap = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
};

var bulma = {
    mobile: 0,
    tablet: 769,
    desktop: 1024,
    widescreen: 1216,
    fullhd: 1408,
};

var foundation = {
    small: 0,
    medium: 640,
    large: 1024,
};

var materialize = {
    s: 0,
    m: 601,
    l: 993,
    xl: 1201,
};

var semantic = {
    mobile: 0,
    tablet: 768,
    computer: 992,
    large: 1201,
};

var tailwind = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
};

var grid = {
    bootstrap: bootstrap,
    bulma: bulma,
    foundation: foundation,
    materialize: materialize,
    'semantic-ui': semantic,
    tailwind: tailwind,
};

var CUSTOM_FRAMEWORK_NAME = '__CUSTOM__';
var DEFAULT_FRAMEWORK = 'tailwind';
var DEFAULT_DEBOUNCE_DELAY = 100;
var MIN_VUE_VERSION = '2.6.0';
var DEFAULT_BREAKPOINTS_ORDER = {
    bootstrap: ['xs', 'sm', 'md', 'lg', 'xl'],
    bulma: ['mobile', 'tablet', 'desktop', 'widescreen', 'fullhd'],
    foundation: ['small', 'medium', 'large'],
    materialize: ['s', 'm', 'l', 'xl'],
    'semantic-ui': ['mobile', 'tablet', 'computer', 'large'],
    tailwind: ['xs', 'sm', 'md', 'lg', 'xl'],
};
var RESERVED_KEYS = [
    'width',
    'height',
    'touch',
    'portrait',
    'landscape',
];
var DEFAULT_BREAKPOINT_FN = function (screen) {
    return screen.breakpointsOrder.reduce(function (activeBreakpoint, currentBreakpoint) {
        if (screen[currentBreakpoint]) {
            return currentBreakpoint;
        }
        return activeBreakpoint;
    }, screen.breakpointsOrder[0]);
};

var validateFrameworkName = function (name) {
    if (Object.keys(grid).indexOf(name) < 0) {
        throw new Error("Cannot find breakpoints for framework \"" + name + "\"");
    }
};
var parseConfig = function (rawConfig) {
    var config = {
        framework: DEFAULT_FRAMEWORK,
        breakpoints: grid[DEFAULT_FRAMEWORK],
        callbacks: {},
        params: {
            breakpointsOrder: DEFAULT_BREAKPOINTS_ORDER[DEFAULT_FRAMEWORK],
            breakpointFn: DEFAULT_BREAKPOINT_FN,
            debounceDelay: DEFAULT_DEBOUNCE_DELAY,
        },
    };
    if (typeof rawConfig === 'object') {
        if ('extend' in rawConfig) {
            config.framework = rawConfig.extend;
            validateFrameworkName(config.framework);
            delete rawConfig.extend;
        }
        else {
            config.framework = CUSTOM_FRAMEWORK_NAME;
        }
        if ('breakpointsOrder' in rawConfig) {
            config.params.breakpointsOrder = rawConfig.breakpointsOrder;
            delete rawConfig.breakpointsOrder;
        }
        else {
            if (config.framework === CUSTOM_FRAMEWORK_NAME) {
                config.params.breakpointsOrder = [];
            }
            else {
                config.params.breakpointsOrder = DEFAULT_BREAKPOINTS_ORDER[config.framework];
            }
        }
        if ('breakpoint' in rawConfig) {
            if (typeof rawConfig.breakpoint !== 'function') {
                throw new Error("The \"breakpoint\" option must be a function");
            }
            config.params.breakpointFn = rawConfig.breakpoint;
            delete rawConfig.breakpoint;
        }
        if ('debounceDelay' in rawConfig) {
            config.params.debounceDelay = parseInt('' + rawConfig.debounceDelay, 10);
            delete rawConfig.debounceDelay;
        }
        Object.entries(rawConfig).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            var isCallback = typeof value === 'function';
            if (RESERVED_KEYS.indexOf(key) >= 0) {
                throw new Error("Invalid " + (isCallback ? 'callback' : 'breakpoint') + " name \"" + name + "\". This key is reserved.");
            }
            if (isCallback) {
                config.callbacks[key] = value;
            }
            else {
                config.breakpoints[key] = value;
            }
        });
    }
    else {
        config.framework = rawConfig || DEFAULT_FRAMEWORK;
        validateFrameworkName(config.framework);
        config.breakpoints = grid[config.framework];
        config.params.breakpointsOrder = DEFAULT_BREAKPOINTS_ORDER[config.framework];
    }
    return config;
};

var createScreenObject = function (rawConfig) {
    var config = parseConfig(rawConfig);
    var mediaQueries = createMediaQueries(config);
    var screen = Vue.observable(initScreenObject(config));
    if (inBrowser) {
        var resizeCb = onResize.bind(null, screen, config, mediaQueries);
        window.addEventListener('resize', debounce(resizeCb, config.params.debounceDelay));
        resizeCb();
    }
    return screen;
};
var initScreenObject = function (config) {
    var initialScreen = {
        width: 0,
        height: 0,
        landscape: false,
        portrait: true,
        touch: 'ontouchstart' in window,
        breakpointsOrder: config.params.breakpointsOrder,
        breakpoint: config.params.breakpointsOrder[0],
    };
    Object.keys(config.breakpoints).forEach(function (breakpoint) {
        initialScreen[breakpoint] = false;
    });
    Object.keys(config.callbacks).forEach(function (callbackName) {
        initialScreen[callbackName] = undefined;
    });
    return initialScreen;
};
var createMediaQueries = function (config) {
    var queries = {};
    if (!inBrowser) {
        return queries;
    }
    Object.keys(config.breakpoints).forEach(function (breakpoint) {
        var width = config.breakpoints[breakpoint];
        if (typeof width === 'number') {
            width = width + "px";
        }
        queries[breakpoint] = window.matchMedia("(min-width: " + width + ")");
    });
    queries.portrait = window.matchMedia('(orientation: portrait)');
    queries.landscape = window.matchMedia('(orientation: landscape)');
    return queries;
};
var onResize = function (screen, config, mediaQueries) {
    if (!inBrowser) {
        return;
    }
    screen.width = window.innerWidth;
    screen.height = window.innerHeight;
    Object.keys(mediaQueries).forEach(function (breakpoint) {
        screen[breakpoint] = mediaQueries[breakpoint].matches;
    });
    screen.breakpoint = config.params.breakpointFn.call(null, screen);
    Object.keys(config.callbacks).forEach(function (key) {
        screen[key] = config.callbacks[key].call(null, screen);
    });
};

var plugin = {
    install: function (Vue, options) {
        if (!checkVersion(Vue.version, MIN_VUE_VERSION)) {
            throw Error("VueScreen requires at least Vue " + MIN_VUE_VERSION);
        }
        Vue.prototype.$screen = createScreenObject(options);
    }
};
if (inBrowser && window.Vue) {
    window.Vue.use(plugin);
}

export default plugin;
