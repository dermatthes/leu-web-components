import {customElement} from "@kasimirjs/embed";
import {ka_eval} from "@kasimirjs/embed";

@customElement("leu-show")
class LeuShow extends HTMLElement {

    #listener = null;
    evalIf(e=null) {
        let result = ka_eval(this.dataset.if, this, e, {});
        if (result === true) {
            this.classList.remove(Leu.config.switcher.hiddenClass);
        } else {
            this.classList.remove(Leu.config.switcher.hiddenClass);
        }
    }

    connectedCallback() {
        this.style.display = "contents";

        this.#listener = (e) => this.evalIf(e)
        document.addEventListener("click", this.#listener);
        this.evalIf();
    }

    disconnectedCallback() {
        document.removeEventListener("click", this.#listener);
    }

}
