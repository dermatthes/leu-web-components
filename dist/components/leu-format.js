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
if (typeof window.LeuFormatConfig === "undefined") {
    window.LeuFormatConfig = {
        "h1": ["fs-2", "text-center", "content-space-2"],
        "h2": ["fs-3", "mt-5"],
        "hr": ["clearboth"],
        "img": ["float-start", "w-lg-50", "w-100", "pt-2", "pb-2", "pe-4"]
    };
}
let LeuFormat = class LeuFormat extends KaHtmlElement {
    constructor() {
        super(...arguments);
        // language=html
        this.html = null;
    }
    connected() {
        return __awaiter(this, void 0, void 0, function* () {
            yield ka_dom_ready();
            yield ka_sleep(1);
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
    customElement("leu-format")
], LeuFormat);
export { LeuFormat };
