import { ITypedObject } from "../obj/lib/ITypedObject";
/**
 * Creates a map from an object.
 *
 * @function mapFromObject
 * @memberof Map
 * @since 1.0.0
 * @param {Object} obj
 * @returns {Map}
 * @example
 * mapFromObject({a: 1, b: 4, c: 5})
 * // => Map<string,number>{a: 1, b: 4, c: 5}
 */
declare const mapFromObject: <T>(obj: ITypedObject<T>) => Map<string, T>;
export { mapFromObject };