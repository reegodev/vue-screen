"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bootstrap_1 = __importDefault(require("./bootstrap"));
var bulma_1 = __importDefault(require("./bulma"));
var foundation_1 = __importDefault(require("./foundation"));
var semantic_ui_1 = __importDefault(require("./semantic-ui"));
var tailwind_1 = __importDefault(require("./tailwind"));
exports.default = {
    bootstrap: bootstrap_1.default,
    bulma: bulma_1.default,
    foundation: foundation_1.default,
    'semantic-ui': semantic_ui_1.default,
    tailwind: tailwind_1.default,
};
