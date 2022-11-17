
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


export function triggerError(system : string, msg: string, ...params : any) {
    console.error(`[${system}]: ${msg}`, ...params);
    throw `[${system}] ${msg}`
}
