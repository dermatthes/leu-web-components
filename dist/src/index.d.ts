import { SmoothScroll } from "./helper/smoothscroll";
import "./components/leu-data-nav";
import "./components/leu-format";
import "./components/leu-content";
import "./components/leu-switcher";
import "./components/leu-show";
import "./components/leu-use";
import "./components/leu-var";
import "./components/leu-modal";
import { LeuSwitcher } from "./components/leu-switcher";
import { findParent } from "./helper/functions";
import { modal } from "./helper/modal";
export declare const Leu: {
    config: {
        switcher: {
            hiddenClass: string;
        };
    };
    findParent: typeof findParent;
    modal: typeof modal;
    Switcher: typeof LeuSwitcher;
    SmoothScroll: typeof SmoothScroll;
};
declare global {
    var Leu: any;
}
