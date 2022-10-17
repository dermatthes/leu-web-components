import {createElement} from "../src/content/createElement";

describe("test runs", () => {
    it("should return element", () => {
        let e = createElement("wurst @attr=val @class1");
        expect(e).toBeInstanceOf(HTMLElement);
    })
})
