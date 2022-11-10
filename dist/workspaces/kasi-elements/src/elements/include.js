var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
customElements.define("ka-include", class extends HTMLElement {
    _importScriptRecursive(node, src) {
        let chels = node instanceof HTMLTemplateElement ? node.content.childNodes : node.childNodes;
        for (let s of chels) {
            if (s.tagName !== "SCRIPT") {
                this._importScriptRecursive(s, src);
                continue;
            }
            let n = document.createElement("script");
            for (let attName of s.getAttributeNames())
                n.setAttribute(attName, s.getAttribute(attName));
            n.innerHTML = s.innerHTML;
            try {
                let handler = onerror;
                window.onerror = (msg, url, line) => {
                    console.error(`[ka-include]: Script error in '${src}': ${msg} in line ${line}:\n>>>>>>>>\n`, n.innerHTML.split("\n")[line - 1], "\n<<<<<<<<\n", n.innerHTML);
                };
                s.replaceWith(n);
                window.onerror = handler;
            }
            catch (e) {
                console.error(`[ka-include]: Script error in '${src}': ${e}`, e);
                throw e;
            }
        }
    }
    static get observedAttributes() { return ["src"]; }
    attributeChangedCallback(name, oldValue, newValue) {
        return __awaiter(this, void 0, void 0, function* () {
            if (name !== "src")
                return;
            if (newValue === "" || newValue === null)
                return;
            let src = this.getAttribute("src");
            let result = yield fetch(src);
            this.innerHTML = yield result.text();
            this._importScriptRecursive(this, src);
        });
    }
    connectedCallback() {
        return __awaiter(this, void 0, void 0, function* () {
            let src = this.getAttribute("src");
            if (src === "" || src === null)
                return;
        });
    }
});
