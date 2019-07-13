/**
 * Recursively creates a new array with the values of the input iterable.
 *
 * @since 2.0.0
 * @param {any[]} arr Array to copy recursively.
 * @returns {any[]} Recursively copied array.
 * @example
 * const a = [1, 2, 3, [5, [6]]];
 * const b = arrFromDeep(a);
 *
 * b[3][1][0] = 10;
 * // a = [1, 2, 3, [5, [6]]]
 * // b = [1, 2, 3, [5, [10]]]
 */
declare const arrFromDeep: <T>(arr: T[]) => T[];
export { arrFromDeep };
