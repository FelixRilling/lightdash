import { removeItem } from "../../src/arr/removeItem";

describe("removeItem", () => {
    it("removes all items", () => {
        expect(removeItem(["foo", "bar", "fizz", "bar"], "bar")).toEqual([
            "foo",
            "fizz"
        ]);
    });
    it("removes one item", () => {
        expect(removeItem(["foo", "bar", "fizz", "bar"], "bar", false)).toEqual(
            ["foo", "fizz", "bar"]
        );
    });
});
