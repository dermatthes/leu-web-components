

export function findParent<T>(searchParent : T, curElement : HTMLElement): T {
    if (curElement instanceof searchParent)
        return curElement;
    if (curElement.parentElement === null)
        return null;
    return findParent(searchParent, curElement.parentElement);
}
