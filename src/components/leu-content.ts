import {customElement, ka_create_element, ka_sleep, KaHtmlElement} from "@kasimirjs/embed";
import {createElement, parseAttributeStr} from "../content/createElement";

@customElement("leu-content")
export class LeuContent extends HTMLElement {
    #selectedElement : HTMLElement = null;
    #attachElement : HTMLElement = null;
    #lastElement : HTMLElement = null;
    #container: HTMLElement = null;

    private createElementTree (def : string) : {start: HTMLElement, leaf: HTMLElement} {

        let start : HTMLElement = null;
        let leaf : HTMLElement = null;
        for(let cur of def.split(">")) {
            let el = createElement(cur);
            if (start === null) {
                start = leaf = el;
            } else {
                leaf.appendChild(el);
                leaf = el;
            }
        }
        return {start, leaf};
    }

    private parseComment(comment: Comment) {
        this.#attachElement.append(comment.cloneNode(true));
        let lines = comment.textContent.split("\n");
        for(let line of lines) {
            line = line.trim();
            if (line === "")
                continue;
            let cmdLine = line.substring(1).trim();
            switch (line.substring(0,1)) {
                case "/":
                    let elem1 = this.createElementTree(cmdLine);
                    this.#container.appendChild(elem1.start);
                    this.#lastElement = elem1.start;
                    this.#selectedElement = this.#attachElement = elem1.leaf;
                    break;

                case ">":
                    let elem2 = this.createElementTree(cmdLine);
                    this.#selectedElement.appendChild(elem2.start);
                    this.#attachElement = elem2.leaf;
                    break;

                case "~":
                    let [selector, ...attrMap] = cmdLine.split(":");
                    let attrs = parseAttributeStr(attrMap.join(":"));
                    for (let curElem of Array.from(this.querySelectorAll(selector))) {
                        for (let name in attrs) {
                            curElem.setAttribute(name, attrs[name]);
                        }
                    }
                    break;

                case "?":
                    let elem : HTMLElement = this.#container.querySelector(cmdLine);
                    if (elem === null) {
                        console.error(`Query Element '${cmdLine}': not found in `,  comment, "in", this.#container);
                        break;
                    }
                    this.#selectedElement = this.#attachElement = elem;
                    break;

                case "#": // comment
                    break;

                default:
                    console.error("Cannot parse sequence: " + line + " of block", comment);
                    throw "Cannot parse sequence: " + line;

            }
        }
    }

    async connectedCallback() {
        this.style.display = "none";

        await ka_sleep(1);
        this.#container = this.#lastElement = this.#attachElement = this.#selectedElement = ka_create_element("div", null, []);

        this.parentElement.insertBefore(this.#container, this.nextElementSibling);



        for (let elem of Array.from(this.childNodes)) {
            if (elem instanceof Comment) {
                this.parseComment(elem);
                continue;
            }
            this.#attachElement.append(elem.cloneNode(true));

        }

    };



    async disconnectedCallback() {

    }



}
