import {customElement, ka_create_element, ka_dom_ready, ka_sleep} from "@kasimirjs/embed";
import {triggerError} from "../helper/functions";
import {KaToolsV1} from "../helper/lib-openours";

const defaultModalTemplate = `
<div class="modal-backdrop fade"></div>
<div class="leu-vacation-modal modal fade d-block" tabindex="-1" data-leu-dismiss="modal" >

    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable %%classes%%" role="dialog">
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

class OpenHoursInterface {
    public _editor: string
    public table: [
        {day: string, time: string }
    ]
    public _status_values: string[]
    json: [
        {dayOfWeek: string|number, from: string, to: string, status: string}
    ]
    public vacation: [
        {from: string, till: string, short_text: string, text : string, title : string}
    ]
}


@customElement("leu-vacation-modal")
export class LeuVacationModal extends HTMLElement {


    public openhours : KaToolsV1.openhours;
    public origOverflow = "";
    public showElement : HTMLDivElement;

    constructor() {
        super();


    }

    public async show(meta : any) {

        this.origOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        let content = defaultModalTemplate;
        content = content.replace("%%title%%", meta.title)
            .replace("%%body%%", meta.text.replace(/\n/g, "<br>"))
            .replace("%%classes%%", meta.classes ?? "");
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


    async connectedCallback() {
        this.style.display = "none";
        await ka_dom_ready();
        await ka_sleep(1);

        if (typeof window["openhours"] === "undefined") {
            console.error("[leu-vacation-modal] window.openhours not defined");
            return;
        }
        let openhoursData : OpenHoursInterface = window["openhours"];

        if ( ! (openhoursData instanceof OpenHoursInterface)) {
            console.error("openhours is not of type OpenhoursInterface", openhoursData);
        }

        this.openhours = new KaToolsV1.openhours();
        for(let od of openhoursData.vacation) {
            this.openhours.addVacation(od.from, od.till, od);
        }


        this.showElement = ka_create_element("div", {"owner": "leu-vacation-modal"}) as HTMLDivElement;
        document.body.append(this.showElement);

        this.showElement.addEventListener("click", (e : Event) => {
            let target = e.target as HTMLElement;
            if (target.hasAttribute("data-leu-dismiss")) {
                // Push History (don't use history.back() - it will fail if the page was opend with anchor)
                this.hide();
            }
        })


        if (this.openhours.getVacation(null)) {
            this.show(this.openhours.getVacation(null).opt);
        }

    }

    async disconnectedCallback() {

        this.showElement.remove();
    }

}
