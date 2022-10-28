import {ka_query_selector} from "@kasimirjs/embed/dist/core/query-select";
import {ka_dom_ready} from "@kasimirjs/embed";

class LeuKonfigurator extends HTMLElement {

    constructor() {
        super();
        this._oldHash = null;
        this.progressBarE = null;
        /**
         *
         * @type {HTMLHeadingElement}
         */
        this.titleE = null;
        this.nextE = null;
        this.backE = null;

        this.curDivE = null;
        this.hiddenClassName = "visually-hidden";
        let self=this;

        let _selectElement = (idx) => {
            let e = this.children[idx];
            this.curDivE = e;
            this.progressBarE.ariaValueMin = 0;
            this.progressBarE.ariaValueMax = this.childElementCount;
            this.progressBarE.ariaValueNow = idx + 1;
            this.progressBarE.style.width = ((idx + 1) / this.childElementCount * 100) + "%";
            this.titleE.textContent = e.getAttribute("data-title");
            e.classList.remove(this.hiddenClassName);

            this.nextE.hidden = false;
            if (idx +1 === this.childElementCount)
                this.nextE.hidden = true;

            this.backE.hidden = false;
            if (idx  === 0)
                this.backE.hidden = true;
        }

        let _routeChange = async () => {
            let hash = window.location.hash.substring(1);
            let found = false;

            for(let i=0; i<this.children.length; i++) {
                let e = this.children[i];
                console.log("scan", e);
                e.classList.add(this.hiddenClassName)
                if (e.id === hash || this.hasAttribute("show-all")) {
                    _selectElement(i);
                    found = true;
                }
            }
            if (found === false)
                _selectElement(0);
        }

        this.nextClickCb = (e) => {
           // console.log(this.curDivE.nextElementSibling);
            //location.hash = this.curDivE.nextElementSibling.id;
            history.pushState(null, null, "#" + this.curDivE.nextElementSibling.id);
            e.preventDefault();
            return false;
        }
        this.backClickCb = (e) => {
           // console.log(this.curDivE.nextElementSibling);
            //location.hash = this.curDivE.nextElementSibling.id;
            history.pushState(null, null, "#" + this.curDivE.previousElementSibling.id);
            e.preventDefault();
            return false;
        }
        this._locationListener = async () => {
            if (window.location.hash === this._oldHash) {
                return
            }
            this._oldHash = window.location.hash;
            await _routeChange();
            this.hidden = false; // Show element
        }

    }

    async connectedCallback() {
        await ka_dom_ready();
        this.progressBarE = ka_query_selector("[data-leu-role='progress-bar']", null, "data-leu-role='progress-bar'");
        this.titleE = ka_query_selector("[data-leu-role='title']", null, "data-leu-role='title'");
        this.nextE = ka_query_selector("[data-leu-role='next-btn']", null, "data-leu-role='next-btn'");
        this.backE = ka_query_selector("[data-leu-role='back-btn']", null, "data-leu-role='back-btn'");
        if (this.getAttribute("data-leu-hidden-class"))
            this.hiddenClassName = this.getAttribute("data-leu-hidden-class");

        this.backE.addEventListener("click", this.backClickCb);
        this.nextE.addEventListener("click", this.nextClickCb);
        window.setInterval(this._locationListener, 200);
        window.setInterval(()=>{
            this.style.height = this.curDivE.offsetHeight + "px";
        }, 500);
        window.addEventListener("pushstate", ()=>{
            console.log("State pushed");
        })

    }
}

customElements.define("leu-konfigurator", LeuKonfigurator);
