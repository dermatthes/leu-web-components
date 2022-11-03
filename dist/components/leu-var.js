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
Object.defineProperty(exports, "__esModule", { value: true });
exports.leuTemplateVariables = void 0;
const embed_1 = require("@kasimirjs/embed");
const functions_1 = require("../helper/functions");
exports.leuTemplateVariables = {};
let LeuVar = class LeuVar extends HTMLElement {
    connectedCallback() {
        return __awaiter(this, void 0, void 0, function* () {
            this.style.display = "none";
            yield (0, embed_1.ka_dom_ready)();
            if ((0, functions_1.isset)(this.dataset.value)) {
                exports.leuTemplateVariables[this.dataset.name] = this.dataset.value;
            }
            if ((0, functions_1.isset)(this.dataset.increment)) {
                if (!(0, functions_1.isset)(exports.leuTemplateVariables[this.dataset.name]))
                    exports.leuTemplateVariables[this.dataset.name] = 0;
                exports.leuTemplateVariables[this.dataset.name]++;
            }
            let comment = new Comment(this.outerHTML);
            this.replaceWith(comment);
        });
    }
};
LeuVar = __decorate([
    (0, embed_1.customElement)("leu-var")
], LeuVar);
