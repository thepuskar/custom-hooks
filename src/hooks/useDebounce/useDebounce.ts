import { useState, useEffect } from 'react'

/**
 * "useDebounce returns a debounced version of the value passed in as an argument, with a default delay
 * of 500ms."
 *
 * The function takes two arguments: the first is the value we want to debounce, and the second is the
 * delay in milliseconds. The default value for the delay is 500ms
 * @param {T} value - The value to be debounced.
 * @param {number} [delay=500] - number - The delay in milliseconds for the debounce.
 * @returns The debounceValue
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debounceValue, setDebounceValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebounceValue(value), delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debounceValue
}
