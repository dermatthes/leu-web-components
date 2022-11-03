"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createElement = exports.parseAttributeStr = exports.parseVariableStr = void 0;
const embed_1 = require("@kasimirjs/embed");
function parseVariableStr(varString, delimiter = "@") {
    let attrs = {};
    let regex = new RegExp(`\\${delimiter}[^${delimiter}]+`, "gi");
    varString.replace(regex, (match) => {
        match = match.substring(1);
        if (match.indexOf("=") === -1) {
            if (typeof attrs.class === "undefined")
                attrs.class = "";
            attrs.class += " " + match;
            attrs.class = attrs.class.trim();
        }
        else {
            let res = match.split("=", 2);
            attrs[res[0]] = res[1];
        }
        return "";
    });
    return attrs;
}
exports.parseVariableStr = parseVariableStr;
function parseAttributeStr(attrString) {
    return parseVariableStr(attrString, "@");
}
exports.parseAttributeStr = parseAttributeStr;
function createElement(definition) {
    let defRest = definition.trim();
    let tag = "div";
    defRest = defRest.replace(/^[a-z0-9_\:\-]+/ig, (match) => {
        tag = match;
        return "";
    });
    let attrs = parseAttributeStr(defRest);
    let element = (0, embed_1.ka_create_element)(tag, attrs);
    return element;
}
exports.createElement = createElement;
