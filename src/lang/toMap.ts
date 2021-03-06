import type { Dictionary, NumericDictionary } from "lodash";
import { toPairs } from "lodash";

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
const toMap = <TValue>(
    object: Dictionary<TValue> | NumericDictionary<TValue>
): Map<string, TValue> => new Map(toPairs(object));

export { toMap };
