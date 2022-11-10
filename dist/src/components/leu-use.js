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
import { customElement, ka_dom_ready, ka_sleep } from "@kasimirjs/embed";
import { ka_query_selector } from "@kasimirjs/embed";
import { leuTemplateVariables } from "./leu-var";
let LeuUse = class LeuUse extends HTMLElement {
    connectedCallback() {
        return __awaiter(this, void 0, void 0, function* () {
            this.style.display = "contents";
            yield ka_dom_ready();
            yield ka_sleep(1);
            let id = this.dataset.tplId;
            let tpl = ka_query_selector("template[id='" + id + "']", null, "leu-use: template with id '" + id + "' not found");
            // Import Variable from <leu-var data-name="" data-value=""></leu-val>
            let variables = Object.assign(Object.assign({}, leuTemplateVariables), this.dataset);
            console.log(variables);
            let content = tpl.content.firstElementChild.outerHTML.replace(/\$\{(.*?)(\?(.*?))?}/gi, (a, varName, e, varDefault) => {
                if (typeof variables[varName] !== "undefined")
                    return variables[varName];
                if (typeof varDefault === "undefined")
                    console.error(`[<leu-use>] Data-Attribute missing: 'data-${varName}' on <template id="${id}>" called by <leu-use></leu-use>`, this);
                return varDefault;
            });
            content = content.replace(/([a-z\-]+)--=(["'])/ig, (a, b, c) => b + "=" + c);
            let origContent = this.innerHTML;
            // Replace Tags like --src and --id
            let wrapper = document.createElement("div");
            wrapper.innerHTML = content;
            let attachElem = wrapper.querySelector("*[attach]");
            if (attachElem !== null)
                attachElem.innerHTML = origContent;
            wrapper.childNodes.forEach((el) => this.parentElement.insertBefore(el, this.nextElementSibling));
            let comment = new Comment(this.outerHTML);
            this.replaceWith(comment);
        });
    }
};
LeuUse = __decorate([
    customElement("leu-use")
], LeuUse);
