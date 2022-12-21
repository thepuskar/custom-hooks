export const uid = (): string => {
  return Math.floor(Math.random() * Date.now()).toString(16)
}
