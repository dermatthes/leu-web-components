

type LazyLoaderData = {
    src : string,
    width: number,
    height: number,
    alt: string
}


export function cdnParse(src : string) : LazyLoaderData {
    let ret = {} as LazyLoaderData;

    src = src.replace(/\/(([0-9]+x[0-9]+|,)+)\//ig, (p0, sizes : string) => {
        console.log("detect", sizes);
        let sizesArr = sizes.split(",");
        ret.width = parseInt(sizesArr[0].split("x")[0]);
        ret.height = parseInt(sizesArr[0].split("x")[1]);
        return "/" + sizesArr[0] + "/";
    })

    src = src.replace(/([a-z0-9_\-]+)\.([a-z0-9\,]+)$/ig, (p0, name, formats) => {
        console.log("detect name", name, formats);
        let formatsArr = formats.split(",");
        ret.alt = name;
        return name + "." + formatsArr[0];
    })

    ret.src = src;
    return ret;
}



export class LazyLoader {

    public constructor(targetNode : HTMLElement = null) {
        if (targetNode === null)
            targetNode = document;
        console.log("body is:", document);

        const config = {
            "attributes": true,
            "childList": true,
            "subtree": true
        }

        const observer = new MutationObserver((mutationList, observer) => {
            console.log("update", mutationList);
            for (let mutation of mutationList) {
                if (mutation.addedNodes.length === null)
                    continue;
                for(let addedNode of mutation.addedNodes) {
                    if(addedNode.nodeName === "IMG")
                        console.log("IMG", addedNode);
                    if (addedNode instanceof HTMLImageElement) {
                        addedNode.loading = "lazy";
                        let data = cdnParse(addedNode.src);
                        addedNode.height = data.height;
                        addedNode.width = data.width;
                        addedNode.src = data.src;
                        if (addedNode.alt != "")
                            addedNode.alt = data.alt;

                        console.log("Modified", addedNode, data);
                    }
                }
            }
        })

        observer.observe(targetNode, config);
    }

}
