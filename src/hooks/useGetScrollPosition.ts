import { useState, useEffect } from 'react'

/**
 * It returns the current scroll position of the window.
 * @returns The scroll position of the window.
 */
export const useGetScrollPosition = (initialPosition?: Number) => {
  const [scrollPosition, setScrollPosition] = useState(initialPosition ?? 0)

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset)
    }
    window.addEventListener('scroll', updatePosition)
    updatePosition()
    return () => window.removeEventListener('scroll', updatePosition)
  }, [])

  return scrollPosition
}
