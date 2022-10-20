import {KaHtmlElement} from "@kasimirjs/embed";
import {customElement} from "@kasimirjs/embed";
import {ka_dom_ready} from "@kasimirjs/embed";

import {ka_sleep} from "@kasimirjs/embed";

declare global {
    var LeuFormatConfig : any;
}

if (typeof window.LeuFormatConfig === "undefined") {
    window.LeuFormatConfig = {
        "h1": ["fs-2", "text-center", "content-space-2"],
        "h2": ["fs-3", "mt-5"],
        "hr": ["clearboth"],
        "img": ["float-start", "w-lg-50", "w-100", "pt-2", "pb-2", "pe-4"]

    }
}


@customElement("leu-format")
export class LeuFormat extends KaHtmlElement {


    async connected() {
        await ka_dom_ready();
        await ka_sleep(1);
        let config = LeuFormatConfig;
        for (let attr of this.getAttributeNames()) {
            config[attr] = this.getAttribute(attr).split(" ");
        }

        for(let select in config) {
            for(let e of Array.from(this.querySelectorAll(select))) {
                let classes = config[select];
                for( let cls of classes) {
                    e.classList.add(cls)
                }
            }
        }

        let lastContainer = null;
        let i = 0;
        main: do {
            if (this.children.length < i + 1)
                break;
            let e = this.children[i];


            let container = e.querySelector("[container]")
            if (container !== null) {
                lastContainer = container;
                i++;
                continue;
            }
            if (lastContainer === null) {
                i++;
                continue;
            }

            lastContainer.append(e);


        } while(true)
    }

    async disconnected() {
    }

    // language=html
    html : any = null;
}
