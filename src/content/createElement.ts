import {ka_create_element} from "@kasimirjs/embed";

export function parseAttributeStr(attrString : string ) : any {
    let attrs : any = {};
    attrString.replaceAll(/@[^@]+/gi, (match: string) => {
        match = match.substring(1);
        if (match.indexOf("=") === -1) {
            if (typeof attrs.class === "undefined")
                attrs.class = "";
            attrs.class += " " + match;
            attrs.class = attrs.class.trim();
        } else {
            let res = match.split("=", 2);

            attrs[res[0]] = res[1];
        }
        return "";
    })
    return attrs;
}

export function createElement(definition : string) : HTMLElement {
    let defRest = definition.trim();
    let tag = "div";
    defRest = defRest.replace(/^[a-z0-9_\:\-]+/ig, (match: string) => {
        tag = match;
        return "";
    })
    let attrs = parseAttributeStr(defRest);


    let element = ka_create_element(tag, attrs);
    return element;
}
