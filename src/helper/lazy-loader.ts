import * as Url from "url";
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
    isSuitable(url: Url): boolean;

    setElement(element: HTMLElement, url: Url);
}


export class LeuCDNLazyLoaderMapper implements LazyLoaderMapper {
    isSuitable(url: Url): boolean {
        return url.toString().startsWith("cdn");
    }


    protected getData(src: string) {
        let ret = {formats: [], variants: []} as LazyLoaderData;

        src = src.replace(/\/(([0-9]+x[0-9]+|,)+)\//ig, (p0, sizes: string) => {
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

        src = src.replace(/([a-z0-9_\-]+)\.([a-z0-9\,]+)$/ig, (p0, name, formats) => {
            console.log("detect name", name, formats);
            ret.formats = formats.split(",");
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


    async setElement(element: HTMLElement, url: Url) {
        let data = this.getData(url.toString());

        let bestFit = this.getBestFit(data);

        let mediaSupport = await getMediaSupport();
        let bestExtension = mediaSupport.getBestExtension(data.formats);

        let src = data.src.replace("cdn+https://", "https://");
        src = src.replace("cdn://", "https://cdn.leuffen.de");

        src = src.replace("@size@", `${bestFit.width}x${bestFit.height}`);
        src = src.replace("@file@", `${data.filename}.${bestExtension}`);
        element.setAttribute("src", src);

        if (element instanceof HTMLImageElement) {
            if (element.getBoundingClientRect().y > window.innerHeight) {
                element.setAttribute("loading", "lazy");
            }
            element.width = bestFit.width;
            element.height = bestFit.height;
            if ( ! element.hasAttribute("alt"))
                element.setAttribute("alt", data.alt);
        } else {
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
                if (e.hasAttribute("data-bg-img")) {
                    src = e.getAttribute("data-bg-img");
                } else if (e.hasAttribute("data-src")) {
                    src = e.getAttribute("data-src");
                } else if (e.hasAttribute("src")) {
                    src = e.getAttribute("src");
                } else {
                    return;
                }

                let url : Url = null;
                try {
                    url = new URL(src);
                } catch (e) {
                    return;
                }
                for (let curMapper of this.mappers) {
                    if (!curMapper.isSuitable(url)) {
                        continue;
                    }
                    curMapper.setElement(e as HTMLElement, url);
                }

            }
        )


    }


}