import {customElement, ka_create_element, ka_dom_ready, ka_sleep, KaHtmlElement} from "@kasimirjs/embed";
import {createElement, parseAttributeStr, parseVariableAndStyleStr, parseVariableStr} from "../content/createElement";
import {ka_query_selector} from "@kasimirjs/embed/dist/core/query-select";
import {isset} from "../helper/functions";

let defaultAttrMap = {};


@customElement("leu-content")
export class LeuContent extends HTMLElement {
    #selectedElement : HTMLElement = null;
    #attachElement : HTMLElement = null;
    #lastElement : HTMLElement = null;
    #container: HTMLElement = null;

    #refs : Map<string, HTMLElement> = new Map;
    #curAttrMap: Object = {...defaultAttrMap};

    private createElementTree (def : string) : {start: HTMLElement, leaf: HTMLElement} {

        let start : HTMLElement = null;
        let leaf : HTMLElement = null;
        for(let cur of def.split(">")) {
            let refName = null;
            cur = cur.replace(/§([a-z0-9_\-]+)/, (a, name) => {
                refName = name;
                return "";
            });
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
                    this.#curAttrMap = {...defaultAttrMap}; // Reset Attribute map to default as clone
                    break;

                case "!":
                    let tplName = cmdLine.trim().split(" ", 1).join();
                    let varAndStyle = parseVariableAndStyleStr(cmdLine);
                    console.log(varAndStyle, varAndStyle);
                    let tpl :HTMLTemplateElement = document.querySelector(`template[id='${tplName}']`);
                    if (tpl === null) {
                        console.error("<template id='", tplName, "'> not found. Selected in ", comment);
                        break;
                    }

                    let elemCtl : any = document.createElement("div");
                    if (varAndStyle["@"].length === 0) {
                        elemCtl.style.display = "contents";
                    } else {
                        for(let attrName in varAndStyle["@"]) {
                            elemCtl.setAttribute(attrName, varAndStyle["@"][attrName]);
                        }
                    }


                    let content = tpl.content.firstElementChild.outerHTML.replace(/\$\{(.*?)(\?(.*?))?\}/gi, (a, varName, e, varDefault) => {
                        if (typeof varAndStyle["$"][varName] !== "undefined")
                            return varAndStyle["$"][varName];
                        return varDefault;
                    });

                    // Replace Tags like --src and --id
                    content = content.replace(/--([a-z\-]+)=/ig, (a, b) => b + "=");

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
                    let elem2 = this.createElementTree(cmdLine);
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
                    if (cmdLine.startsWith("§")) {
                        elem = this.#refs[cmdLine.substring(1)];
                        if ( ! isset(elem)) {
                            console.error("Cannot select reference: '" + line + "': Not found in block", comment);
                            break;
                        }
                    } else {
                        elem = this.#lastElement.querySelector(cmdLine);
                        if (elem === null) {
                            console.error(`Query Element '${cmdLine}': not found in `, comment, "in", this.#container);
                            break;
                        }
                    }
                    this.#selectedElement = this.#attachElement = elem;
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
        await ka_dom_ready();
        await ka_sleep(1);
        if ( ! this.hasAttribute("default")) {
            // Wait for defaults
            await ka_sleep(1);
        }
        this.#curAttrMap = {...defaultAttrMap}; // Reset Attribute map to default as clone
        this.#container = this.#lastElement = this.#attachElement = this.#selectedElement = ka_create_element("div", {class: this.getAttribute("class") + " loading"}, []);

        this.parentElement.insertBefore(this.#container, this.nextElementSibling);

        for (let elem of Array.from(this.childNodes)) {
            if (elem instanceof Comment) {
                this.parseComment(elem);
                continue;
            }
            let clone : any = elem.cloneNode(true)
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
