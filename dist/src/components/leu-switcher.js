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
import { ka_query_selector } from "@kasimirjs/embed";
import { customElement, ka_dom_ready, ka_sleep } from "@kasimirjs/embed";
import { Leu } from "../index";
let LeuSwitcher = class LeuSwitcher extends HTMLElement {
    constructor() {
        super();
        this._oldHash = null;
        this.progressBarE = null;
        this.content = null;
        /**
         *
         * @type {HTMLHeadingElement}
         */
        this.titleE = null;
        this.nextE = null;
        this.backE = null;
        this.curDivE = null;
        let self = this;
    }
    _selectElement(idx) {
        let e = this.content.children[idx];
        this.curDivE = e;
        this.progressBarE.ariaValueMin = 0;
        this.progressBarE.ariaValueMax = this.content.childElementCount;
        this.progressBarE.ariaValueNow = idx + 1;
        this.progressBarE.style.width = ((idx + 1) / this.content.childElementCount * 100) + "%";
        this.titleE.textContent = e.getAttribute("data-title");
        e.classList.remove(Leu.config.switcher.hiddenClass);
        this.nextE.hidden = false;
        if (idx + 1 === this.content.childElementCount)
            this.nextE.hidden = true;
        this.backE.hidden = false;
        if (idx === 0)
            this.backE.hidden = true;
    }
    _routeChange() {
        return __awaiter(this, void 0, void 0, function* () {
            let hash = window.location.hash.substring(1);
            let found = false;
            for (let i = 0; i < this.content.children.length; i++) {
                let e = this.content.children[i];
                console.log("scan", e);
                e.classList.add(Leu.config.switcher.hiddenClass);
                if (e.id === hash || this.hasAttribute("show-all")) {
                    this._selectElement(i);
                    found = true;
                }
            }
            if (found === false)
                this._selectElement(0);
        });
    }
    next(e = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ka_sleep(500);
            // console.log(this.curDivE.nextElementSibling);
            //location.hash = this.curDivE.nextElementSibling.id;
            if (this.curDivE.nextElementSibling === null)
                return;
            history.pushState(null, null, "#" + this.curDivE.nextElementSibling.id);
            if (e !== null)
                e.preventDefault();
            console.log("next");
            return false;
        });
    }
    backClickCb(e) {
        // console.log(this.curDivE.nextElementSibling);
        //location.hash = this.curDivE.nextElementSibling.id;
        history.pushState(null, null, "#" + this.curDivE.previousElementSibling.id);
        e.preventDefault();
        return false;
    }
    _locationListener() {
        return __awaiter(this, void 0, void 0, function* () {
            if (window.location.hash === this._oldHash) {
                return;
            }
            this._oldHash = window.location.hash;
            yield this._routeChange();
            this.hidden = false; // Show element
        });
    }
    connectedCallback() {
        return __awaiter(this, void 0, void 0, function* () {
            yield ka_dom_ready();
            this.progressBarE = ka_query_selector("[data-leu-role='progress-bar']", this, "data-leu-role='progress-bar'");
            this.content = ka_query_selector("[data-leu-role='content']", this, "data-leu-role='progress-bar'");
            this.titleE = ka_query_selector("[data-leu-role='title']", this, "data-leu-role='title'");
            this.nextE = ka_query_selector("[data-leu-role='next-btn']", this, "data-leu-role='next-btn'");
            this.backE = ka_query_selector("[data-leu-role='back-btn']", this, "data-leu-role='back-btn'");
            this.backE.addEventListener("click", (e) => this.backClickCb(e));
            this.nextE.addEventListener("click", (e) => this.next(e));
            window.setInterval(() => this._locationListener(), 200);
            window.setInterval(() => {
                this.style.height = this.curDivE.offsetHeight + "px";
            }, 500);
            window.addEventListener("pushstate", () => {
                console.log("State pushed");
            });
        });
    }
};
LeuSwitcher = __decorate([
    customElement("leu-switcher"),
    __metadata("design:paramtypes", [])
], LeuSwitcher);
export { LeuSwitcher };
