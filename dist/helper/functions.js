export function findParent(searchParent, curElement) {
    if (curElement instanceof searchParent)
        return curElement;
    if (curElement.parentElement === null)
        return null;
    return findParent(searchParent, curElement.parentElement);
}
export function isset(val) {
    if (typeof val === "undefined" || val === null)
        return false;
    return true;
}
