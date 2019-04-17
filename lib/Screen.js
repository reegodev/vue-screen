"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var vue_1 = __importDefault(require("vue"));
var DEFAULT_WIDTH = 410;
var DEFAULT_HEIGHT = 730;
var ScreenController = /** @class */ (function () {
    /**
     * Class constructor
     *
     * @param {Breakpoints} breakpoints
     */
    function ScreenController(breakpoints) {
        if (breakpoints === void 0) { breakpoints = {}; }
        this.createScreen(breakpoints);
        this.attachResize();
    }
    /**
     * Get the reactive screen object
     */
    ScreenController.prototype.getScreen = function () {
        return this.screen;
    };
    /**
     * Attach a listener to the window resize event
     */
    ScreenController.prototype.attachResize = function () {
        var _this = this;
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', lodash_1.debounce(function () {
                _this.screen.width = window.innerWidth;
                _this.screen.height = window.innerHeight;
            }, 100));
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
        for (var label in breakpoints) {
            if (breakpoints.hasOwnProperty(label)) {
                vue_1.default.set(this.screen, label, false);
            }
        }
    };
    return ScreenController;
}());
exports.ScreenController = ScreenController;
