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
declare const arrStep: <T>(arr: T[], step: number) => T[];
export { arrStep };
