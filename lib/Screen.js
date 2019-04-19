"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_debounce_1 = __importDefault(require("lodash.debounce"));
var vue_1 = __importDefault(require("vue"));
var grids_1 = __importDefault(require("./grids"));
var DEFAULT_WIDTH = 410;
var DEFAULT_HEIGHT = 730;
var ScreenController = /** @class */ (function () {
    /**
     * Class constructor
     *
     * @param {Breakpoints} breakpoints
     */
    function ScreenController(breakpoints) {
        if (breakpoints === void 0) { breakpoints = ''; }
        this.createScreen(this.parseBreakpoints(breakpoints));
        this.init();
    }
    /**
     * Get the reactive screen object
     */
    ScreenController.prototype.getScreen = function () {
        return this.screen;
    };
    /**
     * Parse the breakpoints parameter and return a Breakpoint object
     *
     * @param {Breakpoints | string} breakpoints
     */
    ScreenController.prototype.parseBreakpoints = function (breakpoints) {
        if (typeof breakpoints === 'object') {
            return breakpoints;
        }
        var key = breakpoints.toString() || 'tailwind';
        if (!grids_1.default[key]) {
            throw new Error("Cannot find grid breakpoints for framework \"" + key + "\"");
        }
        return grids_1.default[key];
    };
    /**
     * Init the reactive object
     */
    ScreenController.prototype.init = function () {
        this.attachResize();
        this.setScreenSize();
        this.checkTouch();
    };
    /**
     * Attach a listener to the window resize event
     */
    ScreenController.prototype.attachResize = function () {
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', lodash_debounce_1.default(this.setScreenSize.bind(this), 100));
        }
    };
    /**
     * Set the screen size
     */
    ScreenController.prototype.setScreenSize = function () {
        this.screen.width = window.innerWidth;
        this.screen.height = window.innerHeight;
    };
    /**
     * Check touch screen capability
     */
    ScreenController.prototype.checkTouch = function () {
        if (typeof window !== 'undefined') {
            this.screen.touch = 'ontouchstart' in window;
        }
    };
    /**
     * Create the reactive object
     *
     * @param {Breakpoints} breakpoints
     */
    ScreenController.prototype.createScreen = function (breakpoints) {
        this.screen = vue_1.default.observable({
            height: DEFAULT_HEIGHT,
            touch: true,
            width: DEFAULT_WIDTH,
        });
        for (var name_1 in breakpoints) {
            if (breakpoints.hasOwnProperty(name_1)) {
                vue_1.default.set(this.screen, name_1, false);
            }
        }
        if (typeof window !== 'undefined') {
            this.initMediaQueries(breakpoints);
        }
    };
    /**
     * Initialize the media queries to test
     *
     * @param {Breakpoints} breakpoints
     */
    ScreenController.prototype.initMediaQueries = function (breakpoints) {
        var _this = this;
        var _loop_1 = function (name_2) {
            if (breakpoints.hasOwnProperty(name_2)) {
                var width = breakpoints[name_2];
                var w = void 0;
                if (typeof width === 'number') {
                    w = width + "px";
                }
                else {
                    w = width;
                }
                var query = window.matchMedia("(min-width: " + w + ")");
                query.addListener(function (e) { return _this.mediaStateChanged(name_2, e.matches); });
                this_1.mediaStateChanged(name_2, query.matches);
            }
        };
        var this_1 = this;
        for (var name_2 in breakpoints) {
            _loop_1(name_2);
        }
    };
    /**
     * Set the media query state on the reactive object
     *
     * @param {string} name
     * @param {boolean} matches
     */
    ScreenController.prototype.mediaStateChanged = function (name, matches) {
        vue_1.default.set(this.screen, name, matches);
    };
    return ScreenController;
}());
exports.ScreenController = ScreenController;
