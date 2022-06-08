import React from 'react'

/**
 * It returns an array with two elements: the first element is the value of the local storage item, and
 * the second element is a function that sets the value of the local storage item.
 * @param {string} keyName - The name of the key you want to store in localStorage.
 * @param {string} defaultValue - The value to be returned if there is no value in localStorage.
 * @returns An array with two elements. The first element is the storedValue, the second element is the
 * setValue function.
 */
export const useLocalStorage = (
  keyName: string,
  defaultValue: string | Object | Array<String | Object>
) => {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const value = window.localStorage.getItem(keyName)
      return value ? JSON.parse(value) : defaultValue
    } catch (error) {
      return defaultValue
    }
  })
  const setValue = (newValue: string) => {
    try {
      const value = JSON.stringify(newValue)
      window.localStorage.setItem(keyName, value)
      setStoredValue(newValue)
    } catch (error) {
      console.log(error)
    }
  }
  return [storedValue, setValue]
}
