export function moveArrayPosition(
  arr: any[],
  id: string,
  newIndex: number,
  idName: string
) {
  const oldIndex = arr.findIndex(
    (item: { [x: string]: string }) => item?.[idName] === id
  )

  if (newIndex >= arr.length) {
    var k = newIndex - arr.length + 1
    while (k--) {
      arr.push(undefined)
    }
  }
  arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0])
  return arr
}
