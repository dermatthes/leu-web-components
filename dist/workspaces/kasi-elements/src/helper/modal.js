var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
KaToolsV1.modal = new class {
    constructor() {
        /**
         *
         * @type {}
         * @private
         */
        this._modals = {};
    }
    /**
     * Define a Modal Window
     *
     * <example>
     * KaToolsV1.modal.define("modal1", ($tpl, $args, $resolve, $reject) => {
     *       $tpl.render({
     *           $resolve, $reject, ...$args
     *       })
     * }, KaToolsV1.html``);
     * </example>
     *
     * @param name {string}
     * @param fn {function($tpl : KaToolsV1.Template, $args : {}, $resolve : function(...params), $reject : function(...params))}
     * @param $tpl {HTMLTemplateElement}
     * @param options {{style: *}}
     */
    define(name, fn, $tpl, options = { style: new KaToolsV1.style.Bootstrap5Modal() }) {
        this._modals[name] = { fn, $tpl, options };
    }
    /**
     * Show a Modal
     *
     * @param name
     * @param $args
     * @return {Promise<unknown>}
     */
    show(name, $args = {}) {
        let modal = this._modals[name];
        if (typeof modal === "undefined")
            throw `Undefined modal: '${name}'`;
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let style = modal.options.style;
            let origTpl = modal.$tpl;
            if (modal.$tpl instanceof KaToolsV1.RemoteTemplate)
                origTpl = yield modal.$tpl.load();
            let tpl = KaToolsV1.templatify(origTpl);
            style.open(tpl);
            let $resolve = function () {
                resolve(...arguments);
                style.dispose();
            };
            let $reject = function () {
                reject(...arguments);
                style.dispose();
            };
            modal.fn(...yield KaToolsV1.provider.arguments(modal.fn, {
                $resolve,
                $reject,
                $tpl: new KaToolsV1.Template(tpl),
                $args
            }));
        }));
    }
    showChoose(title, buttons = [{ key: 'ok', text: 'OK' }], content = null) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.show("--choose", {
                title, buttons, content
            });
        });
    }
}();
KaToolsV1.modal.define("--choose", ($tpl, $args, $resolve, $reject) => {
    $tpl.render(Object.assign({ $resolve, $reject }, $args));
}, KaToolsV1.html `
<div class="modal-header">
    <h5 class="modal-title">[[title]]</h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div ka.if="content !== null" class="modal-content" ka.htmlcontent="content">

</div>
<div class="modal-footer">
    <button class="btn" ka.for="let btnIdx in buttons" ka.classlist.btn-primary="btnIdx == 0" ka.classlist.btn-secondary="btnIdx > 0" ka.on.click="$resolve(buttons[btnIdx].key)" >[[buttons[btnIdx].text]]</button>
</div>
`);
