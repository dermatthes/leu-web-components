"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _LeuContent_selectedElement, _LeuContent_attachElement, _LeuContent_lastElement, _LeuContent_container, _LeuContent_refs, _LeuContent_curAttrMap;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeuContent = void 0;
const embed_1 = require("@kasimirjs/embed");
const createElement_1 = require("../content/createElement");
const functions_1 = require("../helper/functions");
let defaultAttrMap = {};
let LeuContent = class LeuContent extends HTMLElement {
    constructor() {
        super(...arguments);
        _LeuContent_selectedElement.set(this, null);
        _LeuContent_attachElement.set(this, null);
        _LeuContent_lastElement.set(this, null);
        _LeuContent_container.set(this, null);
        _LeuContent_refs.set(this, new Map);
        _LeuContent_curAttrMap.set(this, Object.assign({}, defaultAttrMap));
    }
    createElementTree(def) {
        let start = null;
        let leaf = null;
        for (let cur of def.split(">")) {
            let refName = null;
            cur = cur.replace(/§([a-z0-9_\-]+)/, (a, name) => {
                refName = name;
                return "";
            });
            let el = (0, createElement_1.createElement)(cur);
            if (refName !== null)
                __classPrivateFieldGet(this, _LeuContent_refs, "f")[refName] = el;
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
                    __classPrivateFieldSet(this, _LeuContent_curAttrMap, Object.assign({}, defaultAttrMap), "f"); // Reset Attribute map to default as clone
                    break;
                case "!":
                    let tplName = cmdLine.trim().split(" ", 1).join();
                    let variables = (0, createElement_1.parseVariableStr)(cmdLine, "$");
                    let tpl = document.querySelector(`template[id='${tplName}']`);
                    if (tpl === null) {
                        console.error("<template id='", tplName, "'> not found. Selected in ", comment);
                        break;
                    }
                    let elemCtl = document.createElement("div");
                    let content = tpl.content.firstElementChild.outerHTML.replace(/\$\{(.*?)(\?(.*?))?\}/gi, (a, varName, e, varDefault) => {
                        if (typeof variables[varName] !== "undefined")
                            return variables[varName];
                        return varDefault;
                    });
                    // Replace Tags like --src and --id
                    content = content.replace(/--([a-z\-]+)=/ig, (a, b) => b + "=");
                    elemCtl.innerHTML = content;
                    __classPrivateFieldGet(this, _LeuContent_attachElement, "f").append(elemCtl);
                    // Execute <script> tags
                    for (let elem of elemCtl.querySelectorAll("script")) {
                        let attrs = {};
                        if (elem.hasAttribute("src")) {
                            attrs = { src: elem.getAttribute("src") };
                        }
                        let e = (0, embed_1.ka_create_element)("script", attrs);
                        e.append(document.createTextNode(elem.textContent));
                        elem.parentElement.replaceChild(e, elem);
                        //this.#attachElement.append(e);
                    }
                    let attachPoints = elemCtl.querySelectorAll("[attach]");
                    for (let attachPoint of attachPoints) {
                        if (attachPoint.getAttribute("attach") === "") {
                            __classPrivateFieldSet(this, _LeuContent_attachElement, attachPoint, "f");
                            __classPrivateFieldSet(this, _LeuContent_selectedElement, attachPoint, "f");
                        }
                        else {
                            __classPrivateFieldGet(this, _LeuContent_refs, "f")[attachPoint.getAttribute("attach")] = attachPoint;
                        }
                    }
                    if (attachPoints.length === 0) {
                        console.warn("Template has no attach point", tpl, elemCtl);
                    }
                    break;
                case ">":
                    let elem2 = this.createElementTree(cmdLine);
                    __classPrivateFieldGet(this, _LeuContent_selectedElement, "f").appendChild(elem2.start);
                    __classPrivateFieldSet(this, _LeuContent_attachElement, elem2.leaf, "f");
                    break;
                case "~":
                    let [selector, ...attrMap] = cmdLine.split("=>");
                    let attrs = (0, createElement_1.parseAttributeStr)(attrMap.join(":"));
                    __classPrivateFieldGet(this, _LeuContent_curAttrMap, "f")[selector] = { attrs, line };
                    break;
                case "?":
                    let elem = null;
                    if (cmdLine.startsWith("§")) {
                        elem = __classPrivateFieldGet(this, _LeuContent_refs, "f")[cmdLine.substring(1)];
                        if (!(0, functions_1.isset)(elem)) {
                            console.error("Cannot select reference: '" + line + "': Not found");
                            break;
                        }
                    }
                    else {
                        elem = __classPrivateFieldGet(this, _LeuContent_lastElement, "f").querySelector(cmdLine);
                        if (elem === null) {
                            console.error(`Query Element '${cmdLine}': not found in `, comment, "in", __classPrivateFieldGet(this, _LeuContent_container, "f"));
                            break;
                        }
                    }
                    __classPrivateFieldSet(this, _LeuContent_selectedElement, __classPrivateFieldSet(this, _LeuContent_attachElement, elem, "f"), "f");
                    break;
                case "#": // comment
                case "*":
                    break;
                default:
                    console.error("Cannot parse sequence: " + line + " of block", comment);
                    throw "Cannot parse sequence: " + line;
            }
        }
    }
    /**
     * Apply XPath ~
     *
     * @param el
     * @private
     */
    applyAttMap(el) {
        let appEl = document.createElement("div");
        appEl.append(el);
        for (let attrMapSelector in __classPrivateFieldGet(this, _LeuContent_curAttrMap, "f")) {
            try {
                let result = appEl.querySelectorAll(attrMapSelector);
                for (let curElement of Array.from(result)) {
                    for (let attName in __classPrivateFieldGet(this, _LeuContent_curAttrMap, "f")[attrMapSelector].attrs) {
                        curElement.setAttribute(attName, __classPrivateFieldGet(this, _LeuContent_curAttrMap, "f")[attrMapSelector].attrs[attName]);
                    }
                }
            }
            catch (e) {
                console.error("Cannot evaluate: '" + __classPrivateFieldGet(this, _LeuContent_curAttrMap, "f")[attrMapSelector].line + "' - ", e);
                continue;
            }
        }
    }
    connectedCallback() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, embed_1.ka_dom_ready)();
            yield (0, embed_1.ka_sleep)(1);
            if (!this.hasAttribute("default")) {
                // Wait for defaults
                yield (0, embed_1.ka_sleep)(1);
            }
            __classPrivateFieldSet(this, _LeuContent_curAttrMap, Object.assign({}, defaultAttrMap), "f"); // Reset Attribute map to default as clone
            __classPrivateFieldSet(this, _LeuContent_container, __classPrivateFieldSet(this, _LeuContent_lastElement, __classPrivateFieldSet(this, _LeuContent_attachElement, __classPrivateFieldSet(this, _LeuContent_selectedElement, (0, embed_1.ka_create_element)("div", { class: this.getAttribute("class") + " loading" }, []), "f"), "f"), "f"), "f");
            this.parentElement.insertBefore(__classPrivateFieldGet(this, _LeuContent_container, "f"), this.nextElementSibling);
            for (let elem of Array.from(this.childNodes)) {
                if (elem instanceof Comment) {
                    this.parseComment(elem);
                    continue;
                }
                let clone = elem.cloneNode(true);
                this.applyAttMap(clone);
                __classPrivateFieldGet(this, _LeuContent_attachElement, "f").append(clone);
            }
            if (this.hasAttribute("default")) {
                // Register defaults
                defaultAttrMap = __classPrivateFieldGet(this, _LeuContent_curAttrMap, "f");
                console.debug("Register default attribute map: ", defaultAttrMap, "from", this);
            }
            yield (0, embed_1.ka_sleep)(10);
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
_LeuContent_selectedElement = new WeakMap(), _LeuContent_attachElement = new WeakMap(), _LeuContent_lastElement = new WeakMap(), _LeuContent_container = new WeakMap(), _LeuContent_refs = new WeakMap(), _LeuContent_curAttrMap = new WeakMap();
LeuContent = __decorate([
    (0, embed_1.customElement)("leu-content")
], LeuContent);
exports.LeuContent = LeuContent;
