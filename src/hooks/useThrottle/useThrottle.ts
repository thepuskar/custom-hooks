import { useEffect, useRef, useReducer } from "react";

/**
 * It returns a throttled value that updates every `delay` milliseconds
 * @param {T} value - The value to be throttled.
 * @param {number} [delay=5000] - The amount of time to wait before updating the value.
 * @returns The throttled value
 */

export const useThrottle = <T>(value: T, delay: number = 5000): T => {
  const [throttledValue, setThrottledValue] = useReducer(
    (_prev: T, next: T) => next,
    value
  );
  const lastExecutionTime = useRef<number>(Date.now());

  useEffect(() => {
    if (Date.now() >= lastExecutionTime.current + delay) {
      lastExecutionTime.current = Date.now();
      return setThrottledValue(value);
    }
    const timerId = setTimeout(() => {
      lastExecutionTime.current = Date.now();
      setThrottledValue(value);
    }, delay);
    return () => clearTimeout(timerId);
  }, [value, delay]);

  return throttledValue;
};
