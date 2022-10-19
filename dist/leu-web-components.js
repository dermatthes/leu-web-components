/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@kasimirjs/embed/dist/ce/custom-element.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@kasimirjs/embed/dist/ce/custom-element.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KaCustomElement = void 0;
const templatify_js_1 = __webpack_require__(/*! ../tpl/templatify.js */ "./node_modules/@kasimirjs/embed/dist/tpl/templatify.js");
const template_js_1 = __webpack_require__(/*! ../tpl/template.js */ "./node_modules/@kasimirjs/embed/dist/tpl/template.js");
const query_select_js_1 = __webpack_require__(/*! ../core/query-select.js */ "./node_modules/@kasimirjs/embed/dist/core/query-select.js");
const htmlFile_1 = __webpack_require__(/*! ./htmlFile */ "./node_modules/@kasimirjs/embed/dist/ce/htmlFile.js");
class KaCustomElement extends HTMLElement {
    constructor(props) {
        super(props);
        /**
         *
         * @protected
         * @var {KaTemplate}
         */
        this.__tpl = null;
        this.__isConnected = false;
    }
    /**
     * The Template associated with this Element
     *
     * @return {KaTemplate}
     */
    get $tpl() {
        return this.__tpl;
    }
    isConnected() {
        return this.isConnected;
    }
    /**
     * @abstract
     * @return {Promise<void>}
     */
    connected($tpl, $this) {
        return __awaiter(this, void 0, void 0, function* () {
            console.warn("connected() method not overridden in", this);
        });
    }
    connectedCallback() {
        return __awaiter(this, void 0, void 0, function* () {
            let callback = this.constructor.__callback;
            if (callback === null) {
            }
            else {
                callback.bind(this);
            }
            if (this.constructor.__tpl !== null) {
                let origTpl = this.constructor.__tpl;
                if (origTpl instanceof htmlFile_1.RemoteTemplate)
                    origTpl = yield origTpl.load();
                let tpl = (0, templatify_js_1.ka_templatify)(origTpl);
                if (this.constructor.__options.shadowDom === true) {
                    let shadowDom = this.attachShadow(this.constructor.__options.shadowDomOptions);
                    shadowDom.appendChild(tpl);
                }
                else {
                    this.appendChild(tpl);
                }
                this.__tpl = new template_js_1.KaTemplate(tpl);
            }
            if (this.constructor.__options.waitEvent !== null) {
                let wd = this.constructor.__options.waitEvent.split("@");
                let eventName = wd[0];
                let target = document;
                if (wd.length === 2) {
                    target = (0, query_select_js_1.ka_query_selector)(wd[1]);
                }
                target.addEventListener(eventName, (event) => __awaiter(this, void 0, void 0, function* () {
                    callback(this.$tpl, this);
                    this.__isConnected = true;
                }));
                return;
            }
            if (callback === null) {
                // Class: Call connected() Method
                yield this.connected(this.$tpl, this);
                this.__isConnected = true;
                return;
            }
            // Function
            callback(this.$tpl, this);
            this.__isConnected = true;
        });
    }
}
exports.KaCustomElement = KaCustomElement;
;


/***/ }),

/***/ "./node_modules/@kasimirjs/embed/dist/ce/html.js":
/*!*******************************************************!*\
  !*** ./node_modules/@kasimirjs/embed/dist/ce/html.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ka_html = void 0;
function ka_html(htmlContent) {
    let e = document.createElement("template");
    e.innerHTML = htmlContent;
    return e;
}
exports.ka_html = ka_html;


/***/ }),

/***/ "./node_modules/@kasimirjs/embed/dist/ce/htmlFile.js":
/*!***********************************************************!*\
  !*** ./node_modules/@kasimirjs/embed/dist/ce/htmlFile.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RemoteTemplate = void 0;
const loadHtml_1 = __webpack_require__(/*! ./loadHtml */ "./node_modules/@kasimirjs/embed/dist/ce/loadHtml.js");
class RemoteTemplate {
    constructor(url) {
        this.url = url;
        this.tpl = null;
    }
    /**
     *
     * @return {Promise<HTMLTemplateElement>}
     */
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.tpl === null)
                this.tpl = yield (0, loadHtml_1.ka_load_html)(this.url);
            return this.tpl;
        });
    }
}
exports.RemoteTemplate = RemoteTemplate;
/**
 * Load the Template on usage from remote location
 *
 *
 * @param url {string}
 * @return {RemoteTemplate}
 */
function htmlUrl(url) {
    return new RemoteTemplate(url);
}


/***/ }),

/***/ "./node_modules/@kasimirjs/embed/dist/ce/loadHtml.js":
/*!***********************************************************!*\
  !*** ./node_modules/@kasimirjs/embed/dist/ce/loadHtml.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ka_load_html = void 0;
/**
 *
 * @param url {string}
 * @return {Promise<HTMLTemplateElement>}
 */
function ka_load_html(url) {
    return __awaiter(this, void 0, void 0, function* () {
        let e = document.createElement("template");
        let result = yield fetch(url);
        if (!result.ok) {
            console.error(`[loadHtml] failed to load '${url}'`);
            throw `[loadHtml] failed to load '${url}'`;
        }
        let body = yield result.text();
        e.innerHTML = body;
        return e;
    });
}
exports.ka_load_html = ka_load_html;


/***/ }),

