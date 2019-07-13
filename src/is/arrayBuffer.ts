import { isInstanceOf } from "./instanceOf";

/**
 * Checks if a value is an array-buffer.
 *
 * @since 2.10.0
 * @param {any} val Value to check.
 * @returns {boolean} If the value is an array buffer.
 * @example
 * isArrayBuffer(new ArrayBuffer(8))
 * // => true
 *
 * isArrayBuffer([1, 2])
 * // => false
 */
const isArrayBuffer = (val: any): val is ArrayBuffer =>
    isInstanceOf(val, ArrayBuffer);

export { isArrayBuffer };
