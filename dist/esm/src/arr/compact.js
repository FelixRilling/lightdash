/**
 * Returns an array with every falsey value removed.
 *
 * @memberof Array
 * @since 1.0.0
 * @param {any[]} arr Array to compact.
 * @returns {any[]} Compacted array.
 * @example
 * arrCompact([1, "", "", 2, 3, null, 4, undefined, 5, ""])
 * // => [1, 2, 3, 4, 5]
 */
const arrCompact = (arr) => arr.filter(val => val);
export { arrCompact };
//# sourceMappingURL=compact.js.map