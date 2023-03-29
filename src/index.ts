


import {SmoothScroll} from "./helper/smoothscroll";
import "./components/leu-data-nav";
import "./components/leu-data";
import "./components/leu-format";
import "./components/leu-content";
import "./components/leu-switcher";
import "./components/leu-show";
import "./components/leu-use";
import "./components/leu-var";
import "./components/leu-modal";
import "./components/leu-select";
import "./components/leu-leave";



import {LeuSwitcher} from "./components/leu-switcher";
import {findParent} from "./helper/functions";
import {modal} from "./helper/modal";
import {leuTemplateVariables} from "./components/leu-var";
import {LazyLoader} from "./helper/lazy-loader";


export const Leu = {
    config: {
        switcher: {
            hiddenClass: "visually-hidden"
        }
    },
    findParent: findParent,
    modal: modal,
    Switcher: LeuSwitcher,
    SmoothScroll: SmoothScroll,
    templateVariables: leuTemplateVariables
}





declare global {
    var Leu : any;
}

globalThis.Leu = Leu as any;

const ll = new LazyLoader();
