export declare class LeuContent extends HTMLElement {
    #private;
    private createElementTree;
    private parseComment;
    /**
     * Apply XPath ~
     *
     * @param el
     * @private
     */
    private applyAttMap;
    connectedCallback(): Promise<void>;
    disconnectedCallback(): Promise<void>;
}
