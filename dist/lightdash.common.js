'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var lodash = require('lodash');

/**
 * Checks if the value is an instance of any of the given classes.
 * If at least one class gives back true, true is returned.
 *
 * @since 1.0.0
 * @param val Value to check.
 * @param targets Classes to check.
 * @returns If the value is an instance of the class.
 * @example
 * isInstanceOf([], Array)
 * // => true
 *
 * isInstanceOf([], Map, Set, Array)
 * // => true
 *
 * isInstanceOf({}, Array, Set)
 * // => false
 */
const isInstanceOf = (val, ...targets) => targets.some(target => val instanceof target);

/**
 * Checks if a value is a promise.
 *
 * @since 3.0.0
 * @param val Value to check.
 * @returns If the value is a promise.
 * @example
 * isPromise(new Promise((resolve, reject) => resolve("foo")));
 * // => true
 *
 * isPromise(() => "foo");
 * // => false
 */
const isPromise = (val) => isInstanceOf(val, Promise);

/**
 * Checks if the value has any of the given types.
 * If at least one type gives back true, true is returned.
 *
 * @since 1.0.0
 * @param val Value to check.
 * @param types Type strings to compare the value to.
 * @returns If the value has the type provided.
 * @example
 * isTypeOf("foo", "string")
 * // => true
 *
 * isTypeOf("foo", "number", "string")
 * // => true
 *
 * isTypeOf("foo", "number")
 * // => false
 */
const isTypeOf = (val, ...types) => types.some(type => typeof val === type);

/**
 * Gets name of a value.
 *
 * If the value has a name or description property, the value of that is returned.
 * If the value is a string, it is returned as is.
 * Otherwise null is returned.
 *
 * @since 10.2.0
 * @param val Value to check.
 * @returns The name of the value.
 * @example
 * getName(class Foo{})
 * // => "Foo"
 *
 * getName(function bar(){})
 * // => "bar"
 *
 * getName(Symbol("abc"))
 * // => "abc"
 *
 * getName("foo")
 * // => "foo"
 *
 * getName(1)
 * // => null
 */
const getName = (val) => {
    if (lodash.isString(val)) {
        return val;
    }
    if (lodash.isObject(val) && lodash.isString(val.name)) {
        return val.name;
    }
    if (lodash.isSymbol(val) && lodash.isString(val.description)) {
        return val.description;
    }
    return null;
};

/**
 * Clamps a number in a given range.
 *
 * @since 1.0.0
 * @param val Value to clamp
 * @param min Inclusive minimum value.
 * @param max Inclusive maximum value.
 * @returns Value clamped into the range given.
 * @example
 * numClamp(5, 0, 10)
 * // => 5
 *
 * numClamp(-2, 0, 10)
 * // => 0
 *
 * numClamp(99, 0, 10)
 * // => 10
 */
const numClamp = (val, min, max) => {
    if (val < min) {
        return min;
    }
    if (val > max) {
        return max;
    }
    return val;
};

/**
 * Clamps a number in the range of safe integers.
 *
 * @since 7.1.0
 * @param val Value to use.
 * @returns Value clamped into the range of safe integers.
 * @example
 * numSafe(99999999999999999)
 * // => Number.MAX_SAFE_INTEGER
 *
 * numSafe(-Infinity)
 * // => Number.MIN_SAFE_INTEGER
 */
const numSafe = (val) => numClamp(val, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);

// noinspection SpellCheckingInspection
/**
 * Returns the levenshtein string distance of two strings.
 *
 * @since 6.3.0
 * @param str1 First string to compare.
 * @param str2 Second string to compare.
 * @returns Distance between the two strings.
 * @example
 * strDistance("Kitten", "Sitting")
 * // => 3
 *
 * strDistance("String", "Stribng")
 * // => 1
 *
 * strDistance("foo", "foo")
 * // => 0
 */
