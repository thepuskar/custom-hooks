/**
 * Utility function to convert snake case to camel case
 * @param {string} str - string - The string to convert
 */
export const snakeToCamel = (str: string) =>
  str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace('-', '').replace('_', '')
    )
