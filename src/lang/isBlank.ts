import { isEmpty } from "lodash";

/**
 * Checks if the string is blank (no non-space content).
 *
 * @since 11.0.0
 * @category Lang
 * @param string String to use.
 * @returns If the string is blank.
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
const isBlank = (string: string): boolean => isEmpty(string.trim());

export { isBlank };
