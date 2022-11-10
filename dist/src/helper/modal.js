var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ka_sleep, KaModal } from "@kasimirjs/embed";
import { triggerError } from "./functions";
class LeuModal extends KaModal {
    constructor(template) {
        super();
        this.html = ``;
        this.html = template;
        this.element.addEventListener("click", (e) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            let target = e.target;
            if (!target.hasAttribute("data-leu-dismiss"))
                return;
            (_a = this.element.querySelector(".fade")) === null || _a === void 0 ? void 0 : _a.classList.remove("show");
            yield ka_sleep(200);
            this.resolve("dismiss");
        }));
    }
}
export function modal(contentSelector, templateSelector = "#modal-default") {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let contentData;
        let contentTitle = "Unnamed [unset data-leu-title]";
        let tplData;
        if (contentSelector.startsWith("#")) {
            let tpl = document.querySelector(contentSelector);
            contentData = tpl.innerHTML;
            contentTitle = tpl.getAttribute("data-leu-title");
        }
        else {
            contentData = yield (yield fetch(contentSelector)).text();
        }
        if (templateSelector !== null) {
            let template = document.querySelector(templateSelector);
            if (template === null) {
                triggerError("leu-modal", "templateSelector " + templateSelector + " not found");
            }
            tplData = template.innerHTML.replace("%%title%%", contentTitle).replace("%%body%%", contentData);
        }
        let modal = new LeuModal(tplData);
        history.pushState({ modal: true }, "Modal open", "");
        let listener = () => {
            console.log("popstate");
            modal.resolve();
        };
        window.addEventListener("popstate", listener);
        modal.render({});
        let promise = modal.show().then((arg) => {
            window.removeEventListener("popstate", listener);
        });
        yield ka_sleep(10);
        (_a = modal.element.querySelector(".fade")) === null || _a === void 0 ? void 0 : _a.classList.add("show");
    });
}
