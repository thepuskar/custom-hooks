import { RefObject, useEffect } from 'react'

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const element = ref?.current

      if (!element || element.contains((event?.target as Node) || null)) {
        return
      }

      handler(event)
    }

    document.addEventListener('mouseenter', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mouseenter', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}
