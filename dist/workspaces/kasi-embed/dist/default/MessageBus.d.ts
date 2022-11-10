export const __esModule: boolean;
/**
 * Access this by using Dependency Injection $bus
 *
 *
 */
export class MessageBus {
    index: number;
    listeners: {};
    /**
     *
     * @template T
     * @param message T
     * @param fn {function(msg: T<>)}
     * @returns {string}    The listener ID to unregister
     */
    on<T>(message: any, fn: (arg0: msg, arg1: any) => any): string;
    remove(listenerId: any): void;
    /**
     *
     * @param message {KaMessage}
     */
    trigger(message: KaMessage): any;
}
