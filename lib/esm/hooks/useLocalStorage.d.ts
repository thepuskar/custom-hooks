/**
 * It returns an array with two elements: the first element is the value of the local storage item, and
 * the second element is a function that sets the value of the local storage item.
 * @param {string} keyName - The name of the key you want to store in localStorage.
 * @param {string} defaultValue - The value to be returned if there is no value in localStorage.
 * @returns An array with two elements. The first element is the storedValue, the second element is the
 * setValue function.
 */
export declare const useLocalStorage: (keyName: string, defaultValue: string | Object | Array<String | Object>) => any[];
