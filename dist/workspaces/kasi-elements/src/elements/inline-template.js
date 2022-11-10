var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
customElements.define("ka-inline-template", class extends HTMLElement {
    constructor() {
        super();
        this._interval = null;
    }
    /**
     *
     * @returns {Promise<KaToolsV1.Template>}
     * @private
     */
    _loadTemplate() {
        return __awaiter(this, void 0, void 0, function* () {
            let template = this;
            if (this.hasAttribute("src")) {
                template = yield KaToolsV1.loadHtml(this.getAttribute("src"));
            }
            let renderTpl = KaToolsV1.templatify(template);
            this.innerHTML = "";
            this.appendChild(renderTpl);
            return new KaToolsV1.Template(renderTpl);
        });
    }
    _loadScope() {
        return __awaiter(this, void 0, void 0, function* () {
            let scope = {};
            if (this.hasAttribute("init-scope")) {
                // Wrap attribute into async method
                let scopeInit = KaToolsV1.eval(`async() => { return ${this.getAttribute("init-scope")} }`, { $this: this }, this);
                scope = yield scopeInit();
            }
            scope.$this = this;
            return scope;
        });
    }
    connectedCallback() {
        return __awaiter(this, void 0, void 0, function* () {
            yield KaToolsV1.domReady();
            let tpl = yield this._loadTemplate();
            let scope = yield this._loadScope();
            if (this.hasAttribute("interval")) {
                this._interval = window.setInterval(() => __awaiter(this, void 0, void 0, function* () {
                    let scope = yield this._loadScope();
                    // If element is marked as hidden - remove hidden
                    if (this.hasAttribute("hidden"))
                        this.removeAttribute("hidden");
                    tpl.render(scope);
                }), parseInt(this.getAttribute("interval")));
            }
            // If element is marked as hidden - remove hidden
            if (this.hasAttribute("hidden"))
                this.removeAttribute("hidden");
            tpl.render(scope);
        });
    }
    disconnectedCallback() {
        window.clearInterval(this._interval);
    }
});
