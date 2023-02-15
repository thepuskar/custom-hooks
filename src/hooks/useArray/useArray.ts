export const useArray = () => {
  /**
   * It takes an array and an element or an array of elements, and pushes the element(s) onto the array
   * @param {T[]} array - T[] - The array to push the elements to.
   * @param {T | T[]} elements - T | T[]
   * @returns Appended array.
   */
  function push<T>(array: T[], elements: T | T[]): T[] {
    if (Array.isArray(elements)) {
      array.push(...elements);
      return array;
    }
    array.push(elements);
    return array;
  }

  /**
   * "filter takes an array and a callback function, and returns a new array containing only the elements
   * of the original array for which the callback function returns true."
   *
   * The callback function is called for each element of the array. If the callback function returns
   * true, the element is included in the new array. If the callback function returns false, the element
   * is not included in the new array
   * @param {T[]} array - T[] - The array to filter
   * @param callback - (element: T, index: number, array: T[]) => boolean
   * @returns An array of numbers.
   */
  function filter<T>(
    array: T[],
    callback: (element: T, index: number, array: T[]) => boolean
  ): T[] {
    return array.filter(callback);
  }

  /**
   * It moves an element from one index to another in an array.
   * @param {T[]} array - The array to move an element from and to.
   * @param {number} fromIndex - The index of the item you want to move.
   * @param {number} toIndex - The index of the element before which to insert the element.
   * @returns the array with the element moved to the new index.
   */
  function move<T>(array: T[], fromIndex: number, toIndex: number): T[] {
    const element = array.splice(fromIndex, 1)[0];
    array.splice(toIndex, 0, element);
    return array;
  }

  /**
   *
   * It removes an element from an array, and returns a new array
   * @param {(number | string | { id: any })[]} array - (number | string | { id: any })[]
   * @param {any} id - any - the id of the item to remove
   * @param [prop] - keyof { id: any }
   * @returns (number | string | { id: any })[]
   *
   * * Example:
   * ```
   * let array = [1, 2, 3, "a", "b", {id: 1, name: "John"}, {id: 2, name: "Jane"}];
   * let updatedArray = remove(array, 3);
   * console.log(updatedArray); // [1, 2, "a", "b", {id: 1, name: "John"}, {id: 2, name: "Jane"}]
   * updatedArray = remove(array, "b");
   * console.log(updatedArray); // [1, 2, 3, "a", {id: 1, name: "John"}, {id: 2, name: "Jane"}]
   * updatedArray = remove(array, 1, "id");
   * console.log(updatedArray); // [2, 3, "a", "b", {id: 2, name: "Jane"}]
   * ```
   */
  function remove<T extends { id: any }>(
    array: T[],
    id: any,
    prop?: keyof { id: any }
  ): T[] {
    if (!prop) {
      const index = array.indexOf(id);
      if (index === -1) return array;
      return [...array.slice(0, index), ...array.slice(index + 1)];
    } else {
      const index = array.findIndex(
        (x) => typeof x === "object" && x[prop] === id
      );
      if (index === -1) return array;
      return [...array.slice(0, index), ...array.slice(index + 1)];
    }
  }

  /**
   * The function takes an array of type T and removes all elements from the array
   * @param {T[]} array - The array to clear.
   */
  function clear<T>(array: T[]) {
    if (array?.length > 0) {
      return array.splice(0, array.length);
    }
    return array;
  }

  /**
   * Takes an array of any type T as input and returns a shuffled array of the same type.
   * @param {T[]} array - The array to shuffle.
   * @returns Returns a shuffled array.
   */
  function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  return { push, filter, move, remove, clear, shuffle };
};
