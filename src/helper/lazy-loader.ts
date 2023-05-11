
import {getMediaSupport} from "./media-support";

type LazyLoaderImageVariant = {
    width: number,
    height: number
}

type LazyLoaderData = {
    src: string,
    variants: LazyLoaderImageVariant[],
    formats: string[],
    alt: string,
    filename: string
}

export interface LazyLoaderMapper {
    isSuitable(url: string): boolean;

    setElement(element: HTMLElement, url: URL);
}


export class LeuCDNLazyLoaderMapper implements LazyLoaderMapper {
    isSuitable(url: string): boolean {
        return url.startsWith("cdn") || url.startsWith("data:cdn://") || url.startsWith("cdn+https://");
    }


    protected getData(src: string) {
        let ret = {formats: [], variants: []} as LazyLoaderData;

        src = src.replace(/\/(([0-9]+x[0-9]+|[,_])+)\//ig, (p0, sizes: string) => {
            sizes.split(",").forEach((size) => {
                ret.variants.push(
                    {
                        width: parseInt(size.split("x")[0]),
                        height: parseInt(size.split("x")[1])
                    }
                )
            });

            return "/@size@/";
        })

        ret.variants.sort((a, b) => {
            if (a.width < b.width)
                return -1;
            if (a.width > b.width)
                return 1;
            return 0;
        });

        src = src.replace(/([a-z0-9_\-]+)\.([a-z0-9\,_]+)$/ig, (p0, name, formats) => {
            //console.log("detect name", name, formats);
            ret.formats = formats.replace(/,/gm, "_").split("_");
            ret.filename = name;
            ret.alt = name.replace("_", " ");
            return "@file@";
        })

        ret.src = src;
        return ret;
    }


    private getBestFit(data: LazyLoaderData): LazyLoaderImageVariant {
        let fit = data.variants.find((e) => e.width >= window.innerWidth);
        if (typeof fit === "undefined")
            fit = data.variants[data.variants.length - 1];
        return fit;
    }


    async setElement(element: HTMLElement, url: URL) {
        let data = this.getData(url.toString());

        let bestFit = this.getBestFit(data);

        let mediaSupport = await getMediaSupport();
        let bestExtension = mediaSupport.getBestExtension(data.formats);

        let src = data.src.replace("cdn+https://", "https://");
        src = src.replace("data:cdn://", "cdn://");
        src = src.replace("cdn://", "https://cdn.leuffen.de");

        src = src.replace("@size@", `${bestFit.width}x${bestFit.height}`);
        src = src.replace("@file@", `${data.filename}.${bestExtension}`);
        console.log("IMage URL", src);

        if (element instanceof HTMLImageElement) {
            if (element.getBoundingClientRect().top > window.innerHeight && ! element.classList.contains("priority")) {
                console.log("Lazyload", element.getBoundingClientRect(), window.innerHeight)
                element.setAttribute("loading", "lazy");
            }
            if ( ! element.hasAttribute("width") && ! element.hasAttribute("height")) {
                element.width = bestFit.width;
                element.height = bestFit.height;
            }
            element.setAttribute("src", src);
            if ( ! element.hasAttribute("alt"))
                element.setAttribute("alt", data.alt);
        } else {
            console.log("Setting background image", src);
            element.style.backgroundImage = "url(" + src + ")";
        }
    }


}


export class LazyLoader {

    public constructor(targetNode: HTMLElement = null) {


    }

    private mappers: LazyLoaderMapper[] = [
        new LeuCDNLazyLoaderMapper()
    ];

    public addMapper(mapper: LazyLoaderMapper) {
        this.mappers.push(mapper);
    }


    public async convert(parentNode: HTMLElement = document.body) {
        let mediaSupport = await getMediaSupport();
        parentNode.querySelectorAll("img,[data-bg-img]").forEach(
            (e) => {
                let src = "";
                let type = null;
                if (e.hasAttribute("data-bg-img")) {
                    type = "bg";
                    src = e.getAttribute("data-bg-img");
                } else if (e.hasAttribute("data-src")) {
                    type = "src";
                    src = e.getAttribute("data-src");
                } else if (e.hasAttribute("src")) {
                    src = e.getAttribute("src");
                } else {
                    return;
                }



                for (let curMapper of this.mappers) {
                    if (!curMapper.isSuitable(src)) {
                        continue;
                    }
                    curMapper.setElement(e as HTMLElement, src);
                }
                if (type === "bg" && e instanceof HTMLElement) {
                    e.style.backgroundImage = "url(" + src + ")";
                } else if (type === "src") {
                    e.setAttribute("src", src);
                }
            }

        )


    }


}
