import { ka_create_element } from "@kasimirjs/embed";
export function parseVariableAndStyleStr(varString) {
    let attrs = { "$": {}, "@": {} };
    let regex = new RegExp(`([@$])[^@^$]+`, "gi");
    varString.replace(regex, (match, type) => {
        match = match.substring(1);
        if (match.indexOf("=") === -1 && type === "@") {
            if (typeof attrs[type].class === "undefined")
                attrs[type].class = "";
            attrs[type].class += " " + match;
            attrs[type].class = attrs[type].class.trim();
        }
        else {
            let res = match.split("=");
            attrs[type][res.shift()] = res.join("=").trim();
        }
        return "";
    });
    return attrs;
}
export function parseVariableStr(varString, delimiter = "@") {
    let attrs = {};
    let regex = new RegExp(`\\${delimiter}[^${delimiter}]+`, "gi");
    varString.replace(regex, (match) => {
        match = match.substring(1);
        if (match.indexOf("=") === -1) {
            if (typeof attrs.class === "undefined")
                attrs.class = "";
            attrs.class += " " + match;
            attrs.class = attrs.class.trim();
        }
        else {
            let res = match.split("=");
            attrs[res.shift()] = res.join("=").trim();
        }
        return "";
    });
    return attrs;
}
export function parseAttributeStr(attrString) {
    return parseVariableStr(attrString, "@");
}
export function createElement(definition) {
    let defRest = definition.trim();
    let tag = "div";
    defRest = defRest.replace(/^[a-z0-9_\:\-]+/ig, (match) => {
        tag = match;
        return "";
    });
    let attrs = parseAttributeStr(defRest);
    let element = ka_create_element(tag, attrs);
    return element;
}
