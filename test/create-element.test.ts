import {createElement} from "../src/content/createElement";

describe("test runs", () => {
    it("should return element", () => {
        let e = createElement("wurst");
        expect(e).toBeInstanceOf(HTMLElement);
    })
})
