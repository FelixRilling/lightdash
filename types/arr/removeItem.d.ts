/**
 * Returns an array with instances of the given item removed.
 *
 * @since 2.8.0
 * @param collection Array to use.
 * @param targetValue Item to remove.
 * @param removeAll If all occurrences should be removed, otherwise just the first occurrence will be.
 * @returns Array with the item removed.
 * @example
 * removeItem(["foo", "bar", "fizz", "bar"], "bar")
 * // => ["foo", "fizz"]
 *
 * removeItem(["foo", "bar", "fizz", "bar"], "bar", false)
 * // => ["foo", "fizz", "bar"]
 */
declare const removeItem: <T>(collection: ArrayLike<T>, targetValue: T, removeAll?: boolean) => ArrayLike<T>;
export { removeItem };
