'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var lodash = require('lodash');

/**
 * Checks if the string is blank (no non-space content).
 *
 * @since 11.0.0
 * @category Is
 * @param str String to use.
 * @returns If the file is blank.
 * @example
 * isBlank("")
 * // => true
 *
 * isBlank("  ")
 * // => true
 *
 * isBlank(" foo ")
 * // => false
 */
const isBlank = (str) => lodash.isEmpty(str.trim());

/**
 * Checks if a value is a promise.
 *
 * @since 3.0.0
 * @category Is
 * @param value Value to check.
 * @returns If the value is a promise.
 * @example
 * isPromise(new Promise((resolve, reject) => resolve("foo")));
 * // => true
 *
 * isPromise(() => "foo");
 * // => false
 */
const isPromise = (value) => value instanceof Promise;

/**
 * Creates a map from an objects entries.
 *
 * @since 1.0.0
 * @category Lang
 * @param object Object to use.
 * @returns Map created from the object.
 * @example
 * toMap({a: 1, b: 4, c: 5})
 * // => Map{"a": 1, "b": 4, "c": 5}
 */
const toMap = (object) => new Map(lodash.toPairs(object));

/**
 * Creates a map from an objects entries, mapping the keys and values.
 *
 * @since 13.0.0
 * @category Lang
 * @param object Object to use.
 * @param keyMapper Function mapping keys.
 * @param valueMapper Function mapping values.
 * @returns Map created from the object.
 * @example
 * toMap({a: 1, b: 4, c: 5}, key => { return { key }; }, value => value * 2)
 * // => Map{{key: "a"}: 2, {key: "b"}: 8, {key: "a"}: 10}
 */
const toMapBy = (object, keyMapper, valueMapper) => new Map(lodash.toPairs(object).map(([key, val]) => [
    keyMapper(key, val),
    valueMapper(key, val),
]));

/**
 * Returns the levenshtein string distance of two strings.
 *
 * @since 6.3.0
 * @category String
 * @param str1 First string to compare.
 * @param str2 Second string to compare.
 * @returns Distance between the two strings.
 * @example
 * distance("Kitten", "Sitting")
 * // => 3
 *
 * distance("String", "Stribng")
 * // => 1
 *
 * distance("foo", "foo")
 * // => 0
 */