/***/ "./node_modules/@kasimirjs/embed/dist/core/apply.js":
/*!**********************************************************!*\
  !*** ./node_modules/@kasimirjs/embed/dist/core/apply.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ka_apply = void 0;
const eval_js_1 = __webpack_require__(/*! ./eval.js */ "./node_modules/@kasimirjs/embed/dist/core/eval.js");
const str_to_camelcase_js_1 = __webpack_require__(/*! ./str-to-camelcase.js */ "./node_modules/@kasimirjs/embed/dist/core/str-to-camelcase.js");
function ka_apply(selector, scope, recursive = false) {
    if (typeof selector === "string")
        selector = KaToolsV1.querySelector(selector);
    let attMap = {
        "textcontent": "textContent",
        "htmlcontent": "innerHTML",
        "innerhtml": "innerHTML",
    };
    for (let attName of selector.getAttributeNames()) {
        //console.log(attName);
        if (!attName.startsWith("ka.")) {
            continue;
        }
        let attVal = selector.getAttribute(attName);
        let attType = attName.split(".")[1];
        let attSelector = attName.split(".")[2];
        if (typeof attSelector === "undefined")
            attSelector = null;
        let registerEventHandler = function (element, action, callbackOrCode, scope) {
            if (typeof element._ka_on === "undefined")
                element._ka_on = {};
            if (typeof element._ka_on[action] === "undefined")
                element.addEventListener(action, (e) => element._ka_on[action](e));
            element._ka_on[action] = (e) => __awaiter(this, void 0, void 0, function* () {
                scope["$event"] = e;
                if (typeof callbackOrCode === "function") {
                    return callbackOrCode(e, element, scope);
                }
                else {
                    return (0, eval_js_1.ka_eval)(callbackOrCode, scope, element);
                }
            });
        };
        if (attType === "on") {
            let attScope = Object.assign({ $scope: scope }, scope);
            if (attSelector !== null) {
                registerEventHandler(selector, attSelector, attVal, attScope);
            }
            else {
                let callBackMap = KaToolsV1.eval(attVal, attScope, selector);
                for (let curAction in callBackMap) {
                    registerEventHandler(selector, curAction, callBackMap[curAction], attScope);
                }
            }
            continue;
        }
        let r = null;
        if (typeof attVal !== "undefined" && typeof attVal !== null && attVal !== "")
            r = (0, eval_js_1.ka_eval)(attVal, scope, selector);
        switch (attType) {
            case "ref":
                if (typeof scope.$ref === "undefined")
                    scope.$ref = {};
                // Allow ref without parameter to use $ref.$last
                if (r !== null)
                    scope.$ref[r] = selector;
                scope.$ref.$last = selector;
                break;
            case "classlist":
                if (attSelector !== null) {
                    if (r === true) {
                        selector.classList.add(attSelector);
                    }
                    else {
                        selector.classList.remove(attSelector);
                    }
                    break;
                }
                for (let cname in r) {
                    if (r[cname] === true) {
                        selector.classList.add(cname);
                    }
                    else {
                        selector.classList.remove(cname);
                    }
                }
                break;
            case "style":
                if (attSelector !== null) {
                    let val = r;
                    if (typeof val === "number" && ["left", "top", "height", "width", "bottom", "right", "line-height", "font-size"].indexOf(attSelector) !== -1)
                        val = val + "px";
                    selector.style[(0, str_to_camelcase_js_1.ka_str_to_camel_case)(attSelector)] = val;
                    break;
                }
                for (let cname in r) {
                    let val = r[cname];
                    if (typeof val === "number" && ["left", "top", "height", "width", "bottom", "right", "line-height", "font-size"].indexOf(cname) !== -1)
                        val = val + "px";
                    selector.style[(0, str_to_camelcase_js_1.ka_str_to_camel_case)(cname)] = val;
                }
                break;
            case "bindarray":
                if (attSelector === "default")
                    continue;
                if (typeof r === "undefined") {
                    // Bind default values
                    if (selector.hasAttribute("ka.bind.default")) {
                        scope = Object.assign({ $scope: scope }, scope);
                        scope = Object.assign(Object.assign({ $scope: scope }, scope), { __curVal: (0, eval_js_1.ka_eval)(selector.getAttribute("ka.bind.default"), scope, selector) });
                        (0, eval_js_1.ka_eval)(`${attVal} = __curVal`, scope, selector);
                        r = scope.__curVal;
                    }
                }
                if (!Array.isArray(r)) {
                    console.error("kap:bindarr: Not an array!", r, selector);
                    return;
                }
                if (r.indexOf(selector.value) === -1)
                    selector.checked = false;
                else
                    selector.checked = true;
                if (typeof selector._kap_bind === "undefined") {
                    selector.addEventListener("change", (event) => {
                        let arr = (0, eval_js_1.ka_eval)(attVal, scope, selector);
                        if (arr.indexOf(selector.value) === -1 && selector.checked)
                            arr.push(selector.value);
                        if (arr.indexOf(selector.value) !== -1 && !selector.checked)
                            arr = arr.filter((e) => e !== selector.value);
                        scope = Object.assign(Object.assign({ $scope: scope }, scope), { __curVal: arr });
                        (0, eval_js_1.ka_eval)(`${attVal} = __curVal`, scope, selector);
                        if (scope.$on && scope.$on.change)
                            scope.$on.change(event);
                    });
                    selector._kap_bind = true;
                }
                break;
            case "bind":
                if (attSelector === "default")
                    continue;
                if (typeof r === "undefined") {
                    // Bind default values
                    if (selector.hasAttribute("ka.bind.default")) {
                        scope = Object.assign({ $scope: scope }, scope);
                        scope = Object.assign(Object.assign({ $scope: scope }, scope), { __curVal: (0, eval_js_1.ka_eval)(selector.getAttribute("ka.bind.default"), scope, selector) });
                        (0, eval_js_1.ka_eval)(`${attVal} = __curVal`, scope, selector);
                        r = scope.__curVal;
                    }
                }
                if (selector.type === "checkbox" || selector.type === "radio") {
                    if (selector.hasAttribute("value")) {
                        if (r === selector.getAttribute("value"))
                            selector.checked = true;
                        else
                            selector.checked = false;
                    }
                    else {
                        if (r === true)
                            selector.checked = true;
                        else
                            selector.checked = false;
                    }
                }
                else {
                    selector.value = typeof r !== "undefined" ? r : "";
                }
                if (typeof selector._kap_bind === "undefined") {
                    selector.addEventListener("change", (event) => {
                        let value = null;
                        if (selector.type === "checkbox" || selector.type === "radio") {
                            if (selector.hasAttribute("value")) {
                                if (selector.checked === false)
                                    return;
                                value = selector.getAttribute("value");
                            }
                            else {
                                value = selector.checked;
                            }
                        }
                        else {
                            value = selector.value;
                        }
                        scope = Object.assign(Object.assign({ $scope: scope }, scope), { __curVal: value });
                        (0, eval_js_1.ka_eval)(`${attVal} = __curVal`, scope, selector);
                        if (scope.$on && scope.$on.change)
                            scope.$on.change(event);
                    });
                    selector.addEventListener("keyup", (event) => {
                        scope = Object.assign(Object.assign({ $scope: scope }, scope), { __curVal: selector.value });
                        (0, eval_js_1.ka_eval)(`${attVal} = __curVal`, scope, selector);
                        if (scope.$on && scope.$on.change)
                            scope.$on.change(event);
                    });
                    selector._kap_bind = true;
                }
                break;
            case "options":
                let value = selector.value;
                selector.innerHTML = "";
                for (let option in r) {
                    if (isNaN(option)) {
                        selector.appendChild(new Option(r[option], option));
                    }
                    else {
                        if (typeof r[option].text !== "undefined") {
                            selector.appendChild(new Option(r[option].text, r[option].value));
                        }
                        else {
                            selector.appendChild(new Option(r[option], r[option]));
                        }
                    }
                }
                if (value !== null)
                    selector.value = value;
                break;
            case "attr":
                if (attSelector !== null) {
                    if (r === null || r === false) {
                        selector.removeAttribute(attSelector);
                    }
                    else {
                        selector.setAttribute(attSelector, r);
                    }
                    break;
                }
                for (let cname in r) {
                    if (r[cname] === null || r[cname] === false) {
                        selector.removeAttribute(cname);
                    }
                    else {
                        selector.setAttribute(cname, r[cname]);
                    }
                }
                break;
            case "prop":
                if (attSelector !== null) {
                    // Set Property directly
                    selector[(0, str_to_camelcase_js_1.ka_str_to_camel_case)(attSelector)] = r;
                    break;
                }
                for (let cname in r) {
                    selector[(0, str_to_camelcase_js_1.ka_str_to_camel_case)(cname)] = r[cname];
                }
                break;
            default:
                if (typeof attMap[attType] !== "undefined")
                    attType = attMap[attType];
                if (typeof selector[attType] === "undefined") {
                    console.warn("apply(): trying to set undefined property ", attType, "on element", selector);
                }
                selector[attType] = r;
                break;
        }
    }
    if (recursive) {
        for (let e of selector.children) {
            ka_apply(e, scope, recursive);
        }
    }
}
exports.ka_apply = ka_apply;


