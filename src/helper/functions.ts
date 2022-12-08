
type Constructor<T> = new (...args: any[]) => T;

export function findParent<T>(searchParent : Constructor<T>, curElement : HTMLElement): T {
    if (curElement instanceof searchParent)
        return curElement as T;
    if (curElement.parentElement === null)
        return null;
    return findParent(searchParent, curElement.parentElement);
}


export function isset(val : any) : boolean {
    if (typeof val === "undefined" || val === null)
        return false;
    return true;
}

export function removeTrailingWhitespace (input: string) {
    return input.replaceAll(/\n([\\t ]+)(.+)/g, (p1, p2, p3) => `\n${p3}`);
}
export function parseMarkdown(input : string) {
    let comments = [];
    // Replace all Comments
    input = input.replaceAll(/<!--(.*?)-->/gs, (p1, p2) => {
        comments.push(p2);
        return `<!--${comments.length - 1}-->`
    });


    input = input.replaceAll(/\n(#+) (.*)/g, (p1, p2, p3) => `\n<h${p2.length}>${p3}</h${p2.length}>`);
    input = input.replaceAll(/\n\n([a-zA-Z].+?)(?=\n\n)/gs, (p1) => `\n\n<p>${p1}</p>`);

    input = input.replaceAll(/\*\*\*(.*?)\*\*\*/g, (p1, p2) => `<strong><i>${p2}</i></strong>`);
    input = input.replaceAll(/\*\*(.*?)\*\*/g, (p1, p2) => `<strong>${p2}</strong>`);
    input = input.replaceAll(/\*(.*?)\*/g, (p1, p2) => `<i>${p2}</i>`);


    // Inject Comments again
    input = input.replaceAll(/<!--([0-9]+)-->/g, (p1, p2) => {
        return `<!--${comments[parseInt(p2)]}-->`
    });

    return input
}


export function triggerError(system : string, msg: string, ...params : any) {
    console.error(`[${system}]: ${msg}`, ...params);
    throw `[${system}] ${msg}`
}
