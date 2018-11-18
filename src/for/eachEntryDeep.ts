import { isObjectLike } from "../is/objectLike";
import { ITypedObject } from "../obj/lib/ITypedObject";
import { forEachEntry } from "./eachEntry";
import { forEachEntryIterator } from "./lib/forEachEntryIterator";

/**
 * Recursively iterates over each entry of an object.
 *
 * @memberof For
 * @param {object} obj Object to iterate.
 * @param {function} fn Function to use (`fn(key: *, val: *, index: number, obj: object) => void`).
 * @example
 * const a = {a: 1, b: {c: [1, 2]}};
 *
 * forEachEntryDeep(a, (key, val, index, obj) => {
 *     obj[key] = index * val;
 * })
 * // a = {a: 0, b: {c: [0, 2]}}
 */
const forEachEntryDeep = (
    obj: ITypedObject<any>,
    fn: forEachEntryIterator<any>
): void =>
    forEachEntry(obj, (key, val, index) =>
        isObjectLike(val) ? forEachEntryDeep(val, fn) : fn(key, val, index, obj)
    );

export { forEachEntryDeep };