/***/ }),

/***/ "./node_modules/@kasimirjs/embed/dist/core/create-element.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@kasimirjs/embed/dist/core/create-element.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ka_create_element = void 0;
/**
 * Create a new Element
 *
 * @param tagName {string}      The Tag Name
 * @param attributes {string<string>}   Attributes to set initially
 * @param appendToElement {HTMLElement}
 * @param children {HTMLElement[]}
 * @return HTMLElement
 */
function ka_create_element(tagName, attributes = null, children = null, appendToElement = null) {
    let e = document.createElement(tagName);
    if (attributes === null)
        attributes = {};
    for (let attName in attributes) {
        e.setAttribute(attName, attributes[attName]);
    }
    if (Array.isArray(children)) {
        for (let ce of children)
            e.appendChild(ce);
    }
    if (appendToElement !== null) {
        appendToElement.appendChild(e);
    }
    return e;
}
exports.ka_create_element = ka_create_element;


/***/ }),

/***/ "./node_modules/@kasimirjs/embed/dist/core/dom-ready.js":
/*!**************************************************************!*\
  !*** ./node_modules/@kasimirjs/embed/dist/core/dom-ready.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ka_dom_ready = void 0;
/**
 * Wait for DomContentLoaded or resolve immediate
 *
 * <example>
 * await MicxToolsVx.domReady();
 * </example>
 *
 * @return {Promise<string>}
 */
function ka_dom_ready() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            if (document.readyState === "complete" || document.readyState === "interactive")
                return resolve("loaded");
            document.addEventListener("DOMContentLoaded", () => resolve('DOMContentLoaded'));
        });
    });
}
exports.ka_dom_ready = ka_dom_ready;


/***/ }),

/***/ "./node_modules/@kasimirjs/embed/dist/core/elwalk.js":
/*!***********************************************************!*\
  !*** ./node_modules/@kasimirjs/embed/dist/core/elwalk.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ka_elwalk = void 0;
/**
 *
 * @param {HTMLElement} elem
 * @param fn
 * @param recursive
 */
function ka_elwalk(elem, fn, recursive = false, includeFirst = false) {
    if (Array.isArray(elem))
        elem.children = elem;
    if (typeof elem.children === "undefined")
        return;
    if (includeFirst && elem instanceof HTMLElement) {
        let ret = fn(elem);
        if (ret === false)
            return false;
    }
    for (let child of elem.children) {
        let ret = fn(child);
        if (ret === false)
            continue; // No recursiion
        if (recursive && typeof child.children !== "undefined")
            ka_elwalk(child, fn, recursive);
    }
}
exports.ka_elwalk = ka_elwalk;


/***/ }),

