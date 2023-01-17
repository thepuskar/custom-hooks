import { useState, useCallback, Dispatch, SetStateAction } from 'react'

/**
 * `useToggle` is a custom hook that returns a boolean value, a function to toggle the boolean value,
 * and a function to set the boolean value
 * @param {boolean} initialValue - boolean - The initial value of the toggle.
 * @returns An array of 3 elements.
 */
export const useToggle = (
  initialValue: boolean
): [boolean, () => void, Dispatch<SetStateAction<boolean>>] => {
  const [value, setValue] = useState<boolean>(initialValue)

  const toggle = useCallback((value?: boolean) => {
    setValue((prevState) => value ?? !prevState)
  }, [])

  return [value, toggle, setValue]
}
