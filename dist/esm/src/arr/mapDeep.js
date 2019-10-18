// TODO: Figure out a way to properly use generics here.
/**
 * Recursively maps the values of the input array with the iterator function and return the result.
 *
 * @memberof Array
 * @since 1.0.0
 * @param {any[]} arr Array to map.
 * @param {function} fn Function to use for mapping (`fn(val: *, index: number, arr: any[]) => any`).
 * @returns {any[]} Array with the mapped values.
 * @example
 * arrMapDeep([2, 4, [1, 1, [16], 4]], val => val * 2)
 * // => [4, 8, [2, 2, [32], 8]]
 */
const arrMapDeep = (arr, fn) => arr.map((val, index) => Array.isArray(val) ? arrMapDeep(val, fn) : fn(val, index, arr));
export { arrMapDeep };
//# sourceMappingURL=mapDeep.js.map