/***/ "./node_modules/@kasimirjs/embed/dist/core/eval.js":
/*!*********************************************************!*\
  !*** ./node_modules/@kasimirjs/embed/dist/core/eval.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ka_eval = void 0;
function ka_eval(stmt, __scope, e, __refs) {
    if (stmt.endsWith(";"))
        stmt = stmt.slice(0, -1);
    const reserved = ["var", "null", "let", "const", "function", "class", "in", "of", "for", "true", "false", "await", "$this"];
    let r = "var $this = e;";
    for (let __name in __scope) {
        if (reserved.indexOf(__name) !== -1)
            continue;
        if (__name.indexOf("-") !== -1) {
            console.error(`Invalid scope key '${__name}': Cannot contain - in scope:`, __scope);
            throw `eval() failed: Invalid scope key: '${__name}': Cannot contain minus char '-'`;
        }
        r += `var ${__name} = __scope['${__name}'];`;
    }
    // If the scope was cloned, the original will be in $scope. This is important when
    // Using events [on.click], e.g.
    if (typeof __scope.$scope === "undefined") {
        r += "var $scope = __scope;";
    }
    try {
        // console.log(r + '(' + stmt + ')');
        return eval(r + '(' + stmt + ')');
    }
    catch (ex) {
        console.error("cannot eval() stmt: '" + stmt + "': " + ex, " on element ", e, ex, "(context:", __scope, ")");
        throw "eval('" + stmt + "') failed: " + ex;
    }
}
exports.ka_eval = ka_eval;


/***/ }),

/***/ "./node_modules/@kasimirjs/embed/dist/core/query-select.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@kasimirjs/embed/dist/core/query-select.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ka_query_selector = void 0;
/**
 * Query a Element or trigger an Exception
 *
 * @param query
 * @param parent
 * @param exception
 * @return {HTMLElement}
 */
function ka_query_selector(query, parent, exception) {
    if (typeof exception === "undefined")
        exception = `querySelector '${query}' not found`;
    if (typeof parent === "undefined" || parent === null)
        parent = document;
    let e = parent.querySelectorAll(query);
    if (e.length === 0) {
        console.warn(exception, "on parent: ", parent);
        throw exception;
    }
    return e[0];
}
exports.ka_query_selector = ka_query_selector;


/***/ }),

/***/ "./node_modules/@kasimirjs/embed/dist/core/sleep.js":
/*!**********************************************************!*\
  !*** ./node_modules/@kasimirjs/embed/dist/core/sleep.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ka_sleep = void 0;
function ka_sleep(sleepms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            window.setTimeout(() => {
                return resolve();
            }, sleepms);
        });
    });
}
exports.ka_sleep = ka_sleep;


/***/ }),

/***/ "./node_modules/@kasimirjs/embed/dist/core/str-to-camelcase.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@kasimirjs/embed/dist/core/str-to-camelcase.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ka_str_to_camel_case = void 0;
/**
 * Transform any input to CamelCase
 *
 * Example: some-class => someClass
 *
 * @param str {string}
 * @return {string}
 */
function ka_str_to_camel_case(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (ltr, idx) => idx === 0 ? ltr.toLowerCase() : ltr.toUpperCase()).replace(/[^a-zA-Z0-9]+/g, '');
}
exports.ka_str_to_camel_case = ka_str_to_camel_case;


/***/ }),

/***/ "./node_modules/@kasimirjs/embed/dist/decorators/custom-element.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@kasimirjs/embed/dist/decorators/custom-element.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.customElement = void 0;
/**
 * Defines a customElement
 *
 * Usage as class decorator @customElement("some-tag")
 *
 * @param tagName
 */
function customElement(tagName) {
    return function (classOrDescriptor) {
        console.debug("registering custom element", classOrDescriptor, tagName);
        customElements.define(tagName, classOrDescriptor);
        return classOrDescriptor;
    };
}
exports.customElement = customElement;


/***/ }),

/***/ "./node_modules/@kasimirjs/embed/dist/element/KaHtmlElement.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@kasimirjs/embed/dist/element/KaHtmlElement.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KaHtmlElement = void 0;
const template_1 = __webpack_require__(/*! ../tpl/template */ "./node_modules/@kasimirjs/embed/dist/tpl/template.js");
const templatify_1 = __webpack_require__(/*! ../tpl/templatify */ "./node_modules/@kasimirjs/embed/dist/tpl/templatify.js");
const html_1 = __webpack_require__(/*! ../ce/html */ "./node_modules/@kasimirjs/embed/dist/ce/html.js");
class KaHtmlElement extends HTMLElement {
    constructor(shadowRootInit = null) {
        super();
        this.shadowRootInit = shadowRootInit;
        this.addEventListener("load", (e) => console.log(e));
    }
    connectedCallback() {
        return __awaiter(this, void 0, void 0, function* () {
            let htmlTpl;
            if (typeof this.html === "function") {
                let fn = this.html;
                htmlTpl = yield fn(this);
            }
            if (typeof htmlTpl === "string")
                htmlTpl = (0, html_1.ka_html)(htmlTpl);
            let attachTo = this;
            if (this.shadowRootInit !== null) {
                attachTo = this.attachShadow(this.shadowRootInit);
            }
            if (this.html !== null) {
                let tpl = (0, templatify_1.ka_templatify)(htmlTpl);
                this.$tpl = new template_1.KaTemplate(tpl);
                attachTo.appendChild(tpl);
            }
            this.connected();
        });
    }
    disconnectedCallback() {
        return __awaiter(this, void 0, void 0, function* () {
            this.disconnected();
        });
    }
}
exports.KaHtmlElement = KaHtmlElement;


/***/ }),

/***/ "./node_modules/@kasimirjs/embed/dist/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/@kasimirjs/embed/dist/index.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ka_dom_ready = void 0;
__exportStar(__webpack_require__(/*! ./core/sleep */ "./node_modules/@kasimirjs/embed/dist/core/sleep.js"), exports);
__exportStar(__webpack_require__(/*! ./core/create-element */ "./node_modules/@kasimirjs/embed/dist/core/create-element.js"), exports);
var dom_ready_1 = __webpack_require__(/*! ./core/dom-ready */ "./node_modules/@kasimirjs/embed/dist/core/dom-ready.js");
Object.defineProperty(exports, "ka_dom_ready", ({ enumerable: true, get: function () { return dom_ready_1.ka_dom_ready; } }));
__exportStar(__webpack_require__(/*! ./decorators/custom-element */ "./node_modules/@kasimirjs/embed/dist/decorators/custom-element.js"), exports);
__exportStar(__webpack_require__(/*! ./element/KaHtmlElement */ "./node_modules/@kasimirjs/embed/dist/element/KaHtmlElement.js"), exports);


