"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Multiply_1 = __importDefault(require("./Multiply"));
function power(base, exponent) {
    var result = 0;
    for (var i = 0; i < exponent; i++) {
        result += Multiply_1.default(base, base);
    }
    return result;
}
exports.default = power;
