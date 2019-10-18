import { isObjectLike } from "../is/objectLike";
import { forEachEntry } from "./eachEntry";
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
const forEachEntryDeep = (obj, fn) => forEachEntry(obj, (val, key) => isObjectLike(val) ? forEachEntryDeep(val, fn) : fn(val, key, obj));
export { forEachEntryDeep };
//# sourceMappingURL=eachEntryDeep.js.map