/***/ }),

/***/ "./node_modules/@kasimirjs/embed/dist/tpl/template.js":
/*!************************************************************!*\
  !*** ./node_modules/@kasimirjs/embed/dist/tpl/template.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KaTemplate = void 0;
const eval_js_1 = __webpack_require__(/*! ../core/eval.js */ "./node_modules/@kasimirjs/embed/dist/core/eval.js");
const elwalk_js_1 = __webpack_require__(/*! ../core/elwalk.js */ "./node_modules/@kasimirjs/embed/dist/core/elwalk.js");
const apply_js_1 = __webpack_require__(/*! ../core/apply.js */ "./node_modules/@kasimirjs/embed/dist/core/apply.js");
const custom_element_js_1 = __webpack_require__(/*! ../ce/custom-element.js */ "./node_modules/@kasimirjs/embed/dist/ce/custom-element.js");
class KaTemplate {
    constructor(template) {
        this.template = template;
        if (typeof this.template.__kachilds === "undefined")
            this.template.__kachilds = [];
        if (typeof this.template.__kasibling === "undefined")
            this.template.__kasibling = this.template.nextElementSibling;
        this.__renderCount = 0;
        this.$scope = {};
    }
    _error(msg) {
        console.error(`[ka-template] ${msg} on element`, this.template);
        throw `[ka-template] ${msg} on element` + this.template;
    }
    _appendTemplate() {
        let elements = this.template.content;
        let elList = [];
        for (let curE of elements.children) {
            curE = curE.cloneNode(true);
            curE._ka_maintained_by = this.template.getAttribute("_kaidx");
            elList.push(curE);
            this.template.parentNode.insertBefore(curE, this.template.__kasibling);
        }
        this.template.__kachilds.push(elList);
    }
    _removeLastChild() {
        if (this.template.__kachilds.length === 0)
            return;
        let childs = this.template.__kachilds[this.template.__kachilds.length - 1];
        for (let curE of childs) {
            this.template.parentElement.removeChild(curE);
        }
        this.template.__kachilds.length = this.template.__kachilds.length - 1;
    }
    _renderFor($scope, stmt) {
        //console.log("kachilds", this.template.__kachilds);
        let matches = stmt.match(/^(let)?\s*(?<target>.+)\s+(?<type>of|in|repeat)\s+(?<select>.+)$/);
        if (matches === null) {
            this._error(`Can't parse ka.for='${stmt}'`);
        }
        let selectVal = (0, eval_js_1.ka_eval)(matches.groups.select, $scope, this.template);
        if (matches.groups.type === "repeat") {
            if (typeof selectVal !== "number")
                this._error(`Error ka.for='${stmt}': Selected val must be number in repeat loop`);
            selectVal = new Array(selectVal).fill(null);
        }
        let eIndex = 0;
        for (let index in selectVal) {
            let curScope = Object.assign({ $scope: $scope }, $scope);
            curScope[matches.groups.target] = index;
            if (matches.groups.type === "of")
                curScope[matches.groups.target] = selectVal[index];
            if (this.template.__kachilds.length < eIndex + 1) {
                //console.log("append", eIndex, this.template.__kachilds.length);
                this._appendTemplate();
            }
            this._maintain(curScope, this.template.__kachilds[eIndex], eIndex);
            eIndex++;
        }
        for (let remIdx = eIndex; remIdx < this.template.__kachilds.length;) {
            this._removeLastChild();
        }
    }
    _maintain($scope, childs, forIndex = 0) {
        for (let child of childs) {
            child._ka_for_index = forIndex;
            (0, elwalk_js_1.ka_elwalk)(child, (el) => {
                //console.log("walk", el);
                if (el instanceof HTMLTemplateElement) {
                    //console.log("maintain", el);
                    let r = new this.constructor(el);
                    r.render($scope);
                    return false;
                }
                if (typeof el._ka_maintained_by !== "undefined" && el._ka_maintained_by !== this.template.getAttribute("_kaidx")) {
                    return false;
                }
                (0, apply_js_1.ka_apply)(el, $scope);
                if (el instanceof HTMLElement && (el.hasAttribute("ka.stop") || el instanceof custom_element_js_1.KaCustomElement))
                    return false; // Skip Element rendering
            }, true, true);
        }
    }
    _renderIf($scope, stmt) {
        let selectVal = (0, eval_js_1.ka_eval)(stmt, $scope, this.template);
        if (selectVal === true) {
            if (this.template.__kachilds.length === 0)
                this._appendTemplate();
            this._maintain($scope, this.template.__kachilds[0]);
        }
        else {
            this._removeLastChild();
        }
    }
    /**
     * Remove all rendered element
     */
    dispose() {
        for (; this.template.__kachilds.length > 0;)
            this._removeLastChild();
    }
    /**
     * Render / Update the Template
     *
     * Once the scope in parameter 1 was set, it will render
     * without any parameters. Scope is available via property $scope
     *
     * @param $scope
     */
    render($scope = null) {
        if ($scope === null)
            $scope = this.$scope;
        this.$scope = $scope;
        this.__renderCount++;
        if (this.template.hasAttribute("ka.for")) {
            this._renderFor($scope, this.template.getAttribute("ka.for"));
        }
        else if (this.template.hasAttribute("ka.if")) {
            this._renderIf($scope, this.template.getAttribute("ka.if"));
        }
        else {
            if (typeof this.template._ka_active === "undefined") {
                this._appendTemplate();
                this.template._ka_active = true;
            }
            this._maintain($scope, this.template.__kachilds);
        }
    }
    /**
     * Return true if this template was renderd the first time
     *
     * @returns {boolean}
     */
    isFirstRender() {
        return this.__renderCount === 1;
    }
}
exports.KaTemplate = KaTemplate;
;


/***/ }),

