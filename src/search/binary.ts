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
const searchBinary = (arr: number[], search: number): number | null => {
    let low = 0;
    let high = arr.length - 1;
    let mid: number;

    while (low <= high) {
        mid = Math.floor(low + (high - low) / 2);
        const current = arr[mid];

        if (current === search) {
            return mid;
        }

        if (current < search) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return null;
};

export { searchBinary };
