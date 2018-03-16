/**
 * Value checking, type checking, and comparison
 * @namespace Is
 */
import isArguments from "./is/arguments";
import isArray from "./is/array";
import isArrayBuffer from "./is/arrayBuffer";
import isArrayLike from "./is/arrayLike";
import isArrayTyped from "./is/arrayTyped";
import isBoolean from "./is/boolean";
import isDate from "./is/date";
import isEmpty from "./is/empty";
import isEqual from "./is/equal";
import isError from "./is/error";
import isFunction from "./is/function";
import isInstanceOf from "./is/instanceOf";
import isMap from "./is/map";
import isNil from "./is/nil";
import isNumber from "./is/number";
import isObject from "./is/object";
import isObjectLike from "./is/objectLike";
import isObjectPlain from "./is/objectPlain";
import isPromise from "./is/promise";
import isRegExp from "./is/regExp";
import isSet from "./is/set";
import isString from "./is/string";
import isSymbol from "./is/symbol";
import isTypeOf from "./is/typeOf";
import isUndefined from "./is/undefined";
/**
 * Check if a target has something
 * @namespace Has
 */
import hasPath from "./has/path";
/**
 * Get value from a target
 * @namespace Get
 */
import getPath from "./get/path";
/**
 * Looping through ranges, arrays and objects
 * @namespace For
 */
import forEachDeep from "./for/eachDeep";
import forEachEntry from "./for/eachEntry";
import forEachEntryDeep from "./for/eachEntryDeep";
/**
 * Array manipulation and analysis
 * @namespace Array
 */
import arrChunk from "./arr/chunk";
import arrCompact from "./arr/compact";
import arrCount from "./arr/count";
import arrDifference from "./arr/difference";
import arrFlattenDeep from "./arr/flattenDeep";
import arrFromDeep from "./arr/fromDeep";
import arrIntersection from "./arr/intersection";
import arrMapDeep from "./arr/mapDeep";
import arrRemoveIndex from "./arr/removeIndex";
import arrRemoveItem from "./arr/removeItem";
import arrStep from "./arr/step";
import arrUniq from "./arr/uniq";
/**
 * Object manipulation and analysis
 * @namespace Object
 */
import objDefaults from "./obj/defaults";
import objDefaultsDeep from "./obj/defaultsDeep";
import objFrom from "./obj/from";
import objFromDeep from "./obj/fromDeep";
import objMap from "./obj/map";
import objMapDeep from "./obj/mapDeep";
/**
 * Map manipulation
 * @namespace Map
 */
import mapFromObject from "./map/fromObject";
/**
 * Function manipulation
 * @namespace Fn
 */
import fnAttempt from "./fn/attempt";
import fnCurry from "./fn/curry";
import fnThrottle from "./fn/throttle";
/**
 * Number manipulation and comparison
 * @namespace Number
 */
import numAverage from "./num/average";
import numClamp from "./num/clamp";
import numMedian from "./num/median";
import numSum from "./num/sum";
/**
 * Random number generation and value picking
 * @namespace Random
 */
import randItem from "./rand/item";
import randNumber from "./rand/number";
import randShuffle from "./rand/shuffle";
/**
 * Generic algorithms
 * @namespace Algorithm
 */
import algBinarySearch from "./alg/binarySearch";
export { isEqual, isInstanceOf, isTypeOf, isUndefined, isNil, isNumber, isString, isBoolean, isSymbol, isObject, isObjectLike, isObjectPlain, isArray, isArrayLike, isArrayBuffer, isArrayTyped, isPromise, isMap, isSet, isDate, isRegExp, isFunction, isArguments, isError, isEmpty, hasPath, getPath, forEachDeep, forEachEntry, forEachEntryDeep, arrFromDeep, arrMapDeep, arrFlattenDeep, arrCompact, arrChunk, arrStep, arrRemoveIndex, arrRemoveItem, arrCount, arrDifference, arrIntersection, arrUniq, objFrom, objFromDeep, objMap, objMapDeep, objDefaults, objDefaultsDeep, mapFromObject, fnThrottle, fnAttempt, fnCurry, numClamp, numSum, numAverage, numMedian, randNumber, randItem, randShuffle, algBinarySearch };
