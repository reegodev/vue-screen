"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Add_1 = __importDefault(require("./Add"));
function multiply(target, times) {
    var result = 0;
    for (var i = 0; i < times; i++) {
        result += Add_1.default(target, target);
    }
    return result;
}
exports.default = multiply;
