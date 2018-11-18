import { isInstanceOf } from "./instanceOf";

/**
 * Checks if a value is a typed array.
 *
 * @memberof Is
 * @since 2.10.0
 * @param {any} val Value to check.
 * @returns {boolean} If the value is a typed array.
 * @example
 * isArrayTyped(new Int16Array());
 * // => true
 *
 * isArrayTyped(new Uint8Array());
 * // => true
 *
 * isArrayTyped([]);
 * // => false
 */
const isArrayTyped = (
    val: any
): val is
    | Int8Array
    | Int16Array
    | Int32Array
    | Uint8Array
    | Uint16Array
    | Uint32Array
    | Float32Array
    | Float64Array =>
    isInstanceOf(val, Int8Array) ||
    isInstanceOf(val, Int16Array) ||
    isInstanceOf(val, Int32Array) ||
    isInstanceOf(val, Uint8Array) ||
    isInstanceOf(val, Uint16Array) ||
    isInstanceOf(val, Uint32Array) ||
    isInstanceOf(val, Float32Array) ||
    isInstanceOf(val, Float64Array);

export { isArrayTyped };
