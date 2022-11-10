var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
KaToolsV1.style.Bootstrap5Modal = class {
    constructor(classes = 'modal-dialog modal-dialog-centered modal-dialog-scrollable') {
        /**
         *
         * @type {HTMLElement}
         */
        let elem = document.createElement("div");
        elem.innerHTML = this.constructor._tpl;
        this.modal = elem.firstElementChild;
        this.modal.querySelector("[area='dialog']").setAttribute("class", classes);
        this._curModal = null;
        /**
         *
         * @type {bootstrap.Modal|null}
         */
        this.bsModal = null;
    }
    setClass(classes = "modal-dialog modal-dialog-centered modal-dialog-scrollable") {
        this.modal.querySelector("[area='dialog']").setAttribute("class", classes);
    }
    /**
     * @return {HTMLTemplateElement}
     */
    open(template) {
        this._curModal = this.modal.cloneNode(true);
        this._curModal.querySelector("[area='content']").appendChild(template);
        document.body.appendChild(this._curModal);
        this.bsModal = new bootstrap.Modal(this._curModal);
        this.bsModal.show();
    }
    dispose() {
        return __awaiter(this, void 0, void 0, function* () {
            this.bsModal.hide();
            yield KaToolsV1.sleep(500);
            document.body.removeChild(this._curModal);
        });
    }
};
KaToolsV1.style.Bootstrap5Modal._tpl = `
<div class="modal fade" tabindex="-1">
  <div class="modal-dialog" area="dialog">
    <div class="modal-content" area="content">
    </div>
  </div>
</div>

`;
