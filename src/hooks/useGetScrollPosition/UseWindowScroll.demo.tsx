import React from 'react'
import { useWindowPosition } from './useWindowScroll'

export const WindowPosition = () => {
  const windowPosition = useWindowPosition()
  return (
    <p>
      Hello x:{windowPosition?.x}, y:{windowPosition?.y}
    </p>
  )
}
