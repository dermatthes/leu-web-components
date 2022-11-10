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
export const Leu = {
    config: {
        switcher: {
            hiddenClass: "visually-hidden"
        }
    },
    findParent: findParent,
    modal: modal,
    Switcher: LeuSwitcher,
    SmoothScroll: SmoothScroll
};
if (typeof globalThis.Leu !== "undefined") {
    console.error("globalThis.Leu is already defined. Possibly double loaded library?");
}
globalThis.Leu = Leu;
