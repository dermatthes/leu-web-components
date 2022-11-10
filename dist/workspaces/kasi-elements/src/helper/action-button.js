var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
KaToolsV1.ActionButton = class {
    constructor(selector, onclick = null, args = {}, loader = KaToolsV1.html `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`) {
        if (!(selector instanceof HTMLElement))
            selector = KaToolsV1.querySelector(selector);
        /**
         *
         * @type {HTMLElement}
         */
        this.button = selector;
        this._loader = loader.content;
        this._isLoader = false;
        if (onclick !== null) {
            selector.addEventListener("click", (e) => __awaiter(this, void 0, void 0, function* () {
                e.preventDefault();
                onclick(...yield KaToolsV1.getArgs(onclick, Object.assign(Object.assign({}, args), { $event: e, $this: selector })));
            }));
        }
    }
    enable() {
        this.button.removeAttribute("disabled");
        this.loader(false);
    }
    disable(withLoader = true) {
        this.button.setAttribute("disabled", "disabled");
        if (withLoader)
            this.loader();
    }
    loader(active = true) {
        if (active === true) {
            this.button.insertBefore(this._loader.cloneNode(true), this.button.firstChild);
            this._isLoader = true;
        }
        else {
            if (this._isLoader) {
                this._isLoader = false;
                this.button.removeChild(this.button.firstChild);
            }
        }
    }
    ok(msg) {
        this.button.textContent = msg;
    }
};
