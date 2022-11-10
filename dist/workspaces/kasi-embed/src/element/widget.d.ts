/**
 * @abstract
 * @class
 */
export class KaWidget {
    /**
     * @abstract
     * @interface
     * @return {{shadowDom: {boolean}, elementName: {string}, shadowDomOptions: {mode: 'open'}}}
     */
    static get options(): {
        shadowDom: {
            boolean;
        };
        elementName: {
            string;
        };
        shadowDomOptions: {
            mode: 'open';
        };
    };
    /**
     *  Await the ready instance
     *
     * @static
     * @public
     * @return {Promise<this>}
     */
    public static Load(): Promise<this>;
    /**
     * Return the HTMLTemplate
     *
     * @abstract
     * @return {HTMLTemplateElement}
     */
    static getTemplate(): HTMLTemplateElement;
    /**
     * Don't call this directly
     *
     * call await Widget.show() instead
     *
     * @private
     * @deprecated Use Widget.show() instead of constructor
     * @param autoAppendToElement
     */
    private constructor();
    /**
     *
     * @type {HTMLElement}
     */
    $element: HTMLElement;
    /**
     *
     * @type {KaToolsV1.Template}
     */
    $tpl: {
        template: any;
        $scope: {};
        _error(msg: any): void;
        _appendTemplate(): void;
        _removeLastChild(): void;
        _renderFor($scope: any, stmt: any): void;
        _maintain($scope: any, childs: any, forIndex?: number): void;
        _renderIf($scope: any, stmt: any): void;
        dispose(): void;
        render($scope?: any): void;
    };
    _globalClickEventHandler: (e: any) => void;
    readyPromise: Promise<any>;
    /**
     * Called after initialization is complete (Template loaded etc)
     *
     * @abstract
     * @return {Promise<void>}
     */
    __init(): Promise<void>;
    ready(): Promise<any>;
    destroy(): Promise<void>;
}
