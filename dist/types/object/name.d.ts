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
declare const name: (value: any) => string | null;
export { name };