/***/ "./node_modules/@kasimirjs/embed/dist/tpl/templatify.js":
/*!**************************************************************!*\
  !*** ./node_modules/@kasimirjs/embed/dist/tpl/templatify.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ka_templatify = void 0;
const query_select_js_1 = __webpack_require__(/*! ../core/query-select.js */ "./node_modules/@kasimirjs/embed/dist/core/query-select.js");
const elwalk_js_1 = __webpack_require__(/*! ../core/elwalk.js */ "./node_modules/@kasimirjs/embed/dist/core/elwalk.js");
window._ka_el_idx = 0;
/**
 * Generate a renderable Template from <template> Element
 *
 * @param {HTMLElement|string} elem
 * @return {HTMLTemplateElement}
 */
function ka_templatify(elem, returnMode = true) {
    if (typeof elem === "string")
        elem = (0, query_select_js_1.ka_query_selector)(elem);
    if (!(elem instanceof Node)) {
        console.error("[ka-templatify] Parameter 1 is not a html element: ", elem);
        throw `[ka-templify] Parameter 1 is not a html element: ${elem}`;
    }
    if (returnMode) {
        let returnTpl = document.createElement("template");
        returnTpl.setAttribute("_kaidx", (window._ka_el_idx++).toString());
        /* @var {HTMLTemplateElement} returnTpl */
        returnTpl.innerHTML = elem.innerHTML
            .replace(/\[\[(.*?)\]\]/g, (matches, m1) => `<span ka.textContent="${m1}"></span>`);
        ka_templatify(returnTpl.content, false);
        return returnTpl;
    }
    if (elem instanceof HTMLTemplateElement)
        elem = elem.content;
    let wrapElem = (el, attName, attVal) => {
        let tpl = document.createElement("template");
        tpl.setAttribute("_kaidx", (window._ka_el_idx++).toString());
        let clonedEl = el.cloneNode(true);
        clonedEl.removeAttribute(attName);
        tpl.content.append(clonedEl);
        tpl.setAttribute(attName, attVal);
        el.replaceWith(tpl);
        return tpl;
    };
    (0, elwalk_js_1.ka_elwalk)(elem, (el) => {
        //console.log(el);
        if (!el instanceof HTMLElement)
            return;
        let tpl = null;
        for (let attrName of el.getAttributeNames()) {
            if (attrName === "ka.for") {
                tpl = wrapElem(el, "ka.for", el.getAttribute("ka.for"));
                ka_templatify(tpl, false);
                break;
            }
            if (attrName === "ka.if") {
                tpl = wrapElem(el, "ka.if", el.getAttribute("ka.if"));
                ka_templatify(tpl, false);
                break;
            }
        }
    }, true, false);
}
exports.ka_templatify = ka_templatify;


/***/ }),

/***/ "./src/components/leu-content.ts":
/*!***************************************!*\
  !*** ./src/components/leu-content.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LeuContent": () => (/* binding */ LeuContent)
/* harmony export */ });
/* harmony import */ var _kasimirjs_embed__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @kasimirjs/embed */ "./node_modules/@kasimirjs/embed/dist/index.js");
/* harmony import */ var _kasimirjs_embed__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_kasimirjs_embed__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _content_createElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../content/createElement */ "./src/content/createElement.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _LeuContent_selectedElement, _LeuContent_attachElement, _LeuContent_lastElement, _LeuContent_container;


