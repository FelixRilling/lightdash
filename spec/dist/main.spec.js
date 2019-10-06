'use strict';

var lodash = require('lodash');

// Noinspection SpellCheckingInspection
/**
 * Returns the levenshtein string distance of two strings.
 *
 * @since 6.3.0
 * @memberOf String
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

describe("distance", () => {
    it("gets distance", () => {
        expect(distance("Kitten", "Sitting")).toBe(3);
        expect(distance("String", "Stribng")).toBe(1);
        expect(distance("foo", "foo")).toBe(0);
    });
});

/**
 * Creates a PascalCase string from a string.
 *
 * @since 6.2.0
 * @memberOf String
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

describe("strToPascalCase", () => {
    it("converts to PascalCase", () => {
        expect(pascalCase("fooBar")).toBe("FooBar");
        expect(pascalCase("__fizz_buzz__")).toBe("FizzBuzz");
    });
});

/**
 * Collects elements in an array into a an array of merged elements.
 *
 * @since 11.0.0
 * @memberOf Array
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
 * @memberOf Array
 * @param collection Collection to group.
 * @param keyFn Function to use for grouping.
 * @returns Grouped map.
 * @example
 * groupMapBy([1, 2, 3, 4, 5], val => val % 2)
 * // => Map{0: [2, 4], 1: [1, 3, 5]}
 */
const groupMapBy = (collection, keyFn) => groupMapReducingBy(collection, keyFn, () => [], (current, value) => lodash.concat(current, value));

// Noinspection SpellCheckingInspection
/**
 * Returns strings similar to the input based its levenshtein distance to the values in the list given.
 *
 * @since 6.3.0
 * @memberOf String
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

describe("similar", () => {
    it("gets similar", () => {
        expect(similar("Fob", ["Foo", "Bar"])).toEqual(["Foo"]);
        expect(similar("cmmit", ["init", "commit", "push"])).toEqual([
            "commit"
        ]);
        expect(similar("Kitten", ["Sitten", "Sitting", "Bitten"])).toEqual([
            "Sitten",
            "Bitten"
        ]);
        expect(similar("cmmit", ["init", "commit", "push"], true)).toEqual(new Map([[1, ["commit"]], [3, ["init"]], [5, ["push"]]]));
    });
});

/**
 * Finds all regex matches in a string. Meant to be used with a global regex.
 *
 * @since 11.0.0
 * @memberOf String
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
    // eslint-disable-next-line no-extra-parens
    while ((match = pattern.exec(str))) {
        matches.push(match);
    }
    return matches;
};

describe("matchAll", () => {
    it("matches all", () => {
        const actual = matchAll("Kitten", /t/g);
        expect(actual.length).toBe(2);
        expect(actual[0].toString()).toBe("t");
        expect(actual[1].toString()).toBe("t");
    });
});

/**
 * Returns a new array with the item at the given index removed.
 *
 * @since 2.8.0
 * @memberOf Array
 * @param collection Collection to use.
 * @param targetIndex Index to remove.
 * @returns Collection with the index removed.
 * @example
 * removeIndex(["foo", "bar", "fizz"], 1)
 * // => ["foo", "fizz"]
 */
const removeIndex = (collection, targetIndex) => lodash.filter(collection, (value, index) => index !== targetIndex);

describe("removeIndex", () => {
    it("removes index", () => {
        expect(removeIndex(["foo", "bar", "fizz"], 1)).toEqual(["foo", "fizz"]);
    });
});

/**
 * Returns a new collection with instances of the given item removed.
 *
 * @since 2.8.0
 * @memberOf Array
 * @param collection Collection to use.
 * @param targetValue Item to remove.
 * @param removeAll If all occurrences should be removed, otherwise just the first occurrence will.
 * @returns Collection with the item removed.
 * @example
 * removeItem(["foo", "bar", "fizz", "bar"], "bar")
 * // => ["foo", "fizz"]
 *
 * removeItem(["foo", "bar", "fizz", "bar"], "bar", false)
 * // => ["foo", "fizz", "bar"]
 */
const removeItem = (collection, targetValue, removeAll = true) => removeAll
    ? lodash.filter(collection, value => value !== targetValue)
    : removeIndex(collection, lodash.indexOf(collection, targetValue));

describe("removeItem", () => {
    it("removes all items", () => {
        expect(removeItem(["foo", "bar", "fizz", "bar"], "bar")).toEqual([
            "foo",
            "fizz"
        ]);
    });
    it("removes the first item", () => {
        expect(removeItem(["foo", "bar", "fizz", "bar"], "bar", false)).toEqual(["foo", "fizz", "bar"]);
    });
});

