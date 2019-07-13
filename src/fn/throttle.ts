import { anyVoidFn } from "./lib/anyVoidFn";

/**
 * Creates a throttled function.
 *
 * Throttling ensures that the function can only be invoked once in the given timeout.
 * @see https://css-tricks.com/the-difference-between-throttling-and-debouncing/
 *
 * @since 3.1.0
 * @param {Function} fn Function to throttle.
 * @param {number} timeout Timeout to use.
 * @returns {Function} Throttled function.
 * @example
 * const foo = (a, b) => console.log(a + b);
 * const fooThrottled = fnThrottle(foo, 500);
 * // function calls will be throttled to 500ms
 */
const fnThrottle = (fn: anyVoidFn<any>, timeout: number): anyVoidFn<any> => {
    let timer: any = null; // Seems to require any, as the return type of the browser and node are different here.
    let last: number | null = null;

    // tslint:disable-next-line:only-arrow-functions
    return function() {
        const now = Date.now();

        const run = () => {
            last = now;
            fn.apply(this, Array.of(arguments));
        };

        if (last != null && now < last + timeout) {
            clearTimeout(timer);
            timer = setTimeout(run, timeout);
        } else {
            run();
        }
    };
};

export { fnThrottle };
