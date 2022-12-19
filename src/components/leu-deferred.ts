import {customElement, ka_dom_ready, ka_sleep} from "@kasimirjs/embed";
import {isset} from "../helper/functions";

@customElement("leu-deferred")
class LeuDeferred extends HTMLElement {

    async connectedCallback() {
        await ka_dom_ready()
        if (isset(this.dataset.sleep)) {
            await ka_sleep(parseInt(this.dataset.sleep));
        }

    }
}

