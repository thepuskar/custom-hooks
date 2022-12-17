import { useState, useCallback } from 'react'

/**
 * It returns an array of four items: the current state, a function to toggle the state, a function to
 * close the state, and a function to open the state.
 * @param {boolean} initialValue - boolean - The initial value of the toggle.
 * @returns An array of 4 elements.
 */

export const useToggle = (
  initialValue: boolean
): [boolean, () => void, () => void, () => void] => {
  const [show, setShow] = useState<boolean>(initialValue)

  const toggle = useCallback(() => {
    setShow((prevState) => !prevState)
  }, [])

  const close = useCallback(() => {
    setShow(false)
  }, [])

  const open = useCallback(() => {
    setShow(true)
  }, [])

  return [show, toggle, close, open]
}
