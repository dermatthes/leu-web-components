import {
    customElement,
    ka_create_element,
    ka_dom_ready,
    ka_eval,
    ka_sleep,
    KaHtmlElement,
    KaModal
} from "@kasimirjs/embed";
import {createElement, parseAttributeStr, parseVariableAndStyleStr, parseVariableStr} from "../content/createElement";
import {isset} from "../helper/functions";
import {leuTemplateVariables} from "./leu-var";
import * as events from "events";
import {LeuModal} from "./leu-modal";

let defaultAttrMap = {};

let elementIndex = 0;

@customElement("leu-content")
export class LeuContent extends HTMLElement {
    #selectedElement : HTMLElement = null;
    #attachElement : HTMLElement = null;
    #lastElement : HTMLElement = null;
    #container: HTMLElement = null;
    #curContainer: HTMLElement = null;

    #refs : Map<string, HTMLElement> = new Map;
    #curAttrMap: Object = {...defaultAttrMap};



    private async createElementTree (def : string) : Promise<{start: HTMLElement, leaf: HTMLElement}> {

        let start : HTMLElement = null;
        let leaf : HTMLElement = null;



        let splitted = def.split(">");
        while(splitted.length > 0) {
            let cur = splitted.shift();

            let refName = null;
            cur = cur.replace(/§([a-z0-9_\-]+)/, (a, name) => {
                refName = name;
                return "";
            });


            if (cur.trim().startsWith("|")) {
                // TextNode
                let el = document.createElement("div");
                if (splitted.length > 0)
                    cur += ">" + splitted.join(">");

                el.innerHTML = cur.trim().substring(1);
                el.childNodes.forEach((e) => leaf.append(e.cloneNode(true)));
                el.remove();
                break;
            }

            let el = createElement(cur);

            if (refName !== null)
                this.#refs[refName] = el;

            if (start === null) {
                start = leaf = el;
            } else {
                leaf.appendChild(el);
                leaf = el;
            }
        }
        return {start, leaf};
    }

