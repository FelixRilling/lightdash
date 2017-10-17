import isUndefined from "./undefined";

/**
 * Checks if a value is either undefined or null
 *
 * @since 1.0.0
 * @param {any} val
 * @returns {boolean}
 * @example
 * //returns true
 * isNil(null)
 * isNil(undefined)
 *
 * @example
 * //returns false
 * isNil(0)
 * isNil({})
 */
const isNil = (val: any): boolean => isUndefined(val) || val === null;

export default isNil;