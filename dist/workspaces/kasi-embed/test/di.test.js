var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { MessageBus } from "../src/default/MessageBus";
import { inject } from "../src/decorators/inject";
import * as util from "util";
import { container } from "../src/app/ka-container";
class TestInjectable {
}
__decorate([
    inject("bus"),
    __metadata("design:type", Object)
], TestInjectable.prototype, "bus", void 0);
container.defineService("bus", () => {
    return new MessageBus();
});
describe("test runs", () => {
    it("shoud return something", () => {
        let e = new TestInjectable();
        console.log(util.inspect(e, true));
        expect(e.bus).toBeInstanceOf(MessageBus);
    });
});
