import { deepObjectMutate } from "./lib/deepObjectMutate";
/**
 * Recursively freezes objects, useful for constant objects.
 *
 * This function mutates the input value and calls Object.freeze() recursively on all sub-objects.
 *
 * @since 12.0.0
 * @category Object
 * @param target Object to recursively freeze.
 * @example
 * const a = {a: {b: 2}, b: [1, {foo: "foo"}], c: 2};
 *
 * deepFreeze(a)
 * // => object and all sub-objects are frozen.
 */
const deepFreeze = (target) => deepObjectMutate(target, Object.freeze);
export { deepFreeze };
//# sourceMappingURL=deepFreeze.js.map