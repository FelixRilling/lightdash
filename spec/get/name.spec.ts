import { getName } from "../../src/get/name";

describe("getName", () => {
    it("gets name", () => {
        expect(getName(class Foo {})).toBe("Foo");
        // tslint:disable-next-line:no-empty
        expect(getName(function bar() {})).toBe("bar");
        expect(getName(Symbol("abc"))).toBe("abc");
        expect(getName("foo")).toBe("foo");
        expect(getName(1)).toBe(null);
        expect(getName(null)).toBe(null);
    });
});