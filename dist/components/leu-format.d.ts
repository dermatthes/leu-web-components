import { KaHtmlElement } from "@kasimirjs/embed";
declare global {
    var LeuFormatConfig: any;
}
export declare class LeuFormat extends KaHtmlElement {
    connected(): Promise<void>;
    disconnected(): Promise<void>;
    html: any;
}
