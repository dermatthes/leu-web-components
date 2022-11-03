"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Leu = void 0;
const smoothscroll_1 = require("./helper/smoothscroll");
require("./components/leu-data-nav");
require("./components/leu-format");
require("./components/leu-content");
require("./components/leu-switcher");
require("./components/leu-show");
require("./components/leu-use");
require("./components/leu-var");
const leu_switcher_1 = require("./components/leu-switcher");
const functions_1 = require("./helper/functions");
exports.Leu = {
    config: {
        switcher: {
            hiddenClass: "visually-hidden"
        }
    },
    findParent: functions_1.findParent,
    Switcher: leu_switcher_1.LeuSwitcher,
    SmoothScroll: smoothscroll_1.SmoothScroll
};
globalThis.Leu = exports.Leu;