let LeuContent = class LeuContent extends HTMLElement {
    constructor() {
        super(...arguments);
        _LeuContent_selectedElement.set(this, null);
        _LeuContent_attachElement.set(this, null);
        _LeuContent_lastElement.set(this, null);
        _LeuContent_container.set(this, null);
    }
    createElementTree(def) {
        let start = null;
        let leaf = null;
        for (let cur of def.split(">")) {
            let el = (0,_content_createElement__WEBPACK_IMPORTED_MODULE_1__.createElement)(cur);
            if (start === null) {
                start = leaf = el;
            }
            else {
                leaf.appendChild(el);
                leaf = el;
            }
        }
        return { start, leaf };
    }
    parseComment(comment) {
        __classPrivateFieldGet(this, _LeuContent_attachElement, "f").append(comment.cloneNode(true));
        let lines = comment.textContent.split("\n");
        for (let line of lines) {
            line = line.trim();
            if (line === "")
                continue;
            let cmdLine = line.substring(1).trim();
            switch (line.substring(0, 1)) {
                case "/":
                    let elem1 = this.createElementTree(cmdLine);
                    __classPrivateFieldGet(this, _LeuContent_container, "f").appendChild(elem1.start);
                    __classPrivateFieldSet(this, _LeuContent_lastElement, elem1.start, "f");
                    __classPrivateFieldSet(this, _LeuContent_selectedElement, __classPrivateFieldSet(this, _LeuContent_attachElement, elem1.leaf, "f"), "f");
                    break;
                case "!":
                    let tplName = cmdLine.trim().split(" ", 1).join();
                    let variables = (0,_content_createElement__WEBPACK_IMPORTED_MODULE_1__.parseVariableStr)(cmdLine, "$");
                    let tpl = document.querySelector(`template[id='${tplName}']`);
                    if (tpl === null) {
                        console.error("<template id='", tplName, "'> not found. Selected in ", comment);
                        break;
                    }
                    let elemCtl = document.createElement("div");
                    let content = tpl.content.firstElementChild.outerHTML.replaceAll(/\$\{(.*?)(\?(.*?))\}/gi, (a, varName, e, varDefault) => {
                        if (typeof variables[varName] !== "undefined")
                            return variables[varName];
                        return varDefault;
                    });
                    // Replace Tags like --src and --id
                    content = content.replaceAll(/--([a-z]+)=/ig, (a, b) => b + "=");
                    elemCtl.innerHTML = content;
                    __classPrivateFieldGet(this, _LeuContent_attachElement, "f").append(elemCtl);
                    // Execute <script> tags
                    for (let elem of elemCtl.querySelectorAll("script")) {
                        let attrs = {};
                        if (elem.hasAttribute("src")) {
                            attrs = { src: elem.getAttribute("src") };
                        }
                        let e = (0,_kasimirjs_embed__WEBPACK_IMPORTED_MODULE_0__.ka_create_element)("script", attrs);
                        e.append(document.createTextNode(elem.textContent));
                        elem.parentElement.replaceChild(e, elem);
                        //this.#attachElement.append(e);
                    }
                    let attachPoint = elemCtl.querySelector("[attach]");
                    if (attachPoint !== null) {
                        __classPrivateFieldSet(this, _LeuContent_attachElement, attachPoint, "f");
                        __classPrivateFieldSet(this, _LeuContent_selectedElement, attachPoint, "f");
                    }
                    else {
                        console.warn("Template has no attach point", tpl, elemCtl);
                    }
                    break;
                case ">":
                    let elem2 = this.createElementTree(cmdLine);
                    __classPrivateFieldGet(this, _LeuContent_selectedElement, "f").appendChild(elem2.start);
                    __classPrivateFieldSet(this, _LeuContent_attachElement, elem2.leaf, "f");
                    break;
                case "~":
                    let [selector, ...attrMap] = cmdLine.split(":");
                    let attrs = (0,_content_createElement__WEBPACK_IMPORTED_MODULE_1__.parseAttributeStr)(attrMap.join(":"));
                    for (let curElem of Array.from(__classPrivateFieldGet(this, _LeuContent_container, "f").querySelectorAll(selector))) {
                        for (let name in attrs) {
                            curElem.setAttribute(name, attrs[name]);
                        }
                    }
                    break;
                case "?":
                    let elem = __classPrivateFieldGet(this, _LeuContent_lastElement, "f").querySelector(cmdLine);
                    if (elem === null) {
                        console.error(`Query Element '${cmdLine}': not found in `, comment, "in", __classPrivateFieldGet(this, _LeuContent_container, "f"));
                        break;
                    }
                    __classPrivateFieldSet(this, _LeuContent_selectedElement, __classPrivateFieldSet(this, _LeuContent_attachElement, elem, "f"), "f");
                    break;
                case "#": // comment
                    break;
                default:
                    console.error("Cannot parse sequence: " + line + " of block", comment);
                    throw "Cannot parse sequence: " + line;
            }
        }
    }
    connectedCallback() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0,_kasimirjs_embed__WEBPACK_IMPORTED_MODULE_0__.ka_dom_ready)();
            yield (0,_kasimirjs_embed__WEBPACK_IMPORTED_MODULE_0__.ka_sleep)(1);
            __classPrivateFieldSet(this, _LeuContent_container, __classPrivateFieldSet(this, _LeuContent_lastElement, __classPrivateFieldSet(this, _LeuContent_attachElement, __classPrivateFieldSet(this, _LeuContent_selectedElement, (0,_kasimirjs_embed__WEBPACK_IMPORTED_MODULE_0__.ka_create_element)("div", { class: this.getAttribute("class") + " loading" }, []), "f"), "f"), "f"), "f");
            this.parentElement.insertBefore(__classPrivateFieldGet(this, _LeuContent_container, "f"), this.nextElementSibling);
            for (let elem of Array.from(this.childNodes)) {
                if (elem instanceof Comment) {
                    this.parseComment(elem);
                    continue;
                }
                __classPrivateFieldGet(this, _LeuContent_attachElement, "f").append(elem.cloneNode(true));
            }
            yield (0,_kasimirjs_embed__WEBPACK_IMPORTED_MODULE_0__.ka_sleep)(10);
            __classPrivateFieldGet(this, _LeuContent_container, "f").classList.remove("loading");
            this.classList.remove("loading");
            this.style.display = "none";
        });
    }
    ;
    disconnectedCallback() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
};
_LeuContent_selectedElement = new WeakMap(), _LeuContent_attachElement = new WeakMap(), _LeuContent_lastElement = new WeakMap(), _LeuContent_container = new WeakMap();
LeuContent = __decorate([
    (0,_kasimirjs_embed__WEBPACK_IMPORTED_MODULE_0__.customElement)("leu-content")
], LeuContent);



/***/ }),

/***/ "./src/components/leu-data-nav.ts":
/*!****************************************!*\
  !*** ./src/components/leu-data-nav.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LeuDataNav": () => (/* binding */ LeuDataNav)
/* harmony export */ });
/* harmony import */ var _kasimirjs_embed__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @kasimirjs/embed */ "./node_modules/@kasimirjs/embed/dist/index.js");
/* harmony import */ var _kasimirjs_embed__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_kasimirjs_embed__WEBPACK_IMPORTED_MODULE_0__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




let LeuDataNav = class LeuDataNav extends _kasimirjs_embed__WEBPACK_IMPORTED_MODULE_0__.KaHtmlElement {
    constructor() {
        super(...arguments);
        // language=html
        this.html = () => __awaiter(this, void 0, void 0, function* () {
            let inner = this.innerHTML;
            this.innerHTML = "";
            return inner;
        });
    }
    connected() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0,_kasimirjs_embed__WEBPACK_IMPORTED_MODULE_0__.ka_dom_ready)();
            // Allow attaching to any element
            this.style.display = "contents";
            let scope = {
                elements: []
            };
            document.querySelectorAll("[data-leu-nav]").forEach((el) => {
                scope.elements.push({ el: el, title: el.getAttribute("data-leu-nav"), id: el.id, active: false });
            });
            window.addEventListener("scroll", () => __awaiter(this, void 0, void 0, function* () {
                yield (0,_kasimirjs_embed__WEBPACK_IMPORTED_MODULE_0__.ka_sleep)(100);
                let first = false;
                for (let e of scope.elements) {
                    e.active = false;
                    if (e.el.getBoundingClientRect().top + window.scrollY + 10 > window.scrollY && !first) {
                        first = true;
                        e.active = true;
                    }
                }
                this.$tpl.render();
            }), { passive: true });
            this.removeAttribute("hidden");
            this.$tpl.render(scope);
        });
    }
    disconnected() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
};
LeuDataNav = __decorate([
    (0,_kasimirjs_embed__WEBPACK_IMPORTED_MODULE_0__.customElement)("leu-data-nav")
], LeuDataNav);



