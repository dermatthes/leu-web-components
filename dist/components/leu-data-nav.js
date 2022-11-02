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
import { KaHtmlElement } from "@kasimirjs/embed";
import { customElement } from "@kasimirjs/embed";
import { ka_dom_ready } from "@kasimirjs/embed";
import { ka_sleep } from "@kasimirjs/embed";
let LeuDataNav = class LeuDataNav extends KaHtmlElement {
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
            yield ka_dom_ready();
            // Allow attaching to any element
            this.style.display = "contents";
            let scope = {
                elements: []
            };
            document.querySelectorAll("[data-leu-nav]").forEach((el) => {
                scope.elements.push({ el: el, title: el.getAttribute("data-leu-nav"), id: el.id, active: false });
            });
            window.addEventListener("scroll", () => __awaiter(this, void 0, void 0, function* () {
                yield ka_sleep(100);
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
    customElement("leu-data-nav")
], LeuDataNav);
export { LeuDataNav };
