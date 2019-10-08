import { isArrayLike, isObjectLike, map, mapValues } from "lodash";
/**
 * Replaces every circular reference in an object with a value, defaulting to null.
 *
 * Can take a custom replacer function.
 *
 * @since 6.0.0
 * @memberOf Object
 * @param collection Object to decycle.
 * @param replacer Circular reference value replacer function
 * @param references WeakSet prefilled with encountered references, not recommended to provide this manually.
 * @returns Decycled object.
 * @example
 * const a = {a: {}, b: 1, c: 2};
 *
 * a.a = a;
 *
 * decycle(a)
 * // => {a: null, b: 1, c: 2}
 *
 * decycle(a, key => `_${key}`)
 * // => {a: "_a", b: 1, c: 2}
 */
const decycle = (collection, replacer = () => null, references = new WeakSet()) => {
    // TODO: find a way to properly avoid any's here.
    const decycler = (value, key, _collection) => {
        if (references.has(value)) {
            return replacer(value, key, _collection);
        }
        if (isObjectLike(value)) {
            return decycle(value, replacer, references);
        }
        return value;
    };
    references.add(collection);
    return isArrayLike(collection)
        ? map(collection, decycler)
        : mapValues(collection, decycler);
};
export { decycle };