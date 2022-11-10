var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ka_sleep } from "@kasimirjs/embed";
export class SmoothScroll {
    constructor(offsetTop = 86) {
        window.addEventListener("hashchange", (e) => __awaiter(this, void 0, void 0, function* () {
            console.log(e);
            e.preventDefault();
            yield ka_sleep(1);
            let elem = document.getElementById(window.location.hash.slice(1));
            if (elem === null)
                return;
            let top = elem.getBoundingClientRect().top + window.scrollY - offsetTop;
            console.log("scrollto", elem, window.location.hash, elem.getBoundingClientRect().top, top);
            window.scrollTo({
                top: top,
                behavior: 'smooth'
            });
        }));
    }
}
