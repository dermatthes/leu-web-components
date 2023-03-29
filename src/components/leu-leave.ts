import {customElement} from "@kasimirjs/embed";


@customElement("leu-leave")
class LeuLeave extends HTMLElement {
    public leaveStateKey = "leu-leave-state"


    private registerStatePop() {

        if (sessionStorage.getItem(this.leaveStateKey) === null) {
            window.history.replaceState({leave: true}, "leave", window.location.href);
            window.history.pushState({}, "leave", window.location.href);
            sessionStorage.setItem(this.leaveStateKey, "redirected");
        }
    }

    private open(noCheck : boolean = false) {
        if (sessionStorage.getItem(this.leaveStateKey) === "open" && ! noCheck)
            return;
        sessionStorage.setItem(this.leaveStateKey, "open");
        this.append(this.querySelector("template").content.firstElementChild.cloneNode(true));
        this.querySelector("*[data-role='dismiss']").addEventListener("click", () => {
            this.innerHTML = "";
        });
    }

    connectedCallback() {
        this.registerStatePop()

        window.addEventListener("popstate", (e) => {
            if (e.state?.leave === true) {
                this.open();
            }
        });
        document.body.addEventListener("mouseleave", (e) => {
            this.open();
        })

    }
}
