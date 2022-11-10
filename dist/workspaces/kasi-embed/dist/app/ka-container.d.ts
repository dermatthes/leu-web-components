export const __esModule: boolean;
export const container: KaContainer;
export class KaContainer {
    /**
     *
     * @abstract
     * @return {KaContainer}
     */
    static getInstance(): KaContainer;
    _services: {};
    /**
     * Get / wait for a value
     *
     * @param name
     * @param lateResolving {boolean}   Trigger no warning if the name is not yet resolvable (late resolving)
     * @returns {Promise<unknown>}
     */
    get(name: any, lateResolving?: boolean): Promise<unknown>;
    _resolve(name: any): any;
    /**
     * Define a fixed value
     *
     * @param name {string}
     * @param value {any}
     */
    defineValue(name: string, value: any): void;
    /**
     * Define a service (callback to return the value)
     *
     * @param name {string}
     * @param callback {function}
     * @param params {object}
     */
    defineService(name: string, callback: Function, params?: object): void;
}
