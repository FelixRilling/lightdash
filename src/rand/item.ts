import { randNumber } from "./number";

/**
 * Return a random item from an array.
 *
 * @since 3.0.0
 * @param {any[]} arr Array to use.
 * @returns {any} Random item from the array.
 * @example
 * randItem(["foo", "bar"])
 * // => "foo"
 *
 * randItem([1, 2, 3, 4, 5])
 * // => 3
 */
const randItem = <T>(arr: T[]): T => arr[randNumber(0, arr.length - 1)];

export { randItem };
