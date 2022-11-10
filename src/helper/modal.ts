import {ka_html, ka_sleep, KaModal} from "@kasimirjs/embed";
import {triggerError} from "./functions";


class LeuModal extends KaModal {
    constructor(template : string) {
        super();
        this.html = template;
        this.element.addEventListener("click", async (e : Event) => {
            let target = e.target as HTMLElement
            if ( ! target.hasAttribute("data-leu-dismiss"))
                return
            this.element.querySelector(".fade")?.classList.remove("show");
            await ka_sleep(200);
            this.resolve("dismiss" as any);
        })

    }

    html = ``
}


export async function modal(contentSelector : string, templateSelector : string = "#modal-default" ) {

    let contentData :string;
    let contentTitle = "Unnamed [unset data-leu-title]";
    let tplData : string;
    if (contentSelector.startsWith("#")) {
        let tpl = document.querySelector(contentSelector) as HTMLTemplateElement;
        contentData = tpl.innerHTML;
        contentTitle = tpl.getAttribute("data-leu-title");
    } else {
        contentData = await (await fetch(contentSelector)).text()
    }

    if (templateSelector !== null) {
        let template = document.querySelector(templateSelector) as HTMLTemplateElement;
        if (template === null) {
            triggerError("leu-modal", "templateSelector " + templateSelector + " not found");
        }

        tplData = template.innerHTML.replace("%%title%%", contentTitle).replace("%%body%%", contentData);
    }


    let modal = new LeuModal(tplData);

    history.pushState({modal: true}, "Modal open", "");
    let listener = () => {
        console.log("popstate");
        modal.resolve();
    }

    window.addEventListener("popstate", listener);
    modal.render({});
    let promise = modal.show().then((arg) => {
        window.removeEventListener("popstate", listener);
    })
    await ka_sleep(10);
    modal.element.querySelector(".fade")?.classList.add("show");
}
