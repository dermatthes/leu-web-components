var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
import { customElement, ka_create_element, ka_dom_ready, ka_sleep } from "@kasimirjs/embed";
import { triggerError } from "../helper/functions";
const defaultModalTemplate = `
<div class="modal-backdrop fade"></div>
<div class="modal fade d-block" tabindex="-1" data-leu-dismiss="modal" >

    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">%%title%%</h5>
                <button type="button" class="btn-close" data-leu-dismiss="modal" aria-label="Schließen"></button>
            </div>
            <div class="modal-body">
                %%body%%
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-leu-dismiss="modal">Schließen</button>
            </div>
        </div>
    </div>
</div>
`;
let LeuModal = class LeuModal extends HTMLElement {
    constructor() {
        super();
        this.origOverflow = "";
        this.oldUrl = window.location.href.split("#")[0];
    }
    show() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let title = (_a = this.getAttribute("data-leu-title")) !== null && _a !== void 0 ? _a : "Unnamed [data-leu-title]";
            let template = this.getAttribute("data-leu-template");
            let classes = this.getAttribute("data-leu-class");
            let content = defaultModalTemplate;
            if (template !== null)
                content = (_b = document.querySelector(template)) === null || _b === void 0 ? void 0 : _b.innerHTML;
            if (content === null)
                triggerError("leu-modal", `template-selector in data-leu-template '${template}' not found`);
            this.origOverflow = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            content = content.replace("%%title%%", title)
                .replace("%%body%%", this.innerHTML)
                .replace("%%classes%%", classes);
            this.showElement.innerHTML = content;
            yield ka_sleep(10);
            this.showElement.querySelectorAll(".fade").forEach((e) => e.classList.add("show"));
        });
    }
    hide() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.showElement.innerHTML === "")
                return;
            document.body.style.overflow = this.origOverflow;
            this.showElement.querySelectorAll(".fade").forEach((e) => e.classList.remove("show"));
            yield ka_sleep(200);
            this.showElement.innerHTML = "";
        });
    }
    checkHref(e) {
        if (window.location.hash === "#" + this.getAttribute("id")) {
            if (e)
                this.oldUrl = e.oldURL;
            this.show();
        }
        else {
            this.hide();
        }
    }
    connectedCallback() {
        return __awaiter(this, void 0, void 0, function* () {
            this.style.display = "none";
            yield ka_dom_ready();
            yield ka_sleep(1);
            this.showElement = ka_create_element("div", { "owner": "leu-modal" });
            document.body.append(this.showElement);
            this.showElement.addEventListener("click", (e) => {
                let target = e.target;
                if (target.hasAttribute("data-leu-dismiss")) {
                    // Push History (don't use history.back() - it will fail if the page was opend with anchor)
                    history.pushState({}, "", this.oldUrl);
                    this.hide();
                }
            });
            window.addEventListener("hashchange", (e) => this.checkHref(e));
            this.checkHref(null);
        });
    }
    disconnectedCallback() {
        return __awaiter(this, void 0, void 0, function* () {
            window.removeEventListener("hashchange", this.checkHref);
            this.showElement.remove();
        });
    }
};
LeuModal = __decorate([
    customElement("leu-modal"),
    __metadata("design:paramtypes", [])
], LeuModal);
