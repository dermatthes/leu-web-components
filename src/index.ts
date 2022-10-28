
import {SmoothScroll} from "./helper/smoothscroll";
import "./components/leu-data-nav";
import "./components/leu-format";
import "./components/leu-content";
import "./components/leu-switcher";
import "./components/leu-use";

import {LeuSwitcher} from "./components/leu-switcher";
import {findParent} from "./helper/functions";


export const Leu = {
    config: {
        switcher: {
            hiddenClass: "visually-hidden"
        }
    },
    findParent: findParent,
    Switcher: LeuSwitcher,
    SmoothScroll: SmoothScroll
}

declare global {
    var Leu : any;
}

globalThis.Leu = Leu;
