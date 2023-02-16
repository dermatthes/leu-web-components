import {ka_sleep} from "@kasimirjs/embed";


class LeuData extends HTMLScriptElement {

    private _data = null;
    private _promises = [];

    get data () : Promise<any> | any {
        if (this._data !== null)
            return this._data;
        return new Promise((resolve) => this._promises.push(resolve));
    }

    async connectedCallback() {
        await ka_sleep(1);
        try {
            let val = JSON.parse(this.textContent)
            if (val === null)
                throw "Cannot parse";
            this._data = val;
            this._promises.forEach(e => e(val));
        } catch (e) {
            console.error("Cannot parse JSON: ", this);
            throw e;
        }

    }
}

customElements.define("leu-data", LeuData, {extends: "script"});