/**
 * Returns a new collection with every n-th item from the input array.
 *
 * @since 1.0.0
 * @memberOf Array
 * @param collection Collection to use.
 * @param n Step to use.
 * @returns Stepped collection.
 * @example
 * step([1, 2, 3, 4, 5, 6], 2)
 * // => [1, 3, 5]
 */
const step = (collection, n) => lodash.filter(collection, (value, index) => index % n === 0);

describe("step", () => {
    it("steps items", () => {
        expect(step([1, 2, 3, 4, 5, 6], 2)).toEqual([1, 3, 5]);
    });
});

describe("groupMapBy", () => {
    it("groups items", () => {
        expect(groupMapBy([1, 2, 3, 4, 5], val => val % 2)).toEqual(new Map([[0, [2, 4]], [1, [1, 3, 5]]]));
    });
});

describe("groupMapReducingBy", () => {
    it("groups items", () => {
        expect(groupMapReducingBy(["foo", "bar", "fizz", "buzz"], val => val.charAt(0), () => {
            return {
                count: 0,
                matches: []
            };
        }, (current, val) => {
            current.count++;
            current.matches.push(val);
            return current;
        })).toEqual(new Map([
            ["f", { count: 2, matches: ["foo", "fizz"] }],
            ["b", { count: 2, matches: ["bar", "buzz"] }]
        ]));
    });
});

/**
 * Replaces every circular reference in an object with a value, defaulting to null.
 *
 * Can take a custom replacer function.
 *
 * @since 6.0.0
 * @memberOf Object
 * @param collection Object to decycle.
 * @param replacer Circular reference value replacer function
 * @param references WeakSet prefilled with encountered references, not recommended to provide this manually.
 * @returns Decycled object.
 * @example
 * const a = {a: {}, b: 1, c: 2};
 *
 * a.a = a;
 *
 * decycle(a)
 * // => {a: null, b: 1, c: 2}
 *
 * decycle(a, key => `_${key}`)
 * // => {a: "_a", b: 1, c: 2}
 */
const decycle = (collection, replacer = () => null, references = new WeakSet()) => {
    // TODO: find a way to properly avoid any's here.
    const decycler = (value, key, _collection) => {
        if (references.has(value)) {
            return replacer(value, key, _collection);
        }
        if (lodash.isObjectLike(value)) {
            return decycle(value, replacer, references);
        }
        return value;
    };
    references.add(collection);
    return lodash.isArrayLike(collection)
        ? lodash.map(collection, decycler)
        : lodash.mapValues(collection, decycler);
};

describe("decycle", () => {
    it("decycles", () => {
        const a = { a: {}, b: 1, c: 2 };
        a.a = a;
        expect(decycle(a)).toEqual({ a: null, b: 1, c: 2 });
    });
    it("decycles with custom replacer", () => {
        const a = { a: {}, b: 1, c: 2 };
        a.a = a;
        expect(decycle(a, (val, key) => `_${key}`)).toEqual({
            a: "_a",
            b: 1,
            c: 2
        });
    });
});

/**
 * Gets name of a value.
 *
 * If the value has a name or description property, the value of that is returned.
 * If the value is a string, it is returned as is.
 * Otherwise null is returned.
 *
 * @since 10.2.0
 * @memberOf Object
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
    // eslint-disable-next-line no-extra-parens
    if (lodash.isObject(value) && lodash.isString(value.name)) {
        // eslint-disable-next-line no-extra-parens
        return value.name;
    }
    if (lodash.isSymbol(value) && lodash.isString(value.description)) {
        return value.description;
    }
    return null;
};

describe("name", () => {
    it("gets name of class", () => {
        expect(name(class Foo {
        })).toBe("Foo");
    });
    it("gets name of function", () => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        expect(name(function bar() { })).toBe("bar");
    });
    it("gets name of symbol", () => {
        expect(name(Symbol("abc"))).toBe("abc");
    });
    it("gets name of string", () => {
        expect(name("foo")).toBe("foo");
    });
    it("gets null for number", () => {
        expect(name(1)).toBe(null);
    });
    it("gets null for null", () => {
        expect(name(null)).toBe(null);
    });
});

/**
 * Binary-search implementation.
 *
 * @since 5.0.0
 * @memberOf Search
 * @param arr Array to search in.
 * @param search Value to search.
 * @returns Index of the value in the array, or null if none is found.
 * @example
 * binarySearch([0, 1, 2], 1)
 * // => 1
 *
 * binarySearch([0, 1, 2], 100)
 * // => null
 */
const binarySearch = (arr, search) => {
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

describe("binarySearch", () => {
    it("searches for value", () => {
        expect(binarySearch([0, 1, 2], 1)).toBe(1);
    });
    it("returns null for no match", () => {
        expect(binarySearch([0, 1, 2], 100)).toBeNull();
    });
});