const strDistance = (str1, str2) => {
    if (str1.length === 0) {
        return str2.length;
    }
    if (str2.length === 0) {
        return str1.length;
    }
    const matrix = [];
    for (let y = 0; y <= str2.length; y++) {
        matrix[y] = [y];
    }
    for (let x = 0; x <= str1.length; x++) {
        matrix[0][x] = x;
    }
    for (let y = 1; y <= str2.length; y++) {
        const matrixColumnCurrent = matrix[y];
        const matrixColumnLast = matrix[y - 1];
        for (let x = 1; x <= str1.length; x++) {
            if (str2.charAt(y - 1) === str1.charAt(x - 1)) {
                matrixColumnCurrent[x] = matrixColumnLast[x - 1];
            }
            else {
                const substitution = matrixColumnLast[x - 1] + 1;
                const insertion = matrixColumnCurrent[x - 1] + 1;
                const deletion = matrixColumnLast[x] + 1;
                matrixColumnCurrent[x] = Math.min(substitution, insertion, deletion);
            }
        }
    }
    return matrix[str2.length][str1.length];
};

/**
 * Collects the values of an array in a map as arrays.
 * If the function returns a nil value, the element will be skipped,
 * otherwise the return value will be used as key.
 *
 * @since 6.1.0
 * @param arr Array to collect.
 * @param fn Function to use for collection (`fn(val: *, index: number, arr: any[]) => any`).
 * @returns Map<val: *, arr: any[]> Collected map.
 * @example
 * arrCollect([1, 2, 3, 4, 5], val => val % 2)
 * // => Map<any, any[]>{0: [2, 4], 1: [1, 3, 5]}
 */
const arrCollect = (arr, fn) => {
    const collected = new Map();
    arr.forEach((val, index) => {
        const key = fn(val, index, arr);
        if (!lodash.isNil(key)) {
            collected.set(key, collected.has(key) ? [...collected.get(key), val] : [val]);
        }
    });
    return collected;
};

// noinspection SpellCheckingInspection
/**
 * Returns strings similar to the input based its distance to the values in the list given.
 *
 * @since 6.3.0
 * @param str String to check.
 * @param list Array of values to compare the string to.
 * @param [returnFull=false] If the full map should be returned, rather than just the closest matches.
 * @returns Array of the closest matches, or the map if `returnFull` is true.
 * @example
 * strSimilar("Fob", ["Foo", "Bar"])
 * // => ["Foo"]
 *
 * strSimilar("cmmit", ["init", "commit", "push"])
 * // => ["commit"]
 *
 * strSimilar("Kitten", ["Sitten", "Sitting", "Bitten"])
 * // => ["Sitten", "Bitten"]
 *
 * strSimilar("cmmit", ["init", "commit", "push"], true)
 * // => Map<number, string[]>{1: ["commit"], 3: ["init"], 5: ["push"]}
 */
const strSimilar = (str, list, returnFull = false) => {
    const result = arrCollect(list, (val) => strDistance(str, val));
    if (!returnFull) {
        return result.get(Math.min(...result.keys()));
    }
    return result;
};

/**
 * Creates a PascalCase string from an array of words.
 *
 * @since 6.2.0
 * @param arr Words to use.
 * @returns PascalCase string of the words.
 * @example
 * strToPascalCase(["foo", "bar"])
 * // => "FooBar"
 *
 * strToPascalCase(["Fizz","buzz","BaZZ"])
 * // => "FizzBuzzBazz"
 */
const strToPascalCase = (arr) => arr
    .map(val => val.substr(0, 1).toUpperCase() + val.substr(1).toLowerCase())
    .join("");

/**
 * Counts how many times an element appears in an array.
 *
 * @since 2.0.0
 * @param arr Array to count.
 * @returns  Map containing the counted result (`Map<val: *, count: number>`).
 * @example
 * arrCount([1, 1, 2, 2, 1, 3, 4, 1])
 * // => Map<any, number>{1: 4, 2: 2, 3: 1, 4: 1}
 */
const arrCount = (arr) => {
    const counted = new Map();
    arr.forEach(val => counted.set(val, counted.has(val) ? counted.get(val) + 1 : 1));
    return counted;
};