/***/ }),

/***/ "./src/components/leu-format.ts":
/*!**************************************!*\
  !*** ./src/components/leu-format.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LeuFormat": () => (/* binding */ LeuFormat)
/* harmony export */ });
/* harmony import */ var _kasimirjs_embed__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @kasimirjs/embed */ "./node_modules/@kasimirjs/embed/dist/index.js");
/* harmony import */ var _kasimirjs_embed__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_kasimirjs_embed__WEBPACK_IMPORTED_MODULE_0__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




if (typeof window.LeuFormatConfig === "undefined") {
    window.LeuFormatConfig = {
        "h1": ["fs-2", "text-center", "content-space-2"],
        "h2": ["fs-3", "mt-5"],
        "hr": ["clearboth"],
        "img": ["float-start", "w-lg-50", "w-100", "pt-2", "pb-2", "pe-4"]
    };
}
let LeuFormat = class LeuFormat extends _kasimirjs_embed__WEBPACK_IMPORTED_MODULE_0__.KaHtmlElement {
    constructor() {
        super(...arguments);
        // language=html
        this.html = null;
    }
    connected() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0,_kasimirjs_embed__WEBPACK_IMPORTED_MODULE_0__.ka_dom_ready)();
            yield (0,_kasimirjs_embed__WEBPACK_IMPORTED_MODULE_0__.ka_sleep)(1);
            let config = LeuFormatConfig;
            for (let attr of this.getAttributeNames()) {
                config[attr] = this.getAttribute(attr).split(" ");
            }
            for (let select in config) {
                for (let e of Array.from(this.querySelectorAll(select))) {
                    let classes = config[select];
                    for (let cls of classes) {
                        e.classList.add(cls);
                    }
                }
            }
            let lastContainer = null;
            let i = 0;
            main: do {
                if (this.children.length < i + 1)
                    break;
                let e = this.children[i];
                let container = e.querySelector("[container]");
                if (container !== null) {
                    lastContainer = container;
                    i++;
                    continue;
                }
                if (lastContainer === null) {
                    i++;
                    continue;
                }
                lastContainer.append(e);
            } while (true);
        });
    }
    disconnected() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
};
LeuFormat = __decorate([
    (0,_kasimirjs_embed__WEBPACK_IMPORTED_MODULE_0__.customElement)("leu-format")
], LeuFormat);



/***/ }),

/***/ "./src/content/createElement.ts":
/*!**************************************!*\
  !*** ./src/content/createElement.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createElement": () => (/* binding */ createElement),
/* harmony export */   "parseAttributeStr": () => (/* binding */ parseAttributeStr),
/* harmony export */   "parseVariableStr": () => (/* binding */ parseVariableStr)
/* harmony export */ });
/* harmony import */ var _kasimirjs_embed__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @kasimirjs/embed */ "./node_modules/@kasimirjs/embed/dist/index.js");
/* harmony import */ var _kasimirjs_embed__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_kasimirjs_embed__WEBPACK_IMPORTED_MODULE_0__);

function parseVariableStr(varString, delimiter = "@") {
    let attrs = {};
    let regex = new RegExp(`\\${delimiter}[^${delimiter}]+`, "gi");
    varString.replaceAll(regex, (match) => {
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
function parseAttributeStr(attrString) {
    return parseVariableStr(attrString, "@");
}
function createElement(definition) {
    let defRest = definition.trim();
    let tag = "div";
    defRest = defRest.replace(/^[a-z0-9_\:\-]+/ig, (match) => {
        tag = match;
        return "";
    });
    let attrs = parseAttributeStr(defRest);
    let element = (0,_kasimirjs_embed__WEBPACK_IMPORTED_MODULE_0__.ka_create_element)(tag, attrs);
    return element;
}


/***/ }),

/***/ "./src/helper/smoothscroll.ts":
/*!************************************!*\
  !*** ./src/helper/smoothscroll.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SmoothScroll": () => (/* binding */ SmoothScroll)
/* harmony export */ });
/* harmony import */ var _kasimirjs_embed__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @kasimirjs/embed */ "./node_modules/@kasimirjs/embed/dist/index.js");
/* harmony import */ var _kasimirjs_embed__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_kasimirjs_embed__WEBPACK_IMPORTED_MODULE_0__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class SmoothScroll {
    constructor(offsetTop = 86) {
        window.addEventListener("hashchange", (e) => __awaiter(this, void 0, void 0, function* () {
            console.log(e);
            e.preventDefault();
            yield (0,_kasimirjs_embed__WEBPACK_IMPORTED_MODULE_0__.ka_sleep)(1);
            let elem = document.getElementById(window.location.hash.slice(1));
            if (elem === null)
                return;
            let top = elem.getBoundingClientRect().top + window.scrollY - offsetTop;
            console.log("scrollto", elem, window.location.hash, elem.getBoundingClientRect().top, top);
            window.scrollTo({
                top: top,
                behavior: 'smooth'
            });
        }));
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Leu": () => (/* binding */ Leu)
/* harmony export */ });
/* harmony import */ var _helper_smoothscroll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper/smoothscroll */ "./src/helper/smoothscroll.ts");
/* harmony import */ var _components_leu_data_nav__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/leu-data-nav */ "./src/components/leu-data-nav.ts");
/* harmony import */ var _components_leu_format__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/leu-format */ "./src/components/leu-format.ts");
/* harmony import */ var _components_leu_content__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/leu-content */ "./src/components/leu-content.ts");




const Leu = {
    SmoothScroll: _helper_smoothscroll__WEBPACK_IMPORTED_MODULE_0__.SmoothScroll
};

})();

/******/ })()
;
//# sourceMappingURL=leu-web-components.js.map