    private async parseComment(comment: Comment) {
        this.#attachElement.append(comment.cloneNode(true));
        let lines = comment.textContent.split("\n");
        for(let line of lines) {
            line = line.trim();
            if (line === "")
                continue;
            await ka_sleep(1);

            let cmdLine = line.substring(1).trim();
            switch (line.substring(0,1)) {
                case "/":
                    let elem1 = await this.createElementTree(cmdLine);
                    this.#curContainer.appendChild(elem1.start);
                    this.#lastElement = elem1.start;
                    this.#selectedElement = this.#attachElement = elem1.leaf;
                    this.#curAttrMap = {...defaultAttrMap}; // Reset Attribute map to default as clone
                    break;

                case "!":
                    let tplName = cmdLine.trim().split(" ", 1).join();
                    let varAndStyle = parseVariableAndStyleStr(cmdLine);


                    let tpl :HTMLTemplateElement = document.querySelector(`template[id='${tplName}']`);
                    if (tpl === null) {
                        console.error("<template id='", tplName, "'> not found. Selected in ", comment);
                        break;
                    }


                    let elemCtl : any = document.createElement("div");
                    if (Object.keys(varAndStyle["@"]).length === 0) {
                        elemCtl.style.display = "contents";
                    } else {
                        for(let attrName in varAndStyle["@"]) {
                            elemCtl.setAttribute(attrName, varAndStyle["@"][attrName]);
                        }
                    }


                    let content = tpl.innerHTML.replace(/\$\{(.*?)(\?(.*?))?\}/gi, (a, varName, e, varDefault) => {
                        if (typeof varAndStyle["$"][varName] !== "undefined")
                            return varAndStyle["$"][varName];
                        if (typeof leuTemplateVariables[varName] !== "undefined" )
                            return leuTemplateVariables[varName]
                        return varDefault;
                    });

                    // Replace Tags like --src and --id
                    content = content.replace(/([a-z\-]+)--=/ig, (a, b) => b + "=");

                    elemCtl.innerHTML = content;

                    this.#attachElement.append(elemCtl);

                    // Execute <script> tags
                    for(let elem of elemCtl.querySelectorAll("script")) {
                        let attrs = {};
                        if (elem.hasAttribute("src")) {
                            attrs = {src: elem.getAttribute("src")}
                        }
                        let e = ka_create_element("script", attrs);
                        e.append(document.createTextNode(elem.textContent));
                        elem.parentElement.replaceChild(e, elem);
                        //this.#attachElement.append(e);
                    }

                    let attachPoints = elemCtl.querySelectorAll("[attach]");
                    for (let attachPoint of attachPoints) {
                        if (attachPoint.getAttribute("attach") === "") {
                            this.#attachElement = attachPoint;
                            this.#selectedElement = attachPoint;
                        } else {
                            this.#refs[attachPoint.getAttribute("attach")] = attachPoint;
                        }
                    }
                    if (attachPoints.length === 0) {
                        console.warn("Template has no attach point", tpl, elemCtl)
                    }
                    break;

                case ">":
                    let elem2 = await this.createElementTree(cmdLine);
                    this.#selectedElement.appendChild(elem2.start);
                    this.#attachElement = elem2.leaf;
                    break;

                case "~":

                    let [selector, ...attrMap] = cmdLine.split("=>");
                    let attrs = parseAttributeStr(attrMap.join(":"));
                    this.#curAttrMap[selector] = {attrs, line};
                    break;

                case "?":
                    let elem: HTMLElement = null;
                    let isMoveContainer = false;
                    if (cmdLine.indexOf("***") !== -1) {
                        isMoveContainer = true;
                        cmdLine = cmdLine.replace("***", "");
                    }
                    cmdLine = cmdLine.trim();
                    if (cmdLine.startsWith("/")) {
                        elem = this.#container;
                    } else if (cmdLine.trim() === "§§") {
                        elem = this.#attachElement;
                    } else if (cmdLine.startsWith("§")) {
                        elem = this.#refs[cmdLine.substring(1)];
                        if (!isset(elem)) {
                            console.error(`Cannot select reference: '§${cmdLine.substring(1)}': Not defined in` + line, comment);
                            break;
                        }
                    } else if (cmdLine.trim() === "*") {
                        elem = this.#curContainer
                    } else {
                        elem = this.#lastElement.querySelector(cmdLine);
                        if (elem === null) {
                            console.error(`Query Element '${cmdLine}': not found in `, comment, "in", this.#container);
                            break;
                        }
                    }
                    this.#selectedElement = this.#attachElement = elem;
                    if (isMoveContainer)
                        this.#curContainer = elem;
                    break;

                case "#": // comment
                case "*":
                    break;

                default:
                    console.error("Cannot parse sequence: " + line + " of block", comment);
                    throw "Cannot parse sequence: " + line;

            }
        }
    }


    /**
     * Apply XPath ~
     *
     * @param el
     * @private
     */
    private applyAttMap(el : HTMLElement) {
        let appEl = document.createElement("div");
        appEl.append(el);
        for (let attrMapSelector in this.#curAttrMap) {

            try {
                let result = appEl.querySelectorAll(attrMapSelector)
                for (let curElement of Array.from(result)) {
                    for(let attName in this.#curAttrMap[attrMapSelector].attrs) {
                        curElement.setAttribute(attName, this.#curAttrMap[attrMapSelector].attrs[attName]);
                    }
                }
            } catch (e) {
                console.error("Cannot evaluate: '" + this.#curAttrMap[attrMapSelector].line + "' - ", e);
                continue;
            }

        }
    }

    async connectedCallback() {
        // await ka_dom_ready(); Skip DomReady to speedup the process
        await ka_sleep(1);
        if ( ! this.hasAttribute("default")) {
            // Wait for defaults
            await ka_sleep(1);
        }


        this.#curAttrMap = {...defaultAttrMap}; // Reset Attribute map to default as clone
        this.#container = this.#curContainer = this.#lastElement = this.#attachElement = this.#selectedElement = ka_create_element("div", {class: this.getAttribute("class") + " loading"}, []);

        this.parentElement.insertBefore(this.#container, this.nextElementSibling);

        if (this.hasAttribute("showcase")) {
            console.warn("[Leu-content] showcase mode!");
            let innerHtml = this.innerHTML;
            let modal = new LeuModal();
            modal.id = "_debug_" + elementIndex++;
            modal.setAttribute("data-leu-title", "Inspect Element");
            modal.setAttribute("data-leu-class", "modal-fullscreen");

            modal.innerHTML = "<textarea wrap='no' style='width:100%;height:100%;font-family: monospace;font-size: 10px' readonly>" + innerHtml + "</textarea>";
            document.body.append(modal);
            this.#container.addEventListener("click", (e : Event) => {
                e.stopPropagation();
                modal.show();
            })
        }

        for (let elem of Array.from(this.childNodes)) {
            if (elem instanceof Comment) {
                await this.parseComment(elem);
                continue;
            }
            let clone : any = elem.cloneNode(true)
            elem.remove(); // Important: Remove to avoid SEO trouble
            this.applyAttMap(clone);
            this.#attachElement.append(clone);
        }

        if (this.hasAttribute("default")) {
            // Register defaults
            defaultAttrMap = this.#curAttrMap;
            console.debug("Register default attribute map: ", defaultAttrMap, "from", this);
        }


        await ka_sleep(10);
        this.#container.classList.remove("loading");
        this.classList.remove("loading");

        this.style.display = "none";
    };



    async disconnectedCallback() {

    }



}
