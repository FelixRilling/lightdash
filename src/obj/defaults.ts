import { forEachEntry } from "../for/eachEntry";
import { isArray } from "../is/array";
import { isUndefined } from "../is/undefined";
import { objFrom } from "./from";
import { ITypedObject } from "./lib/ITypedObject";

// TODO: Figure out a way to properly use generics here.
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
const objDefaults = (
    obj: ITypedObject<any>,
    objDefault: ITypedObject<any>
): ITypedObject<any> => {
    const result: ITypedObject<any> = isArray(obj)
        ? Array.from(obj)
        : objFrom(obj);

    forEachEntry(objDefault, (keyDefault, valDefault) => {
        if (isUndefined(obj[keyDefault])) {
            result[keyDefault] = valDefault;
        }
    });

    return result;
};

export { objDefaults };
