import {ka_sleep} from "@kasimirjs/embed";


export class SmoothScroll {


    constructor(offsetTop : number = 86) {

        window.addEventListener("hashchange", async (e) => {
            console.log(e);
            e.preventDefault();

            await ka_sleep(1);

            let elem = document.getElementById(window.location.hash.slice(1));
            if (elem === null)
                return;

            let top = elem.getBoundingClientRect().top + window.scrollY - offsetTop;
            console.log("scrollto", elem, window.location.hash, elem.getBoundingClientRect().top, top);


            window.scrollTo({
                top: top,
                behavior: 'smooth'
            });

        })

    }

}
