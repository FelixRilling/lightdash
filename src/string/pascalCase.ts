import { camelCase, upperFirst } from "lodash";

/**
 * Creates a PascalCase string from a string.
 *
 * @since 6.2.0
 * @category String
 * @param string String to use.
 * @returns PascalCase string of the input string.
 * @example
 * pascalCase("fooBar")
 * // => "FooBar"
 *
 * pascalCase("fizz-buzz_bazz")
 * // => "FizzBuzzBazz"
 */
const pascalCase = (string: string): string => upperFirst(camelCase(string));

export { pascalCase };