/**
 * Returns an array with the item at the index removed.
 *
 * @since 2.8.0
 * @param arr Array to use.
 * @param targetIndex Index to remove.
 * @returns Array with the index removed.
 * @example
 * arrRemoveIndex(["foo", "bar", "fizz"], 1)
 * // => ["foo", "fizz"]
 */
const arrRemoveIndex = (arr, targetIndex) => arr.filter((val, index) => index !== targetIndex);

/**
 * Returns an array with instances of the given item removed.
 *
 * @since 2.8.0
 * @param arr Array to use.
 * @param targetItem Item to remove.
 * @param [removeAll=true] If all occurrences should be removed, otherwise just the first occurrence will be.
 * @returns Array with the item removed.
 * @example
 * arrRemoveItem(["foo", "bar", "fizz", "bar"], "bar")
 * // => ["foo", "fizz"]
 *
 * arrRemoveItem(["foo", "bar", "fizz", "bar"], "bar", false)
 * // => ["foo", "fizz", "bar"]
 */
const arrRemoveItem = (arr, targetItem, removeAll = true) => removeAll
    ? arr.filter(item => item !== targetItem)
    : arrRemoveIndex(arr, arr.indexOf(targetItem));

/**
 * Returns an array with every n-th item from the input array.
 *
 * @since 1.0.0
 * @param arr Array to use.
 * @param step Step to use.
 * @returns Stepped array.
 * @example
 * arrStep([1, 2, 3, 4, 5, 6], 2)
 * // => [1, 3, 5]
 */
const arrStep = (arr, step) => arr.filter((val, index) => index % step === 0);

/**
 * Replaces every circular reference in an object with a value, defaulting to null.
 *
 * Can take a custom replacer function and a pre-filled weak set of references.
 *
 * @since 6.0.0
 * @param obj Object to decycle.
 * @param [fn=() => null] Decycling function (`fn(key: *, val: any, index: number, obj: object) => void`)
 * @param [references=new WeakSet()] WeakSet prefilled with encountered references.
 * @returns Decycled object.
 * @example
 * const a = {a: {}, b: 1, c: 2};
 *
 * a.a = a;
 *
 * objDecycle(a)
 * // => {a: null, b: 1, c: 2}
 *
 * objDecycle(a, key => `_${key}`)
 * // => {a: "_a", b: 1, c: 2}
 */
const objDecycle = (obj, fn = () => null, references = new WeakSet()) => {
    references.add(obj);
    return lodash.map(obj, (val, key, objNew) => {
        if (references.has(val)) {
            return fn(val, key, objNew);
        }
        if (lodash.isObjectLike(val)) {
            references.add(val);
            return objDecycle(val, fn, references);
        }
        return val;
    });
};

/**
 * Binary-search implementation.
 *
 * @since 5.0.0
 * @param arr Array to search in.
 * @param search Value to search.
 * @returns Index of the value in the array, or null if none is found.
 * @example
 * searchBinary([0, 1, 2], 1)
 * // => 1
 *
 * searchBinary([0, 1, 2], 100)
 * // => null
 */
const searchBinary = (arr, search) => {
    let low = 0;
    let high = arr.length - 1;
    let mid;
    while (low <= high) {
        mid = Math.floor(low + (high - low) / 2);
        const current = arr[mid];
        if (current === search) {
            return mid;
        }
        if (current < search) {
            low = mid + 1;
        }
        else {
            high = mid - 1;
        }
    }
    return null;
};

exports.arrCollect = arrCollect;
exports.arrCount = arrCount;
exports.arrRemoveIndex = arrRemoveIndex;
exports.arrRemoveItem = arrRemoveItem;
exports.arrStep = arrStep;
exports.getName = getName;
exports.isInstanceOf = isInstanceOf;
exports.isPromise = isPromise;
exports.isTypeOf = isTypeOf;
exports.numClamp = numClamp;
exports.numSafe = numSafe;
exports.objDecycle = objDecycle;
exports.searchBinary = searchBinary;
exports.strDistance = strDistance;
exports.strSimilar = strSimilar;
exports.strToPascalCase = strToPascalCase;
