import forEachEntry from "../for/eachEntry";
import isNil from "../is/nil";
import isObject from "../is/object";
import {
    IGenericObject,
} from "../lightdash.d";
import objClone from "./cloneDeep";

/**
 * Recursively sets every nil property of object to the value from the default object
 *
 * @function objDefaultsDeep
 * @memberof Object
 * @since 2.7.0
 * @param {Object} obj
 * @param {Object} objDefault
 * @returns {Object}
 * @example
 * //returns a = {a:[1,2,3],b:2,c:{f:'x'}}
 * objDefaultsDeep({a:[1,2],c:{f:'x'}},{a:[1,2,3],b:2,c:{f:'y'}})
 */
const objDefaultsDeep = (obj: IGenericObject, objDefault: object): object => {
    const result: IGenericObject = objClone(obj);

    forEachEntry(objDefault, (valDefault: any, keyDefault: string) => {
        const valGiven = obj[keyDefault];

        if (isObject(valDefault)) {
            result[keyDefault] = isObject(valGiven) ? objDefaultsDeep(valGiven, valDefault) : valDefault;
        } else {
            result[keyDefault] = isNil(valGiven) ? valDefault : valGiven;
        }
    });

    return result;
};

export default objDefaultsDeep;
