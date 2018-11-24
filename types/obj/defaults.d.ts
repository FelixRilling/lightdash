import { IAnyObject } from "./lib/IAnyObject";
/**
 * Sets every nil property of an object to the value from the default object.
 *
 * @memberof Object
 * @since 2.6.0
 * @param {Object} obj Object to default.
 * @param {Object} objDefault Object containing the default values.
 * @returns {Object} Object containing the default values in keys it did not have or had nil value in.
 * @example
 * objDefaults({a: 1, c: 5}, {a: 1, b: 2, c: 3})
 * // => {a: 1, b: 2, c: 5}
 */
declare const objDefaults: (obj: IAnyObject, objDefault: IAnyObject) => IAnyObject;
export { objDefaults };
