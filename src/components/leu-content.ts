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
import {isset, parseMarkdown, removeTrailingWhitespace} from "../helper/functions";
import {leuTemplateVariables} from "./leu-var";
import * as events from "events";
import {LeuModal} from "./leu-modal";
import {LazyLoader} from "../helper/lazy-loader";

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
    #curAttrMap: Object = null;

    #macros : Map<string, string> = new Map;


    private async callMacro (name: string, varAndStyle : any, curElement : HTMLElement | null = null) {
        let macro = this.#macros[name];
        if (! isset(macro)) {
            console.error(`Macro '${name}' not defined.`);
            throw `Macro '${name}' not defined.`
        }
        macro = macro.replace(/\$\{(.*?)(\?(.*?))?\}/gi, (a, varName, e, varDefault) => {
            if (typeof varAndStyle["$"][varName] !== "undefined")
                return varAndStyle["$"][varName];
            if (typeof leuTemplateVariables[varName] !== "undefined" )
                return leuTemplateVariables[varName]
            return varDefault;
        });

        if (curElement !== null) {
            macro = macro.replace(/@@([a-z0-9\-_]+)@@/gim, (p1, name) => {
                if (name === "") {
                    return curElement.textContent.trim();
                }
                return curElement.getAttribute(name);
            });
        }

        await this.parseComment(new Comment(macro));
    }


    private createElementTree (def : string) : {start: HTMLElement, leaf: HTMLElement} {

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
                if (leaf instanceof HTMLTemplateElement) {
                    leaf.content.appendChild(el);
                } else {
                    leaf.appendChild(el);

                }
                leaf = el;
            }
        }
        return {start, leaf};
    }

    private async parseComment(comment: Comment) {

        this.#attachElement.append(comment.cloneNode(true));

        let textContent = comment.textContent;
        // Sanitize Breaks from Links e.g.
        textContent = textContent.replace(/\n\s+@/gmi, " @");
        textContent = removeTrailingWhitespace(textContent);

        textContent = textContent.replace(/def ([a-z0-9_\-]+)\s(.+?)\send;/gmis, (p1, p2, p3) => {
            //console.log ("match macro", p2, p3);
            this.#macros[p2] = p3;
            return "\n".repeat(p1.split("\n").length); // Keep lineNumbers
        });

        let lines = textContent.split("\n");

        if (this.#curAttrMap === null)
            this.#curAttrMap = {...defaultAttrMap}; // Reset Attribute map to default as clone

        for(let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
            let line = lines[lineIdx].trim();
            if (line === "")
                continue;
             // <-- Performance Problem wenn größer 0

            let cmdLine = line.substring(1).trim();
            switch (line.substring(0,1)) {
                case "/":
                    let elem1 = this.createElementTree(cmdLine);
                    this.#curContainer.appendChild(elem1.start);
                    this.#lastElement = elem1.start;
                    this.#selectedElement = this.#attachElement = elem1.leaf;

                    break;

                case "!":
                    let refName = null;
                    cmdLine = cmdLine.replace(/§([a-z0-9_\-]+)/, (a, name) => {
                        refName = name;
                        return "";
                    });
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

                    let newAttachElement = null;
                    let newSelectedElement = null;

                    let attachPoints = elemCtl.querySelectorAll("[attach]");
                    for (let attachPoint of attachPoints) {
                        if (attachPoint.getAttribute("attach") === "") {
                            newAttachElement = attachPoint;
                            newSelectedElement = attachPoint;
                            if (refName !== null) {
                                this.#refs[refName] = attachPoint;
                            }
                        } else {
                            this.#refs[attachPoint.getAttribute("attach")] = attachPoint;
                        }
                    }

                    if (elemCtl.style.display === "contents") {
                        while (elemCtl.children.length > 0) {
                            this.#attachElement.append(elemCtl.children[0])
                        }
                    } else {
                        this.#attachElement.append(elemCtl);
                    }

                    if (newSelectedElement !== null)
                        this.#selectedElement = newSelectedElement
                    if (newAttachElement !== null)
                        this.#attachElement = newAttachElement

                    if (attachPoints.length === 0) {
                        //console.warn("Template has no attach point", tpl, elemCtl)
                    }
                    await ka_sleep(1);
                    break;

                case ">":
                    let elem2 =  this.createElementTree(cmdLine);
                    this.#selectedElement.appendChild(elem2.start);
                    this.#attachElement = elem2.leaf;
                    break;

                case "~":

                    let [selector, ...attrMap] = cmdLine.split("=>");
                    let attrStr = attrMap.join(":");
                    let macro = null;

                    // Search for macro (macroName $parm1=xyz)
                    attrStr = attrStr.replace(/\(([a-z0-9_\-]+)(.*?)\)/igm, (p1, name, code) => {
                        let attrMap = parseVariableStr(code, "$");
                        macro = {
                            name: name, attrMap: attrMap
                        }
                        return "";
                    });

                    let attrs = parseAttributeStr(attrStr);
                    this.#curAttrMap[selector] = {attrs, line, macro};
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
    private async applyAttMap(el : HTMLElement) {
        let appEl = document.createElement("div");
        appEl.append(el);
        //console.log("validate element", el);
        for (let attrMapSelector in this.#curAttrMap) {
            //console.log("check", attrMapSelector);
            try {
                let result = appEl.querySelectorAll(attrMapSelector)
                for (let curElement of Array.from(result)) {
                    let curAttrMap = this.#curAttrMap[attrMapSelector]
                    for(let attName in curAttrMap.attrs) {
                        curElement.setAttribute(attName, curAttrMap.attrs[attName]);
                    }

                    // Call the macro
                    if (curAttrMap.macro !== null) {
                        console.log("call macro", curAttrMap.macro.name);
                        await this.callMacro(curAttrMap.macro.name, curAttrMap.macro.attrMap, curElement);
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

        let lazyLoader = new LazyLoader();
        await lazyLoader.convert(this);

        this.#curAttrMap = {...defaultAttrMap}; // Reset Attribute map to default as clone
        this.#container = this.#curContainer = this.#lastElement = this.#attachElement = this.#selectedElement = ka_create_element("div", {class: this.getAttribute("class") + " loading"}, []);

        this.parentElement.insertBefore(this.#container, this.nextElementSibling);

        if (this.hasAttribute("markdown")) {
            this.innerHTML = removeTrailingWhitespace(this.innerHTML);
        }

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

        if (this.hasAttribute("markdown")) {
            this.innerHTML = parseMarkdown(this.innerHTML);
        }

        for (let elem of Array.from(this.childNodes)) {
            if (elem instanceof Comment) {
                await this.parseComment(elem);
                continue;
            }
            let clone : any = elem.cloneNode(true)
            elem.remove(); // Important: Remove to avoid SEO trouble
            await this.applyAttMap(clone);

            if (this.#attachElement instanceof HTMLTemplateElement) {
                this.#attachElement.content.append(clone);
            } else {
                this.#attachElement.append(clone);
            }
        }

        if (this.hasAttribute("default")) {
            // Register defaults
            defaultAttrMap = {...this.#curAttrMap};
            console.debug("Register default attribute map: ", defaultAttrMap, "from", this);
        }


        await ka_sleep(2);
        await lazyLoader.convert(this.#container);
        this.#container.classList.remove("loading");
        this.classList.remove("loading");

        this.style.display = "none";
    };



    async disconnectedCallback() {

    }



}
