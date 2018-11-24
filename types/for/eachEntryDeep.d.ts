import { IAnyObject } from "../obj/lib/IAnyObject";
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
declare const forEachEntryDeep: (obj: IAnyObject, fn: forEachEntryIterator<any>) => void;
export { forEachEntryDeep };
