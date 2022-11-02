import {customElement, ka_dom_ready} from "@kasimirjs/embed";
import {isset} from "../helper/functions";

export let leuTemplateVariables = {};

@customElement("leu-var")
class LeuVar extends HTMLElement {
    async connectedCallback() {
        this.style.display = "none";
        await ka_dom_ready();

        if (isset(this.dataset.value)) {
            leuTemplateVariables[this.dataset.name] = this.dataset.value;
        }
        if (isset(this.dataset.increment)) {
            if ( ! isset( leuTemplateVariables[this.dataset.name]))
                leuTemplateVariables[this.dataset.name] = 0;
            leuTemplateVariables[this.dataset.name]++;
        }

        let comment = new Comment(this.outerHTML);
        this.replaceWith(comment);


    }
}
