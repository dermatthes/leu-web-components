import {customElement, ka_create_element, ka_dom_ready, ka_sleep} from "@kasimirjs/embed";
import {triggerError} from "../helper/functions";


const defaultModalTemplate = `
<div class="modal-backdrop fade"></div>
<div class="modal fade d-block" tabindex="-1" data-leu-dismiss="modal" >

    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">%%title%%</h5>
                <button type="button" class="btn-close" data-leu-dismiss="modal" aria-label="Schließen"></button>
            </div>
            <div class="modal-body">
                %%body%%
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-leu-dismiss="modal">Schließen</button>
            </div>
        </div>
    </div>
</div>
`


@customElement("leu-modal")
class LeuModal extends HTMLElement {

    public showElement : HTMLDivElement;
    public origOverflow = "";
    public oldUrl = window.location.href.split("#")[0];

    constructor() {
        super();
    }

    public async show() {
        let title = this.getAttribute("data-leu-title") ?? "Unnamed [data-leu-title]";

        let template = this.getAttribute("data-leu-template");

        let classes = this.getAttribute("data-leu-class");

        let content = defaultModalTemplate;
        if (template !== null)
            content = document.querySelector(template)?.innerHTML;
        if (content === null)
            triggerError("leu-modal", `template-selector in data-leu-template '${template}' not found`);

        this.origOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        content = content.replace("%%title%%", title)
            .replace("%%body%%", this.innerHTML)
            .replace("%%classes%%", classes);
        this.showElement.innerHTML = content;
        await ka_sleep(10);
        this.showElement.querySelectorAll(".fade").forEach((e)=>e.classList.add("show"));
    }

    public async hide() {

        if (this.showElement.innerHTML === "")
            return;

        document.body.style.overflow = this.origOverflow;

        this.showElement.querySelectorAll(".fade").forEach((e)=>e.classList.remove("show"));
        await ka_sleep(200);

        this.showElement.innerHTML = "";
    }

    public checkHref(e) {
        if (window.location.hash === "#" + this.getAttribute("id")) {
            if (e)
                this.oldUrl = e.oldURL;
            this.show();
        } else {
            this.hide();
        }
    }

    async connectedCallback() {
        this.style.display = "none";
        await ka_dom_ready();
        await ka_sleep(1);
        this.showElement = ka_create_element("div", {"owner": "leu-modal"}) as HTMLDivElement;
        document.body.append(this.showElement);

        this.showElement.addEventListener("click", (e : Event) => {
            let target = e.target as HTMLElement;
            if (target.hasAttribute("data-leu-dismiss")) {
                // Push History (don't use history.back() - it will fail if the page was opend with anchor)
                history.pushState({}, "", this.oldUrl);
                this.hide();
            }
        })

        window.addEventListener("hashchange", (e)=>this.checkHref(e));
        this.checkHref(null);

    }

    async disconnectedCallback() {
        window.removeEventListener("hashchange", this.checkHref);
        this.showElement.remove();
    }

}
