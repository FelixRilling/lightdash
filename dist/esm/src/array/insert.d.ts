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
declare const insert: <TValue, UKey>(collection: TValue[], index: number, ...values: TValue[]) => TValue[];
export { insert };
//# sourceMappingURL=insert.d.ts.map