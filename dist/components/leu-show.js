var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _LeuShow_listener;
import { customElement } from "@kasimirjs/embed";
import { ka_eval } from "@kasimirjs/embed/dist/core/eval";
let LeuShow = class LeuShow extends HTMLElement {
    constructor() {
        super(...arguments);
        _LeuShow_listener.set(this, null);
    }
    evalIf(e = null) {
        let result = ka_eval(this.dataset.if, this, e, {});
        if (result === true) {
            this.classList.remove(Leu.config.switcher.hiddenClass);
        }
        else {
            this.classList.remove(Leu.config.switcher.hiddenClass);
        }
    }
    connectedCallback() {
        this.style.display = "contents";
        __classPrivateFieldSet(this, _LeuShow_listener, (e) => this.evalIf(e), "f");
        document.addEventListener("click", __classPrivateFieldGet(this, _LeuShow_listener, "f"));
        this.evalIf();
    }
    disconnectedCallback() {
        document.removeEventListener("click", __classPrivateFieldGet(this, _LeuShow_listener, "f"));
    }
};
_LeuShow_listener = new WeakMap();
LeuShow = __decorate([
    customElement("leu-show")
], LeuShow);
