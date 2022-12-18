import React from 'react'
import { useRef } from 'react'
import { useEventListener } from './useEventListener'

export const UseEventListener = () => {
  const btnRef = useRef<HTMLButtonElement>(null)

  useEventListener({
    target: btnRef,
    eventType: 'click',
    handler: (event) => console.log(event.target)
  })

  return (
    <div>
      <button ref={btnRef}>Click</button>
    </div>
  )
}
