/**
 * Checks if an object has a certain own key
 *
 * `obj.hasOwnProperty` shorthand
 *
 * @function hasOwnProperty
 * @memberof Has
 * @since 2.8.0
 * @param {Object} obj
 * @param {string} key
 * @returns {boolean}
 * @example
 * //returns true
 * hasOwnProperty([1,2,3],"0")
 * hasOwnProperty({length:0},"length")
 *
 * @example
 * //returns false
 * hasOwnProperty([],"forEach")
 * hasOwnProperty("foo","replace")
 */
const hasOwnProperty = (obj: object, key: string): boolean => obj.hasOwnProperty(key);

export default hasOwnProperty;