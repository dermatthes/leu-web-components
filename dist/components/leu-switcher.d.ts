export declare class LeuSwitcher extends HTMLElement {
    private _oldHash;
    private progressBarE;
    private content;
    /**
     *
     * @type {HTMLHeadingElement}
     */
    private titleE;
    private nextE;
    private backE;
    private curDivE;
    constructor();
    _selectElement(idx: any): void;
    _routeChange(): Promise<void>;
    next(e?: any): Promise<boolean>;
    backClickCb(e: any): boolean;
    _locationListener(): Promise<void>;
    connectedCallback(): Promise<void>;
}
