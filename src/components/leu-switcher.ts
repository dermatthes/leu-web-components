import {ka_query_selector} from "@kasimirjs/embed";
import {customElement, ka_dom_ready, ka_sleep} from "@kasimirjs/embed";
import {Leu} from "../index";






@customElement("leu-switcher")
export class LeuSwitcher extends HTMLElement {
    private _oldHash = null;
    private progressBarE = null;


    private content : HTMLDivElement = null;
    /**
     *
     * @type {HTMLHeadingElement}
     */
    private titleE = null;
    private nextE = null;
    private backE = null;

    private curDivE = null;

    constructor() {
        super();

        let self=this;
    }

    _selectElement (idx) {
        let e = this.content.children[idx];
        this.curDivE = e;
        this.progressBarE.ariaValueMin = 0;
        this.progressBarE.ariaValueMax = this.content.childElementCount;
        this.progressBarE.ariaValueNow = idx + 1;
        this.progressBarE.style.width = ((idx + 1) / this.content.childElementCount * 100) + "%";
        this.titleE.textContent = e.getAttribute("data-title");
        e.classList.remove(Leu.config.switcher.hiddenClass);

        this.nextE.hidden = false;
        if (idx +1 === this.content.childElementCount)
            this.nextE.hidden = true;

        this.backE.hidden = false;
        if (idx  === 0)
            this.backE.hidden = true;
    }
    async _routeChange() {
        let hash = window.location.hash.substring(1);
        let found = false;

        for(let i=0; i<this.content.children.length; i++) {
            let e = this.content.children[i];
            console.log("scan", e);
            e.classList.add(Leu.config.switcher.hiddenClass)
            if (e.id === hash || this.hasAttribute("show-all")) {
                this._selectElement(i);
                found = true;
            }
        }
        if (found === false)
            this._selectElement(0);
    }

    async next (e=null) {
        await ka_sleep(500);
        // console.log(this.curDivE.nextElementSibling);
        //location.hash = this.curDivE.nextElementSibling.id;
        if (this.curDivE.nextElementSibling === null)
            return;
        history.pushState(null, null, "#" + this.curDivE.nextElementSibling.id);
        if (e !== null)
            e.preventDefault();
        console.log("next");
        return false;
    }
    backClickCb  (e) {
        // console.log(this.curDivE.nextElementSibling);
        //location.hash = this.curDivE.nextElementSibling.id;
        history.pushState(null, null, "#" + this.curDivE.previousElementSibling.id);
        e.preventDefault();
        return false;
    }
    async _locationListener() {
        if (window.location.hash === this._oldHash) {
            return
        }
        this._oldHash = window.location.hash;
        await this._routeChange();
        this.hidden = false; // Show element
    }
    async connectedCallback() {
        await ka_dom_ready();

        this.progressBarE = ka_query_selector("[data-leu-role='progress-bar']", this, "data-leu-role='progress-bar'");
        this.content = ka_query_selector("[data-leu-role='content']", this, "data-leu-role='progress-bar'") as HTMLDivElement;
        this.titleE = ka_query_selector("[data-leu-role='title']", this, "data-leu-role='title'");
        this.nextE = ka_query_selector("[data-leu-role='next-btn']", this, "data-leu-role='next-btn'");
        this.backE = ka_query_selector("[data-leu-role='back-btn']", this, "data-leu-role='back-btn'");


        this.backE.addEventListener("click", (e) => this.backClickCb(e));
        this.nextE.addEventListener("click", (e) => this.next(e));
        window.setInterval(() => this._locationListener(), 200);
        window.setInterval(()=>{
            this.style.height = this.curDivE.offsetHeight + "px";
        }, 500);
        window.addEventListener("pushstate", ()=>{
            console.log("State pushed");
        })

    }
}