const distance = (str1, str2) => {
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
 * Creates a PascalCase string from a string.
 *
 * @since 6.2.0
 * @category String
 * @param str String to use.
 * @returns PascalCase string of the input string.
 * @example
 * pascalCase("fooBar")
 * // => "FooBar"
 *
 * pascalCase("__foo_bar__")
 * // => "FizzBuzzBazz"
 */
const pascalCase = (str) => lodash.upperFirst(lodash.camelCase(str));

/**
 * Collects elements in an array into a an array of merged elements.
 *
 * @since 11.0.0
 * @category Array
 * @param collection Collection to group.
 * @param keyProducer Function returning the key for the value.
 * @param initializer Function initializing a new mergable object.
 * @param reducer Consumer mutating the existing object with the new data.
 * @returns Grouped and merged map.
 * @example
 * groupMapReducingBy(
 *     ["foo", "bar", "fizz", "buzz"],
 *     val => val.charAt(0),
 *     () => {
 *        return {
 *            count: 0,
 *            matches: []
 *        };
 *     },
 *     (current, val) => {
 *         current.count++;
 *         current.matches.push(val);
 *         return current;
 *     }
 * )
 * // => Map{"f": {count: 2, matches: ["foo", "fizz"]}, "b": {count: 2, matches: ["bar", "buzz"]}}
 */
const groupMapReducingBy = (collection, keyProducer, initializer, reducer) => {
    const result = new Map();
    lodash.forEach(collection, (value, index) => {
        const key = keyProducer(value, index, collection);
        if (!result.has(key)) {
            result.set(key, initializer(value, index, collection));
        }
        result.set(key, reducer(result.get(key), value, index, collection));
    });
    return result;
};

/**
 * Collects the values of an array in a map as array values,
 * using the return value of the function as key.
 *
 * @since 6.1.0
 * @category Array
 * @param collection Collection to group.
 * @param keyFn Function to use for grouping.
 * @returns Grouped map.
 * @example
 * groupMapBy([1, 2, 3, 4, 5], val => val % 2)
 * // => Map{0: [2, 4], 1: [1, 3, 5]}
 */
const groupMapBy = (collection, keyFn) => groupMapReducingBy(collection, keyFn, () => [], (current, value) => lodash.concat(current, value));

/**
 * Returns strings similar to the input based its levenshtein distance to the values in the list given.
 *
 * @since 6.3.0
 * @category String
 * @param str String to check.
 * @param collection Array of values to compare the string to.
 * @param returnFull If the full map should be returned, rather than just the closest matches.
 * @returns Array of the closest matches, or the map if `returnFull` is true.
 * @example
 * similar("Fob", ["Foo", "Bar"])
 * // => ["Foo"]
 *
 * similar("cmmit", ["init", "commit", "push"])
 * // => ["commit"]
 *
 * similar("Kitten", ["Sitten", "Sitting", "Bitten"])
 * // => ["Sitten", "Bitten"]
 *
 * similar("cmmit", ["init", "commit", "push"], true)
 * // => Map<number, string[]>{1: ["commit"], 3: ["init"], 5: ["push"]}
 */
const similar = (str, collection, returnFull = false) => {
    const result = groupMapBy(collection, (value) => distance(str, value));
    if (returnFull) {
        return result;
    }
    const lowestKey = Math.min(...result.keys());
    return result.get(lowestKey);
};

/**
 * Finds all regex matches in a string. Meant to be used with a global regex.
 *
 * @since 11.0.0
 * @category String
 * @param str String to match against.
 * @param pattern SRegex pattern to match.
 * @returns Array of all matches.
 * @example
 * matchAll("Kitten", /t/g)
 * // => [[0: "t"], [1: "t"]]
 *
 * matchAll("Kitten", /f/g)
 * // => []
 */
const matchAll = (str, pattern) => {
    const matches = [];
    let match;
    while ((match = pattern.exec(str))) {
        matches.push(match);
    }
    return matches;
};

/**
 * Counts the values of an array in a map,
 * using the return value of the function as key.
 *
 * @since 12.0.0
 * @category Array
 * @param collection Collection to count.
 * @param keyFn Function to use for key generation.
 * @returns Count map.
 * @example
 * countMapBy([1, 2, 4, 2, 4, 4], val => val)
 * // => Map{1: 1, 2: 2, 4: 3}
 */
const countMapBy = (collection, keyFn) => groupMapReducingBy(collection, keyFn, () => 0, (current) => current + 1);

/**
 * Removes the first occurrence of an element from an array.
 *
 * Note: the input array is being mutated.
 *
 * @since 2.8.0
 * @category Array
 * @param collection The array to modify.
 * @param targetValue The value to remove.
 * @returns The mutated collection.
 * @example
 * const a = ["foo", "bar", "fizz", "bar"];
 * removeItem(a, "bar")
 * // a equals ["foo", "fizz", "bar"]
 */
const pullFirst = (collection, targetValue) => {
    const targetIndex = lodash.indexOf(collection, targetValue);
    lodash.remove(collection, (val, index) => index === targetIndex);
    return collection;
};

/**
 * Returns a new collection with every n-th item from the input array.
 *
 * @since 1.0.0
 * @category Array
 * @param collection Collection to use.
 * @param n Step to use.
 * @returns Stepped collection.
 * @example
 * step([1, 2, 3, 4, 5, 6], 2)
 * // => [1, 3, 5]
 */
const step = (collection, n) => lodash.filter(collection, (value, index) => index % n === 0);

/**
 * Inserts value(s) at the given position.
 * If the index is equal or higher the array length, the value(s) will appended.
 * If the index is less than 0, the value(s) will prepended.
 *
 * Note: the input array is being mutated.
 *
 * @since 12.1.0
 * @category Array
 * @param collection Collection to insert to.
 * @param index Index to start inserting.
 * @param values Value(s) to insert.
 * @returns Collection.
 * @example
 * insert(["foo", "fizz"], 1, "bar")
 * // => ["foo", "bar", "fizz"]
 */
const insert = (collection, index, ...values) => {
    collection.splice(index, 0, ...values);
    return collection;
};

/**
 * Gets name of a value.
 *
 * If the value has a name or description property, the value of that is returned.
 * If the value is a string, it is returned as is.
 * Otherwise null is returned.
 *
 * @since 10.2.0
 * @category Object
 * @param value Value to check.
 * @returns The name of the value.
 * @example
 * name(class Foo{})
 * // => "Foo"
 *
 * name(function bar(){})
 * // => "bar"
 *
 * name(Symbol("abc"))
 * // => "abc"
 *
 * name("foo")
 * // => "foo"
 *
 * name(1)
 * // => null
 */
const name = (value) => {
    if (lodash.isString(value)) {
        return value;
    }
    if (lodash.isObject(value) && lodash.isString(value.name)) {
        return value.name;
    }
    if (lodash.isSymbol(value) && lodash.isString(value.description)) {
        return value.description;
    }
    return null;
};

/**
 * Helper method recursively executing the callback against all object properties.
 * Only object-like values will have the callback executed.
 * If the same reference is encountered after the first time, it will be skipped.
 *
 * @private
 */
const visit = (root, callback) => {
    const visitStack = new WeakSet();
    const visitObject = (target) => {
        visitStack.add(target);
        for (const prop of Object.values(target)) {
            if (lodash.isObject(prop) && !visitStack.has(prop)) {
                visitObject(prop);
            }
        }
        callback(target);
    };
    visitObject(root);
};

/**
 * Recursively freezes objects, useful for constant objects.
 *
 * This function mutates the input value and calls Object.freeze() recursively on all sub-objects.
 *
 * @since 12.0.0
 * @category Object
 * @param target Object to recursively freeze.
 * @example
 * const a = {a: {b: 2}, b: [1, {foo: "foo"}], c: 2};
 *
 * deepFreeze(a)
 * // => object and all sub-objects are frozen.
 */
const deepFreeze = (target) => visit(target, Object.freeze);

/**
 * Recursively seals objects, useful for constant objects.
 *
 * This function mutates the input value and calls Object.seal() recursively on all sub-objects.
 *
 * @since 12.0.0
 * @category Object
 * @param target Object to recursively seal.
 * @example
 * const a = {a: {b: 2}, b: [1, {foo: "foo"}], c: 2};
 *
 * deepSeal(a)
 * // => object and all sub-objects are sealed.
 */
const deepSeal = (target) => visit(target, Object.seal);

exports.countMapBy = countMapBy;
exports.deepFreeze = deepFreeze;
exports.deepSeal = deepSeal;
exports.distance = distance;
exports.groupMapBy = groupMapBy;
exports.groupMapReducingBy = groupMapReducingBy;
exports.insert = insert;
exports.isBlank = isBlank;
exports.isPromise = isPromise;
exports.matchAll = matchAll;
exports.name = name;
exports.pascalCase = pascalCase;
exports.pullFirst = pullFirst;
exports.similar = similar;
exports.step = step;
exports.toMap = toMap;
exports.toMapBy = toMapBy;
//# sourceMappingURL=lightdash.common.js.map
