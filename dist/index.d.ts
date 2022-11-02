import { SmoothScroll } from "./helper/smoothscroll";
import "./components/leu-data-nav";
import "./components/leu-format";
import "./components/leu-content";
import "./components/leu-switcher";
import "./components/leu-show";
import "./components/leu-use";
import "./components/leu-var";
import { LeuSwitcher } from "./components/leu-switcher";
import { findParent } from "./helper/functions";
export declare const Leu: {
    config: {
        switcher: {
            hiddenClass: string;
        };
    };
    findParent: typeof findParent;
    Switcher: typeof LeuSwitcher;
    SmoothScroll: typeof SmoothScroll;
};
declare global {
    var Leu: any;
}
