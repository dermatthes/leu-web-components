declare type Constructor<T> = new (...args: any[]) => T;
export declare function findParent<T>(searchParent: Constructor<T>, curElement: HTMLElement): T;
export declare function isset(val: any): boolean;
export {};
