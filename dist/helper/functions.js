"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isset = exports.findParent = void 0;
function findParent(searchParent, curElement) {
    if (curElement instanceof searchParent)
        return curElement;
    if (curElement.parentElement === null)
        return null;
    return findParent(searchParent, curElement.parentElement);
}
exports.findParent = findParent;
function isset(val) {
    if (typeof val === "undefined" || val === null)
        return false;
    return true;
}
exports.isset = isset;
