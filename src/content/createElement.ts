import {ka_create_element} from "@kasimirjs/embed";

export function parseVariableStr (varString : string, delimiter = "@") : any {
    let attrs : any = {};
    let regex = new RegExp(`\\${delimiter}[^${delimiter}]+`, "gi")
    varString.replaceAll(regex, (match: string) => {
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

export function parseAttributeStr(attrString : string ) : any {
    return parseVariableStr(attrString, "@")
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
