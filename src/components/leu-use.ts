import {customElement, ka_dom_ready, ka_sleep} from "@kasimirjs/embed";
import {ka_query_selector} from "@kasimirjs/embed";
import {leuTemplateVariables} from "./leu-var";


@customElement("leu-use")
class LeuUse extends HTMLElement {

    async connectedCallback() {
        this.style.display = "contents"
        await ka_dom_ready();
        await ka_sleep(1);
        let id = this.dataset.tplId;
        let tpl = ka_query_selector("template[id='" + id + "']", null, "leu-use: template with id '" + id + "' not found") as HTMLTemplateElement;

        // Import Variable from <leu-var data-name="" data-value=""></leu-val>
        let variables = {...leuTemplateVariables, ...this.dataset}
        console.log(variables);

        let content = tpl.content.firstElementChild.outerHTML.replace(/\$\{(.*?)(\?(.*?))?}/gi, (a, varName, e, varDefault) => {
            if (typeof variables[varName] !== "undefined")
                return variables[varName];
            if (typeof varDefault === "undefined")
                console.error(`[<leu-use>] Data-Attribute missing: 'data-${varName}' on <template id="${id}>" called by <leu-use></leu-use>`, this);
            return varDefault;
        });
        content = content.replace(/([a-z\-]+)--=(["'])/ig, (a, b, c) => b + "=" + c);




        let origContent = this.innerHTML;

        // Replace Tags like --src and --id
        let wrapper = document.createElement("div");
        wrapper.innerHTML = content;
        let attachElem = wrapper.querySelector("*[attach]");
        if (attachElem !== null)
            attachElem.innerHTML = origContent;

        wrapper.childNodes.forEach((el) => this.parentElement.insertBefore(el, this.nextElementSibling));
        let comment = new Comment(this.outerHTML)
        this.replaceWith(comment);


    }
}
