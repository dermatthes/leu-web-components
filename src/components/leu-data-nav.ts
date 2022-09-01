import {KaHtmlElement} from "@kasimirjs/embed/src/element/KaHtmlElement";
import {customElement} from "@kasimirjs/embed/src/decorators/custom-element";
import {ka_dom_ready} from "@kasimirjs/embed/src/core/dom-ready";
import {types} from "sass";
import String = types.String;
import {ka_debounce} from "@kasimirjs/embed/src/core/debounce";
import {ka_sleep} from "@kasimirjs/embed/src/core/sleep";

@customElement("leu-data-nav")
export class LeuDataNav extends KaHtmlElement {


    async connected() {
        await ka_dom_ready();
        // Allow attaching to any element
        this.style.display = "contents";

        let scope = {
            elements: [] as {el: HTMLElement, title: string, id: string, active: boolean}[]
        }

        document.querySelectorAll("[data-leu-nav]").forEach((el : HTMLElement) => {
            scope.elements.push({el: el, title: el.getAttribute("data-leu-nav"), id: el.id, active: false});
        })

        window.addEventListener("scroll", async () => {
            await ka_debounce(100, 100);

            let first = false;
            for(let e of scope.elements) {
                e.active = false;
                if (e.el.getBoundingClientRect().top + window.scrollY + 10 > window.scrollY && ! first) {
                    first = true;
                    e.active = true;
                }

            }
            this.$tpl.render();
        }, {passive: true});
        this.removeAttribute("hidden");
        this.$tpl.render(scope);
    }

    async disconnected() {
    }

    // language=html
    html = async() : Promise<string> => {
        let inner = this.innerHTML;
        this.innerHTML = "";
        return inner;
    };
}
