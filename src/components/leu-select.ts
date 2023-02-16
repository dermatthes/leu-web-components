import {ka_dom_ready, ka_eval, ka_set_options} from "@kasimirjs/embed";

export let LeuElemFn = {
    "data-leu-options": (e : HTMLSelectElement, val : string) => {
        let data = ka_eval(val, {}, e, {}) as any;
        console.log("options", data);
        ka_set_options(e, data, e.getAttribute("value"));
    }
}

class LeuSelect extends HTMLSelectElement {
    async connectedCallback() {
        await ka_dom_ready();
        console.log("leu-elem init", this);
        for (let attrName in LeuElemFn) {
            let val = this.getAttribute(attrName);
            if (val === null) {
                continue;
            }
            LeuElemFn[attrName](this, val);
        }
    }
}

customElements.define("leu-select", LeuSelect, {extends: "select"});
