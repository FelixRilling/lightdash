import { decycle } from "../../src/collection/decycle";

describe("decycle", () => {
    it("decycles", () => {
        const a = { a: {}, b: 1, c: 2 };

        a.a = a;

        expect(decycle(a)).toEqual({ a: null, b: 1, c: 2 });
        expect(decycle(a, (val: any, key: any) => `_${key}`)).toEqual({
            a: "_a",
            b: 1,
            c: 2
        });
    });
});
