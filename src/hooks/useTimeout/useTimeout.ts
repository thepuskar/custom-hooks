import { useCallback, useRef } from 'react'
import { useIsomorphicEffect } from '../useIsomorphicEffect'

export const useTimeout = (callback: () => void, delay: number) => {
  const callbackRef = useRef(callback)
  const timeoutRef = useRef<number | null>()

  useIsomorphicEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const set = useCallback(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return
    }

    timeoutRef.current = setTimeout(() => callbackRef.current(), delay)
  }, [delay])

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current)
  }, [])

  useIsomorphicEffect(() => {
    set()
    return clear()
  }, [delay, set, clear])

  const reset = useCallback(() => {
    clear()
    set()
  }, [clear, set])

  return { reset, clear }
}
