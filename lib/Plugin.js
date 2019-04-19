"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Screen_1 = require("./Screen");
exports.default = {
    install: function (Vue, breakpoints) {
        if (breakpoints === void 0) { breakpoints = ''; }
        Vue.prototype.$screen = new Screen_1.ScreenController(breakpoints).getScreen();
    },
};
