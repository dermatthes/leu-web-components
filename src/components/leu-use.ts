import {customElement, ka_dom_ready} from "@kasimirjs/embed";
import {ka_query_selector} from "@kasimirjs/embed/dist/core/query-select";


@customElement("leu-use")
class LeuUse extends HTMLElement {

    async connectedCallback() {
        this.style.display = "contents"
        await ka_dom_ready();
        let id = this.dataset.tplId;
        let tpl = ka_query_selector("template[id='" + id + "']", null, "leu-use: template with id '" + id + "' not found") as HTMLTemplateElement;

        let content = tpl.content.firstElementChild.outerHTML.replace(/\$\{(.*?)(\?(.*?))?}/gi, (a, varName, e, varDefault) => {
            if (typeof this.dataset[varName] !== "undefined")
                return this.dataset[varName];
            return varDefault;
        });

        let origContent = this.innerHTML;

        // Replace Tags like --src and --id
        content = content.replace(/--([a-z\-]+)=/ig, (a, b) => b + "=");
        this.innerHTML = content;
        let attachElem = this.querySelector("*[attach]");
        if (attachElem !== null)
            attachElem.innerHTML = origContent;
    }
}
